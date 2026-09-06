# Ana sayfa slider kontrolü

Tarih: 6 Eylül 2026.

- Chromium ekran ölçüleri: 1440×900, 390×844, 320×568 ve 844×390.
- Her ölçüde slider ve WebGL canvas yüksekliği pencere yüksekliğine eşit; yatay taşma yok.
- İleri ve geri düğmeleri kontrol edildi. Fotoğraf bölgesindeki ekran görüntüsü pikselleri karşılaştırılarak sadece başlığın değil gerçek görselin değiştiği de doğrulandı.
- Üç kontrol düğmesi ekran içinde ve tıklanabilir üst katmanda.
- Otomatik geçişler MutationObserver ile yaklaşık 3009 ve 3007 ms aralıklarla ölçüldü.
- Header hesaplanan stili `blur(28px) saturate(1.6)`; başlangıçta alt kaydırma blur'u gizli.
- Mevcut melt shader, 1.05 saniye geçiş süresi ve 0.3 efekt yoğunluğu korundu.
- `npm run build`: başarılı; 76 sayfa. Değiştirilen TSX dosyalarında ESLint başarılı.

Bu kontroller fiziksel cihaz veya Safari testi değildir. Görsel kaynaklarının özgün çözünürlükleri `home-slider-assets.json` dosyasında kayıtlıdır; hepsi Full HD değildir.
