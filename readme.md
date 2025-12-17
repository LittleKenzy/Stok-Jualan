# StokJualan 📦

Aplikasi Manajemen Stok & Inventory Sederhana untuk UMKM/Reseller.
Fokus pada kecepatan, kemudahan, dan desain yang profesional.

![StokJualan Preview](public/preview.png)
*(Note: Tambahkan screenshot aplikasi di sini)*

## ✨ Fitur Utama

- **🚀 Dashboard Realtime**: Ringkasan total aset, jumlah stok, dan riwayat transaksi terbaru.
- **📦 Manajemen Produk**: Tambah, edit, dan hapus barang jualan dengan mudah.
- **📈 Pencatatan Transaksi**:
  - **Barang Masuk (IN)**: Restock/Kulakan -> Otomatis menambah stok.
  - **Barang Keluar (OUT)**: Penjualan -> Otomatis mengurangi stok.
  - **Validasi Stok**: Mencegah input penjualan jika stok tidak mencukupi.
- **🔐 Autentikasi Aman**: Sistem login & register menggunakan encrypted session cookies.
- **🎨 Desain Modern**: Antarmuka "Dark Elegant" yang nyaman di mata dan responsif di mobile.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Actions)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Supabase / Neon / Vercel Postgres)
- **ORM**: Prisma
- **Auth**: Custom Stateless Session (`jose`, `bcryptjs`)

## 🚀 Cara Menjalankan (Local Development)

Untuk menjalankan project ini di komputer Anda, pastikan Anda memiliki URL database PostgreSQL. Anda bisa menggunakan [Supabase](https://supabase.com/) atau [Neon](https://neon.tech/) untuk database gratis.

### Prasyarat
- Node.js versi 18 atau lebih baru.

### Instalasi

1. **Clone Repository / Download Code**
   ```bash
   git clone https://github.com/username/stok-jualan.git
   cd stok-jualan
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Database**
   Buat file `.env` dan masukkan `DATABASE_URL` dari penyedia PostgreSQL Anda.
   ```env
   DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
   JWT_SECRET="rahasia_super_aman"
   ```
   Lalu jalankan migrasi:
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Seed Data (Opsional)**
   Isi database dengan akun demo dan produk contoh.
   ```bash
   npx tsx prisma/seed.ts
   ```
   
   **Akun Demo:**
   - Email: `admin@example.com`
   - Password: `password123`

5. **Jalankan Server Development**
   ```bash
   npm run dev
   ```

6. **Buka Aplikasi**
   Akses [http://localhost:3000](http://localhost:3000) di browser Anda.

## 📂 Struktur Folder

- `/app`: Routing halaman & Layout (App Router).
- `/actions`: Server Actions untuk logika backend (CRUD, Auth).
- `/components`: Komponen UI yang dapat digunakan kembali (Button, Card, Form).
- `/lib`: Utilitas (Koneksi DB, Session Management, Helper functions).
- `/prisma`: Schema database dan konfigurasi Prisma.

## 🤝 Kontribusi

Pull requests dipersilakan. Untuk perubahan besar, harap buka issue terlebih dahulu untuk mendiskusikan apa yang ingin Anda ubah.

## 📝 Lisensi

[MIT](https://choosealicense.com/licenses/mit/)
