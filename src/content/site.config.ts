export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  contact: {
    phone: string | null;
    whatsapp: string | null;
  };
  outlets: Array<{
    id: string;
    name: string;
    address: string;
    hours: string;
    geo: { lat: number; lng: number } | null;
    directionsUrl: string | null;
  }>;
  delivery: {
    zones: Array<{
      id: string;
      name: string;
      fee: number;
      minOrder: number;
      eta: string;
    }>;
    freeDeliveryThreshold: number | null;
  };
  payments: {
    wallets: {
      bkash: string | null;
      nagad: string | null;
      rocket: string | null;
    };
  };
  social: {
    facebook: string | null;
    instagram: string | null;
    tiktok: string | null;
    youtube: string | null;
  };
  imagery: {
    showIllustrativeLabel: boolean;
  };
  openingDate: string | null; // e.g. "2026-08-16T10:00:00+06:00"
}

export const siteConfig: SiteConfig = {
  name: 'Coconut Station',
  tagline: 'Fresh. Natural. Just for You.',
  description: 'Bringing nature\'s finest coconut experience to your everyday life.',
  openingDate: '2026-08-16T10:00:00+06:00', // TODO_OPENING_DATE
  contact: {
    phone: 'TODO_PHONE_NUMBER', // e.g. +8801XXXXXXXXX
    whatsapp: 'TODO_WHATSAPP_NUMBER',
  },
  outlets: [
    {
      id: 'tangail-flagship',
      name: 'Tangail Flagship',
      address: 'Bottola Bazar More, Bibekanondo School Market, Tangail',
      hours: '09:00 - 22:00', // TODO_HOURS
      geo: null, // TODO_GEO e.g. { lat: 24.24984, lng: 89.91655 }
      directionsUrl: null, // TODO_DIRECTIONS
    },
  ],
  delivery: {
    zones: [
      {
        id: 'tangail-town',
        name: 'Tangail Town',
        fee: 0, // TODO_FEE
        minOrder: 0, // TODO_MIN_ORDER
        eta: '30-45 mins', // TODO_ETA
      },
    ],
    freeDeliveryThreshold: null, // TODO_FREE_DELIVERY_THRESHOLD
  },
  payments: {
    wallets: {
      bkash: null, // TODO_BKASH
      nagad: null, // TODO_NAGAD
      rocket: null, // TODO_ROCKET
    },
  },
  social: {
    facebook: null, // TODO_FACEBOOK
    instagram: null, // TODO_INSTAGRAM
    tiktok: null, // TODO_TIKTOK
    youtube: null, // TODO_YOUTUBE
  },
  imagery: {
    showIllustrativeLabel: true,
  },
};
