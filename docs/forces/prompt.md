# Nature of Code - Kuvvetler Bölümü Türkçe İnteraktif Eğitim Sitesi

## Hedef Kitle Profili

### 🎓 Programlama Seviyesi: BAŞLANGIÇ
Bu siteyi okuyacak öğrenciler:
- p5.js ile **yeni tanıştı**
- Temel JavaScript kavramları **yeni oturuyor:**
  - `if/else` koşulları
  - `for` döngüleri
  - Diziler (arrays)
  - Temel OOP (class, constructor, method)
- Fonksiyonlar ve parametreleri **tam anlamadı**

### 📐 Matematik/Fizik Seviyesi: DÜŞÜK
- Vektör kavramını **ilk kez görüyor**
- Fizik formüllerini **ezberden bilmiyor**
- `F = ma` ne demek **detaylı açıklanmalı**

### 📝 Bu Nedenle:
1. **Her satırı açıkla** - "Bu satır ne yapıyor?" sorusuna cevap ver
2. **Konseptleri detaylı anlat** - Kitaptaki açıklamayı genişlet
3. **Basitten karmaşığa git** - Önce basit örnek, sonra tam kod
4. **Görsellerle destekle** - Formülleri diagram/görsellerle açıkla

---

## Kaynak Materyal

### GitHub Repo
**Ana Repo:** https://github.com/nature-of-code/noc-book-2

| İçerik | URL |
|--------|-----|
| **Görseller** | https://github.com/nature-of-code/noc-book-2/tree/main/content/images/02_forces |
| **HTML İçerik** | https://github.com/nature-of-code/noc-book-2/blob/main/content/02_forces.html |
| **Kod Örnekleri** | https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/02_forces |

### 🔴 ÖNEMLİ: Repoyu İncele!
Kod yazmaya başlamadan önce GitHub reposunu **mutlaka incele**:
1. `content/images/02_forces/` - hangi görseller var?
2. `content/examples/02_forces/` - hangi örnek klasörleri var?
3. Her klasörde hangi dosyalar var? (sketch.js, mover.js, liquid.js, vb.)

---

## Pedagojik Yaklaşım

### 1. Satır Satır Açıklama

**Her önemli satırın ne yaptığını açıkla:**

```javascript
applyForce(force) {
  // Bu fonksiyon bir kuvvet vektörü alıyor
  // "force" parametresi p5.Vector tipinde

  // Newton'un 2. yasası: ivme = kuvvet / kütle
  // p5.Vector.div() -> bölme işlemi yapar
  // Neden div() kullanıyoruz? Çünkü force'u değiştirmek istemiyoruz
  // p5.Vector.div(a, b) -> a'yı b'ye böler, YENİ vektör döndürür
  let f = p5.Vector.div(force, this.mass);
  
  // İvmeye ekle (biriktir)
  // Neden add()? Çünkü birden fazla kuvvet olabilir
  // Her kuvvet toplama ekleniyor
  this.acceleration.add(f);
}
```

### 2. Konseptleri Detaylı Açıkla

Kitaptaki açıklamayı genişlet. Öğrenci fizik bilmiyor varsay!

**Örnek: Kuvvet Biriktirme**

```
❌ Kısa Açıklama (YETERSİZ):
"Kuvvetler toplanarak biriktirilir."

✅ Detaylı Açıklama (DOĞRU):
"Bir topa aynı anda hem yerçekimi hem de rüzgar etki ederse ne olur?

İki kuvveti ayrı ayrı uygulamak yerine TOPLAMALARINI alıyoruz:
- Yerçekimi: (0, 0.1) → aşağı çekiyor
- Rüzgar: (0.05, 0) → sağa itiyor
- Toplam: (0.05, 0.1) → sağ-aşağı hareket

Bu yüzden applyForce() içinde kuvveti ivmeye EKLİYORUZ (üzerine yazmıyoruz).
Her frame sonunda ivmeyi sıfırlıyoruz çünkü bir sonraki frame'de 
kuvvetler değişebilir (mesela rüzgar durabilir)."
```

### 3. Ek Örnekler Ekleyebilirsin

Kitap içeriğine sadık kal ama **eğitici olduğunu düşündüğün ek örnekler** ekle:

```javascript
// Kitapta olmayan ama öğretici EK ÖRNEK:
// "Sadece yerçekimi - en basit hali"

let position;
let velocity;

function setup() {
  createCanvas(400, 400);
  position = createVector(width/2, 50);
  velocity = createVector(0, 0);
}

function draw() {
  background(220);
  
  // En basit yerçekimi: sadece y'ye sabit değer ekle
  let gravity = createVector(0, 0.1);
  velocity.add(gravity);  // hızı arttır
  position.add(velocity); // konumu güncelle
  
  circle(position.x, position.y, 30);
  
  // Yerden sekme
  if (position.y > height - 15) {
    position.y = height - 15;
    velocity.y *= -0.9;  // enerji kaybı
  }
}
```

### 4. Vektör Kavramını Anlat

