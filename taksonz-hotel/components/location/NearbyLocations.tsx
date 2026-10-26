"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  Clock,
  Compass,
  ExternalLink,
  Footprints,
  GraduationCap,
  LayoutGrid,
  Search,
  ShoppingBag,
  Table,
  Train,
  Trees,
} from "lucide-react";
import { nearbyCategories, nearbyPlaces, type NearbyPlace } from "@/data/location";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./NearbyLocations.module.scss";

function getCategoryIcon(cat: NearbyPlace["category"]) {
  switch (cat) {
    case "Transport":
      return <Train size={14} aria-hidden />;
    case "Heritage":
      return <Clock size={14} aria-hidden />;
    case "Shopping":
      return <ShoppingBag size={14} aria-hidden />;
    case "Commercial & Parks":
      return <Trees size={14} aria-hidden />;
    case "Institutions":
      return <GraduationCap size={14} aria-hidden />;
    default:
      return <Building2 size={14} aria-hidden />;
  }
}

export function NearbyLocations() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const filteredPlaces = useMemo(() => {
    return nearbyPlaces.filter((p) => {
      const matchesCat = activeCategory === "All" || p.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCat;

      const matchesQuery =
        p.name.toLowerCase().includes(query) ||
        p.importance.toLowerCase().includes(query) ||
        p.distance.toLowerCase().includes(query) ||
        p.highlights.some((h) => h.toLowerCase().includes(query));

      return matchesCat && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className={styles.section}>
      {/* Top Bar: Search & View Toggle */}
      <div className={styles.topBar}>
        <div className={styles.searchWrap}>
          <Search size={16} aria-hidden />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search landmarks, markets, transit, railway..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search nearby localities and landmarks"
          />
        </div>

        <div className={styles.viewToggle} aria-label="View format">
          <button
            type="button"
            className={viewMode === "grid" ? styles.active : ""}
            onClick={() => setViewMode("grid")}
            aria-label="Cards view"
          >
            <LayoutGrid size={15} />
            <span>Cards</span>
          </button>
          <button
            type="button"
            className={viewMode === "table" ? styles.active : ""}
            onClick={() => setViewMode("table")}
            aria-label="Table view"
          >
            <Table size={15} />
            <span>Table</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <ul className={styles.categoryBar} role="tablist" aria-label="Location categories">
        {nearbyCategories.map((cat) => (
          <li key={cat}>
            <button
              type="button"
              className={[styles.catBtn, activeCategory === cat ? styles.active : ""].join(" ")}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>

      {/* Grid Cards View */}
      {viewMode === "grid" ? (
        filteredPlaces.length > 0 ? (
          <ul className={styles.grid}>
            {filteredPlaces.map((place, index) => {
              const isDoorstep = place.distance.toLowerCase().includes("at the hotel");
              const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapQuery)}`;

              return (
                <Reveal
                  as="li"
                  key={place.name}
                  delay={(index % 3) * 0.08}
                  className={[styles.card, place.highlight ? styles.highlighted : ""].join(" ")}
                >
                  <div className={styles.cardMedia}>
                    <Photo
                      src={place.image}
                      alt={place.name}
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                    <div className={styles.overlayTop}>
                      <span className={styles.catBadge}>
                        {getCategoryIcon(place.category)}
                        {place.category}
                      </span>
                      <span
                        className={[
                          styles.distBadge,
                          isDoorstep ? styles.doorstep : "",
                        ].join(" ")}
                      >
                        <Compass size={13} aria-hidden />
                        {place.distance}
                      </span>
                    </div>
                  </div>

                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{place.name}</h3>
                    <p className={styles.cardDesc}>{place.importance}</p>

                    <div className={styles.tagList}>
                      {place.highlights.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className={styles.cardFooter}>
                      <span className={styles.travelTime}>
                        <Footprints size={14} aria-hidden />
                        {place.travelMode}
                      </span>
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.mapBtn}
                      >
                        <span>Directions</span>
                        <ExternalLink size={12} aria-hidden />
                      </a>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        ) : (
          <div className={styles.emptyState}>
            <p>No nearby locations matched &ldquo;{searchQuery}&rdquo;. Try another search term.</p>
          </div>
        )
      ) : (
        /* Structured Table View */
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Area / Locality</th>
                <th scope="col">Approximate Distance</th>
                <th scope="col">Main Importance & Highlights</th>
                <th scope="col">Estimated Travel</th>
                <th scope="col">Map</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlaces.length > 0 ? (
                filteredPlaces.map((place) => {
                  const isDoorstep = place.distance.toLowerCase().includes("at the hotel");
                  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapQuery)}`;

                  return (
                    <tr key={place.name}>
                      <td>
                        <div className={styles.placeCell}>
                          <div className={styles.tableThumb}>
                            <Photo
                              src={place.image}
                              alt=""
                              decorative
                              sizes="56px"
                            />
                          </div>
                          <div>
                            <strong>{place.name}</strong>
                            <span>{place.category}</span>
                          </div>
                        </div>
                      </td>
                      <td className={styles.distCell}>
                        <span className={[styles.distTag, isDoorstep ? styles.doorstep : ""].join(" ")}>
                          {place.distance}
                        </span>
                      </td>
                      <td className={styles.importanceCell}>{place.importance}</td>
                      <td className={styles.modeCell}>{place.travelMode}</td>
                      <td className={styles.actionCell}>
                        <a
                          href={mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.mapBtn}
                        >
                          <span>Directions</span>
                          <ExternalLink size={12} aria-hidden />
                        </a>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className={styles.emptyState}>
                    No locations matched &ldquo;{searchQuery}&rdquo;.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
