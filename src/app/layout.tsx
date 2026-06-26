import "./globals.css";

import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#050505',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://watchman.blinkeye.app'),
  title: "Watchman - Command your network. Locally & Securely.",
  description: "Take full control of your local network with Watchman. Monitor traffic, manage connected devices, and secure your environment—all from a beautiful dashboard.",
  alternates: {
    canonical: '/',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: "Watchman - Command your network. Locally & Securely.",
    description: "Take full control of your local network with Watchman. Monitor traffic and manage devices.",
    siteName: "Watchman",
    type: "website",
    url: '/',
    locale: 'en_US',
  },
  twitter: {
    card: "summary_large_image",
    site: "@blinkeye",
    title: "Watchman - Command your network. Locally & Securely.",
    description: "Take full control of your local network with Watchman. Monitor traffic and manage devices.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Watchman - Command your network. Locally & Securely.",
              "description": "Take full control of your local network with Watchman. Monitor traffic, manage connected devices, and secure your environment—all from a beautiful dashboard.",
              "url": "https://watchman.blinkeye.app"
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
