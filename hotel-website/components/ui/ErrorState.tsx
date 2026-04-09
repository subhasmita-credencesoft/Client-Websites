import Link from "next/link";

type ErrorStateProps = {
  eyebrow: string;
  title: string;
  copy: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function ErrorState({
  eyebrow,
  title,
  copy,
  primaryLabel = "Back Home",
  primaryHref = "/",
  secondaryLabel,
  secondaryHref,
}: ErrorStateProps) {
  return (
    <section className="flex min-h-screen items-center bg-[linear-gradient(180deg,#102d36_0%,#143b47_52%,#0f2730_100%)] px-4 py-16 text-white">
      <div className="mx-auto w-full max-w-3xl rounded-[2rem] border border-[#c49a3c]/20 bg-white/6 p-8 shadow-[0_28px_80px_rgba(6,16,20,0.24)] backdrop-blur-md sm:p-10">
        <p className="text-[0.76rem] font-semibold uppercase tracking-[0.34em] text-[#c49a3c]">
          {eyebrow}
        </p>
        <h1 className="mt-5 font-serif text-[2.8rem] leading-[0.92] text-white sm:text-[3.6rem]">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-[1rem] leading-8 text-white/78 sm:text-[1.05rem]">
          {copy}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {primaryLabel && primaryHref ? (
            <Link
              href={primaryHref}
              className="inline-flex min-h-[3.2rem] items-center justify-center rounded-full bg-[#c49a3c] px-7 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#143b47] transition hover:bg-[#d1ab58]"
            >
              {primaryLabel}
            </Link>
          ) : null}
          {secondaryLabel && secondaryHref ? (
            <Link
              href={secondaryHref}
              className="inline-flex min-h-[3.2rem] items-center justify-center rounded-full border border-white/18 px-7 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-white transition hover:border-[#c49a3c]/40 hover:text-white"
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
