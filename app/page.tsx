import { PortfolioExperience } from "@/components/portfolio-experience";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ahmed Saaied",
    url: "https://ahmedsaaied.space",
    jobTitle: "Product Engineer",
    description:
      "Product-minded developer crafting high-performance mobile apps, web systems, and thoughtful digital experiences.",

    sameAs: [
      "https://www.linkedin.com/in/ahmed-saaied-904a23372",
    ],

    knowsAbout: [
      "Software Engineering",
      "Product Engineering",
      "Web Development",
      "Mobile Development",
      "React",
      "Next.js",
      "TypeScript",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <PortfolioExperience />
    </>
  );
}