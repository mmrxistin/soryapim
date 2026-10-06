// Bismillahirahmanirahim
// Elhamdulillahirabbulalemin
// Esselatu vesselamu ala rasulillah
// La ilahe illAllahu vahdehu la sharika leh, lehu'l-mulku ve lehu'l-hamdu,
// yuhyi ve yumit
// bîyadîhîl xayr
// ve huve ala kulli şey'in kadir
// Allah u Ekber, Allahu Ekber, Allahu Ekber
// La ilahe illAllah, Allahu Ekber, Allahu Ekber ve lillahi'l-hamd

# Xiaomi Root Assistant

Bu proje, `2406APNFAG` cihazı için Tkinter tabanlı güvenli bir yardımcı arayüzdür.

## Çalıştırma

Linux'ta Python 3 ile:

```bash
python3 app.py
```

Android SDK Platform-Tools içindeki `adb` ve `fastboot` komutlarının PATH üzerinde bulunması gerekir.

## Kapsam

- ADB ve Fastboot araçlarının kurulu olup olmadığını kontrol eder.
- ADB üzerinden cihaz kodu ve model bilgisini okur.
- Fastboot ürün bilgisini okur.
- Kullanıcının seçtiği Magisk ile yamalanmış imajın SHA-256 özetini gösterir.
- HTTPS üzerinden `.img` imajı indirir ve isteğe bağlı SHA-256 ile doğrular.
- Fastboot modundaki `2406APNFAG` cihazına, kullanıcı onayıyla seçilen boot imajını yükler.

## İmaj indirme

Arayüzde `HTTPS imaj URL'si` alanına güvenilir kaynağın doğrudan `.img` bağlantısını girin. Kaynağın yayınladığı SHA-256 değerini `Beklenen SHA-256` alanına yazmanız önerilir. İmaj, `~/Downloads` klasörüne indirilir; özet eşleşmezse dosya kullanılabilir imaj olarak işaretlenmez.

İndirme adresini ve SHA-256 değerini cihaz modeline uygun resmi veya güvenilir geliştirici kaynağından doğrulayın. Rastgele sitelerden boot imajı indirmeyin.

## Root yükleme

1. Cihazın bootloader kilidini resmi Xiaomi yöntemiyle açın.
2. Cihazı Fastboot modunda USB ile bağlayın.
3. Uygulamanın cihazı `2406APNFAG` olarak bulduğunu doğrulayın.
4. Cihaza uygun Magisk ile yamalanmış `.img` dosyasını seçin ve `Root yükle` düğmesine basın.

Uygulama yalnızca ürün kodu `2406APNFAG` ile eşleşirse `fastboot flash boot` komutunu çalıştırır. Bootloader kilitliyse veya imaj cihaz sürümüyle uyumsuzsa işlem hata verebilir; yanlış imaj kullanmak cihazın açılmamasına neden olabilir.

Bootloader kilidi açma ve imaj flashlama işlemleri veri kaybı ve cihazın açılmaması riski taşıdığı için otomatik çalıştırılmaz. Resmi Xiaomi kilit açma sürecini, cihaz modeline uygun imajı ve geri dönüş planını doğrulamadan bu işlemleri yapmayın.
