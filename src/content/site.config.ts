export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  contact: {
    phone: string | null;
    whatsapp: string | null;
    email: string | null;
    publicEmail: string | null;
  };
  outlets: Array<{
    id: string;
    name: string;
    address: string;
    hours: string;
    geo: { lat: number; lng: number } | null;
    directionsUrl: string | null;
  }>;
  deliveryPartners: Array<{
    id: string;
    name: string;
    url: string | null;
    poster: string;
    posterAlt: string;
  }>;
  social: {
    facebook: string | null;
    instagram: string | null;
    tiktok: string | null;
    youtube: string | null;
  };
  openingDate: string | null;
}

export const siteConfig: SiteConfig = {
  name: 'Coconut Station',
  tagline: 'Fresh. Natural. Just for You.',
  description: 'Bringing nature\'s finest coconut experience to your everyday life.',
  url: 'https://www.coconutstation.com',
  openingDate: '2026-08-16T10:00:00+06:00', // TODO_OPENING_DATE
  contact: {
    phone: '8801796894640', // from wa.me/8801796894640
    whatsapp: '8801796894640',
    email: 'smshoaib001@gmail.com', // leaving this here but not public
    publicEmail: null, // TODO_PUBLIC_EMAIL
  },
  outlets: [
    {
      id: 'tangail-flagship',
      name: 'Tangail Flagship',
      address: 'Bottola Bazar More, Bibekanondo School Market, Tangail',
      hours: '09:00 - 22:00', // TODO_HOURS
      geo: null, // TODO_GEO e.g. { lat: 24.24984, lng: 89.91655 }
      directionsUrl: 'https://maps.google.com/?q=24.2513,89.9167',
    },
  ],
  deliveryPartners: [
    { 
      id: 'foodpanda', 
      name: 'Foodpanda', 
      url: null, /* TODO_FOODPANDA_URL */
      poster: '/assets/posters/FOODPANDA.jpeg', 
      posterAlt: 'Order Coconut Station on Foodpanda' 
    },
    { 
      id: 'foodi', 
      name: 'foodi', 
      url: null, /* TODO_FOODI_URL */
      poster: '/assets/posters/FOODI.jpeg', 
      posterAlt: 'Order Coconut Station on foodi' 
    },
  ],
  social: {
    facebook: 'https://facebook.com/coconutstationbd',
    instagram: null, // TODO_INSTAGRAM
    tiktok: null, // TODO_TIKTOK
    youtube: null, // TODO_YOUTUBE
  }
};
