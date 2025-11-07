# Penalaran

File `soal_penalaran.py` adalah program Python sederhana untuk menganalisis dan memanipulasi teks sebuah artikel (artikel tentang pentingnya teknologi informasi dalam pendidikan disertakan di file). Program menyediakan menu interaktif sederhana untuk:

- mencari berapa kali sebuah kata muncul,
- mengganti sebuah kata dengan kata lain (hanya kata utuh), dan
- menampilkan daftar kata unik yang ada di artikel, diurutkan A→Z.

## Cara menjalankan (PowerShell)

1. Buka PowerShell dan masuk ke folder `Penalaran`:

```powershell
cd "Penalaran"
```

2. Jalankan script:

```powershell
python .\soal_penalaran.py
```

3. Ikuti menu interaktif di terminal. Pilihan menu: 1 (cari kata), 2 (ganti kata), 3 (tampilkan daftar kata A–Z), 0 (keluar).

Contoh interaksi singkat:

- Pilih `1`, masukkan kata `untuk` → program menampilkan jumlah kemunculan kata tersebut.
- Pilih `2`, masukkan `upaya` lalu `supaya` → program menampilkan artikel dengan penggantian kata.

## Penjelasan fungsi utama

- `count_word(article: str, target: str) -> int`

  - menampilkan berapa kali sebuah kata muncul dalam teks.

- `replace_word(article: str, old: str, new: str) -> str`

  - mengganti sebuah kata dengan kata lain dalam teks.

- `sort_words(article: str) -> list`
  - menampilkan daftar kata unik yang ada dalam teks, diurutkan secara alfabet.
