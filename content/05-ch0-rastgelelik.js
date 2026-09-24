registerChapter({
  id: "ch0",
  title: "0. Rastgelelik",
  short: "0. Rastgelelik",
  icon: "🎲",
  original: "https://natureofcode.com/random/",
  originalCode:
    "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/00_randomness",
  html: `


    <p style="font-style:italic;color:var(--muted);">“Rastgele sayı üretimi, şansa bırakılamayacak kadar önemlidir.” — Robert R. Coveyou</p>

    ${N.img(
      "00_randomness",
      "00_randomness_1.png",
      "Orijinal kitaptaki rastgelelik görseli. 1947’de RAND Corporation, rulet benzeri bir elektronik simülasyonla A Million Random Digits tablosunu basmıştı. Hızlı bilgisayarlar gelince sözde-rastgele (pseudorandom) üretmek tablodan okumaktan hızlı oldu."
    )}

    <p>Burası kitabın başı. JavaScript veya matematik unuttuysanız bu bölüm zihni ısıtır. Simülasyonun ilk aletleri: rastgele sayılar, dağılımlar, gürültü (noise). Dizinin sıfırıncı elemanı.</p>
    <p>Bölüm 1 vektörü getirecek. Ondan önce: dijital tuvalde hareket ne demek? En ünlü basit model: <strong>rastgele yürüyüş</strong> (random walk).</p>

    ${N.note(
      "Bu bölümün çıktısı",
      `<ul>
        <li><code>class</code> ile hareket eden bir nesne yazmak</li>
        <li><code>random()</code>’un adil zar olduğunu, her zaman istemediğinizi görmek</li>
        <li>Olasılığı koda çevirmek (yüzde 40 sağa)</li>
        <li>Gaussian (çan eğrisi) ile Perlin (organik) farkını çizmek</li>
      </ul>`
    )}

    <h2>Rastgele yürüyüşler</h2>

    <p>Denge tahtasının ortasındasınız. Her 10 saniyede bir yazı-tura: yazı ileri, tura geri. Bu bir rastgele yürüyüş: rastgele adımlardan oluşan yol. Tahtadan inip yere geçerseniz dört yön olur. Dört seçenek için aynı madeni parayı iki kez atabilirsiniz:</p>
    <table class="data">
      <thead><tr><th>1. atış</th><th>2. atış</th><th>Sonuç</th></tr></thead>
      <tbody>
        <tr><td>Yazı</td><td>Yazı</td><td>İleri</td></tr>
        <tr><td>Yazı</td><td>Tura</td><td>Sağ</td></tr>
        <tr><td>Tura</td><td>Yazı</td><td>Sol</td></tr>
        <tr><td>Tura</td><td>Tura</td><td>Geri</td></tr>
      </tbody>
    </table>
    <p>Algoritma kaba görünür; gazdaki molekül, hayvanın yiyecek araması, kumarhanedeki kumarbaz hep buna yaklaşır. Kitap bunu üç yüzden seçer:</p>
    <ol>
      <li>Nesne yönelimli programlamayı (OOP) hatırlatmak — Walker, hareket eden şeylerin kalıbı olacak.</li>
      <li>Kitabın iki sorusunu başlatmak: “Kurallar nedir?” ve “Kurallar koda nasıl girer?”</li>
      <li>Rastgelelik, olasılık ve Perlin’i ileride lazım olacak kadar göstermek.</li>
    </ol>
    ${N.warn(
      "OOP’ye ilk kez bakıyorsanız",
      `<p>Orijinal kitap Coding Train’deki Objects bölümüne dönmenizi söyler. Sizde <a href="#/js">JavaScript · class</a> sayfası da var. <code>this</code> bulanıksa önce oraya gidin.</p>`
    )}

    <h2>Walker sınıfı</h2>

    <p>JavaScript’te nesne: veri + iş. Walker’ın verisi tuvaldeki konum; işi çizmek ve adım atmak.</p>
    <p>Sınıf kalıptır (kurabiye kalıbı). Nesne kalıptan çıkan kurabiyedir. <code>constructor()</code> nesnenin <code>setup()</code>’ıdır: ilk özellikler. Konumu canvas ortası yaparız:</p>
    <p><code>this.x = width / 2;</code> — <code>this</code> “bu nesneye ait” demek. Unutmayın.</p>
    <p>Sınıf içindeki fonksiyonlara <strong>metot</strong> denir. <code>show()</code> siyah nokta çizer. <code>step()</code> adımı seçer.</p>
    <p>Dört komşu piksel: sağ <code>x++</code>, sol <code>x--</code>, aşağı <code>y++</code>, yukarı <code>y--</code> (y ekranda aşağı artar). p5’te yazı-tura yerine <code>random()</code>:</p>
    ${N.math("floor(random(4))", "p5.js <code>random(4)</code> 0 ile 4 arası üretir, 4 çıkmaz. <code>floor</code> virgülü keser: 0, 1, 2 veya 3.")}
    ${N.note(
      "floor neden var?",
      `<p><code>random(4)</code> ondalıklı üretir: 0.02, 3.99… <code>floor</code> virgülü keser. 3.99 → 3. Dört kova: 0, 1, 2, 3. <code>if (choice === 0)</code> gibi dallar bu tam sayılara bakar.</p>`
    )}

    <h3>Kodlama alışkanlıkları (kitaptan)</h3>

    <p>JavaScript’te <code>let</code> / <code>const</code>. Tipik tavsiye: önce <code>const</code>, gerekince <code>let</code>. Shiffman p5 örneklerinde her şeyi <code>let</code> yazar; yeni başlayanı dağıtmamak için. Eşitlikte <code>===</code> (değer + tip). <code>3 === "3"</code> yanlıştır; <code>==</code> bazen şaşırtır.</p>

    <h3>Örnek 0.1: Klasik rastgele yürüyüş</h3>

    <p>Global <code>let walker;</code>, <code>setup</code> içinde <code>new Walker()</code>. <code>draw</code> her kare <code>step</code> ve <code>show</code> çağırır. Arka plan <code>setup</code>’ta bir kez boyanır; iz kalır.</p>
    ${N.editor("ex01")}
    ${N.tryit([
      { do: "point yerine circle(this.x, this.y, 8) yazın.", expect: "İz kalınlaşır; yürüyüş daha okunur." },
      { do: "background(255) satırını draw’un başına taşıyın.", expect: "İz silinir; sadece anlık nokta kalır. Kitap iz istiyor." },
    ])}

    ${N.img(
      "00_randomness",
      "00_randomness_2.png",
      "Şekil 0.1 fikri: walker sadece dört yöne veya çapraz komşulara (sekiz, durmakla dokuz) adım atabilir."
    )}
    <p>Dokuz seçenek için 0–8 zar atılabilir. Başka yol: x için −1, 0, 1 ve y için −1, 0, 1:</p>
    <p><code>let xstep = floor(random(3)) - 1;</code> → −1, 0 veya 1.</p>
    <p>Daha da ileri: <code>floor</code>’u atın, <code>random(-1, 1)</code> ile sürekli adım boyu. Ortak nokta: her yön eşit olasılıklı. Dört yönde yüzde 25. Bu, <code>random()</code>’un <strong>düzgün dağılımı</strong>dır (uniform).</p>

    <p>Dokuz seçenek için 0–8 zar atılabilir. Başka yol: x için −1, 0, 1 ve y için −1, 0, 1. Aşağıdaki sketch aynı Walker; yalnızca <code>step</code> değişir.</p>
    ${N.editor("diag")}

    <h3>Örnek 0.2: Rastgele sayı dağılımı</h3>

    <p>Her rastgele seçimi sayıp çubuk grafik çizersek dağılımı görürüz. Az denemede çubuklar biraz farklı boydadır; iyi bir üreteçte uzun vadede düzelir.</p>
    ${N.editor("ex02")}

    <h3>Sözde-rastgele sayılar</h3>

    <p><code>random()</code> gerçek rastgele değildir; matematiksel bir işlev rastgele <em>gibi</em> davranır. Çok uzun vadede örüntü çıkar ama bu kitap için yeterince rastgeledir.</p>

    ${N.note(
      "Alıştırma 0.1 (orijinal)",
      `<p>Aşağı ve sağa gitme eğilimi daha yüksek bir walker yazın. Kısmi çözüm bir sonraki bölümde.</p>
      <p><a href="https://natureofcode.com/random/#exercise-01" target="_blank" rel="noopener">Exercise 0.1</a></p>`
    )}

    <h2>Olasılık ve düzgün olmayan dağılımlar</h2>

    <p>Doğaya benzeyen simülasyonda “her şey eşit rastgele” çoğu zaman düşüncesiz çözümdür. Daireleri rastgele yere, rastgele boya saçmak öğrenirken iyidir; doğa modeli için terazinin bir kefesine basmak gerekir.</p>
    <p>Bölüm 9’daki genetik algoritmada “hangi maymun üresin?” sorusu çıkar. En uygun olanın seçilme ihtimali daha yüksek olmalıdır: en güçlünün olasılığı.</p>

    <h3>Tek olay</h3>
    <p>Her sonuç eşitse: olayın olasılığı = uygun sonuç / tüm sonuç. Yazı-tura: 1/2. 52 karttan as: 4/52 ≈ yüzde 8. Karo: 13/52 = yüzde 25.</p>
    <p>Ardışık bağımsız olaylar: olasılıklar çarpılır. Üç kez yazı: (1/2)³ = 1/8 = yüzde 12.5. 500 üçlü atışta kabaca 63 kez “üç yazı” beklersiniz.</p>
    ${N.note(
      "Alıştırma 0.2 (orijinal) — cevap kitapta",
      `<p>52 karttan üst üste iki as. Karıştırarak: 4/52 × 4/52 ≈ yüzde 0.6. Karıştırmadan: 4/52 × 3/51 ≈ yüzde 0.45.</p>
      <p><a href="https://natureofcode.com/random/#exercise-02" target="_blank" rel="noopener">Exercise 0.2</a></p>`
    )}
    ${N.quiz(
      "Adil dörtlü zarda walker’ın ‘sağa’ gitme olasılığı nedir?",
      ["yüzde 10", "yüzde 25", "yüzde 50"],
      1,
      "Dört eşit yön, biri sağ. 1/4."
    )}

    <p>Düzgün olmayan dağılım için iki numara:</p>
    <ol>
      <li>Dizide bazı sayıları tekrar et: <code>[1, 1, 2, 3, 3]</code> — 1 ve 3 yüzde 40, 2 yüzde 20.</li>
      <li><code>random(1)</code> al, aralığa bak. <code>if (r &lt; 0.1)</code> yüzde 10 şarkı söyle.</li>
    </ol>
    <p>Şarkı yüzde 60, dans 10, uyku 30: 0–0.6 / 0.6–0.7 / 0.7–1.0.</p>
    ${N.note(
      "0–1 cetveli",
      `<p>Zihinde bir cetvel: 0 sol, 1 sağ. Olaylar cetveli dilimlere böler. <code>random(1)</code> bir iğne batırır. Hangi dilime düştüyse o olay olur.</p>`
    )}
    ${N.editor("agirlik")}

    <h3>Örnek 0.3: Sağa meyilli walker</h3>

    <p>Dört yön eşit değil: sağ <strong>%40</strong>, sol %20, aşağı %20, yukarı %20. Cetvel yine 0–1:</p>
    <ul>
      <li><code>r &lt; 0.4</code> → sağ (<code>x++</code>) — ilk ve en geniş dilim</li>
      <li><code>else if (r &lt; 0.6)</code> → sol — aslında 0.4–0.6, yani %20</li>
      <li><code>else if (r &lt; 0.8)</code> → aşağı — %20</li>
      <li><code>else</code> → yukarı — kalan %20</li>
    </ul>
    <p>Sağ, soldan iki kat sık. Uzun vadede iz sağa kayar; “rastgele” olsa da terazinin bir kefesi ağırdır.</p>

    <h4>Kenardan düşünce ne olur?</h4>
    <p>Tuval 400×240 ise çizilebilir x değerleri <strong>0, 1, …, 399</strong>’dur. <code>width</code> 400’dür; <code>x = 400</code> tuvalin <em>bir piksel sağında</em>dır. Kod çalışmaya devam eder, <code>point</code> oraya basar, siz görmezsiniz. Walker “silindi” sanırsınız — kayboldu, öldü değil, ekranın dışında.</p>
    <p>Sadece %40 sağa giden biri er geç o sınıra gelir. İki çare vardır:</p>
    <ul>
      <li><strong>Yapış (clamp):</strong> <code>constrain(this.x, 0, width - 1)</code> — x 0’ın altına veya 399’un üstüne gitmesin. Duvara değer, orada sürünür.</li>
      <li><strong>Dolan (wrap):</strong> <code>(x + width) % width</code> — sağdan çıkınca soldan girer. Matematik sayfasındaki gemi.</li>
    </ul>
    <p>Kitap burada yapışmayı seçer. <code>constrain</code>’in üç durumu <a href="#/p5">p5.js · constrain</a> sayfasında; eşdeğeri:</p>
    <p><code>if (this.x &lt; 0) this.x = 0;</code><br>
    <code>if (this.x &gt; width - 1) this.x = width - 1;</code><br>
    <code>y</code> için aynı, <code>height - 1</code>.</p>
    <p>Kırmızı iz <code>constrain</code> yok: sağa kaçıp kaybolur. Siyah iz var: sağ kenarda yığılır.</p>
    ${N.editor("ex03kenar")}
    ${N.tryit([
      { do: "Yarım dakika bekleyin.", expect: "Kırmızı sağda biter; siyah sağ çizgide kalır." },
    ])}

    <p>Örnek 0.3’ün kitaptaki hali — tek walker, kenar kilitli:</p>
    ${N.editor("ex03")}
    ${N.tryit([
      { do: "0.4 yerine 0.7 yazın.", expect: "Sağ dilim %70; iz daha çabuk sağ kenara yapışır." },
      { do: "İki constrain satırını silin.", expect: "Bir süre sonra iz sağdan (veya üst/alt) kaybolur." },
    ])}
    ${N.note(
      "Alıştırma 0.3 (orijinal)",
      `<p>Dinamik olasılık: örneğin yüzde 50 fareye doğru. <code>mouseX</code>, <code>mouseY</code> kullanın.</p>
      <p><a href="https://natureofcode.com/random/#exercise-03" target="_blank" rel="noopener">Exercise 0.3</a></p>`
    )}
    <p>Fareye doğru adım: x fareden küçükse <code>x++</code>, büyükse <code>x--</code>. Bunu yüzde 50 dalına koyun; diğer yüzde 50 klasik rastgele kalsın.</p>
    ${N.editor("ex03b")}

    <h2>Normal (Gaussian) dağılım</h2>

    <p>Bin maymun, boy 200–300: <code>random(200, 300)</code> her boyu eşit sever. Gerçek kaldırımda çoğu insan ortalamaya yakındır; çok uzun/kısa seyrek. Buna <strong>normal dağılım</strong> (Gauss, çan eğrisi) denir. Ortalama μ, standart sapma σ.</p>
    ${N.img(
      "00_randomness",
      "00_randomness_3.png",
      "Şekil 0.2 civarı: düşük standart sapmada değerler ortalamaya yığılır."
    )}
    ${N.img(
      "00_randomness",
      "00_randomness_4.png",
      "Yüksek standart sapmada değerler daha yayılır. Yine de çan biçimi bozulmaz."
    )}
    <p>Kural: değerlerin yüzde 68’i ortalamanın ±1 sapmasında, 95’i ±2, 99.7’si ±3 içindedir. Ortalama 250, sapma 5 ise neredeyse kimse 235’in altında veya 265’in üstünde değildir.</p>
    <p>p5’te hesabı <code>randomGaussian()</code> yapar. Argsız: ortalama 0, sapma 1 (standart normal). İki argüman: önce ortalama, sonra sapma. <code>randomGaussian(320, 60)</code> ≡ <code>60 * randomGaussian() + 320</code>.</p>

    <h3>Örnek 0.4: Gaussian dağılım</h3>

    <p>Saydam daireler üst üste: orta karanlık (çok örnek), kenarlar seyrek.</p>
    ${N.editor("ex04")}
    ${N.note(
      "Alıştırma 0.4 ve 0.5 (orijinal)",
      `<p>0.4: Boya sıçraması — konum ve belki renk Gaussian; kaydırıcı ile sapmayı ayarlayın.<br>
      0.5: Gaussian random walk — adım boyu normal dağılımdan.</p>
      <p><a href="https://natureofcode.com/random/#exercise-04" target="_blank" rel="noopener">0.4</a> ·
      <a href="https://natureofcode.com/random/#exercise-05" target="_blank" rel="noopener">0.5</a></p>`
    )}
    <p>Boya sıçraması: ortalama canvas ortası. x ve y için ayrı Gaussian. Rengi de dar bir Gaussian ile deneyin.</p>
    ${N.editor("paint")}
    ${N.tryit([
      { do: "randomGaussian ikinci argümanını 12 yapın (sapma).", expect: "Leke ortaya yığılır." },
      { do: "Aynı sayıyı 90 yapın.", expect: "Sıçrama tüm tuvale yayılır." },
    ])}

    <h2>Özel dağılım: kabul-red</h2>

    <p>Yiyecek arayan walker aynı yerleri tekrar tekrar ezer (oversampling). Ara sıra <strong>çok büyük adım</strong> (Lévy uçuşu fikri): uzun adım seyrek, kısa adım sık.</p>
    <p>Kaba hali: yüzde 1 ile <code>random(-100, 100)</code>, yüzde 99 ile <code>random(-1, 1)</code>. Daha genel kural: sayı büyüdükçe seçilme ihtimali artsın, y = x eğrisi (Şekil 0.3).</p>
    ${N.img(
      "00_randomness",
      "00_randomness_5.png",
      "Şekil 0.3 fikri: y = x. x rastgele aday, y onun kabul olasılığı."
    )}
    <ol>
      <li>r1 rastgele (0–1).</li>
      <li>Kabul olasılığı p = r1 (veya başka formül).</li>
      <li>r2 rastgele.</li>
      <li>r2 &lt; p ise r1’i kullan; değilse başa dön.</li>
    </ol>
    <p>r1 = 0.1 ise yüzde 10 kabul. r1 = 0.83 ise yüzde 83. Monte Carlo / accept-reject. Verimsiz olabilir (çok red). Bölüm 9 daha iyi seçim gösterecek.</p>

    <h3>Örnek 0.5: Accept-reject dağılımı</h3>

    ${N.editor("ex05")}
    ${N.note(
      "Alıştırma 0.6 (orijinal)",
      `<p>Adım boyunu özel dağılımla değiştirin. Olasılığı karesine (y = x²) bağlayabilir misiniz?</p>
      <p><a href="https://natureofcode.com/random/#exercise-06" target="_blank" rel="noopener">Exercise 0.6</a></p>`
    )}

    <h2>Daha pürüzsüz: Perlin gürültüsü</h2>

    <p>İyi rastgele üreteçte ardışık sayıların ilişkisi yoktur; grafik tırtıklıdır. Doğa öyle yürümez. Ken Perlin 1980’lerde <em>Tron</em> üzerinde düzgün gürültü düşündü (1983, sonra teknik Oscar). Bulut, arazi, mermer dokusu. p5 <code>noise()</code> Perlin’den esinlenir ama tam kopyası değildir (value noise ailesi, gerçek zaman için).</p>
    ${N.img(
      "00_randomness",
      "00_randomness_6.png",
      "Şekil 0.4 civarı: solda zamanla Perlin (pürüzsüz), sağda random (pürüzlü)."
    )}
    ${N.img(
      "00_randomness",
      "00_randomness_7.png",
      "Orijinal kitaptaki gürültü karşılaştırmasının diğer paneli."
    )}
    ${N.warn(
      "noise(0, width) YANLIŞ",
      `<p><code>random(0, width)</code> bir aralık ister. <code>noise</code> aralık değil, <strong>uzayda konum</strong> ister: <code>noise(t)</code> 0–1 arası bir yükseklik döner. Siz <code>map(noise(t), 0, 1, 0, width)</code> ile piksele çevirirsiniz. t’yi her kare biraz artırırsınız (0.01 gibi). İki walker için farklı t ofsetleri (0 ve 10000) kullanın ki x ve y aynı dalgayı kopyalamasın.</p>`
    )}

    <h3>Örnek 0.6: Perlin noise walker</h3>

    ${N.editor("ex06")}
    ${N.tryit([
      { do: "tx += 0.01 yerine 0.05 yapın.", expect: "Hareket daha sinirli; hâlâ random kadar çılgın değil." },
      { do: "noise yerine random kullanın (map’i kaldırıp random(width)).", expect: "Organiklik kaybolur; zıplama." },
    ])}
    ${N.note(
      "Alıştırma 0.7 (orijinal)",
      `<p>Perlin walker’ın adımını veya görünümünü değiştirin; kitap sitesindeki çözüme bakmadan deneyin.</p>
      <p><a href="https://natureofcode.com/random/#exercise-07" target="_blank" rel="noopener">Exercise 0.7</a></p>`
    )}

    <h2>İki boyutlu gürültü</h2>

    <p><code>noise(xoff, yoff)</code> bir tepe haritası gibidir. Her pikselin parlaklığı o noktadaki gürültü. xoff ve yoff’u 0.01 gibi küçük artırın; 1 artırırsanız komşu pikseller ilişkisizleşir, mermer bozulur.</p>
    ${N.editor("noise2d")}
    ${N.img(
      "00_randomness",
      "00_randomness_8.png",
      "Orijinal kitaptaki 2D noise / doku görseli."
    )}

    <h3>Noise ayrıntısı</h3>

    <p><code>noiseDetail(lod, falloff)</code> oktav (üst üste binen katman) sayısını ve her katmanın etkisini ayarlar. Daha fazla oktav: daha fazla ince ayrıntı, daha pahalı hesap.</p>
    ${N.img(
      "00_randomness",
      "00_randomness_9.png",
      "Orijinal kitaptaki noise detail / akış alanı ile ilgili görsel."
    )}
    ${N.note(
      "Alıştırmalar 0.8–0.10 (orijinal)",
      `<p>2D noise parametreleri, animasyonlu gürültü, noise arazi. Çözüm klasörleri GitHub’da <code>exercise_0_*</code> adıyla durur.</p>
      <p><a href="https://natureofcode.com/random/#exercise-08" target="_blank" rel="noopener">0.8</a> ·
      <a href="https://natureofcode.com/random/#exercise-09" target="_blank" rel="noopener">0.9</a> ·
      <a href="https://natureofcode.com/random/#exercise-010" target="_blank" rel="noopener">0.10</a></p>`
    )}

    <h2>Ekosistem projesi</h2>

    <p>Her bölümün sonunda Shiffman aynı dünyayı büyütmenizi ister. Şimdilik: tuvalde rastgele (ama düşünülmüş) hareket eden yaratıklar. Düzgün walker, sağa meyilli walker, Gaussian sıçrama, Perlin süzülme — dördünü aynı sahnede toplayın.</p>
    <p>Düşman “sarhoş yürüyüşü”, savrulan yaprak, ekran sarsıntısı, yordamsal zemin bu bölümün aletleridir. p5.play’de <code>sprite.x += random(-1, 1)</code> yazmak kolaydır; yüzde 40 sağ seçmenin anlamını burada gördünüz.</p>

    <h2>Birkaç soru daha</h2>
    ${N.quiz(
      "noise(t) çıktısını neden random(width) gibi kullanamayız?",
      [
        "noise her zaman negatif döner",
        "noise 0–1 aralığında bir yükseklik verir; aralık değil konum ister",
        "noise yalnızca setup içinde çalışır",
      ],
      1,
      "t uzaydaki (veya zamandaki) noktadır. Çıktıyı map ile piksele çevirirsiniz."
    )}
    ${N.quiz(
      "Walker her kare draw içinde background(255) çağırırsa ne olur?",
      [
        "İz birikir, yürüyüş görünür",
        "Önceki noktalar silinir, yalnızca anlık konum kalır",
        "random() çalışmayı durdurur",
      ],
      1,
      "Kitap iz için boyamayı setup’a koyar."
    )}

    <h2>Bu bölümün özeti</h2>
    <ul>
      <li><code>random</code> düzgün dağılım üretir; doğa çoğu zaman düzgün değildir.</li>
      <li>Olasılık: cetveli dilimle (<code>random(1)</code> + eşikler) veya dizide tekrar et.</li>
      <li>Gaussian: ortalama etrafında yığılma — <code>randomGaussian(mu, sigma)</code>.</li>
      <li>Accept-reject: kendi eğriniz; yavaş olabilir.</li>
      <li>Perlin / <code>noise(t)</code>: zamanı yavaş ilerletin, çıktıyı <code>map</code> edin.</li>
    </ul>

    ${N.resources([
      { kind: "Kitap", title: "Chapter 0 · Randomness", url: "https://natureofcode.com/random/" },
      { kind: "Kod", title: "00_randomness örnekleri", url: "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/00_randomness" },
      { kind: "Video", title: "Coding Train · Random Walks", url: "https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/randomness/1-random-walks" },
      { kind: "Video", title: "Coding Train · Gaussian", url: "https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/randomness/3-normal-distribution" },
      { kind: "Video", title: "Coding Train · Perlin Noise", url: "https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/randomness/5-perlin-noise" },
      { kind: "Yazı", title: "Wikipedia · Random walk (TR)", url: "https://tr.wikipedia.org/wiki/Rassal_y%C3%BCr%C3%BCy%C3%BC%C5%9F" },
    ])}
  `,
  editors: {
    ex01: {
      title: "Örnek 0.1: Klasik rastgele yürüyüş",
      original: {
        book: "https://natureofcode.com/random/#example-01-a-traditional-random-walk",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/00_randomness/example_i_1_random_walk_traditional",
      },
      files: [
        {
          name: "sketch.js",
          content: `let walker;

function setup() {
  createCanvas(400, 240);
  walker = new Walker();
  background(255);
}

function draw() {
  walker.step();
  walker.show();
}

class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }

  show() {
    stroke(0);
    strokeWeight(3);
    point(this.x, this.y);
  }

  step() {
    let choice = floor(random(4));
    if (choice === 0) {
      this.x++;
    } else if (choice === 1) {
      this.x--;
    } else if (choice === 2) {
      this.y++;
    } else {
      this.y--;
    }
  }
}`,
        },
      ],
    },
    diag: {
      title: "Dokuz komşu (çapraz + dur)",
      extra: true,
      original: {
        book: "https://natureofcode.com/random/#example-01-a-traditional-random-walk",
      },
      files: [
        {
          name: "sketch.js",
          content: `let walker;

function setup() {
  createCanvas(400, 240);
  walker = new Walker();
  background(255);
}

function draw() {
  walker.step();
  walker.show();
}

class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }

  show() {
    stroke(0);
    strokeWeight(3);
    point(this.x, this.y);
  }

  step() {
    let xstep = floor(random(3)) - 1;
    let ystep = floor(random(3)) - 1;
    this.x += xstep;
    this.y += ystep;
  }
}`,
        },
      ],
    },
    ex02: {
      title: "Örnek 0.2: Rastgele sayı dağılımı",
      original: {
        book: "https://natureofcode.com/random/#example-02-a-random-number-distribution",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/00_randomness/example_i_2_random_distribution",
      },
      files: [
        {
          name: "sketch.js",
          content: `let randomCounts = [];
let total = 20;

function setup() {
  createCanvas(400, 240);
  for (let i = 0; i < total; i++) {
    randomCounts[i] = 0;
  }
}

function draw() {
  background(255);
  let index = floor(random(total));
  randomCounts[index]++;
  stroke(0);
  strokeWeight(2);
  fill(127);
  let w = width / randomCounts.length;
  for (let x = 0; x < randomCounts.length; x++) {
    rect(x * w, height - randomCounts[x], w - 1, randomCounts[x]);
  }
}`,
        },
      ],
    },
    agirlik: {
      title: "Yüzde 60 / 10 / 30 — çubuklar",
      original: {
        book: "https://natureofcode.com/random/#probability-and-nonuniform-distributions",
      },
      files: [{ name: "sketch.js", content: `let counts = [0, 0, 0];
let ad = ["şarkı %60", "dans %10", "uyku %30"];

function setup() {
  createCanvas(400, 240);
}

function draw() {
  let r = random(1);
  if (r < 0.6) counts[0]++;
  else if (r < 0.7) counts[1]++;
  else counts[2]++;
  background(255);
  let t = counts[0] + counts[1] + counts[2];
  let w = 90;
  for (let i = 0; i < 3; i++) {
    let h = (counts[i] / t) * 160;
    fill(40 + i * 50, 110, 180);
    noStroke();
    rect(50 + i * 120, height - 40 - h, w, h);
    fill(20);
    text(ad[i], 50 + i * 120, height - 22);
    text("%" + nf((100 * counts[i]) / t, 1, 1), 50 + i * 120, height - 48 - h);
  }
}` }],
    },
    ex03kenar: {
      title: "Kırmızı kaçıyor, siyah yapışıyor",
      files: [{ name: "sketch.js", content: `let kirmizi, siyah;

function setup() {
  createCanvas(400, 240);
  kirmizi = new Walker(false);
  siyah = new Walker(true);
  background(255);
}

function draw() {
  kirmizi.step();
  siyah.step();
  kirmizi.show(200, 40, 40);
  siyah.show(20, 20, 20);
  noStroke();
  fill(20);
  text("kırmızı: constrain yok    siyah: var", 12, 20);
}

class Walker {
  constructor(kilit) {
    this.x = width / 2;
    this.y = height / 2;
    this.kilit = kilit;
  }

  show(k, ysl, m) {
    stroke(k, ysl, m, 90);
    strokeWeight(3);
    point(this.x, this.y);
  }

  step() {
    let r = random(1);
    if (r < 0.4) this.x++;
    else if (r < 0.6) this.x--;
    else if (r < 0.8) this.y++;
    else this.y--;
    if (this.kilit) {
      this.x = constrain(this.x, 0, width - 1);
      this.y = constrain(this.y, 0, height - 1);
    }
  }
}` }],
    },
    ex03: {
      original: {
        book: "https://natureofcode.com/random/#example-03-a-walker-that-tends-to-move-to-the-right",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/00_randomness/example_i_3_random_walk_tends_to_right",
      },
      files: [
        {
          name: "sketch.js",
          content: `let walker;

function setup() {
  createCanvas(400, 240);
  walker = new Walker();
  background(255);
}

function draw() {
  walker.step();
  walker.show();
}

class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }

  show() {
    stroke(0);
    strokeWeight(3);
    point(this.x, this.y);
  }

  step() {
    let r = random(1);
    if (r < 0.4) {
      this.x++;
    } else if (r < 0.6) {
      this.x--;
    } else if (r < 0.8) {
      this.y++;
    } else {
      this.y--;
    }
    this.x = constrain(this.x, 0, width - 1);
    this.y = constrain(this.y, 0, height - 1);
  }
}`,
        },
      ],
    },
    ex03b: {
      title: "Alıştırma 0.3 iskelesi: yarı yarıya fareye",
      extra: true,
      original: {
        book: "https://natureofcode.com/random/#exercise-03",
      },
      files: [
        {
          name: "sketch.js",
          content: `let walker;

function setup() {
  createCanvas(400, 240);
  walker = new Walker();
  background(255);
}

function draw() {
  walker.step();
  walker.show();
}

class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }

  show() {
    stroke(0, 80);
    strokeWeight(3);
    point(this.x, this.y);
  }

  step() {
    if (random(1) < 0.5) {
      if (this.x < mouseX) this.x++;
      else this.x--;
      if (this.y < mouseY) this.y++;
      else this.y--;
    } else {
      this.x += floor(random(3)) - 1;
      this.y += floor(random(3)) - 1;
    }
    this.x = constrain(this.x, 0, width - 1);
    this.y = constrain(this.y, 0, height - 1);
  }
}`,
        },
      ],
    },
    ex04: {
      title: "Örnek 0.4: Gaussian dağılım",
      original: {
        book: "https://natureofcode.com/random/#example-04-a-gaussian-distribution",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/00_randomness/example_i_4_gaussian_distribution",
      },
      files: [
        {
          name: "sketch.js",
          content: `function setup() {
  createCanvas(400, 240);
  background(255);
}

function draw() {
  let x = randomGaussian(width / 2, 60);
  noStroke();
  fill(0, 10);
  circle(x, 120, 16);
}`,
        },
      ],
    },
    paint: {
      title: "Boya sıçraması (alıştırma 0.4)",
      extra: true,
      original: {
        book: "https://natureofcode.com/random/#exercise-04",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/00_randomness/exercise_0_4_solution_paint_splatter",
      },
      files: [
        {
          name: "sketch.js",
          content: `function setup() {
  createCanvas(400, 240);
  background(255);
}

function draw() {
  let x = randomGaussian(width / 2, 40);
  let y = randomGaussian(height / 2, 24);
  let gray = randomGaussian(80, 40);
  noStroke();
  fill(constrain(gray, 0, 200), 40, 40, 80);
  circle(x, y, 12);
}`,
        },
      ],
    },
    ex05: {
      title: "Örnek 0.5: Accept-reject",
      original: {
        book: "https://natureofcode.com/random/#example-05-an-accept-reject-distribution",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/00_randomness/example_i_5_accept_reject_distribution",
      },
      files: [
        {
          name: "sketch.js",
          content: `let randomCounts = [];

function setup() {
  createCanvas(400, 240);
  for (let i = 0; i < 20; i++) {
    randomCounts[i] = 0;
  }
}

function draw() {
  background(255);
  let index = int(acceptreject() * randomCounts.length);
  randomCounts[index]++;
  stroke(0);
  strokeWeight(2);
  fill(127);
  let w = width / randomCounts.length;
  for (let x = 0; x < randomCounts.length; x++) {
    rect(x * w, height - randomCounts[x], w - 1, randomCounts[x]);
  }
}

function acceptreject() {
  while (true) {
    let r1 = random(1);
    let probability = r1;
    let r2 = random(1);
    if (r2 < probability) {
      return r1;
    }
  }
}`,
        },
      ],
    },
    ex06: {
      title: "Örnek 0.6: Perlin noise walker",
      original: {
        book: "https://natureofcode.com/random/#example-06-a-perlin-noise-walker",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/00_randomness/example_i_6_perlin_noise_walker",
      },
      files: [
        {
          name: "sketch.js",
          content: `let walker;

function setup() {
  createCanvas(400, 240);
  walker = new Walker();
  background(255);
}

function draw() {
  walker.step();
  walker.show();
}

class Walker {
  constructor() {
    this.tx = 0;
    this.ty = 10000;
  }

  step() {
    this.x = map(noise(this.tx), 0, 1, 0, width);
    this.y = map(noise(this.ty), 0, 1, 0, height);
    this.tx += 0.01;
    this.ty += 0.01;
  }

  show() {
    strokeWeight(2);
    fill(127);
    stroke(0);
    circle(this.x, this.y, 48);
  }
}`,
        },
      ],
    },
    noise2d: {
      title: "2D Perlin: parlaklık haritası",
      original: {
        book: "https://natureofcode.com/random/#two-dimensional-noise",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/00_randomness/figure_i_noise_2_d",
      },
      files: [
        {
          name: "sketch.js",
          content: `function setup() {
  createCanvas(400, 240);
  loadPixels();
  let xoff = 0.0;
  for (let x = 0; x < width; x++) {
    let yoff = 0.0;
    for (let y = 0; y < height; y++) {
      let bright = map(noise(xoff, yoff), 0, 1, 0, 255);
      set(x, y, floor(bright));
      yoff += 0.01;
    }
    xoff += 0.01;
  }
  updatePixels();
}

function draw() {}`,
        },
      ],
    },
  },
});
