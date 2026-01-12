# FoodDash - Food Delivery App

## Overview
A full-stack food delivery application built with React, Express, and PostgreSQL.

## Tech Stack
- **Frontend**: React 19 with Vite, TailwindCSS, Radix UI components
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: Wouter for client-side routing

## Project Structure
```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom hooks
│   │   └── lib/         # Utilities
│   └── public/          # Static assets
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API routes
│   ├── storage.ts    # Data storage
│   └── vite.ts       # Vite dev middleware
├── shared/           # Shared types/schema
│   └── schema.ts     # Drizzle schema
└── script/           # Build scripts
```

## Development
- Run `npm run dev` to start the development server
- The app runs on port 5000
- Frontend uses Vite HMR in development

## Database
- Uses PostgreSQL via Drizzle ORM
- Schema defined in `shared/schema.ts`
- Run `npm run db:push` to push schema changes

## Production
- Build: `npm run build`
- Start: `npm run start`
