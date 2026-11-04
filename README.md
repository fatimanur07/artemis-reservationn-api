# 🏨 Artemis Luxury Resort - 
# 🏛️ Artemis Reservation API

Modern, ölçeklenebilir ve rol tabanlı erişim kontrolü (RBAC) sunan kurumsal seviyede bir rezervasyon ve randevu yönetim REST API'si.

Proje, SQLite altyapısından kurumsal bulut veritabanı **Supabase PostgreSQL** mimarisine taşınmış; çift tokenlı (Access & Refresh Token) JWT kimlik doğrulama, çoka-çok ilişkisel veri modelleri ve Swagger dokümantasyonu ile güçlendirilmiştir.

---

## 🚀 Öne Çıkan Özellikler

- **Gelişmiş Kimlik Doğrulama (Auth & Security):** 
  - JWT tabanlı Access Token ve veritabanında güvenle hash'lenen (bcrypt) Refresh Token mekanizması.
  - Oturum süresi dolduğunda kesintisiz oturum yenileme (`/auth/refresh`).
- **Rol Tabanlı Erişim Kontrolü (RBAC):** `USER` ve `ADMIN` rolleri ile korunan uç noktalar.
- **İlişkisel Veritabanı Mimarisi:**
  - `User`, `Reservation` ve `Service` modelleri.
  - Randevu ve hizmetler arasında dinamik **Çoka-Çok (Many-to-Many)** ilişki yapısı.
  - Otomatik üretilen `UUID` benzersiz kimlikleri.
- **Veritabanı Yönetimi & Migration:** Prisma ORM ve Supabase PostgreSQL (Transaction & Session Pooler) entegrasyonu.
- **Etkileşimli API Dokümantasyonu:** OpenAPI / Swagger UI desteği.
- **Güvenli Konfigürasyon:** Hassas bağlantı dizeleri ve gizli anahtarların `.env` üzerinden yönetimi.

---

## 🛠️ Teknoloji Yığını

- **Backend Framework:** NestJS (Node.js)
- **Dil:** TypeScript
- **ORM:** Prisma ORM
- **Veritabanı:** Supabase (Cloud PostgreSQL)
- **Kimlik Doğrulama:** Passport.js, JWT (`@nestjs/jwt`), Bcrypt
- **Dokümantasyon:** Swagger UI (`@nestjs/swagger`)
- **Test:** Jest

---

## 📂 Veritabanı Şeması (ERD)

```text
[ User ] 1 ──── ∞ [ Reservation ] ∞ ──── ∞ [ Service ]
  ├── id (UUID)          ├── id (UUID)             ├── id (UUID)
  ├── email              ├── title                 ├── name
  ├── password           ├── startDate             └── price
  ├── role (USER/ADMIN)  ├── endDate
  └── refreshTokenHash   └── userId (FK)
