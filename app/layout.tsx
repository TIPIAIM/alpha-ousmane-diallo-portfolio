import type { Metadata } from "next";
import "./globals.css";
import StyledRegistry from "./styled-registry";

export const metadata: Metadata = {
  title: "Alpha Ousmane Diallo — Développeur full-stack",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased"><StyledRegistry>{children}</StyledRegistry></body>
    </html>
  );
}
