import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

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
      <body
        suppressHydrationWarning
        className={`${outfit.variable} ${inter.variable} font-[family-name:var(--font-outfit)] bg-[#cbb3e8] text-black antialiased selection:bg-[#D4ff3f] selection:text-black`}
      >
        {/* Cinematic noise/grain overlay */}
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
