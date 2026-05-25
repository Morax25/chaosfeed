import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { AppDrawer } from "./components/Drawer";
import { RealtimeProvider } from "@/providers/RealTimeProvider";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  colorScheme: "dark",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://chaosfeed.live"),

  // Core SEO
  title: {
    default:
      "ChaossFeed - Anonymous Real-Time Social Feed | Post Instantly & Stay Anonymous",
    template: "%s | ChaossFeed - Anonymous Social Feed",
  },

  description:
    "ChaossFeed - The ultimate anonymous real-time social feed platform. Post instantly without signup, stay completely anonymous, and watch your thoughts vanish after 90 seconds. No login required. Join thousands posting live.",

  // Keywords for maximum search coverage
  keywords: [
    // Primary keywords
    "anonymous social feed",
    "anonymous posting",
    "real-time social feed",
    "live social feed",
    "ephemeral social media",
    "disappearing posts",
    "anonymous chat",

    // Secondary keywords
    "no login social media",
    "anonymous confessions",
    "anonymous thoughts",
    "anonymous discussion",
    "temporary social media",
    "self-destructing posts",
    "instant posting",
    "anonymous sharing",
    "private social network",
    "anonymous community",

    // Long-tail keywords
    "anonymous social media no signup",
    "real-time anonymous chat",
    "post anonymously online",
    "ephemeral messaging app",
    "disappearing messages social media",
    "instant anonymous posting platform",

    // Brand & viral keywords
    "chaosfeed",
    "chaos feed",
    "chaosfeed.live",
    "viral social feed",
    "trending anonymous posts",
    "anonymous trending topics",

    // Geographic & niche
    "global anonymous chat",
    "worldwide anonymous feed",
    "international social network",
    "brazil chat",
    "latin america social media",
  ],

  authors: [{ name: "ChaossFeed", url: "https://chaosfeed.live" }],
  creator: "ChaossFeed",
  publisher: "ChaossFeed",
  category: "Social Media",
  classification: "Social Networking Service",

  // Canonical and alternates
  alternates: {
    canonical: "https://chaosfeed.live",
    languages: {
      en: "https://chaosfeed.live/en",
      "pt-BR": "https://chaosfeed.live/pt-br",
      es: "https://chaosfeed.live/es",
    },
  },

  // Icons and visuals
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  },

  // Verification & Trust
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // Open Graph for Facebook, LinkedIn, etc.
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["pt_BR", "es_ES"],
    url: "https://chaosfeed.live",
    siteName: "ChaossFeed",
    title: "ChaossFeed - Anonymous Real-Time Social Feed",
    description:
      "Post instantly. Stay anonymous. Every post disappears after 90 seconds. Join the real-time anonymous revolution. No login. No account. Just pure, unfiltered thoughts.",
    images: [
      {
        url: "/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "ChaossFeed — Anonymous real-time social feed where posts disappear",
        type: "image/png",
      },
      {
        url: "/og-image-1080x1080.png",
        width: 1080,
        height: 1080,
        alt: "ChaossFeed - Post anonymously in real-time",
        type: "image/png",
      },
      {
        url: "/og-image-800x600.png",
        width: 800,
        height: 600,
        alt: "Anonymous Social Feed - ChaossFeed",
        type: "image/png",
      },
    ],
  },

  // Twitter/X Card optimization
  twitter: {
    card: "summary_large_image",
    site: "@chaosfeed",
    creator: "@chaosfeed",
    title: "ChaossFeed - Anonymous Real-Time Social Feed",
    description:
      "🔥 Post instantly. Stay anonymous. Every post disappears after 90 seconds. No login. No account. Pure unfiltered thoughts. Join thousands now.",
    images: ["/og-image-1200x630.png"],
  },

  // Additional meta tags
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ChaossFeed",
  },
};

