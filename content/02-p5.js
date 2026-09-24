registerChapter({
  id: "p5",
  title: "p5.js temelleri",
  short: "p5.js",
  icon: "🎨",
  html: `
    <div class="hero-card">
      <h2>Tarayıcıda çizmek — sıfırdan</h2>
      <p>p5.js, JavaScript’e “tuval aç, daire çiz, fareyi oku” gibi komutlar ekler. Nature of Code 2024 baskısı p5 1.9 kullanır. Bu sayfa kütüphaneyi hiç görmediğinizi varsayar.</p>
    </div>

    <h2>Tuval nedir?</h2>
    <p>Tuval (canvas) ekranda bir dikdörtgendir; milimetre kâğıdı gibi karelere bölünmüştür. Her kare bir <strong>piksel</strong>dir. <code>createCanvas(400, 240)</code> der: 400 piksel en, 240 piksel boy. Bu sitedeki örneklerin çoğu bu boyuttadır.</p>
    <p><code>width</code> ve <code>height</code> o anki tuvalin eni ve boyudur. Canvas açılmadan önce anlamsızdır; bu yüzden <code>createCanvas</code> <code>setup</code> içindedir.</p>

    <h2>setup bir kez, draw durmadan</h2>
    <p>p5 sizin yerinize bir döngü çalıştırır. Siz iki fonksiyon yazarsınız:</p>
    <ul>
      <li><code>setup()</code> — sayfa açılınca <em>bir kez</em>: tuvali aç, nesneleri yarat, zemini boya</li>
      <li><code>draw()</code> — saniyede onlarca kez (genelde ~60): bir “kare film” karesi</li>
    </ul>
    <p>Oyun fiziği bu karenin içinde yaşar: her kare konum biraz değişir, göz hareket sanır.</p>
    <p><code>background</code> nerede durduğu önemlidir:</p>
    <ul>
      <li>Her <code>draw</code> başında → önceki kare silinir (temiz animasyon)</li>
      <li>Yalnız <code>setup</code> içinde → iz kalır (rastgele yürüyüş bunu ister)</li>
    </ul>
    <p><code>frameCount</code> kaçıncı kare olduğunu sayar. 1, 2, 3… durmadan artar.</p>
    ${N.editor("setupdraw")}
    ${N.tryit([
      { do: "background(230) satırını silin (veya setup’a taşıyın).", expect: "Daire iz bırakır; silgi yok." },
      { do: "y = y + 2 yerine y = y + 8 yazın.", expect: "Daha seyrek duraklamadan düşer." },
    ])}
    ${N.quiz(
      "setup ve draw’dan hangisi her kare çalışır?",
      ["setup", "draw", "ikisi de bir kez"],
      1,
      "setup bir kez. draw, siz sekmeyi kapatana kadar tekrar eder."
    )}

    <h2>Koordinat: (0, 0) sol üst — y aşağı artar</h2>
    <p>Matematik defterinde orijin çoğu zaman sol alt veya orta, y <em>yukarı</em> artar. Ekranda ters:</p>
    <ul>
      <li>Sol üst köşe <code>(0, 0)</code></li>
      <li>x sağa giderken artar</li>
      <li>y <strong>aşağı</strong> giderken artar</li>
    </ul>
    <p>Bu yüzden “yukarı yürü” kodda <code>y = y - 1</code> veya <code>y--</code> olur. Yanlış değil; kâğıt farklı.</p>
    <p>Sağ alt köşe kabaca <code>(width, height)</code> yani burada (400, 240).</p>
    ${N.editor("koordinat")}
    ${N.tryit([
      { do: "Farenizi sol üste, sonra sağ alta götürün.", expect: "Yazılan sayılar 0,0 civarı sonra 400,240 civarı." },
    ])}
    ${N.quiz(
      "Noktayı 10 piksel yukarı almak için ne yaparsınız?",
      ["x = x - 10", "y = y - 10", "y = y + 10"],
      1,
      "y aşağı artar; yukarı gitmek y’yi küçültmektir."
    )}

    <h2>Renk: gri, RGB, saydamlık</h2>
    <p>Tek sayı 0–255 gri skaladır: 0 siyah, 255 beyaz, 128 orta gri.</p>
    <p>Renk üç boya: <code>fill(kırmızı, yeşil, mavi)</code>, her kanal 0–255. <code>fill(255, 0, 0)</code> kırmızı, <code>fill(0, 255, 0)</code> yeşil, <code>fill(0, 0, 255)</code> mavi. Üçü birden 255 ise beyaz.</p>
    <p>Dördüncü sayı saydamlıktır (alfa): <code>fill(0, 40)</code> çok açık siyah — üst üste binince koyulaşır. Gaussian örneği tam bunu kullanır.</p>
    <p><code>stroke</code> kenar rengi, <code>strokeWeight</code> kalınlık, <code>noStroke()</code> kenarı kapat, <code>noFill()</code> içi boş bırak.</p>
    <p>Fareyi tuvalde gezdirin: x kırmızıyı, y yeşili değiştirir. Tüm zemin o renk olur — küçük bir dairede karışımı kaçırırsınız.</p>
    ${N.editor("renk")}
    ${N.tryit([
      { do: "Sol üste gidin.", expect: "Koyu (kırmızı ve yeşil düşük)." },
      { do: "Sağ alta gidin.", expect: "Açık sarımsı (kırmızı + yeşil yüksek, mavi 80)." },
    ])}

    <h2>Şekil komutları</h2>
    <p>Komutlar <strong>o andaki</strong> fill/stroke ile çizer. Sıra: önce zemin, sonra arkadaki şekil, en son öndeki — sonra çizilen üstte kalır.</p>
    <table class="data">
      <thead><tr><th>Komut</th><th>Ne çizer</th><th>Dikkat</th></tr></thead>
      <tbody>
        <tr><td><code>point(x, y)</code></td><td>tek piksel</td><td>Walker’ın izi</td></tr>
        <tr><td><code>circle(x, y, çap)</code></td><td>daire</td><td>x,y <strong>merkez</strong>; üçüncü sayı çap (yarıçap değil)</td></tr>
        <tr><td><code>square(x, y, kenar)</code></td><td>kare</td><td>x,y varsayılan <strong>sol üst</strong></td></tr>
        <tr><td><code>rect(x, y, w, h)</code></td><td>dikdörtgen</td><td>aynı: sol üst + en + boy</td></tr>
        <tr><td><code>line(x1,y1,x2,y2)</code></td><td>çizgi</td><td>iki uç</td></tr>
        <tr><td><code>text("a", x, y)</code></td><td>yazı</td><td><code>textSize(16)</code> boyutu ayarlar</td></tr>
      </tbody>
    </table>
    ${N.note(
      "circle ile square’in orijini farklı",
      `<p>Daire merkezden, kare sol üstten hizalanır. İkisini “aynı noktaya” koymak kaymış gibi durur. Kareyi merkeze almak için <code>square(x - kenar/2, y - kenar/2, kenar)</code> veya <code>rectMode(CENTER)</code>.</p>`
    )}
    ${N.editor("sekil")}

    <h2>Fare ve tuş</h2>
    <p>p5 her kare farenin yerini günceller:</p>
    <ul>
      <li><code>mouseX</code>, <code>mouseY</code> — imleç tuvalde neredeyse</li>
      <li><code>mouseIsPressed</code> — o an tuş basılı mı? (<code>true</code>/<code>false</code>)</li>
    </ul>
    <p>Kitapta rüzgar sık sık “basılıyken kuvvet uygula”dır. Tuş: <code>keyIsDown(RIGHT_ARROW)</code> veya <code>key === " "</code> (boşluk karakteri).</p>
    <p>Aşağıdaki örnekte zemini <code>setup</code> boyuyor; basılı tutunca iz kalır.</p>
    ${N.editor("fare")}
    ${N.tryit([
      { do: "circle çapını 16 yerine 4 yapın.", expect: "İnce fırça." },
      { do: "fill(30, 90) yerine fill(200, 40, 40, 80) yazın.", expect: "Kırmızımsı, yarı saydam iz." },
    ])}

    <h2>map: bir aralığı başka aralığa çevir</h2>
    <p>Sınav notu 0–100. Bunu tuval genişliği 0–400’e yaymak istersiniz. Oran aynı kalır: 50 → 200.</p>
    ${N.math("map(n, eskiMin, eskiMax, yeniMin, yeniMax)", "n = 0.5, eski aralık 0–1, yeni aralık 0–400 ise sonuç 200’dür. p5.js <code>map</code> oranı koruyarak çevirir.")}
    <p>Perlin gürültüsü (<code>noise</code>) 0 ile 1 arasında bir yükseklik verir. Piksele çevirmek için <code>map</code> şarttır. <code>noise(t)</code>’ye <code>random(0, width)</code> gibi aralık vermek <strong>yanlıştır</strong> — o fonksiyon öyle çalışmaz.</p>
    ${N.editor("mapornek")}
    ${N.quiz(
      "noise(t) 0.25 döndü. map(noise(t), 0, 1, 0, 400) kaçtır?",
      ["0.25", "100", "400"],
      1,
      "0.25, 0–1’in dörtte biri; 0–400’ün dörtte biri 100."
    )}
    ${N.tryit([
      { do: "map’in son iki sayısını 10, 180 yerine 10, 80 yapın.", expect: "Daire büyüyemez; tavan düştü." },
    ])}

    <h2>constrain: aralığın dışına çıkma</h2>
    <p><code>map</code> bir sayıyı başka aralığa <em>yayar</em>. <code>constrain</code> yaymaz; sadece <strong>kapı bekçisi</strong>dir: “bu iki değerin dışına çıkamazsın.”</p>
    ${N.math("constrain(n, alt, üst)", "n altın altındaysa sonuç alt, üstün üstündeyse üst, ikisinin arasındaysa n’nin kendisidir. p5.js <code>constrain</code> bunu tek çağrıda yapar.")}
    <p>Üç durum, hepsi bu:</p>
    <table class="data">
      <thead><tr><th>n</th><th>constrain(n, 0, 100)</th><th>Neden</th></tr></thead>
      <tbody>
        <tr><td>40</td><td>40</td><td>zaten içeride</td></tr>
        <tr><td>−12</td><td>0</td><td>altın altına düşmesin</td></tr>
        <tr><td>250</td><td>100</td><td>üstün üstüne çıkmasın</td></tr>
      </tbody>
    </table>
    <p>Aynı işi <code>if</code> ile yazarsınız:</p>
    <p><code>if (x &lt; alt) x = alt;</code><br>
    <code>if (x &gt; üst) x = üst;</code></p>
    <p><code>constrain</code> bunu tek satır yapar. Walker, can barı, çapın negatif olmaması — hepsi bu. Bir önceki dairede <code>constrain(cap, 10, 180)</code> aynı kapı: 10’un altında daire kaybolur, 180’in üstünde tuvali yutar. <code>map</code> yayar, <code>constrain</code> keser.</p>
    <p>Aşağıda gri daire “ham” konum (tuval dışına da gidebilir). Mavi daire kırmızı çizgiler arasında sıkışır. Fareyi kenarlara itin; mavi duvara <em>yapışır</em>, gri kaybolabilir.</p>
    ${N.editor("kenar")}
    ${N.tryit([
      { do: "alt/üst 50 ve width-50 yerine 120 ve 280 yazın.", expect: "Mavi koridor daralır." },
      { do: "constrain satırını silip mavi daireyi de ham ile çizin.", expect: "İkisi birlikte kenardan çıkar." },
    ])}
    ${N.quiz(
      "constrain(450, 0, 399) kaçtır? (tuval 400 piksel, son piksel 399)",
      ["450", "400", "399"],
      2,
      "450 üst sınırın üstünde; fonksiyon üstü (399) verir. 400 bile tuvalin bir piksel sağındadır."
    )}

    <h2>dist ve lerp (kısa)</h2>
    <p><code>dist(x1,y1,x2,y2)</code> iki nokta arası mesafedir — “düşman 80 pikselden yakın mı?”. Nasıl hesaplandığı matematik sayfasında (Pisagor).</p>
    <p><code>lerp(a, b, t)</code> a ile b arasında t kadar (0 ile 1). t=0 → a, t=1 → b, t=0.5 orta. Kamera takibi, yumuşak takip. t=0.08 “her kare yüzde 8 yaklaş” demektir; asla tam yetişmez gibi durur, bu yüzden yumuşak hissedilir.</p>
    ${N.editor("lerp")}
    ${N.tryit([
      { do: "0.08 yerine 0.4 yazın.", expect: "Neredeyse anında fareye yapışır." },
      { do: "0.08 yerine 0.02 yazın.", expect: "Ağır, geç gelen bir takip." },
    ])}

    <h2>translate, rotate, scale, kamera</h2>
    <p>Koridorda uzun bir duvar resmi asılı. Elinizde dikdörtgen karton, ortası oyuk: pencere. Resmi omuzlayıp taşımazsınız; pencereyi kaydırırsınız. Oyunda dünya o duvar resmidir, tuval o penceredir. Kamera “pencere şu an resmin neresine bakıyor?” sorusudur.</p>
    <p>p5.js bu pencereyi doğrudan taşımaz. Kâğıdın köşesini (orijin, 0,0) tuvalde başka bir noktaya taşır. Ondan sonra çizdiğiniz her şekil o yeni köşeye göredir. Dünya durur; kaleminizin sıfırı kayar. Yanlış yazınca ne bozulur: karakter 700’de durur, siz onu tuvalin 700. pikseline çizmeye çalışırsınız — tuval 400’dür, karakter kaybolur. Kaybolan fizik değil, bakıştır.</p>
    <ol>
      <li><code>translate(x, y)</code> orijini kaydırır. Ondan sonra <code>circle(0, 0, 20)</code> tuvalin (x, y) noktasındadır.</li>
      <li><code>rotate(açı)</code> o <em>yeni</em> orijin etrafında döndürür. Açı varsayılan <strong>radyan</strong>dır. <code>rotate(90)</code> doksan derece değil, yaklaşık 14 turdur — matematik sayfasında cetvel var.</li>
      <li><code>scale(s)</code> o orijini merkeze alıp büyütür veya küçültür. 10 piksel çizmek 20 piksel görünür; bu zoom’dur. Fare <code>mouseX</code> hâlâ tuval pikselidir, dünya pikseli değil.</li>
      <li><code>push()</code> o anki kaydırma / döndürme / ölçeği kaydeder, <code>pop()</code> geri alır. Unutulan pop, “her şey çıldırdı” hissinin sık nedenidir.</li>
    </ol>
    <p>İki ayrı cisim döndürüyorsanız her birini push/pop içine alın; yoksa ikinci, birincinin açısının üstüne biner.</p>
    ${N.editor("donusum")}
    ${N.tryit([
      { do: "İlk pop() satırını silin.", expect: "Turuncu çubuk maviyle aynı merkeze biner; dönüşler üst üste biner." },
      { do: "rect(-8, -60, 16, 120) yerine rect(0, 0, 16, 120) yazın (birinde).", expect: "O çubuk ucundan döner." },
    ])}
    ${N.quiz(
      "translate(200, 120) sonra circle(0, 0, 10) daireyi nereye çizer?",
      ["sol üst (0,0)", "tuvalin (200, 120) noktası", "hata verir"],
      1,
      "Orijin kaydı; (0,0) artık eski (200,120)’dir."
    )}

    <h3>Sıra: önce kaydır, sonra döndür</h3>
    <p>Okula yürüyüş düşünün. Önce 100 adım doğuya, sonra yerinizde dönmek başka bir yerdir; önce dönüp 100 adım atmak başka. p5.js aynı yürüyüşü sırayla uygular: <code>translate</code> sonra <code>rotate</code> “git, orada dön”. <code>rotate</code> sonra <code>translate</code> “dön, o yöne git” — çubuk tuvalin köşesinden kaçar. Kod satırının yeri, cismin yeri demektir.</p>
    ${N.editor("siraTuzak")}
    ${N.tryit([{ do: "Soldaki push içinde rotate ile translate satırlarını yer değiştirin.", expect: "Çubuk merkezde dönmez, yay çizer." }])}

    <h3>scale: zoom, fare aynı kalmaz gibi durur</h3>
    <p><code>scale(2)</code> merceği iki kat açar. Çizilen kare büyür. Fare imleci hâlâ tuvalin pikselinde durur: <code>mouseX</code> 200 ise dünya 100’dedir, çünkü mercek 2’dir. “Tıkladığım yere kutu koy” bozulur. Kamera zoom’unda aynı tuzak: p5.play <code>camera.zoom</code>, Phaser <code>setZoom</code>. Dünya koordinatı ayrı, tuval koordinatı ayrı.</p>
    ${N.math(
      "x<sub>tuval</sub> ≈ (x<sub>dünya</sub> − kamera.x) × zoom + width/2",
      "Dünya noktasını tuvale taşımak: kameranın baktığı noktayı çıkarır, zoom ile çarpar, tuvalin ortasını eklersiniz. p5.js bunu <code>translate</code> ve <code>scale</code> ile yapar; p5.play <code>camera</code> gizler."
    )}
    ${N.editor("olcek")}
    ${N.tryit([{ do: "scale(2) yerine scale(0.5) yazın.", expect: "Kare küçülür; fare dairesi aynı kalır — mouseX tuvaldedir." }])}

    <h3>Kamera: dünyayı tersine kaydırmak</h3>
    <p>Oyuncuyu pencerenin ortasında görmek istiyorsunuz. Oyuncuyu 200’e çekmezsiniz; dünyayı oyuncunun tersine kaydırırsınız. <code>translate(-oyuncuX + width/2, 0)</code> “şu dünya x’ini tuvalin ortasına koy” demektir. p5.play bunu <code>camera.x = oyuncu.x</code> diye yazar. Phaser <code>cameras.main.startFollow</code>. Üçü aynı karton pencere.</p>
    <p>Skor yazısını bu kaydırma açıkken yazarsanız yazı evin duvarına yapışır, kaçar. HUD için kaydırmayı kapatın: <code>push</code> / orijine dön / yaz / <code>pop</code>. p5.play <code>camera.off()</code>, Phaser <code>setScrollFactor(0)</code>.</p>
    ${N.editor("kameraPencere")}
    ${N.editor("hudKamera")}
    ${N.tryit([{ do: "kameraPencere’de width/2 yerine 0 yazın.", expect: "Pencere oyuncuyu sola yapıştırır; orta kaybolur." }])}

    <h2>random — kısa önizleme</h2>
    <p><code>random(4)</code> 0 ile 4 arası üretir, <strong>4 çıkmaz</strong>. <code>floor(random(4))</code> → 0, 1, 2 veya 3. <code>random(5, 20)</code> 5–20. Ayrıntı, haksız zar ve Perlin Bölüm 0’da.</p>
    ${N.editor("rastgele")}

    <h2>p5.js Python’da da durur mu?</h2>
    <p>Deftere daire çizen el aynıdır; kalem değişir. p5.js resmi olarak <strong>JavaScript</strong>’tir. Bu site tarayıcıda JS çalıştırır. Python meraklısı üç ayrı dükkân görür; tabelayı karıştırmasın.</p>
    <p><strong>pyp5js</strong> en yakın porttur: <code>def setup</code> / <code>def draw</code> yazarsınız, araç bunu p5.js’e çevirir, tarayıcı yine JavaScript koşar. <code>createCanvas</code>, <code>circle</code>, <code>mouseX</code> aynı fikir. Bu editör o çeviriyi yapmaz; soldaki Python okunur, sağdaki tuval aynı tarifin JS halidir.</p>
    <p><a href="https://p5py.github.io/p5-website/" target="_blank" rel="noopener">p5 (p5py)</a> ayrı bir Python paketidir: Processing kokusu, pencere çoğu zaman masaüstünde açılır. Bu kitabın iframe’i değildir. <strong>Processing.py</strong> ise Java Processing’in Python modudur — p5.js hiç değildir. “Python p5 indirdim, bu sitedeki örnekler Python oldu” tuzağı buradan çıkar.</p>
    ${N.warn("Tuzak: port ≠ bu tuval","<p>pyp5js çevirir, p5py başka pencere açar, bu kitap p5.js 1.9 çalıştırır. Fizik kütüphanesi arıyorsanız önce dili söyleyin: tarayıcı JS ise Matter / p5.play; Python masaüstünde Pymunk, PyBox2D, PyBullet. Karışınca belge yanlış rafta kalır.</p>")}
    ${N.editor("pyp5port")}
    <p>Python fizik (Pymunk, PyBox2D, PyBullet, MuJoCo) ve raylib: <a href="#/motorlar">diğer motorlar</a>.</p>

    ${N.resources([
      { kind: "Başlangıç", title: "p5.js Get Started", url: "https://p5js.org/get-started/" },
      { kind: "Referans", title: "p5.js Reference", url: "https://p5js.org/reference/", note: "her fonksiyonun imzası; takılınca burası" },
      { kind: "Video", title: "Coding Train · Code! p5.js", url: "https://www.youtube.com/playlist?list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA", note: "İngilizce, tuval ve şekil videoları" },
      { kind: "Video", title: "p5.js Türkçe giriş (Ömer Çıtır)", url: "https://www.youtube.com/results?search_query=p5.js+t%C3%BCrk%C3%A7e+ders", note: "arama; birkaç kısa TR seri var" },
      { kind: "Editör", title: "editor.p5js.org", url: "https://editor.p5js.org/", note: "ödevi linkle paylaşmak için" },
      { kind: "Örnek", title: "p5 örnekleri", url: "https://p5js.org/examples/" },
      { kind: "Python", title: "pyp5js", url: "https://berinhard.github.io/pyp5js/", note: "Python yaz, tarayıcıda p5.js doğar" },
      { kind: "Python", title: "p5py", url: "https://p5py.github.io/p5-website/", note: "masaüstü p5; bu site değil" },
    ])}
    <p><a href="#/mat">Matematik cep kitabı →</a></p>
  `,
  editors: {
    setupdraw: {
      title: "setup bir kez, draw sürekli",
      files: [{ name: "sketch.js", content: `let y = 0;

function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(230);
  fill(30);
  noStroke();
  text("kare " + frameCount, 16, 24);
  circle(200, y, 28);
  y = y + 2;
  if (y > height) y = 0;
}` }],
    },
    koordinat: {
      title: "Orijin ve fare",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  stroke(230);
  for (let x = 0; x < width; x += 40) line(x, 0, x, height);
  for (let y = 0; y < height; y += 40) line(0, y, width, y);
  fill(0);
  noStroke();
  text("(0, 0)", 8, 16);
  text("(width, height)", width - 118, height - 8);
  stroke(200, 40, 40);
  line(0, 0, mouseX, mouseY);
  fill(200, 40, 40);
  noStroke();
  circle(mouseX, mouseY, 10);
  fill(20);
  text("(" + floor(mouseX) + ", " + floor(mouseY) + ")", 16, 40);
}` }],
    },
    renk: {
      title: "x kırmızı, y yeşil — tüm tuval",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  let k = map(mouseX, 0, width, 0, 255);
  let ysl = map(mouseY, 0, height, 0, 255);
  background(k, ysl, 80);
  fill(255);
  stroke(0);
  strokeWeight(2);
  text("fill(" + floor(k) + ", " + floor(ysl) + ", 80)", 16, 32);
  noStroke();
  text("x → kırmızı     y → yeşil", 16, 56);
}` }],
    },
    sekil: {
      title: "Aynı nokta: daire merkez, kare sol üst",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(245);
  let x = 200;
  let y = 130;
  stroke(200, 40, 40);
  strokeWeight(1);
  line(x - 50, y, x + 90, y);
  line(x, y - 50, x, y + 90);
  noFill();
  strokeWeight(2);
  stroke(80, 140, 220);
  circle(x, y, 80);
  stroke(220, 120, 80);
  square(x, y, 80);
  noStroke();
  fill(20);
  text("ikisi de (200, 130) — daire merkezden, kare sol üstten", 12, 24);
}` }],
    },
    fare: {
      title: "Basılı tutunca iz",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
  background(255);
  fill(140);
  noStroke();
  text("tuvale tıkla, basılı tutarak çiz", 16, 28);
}

function draw() {
  if (mouseIsPressed) {
    noStroke();
    fill(30, 90);
    circle(mouseX, mouseY, 16);
  }
}` }],
    },
    mapornek: {
      title: "mouseX → çap",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(245);
  let cap = map(mouseX, 0, width, 10, 180);
  cap = constrain(cap, 10, 180);
  fill(80, 140, 220);
  circle(width / 2, height / 2, cap);
  fill(20);
  noStroke();
  text("çap " + floor(cap), 16, 24);
}` }],
    },
    kenar: {
      title: "Gri ham gider, mavi duvarda durur",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(245);
  let alt = 50;
  let ust = width - 50;
  let ham = map(mouseX, 0, width, -60, width + 60);
  let x = constrain(ham, alt, ust);

  stroke(200, 40, 40);
  strokeWeight(2);
  line(alt, 0, alt, height);
  line(ust, 0, ust, height);

  noStroke();
  fill(180);
  circle(ham, 90, 32);
  fill(40, 90, 180);
  circle(x, 170, 32);

  fill(20);
  text("ham = " + floor(ham) + "   (gri, dışarı kaçabilir)", 12, 24);
  text("constrain(ham, 50, 350) = " + floor(x), 12, 44);
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
    donusum: {
      title: "İki çubuk, iki push/pop",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  push();
  translate(120, 120);
  rotate(millis() / 600);
  fill(80, 140, 220);
  noStroke();
  rect(-8, -60, 16, 120);
  pop();

  push();
  translate(280, 120);
  rotate(-millis() / 400);
  fill(220, 120, 80);
  rect(-8, -60, 16, 120);
  pop();
}` }],
    },
    siraTuzak: {
      title: "Sıra: translate sonra rotate",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  stroke(180);
  line(100, 0, 100, height);
  line(300, 0, 300, height);

  push();
  translate(100, 120);
  rotate(millis() / 700);
  fill(80, 140, 220);
  noStroke();
  rect(-6, -50, 12, 100);
  pop();

  push();
  rotate(millis() / 700);
  translate(300, 120);
  fill(220, 120, 80);
  noStroke();
  rect(-6, -50, 12, 100);
  pop();

  fill(0);
  noStroke();
  textSize(12);
  text("sol: kaydir, don", 16, 22);
  text("sag: don, kaydir — kacar", 210, 22);
}` }],
    },
    olcek: {
      title: "scale zoom; mouseX tuvalde kalir",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  push();
  translate(200, 120);
  scale(2);
  fill(80, 140, 220);
  noStroke();
  rect(-20, -20, 40, 40);
  pop();

  noFill();
  stroke(196, 92, 120);
  strokeWeight(2);
  circle(mouseX, mouseY, 16);

  fill(0);
  noStroke();
  textSize(12);
  text("mavi kare scale(2)  ·  pembe daire mouseX/Y (tuval)", 12, 22);
  text("mouseX " + floor(mouseX) + "  dunya ~ " + floor((mouseX - 200) / 2), 12, 40);
}` }],
    },
    kameraPencere: {
      title: "Karton pencere: dunyayi tersine kaydir",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(245);
  let oyuncuX = mouseX + 200;
  let cam = oyuncuX;
  push();
  translate(-cam + width / 2, 0);
  for (let i = 0; i < 8; i++) {
    let x = 80 + i * 140;
    fill(i % 2 === 0 ? 61 : 196, i % 2 === 0 ? 126 : 92, i % 2 === 0 ? 166 : 120);
    noStroke();
    rect(x - 40, 140, 80, 80);
    fill(255);
    textSize(16);
    text(i, x - 4, 186);
  }
  fill(40);
  circle(oyuncuX, 170, 28);
  pop();
  fill(0);
  noStroke();
  textSize(12);
  text("fare: oyuncu  ·  evler dunya  ·  pencere ortalar", 12, 22);
}` }],
    },
    hudKamera: {
      title: "HUD: yaziyi dunyadan kopar",
      files: [{ name: "sketch.js", content: `let skor = 0;
