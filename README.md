# 🏥 MedArtemis API - Hastane & Randevu Yönetim Sistemi

MedArtemis API, modern sağlık kuruluşları, poliklinikler ve hastaneler için geliştirilmiş; doktor yönetimi, hasta randevu takvimi, slot çakışma kontrolü ve rol tabanlı yetkilendirme (RBAC) sunan kurumsal seviyede bir RESTful backend servisidir.

---

## 🚀 Temel Özellikler

- **Gelişmiş Randevu Motoru:** Doktorların uygunluk durumuna göre dinamik saat aralığı (slot) oluşturma, dolu saatlerin tespiti (`busy-slots`) ve mükerrer randevuları engelleyen çakışma denetimi (`collision check`).
- **Rol Tabanlı Kimlik Doğrulama (RBAC):** JWT (JSON Web Token) ve Passport stratejileriyle korunan kullanıcı, sekreter/personel ve doktor/yönetici yetkilendirme katmanı.
- **Doktor & Poliklinik Yönetimi:** Branşlara göre doktor listeleme, uzmanlık profilleri, çalışma saatleri ve detaylı hekim bilgileri.
- **Veri Modelleme & Taşıma:** Prisma ORM ile PostgreSQL (Supabase) üzerinde ilişkisel veri yönetimi ve güvenli migrasyon yapısı.
- **İnteraktif API Dokümantasyonu:** Swagger / OpenAPI entegrasyonu sayesinde tüm uç noktaların tarayıcı üzerinden canlı test edilebilmesi.
- **Veri Güvenliği & Doğrulama:** `class-validator` ve `class-transformer` ile DTO seviyesinde sıkı girdi denetimi; `bcrypt` ile şifreleme.

---

## 🛠️ Teknoloji Yığını

- **Çekirdek Çatı:** [NestJS](https://nestjs.com/) (Node.js & Express platformu)
- **Dil:** [TypeScript](https://www.typescriptlang.org/)
- **Veritabanı & ORM:** [Prisma](https://www.prisma.io/) & PostgreSQL ([Supabase](https://supabase.com/))
- **Kimlik Doğrulama:** JWT, `@nestjs/jwt`, `@nestjs/passport`
- **Dokümantasyon:** Swagger (`@nestjs/swagger`)
- **Şifreleme:** `bcrypt`

---

## 📂 Proje Dizin Yapısı

```text
├── prisma/
│   ├── migrations/       # Veritabanı sürüm geçmişi ve SQL şemaları
│   └── schema.prisma     # Veritabanı modelleri ve ilişkiler
├── src/
│   ├── auth/             # Kimlik doğrulama, JWT stratejileri ve guard'lar
│   ├── reservations/     # Randevu yönetimi, slot kontrolleri ve rezervasyon servisleri
│   ├── app.controller.ts # Temel uygulama controller'ı
│   ├── app.module.ts     # Kök modül (Root module)
│   ├── app.service.ts    # Kök servis
│   └── main.ts           # Uygulama başlangıç ve Swagger konfigürasyonu
├── test/                 # E2E ve birim test dosyaları
├── .env.example          # Ortam değişkenleri şablonu
├── nest-cli.json         # NestJS CLI yapılandırması
├── package.json          # Bağımlılıklar ve npm script'leri
└── tsconfig.json         # TypeScript derleme ayarları