Öğrenci vektörü bilmiyor! Açıkla:

```
📍 VEKTÖR NEDİR?

Vektör = Yön + Büyüklük

Gerçek hayat örneği:
- "5 km yürüdüm" → SKALER (sadece miktar)
- "Kuzeye doğru 5 km yürüdüm" → VEKTÖR (yön + miktar)

p5.js'te:
createVector(3, 4) → x=3, y=4 yönünde bir ok
- Büyüklük: sqrt(3² + 4²) = 5
- Yön: sağ-aşağı doğru
```

---

## 🔴 Live Code Editor: Çoklu Dosya Desteği

### Editör Yapısı
```
┌─────────────────────────────────────────────────────────────┐
│ [sketch.js] [mover.js] [liquid.js]   [▶ Çalıştır] [↻ Sıfırla] │
├─────────────────────────┬───────────────────────────────────┤
│  1 │ // sketch.js       │                                   │
│  2 │ let mover;         │      ┌─────────────────┐          │
│  3 │ let liquid;        │      │   p5.js Canvas  │          │
│  4 │ ...                │      │                 │          │
├─────────────────────────┴───────────────────────────────────┤
│ > ✓ Başarılı!                                               │
└─────────────────────────────────────────────────────────────┘
```

### Editör Özellikleri (DETAYLI)

| Özellik | Açıklama |
|---------|----------|
| **Dosya Tab'ları** | Her dosya için ayrı tab (sketch.js, mover.js, vb.) |
| **Satır Numaraları** | Her satırın solunda 1, 2, 3... şeklinde - KODA HİZALI |
| **Syntax Highlighting** | JavaScript keyword'leri renkli (Prism.js veya benzeri) |
| **Düzenlenebilir Kod** | Textarea içinde kod değiştirilebilir |
| **▶ Çalıştır Butonu** | Tüm dosyaları birleştirip p5.js olarak çalıştır |
| **🔄 Yeniden Çalıştır** | Kod değişikliği sonrası tekrar çalıştır (aynı butona basınca) |
| **↻ Sıfırla Butonu** | Tüm dosyaları orijinal haline döndür |
| **Konsol Çıktısı** | Başarı/hata mesajları alt kısımda |
| **Ctrl+Enter** | Kısayol ile hızlı çalıştırma |

---

## 📁 Önerilen Proje Yapısı

Kodları mantıklı şekilde organize et. İşte iyi bir yapı örneği:

```
project/
├── index.html                    # Ana sayfa (konu kartları)
│
├── css/
│   └── style.css                 # Tüm stiller (tema, editör, responsive)
│
├── js/
│   ├── theme.js                  # Tema kontrolü (dark/light toggle)
│   ├── live-editor.js            # Düzenlenebilir kod editörü bileşeni
│   └── mover.js                  # (Opsiyonel) Paylaşılan sınıflar
│
├── images/
│   ├── 02_forces_1.png           # Kitaptan görseller
│   ├── 02_forces_2.png
│   └── ...
│
└── pages/
    ├── newton-yasalari.html      # 1. Newton Yasaları
    ├── kuvvet-biriktirme.html    # 2. Kuvvet Biriktirme
    ├── kutle-ivme.html           # 3. Kütle ve İvme
    ├── surtunme.html             # 4. Sürtünme
    ├── suruklenme.html           # 5. Sürükleme/Akışkan Direnci
    └── kutle-cekimi.html         # 6. Kütlesel Çekim
```

### Neden Bu Yapı?

| Klasör | Amaç |
|--------|------|
| `css/` | Tüm stiller tek yerde, kolay bakım |
| `js/` | JavaScript modülleri ayrı dosyalarda |
| `images/` | Görseller organize |
| `pages/` | Her konu kendi sayfasında |

### Modüler JavaScript

JavaScript'i modüllere böl:

**`js/theme.js`** - Tema kontrolü
```javascript
// localStorage'dan tema oku
// Toggle butonu event listener
// HTML'e data-theme attribute ekle
```

**`js/live-editor.js`** - Kod editörü bileşeni
```javascript
// class LiveEditor { ... }
// Tab yönetimi
// Kod çalıştırma
// Satır numaraları
```

---

## 🎨 UI/UX Gereksinimleri

### 1. Dark/Light Tema Desteği

```
┌─────────────────────────────────────────┐
│  🌙 Dark Mode    │    ☀️ Light Mode    │
├──────────────────┼─────────────────────┤
│  Arka plan: #1a1a2e │  Arka plan: #ffffff │
│  Metin: #e0e0e0     │  Metin: #333333     │
│  Kod arka plan: #0d1117 │ Kod: #f6f8fa    │
│  Accent: #6366f1    │  Accent: #4f46e5    │
└──────────────────┴─────────────────────┘
```

- **Tema toggle butonu** sağ üstte
- **localStorage** ile kullanıcı tercihi kaydet
- Sayfa yenilenince aynı tema korunsun

### 2. Syntax Highlighting (Kod Renklendirme)

**Prism.js** veya benzeri bir kütüphane kullan:

