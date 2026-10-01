"use client";

import { useState } from "react";

const questions = [
  "Experiencia general trabajando con LambdaScore",
  "Claridad y agilidad de cotización y contratación",
  "Comunicación del equipo antes del evento",
  "Puntualidad y montaje el día del evento",
  "Desempeño técnico del cronometraje RFID",
  "Precisión de los resultados entregados",
  "Rapidez de entrega de resultados y certificados",
  "Trato del personal en sitio",
  "Relación calidad-precio",
  "Soporte y resolución de imprevistos",
];

const scale = [
  "Muy insat.",
  "Insat.",
  "Neutral",
  "Satisfecho",
  "Muy satisfecho",
];

export function SurveyForm() {
  const [organizer, setOrganizer] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [scores, setScores] = useState<number[]>(Array(10).fill(0));
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!organizer.trim() || !eventName.trim() || !eventDate) {
      setError("Completa organizador, evento y fecha.");
      return;
    }
    if (scores.some((score) => score < 1)) {
      setError("Responde las diez preguntas.");
      return;
    }
    setError("");
    setStatus("loading");

    try {
      const response = await fetch("/api/encuesta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organizer,
          eventName,
          eventDate,
          scores,
          comment: comment || undefined,
        }),
      });
      if (!response.ok) {
        setStatus("error");
        return;
      }
      setStatus("done");
      if (typeof window !== "undefined") {
        window.history.replaceState({}, "", "/encuesta-lambdascore?enviado=1");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-[color:var(--line)] bg-white p-8">
        <h2 className="display text-3xl">¡Gracias por tu tiempo!</h2>
        <p className="muted mt-3">
          Recibimos tu evaluación. Nos ayuda a seguir mejorando el servicio.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-[color:var(--line)] bg-white p-6 md:p-8"
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="field">
          <label htmlFor="organizer">Organizador</label>
          <input
            id="organizer"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="eventName">Evento</label>
          <input
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="eventDate">Fecha</label>
          <input
            id="eventDate"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {questions.map((question, index) => (
          <fieldset key={question}>
            <legend className="font-semibold">
              {index + 1}. {question}
            </legend>
            <div className="mt-2 flex flex-wrap gap-3">
              {scale.map((label, scoreIndex) => {
                const value = scoreIndex + 1;
                return (
                  <label key={label} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name={`q-${index}`}
                      checked={scores[index] === value}
                      onChange={() =>
                        setScores((prev) => {
                          const next = [...prev];
                          next[index] = value;
                          return next;
                        })
                      }
                    />
                    {label}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="field mt-8">
        <label htmlFor="comment">Comentario (opcional)</label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      {error ? <p className="error mt-4">{error}</p> : null}
      {status === "error" ? (
        <p className="error mt-4">
          No pudimos enviar tu solicitud. Revisa tu conexión e inténtalo de
          nuevo; tus datos siguen en el formulario.
        </p>
      ) : null}

      <button
        type="submit"
        className="btn btn-primary mt-6"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Enviando…" : "Enviar encuesta"}
      </button>
    </form>
  );
}
