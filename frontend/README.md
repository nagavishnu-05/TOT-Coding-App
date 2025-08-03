# Trialthon of Tech - Frontend

This is a React application for the "Trialthon of Tech" event organized by the Department of Computer Science and Engineering at Velammal College of Engineering and Technology.

## Features

- Beautiful glassmorphism design with Tailwind CSS
- Responsive layout with modern animations
- React Router for navigation
- Lucide React icons for enhanced UI

## Setup Instructions

### 1. Install Dependencies

First, install the required dependencies:

```bash
npm install lucide-react react-router-dom
```

### 2. Add Logo Images

Place your logo images in the `src/assets/` directory:
- `VCET Logo.jpg` - Velammal College of Engineering and Technology logo
- `CSE LOGO.jpg` - Computer Science and Engineering department logo

### 3. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   └── OpeningPage.jsx          # Main opening page component
├── styles/
│   └── glassmorphism.css        # Glassmorphism and animation styles
├── assets/
│   ├── VCET Logo.jpg           # VCET logo (add your image)
│   └── CSE LOGO.jpg            # CSE logo (add your image)
├── App.jsx                      # Main app component with routing
└── index.css                    # Global styles with Tailwind imports
```

## Features

- **Glassmorphism Design**: Modern glass-like effects with backdrop blur
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Smooth Animations**: Powder animations for the title section
- **Navigation**: Sign Up and Login buttons with routing
- **Information Cards**: Overview, Theme, Objectives, and Team sections

## Dependencies

- React 19.1.0
- React Router DOM (for navigation)
- Lucide React (for icons)
- Tailwind CSS (for styling)
- Vite (for development and building)

## Customization

You can customize the following:
- Colors and gradients in the CSS files
- Logo images in the assets folder
- Text content in the OpeningPage component
- Animation timing in the glassmorphism.css file

## Building for Production

```bash
npm run build
```

This will create a production-ready build in the `dist/` directory.
