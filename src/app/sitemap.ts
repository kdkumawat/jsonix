import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = process.env.SITE_URL || "https://formaty.pages.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
