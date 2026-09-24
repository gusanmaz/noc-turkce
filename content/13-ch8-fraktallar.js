registerChapter({
  id: "ch8",
  title: "8. Fraktallar",
  short: "8. Fraktallar",
  icon: "🌿",
  original: "https://natureofcode.com/fractals/",
  originalCode:
    "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/08_fractals",
  html: `
    <p style="font-style:italic;color:var(--muted);">“Patolojik canavarlar!” diye bağırdı dehşete düşmüş matematikçi… soğuk bir kasım günü Benoit Mandelbrot doğdu. — Jonathan Coulton, “Mandelbrot Set”</p>

    ${N.img(
      "08_fractals",
      "08_fractals_1.png",
      "Chakri Maha Prasat Holü, Bangkok, Tayland (fotoğraf: Saad Akhtar). Kat kat çatı: her kat, bir küçük veya bir büyük kopya. Budist evrenin merkezi Meru Dağı’nın katları gibi — aynı siluet, başka ölçek."
    )}

    <p>Lisede geometri: çemberin çevresi, dikdörtgenin alanı, nokta ile doğru arası. Buna <strong>Öklid geometrisi</strong> denir; bu kitapta vektörle hareket ederken zaten onu kullandık. Ekran dikdörtgen, erik küre. Peki sokaktaki ağaç, yaprak damarı, dünkü şimşek, karnabahar, damar, kıyı? Şekil 8.1’deki gibi, doğanın çoğu cetveldeki kareye benzemez.</p>
    ${N.img(
      "08_fractals",
      "08_fractals_2.png",
      "Şekil 8.1: Öklid’in ideal şekilleri ve doğada duranlar."
    )}
    <p><code>circle</code>, <code>square</code>, <code>line</code> ötesine geçmek istiyorsanız başka bir geometri gerekir: doğanın geometrisi, <strong>fraktal</strong>. Bu bölüm hem fikri hem p5.js’te çizmeyi kurar.</p>

    ${N.note(
      "Bu bölümün çıktısı",
      `<ul>
        <li>Özyineleme: fonksiyonun kendini çağırması; çıkış şartı yoksa tarayıcı durur</li>
        <li>Cantor, Koch, ağaç, L-sistemi</li>
        <li>Ağaçta <code>translate</code>, <code>rotate</code>, <code>push</code> / <code>pop</code> — aynı tuvalde karşılaştırmalı</li>
        <li>Belirlenmiş (hep aynı) ve stokastik (zarlı) fraktal</li>
      </ul>`
    )}

    <h2>Fraktal nedir?</h2>
    <p>Kelime Latince <em>fractus</em> (“kırık”). Benoit Mandelbrot 1975’te koydu. <em>The Fractal Geometry of Nature</em>’da tanım kabaca şudur: kaba veya parçalı bir şekil, parçalarına bölününce her parça (en azından yaklaşık) bütünün küçültülmüş kopyasıdır.</p>
    <p>Ağaca bakın (Şekil 8.2; kodu Örnek 8.6’da). Tek gövde, ucunda dallar; her dalın ucunda yine dallar. Bir dalı koparıp elinize alın (Şekil 8.3): aynı ağaç, küçük.</p>
    ${N.img("08_fractals", "08_fractals_3.png", "Şekil 8.2: Dallanmış fraktal ağaç.")}
    ${N.img(
      "08_fractals",
      "08_fractals_4.png",
      "Şekil 8.3: Aynı ağacın bir dalı — bütünün kopyası."
    )}
    <p>Her fraktal bu kadar tıpatıp olmak zorunda değil. Şekil 8.4’te Grönland kıyısı (Kalaallisut dilinde Kalaallit Nunaat) iki kez durur. Ölçek yok: bütün kıyı mı, bir koy mu? Bilemezsiniz. Kıyı, her zumda titrer. Şekil 8.5 ölçeği geri koyar: B, A’nın yaklaşık üç kat büyütülmüş bir dilimidir.</p>
    ${N.img("08_fractals", "08_fractals_5.png", "Şekil 8.4: İki kıyı — ölçek yok.")}
    ${N.img("08_fractals", "08_fractals_6.png", "Şekil 8.5: Aynı iki kıyı, ölçekle.")}
    <p>Kıyı <strong>stokastik</strong> fraktaldır: olasılık ve rastgelelikle kurulur. Ağacın kuralı ise <strong>belirlenmiştir</strong> — her çalıştırmada aynı çatal. Stokastikte tıpatıp kopya yoktur; “kıyı gibi durma” istatistik olarak aynı kalır. Düz çizgi de her ölçekte aynıdır, ama fraktal değildir. İnce yapı yoktur; “bu bir doğru” diyebiliyorsanız fraktal değildir.</p>
    ${N.extra(
      "Mandelbrot kümesi",
      `<p>En tanınmış fraktal desenlerden biri Mandelbrot’un kendi adını taşır: karmaşık sayılar bir formüle tekrar tekrar sokulur; sonsuza kaçar mı, sınırlı mı kalır? Bu “kaçış süresi” yöntemi, bu bölümdeki özyinelemeli çizimden başka bir yoldur. p5.js ile görmek için Coding Train’deki <a href="https://thecodingtrain.com/challenges/21-mandelbrot-set-with-p5js" target="_blank" rel="noopener">Challenge 21</a>.</p>`
    )}
    ${N.img("08_fractals", "08_fractals_7.png", "Mandelbrot kümesi.")}
    <p>Fraktal, Mandelbrot’dan eskidir; doğa kadar eskidir. Zambiya’da Ba-ila köy yerleşimi, İslam mimarisindeki geometrik tekrar — Batı matematiği ad koymadan önce de kumaşta ve planda duruyordu.</p>

    <h2>Özyineleme</h2>
    <p>Mutfak: tarifi uyguladınız, elde kalan iki kısa çubuğu tekrar aynı tarife sokuyorsunuz. Çıktı, bir sonraki turun girdisidir. Buna <strong>özyineleme</strong> denir; uygulanan tarife <strong>üretim kuralı</strong>. 1883’te Georg Cantor, sonsuz bir sayı kümesi için yalın bir kural yazdı (Şekil 8.6).</p>
    ${N.img(
      "08_fractals",
      "08_fractals_8.png",
      "Şekil 8.6: Cantor kümesini üreten özyinelemeli talimat."
    )}
    <p>Bir çizgiyi üçe böl, ortadakini at, iki çizgi kalsın. O iki çizgiye aynı işi yap; dört olur. Dörde aynı iş; sekiz. Sonsuza kadar Cantor bunu sordu. Sizin p5.js tuvaliniz sonlu pikseldir; bir pikselden kısa çizgi çizilemez. Bu kitapta sonsuz paradoksu bir kenara bırakıyoruz. Kural “sonsuz” uygulanmaz: bir şart sağlanınca durur. Durmazsa tarayıcı donar veya <code>Maximum call stack size exceeded</code> der — “aynı fonksiyona fazla kez inildi.”</p>

    <h3>Özyinelemeli fonksiyon</h3>
    <p>Fonksiyonun içinden başka fonksiyon çağırmak yeni değil: <code>background(0)</code>’ı <code>setup</code> içinde her gün yazıyorsunuz. Yeni olan: tarif, <em>kendi adını</em> içeriyor. Pizza’yı “pizza dilimi içeren yemek” diye tanımlamak dilde saçmadır; JavaScript’te, çıkış şartı varsa, işe yarar.</p>
    <p>Klasik sayı örneği <strong>faktöriyel</strong>: n! = n × (n−1) × … × 1, ve 0! = 1. Bunu <code>for</code> ile yazabilirsiniz. Dikkat: 4! tanımının içinde 3! durur.</p>
    ${N.math(
      "n! = n × (n − 1)! ,   0! = 1",
      "n’nin faktöriyeli, n çarpı bir eksiğinin faktöriyelidir. JavaScript’te bu, fonksiyonun kendini çağırmasıdır: <code>return n * factorial(n - 1)</code>. Çıkış: <code>n &lt;= 1</code> ise <code>return 1</code> — yoksa çağrı hiç dip bulmaz."
    )}
    ${N.img(
      "08_fractals",
      "08_fractals_9.png",
      "Şekil 8.7: factorial(4) çağrısının iç içe inmesi ve geri çıkması."
    )}
    <p>Şekil 8.7 tavşan deliğidir: aşağı inilir, dipte 1 döner, yukarı çarpıla çarpıla 24 evine gelir. Tuvalde aynı fikir, <code>return</code> yerine şekil çizer. Aşağıda sol: <code>for</code> ile iç içe daire. Sağ: aynı daireler, <code>drawCircles</code> kendini çağırır. Çıkış <code>r &gt; 4</code>. İkisi bir karede; yarıçap yazılı.</p>
    ${N.editor("rekursiyonDongu")}
    ${N.tryit([
      { do: "Sağdaki if (r > 4) koşulunu if (r > 40) yapın.", expect: "Sağda daha az halka; sol döngü aynı kalır. Çıkış eşiği derinliği keser." },
      { do: "Sağdaki drawCircles satırını yorumlayın.", expect: "Tek daire kalır; özyineleme o satırdı." },
    ])}
    ${N.quiz(
      "Özyinelemeli fonksiyonun çıkış şartı yoksa tarayıcı ne yapar?",
      ["Sonsuza kadar çizer, tuval dolar", "Maximum call stack size exceeded ile sketch’i keser", "Kendiliğinden for döngüsüne döner"],
      1,
      "Her çağrı yığında yer tutar. Dip yoksa yığın taşar. for’daki false şartı gibi, özyinelemede de bir if durdurmalıdır."
    )}

    <h3>Örnek 8.1: Özyinelemeli daireler, bir kez</h3>
    <p>Bir daire çiz, yarıçapı 0.75’e çek, kendini çağır. İç içe halkalar. Bunu döngü de yapar; 8.2’de iş değişir.</p>
    ${N.editor("ex81")}
    ${N.tryit([
      { do: "r *= 0.75 yerine r *= 0.5 yapın.", expect: "Halkalar daha hızlı küçülür; daha az halka sığar." },
    ])}

    <h3>Örnek 8.2: Özyinelemeli daireler, iki kez</h3>
    <p>Her daire, yarısı kadar iki daire daha ister: biri merkeze göre sağa, biri sola. Bir <code>for</code> ile “kaç daire” saymak yetmez; her halka iki çocuk doğurur, çocuklar da ikişer — çağrı ağacı. Döngüyle kopyalamayı deneyin; indeks matematiği çabuk dağılır. Özyineleme burada kısalır.</p>
    ${N.editor("ex82")}
    ${N.tryit([
      { do: "İkinci drawCircles (sol çocuk) satırını yorumlayın.", expect: "Yalnızca sağa doğru küçülen zincir; sol kanat yok." },
    ])}

    <h3>Örnek 8.3: Özyinelemeli daireler, dört kez</h3>
    <p>Dört çağrı: sağ, sol, aşağı, yukarı. Yarıçap eşiği 16 — dört çocuk çabuk çoğalır, erken kesmezseniz tarayıcı yorulur.</p>
    ${N.editor("ex83")}
    ${N.tryit([
      { do: "if (radius > 16) eşiğini 8 yapın.", expect: "Daha çok halka, daha dolu dantel; kare ağırlaşabilir." },
    ])}

    <h3>Cantor kümesini özyineleme ile çizmek</h3>
    <p>Somun ekmek: tam boy bir çizgi. Ortadaki üçte birini ısırıp atın; iki kısa somun kalsın. Her kalan somuna aynı ısırığı uygulayın. <code>cantor(x, y, length)</code> önce tam çizgiyi çizer, sonra iki çocuğu çağırır: biri <code>x</code>’ten, biri <code>x + 2*length/3</code>’ten, ikisi de <code>length/3</code>, y bir satır aşağı.</p>
    ${N.img(
      "08_fractals",
      "08_fractals_10.png",
      "Şekil 8.8: Tek cantor() çağrısı — tek çizgi."
    )}
    ${N.img(
      "08_fractals",
      "08_fractals_11.png",
      "Şekil 8.9: Sonraki kuşak, öncekinin üçte biri."
    )}
    ${N.img(
      "08_fractals",
      "08_fractals_12.png",
      "Şekil 8.10: İki kuşak, Cantor kuralıyla."
    )}
    <p>İki kuşağı elle <code>line</code> diye yazmak durur. Dört, sekiz, on altı çağrı. <code>for</code> denerseniz her kuşağın x hesabı şişer. <code>cantor</code>’un kendini iki kez çağırması, o şişmeyi tarifte gizler. Çıkış: <code>length &gt; 1</code>.</p>

    <h3>Örnek 8.4: Cantor kümesi</h3>
    ${N.editor("ex84")}
    ${N.tryit([
      { do: "length > 1 eşiğini length > 20 yapın.", expect: "Daha az satır; ince dişler oluşmadan kesilir." },
      { do: "y + 20 yerine y + 10 yapın.", expect: "Satırlar sıkışır; aynı kural, daha kısa kâğıt." },
    ])}
    ${N.note(
      "Alıştırma 8.1 (orijinal)",
      `<p>8.2 ve 8.3 modeliyle kendi özyinelemeli deseninizi çizin. Kitapta çizgi örneği var.</p>
      <p><a href="https://natureofcode.com/fractals/#exercise-81" target="_blank" rel="noopener">8.1</a> ·
      <a href="https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/08_fractals/exercise_8_1_fractal_lines" target="_blank" rel="noopener">örnek çizgi deseni</a></p>`
    )}

    <h2>Koch eğrisi</h2>
    <p>1904, Helge von Koch. Kural yine bir çizgiyle başlar, üçe bölünür; Cantor’dan farkı: orta parça silinmez, çadır gibi yukarı kırılır (Şekil 8.11). Birkaç tekrar Şekil 8.12.</p>
    ${N.img(
      "08_fractals",
      "08_fractals_13.png",
      "Şekil 8.11: Koch eğrisinin üretim kuralları."
    )}
    ${N.img(
      "08_fractals",
      "08_fractals_14.png",
      "Şekil 8.12: Koch eğrisinin kuşakları."
    )}
    ${N.extra(
      "Canavar eğri",
      `<p>Başlangıç uzunluğu 1 ise ilk tekrar 4/3, ikincisi 16/9. Sonsuz tekrarda uzunluk sonsuza gider; yine de bu sayfadaki sonlu aralığa sığar. p5.js’te bellek ve piksel sonludur: kuşağı beş–altıda kesin, yoksa dizi şişer.</p>`
    )}
    <p>Cantor’daki gibi tek fonksiyon da yeterdi. Burada her parçayı nesne yapıyoruz: ileride fizik, renk, kalınlık tek segmente bağlansın diye. <code>KochLine</code> iki nokta taşır, ikisi de <code>p5.Vector</code>: <code>start</code> ve <code>end</code>. Çizmek: <code>line(this.start.x, this.start.y, this.end.x, this.end.y)</code> — vektörün bütününü <code>line</code> yutmaz, x ve y ayrı istenir (Bölüm 1 tuzağı).</p>
    <p>Hayat Oyunu’ndaki iki tahta gibi: <code>segments</code> bugün, <code>next</code> yarın. Her eski çizgiden dört yeni çizgi. Bitince <code>segments = next</code> (Şekil 8.13).</p>
    ${N.img(
      "08_fractals",
      "08_fractals_15.png",
      "Şekil 8.13: Sonraki kuşak bugünkünden hesaplanır; next, yeni current olur."
    )}
    <p>İki nokta beş olur: a, b, c, d, e (Şekil 8.14). Dört segment: a→b, b→c, c→d, d→e. <code>kochPoints()</code> beş vektörlük dizi döner; JavaScript’te <code>let [a, b, c, d, e] = segment.kochPoints()</code> diziyi beş isme açar (dizi yıkımı).</p>
    ${N.img(
      "08_fractals",
      "08_fractals_16.png",
      "Şekil 8.14: İki nokta beş nokta olur."
    )}
    <p>a ve e, eski uçların kopyasıdır (<code>copy()</code> — aynı nesneyi paylaşırlarsa bir segment kayınca hepsi kayar). b ve d: start’tan end’e vektörü üçe böl, bir dilim b, iki dilim d (Şekil 8.15). c zor görünür; eşkenar üçgende açılar 60°’dir. Aynı üçte bir vektörü −60° döndürüp b’ye ekleyin (Şekil 8.16).</p>
    ${N.img(
      "08_fractals",
      "08_fractals_17.png",
      "Şekil 8.15: start→end vektörü üçe bölünür; b ve d bulunur."
    )}
    ${N.img(
      "08_fractals",
      "08_fractals_18.png",
      "Şekil 8.16: Aynı vektör 60° dönünce çadırın tepesi c."
    )}
    ${N.math(
      "−π / 3  =  −60°",
      "p5.js varsayılanı radyandır. <code>v.rotate(-PI / 3)</code> vektörü 60° “yukarı” çevirir. Eksi olmasının nedeni tuvalde +y’nin aşağı artmasıdır: negatif açı, ekranda çadırı yukarı kaldırır. <code>v.rotate(-60)</code> yazarsanız 60 radyan okunur — onlarca tur, çadır kaybolur."
    )}

    <h3>Örnek 8.5: Koch eğrisi</h3>
    <p><code>setup</code> içinde <code>generate()</code> beş kez. Beşinci kuşağın 1 024 segmenti deseni gösterir. Eşik de seçebilirsiniz (parça 2 pikseli inmesin) veya her tıklamada bir kuşak.</p>
    ${N.editor("ex85")}
    ${N.tryit([
      { do: "generate döngüsünü 5 yerine 3 yapın.", expect: "Daha kaba çadırlar; 64 segment." },
      { do: "v.rotate(-PI / 3) yerine v.rotate(PI / 3) yazın.", expect: "Çadır tuvalin altına, +y yönüne kırılır." },
    ])}
    ${N.note(
      "Alıştırmalar 8.2–8.5 (orijinal)",
      `<p>8.2: Koch kartanesi — üç Koch eğrisi üçgen. 8.3: Eğriyi canlandırın; segmenti yay veya kısıt yapmayı deneyin. 8.4: Cantor’u nesne + dizi ile yeniden yazın. 8.5: Sierpiński üçgenini özyineleme ile çizin (Bölüm 7’deki kural 90 resmi).</p>
      <p><a href="https://natureofcode.com/fractals/#exercise-82" target="_blank" rel="noopener">8.2</a> ·
      <a href="https://natureofcode.com/fractals/#exercise-83" target="_blank" rel="noopener">8.3</a> ·
      <a href="https://natureofcode.com/fractals/#exercise-84" target="_blank" rel="noopener">8.4</a> ·
      <a href="https://natureofcode.com/fractals/#exercise-85" target="_blank" rel="noopener">8.5</a></p>`
    )}
    ${N.img(
      "08_fractals",
      "08_fractals_19.png",
      "Alıştırma 8.5: Sierpiński üçgeni."
    )}

    <h2>Ağaçlar</h2>
    <p>Buraya kadar kurallar zar atmadı; her çalıştırma aynı resmi verdi. Ağaçta önce belirlenmiş kural, sonra biraz rastgelelik. İkincisi stokastik fraktaldir: her karede aynı tür ağaç, başka dallar.</p>

    <h3>Belirlenmiş ağaç</h3>
    <p>Şekil 8.17: bir dal, ucunda iki dal; her yeni dal öncekiye göre döner. “Döner” kelimesi işi zorlaştırır. p5.js’te kalem dönmez, <strong>koordinat sistemi</strong> döner. <code>translate</code> orijini kaydırır, <code>rotate</code> o orijin etrafında döndürür, <code>push</code> o anki kaydırmayı fotoğraflar, <code>pop</code> fotoğrafa döner.</p>
    ${N.img(
      "08_fractals",
      "08_fractals_20.png",
      "Şekil 8.17: Fraktal ağacın kuşakları."
    )}
    <p>Islak kuma çiziyorsunuz. Gövdeyi çizdiniz. Çataldan devam etmek için ayağınıza kadar yürürsünüz — <code>translate(0, -uzunluk)</code>: yeni (0, 0) dalın ucudur. Sağa dönmek <code>rotate</code>. Sağ dalı çizdikten sonra çatala dönmezseniz, “sola dön” dediğinizde hâlâ sağ dalın ucundasınızdır; iki dal aynı yöne biner.</p>
    ${N.img(
      "08_fractals",
      "08_fractals_21.png",
      "Şekil 8.18: Çiz, uca yürü (translate), açıyla dön (rotate)."
    )}
    ${N.img(
      "08_fractals",
      "08_fractals_22.png",
      "Şekil 8.19: pop ile çatala dönünce sol dal ayrı açılır."
    )}
    <p>Tuzak iki katlıdır. Bir: <code>rotate(30)</code> yazmak. Siz 30° (ince bir dilim) dersiniz; p5.js 30 radyan okur. Tam tur ≈ 6.28 radyan olduğuna göre 30 ≈ 4.8 tur; dal tuvali birkaç kez dolanır. Çeyrek tur için <code>rotate(HALF_PI)</code>, 30° için <code>rotate(PI / 6)</code> veya <code>angleMode(DEGREES)</code> sonra <code>rotate(30)</code>. İki: <code>pop</code> unutmak. Aşağıda sol gövde <code>push</code>/<code>pop</code>süz — ikinci dal birinciye biner. Sağ gövde her çocuğu kendi kutusunda döndürür. Aynı açılar, aynı uzunluk; fark o dört satır.</p>
    ${N.editor("dalKarsilastir")}
    ${N.tryit([
      { do: "Sağdaki ilk pop() satırını silin.", expect: "Sağ ağaç da sola benzer: ikinci dal birincinin ucundan devam eder." },
      { do: "rotate(PI / 6) yerine rotate(30) yazın (sol veya sağ).", expect: "Dal onlarca tur döner; 30 radyan, 30 derece değil." },
    ])}
    ${N.quiz(
      "angleMode yok. rotate(90) ağaç dalına ne yapar?",
      ["Çeyrek tur döner", "90 radyan döner — birçok tam tur", "Dallanmayı durdurur"],
      1,
      "Varsayılan radyan. 90 ÷ 6.28 ≈ 14 tur. Çeyrek tur: radians(90), HALF_PI, veya angleMode(DEGREES)."
    )}
    <table class="data">
      <thead><tr><th>Ne kadar</th><th>Derece</th><th>p5.js (radyan)</th></tr></thead>
      <tbody>
        <tr><td>ince çatal (ağaç örneği)</td><td>30°</td><td><code>PI / 6</code></td></tr>
        <tr><td>Koch çadırı</td><td>60°</td><td><code>PI / 3</code></td></tr>
        <tr><td>çeyrek tur</td><td>90°</td><td><code>HALF_PI</code></td></tr>
      </tbody>
    </table>
    <p><code>branch(len)</code> gövdeyi <code>line(0, 0, 0, -len)</code> ile çizer (yukarı, çünkü y ekseni aşağı artar, eksi y yukarı gider), uca yürür, uzunluğu 0.67’ye çeker, yeterince kısaysa durur. Kısaysa değilse: <code>push</code>, sağa dön, <code>branch(len)</code>, <code>pop</code>; aynı şey sola. p5.js önce sağ soyunu dibe kadar çizer, <code>pop</code>’larla geri yürüyüp solu doldurur.</p>
    ${N.note(
      "Alıştırma 8.6",
      `<p>Dalları, p5.js’in gerçekten çizdiği sırayla numaralandırın.</p>
      <p><a href="https://natureofcode.com/fractals/#exercise-86" target="_blank" rel="noopener">8.6</a></p>`
    )}
    ${N.img("08_fractals", "08_fractals_23.png", "Alıştırma 8.6: dalların çizim sırası.")}

    <h3>Örnek 8.6: Özyinelemeli ağaç</h3>
    <p>Açı, <code>mouseX</code> ile 0 ile çeyrek tur arasında. Gövde tuvalin alt-ortasından başlar: <code>translate(width / 2, height)</code> olmasa <code>line(0,0,…)</code> sol üstten çıkar — Bölüm 1’deki kırmızı ok.</p>
    ${N.editor("ex86")}
    ${N.tryit([
      { do: "Fareyi sola, ortaya, sağa götürün.", expect: "Kapalı şemsiye → açık çatal → neredeyse yatay kollar. Açı üstte yazılı." },
      { do: "branch(80) yerine branch(40) yazın.", expect: "Kısa ağaç; aynı kural, erken kesilir." },
    ])}
    ${N.note(
      "Alıştırmalar 8.7–8.8 (orijinal)",
      `<p>8.7: Gövde kalın, uçlar ince — <code>strokeWeight</code> kuşağa göre. 8.8: <code>Branch</code> sınıfı ve dizi; dönüşü vektörle yapın (Koch’taki gibi). Büyüme animasyonu, uçta yaprak.</p>
      <p><a href="https://natureofcode.com/fractals/#exercise-87" target="_blank" rel="noopener">8.7</a> ·
      <a href="https://natureofcode.com/fractals/#exercise-88" target="_blank" rel="noopener">8.8</a></p>`
    )}

    <h3>Stokastik ağaç</h3>
    <p>Gerçek ağaçta her çatal aynı açı değildir; her dal tam ikiye ayrılmaz. <code>random</code> bunu katar. Fazlası da olur: her kare yeni zar, ağaç titrer, fikir okunmaz. Aşağıdaki örnek bir ağaç çizer ve durur; tıklayınca yeni zar. Açı aralığı ve dal sayısı tuvalde yazılı.</p>

    <h3>Örnek 8.7: Stokastik ağaç</h3>
    ${N.editor("ex87")}
    ${N.tryit([
      { do: "Birkaç kez tıklayın.", expect: "Aynı kural, başka iskelet. random her tıklamada yeniden." },
      { do: "random(-PI / 2, PI / 2) aralığını random(-PI / 6, PI / 6) yapın.", expect: "Daha dik, daha “ladin”; aşırı açılmalar kesilir." },
    ])}
    ${N.note(
      "Alıştırmalar 8.9–8.10 (orijinal)",
      `<p>8.9: Açıyı Perlin gürültüsüne bağlayın; zamanla “rüzgâr.” 8.10: Toxiclibs.js ile dal = iki parçacık + yay; ağaç nasıl ayakta kalır?</p>
      <p><a href="https://natureofcode.com/fractals/#exercise-89" target="_blank" rel="noopener">8.9</a> ·
      <a href="https://natureofcode.com/fractals/#exercise-810" target="_blank" rel="noopener">8.10</a></p>`
    )}

    <h2>L-sistemleri</h2>
    <p>1968, Aristid Lindenmayer: bitki büyümesini harf ve kural ile modelledi. Cümle bilgisi kelimeden cümle kurduğu gibi, L-sistemi sembolden “cümle” üretir. Şimdiye kadarki fraktalleri de üretebilir; asıl kazanç, karmaşık kuralı kısa alfabeye sıkıştırmaktır.</p>
    <p>JavaScript’te metin <strong>string</strong>tir: tırnak içinde. <code>"A" + "B"</code> birleştirir, <code>"AB"</code> olur. <code>charAt(i)</code> i’nci harfi verir (dizi gibi, 0’dan). Üç parça:</p>
    <ul>
      <li><strong>Alfabe:</strong> geçerli harfler (ör. A, B).</li>
      <li><strong>Aksiyom:</strong> 0. kuşaktaki cümle (ör. A).</li>
      <li><strong>Kurallar:</strong> A → AB demek: cümlede her A, sonraki kuşakta AB olsun.</li>
    </ul>
    <p>Lindenmayer’in yosun sistemi: A → AB, B → A. Kuşak 0 = A. Sonra AB, ABA, ABAAB, … (Şekil 8.20). Yine iki string: <code>current</code> ve <code>next</code>. Harf harf bak, kuralı yaz, bitince <code>current = next</code> — Hayat Oyunu ve Koch ile aynı iskelet.</p>
    ${N.img(
      "08_fractals",
      "08_fractals_24.png",
      "Şekil 8.20: Yosun L-sisteminin kuşakları."
    )}

    <h3>Örnek 8.8: L-sistem cümlesi</h3>
    <p>On kuşak, courier harflerle. Bu örnek bilerek metindir; sonraki örnek aynı fikri çizer.</p>
    ${N.editor("ex88")}
    ${N.tryit([
      { do: "Döngüyü 10 yerine 6 yapın.", expect: "Daha kısa liste; son cümleler tuvalden taşmaz." },
    ])}

    <p>A ve B bitki değildir. Çizim talimatı gömülüdür. Başka bir sistem: A → ABA, B → BBB. A “çizerek ilerle”, B “çizmeden ilerle” olursa Cantor kümesi çıkar (Şekil 8.21).</p>
    ${N.img(
      "08_fractals",
      "08_fractals_25.png",
      "Şekil 8.21: Cantor kümesi, L-sistemi alfabesiyle."
    )}
    <p>Yaygın alfabe F, G, +, −, [, ]. Kaplumbağa grafiği: hayali bir kaplumbağa tuvalde komut dinler. p5.js bunu <code>line</code>, <code>translate</code>, <code>rotate</code>, <code>push</code>, <code>pop</code> ile taklit eder. Ağaçtaki aynı dört çağrı, şimdi harf harf.</p>
    <table class="data">
      <thead><tr><th>Harf</th><th>Anlam</th><th>p5.js</th></tr></thead>
      <tbody>
        <tr><td>F</td><td>çiz, ilerle</td><td><code>line</code> + <code>translate</code></td></tr>
        <tr><td>G</td><td>çizmeden ilerle</td><td><code>translate</code></td></tr>
        <tr><td>+</td><td>sağa dön</td><td><code>rotate(angle)</code></td></tr>
        <tr><td>−</td><td>sola dön</td><td><code>rotate(-angle)</code></td></tr>
        <tr><td>[</td><td>durumu kaydet</td><td><code>push()</code></td></tr>
        <tr><td>]</td><td>durumu geri al</td><td><code>pop()</code></td></tr>
      </tbody>
    </table>
    <p>Ağaç örneğindeki tuzak burada da durur: <code>[</code> without <code>]</code> (eşleşmeyen köşeli ayraç) kaplumbağayı dalın ucunda bırakır; sonraki F başka yerden çıkar. <code>rotate(25)</code> yine 25 radyan okunur; örnek <code>radians(25)</code> kullanır.</p>

    <h3>Örnek 8.9: Bir L-sistemi</h3>
    <p>Aksiyom F; kural F → FF+[+F−F−F]−[−F+F+F]. Dört kuşak. <code>rules</code> bir JavaScript nesne yazımıdır: anahtar eski harf, değer yeni metin. <code>LSystem</code> cümleyi büyütür, <code>Turtle</code> harfleri yürür. Gövde yine <code>translate(width / 2, height)</code> ile alt ortadan.</p>
    ${N.editor("ex89")}
    ${N.tryit([
      { do: "Kuşak döngüsünü 4 yerine 3 yapın.", expect: "Daha seyrek bitki; daha az dal." },
      { do: "Turtle açısını radians(25) yerine radians(40) yapın.", expect: "Dallar daha açık; bazı uçlar tuvalden çıkar." },
    ])}
    ${N.note(
      "Alıştırmalar 8.11–8.13 (orijinal)",
      `<p>8.11: L-sistemini dizi + vektörle çizin (dönüşü <code>rotate</code> değil trigonometri). 8.12: Prusinkiewicz ve Lindenmayer, <a href="http://algorithmicbotany.org/" target="_blank" rel="noopener"><em>The Algorithmic Beauty of Plants</em></a> — stokastik kural, ek harf. 8.13: Fraktalı ses veya metin üretmek için kullanın (Bach, <em>Infinite Jest</em>).</p>
      <p><a href="https://natureofcode.com/fractals/#exercise-811" target="_blank" rel="noopener">8.11</a> ·
      <a href="https://natureofcode.com/fractals/#exercise-812" target="_blank" rel="noopener">8.12</a> ·
      <a href="https://natureofcode.com/fractals/#exercise-813" target="_blank" rel="noopener">8.13</a></p>`
    )}

    ${N.note(
      "Ekosistem projesi",
      `<ul>
        <li>Ortama bitki benzeri yaratıklar ekleyin.</li>
        <li>Fraktal ağaca yaprak, rüzgârla düşen yaprak, koparılıp yenen meyve.</li>
        <li>Yaratığın desenini fraktal yapın.</li>
        <li>L-sistemi, yaratığın hareket talimatı olsun.</li>
      </ul>`
    )}
    ${N.img("08_fractals", "08_fractals_26.png", "Orijinal kitaptaki ekosistem görseli.")}

    ${N.resources([
      { kind: "Kitap", title: "Chapter 8 · Fractals", url: "https://natureofcode.com/fractals/" },
      { kind: "Kod", title: "08_fractals örnekleri", url: "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/08_fractals" },
      { kind: "Video", title: "Coding Train · Recursion", url: "https://www.youtube.com/watch?v=jPsZwrV9ld0" },
      { kind: "Video", title: "Coding Train · Recursive fractal trees", url: "https://www.youtube.com/watch?v=0jjeOYMjmDU" },
      { kind: "Video", title: "Coding Train · Object-oriented fractal trees", url: "https://www.youtube.com/watch?v=fcdNSZ9IzJM" },
      { kind: "Video", title: "Coding Train · Fractal trees — L-system", url: "https://www.youtube.com/watch?v=E1B4UoSQMFw" },
      { kind: "Video", title: "Coding Train · p5.js transformations", url: "https://thecodingtrain.com/tracks/code-programming-with-p5-js/code/3-angles/4-transformation-matrix" },
      { kind: "Video", title: "Coding Train · Mandelbrot set", url: "https://thecodingtrain.com/challenges/21-mandelbrot-set-with-p5js" },
      { kind: "Kitap", title: "The Algorithmic Beauty of Plants", url: "http://algorithmicbotany.org/" },
      { kind: "Referans", title: "p5.js · rotate", url: "https://p5js.org/reference/p5/rotate/" },
      { kind: "Referans", title: "p5.js · translate", url: "https://p5js.org/reference/p5/translate/" },
      { kind: "Referans", title: "p5.js · push", url: "https://p5js.org/reference/p5/push/" },
    ])}
  `,
  editors: {
    rekursiyonDongu: {
      title: "Aynı halkalar: for ve özyineleme",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  stroke(0);
  noFill();
  let r = 70;
  let n = 0;
  while (r > 4) {
    circle(110, 120, r * 2);
    r *= 0.75;
    n++;
  }
  r = 70;
  drawCircles(290, 120, r);
  fill(20);
  noStroke();
  text("sol: while, " + n + " halka", 40, 22);
  text("sağ: drawCircles kendini çağırır", 210, 22);
  text("çıkış: r > 4   aynı resim, iki yol", 16, 228);
  noLoop();
}

function drawCircles(x, y, r) {
  stroke(0);
  noFill();
  circle(x, y, r * 2);
  if (r > 4) {
    drawCircles(x, y, r * 0.75);
  }
}` }],
    },
    dalKarsilastir: {
      title: "Aynı çatal: push/pop yok ve var",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  let len = 70;
  let kisa = 48;
  let a = PI / 6;

  stroke(180, 40, 40);
  strokeWeight(2);
  push();
  translate(100, 220);
  line(0, 0, 0, -len);
  translate(0, -len);
  rotate(a);
  line(0, 0, 0, -kisa);
  rotate(-2 * a);
  line(0, 0, 0, -kisa);
  pop();

  stroke(20);
  push();
  translate(300, 220);
  line(0, 0, 0, -len);
  translate(0, -len);
  push();
  rotate(a);
  line(0, 0, 0, -kisa);
  pop();
  push();
  rotate(-a);
  line(0, 0, 0, -kisa);
  pop();
  pop();

  fill(20);
  noStroke();
  text("sol: pop yok — ikinci dal birinciye biner", 12, 20);
  text("sağ: her çocuk push/pop kutusunda", 210, 20);
  text("açı PI/6 = 30°    rotate(30) yazma", 12, 228);
  noLoop();
}` }],
    },
    ex81: {
      title: "Örnek 8.1: Özyinelemeli daireler, bir kez",
      original: {
        book: "https://natureofcode.com/fractals/#example-81-recursive-circles-once",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/08_fractals/8_1_recursion",
      },
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  drawCircles(width / 2, height / 2, width / 2);
  noLoop();
}

