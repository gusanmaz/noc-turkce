registerChapter({
  id: "ders",
  title: "Bu ders ve bu web kitabı",
  short: "Bu ders",
  icon: "🏫",
  html: `
    <div class="hero-card">
      <h2>Oyun fiziği, kodla</h2>
      <p>Daniel Shiffman’ın <em>The Nature of Code</em> kitabını Anadolu MYO Bilişim Teknolojileri <strong>Oyun Fiziği</strong> dersi için Türkçe, tarayıcıda çalışan bir kitap yaptık. Hareket, kuvvet, parçacık, ajan — oyunda gördüğünüz şeylerin altında yatan fikirler.</p>
    </div>

    <h2>Kim için?</h2>
    <p>Orijinal kitap “bir dönem p5.js biliyorsunuz” der. Bu sınıfta o varsayım yok. Soldaki <strong>Hazırlık</strong> üçlüsü sıfırdan yazıldı: daha önce kod, tuval veya sinüs duymadıysanız oradan başlayın. Acele etmeyin. Asıl kitapta da aynı fikirler gerektiğinde yeniden açılır.</p>
    <ol>
      <li><a href="#/js">JavaScript</a> — kutu (değişken), karar (if), tekrar (for), liste, tarif (fonksiyon), kalıp (class)</li>
      <li><a href="#/p5">p5.js</a> — tuval, renk, fare, <code>map</code>, döndürme</li>
      <li><a href="#/mat">Matematik</a> — uzaklık, yüzde, açı, sin/cos, <code>F = ma</code> resimle</li>
    </ol>

    <h2>Sayfadaki kod</h2>
    <p>Örnekler sayfanın içinde durur. Solda kaynak, sağda canvas. Satırı değiştirip <strong>Çalıştır</strong> (Ctrl+Enter). Bozulursa <strong>Sıfırla</strong>.</p>
    <p>Kitaptan gelen örneklerin üstünde <em>Kitap</em> ve <em>Kod</em> linkleri vardır: Shiffman’ın metni ve GitHub’daki sketch. Ders için ek alıştırmalar da göreceksiniz; ayrı bir etiket taşımazlar.</p>
    ${N.editor("hello")}
    ${N.tryit([
      { do: "circle(..., 40) içindeki 40’ı 12 yapın.", expect: "Nokta küçülür." },
      { do: "background(220) yerine background(20) yazın.", expect: "Tuval kararır; yazı okunmaz olabilir, fill rengini de açın." },
    ])}

    <h2>Dersin omurgası</h2>
    <p>Notun kalbi <strong>hareket ve kuvvet</strong>tir (bölüm 0–6). 7–11 daha soyut: ızgara kuralları, evrim, öğrenme. Kitapta dururlar; dönem planına göre yavaş okunabilir.</p>
    <table class="data">
      <thead><tr><th>Okuma</th><th>Oyunda karşılığı</th></tr></thead>
      <tbody>
        <tr><td>Hazırlık</td><td>Kod yazabilmek</td></tr>
        <tr><td>Rastgelelik + vektörler</td><td>Konum, hız, karakter hareketi</td></tr>
        <tr><td>Kuvvetler</td><td>Yerçekimi, rüzgar, zıplama hissi</td></tr>
        <tr><td>Salınım</td><td>Dönme, sarkaç, nişan</td></tr>
        <tr><td>Parçacıklar</td><td>Patlama, duman, kıvılcım</td></tr>
        <tr><td>Otonom ajanlar</td><td>Takip, kaçma, sürü</td></tr>
        <tr><td>Fizik kütüphaneleri</td><td>Matter.js, çarpışma, kısıt</td></tr>
        <tr><td>p5.play</td><td>Sprite, zemin, jeton, kamera</td></tr>
        <tr><td>Phaser</td><td>Arcade fizik ve Matter fizik — 29 canlı örnek</td></tr>
        <tr><td>Matter.js oyun</td><td>Sapan, kule, sensor, takla kilidi</td></tr>
        <tr><td>Unity / C#</td><td>Rigidbody2D, FixedUpdate, ışın, eklem</td></tr>
        <tr><td>Godot ve diğerleri</td><td>CharacterBody, Pymunk / PyBox2D / PyBullet, raylib (editörsüz kalem)</td></tr>
      </tbody>
    </table>

    <h2>Oyun fiziği bölümleri</h2>
    <p>Kitap fiziğin çoğunu sıfırdan yazar. Ödevde zemin ve çarpışma için hazır motor gerekir. Solda <strong>Oyun fiziği</strong> grubu ayrı durur:</p>
    <ul>
      <li><a href="#/p5play">p5.play</a> — eğitimin 69 canlı örneği</li>
      <li><a href="#/phaser">Phaser</a> — Arcade ve Matter; sahne, gövde, platform, kamera, sapan</li>
      <li><a href="#/matter">Matter.js · oyun</a> — tıklayınca kutu, zincir, filtre, kule (kitap ofisi <a href="#/ch6">Bölüm 6</a>)</li>
      <li><a href="#/unity">Unity / C#</a> — Rigidbody2D sözlüğü; C# boyanır, tarayıcı Unity açmaz</li>
      <li><a href="#/motorlar">Godot, raylib, Python</a> — CharacterBody, Pymunk, PyBox2D, PyBullet, raylib kalem kutusu</li>
    </ul>
    <p>p5.js birkaç yıldır aynı programda duruyor. Bu kitap p5.js’te kalır çünkü Nature of Code o dilde yazıldı. Phaser ve Unity unutulmuş değildir.</p>
    <p>Canlı Türkçe p5.play eğitimi (kapsamın kaynağı): <a href="https://gusanmaz.github.io/p5play-tutorial/" target="_blank" rel="noopener">gusanmaz.github.io/p5play-tutorial</a></p>

    ${N.resources([
      { kind: "Kitap", title: "The Nature of Code (ücretsiz HTML)", url: "https://natureofcode.com/", note: "İngilizce asıl metin" },
      { kind: "Kod", title: "noc-book-2 örnekleri", url: "https://github.com/nature-of-code/noc-book-2", note: "sketch.js dosyaları" },
      { kind: "Video", title: "The Coding Train", url: "https://thecodingtrain.com/", note: "Shiffman’ın ders videoları" },
      { kind: "Referans", title: "p5.js referans", url: "https://p5js.org/reference/" },
      { kind: "Tutorial", title: "p5.play eğitimi (canlı)", url: "https://gusanmaz.github.io/p5play-tutorial/" },
      { kind: "Tutorial", title: "p5.play eğitimi (kaynak)", url: "https://github.com/gusanmaz/p5play-tutorial" },
    ])}

    <h2>Lisans</h2>
    <p><em>The Nature of Code</em> Daniel Shiffman, Creative Commons. Bu uyarlama eğitim içindir. Görseller kitabın deposundan bağlanır.</p>
    <p><a href="#/js">JavaScript temelleri →</a></p>
  `,
  editors: {
    hello: {
      title: "Fareyi izleyen daire",
      files: [
        {
          name: "sketch.js",
          content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(220);
  fill(80, 140, 220);
  circle(mouseX, mouseY, 40);
}`,
        },
      ],
    },
  },
});
