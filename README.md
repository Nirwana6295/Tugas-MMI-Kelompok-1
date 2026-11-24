# GeoSpatialX MMI — Production Deployment Guide for Railway

Aplikasi web Multimedia Interaktif (MMI) Geografi Kelas X SMA terintegrasi **PostgreSQL 16 + PostGIS**, **Google Maps 3-Level Spatial Explorer**, dan **Asesmen Sumatif C4 HOTS** (Studi Kasus: SMAN 1 Mejayan, Kab. Madiun).

---

## 🚀 Persiapan Deployment di Railway

Folder ini (`MMI-deploy`) telah dibersihkan dari seluruh berkas *scratch*, dump teks, dan skrip *audit*, sehingga siap untuk diunggah ke GitHub atau langsung dideploy via Railway CLI.

### Struktur Berkas Bersih (Clean Directory)
```text
MMI-deploy/
├── src/                    # Seluruh Next.js App Router, Komponen UI, Lib & Store
│   ├── app/                # (admin), (student), (teacher), (validator), api, login, page
│   ├── components/         # layout, learning, map, providers, quiz, ui
│   ├── lib/                # db/prisma, spatial/postgis, validators/schemas, utils
│   ├── store/              # useMapStore, useQuizStore, useLearningStore
│   └── types/              # Deklarasi TypeScript
├── prisma/                 # Skema Prisma & Migrasi PostGIS
│   ├── schema.prisma       # 8 Model Database Relasional & Spasial
│   ├── seed.ts             # Seeder 4 demo akun, 6 bab geosfer & soal C4
│   └── migrations/         # DDL migrasi SQL ekstensi PostGIS
├── public/                 # Aset statis & folder stimulus
├── Dockerfile              # Multi-stage production container
├── nixpacks.toml           # Konfigurasi Nixpacks Railway (Node 20 + OpenSSL)
├── railway.json            # Skema otomatisasi build & start Railway
├── package.json            # Dependensi produksi & skrip postinstall Prisma
├── package-lock.json       # Lockfile resmi npm
├── tsconfig.json           # Konfigurasi TypeScript strict: true
├── tailwind.config.ts      # Konfigurasi design system & tema editorial
├── postcss.config.mjs      # Konfigurasi PostCSS & Tailwind
├── next.config.mjs         # Konfigurasi Next.js 14
└── .env.example            # Template Environment Variables
```

---

## 🛠️ Langkah-langkah Deploy ke Railway

### Cara 1: Menggunakan GitHub + Railway Dashboard (Disarankan)

1. **Inisialisasi Git dan Push ke Repository Baru:**
   ```bash
   cd d:\ANTIGRAVITY\MMI-deploy
   git init
   git add .
   git commit -m "feat: GeoSpatialX MMI production release"
   git branch -M main
   git remote add origin https://github.com/USERNAME/geospatialx-mmi.git
   git push -u origin main
   ```

2. **Buat Project Baru di Railway ([railway.app](https://railway.app)):**
   - Klik **"New Project"** -> **"Deploy from GitHub repo"**.
   - Pilih repository `geospatialx-mmi` yang baru dibuat.

3. **Tambahkan Layanan Database PostgreSQL di Railway:**
   - Di dashboard project Railway Anda, klik **"+ New"** -> **"Database"** -> **"Add PostgreSQL"**.
   - Masuk ke tab **Connect** atau **Variables** pada database PostgreSQL Railway tersebut.

4. **Aktifkan Ekstensi PostGIS di PostgreSQL Railway:**
   - Buka tab **Data** atau sambungkan via client database (DBeaver/pgAdmin/Railway CLI) dan jalankan:
     ```sql
     CREATE EXTENSION IF NOT EXISTS postgis;
     ```

5. **Konfigurasikan Environment Variables pada Layanan Web:**
   Buka tab **Variables** pada web service Next.js Anda di Railway dan tambahkan:
   - `DATABASE_URL`: Isi dengan URL koneksi dari database PostgreSQL Railway Anda (`${{Postgres.DATABASE_URL}}`).
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Kunci Google Maps API Anda (dapat dikosongkan terlebih dahulu saat testing dasar).
   - `NEXTAUTH_SECRET`: String acak aman, contoh: `geospatialx-secret-key-2026`.
   - `NEXTAUTH_URL`: Domain publik Railway Anda (contoh: `https://geospatialx.up.railway.app`).
   - `NODE_ENV`: `production`.

6. **Generate & Seed Database:**
   Setelah deploy berhasil, jalankan perintah seeder melalui Railway CLI atau tab terminal Railway:
   ```bash
   npx prisma db push
   npm run db:seed
   ```

---

### Cara 2: Menggunakan Railway CLI

1. **Install Railway CLI (jika belum terpasang):**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login dan Hubungkan Project:**
   ```bash
   railway login
   cd d:\ANTIGRAVITY\MMI-deploy
   railway init
   ```

3. **Deploy Langsung:**
   ```bash
   railway up
   ```

---

## 👥 Informasi Akun Demo Bawaan (Seeder)
- **Siswa (STUDENT):** `siswa@sman1mejayan.sch.id` (Password: `geospatial2026`)
- **Guru (TEACHER):** `guru.geografi@sman1mejayan.sch.id` (Password: `geospatial2026`)
- **Validator (VALIDATOR):** `validator@mmi-geografi.id` (Password: `geospatial2026`)
- **Admin (ADMIN):** `admin@sman1mejayan.sch.id` (Password: `geospatial2026`)
