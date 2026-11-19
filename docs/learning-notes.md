# Catatan Belajar Automation

Catatan ini untuk diri saya sendiri. Supaya saya ingat apa yang sudah saya pelajari dan apa yang masih sulit. Saya QA Manual sejak 2014 dan mulai belajar test automation pada 2024.

Catatan ini sengaja saya tulis dalam bahasa Indonesia. Ini catatan pribadi, bukan panduan untuk orang lain.

## Kenapa saya memilih alat ini

- **Playwright** - dokumentasinya jelas, banyak contoh, dan saya bisa lihat browser bekerja langsung.
- **TypeScript** - sebenarnya saya mau JavaScript saja dulu. Tapi banyak contoh yang saya baca memakai TypeScript, jadi saya ikut. Saya masih sering pakai `any`.
- **BDD (Gherkin)** - karena saya terbiasa menulis test case manual, format Given-When-Then terasa seperti menulis langkah pengujian di Excel.

## Catatan per topik

### async dan await

Dulu saya kira cukup menulis perintah berurutan, lalu selesai. Ternyata setiap aksi browser itu asynchronous. Kalau lupa `await`, kadang test jalan, kadang gagal, dan pesan errornya membingungkan. Sekarang saya baca ulang setiap baris sebelum commit.

### Tipe data TypeScript

Ini yang paling sering membuat saya berhenti lama. Saya mengerti konsepnya sedikit-sedikit, tapi kalau sudah ketemu error tipe, saya sering menyerah dan memakai `any`. Saya tahu itu tidak benar. Target saya: mengurangi `any` sedikit demi sedikit.

### Page object

Awalnya saya tulis semua locator di dalam step. Lalu saya pindahkan ke file `pages/`. Ternyata lebih enak, karena kalau UI berubah saya hanya perbaiki satu tempat. Tapi saya masih sering bingung: method mana yang masuk page object, dan mana yang cukup di step.

### Locator

Pertama saya ambil XPath panjang dari DevTools. Hasilnya sering rusak kalau UI berubah sedikit. Sekarang saya usahakan pakai `id` atau `getByRole`. Kadang masih pakai XPath kalau memang tidak ada pilihan lain.

### Test data

Dulu saya isi data manual di dalam script. Setiap run datanya sama, jadi test-nya seperti "hafal". Lalu saya coba Faker untuk data acak. Ternyata data acak juga punya masalah: kadang tidak lolos aturan aplikasi.

Contoh aturan di aplikasi ini:

- Batas pesan kamar adalah 90 hari dari hari ini.
- Setiap plan punya batas jumlah tamu dan batas malam yang berbeda. Contoh: "For honeymoon" hanya untuk 2 tamu, maksimal 2 malam.

Aturan itu saya simpan di `utils/DataHelper.ts` supaya data yang dibuat selalu valid.

### Format tanggal

Ini kesalahan yang paling lama saya cari. Halaman Sign Up memakai format `YYYY-MM-DD`, tapi halaman reservasi memakai format `MM/DD/YYYY`. Saya salah kira keduanya sama. Sekarang saya tulis komentarnya di kode supaya tidak lupa.

### GitHub Actions

Saya kira CI itu hanya untuk tim besar. Ternyata untuk latihan juga berguna. Setiap pagi test jalan sendiri, dan saya dapat notifikasi di Telegram. Waktu pertama kali hasilnya merah, saya kira ada yang rusak. Ternyata hanya data test yang tidak lolos validasi.

### Debugging

Dulu saya jalankan ulang semua test kalau ada yang gagal. Sekarang saya jalankan satu skenario dulu, lalu buka Trace Viewer. Trace Viewer itu seperti rekaman langkah test, jadi saya bisa lihat persis di mana berhentinya.

## Kesalahan yang pernah saya buat

1. Lupa `await` di tengah step, lalu cari kesalahan di tempat yang salah.
2. Pakai XPath panjang, test rusak saat UI berubah sedikit.
3. Tidak mencoba fitur secara manual dulu, jadi saya menguji hal yang salah.
4. Mengira aplikasi yang bug, padahal data random saya yang tidak lolos aturan.
5. Lupa tekan Tab setelah isi tanggal, jadi validasi tanggal tidak terpicu.

## Rencana belajar berikutnya

1. Menulis test negatif, misalnya login dengan password salah dan validasi form.
2. Mengurangi pemakaian `any`.
3. Mencoba API testing.
4. Belajar fixtures dan pengelolaan test data yang lebih rapi.

Terakhir diperbarui: 2026-11-19
