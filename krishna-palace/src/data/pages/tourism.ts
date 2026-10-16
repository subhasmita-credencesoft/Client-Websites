export type RouteStop = {
  name: string;
  x: number;
  y: number;
  labelX?: number;
  labelY: number;
  anchor?: 'start' | 'middle' | 'end';
};

export const tourismRouteStops: RouteStop[] = [
  { name: 'Pattadakal', x: 82, y: 266, labelY: 32 },
  { name: 'Badami', x: 278, y: 214, labelY: 32 },
  { name: 'Aihole', x: 462, y: 208, labelY: 32 },
  { name: 'Hampi', x: 627, y: 152, labelY: -20 },
  { name: 'Anegundi', x: 798, y: 138, labelY: 32 },
  { name: 'Hosapete', x: 928, y: 80, labelX: -8, labelY: -18, anchor: 'end' },
];

export const tourismRouteFooter = ['Temple architecture', 'Ancient landscapes', 'Hosapete as your base'];
