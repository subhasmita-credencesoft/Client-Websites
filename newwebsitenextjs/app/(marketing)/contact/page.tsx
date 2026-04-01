import Image from "next/image";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { contactPageData } from "@/lib/data/pages/mountain-info-pages";

export default function ContactPage() {
  const page = contactPageData;

  return (
    <main className="relative overflow-hidden bg-[#2d4a3e] text-white">
      <div className="noise-overlay" />
      <SiteHeader />

      <section className="relative min-h-[110svh] overflow-hidden pt-44 md:pt-48" data-section-id="contact">
        <div className="absolute inset-0" data-bg-parallax data-bg-depth="10" data-zoom-scroll>
          <Image src={page.hero.image} alt={page.hero.title} fill className="object-cover" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,164,110,0.12),transparent_38%),linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.56)_56%,rgba(0,0,0,0.92)_100%)]" />
        <div className="absolute inset-x-[8%] top-28 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[110svh] max-w-[96rem] items-start px-6 pb-8 pt-28 md:px-12 md:pb-12 md:pt-36">
          <div className="max-w-5xl" data-panel-content>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c9a46e]" data-panel-line>
              Direct Hotel Contact
            </p>
            <h1 data-section-title data-panel-line className="max-w-5xl text-4xl md:text-6xl">
              {page.hero.title}
            </h1>
            <p className="mt-5 max-w-4xl text-xl text-white/90 md:text-2xl" data-panel-line>{page.hero.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center md:px-10" data-reveal>
        <p className="text-xs font-semibold tracking-[0.2em] text-[#c9a46e]" data-reveal-child>{page.intro.eyebrow}</p>
        <h2 className="mx-auto mt-5 max-w-5xl text-3xl leading-tight md:text-4xl" data-section-title data-reveal-child>
          {page.intro.title}
        </h2>
        <p className="mx-auto mt-6 max-w-5xl text-lg leading-relaxed md:text-xl" data-reveal-child>{page.intro.body}</p>
      </section>

      {page.form ? (
        <section className="mx-auto max-w-[96rem] px-6 pb-10 pt-0 md:px-10">
          <div className="mx-auto max-w-[72rem]">
            <form className="glass-panel rounded-[2rem] p-8 md:p-10" data-card data-panel-content>
              <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.2em] text-[#c9a46e]">{page.form.eyebrow}</p>
                <h2 className="mt-3 text-3xl md:text-4xl">{page.form.title}</h2>
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/80 md:text-lg">{page.form.description}</p>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <input
                  type="text"
                  placeholder={page.form.fields.name}
                  className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-base text-white outline-none placeholder:text-white/45"
                />
                <input
                  type="email"
                  placeholder={page.form.fields.email}
                  className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-base text-white outline-none placeholder:text-white/45"
                />
                <input
                  type="tel"
                  placeholder={page.form.fields.phone}
                  className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-base text-white outline-none placeholder:text-white/45"
                />
                <input
                  type="text"
                  placeholder={page.form.fields.eventDate}
                  className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-base text-white outline-none placeholder:text-white/45"
                />
                <input
                  type="text"
                  placeholder={page.form.fields.guestCount}
                  className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-base text-white outline-none placeholder:text-white/45 md:col-span-2"
                />
                <textarea
                  placeholder={page.form.fields.message}
                  rows={6}
                  className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-base text-white outline-none placeholder:text-white/45 md:col-span-2"
                />
              </div>

              <button
                type="submit"
                className="mt-8 border border-[#c8a871] bg-[#c8a871] px-9 py-3 text-sm font-semibold uppercase tracking-wide text-black"
                data-panel-line
              >
                {page.form.submitLabel}
              </button>
            </form>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-[96rem] px-6 py-10 md:px-10">
        <div className="grid gap-8 md:grid-cols-3">
          {page.locationDetails ? (
            <article className="glass-panel rounded-[2rem] p-8" data-card data-panel-content>
              <p className="text-xs uppercase tracking-[0.2em] text-[#c9a46e]">Location</p>
              <h3 className="mt-4 text-3xl md:text-4xl">{page.locationDetails.title}</h3>
              <p className="mt-6 text-xl text-white md:text-2xl">{page.locationDetails.venue}</p>
              <p className="mt-4 text-base leading-relaxed text-white/85 md:text-lg">{page.locationDetails.description}</p>
              <p className="mt-6 text-sm uppercase tracking-[0.18em] text-[#c9a46e]">{page.locationDetails.mapLabel}</p>
            </article>
          ) : null}

          {page.officialAddress ? (
            <article className="glass-panel rounded-[2rem] p-8" data-card data-panel-content>
              <p className="text-xs uppercase tracking-[0.2em] text-[#c9a46e]">Official Address</p>
              <h3 className="mt-4 text-3xl md:text-4xl">{page.officialAddress.title}</h3>
              <div className="mt-6 space-y-2 text-base leading-relaxed text-white/85 md:text-lg">
                {page.officialAddress.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              {page.officialAddress.note ? <p className="mt-6 text-sm leading-relaxed text-white/70">{page.officialAddress.note}</p> : null}
            </article>
          ) : null}

          {page.contact ? (
            <article className="glass-panel rounded-[2rem] p-8" data-card data-panel-content>
              <p className="text-xs uppercase tracking-[0.2em] text-[#c9a46e]">Direct Contact</p>
              <h3 className="mt-4 text-3xl md:text-4xl">{page.contact.title}</h3>
              <div className="mt-6 space-y-3 text-base leading-relaxed text-white/85 md:text-lg">
                {page.contact.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </article>
          ) : null}
        </div>
      </section>

      {page.locationDetails ? (
        <section className="mx-auto max-w-[96rem] px-6 py-8 md:px-10">
          <div className="glass-panel rounded-[2rem] p-6 text-white md:p-8" data-card>
            <div className="text-center" data-reveal>
              <p className="text-xs uppercase tracking-[0.26em] text-[#b88947]">Location</p>
              <h3 className="mt-4 text-4xl md:text-5xl" data-section-title>
                Find {page.locationDetails.venue}
              </h3>
              <div className="mx-auto mt-4 h-[2px] w-16 bg-[#b88947]" />
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="overflow-hidden rounded-[1.5rem] border border-[#c9a46e]/35 bg-[#2d4338]">
                <div className="flex items-center justify-between border-b border-[#c9a46e]/20 px-5 py-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#b88947]">Google Maps</p>
                    <p className="mt-1 text-lg font-semibold text-white">{page.locationDetails.venue}</p>
                  </div>
                  {page.locationDetails.mapHref ? (
                    <a
                      href={page.locationDetails.mapHref}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-[#b88947]"
                      data-cursor="hover"
                    >
                      Open map
                    </a>
                  ) : null}
                </div>
                <div className="relative h-[24rem] md:h-[28rem]">
                  <iframe
                    src={page.locationDetails.embedSrc ?? page.locationDetails.mapHref}
                    title={`${page.locationDetails.venue} map`}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              <div className="space-y-6 rounded-[1.5rem] border border-[#c9a46e]/35 bg-[#2d4338] p-6 md:p-8" data-panel-content>
                {page.locationDetails.travelNotes?.map((group) => (
                  <div key={group.title}>
                    <h4 className="text-xl font-semibold text-white md:text-2xl" data-panel-line>{group.title}</h4>
                    <div className="mt-4 space-y-3 text-base leading-relaxed text-white/80 md:text-lg">
                      {group.items.map((item) => (
                        <p key={item} data-panel-line>{item}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-[96rem] px-6 py-10 md:px-10">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {page.cards.map((card) => (
            <article key={card.title} className="glass-panel rounded-[1.8rem] border border-white/10 px-6 py-7" data-card data-panel-content>
              <p className="text-xs uppercase tracking-[0.18em] text-[#c9a46e]">{card.label}</p>
              <h3 className="mt-4 break-words text-2xl md:text-3xl">{card.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-white/85 md:text-lg">{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[96rem] px-6 py-10 md:px-10">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-panel rounded-[2rem] p-8" data-reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-[#c9a46e]">Support</p>
            <h3 className="mt-4 text-3xl md:text-4xl" data-section-title>{page.highlights.title}</h3>
          </div>
          <div className="glass-panel rounded-[2rem] p-8" data-panel-content>
            <ul className="space-y-4 text-lg leading-relaxed text-white/85 md:text-xl">
              {page.highlights.items.map((item) => (
                <li key={item} data-panel-line>- {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {page.extraSections ? (
        <section className="mx-auto max-w-[96rem] px-6 py-4 md:px-10">
          <div className="grid gap-8 md:grid-cols-2">
            {page.extraSections.map((section) => (
              <article key={section.title} className="glass-panel rounded-[2rem] p-8" data-reveal>
                <p className="text-xs uppercase tracking-[0.2em] text-[#c9a46e]" data-reveal-child>Planning Note</p>
                <h3 className="mt-4 text-3xl md:text-4xl" data-section-title data-reveal-child>{section.title}</h3>
                <p className="mt-5 text-lg leading-relaxed text-white/85 md:text-xl" data-reveal-child>{section.body}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-10 text-center md:px-10" data-reveal>
        <div className="glass-panel rounded-[2.4rem] px-8 py-12 md:px-16 md:py-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#c9a46e]" data-reveal-child>Final Note</p>
          <h3 className="mx-auto mt-5 max-w-4xl text-3xl md:text-4xl" data-section-title data-reveal-child>
            {page.summary.title}
          </h3>
          <p className="mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-white/85 md:text-xl" data-reveal-child>{page.summary.body}</p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
