# WA Automation Chat
_WA Automation Chat adalah sebuah proyek yang memanfaatkan ~~@open-wa/wa-automate~~ whatsapp-web.js untuk melakukan otomatisasi pesan WhatsApp. Proyek ini memungkinkan Anda untuk mengirim pesan WhatsApp secara otomatis menggunakan API Express._

Pastikan Anda memiliki Postman, Node.js, dan NPM yang terinstal sebelum menjalankan proyek ini.

## Feature
- Menggunakan ~~@open-wa/wa-automate~~ whatsapp-web.js untuk otomatisasi pesan WhatsApp.
- Menggunakan Express dan mengimplementasikan express-rate-limit untuk membuat API dengan endpoint `/sendMessage` atau `/sendMessageMedia`.
- Menggunakan dotenv untuk mengelola variabel lingkungan.

## How to use
1. Clone repository ini
```
git clone https://github.com/syauqqii/WA-Automation-Chat
```
2. Masuk ke directory WA-Automation-Chat
```
cd WA-Automation-Chat
```
3. Instal dependensi menggunakan
```
npm install
```
4. Konfigurasi variabel dalam file `.env` (jika diperlukan).
5. Jalankan aplikasi menggunakan
```
npm start
```
6. Gunakan endpoint `/sendMessage` dan `/sendMessageMedia` untuk mengirim pesan WhatsApp.

## Endpoint + Params (Tested in Postman)
**[RAW] Send Message (Single Message)**
```bash
[POST] http://localhost:4437/sendMessage

data :
{
    "to":"62877xxxxxxx",
    "text":"Hello!!"
}
```

**[RAW] Send Message (Many Message)**
```bash
[POST] http://localhost:4437/sendMessage

data :
{
    "to":[
        "62812xxxxxxx",
        "62877xxxxxxx"
    ],
    "text":"Hello!!"
}
```

**[FORM-DATA] Send Message with Media (Single Message)**
```bash
[POST] http://localhost:4437/sendMessageMedia

data :
{
    "to":"62812xxxxxxx"
    "text":"Hello!!",
    "mediaFile":<SELECT FROM UR PC>
}
```

**[FORM-DATA] Send Message with Media (Many Message)**
```bash
[POST] http://localhost:4437/sendMessageMedia

data :
{
    "to":"62812xxxxxxx",
    "to":"62877xxxxxxx"
    "text":"Hello!!",
    "mediaFile":<SELECT FROM UR PC>
}
```