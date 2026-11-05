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
```

---

## ⚙️ Kurulum ve Çalıştırma

### 1. Depoyu Klonlayın
```bash
git clone [https://github.com/fatimanur07/artemis-reservationn-api.git](https://github.com/fatimanur07/artemis-reservationn-api.git)
cd artemis-reservationn-api
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Ortam Değişkenlerini Tanımlayın
Kök dizinde bir `.env` dosyası oluşturun ve gerekli değerleri girin:
```env
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION][.pooler.supabase.com:6543/postgres?pgbouncer=true](https://.pooler.supabase.com:6543/postgres?pgbouncer=true)"
DIRECT_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION][.pooler.supabase.com:6543/postgres](https://.pooler.supabase.com:6543/postgres)"

JWT_SECRET="your_jwt_secret_key"
JWT_REFRESH_SECRET="your_jwt_refresh_secret_key"
PORT=3000
```

### 4. Prisma İstemcisini ve Şemayı Senkronize Edin
```bash
npx prisma generate
npx prisma db push
```

### 5. Uygulamayı Başlatın
```bash
# Geliştirme modu
npm run start:dev

# Prodüksiyon derlemesi
npm run build
npm run start:prod
```

---

## 📖 API Dokümantasyonu (Swagger)

Uygulama çalıştıktan sonra tarayıcınızdan interaktif API dokümantasyonuna erişebilirsiniz:

👉 **`http://localhost:3000/api`**

### Başlıca Uç Noktalar

| Metot | Uç Nokta | Açıklama | Yetki |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Yeni kullanıcı kaydı | Herkese Açık |
| `POST` | `/auth/login` | Giriş yapma (Access & Refresh token döner) | Herkese Açık |
| `POST` | `/auth/refresh` | Access token yenileme | Refresh Token |
| `GET` | `/reservations` | Kullanıcının rezervasyonlarını listeleme | JWT Auth |
| `POST` | `/reservations` | Yeni randevu / rezervasyon oluşturma | JWT Auth |
| `GET` | `/reservations/:id`| Belirli bir rezervasyonun detayını getirme | JWT Auth |
| `PATCH`| `/reservations/:id`| Rezervasyon bilgilerini güncelleme | JWT Auth |
| `DELETE`| `/reservations/:id`| Rezervasyonu iptal etme / silme | JWT Auth |

---

## 🧪 Testler

```bash
# Birim testleri çalıştırma
npm run test
```
