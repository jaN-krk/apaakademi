# Atlas: Sahneden atölyeye

6 Eylül 2026 tasarım güncellemesi.

## Kurumun odağı

Atlas Tiyatro Araştırmaları 2013'te kurulan, farklı metinleri ve anlatıları sahneye taşıyan bir tiyatro topluluğu. APA, bu ekibin üretim ve araştırma deneyimini eğitimle paylaştığı alan. Ana sayfa sırası bu ilişkiyi izliyor: oyunlar, sanatçılar, eğitimler.

İncelenen kaynaklar:

- [Tiyatro Online — Atlas Tiyatro Araştırmaları](https://tiyatronline.com/tiyatrolar/atlas-tiyatro-arastirmalari-3836): 2013 kuruluşu ve araştırma odaklı üretim yaklaşımı.
- [Gazete Pencere — Hayal satıcılığı yapmıyoruz](https://www.gazetepencere.com/yazarlar/hayal-saticiligi-yapmiyoruz-681745h): 30 Kasım 2025 tarihli kurucu röportajında deneyim aktarımı ve farklı yöntemlerle karşılaşma.
- [Evrensel — Atlas Performans Akademisi açılışı](https://www.evrensel.net/haber/583123/atlas-performans-akademisi-perada-acildi): 10 Kasım 2025 haberi, arama motoru alıntısı üzerinden; doğrudan sayfa erişimi 403. Tiyatro ekibi tarafından açılan akademi ve eğitmenler.

Resmî web sitesi araştırma sırasında bakım sayfası gösterdi. Instagram doğrudan erişimi sınırlandığından yeni gönderiler veya güncel kontenjanlar doğrulanmış gibi kullanılmadı. Mevcut kaynaklı içerik kayıtları korundu.

## Uygulanan tasarım

- Büyük tipografili sahne fotoğrafı açılışı; değişen fotoğrafa bağlı oyun adı ve oyun bağlantısı.
- İzle / Tanış / Çalış bölüm navigasyonu.
- Bir ana afiş, oyun bilgisi ve iki ikincil afişten oluşan repertuvar seçkisi.
- Sercan Özinan ve Ece Çelikçapa Özinan'ın hareketli kartları altında aynı kişinin tiyatro ve eğitim çalışmalarına bağlantılar.
- APA bölümünde Oyunculuk / Yazı / Sinema sekmeleri, kaynaklı programlar ve geçmiş program etiketleri.
- Saf beyaz, siyah, nötr gri; renkli sahne fotoğrafları ve özgün afişler korunur.
- Footer görünmeden önce sönen, yukarı kaydırmada geri gelen alt kenar blur'u.

## Doğrulama

Slider motoru ve bileşen olay işleyicileri kontrollü JavaScript test ortamında sınandı: ileri/geri, döngü, hızlı ardışık tıklama, animasyon sırasında yön değiştirme, sürüklemenin kesilmesi, kaydırma tamamlanması/iptali, animasyonsuz gezinme, klavye ve gösterge seçimi. Footer etkisi farklı viewport mesafeleriyle sınandı. Bu kontroller canlı tarayıcı tıklaması veya görsel ekran testi değildir.

Ana sayfa ve iç sayfalar HTTP, bağlantı, medya ve sunulan CSS kontrollerinden; proje ayrıca üretim derlemesinden ve değişen bileşenler lint kontrolünden geçirildi.
