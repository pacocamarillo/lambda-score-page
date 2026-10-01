import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/cms";
import { site } from "@/content/site";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/${post.slug}`,
    type: "article",
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  const reserved = new Set([
    "nosotros",
    "servicios",
    "renta-de-equipo",
    "quiero-cotizar",
    "events",
    "event",
    "resultados-eventos-lambdascore",
    "blog",
    "trifecta",
    "encuesta-lambdascore",
    "studio",
    "api",
  ]);
  if (reserved.has(slug)) notFound();

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        datePublished: post.publishedAt,
        description: post.description,
        image: absoluteUrl(post.image),
        author: { "@type": "Organization", name: site.name },
        mainEntityOfPage: absoluteUrl(`/${post.slug}`),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: site.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: absoluteUrl("/blog"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.cardTitle,
            item: absoluteUrl(`/${post.slug}`),
          },
        ],
      },
    ],
  };

  return (
    <article className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container max-w-3xl">
        <p className="text-sm muted">
          <Link href="/blog">Blog</Link> / {post.cardTitle}
        </p>
        <h1 className="display mt-4 text-[clamp(2rem,5vw,3.4rem)]">
          {post.title}
        </h1>
        <p className="muted mt-3">
          {new Date(post.publishedAt).toLocaleDateString("es-MX", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <div className="relative mt-8 aspect-[16/9] overflow-hidden">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
        <div className="prose-like mt-8 space-y-4 text-lg leading-relaxed">
          {post.body.split("\n\n").map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-12 rounded-2xl bg-[color:var(--bg-deep)] p-6 text-white">
          <p className="text-lg">
            ¿Organizas una carrera? Arma meta, chip, kit e inscripción con
            nosotros.
          </p>
          <Link href="/quiero-cotizar" className="btn btn-primary mt-4">
            Cotiza tu evento
          </Link>
        </div>
      </div>
    </article>
  );
}
