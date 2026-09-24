registerChapter({
  id: "ch1",
  title: "1. Vektörler",
  short: "1. Vektörler",
  icon: "➡️",
  original: "https://natureofcode.com/vectors/",
  originalCode:
    "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/01_vectors",
  html: `
    <p style="font-style:italic;color:var(--muted);">“Hem yönü hem büyüklüğü olan suçlar işliyorum.” — Vector, <em>Despicable Me</em></p>

    ${N.img(
      "01_vectors",
      "01_vectors_1.jpg",
      "Marshall Adaları çubuk haritası (Berkeley Art Museum, fotoğraf: Jim Heaphy). Hindistan cevizi damarlarından bağlanmış bir deniz haritası: adalar kabuk, çubuklar dalga yönü. Kitap bunu vektörün eski bir resmi olarak açar."
    )}

    <p>Kitabın ilk yarısı elma, sarkaç, Dünya–Güneş gibi hareketleri koda çevirir. Bu beş bölümün ortak tuğlası <strong>vektör</strong>dür. Bölüm 0’daki walker’ın <code>x</code> ve <code>y</code>’si vardı; bundan sonra ikisi tek pakette duracak.</p>

    <p>Vektör kelimesi başka yerlerde başka şeydir (hastalık taşıyıcı, C++ dizisi, bir kahvaltılık). Burada <strong>Öklid vektörü</strong>: hem <em>ne kadar</em> (büyüklük) hem <em>nereye</em> (yön).</p>

    ${N.img(
      "01_vectors",
      "01_vectors_2.png",
      "Şekil 1.1: A’dan B’ye ok. Okun baktığı yer yön, uzunluğu büyüklük. Talimat: A’dan B’ye böyle yürü."
    )}

    ${N.note(
      "Bu bölümün çıktısı",
      `<ul>
        <li><code>createVector</code> ile konum ve hızı tek nesnede tutmak</li>
        <li><code>add</code> / <code>sub</code> / <code>mult</code>: x ve y’yi ayrı ayrı unutmadan</li>
        <li>Uzunluk (<code>mag</code>) ve birim vektör (<code>normalize</code>)</li>
        <li>Hareket 101: hız konuma, ivme hıza eklenir</li>
        <li>Fareye doğru ivme: fark → kısalt → ölçekle</li>
      </ul>`
    )}

    <h2>Neden vektör?</h2>

    <p>p5.js’e yeni başlayanlar çoğu zaman zıplayan bir daire yazar. Konum iki kutu, hız iki kutu:</p>
    <table class="data">
      <thead><tr><th>Ne</th><th>Şimdiye kadar</th></tr></thead>
      <tbody>
        <tr><td>konum</td><td><code>x</code>, <code>y</code></td></tr>
        <tr><td>hız</td><td><code>xspeed</code>, <code>yspeed</code></td></tr>
      </tbody>
    </table>
    <p>Rüzgar, hedef, sürtünme ekleyince her kavram için yine iki kutu. Üç boyutta üçer kutu. Vektör sihir değil: “bu iki (veya üç) sayıyı tek isim altında taşı.”</p>

    <h3>Örnek 1.1: Vektörsüz zıplayan top</h3>
    <p>Her kare: konuma hızı ekle. Kenara çarpınca o yöndeki hızın işaretini çevir. Tuvalde <code>x</code> ve hızlar yazılı; sayı değişince daire hareket eder.</p>
    ${N.editor("ex11")}
    ${N.tryit([
      { do: "xspeed değerini 2.5 yerine 6 yapın.", expect: "Yatayda daha seyrek duraklamadan uçar; kenarda hâlâ döner." },
      { do: "Kenar if’ini yorumlayın.", expect: "Daire tuvalden çıkar; kod çalışır, çizim dışarıdadır — constrain dersi." },
    ])}

    <p>Aynı dünyada ivme, hedef, rüzgar olsa her biri için iki değişken daha. Vektörle başlangıç şöyle görünür:</p>
    <p><code>let position;</code> ve <code>let velocity;</code> — dört kutu yerine iki paket.</p>
    <p>Bu, yeni fizik kapısı açmaz. Kodu toplar; hareket matematiklerini (topla, çıkar, uzunluk, yön) tekrar tekrar aynı metotlarla yazarız. Bu bölümde iki boyut yeter. <code>p5.Vector</code> üçüncü bileşeni de taşır; öğrenirken z dikkat dağıtır.</p>

    <h2>p5.js’te vektör</h2>

    <p>Vektörü iki nokta arasındaki fark gibi düşünün: “3 adım sağa, 4 adım aşağı.” Tuvalde y aşağı artar; kuzey–güney günlük dildeki gibi değil.</p>
    ${N.img(
      "01_vectors",
      "01_vectors_3.png",
      "Şekil 1.2: Üç örnek ok. Kitapta yönler kuzey/güney ile anlatılır; bizim tuvalde +y aşağıdır."
    )}
    <table class="data">
      <thead><tr><th>Vektör</th><th>Tuvalde talimat</th></tr></thead>
      <tbody>
        <tr><td>(3, 4)</td><td>3 piksel sağ, 4 piksel aşağı</td></tr>
        <tr><td>(−15, 3)</td><td>15 piksel sol, 3 piksel aşağı</td></tr>
        <tr><td>(0, −20)</td><td>20 piksel yukarı (y küçülür)</td></tr>
      </tbody>
    </table>
    <p>Animasyonun her karesinde nesneye “şu kadar yatay, şu kadar dikey kay” demek zaten bir vektördür: ne kadar gittiğin büyüklük, hangi yöne gittiğin yön. Bu kayma, hızdır: konumun kare kare değişimi. Yeni konum = eski konum + hız.</p>
    ${N.img(
      "01_vectors",
      "01_vectors_4.png",
      "Şekil 1.3: Konumdan yeni konuma yatay ve dikey adımlar. Bu çift, bir hız vektörüdür."
    )}
    <p>Konum tek bir nokta gibi durur. Başka bakış: orijinden — tuvalde sol üst (0, 0) — o noktaya giden yol. O yola da vektör denebilir. Şekil 1.4’te konum okunun kuyruğu sol üsttedir; hız okunun kuyruğu dairenin üzerindedir. İkisi de x ve y taşır; anlamları farklıdır.</p>
    ${N.img(
      "01_vectors",
      "01_vectors_5.png",
      "Şekil 1.4: Grafik penceresi, (0, 0) sol üstte. Konum vektörü orijinden daireye; hız vektörü daireden bir sonraki adıma."
    )}

    <p>p5.js’te paket <code>createVector(x, y)</code> ile doğar. Bunu <code>setup</code> (veya <code>draw</code>) içinde çağırın: <code>width</code> henüz yokken anlamsızdır. Dönen nesnenin <code>.x</code>, <code>.y</code> alanları ve <code>add</code>, <code>sub</code>, <code>mag</code> gibi metotları vardır.</p>
    ${N.editor("ok")}
    ${N.tryit([
      { do: "createVector(80, 40) yapın.", expect: "Mavi ok daha yatık; dx ve dy yazıları yeni sayıları gösterir, mag küçülür." },
    ])}
    ${N.quiz(
      "createVector(10, −5) tuvalde nereye bakar?",
      ["10 sağ, 5 aşağı", "10 sağ, 5 yukarı", "10 sol, 5 yukarı"],
      1,
      "x pozitif sağa. y negatif: y küçülür, yani yukarı."
    )}
    <p>Bu bölümde tekrar tekrar göreceğiniz metotlar. Şimdi ezberlemeyin; her birini örnekte kullanınca yerine oturur.</p>
    <table class="data">
      <thead><tr><th>Yazım</th><th>Ne işe yarar</th></tr></thead>
      <tbody>
        <tr><td><code>v.add(w)</code></td><td>v’nin x ve y’sine w’ninkileri ekler. v değişir.</td></tr>
        <tr><td><code>v.sub(w)</code></td><td>Çıkarır. v değişir.</td></tr>
        <tr><td><code>v.mult(n)</code></td><td>Her bileşeni sayı n ile çarpar. Yön aynı, boy değişir.</td></tr>
        <tr><td><code>v.mag()</code></td><td>Uzunluğu verir (Pisagor).</td></tr>
        <tr><td><code>v.normalize()</code></td><td>Uzunluğu 1 yapar, yönü bırakır.</td></tr>
        <tr><td><code>v.limit(max)</code></td><td>Boy max’ı geçerse kısaltır; yön durur.</td></tr>
        <tr><td><code>v.setMag(len)</code></td><td>Yön aynı, uzunluk tam len olur.</td></tr>
        <tr><td><code>p5.Vector.sub(a, b)</code></td><td>Yeni vektör döner; a ve b bozulmaz.</td></tr>
        <tr><td><code>p5.Vector.random2D()</code></td><td>Rastgele yön, uzunluk 1.</td></tr>
      </tbody>
    </table>

    <h2>Vektör toplama</h2>

    <p>Kitap vektörü ok ile yazar: v⃗. Tek sayıya skaler denir (5, −2.3). Toplama, bileşen bileşen:</p>
    ${N.img(
      "01_vectors",
      "01_vectors_6.png",
      "Şekil 1.5: İki vektör, her birinin x ve y’si."
    )}
    ${N.img(
      "01_vectors",
      "01_vectors_7.png",
      "Şekil 1.6: Yeni ok: x’ler toplanır, y’ler toplanır."
    )}
    ${N.math(
      "w<sub>x</sub> = u<sub>x</sub> + v<sub>x</sub> ,   w<sub>y</sub> = u<sub>y</sub> + v<sub>y</sub>",
      "Örnek: u = (5, 2), v = (3, 4) ise w = (8, 6). p5.js’te aynı iş <code>u.add(v)</code> ile yapılır: u’nun x ve y’si değişir."
    )}
    <p>Sıra önemli değil: 3+2 ile 2+3 aynı. Vektörlerde de u+v = v+u.</p>
    <p>JavaScript <code>position + velocity</code> yazamaz: <code>+</code> sayılar ve metin içindir, <code>p5.Vector</code> nesnesini bilmez. Onun yerine:</p>
    <p><code>position.add(velocity);</code></p>
    <p>İçeride olan: <code>this.x = this.x + v.x;</code> ve aynı şey y için. Konum her kare hız kadar kayar.</p>

    <h3>Örnek 1.2: Aynı top, vektörle</h3>
    <p>Dört değişkenden iki pakete indiniz. Kenar testi hâlâ <code>position.x</code> ister: <code>circle</code> bir vektör yutmaz, iki skaler ister.</p>
    ${N.warn(
      "Tuzak: circle(position, 48)",
      `<p>Bu çalışmaz. <code>circle(position.x, position.y, 48)</code> yazın. Nesnenin bütünü ile içindeki sayı farklı şeylerdir.</p>`
    )}
    ${N.editor("ex12")}
    ${N.tryit([
      { do: "velocity = createVector(4, 0) yapın.", expect: "Yalnızca yatay gider; üst-alt kenara çarpmaz." },
    ])}
    <p>Şu an kod daha uzun görünebilir. Bölüm 2’de rüzgar, yerçekimi, sürtünme aynı <code>add</code> ile üste binecek; o zaman paket işe yarar.</p>

    ${N.note(
      "Alıştırmalar 1.1–1.3 (orijinal)",
      `<p>1.1: Bölüm 0 walker’ını vektöre çevirin. 1.2: Eski bir x, y sketch’inizi paketleyin. 1.3: 1.2’yi 3B deneyin (küre, kutu).</p>
      <p><a href="https://natureofcode.com/vectors/#exercise-11" target="_blank" rel="noopener">1.1</a> ·
      <a href="https://natureofcode.com/vectors/#exercise-12" target="_blank" rel="noopener">1.2</a> ·
      <a href="https://natureofcode.com/vectors/#exercise-13" target="_blank" rel="noopener">1.3</a></p>`
    )}
    <p>Walker’ın konumu tek vektör; adım da küçük bir vektör. Aşağıda 1.1’in iskelesi.</p>
    ${N.editor("walkerV")}

    <h2>Çıkarma, çarpma</h2>

    <p>Toplamayı gördünüz. Çıkarma: artı yerine eksi. Önce tek vektörün negatifi: 3’ün negatifi −3’tür. Vektörde her bileşenin işareti döner. (x, y) ise (−x, −y). Ok aynı uzunlukta, ters yöne bakar.</p>
    ${N.img(
      "01_vectors",
      "01_vectors_8.png",
      "Şekil 1.7: v⃗ ile −v⃗. Aynı boy, zıt yön."
    )}
    <p>Çıkarma, ikinci vektörü negatif sayıp toplamaktır: u − v = u + (−v). Görselde ikinci oku ters çevirip birincinin ucuna koyarsınız.</p>
    ${N.img(
      "01_vectors",
      "01_vectors_9.png",
      "Şekil 1.8: Çıkarmada ikinci vektör ters çevrilip birincinin ucuna yerleştirilir."
    )}
    ${N.math(
      "w<sub>x</sub> = u<sub>x</sub> − v<sub>x</sub> ,   w<sub>y</sub> = u<sub>y</sub> − v<sub>y</sub>",
      "p5.js’te yerinde: <code>u.sub(v)</code> — u’nun x ve y’si değişir. “B’den A’yı çıkar” A’dan B’ye giden oktur. Fare eksi tuval merkezi: merkezden fareye ok."
    )}
    <h3>Örnek 1.3: Çıkarma</h3>
    <p>Gri çizgiler sol üstten merkeze ve fareye gider: bunlar konum. Siyah ok, <em>fark</em>tır: fare eksi merkez. Farkın sayıları “merkezden kaç piksel?” diye okunur. Bu sayıları <code>line(0, 0, fark.x, fark.y)</code> ile çizerseniz ok sol üst köşeden çıkar — çünkü tuvalde (0, 0) hâlâ oradadır. Talimat doğru, başlangıç noktası yanlış.</p>
    <p>Kasaba meydanından “40 adım doğu, 20 adım güney” deyip surdan yürümeye benzer. Önce meydana gidin, sonra talimatı uygulayın. p5.js’te meydana gitmek: <code>translate(width / 2, height / 2)</code>. Bundan sonra <code>line(0, 0, …)</code> merkezden çizer; aynı x ve y artık doğru yerde durur.</p>
    ${N.note(
      "p5.js: translate",
      `<p><code>translate(x, y)</code> kalemi değil, <strong>koordinat sistemini</strong> kaydırır. Yeni (0, 0) eski (x, y) olur. <code>draw</code> her kare başında kaydırmayı sıfırlar; kare sonunda geri almanız gerekmez. Aynı kare içinde iki kez <code>translate</code> yazarsanız kaymalar <em>toplanır</em>. İki ayrı orijin istiyorsanız araya <code>push</code> / <code>pop</code> koyun — biraz aşağıda, iki ok yan yana çizince. Uzun hali <a href="#/p5">p5.js hazırlığında</a>.</p>
      <p>Translate şart değil. <code>line(center.x, center.y, center.x + fark.x, center.y + fark.y)</code> aynı oku çizer. <code>translate</code>, “bundan sonra her koordinat merkeze göre” rahatlığıdır; 1.3–1.6 bu yüzden onu kullanır.</p>`
    )}
    <p>Aşağıda ikisi birden: kırmızı ok translate’siz (sol üstten), siyah ok translate’li (merkezden). Fareyi gezdirin; iki ok aynı sayıları taşır, kuyrukları farklıdır.</p>
    ${N.editor("nedenTranslate")}
    ${N.tryit([
      { do: "Siyah okun translate satırını yorumlayın.", expect: "Siyah da kırmızıya biner; ikisi de köşeden çıkar." },
    ])}
    ${N.quiz(
      "mouse.sub(center) sonrası, translate olmadan line(0, 0, mouse.x, mouse.y) okun kuyruğu nerededir?",
      ["Tuvalin tam ortası", "Farenin olduğu piksel", "Sol üst köşe (0, 0)"],
      2,
      "Çıkarma sayıları değiştirdi; orijin hâlâ sol üst. translate orijini merkeze almadan ok oradan başlar."
    )}
    <p>Kitabın 1.3’ü yalnızca doğru hali çizer: gri konumlar, sonra translate, sonra siyah fark. Fareyi gezdirin; siyah ok sizi merkezden takip eder.</p>
    ${N.editor("ex13")}
    ${N.warn(
      "sub nesneyi değiştirir",
      `<p><code>mouse.sub(center)</code> mouse’un kendisini bozar. Eski fare vektörünü saklamak istiyorsanız kopya alın veya <code>p5.Vector.sub(mouse, center)</code> kullanın — o yenisini döndürür, eskisine dokunmaz. Ayrıntı bölüm sonunda.</p>`
    )}

    <p>Bir vektörü sayıyla çarpmak: hem x hem y aynı katsayıyla çarpılır. Yön aynı kalır, ok kısalır veya uzar. 0.5 ile çarpınca yarı uzunluk. Bölme: <code>div</code>, çarpmının tersi.</p>
    ${N.img(
      "01_vectors",
      "01_vectors_10.png",
      "Şekil 1.9: Çarpma ile ölçekleme. Katsayı 1’den büyükse ok uzar, 0 ile 1 arasındaysa kısalır; negatifse yön de döner."
    )}
    ${N.img(
      "01_vectors",
      "01_vectors_11.png",
      "Şekil 1.10: Bölme de ölçekler: her bileşen aynı sayıya bölünür."
    )}
    <h3>Örnek 1.4: Çarpma</h3>
    <p>Yine önce merkeze <code>translate</code>. Gri çizgi tam fark; siyah, aynı vektörün 0.5 ile çarpılmış hali. Fareyi gezdirin: siyah her zaman grinin yarısı kadar, aynı yönde.</p>
    ${N.editor("ex14")}
    ${N.tryit([
      { do: "mult(0.5) yerine mult(2) yazın.", expect: "Siyah ok griden uzun; gri asıl fark, siyah iki katı." },
    ])}

    <h2>Büyüklük (uzunluk)</h2>

    ${N.img(
      "01_vectors",
      "01_vectors_13.png",
      "Şekil 1.12: Ok bir dik üçgenin hipotenüsü. Kenarlar x ve y bileşenleri."
    )}
    ${N.img(
      "01_vectors",
      "01_vectors_12.png",
      "Şekil 1.11: Uzunluk (büyüklük) çoğu zaman ||v|| diye yazılır."
    )}
    <p>Matematik sayfasındaki Pisagor: uzunluk, bileşenlerin kareleri toplamının karekökü. p5.js bunu <code>mag()</code> diye verir.</p>
    ${N.math(
      "||v|| = " + N.sqrt("(v<sub>x</sub><sup>2</sup> + v<sub>y</sub><sup>2</sup>)"),
      "p5.js’te <code>v.mag()</code> aynı formülü kullanır: <code>sqrt(this.x * this.x + this.y * this.y)</code>. Sonuç her zaman sıfır veya pozitiftir; x veya y negatif olsa da uzunluk negatif olmaz."
    )}
    <h3>Örnek 1.5: Uzunluğu çubukla gör</h3>
    <p>Üstteki siyah dikdörtgenin eni, merkez–fare okunun piksel cinsinden uzunluğu. Çubuğu <code>translate</code>’ten <em>önce</em> çiziyoruz: o, sol üstten başlayan bir ölçektir, ok değil. Ok yine merkeze kaydıktan sonra gelir. Fareyi kenara götürün; çubuk uzar, sayı büyür.</p>
    ${N.editor("ex15")}

    <h2>Normalleştirme (birim vektör)</h2>

    ${N.img(
      "01_vectors",
      "01_vectors_14.png",
      "Şekil 1.13: Yön aynı, uzunluk 1. Buna birim vektör denir."
    )}
    <p>Bazen yalnızca yön gerekir: “fareye doğru”, uzunluk değil. Normalleştirmek: oku 1 piksel (birim) uzunluğa çekmek, yönü bozmamak. Sonra 50 ile çarparsanız her zaman 50 piksellik bir ok alırsınız — fare yakın da olsa uzak da.</p>
    ${N.img(
      "01_vectors",
      "01_vectors_15.png",
      "Şekil 1.14: Normalleştirmek, bileşenleri uzunluğa bölmektir."
    )}
    ${N.math(
      "û = v / ||v||",
      "Her bileşeni uzunluğa bölün. (4, 3) üçgeni 5 birimdir; birim vektör (4/5, 3/5). p5.js: <code>v.normalize()</code>. Uzunluk 0 ise bölme olmaz; metot olduğu gibi bırakır."
    )}
    <h3>Örnek 1.6: Sabit uzunlukta yön</h3>
    <p>İnce gri: gerçek fark (fareye kadar). Kalın siyah: <code>normalize</code> sonra <code>mult(50)</code> — aynı yön, uzunluk her zaman 50. İkisi de merkeze <code>translate</code> edildikten sonra çizilir. Fareyi merkeze yaklaştırın; gri kısalır, siyah aynı kalır.</p>
    ${N.editor("ex16")}
    ${N.quiz(
      "normalize sonrası okun uzunluğu (sıfır vektör değilse) nedir?",
      ["0", "1", "Başlangıçtaki mag ile aynı"],
      1,
      "Birim vektörün tanımı uzunluk 1’dir. Yön korunur."
    )}

    <h2>Hareket 101</h2>

    <p>Zıplayan topun özü iki satırdı: hıza göre konumu güncelle, orada çiz. Bunu bir sınıfa koyuyoruz; kalıp <code>Mover</code> (hareket eden şey). Walker’ın kuzeni: veri konum + hız, iş <code>update</code> / <code>show</code>.</p>
    <ol>
      <li>Hızı konuma ekle: <code>this.position.add(this.velocity)</code></li>
      <li>Nesneyi orada çiz</li>
    </ol>
    <p>Kenar: örnek 1.2 çarpınca hızı ters çeviriyordu (sekme). 1.7 dolanır — matematik sayfasındaki gemi. İkisi de geçerli tasarım.</p>
    <h3>Örnek 1.7: Hız</h3>
    <p><code>Mover</code> ayrı dosyada. Rastgele konum ve hız; tuvalden çıkınca diğer kenardan girer.</p>
    ${N.editor("ex17")}
    ${N.tryit([
      { do: "checkEdges içindeki atamaları silin.", expect: "Daire kaybolur; update hâlâ çalışır." },
    ])}

    <h2>İvme</h2>

    <p>Hız, konumun kare kare değişimidir. <strong>İvme</strong>, hızın kare kare değişimidir. Şelale:</p>
    <p><code>velocity.add(acceleration);</code><br>
    <code>position.add(velocity);</code></p>
    <p>Shiffman kendine bir kural koyar: bundan sonra hızı ve konumu elle kurcalamamak (ilk değer hariç). Algoritma ivmeyi üretsin; şelale gerisini yapsın. (Kural bozulacak zamanlar olacak; başlangıç için faydalı.)</p>
    <p>Üç ivme tarifi: sabit, rastgele, fareye doğru.</p>

    <h3>Algoritma 1: sabit ivme</h3>
    <p>Her kare aynı minik ok hıza eklenir. Sayılar küçük görünür (−0.001, 0.01) çünkü saniyede onlarca kez birikir. Büyümesin diye <code>velocity.limit(10)</code>: okun <em>uzunluğu</em> 10’u geçmesin, yön aynı kalsın.</p>
    ${N.warn(
      "limit ile constrain aynı değil",
      `<p><code>constrain(x, 0, width)</code> tek bir sayıyı keser; x ve y’yi ayrı ayrı keserseniz okun baktığı yer değişebilir (duvara yapışma). <code>limit(10)</code> okun <em>boyunu</em> kısaltır, yön aynı kalır. Hız tavanı için limit.</p>`
    )}
    <p>Aşağıda aynı ham ok iki kez. Solda <code>limit(40)</code>: gri tam boy, siyah aynı yön kısa. Sağda x ve y ayrı <code>constrain</code>: kırmızı ok başka yöne kırılır.</p>
    ${N.note(
      "p5.js: push, pop, copy",
      `<p>İki resmi bir tuvale yan yana koymak için orijini önce sola, sonra sağa kaydırıyoruz. <code>translate(80, 170)</code> sonrası ikinci <code>translate(250, 170)</code> eskiye <em>eklenir</em> (orijin 330, 340 olur). <code>push()</code> o anki kaydırmayı fotoğraflar, <code>pop()</code> fotoğrafa döner. Her ok kendi push/pop kutusunda.</p>
      <p><code>limit</code> vektörü yerinde değiştirir. Gri oku da boyamasın diye <code>raw.copy()</code> alır, kopyayı kısaltırız. <code>copy</code> yeni bir <code>p5.Vector</code> üretir; aslı durur.</p>`
    )}
    ${N.editor("limitVs")}
    ${N.tryit([
      { do: "İlk pop() satırını silin.", expect: "Sağdaki resim sola eklenir; tuvalin dışına veya üstüne biner. push/pop çifti bu yüzden." },
      { do: "raw.copy() ve lim.limit yerine raw.limit(40) yazın.", expect: "Soldaki gri ok siyahın üzerine çöker; asıl vektör de kısaldı." },
    ])}
    ${N.note(
      "Alıştırma 1.4 (orijinal)",
      `<p><code>limit</code>’i kendiniz yazın: uzunluk max’tan büyükse normalize edip max ile çarpın.</p>
      <p><a href="https://natureofcode.com/vectors/#exercise-14" target="_blank" rel="noopener">Exercise 1.4</a></p>`
    )}
    <h3>Örnek 1.8: Sabit ivme</h3>
    ${N.editor("ex18")}

    ${N.note(
      "Alıştırma 1.5 (orijinal)",
      `<p>Hızlanan / yavaşlayan bir Mover. İpucu: ivmenin yönünü tuş veya fareyle çevirin.</p>
      <p><a href="https://natureofcode.com/vectors/#exercise-15" target="_blank" rel="noopener">Exercise 1.5</a></p>`
    )}

    <h3>Algoritma 2: rastgele ivme</h3>
    <p><code>p5.Vector.random2D()</code> uzunluğu 1, yönü rastgele bir ok döndürür. Onu küçük bir sayıyla çarpınca her kare rüzgâr değişir; <code>limit</code> hâlâ tavan.</p>
    <h3>Örnek 1.9</h3>
    ${N.editor("ex19")}
    ${N.note(
      "Alıştırma 1.6 (orijinal)",
      `<p>Rastgele ivme yerine Perlin (<code>noise</code>) ile daha sakin bir sapma deneyin.</p>
      <p><a href="https://natureofcode.com/vectors/#exercise-16" target="_blank" rel="noopener">Exercise 1.6</a></p>`
    )}

    <h3>Statik metot: kopya mı, yerinde mi?</h3>
    <p><code>mouse.sub(center)</code> mouse’u değiştirir (yerinde). <code>p5.Vector.sub(a, b)</code> yeni bir vektör döndürür; a ve b aynı kalır. Toplama, çıkarma, çarpma için ikisi de vardır. “Eski değeri bozma” diyorsanız statik olanı seçin.</p>
    ${N.quiz(
      "let c = p5.Vector.sub(a, b); a değişir mi?",
      ["Evet, a artık a−b", "Hayır, c yeni nesnedir", "Yalnızca b değişir"],
      1,
      "Statik sub yeni vektör üretir. a.sub(b) ise a’yı yerinde değiştirirdi."
    )}
    ${N.note(
      "Alıştırma 1.7 (orijinal)",
      `<p>Verilen u ve v ile statik metotlarla w üretin (kitaptaki boşluklar).</p>
      <p><a href="https://natureofcode.com/vectors/#exercise-17" target="_blank" rel="noopener">Exercise 1.7</a></p>`
    )}

    <h3>Algoritma 3: fareye ivme</h3>
    ${N.img(
      "01_vectors",
      "01_vectors_16.png",
      "Şekil 1.15: Nesneden fareye ok — ivmenin yönü bu olsun istiyoruz."
    )}
    ${N.img(
      "01_vectors",
      "01_vectors_17.png",
      "Şekil 1.16: Fare vektöründen konum vektörünü çıkarın; kalan ok nesneden fareye gider. Bu, ivmenin yön adayıdır."
    )}
    <p>Yön: fare konumu eksi nesne konumu. Bunun uzunluğu tam mesafe olduğu için ham haliyle ivme yaparsanız daire bir karede fareye ışınlanır. Yumuşak hareket için:</p>
    <ol>
      <li>Fark vektörü: <code>p5.Vector.sub(mouse, this.position)</code></li>
      <li>Uzunluğu 1 yap: <code>normalize</code></li>
      <li>İstediğiniz ivme büyüklüğüyle çarp (örnekte 0.2)</li>
      <li>Bunu ivme say, şelaleyi çalıştır</li>
    </ol>
    <p>2 ve 3’ün kısası: <code>dir.setMag(0.2)</code>. Kitap bir kez açık yazar; sonra <code>setMag</code> kullanır.</p>
    <h3>Örnek 1.10: Fareye doğru</h3>
    <p>Daire farede durmaz. Hedefi bilir, oraya sabit büyüklükte ivme uygular; uçar, geçer, dönüp yine hızlanır. “Varmak” (yaklaşırken yavaşlamak) sonraki bölümlerin işi; bu bir hata değil.</p>
    ${N.editor("ex110")}
    ${N.tryit([
      { do: "mult(0.2) yerine mult(0.05) yazın.", expect: "Daha tembel dönüş; aşım azalır ama kaybolmaz." },
      { do: "limit değerini 1 yapın.", expect: "Tavan düşük; daire süzülür, yine hedefi geçer." },
    ])}
    ${N.note(
      "Alıştırma 1.8 (orijinal)",
      `<p>İvme büyüklüğü sabit olmasın: uzakken veya yakınken daha güçlü — yerçekimine benzer. Ayrıntı Bölüm 2.</p>
      <p><a href="https://natureofcode.com/vectors/#exercise-18" target="_blank" rel="noopener">Exercise 1.8</a></p>`
    )}

    <h2>Ekosistem</h2>
    <p>Yaratıkların hareketini yalnızca ivme vektörüyle yönetin. Sinirli sinek, zıplayan tavşan, kıvrılan yılan: karakteri ivme tarifi taşır.</p>
    ${N.img(
      "01_vectors",
      "01_vectors_18.png",
      "Orijinal kitaptaki ekosistem görseli."
    )}

    ${N.resources([
      { kind: "Kitap", title: "Chapter 1 · Vectors", url: "https://natureofcode.com/vectors/" },
      { kind: "Kod", title: "01_vectors örnekleri", url: "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/01_vectors" },
      { kind: "Video", title: "Coding Train · What is a Vector?", url: "https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/1-vectors/1-what-is-a-vector" },
      { kind: "Video", title: "Coding Train · Vector math", url: "https://www.youtube.com/watch?v=Rob0pbE7kks" },
      { kind: "Referans", title: "p5.js · p5.Vector", url: "https://p5js.org/reference/p5/p5.Vector/" },
      { kind: "Referans", title: "p5.js · translate", url: "https://p5js.org/reference/p5/translate/" },
      { kind: "Referans", title: "p5.js · push / pop", url: "https://p5js.org/reference/p5/push/" },
    ])}
    <p><a href="#/ch0">← Rastgelelik</a></p>
  `,
  editors: {
    ex11: {
      title: "Örnek 1.1: Vektörsüz zıplayan top",
      original: {
        book: "https://natureofcode.com/vectors/#example-11-bouncing-ball-with-no-vectors",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/01_vectors/example_1_1_bouncing_ball_with_no_vectors",
      },
      files: [{ name: "sketch.js", content: `let x = 100;
let y = 100;
let xspeed = 2.5;
let yspeed = 2;

function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  x = x + xspeed;
  y = y + yspeed;
  if (x > width || x < 0) {
    xspeed = xspeed * -1;
  }
  if (y > height || y < 0) {
    yspeed = yspeed * -1;
  }
  stroke(0);
  fill(127);
  strokeWeight(2);
  circle(x, y, 48);
  fill(20);
  noStroke();
  text("x " + floor(x) + "   y " + floor(y), 12, 22);
  text("xspeed " + xspeed + "   yspeed " + yspeed, 12, 42);
}` }],
    },
    ok: {
      title: "Bir ok: dx, dy ve uzunluk",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  let ox = 50;
  let oy = 40;
  let v = createVector(160, 90);
  stroke(190);
  strokeWeight(1);
  line(ox, oy, ox + v.x, oy);
  line(ox + v.x, oy, ox + v.x, oy + v.y);
  stroke(40, 90, 180);
  strokeWeight(3);
  line(ox, oy, ox + v.x, oy + v.y);
  fill(20);
  noStroke();
  text("dx = " + v.x, ox + v.x / 2 - 24, oy - 8);
  text("dy = " + v.y, ox + v.x + 8, oy + v.y / 2);
  text("createVector(" + v.x + ", " + v.y + ")", 16, 210);
  text("uzunluk mag() = " + round(v.mag()), 16, 230);
}` }],
    },
    ex12: {
      title: "Örnek 1.2: Vektörle zıplayan top",
      original: {
        book: "https://natureofcode.com/vectors/#example-12-bouncing-ball-with-vectors",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/01_vectors/example_1_2_bouncing_ball_with_vectors",
      },
      files: [{ name: "sketch.js", content: `let position;
let velocity;

function setup() {
  createCanvas(400, 240);
  position = createVector(100, 100);
  velocity = createVector(2.5, 2);
}

function draw() {
  background(255);
  position.add(velocity);
  if (position.x > width || position.x < 0) {
    velocity.x = velocity.x * -1;
  }
  if (position.y > height || position.y < 0) {
    velocity.y = velocity.y * -1;
  }
  stroke(0);
  fill(127);
  strokeWeight(2);
  circle(position.x, position.y, 48);
}` }],
    },
    nedenTranslate: {
      title: "Aynı fark, iki kuyruk: translate neden var",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  fill(20);
  noStroke();
  text("Kırmızı: fark sol üstten (translate yok).", 10, 22);
  text("Siyah: orijin merkeze kaydı, aynı sayılar.", 10, 42);

  let mouse = createVector(mouseX, mouseY);
  let center = createVector(width / 2, height / 2);

  stroke(200);
  strokeWeight(2);
  line(0, 0, mouse.x, mouse.y);
  line(0, 0, center.x, center.y);

  stroke(160);
  strokeWeight(1);
  line(center.x - 8, center.y, center.x + 8, center.y);
  line(center.x, center.y - 8, center.x, center.y + 8);

  let fark = createVector(mouse.x - center.x, mouse.y - center.y);

  stroke(200, 40, 40);
  strokeWeight(3);
  line(0, 0, fark.x, fark.y);

  translate(center.x, center.y); // (0, 0) artık tuvalin ortası
  stroke(20);
  strokeWeight(3);
  line(0, 0, fark.x, fark.y);
}` }],
    },
    walkerV: {
      title: "Walker, konum bir vektör",
      files: [{ name: "sketch.js", content: `let walker;

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
    this.pos = createVector(width / 2, height / 2);
  }

  show() {
    stroke(0);
    strokeWeight(3);
    point(this.pos.x, this.pos.y);
  }

  step() {
    let adim = createVector(floor(random(3)) - 1, floor(random(3)) - 1);
    this.pos.add(adim);
    this.pos.x = constrain(this.pos.x, 0, width - 1);
    this.pos.y = constrain(this.pos.y, 0, height - 1);
  }
}` }],
    },
    limitVs: {
      title: "limit yönü korur, eksen kesmek korumaz",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  let raw = createVector(90, 55);
  fill(20);
  noStroke();
  text("Gri ham ok. Siyah limit(40): yön aynı.", 10, 22);
  text("Kırmızı: x ve y ayrı kesildi, yön değişti.", 10, 42);

  push();
  translate(80, 170);
  stroke(200);
  strokeWeight(2);
  line(0, 0, raw.x, raw.y);
  let lim = raw.copy();
  lim.limit(40);
  stroke(20);
  strokeWeight(4);
  line(0, 0, lim.x, lim.y);
  fill(20);
  noStroke();
  text("limit(40)", -24, 50);
  pop();

  push();
  translate(250, 170);
  stroke(200);
  strokeWeight(2);
  line(0, 0, raw.x, raw.y);
  let kesik = createVector(
    constrain(raw.x, -40, 40),
    constrain(raw.y, -40, 40)
  );
  stroke(180, 40, 40);
  strokeWeight(4);
  line(0, 0, kesik.x, kesik.y);
  fill(20);
  noStroke();
  text("constrain x, y", -36, 50);
  pop();
}` }],
    },
    ex13: {
      title: "Örnek 1.3: Fare eksi merkez",
      original: {
        book: "https://natureofcode.com/vectors/#example-13-vector-subtraction",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/01_vectors/example_1_3_vector_subtraction",
      },
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  let mouse = createVector(mouseX, mouseY);
  let center = createVector(width / 2, height / 2);
  strokeWeight(3);
  stroke(200);
  line(0, 0, mouse.x, mouse.y);
  line(0, 0, center.x, center.y);
  mouse.sub(center);
  stroke(0);
  translate(width / 2, height / 2); // (0, 0) artık tuvalin ortası
  line(0, 0, mouse.x, mouse.y);
}` }],
    },
    ex14: {
      title: "Örnek 1.4: Okun yarısı",
      original: {
        book: "https://natureofcode.com/vectors/#example-14-multiplying-a-vector",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/01_vectors/example_1_4_vector_multiplication",
      },
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  let mouse = createVector(mouseX, mouseY);
  let center = createVector(width / 2, height / 2);
  mouse.sub(center);
  translate(width / 2, height / 2); // (0, 0) artık tuvalin ortası
  strokeWeight(2);
  stroke(200);
  line(0, 0, mouse.x, mouse.y);
  mouse.mult(0.5);
  stroke(0);
  strokeWeight(4);
  line(0, 0, mouse.x, mouse.y);
}` }],
    },
    ex15: {
      title: "Örnek 1.5: mag() üst çubuk",
      original: {
        book: "https://natureofcode.com/vectors/#example-15-vector-magnitude",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/01_vectors/example_1_5_vector_magnitude",
      },
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  let mouse = createVector(mouseX, mouseY);
  let center = createVector(width / 2, height / 2);
  mouse.sub(center);
  let m = mouse.mag();
  fill(0);
  noStroke();
  rect(0, 0, m, 12);
  fill(20);
  text("mag = " + floor(m), 8, 32);
  translate(width / 2, height / 2); // (0, 0) artık tuvalin ortası
  stroke(0);
  line(0, 0, mouse.x, mouse.y);
}` }],
    },
    ex16: {
      title: "Örnek 1.6: Yön aynı, uzunluk 50",
      original: {
        book: "https://natureofcode.com/vectors/#example-16-normalizing-a-vector",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/01_vectors/example_1_6_vector_normalize",
      },
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  let mouse = createVector(mouseX, mouseY);
  let center = createVector(width / 2, height / 2);
  mouse.sub(center);
  translate(width / 2, height / 2); // (0, 0) artık tuvalin ortası
  stroke(200);
  strokeWeight(2);
  line(0, 0, mouse.x, mouse.y);
  mouse.normalize();
  mouse.mult(50);
  stroke(0);
  strokeWeight(6);
  line(0, 0, mouse.x, mouse.y);
}` }],
    },
    ex17: {
      title: "Örnek 1.7: Motion 101 — hız",
      original: {
        book: "https://natureofcode.com/vectors/#example-17-motion-101-velocity",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/01_vectors/example_1_7_motion_101_velocity",
      },
      files: [
        {
          name: "mover.js",
          content: `class Mover {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-2, 2), random(-2, 2));
  }

  update() {
    this.position.add(this.velocity);
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(127);
    circle(this.position.x, this.position.y, 48);
  }

  checkEdges() {
    if (this.position.x > width) this.position.x = 0;
    else if (this.position.x < 0) this.position.x = width;
    if (this.position.y > height) this.position.y = 0;
    else if (this.position.y < 0) this.position.y = height;
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let mover;

function setup() {
  createCanvas(400, 240);
  mover = new Mover();
}

function draw() {
  background(255);
  mover.update();
  mover.checkEdges();
  mover.show();
}`,
        },
      ],
    },
    ex18: {
      title: "Örnek 1.8: Sabit ivme + limit",
      original: {
        book: "https://natureofcode.com/vectors/#example-18-motion-101-velocity-and-constant-acceleration",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/01_vectors/example_1_8_motion_101_velocity_and_constant_acceleration",
      },
      files: [
        {
          name: "mover.js",
          content: `class Mover {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(-0.001, 0.01);
    this.topSpeed = 10;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.position.add(this.velocity);
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(127);
    circle(this.position.x, this.position.y, 48);
  }

  checkEdges() {
    if (this.position.x > width) this.position.x = 0;
    else if (this.position.x < 0) this.position.x = width;
    if (this.position.y > height) this.position.y = 0;
    else if (this.position.y < 0) this.position.y = height;
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let mover;

function setup() {
  createCanvas(400, 240);
  mover = new Mover();
}

function draw() {
  background(255);
  mover.update();
  mover.checkEdges();
  mover.show();
}`,
        },
      ],
    },
    ex19: {
      title: "Örnek 1.9: Rastgele ivme",
      original: {
        book: "https://natureofcode.com/vectors/#example-19-motion-101-velocity-and-random-acceleration",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/01_vectors/example_1_9_motion_101_velocity_and_random_acceleration",
      },
      files: [
        {
          name: "mover.js",
          content: `class Mover {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.velocity = createVector(0, 0);
    this.topSpeed = 5;
  }

  update() {
    this.acceleration = p5.Vector.random2D();
    this.acceleration.mult(random(2));
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.position.add(this.velocity);
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(127);
    circle(this.position.x, this.position.y, 48);
  }

  checkEdges() {
    if (this.position.x > width) this.position.x = 0;
    else if (this.position.x < 0) this.position.x = width;
    if (this.position.y > height) this.position.y = 0;
    else if (this.position.y < 0) this.position.y = height;
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let mover;

function setup() {
  createCanvas(400, 240);
  mover = new Mover();
}

function draw() {
  background(255);
  mover.update();
  mover.checkEdges();
  mover.show();
}`,
        },
      ],
    },
    ex110: {
      title: "Örnek 1.10: Fareye ivme",
      original: {
        book: "https://natureofcode.com/vectors/#example-110-accelerating-toward-the-mouse",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/01_vectors/example_1_10_accelerating_towards_the_mouse",
      },
      files: [
        {
          name: "mover.js",
          content: `class Mover {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.velocity = createVector(0, 0);
    this.topSpeed = 5;
  }

  update() {
    let mouse = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(mouse, this.position);
    dir.normalize();
    dir.mult(0.2);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.position.add(this.velocity);
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(127);
    circle(this.position.x, this.position.y, 48);
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let mover;

function setup() {
  createCanvas(400, 240);
  mover = new Mover();
}

function draw() {
  background(255);
  mover.update();
  mover.show();
}`,
        },
      ],
    },
  },
});
