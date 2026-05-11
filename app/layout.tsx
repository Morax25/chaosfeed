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
};

export const metadata: Metadata = {
  metadataBase: new URL("https://chaosfeed.live"),

  title: {
    default: "Anonymous Real-Time Social Feed | ChaossFeed",
    template: "%s | ChaossFeed",
  },

  description:
    "ChaossFeed is an anonymous real-time social feed where anyone can post instantly. No login, no account, and every post disappears automatically after 90 seconds.",

  applicationName: "ChaossFeed",

  keywords: [
    "anonymous social feed",
    "anonymous posting",
    "anonymous chat",
    "real time social feed",
    "live social feed",
    "disappearing posts",
    "ephemeral social media",
    "no login social media",
    "anonymous confessions",
    "chaosfeed",
  ],

  authors: [{ name: "ChaossFeed" }],
  creator: "ChaossFeed",
  publisher: "ChaossFeed",
  category: "social media",

  alternates: {
    canonical: "https://chaosfeed.live",
  },

  icons: {
    icon: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
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
    url: "https://chaosfeed.live",
    siteName: "ChaossFeed",
    title: "Anonymous Real-Time Social Feed | ChaossFeed",
    description:
      "Post instantly. Stay anonymous. Every post disappears after 90 seconds. No login required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ChaossFeed — Anonymous real-time social feed",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Anonymous Real-Time Social Feed | ChaossFeed",
    description:
      "Post instantly. Stay anonymous. Every post disappears after 90 seconds.",
    images: ["/og-image.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ChaossFeed",
      alternateName: ["Chaos Feed", "chaosfeed.live"],
      url: "https://chaosfeed.live",
      applicationCategory: "SocialNetworkingApplication",
      operatingSystem: "Web",
      description:
        "Anonymous real-time social feed where posts disappear automatically after 90 seconds. No login required.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Anonymous posting",
        "Real-time feed",
        "Self-destructing posts",
        "No login required",
        "No account needed",
      ],
    },
    {
      "@type": "Organization",
      name: "ChaossFeed",
      url: "https://chaosfeed.live",
    },
    {
      "@type": "WebSite",
      name: "ChaossFeed",
      url: "https://chaosfeed.live",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
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