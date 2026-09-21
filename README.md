<div align="center">

  <img src="public/assets/scenes/brand-banner.webp" alt="Coconut Station" width="100%">

  <h1>Coconut Station 🥥</h1>

  <p>
    A modern digital experience for Coconut Station's premium natural products.
  </p>

  <p>
    <a href="https://www.coconutstation.com/">
      <strong>Visit Live Website →</strong>
    </a>
  </p>

</div>

---

## 🚀 About the Project

**Coconut Station** is the official web application and e-commerce platform for our modern coconut-focused food and product brand. The website is designed to provide customers with a seamless, responsive, and visually delightful experience while showcasing our pure, natural products—from fresh smart-cut coconuts to our signature shakes and desserts.

The primary purpose of the platform is to allow users to explore our catalog, check product details (including allergens and pricing), learn about our brand story, and find physical outlet locations. It serves as both a high-performance marketing presence and an interactive digital storefront.

---

## ✨ Key Features

### Customer Experience
* **Product Browsing:** Easily navigate through product categories.
* **Product Details:** Detailed views with imagery, pricing, descriptions, and dietary/allergen tags.
* **Responsive Navigation:** Fluid, mobile-first design that works flawlessly on all devices.
* **Location Discovery:** Interactive outlets page to find physical store locations.

### Product Experience
* **Interactive Hotspots:** Visually engaging product showcases (e.g., on the homepage).
* **High-Quality Imagery:** Optimized product cards highlighting natural aesthetics.
* **Smart Categorization:** Simple grouping for Coconuts, Desserts, and Shakes & Coffee.

### Interactive Features
* **Animations:** Smooth transitions and micro-interactions powered by Framer Motion.
* **Shopping Cart & Checkout:** Streamlined e-commerce flow for purchasing products.
* **Bilingual Support (i18n):** Seamlessly toggle between English and Bengali content.
* **Forms & Modals:** Accessible, well-designed input forms with Zod validation.

---

## 💻 Tech Stack

| Technology | Purpose |
| ---------- | ------- |
| **Next.js (App Router)** | Full-stack application framework |
| **React 19** | UI development |
| **TypeScript** | Type-safe development |
| **Tailwind CSS v4** | Utility-first styling |
| **Drizzle ORM** | Database queries and schema management |
| **PostgreSQL** | Relational database |
| **Zustand** | Global state management |
| **Motion** | Fluid animations and transitions |
| **Vitest & Playwright** | Unit testing and E2E browser testing |
| **Vercel** | Edge deployment and hosting |

---

## 🎨 Design System

The visual design language is rooted in a natural, fresh aesthetic that perfectly matches our coconut branding.

* **Primary Colors:** Earthy greens and natural cream/off-white.
* **Typography:** Clean, legible sans-serif stack optimized for both English and Bengali scripts.
* **Imagery:** Premium photography combined with clean `.png` cutouts and `.webp` scenes.
* **Components:** Soft border radiuses, subtle drop shadows, and high-contrast accessible buttons.

---

## 🗺️ Website Pages

| Page / Route | Description |
| ------------ | ----------- |
| `/` | Main brand homepage, hero scene, and featured product hotspots |
| `/menu` | Full product catalog and category browsing |
| `/about` | Our brand story, vision, and mission |
| `/outlets` | Physical store locations and operating hours |
| `/gallery` | Visual showcase of our outlets and products |
| `/events` | Upcoming brand events and community gatherings |
| `/checkout` | Secure e-commerce checkout flow |
| `/blog` | Articles, updates, and coconut-related news |
| `/contact` | Customer support and inquiry forms |
| `/privacy` & `/terms` | Legal and compliance information |

---

## 📁 Project Structure

```text
coconut-station/
├── public/                 # Static assets (images, logos, posters)
│   └── assets/             # Structured asset folders (brand, products, scenes)
├── src/
│   ├── app/                # Next.js App Router (pages, layouts, API routes)
│   ├── components/         # Reusable UI components (shell, home, ui)
│   └── content/            # Data layer (catalog.ts, text content)
├── drizzle/                # Database migrations and schema definitions
├── tests/                  # Unit and E2E test suites
├── package.json            # Dependencies and scripts
└── vercel.json             # Deployment configuration
```

---

## 🛠 Getting Started

### Prerequisites
* **Node.js** (v22 or newer)
* **pnpm** (Package manager)
* **PostgreSQL** (Local database or cloud URL)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Niloy-Pramanik/Coconut_Station.git
   cd coconut-station
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

### Environment Variables

Copy the example environment file and configure it:

```bash
cp .env.example .env.local
```

**Example `.env.local`:**
```env
# Database
DATABASE_URL="postgres://user:password@localhost:5432/coconut_station"

# Analytics / External Services (Optional for local dev)
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```
*(Never commit actual database credentials or API secrets to version control!)*

### Run Locally

Start the Next.js development server:

```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗 Build & Production

To generate an optimized production build and run it locally:

```bash
pnpm build
pnpm start
```

---

## 🚀 Deployment

This project is optimized for deployment on **Vercel**. 

1. Push your code to GitHub.
2. Import the repository in your Vercel dashboard.
3. Configure the necessary environment variables (`DATABASE_URL`, etc.).
4. Deploy! Vercel will automatically run `pnpm build` and serve the application.

---

## 📱 Responsive Design

The application implements a fluid, responsive design that adapts flawlessly across:
* **Mobile Devices:** Stacked layouts, optimized touch targets, and mobile-friendly navigation menus.
* **Tablets:** Adaptive grids for product catalogs and balanced text scaling.
* **Desktop:** Immersive hero scenes, expansive interactive product hotspots, and multi-column layouts.

---

## ⚡ Performance & Accessibility

* **Image Optimization:** Utilizes Next.js `<Image />` component for lazy-loading, WebP conversion, and optimized responsive sizing.
* **Performance:** Edge-compatible middleware and server-rendered components for lightning-fast First Contentful Paint (FCP).
* **Accessibility:** Semantic HTML structure, high color contrast, and proper ARIA labeling for interactive UI components (powered by Radix UI primitives).
* **SEO Metadata:** Dynamic Open Graph images, proper meta titles/descriptions, and `robots.txt` / `sitemap.xml` generation.

---

## 📸 Preview

### Brand Showcase
<p align="center">
  <img src="public/assets/scenes/hero-scene-desktop.webp" alt="Coconut Station Hero Scene" width="800">
</p>

*(More screenshots can be found in the live application gallery)*

---

## 🌐 Live Demo

**Website:** [Visit Coconut Station →](https://www.coconutstation.com/)

---

## 🧑‍💻 Development Notes

* **Architecture:** The project follows a strictly typed, component-driven architecture using React Server Components where beneficial.
* **UI Primitives:** Relies on Radix UI for accessible, unstyled baseline components, styled via Tailwind CSS.
* **Data Layer:** Products and content are managed cleanly in `src/content/` (e.g., `catalog.ts`), making it easy to update menus without deep component changes.

---

## 🌱 Future Improvements

* **Customer Accounts:** Order history and saved preferences.
* **Enhanced Order Tracking:** Real-time updates for delivery.
* **Admin Dashboard:** In-house management of the product catalog and inventory.
* **Analytics Integration:** Deep insights into customer behavior and popular products.

---

## 👤 Author

Developed by **Niloy Pramanik**
