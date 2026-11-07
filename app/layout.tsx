import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aman Patel — ML Engineer & Full-Stack Developer",
  description:
    "Final-year CSE (Data Science) student at SRM IST. ML Engineer, Full-Stack Developer, and published researcher with 98.2% accuracy on AI disease detection. 4 production-deployed projects.",
  keywords: [
    "Aman Patel",
    "ML Engineer",
    "Full Stack Developer",
    "Data Science",
    "SRM IST",
    "Next.js",
    "TensorFlow",
    "React",
    "ICCCNet 2026",
  ],
  openGraph: {
    title: "Aman Patel — ML Engineer & Full-Stack Developer",
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
