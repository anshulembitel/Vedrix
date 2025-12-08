"use client";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  console.error(error);

  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          color: "black",
          margin: 0,
        }}
      >
        <main style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 600 }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: "14px", marginTop: "4px", opacity: 0.7 }}>
            An unexpected error occurred.
          </p>

          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: "12px",
              padding: "8px 16px",
              borderRadius: "9999px",
              border: "none",
              background: "#6E4BFF",
              color: "white",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}