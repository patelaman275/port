import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aman",
  description:
    "Final-year CSE (Data Science) student at SRM IST. ML Engineer, Full-Stack Developer, and published researcher with 98.2% accuracy on AI disease detection. 4 production-deployed projects.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Aman",
    description:
      "Published researcher · 98.2% accuracy · 4 production-deployed projects",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='12' fill='%2322c55e'/%3E%3C/svg%3E"
        />
        <link rel="alternate icon" href="/favicon.ico" />
        <link
          rel="preconnect"
          href="https://fonts.cdnfonts.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.cdnfonts.com/css/sf-pro-display"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className="font-sans bg-[#0d1117] text-[#e6edf3] antialiased selection:bg-[#58a6ff] selection:text-[#0d1117]"
      >
        {/* Cinematic noise/grain overlay */}
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
