import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Ahmed Saaied — Product Engineer";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #080a08 0%, #101510 55%, #070807 100%)",
          color: "#f5f5f0",
          fontFamily: "sans-serif",
        }}
      >
        {/* Lime glow */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "rgba(204, 255, 51, 0.14)",
            filter: "blur(90px)",
            top: -300,
            right: -100,
          }}
        />

        {/* Bottom glow */}
        <div
          style={{
            position: "absolute",
            width: 450,
            height: 450,
            borderRadius: "50%",
            background: "rgba(204, 255, 51, 0.07)",
            filter: "blur(100px)",
            bottom: -300,
            left: 250,
          }}
        />

        {/* Border */}
        <div
          style={{
            position: "absolute",
            inset: 28,
            border: "1px solid rgba(204, 255, 51, 0.18)",
            borderRadius: 32,
          }}
        />

        {/* Top */}
        <div
          style={{
            position: "absolute",
            top: 70,
            left: 80,
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 20,
            letterSpacing: "0.18em",
            color: "#ccff33",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#ccff33",
              boxShadow: "0 0 20px rgba(204,255,51,0.8)",
            }}
          />
          Product Engineer
        </div>

        {/* AS. */}
        <div
          style={{
            position: "absolute",
            right: 70,
            top: 50,
            display: "flex",
            fontSize: 180,
            fontWeight: 900,
            letterSpacing: "-0.08em",
            lineHeight: 1,
            color: "#ccff33",
            opacity: 0.95,
          }}
        >
          AS.
        </div>

        {/* Main content */}
        <div
          style={{
            position: "absolute",
            left: 80,
            bottom: 90,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: "-0.045em",
              lineHeight: 1,
            }}
          >
            Ahmed Saaied
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 26,
              color: "#a8ada8",
              letterSpacing: "-0.01em",
            }}
          >
            Building thoughtful digital products & experiences.
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 45,
              alignItems: "center",
              gap: 12,
              fontSize: 20,
              color: "#ccff33",
              letterSpacing: "0.04em",
            }}
          >
            ahmedsaaied.space
            <span style={{ color: "#6c726c" }}>↗</span>
          </div>
        </div>

        {/* Decorative number */}
        <div
          style={{
            position: "absolute",
            right: 75,
            bottom: 65,
            display: "flex",
            fontSize: 16,
            color: "#555b55",
            letterSpacing: "0.15em",
          }}
        >
          01 / PORTFOLIO
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}