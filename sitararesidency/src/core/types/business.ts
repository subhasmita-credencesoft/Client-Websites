export type Business = {
  name: string;
  shortName: string;
  website: string;
  logo: string;
  email: string;
  phones: {
    primary: string;
    secondary: string;
    display: string;
    primaryDisplay: string;
    secondaryDisplay: string;
    landlinePrimary: string;
    landlinePrimaryDisplay: string;
    landlineSecondary: string;
    landlineSecondaryDisplay: string;
    landlinesDisplay: string;
  };
  social: {
    instagram: string;
    facebook: string;
    x: string;
  };
  address: {
    lines: string[];
    streetAddress: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
  };
  mapUrl: string;
  bookingUrl: string;
  bookingEngineBaseUrl: string;
  amenities: string[];
};

export type SiteMetadata = {
  title: string;
  description: string;
};
