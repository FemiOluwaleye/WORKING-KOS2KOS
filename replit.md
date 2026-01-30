# KOS2KOS Website

## Overview

KOS2KOS is a local holding company website built with a React frontend and Express backend. The site showcases their vending machine services, ATM services, and small business acquisitions. It features a contact form that sends emails via Resend integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack React Query for server state
- **Animations**: Framer Motion for page transitions and effects
- **Theme**: Light/dark mode support via custom ThemeProvider

### Backend Architecture
- **Framework**: Express 5 running on Node.js
- **Language**: TypeScript with ESM modules
- **Build**: Vite for frontend, esbuild for backend bundling
- **Development**: Hot module replacement via Vite middleware

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts`
- **Current Tables**: Users table (basic auth structure)
- **Session Storage**: In-memory storage for development (MemStorage class)

### API Structure
- Contact form endpoint: `POST /api/contact`
- Validation: Zod schemas for request validation
- Error handling: Centralized error responses with proper HTTP status codes

## External Dependencies

### Email Service
- **Resend**: Email delivery for contact form submissions
- Integration uses Replit Connectors for credential management
- Sends to `biz.kos2kos@gmail.com`

### Database
- **PostgreSQL**: Primary database via `DATABASE_URL` environment variable
- **Drizzle Kit**: Database migrations and schema push (`npm run db:push`)

### Replit-Specific Integrations
- Replit Connectors for Resend API credentials
- Vite plugins for development banner and cartographer
- Runtime error overlay for development debugging

### UI Component Library
- shadcn/ui (New York style variant)
- Radix UI primitives for accessible components
- Lucide icons