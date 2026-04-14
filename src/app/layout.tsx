import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});


export const metadata: Metadata = {
  title: "Cortex — The Core of Technology",
  description:
    "Full-stack studio for apps, websites, and AI experiences. We design, build, and launch digital products that matter.",
  keywords: [
    "web development",
    "app development",
    "AI",
    "UI/UX design",
    "software studio",
    "Cortex",
  ],
  openGraph: {
    title: "Cortex — The Core of Technology",
    description:
      "Full-stack studio for apps, websites, and AI experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
