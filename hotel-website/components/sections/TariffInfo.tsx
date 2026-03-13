import Container from "../ui/Container";

export default function TariffInfo() {
  return (
    <section className="bg-[#f3efe8] py-14 text-[#1f3c44] sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-6xl">
          <p className="text-[0.95rem] leading-relaxed text-[#1f3c44]/80 sm:text-[1rem]">
            Tariff as follows (Taxes as per Govt Regulations)
          </p>
          <p className="mt-4 text-[1rem] leading-relaxed text-[#1f3c44]/85 sm:text-[1.03rem]">
            Check in Time: <span className="font-semibold">12:00 Noon</span> Check Out Time:{" "}
            <span className="font-semibold">11:00 AM</span>
          </p>

          <div className="mt-10 overflow-x-auto rounded-sm border border-[#1f3c44]/10">
            <table className="w-full min-w-[740px] border-collapse">
              <thead>
                <tr className="bg-[#8e9792] text-white">
                  <th colSpan={2} className="px-4 py-4 text-center font-serif text-2xl sm:text-3xl">
                    Tariff for Double Occupancy
                  </th>
                </tr>
                <tr className="bg-[#8e9792] text-white">
                  <th className="w-1/2 border-t border-white/35 px-4 py-3 text-center text-[1rem] font-medium sm:text-[1.06rem]">
                    Room Type
                  </th>
                  <th className="w-1/2 border-t border-white/35 px-4 py-3 text-center text-[1rem] font-medium sm:text-[1.06rem]">
                    CP Plan (Room Rate + Break Fast)
                  </th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr className="bg-[#8e9792]">
                  <td className="border-t border-white/35 px-4 py-3 text-center text-[0.98rem] font-semibold sm:text-[1.02rem]">
                    Deluxe
                  </td>
                  <td className="border-t border-white/35 px-4 py-3 text-center text-[0.98rem] sm:text-[1.02rem]">
                    Rs. 3950 + 12 % GST on Double Occupancy with Breakfast
                  </td>
                </tr>
                <tr className="bg-[#8e9792]">
                  <td className="border-t border-white/35 px-4 py-3 text-center text-[0.98rem] font-semibold sm:text-[1.02rem]">
                    Super Deluxe
                  </td>
                  <td className="border-t border-white/35 px-4 py-3 text-center text-[0.98rem] sm:text-[1.02rem]">
                    Rs. 4950 + 12 % GST on Double Occupancy with Breakfast
                  </td>
                </tr>
                <tr className="bg-[#8e9792]">
                  <td className="border-t border-white/35 px-4 py-3 text-center text-[0.98rem] font-semibold sm:text-[1.02rem]">
                    Extra Person (Above 5 years)
                  </td>
                  <td className="border-t border-white/35 px-4 py-3 text-center text-[0.98rem] sm:text-[1.02rem]">
                    Rs. 1400 + 12 % GST with Extra Mattress &amp; Breakfast
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-12 overflow-x-auto rounded-sm border border-[#1f3c44]/10">
            <table className="w-full min-w-[740px] border-collapse">
              <thead>
                <tr className="bg-[#8e9792] text-white">
                  <th
                    colSpan={2}
                    className="px-4 py-4 text-center font-serif text-xl leading-snug sm:text-2xl md:text-3xl"
                  >
                    Package for Over Night Picnic for Groups (MINIMUM 20 PAX)
                    <br />
                    (Per Person Per Night with all Meals)
                    <br />
                    Includes 01 Lunch, 01 Hi Tea, 01 Dinner &amp; 01 Breakfast.
                  </th>
                </tr>
                <tr className="bg-[#8e9792] text-white">
                  <th className="w-1/2 border-t border-white/35 px-4 py-3 text-center text-[1rem] font-medium sm:text-[1.06rem]">
                    Occupancy
                  </th>
                  <th className="w-1/2 border-t border-white/35 px-4 py-3 text-center text-[1rem] font-medium sm:text-[1.06rem]">
                    All Days
                  </th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr className="bg-[#8e9792]">
                  <td className="border-t border-white/35 px-4 py-3 text-center text-[0.98rem] font-semibold sm:text-[1.02rem]">
                    Double Occupancy
                  </td>
                  <td className="border-t border-white/35 px-4 py-3 text-center text-[0.98rem] sm:text-[1.02rem]">
                    Rs. 2750 + 18 % GST
                  </td>
                </tr>
                <tr className="bg-[#8e9792]">
                  <td className="border-t border-white/35 px-4 py-3 text-center text-[0.98rem] font-semibold sm:text-[1.02rem]">
                    Triple Occupancy
                  </td>
                  <td className="border-t border-white/35 px-4 py-3 text-center text-[0.98rem] sm:text-[1.02rem]">
                    Rs. 2550 + 18 % GST
                  </td>
                </tr>
                <tr className="bg-[#8e9792]">
                  <td className="border-t border-white/35 px-4 py-3 text-center text-[0.98rem] font-semibold sm:text-[1.02rem]">
                    Quadriple Occupancy
                  </td>
                  <td className="border-t border-white/35 px-4 py-3 text-center text-[0.98rem] sm:text-[1.02rem]">
                    Rs. 2350 + 18 % GST
                  </td>
                </tr>
                <tr className="bg-[#8e9792]">
                  <td className="border-t border-white/35 px-4 py-3 text-center text-[0.98rem] font-semibold sm:text-[1.02rem]">
                    Five Sharing Occupancy
                  </td>
                  <td className="border-t border-white/35 px-4 py-3 text-center text-[0.98rem] sm:text-[1.02rem]">
                    Rs. 2250 + 18 % GST
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-14 max-w-5xl">
            <h3 className="font-serif text-3xl text-[#1f3c44] sm:text-4xl">Tariff for One Day Picnic</h3>
            <p className="mt-6 text-[1rem] font-semibold leading-relaxed text-[#1f3c44] sm:text-[1.06rem]">
              TARIFF DAY PICNIC FOR GROUPS (MINIMUM 20 PAX) RATE Rs. 1099 PER PERSON + 18 % GST Rates as
              follows Per Person:
            </p>
            <p className="mt-3 text-[0.96rem] leading-[1.75] text-[#1f3c44]/85 sm:text-[1rem]">
              (Package Per Person Per Night include 01 Lunch, 01 Hi Tea, 01 Dinner &amp; 01 Break Fast,
              Entry to Big Water Park, Rain Dance, indoor games, Outdoor Games like cricket, Football &amp;
              Kids Play Park)
            </p>
            <p className="mt-3 text-[0.96rem] leading-[1.75] text-[#1f3c44]/85 sm:text-[1rem]">
              BREAKFAST, IDLI SAMBHAR CHUTNEY, POHA, BREAD OMLETT, TEA+COFFIE, LUNCH, CHICKEN ROGAN JOSH,
              VEG KADAI, MIX VEG DRY, DAL FRY, JEERA RICE, ROTI, NAAN, PARATHA, SALAD, PAPAD, PICKLE,
              GULAB JAMUN, HI TEA, TEA+COFFIE WITH VEG SANDWICH. Any Dish apart from this will be charged
              extra.
            </p>
            <p className="mt-8 text-[0.96rem] font-medium text-[#1f3c44]/90 sm:text-[1rem]">
              *Except Holidays &amp; Festivals
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
