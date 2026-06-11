# Online Book Borrowing Platform (eLibrary)

A modern, full-stack university library network platform built with Next.js, React, and MongoDB. The system allows verified students and members to browse a digital catalog, manage account profiles, view real-time item availability, and securely reserve library volumes through an interactive web interface.

---

## 📌 Project Purpose

The **Online Book Borrowing Platform** bridges the gap between traditional university libraries and digital ease. It aims to eliminate long queues and catalog confusion by providing an immediate, real-time look into a library's active inventory. This platform provides robust user authentication, protects sensitive intellectual property routes, and delivers a sleek user experience designed for students managing academic coursework.

---

## 🚀 Live Application

* **Production Deployment URL:** *[Live URL Coming Soon]* > *(Note: The live site URL will be updated here immediately upon deployment to production hosting services like Vercel or Netlify).*

---

## ✨ Key Features

* **Secure Unified Authentication:** Built-in credentials registration and login workflows alongside secure Google Social Sign-In powered by Better Auth.
* **Cohesive User Notifications:** Custom sleek, dark-themed charcoal toast popups (`#0f172a`) confirming all major lifecycle events (Log In, Registration, Log Out, and Reservations).
* **Dynamic Catalog System:** Smooth browsing filters matching target parameters like book categories, authors, and precise individual volumes.
* **Protected Private Routing:** Secure layout shield system utilizing React hooks to block unauthenticated visitors from accessing internal pages or book detail sub-routes without an active session.
* **Real-Time Queue Management:** Interactive book reservation button tracking available stock limits, automatically decrementing quantities, and locking out double-reservations.
* **Responsive User Interfaces:** Built with semantic accessibility structures and fluid grid systems optimized for both desktop viewports and mobile devices.

---

## 📦 Core NPM Packages Used

The platform relies on the following major dependencies to run efficiently:

| Package | Purpose |
| :--- | :--- |
| **next** (v15+) | React framework providing Server-Side Rendering (SSR) and client routing. |
| **react** / **react-dom** | Core library for component-based rendering architecture. |
| **better-auth** | Advanced session handling, cookie control, and multi-provider social authentication. |
| **react-hook-form** | Lightweight form validation and execution engine for clean input state handling. |
| **react-hot-toast** | Dynamic notification popups offering extensive inline custom styling controls. |
| **react-icons** | Accessible icon packaging including font families like FontAwesome and FlatIcons. |
| **tailwindcss** | Utility-first CSS layout engine handling clean, scalable application designs. |
| **daisyui** | Tailwind CSS component plugin providing pre-styled semantic design tokens. |

---

## 🛠️ Getting Started Locally

Follow these quick steps to get a local copy of this repository up and running on your machine:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/book-borrowing-platform.git](https://github.com/your-username/book-borrowing-platform.git)
   cd book-borrowing-platform
