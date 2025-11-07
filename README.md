# Project: Soal Teknis TRASPAC

Ringkasan singkat.

Repository ini berisi tiga bagian utama:

- `backend/` — API server Laravel (PHP). Berisi model, controller, route API, migrasi, dan seeder. Digunakan untuk soal kemampuan teknis (API, database, autentikasi).
- `frontend/` — Aplikasi Next.js (TypeScript) sebagai client untuk mengonsumsi backend. Berisi halaman login, tampilan pegawai, komponen UI, dan helper API.
- `Penalaran/` — Script Python sederhana (`soal_penalaran.py`) untuk soal penalaran/analisis teks.

Setup setiap bagian:

1. Backend: buka `backend/README.md` untuk setup (Composer, .env, migrate & seed, php artisan serve).
2. Frontend: buka `frontend/README.md` untuk setup (npm install, npm run dev) dan catatan autentikasi.
3. Penalaran: buka `Penalaran/README.md` untuk instruksi menjalankan script Python.