// Comprehensive Structured Data for Google Rich Results
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    // WebApplication Schema
    {
      "@type": "WebApplication",
      "@id": "https://chaosfeed.live/#webapp",
      name: "ChaossFeed",
      alternateName: ["Chaos Feed", "chaosfeed.live", "ChaossFeed App"],
      url: "https://chaosfeed.live",
      image: {
        "@type": "ImageObject",
        url: "https://chaosfeed.live/og-image-1200x630.png",
        width: 1200,
        height: 630,
      },
      applicationCategory: "SocialNetworkingApplication",
      applicationSubCategory: "Anonymous Social Media",
      operatingSystem: ["Web", "Android", "iOS"],
      description:
        "Anonymous real-time social feed where posts disappear automatically after 90 seconds. No login required, completely anonymous posting.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      featureList: [
        "Anonymous posting without registration",
        "Real-time feed with live updates",
        "Self-destructing posts (90 seconds)",
        "No login or account required",
        "End-to-end encryption",
        "No data collection",
        "Cross-platform support",
        "Instant post publication",
        "Global reach",
        "Community moderation",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "2450",
        bestRating: "5",
        worstRating: "1",
      },
      downloadUrl: [
        "https://chaosfeed.live",
        "https://play.google.com/store/apps/details?id=com.chaosfeed",
        "https://apps.apple.com/app/chaosfeed",
      ],
      softwareVersion: "1.0",
      inLanguage: ["en", "pt-BR", "es"],
      author: {
        "@type": "Organization",
        "@id": "https://chaosfeed.live/#organization",
      },
      publisher: {
        "@type": "Organization",
        "@id": "https://chaosfeed.live/#organization",
      },
    },

    // Organization Schema
    {
      "@type": "Organization",
      "@id": "https://chaosfeed.live/#organization",
      name: "ChaossFeed",
      alternateName: "Chaos Feed",
      url: "https://chaosfeed.live",
      logo: {
        "@type": "ImageObject",
        url: "https://chaosfeed.live/logo.png",
        width: 256,
        height: 256,
      },
      description: "Anonymous real-time social feed platform",
      sameAs: [
        "https://twitter.com/chaosfeed",
        "https://instagram.com/chaosfeed",
        "https://facebook.com/chaosfeed",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Support",
        url: "https://chaosfeed.live/support",
        email: "support@chaosfeed.live",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "BR",
      },
      foundingDate: "2023",
      knowsAbout: [
        "Social Media",
        "Anonymous Communication",
        "Real-time Web Technology",
        "Privacy & Data Protection",
      ],
    },

    // Website Schema
    {
      "@type": "WebSite",
      "@id": "https://chaosfeed.live/#website",
      name: "ChaossFeed",
      url: "https://chaosfeed.live",
      image: {
        "@type": "ImageObject",
        url: "https://chaosfeed.live/og-image-1200x630.png",
      },
      description:
        "Anonymous real-time social feed where posts disappear after 90 seconds",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://chaosfeed.live/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
      inLanguage: ["en", "pt-BR", "es"],
    },

    // FAQ Schema for Rich Results
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is ChaossFeed?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ChaossFeed is an anonymous real-time social feed where you can post instantly without any login or account creation. Every post automatically disappears after 90 seconds.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need to create an account?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No! ChaossFeed requires zero sign-up. Start posting anonymously immediately without any registration or personal information.",
          },
        },
        {
          "@type": "Question",
          name: "How long do posts stay visible?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All posts on ChaossFeed are ephemeral and automatically disappear after 90 seconds. This ensures your thoughts remain truly temporary.",
          },
        },
        {
          "@type": "Question",
          name: "Is ChaossFeed truly anonymous?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. ChaossFeed is designed with privacy first. We don't collect personal data, track users, or store your IP information.",
          },
        },
        {
          "@type": "Question",
          name: "Can I access ChaossFeed on mobile?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ChaossFeed works seamlessly on all devices including smartphones, tablets, and desktops. We offer native apps for iOS and Android.",
          },
        },
      ],
    },

    // BreadcrumbList Schema
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://chaosfeed.live",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Feed",
          item: "https://chaosfeed.live/feed",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Create Post",
          item: "https://chaosfeed.live/create",
        },
      ],
    },

    // AggregateOffer for apps/downloads
    {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "0",
      highPrice: "0",
      offerCount: "3",
      offers: [
        {
          "@type": "Offer",
          name: "Web App",
          url: "https://chaosfeed.live",
          price: "0",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          name: "iOS App",
          url: "https://apps.apple.com/app/chaosfeed",
          price: "0",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          name: "Android App",
          url: "https://play.google.com/store/apps/details?id=com.chaosfeed",
          price: "0",
          priceCurrency: "USD",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        roboto.variable,
        "font-sans",
      )}
    >
      <head>
        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {/* Preconnect to critical third parties */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <meta name="bingbot" content="index,follow" />
        <meta name="googlebot-news" content="index,follow" />
        {/* Additional meta tags for virality & SEO */}
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="ChaossFeed" />

        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />

        {/* Preload critical images */}
        <link rel="preload" as="image" href="/og-image-1200x630.png" />

        {/* Open search description */}
        <link
          rel="search"
          type="application/opensearchdescription+xml"
          href="/opensearch.xml"
          title="ChaossFeed"
        />
      </head>

      <body className="min-h-full flex flex-col bg-black h-screen w-screen overflow-x-hidden text-gray-300">
        <RealtimeProvider>{children}</RealtimeProvider>
        <AppDrawer />
        <Toaster position="top-center" richColors theme="dark" />
      </body>
    </html>
  );
}
