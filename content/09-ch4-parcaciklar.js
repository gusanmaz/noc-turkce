registerChapter({
  id: "ch4",
  title: "4. Parçacık sistemleri",
  short: "4. Parçacıklar",
  icon: "✨",
  original: "https://natureofcode.com/particles/",
  originalCode:
    "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/04_particles",
  html: `
    <p style="font-style:italic;color:var(--muted);">“Bu akıllıca. Mantığı işin içine katsaydım, mantık açıkça derdi ki çoğunluğun ihtiyacı azınlığınkinden ağır basar.” — Spock</p>

    ${N.img(
      "04_particles",
      "04_particles_1.png",
      "Pozitron (fotoğraf: Carl D. Anderson). Sis odasında yüklü parçacığın izi; 20. yüzyılın başında ilk gözlenen pozitron. Kitap bölümü bu fotoğrafla açar: tek tek görünmeyen şeyler, birlikte bir iz bırakır."
    )}

    <p>1982’de Lucasfilm’de William T. Reeves, <em>Star Trek II: Khan’ın Gazabı</em> üzerinde çalışıyordu. Filmin Genesis cihazı, ölü bir gezegene ateşlenince maddeyi yeniden örgütler. Sahnede gezegenin yüzeyini bir ateş duvarı tarar. O efekti yazarken Reeves <strong>parçacık sistemi</strong> (particle system) adını koydu. Kendi cümlesiyle:</p>
    <blockquote>
      <p>Parçacık sistemi, bulanık bir nesneyi birlikte temsil eden pek çok minik parçacığın koleksiyonudur. Zaman içinde sisteme doğarlar, sistemin içinde hareket edip değişirler ve sistemden ölürler.</p>
    </blockquote>
    <p>O günden beri oyun, animasyon, enstalasyon: ateş, duman, şelale, sis, çimen, kabarcık. Hepsi “çok tane, her biri kısa ömürlü, birlikte bir şey gibi duran” kalıba oturur.</p>
    <p>Bu bölümün asıl işi görsel şaşa değil: <em>çok elemanı nasıl takip edersiniz?</em> Tek parçacığın kutusu nerede, bütün sistemin kutusu nerede? Örnekler daire ve basit yerçekimi kullanır. Sizin sisteminizin kıvılcım saçması, ileri fırlaması veya düşmesi şart değil. Çizimi ve davranışı değiştirirseniz aynı iskele ateş de olur, kar da, kırılan vazo da.</p>

    ${N.note(
      "Bu bölümün çıktısı",
      `<ul>
        <li>Tek <code>Particle</code>: konum, hız, ivme, <strong>ömür</strong> (<code>lifespan</code>)</li>
        <li>Dizi + <code>push</code> / <code>splice</code>: doğum ve ölüm; <code>isDead</code></li>
        <li><code>Emitter</code> sınıfı: listeyi ana programdan gizlemek</li>
        <li>Yayıcıların dizisi: sistemin sistemi</li>
        <li><code>class Confetti extends Particle</code>: kalıtım ve çok biçimlilik (sıfır JavaScript ile, burada)</li>
        <li>Kuvvet ve itici (<code>Repeller</code>); duman için <code>loadImage</code> / doku; <code>blendMode(ADD)</code></li>
      </ul>`
    )}

    <h2>Neden parçacık sistemi?</h2>

    <p>Şelale çekici durur. Daha geniş sebep: bundan sonraki bölümler de “bir sürü şey” ile dolu — zıplayan toplar, sürü, ekosistem. Hepsi liste. Parçacık sistemi o listenin disiplinli halidir.</p>
    <p>Önceki bölümlerde diziye parmak ucuyla girdiniz. Şimdi üç şey istiyoruz. Bir: sayı esnek olsun (sıfır, bir, on, on bin). İki: yalnızca parçacığın sınıfı yetmesin; <em>koleksiyonun da</em> bir sınıfı olsun. Üç: aynı listede farklı türler durabilsin — kalıtım ve çok biçimlilik. Hedef, ana programın şöyle durması:</p>
    <pre><code>let sistem;
function setup() {
  createCanvas(400, 240);
  sistem = new ParticleSystem();
}
function draw() {
  background(255);
  sistem.run();
}</code></pre>
    <p>Bu satırlarda tek bir parçacık adı yok. Tuval yine dolu olur: ayrıntı <code>ParticleSystem</code> (bundan sonra <code>Emitter</code>) içinde gizlidir; o da pek çok <code>Particle</code> tutar. “Sınıf, başka sınıfın listesini taşır” kalıbı kitabın geri kalanında tekrarlanır.</p>

    <h2>Tek bir parçacık</h2>

    <p>Musluktan damla düşünün. Her damlanın yeri, hızı, aşağı çekilişi var. Bölüm 2’deki <code>Mover</code> tam bu: konum, hız, ivme; <code>update</code> ve <code>show</code>. Parçacık çoğu zaman aynı kalıbın yeni adıdır.</p>
    <p>Tek fark çoğu sistemde <strong>ömür</strong>dür. Musluk durmadan damlatırsa ve damlalar hiç kaybolmazsa ev dolar; p5.js sketch’i de öyle: her kare doğum, ölüm yoksa bir süre sonra kare hızı düşer, tarayıcı kilitlenir. Ölüm kuralı kenara çarpmak da olabilir, başka nesneye değmek de. Burada bir sayaç kullanacağız: <code>lifespan</code> 255’ten başlar, her kare biraz iner, 0’ın altına inince parçacık ölü sayılır.</p>
    ${N.note(
      "Neden 255?",
      `<p>p5.js’te rengin dördüncü sayısı (alfa, saydamlık) çoğu zaman 0–255 aralığındadır. 255 tam opak, 0 görünmez. Ömrü hem zamanlayıcı hem <code>fill(0, this.lifespan)</code> için kullanırsanız daire ölürken solar. İki iş, tek kutu. 255 sihirli fizik değil; renk cetveline denk gelsin diye.</p>`
    )}
    <p><code>isDead()</code> soru metodudur: ömür 0’ın altında mı? JavaScript’te <code>return this.lifespan &lt; 0;</code> yeter — ifade zaten <code>true</code> veya <code>false</code> üretir. Uzun <code>if / else</code> aynı kapıya çıkar.</p>
    ${N.warn(
      "Tuzak: ölü görünür, listede durur",
      `<p><code>isDead</code> tek başına nesneyi silmez. Yalnızca “bitti” der. Listeden çıkarmayı <code>splice</code> (biraz sonra) yapar. Unutursanız solmuş daireler dizide birikir; sketch yine ağırlaşır, sadece görünmezler.</p>`
    )}

    <h3>Örnek 4.1: Tek parçacık</h3>
    <p>Tuvalde bir daire düşer ve solar. Üstte ömür sayısı ve çubuk: 255 dolu, 0 boş. Sayı bitince değişken <em>yeni</em> bir <code>Particle</code> ile doldurulur — eski nesneye artık isimle ulaşılmaz; JavaScript onu unutur. Aynı anda hâlâ tek daire vardır; musluk değil, test.</p>
    <p>Yerçekimi <code>createVector(0, 0.1)</code>: x sıfır (yatay itiş yok), y 0.1 (her kare hız biraz aşağı artar). <code>applyForce</code> bunu ivmeye ekler; <code>update</code> hızı konuma katar, ivmeyi sıfırlar — Bölüm 2’deki şelale.</p>
    ${N.editor("ex41")}
    ${N.tryit([
      { do: "lifespan -= 2 yerine -= 8 yazın (particle.js).", expect: "Çubuk hızlı iner; daire daha çabuk solar ve yenilenir." },
      { do: "isDead kontrolünü yorumlayın (sketch.js).", expect: "Ömür biter, daire kaybolur, yenisi gelmez." },
    ])}
    ${N.quiz(
      "particle = new Particle(...) eski daireyi bellekten hemen siler mi?",
      [
        "Evet, new eski nesneyi yok eder",
        "Hayır; eski nesneye isim kalmaz, yenisi yazılır",
        "Yalnızca ömür 0 ise siler",
      ],
      1,
      "Atama kutunun etiketini yeni nesneye çevirir. Eskiye referans yoksa çöp toplayıcı onu sonra alır; splice henüz yok."
    )}

    ${N.note(
      "Alıştırmalar 4.1–4.2 (orijinal)",
      `<p>4.1: <code>Particle</code> içine <code>run()</code> yazın; <code>update</code>, <code>show</code>, <code>applyForce</code> orada toplansın. Artı: draw kısalır. Eksi: yerçekimini her parçacık kendi içinde hard-code eder — birazdan yayıcıya taşıyacağız.</p>
      <p>4.2: Açısal hız (dönme) ekleyin; dairenin dönüşü görünmez, kare veya üçgen deneyin.</p>
      <p><a href="https://natureofcode.com/particles/#exercise-41" target="_blank" rel="noopener">4.1</a> ·
      <a href="https://natureofcode.com/particles/#exercise-42" target="_blank" rel="noopener">4.2</a></p>`
    )}

    <h2>Parçacık dizisi</h2>

    <p>Bir damla test edildi. Musluk için <em>kaç tane</em> olduğunu önceden bilemezsiniz. JavaScript dizisi (<code>Array</code>) uzunluğu esnek bir listedir: <code>push</code> sona ekler, <code>length</code> o anki sayıdır. MDN’deki dizi belgesi uzun; burada kullanacağımız iki parça: ekle ve (ölünce) çıkar.</p>
    <p>Hazırlık sayfasındaki <code>for</code> ile her elemana <code>run</code> denebilir. JavaScript aynı işi birkaç yazımla yapar. <code>for (let particle of particles)</code> kulağa “listedeki her parçacık için run” diye çevrilir; indeks taşımaz. Kitap bunu seviyor — ta ki silme gerekene kadar.</p>
    <p>Her kare <code>particles.push(new Particle(...))</code> doğumdur. Ölüm yoksa on beş dakikada tarayıcı yorulur. Çıkarma: <code>splice(i, 1)</code> — “<code>i</code> indeksinden başla, 1 eleman sil.” İndeks lazım; <code>for...of</code> indeks vermez. Bu yüzden klasik <code>for (let i = ...)</code>.</p>
    ${N.warn(
      "splice, i’yi kaydırır",
      `<p>Kuyrukta 3. kişi (C) kalkınca arkadakiler bir adım öne kayar. Bilet numaraları değişir. Döngü <code>i++</code> ile sağa yürürken siz soldaki boşluğu kapatırsanız bir kişiyi atlarsınız. Sketch çökmez; daha sinsi: o karede bir ölü (veya diri) kontrol edilmez. Ertesi kare belki yakalanır — “belki” kabul etmeyiz.</p>`
    )}
    ${N.img(
      "04_particles",
      "04_particles_2.png",
      "Şekil 4.1: Diziden bir eleman silinince sağdakiler sola kayar. C (indeks 2) gidince D ve E 3 ve 4’ten 2 ve 3’e düşer."
    )}
    <p>İleri döngüde i=2’de C silinir; i 3’e çıkar; orada artık E durur. D, 2. rafa kaymıştır ve bu turda sorulmaz. Çözümün biri: <strong>sondan başa</strong> dönmek. Sağa kayma yok, sola kayma var; i küçülerek gittiği için atlanan raf kalmaz.</p>
    <p><code>for (let i = particles.length - 1; i &gt;= 0; i--)</code> — son indeksten 0’a. Silince yalnızca i’den <em>büyük</em> indeksler kayar; onlar zaten gezildi.</p>
    ${N.editor("spliceAtla")}
    ${N.tryit([
      { do: "Tuvale tıklayarak adım atın; önce ileri turu bitirin.", expect: "C silinince D bu turda işaretlenmez; yazı ‘D atlandı’ der." },
      { do: "Geri tura geçin (ileri bitince otomatik, veya tıklayın).", expect: "C silinse de D işaretlenir; atlama yazısı yok." },
    ])}
    ${N.quiz(
      "particles.splice(i, 1) ne yapar?",
      [
        "Yalnızca i. elemanı görünmez boyar",
        "i indeksindeki elemanı çıkarır; sonrakiler sola kayar",
        "Dizinin son elemanını siler, i önemsizdir",
      ],
      1,
      "İkinci argüman kaç eleman silineceği. 1 = tek parça. Kalanlar indeksi küçültür."
    )}
    <p>İkinci çözüm: <strong>yüksek mertebe fonksiyon</strong> — fonksiyona fonksiyon vermek. <code>filter</code> her elemanı bir sınavdan geçirir, kalanlarla <em>yeni</em> dizi döndürür:</p>
    <p><code>particles = particles.filter(p =&gt; !p.isDead());</code></p>
    <p>“Ölü olmayanları tut.” Ok (<code>=&gt;</code>) kısa fonksiyon yazımıdır. Kitap asıl örneklerde <code>splice</code> + geri döngüde kalır; <a href="https://thecodingtrain.com/hof" target="_blank" rel="noopener">Coding Train · higher-order functions</a> meraklısına.</p>

    <h3>Örnek 4.2: Parçacık dizisi</h3>
    <p>Her kare üst ortadan bir daire doğar, düşer, solar. Sol üstte o anki sayı: doğum ve ölüm dengelenince sayı bir tavan etrafında gezinir, sonsuza gitmez. 4.1’deki <code>run</code> alıştırmasını burada kullanıyoruz: her parçacık kendi yerçekimini kendi <code>run</code>’ında uygular — kısa olsun diye; kuvveti yayıcıya taşımak 4.6’da.</p>
    ${N.editor("ex42")}
    ${N.tryit([
      { do: "splice satırını yorumlayın.", expect: "Sayı durmadan artar; bir süre sonra sketch ağırlaşır. Ölüm yok, doğum var." },
      { do: "Döngüyü i = 0; i &lt; length; i++ yapıp splice’ı bırakın.", expect: "Bir süre çalışır gibi durur; ara sıra bir daire bir kare extra yaşar (atlanan eleman)." },
    ])}
    <p>Neden “en eskiyi her N karede <code>shift()</code> ile at” demiyoruz? Bu örnekte doğum sırası ölüm sırasına denk. Başka sistemde genç olan çarpışmayla önce ölebilir. <code>isDead</code> + <code>splice</code> o hali de taşır.</p>

    <h2>Parçacık yayıcısı</h2>

    <p>Dizi çalışıyor. <code>draw</code> hâlâ listenin muhasebesini yapıyor: ekle, dön, sil. Fabrika bacası düşünün: bacanın yeri bir bilgi, duman tanelerinin listesi başka bilgi. İkisini bir sınıfta toplarsak ana program bacaya “çalış” der, taneleri tek tek anmaz. Kitap buna artık <code>ParticleSystem</code> değil <code>Emitter</code> (yayıcı) diyor.</p>
    <p>4.2’nin <code>particles</code> kutusu yayıcının <code>this.particles</code>’ı olur. <code>push</code> işi <code>addParticle</code> metoduna taşınır. Geri döngü + <code>splice</code> <code>run</code> metoduna taşınır. <code>setup</code> / <code>draw</code> şöyle kalır: yayıcıyı kur, her kare <code>addParticle</code> ve <code>run</code>.</p>
    <p>Yayıcının bir de <strong>köken</strong>i (<code>origin</code>) vardır: tanelerin doğduğu nokta. Constructor <code>createVector(x, y)</code> ile onu saklar; her yeni parçacık o x, y’den başlar. Baca sabit durabilir — şart değil. Fareyi köken yapmak, bacayı fizikle yürütmek, iz bırakmak: aynı sınıf, başka <code>origin</code> güncellemesi.</p>

    <h3>Örnek 4.3: Tek yayıcı</h3>
    <p>Üç dosya: <code>particle.js</code>, <code>emitter.js</code>, <code>sketch.js</code>. Canlı editör sekmeleri bu dosyalar; çalıştırınca p5.js onları birleştirir, <code>sketch.js</code> sonda durur (sınıflar önce tanımlı olsun diye).</p>
    ${N.editor("ex43")}
    ${N.tryit([
      { do: "addParticle çağrısını draw’dan silin.", expect: "Doğum durur; mevcut daireler ölüp biter, tuval boşalır." },
      { do: "Emitter kökenini (width/2, height-20) yapın.", expect: "Musluk altta; daireler yine yukarı hızla doğar, yerçekimi geri çeker." },
    ])}

    ${N.note(
      "Alıştırmalar 4.3–4.4 (orijinal)",
      `<p>4.3: Yayıcı kımıldasın. Fare konumu veya Bölüm 1–2’deki hız/ivme. Köken her kare değişirse iz oluşur.</p>
      <p>4.4: Bölüm 3 Asteroids gemisinin iticisinden parçacık. İlk hız geminin baktığı yöne bağlı olsun. (Çözümü burada uydurmuyoruz; gemi o bölümde.)</p>
      <p><a href="https://natureofcode.com/particles/#exercise-43" target="_blank" rel="noopener">4.3</a> ·
      <a href="https://natureofcode.com/particles/#exercise-44" target="_blank" rel="noopener">4.4</a></p>`
    )}

    <h2>Yayıcılar sistemi</h2>

    <p>Parçacık bir nesneydi, listeye girdi. Yayıcı da nesne. O zaman yayıcılar da liste olabilir: sistemin sistemi. Organ hücreden, mahalle evden nasıl kurulursa: bir katmanı paketleyip üst kata çıkarsınız. Bu kitap o merdiveni sonsuza kadar çıkmaz; bir basamak yeter.</p>
    <p>Şekil 4.2 boş tuval. Şekil 4.3: bir tıklama, orada bir baca. Şekil 4.4: her tıklama yeni baca. Hepsi aynı kod: <code>emitters</code> dizisi başta boş; <code>mousePressed</code> içine <code>emitters.push(new Emitter(mouseX, mouseY))</code>; <code>draw</code> her yayıcıya <code>run</code> ve <code>addParticle</code>. Yayıcı silinmediği için burada <code>for...of</code> güvenli.</p>

    <h3>Örnek 4.4: Sistemin sistemi</h3>
    <p>Tıklayın. Her tık yeni köken. Sol üstte yayıcı sayısı. Daireler o bacadan düşer. Sketch açılınca tuval boştur (Şekil 4.2); ilk tık Şekil 4.3, devamı Şekil 4.4.</p>
    ${N.editor("ex44")}
    ${N.tryit([
      { do: "Üç kez tıklayın.", expect: "Üç ayrı musluk; sayaç 3. Birbirlerinin listesine karışmazlar." },
      { do: "mousePressed içindeki push’u silin.", expect: "Tıklama etkisiz; dizi boş kalır." },
    ])}

    ${N.note(
      "Alıştırmalar 4.5–4.6 (orijinal)",
      `<p>4.5: Her yayıcı sonsuz yaşamasın. Parçacık kotası bitsin, liste boşalınca o yayıcıyı <code>emitters</code> dizisinden çıkarın — yine geri döngü + <code>splice</code>.</p>
      <p>4.6: Büyük şekil tıklanınca parçalansın. Bir şekil nasıl çok küçük parçacık olur?</p>
      <p><a href="https://natureofcode.com/particles/#exercise-45" target="_blank" rel="noopener">4.5</a> ·
      <a href="https://natureofcode.com/particles/#exercise-46" target="_blank" rel="noopener">4.6</a></p>`
    )}

    <h2>Kalıtım ve çok biçimlilik</h2>

    <p>Şimdiye kadar listedeki her tanecik aynı daireydi. Cumartesi sabahı arkadaşınıza p5.js ile kart yapıyorsunuz: mor konfeti, pembe konfeti, yıldız, kare, hızlı, yavaş — hepsi bir patlamada. Bu bir parçacık sistemi. Renk ve şekli <code>Particle</code> içine rastgele kutular olarak tıkıştırmak bir süre iş görür. Türler <em>ciddi</em> ayrılınca aynı sınıf şişer: bir yanda daire+ömür, bir yanda dönen kare, bir yanda başka fizik. Okunmaz.</p>
    <p>Üç ayrı sınıf (<code>HappyConfetti</code>, <code>FunConfetti</code>, …) kopyala-yapıştır doğurur: üçünün de konum, hız, <code>update</code>’i vardır. İşte <strong>kalıtım</strong> (inheritance): bir sınıf başka sınıfın kutularını ve metotlarını <em>devralır</em>, üzerine kendi işini yazar. <strong>Çok biçimlilik</strong> (polymorphism): farklı sınıflardan nesneler aynı listede durur; döngü <code>run()</code> deyince her nesne <em>kendi</em> <code>run</code>’ını çalıştırır.</p>
    <p>Hazırlıktaki <code>class</code> kurabiye kalıbıydı: <code>constructor</code> doğum, <code>this</code> “bu kurabiye”, metotlar iş. Kalıtım o kalıbın <em>aile ağacı</em>dır. Köpek bir hayvandır: yer, uyur; ayrıca havlar. Kedi bir hayvandır: yer, uyur; ayrıca miyavlar. <code>eat</code> ve <code>sleep</code>’i iki kez yazmak yerine <code>Hayvan</code>’da bir kez yazarsınız.</p>
    ${N.img(
      "04_particles",
      "04_particles_3.png",
      "Şekil 4.5: Kalıtım ağacı. Köpek memeliden, memeli hayvandan devralır; aşağı inildikçe özellik birikir."
    )}

    <h3>class extends — sözdizimi, tuvalde</h3>
    <p>JavaScript’te çocuk sınıf şöyle açılır:</p>
    <p><code>class Kopek extends Hayvan { ... }</code></p>
    <p><code>extends</code> “şunun çocuğuyum” demektir. <code>Kopek</code> bir <code>Hayvan</code>’dır: <code>Hayvan</code>’daki <code>this.yas</code>, <code>ye()</code>, <code>uyu()</code> köpekte de vardır. Çocuk <em>tek</em> ebeveyn <code>extends</code> eder; zincir olur: <code>Terrier extends Kopek</code>, o da <code>Hayvan</code>’dan gelenleri taşır.</p>
    <p>Çocuğun <code>constructor</code>’ının ilk işi ebeveynin doğumunu çalıştırmaktır:</p>
    <p><code>constructor(x, y) { super(x, y); }</code></p>
    <p><code>super(...)</code> ebeveynin <code>constructor</code>’ını çağırır. Argümanlar ebeveynin beklediği sıradadır. Bunu yazmazsanız tarayıcı hata verir: çocuk constructor’ında <code>this</code> kullanmadan önce <code>super</code> şarttır. Ebeveyn <code>this.x</code>’i orada doldurur; çocuk sonra <code>this.tüy = ...</code> ekleyebilir.</p>
    ${N.warn(
      "Tuzak: super’süz constructor",
      `<p>Çocuk sınıfa <code>constructor</code> yazıp <code>super</code>’ü unutmak sık hatadır. Hiç constructor yazmazsanız JavaScript sizin yerinize “argümanları ebeveyne ilet” diye bir tane üretir — 4.5’teki ilk <code>Confetti</code> öyle durabilir. Kendi constructor’ınız varsa <code>super</code> sizin işinizdir.</p>`
    )}
    <p>Çocuk yeni metot ekler (<code>havla</code>). Ebeveyndeki metodu <em>ezer</em> (override): aynı isimde yeni gövde. Köpek farklı yiyorsa <code>ye()</code>’yi yeniden yazar. Hem ebeveynin yemesini hem ek işi istiyorsanız:</p>
    <p><code>ye() { super.ye(); /* köpeğe özgü satırlar */ }</code></p>
    <p><code>super.ye()</code> ebeveynin <code>ye</code>’sini çalıştırır; <code>super()</code> yalnızca constructor içindir, metotlarda <code>super.metotAdı()</code> vardır.</p>
    <p>Aşağıda tek dizi, tek döngü. Soldaki daire düz hayvan (yalnızca ebeveyn <code>show</code>). Ortadaki köpek: aynı gövde, kulak + “hav”. Sağdaki kedi: üçgen kulak + “miyav”. Üçü de <code>Hayvan</code> sayılır; <code>for (let h of krallik) h.show()</code> her birinin kendi çizimini çağırır. Konsola değil tuvale bakın.</p>
    ${N.editor("hayvanExtends")}
    ${N.tryit([
      { do: "Kopek.show içinde super.show() satırını silin.", expect: "Ortada gövde kaybolur; kulak ve yazı kalır. super.show ebeveynin dairesini çiziyordu." },
      { do: "döngüdeki h.show() yerine yalnızca krallik[0].show() bırakın.", expect: "Bir nesne çizilir; kalıtım durur, döngü eksiktir." },
    ])}
    ${N.quiz(
      "class Confetti extends Particle ne anlama gelir?",
      [
        "Confetti, Particle dosyasını kopyalar; iki sınıf bağlanmaz",
        "Confetti bir Particle’dır; Particle’ın kutuları ve metotları onda da vardır",
        "Confetti Particle’ı siler ve yerine geçer",
      ],
      1,
      "extends ebeveyn-çocuk bağıdır. new Confetti(...) bir Particle yerine de kullanılabilir."
    )}

    <h3>Çok biçimlilik (tek liste, birçok biçim)</h3>
    <p>Köpekleri, kedileri, kaplumbağaları ayrı dizilerde tutmak her tür için ayrı döngü ister. Dünya büyüyünce döngü ormanı olur. JavaScript dizisi karışık tür kabul eder. Hepsi <code>Hayvan</code> (veya onun çocuğu) olduğu sürece <code>animal.ye()</code> güvenlidir: çalışma anında nesnenin gerçek sınıfındaki <code>ye</code> seçilir. Yunanca “çok biçim” buradan: aynı çağrı, farklı gövde.</p>
    <p>Ayrı <code>happyParticles</code> / <code>funParticles</code> dizileri pratikte zahmetlidir. Tek <code>this.particles</code>, içine hem <code>Particle</code> hem <code>Confetti</code> — yayıcının <code>run</code>’ı değişmez.</p>

    <h3>Parçacıkta kalıtım</h3>
    <p><code>Particle</code> her katılımcının ortak iskelesidir: vektörler, ömür, <code>run</code> / <code>update</code> / <code>applyForce</code> / <code>isDead</code>, daire <code>show</code>. <code>Confetti extends Particle</code> aynı doğumu <code>super(x, y)</code> ile alır; <code>show</code>’u ezer: kare çizer.</p>
    <p>Kare dönsün istiyoruz. Bölüm 3’teki açısal hız yerine kısa yol: karenin x konumu 0 iken açı 0, tuvalin sağ kenarındayken açı iki tam tur olsun. İki cetvel arasında köprü p5.js <code>map</code>’idir.</p>
    ${N.math(
      "açı = map(x, 0, width, 0, 2 · TWO_PI)",
      "p5.js <code>map(deger, eskiMin, eskiMax, yeniMin, yeniMax)</code> değeri bir aralıktan ötekine oranlar. <code>TWO_PI</code> bir tam tur (radyan). İkiyle çarpınca iki tur. x soldan sağa giderken kare iki kez döner."
    )}
    ${N.warn(
      "Tuzak: rotate(90)",
      `<p>p5.js varsayılanı radyandır. <code>rotate(90)</code> 90 tur değil, yaklaşık 14 tam turdur — kare çıldırır. Çeyrek tur için <code>rotate(HALF_PI)</code> veya <code>angleMode(DEGREES)</code> sonra <code>rotate(90)</code>. <code>map</code> çıktısı zaten radyan (<code>TWO_PI</code> cinsinden) olduğu için <code>angleMode</code>’a dokunmadan <code>rotate(angle)</code> yazın.</p>`
    )}
    <p>Döndürmek, kareyi <code>square(this.position.x, this.position.y, 12)</code> ile çizip sonra <code>rotate</code> demek değildir. <code>rotate</code> kalemi değil <strong>koordinat sistemini</strong> döndürür; orijin hâlâ sol üstse kare tuvalin köşesi etrafında uçar. Günlük resim: kâğıdı merkeze iğneleyip çevirmek. p5.js’te iğne <code>translate(x, y)</code>, çevirme <code>rotate(angle)</code>, kare o yeni (0,0) etrafında <code>square(0, 0, 12)</code>.</p>
    <p><code>push()</code> o anki kaydırma/döndürmeyi fotoğraflar; <code>pop()</code> fotoğrafa döner. İkisini yazmazsanız bir sonraki dairenin koordinatı da dönmüş kalır. <code>draw</code> kare başında sistemi sıfırlar ama <em>aynı kare içinde</em> sonraki şekiller bozulur.</p>
    <p>Soldaki kare yalnız <code>square(x, y, 28)</code>: kayar, dönmez. Sağdaki kare <code>push</code> → <code>translate</code> → <code>rotate</code> → <code>square(0, 0, 28)</code> → <code>pop</code>. Fareyi yatay gezdirin; sağdaki kendi merkezinde döner, soldaki durur. Aynı açı, iki kuyruk — translate’siz <code>rotate</code> denerseniz kare tuvalin sol üstü etrafında uçar.</p>
    ${N.editor("nedenRotate")}
    ${N.tryit([
      { do: "Sağdaki pop() satırını silin.", expect: "Sonraki karelerde yazı ve çerçeve de döner; push/pop kutusu kapanmamıştır." },
      { do: "rotate(angle) yerine rotate(90) yazın.", expect: "Radyan tuzağı: kare vahşi döner. HALF_PI veya angleMode(DEGREES) değilse 90 ‘çeyrek tur’ değildir." },
    ])}

    ${N.note(
      "Alıştırma 4.7 (orijinal)",
      `<p><code>map</code> yerine açısal hız ve ivme modelleyin (Bölüm 3).</p>
      <p><a href="https://natureofcode.com/particles/#exercise-47" target="_blank" rel="noopener">Exercise 4.7</a></p>`
    )}

    <h3>Örnek 4.5: Kalıtım + çok biçimlilik</h3>
    <p>Yayıcı her doğumda yazı-tura: <code>random(1) &lt; 0.5</code> ise daire (<code>Particle</code>), değilse kare (<code>Confetti</code>). Tek dizi. <code>run</code> ve <code>isDead</code> ikisinde de var — kare onları ebeveynden devralır, yalnızca <code>show</code> farklıdır. Tuvalde daireler solar, kareler x boyunca döner.</p>
    ${N.editor("ex45")}
    ${N.tryit([
      { do: "r &lt; 0.5 yerine r &lt; 0.1 yapın.", expect: "Neredeyse hep kare (Confetti). Olasılık eşiği tür karmasını ayarlar." },
      { do: "Confetti.show’u yorumlayıp ebeveynin dairesine bırakın (super.show).", expect: "Kareler daireye döner; kalıtım durur, ezme kalkar." },
    ])}
    ${N.quiz(
      "emitter.run içindeki particle.run() Confetti için neden çalışır?",
      [
        "Çalışmaz; ayrı bir confettiRun gerekir",
        "Confetti Particle’dan run’ı devralır; JavaScript gerçek türe bakar",
        "run yalnızca dairelerde vardır, kareler atlanır",
      ],
      1,
      "Çok biçimlilik: aynı metot adı, çocuk devralmış veya ezmiş olabilir. Confetti run’ı ezmediği için ebeveynin run’ı (update + show) çalışır; show çocuğunki olur."
    )}

    ${N.note(
      "Alıştırma 4.8 (orijinal)",
      `<p>İkiden fazla tür. Yalnızca çizimi değil davranışı da değiştirin.</p>
      <p><a href="https://natureofcode.com/particles/#exercise-48" target="_blank" rel="noopener">Exercise 4.8</a></p>`
    )}

    <h2>Kuvvetli parçacık sistemleri</h2>

    <p>İskele duruyor. Kuvvet şimdiye kadar parçacığın <code>run</code>’ına gömülüydü: her tanecik kendi yerçekimini uyduruyordu. Rüzgâr, sürtünme, itici ekleyince o gömme dar gelir. Bölüm 2’deki gibi kütle de geri gelir: kuvveti kütleye böl, ivmeye ekle. Kütle 1 ise bölme 1’dir; 2 yaparsanız aynı kuvvet daha az ivme üretir.</p>
    ${N.warn(
      "Tuzak: force.div(mass) ortak vektörü bozar",
      `<p>Yerçekimi vektörünü bir kez üretip her parçacığa verirseniz, ilki <code>force.div(this.mass)</code> ile o vektörü yerinde küçültür. İkincisi artık yanlış ok alır. Önce <code>let f = force.copy()</code>, sonra <code>f.div(this.mass)</code>. <code>copy</code> yeni <code>p5.Vector</code> üretir; asıl yerçekimi durur.</p>`
    )}
    <p><code>applyForce</code> <code>Particle</code>’dadır; <code>draw</code> ise yalnızca <code>emitter</code> tanır. Konuşma yolu: draw yayıcıya kuvvet verir, yayıcı listedeki herkese iletir. Silme olmadığı için bu iletimde <code>for...of</code> uygundur. Silme hâlâ <code>run</code>’daki geri <code>for</code> + <code>splice</code>.</p>

    <h3>Örnek 4.6: Kuvvet uygulanan sistem</h3>
    <p>Yerçekimi <code>draw</code>’da bir kez üretilir, <code>emitter.applyForce(gravity)</code> herkese gider. Parçacığın kendi <code>run</code>’ında ikinci bir yerçekimi yoktur — iki kez uygulamak iki kat düşüş olurdu.</p>
    ${N.editor("ex46")}
    ${N.tryit([
      { do: "gravity’yi (0.15, 0.1) yapın.", expect: "Akış sağa yatar: yatay kuvvet de herkese aynı." },
      { do: "particle.js’te mass = 3 yapın.", expect: "Aynı kuvvet daha az ivme; daireler tembel düşer (hepsi aynı kütle olduğu için birlikte)." },
    ])}
    <p>Yerçekimi her kare, herkese aynı ok. Rüzgâr veya sürtünme de aynı kapıdan girebilir. Kuvvet yalnızca bazı karelerde veya bazı tanelerde de uygulanabilir — tasarım.</p>

    <h2>İticiler</h2>

    <p>Yerçekimi herkese aynı ok. İtici (repeller) başka: size ve yön, taneciğin <em>nerede</em> durduğuna bağlıdır. Mıknatısın eksi kutbu gibi — yakındakini iter, uzağa etkisi zayıflar. Bölüm 2’deki çekicinin tersi: aynı adımlar, işaret eksi.</p>
    ${N.img(
      "04_particles",
      "04_particles_4.png",
      "Şekil 4.6: Solda yerçekimi — oklar özdeş. Sağda itici — her ok tanecikten dışarı, büyüklük mesafeye göre."
    )}
    <p>İki ek: bir <code>Repeller</code> nesnesi (konum + güç), bir <code>emitter.applyRepeller(repeller)</code>. İkincisi her parçacık için <code>repeller.repel(particle)</code> diye <em>o taneciğe özel</em> kuvvet ister, sonra <code>particle.applyForce</code>. Parçacık sınıfına iticiyi öğretmezsiniz; o hâlâ yalnızca kuvvet yutar. Çevre ayrıntısı yayıcıda ve iticide kalır.</p>
    ${N.math(
      "F = − power / d<sup>2</sup>",
      "Yön: iticiden parçacığa (veya tersi) fark vektörü. d o okun uzunluğu, p5.js’te <code>force.mag()</code>. Gücü mesafenin karesine bölün; eksi işaret iter (artı çekerdi). Sonra <code>force.setMag(strength)</code> oku o boyuta getirir. <code>constrain(d, 5, 50)</code> d=0’da bölmeyi ve aşırı dev ivmeyi keser."
    )}
    ${N.note(
      "p5.js: constrain, setMag",
      `<p><code>constrain(n, min, max)</code> sayıyı aralıkta tutar: n min’den küçükse min, max’tan büyükse max. Vektörün boyunu kesmez; burada mesafeyi keser. <code>setMag(len)</code> yönü bırakır, uzunluğu tam <code>len</code> yapar. <code>power</code> kütle yerine “ne kadar sert it” düğmesidir.</p>`
    )}

    <h3>Örnek 4.7: İticili sistem</h3>
    <p>Gri daire itici. Üstten düşen taneler ona yaklaşınca yanlara ayrılır. Yerçekimi hâlâ herkese aynı; itme herkese ayrı. İticiyi fareye bağlamak alıştırmaya bırakılır — kodda sabit durur ki kuvvet okları okuna.</p>
    ${N.editor("ex47")}
    ${N.tryit([
      { do: "power değerini 40 yapın.", expect: "İtme zayıf; daireler gri gövdenin içinden geçer gibi durur." },
      { do: "power 400 yapın.", expect: "Kaçış sert; taneler iticinin yanında koridor açar." },
    ])}

    ${N.note(
      "Alıştırmalar 4.9–4.10 (orijinal)",
      `<p>4.9: Birden fazla itici ve çekici. <code>Repeller</code> / <code>Attractor</code> kalıtımı kopyayı keser mi?</p>
      <p>4.10: Her parçacık diğer her parçacığa tepki versin. Ayrıntı Bölüm 5.</p>
      <p><a href="https://natureofcode.com/particles/#exercise-49" target="_blank" rel="noopener">4.9</a> ·
      <a href="https://natureofcode.com/particles/#exercise-410" target="_blank" rel="noopener">4.10</a></p>`
    )}

    <h2>Görüntü dokusu ve toplanır karışım</h2>

    <p>Algoritma aynı kalıp çizim değişince duman “duman” olur. Şekil 4.7: sol düz beyaz daire, sağ kenarı silik leke. Aynı hız, aynı rüzgâr; fark <code>circle</code> yerine bir resim.</p>
    ${N.editor("dumanKarsilastir")}
    ${N.img(
      "04_particles",
      "04_particles_5.png",
      "Şekil 4.8: İki doku. Sol tam beyaz daire; sağ kenara doğru sönen bulanık daire (alfa kanalı)."
    )}
    <p>PNG önerilir: saydamlık (alfa) katman katman binince kenar sert kesilmez. Kitapta dosya <code>data/texture.png</code> olur, <code>preload</code> içinde yüklenir. Canlı editörün iframe’inde o klasör yok; aynı bulanık lekeyi p5.js <code>createGraphics</code> ile çizip <code>p5.Image</code> olarak kullanıyoruz. Kendi PNG’niz varsa yol şudur:</p>
    ${N.note(
      "p5.js: preload, loadImage, tint, imageMode",
      `<p><code>loadImage(yol)</code> resmi diskten (veya URL’den) yükler; bitmeden <code>draw</code> çalışırsa boş kare görürsünüz. Bunun için <code>preload()</code> vardır: p5.js setup’tan önce bu fonksiyonun bitmesini bekler. <code>let img; function preload() { img = loadImage("texture.png"); }</code></p>
      <p><code>image(img, x, y)</code> resmi çizer. Varsayılan çapa sol üst köşedir — <code>rect</code> gibi. <code>imageMode(CENTER)</code> x, y’yi resmin ortası yapar; parçacık konumuna denk gelir. <code>tint(255, this.lifespan)</code> resme renk/alfa verir: şekillerdeki <code>fill</code>’in karşılığı. <code>tint</code> sonraki <code>image</code> çağrılarını da boyar; başka resmi etkilemesin diye bazen <code>push</code>/<code>pop</code> veya <code>noTint</code>.</p>
      <p>Yüksek çözünürlüklü dokuyu her kare küçültmek pahalıdır. Doku, tuvalde çizeceğiniz en büyük parçacık kadar olsun.</p>`
    )}
    <p>Duman fıskiye gibi saçılmasın diye ilk hız <code>random</code> yerine <code>randomGaussian</code>: değerler bir ortalamanın etrafında yığılır, uçlar seyrek. Bölüm 0’daki çan eğrisi. Yatay ortalama 0 (sağa-sola az), dikey ortalama −1 (yukarı; tuvalde y aşağı artar, eksi y yukarıdır).</p>
    ${N.math(
      "v<sub>x</sub> = randomGaussian(0, 0.3)",
      "p5.js <code>randomGaussian(ortalama, sapma)</code> üretir. İlk argüman merkez, ikinci yayılma. 0.3 küçük sapma: çoğu tanecik neredeyse aynı yönde çıkar; fıskiye değil baca."
    )}

    <h3>Örnek 4.8: Doku ile duman</h3>
    <p>Siyah zemin. Fare yatayda rüzgâr: sol kenar sola, sağ kenar sağa. Ok rüzgârı gösterir. <code>heading</code> okun açısını radyan verir; <code>rotate(v.heading())</code> ekseni oka hizalar, sonra yatay çizgi ok olur. <code>map(mouseX, 0, width, -0.2, 0.2)</code> fare x’ini küçük bir kuvvete çevirir.</p>
    ${N.editor("ex48")}
    ${N.tryit([
      { do: "show içinde image yerine circle(..., 16) yazın (particle.js).", expect: "Şekil 4.7’nin solu: sert disikler, duman dağılır." },
      { do: "randomGaussian sapmasını 1.2 yapın.", expect: "Baca fıskiyeye döner; uç hızlar sıklaşır." },
    ])}

    ${N.note(
      "Alıştırmalar 4.11–4.12 (orijinal)",
      `<p>4.11: Ateş için başka doku. 4.12: Birden fazla PNG, her parçacığa biri. <code>loadImage</code>’i her parçacıkta değil her dosya için bir kez çağırın.</p>
      <p><a href="https://natureofcode.com/particles/#exercise-411" target="_blank" rel="noopener">4.11</a> ·
      <a href="https://natureofcode.com/particles/#exercise-412" target="_blank" rel="noopener">4.12</a> ·
      programatik doku: <a href="https://editor.p5js.org/natureofcode/sketches/LOUl3c76k" target="_blank" rel="noopener">p5 editor örneği</a></p>`
    )}

    <p>Üst üste binen pikseller nasıl karışır? Varsayılan: üsttekini çiz, alttakini ört (alfa varsa yüzde karışımı). <strong>Toplanır karışım</strong> (additive blending) başka kural: iki katmanın renk sayılarını <em>topla</em>, 255’te kes. Üst üste binen duman lekeleri parlar; bilimkurgu ışıması. Robert Hodgin’in <a href="https://roberthodgin.com/project/magnetosphere" target="_blank" rel="noopener">Magnetosphere</a> çalışması (eski iTunes görselleştiricisi) bu aileyedendir.</p>
    ${N.note(
      "p5.js: blendMode, clear, WEBGL",
      `<p><code>blendMode(ADD)</code> o kareden itibaren çizimleri toplar. Beyaz zeminle işe yaramaz: 255+bir şey yine 255, parlama görünmez. Zemin siyah olsun. <code>background</code> da karışıma katılır; toplanır kipte eski kare silinmeyebilir. Kitap <code>clear()</code> ile tamponu boşaltır, sonra siyah <code>background</code> boyar. 4.9’da <code>background(0)</code> WEBGL’de kareyi temizler; <code>blendMode(ADD)</code> ondan sonra gelir.</p>
      <p><code>createCanvas(w, h, WEBGL)</code> üçüncü argümanla grafik kartı yolunu açar. 2B daire için şart değil; binlerce yarı saydam leke + ADD tam bu senaryo. WEBGL’de (0, 0) <strong>tuvalin ortası</strong>dır, sol üst değil. Üst-sol varsayımıyla <code>circle(width/2, height/2, 20)</code> çizeceğinizi sandığınız yer kayar. Yayıcıyı (0, 50) gibi merkeze göre koyun.</p>
      <p>WEBGL bazı fonksiyonların davranışını ve çizim kalitesini değiştirir; çok eski tarayıcıda kapalı olabilir. Coding Train <a href="https://thecodingtrain.com/webgl" target="_blank" rel="noopener">WebGL videoları</a>.</p>`
    )}

    <h3>Örnek 4.9: Toplanır karışım</h3>
    <p>Üç tanecik her kare (daha yoğun katman). Fare yine rüzgâr. Leke üst üste binince beyaz-pembe parlama — ADD. Sol üstte kip ve köken notu. <code>texture(img)</code> WEBGL’de resmi bir kareye kaplar; <code>tint</code> yine ömür alfasını taşır.</p>
    ${N.editor("ex49")}
    ${N.tryit([
      { do: "blendMode(ADD) satırını yorumlayın.", expect: "Parlama gider; lekeler sıradan yarı saydam biner (veya WEBGL varsayılanı)." },
      { do: "background(0) yerine background(255) yazın.", expect: "Toplanır kip beyazda boğulur; ışıma kaybolur." },
    ])}
    ${N.quiz(
      "WEBGL kipinde createCanvas sonrası (0, 0) nerededir?",
      ["Sol üst köşe", "Tuvalin merkezi", "Sağ alt köşe"],
      1,
      "Üçüncü argüman WEBGL orijini ortaya alır. 2B varsayılanı sol üsttü."
    )}

    ${N.note(
      "Alıştırmalar 4.13–4.14 (orijinal)",
      `<p>4.13: <code>addParticle(3)</code> gibi bir sayı alsın; boş bırakılırsa 1. Kitaptaki boşluk: <code>addParticle(amount = 1)</code> ve içinde <code>for</code>.</p>
      <p>4.14: <code>tint</code> + ADD ile gökkuşağı. <code>SUBTRACT</code>, <code>LIGHTEST</code>, <code>MULTIPLY</code> deneyin.</p>
      <p><a href="https://natureofcode.com/particles/#exercise-413" target="_blank" rel="noopener">4.13</a> ·
      <a href="https://natureofcode.com/particles/#exercise-414" target="_blank" rel="noopener">4.14</a></p>`
    )}

    <h2>Ekosistem</h2>
    <p>Bölüm 3’teki yaratığı bir sistem yapın. Birbiriyle nasıl karşılaşırlar? Aynı kod tabanından kalıtımla türler? Kaynak (yiyecek) için kural. Sağlık, parçacık ömrü gibi bitsin mi? Doğum kuralı? Yaratığın konumuna bağlı bir yayıcı: nefes, iz, itici duman.</p>
    ${N.img(
      "04_particles",
      "04_particles_6.png",
      "Orijinal kitaptaki ekosistem görseli."
    )}
    ${N.note(
      "The Ecosystem Project (orijinal)",
      `<p><a href="https://natureofcode.com/particles/#the-ecosystem-project-5" target="_blank" rel="noopener">Ekosistem projesi</a> — çözüm uydurulmaz; dönem boyu iskele.</p>`
    )}

    ${N.resources([
      { kind: "Kitap", title: "Chapter 4 · Particle Systems", url: "https://natureofcode.com/particles/" },
      { kind: "Kod", title: "04_particles örnekleri", url: "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/04_particles" },
      { kind: "Video", title: "Coding Train · 4.1 Particle System", url: "https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/4-particles/1-particle-system/" },
      { kind: "Video", title: "Coding Train · 4.2 Particle Emitters", url: "https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/4-particles/2-particle-emitters/" },
      { kind: "Video", title: "Coding Train · 4.3 Particle Inheritance", url: "https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/4-particles/3-particle-inheritance" },
      { kind: "Video", title: "Coding Train · 4.4 Particle Textures", url: "https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/4-particles/4-particle-textures" },
      { kind: "Video", title: "Coding Train · higher-order functions", url: "https://thecodingtrain.com/hof" },
      { kind: "Video", title: "Coding Train · transformations (push/pop)", url: "https://thecodingtrain.com/transformations" },
      { kind: "Video", title: "Coding Train · WebGL", url: "https://thecodingtrain.com/webgl" },
      { kind: "Referans", title: "p5.js · loadImage", url: "https://p5js.org/reference/p5/loadImage/" },
      { kind: "Referans", title: "p5.js · blendMode", url: "https://p5js.org/reference/p5/blendMode/" },
      { kind: "Referans", title: "p5.js · tint", url: "https://p5js.org/reference/p5/tint/" },
      { kind: "Referans", title: "MDN · Array.splice", url: "https://developer.mozilla.org/tr/docs/Web/JavaScript/Reference/Global_Objects/Array/splice" },
      { kind: "Referans", title: "MDN · class ve extends", url: "https://developer.mozilla.org/tr/docs/Web/JavaScript/Reference/Classes/extends" },
      { kind: "Proje", title: "Hodgin · Magnetosphere", url: "https://roberthodgin.com/project/magnetosphere" },
      { kind: "Tutorial", title: "p5.play Türkçe tutorial", url: "https://github.com/gusanmaz/p5play-tutorial", note: "motor bölümü gelene kadar; önce vektör ve kuvvet" },
    ])}
    <p><a href="#/ch3">← Salınım</a> · <a href="#/ch5">Özerk ajanlar →</a></p>
  `,
  editors: {
    ex41: {
      title: "Örnek 4.1: Tek parçacık",
      original: {
        book: "https://natureofcode.com/particles/#example-41-a-single-particle",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/04_particles/4_1_single_particle",
      },
      files: [
        {
          name: "particle.js",
          content: `class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-2, 0));
    this.acceleration = createVector(0, 0);
    this.lifespan = 255;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
    this.acceleration.mult(0);
  }

  show() {
    stroke(0, this.lifespan);
    fill(0, this.lifespan);
    circle(this.position.x, this.position.y, 8);
  }

  isDead() {
    return this.lifespan < 0;
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let particle;

function setup() {
  createCanvas(400, 240);
  particle = new Particle(width / 2, 20);
}

function draw() {
  background(255);
  let gravity = createVector(0, 0.1);
  particle.applyForce(gravity);
  particle.update();
  particle.show();

  noStroke();
  fill(0);
  textAlign(LEFT, TOP);
  textSize(12);
  text("ömür " + floor(particle.lifespan), 12, 10);
  stroke(0);
  noFill();
  rect(12, 28, 80, 10);
  noStroke();
  fill(0, particle.lifespan);
  rect(12, 28, map(constrain(particle.lifespan, 0, 255), 0, 255, 0, 80), 10);

  if (particle.isDead()) {
    particle = new Particle(width / 2, 20);
  }
}`,
        },
      ],
    },
    spliceAtla: {
      title: "splice: ileri döngü D’yi atlar",
      files: [
        {
          name: "sketch.js",
          content: `let adim = 0;
let geri = false;

function setup() {
  createCanvas(400, 240);
  textFont("sans-serif");
}

function mousePressed() {
  adim++;
  if (!geri && adim > 5) {
    geri = true;
    adim = 0;
  } else if (geri && adim > 5) {
    geri = false;
    adim = 0;
  }
}

function draw() {
  background(255);
  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, TOP);
  if (!geri) {
    text("İleri i++  ·  tıkla: sonraki i", 12, 8);
  } else {
    text("Geri i--  ·  tıkla: sonraki i", 12, 8);
  }

  let etiket = ["A", "B", "C", "D", "E"];
  let n = etiket.length;
  let iSimdi;
  let silindi = false;
  if (!geri) {
    iSimdi = min(adim, 4);
    silindi = adim >= 3;
  } else {
    iSimdi = 4 - min(adim, 4);
    silindi = adim >= 3;
  }

  let goster = etiket.slice();
  if (silindi) {
    goster = ["A", "B", "D", "E"];
  }

  let y = 88;
  for (let k = 0; k < 5; k++) {
    let x = 36 + k * 70;
    stroke(0);
    noFill();
    rectMode(CENTER);
    square(x, y, 44);
    noStroke();
    fill(80);
    textAlign(CENTER, CENTER);
    textSize(11);
    text("i=" + k, x, y - 36);
    let harf = k < goster.length ? goster[k] : "—";
    fill(0);
    textSize(18);
    text(harf, x, y);
  }

  let isaretX = 36 + iSimdi * 70;
  noFill();
  stroke(180, 0, 0);
  strokeWeight(3);
  square(isaretX, y, 52);
  strokeWeight(1);
  fill(180, 0, 0);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text("kontrol", isaretX, y + 32);

  fill(0);
  textAlign(LEFT, TOP);
  textSize(12);
  if (!geri && silindi && iSimdi === 3) {
    text("C silindi, D rafa 2 kaydı; i=3 artık E. D bu tur atlandı.", 12, 168);
  } else if (geri && silindi && (iSimdi === 2 || iSimdi === 1)) {
    text("C silindi; D yeni i=2’de. Geri döngü D’yi de sorar.", 12, 168);
  } else if (!silindi) {
    text("C hâlâ i=2. Silince sağdakiler sola kayacak.", 12, 168);
  } else {
    text("Kutu: o anki dizi. Kırmızı çerçeve: bu adımdaki i.", 12, 168);
  }
  text("adım " + adim + (geri ? " (geri)" : " (ileri)"), 12, 208);
}`,
        },
      ],
    },
    ex42: {
      title: "Örnek 4.2: Parçacık dizisi",
      original: {
        book: "https://natureofcode.com/particles/#example-42-an-array-of-particles",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/04_particles/4_2_array_particles",
      },
      files: [
        {
          name: "particle.js",
          content: `class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 0));
    this.lifespan = 255;
  }

  run() {
    let gravity = createVector(0, 0.05);
    this.applyForce(gravity);
    this.update();
    this.show();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
    this.acceleration.mult(0);
  }

  show() {
    stroke(0, this.lifespan);
    strokeWeight(2);
    fill(127, this.lifespan);
    circle(this.position.x, this.position.y, 8);
  }

  isDead() {
    return this.lifespan < 0;
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let particles = [];

function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  particles.push(new Particle(width / 2, 20));

  for (let i = particles.length - 1; i >= 0; i--) {
    let particle = particles[i];
    particle.run();
    if (particle.isDead()) {
      particles.splice(i, 1);
    }
  }

  noStroke();
  fill(0);
  textAlign(LEFT, TOP);
  textSize(12);
  text("parçacık " + particles.length, 12, 10);
}`,
        },
      ],
    },
    ex43: {
      title: "Örnek 4.3: Tek yayıcı",
      original: {
        book: "https://natureofcode.com/particles/#example-43-a-single-particle-emitter",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/04_particles/4_3_particle_emitter",
      },
      files: [
        {
          name: "particle.js",
          content: `class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 0));
    this.lifespan = 255;
  }

  run() {
    let gravity = createVector(0, 0.05);
    this.applyForce(gravity);
    this.update();
    this.show();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
    this.acceleration.mult(0);
  }

  show() {
    stroke(0, this.lifespan);
    strokeWeight(2);
    fill(127, this.lifespan);
    circle(this.position.x, this.position.y, 8);
  }

  isDead() {
    return this.lifespan < 0;
  }
}`,
        },
        {
          name: "emitter.js",
          content: `class Emitter {
  constructor(x, y) {
    this.origin = createVector(x, y);
    this.particles = [];
  }

  addParticle() {
    this.particles.push(new Particle(this.origin.x, this.origin.y));
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let particle = this.particles[i];
      particle.run();
      if (particle.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let emitter;

function setup() {
  createCanvas(400, 240);
  emitter = new Emitter(width / 2, 50);
}

function draw() {
  background(255);
  emitter.addParticle();
  emitter.run();
  noStroke();
  fill(0);
  textAlign(LEFT, TOP);
  textSize(12);
  text("yayıcı köken · n=" + emitter.particles.length, 12, 10);
}`,
        },
      ],
    },
    ex44: {
      title: "Örnek 4.4: Sistemin sistemi",
      original: {
        book: "https://natureofcode.com/particles/#example-44-a-system-of-systems",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/04_particles/4_4_multiple_emitters",
      },
      files: [
        {
          name: "particle.js",
          content: `class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 0));
    this.lifespan = 255;
  }

  run() {
    let gravity = createVector(0, 0.05);
    this.applyForce(gravity);
    this.update();
    this.show();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
    this.acceleration.mult(0);
  }

  show() {
    stroke(0, this.lifespan);
    strokeWeight(2);
    fill(127, this.lifespan);
    circle(this.position.x, this.position.y, 8);
  }

  isDead() {
    return this.lifespan < 0;
  }
}`,
        },
        {
          name: "emitter.js",
          content: `class Emitter {
  constructor(x, y) {
    this.origin = createVector(x, y);
    this.particles = [];
  }

  addParticle() {
    this.particles.push(new Particle(this.origin.x, this.origin.y));
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let particle = this.particles[i];
      particle.run();
      if (particle.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let emitters = [];

function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  for (let emitter of emitters) {
    emitter.run();
    emitter.addParticle();
  }
  noStroke();
  fill(0);
  textAlign(LEFT, TOP);
  textSize(12);
  text("tıkla: yeni yayıcı  ·  yayıcı " + emitters.length, 12, 10);
}

function mousePressed() {
  emitters.push(new Emitter(mouseX, mouseY));
}`,
        },
      ],
    },
    hayvanExtends: {
      title: "extends: tek dizi, üç show",
      files: [
        {
          name: "hayvan.js",
          content: `class Hayvan {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    stroke(0);
    fill(180);
    circle(this.x, this.y, 48);
  }
}

class Kopek extends Hayvan {
  constructor(x, y) {
    super(x, y);
  }

  show() {
    super.show();
    fill(80);
    ellipse(this.x - 16, this.y - 22, 14, 20);
    ellipse(this.x + 16, this.y - 22, 14, 20);
    fill(0);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    text("hav", this.x, this.y + 32);
  }
}

class Kedi extends Hayvan {
  constructor(x, y) {
    super(x, y);
  }

  show() {
    stroke(0);
    fill(200);
    circle(this.x, this.y, 48);
    fill(120);
    triangle(this.x - 18, this.y - 8, this.x - 8, this.y - 28, this.x - 2, this.y - 10);
    triangle(this.x + 18, this.y - 8, this.x + 8, this.y - 28, this.x + 2, this.y - 10);
    fill(0);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    text("miyav", this.x, this.y + 32);
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let krallik = [];

function setup() {
  createCanvas(400, 240);
  krallik.push(new Hayvan(70, 110));
  krallik.push(new Kopek(200, 110));
  krallik.push(new Kedi(330, 110));
}

function draw() {
  background(255);
  for (let h of krallik) {
    h.show();
  }
  noStroke();
  fill(0);
  textAlign(LEFT, TOP);
  textSize(12);
  text("tek dizi, tek döngü · class X extends Hayvan", 12, 8);
  text("sol: ebeveyn   orta: köpek (super.show + kulak)   sağ: kedi (ezilmiş show)", 12, 210);
}`,
        },
      ],
    },
    nedenRotate: {
      title: "translate + rotate: konfeti karesi",
      files: [
        {
          name: "sketch.js",
          content: `function setup() {
  createCanvas(400, 240);
  rectMode(CENTER);
}

function draw() {
  background(255);
  let angle = map(mouseX, 0, width, 0, TWO_PI * 2);
  let y = 120;

  stroke(0);
  fill(200);
  square(100, y, 28);
  noStroke();
  fill(0);
  textAlign(CENTER, TOP);
  textSize(11);
  text("rotate yok", 100, y + 28);

  push();
  translate(280, y);
  rotate(angle);
  stroke(0);
  fill(40);
  square(0, 0, 28);
  pop();

  noStroke();
  fill(0);
  textAlign(CENTER, TOP);
  text("push translate rotate pop", 280, y + 28);
  textAlign(LEFT, TOP);
  textSize(12);
  text("fare x → açı  " + round(angle * 100) / 100 + " rad  ·  sağ kare (0,0) etrafında döner", 12, 10);
  stroke(180);
  line(width / 2, 40, width / 2, height - 24);
}`,
        },
      ],
    },
    ex45: {
      title: "Örnek 4.5: Kalıtım ve çok biçimlilik",
      original: {
        book: "https://natureofcode.com/particles/#example-45-a-particle-system-with-inheritance-and-polymorphism",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/04_particles/noc_4_05_particle_system_inheritance_polymorphism",
      },
      files: [
        {
          name: "particle.js",
          content: `class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 0));
    this.lifespan = 255;
  }

  run() {
    let gravity = createVector(0, 0.05);
    this.applyForce(gravity);
    this.update();
    this.show();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
    this.acceleration.mult(0);
  }

  show() {
    stroke(0, this.lifespan);
    strokeWeight(2);
    fill(127, this.lifespan);
    circle(this.position.x, this.position.y, 8);
  }

  isDead() {
    return this.lifespan < 0;
  }
}`,
        },
        {
          name: "confetti.js",
          content: `class Confetti extends Particle {
  constructor(x, y) {
    super(x, y);
  }

  show() {
    let angle = map(this.position.x, 0, width, 0, TWO_PI * 2);
    fill(127, this.lifespan);
    stroke(0, this.lifespan);
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    rectMode(CENTER);
    square(0, 0, 12);
    pop();
  }
}`,
        },
        {
          name: "emitter.js",
          content: `class Emitter {
  constructor(x, y) {
    this.origin = createVector(x, y);
    this.particles = [];
  }

  addParticle() {
    let r = random(1);
    if (r < 0.5) {
      this.particles.push(new Particle(this.origin.x, this.origin.y));
    } else {
      this.particles.push(new Confetti(this.origin.x, this.origin.y));
    }
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let particle = this.particles[i];
      particle.run();
      if (particle.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let emitter;

function setup() {
  createCanvas(400, 240);
  emitter = new Emitter(width / 2, 20);
}

function draw() {
  background(255);
  emitter.addParticle();
  emitter.run();
  noStroke();
  fill(0);
  textAlign(LEFT, TOP);
  textSize(12);
  text("daire Particle · kare Confetti  n=" + emitter.particles.length, 12, 10);
}`,
        },
      ],
    },
    ex46: {
      title: "Örnek 4.6: Kuvvet uygulanan sistem",
      original: {
        book: "https://natureofcode.com/particles/#example-46-a-particle-system-with-forces",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/04_particles/4_6_particle_system_forces",
      },
      files: [
        {
          name: "particle.js",
          content: `class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-2, 0));
    this.lifespan = 255;
    this.mass = 1;
  }

  run() {
    this.update();
    this.show();
  }

  applyForce(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 2;
  }

  show() {
    stroke(0, this.lifespan);
    strokeWeight(2);
    fill(127, this.lifespan);
    circle(this.position.x, this.position.y, 8);
  }

  isDead() {
    return this.lifespan < 0;
  }
}`,
        },
        {
          name: "emitter.js",
          content: `class Emitter {
  constructor(x, y) {
    this.origin = createVector(x, y);
    this.particles = [];
  }

  addParticle() {
    this.particles.push(new Particle(this.origin.x, this.origin.y));
  }

  applyForce(force) {
    for (let particle of this.particles) {
      particle.applyForce(force);
    }
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let particle = this.particles[i];
      particle.run();
      if (particle.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let emitter;

function setup() {
  createCanvas(400, 240);
  emitter = new Emitter(width / 2, 50);
}

function draw() {
  background(255);
  let gravity = createVector(0, 0.1);
  emitter.applyForce(gravity);
  emitter.addParticle();
  emitter.run();
  noStroke();
  fill(0);
  textAlign(LEFT, TOP);
  textSize(12);
  text("yerçekimi (0, 0.1) herkese · n=" + emitter.particles.length, 12, 10);
}`,
        },
      ],
    },
    ex47: {
      title: "Örnek 4.7: İticili sistem",
      original: {
        book: "https://natureofcode.com/particles/#example-47-a-particle-system-with-a-repeller",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/04_particles/example_4_7_particle_system_with_repeller",
      },
      files: [
        {
          name: "particle.js",
          content: `class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 0));
    this.acceleration = createVector(0, 0);
    this.lifespan = 255;
  }

  run() {
    this.update();
    this.show();
  }

  applyForce(f) {
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
    this.acceleration.mult(0);
  }

  show() {
    stroke(0, this.lifespan);
    strokeWeight(2);
    fill(127, this.lifespan);
    circle(this.position.x, this.position.y, 8);
  }

  isDead() {
    return this.lifespan < 0;
  }
}`,
        },
        {
          name: "emitter.js",
          content: `class Emitter {
  constructor(x, y) {
    this.origin = createVector(x, y);
    this.particles = [];
  }

  addParticle() {
    this.particles.push(new Particle(this.origin.x, this.origin.y));
  }

  applyForce(force) {
    for (let particle of this.particles) {
      particle.applyForce(force);
    }
  }

  applyRepeller(repeller) {
    for (let particle of this.particles) {
      let force = repeller.repel(particle);
      particle.applyForce(force);
    }
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let particle = this.particles[i];
      particle.run();
      if (particle.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
}`,
        },
        {
          name: "repeller.js",
          content: `class Repeller {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.power = 150;
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(127);
    circle(this.position.x, this.position.y, 32);
    noStroke();
    fill(0);
    textAlign(CENTER, BOTTOM);
    textSize(11);
    text("itici", this.position.x, this.position.y - 20);
  }

  repel(particle) {
    let force = p5.Vector.sub(this.position, particle.position);
    let distance = force.mag();
    distance = constrain(distance, 5, 50);
    let strength = (-1 * this.power) / (distance * distance);
    force.setMag(strength);
    return force;
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let emitter;
let repeller;

function setup() {
  createCanvas(400, 240);
  emitter = new Emitter(width / 2, 20);
  repeller = new Repeller(width / 2, 170);
}

function draw() {
  background(255);
  emitter.addParticle();
  let gravity = createVector(0, 0.1);
  emitter.applyForce(gravity);
  emitter.applyRepeller(repeller);
  emitter.run();
  repeller.show();
}`,
        },
      ],
    },
    dumanKarsilastir: {
      title: "Şekil 4.7: daire / bulanık doku",
      files: [
        {
          name: "particle.js",
          content: `class Particle {
  constructor(x, y, dokulu) {
    this.position = createVector(x, y);
    let vx = randomGaussian(0, 0.3);
    let vy = randomGaussian(-1, 0.3);
    this.velocity = createVector(vx, vy);
    this.acceleration = createVector(0, 0);
    this.lifespan = 100;
    this.dokulu = dokulu;
  }

  run() {
    this.update();
    this.show();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
    this.acceleration.mult(0);
  }

  show() {
    if (this.dokulu) {
      tint(255, this.lifespan);
      imageMode(CENTER);
      image(img, this.position.x, this.position.y);
    } else {
      noStroke();
      fill(255, this.lifespan);
      circle(this.position.x, this.position.y, 16);
    }
  }

  isDead() {
    return this.lifespan < 0;
  }
}`,
        },
        {
          name: "emitter.js",
          content: `class Emitter {
  constructor(x, y, dokulu) {
    this.origin = createVector(x, y);
    this.particles = [];
    this.dokulu = dokulu;
  }

  addParticle() {
    this.particles.push(
      new Particle(this.origin.x, this.origin.y, this.dokulu)
    );
  }

  applyForce(force) {
    for (let particle of this.particles) {
      particle.applyForce(force);
    }
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].run();
      if (this.particles[i].isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let img;
let sol;
let sag;

function dumanDokusu() {
  let g = createGraphics(32, 32);
  g.pixelDensity(1);
  g.clear();
  g.noStroke();
  for (let i = 16; i > 0; i--) {
    let a = map(i, 16, 0, 0, 70);
    g.fill(255, a);
    g.circle(16, 16, i * 2);
  }
  return g.get();
}

function setup() {
  createCanvas(400, 240);
  img = dumanDokusu();
  sol = new Emitter(100, height - 36, false);
  sag = new Emitter(300, height - 36, true);
}

function draw() {
  background(0);
  let dx = map(mouseX, 0, width, -0.2, 0.2);
  let wind = createVector(dx, 0);
  sol.applyForce(wind);
  sag.applyForce(wind);
  sol.addParticle();
  sag.addParticle();
  sol.run();
  sag.run();
  stroke(80);
  line(width / 2, 0, width / 2, height);
  noStroke();
  fill(255);
  textAlign(CENTER, TOP);
  textSize(12);
  text("daire", 100, 10);
  text("doku (alfa)", 300, 10);
  textAlign(LEFT, TOP);
  text("fare = rüzgâr", 12, 220);
}`,
        },
      ],
    },
    ex48: {
      title: "Örnek 4.8: Doku ile duman",
      original: {
        book: "https://natureofcode.com/particles/#example-48-an-image-texture-particle-system",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/04_particles/example_4_8_image_texture_system_smoke",
      },
      files: [
        {
          name: "particle.js",
          content: `class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    let vx = randomGaussian(0, 0.3);
    let vy = randomGaussian(-1, 0.3);
    this.velocity = createVector(vx, vy);
    this.acceleration = createVector(0, 0);
    this.lifespan = 100;
  }

  run() {
    this.update();
    this.show();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
    this.acceleration.mult(0);
  }

  show() {
    tint(255, this.lifespan);
    imageMode(CENTER);
    image(img, this.position.x, this.position.y);
  }

  isDead() {
    return this.lifespan < 0;
  }
}`,
        },
        {
          name: "emitter.js",
          content: `class Emitter {
  constructor(x, y) {
    this.origin = createVector(x, y);
    this.particles = [];
  }

  addParticle() {
    this.particles.push(new Particle(this.origin.x, this.origin.y));
  }

  applyForce(force) {
    for (let particle of this.particles) {
      particle.applyForce(force);
    }
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].run();
      if (this.particles[i].isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let emitter;
let img;

function dumanDokusu() {
  let g = createGraphics(64, 64);
  g.pixelDensity(1);
  g.clear();
  g.noStroke();
  for (let i = 32; i > 0; i--) {
    let a = map(i, 32, 0, 0, 80);
    g.fill(255, a);
    g.circle(32, 32, i * 2);
  }
  return g.get();
}

function setup() {
  createCanvas(400, 240);
  img = dumanDokusu();
  emitter = new Emitter(width / 2, height - 50);
}

function draw() {
  background(0);
  let dx = map(mouseX, 0, width, -0.2, 0.2);
  let wind = createVector(dx, 0);
  emitter.applyForce(wind);
  emitter.run();
  emitter.addParticle();
  okCiz(wind, createVector(width / 2, 40), 500);
  noStroke();
  fill(255);
  textAlign(LEFT, TOP);
  textSize(12);
  text("fare x = rüzgâr  ·  doku createGraphics (loadImage ile PNG de olur)", 12, 10);
}

function okCiz(v, pos, olcek) {
  push();
  translate(pos.x, pos.y);
  stroke(255);
  rotate(v.heading());
  let len = v.mag() * olcek;
  line(0, 0, len, 0);
  line(len, 0, len - 4, 2);
  line(len, 0, len - 4, -2);
  pop();
}`,
        },
      ],
    },
    ex49: {
      title: "Örnek 4.9: Toplanır karışım (WEBGL)",
      original: {
        book: "https://natureofcode.com/particles/#example-49-additive-blending",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/04_particles/noc_4_08_particle_system_smoke_webgl",
      },
      files: [
        {
          name: "particle.js",
          content: `class Particle {
  constructor(x, y, img) {
    this.pos = createVector(x, y);
    let vx = randomGaussian(0, 0.3);
    let vy = randomGaussian(-1, 0.3);
    this.vel = createVector(vx, vy);
    this.acc = createVector(0, 0);
    this.lifespan = 100;
    this.img = img;
  }

  run() {
    this.update();
    this.show();
  }

  applyForce(f) {
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifespan -= 2.5;
    this.acc.mult(0);
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    texture(this.img);
    tint(255, 100, 255, this.lifespan);
    square(0, 0, 32);
    pop();
  }

  isDead() {
    return this.lifespan <= 0;
  }
}`,
        },
        {
          name: "emitter.js",
          content: `class Emitter {
  constructor(x, y, img) {
    this.origin = createVector(x, y);
    this.particles = [];
    this.img = img;
  }

  addParticle() {
    this.particles.push(
      new Particle(this.origin.x, this.origin.y, this.img)
    );
  }

  applyForce(dir) {
    for (let particle of this.particles) {
      particle.applyForce(dir);
    }
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].run();
      if (this.particles[i].isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let emitter;
let img;

function dumanDokusu() {
  let g = createGraphics(32, 32);
  g.pixelDensity(1);
  g.clear();
  g.noStroke();
  for (let i = 16; i > 0; i--) {
    let a = map(i, 16, 0, 0, 90);
    g.fill(255, a);
    g.circle(16, 16, i * 2);
  }
  return g.get();
}

function setup() {
  createCanvas(400, 240, WEBGL);
  img = dumanDokusu();
  emitter = new Emitter(0, 55, img);
}

function draw() {
  background(0);
  blendMode(ADD);
  let dx = map(mouseX, 0, width, -0.2, 0.2);
  let wind = createVector(dx, 0);
  emitter.applyForce(wind);
  emitter.run();
  for (let i = 0; i < 3; i++) {
    emitter.addParticle();
  }
  okCiz(wind, createVector(0, -90), 500);
}

function okCiz(v, pos, olcek) {
  push();
  translate(pos.x, pos.y);
  stroke(255);
  fill(255);
  rotate(v.heading());
  let len = v.mag() * olcek;
  line(0, 0, len, 0);
  line(len, 0, len - 4, 2);
  line(len, 0, len - 4, -2);
  pop();
}`,
        },
      ],
    },
  },
});
