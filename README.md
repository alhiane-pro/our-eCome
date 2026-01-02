# 🛒 OurEcom - Full-Stack eCommerce Application

A modern, type-safe eCommerce platform built with **React 19**, **TypeScript**, and **Redux Toolkit**. This project demonstrates a complete shopping flow, from category browsing to stock-aware cart management and user authentication.

---

## 📸 Project Preview

[![Project Preview](https://github.com/alhiane-pro/our-eCome/blob/main/eCommerce-03.png)](Destination_URL)

---

[![Project Preview](https://github.com/alhiane-pro/our-eCome/blob/main/eCommerce-02.png)](Destination_URL)

---

[![Project Preview](https://github.com/alhiane-pro/our-eCome/blob/main/eCommerce-01.png)](Destination_URL)

---

---

## 🛠️ Tech Stack

### Frontend

- **Framework:** React 19 (Vite)
  
- **Language:** TypeScript
  
- **State Management:** Redux Toolkit & Redux Persist (for local storage sync)
  
- **Routing:** React Router Dom v7
  
- **Styling:** Bootstrap & React-Bootstrap
  
- **Form Handling:** React Hook Form & Zod (Schema validation)
  
- **Animations:** Framer Motion
  
- **Data Fetching:** Axios

### Backend (Mock API)

- **Server:** `json-server`
  
- **Auth:** `json-server-auth` (Handles JWT-based Register/Login)

### Testing

- **Runner:** Vitest
  
- **DOM Testing:** React Testing Library (RTL) & Jest DOM
  
- **Network Mocking:** MSW (Mock Service Worker)

---

## ✨ Features

- **Dynamic Routing:** Categorized browsing (Men, Women, Kids, Baby, Sport).
  
- **Cart System:** Real-time stock validation (checks remaining items available).
  
- **Wishlist:** Persisted favorite items.
  
- **User Auth:** Full registration and login flow with protected routes.
  
- **Persistence:** Redux state survives page refreshes via `redux-persist`.
  
- **Responsive UI:** Mobile-first design using Bootstrap.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/alhiane-pro/our-eCome.git

cd our-eCome
```

### 2. Setup the Backend

Open terminal:

```bash
cd eCommerce-backend

npm install

npm start
```

The mock server will start on http://localhost:3000.

### 3. Setup the Frontend

Open a new terminal:

```bash
cd eCommerce-frontend

npm install

npm run dev
```

The application will be available at http://localhost:5173.

### 4. 🧪 Testing & Linting

To run the unit and component tests:

```bash
npm run test
```

To run the linter:

```bash
npm run lint
```

## 👨‍💻 Author

Lahcen Alhiane - [GitHub](https://github.com/alhiane-pro) - [LinkedIn](https://www.linkedin.com/in/lahcen-alhiane-61217239a/)
