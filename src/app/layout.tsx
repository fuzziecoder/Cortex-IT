import type { Metadata } from "next";
import { Michroma } from "next/font/google";
import "./globals.css";

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: ["400"],
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
      className={`${michroma.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
