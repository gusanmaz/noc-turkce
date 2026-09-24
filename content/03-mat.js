registerChapter({
  id: "mat",
  title: "Matematik cep kitabı",
  short: "Matematik",
  icon: "📐",
  html: `
    <div class="hero-card">
      <h2>Formül yoksa da olur — sonra gelir</h2>
      <p>Bu sayfa lise matematiğini hatırlamadığınızı varsayar. Karekök, sinüs, vektör kelimeleri burada günlük resimle kurulur. Kitap fizik kitabı değildir; ihtiyaç kadar geometri ve Newton alır.</p>
    </div>

    <h2>Sayı yetmezse iki sayı</h2>
    <p><strong>Skaler</strong> sadece büyüklüktür: 5 kilogram, 20 derece, “hız 80”. Yön yoktur. JavaScript’te sıradan bir <code>let n = 5;</code></p>
    <p>Ekranda bir yer ise iki sayı ister: <code>(x, y)</code> — ne kadar sağa, ne kadar aşağı. Günlük dilde “hız 80 kuzeye” dendiğinde yön de vardır; fizikte buna <strong>hız vektörü</strong> (velocity) denir. Bölüm 1’in konusu. Şimdilik: tek kutu yetmiyorsa muhtemelen iki kutu vardır.</p>

    <h2>İki nokta, bir üçgen, bir uzunluk</h2>
    <p>A’dan B’ye gitmek: sağa ne kadar, aşağı ne kadar?</p>
    <p><code>dx = B.x - A.x</code> (sağa pozitif, sola negatif)</p>
    <p><code>dy = B.y - A.y</code> (aşağı pozitif — tuval!)</p>
    <p>Kuş uçuşu uzunluk, dik üçgenin hipotenüsüdür. Pisagor: dik kenarların kareleri toplamı, uzun kenarın karesine eşit.</p>
    ${N.math(
      "|v| = " + N.sqrt("(dx<sup>2</sup> + dy<sup>2</sup>)"),
      "Aynı uzunluğu p5.js <code>dist(ax, ay, bx, by)</code> fonksiyonu verir. Dört sayı: birinci noktanın x ve y’si, ikinci noktanın x ve y’si."
    )}
    <p>“Kare” demek sayıyı kendisiyle çarpmak: 3² = 3×3 = 9. “Karekök” tersi: hangi sayı kendisiyle çarpılınca 25 olur? 5, çünkü 5×5=25.</p>
    <p>Klasik üçgen: kenarlar 3 ve 4 ise 9+16=25, kök 5. Oyunlarda “menzil 80 piksel mi?” sorusu budur: <code>if (dist(ax,ay,bx,by) &lt; 80)</code>.</p>
    ${N.editor("nokta")}
    ${N.tryit([
      { do: "Fareyi mavi noktadan tam 3 kare sağ, 4 kare aşağı götürün (ızgara 40px).", expect: "uzunluk ≈ 200 (5×40). 3-4-5 ölçekli." },
    ])}
    ${N.quiz(
      "(6, 8) okunun uzunluğu?",
      ["10", "14", "48"],
      0,
      "3-4-5 üçgeninin iki katı: 6-8-10."
    )}
    ${N.quiz(
      "dx = 0, dy = 7 ise uzunluk?",
      ["0", "7", "49"],
      1,
      "Yalnızca dikey. karekök(0 + 49) = 7. Karekök almayı unutmayın; 49 mesafe değildir."
    )}

    <h2>Negatif sayı tuvalde</h2>
    <p>Negatif “yok” değil, <strong>ters yön</strong>dür. x hızı −3 ise her kare 3 piksel sola. y hızı −3 ise 3 piksel yukarı (y küçülür). Walker’ın <code>x--</code> ve <code>y--</code> satırları budur.</p>

    <h2>Yüzde ve 0–1 cetveli</h2>
    <p>Yüzde 40 = 40/100 = 0.4. Bilgisayarda olasılık çoğu zaman 0 ile 1 arasında bir sayıdır (1 dahil değil).</p>
    <p><code>random(1)</code> bu cetvele rastgele bir iğne batırır. <code>if (r &lt; 0.2)</code> “iğne ilk beşte birdeyse” = yüzde 20.</p>
    <p>Dört eşit yön: her biri 0.25. Karttan as: 4/52 ≈ 0.077 (yüzde 8 civarı). İki bağımsız olay: çarpın. İki kez yazı: 0.5 × 0.5 = 0.25.</p>
    ${N.editor("olasilik")}
    ${N.quiz(
      "Adil dört yönlü walker’da ‘sağa’ gitme olasılığı?",
      ["%10", "%25", "%50"],
      1,
      "Dört eşit kova, biri sağ. floor(random(4)) === 0 gibi."
    )}
    ${N.quiz(
      "Yazı-tura adil. Üst üste üç yazı?",
      ["1/2", "1/6", "1/8"],
      2,
      "Bağımsız: (1/2)×(1/2)×(1/2)=1/8."
    )}

    <h2>Mod: kenardan diğer kenara</h2>
    <p><code>%</code> bölmede kalan. Saat 10’a 5 saat eklemek: (10+5) % 12 = 3. Asteroid klasiği: gemi sağdan çıkınca soldan girer.</p>
    <p><code>x = x % width</code> pozitifte işe yarar. Negatif x için p5’te <code>x = (x + width) % width</code> daha güvenlidir (JavaScript’te <code>-1 % 400</code> −1 kalabilir).</p>
    <p>Walker’da ise genelde <code>constrain</code> ile duvara yapıştırırız — iki farklı tasarım: wrap (dolan) vs clamp (yapış).</p>
    ${N.editor("mod")}
    ${N.tryit([
      { do: "x = x + 3 yerine x = x - 3 yazın (sola).", expect: "Soldan çıkınca sağdan girmeli; (x+width)%width bunu toparlar." },
    ])}

    <h2>Açı: iki cetvel, aynı tur</h2>
    <p>Bir şeyi döndürmek bir açıdır. Günlük hayatta tam turu <strong>360 parçaya</strong> böleriz; her parça 1 <strong>derece</strong> (°). Pizza’nın dörtte biri 90°, yarısı 180°, tam dilim 360°. Saat 12’den 3’e çeyrek tur = 90°.</p>
    <p>p5’te <code>rotate</code>, <code>sin</code>, <code>cos</code> varsayılan olarak <strong>derece kullanmaz</strong>. İkinci bir cetvel vardır: <strong>radyan</strong>. Aynı tur, başka sayı. 1 metre ile 100 cm gibi: uzunluk aynı, yazılan rakam farklı.</p>
    <p>Radyan, yarıçapı 1 olan çemberin çevresinden gelir. O çevre <code>2π</code>’dir. π yaklaşık 3.14 olduğu için tam tur ≈ 6.28 radyan. Ezber üçlüsü:</p>
    <table class="data">
      <thead><tr><th>Ne kadar döndünüz</th><th>Derece</th><th>Radyan</th></tr></thead>
      <tbody>
        <tr><td>çeyrek tur</td><td>90°</td><td>π/2 ≈ 1.57</td></tr>
        <tr><td>yarım tur</td><td>180°</td><td>π ≈ 3.14</td></tr>
        <tr><td>tam tur</td><td>360°</td><td>2π ≈ 6.28</td></tr>
      </tbody>
    </table>
    ${N.math("radyan = derece × π / 180", "Örnek: 90 × 3.14 / 180 ≈ 1.57 radyan; bu bir çeyrek turdur.")}
    <p><strong>Tuzak:</strong> <code>rotate(90)</code> yazmak. Siz “90 derece, çeyrek tur” dersiniz. p5 “90 radyan” okur. 90 ÷ 6.28 ≈ 14 tam tur. Çubuk çıldırmış gibi döner; kod “bozuk” değildir, birim karışmıştır.</p>
    <p>İki sağlam alışkanlık — bir sketch’te yalnızca birini seçin:</p>
    <ol>
      <li><code>setup</code> içinde <code>angleMode(DEGREES)</code> — o dosyada <code>rotate(90)</code> gerçekten çeyrek turdur.</li>
      <li>Varsayılanı bırakın: <code>rotate(radians(90))</code> veya hazır sabit <code>rotate(HALF_PI)</code>.</li>
    </ol>
    <p>Aşağıda fare sola–sağa 0°–360° üretir. Üstte hem derece hem radyan yazılı. <code>angleMode(DEGREES)</code> açık olduğu için çubuk sizin beklediğiniz gibi döner.</p>
    ${N.editor("aci")}
    ${N.tryit([
      { do: "Fareyi tuvalin soluna, ortasına, sağına götürün.", expect: "0° / 180° / 360°; radyan 0 / 3.14 / 6.28 civarı; çubuk çeyrek–yarım–tam." },
      { do: "angleMode(DEGREES) satırını silin, fareyi ortaya getirin.", expect: "Sayı hâlâ ~180 yazar ama rotate 180 radyan okur (onlarca tur); çubuk bulanık döner." },
    ])}
    ${N.quiz(
      "angleMode yok. rotate(90) ne yapar?",
      ["Çeyrek tur (90°)", "90 radyan döner — birçok tam tur", "Hiç dönmez"],
      1,
      "Varsayılan radyan. 90 ≈ 14 tur. Çeyrek tur için radians(90), HALF_PI veya angleMode(DEGREES)."
    )}
    ${N.quiz(
      "180 derece kaç radyan?",
      ["180", "π ≈ 3.14", "2π ≈ 6.28"],
      1,
      "Yarım tur. Tam tur 2π, yarısı π."
    )}

    <h2>sin ve cos: “ne kadar sağa, ne kadar aşağı”</h2>
    <p>Bir merdiven duvara yaslı. Açı değişince yatay ve dikey pay değişir. Birim çemberde (yarıçap 1):</p>
    <ul>
      <li><code>cos(θ)</code> — yatay pay (−1 ile 1)</li>
      <li><code>sin(θ)</code> — dikey pay (−1 ile 1)</li>
    </ul>
    <p>Yarıçap r ise noktayı şuraya koyarsınız:</p>
    ${N.math("x = merkezX + r · cos(θ)", "θ açı, r yarıçap. cos yatay payı verir; sonuç merkeze eklenince noktanın x’i çıkar.")}
    ${N.math("y = merkezY + r · sin(θ)", "sin dikey payı verir. Tuvalde y aşağı arttığı için çember matematik defterine göre ters dönebilir.")}
    <p>θ=0 iken cos=1, sin=0 → nokta merkezin <strong>sağında</strong>. θ arttıkça (tuvalde sin pozitif aşağı) saat yönüne benzer bir tur atar. Defterdeki “ters çember” hissi eksen farkıdır.</p>
    <p>Zamanı açı yapmak: <code>let t = millis() / 1000</code> — milisaniyeyi saniyeye çevirir. saniye ≈ radyan gibi artar; salınım için yeter.</p>
    ${N.editor("sincos")}
    ${N.tryit([
      { do: "r = 80 yerine 40 yapın.", expect: "Çember küçülür; formül aynı, ölçek değişir." },
      { do: "y satırında sin yerine -sin yazın.", expect: "Tur matematik defterine (ters saat) yaklaşır." },
    ])}
    ${N.quiz(
      "r=10, θ=0. x = 200 + r*cos(θ) yaklaşık kaçtır?",
      ["200", "210", "190"],
      1,
      "cos(0)=1 → 200+10=210. Nokta merkezin sağında."
    )}

    <h2>lerp: arada bir yer</h2>
    <p>A ile B’nin tam ortası: ikisini toplayıp ikiye böl. lerp bunu t ile geneller. t=0 → A, t=1 → B, t=0.25 → A’dan B’ye yolun dörtte biri.</p>
    ${N.math("lerp(a, b, t) = a + (b − a) · t", "t = 0 iken sonuç a, t = 1 iken b. t’yi 0 ile 1 arasında tutun; dışında uçların ötesine taşar.")}
    <p>Kamera yumuşak takip, renk geçişi, “hedefe yavaşça”. t=2 yazmayın; <code>constrain(t, 0, 1)</code> yardımcı olur. Animasyonda her kare küçük t (0.05–0.1) “asla tam yetişmez” hissi verir — o yüzden yumuşak durur.</p>
    ${N.editor("lerp")}

    <h2>Kuvvetin tek cümlesi</h2>
    ${N.math("a = F / m", "Aynı kuvvet F, büyük kütle m’de daha küçük ivme a üretir. Ping-pong, bowling topundan çabuk hızlanır.")}
    <p>Newton 2, günlük dilde: net kuvvet = kütle × ivme. Simülasyonda kuvveti biliriz, ivmeyi isteriz: ivme = kuvvet / kütle.</p>
    <p>Ping-pong topu ve bowling topuna aynı ayak. F aynı, m farklı → ping-pong’un a’sı büyük, hızı çabuk artar.</p>
    <p>Her kare kabaca: hız += ivme, konum += hız. İvmeyi kare sonunda sıfırlarız; yoksa dünkü rüzgar sonsuza kadar birikir. Ayrıntı Bölüm 2. Şimdilik iki daire: aynı “itme”, farklı <code>m</code>.</p>
    ${N.editor("kitle")}
    ${N.tryit([
      { do: "mavi’nin m = 4 değerini m = 8 yapın.", expect: "Mavi iyice geride kalır; kırmızı aynı F ile uçar." },
    ])}

    ${N.resources([
      { kind: "Video", title: "3Blue1Brown · Essence of trigonometry", url: "https://www.youtube.com/watch?v=sUiswWazF_c", note: "sin/cos’un resmi, İngilizce, yavaş" },
      { kind: "Video", title: "Khan Academy · trigonometri (TR)", url: "https://tr.khanacademy.org/math/trigonometry", note: "derece, birim çember" },
      { kind: "Video", title: "Coding Train · açılar ve vektörler", url: "https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/3-oscillation/1-angles-and-vectors", note: "kitapla aynı dil, p5" },
      { kind: "Yazı", title: "Pisagor — Wikipedia (TR)", url: "https://tr.wikipedia.org/wiki/Pisagor_teoremi" },
      { kind: "Referans", title: "p5 map()", url: "https://p5js.org/reference/p5/map/" },
    ])}
    <p><a href="#/giris">Kitabın girişi →</a></p>
  `,
  editors: {
    nokta: {
      title: "Üçgen: dx, dy, kuş uçuşu",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  let ax = 80;
  let ay = 180;
  let bx = mouseX;
  let by = mouseY;
  let dx = bx - ax;
  let dy = by - ay;
  let d = dist(ax, ay, bx, by);
  stroke(220);
  strokeWeight(1);
  for (let x = 0; x < width; x += 40) line(x, 0, x, height);
  for (let y = 0; y < height; y += 40) line(0, y, width, y);
  stroke(40, 120, 200);
  strokeWeight(2);
  line(ax, ay, bx, ay);
  stroke(200, 80, 40);
  line(bx, ay, bx, by);
  stroke(20);
  line(ax, ay, bx, by);
  noStroke();
  fill(40, 120, 200);
  circle(ax, ay, 12);
  fill(200, 80, 40);
  circle(bx, by, 12);
  fill(20);
  text("dx " + floor(dx) + "   dy " + floor(dy) + "   uzunluk " + floor(d), 12, 22);
}` }],
    },
    olasilik: {
      title: "Hedef %20 kırmızı — sayaç üstte",
      files: [{ name: "sketch.js", content: `let kirmizi = 0;
let gri = 0;

function setup() {
  createCanvas(400, 240);
  background(255);
}

function draw() {
  if (random(1) < 0.2) {
    stroke(200, 40, 40);
    kirmizi++;
  } else {
    stroke(180);
    gri++;
  }
  point(random(width), random(height));
  noStroke();
  fill(255);
  rect(0, 0, width, 32);
  fill(20);
  let t = kirmizi + gri;
  text(
    "kırmızı " + kirmizi + " / " + t + "  =  %" + nf((100 * kirmizi) / t, 1, 1) + "   (hedef %20)",
    10,
    22
  );
}` }],
    },
    mod: {
      title: "Sağdan çık, soldan gir",
      files: [{ name: "sketch.js", content: `let x = 0;

function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(245);
  x = x + 3;
  x = (x + width) % width;
  fill(50, 120, 200);
  circle(x, 120, 32);
}` }],
    },
    aci: {
      title: "Fare: derece ve radyan yan yana",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
  angleMode(DEGREES);
}

function draw() {
  background(255);
  let derece = map(mouseX, 0, width, 0, 360);
  let radyan = radians(derece);
  fill(20);
  noStroke();
  text("derece  " + floor(derece) + "°", 16, 28);
  text("radyan  " + nf(radyan, 1, 2) + "    (p5'in varsayılanı bu)", 16, 50);
  text("angleMode(DEGREES) açık — çubuk dereceye uyuyor", 16, 72);
  translate(width / 2, 150);
  rotate(derece);
  fill(80, 140, 220);
  noStroke();
  rect(-8, -70, 16, 140);
}` }],
    },
    sincos: {
      title: "Dönen nokta (r = 80)",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  let cx = 200;
  let cy = 120;
  let r = 80;
  let t = millis() / 1000;
  let x = cx + r * cos(t);
  let y = cy + r * sin(t);
  noFill();
  stroke(180);
  circle(cx, cy, r * 2);
  stroke(0);
  line(cx, cy, x, y);
  fill(200, 60, 60);
  circle(x, y, 12);
}` }],
    },
    lerp: {
      title: "Daire fareyi yumuşak izler",
      files: [{ name: "sketch.js", content: `let x = 200;
let y = 120;

function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(245);
  x = lerp(x, mouseX, 0.08);
  y = lerp(y, mouseY, 0.08);
  fill(80, 140, 220);
  circle(x, y, 36);
}` }],
    },
    kitle: {
      title: "Aynı F, iki m — birlikte sıfırlanır",
      files: [{ name: "sketch.js", content: `let kirmizi = { x: 40, v: 0, m: 1 };
let mavi = { x: 40, v: 0, m: 4 };

function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(245);
  let F = 0.35;
  kirmizi.v += F / kirmizi.m;
  mavi.v += F / mavi.m;
  kirmizi.x += kirmizi.v;
  mavi.x += mavi.v;
  if (kirmizi.x > width - 20) {
    kirmizi.x = 40;
    kirmizi.v = 0;
    mavi.x = 40;
    mavi.v = 0;
  }
  noStroke();
  fill(200, 60, 60);
  circle(kirmizi.x, 80, 28);
  fill(50, 110, 200);
  circle(mavi.x, 160, 52);
  fill(20);
  text("kırmızı m=1   mavi m=4   aynı F", 12, 24);
  text("ağır olan geç hızlanır", 12, 220);
}` }],
    },
  },
});
