# UTS Pengembangan Aplikasi Web - Game Database

Ini adalah submission untuk Ujian Tengah Semester mata kuliah IF25-22014 - Pengembangan Aplikasi Web.

**Studi Kasus:** Digit 5 - Game Database

## Informasi Mahasiswa

* **Nama:** [Nama Lengkap Anda]
* **NIM:** [NIM Anda]

## Deskripsi Project

Aplikasi ini adalah database game yang memungkinkan pengguna untuk mencari game, memfilter berdasarkan platform (PC, PlayStation, Xbox), dan mengurutkan berdasarkan rating atau tanggal rilis. Aplikasi ini menggunakan **RAWG Video Games API** untuk mengambil data game.

**Link Deployment Vercel:** [AKAN DIISI NANTI]

## Fitur

* Pencarian game berdasarkan nama.
* Filter game berdasarkan platform (PC, PlayStation, Xbox).
* Sortir game berdasarkan Rating (tertinggi) atau Tanggal Rilis (terbaru).
* Menampilkan daftar game dalam bentuk grid yang responsif.
* Menampilkan detail game (deskripsi, genre) saat game card di-klik.
* Loading dan Error state handling.

## Cara Instalasi dan Menjalankan

1.  **Clone repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)[username]/uts-pemweb-[nim].git
    cd uts-pemweb-[nim]
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variable:**
    Buat file `.env.local` di root project dan tambahkan API Key Anda dari RAWG.
    ```
    VITE_RAWG_API_KEY=API_KEY_ANDA
    ```

4.  **Jalankan project:**
    ```bash
    npm run dev
    ```

## Screenshot Aplikasi

![Screenshot Halaman Utama](link-ke-screenshot-anda.png)
*(Tips: Upload screenshot ke GitHub issue di repo Anda, lalu copy link gambarnya ke sini)*