import Container from "../ui/Container";

const primaryServices = [
  { name: "Classic massage", duration: "40 min.", price: "$64" },
  { name: "Lava stone massage", duration: "60 min.", price: "$85" },
  { name: "Tranquillity therapy", duration: "90 min.", price: "$105" },
];

const exoticServices = [
  { name: "Thai oil full body aroma massage", duration: "40 min.", price: "$64" },
  { name: "Thai traditional massage", duration: "60 min.", price: "$85" },
  { name: "Thai oil back massage", duration: "90 min.", price: "$105" },
];

const facialServices = [
  { name: "Hydrating facial treatment", duration: "40 min.", price: "$64" },
  { name: "Lifting massage facial treatment", duration: "60 min.", price: "$85" },
  { name: "Cleansing facial treatment", duration: "90 min.", price: "$105" },
];

const traditionalServices = [
  { name: "Traditional full body", duration: "40 min.", price: "$64" },
  { name: "Traditional massage", duration: "60 min.", price: "$85" },
  { name: "Oil back massage", duration: "90 min.", price: "$105" },
];

function ServiceGroup({
  title,
  items,
}: {
  title: string;
  items: { name: string; duration: string; price: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-[0.4em] text-[#1f3c44]/70">
        {title}
      </h3>
      <div className="mt-4 divide-y divide-[#1f3c44]/30 border-y border-[#1f3c44]/30">
        {items.map((item) => (
          <div key={item.name} className="flex items-center gap-6 py-4 text-sm">
            <span className="flex-1">{item.name}</span>
            <span className="w-20 text-right text-[#1f3c44]/70">
              {item.duration}
            </span>
            <span className="w-16 text-right font-semibold">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WellnessServices() {
  return (
    <section className="bg-[#f6f3ed] py-20 text-[#1f3c44]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <span className="text-xs uppercase tracking-[0.45em] text-[#1f3c44]/70">
              Our Services
            </span>
            <h2 className="mt-6 font-serif text-4xl leading-tight md:text-5xl">
              Finding your
              <br />
              inner balance
            </h2>
            <div className="mt-8 grid gap-10">
              <ServiceGroup
                title="Massages and relaxation"
                items={primaryServices}
              />
              <ServiceGroup title="Exotic massages" items={exoticServices} />
            </div>
          </div>

          <div className="space-y-6">
            <p className="max-w-sm text-sm leading-7 text-[#1f3c44]/75">
              Experience our spas in the utmost of luxury with breathtaking
              views from lakes to mountains whilst you draw energy from our
              treatments and feel the power of the surrounding nature.
            </p>
            <div className="overflow-hidden rounded-2xl bg-[#e3ddd3]">
              <img
                src="/images/spa-img.jpg"
                alt="Relaxing facial treatment"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="order-2 overflow-hidden rounded-2xl bg-[#e3ddd3] lg:order-1">
            <img
              src="/images/spa-img3.jpg"
              alt="Wellness host"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="order-1 grid gap-10 lg:order-2">
            <ServiceGroup
              title="Relaxing facial treatments"
              items={facialServices}
            />
            <ServiceGroup
              title="Traditional massages"
              items={traditionalServices}
            />
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-center">
          <p className="font-serif text-2xl md:text-3xl">
            Call us to book a service{" "}
            <span className="text-[#d38a3c]">1-800-123-4567</span>
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-[#1f3c44]/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#1f3c44] transition hover:border-[#1f3c44] hover:bg-[#1f3c44]/5"
          >
            Book now
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </Container>
    </section>
  );
}
