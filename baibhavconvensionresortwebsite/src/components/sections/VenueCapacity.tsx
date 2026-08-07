import styles from '@/styles/HomeSections.module.scss';
import SectionLabel from '@/components/ui/SectionLabel';
import { Venue } from '@/types';

export default function VenueCapacity({ venues }: { venues: Venue[] }) {
  return (
    <section className={styles.venueSection} aria-labelledby="venue-capacity-heading">
      <div className="container">
        <div className={styles.venueHeader} data-reveal>
          <SectionLabel eyebrow="At a glance" title="Venue capacity overview" />
        </div>
        <div className={styles.tableWrap} data-reveal>
          <table className={styles.capacityTable}>
            <thead>
              <tr>
                <th>Venue Space</th>
                <th>Type</th>
                <th>Capacity (Seated)</th>
                <th>Capacity (Floating)</th>
                <th>Ideal For</th>
              </tr>
            </thead>
            <tbody>
              {venues.map((venue) => (
                <tr key={venue.id}>
                  <td className={styles.tableName}>{venue.name}</td>
                  <td>{venue.venueType}</td>
                  <td>{venue.seatedCapacity.toLocaleString('en-IN')}</td>
                  <td>
                    {venue.floatingCapacity >= 1000
                      ? `${venue.floatingCapacity.toLocaleString('en-IN')}+`
                      : venue.floatingCapacity}
                  </td>
                  <td>{venue.idealFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
