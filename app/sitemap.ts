import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://caiotools.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const toolUrls = TOOLS.map((tool) => ({
    url: `${baseUrl}${tool.href}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...toolUrls,
  ];
}
