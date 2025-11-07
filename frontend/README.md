# Frontend (Next.js)

> Dokumentasi ringkas untuk menjalankan dan memahami struktur dasar frontend project.

Jika Anda butuh bantuan lebih lanjut (mis. menambahkan fitur, autentikasi, atau deploy), beri tahu saya dan saya bantu langkah demi langkah.

## Ringkasan singkat

Frontend ini dibangun dengan Next.js (App Router) dan TypeScript. Folder utama yang perlu Anda kenal:

- `app/` — route dan halaman (App Router). Contoh: `app/login/page.tsx` → route `/login`.
- `components/` — komponen React yang dapat dipakai ulang.
- `lib/` — helper untuk API, auth, dan tipe data.
- `public/` — aset statis (gambar, ikon, dll).

## Prasyarat (Windows / PowerShell)

- Node.js (v16.8+ disarankan) dan npm terpasang.
- Alternatif: `pnpm` atau `yarn` juga bisa dipakai — ganti perintah instalasi/jalankan sesuai package manager.

## Instalasi & Menjalankan (PowerShell)

1. Buka PowerShell dan masuk ke folder `frontend`:

```powershell
cd "frontend"
```

2. Install dependency (hanya pertama kali):

```powershell
npm install
```

3. Jalankan development server:

```powershell
npm run dev
# lalu buka http://localhost:3000 di browser
```

Catatan: di proyek ini, route root (`/`) sudah diubah untuk mengarahkan (redirect) ke `/login`. Jadi membuka `http://localhost:3000` akan langsung membawa Anda ke `http://localhost:3000/login`.

## Struktur singkat dan file penting

- `app/page.tsx` — titik masuk root; saat ini berisi redirect ke `/login`.
- `app/login/page.tsx` — halaman login.
- `app/employees/page.tsx` — contoh halaman daftar pegawai.
- `components/` — komponen UI (mis. `DataTable`, `EmployeeForm`).
- `lib/api.ts` — helper untuk panggilan ke backend.
- `next.config.ts`, `tsconfig.json` — konfigurasi proyek.

## Routing singkat (Next.js App Router)

- Route dibuat berdasarkan struktur folder `app/`.
- Untuk redirect server-side gunakan `redirect()` dari `next/navigation`.

## Troubleshooting umum

- Jika dev server gagal atau muncul error lint seperti "Unknown word (CssSyntaxError)":

  - Pastikan Node.js versi sesuai.
  - Jalankan `npm run dev` dan salin pesan error lengkap di terminal — itu membantu menemukan penyebab.
  - Beberapa error lint PostCSS/ESLint muncul bila file parse salah (mis. plugin salah mengenali `.tsx` sebagai CSS). Jika ini terjadi, kirim pesan error lengkap agar saya bantu analisa.

- Jika port 3000 sudah digunakan, jalankan `npx next dev -p 3001` atau hentikan proses yang memakai port 3000.

---

Jalankan `npm run dev` seperti langkah di atas dan beri tahu hasilnya — saya bantu jika muncul error.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
