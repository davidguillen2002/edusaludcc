import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "EduSaludCC · Educar para una salud integral";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #14296b 0%, #1d4ed8 55%, #2563eb 100%)",
          color: "white",
          fontFamily:
            "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
          position: "relative",
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 380,
            height: 380,
            borderRadius: 9999,
            background: "rgba(45, 200, 138, 0.42)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: -80,
            width: 360,
            height: 360,
            borderRadius: 9999,
            background: "rgba(59, 130, 246, 0.5)",
            filter: "blur(80px)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
            }}
          >
            {/* Mini heart+book mark */}
            <svg width="42" height="42" viewBox="0 0 80 80">
              <path
                d="M42 18 C 50 14, 62 14, 70 18 L70 60 C 62 56, 50 56, 42 60 Z"
                fill="#1d4ed8"
              />
              <path
                d="M22 22 C 14 22, 10 30, 16 38 L34 56 L52 38 C 58 30, 54 22, 46 22 C 40 22, 36 26, 34 30 C 32 26, 28 22, 22 22 Z"
                fill="#22a578"
              />
              <path
                d="M12 40 L22 40 L26 32 L30 48 L34 36 L38 42 L46 42 L50 36 L54 44 L62 40 L70 40"
                fill="none"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: -0.5,
            }}
          >
            EduSaludCC
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 980,
            }}
          >
            Educar para una salud integral.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.78)",
              maxWidth: 920,
              lineHeight: 1.3,
            }}
          >
            Charlas personalizadas · Programas institucionales · Chequeos preventivos
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          <div style={{ fontSize: 22, color: "rgba(255,255,255,0.85)" }}>
            Quito · Pichincha · Ecuador
          </div>
          <div
            style={{
              fontSize: 18,
              padding: "10px 18px",
              borderRadius: 9999,
              background: "rgba(33, 171, 117, 0.95)",
              fontWeight: 600,
            }}
          >
            Solicitar propuesta →
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
