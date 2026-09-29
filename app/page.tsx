"use client";
import { useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import {
  ArrowDown,
  ArrowUpRight,
  Mail,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  Sun,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { experience, cvDescriptions, type Language, type Project } from "./content";
import {
  CONTENT_EVENT,
  defaults,
  readContent,
  type Article,
  type PortfolioContent,
} from "./local-content";
import EntryLoader from "./entry-loader";
import ScrambleText from "./scramble-text";
import { Seo } from "./seo";
import { useSound } from "./use-sound";

const rise = keyframes`from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}`;
const drift = keyframes`50%{transform:translateY(-12px) scale(1.04)}`;
const marquee = keyframes`to{transform:translateX(-50%)}`;
const Global = createGlobalStyle`
 :root{--navy:#081522;--ink:#132638;--gold:#c09a65;--muted:#60707e;--line:#dce4e8;--surface:#fff;--surface-alt:#f5f8f9;--card:#fff;--soft:#45596a;--dim:#61717d;--modal:#fff;--filter-border:#cbd7dd}html[data-theme="dark"]{color-scheme:dark;--ink:#e8f1f5;--muted:#adbfcb;--line:#365061;--surface:#0d2030;--surface-alt:#10283a;--card:#172f42;--soft:#bdccd5;--dim:#a9bdc9;--modal:#142c3e;--filter-border:#507084}
 *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font:16px/1.6 Arial,Helvetica,sans-serif;color:var(--ink);background:var(--surface);transition:background .3s,color .3s}button,a{font:inherit}button{cursor:pointer}a{text-decoration:none;color:inherit}section{scroll-margin-top:78px}::selection{background:#d7b582;color:#081522}:focus-visible{outline:2px solid #d3aa76;outline-offset:4px}
 [data-reveal]{opacity:0;transform:translateY(34px);transition:opacity .7s ease,transform .7s cubic-bezier(.2,.75,.3,1)}[data-reveal].in-view{opacity:1;transform:none}
 @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*:before,*:after{animation-duration:.01ms!important;transition-duration:.01ms!important}[data-reveal]{opacity:1;transform:none}}
`;
const Wrap = styled.div`
  width: min(1200px, calc(100% - 56px));
  margin: auto;
  @media (max-width: 650px) {
    width: calc(100% - 36px);
  }
`;
const Head = styled.header`
  height: 76px;
  position: fixed;
  inset: 0 0 auto;
  z-index: 30;
  background: #081522d9;
  color: #fff;
  backdrop-filter: blur(18px);
  border-bottom: 1px solid #ffffff25;
  @media (max-width: 650px) {
    height: 66px;
  }
`;
const HeadIn = styled(Wrap)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;
const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  white-space: nowrap;

  .brand-icon {
    display: block;
    width: 30px;
    height: 30px;
    object-fit: contain;
    flex: none;
  }

  .brandtext {
    color: white;
    font-size: 14px;
  }

  @media (max-width: 520px) {
    .brand-icon {
      width: 34px;
      height: 34px;
    }

    .brandtext {
      display: none;
    }
  }
`;


const Nav = styled.nav<{ $open: boolean }>`
  display: flex;
  gap: 22px;
  align-items: center;
  a {
    font-size: 13px;
    font-weight: 700;
    color: #d4e0e8;
    white-space: nowrap;
    &:hover {
      color: #e7bd80;
    }
  }
  @media (max-width: 1060px) {
    display: ${(p) => (p.$open ? "flex" : "none")};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #0a2031;
    padding: 25px;
    flex-direction: column;
    align-items: flex-start;
  }
`;
const Lang = styled.button`
  border: 1px solid #ffffff70;
  background: transparent;
  color: #fff;
  padding: 7px 9px;
  font-size: 12px;
  font-weight: 800;
  white-space: nowrap;
  span {
    opacity: 0.5;
  }
  span.active {
    opacity: 1;
    color: #e8ba7c;
  }
`;
const Hamburger = styled.button`
  display: none;
  background: none;
  color: #fff;
  border: 0;
  padding: 4px;
  @media (max-width: 1060px) {
    display: flex;
  }
`;
const Hero = styled.section`
  min-height: min(840px, 100svh);
  background: #071522;
  color: #fff;
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 145px 0 105px;
  @media (max-width: 750px) {
    min-height: 730px;
    padding: 120px 0 75px;
  }
`;
const HeroImage = styled.div`
  position: absolute;
  z-index: -2;
  inset: -20px;
  background: url("/images/architecture.png") center/cover;
  animation: ${drift} 14s ease-in-out infinite;
  @media (max-width: 750px) {
    background-position: 60% center;
  }
`;
const HeroShade = styled.div`
  position: absolute;
  z-index: -1;
  inset: 0;
  background: linear-gradient(
      90deg,
      #071522 4%,
      #071522e8 35%,
      #0715227a 68%,
      #07152225
    ),
    linear-gradient(0deg, #071522d9, transparent 45%);
  @media (max-width: 750px) {
    background: linear-gradient(90deg, #071522e8, #0715229e),
      linear-gradient(0deg, #071522, transparent 70%);
  }
`;
const HeroGrid = styled(Wrap)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  align-items: end;
  gap: 50px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
const Eyebrow = styled.p`
  color: #e7bc82;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin: 0 0 23px;
`;
const Title = styled.h1`
  font-size: clamp(50px, 6.4vw, 92px);
  line-height: 1.03;
  letter-spacing: -0.068em;
  margin: 0;
  max-width: 850px;
  animation: ${rise} 0.9s both;
  em {
    font-style: normal;
    color: #e7bd89;
  }
  @media (max-width: 650px) {
    font-size: clamp(45px, 11vw, 67px);
  }
`;
const Lead = styled.p`
  font-size: clamp(18px, 1.8vw, 22px);
  line-height: 1.6;
  color: #d2dce4;
  max-width: 700px;
  margin: 28px 0 35px;
  animation: ${rise} 0.9s 0.15s both;
`;
const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  animation: ${rise} 0.9s 0.3s both;
`;
const Btn = styled.a<{ $outline?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 50px;
  padding: 12px 20px;
  background: ${(p) => (p.$outline ? "transparent" : "#d0aa76")};
  border: 1px solid ${(p) => (p.$outline ? "#aebfc9" : "#d0aa76")};
  color: ${(p) => (p.$outline ? "white" : "#081522")};
  font-size: 14px;
  font-weight: 800;
  transition: transform 0.25s, background 0.25s;
  &:hover {
    transform: translateY(-4px);
    background: ${(p) => (p.$outline ? "#ffffff1a" : "#e6bd84")};
  }
  svg {
    width: 17px;
  }
`;
const Code = styled.aside`
  border: 1px solid #ffffff48;
  background: #071a2acb;
  backdrop-filter: blur(18px);
  box-shadow: 0 25px 55px #0005;
  padding: 18px 22px;
  font: 13px/2 monospace;
  color: #bed8e4;
  animation: ${rise} 0.9s 0.5s both;
  .dots {
    border-bottom: 1px solid #ffffff30;
    margin: -4px 0 16px;
    padding-bottom: 10px;
    color: #ba9461;
  }
  b {
    color: #e6bb7f;
    font-weight: 400;
  }
  em {
    font-style: normal;
    color: #8dcedc;
  }
  @media (max-width: 900px) {
    display: none;
  }
`;
const Scroll = styled.a`
  position: absolute;
  bottom: 28px;
  left: max(28px, calc((100vw - 1200px) / 2));
  color: #adbfc9;
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  display: flex;
  gap: 9px;
  align-items: center;
  svg {
    width: 15px;
    animation: ${drift} 2s ease-in-out infinite;
  }
`;
const Strip = styled.div`
  overflow: hidden;
  background: #102638;
  color: #cbd6df;
  .run {
    display: flex;
    width: max-content;
    animation: ${marquee} 28s linear infinite;
  }
  .item {
    padding: 16px 34px;
    border-right: 1px solid #ffffff25;
    font-size: 12px;
    letter-spacing: 0.17em;
    font-weight: 800;
  }
  @media (prefers-reduced-motion: reduce) {
    .run {
      animation: none;
      flex-wrap: wrap;
    }
  }
`;
const Section = styled.section<{ $tone?: "light" | "dark" }>`
  padding: 112px 0;
  background: ${(p) =>
    p.$tone === "light"
      ? "var(--surface-alt)"
      : p.$tone === "dark"
      ? "#091b2b"
      : "var(--surface)"};
  color: ${(p) => (p.$tone === "dark" ? "white" : "var(--ink)")};
  @media (max-width: 700px) {
    padding: 75px 0;
  }
`;
const SectionHead = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 55px;
  align-items: end;
  margin-bottom: 44px;
  @media (max-width: 750px) {
    display: block;
    margin-bottom: 30px;
  }
`;
const Kicker = styled.span`
  color: #b68d57;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.18em;
`;
const H2 = styled.h2`
  font-size: clamp(35px, 4.3vw, 56px);
  line-height: 1.13;
  letter-spacing: -0.055em;
  margin: 12px 0 0;
`;
const Intro = styled.p`
  font-size: 18px;
  line-height: 1.7;
  color: var(--muted);
  margin: 0;
  @media (max-width: 750px) {
    margin-top: 18px;
  }
`;
const About = styled.div`
  display: grid;
  grid-template-columns: 1.35fr 0.65fr;
  gap: 70px;
  border-top: 1px solid var(--line);
  padding-top: 35px;
  p {
    font-size: 18px;
    color: var(--soft);
    margin: 0 0 18px;
  }
  aside {
    border-left: 2px solid #c5a06c;
    padding-left: 24px;
  }
  .label {
    font-size: 11px;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: #9a7548;
    font-weight: 800;
  }
  strong {
    display: block;
    font-size: 17px;
    line-height: 1.5;
    margin: 8px 0 24px;
  }
  @media (max-width: 750px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;
const Banner = styled.div`
  height: 300px;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
  background: #112536;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(0.8);
    transition: transform 0.8s;
  }
  &:hover img {
    transform: scale(1.04);
  }
  span {
    position: absolute;
    left: 25px;
    bottom: 20px;
    color: white;
    font-size: 12px;
    letter-spacing: 0.14em;
    font-weight: 800;
    text-transform: uppercase;
    text-shadow: 0 2px 10px #000;
  }
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;
const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0 0 22px;
  button {
    border: 1px solid var(--filter-border);
    background: transparent;
    color: var(--ink);
    padding: 8px 15px;
    font-size: 13px;
    font-weight: 800;
    transition: background 0.2s, color 0.2s, transform 0.2s;
  }
  & button:hover {
    transform: translateY(-2px);
  }
  button[aria-pressed="true"] {
    background: #102b3f;
    border-color: #102b3f;
    color: #fff;
  }
`;
const ArticleCard = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  background: var(--card);
  border: 1px solid var(--line);
  padding: 28px;
  color: var(--ink);
  transition: transform 0.25s, border-color 0.25s;
  &:hover {
    transform: translateY(-4px);
    border-color: #c4a06d;
  }
  .meta {
    color: #a27b4a;
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  h3 {
    font-size: 23px;
    margin: 13px 0 8px;
  }
  p {
    color: var(--dim);
    margin: 0;
  }
`;
const Card = styled.button`
  text-align: left;
  display: flex;
  flex-direction: column;
  min-height: 335px;
  width: 100%;
  background: var(--card);
  color: var(--ink);
  border: 1px solid var(--line);
  padding: 30px;
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
  &:hover {
    transform: translateY(-6px);
    border-color: #bea27c;
    box-shadow: 0 18px 40px #10263817;
  }
  .visual {
    position: relative;
    height: 190px;
    overflow: hidden;
    margin: -30px -30px 24px;
    background: #102638;
  }
  .visual img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .65s cubic-bezier(.2,.8,.2,1);
  }
  .visual::after {
    content: "";
    position: absolute;
    inset: 45% 0 0;
    background: linear-gradient(transparent, #071522a8);
    pointer-events: none;
  }
  .visual-label {
    position: absolute;
    z-index: 1;
    bottom: 13px;
    left: 16px;
    max-width: calc(100% - 32px);
    color: white;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .08em;
    text-transform: uppercase;
    text-shadow: 0 1px 8px #0008;
  }
  &:hover .visual img { transform: scale(1.055); }
  .meta {
    display: flex;
    justify-content: space-between;
    color: #a67d4d;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 800;
  }
  .number {
    font-size: 45px;
    line-height: 1;
    color: #e1e9ed;
    margin-top: 24px;
    font-weight: 800;
  }
  .cat {
    color: #a77f4b;
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 800;
    margin-top: 15px;
  }
  h3 {
    font-size: 25px;
    letter-spacing: -0.04em;
    line-height: 1.25;
    margin: 8px 0 12px;
  }
  p {
    color: var(--dim);
    margin: 0 0 20px;
  }
  .bottom {
    margin-top: auto;
    border-top: 1px solid var(--line);
    padding-top: 15px;
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    font-weight: 800;
  }
  @media (max-width: 700px) {
    min-height: 310px;
    padding: 24px;
    .visual { margin: -24px -24px 22px; height: 170px; }
  }
`;
const Skills = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;
const Skill = styled.div`
  border-top: 2px solid #233b4d;
  padding: 22px 0;
  transition: padding-left 0.25s, border-color 0.25s;
  &:hover {
    padding-left: 10px;
    border-color: #c49f6a;
  }
  h3 {
    font-size: 19px;
    margin: 0 0 12px;
  }
  p {
    color: var(--dim);
    margin: 0;
  }
`;
const Row = styled.article`
  display: grid;
  grid-template-columns: 190px 1fr;
  gap: 40px;
  padding: 28px 0;
  border-bottom: 1px solid var(--line);
  time {
    color: #a27b4a;
    font-size: 13px;
    font-weight: 800;
  }
  h3 {
    font-size: 20px;
    margin: 0 0 5px;
  }
  b {
    font-size: 14px;
    color: var(--dim);
  }
  p {
    color: var(--dim);
    margin: 8px 0 0;
  }
  @media (max-width: 650px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;
const Cv = styled.div`
  background: #102739;
  color: white;
  padding: 48px 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  h2 {
    font-size: 31px;
    letter-spacing: -0.04em;
    margin: 0 0 7px;
  }
  p {
    color: #bbcbd4;
    margin: 0;
  }
  @media (max-width: 700px) {
    display: block;
    padding: 28px;
    a {
      margin-top: 20px;
    }
  }
`;
const Certifications = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  .certificate { min-width: 0; perspective: 1100px; }
  .certificate-button {
    display: block;
    width: 100%;
    height: 310px;
    padding: 0;
    border: 0;
    border-radius: 18px;
    background: transparent;
    color: inherit;
    cursor: pointer;
    text-align: left;
  }
  .certificate-button:focus-visible { outline: 3px solid #b68d57; outline-offset: 5px; }
  .certificate-inner {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform .7s cubic-bezier(.2,.7,.2,1);
  }
  @media (hover: hover) { .certificate-button:hover .certificate-inner { transform: rotateY(180deg); } }
  .certificate-button[aria-pressed='true'] .certificate-inner { transform: rotateY(180deg); }
  .certificate-face {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    border-radius: 18px;
    overflow: hidden;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    box-shadow: 0 12px 32px #07182718;
  }
  .certificate-front { background: #102739; color: white; justify-content: center; }
  .certificate-back {
    background: #102739;
    color: #f5f3ee;
    border: 1px solid #dfb980;
    padding: 25px;
    transform: rotateY(180deg);
    justify-content: center;
  }
  .certificate-visual {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    text-align: center;
    padding: 26px;
    background: linear-gradient(135deg, #102739, #1a4051);
    color: #e6c896;
    font-size: clamp(19px, 2vw, 26px);
    font-weight: 700;
    letter-spacing: -.03em;
  }
  .certificate-visual img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: #fff;
  }
  .certificate-visual:has(img) span { display: none; }
  .certificate-title { position: relative; display: block; align-self: center; max-width: calc(100% - 34px); padding: 13px 18px; border-radius: 8px; background: #071827d9; color: white; font-size: 19px; font-weight: 700; line-height: 1.35; text-align: center; text-wrap: balance; box-shadow: 0 6px 24px #07182750; }
  .certificate-meta { color: #e6c896; font-size: 12px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; }
  .certificate-back h3 { font-size: 20px; line-height: 1.3; margin: 12px 0; }
  .certificate-back p { line-height: 1.6; margin: 0; color: #d5e0e5; font-size: 14px; }
  .certificate-hint { margin-top: 18px; color: #e6c896; font-size: 12px; }
  @media (max-width: 950px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 620px) { grid-template-columns: 1fr; }
  @media (prefers-reduced-motion: reduce) { .certificate-inner { transition: none; } }
`;
const certifications = [
  { id: 'nodejs', title: 'Node.js', issuer: 'The Linux Foundation', date: 'Juin 2025', enDate: 'June 2025', fr: 'Bases et bonnes pratiques du développement backend avec Node.js : JavaScript côté serveur, gestion des modules et création d’applications performantes.', en: 'Backend development fundamentals and best practices with Node.js: server-side JavaScript, modules and performant applications.' },
  { id: 'meetings', title: 'Leading High-Performance Working Group Meetings', issuer: 'Microsoft Learn', date: 'Novembre 2024', enDate: 'November 2024', fr: 'Animation de réunions efficaces, coordination d’équipes de travail et amélioration de la performance collective.', en: 'Effective meeting facilitation, team coordination and collective performance.' },
  { id: 'responsible-ai', title: 'Responsible Generative AI', issuer: 'Microsoft Learn', date: 'Novembre 2024', enDate: 'November 2024', fr: 'Utilisation responsable de l’intelligence artificielle générative : éthique, sécurité, fiabilité et bonnes pratiques.', en: 'Responsible use of generative AI: ethics, security, reliability and best practices.' },
  { id: 'typescript-variables', title: 'Initiation et déclaration des variables en TypeScript', enTitle: 'TypeScript fundamentals and variable declarations', issuer: 'Microsoft Learn', date: 'Novembre 2024', enDate: 'November 2024', fr: 'Fondamentaux de TypeScript : déclaration des variables, typage statique et structuration du code.', en: 'TypeScript fundamentals: variable declarations, static typing and code structure.' },
  { id: 'typescript-interfaces', title: 'Implémentation d’interfaces en TypeScript', enTitle: 'Implementing interfaces in TypeScript', issuer: 'Microsoft Learn', date: 'Novembre 2024', enDate: 'November 2024', fr: 'Conception d’interfaces TypeScript, définition de contrats de données et amélioration de la maintenabilité du code.', en: 'Designing TypeScript interfaces and data contracts to improve code maintainability.' },
  { id: 'cybersecurite', title: 'Systèmes d’information et cybersécurité', enTitle: 'Information systems and cybersecurity', issuer: 'SecNumAcadémie', date: '2024', enDate: '2024', fr: 'Quatre modules MOOC sur la cybersécurité, la protection des systèmes d’information, les bonnes pratiques numériques, la gestion des risques et la sensibilisation aux menaces.', en: 'Four MOOC modules on cybersecurity, information system protection, digital best practices, risk management and threat awareness.' },
  { id: 'access', title: 'Microsoft Office Access', issuer: 'Formation Microsoft Office Access', date: 'Février à mai 2020', enDate: 'February to May 2020', fr: 'Création et gestion de bases de données, tables, formulaires, requêtes et états pour organiser et suivre les informations.', en: 'Creating and managing databases, tables, forms, queries and reports to organize and track information.' },
];
function CertificateVisual({ id, title, language }: { id: string; title: string; language: Language }) {
  const [available, setAvailable] = useState(true);
  return <div className="certificate-visual">
    <span aria-hidden="true">{language === 'fr' ? 'Certificat' : 'Certificate'}</span>
    {available && <img src={`/images/certifications/${id}.avif`} alt={`${language === 'fr' ? 'Certificat' : 'Certificate'} : ${title}`} loading="lazy" onError={() => setAvailable(false)} />}
  </div>;
}
function CertificateCard({ certificate, language }: { certificate: typeof certifications[number]; language: Language }) {
  const [flipped, setFlipped] = useState(false);
  const title = language === 'en' && 'enTitle' in certificate ? certificate.enTitle! : certificate.title;
  return <article className="certificate" data-reveal>
    <button type="button" className="certificate-button" aria-pressed={flipped} aria-label={`${title} — ${language === 'fr' ? 'Afficher ou masquer la description' : 'Show or hide description'}`} onClick={() => setFlipped(value => !value)}>
      <div className="certificate-inner">
        <div className="certificate-face certificate-front">
          <CertificateVisual id={certificate.id} title={title} language={language} />
          <span className="certificate-title">{title}</span>
        </div>
        <div className="certificate-face certificate-back">
          <span className="certificate-meta">{certificate.issuer} · {language === 'fr' ? certificate.date : certificate.enDate}</span>
          <h3>{title}</h3>
          <p>{certificate[language]}</p>
          <span className="certificate-hint">{language === 'fr' ? 'Touchez pour revenir ↺' : 'Tap to flip back ↺'}</span>
        </div>
      </div>
    </button>
  </article>;
}
const Contact = styled.div`
  display: grid;
  gap: 26px;
  border-top: 1px solid #ffffff35;
  padding-top: 32px;
  margin-top: 50px;
  p {
    color: #b9c8d2;
    font-size: 18px;
    margin: 0;
  }
  .contact-actions {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
  }
  .contact-action {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 24px;
    min-height: 148px;
    padding: 22px;
    border: 1px solid #ffffff35;
    border-radius: 16px;
    color: #f5f3ee;
    background: #ffffff0b;
    overflow-wrap: anywhere;
    transition: transform .2s, border-color .2s, background .2s;
    &:hover, &:focus-visible {
      transform: translateY(-3px);
      border-color: #dfb980;
      background: #ffffff16;
    }
    &:focus-visible { outline: 2px solid #dfb980; outline-offset: 3px; }
    strong { font-size: 20px; }
    span { color: #c3d0d8; font-size: 14px; }
    .contact-icon {
      width: 46px;
      height: 46px;
      display: grid;
      place-items: center;
      border-radius: 13px;
      color: #e6c896;
      background: #dfb9801b;
      transition: transform .25s, background .25s;
    }
    &:hover .contact-icon, &:focus-visible .contact-icon { transform: translateY(-3px) rotate(-8deg); background: #dfb98030; }
    .contact-label { display: flex; align-items: center; gap: 14px; }
  }
  @media (max-width: 750px) {
    .contact-actions { grid-template-columns: 1fr; }
    .contact-action { min-height: 112px; gap: 12px; }
  }
  @media (prefers-reduced-motion: reduce) { .contact-icon { transition: none; } }
`;
const Footer = styled.footer`
  background: #06121e;
  color: #9fb0bc;
  padding: 24px 0;
  font-size: 13px;
  ${Wrap} {
    display: flex;
    justify-content: space-between;
    gap: 15px;
  }
  @media (max-width: 600px) {
    ${Wrap} {
      display: block;
    }
  }
`;
const Overlay = styled.div`
  position: fixed;
  z-index: 50;
  inset: 0;
  background: #06121edb;
  backdrop-filter: blur(7px);
  padding: 20px;
  display: grid;
  place-items: center;
  animation: ${rise} 0.2s both;
`;
const Modal = styled.div`
  position: relative;
  background: var(--modal);
  color: var(--ink);
  width: min(1040px, 100%);
  max-height: min(92dvh, 1100px);
  border-radius: 18px;
  scroll-behavior: smooth;
  scrollbar-gutter: stable;
  overflow: auto;
  padding: clamp(22px, 4vw, 46px);
  box-shadow: 0 35px 100px #0008;
  animation: ${rise} 0.35s both;
  h2 {
    font-size: clamp(28px, 4vw, 42px);
    letter-spacing: -0.04em;
    line-height: 1.15;
    margin: 12px 45px 12px 0;
  }
  h3 {
    font-size: 13px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #a17c4b;
    margin: 25px 0 6px;
  }
  p {
    color: var(--dim);
    margin: 0;
  }
  .cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
  }
  .tags span {
    border: 1px solid var(--line);
    font-size: 12px;
    padding: 5px 9px;
  }
  .empty {
    padding: 17px;
    background: var(--surface-alt);
    border: 1px dashed var(--line);
    font-size: 14px;
    color: var(--dim);
  }
  .gallery {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
    margin-top: 18px;
  }
  .gallery figure { margin: 0; min-width: 0; background: var(--surface-alt); border: 1px solid var(--line); border-radius: 12px; overflow: hidden; transition: border-color .25s, transform .25s; }
  .gallery figure:hover { border-color: var(--gold); transform: translateY(-2px); }
  .gallery figure:first-child { grid-column: 1 / -1; }
  .gallery a { display: block; overflow: hidden; background: #102638; }
  .gallery img { display: block; width: 100%; height: 230px; object-fit: contain; transition: transform .45s; }
  .gallery figure:first-child img { height: clamp(230px, 42vw, 430px); object-fit: contain; }
  .gallery a:hover img { transform: scale(1.025); }
  .gallery figcaption { padding: 12px 16px 15px; color: var(--soft); font-size: 13px; line-height: 1.5; }
  .gallery figcaption span { color: #a17c4b; font-weight: 800; margin-right: 10px; }
  @media (max-width: 650px) { .cols { grid-template-columns: 1fr; gap: 0; } .gallery { grid-template-columns: 1fr; } .gallery figure:first-child { grid-column: auto; } .gallery img { height: auto; max-height: 370px; object-fit: contain; } }
  .links {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 25px;
  }
  .links a {
    background: #102739;
    color: #fff;
    padding: 10px 15px;
    font-size: 13px;
    font-weight: 800;
  }
  @media (max-width: 650px) {
    padding: 25px;
    .cols {
      grid-template-columns: 1fr;
      gap: 0;
    }
  }
`;
const Close = styled.button`
  position: sticky;
  top: 0;
  float: right;
  z-index: 2;
  background: #102739;
  color: white;
  border: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  box-shadow: 0 5px 20px #0005;
  display: grid;
  place-items: center;
`;

const labels = {
  fr: {
    nav: [
      "Accueil",
      "À propos",
      "Projets",
      "Compétences",
      "Expérience",
      "Certifications",
      "CV",
      "Contact",
    ],
    eyebrow: "Développeur full-stack · Applications métiers",
    headline: "Des systèmes numériques",
    accent: "pensés pour le réel.",
    lead: "Je conçois des plateformes métiers et des outils de gestion pour simplifier les processus, structurer les données et accompagner la transformation numérique.",
    explore: "Explorer mes projets",
    download: "Télécharger mon CV",
    scroll: "Défiler pour découvrir",
    about: "À propos",
    aboutIntro:
      "À l’intersection du développement logiciel, des systèmes d’information et des besoins opérationnels.",
    about1:
      "Développeur full-stack formé en MIAGE et en informatique, réseaux et multimédia, je poursuis actuellement un master professionnel en cybersécurité. Je travaille sur la digitalisation des procédures et la création de plateformes métiers, avec une attention particulière à la structuration des données et à l’expérience utilisateur.",
    about2:
      "Mes projets récents portent notamment sur les environnements judiciaires, la gestion d’un cabinet d’avocats et les services numériques. Mon activité au FADES et mon engagement entrepreneurial au sein de Tiptam Code nourrissent cette approche : concevoir des interfaces claires et des processus traçables, adaptés au travail réel des organisations.",
    education: "Formation",
    other: "Autres diplômes",
    projects: "Projets sélectionnés",
    projectsIntro:
      "Des applications conçues autour de besoins concrets : gestion, traçabilité, accès à l’information et efficacité des équipes.",
    case: "Voir l’étude de cas",
    imageNote:
      "Les captures des projets apparaissent dès que leurs fichiers sont ajoutés localement.",
    skills: "Compétences",
    skillsIntro:
      "Un socle technique mis au service de produits utiles et d’interfaces soignées.",
    experience: "Expérience",
    experienceIntro:
      "Une expérience de terrain dans la gestion des systèmes d’information et la transformation des processus.",
    cvTitle: "Mon parcours, en détail.",
    cvText:
      "Formation, réalisations, expériences et certifications dans le CV complet.",
    contact: "Un projet métier à concevoir ou une plateforme à faire évoluer ?",
    contactText:
      "Écrivez-moi pour parler de votre besoin, de vos contraintes et des prochaines étapes.",
    contactHint: "Choisissez le moyen de contact qui vous convient. Quelques lignes sur votre projet m’aideront à vous répondre utilement.",
    whatsapp: "Discuter sur WhatsApp",
    email: "Envoyer un e-mail",
    call: "Appeler directement",
    write: "M’écrire",
    problem: "Problème",
    solution: "Solution",
    role: "Mon rôle",
    features: "Fonctionnalités",
    results: "Résultats",
    tech: "Technologies",
    screens: "Captures d’écran",
    screensMissing:
      "Ajoutez les captures autorisées dans public/images/projects/, puis indiquez leurs chemins dans app/content.ts.",
    projectLink: "Voir le projet",
    github: "Profil GitHub",
    close: "Fermer",
  },
  en: {
    nav: [
      "Home",
      "About",
      "Projects",
      "Skills",
      "Experience",
      "Certifications",
      "Résumé",
      "Contact",
    ],
    eyebrow: "Full-stack developer · Business applications",
    headline: "Digital systems",
    accent: "built for real work.",
    lead: "I design business platforms and management tools that simplify processes, organize data and support digital transformation.",
    explore: "Explore projects",
    download: "Download résumé",
    scroll: "Scroll to explore",
    about: "About",
    aboutIntro:
      "Where software development, information systems and operational needs meet.",
    about1:
      "A full-stack developer with a background in MIAGE and computing, networks and multimedia, I am currently pursuing a professional master’s degree in cybersecurity. I work on digitizing procedures and building business platforms, with particular attention to data structure and user experience.",
    about2:
      "My recent projects include court workflows, law firm management and digital services. My work at FADES and entrepreneurial role at Tiptam Code inform this approach: building clear interfaces and traceable processes suited to how organizations actually work.",
    education: "Education",
    other: "Other degrees",
    projects: "Selected projects",
    projectsIntro:
      "Applications designed around real needs: management, traceability, access to information and team efficiency.",
    case: "Read case study",
    imageNote:
      "Project screenshots appear as soon as their local files are added.",
    skills: "Skills",
    skillsIntro:
      "A technical foundation in service of useful products and considered interfaces.",
    experience: "Experience",
    experienceIntro:
      "Hands-on experience with information systems and process transformation.",
    cvTitle: "My background in detail.",
    cvText:
      "Education, projects, experience and certifications in the full résumé.",
    contact:
      "Building a business application or evolving an existing platform?",
    contactText:
      "Get in touch to discuss your needs, constraints and next steps.",
    contactHint: "Choose the contact option that suits you. A few lines about your project will help me give you a useful reply.",
    whatsapp: "Chat on WhatsApp",
    email: "Send an email",
    call: "Call directly",
    write: "Email me",
    problem: "Problem",
    solution: "Solution",
    role: "My role",
    features: "Key features",
    results: "Results",
    tech: "Technologies",
    screens: "Screenshots",
    screensMissing:
      "Add approved screenshots to public/images/projects/, then list their paths in app/content.ts.",
    projectLink: "View project",
    github: "GitHub profile",
    close: "Close",
  },
} as const;
const extra = {
  fr: {
    all: "Tous",
    filter: "Filtrer les projets",
    empty: "Aucun projet dans cette catégorie.",
    articles: "Articles",
    articlesIntro: "Notes et analyses publiées depuis cet appareil.",
    read: "Lire l’article",
    soundOn: "Désactiver les sons",
    soundOff: "Activer les sons",
    admin: "Administration locale",
  },
  en: {
    all: "All",
    filter: "Filter projects",
    empty: "No projects in this category.",
    articles: "Articles",
    articlesIntro: "Notes and articles published from this device.",
    read: "Read article",
    soundOn: "Mute sounds",
    soundOff: "Enable sounds",
    admin: "Local admin",
  },
} as const;
const sectionIds = [
  "accueil",
  "apropos",
  "projets",
  "competences",
  "experience",
  "certifications",
  "cv",
  "contact",
];
const skills = [
  [
    "Front-end",
    "Front-end",
    "React, TypeScript, Vite, JavaScript, HTML5, CSS3, Styled-components, React Router, Framer Motion, Zustand",
  ],
  [
    "Back-end & API",
    "Back-end & API",
    "Node.js, Express.js, API REST, JWT, Socket.IO, Nodemailer",
  ],
  [
    "Données & médias",
    "Data & media",
    "MongoDB, Mongoose, Cloudinary, Multer, Recharts, Chart.js",
  ],
  [
    "Qualité & déploiement",
    "Quality & deployment",
    "Git/GitHub, Vitest, Cypress, Vercel, Render",
  ],
  [
    "Systèmes métiers",
    "Business systems",
    "ERP, tableaux de bord, rapports, notifications",
    "ERP, dashboards, reports, notifications",
  ],
  [
    "Approche transverse",
    "Cross-functional work",
    "Analyse des besoins, UI/UX design, coordination de projets numériques",
    "Requirements analysis, UI/UX design, digital project coordination",
  ],
];

export default function Home() {
  const [language, setLanguage] = useState<Language>("fr"),
    [menuOpen, setMenuOpen] = useState(false),
    [selected, setSelected] = useState<Project | null>(null),
    [progress, setProgress] = useState(0);
  const [content, setContent] = useState<PortfolioContent>(defaults),
    [filter, setFilter] = useState("Tous"),
    [selectedArticle, setSelectedArticle] = useState<Article | null>(null),
    [dark, setDark] = useState(false),
    [themeReady, setThemeReady] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null),
    c = labels[language],
    x = extra[language],
    sound = useSound();
  const articles = content.articles.filter((a) => a.published);
  const filters = [
    "Tous",
    "React",
    "LegalTech",
    "ERP",
    "Justice",
    ...new Set(content.projects.map((p) => p.category.fr).filter(Boolean)),
  ];
  const visible =
    filter === "Tous"
      ? content.projects
      : content.projects.filter(
          (p) =>
            p.tech.includes(filter) ||
            p.category.fr.toLowerCase().includes(filter.toLowerCase()) ||
            p.category.en.toLowerCase().includes(filter.toLowerCase())
        );
  useEffect(() => {
    const update = () => setContent(readContent());
    update();
    window.addEventListener("storage", update);
    window.addEventListener(CONTENT_EVENT, update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener(CONTENT_EVENT, update);
    };
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  useEffect(() => {
    try {
      setDark(localStorage.getItem("portfolio-dark-mode") === "true");
    } catch {}
    setThemeReady(true);
  }, []);
  useEffect(() => {
    if (!themeReady) return;
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try {
      localStorage.setItem("portfolio-dark-mode", String(dark));
    } catch {}
  }, [dark, themeReady]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (items) =>
        items.forEach((i) => {
          if (i.isIntersecting) {
            i.target.classList.add("in-view");
            obs.unobserve(i.target);
          }
        }),
      { threshold: 0.08 }
    );
    document.querySelectorAll("[data-reveal]").forEach((x) => obs.observe(x));
    return () => obs.disconnect();
  }, [language, filter, content]);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max > 0 ? (scrollY / max) * 100 : 0);
    };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!selected && !selectedArticle) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelected(null);
        setSelectedArticle(null);
      }
    };
    addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = old;
      removeEventListener("keydown", key);
    };
  }, [selected, selectedArticle]);
  return (
    <>
      <Global />
      <EntryLoader language={language} />
      <Seo
        language={language}
        title={selected?.title[language] ?? selectedArticle?.title[language]}
        description={
          selected?.summary[language] ?? selectedArticle?.excerpt[language]
        }
      />
      <div
        onPointerOver={(e) => {
          if ((e.target as Element).closest?.("a,button")) sound.play("hover");
        }}
        onClick={(e) => {
          if ((e.target as Element).closest?.("a,button")) sound.play("click");
        }}
      >
        <a
          href="#main"
          style={{
            position: "absolute",
            top: -100,
            left: 10,
            zIndex: 100,
            background: "white",
            padding: 8,
          }}
          onFocus={(e) => (e.currentTarget.style.top = "10px")}
          onBlur={(e) => (e.currentTarget.style.top = "-100px")}
        >
          {language === "fr" ? "Aller au contenu" : "Skip to content"}
        </a>
        <div
          aria-hidden
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: `${progress}%`,
            height: 3,
            background: "#d2aa76",
            zIndex: 100,
          }}
        />
        <Head>
          <HeadIn>
          <Brand href="#accueil" aria-label="Alpha Ousmane Diallo — accueil">
  <img
    className="brand-icon"
    src="/images/brand.png"
    alt=""
    width={34}
    height={34}
  />
  <span className="brandtext">ALPHA OUSMANE DIALLO</span>
