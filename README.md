# Atlas / APA

Atlas Tiyatro Araştırmaları ve Atlas Performans Akademisi web sitesi. Tiyatro oyunlarını, ekip üyelerini, eğitimleri ve iletişim yollarını bir araya getirir.

## Yerel geliştirme

Node.js 22 LTS ve npm kullanın.

```sh
npm ci
npm run dev
```

Yerel adres: http://localhost:3000

## Kontroller

```sh
npm run validate:content
npm run typecheck
npm run build
```

İçerik doğrulaması üretim derlemesinden önce otomatik çalışır. `npm run start`, derlenmiş uygulamayı başlatır.

## Yapı

- `src/app`: Next.js App Router sayfaları ve başvuru sunucu işlemi.
- `src/components`: ortak tasarım, MorphSlider, hareketli ekip kartları.
- `src/content`: kaynak bilgileriyle birlikte oyun, kişi, eğitim ve etkinlik kayıtları.
- `public`: afişler, portreler, sahne fotoğrafları ve APA logoları.
- `docs`: içerik kaynakları, tasarım kararları ve kontrol notları.

## Ortam değişkenleri

- `NEXT_PUBLIC_SITE_URL`: sitemap ve sayfa meta verilerinde kullanılan gerçek site adresi. Varsayılan `https://atlasperformans.com`.
- `APPLICATION_WEBHOOK_URL`: isteğe bağlı, yalnızca sunucuda kullanılan başvuru alıcı adresi. Tanımlı değilse başvuru sayfası e-posta ve WhatsApp iletişim seçeneklerini gösterir.

Gizli değerleri `.env.local` veya dağıtım ortamının değişken ayarlarında tutun. `.env` dosyaları Git'e dahil edilmez.

## Vercel için hazırlık

Depo Next.js olarak içe aktarılabilir. Kök dizin depo kökü, kurulum komutu `npm ci`, build komutu `npm run build`; çıktı dizini Next.js varsayılanıdır. Dağıtım öncesi gerçek alan adını ve gerekiyorsa başvuru alıcı adresini ortam değişkenlerinde ayarlayın.

## İçerik

Güncel tarih, kontenjan ve bilet bilgilerini `src/content` kayıtlarında kaynaklarıyla birlikte güncelleyin. Geçmiş etkinlikler takvimde arşivlenir. Görsel kaynakları ve izin notları `docs` altında bulunur.
