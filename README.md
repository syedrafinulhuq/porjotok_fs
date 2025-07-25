# 🌍 Porjotok Platform

Porjotok is a **travel-focused social media platform** that connects users through shared travel experiences, trip planning, and community interaction. This monorepo hosts both the **backend API** and the **frontend web application**.

---

## 📁 Project Structure

```
porjotok_fs-main/
│
├── backend/     # NestJS-based REST API server
└── frontend/    # Next.js + Tailwind web client
```

---

## 🛠️ Tech Stack

| Layer         | Technology                                 |
|---------------|---------------------------------------------|
| Frontend      | Next.js 13, React 18, Tailwind CSS          |
| Backend       | NestJS, TypeScript, PostgreSQL, TypeORM     |
| Auth          | JWT, Passport.js                            |
| UI Framework  | Radix UI, DaisyUI, Lucide Icons             |
| Forms         | React Hook Form, Zod                        |
| Validation    | class-validator, zod                        |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/porjotok_fs-main.git
cd porjotok_fs-main
```

---

## 🔧 Backend Setup (`/backend`)

### Install Dependencies

```bash
cd backend
npm install
```

### Configure Environment

Copy the example env file:

```bash
cp .env.example .env
```

Update database credentials and JWT secret.

### Run Development Server

```bash
npm run start:dev
```

### API Docs (Swagger)

```bash
http://localhost:<PORT>/api
```

---

## 🎨 Frontend Setup (`/frontend/project`)

### Install Dependencies

```bash
cd frontend/project
npm install
```

### Run Development Server

```bash
npm run dev
```

### Tailwind Config & Theme

- Uses `tailwindcss`, `daisyUI`, and custom `shadcn/ui` styles
- Central styles in `app/globals.css` and `tailwind.config.ts`

---

## 📦 Deployment

### Backend

```bash
npm run build
npm run start:prod
```

### Frontend

```bash
npm run build
npm run start
```

---

## 🧪 Testing

### Backend

```bash
npm run test
```

Includes unit and E2E tests with Jest.

---

## 🤝 Contributing

1. Fork the repo
2. Create a new feature branch
3. Commit your changes
4. Submit a pull request 🚀

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

## 🙌 Credits

Thanks to:
- [NestJS](https://nestjs.com)
- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com/)
- [Zod](https://zod.dev/)
- And all open-source contributors! 💖
