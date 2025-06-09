# Buku Pintar - Smart Learning Platform

A modern web application built with Next.js using MVVM architecture, focusing on SEO optimization and best practices.

## Project Structure

```
src/
├── app/              # Next.js app directory
├── assets/           # Static assets like images and fonts
├── components/       # Reusable UI components
├── config/           # Application configuration
├── constants/        # Application constants
├── hooks/            # Custom React hooks
├── models/           # Data models and interfaces
├── services/         # API and external service integrations
├── styles/           # Global styles and CSS modules
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── viewmodels/       # ViewModels for state management
└── views/            # View components
```

## Features

- 🏗️ MVVM Architecture
- 🔍 SEO Optimized
- 🎨 Tailwind CSS for styling
- 📱 Responsive Design
- 🔒 Type Safety with TypeScript
- 🚀 Next.js 14 with App Router

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture Overview

### MVVM Pattern Implementation

- **Models**: Data structures and business logic
- **Views**: React components for UI rendering
- **ViewModels**: State management and business logic for views
- **Services**: API calls and external service integrations

### SEO Optimization

- Metadata configuration in layout.tsx
- Dynamic metadata for each page
- Semantic HTML structure
- OpenGraph and Twitter card support

## Development

- Use TypeScript for type safety
- Follow the MVVM pattern for new features
- Implement SEO best practices
- Write clean, maintainable code

## License

MIT
