"use client";

import Container from "../ui/Container";
import { usePropertyData } from "../providers/PropertyDataProvider";
import { sanitizeHtml } from "../../lib/sanitizeHtml";

function joinParts(parts: Array<string | null | undefined>) {
  return parts.filter(Boolean).join(", ");
}

function deriveNearbyPoints(names: string[]) {
  return names.filter((name) => /\bkm\b|\bmins?\b|\brailway\b|\btemple\b|\bview point\b/i.test(name)).slice(0, 8);
}

export default function PropertyDetailsPanel() {
  const { property, isLoading, error } = usePropertyData();
  const managerName = [property?.managerFirstName, property?.managerLastName].filter(Boolean).join(" ");
  const address = joinParts([
    property?.address?.streetName,
    property?.address?.suburb,
    property?.address?.city,
    property?.address?.state,
    property?.address?.postcode,
    property?.address?.country,
  ]);
  const services = property?.propertyServicesList || [];
  const nearbyPoints = deriveNearbyPoints(
    services.map((service) => service?.name).filter((value): value is string => Boolean(value)),
  );
  const openingHours = property?.businessServiceDtoList?.[0]?.serviceOpenList || [];
  const policyHtml = sanitizeHtml(property?.businessServiceDtoList?.[0]?.policy);
  const descriptionHtml = sanitizeHtml(property?.businessDescription);
  const taxDetails = property?.taxDetails || [];

  if (isLoading) {
    return (
      <section className="bg-white py-16 text-[#1f3c44]">
        <Container>
          <p className="text-sm text-[#1f3c44]/70">Loading property details...</p>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white py-16 text-[#1f3c44]">
        <Container>
          <p className="text-sm text-[#1f3c44]/70">{error}</p>
        </Container>
      </section>
    );
  }

  if (!property?.id) {
    return (
      <section className="bg-white py-16 text-[#1f3c44]">
        <Container>
          <p className="text-sm text-[#1f3c44]/70">No property data available.</p>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 text-[#1f3c44]">
      <Container className="space-y-10">
        <div className="grid gap-4 rounded-2xl border border-[#1f3c44]/10 bg-[#f8f6f2] p-6 sm:grid-cols-2 lg:grid-cols-3">
          {property?.name && <p><strong>Name:</strong> {property.name}</p>}
          {property?.shortName && <p><strong>Short name:</strong> {property.shortName}</p>}
          {property?.email && <p><strong>Email:</strong> {property.email}</p>}
          {property?.mobile && <p><strong>Mobile:</strong> {property.mobile}</p>}
          {property?.whatsApp && <p><strong>WhatsApp:</strong> {property.whatsApp}</p>}
          {managerName && <p><strong>Manager:</strong> {managerName}</p>}
          {property?.managerEmailAddress && <p><strong>Manager email:</strong> {property.managerEmailAddress}</p>}
          {property?.website && <p><strong>Website:</strong> <a href={property.website} className="underline" target="_blank" rel="noreferrer">{property.website}</a></p>}
          {property?.socialMediaLinks?.[0]?.aboutUs && <p><strong>About page:</strong> <a href={property.socialMediaLinks[0].aboutUs} className="underline" target="_blank" rel="noreferrer">{property.socialMediaLinks[0].aboutUs}</a></p>}
          {property?.propertyStatus && <p><strong>Status:</strong> {property.propertyStatus}</p>}
          {property?.localCurrency && <p><strong>Currency:</strong> {property.localCurrency}</p>}
          {property?.businessType && <p><strong>Business type:</strong> {property.businessType}</p>}
          {property?.businessSubtype && <p><strong>Business subtype:</strong> {property.businessSubtype}</p>}
          {property?.seoFriendlyName && <p><strong>SEO name:</strong> {property.seoFriendlyName}</p>}
          {(property?.latitude || property?.longitude) && (
            <p><strong>Coordinates:</strong> {property.latitude || "-"}, {property.longitude || "-"}</p>
          )}
          {address && <p className="sm:col-span-2 lg:col-span-3"><strong>Address:</strong> {address}</p>}
        </div>

        {descriptionHtml && (
          <div>
            <h3 className="font-serif text-2xl">Description</h3>
            <div className="mt-4 text-sm leading-7 text-[#1f3c44]/80" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
          </div>
        )}

        {services.length > 0 && (
          <div>
            <h3 className="font-serif text-2xl">Amenities & Services</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {services.map((service, index) => (
                <div key={`${service?.id || index}-${service?.name || "service"}`} className="rounded-xl border border-[#1f3c44]/10 p-4">
                  {service?.name && <p className="font-semibold">{service.name}</p>}
                  {service?.description && <p className="mt-2 text-sm text-[#1f3c44]/70">{service.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {policyHtml && (
          <div>
            <h3 className="font-serif text-2xl">Policies</h3>
            <div className="mt-4 text-sm leading-7 text-[#1f3c44]/80" dangerouslySetInnerHTML={{ __html: policyHtml }} />
          </div>
        )}

        {openingHours.length > 0 && (
          <div>
            <h3 className="font-serif text-2xl">Opening Hours</h3>
            <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
              {openingHours.map((slot, index) => (
                <li key={`${slot?.day || "day"}-${index}`} className="rounded-lg border border-[#1f3c44]/10 px-3 py-2">
                  <strong>{slot?.day || "Day"}:</strong> {slot?.openingTime || "-"} - {slot?.closingTime || "-"}
                </li>
              ))}
            </ul>
          </div>
        )}

        {taxDetails.length > 0 && (
          <div>
            <h3 className="font-serif text-2xl">Tax Details</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {taxDetails.map((tax, index) => (
                <div key={`${tax?.name || "tax"}-${index}`} className="rounded-lg border border-[#1f3c44]/10 p-4 text-sm">
                  <p><strong>{tax?.name || "Tax"}</strong> {tax?.percentage ? `(${tax.percentage}%)` : ""}</p>
                  {(tax?.country || tax?.state) && <p className="text-[#1f3c44]/70">{[tax?.country, tax?.state].filter(Boolean).join(", ")}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {nearbyPoints.length > 0 && (
          <div>
            <h3 className="font-serif text-2xl">Nearby Points</h3>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[#1f3c44]/80">
              {nearbyPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
