# Zomato Lite (Frontend)

A responsive, mobile-first food delivery platform frontend built with React, TypeScript, and Ant Design.

---

## Features

* **Authentication:** Validated login/signup and protected routing.
* **Restaurant Management:** Menu CRUD, operation hours setup, and daily CSV menu uploads.
* **Ordering System:** Restaurant browsing, single-source cart setup, dynamic booking fees, and sorting/filtering.
* **Order Tracking:** Real-time lifecycle status updates with an ETA countdown timer.
* **Dashboard:** Metrics summary tracking active users, restaurants, and daily orders.

---

## Architecture Constraints

* **Layouts:** Driven entirely by semantic `div` layouts (Flexbox/Grid). Native `table` structures are forbidden.
* **Styles:** Written purely in custom mobile-first SCSS using the BEM architecture model and standard CSS Resets. No utility style frameworks allowed.
* **State:** Configured via React-Redux v4.x without the use of RTK Query.

---

## Tech Stack

* **Core:** React 19, TypeScript 6, react-router-dom v6
* **UI & Forms:** Ant Design v4.x, Formik v2.x
* **Build & Tools:** Webpack 5, Sass, PostCSS, ESLint, Prettier, Jest
* **Package Manager:** pnpm

---

## Getting Started

### Installation
```bash
git clone https://github.com/amitpatel-2004/ZomatoLite-UID00683-Frontend
cd zomato-lite-frontend
pnpm approve-builds
pnpm install
```

### Commands
```bash
pnpm run serve   # Start local hot-reloading development server
pnpm run build   # Compile and optimize assets for production
pnpm run test    # Run test suites via Jest
```
