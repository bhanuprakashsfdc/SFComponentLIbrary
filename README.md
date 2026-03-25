# Salesforce Component Library

A Vite.js-based component library for building reusable Salesforce Lightning Web Components (LWC) and UI extensions.

## Project Overview

This project provides a foundation for building and managing Salesforce-compatible UI components using modern JavaScript tooling. It serves as a development environment for creating, testing, and packaging components that can be deployed to Salesforce orgs.

## Features

- **Vite.js Build System**: Fast development server and optimized production builds
- **Salesforce Compatible**: Components designed to work with Salesforce Lightning Experience
- **Component Library**: Reusable UI components following Salesforce design patterns
- **Modern Development**: ES modules, hot module replacement, and modern JavaScript

## Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── styles/         # Global styles and design tokens
│   ├── utils/         # Utility functions
│   └── main.js        # Entry point
├── public/            # Static assets
├── index.html         # Development HTML entry
└── package.json       # Project configuration
```

## Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

### Building

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Usage

This component library can be used to:
1. Develop custom Lightning Web Components for Salesforce
2. Build UI components that integrate with Salesforce Lightning Design System (SLDS)
3. Create reusable components for Salesforce apps and extensions

## Technologies

- **Vite**: Next-generation frontend tooling
- **JavaScript**: Modern ES6+ modules
- **Salesforce**: Lightning Web Components (LWC) compatibility

## License

Private - For internal Salesforce development use.