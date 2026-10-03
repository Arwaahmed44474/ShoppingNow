# 🛍️ ShoppingNow — Modern E-Commerce Web Application

**ShoppingNow** is a full-featured, modern E-Commerce web application built with **Next.js 16 (App Router)** and **React 19**. It offers a seamless online shopping experience with rich product browsing, secure authentication flows, cart and wishlist management, order tracking, and a clean, responsive user interface.

🎨 **Figma Design Reference:** [FreshCart E-Commerce Design](https://www.figma.com/design/7GOjynvDWj2Lnbb4IKjbXK/Freshcart---E-Commerce-?node-id=12-2477&p=f)

---

## ✨ Features & Tech Stack

### 🛠️ Core Dependencies & Tech Stack
- **Framework:** Next.js 16 (App Router) & React 19
- **Styling:** Tailwind CSS v4 & PostCSS
- **Icons:** Tabler Icons React (`@tabler/icons-react`)
- **API Client:** Axios
- **Form Management:** React Hook Form
- **Schema Validation:** Zod
- **Client State Management:** Redux Toolkit (`@reduxjs/toolkit`) & React Redux
- **Server State Management:** TanStack React Query v5 & React Query Devtools
- **Feedback & Alerts:** Sonner (Toast Notifications), SweetAlert2
- **UI Components & Utilities:** Swiper (Sliders), React Image Gallery

---

## 📁 App Structure & Page Mapping

The project follows Next.js App Router conventions, divided into core feature routes and auth groups:

### 🔐 Authentication Flow `(auth)`
- [x] **Sign In:** `/login` — User authentication.
- [x] **Sign Up:** `/signup` — Account registration with validation.
- [x] **Forgot Password:** `/forgot-password` — Step 1: Send reset code to email.
- [x] **Verify Code:** `/verify-code` — Step 2: Validate 6-digit OTP code.
- [x] **Reset Password:** `/reset-password` — Step 3: Set up a new secure password.

---

### 🛒 Platform Routes `(platform)`
- [x] **Home Page:** `/` — Main landing page featuring banners, categories, and highlighted products.
- [x] **Shop Page:** `/shop` — Complete product listings with filtering & sorting.
- [x] **Product Details:** `/products/[id]` — Detailed view with image gallery, specs, and add-to-cart options.
- [x] **Cart:** `/cart` — Cart management, quantity updates, and checkout triggers.
- [x] **Wishlist:** `/wishlist` — Saved favorite products for logged-in users.
- [x] **Categories:** `/categories` — Grid view of product categories.
- [x] **Brands:** `/brands` — Partners and featured brand pages.
- [x] **My Orders:** `/orders` — Order history and tracking status.
- [x] **Contact Us:** `/contact` — Contact support form and company info.
- [x] **Terms & Conditions:** `/terms` — Usage policies and store rules.
- [x] **Privacy Policy:** `/privacy` — User data privacy guidelines.
- [x] **Global Layout & Not Found:** `layout.tsx`, `not-found.tsx` — App Shell & custom 404 page.

#### 🚧 Pending / In Progress
- [ ] **Product Search:** `/search` — Live search and advanced filtering page.
- [ ] **My Account / Profile:** `/profile` — User profile management, address book, and security settings.

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/shoppingnow.git](https://github.com/your-username/shoppingnow.git)
   cd shoppingnow