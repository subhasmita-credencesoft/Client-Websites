import { homeSectionContent } from "@/lib/data/content/resort-content";
import { Grid } from "@/components/ui/grid";
import { SectionShell } from "@/components/ui/section-shell";

export function PartnerLogosSection() {
  const content = homeSectionContent.logos;

  return (
    <SectionShell className="bg-black" containerClassName="text-center">
      <div className="mx-auto max-w-[92rem] text-center">
        <p className="site-eyebrow">{content.eyebrow}</p>
        <h3 className="site-title-lg mt-3 text-white">{content.title}</h3>
        <p className="site-copy mx-auto mt-4 max-w-3xl text-white/70">
          {content.description}
        </p>
      </div>

      <Grid columns={4} gap="md" className="mx-auto mt-10 max-w-6xl">
        {content.items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="glass-panel luxury-shadow block rounded-[1.75rem] border border-white/10 px-6 py-7 text-left transition-colors hover:border-[#cba977]/50"
            data-cursor="hover"
          >
            <p className="site-eyebrow text-[#cba977]">{item.label}</p>
            <p className="site-title-md mt-4 break-words text-white md:text-[1.75rem]">{item.value}</p>
          </a>
        ))}
      </Grid>
    </SectionShell>
  );
}
