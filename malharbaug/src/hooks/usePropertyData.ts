import { useProperty, useRooms, useContact } from '@/components/providers/PropertyProvider';

export function usePropertyData() {
  const property = useProperty();
  const rooms = useRooms();
  const contact = useContact();

  return {
    ...property,
    rooms,
    contact,
  };
}

export { useRooms, useContact };
