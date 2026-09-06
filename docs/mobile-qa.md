# Mobil görünüm kontrolü

Tarih: 6 Eylül 2026.

Yerel çalışan uygulama Chromium'da agent-browser ile incelendi. Bunlar mobil ekran ölçülerinde tarayıcı kontrolleridir; fiziksel iPhone/Android veya Safari testi değildir.

## Kapsam

- 320 ve 390 piksel genişlikte 28 sayfa: ana sayfa; akademi; program listesi ve iki program detayı; başvuru; iletişim; hakkımızda; Seeing Lab; APA Talks; eğitmen listesi ve kişi detayı; medya; tiyatro; takvim; tiyatro iletişim ve hakkımızda; basın; ödüller; sahne defteri; oyun listesi ve oyun detayı; ekip listesi ve kişi detayı; tiyatro medya; üç yasal bilgilendirme sayfası.
- 768 piksel tablette altı ana/listeme sayfası. Toplam 62 sayfa/genişlik kontrolü.
- Ekran dışına taşan görünür öğeler, belge genişliği ve yüklenmiş görseller arasında kırık kaynaklar kontrol edildi. Yatay taşma ve kırık görsel bulunmadı.
- Ana sayfa, mobil menü, kişi kartları ve eğitim filtreleri ekran görüntüleri üzerinden de incelendi.
- Ana sayfa slider'ında ileri/geri düğmeleri görseli ve ilgili oyun bağlantısını değiştirdi.
- Mobil menü açıldı/kapatıldı; panel ekran genişliğine sığdı.
- Yazı ve Sinema sekmelerinde doğru programlar görüntülendi.
- Eğitimlerde “senaryo” araması, alan seçimi, eşleşmeyen arama ve filtre temizleme kontrol edildi. Temizleme sonrası yedi program geri geldi. Aktif filtre durumu ayrıca 320 pikselde taşma açısından kontrol edildi.

## Bulunan ve düzeltilen sorun

Akademi ve tiyatro iç sayfalarında üst menü `position: sticky` olmasına rağmen sayfayla birlikte yukarı kayboluyordu. Hem `html` hem `body` üzerindeki `overflow-x: hidden`, dikey taşmanın `auto` hesaplanmasına ve yanlış kaydırma kapsayıcısının oluşmasına neden oluyordu.

Kök yatay taşma ayarları `overflow-x: clip` olarak değiştirildi. Böylece yatay kırpma korunurken üst menü pencereye göre sabit kalıyor.

Düzeltmeden sonra 320, 390 ve 768 pikselde akademi, tiyatro, eğitim listesi ve ekip listesi üzerinde 12 ek kaydırma kontrolü yapıldı. Menü üst konumu sıfırda kaldı. Footer görünür olduğunda alt blur gizlendi. Menü rengi, gerçekten altında kalan açık/koyu yüzeye göre değişti; kısa tablet footer'ının menüye ulaşmadığı durumda açık renk kalması doğru davranıştır.

## Derleme

- `npm run build`: başarılı, 76 sayfa üretildi.
- Değişen kök layout için ESLint: başarılı.
- İçerik doğrulaması: sıfır hata. Önceden var olan bir geçmiş etkinliğin `isCurrent` işareti uyarı veriyor; takvim arayüzü bunu arşivde gösteriyor.

Vercel dağıtımı bu kontrol kapsamında yapılmadı.
