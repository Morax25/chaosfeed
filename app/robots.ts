import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Google
      {
        userAgent: "Googlebot",
        allow: "/",
      },

      // Bing
      {
        userAgent: "Bingbot",
        allow: "/",
        crawlDelay: 1,
      },

      // All bots
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/private"],
      },

      // Block specific crawlers
      {
        userAgent: ["MJ12bot", "AhrefsBot"],
        disallow: "/",
      },
    ],

    sitemap: "https://chaosfeed.live/sitemap.xml",
    host: "https://chaosfeed.live",
  };
}