function drawCircles(x, y, r) {
  stroke(0);
  strokeWeight(2);
  noFill();
  circle(x, y, r * 2);
  if (r > 4) {
    r *= 0.75;
    drawCircles(x, y, r);
  }
}` }],
    },
    ex82: {
      title: "Örnek 8.2: Özyinelemeli daireler, iki kez",
      original: {
        book: "https://natureofcode.com/fractals/#example-82-recursive-circles-twice",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/08_fractals/8_2_recursion",
      },
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  drawCircles(width / 2, height / 2, 200);
  noLoop();
}

function drawCircles(x, y, radius) {
  stroke(0);
  strokeWeight(2);
  noFill();
  circle(x, y, radius * 2);
  if (radius > 4) {
    drawCircles(x + radius / 2, y, radius / 2);
    drawCircles(x - radius / 2, y, radius / 2);
  }
}` }],
    },
    ex83: {
      title: "Örnek 8.3: Özyinelemeli daireler, dört kez",
      original: {
        book: "https://natureofcode.com/fractals/#example-83-recursive-circles-four-times",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/08_fractals/8_3_recursion_circles",
      },
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  drawCircles(width / 2, height / 2, 160);
  noLoop();
}

function drawCircles(x, y, radius) {
  stroke(0);
  noFill();
  circle(x, y, radius * 2);
  if (radius > 16) {
    drawCircles(x + radius / 2, y, radius / 2);
    drawCircles(x - radius / 2, y, radius / 2);
    drawCircles(x, y + radius / 2, radius / 2);
    drawCircles(x, y - radius / 2, radius / 2);
  }
}` }],
    },
    ex84: {
      title: "Örnek 8.4: Cantor kümesi",
      original: {
        book: "https://natureofcode.com/fractals/#example-84-the-cantor-set",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/08_fractals/8_4_cantor_set",
      },
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
  background(255);
  stroke(0);
  strokeWeight(2);
  cantor(10, 20, width - 20);
  noLoop();
}

function draw() {}

function cantor(x, y, length) {
  if (length > 1) {
    line(x, y, x + length, y);
    cantor(x, y + 20, length / 3);
    cantor(x + (2 * length) / 3, y + 20, length / 3);
  }
}` }],
    },
    ex85: {
      title: "Örnek 8.5: Koch eğrisi",
      original: {
        book: "https://natureofcode.com/fractals/#example-85-the-koch-curve",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/08_fractals/8_5_koch_curve",
      },
      files: [
        {
          name: "koch.js",
          content: `class KochLine {
  constructor(a, b) {
    this.start = a.copy();
    this.end = b.copy();
  }

  show() {
    stroke(0);
    strokeWeight(2);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  kochPoints() {
    let a = this.start.copy();
    let e = this.end.copy();
    let v = p5.Vector.sub(this.end, this.start);
    v.mult(1 / 3);
    let b = p5.Vector.add(a, v);
    let d = p5.Vector.add(b, v);
    v.rotate(-PI / 3);
    let c = p5.Vector.add(b, v);
    return [a, b, c, d, e];
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let segments = [];

function setup() {
  createCanvas(400, 240);
  let start = createVector(0, 180);
  let end = createVector(width, 180);
  segments.push(new KochLine(start, end));
  for (let i = 0; i < 5; i++) {
    generate();
  }
}

function draw() {
  background(255);
  for (let segment of segments) {
    segment.show();
  }
  fill(20);
  noStroke();
  text("5 kuşak   " + segments.length + " segment", 10, 22);
  noLoop();
}

function generate() {
  let next = [];
  for (let segment of segments) {
    let [a, b, c, d, e] = segment.kochPoints();
    next.push(new KochLine(a, b));
    next.push(new KochLine(b, c));
    next.push(new KochLine(c, d));
    next.push(new KochLine(d, e));
  }
  segments = next;
}`,
        },
      ],
    },
    ex86: {
      title: "Örnek 8.6: Özyinelemeli ağaç",
      original: {
        book: "https://natureofcode.com/fractals/#example-86-a-recursive-tree",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/08_fractals/8_6_tree",
      },
      files: [{ name: "sketch.js", content: `let angle;

function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  angle = map(mouseX, 0, width, 0, HALF_PI);
  fill(20);
  noStroke();
  text("açı " + nf(degrees(angle), 1, 0) + "°   =   " + nf(angle, 1, 2) + " radyan", 10, 20);
  translate(width / 2, height);
  stroke(0);
  strokeWeight(2);
  branch(80);
}

function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  len *= 0.67;
  if (len > 2) {
    push();
    rotate(angle);
    branch(len);
    pop();
    push();
    rotate(-angle);
    branch(len);
    pop();
  }
}` }],
    },
    ex87: {
      title: "Örnek 8.7: Stokastik ağaç",
      original: {
        book: "https://natureofcode.com/fractals/#example-87-a-stochastic-tree",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/08_fractals/8_7_stochastic_tree",
      },
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
  noLoop();
}

