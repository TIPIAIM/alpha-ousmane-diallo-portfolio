"use client";
import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import type { Language } from "./content.ts";

const Form = styled.form`
  display: grid;
  gap: 13px;
  max-width: 600px;
  label {
    display: block;
    font-size: 13px;
    font-weight: 700;
    color: #d5e2eb;
    margin-bottom: 5px;
  }
  input,
  textarea {
    display: block;
    width: 100%;
    background: #ffffff10;
    border: 1px solid #ffffff45;
    color: #fff;
    border-radius: 2px;
    padding: 13px 14px;
    font: inherit;
    font-size: 15px;
    outline: none;
  }
  input:focus,
  textarea:focus {
    border-color: #d3ae79;
  }
  textarea {
    min-height: 135px;
    resize: vertical;
  }
  button {
    justify-self: start;
    background: #d0aa76;
    border: 0;
    color: #081522;
    font-size: 14px;
    font-weight: 800;
    padding: 13px 20px;
    min-height: 48px;
  }
  button:disabled {
    opacity: 0.65;
    cursor: wait;
  }
  .status {
    font-size: 14px;
    color: #d4e1e9;
    margin: 0;
  }
  .status.error {
    color: #ffd6c6;
  }
  .trap {
    position: absolute;
    left: -9999px;
    height: 1px;
    width: 1px;
    overflow: hidden;
  }
`;
const service = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const template = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";
export default function ContactForm({ language }: { language: Language }) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const configured = Boolean(service && template && publicKey);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!configured) {
      setStatus("error");
      setError(
        language === "fr"
          ? "Envoi indisponible : EmailJS doit être configuré. Utilisez l’adresse email ci-contre."
          : "Sending unavailable: EmailJS must be configured. Please use the email address alongside."
      );
      return;
    }
    const form = e.currentTarget,
      data = new FormData(form);
    if (String(data.get("company") || "").trim()) return;
    setStatus("sending");
    setError("");
    try {
      await emailjs.send(
        service,
        template,
        {
          from_name: String(data.get("from_name") || "").trim(),
          reply_to: String(data.get("reply_to") || "").trim(),
          subject: String(data.get("subject") || "").trim(),
          message: String(data.get("message") || "").trim(),
        },
        { publicKey }
      );
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setError(
        language === "fr"
          ? "L’envoi a échoué. Vous pouvez me contacter directement par email."
          : "Sending failed. You can contact me directly by email."
      );
    }
  }
  return (
    <Form onSubmit={submit}>
      <div className="trap" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor="from_name">
          {language === "fr" ? "Votre nom" : "Your name"}
        </label>
        <input
          id="from_name"
          name="from_name"
          required
          maxLength={100}
          autoComplete="name"
        />
      </div>
      <div>
        <label htmlFor="reply_to">Email</label>
        <input
          id="reply_to"
          name="reply_to"
          type="email"
          required
          maxLength={180}
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="subject">
          {language === "fr" ? "Objet" : "Subject"}
        </label>
        <input id="subject" name="subject" required maxLength={150} />
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
        />
      </div>
      <button disabled={status === "sending"} type="submit">
        {status === "sending"
          ? language === "fr"
            ? "Envoi…"
            : "Sending…"
          : language === "fr"
          ? "Envoyer le message ↗"
          : "Send message ↗"}
      </button>
      {!configured && (
        <p className="status">
          {language === "fr"
            ? "Formulaire prêt à être activé avec vos identifiants EmailJS."
            : "Form ready to activate with your EmailJS identifiers."}
        </p>
      )}
      {status === "success" && (
        <p role="status" className="status">
          {language === "fr"
            ? "Votre message a été envoyé."
            : "Your message has been sent."}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="status error">
          {error}
        </p>
      )}
    </Form>
  );
}
