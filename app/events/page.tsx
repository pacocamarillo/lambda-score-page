import Link from "next/link";
import { EventCard } from "@/components/event-card";
import { homeCopy } from "@/content/site";
import { getEvents } from "@/lib/cms";
import { upcomingEvents } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Eventos | LambdaScore",
  description:
    "Próximas carreras con cronometraje e inscripción LambdaScore en el centro de México.",
  path: "/events",
});

export default async function EventsPage() {
  const events = await getEvents();
  const upcoming = upcomingEvents(events, 20);

  return (
    <section className="section">
      <div className="container">
        <h1 className="display section-title">Eventos</h1>
        <p className="muted text-lg">
          Carreras próximas con inscripción externa. También puedes revisar{" "}
          <Link href="/resultados-eventos-lambdascore" className="underline">
            resultados
          </Link>
          .
        </p>
        {upcoming.length === 0 ? (
          <p className="mt-8 muted">{homeCopy.emptyEvents}</p>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
