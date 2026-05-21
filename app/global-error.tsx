"use client";

/**
 * Top-level error boundary — catches errors that propagate above the
 * root layout (e.g. a render error in `app/layout.tsx` itself). Must
 * include <html> and <body> because the regular layout is gone.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          background: "#f8fafc",
          color: "#0f172a",
          padding: 24,
          display: "grid",
          minHeight: "100vh",
          placeItems: "center",
        }}
      >
        <main style={{ maxWidth: 480, textAlign: "center" }}>
          <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>
            EduSaludCC
          </h1>
          <p style={{ color: "#64748b", marginBottom: 24 }}>
            Tuvimos un imprevisto técnico. Por favor recarga la página.
          </p>
          {error.digest && (
            <p style={{ color: "#94a3b8", fontSize: 12, marginBottom: 24 }}>
              Ref: <code>{error.digest}</code>
            </p>
          )}
          <button
            onClick={reset}
            style={{
              background: "#1d4ed8",
              color: "white",
              border: 0,
              padding: "10px 20px",
              borderRadius: 9999,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Reintentar
          </button>
        </main>
      </body>
    </html>
  );
}
