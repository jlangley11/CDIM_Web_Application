# Azure DCSA CDIM Evaluation Tool

## Overview

This is a React web application designed for Microsoft Azure DCSA (Data, Cloud, Security, and AI) sellers to evaluate customer call transcripts against the 2Win CDIM framework. The application processes AI-analyzed transcript data and presents it through interactive flip cards, dynamic scorecards, and comprehensive analysis sections. Users can upload JSON files containing structured CDIM evaluations and visualize the results through a modern, enterprise-focused interface that follows Microsoft's design principles.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses a modern React 18+ architecture with TypeScript and functional components throughout. The UI is built using shadcn/ui component library with Radix UI primitives, providing accessible and customizable components. The design system follows Microsoft's Fluent Design principles with Azure branding, featuring a comprehensive color palette that includes light/dark mode support and component-specific color coding (blue for current state, green for desired state, purple for impact, orange for metrics).

### State Management and Data Flow
The application uses React hooks for local state management with React Query (TanStack Query) for server state and caching. Data validation is handled through Zod schemas that ensure uploaded JSON files conform to the expected CDIM evaluation structure. The main data flow involves file upload, JSON validation, and state propagation to visualization components.

### Component Architecture
The application follows a modular component structure with reusable UI components. Key components include:
- **FlipCard**: Interactive 3D CSS transform cards showing confirmed information on front and gaps/questions on back
- **Scorecard**: Dynamic scoring visualization with color-coded progress indicators
- **FileUpload**: Drag-and-drop JSON file processor with validation
- **ExecutiveSummary**: Professional formatting for AI-generated summaries
- **ImpactStatement**: Business impact visualization with TBD note handling
- **Recommendations**: Collapsible sections for follow-ups and proof plans

### Styling and Design System
Built with Tailwind CSS using a custom configuration that extends the default theme with enterprise-focused design tokens. The styling system includes consistent spacing units, typography hierarchy (Inter font primary, JetBrains Mono for code), and a comprehensive color system supporting both light and dark modes. CSS custom properties enable dynamic theming with hover and active state management.

### Build and Development Tools
The project uses Vite as the build tool with TypeScript configuration for type safety. The development environment includes hot module replacement, error overlays, and Replit-specific tooling integration. PostCSS handles CSS processing with Tailwind and Autoprefixer plugins.

### Backend Architecture (Minimal)
The application includes a minimal Express.js server setup with route placeholders, primarily serving the React application. The backend uses an in-memory storage interface that can be extended for database integration if needed.

## External Dependencies

### UI and Component Libraries
- **shadcn/ui**: Complete component library built on Radix UI primitives
- **Radix UI**: Accessible, unstyled component primitives for complex UI components
- **Lucide React**: Icon library providing consistent iconography
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Hook Form**: Form handling with validation
- **TanStack React Query**: Server state management and caching

### Data Validation and Processing
- **Zod**: TypeScript-first schema validation for JSON data processing
- **Drizzle ORM**: Type-safe database toolkit (configured for PostgreSQL)
- **Drizzle Zod**: Integration between Drizzle and Zod for schema validation

### Development and Build Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety and enhanced developer experience
- **React**: Core framework (version 18+)
- **PostCSS**: CSS processing and optimization

### Database Integration
- **Neon Database**: PostgreSQL-compatible serverless database (via @neondatabase/serverless)
- **Drizzle Kit**: Database migration and introspection tools
- The database configuration is set up but not actively used in the current implementation

### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional CSS class composition
- **class-variance-authority**: Type-safe variant management for components
- **wouter**: Lightweight routing library for React

The application is designed to be primarily client-side focused with the ability to expand backend functionality as needed. The database setup suggests future capability for persisting evaluations and user data.