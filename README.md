# 🏨 Artemis Luxury Resort - Reservation API

Artemis Luxury Resort otel yönetim ve rezervasyon sistemi için geliştirilmiş, yüksek performanslı ve modüler RESTful backend servisidir. Güvenli kimlik doğrulama, rezervasyon yönetimi ve ilişkisel veri tabanı modellemesini içerir.

---

## 🚀 Teknolojiler ve Araçlar

- **Backend Framework:** NestJS (Node.js & TypeScript)
- **Veritabanı & ORM:** Prisma ORM & SQLite
- **Kimlik Doğrulama:** JWT (JSON Web Token), Passport & Bcrypt
- **API Dokümantasyonu:** Swagger / OpenAPI
- **Doğrulama & Güvenlik:** Class-Validator, Class-Transformer

---

## ✨ Temel Özellikler

- **Kullanıcı & Oturum Yönetimi (Auth):**
  - Güvenli kullanıcı kaydı (Register) ve şifreli veri saklama.
  - JWT tabanlı oturum açma (Login) ve Bearer Token yetkilendirmesi.
  - Role/kullanıcı bazlı korumalı endpoint'ler (JwtAuthGuard).

- **Rezervasyon Yönetimi (Reservations):**
  - Müsaitlik durumuna göre oda rezervasyonu oluşturma.
  - Rezervasyon detaylarını listeleme, sorgulama ve filtreleme.
  - Rezervasyon güncelleme ve iptal/silme süreçleri.

- **Veritabanı & Migration:**
  - Prisma şeması (schema.prisma) ile tip güvenli (type-safe) veritabanı ilişkileri.
  - Sürüm kontrollü migration mimarisi.

---

## 🛠️ Kurulum ve Çalıştırma

Projeyi yerel ortamınızda ayağa kaldırmak için aşağıdaki adımları izleyin:

### 1. Bağımlılıkları Yükleyin
npm install

### 2. Ortam Değişkenlerini Ayarlayın
.env.example dosyasını referans alarak ana dizinde bir .env dosyası oluşturun:
DATABASE_URL="file:./dev.db"
JWT_SECRET="super-secret-jwt-key"
PORT=3000

### 3. Veritabanını Hazırlayın (Prisma Migration)
npx prisma migrate dev

### 4. Uygulamayı Başlatın
npm run start:dev

---

## 📚 API Dokümantasyonu (Swagger)

Uygulama çalıştıktan sonra interaktif Swagger arayüzü üzerinden tüm endpoint'leri test edebilirsiniz:
http://localhost:3000/api

---

## 🧪 Testler

npm run test
npm run test:e2e
