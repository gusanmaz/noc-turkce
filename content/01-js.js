registerChapter({
  id: "js",
  title: "JavaScript temelleri",
  short: "JavaScript",
  icon: "🧩",
  html: `
    <div class="hero-card">
      <h2>Hiç kod yazmadıysanız buradan</h2>
      <p>Bu sayfa sıfır varsayar. Daha önce değişken, döngü, sınıf duymadıysanız sorun değil — her fikir önce günlük dille, sonra çalışan kodla gelir. Nature of Code’un Walker’ı, Mover’ı, Particle’ı hep bu harflerle yazılır.</p>
    </div>

    <h2>Bilgisayar ne yapar?</h2>
    <p>Bir program, yukarıdan aşağı okunan bir <strong>tarif</strong>tir. Fırın “biraz tuz at” anlamaz; “tuz 5 gram” ister. JavaScript de öyle: yazdığınızı harfi harfine yapar, aklınızı okumaz.</p>
    <p>Bu sitede tarifler tarayıcıda çalışır. Solda kaynak, sağda tuval (canvas). Satırı değiştirip <strong>Çalıştır</strong> deyin. Bozulursa <strong>Sıfırla</strong>.</p>
    <p><code>//</code> ile başlayan satır <strong>yorum</strong>dur: sizin için not, bilgisayar onu atlar.</p>
    ${N.editor("merhaba")}
    ${N.tryit([
      { do: "Tırnak içindeki yazıyı kendi adınız yapın.", expect: "Tuvalde adınız görünür." },
      { do: "circle satırındaki 48’i 12 yapın.", expect: "Daire küçülür." },
    ])}
    ${N.note(
      "Noktalı virgül",
      `<p>Satırın sonundaki <code>;</code> “bu cümle bitti” demektir. p5 örneklerinde bazen unutulur ve yine çalışır. Alışkanlık olarak koyun; hata ayıklamak kolaylaşır.</p>`
    )}

    <h2>Üç türlü değer</h2>
    <p>Bu kitapta neredeyse her şey şu üç kutudan biridir:</p>
    <table class="data">
      <thead><tr><th>Ne</th><th>Örnek</th><th>Ne işe yarar</th></tr></thead>
      <tbody>
        <tr><td>sayı</td><td><code>3</code>, <code>0.5</code>, <code>-2</code></td><td>konum, hız, açı, renk</td></tr>
        <tr><td>metin (string)</td><td><code>"merhaba"</code></td><td>ekrana yazı</td></tr>
        <tr><td>doğru / yanlış (boolean)</td><td><code>true</code> / <code>false</code></td><td>karar: fare basılı mı?</td></tr>
      </tbody>
    </table>
    <p>Metin her zaman tırnak içindedir. <code>3</code> bir sayıdır; <code>"3"</code> yazı olarak üç rakamıdır. İleride eşitlik sorarken bu fark ısırır.</p>
    <p>Aşağıda üçü birden tuvalde: sayı daireyi büyütür, metin yazılır, basılı tutunca kutu kırmızı olur.</p>
    ${N.editor("turler")}

    <h2>Değişken: isim verilmiş kutu</h2>
    <p>Aynı sayıyı defalarca yazmak yerine kutuya koyar, kutuya isim verirsiniz.</p>
    <p><code>let x = 10;</code> üç parça:</p>
    <ol>
      <li><code>let</code> — “yeni bir kutu aç”</li>
      <li><code>x</code> — kutunun adı</li>
      <li><code>= 10</code> — içine 10 koy</li>
    </ol>
    <p>Sonra <code>x = x + 1</code> kulağa tuhaf gelir: “x’i kendine eşitle?” Değil. <strong>Sağ taraf önce</strong> hesaplanır. Eski x (10) artı 1 = 11, sonuç sola yazılır. Kutunun içi 11 olur. <code>x++</code> aynı işin kısa yazımıdır.</p>
    ${N.math("yeni x  =  eski x  +  1", "Sağ taraf önce hesaplanır (eski değer artı bir), sonuç soldaki kutuya yazılır.")}
    <p>Tuvalde x’in değerini yazdırıyoruz. Kutunun içini görmek, tahmin etmekten iyidir.</p>
    ${N.editor("degisken")}
    ${N.tryit([
      { do: "xSpeed = 8 yapın.", expect: "Kare daha hızlı uçar; sayı her kare daha çok artar." },
      { do: "Başlangıcı let x = 20 yerine let x = 200 yapın.", expect: "Kare ortadan başlar." },
    ])}
    ${N.warn(
      "= ile === karışması",
      `<p><code>x = 5</code> <strong>atamadır</strong>: kutuya 5 koy.<br>
      <code>x === 5</code> <strong>sorudur</strong>: içinde 5 var mı?<br>
      <code>if (x = 5)</code> yazarsanız koşul “5 koydum, bu doğru sayılır” gibi davranır. Kitap eşitlikte <code>===</code> ister: hem değer hem tür. <code>3 === "3"</code> yanlıştır.</p>`
    )}
    ${N.quiz(
      "let n = 4; sonra n = n + 2; şimdi n kaçtır?",
      ["4", "2", "6"],
      2,
      "Sağ: 4 + 2 = 6. Sol kutuya 6 yazılır."
    )}

    <h2>Dört işlem (ve yüzde işareti)</h2>
    <p>JavaScript’te <code>+</code> <code>-</code> <code>*</code> <code>/</code> beklediğiniz gibi. Çarpma yıldızdır, çarpı işareti değil.</p>
    <p><code>%</code> “mod” (kalan)dır. <code>10 % 3</code> → 1, çünkü 10’da üç tane 3 sığar, 1 artar. Oyunlarda “sağdan çıkınca soldan gir” bu işlemin işidir; matematik sayfasında tekrar döneriz.</p>
    <p>Fareyi kaydırın: <code>a</code> değişir. Mavi kareler tam 3’lü gruplar, turuncu kalan.</p>
    ${N.editor("islem")}
    ${N.quiz(
      "let a = 10; a = a * 2; a kaçtır?",
      ["12", "20", "10"],
      1,
      "10 × 2 = 20. Eski değerin üzerine yazılır."
    )}

    <h2>if / else: yol ayrımı</h2>
    <p>Kod bazen iki yoldan birini seçer. <code>if</code> “eğer”, <code>else</code> “değilse”.</p>
    <p>Koşul parantez içinde <code>true</code> veya <code>false</code> üretir. Karşılaştırma işaretleri:</p>
    <table class="data">
      <thead><tr><th>Yazılış</th><th>Okunuşu</th><th>Örnek (x = 5)</th></tr></thead>
      <tbody>
        <tr><td><code>&lt;</code></td><td>küçüktür</td><td><code>x &lt; 10</code> doğru</td></tr>
        <tr><td><code>&gt;</code></td><td>büyüktür</td><td><code>x &gt; 10</code> yanlış</td></tr>
        <tr><td><code>&lt;=</code> <code>&gt;=</code></td><td>küçük/eşit, büyük/eşit</td><td><code>x &lt;= 5</code> doğru</td></tr>
        <tr><td><code>===</code></td><td>eşit mi?</td><td><code>x === 5</code> doğru</td></tr>
        <tr><td><code>!==</code></td><td>eşit değil mi?</td><td><code>x !== 0</code> doğru</td></tr>
      </tbody>
    </table>
    <p>Birden fazla şart:</p>
    <ul>
      <li><code>&amp;&amp;</code> <strong>ve</strong> — ikisi de doğru olmalı</li>
      <li><code>||</code> <strong>veya</strong> — biri yeter</li>
      <li><code>!</code> <strong>değil</strong> — doğruyu yanlışa çevirir</li>
    </ul>
    ${N.editor("kosul")}
    ${N.tryit([
      { do: "width / 2 yerine width / 3 yazın.", expect: "Mavi bölge daralır; çizgi sola kayar." },
    ])}

    <h3>else if: dilim dilim karar</h3>
    <p>Kitaptaki walker “yüzde 40 sağ, 20 sol, 20 yukarı, 20 aşağı” der. Bu bir 0–1 cetvelidir. <code>else if</code> “ilk kapı açılmadıysa şunu dene” demektir. <strong>Sıra önemlidir.</strong></p>
    <p>Aşağıda zar her kare atılmaz — o zaman yazı 60 kez/sn değişir, hiçbir şey okunmaz. Bunun yerine <code>r</code> farenin x’idir: yavaşça kaydırın, kapıların ne zaman değiştiğini görün.</p>
    <p>Örnek: <code>r = 0.55</code></p>
    <ol>
      <li><code>r &lt; 0.4</code>? hayır → atla</li>
      <li><code>r &lt; 0.6</code>? evet → sol. Gerisi çalışmaz</li>
    </ol>
    <p>İkinci dilim kâğıtta “0.4 ile 0.6 arası”dır; 0.4’ten küçükler zaten birinci kapıda kalır.</p>
    ${N.editor("elseif")}
    ${N.tryit([
      { do: "Fareyi cetvelde 0.4 çizgisinin üstünden yavaşça geçirin.", expect: "Daire sağdan sola atlar; r yazısı 0.40 civarında değişir." },
      { do: "İlk eşiği 0.4 yerine 0.7 yapın.", expect: "Yeşil (sağ) dilim büyür; sol daralır." },
    ])}
    ${N.quiz(
      "r = 0.55. r < 0.4 mı, değilse r < 0.6 mı?",
      ["Birinci dal (sağ)", "İkinci dal (sol)", "İkisi birden"],
      1,
      "0.55, 0.4’ten küçük değil; 0.6’dan küçük. Yalnızca ikinci else if çalışır."
    )}

    <h2>for: “şunu 8 kez yap”</h2>
    <p><code>for</code> tekrar makinesidir. Üç parça, noktalı virgülle ayrılır:</p>
    ${N.math("for (başla;  devam et;  her tur sonunda)", "Örnek: <code>i = 0</code> ile başla, <code>i &lt; 8</code> iken devam et, her tur <code>i++</code>.")}
    <ol>
      <li><code>let i = 0</code> — sayaç 0’dan başlar (bilgisayar çoğu yerde sıfırdan sayar)</li>
      <li><code>i &lt; 8</code> — i 8’den küçükken devam (0,1,2,3,4,5,6,7 → sekiz tur)</li>
      <li><code>i++</code> — her turun sonunda i’yi 1 artır</li>
    </ol>
    <p>“Üçüncü daire” için <code>i === 2</code> bakarsınız, çünkü birinci daire i=0’dır.</p>
    <p>Dairelerin x konumu <code>28 + i * 48</code> gibi yazılır: i büyüdükçe sağa kayar. Bu, “indeksi koordinata çevirmek”tir; kitap boyunca tekrar eder.</p>
    ${N.editor("dongu")}
    ${N.tryit([
      { do: "i < 8 yerine i < 4 yazın.", expect: "Dört daire kalır." },
      { do: "i * 48 yerine i * 70 yazın.", expect: "Aralık açılır; sonrakiler taşabilir." },
    ])}
    ${N.quiz(
      "for (let i = 0; i < 3; i++) kaç kez döner?",
      ["2", "3", "4"],
      1,
      "i = 0, 1, 2. i = 3 olunca 3 < 3 yanlıştır, durur."
    )}

    <h2>while: “şart doğru olduğu sürece”</h2>
    <p><code>while (şart) { ... }</code> şart <code>false</code> olana kadar döner. Kitapta “uygun rastgele sayı gelene kadar dene” (kabul-red) böyle yazılır.</p>
    <p>İçeride şartı bir gün yanlış yapacak bir şey yoksa döngü <strong>sonsuz</strong> olur; tarayıcı kilitlenir. <code>while (true)</code> ancak içinde <code>break</code> veya <code>return</code> varsa güvenlidir.</p>
    ${N.editor("whileornek")}

    <h2>Dizi: numaralı raflar</h2>
    <p>Birden fazla değeri tek isimde tutmak için köşeli parantez:</p>
    <p><code>let caplar = [20, 50, 35];</code></p>
    <ul>
      <li><code>caplar[0]</code> — birinci raf (yine sıfırdan!)</li>
      <li><code>caplar[1]</code> — ikinci</li>
      <li><code>caplar.length</code> — kaç raf var (burada 3)</li>
      <li>Son rafın indeksi her zaman <code>length - 1</code></li>
      <li>Yeni raf: <code>caplar.push(80)</code></li>
    </ul>
    <p>İleride ölen parçacığı listeden çıkarmak <code>splice</code> ile gelecek. Şimdilik: dizi + <code>for</code> = “hepsini çiz”.</p>
    ${N.editor("dizi")}
    ${N.tryit([
      { do: "setup içinde caplar.push(12) ekleyin.", expect: "Altıncı daire belirir; sığmazsa kenardan taşar." },
      { do: "circle’ın y’sini 120 yerine 80 + i * 10 yapın.", expect: "Daireler merdiven gibi iner." },
    ])}
    ${N.quiz(
      "let a = [10, 20, 30]; a[a.length] nedir?",
      ["30", "undefined (boş raf)", "3"],
      1,
      "length 3’tür; geçerli indeksler 0, 1, 2. a[3] yoktur."
    )}

    <h2>Nesne: etiketli form</h2>
    <p>Bir topun x’i, y’si, hızı varsa üç ayrı değişken dağılır. Tek paket, süslü parantez:</p>
    <p><code>let top = { x: 40, y: 80, v: 2 };</code></p>
    <p>Nokta “paketin içindeki şu alan” demektir: <code>top.x</code>, <code>top.y</code>. <code>class</code> bunun kalıplı, tekrar üretilebilir halidir — birazdan.</p>
    ${N.editor("nesne")}

    <h2>Fonksiyon: isim verilmiş iş</h2>
    <p>Aynı çizimi üç yerde kopyalamak yerine bir <strong>tarif</strong> yazarsınız.</p>
    <p><code>function yuz(x, y, cap)</code> — parantezdekiler <strong>parametre</strong>: tarifin boşlukları. <code>yuz(80, 120, 70)</code> boşlukları doldurur; bunlara <strong>argüman</strong> denir.</p>
    <p><code>return</code> tarifi bir değerle bitirir. Makineye 10 verdiniz, 5 çıktı:</p>
    <p><code>function yari(n) { return n / 2; }</code> → <code>let a = yari(10)</code> ise <code>a</code> 5 olur.</p>
    <p>p5’in <code>dist</code>, <code>map</code>, <code>random</code> hepsi bir şey <em>döndürür</em>. Döndürmeyen fonksiyon da vardır: sadece çizer, kutu doldurmaz.</p>
    ${N.editor("fonksiyon")}
    ${N.tryit([
      { do: "yuz(80, 120, 70) çağrısını yuz(80, 120, 30) yapın.", expect: "Sol yüz küçülür; diğerleri aynı kalır. Parametre o çağrıya aittir." },
    ])}
    ${N.quiz(
      "function topla(a, b) { return a + b; }  topla(3, 4) ne döner?",
      ["34", "7", "undefined"],
      1,
      "a ve b sayıdır; 3+4=7. Tırnak içinde olsalardı metin birleşirdi."
    )}

    <h2>class ve this: kalıp ve kurabiye</h2>
    <p>Bir walker yetmez; iki, yirmi, iki yüz istersiniz. Her seferinde x, y, step’i kopyalamak çabuk dağılır. <code>class</code> kalıptır (kurabiye kalıbı). <code>new Top(...)</code> kalıptan bir kurabiye çıkarır.</p>
    <ul>
      <li><code>constructor</code> — nesne <em>doğunca bir kez</em> çalışır (sketch’teki <code>setup</code> gibi). İlk x, y, hız burada konur.</li>
      <li><code>this.x</code> — “<em>bu</em> kurabiyenin x’i”. Diğer kurabiyeninki değil.</li>
      <li>Sınıfın içindeki fonksiyonlara <strong>metot</strong> denir. <code>a.move()</code> yalnızca a’yı yürütür.</li>
    </ul>
    <p>İki top yan yana durabiliyorsa <code>this</code> doğru bağlanmıştır. Kitaptaki Walker tam bu kalıptır: <code>show</code> çizer, <code>step</code> konum değiştirir.</p>
    ${N.editor("sinif")}
    ${N.quiz(
      "new Top(10, 20, 1) ve new Top(300, 20, 3). this.x nedir?",
      [
        "Her zaman 10",
        "O an çağrılan nesnenin kendi x’i",
        "İkisinin ortası",
      ],
      1,
      "Her nesnenin kendi verisi vardır. Metot hangi nesne üzerinde çağrıldıysa this odur."
    )}
    ${N.warn(
      "Unutulan this",
      `<p>Sınıf içinde <code>x = x + 1</code> yazmak çoğu zaman <code>this.x</code> değildir; hata veya <code>undefined</code> görürsünüz. Alışkanlık: nesneye ait her şey <code>this.</code> ile başlar.</p>`
    )}

    <p>Üçüncü bir top eklemek: <code>let c;</code> setup’ta <code>c = new Top(320, 60, 2.5);</code> draw’da <code>c.move(); c.show();</code> — kalıp hazır olduğu için yeni satırlar kısadır.</p>
    ${N.tryit([
      { do: "new Top(330, 40, 1.8, true) ekleyip draw’da move/show çağırın.", expect: "Üçüncü daire; kırmızı mı mavi mi this.kirmizi ile belli." },
      { do: "show içinde circle çapını 32 yerine 16 yapın.", expect: "Kalıp değiştiği için üçü de küçülür." },
    ])}

    <h2>Sık hatalar (herkes yapar)</h2>
    <ul>
      <li>Süslü parantezi <code>{ }</code> kapatmamak — sonraki satırlar “hâlâ fonksiyonun içinde” kalır; hata satırı yanıltıcı olabilir.</li>
      <li><code>caplar[caplar.length]</code> — son eleman <code>length - 1</code> indeksindedir.</li>
      <li>Türkçe karakterli değişken adı çalışır ama karışır; <code>xHiz</code> yeter.</li>
      <li><code>console.log(x)</code> kutunun içini tarayıcı konsoluna basar (sağ tık → İncele → Console). Tuvalde <code>text(x, 16, 24)</code> çoğu zaman daha rahattır.</li>
      <li><code>function Draw()</code> yazmak — p5 <code>draw</code> ister, büyük D tanımaz.</li>
    </ul>
    ${N.quiz(
      "class içinde this.y = this.y + this.speed yerine y = y + speed yazılırsa genelde ne olur?",
      [
        "Yine çalışır, this gereksizdir",
        "y ve speed bu nesneye ait sayılmaz; hata veya NaN",
        "Bütün toplar aynı y’ye yapışır",
      ],
      1,
      "Sınıfın alanlarına this ile ulaşılır."
    )}

    ${N.resources([
      { kind: "Video", title: "Coding Train · Code! Programming with p5.js", url: "https://thecodingtrain.com/tracks/code-programming-with-p5-js", note: "1–2. videolar: değişken ve döngü; Objects bölümü class için" },
      { kind: "Video", title: "JavaScript’e giriş (TR, YouTube araması)", url: "https://www.youtube.com/results?search_query=javascript+de%C4%9Fi%C5%9Fken+d%C3%B6ng%C3%BC+fonksiyon+t%C3%BCrk%C3%A7e", note: "kısa TR videolar; Coding Train İngilizce daha sistematik" },
      { kind: "Referans", title: "MDN · JavaScript rehberi", url: "https://developer.mozilla.org/tr/docs/Web/JavaScript/Guide", note: "dilin belgesi, Türkçe sayfalar var" },
      { kind: "Kitap", title: "javascript.info", url: "https://javascript.info/", note: "sınıf, dizi, fonksiyon derinlemesine" },
      { kind: "Alıştırma", title: "freeCodeCamp JS", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/", note: "kısa görevlerle kas" },
    ])}
    <p><a href="#/p5">p5.js temelleri →</a></p>
  `,
  editors: {
    merhaba: {
      title: "Yazı ve bir daire",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(230);
  fill(30);
  noStroke();
  text("merhaba", 20, 40);
  fill(80, 140, 220);
  circle(200, 140, 48);
}` }],
    },
    turler: {
      title: "Sayı büyütür, metin yazar, boolean boyar",
      files: [{ name: "sketch.js", content: `let yas = 19;
let ad = "Ada";

function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(245);
  fill(80, 140, 220);
  noStroke();
  circle(90, 140, yas * 4);
  fill(20);
  text("sayı: yas = " + yas, 20, 28);
  text("(çap = yas × 4)", 20, 48);

  textSize(32);
  text(ad, 200, 90);
  textSize(12);
  text("metin: ad", 200, 112);

  if (mouseIsPressed) fill(200, 50, 50);
  else fill(190);
  rect(200, 140, 160, 56, 8);
  fill(20);
  text("boolean: " + mouseIsPressed, 210, 174);
}` }],
    },
    degisken: {
      title: "Kayan kare — x her kare artar",
      files: [{ name: "sketch.js", content: `let x = 20;
let xSpeed = 3;

function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(240);
  x = x + xSpeed;
  if (x > width) {
    x = 0;
  }
  fill(40, 90, 180);
  square(x, 100, 40);
  fill(20);
  noStroke();
  text("x = " + floor(x), 16, 24);
}` }],
    },
    islem: {
      title: "a’yı fareyle değiştir — kalan turuncu",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  let a = floor(map(mouseX, 0, width, 0, 12));
  let b = 3;
  fill(20);
  noStroke();
  text("a = " + a + "   b = " + b + "   (fare → a)", 16, 28);
  text("a + b = " + (a + b) + "     a * b = " + (a * b), 16, 52);
  text("a / b = " + nf(a / b, 1, 2) + "     a % b = " + (a % b), 16, 76);
  text("mavi: tam grup (3’lü)    turuncu: kalan", 16, 108);
  for (let i = 0; i < a; i++) {
    if (i < floor(a / b) * b) fill(40, 90, 180);
    else fill(220, 100, 40);
    square(20 + i * 30, 150, 24);
  }
}` }],
    },
    kosul: {
      title: "Fareye göre zemin rengi",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  if (mouseX < width / 2) {
    background(180, 210, 255);
  } else {
    background(255, 200, 140);
  }
  stroke(0);
  line(width / 2, 0, width / 2, height);
  fill(20);
  noStroke();
  text("mouseX = " + floor(mouseX), 16, 24);
}` }],
    },
    elseif: {
      title: "Cetvel: fare ile r, dört kapı",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(245);
  let r = constrain(mouseX / width, 0, 0.999);
  let yon, cx, cy, k, ysl, m;
  if (r < 0.4) {
    yon = "sağ";
    cx = 330; cy = 160;
    k = 80; ysl = 160; m = 90;
  } else if (r < 0.6) {
    yon = "sol";
    cx = 70; cy = 160;
    k = 220; ysl = 140; m = 60;
  } else if (r < 0.8) {
    yon = "yukarı";
    cx = 200; cy = 100;
    k = 80; ysl = 140; m = 220;
  } else {
    yon = "aşağı";
    cx = 200; cy = 210;
    k = 160; ysl = 90; m = 180;
  }

  let x0 = 16;
  let bar = 368;
  noStroke();
  fill(80, 160, 90);
  rect(x0, 12, bar * 0.4, 22);
  fill(220, 140, 60);
  rect(x0 + bar * 0.4, 12, bar * 0.2, 22);
  fill(80, 140, 220);
  rect(x0 + bar * 0.6, 12, bar * 0.2, 22);
  fill(160, 90, 180);
  rect(x0 + bar * 0.8, 12, bar * 0.2, 22);
  fill(255);
  textAlign(CENTER, CENTER);
  text("sağ %40", x0 + bar * 0.2, 23);
  text("sol", x0 + bar * 0.5, 23);
  text("yukarı", x0 + bar * 0.7, 23);
  text("aşağı", x0 + bar * 0.9, 23);
  textAlign(LEFT, BASELINE);
  let nx = x0 + r * bar;
  fill(20);
  triangle(nx, 36, nx - 7, 50, nx + 7, 50);
  text("r = " + nf(r, 1, 2) + "  →  " + yon, 16, 72);

  fill(k, ysl, m);
  circle(cx, cy, 40);
}` }],
    },
    dongu: {
      title: "i ile 8 daire — her birinin üstünde i",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  for (let i = 0; i < 8; i++) {
    fill(40 + i * 28);
    noStroke();
    circle(28 + i * 48, 120, 36);
    fill(20);
    text(i, 24 + i * 48, 160);
  }
}` }],
    },
    whileornek: {
      title: "while: 1’den 10’a merdiven",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  let n = 1;
  let toplam = 0;
  while (n <= 10) {
    toplam = toplam + n;
    fill(40, 90, 180);
    noStroke();
    rect(20, height - 8 - n * 20, n * 18, 16);
    fill(20);
    text(n, 24 + n * 18, height - n * 20);
    n = n + 1;
  }
  fill(20);
  text("while n ≤ 10  →  toplam = " + toplam, 16, 28);
}` }],
    },
    dizi: {
      title: "Çaplar dizide — indeks altta",
      files: [{ name: "sketch.js", content: `let caplar = [20, 50, 35, 80, 40];

function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  for (let i = 0; i < caplar.length; i++) {
    fill(100, 140, 200, 180);
    noStroke();
    circle(50 + i * 75, 110, caplar[i]);
    fill(20);
    text("[" + i + "]  " + caplar[i], 32 + i * 75, 180);
  }
}` }],
    },
    nesne: {
      title: "Tek paket: x, y, v",
      files: [{ name: "sketch.js", content: `let top = { x: 40, y: 40, v: 2 };

function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(245);
  top.y = top.y + top.v;
  if (top.y > height) top.y = 0;
  fill(50, 120, 200);
  circle(top.x, top.y, 28);
  fill(20);
  noStroke();
  text("top.y = " + floor(top.y), 16, 24);
}` }],
    },
    fonksiyon: {
      title: "Aynı yüz, üç yerde",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  yuz(80, 120, 70);
  yuz(200, 90, 50);
  yuz(320, 150, 90);
}

function yuz(x, y, cap) {
  fill(255, 220, 160);
  circle(x, y, cap);
  fill(30);
  circle(x - cap * 0.18, y - cap * 0.08, cap * 0.12);
  circle(x + cap * 0.18, y - cap * 0.08, cap * 0.12);
}` }],
    },
    sinif: {
      title: "İki Top: kırmızı a, mavi b",
      files: [{ name: "sketch.js", content: `let a, b;

function setup() {
  createCanvas(400, 240);
  a = new Top(90, 24, 2.5, true);
  b = new Top(260, 24, 1.1, false);
}

function draw() {
  background(245);
  a.move();
  b.move();
  a.show();
  b.show();
}

class Top {
  constructor(x, y, speed, kirmizi) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.kirmizi = kirmizi;
  }

  move() {
    this.y = this.y + this.speed;
    if (this.y > height) this.y = 0;
  }

  show() {
    if (this.kirmizi) fill(200, 60, 60);
    else fill(50, 110, 200);
    noStroke();
    circle(this.x, this.y, 32);
    fill(20);
    text(this.kirmizi ? "a" : "b", this.x - 4, this.y - 22);
  }
}` }],
    },
  },
});
