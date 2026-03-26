# The Booking Cabin Dashboard

A modern admin dashboard for managing cabin bookings, built with React and Supabase.
The application provides tools for handling reservations, cabins, users, and daily operations in a hotel-like system.

---

## Live Demo

https://bookingcabin.netlify.app/

---

## Overview

This project simulates a real-world booking management system.
It focuses on building a scalable frontend architecture with modern React practices, including data fetching, state management, and reusable component design.

---

## Features

* Authentication (login, signup, logout)
* User account management (update profile, avatar, password)
* Cabin management (create, edit, delete cabins)
* Booking management with filtering and sorting
* Check-in / Check-out workflow
* Dashboard with statistics (sales, bookings, occupancy rate)
* Charts and analytics
* Application settings management
* Dark mode support

---

## Tech Stack

* React (Vite)
* React Router
* TanStack Query (React Query)
* Supabase (Authentication & Database)
* Styled Components
* Recharts

Note: The project is currently being migrated to Next.js.


---

## Project Structure

src/
├── context/        # Global state (e.g. dark mode)
├── features/       # Main features (auth, bookings, cabins, dashboard)
├── hooks/          # Custom hooks
├── pages/          # Application pages
├── services/       # API & Supabase logic
├── styles/         # Global styles
├── ui/             # Reusable components
└── utils/          # Helper functions

---

## Getting Started

Clone the repository:

git clone https://github.com/datkhac009/booking-cabins.git

Install dependencies:

npm install

Run the development server:

npm run dev

---

## Environment Variables

Create a `.env` file in the root directory:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_key

---

## Scripts

npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build

---

## Author

Dat Nguyen

