import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://chaosfeed.live",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: "https://chaosfeed.live/feed",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.9
    }
  ]
}