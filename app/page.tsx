import Image from "next/image";
import Link from "next/link";
import { EventCard } from "@/components/event-card";
import { VideoTabs } from "@/components/video-tabs";
import { homeCopy } from "@/content/site";
import { getEvents, getPosts } from "@/lib/cms";
import { upcomingEvents } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: homeCopy.seoTitle,
  description: homeCopy.seoDescription,
  path: "/",
});

export default async function HomePage() {
  const [events, posts] = await Promise.all([getEvents(), getPosts()]);
  const upcoming = upcomingEvents(events, 3);
  const latestPosts = [...posts]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 3);

  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden bg-[color:var(--bg-deep)] text-white">
        <Image
          src={homeCopy.heroImage}
          alt={homeCopy.heroImageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
        <div className="relative container flex min-h-[100svh] flex-col justify-end pb-16 pt-28 md:justify-center md:pb-24">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--brand)]">
            {homeCopy.brand}
          </p>
          <h1 className="display mt-4 max-w-4xl text-[clamp(2.6rem,8vw,5.6rem)]">
            {homeCopy.promise}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">{homeCopy.support}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/quiero-cotizar" className="btn btn-primary">
              {homeCopy.primaryCta}
            </Link>
            <Link href="/servicios" className="btn btn-ghost">
              {homeCopy.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="display section-title">{homeCopy.proofsTitle}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {homeCopy.proofs.map((proof) => (
              <article
                key={proof.title}
                className="border-t-4 border-[color:var(--brand)] bg-white/70 p-6"
              >
                <h3 className="display text-2xl">{proof.title}</h3>
                <p className="muted mt-3">{proof.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-xl italic text-[color:var(--ink)]">
            “{homeCopy.socialProof}”
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <h2 className="display section-title">Nuestros próximos eventos</h2>
          {upcoming.length === 0 ? (
            <p className="muted">
              {homeCopy.emptyEvents}{" "}
              <Link
                href="/resultados-eventos-lambdascore"
                className="font-semibold underline"
              >
                Ver resultados
              </Link>
            </p>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {upcoming.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[color:var(--bg-deep)] py-20 text-white">
        <div className="container grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="display text-[clamp(2rem,5vw,3.4rem)]">
              {homeCopy.terrainTitle}
            </h2>
            <p className="mt-4 max-w-xl text-white/75">
              Antenas ligeras, equipo propio y resultados en vivo aunque la meta
              esté en el bosque.
            </p>
          </div>
          <div>
            <Link href="/quiero-cotizar" className="btn btn-primary">
              Cotiza tu evento
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="display section-title">Del terreno al blog</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <article key={post.slug} className="bg-white/70 p-5">
                <p className="text-sm muted">
                  {new Date(post.publishedAt).toLocaleDateString("es-MX", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h3 className="mt-2 text-xl font-bold">
                  <Link href={`/${post.slug}`}>{post.cardTitle}</Link>
                </h3>
                <p className="muted mt-2">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <h2 className="display section-title">Últimos videos</h2>
          <VideoTabs />
        </div>
      </section>
    </>
  );
}
