import type { GetStaticProps, NextPage } from 'next';
import PolicyPage from '@/components/ui/PolicyPage';
import { SITE } from '@/data/site';

const PrivacyPolicyPage: NextPage = () => {
  return (
    <PolicyPage
      title="Privacy Policy"
      eyebrow="Legal"
      description="How Baibhab Resorts & Conventions collects, uses, and protects your personal information."
      path="/privacy-policy"
      updated="1 January 2026"
      sections={[
        {
          heading: '1. Information we collect',
          body: (
            <p>
              We collect information you provide directly  such as your name, phone number, email address, event
              details, and booking preferences  when you contact us, request a proposal, subscribe to our
              newsletter, or make a reservation.
            </p>
          ),
        },
        {
          heading: '2. How we use your information',
          body: (
            <p>
              Your information is used to respond to enquiries, process reservations and event proposals, send
              requested materials such as the event planning brochure, and share relevant offers with your consent.
              We do not sell your personal data to third parties.
            </p>
          ),
        },
        {
          heading: '3. Cookies and analytics',
          body: (
            <p>
              Our website may use cookies and analytics tools to understand how visitors use the site and improve
              performance. You can disable cookies through your browser settings at any time.
            </p>
          ),
        },
        {
          heading: '4. Data security',
          body: (
            <p>
              We apply reasonable technical and organizational measures to protect your personal information from
              unauthorized access, alteration, disclosure, or destruction.
            </p>
          ),
        },
        {
          heading: '5. Your rights',
          body: (
            <p>
              You may request access to, correction of, or deletion of your personal information at any time by
              contacting us at {SITE.emailStay}. We will respond within a reasonable timeframe.
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

export default PrivacyPolicyPage;
