interface SlotCar {
  name: string;
  availableTimings: {
    slotAvailabilityDto: {
      noOfAvailable: number;
    };
  }[];
}
