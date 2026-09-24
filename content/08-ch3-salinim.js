registerChapter({
  id: "ch3",
  title: "3. Salınım",
  short: "3. Salınım",
  icon: "🌊",
  original: "https://natureofcode.com/oscillation/",
  originalCode:
    "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/03_oscillation",
  html: `
    <p style="font-style:italic;color:var(--muted);">“Trigonometry is a sine of the times.” — Anonymous</p>
    <p style="font-style:italic;color:var(--muted);font-size:0.95em;">(İngilizce kelime oyunu: <em>sine</em> / <em>sign</em>. Trigonometri bu bölümün zamanının işareti.)</p>

    ${N.img(
      "03_oscillation",
      "03_oscillation_1.png",
      "Bridget Riley, Gala, 1974 (akrilik, 159,7 × 159,7 cm). Op Art’ın ritmi: kavisler tuvalde sine dalgası gibi ilerler. Kitap salınımı bu resimle açar."
    )}

    <p>Bölüm 1 ve 2’de konum, hız, ivme birer vektördü; kuvvetler onları itiyordu. Oradan parçacık sistemine, sürüşe, sürüye atlamak cazip durur. Atlamak, doğadaki bir hareketi atlamak olur: <strong>salınım</strong> — bir cismin bir merkezin iki yanında ileri geri gitmesi.</p>
    <p>Parktaki salıncak, gitar teli, kapı yayı, nefes. Bunları koda çevirmek üçgene bakmayı ister: trigonometri. Bu bölümde açı, döndürme, <code>sin</code> / <code>cos</code>, yay ve sarkaç aynı masaya gelir. Amaç formül ezberi değil: tuvalde bir şeklin “neden o yöne baktığını” söyleyebilmek.</p>

    ${N.note(
      "Bu bölümün çıktısı",
      `<ul>
        <li><code>rotate</code>, <code>translate</code>, <code>push</code> / <code>pop</code>: döndürmeyi göbekten, başka cisimleri bozmadan</li>
        <li>Açısal hız ve ivme: kare kare tek bir sayı (açı) birikir</li>
        <li><code>atan2</code> / <code>heading</code>: hız vektörünün baktığı yöne döndürmek</li>
        <li>Polar → Kartezyen: <code>cos</code> / <code>sin</code> ile çember ve sarmal</li>
        <li>Basit harmonik hareket, dalga, Hooke yayı, sarkaç</li>
      </ul>`
    )}

    <h2>Açılar</h2>

    <p>Saat 12’den 3’e bakın: çeyrek tur. Günlük dilde buna 90 derece deriz. Pizza’nın dörtte biri, defter köşesi, duvar dikmesi: hepsi aynı dilim. Tam tur 360 parçaya bölünür; her parça 1 <strong>derece</strong>.</p>
    ${N.img(
      "03_oscillation",
      "03_oscillation_2.png",
      "Şekil 3.1: Derece cetveli. 90° dik açı; 180° yarım tur; 360° tam tur."
    )}
    ${N.img(
      "03_oscillation",
      "03_oscillation_3.png",
      "Şekil 3.2: Merkezinden 45° döndürülmüş kare. Grafikte açı, şekli kendi göbeğinden çevirir."
    )}
    <p>p5.js bu dilimi başka bir cetvelle ölçer. <code>rotate</code>, <code>sin</code>, <code>cos</code> varsayılan olarak derece okumaz; <strong>radyan</strong> okur. Tur aynı turdur; kâğıda geçen rakam değişir. Bir metre ile yüz santimetre gibi: uzunluk aynı, yazılan sayı farklı.</p>
    ${N.img(
      "03_oscillation",
      "03_oscillation_4.png",
      "Şekil 3.3: 1 radyan. Yay uzunluğu, yarıçapa eşit olunca açı 1 radyandır."
    )}
    ${N.note(
      "π nedir?",
      `<p>Bir çemberin çevresinin çapına oranı. Yaklaşık 3,14159. p5.js bunu hazır sabit <code>PI</code> ile verir. Çevre = <code>PI</code> × çap, ya da <code>TWO_PI</code> × yarıçap.</p>`
    )}
    <p>Radyan, yarıçapı 1 olan çemberin yayından gelir. Tam tur o çevredir. Aşağıdaki tablo aynı turu iki cetvelde yazar; cümlede üçünü üst üste dizmeyin, tabloya bakın.</p>
    <table class="data">
      <thead><tr><th>Ne kadar döndünüz</th><th>Derece</th><th>p5.js (radyan)</th></tr></thead>
      <tbody>
        <tr><td>çeyrek tur</td><td>90°</td><td><code>HALF_PI</code> ≈ 1,57</td></tr>
        <tr><td>yarım tur</td><td>180°</td><td><code>PI</code> ≈ 3,14</td></tr>
        <tr><td>tam tur</td><td>360°</td><td><code>TWO_PI</code> ≈ 6,28</td></tr>
      </tbody>
    </table>
    ${N.math(
      "radyan = (2π × derece) / 360",
      "Aynı iş p5.js’te <code>radians(derece)</code> ile yapılır: tek argüman, derece cinsinden açı; dönüş radyan. Tersi <code>degrees(radyan)</code>."
    )}
    <p><strong>Tuzak:</strong> <code>rotate(90)</code>. Siz “çeyrek tur” dersiniz. p5.js 90 radyan okur. Tam tur yaklaşık 6,28 radyan olduğu için 90, on dört turdan biraz fazladır. Çubuk bulanık döner; kod bozuk değildir, birim karışmıştır.</p>
    <p>İki sağlam alışkanlık — bir sketch’te yalnızca birini seçin:</p>
    <ol>
      <li><code>setup</code> içinde <code>angleMode(DEGREES)</code> — o dosyada <code>rotate(90)</code> gerçekten çeyrek turdur.</li>
      <li>Varsayılanı bırakın: <code>rotate(radians(90))</code> veya <code>rotate(HALF_PI)</code>.</li>
    </ol>
    <p>Aşağıda fare sola–sağa 0–360 üretir. Sol çubuk o sayıyı doğrudan <code>rotate</code>’e verir (radyan okunur). Sağ çubuk aynı sayıyı <code>radians</code> ile çevirir. Fareyi ortaya götürün: sağ çeyrek–yarım turda durur, sol onlarca tur atmıştır.</p>
    ${N.editor("rotate90")}
    ${N.tryit([
      { do: "Fareyi tuvalin soluna, ortasına, sağına götürün.", expect: "Sağ çubuk 0° / ~180° / 360°; sol, aynı sayıda radyan olduğu için hızla döner." },
      { do: "Sağdaki rotate(radians(derece)) yerine rotate(derece) yazın.", expect: "İki çubuk da tuzak tarafına düşer; ikisi de bulanık döner." },
    ])}
    ${N.quiz(
      "angleMode yok. rotate(90) ne yapar?",
      ["Çeyrek tur (90°)", "90 radyan döner — birçok tam tur", "Hiç dönmez"],
      1,
      "Varsayılan radyan. 90 ≈ 14 tur. Çeyrek tur için radians(90), HALF_PI veya angleMode(DEGREES)."
    )}
    <p>Hazırlık sayfalarında cetvel var (<a href="#/mat">matematik</a>, <a href="#/p5">p5.js</a>). Bu bölümün örnekleri <code>rotate</code> olmadan durmaz; tuzağı burada, bu karede görmeniz gerekir.</p>

    <h3>translate: önce meydana git</h3>
    <p>Bir kare çizip <code>rotate</code> yazmak, kareyi kendi göbeğinden döndürmez. p5.js her şeyi sol üstteki (0, 0) etrafında döndürür. Kare tuvalin ortasındaysa, dönerken köşeden savrulur — meydan talimatı surdan yürümeye benzer.</p>
    <p><code>translate(x, y)</code> kalemi değil, <strong>koordinat sistemini</strong> kaydırır. Yeni (0, 0) eski (x, y) olur. Ondan sonra <code>rotate</code> o yeni orijin etrafında döner. Kareyi <code>rect(0, 0, …)</code> ile oraya çizerseniz göbekten döner.</p>
    ${N.warn(
      "rect(width/2, height/2) + rotate",
      `<p>Orijin hâlâ sol üstse kare merkezde durur ama <em>dönüş ekseni</em> köşedir. Görüntü: kare yörüngeye çıkar. Çözüm sıra: <code>translate</code> merkeze, <code>rotate</code> açı, şekil (0, 0)’da.</p>`
    )}
    <p><code>draw</code> her kare başında kaydırmayı sıfırlar; kare sonunda geri almanız gerekmez. Aynı kare içinde iki kez <code>translate</code> yazarsanız kaymalar <em>toplanır</em>.</p>
    <p>Aşağıda ikisi birden. Sol: <code>translate</code> yok; kırmızı çubuk köşeden uçar. Sağ: orijin merkeze kaydı, mavi çubuk göbekten döner. Açı ikisinde de aynı sayıdır.</p>
    ${N.editor("nedenRotate")}
    ${N.tryit([
      { do: "Sağdaki translate satırını yorumlayın.", expect: "Mavi de kırmızıya biner; ikisi de sol üstten savrulur." },
    ])}
    ${N.quiz(
      "translate(200, 120) sonra circle(0, 0, 10) daireyi nereye çizer?",
      ["Sol üst (0, 0)", "Tuvalin (200, 120) noktası", "Hata verir"],
      1,
      "Orijin kaydı; (0, 0) artık eski (200, 120)’dir."
    )}

    <h3>push ve pop: fotoğraf çek, geri dön</h3>
    <p>İki cisim ayrı ayrı dönecekse her birini kendi kutusuna alın. <code>push()</code> o anki kaydırma, döndürme, rengi fotoğraflar. <code>pop()</code> fotoğrafa döner. Unutulan <code>pop</code>, ikinci cismin birincinin açısının üstüne binmesi demektir — “her şey çıldırdı” hissinin sık nedeni.</p>
    <p>Solda <code>pop</code> yok: ikinci çubuk birincinin dönüşünü de taşır. Sağda her çubuk <code>push</code> / <code>pop</code> içinde; dönüşler bağımsızdır.</p>
    ${N.editor("ikiPushPop")}
    ${N.tryit([
      { do: "Sağdaki ilk pop() satırını silin.", expect: "Turuncu, mavinin üstüne biner; iki kutu tek kutuya çöker." },
    ])}

    ${N.note(
      "Alıştırma 3.1 (orijinal)",
      `<p>Bir baton benzeri cismi <code>translate</code> ve <code>rotate</code> ile merkezinden döndürün.</p>
      <p><a href="https://natureofcode.com/oscillation/#exercise-31" target="_blank" rel="noopener">Exercise 3.1</a></p>`
    )}
    <p>Kitabın gösterdiği baton: her kareye sabit bir açı eklenir. Merkez <code>translate</code>, sonra <code>rotate</code>, sonra çizgi ve iki daire (0, 0)’a göre.</p>
    ${N.editor("baton")}

    <h2>Açısal hareket</h2>

    <p>Doğrusal harekette hız, konumun kare kare değişimidir; ivme, hızın değişimidir. Dönüş için aynı şelale, tek sayı üzerinde:</p>
    ${N.math(
      "açısal hız = açısal hız + açısal ivme",
      "p5.js’te skaler toplama: <code>angleVelocity += angleAcceleration</code>. Vektör yok; iki boyutta dönme ekseni tuvale dik tek eksendir."
    )}
    ${N.math(
      "açı = açı + açısal hız",
      "Her kare: <code>angle += angleVelocity</code>. Sonra <code>rotate(angle)</code> — <code>angle</code> radyan (varsayılan). Bu, <code>position.add(velocity)</code> cümlesinin açı dilidir."
    )}
    <p>Batonu her kare <code>angle = angle + 0.1</code> ile çevirmek sabit hızdır. İvme ekleyince hız da kare kare büyür: önce yavaş, sonra çılgın.</p>

    <h3>Örnek 3.1: rotate ile açısal hareket</h3>
    <p>Sıra yük taşır. Önce <code>translate(width / 2, height / 2)</code> — orijin tuvalin ortası. Sonra <code>rotate(angle)</code> — o orta nokta etrafında. Çizgi <code>line(-60, 0, 60, 0)</code> artık merkeze göredir; iki daire uçlardadır. <code>translate</code> olmasa baton sol üstten savrulur.</p>
    ${N.editor("ex31")}
    ${N.tryit([
      { do: "angleAcceleration değerini 0.001 yapın.", expect: "Daha çabuk hızlanır; birkaç saniyede bulanık döner." },
      { do: "translate satırını yorumlayın.", expect: "Baton köşeden uçar; rotate hâlâ (0, 0) etrafındadır." },
    ])}

    ${N.note(
      "Alıştırma 3.2 (orijinal)",
      `<p>Dönen batona etkileşim ekleyin. İvmeyi fareyle nasıl kontrol edersiniz? Sürtünme (açısal hızı zamanla küçültmek) batonu durdurur mu?</p>
      <p><a href="https://natureofcode.com/oscillation/#exercise-32" target="_blank" rel="noopener">Exercise 3.2</a></p>`
    )}

    <p>Aynı şelaleyi <code>Mover</code> sınıfına koymak: kurucuya <code>angle</code>, <code>angleVelocity</code>, <code>angleAcceleration</code>. <code>update</code> içinde konum şelalesinin yanına açı şelalesi. <code>show</code> içinde cismin olduğu yere <code>translate</code>, sonra <code>rotate(this.angle)</code>. Daire kendi başına dönüşü göstermez; merkeze bir çizgi veya dikdörtgen ekleyin.</p>
    <p>İvme sıfır kalırsa hiçbir şey dönmez. Sabit 0.01 yazmak işe yarar ama sıkıcıdır. Kitap kaba bir köprü kurar: doğrusal ivmenin x bileşenini açısal ivme say. Sağa hızlanınca saat yönünde, sola hızlanınca tersine. Bu fizik kitabı torku değil; görüntü üretir.</p>
    <p>Ölçek bozulmasın diye iki fren: x’i 10’a böl, açısal hızı <code>constrain(..., -0.1, 0.1)</code> ile kes. Kesmezseniz kareler arasında açı o kadar atlar ki tekerlek tersine dönüyor gibi görünür (wagon-wheel).</p>

    <h3>Örnek 3.2: Kuvvetler ve (kaba) açısal hareket</h3>
    <p>Her karede her <code>Mover</code> kendi <code>push</code> / <code>pop</code> kutusunda: orijin o cismin konumuna kayar, <code>rotate(this.angle)</code> yalnız onu döndürür, <code>pop</code> dünyayı geri verir. Kutusu olmayan ikinci cisim birincinin açısını da taşırdı.</p>
    ${N.editor("ex32")}
    ${N.tryit([
      { do: "constrain satırını yorumlayın.", expect: "Kutular hızla çıldırır; bazen tersine dönüyor gibi durur." },
      { do: "show içindeki pop() satırını silin.", expect: "Sonraki cisimler birikmiş translate/rotate ile savrulur." },
    ])}

    ${N.note(
      "Alıştırma 3.3 (orijinal)",
      `<p>Topu bir topdan fırlatın: bir kez ani kuvvet, sonra sürekli yerçekimi. İkinci adım: dönüş ekleyin. Ne kadar inandırıcı görünebilir?</p>
      <p><a href="https://natureofcode.com/oscillation/#exercise-33" target="_blank" rel="noopener">Exercise 3.3</a></p>`
    )}

    <h2>Trigonometri fonksiyonları</h2>

    <p>Dik üçgenin bir açısını seçin. O açıya değen kenar <em>komşu</em>, değmeyen <em>karşı</em>, dik açının karşısı <em>hipotenüs</em>. Ezber sözcüğü <em>sohcahtoa</em> bu üç oranı bağlar. Ezberlemeyin; üçgeni bir kez çizin, oranı okuyun.</p>
    ${N.img(
      "03_oscillation",
      "03_oscillation_5.png",
      "Şekil 3.4: Dik üçgen. Komşu, karşı, hipotenüs. Açı, bu üç kenardan okunur."
    )}
    ${N.math(
      "sin(açı) = karşı / hipotenüs",
      "p5.js’te <code>sin(açı)</code>: tek argüman radyan (varsayılan). Sonuç −1 ile 1 arasındadır. <code>angleMode(DEGREES)</code> açıksa argüman derecedir."
    )}
    ${N.math(
      "cos(açı) = komşu / hipotenüs",
      "p5.js <code>cos(açı)</code>. Çemberde yatay pay. Polar çeviride <code>x = r * cos(theta)</code> bu orandan gelir."
    )}
    ${N.math(
      "tan(açı) = karşı / komşu",
      "p5.js <code>tan(açı)</code>. Vektörde bu, <code>y / x</code> eğimidir. Açıyı eğimden geri almak için tersi gerekir: <code>atan</code> / <code>atan2</code>."
    )}
    ${N.img(
      "03_oscillation",
      "03_oscillation_6.png",
      "Şekil 3.5: Vektör oku hipotenüs; x ve y kenarlar; açı yön (heading)."
    )}
    <p>Vektörü bu üçgene yatırınca trigonometri, bileşenlerle yön+uzunluk arasında köprü olur. İlk iş: teğetin tersi — “eğimden açı.”</p>

    <h2>Hareket yönüne bakmak</h2>

    <p>Örnek 1.10’daki daire fareye ivmeleniyordu. Daireyi döndürmek görünmez: her açı aynı resim. Araba, karınca, gemi çizerseniz cismin <em>baktığı yer</em> hızının baktığı yer olsun istersiniz.</p>
    ${N.editor("fig36")}
    <p>Şekil 3.6: daire fareye gider; dönüş yok, gerek de yok. Dikdörtgen olsa ucu hız vektörüne bakmalı.</p>
    ${N.img(
      "03_oscillation",
      "03_oscillation_7.png",
      "Şekil 3.7: Hız vektörünün açısının tanjantı y / x’tir."
    )}
    <p>“Yönüne bak” demek, p5.js’te <code>rotate(birAçı)</code> demektir. Elinizde vektörün x’i ve y’si var; <code>rotate</code> tek sayı ister. Teğet o sayıyı bağlar:</p>
    ${N.math(
      "tan(açı) = hız<sub>y</sub> / hız<sub>x</sub>",
      "Bileşenler biliniyor, açı değil. Ters teğet: <code>atan(y / x)</code> — p5.js <code>atan(tekSayı)</code> oranı alır, radyan döner. Bölme, işaretleri yok eder."
    )}
    ${N.img(
      "03_oscillation",
      "03_oscillation_8.png",
      "Şekil 3.8: (−4, 3) ile (4, −3) zıt yönler. y/x ikisinde de −0,75; atan aynı açıyı verir."
    )}
    <p>İki kişi aynı eğimde, zıt istikamette yürür. <code>atan(y / x)</code> eğimi görür, istikameti kaybeder. Dört çeyreği ayırmak için p5.js <code>atan2(y, x)</code> verir: iki ayrı argüman, işaretler durur. Sıra y sonra x’tir — matematik tahtasındaki atan2 ile aynı.</p>
    <p>Aşağıda iki ok: biri fareye, biri tam tersine. <code>atan</code> ikisine aynı sayıyı yazar. <code>atan2</code> birini diğerinden yarım tur ayırır. Fareyi gezdirin; kırmızı etiketler yapışır, mavi etiketler ayrılır.</p>
    ${N.editor("atanKarsilastir")}
    ${N.tryit([
      { do: "Fareyi merkeze göre sağ üstte ve sol altta tutun.", expect: "atan satırları aynı (veya çok yakın); atan2 yaklaşık yarım tur farklı." },
    ])}
    ${N.quiz(
      "atan(y / x) neden zıt iki vektöre aynı açıyı verebilir?",
      ["p5.js hatası", "Bölme işaretleri yok eder; −3/4 ile 3/−4 aynı oran", "Derece/radyan karışması"],
      1,
      "atan2(y, x) iki bileşeni ayrı alır; çeyreği korur."
    )}

    <h3>Örnek 3.3: Hareket yönüne bakmak</h3>
    <p><code>show</code> içinde: <code>atan2(this.velocity.y, this.velocity.x)</code>, sonra <code>translate</code> konuma, <code>rotate(angle)</code>, <code>rect(0, 0, 30, 10)</code> merkeze hizalı. Daha kısası: <code>this.velocity.heading()</code> — içeride aynı <code>atan2</code>. Trigonometriyi yazmasanız da neyi sakladığını bilin.</p>
    ${N.editor("ex33")}
    ${N.tryit([
      { do: "heading() yerine atan(this.velocity.y / this.velocity.x) yazın.", expect: "Sol yarıda dikdörtgen tersine bakabilir; çeyrek kaybı." },
    ])}

    ${N.note(
      "Alıştırma 3.4 (orijinal)",
      `<p>Ok tuşlarıyla sürülen bir araç: sol ok sola ivme, sağ ok sağa. Gövde o anki hareket yönüne baksın.</p>
      <p><a href="https://natureofcode.com/oscillation/#exercise-34" target="_blank" rel="noopener">Exercise 3.4</a></p>`
    )}

    <h2>Polar ve Kartezyen koordinatlar</h2>

    <p>Tuvalde bir daire çizmek x ve y ister: sağa kaç piksel, aşağı kaç piksel. Buna <strong>Kartezyen</strong> denir. Başka bir tarif: orijinden ne kadar uzak (yarıçap r) ve orijin etrafında ne kadar dönmüş (açı θ, theta). Buna <strong>polar</strong> denir. Vektör dilinde: Kartezyen bileşenler, polar uzunluk + yön.</p>
    <p>Çemberde yürümek Kartezyen ile zahmetlidir (her kare hem x hem y değişir). Polar ile tek iş: açıyı artırmak. p5.js çizim fonksiyonları yine x, y ister; köprü trigonometri.</p>
    ${N.img(
      "03_oscillation",
      "03_oscillation_9.png",
      "Şekil 3.9: Polar (r, θ) ve Kartezyen (x, y). θ (theta) açı. Kitapta açı değişkenine sık sık theta denir."
    )}
    ${N.math(
      "x = r · cos(θ)",
      "p5.js: <code>x = r * cos(theta)</code>. <code>cos</code> açıyı radyan bekler; r piksel cinsinden uzaklık. Sonuç, orijine göre yatay kayma."
    )}
    ${N.math(
      "y = r · sin(θ)",
      "p5.js: <code>y = r * sin(theta)</code>. Tuvalde +y aşağıdır; açı 0 iken <code>cos</code> 1, <code>sin</code> 0 — nokta orijinin sağındadır."
    )}
    <p>Fare açıyı, sabit r yarıçapı belirlesin. Tuval hem (r, θ) hem (x, y) yazar. Çemberin üstünde dolaşırsınız; sayılar iki dili birden gösterir.</p>
    ${N.editor("polarFare")}
    ${N.tryit([
      { do: "r = 80 yerine r = 40 yazın.", expect: "Daire küçülür; theta aynı, x ve y yarıya iner." },
    ])}

    <h3>Örnek 3.4: Polar’dan Kartezyen’e</h3>
    <p>Yine önce <code>translate</code> merkeze: polar’ın orijini tuvalin ortası olsun. Her kare <code>theta += 0.02</code> — r sabit, açı yürür, daire çember çizer. <code>line(0, 0, x, y)</code> yarıçapı gösterir.</p>
    ${N.editor("ex34")}
    ${N.tryit([
      { do: "theta += 0.02 yerine 0.08 yazın.", expect: "Daha hızlı tur; r aynı, çember aynı." },
      { do: "translate satırını yorumlayın.", expect: "Çember sol üste kayar; polar hâlâ (0, 0)’a göredir." },
    ])}
    <p>Aynı çeviri vektörle: <code>p5.Vector.fromAngle(theta)</code> uzunluğu 1, yönü theta olan bir ok üretir. <code>mult(r)</code> onu yarıçapa çeker. <code>circle(position.x, position.y, 48)</code> yine Kartezyen ister.</p>

    ${N.note(
      "Alıştırma 3.5 (orijinal)",
      `<p>Örnek 3.4’ten sarmal: merkezden dışarı. Bir satır değişir, bir satır eklenir.</p>
      <p><a href="https://natureofcode.com/oscillation/#exercise-35" target="_blank" rel="noopener">Exercise 3.5</a></p>`
    )}
    <p>Kitabın gösterdiği sarmal: her kare hem <code>theta</code> hem <code>r</code> artar. Açı yürür, yarıçap uzar; iz dışarı açılır. <code>background</code> yalnız <code>setup</code>’ta olduğu için noktalar birikir.</p>
    ${N.editor("spiral")}

    ${N.note(
      "Alıştırma 3.6 (orijinal)",
      `<p><em>Asteroids</em> gemisi: üçgen, sol/sağ ok dönüş, Z tuşu baktığı yöne itki. Polar kuvvet: <code>p5.Vector.fromAngle(heading)</code>.</p>
      <p><a href="https://natureofcode.com/oscillation/#exercise-36" target="_blank" rel="noopener">Exercise 3.6</a></p>`
    )}
    ${N.editor("asteroids")}

    <h2>Salınımın özellikleri</h2>

    <p><code>sin</code>’in grafiği −1 ile 1 arasında pürüzsüz bir kavis çizer; sonra aynı kavis tekrar eder. Gitar teli, salıncak, pogo: iki uç arasında periyodik gidiş. Buna <strong>salınım</strong> denir. Tuvalde bir dairenin x’ine <code>sin</code> yazmak, o kavisı harekete çevirir.</p>
    ${N.img(
      "03_oscillation",
      "03_oscillation_10.png",
      "Şekil 3.10: y = sin(x). Çıktı −1 ile 1 arasında; bir tam dalga, giriş cetvelinde bir tam turdur."
    )}
    <p>Merkezin iki yanında ileri geri gitmeye <strong>basit harmonik hareket</strong> denir. İki ölçü:</p>
    <ul>
      <li><strong>Genlik:</strong> merkezden bir uca piksel. Tuval 400 genişlikteyse merkezden 160 sağ, 160 sol makul bir genliktir.</li>
      <li><strong>Periyot:</strong> bir tam gidiş-dönüşün süresi. Gerçek saniye şart değil; p5.js’te zaman çoğu zaman <code>frameCount</code> (kaç kare geçti).</li>
    </ul>
    <p><code>sin</code> çıplak haliyle genliği 1, periyodu bir tam turdur (radyan cetvelinde). Sizin daireniz 160 piksel gitsin, 120 karede bir tur atsın istiyorsanız bu iki sayıyı formüle yerleştirirsiniz.</p>
    ${N.math(
      "x = A · sin(TWO_PI · frameCount / period)",
      "A genlik (piksel). <code>sin</code> −1…1 döner; A ile çarpınca −A…A. <code>frameCount</code> p5.js kare sayacıdır. <code>period</code> bir tur kaç kare. <code>TWO_PI</code> bir tam tur radyanı: kare/periyot oranı 1 olunca <code>sin</code> tam bir dalga bitirmiş olur."
    )}
    <p>120 karede bir tur istiyorsanız: kare 0’da argüman 0, kare 60’ta yarım tur, kare 120’de bir tur. Tablo, cümleyi sayıyla bağlar.</p>
    <table class="data">
      <thead><tr><th><code>frameCount</code></th><th>biten tur (<code>frameCount / period</code>)</th><th><code>sin</code> girişi</th></tr></thead>
      <tbody>
        <tr><td>0</td><td>0</td><td>0</td></tr>
        <tr><td>60</td><td>0,5</td><td>yarım tur (<code>PI</code>)</td></tr>
        <tr><td>120</td><td>1</td><td>bir tur (<code>TWO_PI</code>)</td></tr>
        <tr><td>240</td><td>2</td><td>iki tur</td></tr>
      </tbody>
    </table>

    <h3>Örnek 3.5: Basit harmonik hareket I</h3>
    <p>Orijin merkeze kayar; daire x = genlik × sin(…). Çizgi merkezi uca bağlar. Periyot 120 kare: iki saniye civarı bir gidiş-dönüş (60 fps varsayımı). Genlik 160: daire kenara yapışmadan döner.</p>
    ${N.editor("ex35")}
    ${N.tryit([
      { do: "period = 40 yazın.", expect: "Daha sık salınır; genlik aynı, uçlar aynı." },
      { do: "amplitude = 40 yazın.", expect: "Kısa yol; tempo aynı." },
    ])}
    <p><strong>Frekans</strong> periyodun tersidir: 1 / periyot. 120 karede bir tur = her karede 1/120 tur. Bu örnek periyodu yazar; bazen frekansı yazmak daha rahat olur.</p>

    ${N.note(
      "Alıştırma 3.7 (orijinal)",
      `<p><code>sin</code> ve <code>map</code> ile tavandan asılı bir ağırlık (bob). Yay kuvvetlerini Hooke ile modellemek bu bölümün sonunda.</p>
      <p><a href="https://natureofcode.com/oscillation/#exercise-37" target="_blank" rel="noopener">Exercise 3.7</a></p>`
    )}

    <h2>Açısal hızla salınım</h2>

    <p>Periyodu kare kare saymak istemiyorsanız — rastgele tempo, “yeter ki pürüzsüz olsun” — <code>sin</code>’in içine yavaş artan bir açı yeter. Her tam turda (radyan cetvelinde bir tur) daire bir salınım bitirir. Bölüm 0’daki Perlin <code>t += 0.01</code> cümlesinin kuzeni: orada gürültü, burada tekrarlayan dalga.</p>
    <p><code>angle += angleVelocity</code>, sonra <code>x = amplitude * sin(angle)</code>. Periyot yok olmaz: açısal hız büyüdükçe tur kısalır.</p>
    ${N.math(
      "periyot = TWO_PI / açısal hız",
      "Açı her kare <code>angleVelocity</code> kadar artar. Bir tur için toplam artış bir tam tur radyanı kadardır. p5.js’te <code>TWO_PI / angleVelocity</code> kare cinsinden periyodu verir."
    )}

    <h3>Örnek 3.6: Basit harmonik hareket II</h3>
    ${N.editor("ex36")}
    ${N.tryit([
      { do: "angleVelocity = 0.2 yapın.", expect: "Daha kısa periyot; uçlar aynı genlikte." },
    ])}

    <p>Hem yatay hem dikey salınan bir cisim: iki açı, iki hız, iki genlik. Kitap bunları üç <code>p5.Vector</code>’e koyar. Bu vektörler konum değildir; iki sayıyı bir isimde taşır. <code>show</code> içinde <code>sin</code> onları tekrar piksele çevirir.</p>

    <h3>Örnek 3.7: Oscillator nesneleri</h3>
    <p>Her nesne kendi <code>push</code> / <code>pop</code> kutusunda merkeze <code>translate</code> eder. On tane olunca kutular birbirinin orijinini bozmaz. Bir tanesine bakın: önce yalnız yatay gidiş-dönüş, sonra yalnız dikey; ikisi birlikte bir elipsimsi dans.</p>
    ${N.editor("ex37")}
    ${N.tryit([
      { do: "Oscillator sayısını 3 yapın.", expect: "Kalabalık azalır; her çizgi hâlâ kendi temposunda." },
    ])}

    ${N.note(
      "Alıştırmalar 3.8–3.9 (orijinal)",
      `<p>3.8: Rastgele yerine düzenli hız/genlik — böcek bacağı gibi. 3.9: Oscillator’a açısal ivme.</p>
      <p><a href="https://natureofcode.com/oscillation/#exercise-38" target="_blank" rel="noopener">3.8</a> ·
      <a href="https://natureofcode.com/oscillation/#exercise-39" target="_blank" rel="noopener">3.9</a></p>`
    )}

    <h2>Dalgalar</h2>

    <p>Tek daire yukarı aşağı salınırsa, dalganın bir noktasını görürsünüz. Yan yana bir dizi daire, her birinin açısı bir öncekinden biraz büyükse, kavis tuvalde belirir: su yüzeyi, yaratık gövdesi, yumuşak zemin.</p>
    <p>Zaman periyodu burada yer periyoduna döner: <strong>dalga boyu</strong> — bir tepeden sonraki tepeye piksel. Yine iki yol: dalga boyunu tam hesaplamak, ya da her x’te açıyı <code>deltaAngle</code> kadar artırmak. Kitap basiti seçer.</p>

    <h3>Örnek 3.8: Durağan dalga</h3>
    <p>Her şey <code>setup</code> içinde: dalga bir kez çizilir, durur. Üç adım: y = genlik × sin(açı), daireyi (x, y) noktasına koy, açıyı artır.</p>
    ${N.editor("ex38")}
    ${N.tryit([
      { do: "deltaAngle = 0.05 yapın.", expect: "Daha uzun dalga; daireler birbirine yakın yükseklikte." },
      { do: "deltaAngle = 0.6 yapın.", expect: "Kısa dalga; komşu daireler zıplar, kavis okunmaz." },
    ])}
    <p>Şekil 3.13: aynı aralık, üç <code>deltaAngle</code>. Büyük adım kısa dalga boyu demektir; çok büyürse dalga değil, tespih tanesi gibi durur.</p>
    ${N.editor("waveDelta")}

    <p>Döngüyü <code>draw</code>’a taşıyıp <code>angle</code>’ı kareler arasında bırakmak işe yaramaz: sağ kenar sol kenarla aynı yükseklikte değilse sonraki kare yanlış yerden başlar. Ayrı bir <code>startAngle</code> her kare biraz artsın; döngü içindeki <code>angle</code> her kare onun kopyasından başlasın. Dalga yürür.</p>

    <h3>Örnek 3.9: Dalga</h3>
    <p><code>map(sin(angle), -1, 1, 0, height)</code> sinüsün −1…1 aralığını tuvalin üst–altına yayar. <code>map(değer, eskiMin, eskiMax, yeniMin, yeniMax)</code> bir cetvelden diğerine taşır; burada genlik değişkeni yerine tüm yükseklik kullanılır.</p>
    ${N.editor("ex39")}
    ${N.tryit([
      { do: "startAngle += 0.02 yerine 0.08 yazın.", expect: "Dalga daha hızlı kayar; daire aralığı aynı." },
      { do: "x += 24 yerine x += 8 yazın.", expect: "Daha sık daire; kavis daha net." },
    ])}

    ${N.note(
      "Alıştırmalar 3.10–3.12 (orijinal)",
      `<p>3.10: y için <code>sin</code> yerine <code>noise</code>. 3.11: <code>Wave</code> sınıfı, iki dalga; <code>beginShape</code> / <code>vertex</code> deneyin. 3.12: birkaç dalganın y’sini toplayın (katmanlı dalga).</p>
      <p><a href="https://natureofcode.com/oscillation/#exercise-310" target="_blank" rel="noopener">3.10</a> ·
      <a href="https://natureofcode.com/oscillation/#exercise-311" target="_blank" rel="noopener">3.11</a> ·
      <a href="https://natureofcode.com/oscillation/#exercise-312" target="_blank" rel="noopener">3.12</a></p>`
    )}
    <p>Kitabın 3.11 ve 3.12 gösterimleri:</p>
    ${N.editor("oopWave")}
    ${N.editor("additiveWave")}

    <h2>Yay kuvvetleri</h2>

    ${N.img(
      "03_oscillation",
      "03_oscillation_11.png",
      "Şekil 3.14: Sabit çapa (anchor) ve hareket eden ağırlık (bob); ikisini yay bağlar."
    )}
    <p><code>sin</code> ile asılı bir ağırlık çizmek bir satırdır; rüzgâr ve yerçekimi o satıra binmez. Gerçek bir yay, Bölüm 2’deki gibi bir kuvvettir: yönü ve büyüklüğü olan bir ok, <code>applyForce</code> ile birikir.</p>
    <p>Lastiği çekin: ne kadar uzatırsanız o kadar sert geri çeker. Az çekin, az çeker. Robert Hooke 1660’ta Latince yazmış: uzama neyse kuvvet odur.</p>
    ${N.img(
      "03_oscillation",
      "03_oscillation_12.png",
      "Şekil 3.15: Uzama x = şu anki uzunluk − dinlenme uzunluğu. Dinlenmede x = 0, kuvvet yok."
    )}
    ${N.math(
      "F<sub>yay</sub> = −k x",
      "k yay sabiti (ne kadar sert). x uzama. Eksi: kuvvet uzamanın tersine, dinlenmeye doğru. p5.js’te büyüklük ve yön: çapa→bob vektörünü al, uzunluğunu <code>−k * stretch</code> yap (<code>setMag</code>)."
    )}
    <p>k’yı siz seçersiniz: 0.2 yumuşak, 1 gergin. x = şu anki uzunluk eksi <code>restLength</code>. Şu anki uzunluk, çapa ile bob arasındaki vektörün <code>mag</code>’i — Bölüm 2 çekiminde mesafenin kuzeni.</p>
    ${N.img(
      "03_oscillation",
      "03_oscillation_13.png",
      "Şekil 3.16: Yay dinlenmeden uzunsa geri çeker; kısaysa iter. Eksi işaret bu dönüşü yapar."
    )}
    ${N.img(
      "03_oscillation",
      "03_oscillation_14.png",
      "Şekil 3.17: Spring çapayı ve restLength’i tutar; Bob konum, hız, ivme taşır."
    )}
    <p><code>spring.connect(bob)</code> kuvveti hesaplar ve içeride <code>bob.applyForce</code> çağırır. Çizim döngüsünde kuvvet görünmez; sınıf yutar. Attractor örneğinde kuvveti dışarı almıştık; ikisi de doğru — okunabilirlik seçimi.</p>

    <h3>Örnek 3.10: Yay bağlantısı</h3>
    <p>Bob’u fareyle sürükleyin; bırakınca yay geri çeker. <code>constrainLength</code> ipin 30–200 piksel dışına çıkmasını keser: çok kısa veya çok uzunsa konumu o sınıra yapıştırır, hızı sıfırlar. Yerçekimi sürekli aşağı; yay onu dengeye çekmeye çalışır.</p>
    ${N.editor("ex310")}
    ${N.tryit([
      { do: "k = 0.05 yapın (Spring kurucu).", expect: "Daha yumuşak; sallanma uzun sürer." },
      { do: "gravity = createVector(0, 0) yazın.", expect: "Aşağı çekim yok; yay dinlenme boyuna oturur." },
    ])}

    ${N.note(
      "Alıştırmalar 3.13–3.14 (orijinal)",
      `<p>3.13: <code>constrainLength</code> boşluklarını doldurun (kitap iskeleti). 3.14: birden fazla bob ve yay; çapasız bob–bob bağlantısı.</p>
      <p><a href="https://natureofcode.com/oscillation/#exercise-313" target="_blank" rel="noopener">3.13</a> ·
      <a href="https://natureofcode.com/oscillation/#exercise-314" target="_blank" rel="noopener">3.14</a></p>`
    )}

    <h2>Sarkaç</h2>

    ${N.img(
      "03_oscillation",
      "03_oscillation_15.png",
      "Şekil 3.18: Pivot (askı), kol, bob. Denge: tam aşağı."
    )}
    <p>Yayı ne uzatabildiğiniz ne kısaltabildiğiniz bir çubuk düşünün: uzunluk kilitli. Bu, sarkaçtır. Parktaki salıncak aynı resimdir: oturak yay çizemez, ipin boyu kadar bir yay üzerinde gider.</p>
    <p>Bob’u yalnız x, y hızıyla hareket ettirirseniz ya düşer ya ipi gerer. Kilitli uzunluk, hareketi bir serbestliğe indirir: <strong>açı</strong>. Denge aşağı, θ = 0. Bob’u yana çekip bırakınca θ büyür, küçülür, işaret değiştirir.</p>
    ${N.img(
      "03_oscillation",
      "03_oscillation_16.png",
      "Şekil 3.19: θ dengeye göre açı. Yerçekimi aşağı; ip gerilme (tension) boyunca çeker."
    )}
    <p>Kafanızı eğin: kol artık “dikey eksen” olsun. Yerçekimi okunu o eksene göre ikiye bölün. Kol boyunca olan parça ipin gerilmesiyle iptal olur — bob ipi koparıp düşmez. Kola dik parça yaya teğettir; sarkacı döndüren odur.</p>
    ${N.img(
      "03_oscillation",
      "03_oscillation_17.png",
      "Şekil 3.20: Kol dikey eksen. Fg hipotenüs; Fgx kola dik (hareket), Fgy kola paralel (gerilmeyle dengelenir)."
    )}
    ${N.math(
      "F<sub>p</sub> = F<sub>g</sub> · sin(θ)",
      "Kola dik bileşen. p5.js’te skaler: <code>gravity * sin(angle)</code>. <code>sin</code> açıyı radyan bekler. θ = 0 iken sin 0 — dengede döndüren kuvvet yok."
    )}
    ${N.img(
      "03_oscillation",
      "03_oscillation_18.png",
      "Şekil 3.21: Fgx artık Fp, net döndüren kuvvet; ok bobun merkezinden yaya teğet."
    )}
    <p>Newton: ivme = kuvvet / kütle. Kütle sadeleşir (Galileo’nun kulesi: kütle düşüşü değiştirmez). Kol uzunluğu kalır: uzun salıncak daha tembel hızlanır. Açısal ivme:</p>
    ${N.math(
      "α = (g · sin(θ)) / r",
      "g sizin seçtiğiniz yerçekimi katsayısı (metre/saniye değil, tuval ölçeği). r kol uzunluğu (piksel). Kodda eksi işaret dengeye çeker: <code>angleAcceleration = (-1 * gravity / this.r) * sin(this.angle)</code>."
    )}
    <p>Eksi neden? Bob sağdaysa θ pozitif, <code>sin</code> pozitif; yerçekimi onu sola, dengeye çekmeli — ivme negatif olsun. Soldaysa tersi. Çarpı −1 her iki tarafı da toparlar.</p>
    <p>Çizmek yine polar. Denge aşağı olduğu için formül, çember örneğinin tersine döner: x’te <code>sin</code>, y’de <code>cos</code>. θ = 0 iken x = 0, y = r — bob pivotun altında. Bunu önceki <code>x = r * cos</code> ile karıştırmak, sarkacı yana yatırmaktır.</p>
    ${N.img(
      "03_oscillation",
      "03_oscillation_19.png",
      "Şekil 3.22: Bob, pivot’a göre polar (r, θ); tuvale çizerken Kartezyen. Sarkaçta x = r sin θ, y = r cos θ."
    )}
    ${N.math(
      "bob<sub>x</sub> = r · sin(θ) ,   bob<sub>y</sub> = r · cos(θ)",
      "Sonra <code>bob.add(pivot)</code>: polar fark, askının olduğu piksele eklenir. p5.js: <code>this.bob.set(this.r * sin(this.angle), this.r * cos(this.angle))</code>."
    )}
    <p>Sonsuza kadar sallanmasın diye kaba sönüm: her kare <code>angleVelocity *= 0.99</code> (yüzde 1 kayıp). Bölüm 2’deki sürtünme vektörü değil; işe yarar bir kısaltma.</p>

    <h3>Örnek 3.11: Sallanan sarkaç</h3>
    <p>Bob’u fareyle tutup bırakın. Sürüklerken açı, pivot–fare farkından <code>atan2</code> ile okunur — yine çeyrek tuzağı olmasın diye <code>atan2</code>, <code>atan</code> değil.</p>
    ${N.editor("ex311")}
    ${N.tryit([
      { do: "damping = 1 yazın.", expect: "Sönüm yok; salınım zayıflamaz." },
      { do: "show içinde sin/cos yerini değiştirin.", expect: "Bob yana yatar; denge aşağı değildir." },
    ])}
    ${N.quiz(
      "Sarkaçta θ = 0 iken bob nerededir (doğru polar çeviriyle)?",
      ["Pivot’un sağında", "Pivot’un tam altında", "Pivot’un üstünde"],
      1,
      "x = r sin 0 = 0, y = r cos 0 = r. +y aşağı; bob askının altında."
    )}

    ${N.note(
      "Alıştırma 3.15 (orijinal)",
      `<p>Bir sarkacın bob’u diğerinin pivot’u olsun. Görüntü ilginç, fizik yanlış olabilir. Gerçek çift sarkaç ayrı denklem ister.</p>
      <p><a href="https://natureofcode.com/oscillation/#exercise-315" target="_blank" rel="noopener">Exercise 3.15</a> ·
      <a href="https://thecodingtrain.com/doublependulum" target="_blank" rel="noopener">Coding Train · double pendulum</a> ·
      <a href="https://scienceworld.wolfram.com/physics/DoublePendulum.html" target="_blank" rel="noopener">Wolfram · Double Pendulum</a></p>`
    )}
    ${N.editor("ciftSarkac")}

    ${N.note(
      "Alıştırmalar 3.16–3.17 (orijinal)",
      `<p>3.16: Eğik düzlemde normal kuvvetin büyüklüğü (dik üçgen). 3.17: Sürtünmeli kayan kutu; sürtünme normal kuvvetle orantılı.</p>
      <p><a href="https://natureofcode.com/oscillation/#exercise-316" target="_blank" rel="noopener">3.16</a> ·
      <a href="https://natureofcode.com/oscillation/#exercise-317" target="_blank" rel="noopener">3.17</a></p>`
    )}
    ${N.img(
      "03_oscillation",
      "03_oscillation_20.png",
      "Alıştırma 3.16 görseli: eğik düzlem, yerçekimi ve normal kuvvet. Çözümü uydurmayın; üçgeni çizin."
    )}

    <h2>Ekosistem</h2>
    <p>Yaratığınıza salınım katın. Örnek 3.7’deki <code>Oscillator</code> tek noktayı (tuval merkezi) etrafında dans eder. Noktayı hareket ettirin: konum+hız+ivme ile gezinen bir gövde, kanat veya bacak olarak salınsın. Tempo, hızın büyüklüğüne bağlanabilir: hızlı giderken kanat sık, yavaşken seyrek.</p>
    ${N.img(
      "03_oscillation",
      "03_oscillation_21.png",
      "Orijinal kitaptaki ekosistem görseli: salınan gövde, gezen yaratık."
    )}
    <p><a href="https://natureofcode.com/oscillation/#the-ecosystem-project-4" target="_blank" rel="noopener">The Ecosystem Project</a> (orijinal)</p>

    ${N.resources([
      { kind: "Kitap", title: "Chapter 3 · Oscillation", url: "https://natureofcode.com/oscillation/" },
      { kind: "Kod", title: "03_oscillation örnekleri", url: "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/03_oscillation" },
      { kind: "Video", title: "Coding Train · Angles and Rotation", url: "https://www.youtube.com/watch?v=DMg-WRfNB60" },
      { kind: "Video", title: "Coding Train · Angular Motion", url: "https://www.youtube.com/watch?v=i2ROE_mAhU0" },
      { kind: "Video", title: "Coding Train · Angles and Vectors", url: "https://www.youtube.com/watch?v=oXwCVDXS2Lg" },
      { kind: "Video", title: "Coding Train · Polar Coordinates", url: "https://www.youtube.com/watch?v=O5wjXoFrau4" },
      { kind: "Video", title: "Coding Train · Harmonic Motion", url: "https://www.youtube.com/watch?v=m463X1cqV6s" },
      { kind: "Video", title: "Coding Train · Graphing Sine Wave", url: "https://www.youtube.com/watch?v=JLAc9hMtcxk" },
      { kind: "Video", title: "Coding Train · Spring Forces", url: "https://www.youtube.com/watch?v=Rr-5HiXquhw" },
      { kind: "Video", title: "Coding Train · Simple Pendulum", url: "https://www.youtube.com/watch?v=NBWMtlbbOag" },
      { kind: "Video", title: "Coding Train · transformations (p5.js)", url: "https://thecodingtrain.com/transformations" },
      { kind: "Referans", title: "p5.js · rotate", url: "https://p5js.org/reference/p5/rotate/" },
      { kind: "Referans", title: "p5.js · translate", url: "https://p5js.org/reference/p5/translate/" },
      { kind: "Referans", title: "p5.js · push / pop", url: "https://p5js.org/reference/p5/push/" },
      { kind: "Referans", title: "p5.js · atan2", url: "https://p5js.org/reference/p5/atan2/" },
      { kind: "Referans", title: "p5.Vector · heading", url: "https://p5js.org/reference/p5.Vector/heading/" },
      { kind: "Referans", title: "p5.Vector · fromAngle", url: "https://p5js.org/reference/p5.Vector/fromAngle/" },
    ])}
    <p><a href="#/ch2">← Kuvvetler</a></p>
  `,
  editors: {
    rotate90: {
      title: "Tuzak: rotate(90) radyan okunur",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  let derece = constrain(map(mouseX, 0, width, 0, 360), 0, 360);

  fill(20);
  noStroke();
  text("Fare = yazdığınız sayı: " + nf(derece, 1, 0) + "  (siz derece sanıyorsunuz)", 10, 20);
  text("Sol: rotate(" + nf(derece, 1, 0) + ")  → p5.js radyan okur", 10, 40);
  text("Sağ: rotate(radians(" + nf(derece, 1, 0) + "))  → çeyrek tur 90’da", 10, 60);

  stroke(210);
  line(width / 2, 72, width / 2, height);

  push();
  translate(100, 160);
  rotate(derece);
  stroke(200, 40, 40);
  strokeWeight(3);
  line(-55, 0, 55, 0);
  fill(200, 40, 40);
  circle(55, 0, 12);
  pop();
  fill(20);
  noStroke();
  text("tuzak", 78, 88);

  push();
  translate(300, 160);
  rotate(radians(derece));
  stroke(40, 90, 180);
  strokeWeight(3);
  line(-55, 0, 55, 0);
  fill(40, 90, 180);
  circle(55, 0, 12);
  pop();
  fill(20);
  noStroke();
  text("radians()", 268, 88);
}` }],
    },
    nedenRotate: {
      title: "Aynı açı, iki eksen: translate neden var",
      files: [{ name: "sketch.js", content: `let angle = 0;

function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  fill(20);
  noStroke();
  text("Sol: rotate var, translate yok — eksen sol üst (0, 0).", 10, 20);
  text("Sağ: önce merkeze translate, sonra rotate — göbekten döner.", 10, 40);
  text("açı " + nf(angle, 1, 2) + " radyan  =  " + nf(degrees(angle), 1, 0) + "°", 10, 60);

  stroke(210);
  line(width / 2, 70, width / 2, height);

  push();
  rotate(angle);
  stroke(200, 40, 40);
  strokeWeight(3);
  line(0, 0, 90, 0);
  fill(200, 40, 40);
  circle(90, 0, 14);
  pop();

  push();
  translate(300, 155);
  rotate(angle);
  stroke(40, 90, 180);
  strokeWeight(3);
  line(-50, 0, 50, 0);
  fill(40, 90, 180);
  circle(50, 0, 14);
  circle(-50, 0, 14);
  pop();

  angle += 0.02;
}` }],
    },
    ikiPushPop: {
      title: "push/pop yoksa ikinci dönüş birincinin üstüne biner",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  fill(20);
  noStroke();
  text("Sol: pop yok — turuncu, mavinin açısını da taşır.", 10, 20);
  text("Sağ: her çubuk kendi push/pop kutusunda.", 10, 40);

  stroke(210);
  line(width / 2, 52, width / 2, height);

  push();
  translate(100, 150);
  rotate(millis() / 600);
  fill(80, 140, 220);
  noStroke();
  rect(-7, -50, 14, 100);
  rotate(-millis() / 400);
  fill(220, 120, 80);
  rect(-7, -50, 14, 100);
  pop();

  push();
  translate(300, 150);
  rotate(millis() / 600);
  fill(80, 140, 220);
  noStroke();
  rect(-7, -50, 14, 100);
  pop();

  push();
  translate(300, 150);
  rotate(-millis() / 400);
  fill(220, 120, 80);
  rect(-7, -50, 14, 100);
  pop();
}` }],
    },
    baton: {
      title: "Alıştırma 3.1: merkezinden dönen baton",
      original: {
        book: "https://natureofcode.com/oscillation/#exercise-31",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/03_oscillation/exercise_3_1_baton",
      },
      files: [{ name: "sketch.js", content: `let angle = 0;

function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  fill(127);
  stroke(0);
  strokeWeight(2);
  translate(width / 2, height / 2);
  rotate(angle);
  line(-50, 0, 50, 0);
  circle(50, 0, 16);
  circle(-50, 0, 16);
  angle += 0.1;
}` }],
    },
    ex31: {
      title: "Örnek 3.1: rotate ile açısal hareket",
      original: {
        book: "https://natureofcode.com/oscillation/#example-31-angular-motion-using-rotate",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/03_oscillation/example_3_1_angular_motion_using_rotate",
      },
      files: [{ name: "sketch.js", content: `let angle = 0;
let angleVelocity = 0;
let angleAcceleration = 0.0001;

function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  fill(20);
  noStroke();
  text("açı " + nf(angle, 1, 2) + " rad  hız " + nf(angleVelocity, 1, 4), 12, 22);

  translate(width / 2, height / 2);
  rotate(angle);

  stroke(0);
  strokeWeight(2);
  fill(127);
  line(-60, 0, 60, 0);
  circle(60, 0, 16);
  circle(-60, 0, 16);

  angleVelocity += angleAcceleration;
  angle += angleVelocity;
}` }],
    },
    ex32: {
      title: "Örnek 3.2: Kuvvetler ve kaba açısal hareket",
      original: {
        book: "https://natureofcode.com/oscillation/#example-32-forces-with-arbitrary-angular-motion",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/03_oscillation/example_3_2_forces_with_arbitrary_angular_motion",
      },
      files: [
        {
          name: "mover.js",
          content: `class Mover {
  constructor(x, y, mass) {
    this.mass = mass;
    this.radius = this.mass * 8;
    this.position = createVector(x, y);
    this.angle = 0;
    this.angleVelocity = 0;
    this.angleAcceleration = 0;
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.angleAcceleration = this.acceleration.x / 10.0;
    this.angleVelocity += this.angleAcceleration;
    this.angleVelocity = constrain(this.angleVelocity, -0.1, 0.1);
    this.angle += this.angleVelocity;
    this.acceleration.mult(0);
  }

  show() {
    strokeWeight(2);
    stroke(0);
    fill(127, 127);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    circle(0, 0, this.radius * 2);
    line(0, 0, this.radius, 0);
    pop();
  }
}`,
        },
        {
          name: "attractor.js",
          content: `class Attractor {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.mass = 20;
    this.G = 1;
  }

  attract(mover) {
    let force = p5.Vector.sub(this.position, mover.position);
    let distance = force.mag();
    distance = constrain(distance, 5, 25);
    let strength = (this.G * this.mass * mover.mass) / (distance * distance);
    force.setMag(strength);
    return force;
  }

  show() {
    stroke(0);
    fill(175, 200);
    circle(this.position.x, this.position.y, this.mass * 2);
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let movers = [];
let attractor;

function setup() {
  createCanvas(400, 240);
  for (let i = 0; i < 12; i++) {
    movers.push(new Mover(random(width), random(height), random(0.1, 2)));
  }
  attractor = new Attractor();
}

function draw() {
  background(255);
  attractor.show();
  for (let i = 0; i < movers.length; i++) {
    let force = attractor.attract(movers[i]);
    movers[i].applyForce(force);
    movers[i].update();
    movers[i].show();
  }
}`,
        },
      ],
    },
    fig36: {
      title: "Şekil 3.6: Fareye ivme — daire, dönüş yok",
      original: {
        book: "https://natureofcode.com/oscillation/#pointing-in-the-direction-of-movement",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/03_oscillation/example_1_10_accelerating_towards_the_mouse",
      },
      files: [
        {
          name: "mover.js",
          content: `class Mover {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.topspeed = 5;
  }

  update() {
    let mouse = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(mouse, this.position);
    dir.setMag(0.2);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
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
    atanKarsilastir: {
      title: "atan oranı kaybeder, atan2 çeyreği tutar",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  let center = createVector(width / 2, height / 2);
  let mouse = createVector(mouseX, mouseY);
  let v = p5.Vector.sub(mouse, center);
  let w = v.copy().mult(-1);

  let atanV = atan(v.y / v.x);
  let atanW = atan(w.y / w.x);
  let a2v = atan2(v.y, v.x);
  let a2w = atan2(w.y, w.x);

  fill(20);
  noStroke();
  text("v fareye, w = −v (zıt).", 10, 20);
  text("atan(y/x)  v " + nf(atanV, 1, 2) + "   w " + nf(atanW, 1, 2) + "  (yapışır)", 10, 40);
  text("atan2(y,x) v " + nf(a2v, 1, 2) + "   w " + nf(a2w, 1, 2) + "  (ayrılır)", 10, 60);

  translate(center.x, center.y);
  stroke(40, 90, 180);
  strokeWeight(3);
  line(0, 0, v.x, v.y);
  stroke(200, 40, 40);
  line(0, 0, w.x, w.y);
}` }],
    },
    ex33: {
      title: "Örnek 3.3: Hareket yönüne bakmak",
      original: {
        book: "https://natureofcode.com/oscillation/#example-33-pointing-in-the-direction-of-motion",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/03_oscillation/example_3_3_pointing_in_the_direction_of_motion",
      },
      files: [
        {
          name: "mover.js",
          content: `class Mover {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.velocity = createVector(0, 0);
    this.acceleration = 0;
    this.topspeed = 4;
    this.r = 16;
  }

  update() {
    let mouse = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(mouse, this.position);
    dir.setMag(0.5);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
  }

  show() {
    let angle = this.velocity.heading();
    stroke(0);
    strokeWeight(2);
    fill(127);
    push();
    rectMode(CENTER);
    translate(this.position.x, this.position.y);
    rotate(angle);
    rect(0, 0, 30, 10);
    pop();
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
    polarFare: {
      title: "Aynı nokta, iki dil: (r, θ) ve (x, y)",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  let r = 80;
  let theta = atan2(mouseY - height / 2, mouseX - width / 2);
  let x = r * cos(theta);
  let y = r * sin(theta);

  fill(20);
  noStroke();
  text("r " + r + "   theta " + nf(theta, 1, 2) + " rad  =  " + nf(degrees(theta), 1, 0) + "°", 10, 20);
  text("x = r*cos(theta) = " + nf(x, 1, 1) + "    y = r*sin(theta) = " + nf(y, 1, 1), 10, 40);

  translate(width / 2, height / 2);
  stroke(210);
  noFill();
  circle(0, 0, r * 2);
  stroke(0);
  strokeWeight(2);
  line(0, 0, x, y);
  fill(127);
  circle(x, y, 16);
}` }],
    },
    ex34: {
      title: "Örnek 3.4: Polar’dan Kartezyen’e",
      original: {
        book: "https://natureofcode.com/oscillation/#example-34-polar-to-cartesian",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/03_oscillation/example_3_4_polar_to_cartesian",
      },
      files: [{ name: "sketch.js", content: `let r;
let theta;

function setup() {
  createCanvas(400, 240);
  r = height * 0.45;
  theta = 0;
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  let x = r * cos(theta);
  let y = r * sin(theta);
  fill(127);
  stroke(0);
  strokeWeight(2);
  line(0, 0, x, y);
  circle(x, y, 48);
  theta += 0.02;
}` }],
    },
    spiral: {
      title: "Alıştırma 3.5: Sarmal",
      original: {
        book: "https://natureofcode.com/oscillation/#exercise-35",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/03_oscillation/exercise_3_5_spiral",
      },
      files: [{ name: "sketch.js", content: `let r = 0;
let theta = 0;

function setup() {
  createCanvas(400, 240);
  background(255);
}

function draw() {
  let x = r * cos(theta);
  let y = r * sin(theta);
  noStroke();
  fill(0);
  circle(x + width / 2, y + height / 2, 8);
  theta += 0.01;
  r += 0.05;
}` }],
    },
    asteroids: {
      title: "Alıştırma 3.6: Asteroids gemisi",
      original: {
        book: "https://natureofcode.com/oscillation/#exercise-36",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/03_oscillation/exercise_3_6_asteroids",
      },
      files: [
        {
          name: "ship.js",
          content: `class Spaceship {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.damping = 0.995;
    this.topspeed = 6;
    this.heading = 0;
    this.r = 16;
    this.thrusting = false;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.mult(this.damping);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    let f = force.copy();
    this.acceleration.add(f);
  }

  turn(angle) {
    this.heading += angle;
  }

  thrust() {
    let angle = this.heading - PI / 2;
    let force = p5.Vector.fromAngle(angle);
    force.mult(0.1);
    this.applyForce(force);
    this.thrusting = true;
  }

  wrapEdges() {
    let buffer = this.r * 2;
    if (this.position.x > width + buffer) this.position.x = -buffer;
    else if (this.position.x < -buffer) this.position.x = width + buffer;
    if (this.position.y > height + buffer) this.position.y = -buffer;
    else if (this.position.y < -buffer) this.position.y = height + buffer;
  }

  show() {
    stroke(0);
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y + this.r);
    rotate(this.heading);
    fill(175);
    if (this.thrusting) fill(255, 0, 0);
    rectMode(CENTER);
    rect(-this.r / 2, this.r, this.r / 3, this.r / 2);
    rect(this.r / 2, this.r, this.r / 3, this.r / 2);
    fill(175);
    beginShape();
    vertex(-this.r, this.r);
    vertex(0, -this.r);
    vertex(this.r, this.r);
    endShape(CLOSE);
    pop();
    this.thrusting = false;
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let ship;

function setup() {
  createCanvas(400, 240);
  ship = new Spaceship();
}

function draw() {
  background(255);
  fill(20);
  noStroke();
  text("sol/sağ ok: dönüş   Z: itki", 12, 22);
  ship.update();
  ship.wrapEdges();
  ship.show();
  if (keyIsDown(LEFT_ARROW)) ship.turn(-0.03);
  else if (keyIsDown(RIGHT_ARROW)) ship.turn(0.03);
  else if (keyIsDown(90)) ship.thrust();
}`,
        },
      ],
    },
    ex35: {
      title: "Örnek 3.5: Basit harmonik hareket I",
      original: {
        book: "https://natureofcode.com/oscillation/#example-35-simple-harmonic-motion-i",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/03_oscillation/example_3_5_simple_harmonic_motion",
      },
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  let period = 120;
  let amplitude = 160;
  let x = amplitude * sin((TWO_PI * frameCount) / period);

  fill(20);
  noStroke();
  text("x " + nf(x, 1, 0) + "   kare " + frameCount + "   periyot " + period, 12, 22);

  stroke(0);
  strokeWeight(2);
  fill(127);
  translate(width / 2, height / 2);
  line(0, 0, x, 0);
  circle(x, 0, 48);
}` }],
    },
    ex36: {
      title: "Örnek 3.6: Basit harmonik hareket II",
      original: {
        book: "https://natureofcode.com/oscillation/#example-36-simple-harmonic-motion-ii",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/03_oscillation/example_3_6_simple_harmonic_motion_ii",
      },
      files: [{ name: "sketch.js", content: `let angle = 0;
