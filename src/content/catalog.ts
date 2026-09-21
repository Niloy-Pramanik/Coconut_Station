import { Product } from "@/core/domain/types"

export const catalog: Product[] = [
  {
    slug: 'live-coconut',
    nameEn: 'Live Young Coconut',
    nameBn: 'কাঁচা ডাব',
    descriptionEn: 'Fresh, naturally sweet young coconut water served straight from the shell. Perfectly chilled and smart-cut for your convenience.',
    descriptionBn: 'টাটকা, প্রাকৃতিকভাবে মিষ্টি ডাবের পানি। আপনার সুবিধার্থে স্মার্ট-কাট করা।',
    category: 'Coconut & Water',
    tags: ['smart-cut', 'sealed-straw', 'chilled'],
    allergens: [],
    status: 'active',
    sort: 10,
    variants: [
      {
        sku: 'live-coconut-premium',
        nameEn: 'Premium (500–700 ml)',
        nameBn: 'প্রিমিয়াম (৫০০-৭০০ মিলি)',
        priceBDT: null,
        imageAlt: 'Premium Live Young Coconut',
        imageSrc: '/assets/products/coconut-premium.webp',
      },
      {
        sku: 'live-coconut-regular',
        nameEn: 'Regular (400–550 ml)',
        nameBn: 'রেগুলার (৪০০-৫৫০ মিলি)',
        priceBDT: null,
        imageAlt: 'Regular Live Young Coconut',
        imageSrc: '/assets/products/coconut-regular.webp',
      },
      {
        sku: 'live-coconut-lite',
        nameEn: 'Lite (300–400 ml)',
        nameBn: 'লাইট (৩০০-৪০০ মিলি)',
        priceBDT: null,
        imageAlt: 'Lite Live Young Coconut',
        imageSrc: '/assets/products/coconut-lite.webp',
      }
    ]
  },
  {
    slug: 'coconut-water',
    nameEn: 'Coconut Water',
    nameBn: 'ডাবের পানি',
    descriptionEn: 'Pure coconut water extracted fresh and bottled without any preservatives. 100% natural hydration.',
    descriptionBn: 'তাজা ডাব থেকে সংগ্রহ করা ১০০% প্রাকৃতিক ডাবের পানি। কোন প্রিজারভেটিভ নেই।',
    category: 'Coconut & Water',
    tags: ['100% natural', 'no preservatives', 'chilled'],
    allergens: [],
    status: 'active',
    sort: 20,
    variants: [
      {
        sku: 'coconut-water-300',
        nameEn: '300 ml',
        nameBn: '৩০০ মিলি',
        priceBDT: null,
        imageAlt: '300ml Fresh Coconut Water',
        imageSrc: '/assets/products/water-300ml.webp',
      },
      {
        sku: 'coconut-water-200',
        nameEn: '200 ml',
        nameBn: '২০০ মিলি',
        priceBDT: null,
        imageAlt: '200ml Fresh Coconut Water',
        imageSrc: '/assets/products/water-200ml.webp',
      },
      {
        sku: 'coconut-water-100',
        nameEn: '100 ml',
        nameBn: '১০০ মিলি',
        priceBDT: null,
        imageAlt: '100ml Fresh Coconut Water',
        imageSrc: '/assets/products/water-100ml.webp',
      }
    ]
  },
  {
    slug: 'coconut-water-glass',
    nameEn: 'Glass Bottle Coconut Water',
    nameBn: 'গ্লাস বোতলে ডাবের পানি',
    descriptionEn: 'Premium pure coconut water served in an eco-friendly glass bottle.',
    descriptionBn: 'পরিবেশবান্ধব গ্লাস বোতলে প্রিমিয়াম ডাবের পানি।',
    category: 'Coconut & Water',
    tags: ['100% natural', 'no preservatives', 'eco-friendly'],
    allergens: [],
    status: 'hidden', // Hidden until image + size + price exist
    sort: 30,
    variants: [
      {
        sku: 'coconut-water-glass-500',
        nameEn: '500 ml',
        nameBn: '৫০০ মিলি',
        priceBDT: null,
        imageAlt: 'Glass Bottle Coconut Water',
        imageSrc: '/assets/products/shake-PLACEHOLDER.webp',
      }
    ]
  },
  {
    slug: 'coconut-pudding',
    nameEn: 'Coconut Pudding',
    nameBn: 'ডাবের পুডিং',
    descriptionEn: 'A melt-in-your-mouth dessert made with tender coconut meat and fresh milk.',
    descriptionBn: 'প্রকৃতির স্বাদ, বিশুদ্ধতার প্রতিশ্রুতি। কচি ডাব ও দুধের তৈরি সুস্বাদু ডেজার্ট।',
    category: 'Desserts',
    tags: ['no-extra-sugar', 'contains-milk'],
    allergens: ['milk'],
    status: 'active',
    sort: 40,
    variants: [
      {
        sku: 'pudding-classic',
        nameEn: 'Classic',
        nameBn: 'ক্লাসিক',
        priceBDT: null,
        imageAlt: 'Classic Coconut Pudding',
        imageSrc: '/assets/products/pudding-classic.webp',
      },
      {
        sku: 'pudding-no-sugar',
        nameEn: 'No Extra Sugar',
        nameBn: 'চিনি ছাড়া',
        priceBDT: null,
        imageAlt: 'No Sugar Coconut Pudding',
        imageSrc: '/assets/products/pudding-no-sugar.webp',
      },
      {
        sku: 'pudding-double-layer',
        nameEn: 'Double Layer',
        nameBn: 'ডাবল লেয়ার',
        descriptionEn: 'A beautiful two-layered pudding combining clear coconut water jelly and a creamy milk layer.',
        descriptionBn: 'ডাবের পানি ও দুধের সমন্বয়ে তৈরি ডাবল লেয়ার পুডিং।',
        priceBDT: null,
        imageAlt: 'Double Layer Coconut Pudding',
        imageSrc: '/assets/products/pudding-double-layer.webp',
      }
    ]
  },
  {
    slug: 'coconut-meat',
    nameEn: 'Coconut Meat',
    nameBn: 'ডাবের শ্বাস',
    descriptionEn: 'Soft, tender, and sweet young coconut meat served in a convenient cup.',
    descriptionBn: 'নরম ও মিষ্টি ডাবের শ্বাস।',
    category: 'Coconut & Water',
    tags: ['natural'],
    allergens: [],
    status: 'hidden', // Hidden until image exists
    sort: 50,
    variants: [
      {
        sku: 'coconut-meat',
        nameEn: 'Cup',
        nameBn: 'কাপ',
        priceBDT: null,
        imageAlt: 'Coconut Meat Cup',
        imageSrc: '/assets/products/shake-PLACEHOLDER.webp',
      }
    ]
  },
  {
    slug: 'thai-ice-cream',
    nameEn: 'Thai Style Coconut Ice Cream',
    nameBn: 'থাই স্টাইল কোকোনাট আইসক্রিম',
    descriptionEn: 'Authentic Thai style ice cream served in a real coconut shell with your choice of flavor and toppings.',
    descriptionBn: 'ডাবের খোসায় পরিবেশিত আসল থাই স্টাইল আইসক্রিম।',
    category: 'Desserts',
    tags: ['contains-peanuts', 'contains-milk'],
    allergens: ['milk', 'peanuts'],
    status: 'active',
    sort: 60,
    variants: [
      {
        sku: 'thai-ice-cream-vanilla',
        nameEn: 'Vanilla',
        nameBn: 'ভ্যানিলা',
        priceBDT: null,
        imageAlt: 'Vanilla Thai Coconut Ice Cream',
        imageSrc: '/assets/products/icecream-vanilla.webp',
      },
      {
        sku: 'thai-ice-cream-chocolate',
        nameEn: 'Chocolate',
        nameBn: 'চকলেট',
        priceBDT: null,
        imageAlt: 'Chocolate Thai Coconut Ice Cream',
        imageSrc: '/assets/products/icecream-chocolate.webp',
      },
      {
        sku: 'thai-ice-cream-strawberry',
        nameEn: 'Strawberry',
        nameBn: 'স্ট্রবেরি',
        priceBDT: null,
        imageAlt: 'Strawberry Thai Coconut Ice Cream',
        imageSrc: '/assets/products/icecream-strawberry.webp',
      }
    ]
  },
  {
    slug: 'coconut-milk-shake',
    nameEn: 'Coconut Milk Shake',
    nameBn: 'কোকোনাট মিল্ক শেক',
    descriptionEn: 'A rich and creamy blend of fresh coconut meat and milk.',
    descriptionBn: 'ডাবের শ্বাস ও দুধের তৈরি মজাদার মিল্ক শেক।',
    category: 'Shakes & Coffee',
    tags: ['contains-milk'],
    allergens: ['milk'],
    status: 'active',
    sort: 70,
    variants: [
      {
        sku: 'coconut-milk-shake',
        nameEn: 'Regular',
        nameBn: 'রেগুলার',
        priceBDT: null,
        imageAlt: 'Coconut Milk Shake',
        imageSrc: '/assets/products/shake-PLACEHOLDER.webp',
      }
    ]
  },
  {
    slug: 'coconut-milk-shake-basil',
    nameEn: 'Coconut Milk Shake with Basil Seed',
    nameBn: 'কোকোনাট মিল্ক শেক (তোকমা দানা)',
    descriptionEn: 'Our signature milk shake enhanced with healthy, refreshing basil seeds.',
    descriptionBn: 'তোকমা দানা যুক্ত কোকোনাট মিল্ক শেক।',
    category: 'Shakes & Coffee',
    tags: ['contains-milk'],
    allergens: ['milk'],
    status: 'active',
    sort: 80,
    variants: [
      {
        sku: 'coconut-milk-shake-basil',
        nameEn: 'Regular',
        nameBn: 'রেগুলার',
        priceBDT: null,
        imageAlt: 'Coconut Milk Shake with Basil Seed',
        imageSrc: '/assets/products/shake-basil-PLACEHOLDER.webp',
      }
    ]
  },
  {
    slug: 'coconut-coffee',
    nameEn: 'Coconut Coffee',
    nameBn: 'কোকোনাট কফি',
    descriptionEn: 'A perfect fusion of premium roasted coffee and fresh coconut sweetness.',
    descriptionBn: 'কফি ও ডাবের মিষ্টি স্বাদের এক দারুণ মিশ্রণ।',
    category: 'Shakes & Coffee',
    tags: [],
    allergens: [],
    status: 'active',
    sort: 90,
    variants: [
      {
        sku: 'coconut-coffee',
        nameEn: 'Regular',
        nameBn: 'রেগুলার',
        priceBDT: null,
        imageAlt: 'Coconut Coffee',
        imageSrc: '/assets/products/coffee-PLACEHOLDER.webp',
      }
    ]
  }
]
