import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container max-w-2xl">
        <p className="text-sm uppercase tracking-[0.18em] text-[color:var(--muted)]">
          404
        </p>
        <h1 className="display section-title mt-2">Esta ruta no existe.</h1>
        <p className="muted">
          Revisa el menú o vuelve al inicio para cotizar tu evento.
        </p>
        <Link href="/" className="btn btn-primary mt-8">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
