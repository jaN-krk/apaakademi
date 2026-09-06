# Kartlar ve hareket tasarımı

6 Eylül 2026 — Chromium ile tarayıcı doğrulaması; fiziksel telefon veya Safari testi değildir.

## Kartlar

- Tiyatro ekibindeki 18 ve akademideki 7 kart, 1440 ve 390 piksel genişliklerde tek tek ekrana kaydırıldı: toplam 50 kontrol.
- Her kartta portre dosyası yüklendi, WebGL kartı hazır duruma ulaştı ve ekran görüntüsündeki kart alanı boş değildi. İki boyuttaki tüm portreler toplu ekran görüntüleriyle de incelendi.
- İp artık ham fizik konumu yerine kartla aynı interpolasyon uygulanmış sahne konumunu kullanıyor. Bağlantı, GLB modelinin metal halkasının merkezine taşındı.
- Eklem başlangıçları ip uzunluklarıyla eşleşiyor. Gereksiz sürekli uyandırma kaldırıldı, fizik adımı sabitlendi. Kart sürüklenebilir ve kendi düzleminde sallanabilir; portre yüzü önde kalıyor.
- Durağan kartın iki ekran görüntüsü arasında ortalama piksel farkı 0; sürüklenirken 58.09; bırakılıp durulduktan sonra tekrar 0. Sürükleme korunurken kendi kendine titreme görülmedi.
- Gerçek `WEBGL_lose_context` uzantısıyla grafik bağlamı kapatıldı: normal fotoğraflı kart görünümüne geçti.

## Animasyon ve mobil görünüm

- 320, 390, 844 ve 1440 pikselde ana sayfa tam ekran yüksekliğinde, yatay taşma yok.
- Telefon genişliklerinde ve dokunmatik cihazlarda alt kaydırma blur'u kapalı; masaüstünde korunuyor.
- React Bits Text Loop siyah zeminde beyaz APA / ATLAS PERFORMANS yazısıyla kullanıldı. Lisans: `react-bits-LICENSE.md`.
- Arka planda SVG çizgilerinden oluşturulmuş hafif hareketli bir desen var. Ayrı bir WebGL bağlamı oluşturmuyor.
- Yazı döngüsü ilerliyor; duraklat düğmesi hareketi durduruyor. Görünmeyen bölümde döngü ve arka plan hareketi duruyor.
- Giriş başlığı ve kaydırmada beliren başlıklar okunabilir HTML olarak kalıyor. Azaltılmış hareket tercihinde giriş ve döngü animasyonları çalışmıyor.

## Derleme

- Değişen TSX dosyalarında ESLint başarılı.
- `npm run build` başarılı, 76 sayfa üretildi.
- İçerik doğrulamasında hata yok; önceki geçmiş etkinlik/isCurrent uyarısı devam ediyor.
