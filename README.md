# WA Automation Chat
_WA Automation Chat adalah sebuah proyek yang memanfaatkan @open-wa/wa-automate untuk melakukan otomatisasi pesan WhatsApp. Proyek ini memungkinkan Anda untuk mengirim pesan WhatsApp secara otomatis menggunakan API Express._

## Fitur Utama
- Menggunakan @open-wa/wa-automate untuk otomatisasi pesan WhatsApp.
- Menggunakan Express untuk membuat API dengan endpoint `/sendMessage`.
- Mengimplementasikan express-rate-limit untuk membatasi jumlah permintaan ke endpoint /sendMessage.
- Menggunakan dotenv untuk mengelola variabel lingkungan.

## Penggunaan
1. Clone repository ini `git clone https://github.com/syauqqii/WA-Automation-Chat`
2. Masuk ke directory WA-Automation-Chat : `cd WA-Automation-Chat`
3. Instal dependensi menggunakan `npm install`.
4. Konfigurasi variabel lingkungan yang diperlukan dalam file `.env`.
5. Jalankan aplikasi menggunakan `npm start`.
6. Gunakan endpoint `/sendMessage` untuk mengirim pesan WhatsApp.

Pastikan Anda memiliki Node.js dan npm yang terinstal sebelum menjalankan proyek ini.