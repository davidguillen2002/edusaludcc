import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url;
  const now = new Date();
  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: "daily" | "weekly" | "monthly";
  }> = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/nosotros", priority: 0.8, changeFrequency: "monthly" },
    { path: "/servicios", priority: 0.9, changeFrequency: "monthly" },
    { path: "/metodologia", priority: 0.8, changeFrequency: "monthly" },
  ];
  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
