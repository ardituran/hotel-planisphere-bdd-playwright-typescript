# Setup dari Nol

Dokumen ini untuk kamu yang baru pertama kali menjalankan project ini. Ditulis pelan-pelan, termasuk hal yang mungkin terasa sepele. Kalau kamu QA manual yang baru belajar automation, dokumen ini dibuat untuk kamu.

Kalau kamu sudah pernah pakai Playwright dan Node.js, kamu bisa langsung ke [Ringkasan perintah](#ringkasan-perintah).

## Istilah yang dipakai

Beberapa kata di dokumen ini mungkin belum familiar. Ini artinya, supaya kamu tidak perlu mencari di tempat lain:

| Istilah | Artinya |
| --- | --- |
| Repo (repository) | Folder project yang disimpan di GitHub |
| Clone | Menyalin repo dari GitHub ke laptop kamu |
| Terminal | Jendela untuk mengetik perintah, bukan tempat klik menu |
| Node.js | Program yang membuat kode TypeScript bisa jalan di laptop |
| npm | Alat bawaan Node.js untuk memasang library yang dibutuhkan project |
| Dependensi (library) | Kode buatan orang lain yang dipakai project ini, misalnya Playwright dan Faker |
| `.env` | File teks berisi data rahasia, seperti email dan password akun tes |
| Config | File pengaturan, contohnya `playwright.config.ts` |
| Gherkin | Format penulisan skenario pakai Given, When, Then |

Kalau nanti ada istilah lain yang belum jelas, tanyakan saja. Lebih baik bertanya daripada menebak.

## Yang perlu ada di laptop

| Kebutuhan | Cara cek | Kalau belum ada |
| --- | --- | --- |
| Node.js versi 18 ke atas | `node -v` | Ambil versi LTS di https://nodejs.org |
| npm | `npm -v` | Otomatis terpasang bersama Node.js |
| Git | `git --version` | Windows: Git for Windows. Mac: biasanya sudah ada |
| VS Code (disarankan) | buka aplikasinya | https://code.visualstudio.com |

Kalau `node -v` atau `npm -v` menjawab "not recognized" atau "command not found", berarti Node.js belum terpasang. Setelah memasangnya, tutup VS Code lalu buka lagi. Terminal lama masih menyimpan pengaturan sebelumnya, jadi errornya bisa tetap muncul walaupun Node.js sudah ada.

## Langkah 1. Buka terminal di VS Code

Mulai dari VS Code dulu, jangan dari perintahnya. Buka VS Code, lalu buka folder lewat menu **File** dan **Open Folder**. Pilih folder mana pun yang mudah kamu temukan, misalnya folder Documents. Tahap berikutnya akan membuat folder project sendiri di dalamnya.

Setelah itu buka terminal dari dalam VS Code. Caranya lewat menu **Terminal**, pilih **New Terminal**. Panel terminal akan muncul di bagian bawah jendela VS Code.

Semua perintah di dokumen ini diketik di panel itu. Jangan di Command Prompt atau Terminal terpisah, supaya folder kerjanya tidak salah.

## Langkah 2. Ambil kode dan pasang dependensi

Ketik tiga perintah ini satu per satu, tunggu sampai selesai sebelum pindah ke baris berikutnya:

```bash
git clone https://github.com/ardituran/hotel-planisphere-bdd-playwright-typescript.git
cd hotel-planisphere-bdd-playwright-typescript
npm install
```

Arti tiap barisnya:

- `git clone` menyalin seluruh isi project dari GitHub ke laptop kamu
- `cd` masuk ke folder hasil salinan itu
- `npm install` memasang semua library yang dibutuhkan, hasilnya muncul folder `node_modules`

`npm install` butuh beberapa menit. Kalau muncul tulisan `warning` atau `deprecated`, itu normal, biarkan saja sampai selesai. Yang perlu dihentikan hanya kalau tulisannya `error`.

## Langkah 3. Siapkan akun tes di file `.env`

Project ini butuh dua akun untuk login: satu member premium dan satu member normal. Datanya disimpan di file `.env`.

File `.env.template` **sudah ada di repo, tidak perlu kamu buat**. Kamu hanya membuat salinannya.

Windows:

```bash
copy .env.template .env
```

Mac atau Linux:

```bash
cp .env.template .env
```

Lalu buka file `.env` di VS Code dan isi emailnya seperti ini:

```bash
PRESET_PREMIUM_EMAIL=clark@example.com
PRESET_PREMIUM_PASSWORD=

PRESET_NORMAL_EMAIL=diana@example.com
PRESET_NORMAL_PASSWORD=
```

Password untuk kedua akun itu ada di tabel **Preset users** di situs yang diuji. Lihat bagian berikutnya untuk cara menemukannya.

Simpan dengan `Ctrl` + `S` di Windows, atau `Cmd` + `S` di Mac.

### Akun tesnya diambil dari mana

Situs yang diuji menyediakan akun bawaan untuk latihan. Buka https://hotel-example-site.takeyaqa.dev/en-US/ lalu scroll ke paling bawah. Ada tabel bernama **Preset users**, isinya email, password, dan jenis membership.

Di tabel itu kamu akan menemukan empat akun:

| Email | Membership |
| --- | --- |
| clark@example.com | premium |
| diana@example.com | normal |
| ororo@example.com | premium |
| miles@example.com | normal |

Password sengaja tidak ditulis di dokumen ini. Ambil langsung dari tabel di situsnya, supaya kalau pemilik situs mengganti password, dokumen ini tidak ikut basi.

Untuk latihan, pakai clark sebagai premium dan diana sebagai normal. Akun ini dipakai banyak orang, jadi datanya bisa berubah kapan saja.

Kalau ingin data yang lebih bersih, kamu bisa mendaftar akun sendiri lewat halaman Sign Up di situs yang sama, lalu memakai email dan password hasil pendaftaran.

### Kenapa harus `.env`, bukan `.env.template`

`.env.template` hanya contoh kosong. Isinya daftar nama variabel, tanpa nilai asli. Yang dibaca program adalah `.env`. Di `playwright.config.ts` ada `dotenv.config()`, dan baris itu mencari file `.env` saja.

Kalau `.env` belum ada, email dan password terbaca kosong. Akibatnya langkah login gagal, padahal kodenya tidak salah.

Dua hal yang sering keliru:

- Di Windows, membuat file baru lewat Notepad atau klik kanan kadang menambah `.txt` di belakang nama, sehingga jadi `.env.txt`. File itu tidak akan terbaca. Pastikan namanya persis `.env`.
- File `.env` kelihatan abu-abu di sidebar VS Code. Itu normal, tandanya dia diabaikan git. Isinya password, dan memang tidak boleh ikut ke GitHub.

## Langkah 4. Pasang browser

```bash
npx playwright install
```

Perintah ini mengunduh browser Chromium, ukurannya beberapa ratus MB. Jadi wajar kalau terlihat diam cukup lama, dia sedang mengunduh. Tunggu sampai muncul lagi tanda terminal siap menerima perintah.

Langkah ini sering terlewat. Tanpa ini, Playwright tidak punya browser untuk menjalankan tes, dan pesan errornya membingungkan karena berbicara soal executable, bukan soal browser.

## Langkah 5. Jalankan tes

```bash
npm test
```

Kalau ingin melihat browsernya terbuka dan berjalan sendiri, ini lebih enak untuk belajar:

```bash
npm run test:headed
```

### Kenapa `npm test`, bukan `npx playwright test`

Project ini memakai `playwright-bdd`, dan cara kerjanya berbeda dari Cucumber biasa. Ada dua jenis file yang terpisah:

- folder `features/`, isinya skenario Gherkin yang ditulis dengan bahasa manusia
- folder `steps/`, isinya kode TypeScript yang mengerjakan tiap langkah Gherkin

Keduanya belum tersambung saat pertama kali di-clone. Ada alat bernama `bddgen` yang tugasnya menyambungkan keduanya, lalu hasilnya menjadi file tes yang bisa dibaca Playwright.

Karena itu:

- Menjalankan file step secara langsung tidak akan jalan. File step bukan tes, dia hanya kode.
- `npx playwright test` saja juga tidak cukup, karena file tes hasil sambungan belum dibuat.

Perintah `npm test` isinya `npx bddgen && npx playwright test`. Artinya menyambung dulu, baru menjalankan.

Begitu juga pengaturan di `playwright.config.ts`. Di situ kamu hanya memberi tahu letak foldernya. Config itu peta, bukan tombol jalan, jadi dia tidak memanggil `bddgen`.

Satu kebiasaan yang perlu dipegang: setiap kali kamu mengubah file `.feature`, file di folder `steps/`, atau `playwright.config.ts`, jalankan `npm test` dari awal. Jangan hanya `npx playwright test`, karena hasil sambungannya jadi basi.

## Kalau hasilnya sudah benar

Run pertama yang berhasil akan menampilkan 14 tes lulus: 8 dari `features/auth.feature` dan 6 dari `features/reservation.feature`. Angka itu bisa bertambah kalau ada skenario baru.

Untuk melihat laporannya dalam bentuk rapi:

```bash
npm run report
```

## Kalau muncul error

| Pesan error | Artinya | Yang dilakukan |
| --- | --- | --- |
| `Cannot find module` | `npm install` belum selesai atau folder `node_modules` hilang | Jalankan `npm install` lagi |
| `Executable doesn't exist` | Browser belum terpasang | Jalankan `npx playwright install` |
| Error di langkah login | `.env` belum ada, isinya masih contoh, atau namanya jadi `.env.txt` | Periksa Langkah 3 |
| `not recognized` atau `command not found` | Node.js atau Git belum terpasang | Pasang, lalu buka ulang VS Code |

Baca pesan error dari baris paling atas. Biasanya nama file yang bermasalah disebut langsung di situ.

## Ringkasan perintah

```bash
# pertama kali
git clone https://github.com/ardituran/hotel-planisphere-bdd-playwright-typescript.git
cd hotel-planisphere-bdd-playwright-typescript
npm install
npx playwright install
cp .env.template .env    # Windows: copy .env.template .env
# isi empat variabel PRESET_* di dalam .env

# menjalankan
npm test              # jalankan semua skenario
npm run test:headed   # sama, tapi browsernya terlihat
npm run test:ui       # mode UI Playwright
npm run report        # buka laporan Allure
```

## Checklist

Kalau semua baris sudah dicentang tapi tesnya masih gagal, itu bukan salah kamu. Kirim isi terminalnya ke saya.

- [ ] `node -v` dan `npm -v` keluar angka versi
- [ ] Terminal dibuka dari menu Terminal di VS Code
- [ ] Repo sudah di-clone dan foldernya terbuka di VS Code
- [ ] `npm install` selesai tanpa error
- [ ] Folder `node_modules` sudah ada
- [ ] `npx playwright install` sudah dijalankan
- [ ] File `.env` ada, namanya persis, bukan `.env.txt`
- [ ] Empat variabel `PRESET_*` sudah terisi email dan password, lalu disimpan
- [ ] Menjalankan tes dengan `npm test`, bukan `npx playwright test`
- [ ] Paham bahwa mengubah file Gherkin berarti mengulang `npm test` dari awal
- [ ] Tahu bahwa `.eslintrc.json` tidak perlu dibuat, itu hanya dipakai `npm run lint`
