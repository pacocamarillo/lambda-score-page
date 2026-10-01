import Link from "next/link";
import {
  disciplines,
  serviceBlocks,
  serviceFaqs,
  servicesPage,
} from "@/content/services";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: servicesPage.seoTitle,
  description: servicesPage.seoDescription,
  path: "/servicios",
});

export default function ServiciosPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: serviceFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container">
        <h1 className="display section-title">{servicesPage.h1}</h1>
        <p className="max-w-3xl text-lg muted">{servicesPage.lead}</p>

        <div className="mt-12 grid gap-8">
          {serviceBlocks.map((block) => (
            <article
              key={block.id}
              className="grid gap-3 border-l-4 border-[color:var(--brand)] bg-white/70 p-6 md:grid-cols-[1fr_1.4fr]"
            >
              <div>
                <h2 className="display text-3xl">{block.title}</h2>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-[color:var(--brand-deep)]">
                  {block.problem}
                </p>
              </div>
              <p className="muted text-lg">{block.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-14">
          <h2 className="display text-3xl">Disciplinas</h2>
          <ul className="mt-4 grid gap-2 md:grid-cols-2">
            {disciplines.map((item) => (
              <li key={item} className="bg-white/70 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14">
          <h2 className="display text-3xl">Preguntas frecuentes</h2>
          <dl className="mt-6 grid gap-4">
            {serviceFaqs.map((faq) => (
              <div key={faq.question} className="bg-white/70 p-5">
                <dt className="font-bold">{faq.question}</dt>
                <dd className="muted mt-2">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/quiero-cotizar" className="btn btn-primary">
            Solicitar cotización
          </Link>
          <a
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost-dark"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
