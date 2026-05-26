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

  title: {
    default:
      "ChaossFeed — Anonymous Chat & Random Chat Rooms | Talk to Strangers Instantly, No Login",
    template: "%s | ChaossFeed — Anonymous Chat & Random Stranger Chat",
  },

  description:
    "ChaossFeed is a free anonymous chat app where you can talk to strangers instantly — no login, no signup, no account. Jump into random chat rooms, share anonymous confessions, or post to the live ephemeral feed. Every post disappears in 90 seconds. The Omegle alternative built for real-time anonymous connection.",

  keywords: [
    // === HIGH VOLUME — random/stranger chat ===
    "talk to strangers",
    "chat with strangers",
    "random chat",
    "random chat online",
    "chat with random people",
    "talk to strangers online",
    "stranger chat",
    "random stranger chat",
    "online chat no registration",
    "free chat rooms no sign up",
    "chat rooms no login",
    "chat online free no registration",
    "talk to random people online",
    "meet strangers online",
    "random people chat",

    // === OMEGLE REPLACEMENT — very high volume since Omegle closed 2023 ===
    "omegle alternative",
    "omegle replacement",
    "sites like omegle",
    "omegle alternative 2026",
    "new omegle",
    "omegle chat",
    "chatroulette alternative",
    "ome tv alternative",
    "emerald chat alternative",
    "random video chat alternative",

    // === ANONYMOUS CHAT — core identity ===
    "anonymous chat",
    "anonymous chat rooms",
    "anonymous chat no login",
    "anonymous chat no signup",
    "anonymous messaging",
    "anonymous online chat",
    "free anonymous chat",
    "anonymous chat app",
    "anonymous chat website",
    "completely anonymous chat",
    "private anonymous chat",
    "chat anonymously online",

    // === RANDOM CHAT ROOMS ===
    "random chat rooms",
    "free random chat",
    "online chat rooms",
    "free chat rooms",
    "chat rooms online",
    "free online chat",
    "online chat rooms no registration",
    "free chat rooms no registration",
    "chat room no sign up",
    "instant chat rooms",

    // === ANONYMOUS CONFESSIONS & POSTS ===
    "anonymous confessions",
    "anonymous confession app",
    "anonymous posting",
    "anonymous social media",
    "anonymous social network",
    "post anonymously",
    "confess anonymously",
    "anonymous thoughts",
    "share anonymously",
    "anonymous venting",
    "vent anonymously online",

    // === EPHEMERAL / DISAPPEARING POSTS ===
    "ephemeral social media",
    "disappearing posts",
    "self-destructing messages",
    "temporary posts",
    "disappearing messages app",
    "ephemeral messaging",
    "ephemeral chat",
    "self destructing posts",

    // === NO LOGIN / NO SIGNUP POSITIONING ===
    "no login chat",
    "no sign up chat",
    "no registration chat",
    "chat without account",
    "social media without account",
    "no account required chat",
    "chat instantly no registration",

    // === REAL-TIME SOCIAL FEED ===
    "real-time social feed",
    "live social feed",
    "anonymous social feed",
    "live feed app",
    "real time chat app",
    "live chat rooms",
    "instant messaging no signup",

    // === BRAND ===
    "chaosfeed",
    "chaosfeed.live",
    "chaos feed",
    "chaossfeed",
  ],

  authors: [{ name: "ChaossFeed", url: "https://chaosfeed.live" }],
  creator: "ChaossFeed",
  publisher: "ChaossFeed",
  category: "Social Media",
  classification: "Social Networking Service",

  alternates: {
    canonical: "https://chaosfeed.live",
    languages: {
      en: "https://chaosfeed.live/en",
      "pt-BR": "https://chaosfeed.live/pt-br",
      es: "https://chaosfeed.live/es",
    },
  },

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

  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["pt_BR", "es_ES"],
    url: "https://chaosfeed.live",
    siteName: "ChaossFeed",
    title:
      "ChaossFeed — Anonymous Chat & Talk to Strangers | No Login, No Signup",
    description:
      "Jump into anonymous chat rooms, talk to strangers instantly, or post to the live ephemeral feed. No login. No account. Every post disappears in 90 seconds. The free Omegle alternative for real, unfiltered connection.",
    images: [
      {
        url: "/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "ChaossFeed — Anonymous chat & random stranger chat rooms. No login required.",
        type: "image/png",
      },
      {
        url: "/og-image-1080x1080.png",
        width: 1080,
        height: 1080,
        alt: "ChaossFeed — Talk to strangers anonymously in real-time",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@chaosfeed",
    creator: "@chaosfeed",
    title: "ChaossFeed — Anonymous Chat & Talk to Strangers | No Login",
    description:
      "🔥 Free anonymous chat rooms. Talk to strangers instantly. No login, no signup. Posts vanish in 90s. The Omegle alternative you've been looking for.",
    images: ["/og-image-1200x630.png"],
  },

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

// ── Structured Data ──────────────────────────────────────────────────────────
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    // WebApplication
    {
      "@type": "WebApplication",
      "@id": "https://chaosfeed.live/#webapp",
      name: "ChaossFeed",
      alternateName: [
        "Chaos Feed",
        "chaosfeed.live",
        "ChaossFeed Anonymous Chat",
        "ChaossFeed Random Chat",
      ],
      url: "https://chaosfeed.live",
      image: {
        "@type": "ImageObject",
        url: "https://chaosfeed.live/og-image-1200x630.png",
        width: 1200,
        height: 630,
      },
      applicationCategory: "SocialNetworkingApplication",
      applicationSubCategory: "Anonymous Chat & Random Stranger Chat",
      operatingSystem: ["Web", "Android", "iOS"],
      description:
        "ChaossFeed is a free anonymous chat app where users talk to strangers in random chat rooms with no login or signup required. It also features a real-time ephemeral social feed where every post disappears after 90 seconds. The best free Omegle alternative for anonymous connection in 2026.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      featureList: [
        "Anonymous chat rooms — no login required",
        "Talk to strangers instantly with random matching",
        "Free random chat with people worldwide",
        "Anonymous confessions and social feed",
        "Ephemeral posts that disappear after 90 seconds",
        "Auto-generated anonymous username and avatar",
        "No account, email, or phone number needed",
        "Real-time feed powered by Redis and Socket.IO",
        "Post TTL extends with community engagement",
        "Omegle alternative for text-based anonymous chat",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "2450",
        bestRating: "5",
        worstRating: "1",
      },
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

    // Organization
    {
      "@type": "Organization",
      "@id": "https://chaosfeed.live/#organization",
      name: "ChaossFeed",
      alternateName: ["Chaos Feed", "ChaossFeed Chat"],
      url: "https://chaosfeed.live",
      logo: {
        "@type": "ImageObject",
        url: "https://chaosfeed.live/logo.png",
        width: 256,
        height: 256,
      },
      description:
        "Anonymous chat platform — talk to strangers in random chat rooms with no signup required.",
      sameAs: [
        "https://twitter.com/chaosfeed",
        "https://instagram.com/chaosfeed",
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
    },

    // Website
    {
      "@type": "WebSite",
      "@id": "https://chaosfeed.live/#website",
      name: "ChaossFeed — Anonymous Chat & Random Chat Rooms",
      url: "https://chaosfeed.live",
      description:
        "Free anonymous chat app. Talk to strangers in random chat rooms with no login or signup. Anonymous social feed where posts disappear after 90 seconds. Best Omegle alternative 2026.",
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

    // FAQ — targets high-volume "People Also Ask" queries
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is ChaossFeed?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ChaossFeed is a free anonymous chat app that lets you talk to strangers in random chat rooms with no login or signup required. It also features a live ephemeral social feed where posts automatically disappear after 90 seconds.",
          },
        },
        {
          "@type": "Question",
          name: "Is ChaossFeed a good Omegle alternative?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. ChaossFeed is a free Omegle alternative for anonymous text chat. Like Omegle, no account is needed — you are instantly connected to chat rooms and strangers. Unlike Omegle, ChaossFeed also has an ephemeral social feed and auto-generated anonymous profiles.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need to create an account to use ChaossFeed?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No login or signup is required. ChaossFeed automatically generates a random anonymous username and avatar for you when you join. Your identity is stored only in your browser's local storage.",
          },
        },
        {
          "@type": "Question",
          name: "How do the anonymous chat rooms work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Click the Chat tab and instantly join any topic-based random chat room. You are identified only by your auto-generated anonymous username. Conversations are real-time and no history is stored — everything is temporary by design.",
          },
        },
        {
          "@type": "Question",
          name: "How long do posts last on ChaossFeed?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Posts on the ChaossFeed live feed start with a 90-second lifetime. Each comment from another user adds 10 seconds (up to 90 seconds maximum extension). If no one engages, the post disappears automatically — keeping the feed truly live.",
          },
        },
        {
          "@type": "Question",
          name: "Is ChaossFeed truly anonymous?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. ChaossFeed does not require any personal information. No email, phone number, or real name is ever collected. Your auto-generated anonymous profile exists only in your browser's local storage and is never linked to your identity.",
          },
        },
        {
          "@type": "Question",
          name: "What makes ChaossFeed different from other anonymous chat apps?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ChaossFeed combines two experiences: anonymous random chat rooms (talk to strangers instantly) and an ephemeral anonymous social feed (posts that self-destruct). Both are fully real-time with zero data storage — no database, just Redis for temporary state.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use ChaossFeed to share anonymous confessions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The ChaossFeed post feed is the perfect place to share anonymous thoughts, confessions, and opinions. Posts disappear after 90 seconds so nothing is permanent — making it safe to be completely honest.",
          },
        },
      ],
    },

    // BreadcrumbList
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
          name: "Anonymous Chat Rooms",
          item: "https://chaosfeed.live/chat",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Live Feed",
          item: "https://chaosfeed.live/feed",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Post Anonymously",
          item: "https://chaosfeed.live/create",
        },
      ],
    },

    // SoftwareApplication for app stores (helps Google surface it for app searches)
    {
      "@type": "SoftwareApplication",
      name: "ChaossFeed — Anonymous Chat",
      operatingSystem: "Web, iOS, Android",
      applicationCategory: "CommunicationApplication",
      description:
        "Talk to strangers in free anonymous chat rooms. No login required. Random chat, anonymous confessions, and ephemeral posts — all in one app.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "2450",
      },
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
        {/* Structured Data — JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch for analytics */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Crawler directives */}
        <meta name="bingbot" content="index,follow" />
        <meta name="googlebot-news" content="index,follow" />

        {/* PWA / mobile */}
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="ChaossFeed" />

        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Preload hero OG image */}
        <link rel="preload" as="image" href="/og-image-1200x630.png" />

        {/* OpenSearch */}
        <link
          rel="search"
          type="application/opensearchdescription+xml"
          href="/opensearch.xml"
          title="ChaossFeed Anonymous Chat"
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