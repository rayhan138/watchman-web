import "./globals.css";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Watchman - Command your network. Locally & Securely.",
  description: "Take full control of your local network with Watchman. Monitor traffic, manage connected devices, and secure your environment—all from a beautiful dashboard.",
  openGraph: {
    title: "Watchman - Command your network. Locally & Securely.",
    description: "Take full control of your local network with Watchman. Monitor traffic and manage devices.",
    siteName: "Watchman",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
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
      <body>{children}</body>
    </html>
  );
}
