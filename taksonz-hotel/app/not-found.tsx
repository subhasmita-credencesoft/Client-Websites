import { ButtonLink } from "@/components/ui/Button";
import { content } from "@/data/content";

export default function NotFound() {
  const c = content.notFound;
  return (
    <section className="section" style={{ minHeight: "80svh", display: "grid", alignContent: "center", paddingTop: "calc(var(--header-h) + 3rem)" }}>
      <div className="container" style={{ display: "grid", gap: "1.25rem", justifyItems: "start" }}>
        <p style={{ letterSpacing: "0.22em", textTransform: "uppercase", fontSize: "0.75rem", color: "var(--grey)" }}>{c.eyebrow}</p>
        <h1>{c.title}</h1>
        <p style={{ color: "var(--grey)", maxWidth: "46ch" }}>{c.text}</p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <ButtonLink href="/" arrow>Back to home</ButtonLink>
          <ButtonLink href="/rooms" variant="secondary">View rooms</ButtonLink>
        </div>
      </div>
    </section>
  );
}
