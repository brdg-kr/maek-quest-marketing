import type { Metadata, Viewport } from "next";
import { LocaleProvider } from "./components/LocaleProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://maek.quest"),
  title: {
    default: "MAEK | Source Material Becomes Defensible Intelligence",
    template: "%s | MAEK",
  },
  description:
    "Source-grounded intelligence systems that turn raw materials into dataset packages, knowledge graphs, and defensible work outputs.",
  keywords: [
    "evidence intelligence",
    "dataset package",
    "knowledge graph",
    "source-grounded AI",
    "defensible intelligence",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MAEK | Source Material Becomes Defensible Intelligence",
    description:
      "Turn source materials into dataset packages, knowledge graphs, and defensible work outputs.",
    url: "https://maek.quest",
    siteName: "MAEK",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MAEK | Source Material Becomes Defensible Intelligence",
    description:
      "Source-grounded intelligence systems for professional workflows.",
  },
  icons: {
    icon: "/maek-logo.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
