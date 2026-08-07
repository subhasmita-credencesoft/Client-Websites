import type { GetStaticProps, NextPage } from 'next';
import PolicyPage from '@/components/ui/PolicyPage';
import { SITE } from '@/data/site';

const TermsPage: NextPage = () => {
  return (
    <PolicyPage
      title="Terms & Conditions"
      eyebrow="Legal"
      description="Terms and conditions governing the use of the Baibhab Resorts & Conventions website and services."
      path="/terms"
      updated="1 January 2026"
      sections={[
        {
          heading: '1. Acceptance of terms',
          body: (
            <p>
              By accessing this website and booking our rooms or event spaces, you agree to these Terms & Conditions.
              Please review them carefully before making a reservation or enquiry.
            </p>
          ),
        },
        {
          heading: '2. Reservations and confirmations',
          body: (
            <p>
              Room and event reservations are confirmed only after written confirmation from our team and, where
              applicable, receipt of an advance. Rates are subject to applicable taxes and may change without notice
              until confirmed.
            </p>
          ),
        },
        {
          heading: '3. Event bookings',
          body: (
            <p>
              Event dates are blocked on receipt of a token advance. Final guest counts, menus, and setup
              requirements should be confirmed at least 7 days before the event to ensure accurate planning.
            </p>
          ),
        },
        {
          heading: '4. Guest conduct and safety',
          body: (
            <p>
              Guests and event attendees must comply with our safety, security, and house rules. The management
              reserves the right to refuse service in case of violation of these rules.
            </p>
          ),
        },
        {
          heading: '5. Limitation of liability',
          body: (
            <p>
              Baibhab Resorts & Conventions is not liable for loss or damage to personal property, delays caused by
              force majeure events, or any indirect damages arising from use of our services.
            </p>
          ),
        },
        {
          heading: '6. Contact',
          body: (
            <p>
              For any questions about these terms, contact us at {SITE.emailGeneral} or via the contact page.
            </p>
          ),
        },
      ]}
    />
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default TermsPage;
