import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The pune resort",
    short_name: "The pune resort",
    description: "Crafting unforgettable hospitality experiences across curated villas, resorts, and boutique stays.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4EA699",
    icons: [
      {
        src: "/puneresortlogo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/puneresortlogo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
