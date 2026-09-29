"use client";

import { useEffect } from "react";
import type { Language } from "./content.tsx";

type Props = { language: Language; title?: string; description?: string };

export function Seo({ language, title, description }: Props) {
  useEffect(() => {
    const base =
      language === "fr"
        ? "Alpha Ousmane Diallo — Développeur full-stack"
        : "Alpha Ousmane Diallo — Full-stack developer";
    const text =
      description ??
      (language === "fr"
        ? "Applications métiers, ERP, LegalTech et transformation numérique. Découvrez les projets et le parcours d’Alpha Ousmane Diallo."
        : "Business applications, ERP, LegalTech and digital transformation. Explore Alpha Ousmane Diallo’s projects and experience.");
    const fullTitle = title ? `${title} | Alpha Ousmane Diallo` : base;

    document.documentElement.lang = language;
    document.title = fullTitle;

    const setMeta = (
      attribute: "name" | "property",
      key: string,
      value: string
    ) => {
      let element = document.querySelector<HTMLMetaElement>(
        `meta[${attribute}="${key}"]`
      );
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = value;
    };

    setMeta("name", "description", text);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", text);
    setMeta("property", "og:locale", language === "fr" ? "fr_GN" : "en_US");
    setMeta("name", "twitter:card", "summary");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", text);
  }, [language, title, description]);

  return null;
}
