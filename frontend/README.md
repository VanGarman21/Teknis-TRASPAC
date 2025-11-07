# Frontend (Next.js)

## Ringkasan singkat

Frontend ini dibangun dengan Next.js dan TypeScript. Folder utama yang perlu Anda kenal:

- `app/` — route dan halaman. Contoh: `app/login/page.tsx` → route `/login`.
- `components/` — komponen React yang dapat dipakai ulang.
- `lib/` — helper untuk API, auth, dan tipe data.
- `public/` — aset statis (gambar, ikon, dll).

## Prasyarat (Windows / PowerShell)

- Node.js (v16.8+ disarankan) dan npm terpasang.

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
