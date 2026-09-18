import { ImageResponse } from "next/og"

export const alt = "Ahmed Saaied — Software Developer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#070907", color: "#f3f1ea", padding: "68px 78px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", background: "radial-gradient(circle at 78% 45%, rgba(216,255,69,.16), transparent 28%), linear-gradient(rgba(216,255,69,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(216,255,69,.06) 1px, transparent 1px)", backgroundSize: "auto, 64px 64px, 64px 64px" }} />
      <div style={{ position: "absolute", top: 48, right: 65, width: 390, height: 390, display: "flex", border: "1px solid rgba(216,255,69,.28)", borderRadius: "50%" }} />
      <div style={{ position: "absolute", top: 151, right: 168, width: 184, height: 184, display: "flex", border: "1px solid rgba(216,255,69,.35)", borderRadius: "50%", boxShadow: "0 0 90px rgba(216,255,69,.12)" }} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 23, fontWeight: 700 }}>
          <span>AS<span style={{ color: "#d8ff45" }}>.</span></span>
          <span style={{ color: "#d8ff45", fontSize: 16, letterSpacing: 3 }}>DESIGN ↔ ENGINEERING</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 780 }}>
          <span style={{ color: "#aaa99f", fontSize: 20, letterSpacing: 4, marginBottom: 18 }}>AHMED SAAIED · CAIRO</span>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 80, lineHeight: .94, letterSpacing: -5, fontWeight: 800 }}>
            <span>Software developer.</span>
            <span style={{ color: "#d8ff45", fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400 }}>Product thinker.</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "#aaa99f", fontSize: 18 }}>
          <span>Mobile · Full-stack · UI/UX</span><span>ahmedsaaied.space</span>
        </div>
      </div>
    </div>,
    size,
  )
}
