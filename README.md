# MWX Web App

A React-based sensor monitoring application combining interactive 3D building models with comprehensive data dashboards for indoor environmental quality (IEQ) monitoring.

## ✨ Features

- **Dashboard View**: Real-time sensor metrics, interactive charts, and detailed sensor tables
- **3D Model View**: Interactive building navigation with sensor visualization
- **Multiple Modes**: Overview, Sensors, and Scenario interaction modes
- **Responsive Design**: Mobile-friendly with comprehensive theming
- **Type Safety**: Full TypeScript implementation

## 🚀 Quick Start

### Prerequisites
- **Bun** (recommended) or Node.js 18+
- Modern web browser with WebGL support

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd mwx-web-app

# Install dependencies
bun install

# Start development server
bun run dev
```

### Production Build

```bash
# Build for production
bun run build

# Preview production build locally
bun run preview
```

## 🎯 Usage

- **Model View** (`/`): Interactive 3D building with mouse controls and camera presets
- **Dashboard** (`/dashboard`): Sensor metrics, charts, and detailed data tables

## 🛠️ Technology Stack

- **React 19 + TypeScript** - UI framework with type safety
- **Three.js** - 3D graphics and model rendering  
- **Styled Components** - CSS-in-JS styling
- **ECharts** - Data visualization
- **Vite** - Build tool and dev server

## 🔧 Development

### Available Scripts
- `bun run dev` - Start development server
- `bun run build` - Build for production  
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint

### Customization
- **Theme**: Modify `src/providers/Theme/Theme.ts`
- **Sensor Data**: Update `public/data/sensor-data.json`
- **3D Models**: Replace GLB files and update loader configuration

## 📱 Deployment

**GitHub Pages**: Automated deployment on push to `main` branch via GitHub Actions.

**Manual**: Build with `bun run build` and deploy the `dist/` folder.

## 📄 License

This project is private and proprietary. All rights reserved.

## 🆘 Support

For support and questions:
- Check existing issues in the repository
- Review the documentation and code comments
- Contact the development team

---

**Built with ❤️ using React, Three.js, and modern web technologies**
