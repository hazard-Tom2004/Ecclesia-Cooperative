import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const routes = ["", "/about", "/services", "/membership", "/contact"];
  return routes.map((route) => ({ url: new URL(route, base).toString(), changeFrequency: route === "" ? "monthly" : "yearly", priority: route === "" ? 1 : 0.7 }));
}
