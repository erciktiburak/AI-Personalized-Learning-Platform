# LearnPath AI 🎓

LearnPath AI, kullanıcının bilgi seviyesini test edip, Claude AI ile kişiselleştirilmiş öğrenme yolu (learning path) oluşturan, adaptif quiz sistemiyle ilerlemeyi takip eden bir eğitim platformudur.

## ✨ Özellikler

- 🔐 **Gelişmiş Kimlik Doğrulama:** NextAuth.js ve JWT tabanlı güvenli giriş sistemi.
- 🧪 **AI Seviye Testi:** Claude AI tarafından üretilen konuya özel sorularla bilgi seviyesi tespiti.
- 🛣️ **Kişiselleştirilmiş Müfredat:** Seviye testi sonucuna göre 6-8 modüllük dinamik öğrenme yolları.
- ❓ **Adaptif Quizler:** Kullanıcı performansına göre zorluğu değişen, BullMQ ile asenkron üretilen quizler.
- 📊 **İlerleme Takibi:** Günlük seri (streak), modül tamamlama ve puan istatistikleri.
- 📧 **E-posta Bildirimleri:** Kayıt sonrası hoş geldin mesajı (Resend entegrasyonu).

## 🛠️ Teknolojiler

- **Frontend:** Next.js 14 (App Router), Tailwind CSS, Shadcn/UI, Zustand
- **Backend:** Node.js, Express, BullMQ, Redis
- **Database:** PostgreSQL, Prisma ORM
- **AI:** Anthropic Claude 3.5 Sonnet API
- **Auth:** NextAuth.js (Beta v5)
- **E-posta:** Resend SDK

## 🚀 Kurulum

1.  **Bağımlılıkları yükleyin:**
    ```bash
    pnpm install
    ```

2.  **Docker ile servisleri başlatın:**
    ```bash
    docker-compose up -d
    ```

3.  **Ortam değişkenlerini ayarlayın:**
    `.env.example` dosyasını `.env` olarak kopyalayın ve `ANTHROPIC_API_KEY`, `RESEND_API_KEY` gibi anahtarları ekleyin.

4.  **Veritabanı ve Seed:**
    ```bash
    cd apps/api
    npx prisma migrate dev
    npx prisma db seed
    ```

5.  **Uygulamayı başlatın:**
    ```bash
    cd ../..
    pnpm dev
    ```

## 📂 Klasör Yapısı

- `apps/web`: Next.js 14 uygulaması
- `apps/api`: Node.js/Express API ve BullMQ Worker'lar
- `packages/shared`: Ortak tip tanımlamaları
