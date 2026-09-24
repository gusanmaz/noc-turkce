registerChapter({
  id: "giris",
  title: "Giriş",
  short: "Giriş",
  icon: "📖",
  original: "https://natureofcode.com/introduction/",
  html: `


    <div class="hero-card">
      <h2>Doğanın kodu</h2>
      <p>On yıldan fazla önce Daniel Shiffman <em>The Nature of Code</em>’u Processing ile yayımladı. 2024 baskısı aynı doğa, yeni dil: JavaScript ve p5.js. Kuşlar hâlâ kanat çırpar, elmalar hâlâ başımıza düşer.</p>
    </div>

    <h2>Bu kitap nedir?</h2>
    <p>Shiffman NYU ITP/IMA’da 2004’ten beri hesaplamalı medya, 2008’den beri Nature of Code dersi veriyor. Öğrenci değişken, döngü, nesne öğrendikten sonra bir yere derinlemesine iner. Bu kitap o sonraki adımdır: <strong>doğada olanı kodla taklit etmek</strong>.</p>
    <p>Bu bir fen bilgisi kitabı değil. Fizik ve biyolojiden parça alır, akademik sıkılık iddiası yoktur: “gerçek olaylardan esinlendi.” Sanat kitabı da değil. Sonuç görsel olsa da gri şekiller algoritmanın kendisidir. Gökkuşağına çevirmek size kalmış.</p>
    <p>Sonuçta bu eski usul bir <strong>programlama kitabı</strong>. Tohum bilimsel olabilir; içerik her zaman koda, özellikle nesne yönelimli programlamaya iner.</p>
    <p>Oyun fiziği dersinde “taklit” pratiktir: top düşsün, karakter zıplasın, düşman takip etsin. Kitap bunu sıfırdan yazmayı öğretir. Motor (p5.play) sonra gelir; sihir değil, aynı Newton’un paketlenmiş hali.</p>

    <h2>p5.js üzerine bir söz</h2>

    <p>p5.js, Processing’in web için yeniden düşünülmüş halidir. Ücretsiz, açık kaynak, tarayıcıda çalışır; kurulum yok. Shiffman’ın asıl vurgusu kütüphane değil <strong>topluluk</strong>.</p>
    <p>Kitabın fikirleri p5’e kilitli değil. Vanilla JS, Java, openFrameworks da olur. Örnekler p5.js 1.9.0 ile test edilmiştir. Güncel kod kitabın GitHub’ında durur. Bu sitede p5’i biz yüklüyoruz; kendi HTML’inizde script sırası yeter. p5.play kullanacaksanız önce p5, sonra Planck, sonra p5play.</p>

    <h2>Ne bilmeniz bekleniyor?</h2>

    <p>Orijinal önkoşul: “bir dönem p5.js / Processing / yaratıcı kod.” Değişken, koşul, döngü, fonksiyon, nesne, dizi. OOP yoksa Bölüm 0’daki sınıf ağır gelir; Coding Train nesne videoları önerilir.</p>
    ${N.note(
      "Bu sınıfta",
      `<p>Matematik ve p5 henüz oturmadıysa önce <a href="#/js">JavaScript</a>, <a href="#/p5">p5.js</a> ve <a href="#/mat">matematik</a> sayfalarına bakın. İlham için okumak mümkün; örnekleri çalıştırmak için o temeller şart.</p>`
    )}

    <h2>Bu kitabı nasıl okuyorsunuz?</h2>

    <p>Shiffman içeriği bir yerde (Notion) yazıp PDF, HTML, kâğıt üretmeyi hayal etmiş. Siz şimdi HTML5 sürümünün Türkçe, derslik uyarlamasını okuyorsunuz. Format değişir; malzeme aynı kalır. Fark, örnekleri <strong>nasıl yaşadığınız</strong>.</p>

    <h3>The Coding Train bağlantısı</h3>

    <p>Shiffman’ın YouTube kanalı: aynı fikirler video ile. Kitaba paralel p5.js video serisi de var. Takıldığınız algoritmada “Coding Train + konu adı” arayın.</p>
    <p><a href="https://thecodingtrain.com" target="_blank" rel="noopener">thecodingtrain.com</a></p>

    <h3>Ek kaynaklar (orijinalin önerdikleri)</h3>

    <ul>
      <li>Gary William Flake, <em>The Computational Beauty of Nature</em> — Shiffman’ın birçok fikri buradan.</li>
      <li>That Creative Code Page — Taru Muhonen ve Raphaël de Courville.</li>
    </ul>

    <h2>Kitabın hikâyesi</h2>

    <p>İçindekiler 12 bölüm (0–11) gibi durur. Shiffman yine de doğrusal bir anlatı hayal eder.</p>

    <h3>1. kısım: Cansız nesneler</h3>

    <p>Çimdeki futbol topu. Bir şut. Yerçekimi. Rüzgar. Kafa. Topun hayali yoktur; çevre onu iter.</p>
    <p>Ekranda hareketin ilk hali çoğu zaman şudur:</p>
    <p><code>x = x + 1;</code> sonra <code>x = x + xspeed; y = y + yspeed;</code></p>
    <p>Bölüm 0 bu hareketi rastgelelikle ısıtır. Bölüm 1 <code>xspeed</code> ve <code>yspeed</code>’i <strong>vektör</strong> yapar — yeni sihir değil, sağlam temel. Sonra kuvvetin de vektör olduğu (Bölüm 2), Newton, açısal hareket ve salınım (Bölüm 3), binlerce nesneyi parçacık sistemi olarak yönetmek (Bölüm 4) gelir. 4. bölüm OOP’nin kalıtım ve çok biçimliliğine de bahane olur.</p>

    <h3>2. kısım: Canlı</h3>

    <p>Masadan düşen blok kuvvetle hareket eder; yüzen yunus da. Fark: yunus atlamayı <em>seçebilir</em>. Algı, korku, açlık. Bölüm 5 otonom ajanlar: çevreye göre karar. 1–5 sıfırdan yazılır. Bölüm 6 başkalarının fizik kütüphanesi (Matter.js, Toxiclibs.js). 5’in sonu karmaşıklık: parça basit, bütün şaşırtıcı. Hücresel otomat (7), fraktal (8).</p>

    <h3>3. kısım: Zekâ</h3>

    <p>Hareket ettirdiniz, arzu verdiniz. Şimdi evrim (9), sinir ağı (10), hatalardan öğrenme (11). Oyun fiziği notunun omurgası 0–6 ve p5.play’dir; 7–11 kitabı tamamlar, tempo sınıfa göre yavaşlatılabilir.</p>

    <h2>Müfredat olarak kullanmak</h2>

    <p>Shiffman 14 haftalık sıkışık bir dönem tasarlar:</p>
    <table class="data">
      <thead><tr><th>Hafta</th><th>Orijinal</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>Rastgelelik ve vektörler (0–1)</td></tr>
        <tr><td>2</td><td>Kuvvetler (2)</td></tr>
        <tr><td>3</td><td>Salınım (3)</td></tr>
        <tr><td>4</td><td>Parçacık sistemleri (4)</td></tr>
        <tr><td>5</td><td>Otonom ajanlar (5)</td></tr>
        <tr><td>6</td><td>Fizik kütüphaneleri (6)</td></tr>
        <tr><td>7</td><td>Ara proje: hareket</td></tr>
        <tr><td>8</td><td>CA ve fraktallar (7–8)</td></tr>
        <tr><td>9</td><td>Genetik algoritmalar (9)</td></tr>
        <tr><td>10</td><td>Sinir ağları ve nöroevrim (10–11)</td></tr>
        <tr><td>11–14</td><td>Final proje</td></tr>
      </tbody>
    </table>

    <h2>Kodu nasıl okumalı?</h2>

    <p>Kitapta örnek kutusu görünce kod web’de ve p5 editöründe vardır. Burada kutu <strong>canlı editördür</strong>: görün, değiştirin, çalıştırın. Tam örnekler, kesilmiş parçalar ve “bağlamdan kopuk” satırlar orijinalde ayrı ayrı işaretlenir. Biz tam çalışan örnekleri tercih ederiz; kesik satır varsa yanında “bu parça sınıfın içidir” deriz.</p>
    ${N.editor("xplus")}
    <p>Bu, girişteki futbol topu metaforunun en sade hali. Vektör yok, kuvvet yok. Konum her kare bir artıyor. Bölüm 1 bunu iki bileşenli hıza, sonra vektöre çıkaracak.</p>

    <h2>Alıştırmalar ve ekosistem projesi</h2>

    <p>Her bölüm açık uçlu alıştırmalar ve bir <strong>Ekosistem Projesi</strong> önerir: bölümün fikirleriyle yaşayan bir dünya. Çözümler kitabın sitesinde kısmen vardır; katkı GitHub issue ile istenir. Sketch boyutu orijinalde genelde <code>createCanvas(640, 240)</code>. Bu sitede önizleme için bazen 400×240 kullanırız; fikir aynıdır.</p>

    <h2>Yardım ve geri bildirim</h2>

    <p>Orijinal kitap yaşayan belgedir. Düzeltme: kitabın GitHub issues. Türkçe uyarlama hataları için dersin reposuna bildirin. Shiffman’a: daniel@natureofcode.com</p>

    ${N.resources([
      { kind: "Kitap", title: "Introduction (orijinal)", url: "https://natureofcode.com/introduction/" },
      { kind: "Video", title: "Coding Train · Nature of Code 2", url: "https://thecodingtrain.com/tracks/the-nature-of-code-2", note: "kitapla paralel p5.js serisi" },
      { kind: "Kitap", title: "Flake · The Computational Beauty of Nature", url: "https://mitpress.mit.edu/9780262561273/the-computational-beauty-of-nature/", note: "Shiffman’ın önerdiği kaynak" },
      { kind: "Derleme", title: "That Creative Code Page", url: "https://thatcreativecode.page/" },
    ])}

    <p><a href="#/ch0">Bölüm 0: Rastgelelik →</a></p>
  `,
  editors: {
    xplus: {
      title: "Girişteki hareket yanılsaması",
      extra: true,
      original: {
        book: "https://natureofcode.com/introduction/#part-1-inanimate-objects",
      },
      files: [
        {
          name: "sketch.js",
          content: `let x = 0;

function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  fill(127);
  stroke(0);
  strokeWeight(2);
  circle(x, 120, 48);
  x = x + 1;
  if (x > width) {
    x = 0;
  }
}`,
        },
      ],
    },
  },
});
