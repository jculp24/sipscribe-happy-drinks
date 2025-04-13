
# Sipscribe - Beverage Subscription App

![Sipscribe Logo](/lovable-uploads/603468bd-8f0d-4eee-a527-7ef15646b137.png)

Sipscribe is a mobile-first web application that connects users with local beverage vendors through a flexible subscription service. This platform allows users to discover and enjoy a variety of drinks from coffee shops, bubble tea stores, smoothie bars, and more - all within a convenient subscription model.

## Features

### User Authentication
- Simple login/logout functionality
- User profile management

### Home Screen & Discovery
- Interactive map showing nearby vendor locations
- Category-based filtering (Coffee, Bubble Tea, Juice, Smoothie, etc.)
- Search functionality to find specific vendors or drinks
- Vendor listing with key information

### Vendor Details
- Detailed vendor information including menu, location, and hours
- Menu browsing with item descriptions and prices
- Add items to cart directly from vendor pages
- Save favorite vendors for quick access

### Subscription Management
- Multiple subscription tiers:
  - **Single-Use Credit**: One-time purchase for a single drink
  - **Basic Monthly**: $14.99/month for 30 credits
  - **Premium Monthly**: $29.99/month for 60 credits
  - **Annual**: $299.99/year for 730 credits
- Subscription management interface
- Credit usage tracking

### Shopping & Orders
- Add items to cart from multiple vendors
- Adjust quantities in cart
- Checkout process using subscription credits
- Order history with detailed purchase information

### Profile & Settings
- User profile management
- Subscription status and credit balance
- Order history
- Dark/light theme toggle
- Quick access to favorite vendors

## Technical Stack

Sipscribe is built with:

- **React**: Frontend framework
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library
- **React Router**: Navigation and routing
- **Mapbox**: Location and mapping services
- **Vite**: Frontend build tool

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd sipscribe

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Application Structure

```
sipscribe/
├── src/
│   ├── components/       # Reusable UI components
│   ├── contexts/         # React contexts (e.g., CartContext)
│   ├── data/             # Mock data and utilities
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── pages/            # Page components for different routes
│   ├── providers/        # Provider components (e.g., ThemeProvider)
│   └── App.tsx           # Main application component with routing
```

## Deployment

The application can be deployed to various platforms like Netlify, Vercel, or GitHub Pages.

```bash
# Build the application
npm run build

# Preview the production build locally
npm run preview
```

## Contributing

Contributions to Sipscribe are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- All icons provided by Lucide Icons
- UI components from shadcn/ui library
- Map functionality powered by Mapbox
