import { QuoteRequest } from './dto';
import { FareQuote, FareLine } from './pricing.types';
import { toDateTime, diffDaysCeil, diffHours } from './time-utils';

const r2 = (n: number) => Math.round(n * 100) / 100;
function calculateOutstationDaysFromStrings(
  pickupDate: string,
  pickupTime: string,
  returnDate?: string,
  returnTime?: string,
): number {
  if (!returnDate) return 1;

  const start = new Date(`${pickupDate}T${pickupTime}`);
  const end = new Date(`${returnDate}T${returnTime || '23:59'}`);

  const ONE_DAY = 24 * 60 * 60 * 1000;
  const diff = end.getTime() - start.getTime();

  if (diff <= 0) return 1;

  // +1 because pickup day counts
  return Math.ceil(diff / ONE_DAY) + 1;
}
export function calculateFare(
  cfg: any,
  req: QuoteRequest,
  distanceKm: number,
): FareQuote {
  const lines: FareLine[] = [];
  const notes: string[] = [...(cfg.meta?.notes || [])];

  const start = toDateTime(req.pickupDate, req.pickupTime);
  const end =
    req.returnDate && req.returnTime
      ? toDateTime(req.returnDate, req.returnTime)
      : start;

  const hours = diffHours(start, end);
  const days =
    req.tripType === 'outstation'
      ? calculateOutstationDays(req.pickupDate, req.returnDate)
      : diffDaysCeil(start, end);

  const cat = req.vehicleCategory;
  const dist = r2(distanceKm);
  function calculateOutstationDays(
    pickupDate: string,
    returnDate?: string,
  ): number {
    if (!returnDate) return 1;

    const [sy, sm, sd] = pickupDate.split('-').map(Number);
    const [ey, em, ed] = returnDate.split('-').map(Number);

    const start = new Date(sy, sm - 1, sd);
    const end = new Date(ey, em - 1, ed);

    const ONE_DAY = 24 * 60 * 60 * 1000;
    const diffDays = Math.round((end.getTime() - start.getTime()) / ONE_DAY);

    return diffDays >= 0 ? diffDays + 1 : 1;
  }

  /* ---------------- PICKUP / DROP ---------------- */
  if (req.tripType === 'pickup_drop') {
    const c = cfg.services.pickup_drop.categories[cat];
    if (!c) throw new Error(`Pickup/Drop pricing missing for ${cat}`);

    const extraKm = Math.max(0, dist - c.base_km);

    lines.push({
      code: 'BASE',
      label: 'Base Fare',
      qty: c.base_km,
      unitPrice: c.base_fare,
      amount: c.base_fare,
    });

    if (extraKm > 0) {
      lines.push({
        code: 'EXTRA_KM',
        label: 'Extra Km',
        qty: extraKm,
        unitPrice: c.additional_km_rate,
        amount: r2(extraKm * c.additional_km_rate),
      });
    }
  }

  /* ---------------- RENTAL ---------------- */
  if (req.tripType === 'rental') {
    const c = cfg.services.rental.categories[cat];
    if (!c) throw new Error(`Rental pricing missing for ${cat}`);
    console.log('Rental calculation:', { dist, hours, c });
    lines.push({
      code: 'PACKAGE',
      label: 'Rental Package',
      qty: 1,
      unitPrice: c.package.base_fare,
      amount: c.package.base_fare,
    });

    const extraKm = Math.max(0, dist - c.package.km);
    const extraHr = Math.max(0, hours - c.package.hours);

    if (extraKm > 0) {
      lines.push({
        code: 'EXTRA_KM',
        label: 'Extra Km',
        qty: extraKm,
        unitPrice: c.extra_km_rate,
        amount: r2(extraKm * c.extra_km_rate),
      });
    }

    if (extraHr > 0) {
      lines.push({
        code: 'EXTRA_HOUR',
        label: 'Extra Hour',
        qty: extraHr,
        unitPrice: c.extra_hour_rate,
        amount: r2(extraHr * c.extra_hour_rate),
      });
    }
  }

  /* ---------------- OUTSTATION ---------------- */
if (req.tripType === 'outstation') {

  const c = cfg.services.outstation.categories[cat];
  if (!c) throw new Error(`Outstation pricing missing for ${cat}`);

  const outstationDays = calculateOutstationDays(
    req.pickupDate,
    req.returnDate
  );

  let totalDistance = 0;

  if (outstationDays === 1) {
    // Same day → round trip
    totalDistance = dist * 2;
  } else {
    // Multi-day → distance × days
    totalDistance = dist * outstationDays;
  }

  totalDistance = r2(totalDistance);

  const minKm = c.min_km_per_day * outstationDays;
  const billKm = Math.max(totalDistance, minKm);

  lines.push({
    code: 'KM',
    label: 'Distance Charge',
    qty: billKm,
    unitPrice: c.per_km_rate,
    amount: r2(billKm * c.per_km_rate)
  });

  lines.push({
    code: 'DRIVER',
    label: 'Driver Allowance',
    qty: outstationDays,
    unitPrice: c.driver_allowance_per_day,
    amount: r2(outstationDays * c.driver_allowance_per_day)
  });
}


  const total = r2(lines.reduce((s, l) => s + l.amount, 0));

  return {
    currency: cfg.meta.currency,
    pricingVersion: cfg.meta.version,
    tripType: req.tripType,
    vehicleCategory: cat,
    distanceKm: dist,
    total,
    lines,
    notes,
  };
}
