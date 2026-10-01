import { ResultsBrowser } from "@/components/results-browser";
import { getAllResultsByYear, getResultYears } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Resultados | LambdaScore",
  description:
    "Busca tu tiempo por nombre o dorsal. Resultados de carreras LambdaScore 2021–2026.",
  path: "/resultados-eventos-lambdascore",
});

export default async function ResultadosPage() {
  const [years, resultsByYear] = await Promise.all([
    getResultYears(),
    getAllResultsByYear(),
  ]);

  return (
    <section className="section">
      <div className="container">
        <h1 className="display section-title">Resultados</h1>
        <p className="max-w-2xl text-lg muted">
          Busca tu tiempo por nombre o dorsal. Luego filtra por año y distancia.
        </p>
        <div className="mt-8">
          <ResultsBrowser years={years} resultsByYear={resultsByYear} />
        </div>
      </div>
    </section>
  );
}
