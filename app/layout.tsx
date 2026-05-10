import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { AppDrawer } from "./components/Drawer";
import { RealtimeProvider } from "@/providers/RealTimeProvider";

const roboto = Roboto({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chaosfeed.live"),
  title: {
    default: "ChaossFeed — Anonymous Real-Time Social Feed",
    template: "%s | ChaossFeed"
  },
  description: "An anonymous real-time social feed where posts self-destruct. Share chaotic thoughts, react instantly, stay anonymous forever. No login required.",
  keywords: [
    // Core
    "anonymous social media",
    "real-time feed",
    "ephemeral posts",
    "anonymous chat",
    "self destructing posts",
    "anonymous posting",
    "no login social media",
    "temporary posts",
    "live feed",
    "anonymous reactions",
    // English speaking markets
    "english anonymous chat",
    "usa anonymous chat",
    "uk anonymous chat",
    "australia anonymous chat",
    "canada anonymous chat",
    "american social media",
    // Brazil/Portuguese
    "chat anonimo",
    "rede social anonima",
    "posts temporarios",
    "chat brasil",
    "chat anonimo brasileiro",
    "feed em tempo real",
    // Spanish markets
    "chat anonimo español",
    "red social anonima",
    "chat latino",
    "posts anonimos",
    // India
    "anonymous chat india",
    "indian anonymous social media",
    // General viral/trending
    "burn after reading",
    "disappearing posts",
    "chaotic social feed",
    "anonymous thoughts",
    "real time social network",
    "no signup social media",
    "free anonymous chat",
    "stranger chat",
    "random chat online",
    "post anonymously"
  ],
  authors: [{ name: "ChaossFeed" }],
  creator: "ChaossFeed",
  publisher: "ChaossFeed",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    }
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chaosfeed.live",
    siteName: "ChaossFeed",
    title: "ChaossFeed — Anonymous Real-Time Social Feed",
    description: "Share chaotic thoughts anonymously. Posts self-destruct. No login required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ChaossFeed — Anonymous Real-Time Social Feed"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ChaossFeed — Anonymous Real-Time Social Feed",
    description: "Share chaotic thoughts anonymously. Posts self-destruct. No login required.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://chaosfeed.live"
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  },
  category: "social media"
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
        "font-sans",
        roboto.variable,
      )}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "ChaossFeed",
              "url": "https://chaosfeed.live",
              "description": "Anonymous real-time social feed where posts self-destruct",
              "applicationCategory": "SocialNetworkingApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-black h-screen w-screen overflow-x-hidden text-gray-300">
        <RealtimeProvider>
          {children}
        </RealtimeProvider>
        <AppDrawer />
        <Toaster position="top-center" richColors theme="dark" />
      </body>
    </html>
  );
}