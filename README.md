# Nature of Code Türkçe

Daniel Shiffman’ın [The Nature of Code](https://natureofcode.com) kitabının (2024, p5.js) Anadolu MYO Bilişim Teknolojileri **Oyun Fiziği** dersi için Türkçe, interaktif web uyarlaması.

Bu site resmi çeviri değildir. Orijinal kitap ücretsiz olarak [natureofcode.com](https://natureofcode.com) adresindedir; örnek kodlar [nature-of-code/noc-book-2](https://github.com/nature-of-code/noc-book-2) deposundadır. Kitap [Creative Commons Attribution-NonCommercial 4.0](https://creativecommons.org/licenses/by-nc/4.0/) ile lisanslıdır. Buradaki metin ve örnekler o kitaba dayanır: sıra ve örnekler durur, sınıf için açıklama, soru ve oyun fiziği ekleri eklenir. Ticari kullanım için Shiffman’ın lisansına uyun ve atıf verin.

Canlı kitap: [gusanmaz.github.io/noc-turkce](https://gusanmaz.github.io/noc-turkce/)

## Ne var

Statik bir sitedir. Derleme yoktur. Bölümler `content/*.js` içindedir; kod kutuları sayfada görünür, düzenlenir ve tarayıcıda çalışır (p5.js, p5.play, Matter.js, Phaser).

| Grup | İçerik |
| --- | --- |
| Hazırlık | Ders, JavaScript, p5.js, matematik. Kitle neredeyse sıfır JS / p5.js / matematik varsayılır. |
| Kitap | Giriş ve Bölüm 0–11. Orijinal sıra durur. |
| Oyun fiziği | p5.play, Phaser, Matter.js, Unity / C#, Godot, raylib, Python (Pymunk, PyBox2D, PyBullet). |
| Ek | Sözlük, kaynaklar. |

p5.play bölümünün kapsam kaynağı: [gusanmaz/p5play-tutorial](https://github.com/gusanmaz/p5play-tutorial).

C#, GDScript, Python ve C sekmeleri boyanır. Tarayıcı Unity, Godot, Pymunk veya raylib açmaz; sağdaki tuval aynı fikrin p5.js / p5.play resmidir.

`docs/` eski, bölüm bölüm HTML taslaklarıdır (kuvvet, salınım, rastgelelik, vektör). Güncel kitap kökteki `index.html` dosyasıdır.

## Yerelde çalıştırma

```bash
python3 -m http.server 8080
```

Tarayıcı: [http://localhost:8080](http://localhost:8080)

Adres `file://` olursa canlı örnekler açılmaz. Bir bölümün adresi `#/ch2` gibidir; alt başlık `#/ch2/sp-kuvvet` biçimindedir.

## Katkı

Küçük ve tek konulu pull request tercih edilir. Büyük yeniden yazımdan önce issue açın.

İşe yarayan katkılar:

- Kırık sketch, yanlış formül, bozuk Türkçe, ölü link.
- Bir p5.js fonksiyonu o bölümde tek satırla geçmişse, o fonksiyonu orada anlatmak.
- Zor yerde ek soru, tuzak veya çalışan örnek. Orijinal bölüm sırasını ve örneklerini silmeyin. Ek örneği “kitaba ek” diye bağırmayın.
- Oyun fiziği eklerinde sözlük dürüst kalsın: analog, motorun kendisi değildir.

Yazım:

- Sınıfta, tahtasız, bir kez söylenebilecek Türkçe. Telgraf cümle ve “siz bilirsiniz” yok.
- Günlük resim, sonra yanlış yazınca neyin bozulduğu, sayı en sonda.
- Öğrenci metninde kütüphane adı **p5.js** ve **JavaScript** olarak yazılır. Kodda `p5` ve `function` kalır.
- Formül kutusunun alt satırı tam cümledir: neyin hesaplandığı, p5.js’te hangi fonksiyon, argümanlar.

Ayrıntı: [`.cursor/rules/`](.cursor/rules/).

Yeni örnek kabaca şöyledir. Bölüm dosyası `registerChapter` ile sayfayı kurar; canlı kutu `N.editor("kimlik")` ile çağrılır, kod `editors` nesnesindedir.

```javascript
${N.editor("ornek1")}
// ...
ornek1: {
  title: "Ne öğrettiği",
  files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}
function draw() {
  background(255);
}
` }]
}
```

`index.html` yeni bir bölüm dosyasını `<script>` ile yüklemelidir. Kenar çubuğu sırası `js/app.js` içindeki `ORDER` dizisindedir.

PR açmadan önce ilgili bölümü yerelde çalıştırın. Sketch açılıyor mu, metin sesli okunuyor mu, orijinal kitap linki duruyor mu.

## Kaynaklar

- [The Nature of Code](https://natureofcode.com) — Daniel Shiffman, ücretsiz HTML
- [noc-book-2](https://github.com/nature-of-code/noc-book-2) — orijinal örnekler
- [The Coding Train](https://thecodingtrain.com/) — Shiffman’ın ders videoları
- [p5.js](https://p5js.org)
- [p5.play](https://p5play.org)
- [p5.play tutorial](https://gusanmaz.github.io/p5play-tutorial/)
