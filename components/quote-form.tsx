"use client";

import { useMemo, useState } from "react";
import { services } from "@/content/services";
import type { EventType, ServiceId } from "@/lib/content";

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  emailConfirm: string;
  firstRace: "" | "yes" | "no";
  eventType: "" | EventType;
  services: ServiceId[];
  street: string;
  city: string;
  state: string;
  postalCode: string;
  tentativeDate: string;
  estimatedParticipants: string;
  message: string;
};

const initial: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  emailConfirm: "",
  firstRace: "",
  eventType: "",
  services: [],
  street: "",
  city: "",
  state: "",
  postalCode: "",
  tentativeDate: "",
  estimatedParticipants: "",
  message: "",
};

const eventTypes: { value: EventType; label: string }[] = [
  { value: "running", label: "Running" },
  { value: "mtb", label: "Ciclismo / MTB" },
  { value: "triathlon", label: "Triatlón" },
  { value: "swim", label: "Natación" },
  { value: "other", label: "Otro" },
];

type QuoteFormProps = {
  preselectedServices?: ServiceId[];
};

export function QuoteForm({ preselectedServices = [] }: QuoteFormProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>({
    ...initial,
    services: preselectedServices,
  });
  const [fields, setFields] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  const quotable = useMemo(
    () => services.filter((service) => service.quotable),
    [],
  );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleService(id: ServiceId) {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter((item) => item !== id)
        : [...prev.services, id],
    }));
  }

  function validateStep1() {
    const next: Record<string, string> = {};
    if (!form.firstName.trim()) next.firstName = "El nombre es obligatorio";
    if (!form.lastName.trim()) next.lastName = "Los apellidos son obligatorios";
    if (!form.phone.trim()) next.phone = "El teléfono es obligatorio";
    if (!form.email.trim() || !form.email.includes("@")) {
      next.email = "Correo inválido";
    }
    if (form.email !== form.emailConfirm) {
      next.emailConfirm = "Los correos no coinciden";
    }
    if (!form.firstRace) next.firstRace = "Indica si es tu primera carrera";
    if (!form.eventType) next.eventType = "Elige el tipo de evento";
    if (form.services.length === 0) {
      next.services = "Selecciona al menos un servicio";
    }
    setFields(next);
    return Object.keys(next).length === 0;
  }

  function validateStep2() {
    const next: Record<string, string> = {};
    if (!form.street.trim()) next.street = "La dirección es obligatoria";
    if (!form.city.trim()) next.city = "La ciudad es obligatoria";
    if (!form.state.trim()) next.state = "El estado es obligatorio";
    if (!form.postalCode.trim()) next.postalCode = "El código postal es obligatorio";
    setFields(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validateStep2()) return;

    setStatus("loading");
    setFields({});

    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
      email: form.email,
      emailConfirm: form.emailConfirm,
      firstRace: form.firstRace === "yes",
      eventType: form.eventType,
      services: form.services,
      street: form.street,
      city: form.city,
      state: form.state,
      postalCode: form.postalCode,
      tentativeDate: form.tentativeDate || undefined,
      estimatedParticipants: form.estimatedParticipants
        ? Number(form.estimatedParticipants)
        : undefined,
      message: form.message || undefined,
    };

    try {
      const response = await fetch("/api/cotizacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.status === 400 && data.fields) {
        setFields(data.fields);
        setStatus("idle");
        setStep(1);
        return;
      }
      if (!response.ok) {
        setStatus("error");
        return;
      }
      setStatus("done");
      if (typeof window !== "undefined") {
        window.history.replaceState({}, "", "/quiero-cotizar?enviado=1");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-[color:var(--line)] bg-white p-8">
        <h2 className="display text-3xl">Recibimos tu solicitud.</h2>
        <p className="muted mt-3">
          Te contactamos en menos de 24 horas.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-[color:var(--line)] bg-white p-6 md:p-8">
      <div className="mb-6 flex gap-3 text-sm font-semibold">
        <span className={step === 1 ? "text-[color:var(--brand-deep)]" : "muted"}>
          1. Contacto
        </span>
        <span className="muted">/</span>
        <span className={step === 2 ? "text-[color:var(--brand-deep)]" : "muted"}>
          2. Detalle
        </span>
      </div>

      {step === 1 ? (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="field">
            <label htmlFor="firstName">Nombre</label>
            <input
              id="firstName"
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
            />
            {fields.firstName ? <p className="error">{fields.firstName}</p> : null}
          </div>
          <div className="field">
            <label htmlFor="lastName">Apellidos</label>
            <input
              id="lastName"
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
            />
            {fields.lastName ? <p className="error">{fields.lastName}</p> : null}
          </div>
          <div className="field">
            <label htmlFor="phone">Teléfono</label>
            <input
              id="phone"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
            {fields.phone ? <p className="error">{fields.phone}</p> : null}
          </div>
          <div className="field">
            <label htmlFor="email">Correo</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
            {fields.email ? <p className="error">{fields.email}</p> : null}
          </div>
          <div className="field md:col-span-2">
            <label htmlFor="emailConfirm">Confirmar correo</label>
            <input
              id="emailConfirm"
              type="email"
              value={form.emailConfirm}
              onChange={(e) => update("emailConfirm", e.target.value)}
            />
            {fields.emailConfirm ? (
              <p className="error">{fields.emailConfirm}</p>
            ) : null}
          </div>
          <div className="field">
            <label htmlFor="firstRace">¿Es tu primera carrera como organizador?</label>
            <select
              id="firstRace"
              value={form.firstRace}
              onChange={(e) =>
                update("firstRace", e.target.value as FormState["firstRace"])
              }
            >
              <option value="">Selecciona</option>
              <option value="yes">Sí</option>
              <option value="no">No</option>
            </select>
            {fields.firstRace ? <p className="error">{fields.firstRace}</p> : null}
          </div>
          <div className="field">
            <label htmlFor="eventType">Tipo de evento</label>
            <select
              id="eventType"
              value={form.eventType}
              onChange={(e) =>
                update("eventType", e.target.value as FormState["eventType"])
              }
            >
              <option value="">Selecciona</option>
              {eventTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            {fields.eventType ? <p className="error">{fields.eventType}</p> : null}
          </div>
          <fieldset className="md:col-span-2">
            <legend className="mb-2 font-semibold">Servicios de interés</legend>
            <div className="grid gap-2">
              {quotable.map((service) => (
                <label key={service.id} className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={form.services.includes(service.id)}
                    onChange={() => toggleService(service.id)}
                  />
                  <span>{service.name}</span>
                </label>
              ))}
            </div>
            {fields.services ? <p className="error">{fields.services}</p> : null}
          </fieldset>
          <div className="md:col-span-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (validateStep1()) setStep(2);
              }}
            >
              Continuar
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="field md:col-span-2">
            <label htmlFor="street">Dirección</label>
            <input
              id="street"
              value={form.street}
              onChange={(e) => update("street", e.target.value)}
            />
            {fields.street ? <p className="error">{fields.street}</p> : null}
          </div>
          <div className="field">
            <label htmlFor="city">Ciudad</label>
            <input
              id="city"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
            />
            {fields.city ? <p className="error">{fields.city}</p> : null}
          </div>
          <div className="field">
            <label htmlFor="state">Estado</label>
            <input
              id="state"
              value={form.state}
              onChange={(e) => update("state", e.target.value)}
            />
            {fields.state ? <p className="error">{fields.state}</p> : null}
          </div>
          <div className="field">
            <label htmlFor="postalCode">Código postal</label>
            <input
              id="postalCode"
              value={form.postalCode}
              onChange={(e) => update("postalCode", e.target.value)}
            />
            {fields.postalCode ? (
              <p className="error">{fields.postalCode}</p>
            ) : null}
          </div>
          <div className="field">
            <label htmlFor="tentativeDate">Fecha tentativa (opcional)</label>
            <input
              id="tentativeDate"
              type="date"
              value={form.tentativeDate}
              onChange={(e) => update("tentativeDate", e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="estimatedParticipants">
              Participantes estimados (opcional)
            </label>
            <input
              id="estimatedParticipants"
              type="number"
              min={1}
              value={form.estimatedParticipants}
              onChange={(e) => update("estimatedParticipants", e.target.value)}
            />
          </div>
          <div className="field md:col-span-2">
            <label htmlFor="message">¿Cómo podemos ayudarte?</label>
            <textarea
              id="message"
              rows={4}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
            />
          </div>
          {status === "error" ? (
            <p className="error md:col-span-2">
              No pudimos enviar tu solicitud. Revisa tu conexión e inténtalo de
              nuevo; tus datos siguen en el formulario.
            </p>
          ) : null}
          <div className="flex flex-wrap gap-3 md:col-span-2">
            <button
              type="button"
              className="btn btn-ghost-dark"
              onClick={() => setStep(1)}
            >
              Atrás
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Enviando…" : "Enviar cotización"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
