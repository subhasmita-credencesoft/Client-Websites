import Container from "../ui/Container";

const SPA_IMAGES = {
  main: "https://demo2.wpopal.com/amoja/wp-content/uploads/2024/11/h1_img_effect1.jpg",
  inset:
    "https://demo2.wpopal.com/amoja/wp-content/uploads/2024/11/h1_img_effect2.jpg",
};

export default function WellnessSpaIntro() {
  return (
    <section className="bg-[#f4f1ea] py-20 text-[#1f3c44]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="aspect-[3/4] overflow-hidden rounded-[40px] bg-[#d9d2c6]">
              <img
                src={SPA_IMAGES.main}
                alt="Woman relaxing at the spa pool"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute right-[-4%] top-[22%] w-[52%]">
              <div className="aspect-square overflow-hidden rounded-[28px] bg-[#d9d2c6] shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                <img
                  src={SPA_IMAGES.inset}
                  alt="Hot stone massage"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-[#f4f1ea]" />
          </div>

          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.45em] text-[#1f3c44]/60">
              Fascilities
            </span>
            <h2 className="mt-6 font-serif text-4xl leading-tight md:text-5xl">
             The Name That Redefines HospitalityGreen 
              <br />
              Par-Excellence In The Lush 
              <br />
              Landscape At Khopoli.
            </h2>
            <p className="mt-6 text-sm leading-7 text-[#1f3c44]/75">
            Discover the euphoria within you with boundless fun under nonstop sprinkling water and break into a wild Rain dance
Splash into the cool and clear waters of our swimming pools and indulge in a game of water polo or leisurely amble on the poolside deck
Slide into pure merriment and relentless excitement with a fully customized ride through our Water Park.
Bounce your afternoon with friends and family with a wide range of Indoor Games including table tennis, badminton and carom
The Evenings are the perfect time to run amok in our lush green environment with a host of Outdoor Sports like volleyball, cricket, and football
Sweat it out in our fully furnished Gym geared with the most sophisticated equipment
Toddlers or Children alike have ample space to swing and breeze through our exclusively designed Kid's Park
24 Hours Of Hot & Cold running water, satellite TV channels and luxurious facilities will keep you entranced in your holiday break
Express Laundry services to provide you with the last minute dress code change that you had not anticipated
Wi-Fi Internet Facility in rooms for those who just want to peek back at their office desk!
We also provide adventure activities like Paint Ball, Archery, Rifle Shooting, Body Zorbing, Water Zorbing, Artificial Wall Climbing and Team Building Activities (Extra Charges will be applicable).
Pets are not allowed in resort
            </p>
            <button
              type="button"
              className="mt-10 inline-flex items-center gap-2 rounded-full border border-[#1f3c44]/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#1f3c44] transition hover:border-[#1f3c44] hover:bg-[#1f3c44]/5"
            >
              Take a Virtual Tour Virtual Tour
              <span aria-hidden="true">›</span>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