let angleVelocity = 0.05;

function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  let amplitude = 160;
  let x = amplitude * sin(angle);
  angle += angleVelocity;

  fill(20);
  noStroke();
  text("açı " + nf(angle, 1, 2) + "   x " + nf(x, 1, 0), 12, 22);

  translate(width / 2, height / 2);
  stroke(0);
  strokeWeight(2);
  fill(127);
  line(0, 0, x, 0);
  circle(x, 0, 48);
}` }],
    },
    ex37: {
      title: "Örnek 3.7: Oscillator nesneleri",
      original: {
        book: "https://natureofcode.com/oscillation/#example-37-oscillator-objects",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/03_oscillation/example_3_7_oscillator_objects",
      },
      files: [
        {
          name: "oscillator.js",
          content: `class Oscillator {
  constructor() {
    this.angle = createVector(0, 0);
    this.angleVelocity = createVector(random(-0.05, 0.05), random(-0.05, 0.05));
    this.amplitude = createVector(
      random(20, width / 2),
      random(20, height / 2)
    );
  }

  update() {
    this.angle.add(this.angleVelocity);
  }

  show() {
    let x = sin(this.angle.x) * this.amplitude.x;
    let y = sin(this.angle.y) * this.amplitude.y;
    push();
    translate(width / 2, height / 2);
    stroke(0);
    strokeWeight(2);
    fill(127);
    line(0, 0, x, y);
    circle(x, y, 32);
    pop();
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let oscillators = [];

function setup() {
  createCanvas(400, 240);
  for (let i = 0; i < 10; i++) {
    oscillators.push(new Oscillator());
  }
}

function draw() {
  background(255);
  for (let i = 0; i < oscillators.length; i++) {
    oscillators[i].update();
    oscillators[i].show();
  }
}`,
        },
      ],
    },
    ex38: {
      title: "Örnek 3.8: Durağan dalga",
      original: {
        book: "https://natureofcode.com/oscillation/#example-38-static-wave",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/03_oscillation/example_3_8_static_wave",
      },
      files: [{ name: "sketch.js", content: `let angle = 0;
let deltaAngle = 0.2;
let amplitude = 80;

function setup() {
  createCanvas(400, 240);
  background(255);
  stroke(0);
  strokeWeight(2);
  fill(127, 127);
  for (let x = 0; x <= width; x += 24) {
    let y = amplitude * sin(angle);
    circle(x, y + height / 2, 48);
    angle += deltaAngle;
  }
}` }],
    },
    waveDelta: {
      title: "Şekil 3.13: üç deltaAngle, bir tuval",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  fill(20);
  noStroke();
  text("üst 0.05   orta 0.2   alt 0.6  — büyük adım, kısa dalga boyu", 8, 16);
  dalga(0.05, 55);
  dalga(0.2, 125);
  dalga(0.6, 195);
}

function dalga(delta, satirY) {
  let angle = 0;
  stroke(0);
  strokeWeight(2);
  fill(127, 140);
  for (let x = 0; x <= width; x += 16) {
    let y = 28 * sin(angle);
    circle(x, satirY + y, 22);
    angle += delta;
  }
}` }],
    },
    ex39: {
      title: "Örnek 3.9: Dalga",
      original: {
        book: "https://natureofcode.com/oscillation/#example-39-the-wave",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/03_oscillation/example_3_9_the_wave",
      },
      files: [{ name: "sketch.js", content: `let startAngle = 0;
let angleVelocity = 0.2;

function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  let angle = startAngle;
  startAngle += 0.02;
  for (let x = 0; x <= width; x += 24) {
    let y = map(sin(angle), -1, 1, 0, height);
    stroke(0);
    strokeWeight(2);
    fill(127, 127);
    circle(x, y, 48);
    angle += angleVelocity;
  }
}` }],
    },
    oopWave: {
      title: "Alıştırma 3.11: iki Wave nesnesi",
      original: {
        book: "https://natureofcode.com/oscillation/#exercise-311",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/03_oscillation/exercise_3_11_oop_wave",
      },
      files: [
        {
          name: "wave.js",
          content: `class Wave {
  constructor(x, y, w, amplitude, period) {
    this.xspacing = 8;
    this.w = w;
    this.origin = createVector(x, y);
    this.theta = 0.0;
    this.amplitude = amplitude;
    this.period = period;
    this.dx = (TWO_PI / this.period) * this.xspacing;
    this.yvalues = new Array(floor(this.w / this.xspacing));
  }

  update() {
    this.theta += 0.02;
    let x = this.theta;
    for (let i = 0; i < this.yvalues.length; i++) {
      this.yvalues[i] = sin(x) * this.amplitude;
      x += this.dx;
    }
  }

  show() {
    for (let x = 0; x < this.yvalues.length; x++) {
      stroke(0);
      fill(0, 50);
      circle(
        this.origin.x + x * this.xspacing,
        this.origin.y + this.yvalues[x],
        32
      );
    }
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let wave0, wave1;

function setup() {
  createCanvas(400, 240);
  wave0 = new Wave(20, 70, 180, 20, 400);
  wave1 = new Wave(180, 140, 200, 36, 140);
}

function draw() {
  background(255);
  wave0.update();
  wave0.show();
  wave1.update();
  wave1.show();
}`,
        },
      ],
    },
    additiveWave: {
      title: "Alıştırma 3.12: katmanlı dalga",
      original: {
        book: "https://natureofcode.com/oscillation/#exercise-312",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/03_oscillation/exercise_3_12_additive_wave",
      },
      files: [{ name: "sketch.js", content: `let xspacing = 8;
let w;
let maxwaves = 5;
let theta = 0.0;
let amplitude = [];
let dx = [];
let yvalues;

function setup() {
  createCanvas(400, 240);
  w = width + 16;
  for (let i = 0; i < maxwaves; i++) {
    amplitude[i] = random(10, 28);
    let period = random(100, 300);
    dx[i] = (TWO_PI / period) * xspacing;
  }
  yvalues = [];
}

function draw() {
  background(255);
  calcWave();
  renderWave();
}

function calcWave() {
  theta += 0.02;
  for (let i = 0; i < w / xspacing; i++) {
    yvalues[i] = 0;
  }
  for (let j = 0; j < maxwaves; j++) {
    let x = theta;
    for (let i = 0; i < yvalues.length; i++) {
      if (j % 2 === 0) yvalues[i] += sin(x) * amplitude[j];
      else yvalues[i] += cos(x) * amplitude[j];
      x += dx[j];
    }
  }
}

function renderWave() {
  stroke(0);
  fill(0, 100);
  for (let x = 0; x < yvalues.length; x++) {
    circle(x * xspacing, height / 2 + yvalues[x], 24);
  }
}` }],
    },
    ex310: {
      title: "Örnek 3.10: Yay bağlantısı",
      original: {
        book: "https://natureofcode.com/oscillation/#example-310-a-spring-connection",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/03_oscillation/example_3_11_a_spring_connection",
      },
      files: [
        {
          name: "bob.js",
          content: `class Bob {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = 24;
    this.damping = 0.98;
    this.dragOffset = createVector(0, 0);
    this.dragging = false;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.mult(this.damping);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(127);
    if (this.dragging) fill(200);
    circle(this.position.x, this.position.y, this.mass * 2);
  }

  handleClick(mx, my) {
    let d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.mass) {
      this.dragging = true;
      this.dragOffset.x = this.position.x - mx;
      this.dragOffset.y = this.position.y - my;
    }
  }

  stopDragging() {
    this.dragging = false;
  }

  handleDrag(mx, my) {
    if (this.dragging) {
      this.position.x = mx + this.dragOffset.x;
      this.position.y = my + this.dragOffset.y;
    }
  }
}`,
        },
        {
          name: "spring.js",
          content: `class Spring {
  constructor(x, y, length) {
    this.anchor = createVector(x, y);
    this.restLength = length;
    this.k = 0.2;
  }

  connect(bob) {
    let force = p5.Vector.sub(bob.position, this.anchor);
    let currentLength = force.mag();
    let stretch = currentLength - this.restLength;
    force.setMag(-1 * this.k * stretch);
    bob.applyForce(force);
  }

  constrainLength(bob, minlen, maxlen) {
    let direction = p5.Vector.sub(bob.position, this.anchor);
    let length = direction.mag();
    if (length < minlen) {
      direction.setMag(minlen);
      bob.position = p5.Vector.add(this.anchor, direction);
      bob.velocity.mult(0);
    } else if (length > maxlen) {
      direction.setMag(maxlen);
      bob.position = p5.Vector.add(this.anchor, direction);
      bob.velocity.mult(0);
    }
  }

  show() {
    fill(127);
    circle(this.anchor.x, this.anchor.y, 10);
  }

  showLine(bob) {
    stroke(0);
    line(bob.position.x, bob.position.y, this.anchor.x, this.anchor.y);
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let bob;
let spring;

function setup() {
  createCanvas(400, 240);
  spring = new Spring(width / 2, 10, 100);
  bob = new Bob(width / 2, 100);
}

function draw() {
  background(255);
  let gravity = createVector(0, 2);
  bob.applyForce(gravity);
  bob.update();
  bob.handleDrag(mouseX, mouseY);
  spring.connect(bob);
  spring.constrainLength(bob, 30, 200);
  spring.showLine(bob);
  bob.show();
  spring.show();
}

function mousePressed() {
  bob.handleClick(mouseX, mouseY);
}

function mouseReleased() {
  bob.stopDragging();
}`,
        },
      ],
    },
    ex311: {
      title: "Örnek 3.11: Sallanan sarkaç",
      original: {
        book: "https://natureofcode.com/oscillation/#example-311-swinging-pendulum",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/03_oscillation/example_3_10_swinging_pendulum",
      },
      files: [
        {
          name: "pendulum.js",
          content: `class Pendulum {
  constructor(x, y, r) {
    this.pivot = createVector(x, y);
    this.bob = createVector(0, 0);
    this.r = r;
    this.angle = PI / 4;
    this.angleVelocity = 0.0;
    this.angleAcceleration = 0.0;
    this.damping = 0.995;
    this.ballr = 24.0;
    this.dragging = false;
  }

  update() {
    if (!this.dragging) {
      let gravity = 0.4;
      this.angleAcceleration = ((-1 * gravity) / this.r) * sin(this.angle);
      this.angleVelocity += this.angleAcceleration;
      this.angle += this.angleVelocity;
      this.angleVelocity *= this.damping;
    }
  }

  show() {
    this.bob.set(this.r * sin(this.angle), this.r * cos(this.angle), 0);
    this.bob.add(this.pivot);
    stroke(0);
    strokeWeight(2);
    line(this.pivot.x, this.pivot.y, this.bob.x, this.bob.y);
    fill(127);
    circle(this.bob.x, this.bob.y, this.ballr * 2);
  }

  clicked(mx, my) {
    let d = dist(mx, my, this.bob.x, this.bob.y);
    if (d < this.ballr) this.dragging = true;
  }

  stopDragging() {
    this.angleVelocity = 0;
    this.dragging = false;
  }

  drag() {
    if (this.dragging) {
      let diff = p5.Vector.sub(this.pivot, createVector(mouseX, mouseY));
      this.angle = atan2(-1 * diff.y, diff.x) - radians(90);
    }
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let pendulum;

function setup() {
  createCanvas(400, 240);
  pendulum = new Pendulum(width / 2, 0, 160);
}

function draw() {
  background(255);
  pendulum.update();
  pendulum.show();
  pendulum.drag();
  fill(20);
  noStroke();
  text("açı " + nf(degrees(pendulum.angle), 1, 1) + "°   (bob’u sürükleyin)", 12, 22);
}

function mousePressed() {
  pendulum.clicked(mouseX, mouseY);
}

function mouseReleased() {
  pendulum.stopDragging();
}`,
        },
      ],
    },
    ciftSarkac: {
      title: "Alıştırma 3.15: çift sarkaç (görüntü)",
      original: {
        book: "https://natureofcode.com/oscillation/#exercise-315",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/03_oscillation/exercise_3_15_double_pendulum",
      },
      files: [{ name: "sketch.js", content: `let r1 = 80;
let r2 = 80;
let m1 = 10;
let m2 = 10;
let a1 = 0;
let a2 = 0;
let a1_v = 0;
let a2_v = 0;
let g = 1;
let px2 = -1;
let py2 = -1;
let cx, cy;
let buffer;

function setup() {
  createCanvas(400, 240);
  a1 = PI / 2;
  a2 = PI / 2;
  cx = width / 2;
  cy = 20;
  buffer = createGraphics(width, height);
  buffer.background(255);
  buffer.translate(cx, cy);
}

function draw() {
  background(255);
  image(buffer, 0, 0, width, height);

  let num1 = -g * (2 * m1 + m2) * sin(a1);
  let num2 = -m2 * g * sin(a1 - 2 * a2);
  let num3 = -2 * sin(a1 - a2) * m2;
  let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
  let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a1_a = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * sin(a1 - a2);
  num2 = a1_v * a1_v * r1 * (m1 + m2);
  num3 = g * (m1 + m2) * cos(a1);
  num4 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
  den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a2_a = (num1 * (num2 + num3 + num4)) / den;

  translate(cx, cy);
  stroke(0);
  strokeWeight(2);
  let x1 = r1 * sin(a1);
  let y1 = r1 * cos(a1);
  let x2 = x1 + r2 * sin(a2);
  let y2 = y1 + r2 * cos(a2);
  line(0, 0, x1, y1);
  fill(0);
  circle(x1, y1, m1 * 2);
  line(x1, y1, x2, y2);
  circle(x2, y2, m2 * 2);

  a1_v += a1_a;
  a2_v += a2_a;
  a1 += a1_v;
  a2 += a2_v;

  buffer.stroke(0);
  if (frameCount > 1) buffer.line(px2, py2, x2, y2);
  px2 = x2;
  py2 = y2;
}` }],
    },
  },
});

