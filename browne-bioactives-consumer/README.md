# Browne Bioactives - Consumer Store (B2C)

A modern, consumer-focused e-commerce platform for premium supplements. Built by two brothers - Dr. Andrew Browne (PhD in Biochemistry) and Derek Browne (Fitness Expert & Financial Strategist).

## Overview

This is the B2C (Business-to-Consumer) version of Browne Bioactives, designed for direct supplement sales to consumers. Unlike the B2B version (business.brownebioactives.com), this site features:

- Individual product purchases with shopping cart
- Consumer-focused product descriptions emphasizing health benefits
- Smaller quantities suitable for personal use
- Retail pricing with occasional discounts
- Shopping cart and checkout functionality

## Features

- **Product Catalog**: 12 premium supplements across 6 categories (Longevity, Cognitive, Performance, Immune, Energy, Recovery)
- **Shopping Cart**: Full cart management with localStorage persistence
- **Product Details**: Comprehensive product pages with benefits, ingredients, usage, and warnings
- **About Us**: Story of Derek and Andrew's journey to create premium supplements
- **Contact Form**: Customer service contact with validation
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Smooth Animations**: Framer Motion for engaging user experience

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **React Router** for client-side routing
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Hook Form** for form management
- **Lucide React** for icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit http://localhost:5173

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable components (Navbar, Footer)
├── context/         # React context (CartContext)
├── data/            # Product catalog data
├── pages/           # Page components (Home, Shop, Product Detail, Cart, About, Contact)
├── types/           # TypeScript type definitions
├── App.tsx          # Main app with routing
└── main.tsx         # Entry point
```

## Product Categories

1. **Longevity**: NMN, Trans-Resveratrol
2. **Cognitive**: Lion's Mane, Omega-3 DHA/EPA
3. **Performance**: Creatine Monohydrate
4. **Immune**: Vitamin D3+K2, Zinc+Copper
5. **Energy**: CoQ10 Ubiquinol, Rhodiola Rosea
6. **Recovery**: Magnesium Glycinate, Ashwagandha KSM-66, Curcumin

## Key Pages

- `/` - Home page with featured products and company values
- `/shop` - Full product catalog with category filtering
- `/product/:id` - Detailed product pages with add to cart
- `/cart` - Shopping cart with quantity management
- `/about` - Story of Derek and Andrew
- `/contact` - Contact form and company information

## Shopping Cart Features

- Add/remove products
- Adjust quantities
- LocalStorage persistence (cart survives page refreshes)
- Real-time cart total calculation
- Cart item counter in navbar

## Future Enhancements

- [ ] Checkout and payment integration (Stripe)
- [ ] User accounts and order history
- [ ] Product reviews and ratings
- [ ] Email newsletter signup
- [ ] Blog/educational content
- [ ] Subscription options for recurring orders
- [ ] Loyalty rewards program

## Related Projects

- **B2B Site** (`browne-bioactives/`): Business-focused site for bulk orders and sample requests

## License

All rights reserved - Browne Bioactives © 2025