function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  let oyuncuX = 80 + frameCount * 1.4;
  push();
  translate(-oyuncuX + width / 2, 0);
  fill(80, 140, 220);
  noStroke();
  rect(oyuncuX - 16, 160, 32, 32);
  fill(200);
  rect(0, 200, 800, 24);
  fill(180, 80, 80);
  textSize(12);
  text("yapişik yazi (kacar)", oyuncuX - 40, 80);
  pop();

  fill(0);
  noStroke();
  textSize(14);
  text("skor " + skor + "  —  bu yazi pencerede kalir", 12, 24);
  if (frameCount % 40 === 0) skor++;
}` }],
    },
    rastgele: {
      title: "Yağan noktalar",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
  background(20);
}

function draw() {
  stroke(random(255), random(255), random(255), 160);
  point(random(width), random(height));
}` }],
    },
    pyp5port: {
      title: "Aynı tarif, Python yazımı (pyp5js)",
      analog: "Soldaki Python pyp5js yazımıdır; bu editör çevirmez. Sağdaki tuval aynı setup/draw’ın p5.js halidir — fikir birebir, Pymunk değildir.",
      files: [
        {
          name: "sketch.py",
          content: `def setup():
    createCanvas(400, 240)

def draw():
    background(230)
    fill(61, 126, 166)
    noStroke()
    circle(mouseX, mouseY, 28)
`,
        },
        {
          name: "sketch.js",
          content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(230);
  fill(61, 126, 166);
  noStroke();
  circle(mouseX, mouseY, 28);
}
`,
        },
      ],
    },
  },
});
