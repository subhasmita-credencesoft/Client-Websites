import PageHero from "./PageHero";

export default function BlogHero() {
  return (
    <PageHero
      title="Our Blog"
      backgroundImage="/images/room_2.jpg"
      subtitle="Stories, updates, and inspiration from UK's Resort."
      breadcrumb="Home / Blog"
      minHeightClassName="min-h-[70vh]"
    />
  );
}
