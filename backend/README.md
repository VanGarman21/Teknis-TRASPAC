<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# Backend (Laravel)

> Dokumentasi ini fokus pada langkah-langkah praktis agar developer (terutama pemula) dapat menjalankan, mengembangkan, dan menguji backend Laravel yang ada di repository.

Lokasi file penting:

- `app/` — Model, Controller, Middleware, Provider.
- `routes/api.php` — Endpoint API yang diakses oleh frontend Next.js.
- `database/migrations` — Struktur tabel database.
- `database/seeders` — Seeder untuk data awal (User, Unit, Religion, Employee).

---

## Prasyarat (Windows / PowerShell)

- PHP 8.0+ 
- Composer (https://getcomposer.org)
- Database: MySQL
- Git 

## Setup cepat (PowerShell)

1. Masuk ke folder backend:

```powershell
cd "backend"
```

2. Install dependency PHP:

```powershell
composer install
```

3. Salin environment contoh dan buat APP key:

```powershell
copy .env.example .env
php artisan key:generate
```

4. Edit `.env` dan konfigurasikan koneksi database (DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD).

Contoh minimal untuk development (MySQL lokal):

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_database_anda
DB_USERNAME=root
DB_PASSWORD=
```

5. Jalankan migrasi dan seeder (membuat tabel & data awal):

```powershell
php artisan migrate --seed
```

Jika ingin membersihkan dan migrasi ulang (hati-hati: akan menghapus data):

```powershell
php artisan migrate:fresh --seed
```

6. Jalankan server development lokal:

```powershell
php artisan serve
```
---

## Integrasi dengan frontend (Next.js)

- Pastikan frontend mengarah ke base URL backend.

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```
---

## Autentikasi & Seeder

- Untuk login cepat selama development, cek `database/seeders/UserSeeder.php` apakah ada user default (email/username & password). Jika ada, gunakan kredensial tersebut.
- Jika tidak ada, Anda bisa membuat user baru melalui Tinker:

```powershell
php artisan tinker
>>> \App\Models\User::create(['name' => 'Dev', 'email' => 'dev@example.com', 'password' => bcrypt('password')]);
```
---

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[WebReinvent](https://webreinvent.com/)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Jump24](https://jump24.co.uk)**
- **[Redberry](https://redberry.international/laravel/)**
- **[Active Logic](https://activelogic.com)**
- **[byte5](https://byte5.de)**
- **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
