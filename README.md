# LearnPath AI 🎓

LearnPath AI, kullanıcının bilgi seviyesini test edip, Claude AI ile kişiselleştirilmiş öğrenme yolu (learning path) oluşturan, adaptif quiz sistemiyle ilerlemeyi takip eden bir eğitim platformudur.

## 🚀 Teknolojiler

- **Frontend:** Next.js 14+ (App Router), Shadcn/UI, Tailwind CSS, Zustand
- **Backend:** Node.js, Express, Bull Queue, Redis
- **Database:** PostgreSQL, Prisma ORM
- **AI:** Anthropic Claude API (Sonnet)
- **Auth:** NextAuth.js

## 🛠️ Kurulum

1.  **Bağımlılıkları yükleyin:**
    ```bash
    pnpm install
    ```

2.  **Docker ile veritabanını başlatın:**
    ```bash
    docker-compose up -d
    ```

3.  **Ortam değişkenlerini ayarlayın:**
    `.env.example` dosyasını `.env` olarak kopyalayın ve gerekli anahtarları ekleyin.

4.  **Veritabanı migrasyonlarını çalıştırın:**
    ```bash
    cd apps/api
    pnpm prisma migrate dev
    ```

5.  **Uygulamayı başlatın:**
    ```bash
    pnpm dev
    ```

## 📂 Yapı

- `apps/web`: Next.js Frontend
- `apps/api`: Node.js + Express Backend
- `packages/shared`: Ortak tipler ve yardımcı fonksiyonlar
