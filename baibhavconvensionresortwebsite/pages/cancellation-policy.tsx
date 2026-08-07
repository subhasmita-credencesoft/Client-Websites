import type { GetStaticProps, NextPage } from 'next';
import PolicyPage from '@/components/ui/PolicyPage';

const CancellationPolicyPage: NextPage = () => {
  return (
    <PolicyPage
      title="Cancellation & Refund Policy"
      eyebrow="Legal"
      description="Cancellation and refund terms for room reservations and event bookings at Baibhab Resorts & Conventions."
      path="/cancellation-policy"
      updated="1 January 2026"
      sections={[
        {
          heading: '1. Room reservations',
          body: (
            <ul className="list-plain">
              <li>
                <strong>More than 7 days before check-in:</strong> free cancellation with a full refund of any advance
                paid.
              </li>
              <li>
                <strong>3–7 days before check-in:</strong> 50% of the first night is retained as a cancellation
                charge.
              </li>
              <li>
                <strong>Within 72 hours or no-show:</strong> the first night is charged in full.
              </li>
            </ul>
          ),
        },
        {
          heading: '2. Event bookings',
          body: (
            <ul className="list-plain">
              <li>
                <strong>More than 30 days before the event:</strong> full refund of the token advance, less any third-
                party costs already incurred.
              </li>
              <li>
                <strong>15–30 days before the event:</strong> 50% of the token advance is refunded.
              </li>
              <li>
                <strong>Within 15 days of the event:</strong> the token advance is non-refundable.
              </li>
            </ul>
          ),
        },
        {
          heading: '3. Date changes',
          body: (
            <p>
              Date changes are accommodated subject to venue availability and must be requested at least 15 days
              before the original event date. A change fee may apply.
            </p>
          ),
        },
        {
          heading: '4. Refund processing',
          body: (
            <p>
              Approved refunds are processed to the original payment method within 7–10 business days.
            </p>
          ),
        },
        {
          heading: '5. Force majeure',
          body: (
            <p>
              In case of government-ordered restrictions or natural events preventing the event or stay, we will work
              with you to reschedule or issue a credit note valid for 12 months.
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

export default CancellationPolicyPage;