```javascript
// Keyword'ler: mavi
let, const, function, class, if, for, return

// String'ler: yeşil
"merhaba", 'dünya'

// Sayılar: turuncu
42, 3.14, 0.1

// Yorumlar: gri
// Bu bir yorum

// Fonksiyonlar: sarı
createVector(), applyForce(), draw()
```

### 3. Satır Numaraları

```
┌────┬──────────────────────────────────────┐
│  1 │ class Mover {                        │  ← Numara ve kod aynı hizada
│  2 │   constructor(x, y) {                │
│  3 │     this.position = createVector(x, y); │
│  4 │   }                                  │
│  5 │ }                                    │
└────┴──────────────────────────────────────┘
```

- Numaralar KOD SATIRLARIYLA HİZALI olmalı
- Scroll yapınca numaralar da scroll etmeli
- Farklı font boyutlarında hizalama bozulmamalı

### 4. Responsive Design (Mobil Uyumluluk)

**Desktop (>900px):**
```
┌─────────────────┬─────────────────┐
│   Kod Editörü   │   p5.js Canvas  │
│   (sol yarı)    │   (sağ yarı)    │
└─────────────────┴─────────────────┘
```

**Mobil (<900px):**
```
┌─────────────────────────────────┐
│        Kod Editörü              │
│        (tam genişlik)           │
├─────────────────────────────────┤
│        p5.js Canvas             │
│        (altında)                │
└─────────────────────────────────┘
```

- Tab'lar mobilde yatay scroll yapabilmeli
- Butonlar dokunmatik için yeterli boyutta (min 44x44px)
- Font boyutu okunabilir (min 14px)

### 5. Düzenlenebilir Kod

Kullanıcı kodu değiştirebilmeli:
- Textarea veya contenteditable div
- Tab tuşu 2 boşluk eklemeli
- Ctrl+Enter çalıştırmalı
- Değişiklik yapıldığında "değiştirildi" göstergesi

---

## Kod Açıklama Formatı

### Her Fonksiyon İçin:
1. **Ne yapar?** - Bir cümleyle özet
2. **Parametreler** - Ne alıyor, ne tipi
3. **Satır satır** - Her satırın açıklaması
4. **Neden böyle?** - Tasarım kararı

```javascript
/**
 * applyForce - Cisme kuvvet uygular
 * 
 * @param {p5.Vector} force - Uygulanacak kuvvet vektörü
 * 
 * Nasıl çalışır:
 * 1. Kuvveti kütleye böl (Newton'un 2. yasası)
 * 2. Sonucu ivmeye ekle (biriktir)
 */
applyForce(force) {
  // Satır 1: Kuvveti kütleye böl
  // - p5.Vector.div() statik metod, yeni vektör döndürür
  // - Neden statik? Çünkü force'u değiştirmek istemiyoruz
  // - force başka yerde de kullanılabilir
  let f = p5.Vector.div(force, this.mass);
  
  // Satır 2: İvmeye ekle
  // - add() metodu this.acceleration'ı değiştirir
  // - Birden fazla kuvvet varsa hepsi toplanır
  this.acceleration.add(f);
}
```

---

## "Deneyin" Kutusu

Her örnekten sonra öğrenciye ne denemesi gerektiğini söyle:

> **🔬 Deneyin:**
>
> 1. **Satır 52:** Yerçekimini `0.5`'e çıkarın. 
>    - Beklenti: Top daha hızlı düşer
>    - Neden: Daha güçlü aşağı kuvvet
>
> 2. **Satır 56:** Rüzgarı `createVector(-0.1, 0)` yapın.
>    - Beklenti: Rüzgar sola doğru eser
>    - Neden: Negatif x değeri = sol yön
>
> 3. **mover.js Satır 6:** `this.mass = 10` yapın.
>    - Beklenti: Aynı kuvvette daha az hareket
>    - Neden: a = F/m, büyük m = küçük a

---

## Görseller

GitHub'dan görselleri al:
```
https://raw.githubusercontent.com/nature-of-code/noc-book-2/main/content/images/02_forces/[dosya].png
```

Her görsele **açıklayıcı Türkçe caption** ekle.

---

## Türkçe Kuralları

- Düz cümle yapısı
- Terim: Türkçe + (İngilizce)
- Öğrenci dostu, samimi ton
- "Şimdi görelim", "Hatırlayın", "Dikkat edin" gibi yönlendirmeler

---

## ⚠️ KRİTİK UYARILAR

### YAPMA ❌
- Kodu açıklamadan gösterme
- "Bu basit, anlaşılır" deme - HER ŞEYİ AÇIKLA
- Fizik formülünü vermeden geçme
- Tek dosya gösterip diğerlerini atlama
- Kodu kısaltma

### YAP ✅
- Her satırı açıkla
- Vektör, kuvvet gibi kavramları detaylı anlat
- Kitap dışı ek örnekler ekle (eğitici olduysa)
- Görsellerle destekle
- "Neden böyle?" sorusuna cevap ver
