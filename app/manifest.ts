import type { MetadataRoute } from "next"
export default function manifest(): MetadataRoute.Manifest {
  return { name: "Ahmed Saaied — Software Developer", short_name: "Ahmed Saaied", description: "Mobile, full-stack, and product design work by Ahmed Saaied.", start_url: "/", display: "standalone", background_color: "#080a08", theme_color: "#d8ff45", icons: [{ src: "/favicon-96.png", sizes: "96x96", type: "image/png" }, { src: "/favicon-192.png", sizes: "192x192", type: "image/png" }] }
}
