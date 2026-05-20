# Ashutosh Dey — Portfolio

A professional wildlife researcher portfolio built with Next.js 16, GSAP, MongoDB, Cloudinary, and Tailwind CSS.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin password (plain text or bcrypt hash) |
| `JWT_SECRET` | Secret key (min 32 chars) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `SMTP_HOST` | SMTP server (e.g. smtp.gmail.com) |
| `SMTP_PORT` | SMTP port (587) |
| `SMTP_USER` | Email address |
| `SMTP_PASS` | App password |

## 🔐 Admin Login

1. Click **Login** in the navbar
2. Enter admin email + password  
3. Check your email for OTP
4. **Dev mode**: If SMTP fails, the OTP is printed to the terminal console and shown in the login modal

Default credentials (change before deploying):
- Email: `admin@gmail.com`  
- Password: `admin@gmail.com`

## 🎨 Features

- Full-page animated portfolio with GSAP scroll animations
- Firefly particle system on hero section
- Horizontal scroll for research projects
- Admin mode: click any text to edit inline, save to MongoDB
- Image upload via Cloudinary (admin only)
- OTP-based login with email delivery

## 🏗️ Build for Production

```bash
npm run build
npm start
```

Remember to set `JWT_SECRET` to a strong random string in production.
