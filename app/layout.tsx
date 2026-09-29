import type { Metadata } from "next";
import "./globals.css";
import StyledRegistry from "./styled-registry";

export const metadata: Metadata = {
  title: "Alpha Ousmane Diallo — Développeur full-stack",
  icons: {
    icon: { url: "/images/brand.png", type: "image/png" },
    shortcut: "/images/brand.png",
    apple: "/images/brand.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <StyledRegistry>{children}</StyledRegistry>
      </body>
    </html>
  );
}