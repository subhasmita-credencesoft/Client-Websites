import ErrorState from "../components/ui/ErrorState";

export default function NotFound() {
  return (
    <ErrorState
      eyebrow="Page Not Found"
      title="This page has checked out."
      copy="The page you are looking for could not be found. Continue exploring stays, dining, events, and resort experiences from the homepage."
      primaryLabel="Back Home"
      primaryHref="/"
      secondaryLabel="View Rooms"
      secondaryHref="/rooms"
    />
  );
}
