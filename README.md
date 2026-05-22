# VanLife

A van rental platform built with React + TypeScript + Vite.

## Features

### 1. Van Catalog & Filtering
Browse available vans with type-based filtering (simple, luxury, rugged). Filter state is persisted in URL search params.

### 2. Van Detail View
View detailed information about each van with back-navigation that preserves the current filter state.

### 3. Authentication
Login system with localStorage-based auth persistence and route protection via React Router loaders.

### 4. Host Dashboard
Host hub showing earnings summary, review score, and listed vans with quick links to management.

### 5. Host Van Management
Full CRUD interface for managing vans with nested tabs for Info, Pricing, and Photos.

## Tech Stack

- **React 19** with TypeScript
- **React Router 7** (data layer API with loaders/actions)
- **Firebase** (Firestore for data persistence)
- **MirageJS** (mock server for development)
- **Vite** (build tool)
- **react-icons** (icon library)

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env` file with your Firebase config:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Type-check and build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint
