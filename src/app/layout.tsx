import type { Metadata } from "next";
import "@fontsource-variable/cairo";
import "./globals.css";
import "./typography.css";
import { Footer, Header } from "@/components/site-shell";
import { RevealObserver } from "@/components/reveal-observer";
import { ScrollProgress } from "@/components/motion-ui";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Ecclesia Cooperative | Growing together", template: "%s | Ecclesia Cooperative" },
  description: "An agriculture-focused Christian cooperative bringing people together through practical learning, shared opportunity and community.",
  openGraph: { title: "Ecclesia Cooperative", description: "Growing a stronger agricultural future, together.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><ScrollProgress /><Header /><main>{children}</main><Footer /><RevealObserver /></body></html>;
}
