import { HeroFor } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import type { PageMeta } from "@/data/pages";
import type { LegalSection } from "@/data/legal";
import { site } from "@/data/site";
import styles from "./LegalPage.module.scss";

export function LegalPage({ page, sections }: { page: PageMeta; sections: LegalSection[] }) {
  return (
    <>
      <HeroFor page={page} />
      <section className="section">
        <div className="container">
          <Breadcrumbs items={[{ label: page.title }]} />
          <div style={{ height: "2.5rem" }} />

          <div className={styles.wrapper}>
            <div className={styles.headerCard}>
              <span className={styles.propertyBadge}>{site.name} · Official Policy</span>
              <p className={styles.updateDate}>Last Updated: October 2026</p>
              <p className={styles.summaryText}>
                The following document outlines the official policies, guest guidelines, and standards for {site.name}, situated on Grand Trunk Road, Ludhiana, Punjab 141008. For queries, contact our front desk at <a href={`mailto:${site.email}`}>{site.email}</a> or <a href={site.phoneHref}>{site.phone}</a>.
              </p>
            </div>

            <div className={styles.documentBody}>
              {sections.map((s, idx) => (
                <section key={s.heading} className={styles.sectionItem}>
                  <h2>
                    <span className={styles.sectionNumber}>{String(idx + 1).padStart(2, "0")}.</span> {s.heading}
                  </h2>

                  {Array.isArray(s.body) ? (
                    s.body.map((p, pIdx) => <p key={pIdx}>{p}</p>)
                  ) : (
                    <p>{s.body}</p>
                  )}

                  {s.bullets && s.bullets.length > 0 && (
                    <ul className={styles.bulletList}>
                      {s.bullets.map((b, bIdx) => (
                        <li key={bIdx}>
                          <span className={styles.bulletDot} aria-hidden>•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <div className={styles.footerNotice}>
              <h3>Have Questions About Our Policies?</h3>
              <p>
                Our front desk and reservations team are available 24/7 to assist you with any questions regarding bookings, check-in rules, or cancellation requests.
              </p>
              <div className={styles.footerContacts}>
                <a href={site.phoneHref} className={styles.contactBtn}>Call {site.phone}</a>
                <a href={`mailto:${site.email}`} className={styles.contactBtnGhost}>Email {site.email}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
