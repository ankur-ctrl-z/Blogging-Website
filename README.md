# 📝 Medium-like Blogging Platform

A fully-featured, modern **blogging platform inspired by Medium**, built with cutting-edge technologies for scalability, security, and developer experience.

---

## 🚀 Tech Stack

| Layer              | Technology                |
| ------------------ | ------------------------- |
| **Frontend**       | React, TypeScript         |
| **Backend**        | Hono (Cloudflare Workers) |
| **API Validation** | Zod                       |
| **ORM**            | Prisma                    |
| **Database**       | PostgreSQL (Aiven)        |
| **Authentication** | JWT (JSON Web Tokens)     |
| **Serverless**     | Cloudflare Workers        |

---

## 🌟 Features

* 📝 **Create, Edit, Publish Blogs**
* 🔍 **Search & Browse Articles**
* 👤 **User Authentication & Authorization (JWT-based)**
* 💬 **Comment on Posts** *(Future enhancement)*
* ❤️ **Like / Bookmark Blogs** *(Future enhancement)*
* 🛡️ **Schema Validation with Zod**
* 🔥 **Serverless Backend with Cloudflare Workers**
* ⚡ **Optimized ORM using Prisma with Connection Pooling**
* 📈 **Fully Typed Codebase with TypeScript**

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd ../backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the **backend** directory:

```dotenv
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>?schema=public
JWT_SECRET=your_secret_key
```

### 4. Setup Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Run Development Servers

#### Frontend

```bash
cd frontend
npm run dev
```

#### Backend (Cloudflare Workers via Wrangler)

```bash
cd ../backend
npx wrangler dev
```

---

## ✅ API Overview

### User Routes (`/api/v1/user`)

| Method | Endpoint  | Description              |
| ------ | --------- | ------------------------ |
| POST   | `/signup` | Register a new user      |
| POST   | `/signin` | User login (returns JWT) |

### Blog Routes (`/api/v1/blog`)

| Method | Endpoint | Description             |
| ------ | -------- | ----------------------- |
| POST   | `/`      | Create a new blog post  |
| PUT    | `/`      | Update an existing post |
| GET    | `/bulk`  | Fetch all blog posts    |
| GET    | `/:id`   | Fetch a blog by ID      |

> All protected routes require **Authorization Header**:
> `Authorization: Bearer <JWT_TOKEN>`

---

## 🗂️ Project Structure

```
/frontend       # React + TypeScript frontend
/backend        # Hono + Cloudflare Workers backend
/prisma         # Prisma schema & migrations
```

---

## 🧩 Future Enhancements

* 🔔 Notifications for likes and comments
* ✍️ Rich text editor for blogs
* 📊 Analytics for authors
* 🏷️ Tags and categories for content filtering
* 💬 Comments on Blogs
* ❤️ Like / Bookmark functionality
* 🌐 Deployment pipelines (CI/CD)

---

## 🌍 Deployment

* **Frontend:** Deployed on **Vercel**
* **Backend:** Deployed via **Cloudflare Workers (Wrangler)**
* **Database:** Hosted on **Aiven PostgreSQL**

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check [issues](https://github.com/your-username/your-repo-name/issues) or submit a **PR**.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Ankur Sharma**

* 🔗 [LinkedIn](https://www.linkedin.com/in/ankur-sharma-3a6037226?original_referer=https%3A%2F%2Fgithub.com%2Fankur-ctrl-z)
* 🔗 [X (Twitter)](https://x.com/__ankur01__)

---