</Brand>
            <Nav
              $open={menuOpen}
              aria-label={
                language === "fr" ? "Navigation principale" : "Main navigation"
              }
            >
              {c.nav.map((x, i) => (
                <a
                  href={`#${sectionIds[i]}`}
                  key={i}
                  onClick={() => setMenuOpen(false)}
                >
                  {x}
                </a>
              ))}
              <a href="#articles" onClick={() => setMenuOpen(false)}>
                {x.articles}
              </a>
            </Nav>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                type="button"
                onClick={() => setDark(!dark)}
                aria-label={
                  dark
                    ? language === "fr"
                      ? "Activer le mode clair"
                      : "Enable light mode"
                    : language === "fr"
                    ? "Activer le mode sombre"
                    : "Enable dark mode"
                }
                aria-pressed={dark}
                style={{
                  display: "grid",
                  placeItems: "center",
                  background: "none",
                  border: "1px solid #ffffff66",
                  color: "white",
                  height: 34,
                  width: 34,
                }}
              >
                {dark ? <Sun size={17} /> : <Moon size={17} />}
              </button>
              <button
                type="button"
                onClick={sound.toggle}
                aria-label={sound.enabled ? x.soundOn : x.soundOff}
                title={sound.enabled ? x.soundOn : x.soundOff}
                style={{
                  display: "grid",
                  placeItems: "center",
                  background: "none",
                  border: "1px solid #ffffff66",
                  color: "white",
                  height: 34,
                  width: 34,
                }}
              >
                {sound.enabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
              </button>
              <Lang
                aria-label={
                  language === "fr" ? "Changer de langue" : "Switch language"
                }
                onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
              >
                <span className={language === "fr" ? "active" : ""}>FR</span> /{" "}
                <span className={language === "en" ? "active" : ""}>EN</span>
              </Lang>
              <Hamburger
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X /> : <Menu />}
              </Hamburger>
            </div>
          </HeadIn>
        </Head>
        <main id="main">
          <Hero id="accueil">
            <HeroImage />
            <HeroShade />
            <HeroGrid>
              <div>
                <Eyebrow>{c.eyebrow}</Eyebrow>
                <Title>
                  <ScrambleText key={language + "hero1"} text={c.headline} />
                  <br />
                  <em>
                    <ScrambleText key={language + "hero2"} text={c.accent} />
                  </em>
                </Title>
                <Lead>{c.lead}</Lead>
                <Actions>
                  <Btn href="#projets">
                    {c.explore}
                    <ArrowUpRight />
                  </Btn>
                  <Btn
                    $outline
                    href="/CV-Alpha-Ousmane-Diallo-2026.pdf"
                    download
                  >
                    {c.download}
                    <ArrowDown />
                  </Btn>
                </Actions>
              </div>
              <Code aria-label="Technical focus">
                <div className="dots">
                  ● ● ● <span style={{ float: "right" }}>architecture.ts</span>
                </div>
                <b>const mission = {"{"}</b>
                <br />
                <em> focus: ['ERP', 'LegalTech'],</em>
                <br />
                <em> approach: 'build for people',</em>
                <br />
                <em> location: 'Conakry'</em>
                <br />
                <b>{"}"};</b>
              </Code>
            </HeroGrid>
            <Scroll href="#apropos">
              {c.scroll}
              <ArrowDown />
            </Scroll>
          </Hero>
          <Strip aria-hidden>
            <div className="run">
              {[0, 1].map((n) => (
                <div style={{ display: "flex" }} key={n}>
                  {[
                    "REACT",
                    "NODE.JS",
                    "ERP",
                    "LEGALTECH",
                    "MONGODB",
                    "SYSTEMS DESIGN",
                    "FULL-STACK",
                  ].map((s) => (
                    <span className="item" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </Strip>
          <Section id="apropos">
            <Wrap>
              <SectionHead data-reveal>
                <div>
                  <Kicker>
                    01 / {language === "fr" ? "Profil" : "Profile"}
                  </Kicker>
                  <H2>
                    <ScrambleText key={language + "about"} text={c.about} />
                  </H2>
                </div>
                <Intro>{c.aboutIntro}</Intro>
              </SectionHead>
              <About data-reveal>
                <div>
                  <p>{c.about1}</p>
                  <p>{c.about2}</p>
                </div>
                <aside>
                  <span className="label">{c.education}</span>
                  <strong>
                    {language === "fr" ? "Master professionnel en cybersécurité" : "Professional master’s in cybersecurity"}
                    <br />
                    {language === "fr" ? "En cours · inscription en 2026" : "In progress · enrolled in 2026"}
                  </strong>
                  <strong>
                    Master Informatique, Réseaux et Multimédia
                    <br />
                    SUP2i · Casablanca · Maroc
                  </strong>
                  <span className="label">{c.other}</span>
                  <strong>
                    {language === "fr"
                      ? "Licence informatique, option développement full-stack"
                      : "Bachelor’s in computing, full-stack development"}{" "}
                    · SUP2i · Casablanca · Maroc
                    <br />
                    <br />
                    {language === "fr"
                      ? "Licence en MIAGE"
                      : "Bachelor’s in MIAGE"}{" "}
                    · Université de Labé · Guinée
                    <br />
                    <br />
                    {language === "fr"
                      ? "Baccalauréat du second degré · sciences mathématiques"
                      : "Secondary school baccalaureate · mathematics and science"}{" "}
                    · Groupe scolaire La Francophonie · Guinée
                  </strong>
                </aside>
              </About>
            </Wrap>
          </Section>
          <Section id="projets" $tone="light">
            <Wrap>
              <SectionHead data-reveal>
                <div>
                  <Kicker>
                    02 / {language === "fr" ? "Réalisations" : "Work"}
                  </Kicker>
                  <H2>
                    <ScrambleText
                      key={language + "projects"}
                      text={c.projects}
                    />
                  </H2>
                </div>
                <Intro>{c.projectsIntro}</Intro>
              </SectionHead>
              <Banner data-reveal>
                <img
                  src="/images/systems.png"
                  alt={
                    language === "fr"
                      ? "Composition abstraite de structures interconnectées"
                      : "Abstract composition of connected structures"
                  }
                  loading="lazy"
                />
                <span>
                  {language === "fr"
                    ? "Concevoir · Structurer · Déployer"
                    : "Design · Structure · Deliver"}
                </span>
              </Banner>
              <Filters role="group" aria-label={x.filter}>
                {filters.map((f) => (
                  <button
                    type="button"
                    key={f}
                    aria-pressed={filter === f}
                    onClick={() => setFilter(f)}
                  >
                    {f === "Tous" ? x.all : f}
                  </button>
                ))}
              </Filters>
              <Grid>
                {visible.map((p) => (
                  <Card
                    type="button"
                    key={p.id}
                    data-reveal
                    onClick={() => setSelected(p)}
                    aria-label={`${c.case} : ${p.title[language]}`}
                  >
                    {true && (
                      <div className="visual">
                        <img src={p.screenshots?.[0] || "/images/projects/illustration-projet.svg"} alt="" loading="lazy" />
                        <span className="visual-label">{p.screenshots?.[0] ? (p.captions?.[0]?.[language] || (language === "fr" ? "Aperçu du projet" : "Project preview")) : (language === "fr" ? "Illustration — capture à venir" : "Illustration — screenshot coming soon")}</span>
                      </div>
                    )}
                    <div className="meta">
                      <span>{p.date[language]}</span>
                      <ArrowUpRight size={17} />
                    </div>
                    <span className="number">{p.number}</span>
                    <span className="cat">{p.category[language]}</span>
                    <h3>{p.title[language]}</h3>
                    <p>{p.summary[language]}</p>
                    <div className="bottom">
                      {c.case}
                      <ArrowUpRight size={17} />
                    </div>
                  </Card>
                ))}
              </Grid>
              {visible.length === 0 && <p role="status">{x.empty}</p>}
              <p style={{ color: "#667887", fontSize: 14, marginTop: 24 }}>
                {c.imageNote}
              </p>
            </Wrap>
          </Section>
          <Section id="articles" $tone="light">
            <Wrap>
              <SectionHead data-reveal>
                <div>
                  <Kicker>03 / {x.articles}</Kicker>
                  <H2>
                    <ScrambleText key={language + "blog"} text={x.articles} />
                  </H2>
                </div>
                <Intro>{x.articlesIntro}</Intro>
              </SectionHead>
              <Grid>
                {articles.map((a) => (
                  <ArticleCard
                    type="button"
                    key={a.id}
                    data-reveal
                    onClick={() => setSelectedArticle(a)}
                  >
                    <span className="meta">
                      {a.category} · {a.date}
                    </span>
                    <h3>{a.title[language] || a.title.fr}</h3>
                    <p>{a.excerpt[language] || a.excerpt.fr}</p>
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: 18,
                        fontWeight: 800,
                        fontSize: 13,
                      }}
                    >
                      {x.read} ↗
                    </span>
                  </ArticleCard>
                ))}
              </Grid>
              {articles.length === 0 && (
                <p style={{ color: "var(--muted)", fontSize: 18 }}>
                  {language === "fr"
                    ? "Les articles paraîtront ici."
                    : "Articles will appear here."}
                </p>
              )}
            </Wrap>
          </Section>
          <Section id="competences">
            <Wrap>
              <SectionHead data-reveal>
                <div>
                  <Kicker>04 / Expertise</Kicker>
                  <H2>
                    <ScrambleText key={language + "skills"} text={c.skills} />
                  </H2>
                </div>
                <Intro>{c.skillsIntro}</Intro>
              </SectionHead>
              <Skills>
                {skills.map((s) => (
                  <Skill data-reveal key={s[0]}>
                    <h3>{language === "fr" ? s[0] : s[1]}</h3>
                    <p>{language === "en" && s[3] ? s[3] : s[2]}</p>
                  </Skill>
                ))}
              </Skills>
            </Wrap>
          </Section>
          <Section id="experience" $tone="light">
            <Wrap>
              <SectionHead data-reveal>
                <div>
                  <Kicker>
                    05 / {language === "fr" ? "Parcours" : "Background"}
                  </Kicker>
                  <H2>
                    <ScrambleText
                      key={language + "experience"}
                      text={c.experience}
                    />
                  </H2>
                </div>
                <Intro>{c.experienceIntro}</Intro>
              </SectionHead>
              <div style={{ borderTop: "1px solid var(--line)" }}>
                {experience.map((e) => (
                  <Row data-reveal key={e.org}>
                    <time>{e.date}</time>
                    <div>
                      <h3>{e.title[language]}</h3>
                      <b>{e.org}</b>
                      <p>{e.description[language]}</p>
                    </div>
                  </Row>
                ))}
              </div>
            </Wrap>
          </Section>
          <Section id="certifications">
            <Wrap>
              <SectionHead data-reveal>
                <div>
                  <Kicker>06 / {language === 'fr' ? 'Certifications' : 'Certifications'}</Kicker>
                  <H2>{language === 'fr' ? 'Apprendre, pratiquer, progresser.' : 'Learning through practice.'}</H2>
                </div>
                <Intro>{language === 'fr' ? 'Des parcours en développement, cybersécurité et collaboration. Les visuels des certificats seront ajoutés progressivement.' : 'Training in development, cybersecurity and collaboration. Certificate images will be added progressively.'}</Intro>
              </SectionHead>
              <Certifications>
                {certifications.map((certificate) => (
                  <CertificateCard key={certificate.id} certificate={certificate} language={language} />
                ))}
              </Certifications>
            </Wrap>
          </Section>
          <Section id="cv">
            <Wrap>
              <Cv data-reveal>
                <div>
                  <h2>{c.cvTitle}</h2>
                  <p>{c.cvText}</p>
                </div>
                <Btn href="/CV-Alpha-Ousmane-Diallo-2026.pdf" download>
                  {c.download}
                  <ArrowDown />
                </Btn>
              </Cv>
            </Wrap>
          </Section>
          <Section id="contact" $tone="dark">
            <Wrap>
              <Kicker data-reveal>07 / Contact</Kicker>
              <H2 data-reveal style={{ maxWidth: 900 }}>
                <ScrambleText key={language + "contact"} text={c.contact} />
              </H2>
              <Contact data-reveal>
                <p>{c.contactText} {c.contactHint}</p>
                <div className="contact-actions">
                  <a className="contact-action" href="https://wa.me/224624138384" target="_blank" rel="noopener noreferrer" aria-label={`${c.whatsapp} : +224 624 13 83 84`}>
                    <span className="contact-label"><span className="contact-icon"><MessageCircle size={23} aria-hidden="true" /></span><strong>{c.whatsapp}</strong></span><span>+224 624 13 83 84 ↗</span>
                  </a>
                  <a className="contact-action" href="mailto:alphaousmaneousmane@gmail.com" aria-label={`${c.email} : alphaousmaneousmane@gmail.com`}>
                    <span className="contact-label"><span className="contact-icon"><Mail size={23} aria-hidden="true" /></span><strong>{c.email}</strong></span><span>alphaousmaneousmane@gmail.com ↗</span>
                  </a>
                  <a className="contact-action" href="tel:+224624138384" aria-label={`${c.call} : +224 624 13 83 84`}>
                    <span className="contact-label"><span className="contact-icon"><Phone size={23} aria-hidden="true" /></span><strong>{c.call}</strong></span><span>+224 624 13 83 84 ↗</span>
                  </a>
                </div>
              </Contact>
            </Wrap>
          </Section>
        </main>
        <Footer>
          <Wrap>
            <span>© 2026 Alpha Ousmane Diallo</span>
            <span>
              Full-stack · Conakry ·{" "}
             {/* <a href="/admin" style={{ color: "#c9aa7d" }}>
                {x.admin}
              </a>*/}
            </span>
          </Wrap>
        </Footer>
        {selected && (
          <Overlay
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setSelected(null);
            }}
          >
            <Modal role="dialog" aria-modal="true" aria-labelledby="case-title">
              <Close
                ref={closeRef}
                aria-label={c.close}
                onClick={() => setSelected(null)}
              >
                <X size={20} />
              </Close>
              <Kicker>
                {selected.date[language]} / {selected.category[language]}
              </Kicker>
              <h2 id="case-title">{selected.title[language]}</h2>
              <p>{selected.summary[language]}</p>
              {cvDescriptions[selected.id] && (
                <section aria-label={language === "fr" ? "Description complète du CV" : "Full résumé description"} style={{ background: "var(--surface-alt)", borderLeft: "3px solid var(--gold)", padding: "22px 24px", margin: "22px 0 28px" }}>
                  <h3 style={{ marginTop: 0 }}>{language === "fr" ? "Présentation détaillée du CV" : "Full description from the résumé"}</h3>
                  <p style={{ whiteSpace: "pre-line", lineHeight: 1.85, marginBottom: 0, maxWidth: "78ch" }}>{cvDescriptions[selected.id].description[language]}</p>
                  {cvDescriptions[selected.id].technologies && <p style={{ marginTop: 18, fontSize: 14, color: "var(--soft)" }}><strong>{language === "fr" ? "Technologies indiquées dans le CV : " : "Technologies listed in the résumé: "}</strong>{cvDescriptions[selected.id].technologies}</p>}
                </section>
              )}
              <div className="cols">
                <div>
                  <h3>{c.problem}</h3>
                  <p>{selected.problem[language]}</p>
                  <h3>{c.solution}</h3>
                  <p>{selected.solution[language]}</p>
                  <h3>{c.role}</h3>
                  <p>{selected.role[language]}</p>
                </div>
                <div>
                  <h3>{c.features}</h3>
                  <p>{selected.features[language]}</p>
                  <h3>{c.results}</h3>
                  <p>{selected.result[language]}</p>
                </div>
              </div>
              {selected.tech.length > 0 && <>
                <h3>{c.tech}</h3>
                <div className="tags">
                  {selected.tech.map((t) => <span key={t}>{t}</span>)}
                </div>
              </>}
              <h3 id="project-gallery">{c.screens}</h3>
              {selected.screenshots?.length ? (
                <div className="gallery" aria-label={language === "fr" ? "Captures du projet" : "Project screenshots"}>
                  {selected.screenshots.map((src, originalIndex) => ({ src, originalIndex })).filter((item, index, all) => all.findIndex(other => other.src === item.src) === index).map(({ src, originalIndex }, index) => (
                    <figure key={src}>
                      <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`${language === "fr" ? "Ouvrir la capture" : "Open screenshot"} ${index + 1}`}>
                        <img src={src} alt={`${selected.title[language]} — ${selected.captions?.[originalIndex]?.[language] || (language === "fr" ? `capture ${index + 1}` : `screenshot ${index + 1}`)}`} loading="lazy" decoding="async" />
                      </a>
                      <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{selected.captions?.[originalIndex]?.[language] || (language === "fr" ? `Capture du projet ${selected.title.fr}` : `Screenshot of ${selected.title.en}`)} <small style={{ display: "block", marginTop: 4 }}>{language === "fr" ? "Cliquer pour agrandir ↗" : "Open full size ↗"}</small></figcaption>
                    </figure>
                  ))}
                </div>
              ) : (
                <div className="empty"><img src="/images/projects/illustration-projet.svg" alt="" style={{ width: "100%", maxWidth: 520, display: "block", margin: "0 auto 14px" }} /><p>{language === "fr" ? "Illustration du domaine — captures à venir" : "Domain illustration — screenshots coming soon"}</p></div>
              )}
              <div className="links">
                {selected.link && (
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {c.projectLink} ↗
                  </a>
                )}
                <a
                  href="https://github.com/TIPIAIM"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {c.github} ↗
                </a>
              </div>
            </Modal>
          </Overlay>
        )}
        {selectedArticle && (
          <Overlay
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setSelectedArticle(null);
            }}
          >
            <Modal
              role="dialog"
              aria-modal="true"
              aria-labelledby="article-title"
            >
              <Close
                ref={closeRef}
                aria-label={c.close}
                onClick={() => setSelectedArticle(null)}
              >
                <X size={20} />
              </Close>
              <Kicker>
                {selectedArticle.category} · {selectedArticle.date}
              </Kicker>
              <h2 id="article-title">
                {selectedArticle.title[language] || selectedArticle.title.fr}
              </h2>
              <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}>
                {selectedArticle.body[language] || selectedArticle.body.fr}
              </p>
            </Modal>
          </Overlay>
        )}
      </div>
    </>
  );
}
 
