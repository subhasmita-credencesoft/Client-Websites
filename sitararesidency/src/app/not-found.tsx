import { NotFoundSection } from '@/features/common';
import { notFoundPage } from '@/features/common/data/pages';

export default function NotFound() {
  return (
    <NotFoundSection
      eyebrow={notFoundPage.eyebrow}
      code={notFoundPage.code}
      heading={notFoundPage.heading}
      description={notFoundPage.description}
      homeAction={notFoundPage.homeAction}
      contactAction={notFoundPage.contactAction}
    />
  );
}