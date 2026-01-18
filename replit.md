# FoodDash - Food Delivery Application

## Overview

FoodDash is a full-stack food delivery platform built with React, TypeScript, and Express. The application serves three distinct user types: customers ordering food, restaurant partners managing their menus and orders, and delivery partners handling deliveries. It also includes a comprehensive admin portal for platform management.

The frontend uses React with Vite, styled with Tailwind CSS v4 and Shadcn/UI components. The backend runs on Express with PostgreSQL via Drizzle ORM. State management relies on React Query for server state and local React hooks for UI state.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom plugins for meta images and Replit integration
- **Routing**: Wouter (lightweight alternative to React Router)
- **Styling**: Tailwind CSS v4 with CSS variables for theming, Shadcn/UI component library
- **Animations**: Framer Motion for UI transitions and micro-interactions
- **State Management**: 
  - React Query (TanStack Query) for server state
  - Custom hooks with useState for local cart and UI state in `client/src/lib/store.ts`

### Backend Architecture
- **Runtime**: Node.js with Express
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` contains all database table definitions
- **API Pattern**: RESTful endpoints prefixed with `/api`
- **Storage Interface**: Abstracted storage layer in `server/storage.ts` supporting in-memory and database backends

### Project Structure
```
client/           # React frontend
  src/
    components/   # Reusable UI components
    pages/        # Route-level page components
    lib/          # Utilities, store, query client
    hooks/        # Custom React hooks
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route definitions
  storage.ts      # Data access layer
shared/           # Shared code between client/server
  schema.ts       # Drizzle database schema
```

### Theming System
The app uses three distinct visual themes:
- **Customer Portal**: Light theme with orange/red primary colors
- **Admin Dashboard**: Dark slate theme with violet/purple accents
- **Delivery Portal**: Dark emerald/teal gradient theme

Theme variables are defined in `client/src/styles/themes.css` and `client/src/index.css`.

### Database Schema
Tables defined in `shared/schema.ts`:
- `users` - Customer accounts
- `restaurants` - Restaurant listings
- `menuItems` - Menu items linked to restaurants
- `orders` - Order records
- `orderItems` - Individual items within orders

### Build System
- Development: `npm run dev` runs the Express server with Vite middleware
- Production: `npm run build` uses esbuild for server bundling and Vite for client, outputs to `dist/`
- Database migrations: `npm run db:push` uses Drizzle Kit

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Schema management and query building
- **connect-pg-simple**: Session storage in PostgreSQL

### UI Libraries
- **Radix UI**: Headless component primitives (dialogs, dropdowns, tabs, etc.)
- **Lucide Icons**: Icon library
- **Framer Motion**: Animation library
- **class-variance-authority**: Component variant management
- **cmdk**: Command palette component

### Development Tools
- **Vite**: Frontend build tool with HMR
- **esbuild**: Server bundling for production
- **TypeScript**: Type checking across the codebase
- **Tailwind CSS v4**: Utility-first CSS framework