function draw() {
  background(255);
  stroke(0);
  push();
  translate(width / 2, height);
  strokeWeight(2);
  branch(80);
  pop();
  fill(20);
  noStroke();
  text("tıkla: yeni ağaç   dal 1–3   açı -90°..90°", 10, 20);
}

function mousePressed() {
  redraw();
}

function branch(length) {
  line(0, 0, 0, -length);
  translate(0, -length);
  length *= 0.67;
  if (length > 2) {
    let n = Math.floor(random(1, 4));
    for (let i = 0; i < n; i++) {
      let angle = random(-PI / 2, PI / 2);
      push();
      rotate(angle);
      branch(length);
      pop();
    }
  }
}` }],
    },
    ex88: {
      title: "Örnek 8.8: L-sistem cümlesi",
      original: {
        book: "https://natureofcode.com/fractals/#example-88-simple-l-system-sentence-generation",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/08_fractals/8_8_l_system_string_only",
      },
      files: [{ name: "sketch.js", content: `let current = "A";

function setup() {
  createCanvas(400, 240);
  background(255);
  noLoop();
  textSize(14);
  textFont("courier");
  fill(20);
  for (let i = 0; i < 8; i++) {
    let s = i + ": " + current;
    if (s.length > 48) s = s.substring(0, 48) + "…";
    text(s, 8, 22 + i * 22);
    generate();
  }
  text("A→AB  B→A    kuşak 0 aksiyom", 8, 228);
}

