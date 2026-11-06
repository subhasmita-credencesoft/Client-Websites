import { Leaf, Trophy } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import styles from "./AwardsSection.module.scss";

const awards = [
  {
    icon: Leaf,
    image: "/awardimg2.png",
    imageAlt: "Best Energy Conservation Enterprise award presented to Hotel The Taksonz at the 2nd Edition of Punjab Tourism Recognition",
    title: "Best Energy Conservation Enterprise",
    body: "Punjab Tourism & PHDCCI · 2nd Edition of Punjab Tourism Recognition, Dec 2025",
    description: "Honoured as Punjab's leading energy-conscious hospitality property. Powered by our advanced on-site rooftop solar power generation system, Hotel The Taksonz delivers 24/7 climate-controlled luxury across all 70 rooms and banquet halls while minimizing our carbon footprint.",
  },
  {
    icon: Trophy,
    image: "/awardimage1.png",
    imageAlt: "Award of Excellence plaque presented at the 3rd HRANI Convention by the Ministry of Tourism and HRANI",
    title: "Award of Excellence (3rd HRANI Convention)",
    body: "Ministry of Tourism (Govt. of India) & Hotel and Restaurant Association of Northern India (HRANI)",
    description: "Celebrated for setting the benchmark as the best budget business hotel in Ludhiana. Situated directly opposite Ludhiana Railway Station and steps from the wholesale markets, we combine 3-star affordability with newly renovated executive suites, fine dining, and corporate event venues.",
  },
];

export function AwardsSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`section ${compact ? "section--white" : ""}`} aria-labelledby="awards-heading">
      <div className={`container ${styles.container}`}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Institutional Excellence &amp; Sustainability</p>
          <h2 id="awards-heading">An Award-Winning Business Hotel in Ludhiana</h2>
          <p>Recognised by the Ministry of Tourism, HRANI, Punjab Tourism, and PHDCCI for our commitment to budget luxury, corporate hospitality, and green solar energy.</p>
        </div>
        <div className={styles.grid}>
          {awards.map(({ icon: Icon, image, imageAlt, title, body, description }, index) => (
            <Reveal as="article" key={title} delay={index * 0.1} className={styles.card}>
              <div className={styles.image}>
                {image ? <Photo src={image} alt={imageAlt ?? title} sizes="(min-width: 768px) 22vw, 80vw" objectFit="contain" /> : <div className={styles.trophy} aria-hidden="true"><Icon size={48} strokeWidth={1.25} /></div>}
              </div>
              <div className={styles.copy}>
                <h3>{title}</h3>
                <p className={styles.body}>{body}</p>
                <p>{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
