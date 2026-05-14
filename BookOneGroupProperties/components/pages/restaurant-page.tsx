"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { ChevronDown, Search, Utensils, AlertCircle, Loader2, ShoppingCart, Plus, Minus, X } from "lucide-react";
import { propertySources, type PropertySource } from "@/data/property-sources";
import { formatCurrency } from "@/lib/currency";

// ─── API Types ───────────────────────────────────────────────────────────────

export type CartItem = {
  id: string;
  product: MenuProduct;
  variation?: ProductVariation;
  quantity: number;
};

type ProductImage = {
  url?: string | null;
  name?: string | null;
};

type ProductVariation = {
  name: string;
  sellUnitPrice: number;
  code: string;
};

type MenuProduct = {
  id: number;
  name: string;
  sellUnitPrice: number;
  imageList: ProductImage[];
  outOfStock: boolean;
  shortDescription?: string | null;
  productVariationDtoList?: ProductVariation[];
};

type MenuCategory = {
  id: number;
  name: string;
  businessServiceId: number;
  productDtoList: MenuProduct[];
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const RESTAURANT_API = "https://api.bookone.io/api-bookone/api/website/getProductList";

async function fetchMenuData(propertyId: number): Promise<MenuCategory[]> {
  const res = await fetch(`${RESTAURANT_API}/${propertyId}`, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

function getProductImage(product: MenuProduct): string | null {
  return product.imageList?.[0]?.url?.trim() || null;
}

function slugToPropertyName(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function getDisplayPrice(product: MenuProduct): string {
  if (product.productVariationDtoList && product.productVariationDtoList.length > 0) {
    const prices = product.productVariationDtoList.map((v) => v.sellUnitPrice).filter((p) => p > 0);
    if (prices.length === 0) return "Price on request";
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? formatCurrency(min) : `${formatCurrency(min)} – ${formatCurrency(max)}`;
  }
  if (product.sellUnitPrice > 0) return formatCurrency(product.sellUnitPrice);
  return "Price on request";
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PropertyDropdown({
  selected,
  onChange,
}: {
  selected: PropertySource;
  onChange: (source: PropertySource) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        id="btn-property-dropdown"
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex min-w-[220px] items-center justify-between gap-3 rounded-xl border border-primary/30 bg-white px-4 py-3 text-sm font-bold text-foreground shadow-sm transition-all hover:border-primary hover:shadow-md"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="flex items-center gap-2">
          <Utensils className="h-4 w-4 text-primary" />
          {slugToPropertyName(selected.slug)}
        </span>
        <ChevronDown className={`h-4 w-4 text-primary transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 top-full z-50 mt-2 min-w-full overflow-hidden rounded-xl border border-primary/10 bg-white shadow-2xl"
        >
          {propertySources.map((source) => (
            <button
              key={source.slug}
              role="option"
              aria-selected={source.slug === selected.slug}
              type="button"
              onClick={() => {
                onChange(source);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium transition-colors ${
                source.slug === selected.slug
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-muted/50"
              }`}
            >
              {slugToPropertyName(source.slug)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductCard({
  product,
  cart,
  updateCart,
}: {
  product: MenuProduct;
  cart: Record<string, CartItem>;
  updateCart: (item: CartItem, delta: number) => void;
}) {
  const image = getProductImage(product);
  const hasVariations =
    product.productVariationDtoList && product.productVariationDtoList.length > 0;

  const handleUpdate = (variation?: ProductVariation, delta = 1) => {
    const id = variation ? `${product.id}-${variation.code}` : `${product.id}`;
    updateCart({ id, product, variation, quantity: 0 }, delta);
  };

  const getQty = (variation?: ProductVariation) => {
    const id = variation ? `${product.id}-${variation.code}` : `${product.id}`;
    return cart[id]?.quantity || 0;
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
      <div className="relative h-44 w-full overflow-hidden bg-muted/30">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Utensils className="h-10 w-10 text-muted-foreground/40" />
          </div>
        )}
        {product.outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">Sold Out</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 font-bold text-foreground leading-snug">{product.name.trim()}</h3>
        {product.shortDescription && (
          <p className="mb-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">{product.shortDescription}</p>
        )}

        {hasVariations && (
          <div className="mb-3 space-y-2">
            {product.productVariationDtoList!.map((variation) => {
              const qty = getQty(variation);
              return (
                <div key={variation.code} className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex flex-col">
                    <span>{variation.name}</span>
                    <span className="font-bold text-primary">{formatCurrency(variation.sellUnitPrice)}</span>
                  </div>
                  {!product.outOfStock && (
                    <div className="flex items-center gap-2">
                      {qty > 0 ? (
                        <>
                          <button onClick={() => handleUpdate(variation, -1)} className="rounded-full bg-muted p-1 hover:bg-muted-foreground/20"><Minus className="h-3 w-3" /></button>
                          <span className="font-medium text-foreground w-3 text-center">{qty}</span>
                          <button onClick={() => handleUpdate(variation, 1)} className="rounded-full bg-primary p-1 text-white hover:bg-primary/90"><Plus className="h-3 w-3" /></button>
                        </>
                      ) : (
                        <button onClick={() => handleUpdate(variation, 1)} className="rounded-full border border-primary px-3 py-1 text-primary hover:bg-primary/10 transition-colors">Add</button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-border/50 flex items-center justify-between">
          <span className="text-base font-bold text-primary">{getDisplayPrice(product)}</span>
          {product.outOfStock ? (
            <span className="text-xs font-medium text-red-500">Unavailable</span>
          ) : !hasVariations ? (
            <div className="flex items-center gap-2">
              {getQty() > 0 ? (
                <>
                  <button onClick={() => handleUpdate(undefined, -1)} className="rounded-full bg-muted p-1.5 hover:bg-muted-foreground/20"><Minus className="h-4 w-4" /></button>
                  <span className="font-medium text-foreground w-4 text-center">{getQty()}</span>
                  <button onClick={() => handleUpdate(undefined, 1)} className="rounded-full bg-primary p-1.5 text-white hover:bg-primary/90"><Plus className="h-4 w-4" /></button>
                </>
              ) : (
                <button onClick={() => handleUpdate(undefined, 1)} className="rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-white hover:bg-primary/90 transition-colors">Add</button>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function CategorySection({
  category,
  cart,
  updateCart,
}: {
  category: MenuCategory;
  cart: Record<string, CartItem>;
  updateCart: (item: CartItem, delta: number) => void;
}) {
  const validProducts = category.productDtoList.filter(
    (p) => p.name?.trim()
  );
  if (validProducts.length === 0) return null;

  return (
    <section id={`category-${category.id}`}>
      <div className="mb-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <h2 className="text-base font-bold uppercase tracking-widest text-primary whitespace-nowrap">
          {category.name.trim()}
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {validProducts.map((product) => (
          <ProductCard key={product.id} product={product} cart={cart} updateCart={updateCart} />
        ))}
      </div>
    </section>
  );
}

// ─── Category Sidebar / Quick-nav ─────────────────────────────────────────────

function CategoryNav({
  categories,
  activeId,
  onSelect,
}: {
  categories: MenuCategory[];
  activeId: number | null;
  onSelect: (id: number) => void;
}) {
  const valid = categories.filter((c) => c.productDtoList.some((p) => p.name?.trim()));
  if (valid.length === 0) return null;

  return (
    <nav className="no-scrollbar flex gap-2 overflow-x-auto pb-1" aria-label="Menu categories">
      {valid.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => {
            onSelect(cat.id);
            const el = document.getElementById(`category-${cat.id}`);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all ${
            activeId === cat.id
              ? "bg-primary text-white shadow-md"
              : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          {cat.name.trim()}
        </button>
      ))}
    </nav>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function RestaurantPage() {
  const [selectedProperty, setSelectedProperty] = useState<PropertySource>(propertySources[0]);
  const [menuData, setMenuData] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [plateStyles, setPlateStyles] = useState<{top: string, left: string, transform: string}[]>([]);
  const [carts, setCarts] = useState<Record<string, Record<string, CartItem>>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cart = carts[selectedProperty.slug] || {};

  const updateCart = (item: CartItem, delta: number) => {
    setCarts((prevCarts) => {
      const prevCart = prevCarts[selectedProperty.slug] || {};
      const existing = prevCart[item.id];
      const newQty = (existing?.quantity || 0) + delta;
      
      let nextCart;
      if (newQty <= 0) {
        nextCart = { ...prevCart };
        delete nextCart[item.id];
      } else {
        nextCart = { ...prevCart, [item.id]: { ...item, quantity: newQty } };
      }
      
      return { ...prevCarts, [selectedProperty.slug]: nextCart };
    });
  };

  const cartItems = Object.values(cart);
  const cartTotal = cartItems.reduce((sum, item) => {
    const price = item.variation ? item.variation.sellUnitPrice : item.product.sellUnitPrice;
    return sum + price * item.quantity;
  }, 0);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setPlateStyles(
      Array.from({ length: 12 }).map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        transform: `rotate(${Math.random() * 360}deg)`
      }))
    );
  }, []);

  // Fetch menu data whenever selected property changes
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setMenuData([]);
    setSearchQuery("");

    fetchMenuData(selectedProperty.restaurantId || selectedProperty.propertyId)
      .then((data) => {
        if (!cancelled) {
          setMenuData(data);
          setActiveCategory(data[0]?.id ?? null);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load menu.");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selectedProperty]);

  // Filter categories & products by search query
  const filteredData = useMemo<MenuCategory[]>(() => {
    if (!searchQuery.trim()) return menuData;
    const q = searchQuery.toLowerCase();
    return menuData
      .map((cat) => ({
        ...cat,
        productDtoList: cat.productDtoList.filter(
          (p) =>
            p.name?.toLowerCase().includes(q) ||
            cat.name.toLowerCase().includes(q),
        ),
      }))
      .filter((cat) => cat.productDtoList.length > 0);
  }, [menuData, searchQuery]);

  const totalItems = useMemo(
    () => filteredData.reduce((sum, cat) => sum + cat.productDtoList.length, 0),
    [filteredData],
  );

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-teal-700 py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          {plateStyles.map((style, i) => (
            <div
              key={i}
              className="absolute text-6xl"
              style={style}
            >
              🍽️
            </div>
          ))}
        </div>
        <div className="container relative mx-auto px-4 text-center sm:px-6">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
            <Utensils className="h-4 w-4" />
            Live Menu
          </div>
          <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Restaurant &amp; Dining
          </h1>
          <p className="mx-auto max-w-xl text-base text-white/80">
            Browse the full menu for each property. Fresh ingredients, authentic flavours, served with warmth.
          </p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="sticky top-0 z-40 border-b border-border/40 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-3 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Property Selector */}
            <PropertyDropdown selected={selectedProperty} onChange={setSelectedProperty} />

            {/* Search */}
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="input-menu-search"
                type="search"
                placeholder="Search menu items…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border bg-muted/30 py-2.5 pl-9 pr-4 text-sm outline-none transition-colors focus:border-primary focus:bg-white"
              />
            </div>

            {/* Item count */}
            {!loading && !error && (
              <span className="shrink-0 text-sm text-muted-foreground">
                {totalItems} item{totalItems !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Category quick-nav */}
          {!loading && !error && menuData.length > 0 && (
            <div className="mt-3">
              <CategoryNav
                categories={menuData}
                activeId={activeCategory}
                onSelect={setActiveCategory}
              />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-10 sm:px-6">
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-muted-foreground">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-sm font-medium">Loading menu for {slugToPropertyName(selectedProperty.slug)}…</p>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
            <AlertCircle className="h-10 w-10 text-red-400" />
            <p className="font-medium">Could not load menu</p>
            <p className="text-sm">{error}</p>
            <button
              type="button"
              onClick={() => setSelectedProperty({ ...selectedProperty })}
              className="mt-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary/90"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && filteredData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
            <Search className="h-10 w-10 text-muted-foreground/40" />
            <p className="font-medium">No items found</p>
            <p className="text-sm">Try a different search term or select another property.</p>
          </div>
        )}

        {!loading && !error && filteredData.length > 0 && (
          <div className="space-y-12">
            {filteredData.map((category) => (
              <CategorySection key={category.id} category={category} cart={cart} updateCart={updateCart} />
            ))}
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      {cartItemCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-white shadow-xl hover:bg-primary/90 hover:scale-105 transition-all"
        >
          <div className="relative">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold shadow-sm">
              {cartItemCount}
            </span>
          </div>
          <span className="font-bold">{formatCurrency(cartTotal)}</span>
        </button>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-lg font-bold text-foreground">Your Order</h2>
              <button onClick={() => setIsCartOpen(false)} className="rounded-full p-2 hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
                  <ShoppingCart className="h-12 w-12 opacity-20 mb-4" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                cartItems.map((item) => {
                  const price = item.variation ? item.variation.sellUnitPrice : item.product.sellUnitPrice;
                  return (
                    <div key={item.id} className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-sm leading-tight">{item.product.name}</h4>
                        {item.variation && <p className="text-xs text-muted-foreground mt-0.5">{item.variation.name}</p>}
                        <div className="font-bold text-primary text-sm mt-1">{formatCurrency(price * item.quantity)}</div>
                      </div>
                      <div className="flex items-center gap-3 bg-muted/50 rounded-full px-2 py-1">
                        <button onClick={() => updateCart(item, -1)} className="p-1 hover:text-primary"><Minus className="h-3 w-3" /></button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateCart(item, 1)} className="p-1 hover:text-primary"><Plus className="h-3 w-3" /></button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t bg-muted/20 p-6">
                <div className="flex justify-between text-base font-bold mb-4">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrency(cartTotal)}</span>
                </div>
                <button className="w-full rounded-xl bg-primary py-3.5 font-bold text-white shadow-lg hover:bg-primary/90 transition-all">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
