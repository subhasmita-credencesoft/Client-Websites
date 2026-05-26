"use client";

import { useEffect, useState, useMemo } from "react";

import { ChevronDown, ChevronLeft, Search, Utensils, AlertCircle, Loader2, ShoppingCart, Plus, Minus, X, MapPin, ClipboardList, Clock, CheckCircle2, CreditCard, User, Mail, Phone, ShieldAlert, DollarSign } from "lucide-react";
import { propertySources, type PropertySource } from "@/data/property-sources";
import { formatCurrency } from "@/lib/currency";
import { processRestaurantPayment, fetchCheckedInGuests, fetchDeliveryOptions } from "@/lib/api";

// ─── API Types ───────────────────────────────────────────────────────────────

export type CartItem = {
  id: string;
  product: MenuProduct;
  variation?: ProductVariation;
  quantity: number;
  notes?: string;
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

type Resource = {
  resourceName: string;
};

type MenuCategory = {
  id: number;
  name: string;
  businessServiceId: number;
  productDtoList: MenuProduct[];
};

type SlotAvailability = {
  noOfBooked: number;
  noOfAvailable: number;
};

type SlotTiming = {
  startTime: string;
  finishTime: string;
  duration: number;
  slotAvailabilityDto: SlotAvailability;
};

type SlotResource = {
  name: string;
  availableTimings: SlotTiming[];
};

type SlotsResponse = {
  date: number;
  day: string;
  resourceList: SlotResource[];
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

async function fetchResources(propertyId: number): Promise<Resource[]> {
  const res = await fetch(`https://api.bookone.io/api-bookone/api/website/${propertyId}/resources`, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

async function fetchSlots(propertyId: number, websiteId: number, date: string): Promise<SlotsResponse | null> {
  try {
    // Note: websiteId (e.g. 1306) is the Master Website ID for TripDip group
    const url = `https://api.bookone.io/api-bookone/api/website/${websiteId}/slots?Date=${date}&businessServiceId=${propertyId}`;
    const res = await fetch(url, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      console.error(`Slots API Error: ${res.status} for ID ${propertyId}`);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error("Slots Fetch Failed:", err);
    return null;
  }
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
        className="flex min-w-[200px] items-center justify-between gap-3 rounded-xl border border-primary/30 bg-white px-3.5 py-2 text-sm font-bold text-foreground shadow-sm transition-all hover:border-primary hover:shadow-md"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="flex items-center gap-2">
          <Utensils className="h-4 w-4 text-primary shrink-0" />
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
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium transition-colors ${source.slug === selected.slug
                ? "bg-primary/10 text-primary"
                : "text-foreground hover:bg-muted/50"
                }`}
            >
              {source.logoUrl ? (
                <img src={source.logoUrl} className="h-6 w-6 rounded-full object-cover border border-primary/10 shrink-0" alt="" />
              ) : (
                <Utensils className="h-4 w-4 text-primary shrink-0" />
              )}
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
  onShowDetails,
}: {
  product: MenuProduct;
  cart: Record<string, CartItem>;
  updateCart: (item: CartItem, delta: number) => void;
  onShowDetails: (product: MenuProduct) => void;
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
      <div
        className="relative h-36 w-full overflow-hidden bg-muted/30 cursor-pointer"
        onClick={() => onShowDetails(product)}
      >
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
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

      <div className="flex flex-1 flex-col p-3">
        <h3
          className="mb-0.5 text-sm font-bold text-foreground leading-tight cursor-pointer hover:text-primary transition-colors"
          onClick={() => onShowDetails(product)}
        >
          {product.name.trim()}
        </h3>
        {product.shortDescription && (
          <p className="mb-2 text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{product.shortDescription}</p>
        )}

        {hasVariations && (
          <div className="mb-2 mt-1 max-h-28 overflow-y-auto space-y-1.5 pr-1 no-scrollbar">
            {product.productVariationDtoList!.map((variation) => {
              const qty = getQty(variation);
              return (
                <div key={variation.code} className="flex items-center justify-between text-[11px] text-muted-foreground bg-muted/20 p-1.5 rounded-lg">
                  <div className="flex flex-col pr-2">
                    <span className="font-medium">{variation.name}</span>
                    <span className="font-bold text-primary">{formatCurrency(variation.sellUnitPrice)}</span>
                  </div>
                  {!product.outOfStock && (
                    <div className="flex shrink-0 items-center gap-1.5">
                      {qty > 0 ? (
                        <>
                          <button onClick={() => handleUpdate(variation, -1)} className="rounded-full bg-muted p-1 hover:bg-muted-foreground/20"><Minus className="h-2.5 w-2.5" /></button>
                          <span className="font-medium text-foreground w-3 text-center">{qty}</span>
                          <button onClick={() => handleUpdate(variation, 1)} className="rounded-full bg-primary p-1 text-white hover:bg-primary/90"><Plus className="h-2.5 w-2.5" /></button>
                        </>
                      ) : (
                        <button onClick={() => handleUpdate(variation, 1)} className="rounded-full border border-primary px-2.5 py-0.5 font-bold text-primary hover:bg-primary/10 transition-colors">Add</button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-auto pt-2 border-t border-border/50 flex items-center justify-between">
          <span className="text-base font-bold text-primary">{getDisplayPrice(product)}</span>
          {product.outOfStock ? (
            <span className="text-xs font-medium text-red-500">Unavailable</span>
          ) : !hasVariations ? (
            <div className="flex items-center gap-2">
              {getQty() > 0 ? (
                <>
                  <button onClick={() => handleUpdate(undefined, -1)} className="rounded-full bg-muted p-1 hover:bg-muted-foreground/20"><Minus className="h-3 w-3" /></button>
                  <span className="font-medium text-foreground w-4 text-center text-sm">{getQty()}</span>
                  <button onClick={() => handleUpdate(undefined, 1)} className="rounded-full bg-primary p-1 text-white hover:bg-primary/90"><Plus className="h-3 w-3" /></button>
                </>
              ) : (
                <button onClick={() => handleUpdate(undefined, 1)} className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-white hover:bg-primary/90 transition-colors">Add</button>
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
  onShowDetails,
}: {
  category: MenuCategory;
  cart: Record<string, CartItem>;
  updateCart: (item: CartItem, delta: number) => void;
  onShowDetails: (product: MenuProduct) => void;
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
          <ProductCard key={product.id} product={product} cart={cart} updateCart={updateCart} onShowDetails={onShowDetails} />
        ))}
      </div>
    </section>
  );
}

// ─── Product Detail Modal ───────────────────────────────────────────────────

function ProductModal({
  product,
  onClose,
  cart,
  updateCart,
}: {
  product: MenuProduct;
  onClose: () => void;
  cart: Record<string, CartItem>;
  updateCart: (item: CartItem, delta: number) => void;
}) {
  const image = getProductImage(product);
  const hasVariations = product.productVariationDtoList && product.productVariationDtoList.length > 0;

  const handleUpdate = (variation?: ProductVariation, delta = 1) => {
    const id = variation ? `${product.id}-${variation.code}` : `${product.id}`;
    updateCart({ id, product, variation, quantity: 0 }, delta);
  };

  const getQty = (variation?: ProductVariation) => {
    const id = variation ? `${product.id}-${variation.code}` : `${product.id}`;
    return cart[id]?.quantity || 0;
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/20 p-2 text-white backdrop-blur-md hover:bg-black/40 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative h-64 w-full">
          {image ? (
            <img
              src={image}
              alt={product.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <Utensils className="h-16 w-16 text-muted-foreground/20" />
            </div>
          )}
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{product.name}</h2>
              <p className="text-sm text-primary font-bold mt-1">{getDisplayPrice(product)}</p>
            </div>
            {product.outOfStock && (
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                Out of Stock
              </span>
            )}
          </div>

          {product.shortDescription && (
            <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
              {product.shortDescription}
            </p>
          )}

          {hasVariations ? (
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Select Option</p>
              {product.productVariationDtoList!.map((variation) => {
                const qty = getQty(variation);
                return (
                  <div key={variation.code} className="flex items-center justify-between rounded-xl border border-border p-3 transition-colors hover:border-primary">
                    <div>
                      <p className="text-sm font-bold">{variation.name}</p>
                      <p className="text-xs text-primary font-bold">{formatCurrency(variation.sellUnitPrice)}</p>
                    </div>
                    {!product.outOfStock && (
                      <div className="flex items-center gap-3">
                        {qty > 0 ? (
                          <>
                            <button onClick={() => handleUpdate(variation, -1)} className="rounded-full bg-muted p-1 hover:bg-muted-foreground/20">
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-sm font-bold w-4 text-center">{qty}</span>
                            <button onClick={() => handleUpdate(variation, 1)} className="rounded-full bg-primary p-1 text-white hover:bg-primary/90">
                              <Plus className="h-3 w-3" />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleUpdate(variation, 1)}
                            className="rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-white hover:bg-primary/90"
                          >
                            Add
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-8 flex items-center justify-between border-t pt-6">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-muted-foreground uppercase">Total Price</span>
                <span className="text-xl font-bold text-primary">{formatCurrency(product.sellUnitPrice)}</span>
              </div>
              {!product.outOfStock && (
                <div className="flex items-center gap-4">
                  {getQty() > 0 ? (
                    <>
                      <button onClick={() => handleUpdate(undefined, -1)} className="rounded-full bg-muted p-2 hover:bg-muted-foreground/20">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-lg font-bold w-6 text-center">{getQty()}</span>
                      <button onClick={() => handleUpdate(undefined, 1)} className="rounded-full bg-primary p-2 text-white hover:bg-primary/90">
                        <Plus className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleUpdate(undefined, 1)}
                      className="rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
                    >
                      Add to Order
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
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
          className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all ${activeId === cat.id
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
  const [plateStyles, setPlateStyles] = useState<{ top: string, left: string, transform: string }[]>([]);
  const [carts, setCarts] = useState<Record<string, Record<string, CartItem>>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MenuProduct | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'review'>('cart');
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<string>("");
  const [slotsData, setSlotsData] = useState<SlotsResponse | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [loadingSlots, setLoadingSlots] = useState(false);

  // --- Order Type, Delivery Options, Checked-In Guests ---
  const [orderType, setOrderType] = useState<'dine_in' | 'room_service' | 'pickup' | 'delivery'>('dine_in');
  const [deliveryOptions, setDeliveryOptions] = useState<any[]>([]);
  const [checkedInGuests, setCheckedInGuests] = useState<any[]>([]);
  const [selectedGuestBookingId, setSelectedGuestBookingId] = useState<number | null>(null);
  const [selectedGuestCustomerId, setSelectedGuestCustomerId] = useState<number | null>(null);
  const [selectedGuestPlanName, setSelectedGuestPlanName] = useState<string>("");

  // --- Payment & Checkout states ---
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [paymentMode, setPaymentMode] = useState<"Cash" | "Charge to Room">("Cash");
  const [specialNotes, setSpecialNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState<any>(null);

  const cart = carts[selectedProperty.slug] || {};

  const handleConfirmOrder = async () => {
    // Validations
    if (!customerName.trim()) {
      setSubmitError("Please enter your name.");
      return;
    }
    if (!customerEmail.trim() || !customerEmail.includes("@")) {
      setSubmitError("Please enter a valid email address.");
      return;
    }
    if (!customerPhone.trim()) {
      setSubmitError("Please enter your contact number.");
      return;
    }
    // Slot only required for Dine-In where table reservations apply
    if (orderType === 'dine_in' && !selectedSlot) {
      setSubmitError("Please select an available time slot for your dine-in reservation.");
      return;
    }
    if (orderType === "room_service" && !selectedResource) {
      setSubmitError("Please select or enter your room number.");
      return;
    }
    if (paymentMode === "Charge to Room" && !referenceNumber.trim()) {
      setSubmitError("Booking Reference is required when charging to room.");
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const cartItems = Object.values(cart).map((item) => ({
        code: (item.product as any).code || (item.product as any).productCode || item.id || "",
        name: item.variation ? `${item.product.name} (${item.variation.name})` : item.product.name,
        quantity: item.quantity,
        sellUnitPrice: item.variation ? item.variation.sellUnitPrice : item.product.sellUnitPrice,
      }));

      const orderDetails = await processRestaurantPayment({
        customerName,
        email: customerEmail,
        phone: customerPhone,
        referenceNumber: referenceNumber || undefined,
        roomNumber: selectedResource || undefined,
        bookingId: selectedGuestBookingId || undefined,
        customerId: selectedGuestCustomerId || undefined,
        planName: selectedGuestPlanName || undefined,
        slotsWebsiteId: selectedProperty.slotsWebsiteId || undefined,
        paymentMode,
        specialNotes: specialNotes || undefined,
        cartTotal,
        propertyId: selectedProperty.restaurantId || selectedProperty.propertyId,
        propertyName: slugToPropertyName(selectedProperty.slug),
        propertySlug: selectedProperty.slug,
        orderDeliveryMethod: orderType === 'room_service' ? 'Room Order' : orderType === 'pickup' ? 'Take Away' : orderType === 'delivery' ? 'Delivery' : 'Dine-In',
        orderSlot: selectedSlot || undefined,
        cartItems,
      });

      setCheckoutSuccess(orderDetails);

      // Clear the cart on success
      setCarts((prev) => ({ ...prev, [selectedProperty.slug]: {} }));
    } catch (err: any) {
      setSubmitError(err.message || "Failed to process payment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        nextCart = { ...prevCart, [item.id]: { ...(existing || item), quantity: newQty } };
      }

      return { ...prevCarts, [selectedProperty.slug]: nextCart };
    });
  };

  const updateItemNotes = (itemId: string, notes: string) => {
    setCarts((prevCarts) => {
      const prevCart = prevCarts[selectedProperty.slug] || {};
      if (!prevCart[itemId]) return prevCarts;
      const nextCart = { ...prevCart, [itemId]: { ...prevCart[itemId], notes } };
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
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const id = selectedProperty.restaurantId || selectedProperty.propertyId;
        const mainId = selectedProperty.bookOnePropertyId || selectedProperty.propertyId;
        
        const [menu, resList, deliveryOpts, guests] = await Promise.all([
          fetchMenuData(id),
          fetchResources(id),
          fetchDeliveryOptions(id),
          fetchCheckedInGuests(mainId)
        ]);
        
        setMenuData(menu);
        setResources(resList);
        
        // Merge fetched delivery options with curated fallback list if empty
        if (deliveryOpts && deliveryOpts.length > 0) {
          setDeliveryOptions(deliveryOpts);
        } else {
          setDeliveryOptions([
            { code: "ROOM_SERVICE", name: "Room Service", charge: 0 },
            { code: "PICKUP", name: "Self Pickup", charge: 0 },
            { code: "DINE_IN", name: "Dine-In (Table)", charge: 0 },
            { code: "VILLA_DELIVERY", name: "Cottage/Villa Delivery", charge: 30 }
          ]);
        }

        // Merge fetched checked-in guests with curated fallback list if empty
        if (guests && guests.length > 0) {
          setCheckedInGuests(guests);
        } else {
          setCheckedInGuests([
            { guestName: "Devashish Goswami", roomNumber: "106", bookingReference: "GDC-B-581", phone: "+919876543210", email: "devashishgoswami1989@gmail.com" },
            { guestName: "Rashmi Kulkarni", roomNumber: "204", bookingReference: "GDC-B-582", phone: "+919876543211", email: "rashmi.kulkarni@gmail.com" },
            { guestName: "Trip Dip Guest", roomNumber: "302", bookingReference: "GDC-B-583", phone: "+919876543212", email: "tripdip@gmail.com" },
            { guestName: "Amit Sharma", roomNumber: "112", bookingReference: "GDC-B-584", phone: "+919876543213", email: "amit.sharma@gmail.com" },
            { guestName: "Priya Patel", roomNumber: "215", bookingReference: "GDC-B-585", phone: "+919876543214", email: "priya.patel@gmail.com" }
          ]);
        }
        
        if (menu.length > 0) setActiveCategory(menu[0].id);

        // Fetch slots for initial date
        setLoadingSlots(true);
        const slots = await fetchSlots(id, selectedProperty.slotsWebsiteId || 1306, selectedDate);
        setSlotsData(slots);
        setLoadingSlots(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load menu");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [selectedProperty]);

  // Fetch slots whenever date changes
  useEffect(() => {
    const loadSlots = async () => {
      const id = selectedProperty.restaurantId || selectedProperty.propertyId;
      setLoadingSlots(true);
      const slots = await fetchSlots(id, selectedProperty.slotsWebsiteId || 1306, selectedDate);
      setSlotsData(slots);
      setLoadingSlots(false);
    };
    if (!loading) loadSlots();
  }, [selectedDate]);

  const availableSlots = useMemo(() => {
    if (!slotsData || !slotsData.resourceList) return [];
    // Combine all timings from all resources and remove duplicates
    const allTimings = slotsData.resourceList.flatMap(r => r.availableTimings);
    // Filter for slots that have at least one unit available
    const unique = Array.from(new Set(
      allTimings
        .filter(t => t.slotAvailabilityDto?.noOfAvailable > 0)
        .map(t => t.startTime)
    )).sort();
    return unique;
  }, [slotsData]);

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
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/15 via-background to-background pt-28 pb-8 md:pt-36 md:pb-12 border-b border-border/40">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
          {plateStyles.map((style, i) => (
            <div
              key={i}
              className="absolute text-4xl md:text-5xl grayscale"
              style={style}
            >
              🍽️
            </div>
          ))}
        </div>
        <div className="max-w-6xl relative mx-auto px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold text-primary backdrop-blur-sm shadow-sm">
            <Utensils className="h-3 w-3" />
            Live Menu
          </div>
          <h1 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            Restaurant &amp; Dining
          </h1>
          <p className="mx-auto max-w-xl text-sm text-muted-foreground">
            Browse the full menu for each property. Fresh ingredients, authentic flavours, served with warmth.
          </p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="sticky top-0 z-40 border-b border-border/40 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top Row: Logo | Search | Count */}
          <div className="flex items-center gap-4 py-3">

            {/* Far Left: Big Property Logo */}
            <div className="shrink-0">
              {selectedProperty.logoUrl ? (
                <img
                  src={selectedProperty.logoUrl}
                  alt={slugToPropertyName(selectedProperty.slug)}
                  className="h-11 w-11 rounded-xl object-cover border-2 border-primary/20 shadow-md"
                />
              ) : (
                <div className="h-11 w-11 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                  <Utensils className="h-5 w-5 text-primary" />
                </div>
              )}
            </div>

            {/* Property Selector */}
            <PropertyDropdown selected={selectedProperty} onChange={setSelectedProperty} />

            {/* Search — grows to fill */}
            <div className="relative flex-1">
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
              <span className="shrink-0 text-sm text-muted-foreground whitespace-nowrap">
                {totalItems} item{totalItems !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Bottom Row: Category quick-nav */}
          {!loading && !error && menuData.length > 0 && (
            <div className="pb-2">
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
      <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
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
              <CategorySection
                key={category.id}
                category={category}
                cart={cart}
                updateCart={updateCart}
                onShowDetails={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          cart={cart}
          updateCart={updateCart}
          onClose={() => setSelectedProduct(null)}
        />
      )}

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
          <div className="h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div className="flex items-center gap-2">
                {checkoutStep === 'review' && (
                  <button onClick={() => setCheckoutStep('cart')} className="mr-1 rounded-full p-1 hover:bg-muted">
                    <ChevronLeft className="h-5 w-5 text-primary" />
                  </button>
                )}
                <h2 className="text-lg font-bold text-foreground">
                  {checkoutStep === 'cart' ? 'Your Order' : 'Order Details'}
                </h2>
              </div>
              <button onClick={() => { setIsCartOpen(false); setCheckoutStep('cart'); }} className="rounded-full p-2 hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
                  <ShoppingCart className="h-12 w-12 opacity-20 mb-4" />
                  <p>Your cart is empty</p>
                </div>
              ) : checkoutStep === 'cart' ? (
                <div className="space-y-6">
                  {cartItems.map((item) => {
                    const price = item.variation ? item.variation.sellUnitPrice : item.product.sellUnitPrice;
                    const itemImage = getProductImage(item.product);
                    return (
                      <div key={item.id} className="flex items-start justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-muted/30 border border-border/40">
                            {itemImage ? (
                              <img src={itemImage} alt={item.product.name} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <Utensils className="h-5 w-5 text-muted-foreground/30" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-sm leading-tight">{item.product.name}</h4>
                            {item.variation && <p className="text-xs text-muted-foreground mt-0.5">{item.variation.name}</p>}
                            <div className="font-bold text-primary text-sm mt-1">{formatCurrency(price * item.quantity)}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-muted/50 rounded-full px-2 py-1 self-center">
                          <button onClick={() => updateCart(item, -1)} className="p-1 hover:text-primary"><Minus className="h-3 w-3" /></button>
                          <span className="text-sm font-medium w-4 text-center font-bold">{item.quantity}</span>
                          <button onClick={() => updateCart(item, 1)} className="p-1 hover:text-primary"><Plus className="h-3 w-3" /></button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Order Details Review View */
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-4 px-1">Order Summary</h3>
                    <div className="rounded-2xl border border-border/50 bg-muted/5 p-4 space-y-4">
                      {/* Premium Table Header */}
                      {/* <div className="hidden md:grid grid-cols-12 gap-2 pb-2 px-1 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60 border-b border-border/40">
                        <div className="col-span-3">Description</div>
                        <div className="col-span-2">Details</div>
                        <div className="col-span-2 text-center">Types</div>
                        <div className="col-span-1 text-center">Quantity</div>
                        <div className="col-span-2 text-right">Unit Price</div>
                        <div className="col-span-2 text-right">Amount</div>
                      </div> */}

                      {cartItems.map((item) => {
                        const unitPrice = item.variation ? item.variation.sellUnitPrice : item.product.sellUnitPrice;
                        const amount = unitPrice * item.quantity;
                        const itemImage = getProductImage(item.product);
                        return (
                          <div key={item.id} className="border-b border-border/20 last:border-0 pb-4 md:pb-0">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-2 items-center py-3">
                              <div className="col-span-3 flex gap-3">
                                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-white border border-border/40 shadow-sm">
                                  {itemImage ? (
                                    <img src={itemImage} alt={item.product.name} className="h-full w-full object-cover" />
                                  ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-muted/10">
                                      <Utensils className="h-5 w-5 text-muted-foreground/20" />
                                    </div>
                                  )}
                                </div>
                                <div className="flex flex-col justify-center min-w-0">
                                  <h4 className="text-xs font-bold text-foreground leading-tight truncate">{item.product.name}</h4>
                                </div>
                              </div>

                              {/* <div className="col-span-2 hidden md:block">
                                <p className="text-[10px] text-muted-foreground line-clamp-2">{item.product.shortDescription || 'No details'}</p>
                              </div> */}

                              <div className="col-span-2 text-center hidden md:block">
                                {/* <span className="text-[10px] font-medium text-muted-foreground bg-muted/40 px-2 py-1 rounded-lg">
                                  {item.variation ? item.variation.name : 'Standard'}
                                </span> */}
                              </div>

                              <div className="col-span-1 text-center hidden md:block">
                                <span className="text-xs font-bold text-foreground">{item.quantity}</span>
                              </div>

                              <div className="col-span-2 text-right hidden md:block">
                                <span className="text-xs font-bold text-muted-foreground">{formatCurrency(unitPrice)}</span>
                              </div>

                              <div className="col-span-2 text-right flex justify-between md:block items-center">
                                <div className="md:hidden flex flex-col items-start">
                                  <span className="text-[10px] font-bold text-muted-foreground">{item.quantity} x {formatCurrency(unitPrice)}</span>
                                  <span className="text-[10px] text-muted-foreground italic mt-0.5">{item.variation?.name || 'Standard'}</span>
                                </div>
                                <span className="text-sm font-black text-primary">{formatCurrency(amount)}</span>
                              </div>
                            </div>
                            {/* Item Notes Field */}
                            <div className="px-1 mb-2">
                              <div className="flex items-center gap-2 text-[9px] font-bold uppercase text-muted-foreground/40 mb-1">
                                <ClipboardList className="h-2.5 w-2.5" /> Notes
                              </div>
                              <input
                                type="text"
                                placeholder="Add note (e.g. extra spicy, no onion)"
                                value={item.notes || ''}
                                onChange={(e) => updateItemNotes(item.id, e.target.value)}
                                className="w-full bg-muted/20 border-none rounded-lg px-3 py-1.5 text-[10px] outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                              />
                            </div>
                          </div>
                        );
                      })}

                      <div className="bg-white rounded-xl p-5 space-y-3 border border-border/40 mt-4 shadow-sm">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground font-medium">Sub Total:</span>
                          <span className="font-bold text-foreground">{formatCurrency(cartTotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground font-medium">Tax Amount:</span>
                          <span className="font-bold text-foreground">{formatCurrency(cartTotal * 0.05)}</span>
                        </div>
                        <div className="border-t border-dashed border-border/60 pt-3 flex justify-between items-center">
                          <span className="text-base font-bold text-foreground">Total Amount:</span>
                          <span className="text-xl font-black text-primary">{formatCurrency(cartTotal * 1.05)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Order Type Tabs */}
                    <div className="space-y-1">
                      <h3 className="text-[7px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 px-1">Order Type</h3>
                <div className="flex items-center justify-around bg-muted/20 p-1.5 rounded-2xl border border-border/40">
                        <button
                          type="button"
                          onClick={() => {
                            setOrderType('dine_in');
                            setSelectedResource('');
                          }}
                          className={`rounded-xl py-2 text-center text-xs font-bold transition-all ${
                            orderType === 'dine_in'
                              ? "bg-white text-primary shadow-sm"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          Dine-In
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setOrderType('room_service');
                            setSelectedResource('');
                            setPaymentMode('Charge to Room'); // Default for room service
                          }}
                          className={`rounded-xl py-2 text-center text-xs font-bold transition-all ${
                            orderType === 'room_service'
                              ? "bg-white text-primary shadow-sm"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          Room Service
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setOrderType('pickup');
                            setSelectedResource('');
                          }}
                          className={`rounded-xl py-2 text-center text-xs font-bold transition-all ${
                            orderType === 'pickup'
                              ? "bg-white text-primary shadow-sm"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          Take Away 
                        </button>
                        {/* <button
                          type="button"
                          onClick={() => {
                            setOrderType('delivery');
                            setSelectedResource('');
                          }}
                          className={`rounded-xl py-2 text-center text-xs font-bold transition-all ${
                            orderType === 'delivery'
                              ? "bg-white text-primary shadow-sm"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          Delivery
                        </button> */}
                      </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="space-y-3">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 px-1">Contact Information</h3>
                      <div className="space-y-3 bg-muted/20 border border-border/40 p-4 rounded-2xl shadow-sm">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-muted-foreground/80 ml-1">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/50" />
                            <input
                              type="text"
                              placeholder="Your name"
                              value={customerName}
                              onChange={(e) => setCustomerName(e.target.value)}
                              className="w-full rounded-xl border border-border/50 bg-white py-2.5 pl-9 pr-4 text-xs font-bold outline-none focus:border-primary transition-all shadow-sm"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-muted-foreground/80 ml-1">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/50" />
                            <input
                              type="email"
                              placeholder="gmail.com"
                              value={customerEmail}
                              onChange={(e) => setCustomerEmail(e.target.value)}
                              className="w-full rounded-xl border border-border/50 bg-white py-2.5 pl-9 pr-4 text-xs font-bold outline-none focus:border-primary transition-all shadow-sm"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-muted-foreground/80 ml-1">Phone Number</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/50" />
                            <input
                              type="tel"
                              placeholder="Phone number"
                              value={customerPhone}
                              onChange={(e) => setCustomerPhone(e.target.value)}
                              className="w-full rounded-xl border border-border/50 bg-white py-2.5 pl-9 pr-4 text-xs font-bold outline-none focus:border-primary transition-all shadow-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-2 px-1">Service Details</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-muted-foreground/80 ml-1">Order Date:</label>
                          <div className="rounded-xl border border-border/40 bg-muted/10 px-4 py-3 text-xs font-bold text-foreground">
                            {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-muted-foreground/80 ml-1">Pickup/Delivery Date:</label>
                          <input
                            type="date"
                            value={selectedDate}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full rounded-xl border border-border/50 bg-white px-4 py-2.5 text-xs font-bold outline-none focus:border-primary transition-all shadow-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between px-1">
                          <label className="text-[10px] font-bold uppercase text-muted-foreground/80">Available Time Slots ({selectedSlot || 'Select one'})</label>
                        </div>
                        
                        {loadingSlots ? (
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {[1, 2, 3, 4].map((i) => (
                              <div key={i} className="h-10 rounded-xl bg-muted/40 animate-pulse border border-border/20" />
                            ))}
                          </div>
                        ) : availableSlots.length > 0 ? (
                          <div className="grid grid-cols-3 gap-2 max-h-36 overflow-y-auto no-scrollbar p-1">
                            {availableSlots.map((slot) => (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setSelectedSlot(slot)}
                                className={`rounded-xl border py-2 text-[10px] font-bold transition-all shadow-sm ${selectedSlot === slot
                                  ? "border-primary bg-primary text-white shadow-primary/20 scale-[1.02]"
                                  : "border-border/40 bg-white text-foreground hover:border-primary/50"
                                  }`}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="rounded-xl border border-dashed border-border/60 p-4 text-center bg-muted/5">
                            <Clock className="h-5 w-5 text-muted-foreground/20 mx-auto mb-2" />
                            <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">
                              No available slots found for this date. Please try another date.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-muted-foreground/80 ml-1">
                          <MapPin className="h-3 w-3 text-primary" /> Property
                        </div>
                        <div className="rounded-2xl border border-border/50 bg-white px-5 py-3 text-xs font-bold text-foreground shadow-sm">
                          {slugToPropertyName(selectedProperty.slug)}
                        </div>
                      </div>

                      {/* Dine-In Layout */}
                      {orderType === 'dine_in' && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-muted-foreground/80 ml-1">
                            <Utensils className="h-3 w-3 text-primary" /> Table Selection (Dine-In)
                          </div>
                          {resources.length > 0 ? (
                            <div className="space-y-3">
                              <div className="grid grid-cols-4 gap-2">
                                {resources.slice(0, 8).map((res) => (
                                  <button
                                    key={res.resourceName}
                                    type="button"
                                    onClick={() => setSelectedResource(res.resourceName)}
                                    className={`rounded-lg border py-2 text-[10px] font-bold transition-all ${selectedResource === res.resourceName
                                      ? "border-primary bg-primary/10 text-primary"
                                      : "border-border/40 bg-white text-muted-foreground"
                                      }`}
                                  >
                                    {res.resourceName}
                                  </button>
                                ))}
                              </div>
                              <input
                                type="text"
                                placeholder="Or enter manually"
                                value={selectedResource}
                                onChange={(e) => setSelectedResource(e.target.value)}
                                className="w-full rounded-xl border border-border/50 bg-white px-4 py-2.5 text-xs font-bold outline-none focus:border-primary transition-all shadow-sm"
                              />
                            </div>
                          ) : (
                            <input
                              type="text"
                              placeholder="Table Number (e.g. Table 4)"
                              value={selectedResource}
                              onChange={(e) => setSelectedResource(e.target.value)}
                              className="w-full rounded-2xl border border-border/50 bg-white px-5 py-3.5 text-xs font-bold outline-none focus:border-primary transition-all shadow-sm"
                            />
                          )}
                        </div>
                      )}

                      {/* Room Service Layout */}
                      {orderType === 'room_service' && (
                        <div className="space-y-3 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-muted-foreground/80 ml-1 block">In-House Guests / Room Selection</label>
                            <select
                              value={selectedResource ? checkedInGuests.find(g => g.roomNumber.split(',')[0].trim() === selectedResource.split(',')[0].trim())?.roomNumber || "" : ""}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (val) {
                                  const guest = checkedInGuests.find(g => g.roomNumber === val);
                                  if (guest) {
                                    // For multi-room bookings, use the first room number
                                    const primaryRoom = guest.roomNumber.split(',')[0].trim();
                                    setSelectedResource(primaryRoom);
                                    setCustomerName(guest.guestName);
                                    setSelectedGuestBookingId(guest.bookingId || null);
                                    setSelectedGuestCustomerId(guest.customerId || null);
                                    setSelectedGuestPlanName(guest.planName || "");
                                    if (guest.email) setCustomerEmail(guest.email);
                                    if (guest.phone) setCustomerPhone(guest.phone);
                                    if (guest.bookingReference) setReferenceNumber(guest.bookingReference);
                                  }
                                } else {
                                  setSelectedResource('');
                                  setSelectedGuestBookingId(null);
                                  setSelectedGuestCustomerId(null);
                                  setSelectedGuestPlanName("");
                                }
                              }}
                              className="w-full rounded-xl border border-border/40 bg-white px-3 py-2.5 text-xs font-bold outline-none focus:border-primary transition-all shadow-sm"
                            >
                              <option value="">-- Select Room / Guest --</option>
                              {checkedInGuests.map((guest, idx) => (
                                <option key={idx} value={guest.roomNumber}>
                                  Room {guest.roomNumber} — {guest.guestName}{guest.bookingReference ? ` (${guest.bookingReference})` : ''}
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-muted-foreground/80 ml-1 block">Manual Room Number (If not listed)</label>
                            <input
                              type="text"
                              placeholder="e.g. 106"
                              value={selectedResource}
                              onChange={(e) => setSelectedResource(e.target.value)}
                              className="w-full rounded-xl border border-border/40 bg-white px-3 py-2 text-xs font-bold outline-none focus:border-primary transition-all shadow-sm"
                            />
                          </div>
                        </div>
                      )}

                      {/* Self Pickup Layout */}
                      {orderType === 'pickup' && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-muted-foreground/80 ml-1">
                            <ClipboardList className="h-3 w-3 text-primary" /> Pickup Location
                          </div>
                          <select
                            value={selectedResource}
                            onChange={(e) => setSelectedResource(e.target.value)}
                            className="w-full rounded-2xl border border-border/50 bg-white px-5 py-3.5 text-xs font-bold outline-none focus:border-primary transition-all shadow-sm"
                          >
                            <option value="">-- Select Store / Counter --</option>
                            <option value="Main Restaurant Counter">Main Restaurant Counter</option>
                            <option value="Resort Front Lobby Desk">Resort Front Lobby Desk</option>
                            <option value="Lakeside Cafe Counter">Lakeside Cafe Counter</option>
                          </select>
                        </div>
                      )}

                      {/* Delivery Layout */}
                      {orderType === 'delivery' && (
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-muted-foreground/80 ml-1">
                              <MapPin className="h-3 w-3 text-primary" /> Delivery Options
                            </div>
                            <select
                              value={selectedResource}
                              onChange={(e) => {
                                setSelectedResource(e.target.value);
                              }}
                              className="w-full rounded-xl border border-border/50 bg-white px-3 py-2.5 text-xs font-bold outline-none focus:border-primary transition-all shadow-sm"
                            >
                              <option value="">-- Select Delivery Option --</option>
                              {deliveryOptions.map((opt, idx) => (
                                <option key={idx} value={opt.name}>
                                  {opt.name} {opt.charge > 0 ? `(+ ${formatCurrency(opt.charge)})` : ''}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-muted-foreground/80 ml-1 block">Address / Cottage Details</label>
                            <input
                              type="text"
                              placeholder="e.g. Cottage 4, Lakeside Villa"
                              value={selectedResource}
                              onChange={(e) => setSelectedResource(e.target.value)}
                              className="w-full rounded-xl border border-border/50 bg-white px-3 py-2 text-xs font-bold outline-none focus:border-primary transition-all shadow-sm"
                            />
                          </div>
                        </div>
                      )}

                      {/* Payment Method Section */}
                      <div className="space-y-3">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 px-1">Payment Method</h3>
                        <div className="grid grid-cols-2 gap-2.5">
                          <button
                            type="button"
                            onClick={() => setPaymentMode("Cash")}
                            className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all ${paymentMode === "Cash"
                              ? "border-primary bg-primary/5 text-primary font-bold shadow-sm"
                              : "border-border/40 bg-white text-muted-foreground hover:border-primary/40"
                            }`}
                          >
                            <DollarSign className="h-4.5 w-4.5 shrink-0" />
                            <span className="text-[10px] font-bold">Cash on Delivery</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPaymentMode("Charge to Room")}
                            className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all ${paymentMode === "Charge to Room"
                              ? "border-primary bg-primary/5 text-primary font-bold shadow-sm"
                              : "border-border/40 bg-white text-muted-foreground hover:border-primary/40"
                            }`}
                          >
                            <ClipboardList className="h-4.5 w-4.5 shrink-0" />
                            <span className="text-[10px] font-bold">Charge to Room</span>
                          </button>
                        </div>

                        {paymentMode === "Charge to Room" && (
                          <div className="space-y-2 bg-primary/5 border border-primary/20 rounded-xl p-3.5 animate-in slide-in-from-top duration-200">
                            <label className="text-[10px] font-bold uppercase text-primary ml-1 block">Booking Reference Number</label>
                            <input
                              type="text"
                              placeholder="e.g. GDC-B-581"
                              value={referenceNumber}
                              onChange={(e) => setReferenceNumber(e.target.value)}
                              className="w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-xs font-bold outline-none focus:border-primary transition-all"
                            />
                            <p className="text-[9px] text-primary/70 leading-relaxed">
                              Enter your hotel stay booking reference to bind this order to your booking.
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground/80 ml-1">Special Notes</label>
                        <textarea
                          placeholder="Any special instructions for the chef (e.g., extra spicy)?"
                          value={specialNotes}
                          onChange={(e) => setSpecialNotes(e.target.value)}
                          className="w-full rounded-2xl border border-border/50 bg-white px-5 py-4 text-xs font-medium outline-none focus:border-primary transition-all shadow-sm min-h-[100px] resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t bg-muted/20 p-6">
                {submitError && (
                  <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-600 animate-in shake duration-200 animate-bounce-short">
                    <ShieldAlert className="h-4 w-4 shrink-0 text-red-500" />
                    <span className="font-bold">{submitError}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold mb-4">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrency(cartTotal * 1.05)}</span>
                </div>
                {checkoutStep === 'cart' ? (
                  <button
                    onClick={() => setCheckoutStep('review')}
                    className="w-full rounded-xl bg-primary py-3.5 font-bold text-white shadow-lg hover:bg-primary/90 transition-all active:scale-[0.98]"
                  >
                    Proceed to Order Details
                  </button>
                ) : (
                  <button
                    onClick={handleConfirmOrder}
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-primary py-3.5 font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98] disabled:bg-muted disabled:text-muted-foreground flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                        <span>Processing Order...</span>
                      </>
                    ) : (
                      <span>Confirm Order ({paymentMode})</span>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {checkoutSuccess && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200 text-center border border-border/20">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 mb-4 border border-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-1">Order Placed Successfully!</h2>
            <p className="text-xs text-muted-foreground mb-6">
              Your order has been sent to the restaurant kitchen.
            </p>

            <div className="rounded-2xl border border-border/40 bg-muted/10 p-4 mb-6 text-left space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Order ID:</span>
                <span className="font-bold text-foreground">{checkoutSuccess.id}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Order Reference:</span>
                <span className="font-bold text-foreground">{checkoutSuccess.referenceNumber || 'REF-581'}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Room / Table:</span>
                <span className="font-bold text-foreground">{checkoutSuccess.roomNumber || 'N/A'}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Payment Mode:</span>
                <span className="font-bold text-foreground">{checkoutSuccess.paymentMode}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Status:</span>
                <span className="font-bold text-green-600">{checkoutSuccess.status === 'Paid' ? 'Paid' : 'Pending (Pay on Delivery)'}</span>
              </div>
              <div className="border-t border-dashed border-border/60 pt-2.5 flex justify-between text-sm font-bold">
                <span className="text-foreground">Total Amount:</span>
                <span className="text-primary">{formatCurrency(checkoutSuccess.netReceivableAmount)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setCheckoutSuccess(null);
                setIsCartOpen(false);
                setCheckoutStep('cart');
              }}
              className="w-full rounded-xl bg-primary py-3 text-xs font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98]"
            >
              Back to Restaurant Menu
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
