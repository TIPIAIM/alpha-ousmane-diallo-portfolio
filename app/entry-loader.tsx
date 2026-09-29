 "use client";

import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import type { Language } from "./content";

const KEY = "portfolio-entry-seen-v2";

const trace = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`;

const appear = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Frame = styled.div`
  position: fixed;
  inset: 0;
  z-index: 90;
  background: #071522;
  color: #f5f8fa;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 25px;

  .mark {
    width: clamp(72px, 18vw, 104px);
    aspect-ratio: 1;
    margin: 0 auto;
    animation: ${appear} 0.5s both;
  }

  .mark img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .name {
    font-size: clamp(20px, 3vw, 31px);
    letter-spacing: 0.16em;
    font-weight: 800;
    margin: 15px 0 22px;
    animation: ${appear} 0.55s 0.15s both;
  }

  .line {
    height: 2px;
    background: #d0aa76;
    width: min(240px, 55vw);
    margin: auto;
    transform-origin: left;
    animation: ${trace} 1.4s 0.2s both;
  }

  .label {
    font-size: 12px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #b5c7d2;
    margin-top: 22px;
    animation: ${appear} 0.5s 0.3s both;
  }

  button {
    position: absolute;
    bottom: 35px;
    right: 35px;
    color: #b5c7d2;
    background: none;
    border: 1px solid #ffffff50;
    padding: 8px 12px;
    font-size: 13px;
    cursor: pointer;
  }

  button:hover,
  button:focus-visible {
    color: #fff;
    border-color: #d0aa76;
  }

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

export default function EntryLoader({ language }: { language: Language }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (
        localStorage.getItem(KEY) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const previousOverflow = document.body.style.overflow;
      setOpen(true);
      document.body.style.overflow = "hidden";

      const timer = window.setTimeout(() => {
        setOpen(false);
        localStorage.setItem(KEY, "1");
        document.body.style.overflow = previousOverflow;
      }, 1600);

      return () => {
        window.clearTimeout(timer);
        document.body.style.overflow = previousOverflow;
      };
    } catch {
      return;
    }
  }, []);

  function skip() {
    setOpen(false);
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      // Le site reste utilisable si le stockage local est désactivé.
    }
    document.body.style.overflow = "";
  }

  if (!open) return null;

  return (
    <Frame
      role="status"
      aria-label={
        language === "fr" ? "Chargement du portfolio" : "Loading portfolio"
      }
    >
      <div>
        <div className="mark">
          <img src="/images/brand.png" alt="" width={104} height={104} />
        </div>
        <div className="name">ALPHA OUSMANE DIALLO</div>
        <div className="line" />
        <div className="label">
          {language === "fr"
            ? "Applications métiers · Full-stack"
            : "Business applications · Full-stack"}
        </div>
      </div>

      <button type="button" onClick={skip}>
        {language === "fr" ? "Passer" : "Skip"}
      </button>
    </Frame>
  );
}