function generate() {
  let next = "";
  for (let i = 0; i < current.length; i++) {
    let c = current.charAt(i);
    if (c === "A") next += "AB";
    else if (c === "B") next += "A";
  }
  current = next;
}` }],
    },
    ex89: {
      title: "Örnek 8.9: L-sistemi",
      original: {
        book: "https://natureofcode.com/fractals/#example-89-an-l-system",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/08_fractals/example_8_9_l_system",
      },
      files: [
        {
          name: "lsystem.js",
          content: `class LSystem {
  constructor(axiom, rules) {
    this.sentence = axiom;
    this.ruleset = rules;
  }

  generate() {
    let nextgen = "";
    for (let i = 0; i < this.sentence.length; i++) {
      let c = this.sentence.charAt(i);
      if (this.ruleset[c]) nextgen += this.ruleset[c];
      else nextgen += c;
    }
    this.sentence = nextgen;
  }
}`,
        },
        {
          name: "turtle.js",
          content: `class Turtle {
  constructor(length, angle) {
    this.length = length;
    this.angle = angle;
  }

  render(sentence) {
    stroke(0);
    for (let i = 0; i < sentence.length; i++) {
      let c = sentence.charAt(i);
      if (c === "F") {
        line(0, 0, 0, -this.length);
        translate(0, -this.length);
      } else if (c === "G") {
        translate(0, -this.length);
      } else if (c === "+") {
        rotate(this.angle);
      } else if (c === "-") {
        rotate(-this.angle);
      } else if (c === "[") {
        push();
      } else if (c === "]") {
        pop();
      }
    }
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let lsystem;
let turtle;

function setup() {
  createCanvas(400, 240);
  let rules = {
    F: "FF+[+F-F-F]-[-F+F+F]",
  };
  lsystem = new LSystem("F", rules);
  turtle = new Turtle(4, radians(25));
  for (let i = 0; i < 4; i++) {
    lsystem.generate();
  }
}

function draw() {
  background(255);
  translate(width / 2, height);
  turtle.render(lsystem.sentence);
  noLoop();
}`,
        },
      ],
    },
  },
});
