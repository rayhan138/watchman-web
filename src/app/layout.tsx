import "./globals.css";

export const metadata = {
  title: "Watchman",
  description: "Command your network. Locally.",
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
