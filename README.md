# Lifeeasy Frontend - MLM E-commerce Platform

## About

Lifeeasy is a comprehensive MLM (Multi-Level Marketing) e-commerce platform built with modern web technologies. The platform features an interactive MLM network structure, product management, and a professional user interface.

## Features

### 🏠 **Home Page**
- Interactive MLM Network Structure with SVG visualization
- New Arrivals product section
- Featured Products carousel
- Professional banner carousel
- Business Logic section with hierarchical tree view

### 🛍️ **E-commerce**
- Product catalog with filtering and search
- Shopping cart functionality
- Product details pages
- Responsive product cards

### 🎨 **Design & UX**
- Dark/Light theme toggle
- Mobile-responsive design
- Professional industry-level navbar
- Smooth animations with Framer Motion
- Glass-card effects and modern UI

### 📱 **Mobile Experience**
- Responsive navigation
- Mobile-optimized product grids
- Touch-friendly interfaces
- Collapsible mobile menus

## Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context API
- **Routing**: React Router DOM

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Navbar, Footer)
│   ├── sections/       # Page sections (Banner, Products)
│   └── ui/            # Base UI components
├── pages/              # Page components
├── contexts/           # React contexts (Theme, Language)
├── hooks/              # Custom React hooks
├── services/           # API services
└── config/             # Configuration files
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adityagithubraj/lifeeasy_frontend.git
   cd lifeeasy_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Key Components

### MLM Network Structure
The platform features an interactive SVG-based MLM network visualization showing:
- Level 1: Sponsor (YOU)
- Level 2: Direct Recruits (A, B)
- Level 3: Second Level Recruits (A1, A2, B1, B2)

### Product Management
- Product catalog with filtering
- Category and brand management
- Price range filtering
- Search functionality

### Theme System
- Dark/Light mode toggle
- Consistent theming across components
- CSS custom properties for colors

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the GitHub repository.

---

**Built with ❤️ for the Lifeeasy MLM platform**
