registerChapter({
  id: "ch7",
  title: "7. Hücresel otomatlar",
  short: "7. Otomata",
  icon: "⬛",
  original: "https://natureofcode.com/cellular-automata/",
  originalCode:
    "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/07_ca",
  html: `
    <p style="font-style:italic;color:var(--muted);">“Tek başımıza bir damlayız. Birlikte bir okyanus.” — Ryunosuke Satoro</p>

    ${N.img(
      "07_ca",
      "07_ca_1.jpg",
      "Kente kumaşı (fotoğraf: ZSM). Gana’da Akan halkının dokuması: dar şeritler ayrı ayrı örülür; yan yana gelince büyük bir desen çıkar. Tek kare sıkıcıdır; sıra, komşu, kural olunca kumaş konuşur."
    )}

    <p>Bölüm 5’te karmaşık sistem şöyle duruyordu: parçalar kısa mesafeden bakışır, aynı anda işler, toplamları parçaların yığınından başka bir şey olur. Sürü simülasyonu bunu uçan cisimlerle gösterdi. Bu bölümde aynı fikri, fiziksiz, vektörsüz, neredeyse tek bite indiriyoruz.</p>
    <p>Bu bir geri adım gibi durabilir. Artık rüzgâr, ivme, <code>createVector</code> yok. Tuğla, mümkün olan en yalın dijital parça: bir <strong>hücre</strong>. Değeri 0 veya 1; buna <strong>durum</strong> denir. Biyoloji dersindeki hücre değil — Excel’deki kare gibi: ızgarada bir kutu. Yanlış yazınca ne bozulur: komşuyu yanlış okursanız bütün kuşak kayar; tek bit hatası, kumaşın desenini başka bir kumaş yapar.</p>

    ${N.note(
      "Bu bölümün çıktısı",
      `<ul>
        <li>JavaScript <strong>dizisi</strong>: numaralı kutular; 1B Wolfram CA</li>
        <li>Kural numarası: sekiz bit, onluk karşılık (90, 30, 110)</li>
        <li>İki dizi: okurken eskiye yazmama</li>
        <li>2B dizi: satır–sütun, Hayat Oyunu</li>
        <li>Hücreyi nesne yapmak: doğum mavi, ölüm kırmızı</li>
      </ul>`
    )}

    <h2>Hücresel otomat nedir?</h2>

    <p>Sinema koltuğu düşünün. Her koltuk dolu (1) veya boş (0). Siz yalnızca sağınızdaki ve solunuzdaki iki kişiye bakıyorsunuz. Her zilde herkes aynı anda yeni bir karara varıyor: “kalacağım / kalkacağım.” Tek koltuk sıkıcıdır. Bütün salon aynı kuralı uygulayınca, dışarıdan bakınca dalga, üçgen, kargaşa çıkar. İşte <strong>hücresel otomat</strong> (çoğul: otomatlar; kısaca CA).</p>
    <ul>
      <li>Hücreler bir <strong>ızgarada</strong> yaşar (bu bölümde 1B çizgi ve 2B tahta; başka boyutta da olur).</li>
      <li>Her hücrenin bir <strong>durumu</strong> vardır; zamanla değişebilir. En yalın örnek: 1 veya 0 (açık/kapalı, canlı/ölü).</li>
      <li>Her hücrenin bir <strong>komşuluğu</strong> vardır: genelde bitişik kutular.</li>
    </ul>
    ${N.img(
      "07_ca",
      "07_ca_2.png",
      "Şekil 7.1: 2B ızgara. Her kare açık veya kapalı. Komşuluk, büyük tahtanın bir dilimi: genelde bir hücrenin bitişikleri (daire içi)."
    )}
    <p>Kitabın önceki nesneleri (mover, parçacık, boid) ömürleri boyunca aynı türde kaldı. Hareket ettiler; tür değiştirmediler. CA’da durum, kurala göre kuşak kuşak değişir. Domino dizisi: dik (1) veya yatmış (0). Komşu yatınca siz de yatabilirsiniz — ama CA’da kural tersine de izin verebilir: boş kutu dolabilir.</p>
    <p>Tarih kısa dursun: 1940’larda Los Alamos’ta Stanisław Ulam kristal büyütmeyi, John von Neumann kendi kopyasını üreten robotları düşünüyordu. von Neumann’ın hücresinin 29 durumu vardı; biz 0/1 ile başlarız. 1970’te John Conway’in Hayat Oyunu, 2002’de Stephen Wolfram’ın <a href="https://www.wolframscience.com/nks" target="_blank" rel="noopener"><em>A New Kind of Science</em></a> kitabı (ücretsiz çevrimiçi) bu ızgarayı biyoloji, kimya, fizik iddiasıyla okur. Biz kodun iskeletini yazacağız; felsefe Wolfram’da.</p>

    <h2>Temel hücresel otomatlar</h2>

    <p>Wolfram’ın <strong>temel CA</strong>’sı üç parçadan oluşur: ızgara, durum, komşuluk. En yalın ızgara bir çizgidir — hücreler yan yana, tek sıra (Şekil 7.2).</p>
    ${N.img("07_ca", "07_ca_3.png", "Şekil 7.2: 1B hücre çizgisi.")}
    <p>En yalın durum kümesi (tek durumdan bir sonraki): 0 veya 1 (Şekil 7.3). İlk kuşakta rastgele de seçilebilir; Wolfram’ın klasik başlangıcı ortadaki tek 1’dir.</p>
    ${N.img(
      "07_ca",
      "07_ca_4.png",
      "Şekil 7.3: Her kare 0 veya 1. Bu sıra, JavaScript’te hangi yapıya benzer?"
    )}
    <p>En yalın komşuluk: hücrenin kendisi, bir solu, bir sağı. Üç kutu (Şekil 7.4). Kenardakilerin tek komşusu vardır; onu birazdan çözeceğiz.</p>
    ${N.img("07_ca", "07_ca_5.png", "Şekil 7.4: 1B komşuluk üç hücredir.")}

    <p>Asıl mesele zaman. Duvar saati değil: kesikli adımlar, <strong>kuşak</strong>. p5.js’te bu adım çoğu zaman bir <code>draw</code> karesidir. 0. kuşaktaki durumlar elimizdeyken 1. kuşağı nasıl hesaplarız? 1’den 2’ye? Şekil 7.5.</p>
    ${N.img(
      "07_ca",
      "07_ca_6.png",
      "Şekil 7.5: 1. kuşak, 0. kuşaktaki hücrelerden hesaplanır."
    )}
    ${N.math(
      "hücre<sub>t</sub> = f(komşuluk<sub>t−1</sub>)",
      "Yeni durum, bir önceki kuşaktaki sol–orta–sağ üçlüsünün bir fonksiyonudur. p5.js’te bu fonksiyon sizin yazdığınız <code>rules(left, middle, right)</code> olur: üç 0/1 alır, bir 0/1 döner."
    )}
    ${N.img(
      "07_ca",
      "07_ca_7.png",
      "Şekil 7.6: 1. kuşaktaki bir hücre, önceki kuşaktaki üçlüye bakar."
    )}

    <p>Yeni durumu hesaplamanın birçok yolu vardır. Fotoğrafı bulanıklaştırmak da CA’ya benzer: bir pikselin yeni rengi komşularının ortalamasıdır. Wolfram başka seçer: her mümkün üçlü için önceden yazılmış bir cevap. Bu cevaplar tablosuna <strong>kural kümesi</strong> (<code>ruleset</code>) denir. Toplama veya ortalama yoktur; eşleme vardır: şu üçlü gelirse orta kutu şuna dönsün.</p>
    <p>Üç kutu, her biri 0 veya 1. Kaç farklı üçlü? Her kutuyu bir ikili basamak gibi okuyun. Üç bit: 000’dan 111’e, sekiz değer. Şekil 7.7.</p>
    ${N.img(
      "07_ca",
      "07_ca_8.png",
      "Şekil 7.7: Üç bitle saymak — üçlü komşuluğun sekiz hâli."
    )}
    <p>Wolfram gösteriminde üçlüler büyükten küçüğe yazılır: 111, sonra 110, …, 000. Her birinin altında bir çıktı: 0 veya 1. Şekil 7.8 bir kural kümesidir.</p>
    ${N.img(
      "07_ca",
      "07_ca_9.png",
      "Şekil 7.8: Her üçlü için bir çıktı — kural kümesi."
    )}
    <p>Klasik başlangıç: bütün hücreler 0, tam ortadaki 1. Dokuz hücrede orta kolay seçilir (Şekil 7.9). Şekil 7.10’da orta üçlü 010; kurala göre 1’den 0’a döner. Kalan kutuları siz doldurun.</p>
    ${N.img("07_ca", "07_ca_10.png", "Şekil 7.9: 0. kuşak; orta hücre 1.")}
    ${N.img(
      "07_ca",
      "07_ca_11.png",
      "Şekil 7.10: Kural kümesiyle 1. kuşaktaki bir durum."
    )}

    <p>Sayı yerine renk: 0 beyaz, 1 siyah (Şekil 7.11). Grafikte 0 çoğu zaman siyahtır; burada zıt, çünkü tuval beyaz, “açmak” karartmaktır.</p>
    ${N.img(
      "07_ca",
      "07_ca_12.png",
      "Şekil 7.11: Beyaz = 0, siyah = 1."
    )}
    <p>Tek kuşağı silip yenisini çizmek yerine kuşakları alt alta dizeriz. Şekil 7.12’daki kaba üçgen, <strong>Sierpiński üçgeni</strong>dir: aynı şekil, farklı ölçekte tekrar eder. Bölüm 8 fraktalı bunun üzerine kuracak. Şekil 7.13 daha çok kuşak, Şekil 7.14 tek piksel hücre: aynı kural, daha sık diş.</p>
    ${N.img(
      "07_ca",
      "07_ca_13.png",
      "Şekil 7.12: 0/1 ızgarası beyaz/siyah kareye çevrilince."
    )}
    ${N.img("07_ca", "07_ca_14.png", "Şekil 7.13: Wolfram temel CA, birkaç kuşak.")}
    ${N.img(
      "07_ca",
      "07_ca_15.png",
      "Şekil 7.14: Aynı CA, hücreler birer piksel."
    )}
    <p>Üç kutuluk kural, bu dişli üçgeni üretti. Rastgele seçilmiş bir kural bunu vermez. İki durumlu 1B CA’da tam 256 kural kümesi vardır; bir avuç kadarı Sierpiński kadar konuşur. Neden 256? Sekiz çıktı biti: her bit 0 veya 1.</p>

    <h3>Kural kümesini tanımlamak</h3>
    <p>Girdiler hep aynıdır: 000 … 111. Değişen, çıktılardır. Şekil 7.15, Şekil 7.8’in siyah–beyaz hâlidir.</p>
    ${N.img(
      "07_ca",
      "07_ca_16.png",
      "Şekil 7.15: Aynı kural kümesi, karelerle."
    )}
    <p>Sekiz çıktıyı yan yana yazınca 8 bitlik bir ikili sayı çıkar. Şekil 7.15: 01011010. Sağdaki 0, girdi 000’ın cevabıdır; onun solundaki 1, 001’indir. Wolfram sitesi hem bu ikiliyi hem kareleri birlikte basar (Şekil 7.16).</p>
    ${N.img(
      "07_ca",
      "07_ca_17.png",
      "Şekil 7.16: Wolfram sitesindeki kural gösterimi."
    )}
    ${N.math(
      "2<sup>8</sup> = 256",
      "Sekiz kutunun her biri 0 veya 1 olduğu için 256 farklı kural kümesi vardır. p5.js’te <code>background(r, g, b)</code> içinde kırmızı, yeşil, mavi kanalları da 0–255 arasıdır: yine sekiz bit. Aynı cetvel, başka iş: orada renk karışır, burada gelecek kuşaktaki orta kutunun 0/1’i seçilir."
    )}
    <p>01011010 ikilisi onlukta 90’dır; Wolfram buna <strong>kural 90</strong> der. Aşağıdaki tuvalde fareyi yatay gezdirin. Üstte sekiz üçlü ve her birinin çıktı biti; altta o kuralın ilk kuşakları. Sayı ve bitler tuvalde yazılı — konsola bakmayın.</p>
    ${N.editor("kuralBit")}
    ${N.tryit([
      { do: "Fareyi sola çekip kural 0’a yaklaştırın.", expect: "Bütün çıktı bitleri 0; altta desen yok, beyaz kalır." },
      { do: "Kural 90 civarına gelin (orta–sağ).", expect: "Bitler 01011010; altta Sierpiński dişleri." },
    ])}
    ${N.quiz(
      "Kural 90’ın ikilisi 01011010 ise, üçlü 111’in çıktısı nedir?",
      ["1", "0", "90"],
      1,
      "Wolfram soldan 111 ile başlar. İkilinin en soldaki (en değerli) biti 111’in cevabıdır: 0."
    )}
    <p>Kural 222 (11011110) tanınır bir şekil üretir ama 90 kadar kıpırdamaz (Şekil 7.17). Çoğu kural sıkıcıdır. Birkaçı doğada gördüğünüz desene denk düşer: Şekil 7.18’deki tekstil koni salyangozu, kural 30’a benzer.</p>
    ${N.img("07_ca", "07_ca_18.png", "Şekil 7.17: Kural 222.")}
    ${N.img(
      "07_ca",
      "07_ca_19.jpg",
      "Şekil 7.18: Tekstil koni salyangozu (Conus textile), Cod Hole, Büyük Set Resifi (fotoğraf: Richard Ling)."
    )}

    <h3>Temel CA’yı programlamak</h3>
    <p>İlk akıl: “Hücrenin durumu, kuşağı, komşuları, piksel yeri var; o hâlde <code>class Cell</code>.” Bu yol ileride açılacak. Şimdilik yalın veri yeterli. Temel CA, 0 ve 1’lerin listesidir. JavaScript’te listeye <strong>dizi</strong> denir.</p>
    <p>Pastane vitrini: raflar soldan sağa numaralıdır. İlk raf 1 değil, <strong>0</strong>. JavaScript de böyle sayar. <code>cells[0]</code> en soldaki kutu, <code>cells[1]</code> onun sağı. <code>cells.length</code> raf sayısıdır; son geçerli indeks <code>length - 1</code>’dir. <code>cells[length]</code> yoktur — boş raf, <code>undefined</code>.</p>
    <p><code>let cells = [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0];</code> Şekil 7.19’daki sıradır.</p>
    ${N.img("07_ca", "07_ca_20.png", "Şekil 7.19: 1B CA’nın bir kuşağı.")}
    <p>Çizmek: her indeks için 0 ise beyaz, 1 ise siyah kare. Yatay yer: <code>i * kareBoyu</code>. Aşağıda indeksler kutunun altında yazılı; fare hangi üçlüye baktığınızı kilitler.</p>
    ${N.editor("diziKomsu")}
    ${N.tryit([
      { do: "cells dizisinde bir 0’ı 1 yapın.", expect: "O indeksin karesi siyah olur; altındaki numara aynı kalır." },
      { do: "Fareyi en sola götürün.", expect: "i = 0; sol komşu yok diye kenar uyarısı." },
    ])}
    ${N.warn(
      "Tuzak: cells[-1]",
      `<p>İndeks <code>i</code> olan kutunun solu <code>i - 1</code>, sağı <code>i + 1</code>’dir. Döngü <code>i = 0</code> ile başlarsa sol <code>-1</code> olur. Dizide negatif indeks yoktur. p5.js sessizce <code>undefined</code> verir; <code>rules(undefined, …)</code> kuralı bozar, desen çöker — hata satırı her zaman net değildir.</p>`
    )}
    <p>Kenar için üç yol:</p>
    <ol>
      <li><strong>Kenar sabit.</strong> İlk ve son kutuyu hiç hesaplama; 0 (veya 1) olarak bırak. Şimdilik bunu seçeceğiz: döngü <code>i = 1</code>’den <code>length - 2</code>’ye.</li>
      <li><strong>Kenar halka.</strong> Şeridi bilezik yapın: en sol, en sağın komşusu. Sonsuz şerit yanılsaması; ileride Hayat Oyunu alıştırması.</li>
      <li><strong>Kenara ayrı kural.</strong> İki komşulu hücre. Fazla satır, az kazanç.</li>
    </ol>

    <p>Sözde kod: her hücre için sol–orta–sağı oku, kurala bak, yeni durumu yaz. İlk taslak şöyle durur:</p>
    <p><code>cells[i] = rules(cells[i - 1], cells[i], cells[i + 1]);</code></p>
    <p>Bu satır derleme hatası vermez. CA yine de yanlış yürür. Diyelim i = 5 bitti, i = 6’ya geldiniz. 6’nın solu 5’tir — <em>0. kuşaktaki</em> 5. Oysa siz az önce <code>cells[5]</code>’e 1. kuşağı yazdınız. Eski 5 gitti. Okurken üzerine yazmak, komşunun dününü silmektir.</p>
    <p>Çözüm: iki dizi. Biri bugünkü kuşak (<code>cells</code>), biri yarın (<code>nextgen</code>). JavaScript’te <code>cells.slice()</code> kopya üretir; asıl dizi durur. Hesap bitince <code>cells = nextgen</code>. Aşağıda aynı başlangıç, aynı “yeni = sol komşu” kuralı. Sol: üzerine yazınca 1 tek kuşağta sağa sel olur. Sağ: kopyaya yazınca 1 yalnızca bir adım kayar. Tuvalde ikisi birden.</p>
    ${N.editor("ikiDizi")}
    ${N.tryit([
      { do: "Sol döngüde cells[i] = cells[i - 1] satırını yorumlayın.", expect: "Sol şerit değişmez; sel durur. Hata o satırdaydı." },
    ])}
    ${N.quiz(
      "1B CA’da yeni durumu cells[i] = newstate ile aynı diziye yazarsanız ne olur?",
      ["Hızlanır, sonuç aynıdır", "Sağ komşu, solun yeni (yanlış) değerini okur", "Kenar otomatik halka olur"],
      1,
      "i soldan sağa gider. cells[i] değişince cells[i+1] eski solu kaybeder. slice ile kopya, sonra cells = nextgen."
    )}

    <p><code>rules(a, b, c)</code> üç 0/1 alır, bir 0/1 döner. Kural kümesi de bir dizidir: sekiz çıktı, 111’den 000’a. Şekil 7.20.</p>
    ${N.img(
      "07_ca",
      "07_ca_21.png",
      "Şekil 7.20: Kural kümesinin görsel ve sayısal kodu."
    )}
    <p><code>let ruleset = [0, 1, 0, 1, 1, 0, 1, 0];</code> — kural 90. Uzun yol: sekiz <code>if</code> (111 ise <code>ruleset[0]</code>, …). Dört durumlu CA’da 64 üçlü olur; on durumda 1000; von Neumann’da binlerce <code>else if</code>. Kısa yol: üçlüyi metin yap, ikili okuyun.</p>
    <p><code>let s = "" + a + b + c;</code> sonra <code>parseInt(s, 2)</code>. İkinci argüman 2: “bunu ikili taban say.” 111 → 7. Dizide 111’in yeri indekse 0’dır; bu yüzden <code>ruleset[7 - index]</code>. Unutursanız kural 90, başka bir kural gibi çizilir — tuzak.</p>

    <h3>Temel CA’yı çizmek</h3>
    <p>Klasik resim: kuşaklar alt alta, 1 siyah kare, 0 boş (Şekil 7.21). Bu, algoritmayı göstermek içindir; sizin işiniz siyah kare ızgarası olmak zorunda değil. İkinci uyarı: görüntü 2B’dir ama sistem 1B’dir. Dikey eksen zaman (kuşak), yatay eksen hücre indeksidir. Birazdan gelecek Hayat Oyunu gerçek 2B’dir; orada zaman kare kare animasyondur, üçüncü eksen değil.</p>
    ${N.img(
      "07_ca",
      "07_ca_22.png",
      "Şekil 7.21: Kural 90, kuşaklar istiflenmiş."
    )}
    <p>Kare kenarı <code>w = 10</code> piksel. Tuval 400 genişlikteyse <code>floor(width / w)</code> hücre sığar. y = <code>generation * w</code>. Beyaz arka plan; yalnızca 1’leri çizmek yeter (renkli hücre isterseniz 0’ları da çizin). Kuşak tuvalin altına inince <code>noLoop()</code> — aksi hâlde p5.js kare kare boş yere hesaplar.</p>

    <h3>Örnek 7.1: Wolfram temel hücresel otomat</h3>
    <p>Ortadaki 1, kural 90, siyah kareler aşağı doğru Sierpiński dişler. Üstte kural ve kuşak yazılı.</p>
    ${N.editor("ex71")}
    ${N.tryit([
      { do: "ruleset’i [1, 1, 0, 1, 1, 1, 1, 0] yapın (kural 222).", expect: "Diş kaybolur; dolu, durağan bir bant." },
      { do: "w = 10 yerine w = 4 yapın.", expect: "Daha çok hücre, daha ince desen; kuşak daha geç dibe varır." },
    ])}

    ${N.note(
      "Alıştırmalar 7.1–7.4 (orijinal)",
      `<p>7.1: CA tuvalin dibine gelince yeni, rastgele bir kural kümesiyle baştan. 7.2: 0. kuşağı rastgele 0/1 doldurun; desen nasıl değişir? 7.3: Kare ızgarayı bırakın — renk, daire, kaymış ızgara. 7.4: Kuşaklar yukarı kaysın (sonsuz şerit). İpucu: tek kuşak değil, bir tarih dizisi; her karede en eskiyi silip yeni ekleyin.</p>
      <p><a href="https://natureofcode.com/cellular-automata/#exercise-71" target="_blank" rel="noopener">7.1</a> ·
      <a href="https://natureofcode.com/cellular-automata/#exercise-72" target="_blank" rel="noopener">7.2</a> ·
      <a href="https://natureofcode.com/cellular-automata/#exercise-73" target="_blank" rel="noopener">7.3</a> ·
      <a href="https://natureofcode.com/cellular-automata/#exercise-74" target="_blank" rel="noopener">7.4</a></p>`
    )}

    <h2>Wolfram sınıfları</h2>
    <p>256 kuralın çoğu görsel olarak sıkıcıdır; birkaçı doğadaki karmaşaya benzer. Wolfram çıktıları dört sınıfa ayırır.</p>
    <h3>Sınıf 1: tekdüzelik</h3>
    <p>Yeterince kuşaktan sonra her hücre aynı değerde donar. Kural 222: sonunda her kutu siyah kalır (Şekil 7.22).</p>
    ${N.img("07_ca", "07_ca_23.png", "Şekil 7.22: Kural 222.")}
    <h3>Sınıf 2: tekrar</h3>
    <p>Kararlıdır ama sabit değil: 0/1 salınımı. Kural 190’da hücre <code>11101110…</code> dizisini tekrarlar (Şekil 7.23).</p>
    ${N.img("07_ca", "07_ca_24.png", "Şekil 7.23: Kural 190.")}
    <h3>Sınıf 3: rastgele</h3>
    <p>Gözle tutulur desen yok. Kural 30, Wolfram’ın Mathematica yazılımında rastgele sayı üreteci olarak kullanılır (Şekil 7.24). Üç bitlik kuralın kaosa inmesi, bölüm 0’daki zarın tersine, tamamen belirlenmiş bir kaostur: aynı başlangıç, aynı kural, aynı “rastgele” resim.</p>
    ${N.img("07_ca", "07_ca_25.png", "Şekil 7.24: Kural 30.")}
    <h3>Sınıf 4: karmaşıklık</h3>
    <p>Sınıf 2 ile 3’ün karışımı: içeride salınan yapılar, ama nerede ve ne zaman çıkacakları öngörülmez. Kural 110 (Şekil 7.25) bu yüzden ünlüdür. Bölüm 5’teki sürü gibi: yalın kural, ortaya çıkan davranış. Orman yangını, trafik, salgın modelleri sık sınıf 4 arar.</p>
    ${N.img("07_ca", "07_ca_26.png", "Şekil 7.25: Kural 110.")}

    <h2>Hayat Oyunu</h2>
    <p>Sıradaki adım 2B: John Conway’in Hayat Oyunu (1970). Martin Gardner <em>Scientific American</em>’da “eğlence matematiği” diye yazmıştı: büyük damalı tahta, iki renkli pul. Kalem ve kâğıt da olur; pul daha kolaydır. LED’lerde, projeksiyonda, ekran koruyucuda bin kez gördünüz. Yine de yazmaya değer: 2B dizi, iç içe döngü, ve kitabın asıl işi — üreyen bir dünyayı koda çevirmek.</p>
    <p>von Neumann 29 durumla kendi kopyasını aradı. Conway, mümkün olan en yalın kuralla “canlı gibi” sonuç istedi. Gardner’ın özetlediği üç hedef, Wolfram sınıf 4’ü tarif eder: sınırsız büyüdüğü kanıtlanan kolay bir başlangıç olmasın; sınırsız büyür gibi duranlar olsun; yalın başlangıçlar uzun süre değişsin, sonra üç yoldan birine varsın — yok olmak, durağan şekil, veya salınan döngü.</p>

    <h3>Oyunun kuralları</h3>
    <p>Çizgi değil, 2B matris. Durum yine 0 veya 1; dil 0 = ölü, 1 = canlı. Komşuluk büyür: bitişik kutular, köşeler dâhil, dokuz kare (orta dâhil). Şekil 7.26. Üç bit 8 üçlüydü; dokuz bit 512 komşuluk eder. 512 <code>if</code> yazılmaz. Conway genel bakış koyar: komşuluk aşırı kalabalık mı, ıssız mı, tam kıvamında mı?</p>
    ${N.img(
      "07_ca",
      "07_ca_27.png",
      "Şekil 7.26: 2B CA, dokuz hücrelik komşuluk."
    )}
    <ol>
      <li><strong>Ölüm</strong> (canlıyken 0 ol): <em>kalabalık</em> — dört veya daha çok canlı komşu; <em>yalnızlık</em> — bir veya sıfır canlı komşu.</li>
      <li><strong>Doğum</strong> (ölüyken 1 ol): tam üç canlı komşu (iki değil, dört değil).</li>
      <li><strong>Aynı kal</strong>: canlı + tam iki veya üç komşu → canlı kalır; ölü + üçten farklı sayı → ölü kalır.</li>
    </ol>
    <p>Şekil 7.27’de ortaya bakın. 2B CA’yı 3B küp gibi istiflemek mümkün (alıştırma); klasik yol her kuşağı bir animasyon karesi yapmaktır. Petri kabındaki bakteri gibi.</p>
    ${N.img(
      "07_ca",
      "07_ca_28.png",
      "Şekil 7.27: Ölüm ve doğum örnekleri — orta hücre."
    )}
    <p>Bazı tohumlar durağan kalır (Şekil 7.28), bazıları iki durum arasında salınır (Şekil 7.29), bazıları tahtada yürüyor gibi durur (Şekil 7.30). Hücreler yer değiştirmez; yan yana açılıp kapanma, hareket yanılsaması verir.</p>
    ${N.img("07_ca", "07_ca_29.png", "Şekil 7.28: Durağan başlangıçlar.")}
    ${N.img("07_ca", "07_ca_30.png", "Şekil 7.29: İki durum arasında salınanlar.")}
    ${N.img(
      "07_ca",
      "07_ca_31.png",
      "Şekil 7.30: Kuşaklar ilerledikçe yürüyor görünenler."
    )}
    <p>Hazır oyunlar: <a href="https://www.playfulinvention.com/emergence/" target="_blank" rel="noopener">Exploring Emergence</a> (Resnick, Silverman, MIT) ve <a href="https://sklise.github.io/conways-game-of-life/" target="_blank" rel="noopener">Conway’s Game of Life in p5.js</a> (Steven Klise). Bizim örnek rastgele tohumla açılır.</p>

    <h3>Kod</h3>
    <p>1B’de tek dizi vardı. 2B’de dizi-içinde-dizi: her sütun bir dizi, onun içinde satırlar. Sınıf listesi gibi düşünün — her sıra bir koridor, her koridorun sıralı sıraları. p5.js tuvalinde x sağa, y aşağı artar. Kitap <code>board[i][j]</code> der: <code>i</code> sütun (x), <code>j</code> satır (y).</p>
    ${N.warn(
      "Tuzak: satır mı sütun mu",
      `<p>Matematik defterinde matris çoğu zaman <code>[satır][sütun]</code> yazılır. Bu koddaki <code>board[i][j]</code> tersine yakındır: <code>i</code> yatay indeks, <code>j</code> dikey. <code>square(i * w, j * w, w)</code> bu yüzden doğru yere oturur. i ile j’yi takas ederseniz dünya 90° yatmış gibi durur; kurallar çalışır, resim yatar.</p>`
    )}
    <p><code>new Array(columns)</code> tek katman verir; her <code>i</code> için bir iç dizi daha açılmazsa <code>board[i][j]</code> patlar. <code>create2DArray(columns, rows)</code> hem iskeleti kurar hem her kutuyu 0 yapar — aksi hâlde kutu <code>undefined</code> kalır, toplam NaN olur.</p>
    <p>Komşular Şekil 7.31: <code>i-1,j-1</code> … <code>i+1,j+1</code>, orta hariç sekiz kutu. Sekiz <code>if</code> yazılabilir. Daha kısa: <code>k</code> ve <code>l</code> −1’den +1’e, <code>neighborSum += board[i + k][j + l]</code>, sonra ortaya kendinizi eklediğiniz için <code>neighborSum -= board[i][j]</code>. Unutursanız her canlı hücre kendini komşu sayar; yalnız hücre iki komşu sanır, ölmez.</p>
    ${N.img(
      "07_ca",
      "07_ca_32.png",
      "Şekil 7.31: Komşuluğun indeks değerleri."
    )}
    <p>Aşağıda küçük bir tahta. Fare hangi karedeyse 3×3 komşuluk çizilir; <code>i</code>, <code>j</code> ve canlı komşu sayısı yazılı. Kenara gelince 1B’deki aynı duvar: indeks −1 yok.</p>
    ${N.editor("dizi2d")}
    ${N.tryit([
      { do: "Fareyi bir canlı hücrenin üstüne getirin.", expect: "Orta kare işaretli; neighborSum o hücrenin sekiz komşusu (kendisi değil)." },
      { do: "Fareyi kenara götürün.", expect: "Kenar uyarısı; 3×3 tam sığmaz." },
    ])}

    <h3>Örnek 7.2: Hayat Oyunu</h3>
    <p>Kenar hücreleri sabit (döngü 1’den columns−2 / rows−2). Beyaz ölü, siyah canlı. Tıklayınca tahta yeniden rastgele dolar. Canlı sayısı üstte.</p>
    ${N.editor("ex72")}
    ${N.tryit([
      { do: "w = 8 yerine w = 16 yapın.", expect: "Daha kaba ızgara, daha az hücre; desen okunur kalır." },
      { do: "Doğum kuralını neighborSum == 3 yerine == 2 yapın.", expect: "Dünya daha çabuk dolar veya başka salınımlara kayar." },
    ])}

    ${N.note(
      "Alıştırmalar 7.5–7.7 (orijinal)",
      `<p>7.5: Tahtayı elle kurun (kodda tohum veya tuvale çizerek); bilinen desenleri deneyin. 7.6: Kenarı halka yapın — kenardaki hücrenin komşusu karşı kenardadır. 7.7: Her karede yeni 2B dizi açmak bellek yer. İki dizi tutup yer değiştirin (gömülü cihaz düşüncesi).</p>
      <p><a href="https://natureofcode.com/cellular-automata/#exercise-75" target="_blank" rel="noopener">7.5</a> ·
      <a href="https://natureofcode.com/cellular-automata/#exercise-76" target="_blank" rel="noopener">7.6</a> ·
      <a href="https://natureofcode.com/cellular-automata/#exercise-77" target="_blank" rel="noopener">7.7</a></p>`
    )}

    <h2>Nesne yönelimli hücreler</h2>
    <p>Bu bölümde hücreye nesne demedik; çünkü tek malı bir 0/1 idi. Tarih, fizik, hareketli komşuluk eklenince tek bit yetmez. O zaman <code>board[i][j] = floor(random(2))</code> yerine <code>new Cell(…)</code>.</p>
    <p><code>Cell</code> konumunu, kenarını, <code>state</code> ve <code>previous</code>’u taşır. İkinci 2B diziye gerek kalmaz: her nesne dününü hatırlar. Komşu sayarken <code>.previous</code> okunur; yeni değer <code>.state</code>’e yazılır; kare bitince <code>previous = state</code>. Sırayı tersine çevirirseniz herkes aynı karede hem eski hem yeni okunur — yine 1B’deki üzerine yazma hatası.</p>

    <h3>Örnek 7.3: Nesne yönelimli Hayat Oyunu</h3>
    <p>Doğan hücre mavi, ölen kırmızı, yaşayan siyah, ölü beyaz. Petri kabında “bu karede ne değişti” tuvale bakınca okunur. Tıklayınca yeni tohum.</p>
    ${N.editor("ex73")}
    ${N.tryit([
      { do: "Doğan hücrenin fill(0, 0, 255) değerini fill(0, 180, 80) yapın.", expect: "Yeni doğanlar yeşile döner; ölenler kırmızı kalır." },
    ])}
    <p>Hücre nesne olunca ömür sayacı, arazi türü (kara, su, orman), kare kare değişen komşu kümesi kapı aralar. <code>calculateState(board)</code> metoduna taşımayı size bırakıyoruz.</p>

    <h2>Geleneksel CA’nın çeşitleri</h2>
    <p>1B ve 2B’nin iskeleti duruyor. Bundan sonra ızgarayı, kuralı, durumu bozmak sizin işiniz. Kitap çözümleri uydurmuyoruz; başlıklar ve orijinal bağlantılar duruyor.</p>

    <h3>Dikdörtgen olmayan ızgara</h3>
    ${N.note(
      "Alıştırma 7.8: Altıgen ızgara",
      `<p>Her hücrenin altı komşusu olsun. İpucu: altıgenin köşeleri kutupsal–Kartezyen çeviriyle bulunur. p5.js’te <code>cos(angle) * r</code> ve <code>sin(angle) * r</code>; açı adımı <code>PI / 3</code> (tam tur altı dilim). <code>rotate(90)</code> yazmayın — varsayılan radyan, 90 ≈ 14 tur döner. <code>push</code> / <code>translate</code> / <code>beginShape</code> / <code>vertex</code> / <code>pop</code> iskeleti orijinalde durur.</p>
      <p><a href="https://natureofcode.com/cellular-automata/#exercise-78" target="_blank" rel="noopener">7.8</a> ·
      <a href="https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/07_ca/exercise_7_8_hexagon_ca" target="_blank" rel="noopener">iskele kod</a></p>`
    )}

    <h3>Olasılıklı</h3>
    ${N.note(
      "Alıştırma 7.9",
      `<p>Kalabalık: dört veya daha çok komşu → %80 ölme şansı. Yalnızlık: bir veya daha az → %60 ölme şansı. Ya da kendi olasılıklarınız. <code>random(1) &lt; 0.8</code> her kare zar atar; oranı tuvale yazın, yoksa “neden öldü” görünmez.</p>
      <p><a href="https://natureofcode.com/cellular-automata/#exercise-79" target="_blank" rel="noopener">7.9</a></p>`
    )}

    <h3>Sürekli</h3>
    ${N.note(
      "Alıştırma 7.10",
      `<p>Durum 0/1 değil, 0 ile 1 arası ondalık. “0.5’ten büyükse” / “0.2’den küçükse” gibi kurallar. Wolfram 1B iskeletini bu sayıya çevirin.</p>
      <p><a href="https://natureofcode.com/cellular-automata/#exercise-710" target="_blank" rel="noopener">7.10</a></p>`
    )}

    <h3>Görüntü işleme</h3>
    <p>Bulanıklaştırma: yeni piksel, komşu renklerin ortalaması. Mürekkep, su dalgası da CA kuralına çevrilebilir.</p>
    ${N.note(
      "Alıştırma 7.11",
      `<p>Her piksel bir hücre, rengi durum.</p>
      <p><a href="https://natureofcode.com/cellular-automata/#exercise-711" target="_blank" rel="noopener">7.11</a></p>`
    )}

    <h3>Tarih</h3>
    <p>Örnek 7.3 iki sayı tuttu: şimdi ve dün. Daha uzun bir dizi, hücrenin geçmişi olur. Kuralları geçmişten öğrenen sisteme <em>karmaşık uyarlanır sistem</em> denir — bölüm 9 ve 10.</p>
    ${N.note(
      "Alıştırma 7.12",
      `<p>Hücreyi, ne kadar süredir canlı veya ölü olduğuna göre boyayın. Geçmiş kurala da girebilir.</p>
      <p><a href="https://natureofcode.com/cellular-automata/#exercise-712" target="_blank" rel="noopener">7.12</a></p>`
    )}

    <h3>Hareketli hücreler</h3>
    ${N.note(
      "Alıştırma 7.13",
      `<p>Sürüde her boid’in bir durumu olsun; komşuluk, kare kare kim yakınsa o olsun.</p>
      <p><a href="https://natureofcode.com/cellular-automata/#exercise-713" target="_blank" rel="noopener">7.13</a></p>`
    )}

    <h3>İç içe</h3>
    <p>Kent, insanlardan oluşan karmaşık sistem; insan, organlardan; organ, hücrelerden. CA’da bu nasıl durur?</p>
    ${N.note(
      "Alıştırma 7.14",
      `<p>Her hücre daha küçük bir CA olsun.</p>
      <p><a href="https://natureofcode.com/cellular-automata/#exercise-714" target="_blank" rel="noopener">7.14</a></p>`
    )}

    ${N.note(
      "Ekosistem projesi",
      `<ul>
        <li>Her yaratığa bir durum verin. Durum davranışı nasıl sürer? Komşuların durumuna göre nasıl değişir?</li>
        <li>Dünya bir CA olsun: kara, su, yiyecek. Yaratık kareden kareye geçer.</li>
        <li>CA ile yaratığın desenini üretin.</li>
      </ul>`
    )}
    ${N.img("07_ca", "07_ca_33.png", "Orijinal kitaptaki ekosistem görseli.")}

    ${N.resources([
      { kind: "Kitap", title: "Chapter 7 · Cellular Automata", url: "https://natureofcode.com/cellular-automata/" },
      { kind: "Kod", title: "07_ca örnekleri", url: "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/07_ca" },
      { kind: "Video", title: "Coding Train · Wolfram CA", url: "https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/7-cellular-automata/1-wolfram-ca" },
      { kind: "Video", title: "Coding Train · Game of Life", url: "https://www.youtube.com/watch?v=FWSR_7kZuYg" },
      { kind: "Video", title: "Coding Train · Falling Sand", url: "https://www.youtube.com/watch?v=L4u7Zy_b868" },
      { kind: "Kitap", title: "Wolfram · A New Kind of Science", url: "https://www.wolframscience.com/nks" },
      { kind: "Referans", title: "p5.js · square", url: "https://p5js.org/reference/p5/square/" },
      { kind: "Referans", title: "MDN · Array.prototype.slice", url: "https://developer.mozilla.org/tr/docs/Web/JavaScript/Reference/Global_Objects/Array/slice" },
      { kind: "Referans", title: "MDN · parseInt", url: "https://developer.mozilla.org/tr/docs/Web/JavaScript/Reference/Global_Objects/parseInt" },
    ])}
  `,
  editors: {
    kuralBit: {
      title: "Kural numarası: sekiz bit, sekiz üçlü",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  let kural = floor(constrain(mouseX / width, 0, 0.999) * 256);
  let ikili = "";
  for (let b = 7; b >= 0; b--) {
    ikili += (kural >> b) & 1;
  }
  fill(20);
  noStroke();
  text("kural " + kural + "   ikili " + ikili, 10, 18);
  text("fare yatay: 0–255     111 … 000 soldan sağa", 10, 36);

  for (let n = 0; n < 8; n++) {
    let config = 7 - n;
    let left = (config >> 2) & 1;
    let mid = (config >> 1) & 1;
    let right = config & 1;
    let out = (kural >> config) & 1;
    let x0 = 18 + n * 48;
    let y0 = 52;
    let uclu = [left, mid, right];
    for (let k = 0; k < 3; k++) {
      fill(255 - uclu[k] * 255);
      stroke(0);
      square(x0 + k * 12, y0, 12);
    }
    fill(255 - out * 255);
    square(x0 + 12, y0 + 18, 12);
    fill(20);
    noStroke();
    text(out, x0 + 14, y0 + 48);
  }

  let w = 5;
  let nCell = floor(width / w);
  let cells = [];
  for (let i = 0; i < nCell; i++) cells[i] = 0;
  cells[floor(nCell / 2)] = 1;
  let maxG = 18;
  for (let g = 0; g < maxG; g++) {
    for (let i = 0; i < nCell; i++) {
      if (cells[i] === 1) {
        fill(0);
        noStroke();
        square(i * w, 112 + g * w, w);
      }
    }
    let nextgen = cells.slice();
    for (let i = 1; i < nCell - 1; i++) {
      let s = "" + cells[i - 1] + cells[i] + cells[i + 1];
      let index = parseInt(s, 2);
      nextgen[i] = (kural >> index) & 1;
    }
    cells = nextgen;
  }
}` }],
    },
    diziKomsu: {
      title: "Dizi: indeks, sol ve sağ komşu",
      files: [{ name: "sketch.js", content: `let cells = [1, 0, 1, 0, 0, 1, 0, 1, 1];

function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  let w = 36;
  let x0 = 18;
  let y = 70;
  let iHover = floor((mouseX - x0) / w);
  iHover = constrain(iHover, 0, cells.length - 1);

  for (let i = 0; i < cells.length; i++) {
    if (i === iHover) fill(180, 210, 255);
    else fill(255 - cells[i] * 220);
    stroke(0);
    square(x0 + i * w, y, w);
    fill(20);
    noStroke();
    text("[" + i + "]", x0 + i * w + 8, y + w + 18);
    text(cells[i], x0 + i * w + 14, y + 22);
  }

  let left = iHover === 0 ? "yok" : cells[iHover - 1];
  let right = iHover === cells.length - 1 ? "yok" : cells[iHover + 1];
  fill(20);
  noStroke();
  text("i = " + iHover + "   cells[i] = " + cells[iHover], 18, 24);
  text("sol cells[i-1] = " + left + "    sağ cells[i+1] = " + right, 18, 44);
  if (iHover === 0 || iHover === cells.length - 1) {
    text("kenar: döngü 1 .. length-2, yoksa cells[-1]", 18, 210);
  } else {
    text("uclu " + left + "" + cells[iHover] + "" + right, 18, 210);
  }
}` }],
    },
    ikiDizi: {
      title: "Aynı diziye yazmak / kopyaya yazmak",
      files: [{ name: "sketch.js", content: `function setup() {
  createCanvas(400, 240);
  noLoop();
}

function draw() {
  background(255);
  let w = 28;
  let bas = [0, 0, 0, 1, 0, 0, 0, 0, 0, 0];

  let yanlis = bas.slice();
  for (let i = 1; i < yanlis.length - 1; i++) {
    yanlis[i] = yanlis[i - 1];
  }

  let dogruKaynak = bas.slice();
  let dogru = dogruKaynak.slice();
  for (let i = 1; i < dogruKaynak.length - 1; i++) {
    dogru[i] = dogruKaynak[i - 1];
  }

  fill(20);
  noStroke();
  text("kural (ders): yeni = sol komşu. başlangıç ortada 1.", 10, 20);
  text("sol: üzerine yaz — 1 sel olur", 10, 48);
  cizSira(bas, 10, 58, w);
  cizSira(yanlis, 10, 92, w);

  text("sağ: slice kopya — 1 bir adım kayar", 10, 148);
  cizSira(bas, 10, 158, w);
  cizSira(dogru, 10, 192, w);
}

function cizSira(arr, x, y, w) {
  for (let i = 0; i < arr.length; i++) {
    fill(255 - arr[i] * 255);
    stroke(0);
    square(x + i * w, y, w);
  }
}` }],
    },
    dizi2d: {
      title: "2B dizi: i sütun, j satır, 3×3 komşu",
      files: [{ name: "sketch.js", content: `let w = 40;
let board;

function setup() {
  createCanvas(400, 240);
  board = [
    [0, 1, 0, 0, 1],
    [0, 1, 1, 0, 0],
    [1, 1, 0, 1, 0],
    [0, 0, 1, 0, 1],
    [1, 0, 0, 1, 0],
  ];
}

function draw() {
  background(255);
  let cols = board.length;
  let rows = board[0].length;
  let iH = floor(mouseX / w);
  let jH = floor(mouseY / w);
  let icerde = iH >= 0 && iH < cols && jH >= 0 && jH < rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let komsu = icerde && abs(i - iH) <= 1 && abs(j - jH) <= 1;
      if (i === iH && j === jH) fill(80, 140, 230);
      else if (komsu) fill(200, 220, 255);
      else fill(255 - board[i][j] * 220);
      stroke(0);
      square(i * w, j * w, w);
    }
  }

  fill(20);
  noStroke();
  if (!icerde) {
    text("fare ızgarada: board[i][j], i = x sütun, j = y satır", 10, 228);
  } else if (iH === 0 || jH === 0 || iH === cols - 1 || jH === rows - 1) {
    text("i=" + iH + " j=" + jH + "  kenar: 3x3 tasar, indeks -1 yok", 10, 228);
  } else {
    let sum = 0;
    for (let k = -1; k <= 1; k++) {
      for (let l = -1; l <= 1; l++) {
        sum += board[iH + k][jH + l];
      }
    }
    sum -= board[iH][jH];
    text("board[" + iH + "][" + jH + "] = " + board[iH][jH] + "   komşu canlı = " + sum, 10, 228);
  }
}` }],
    },
    ex71: {
      title: "Örnek 7.1: Wolfram temel CA",
      original: {
        book: "https://natureofcode.com/cellular-automata/#example-71-wolfram-elementary-cellular-automata",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/07_ca/7_1_elementary_wolfram_ca",
      },
      files: [{ name: "sketch.js", content: `let cells;
let generation = 0;
let w = 10;
let ruleset = [0, 1, 0, 1, 1, 0, 1, 0];

function setup() {
  createCanvas(400, 240);
  background(255);
  cells = new Array(floor(width / w));
  for (let i = 0; i < cells.length; i++) {
    cells[i] = 0;
  }
  cells[floor(cells.length / 2)] = 1;
}

function draw() {
  for (let i = 1; i < cells.length - 1; i++) {
    if (cells[i] === 1) {
      fill(0);
      noStroke();
      square(i * w, generation * w, w);
    }
  }
  fill(20);
  noStroke();
  text("kural 90    kuşak " + generation, 8, 16);

  let nextgen = cells.slice();
  for (let i = 1; i < cells.length - 1; i++) {
    let left = cells[i - 1];
    let me = cells[i];
    let right = cells[i + 1];
    nextgen[i] = rules(left, me, right);
  }
  cells = nextgen;
  generation++;
  if (generation * w > height) {
    noLoop();
  }
}

function rules(a, b, c) {
  let s = "" + a + b + c;
  let index = parseInt(s, 2);
  return ruleset[7 - index];
}` }],
    },
    ex72: {
      title: "Örnek 7.2: Hayat Oyunu",
      original: {
        book: "https://natureofcode.com/cellular-automata/#example-72-game-of-life",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/07_ca/7_2_game_of_life",
      },
      files: [{ name: "sketch.js", content: `let w = 8;
let columns, rows;
let board;
let kusak = 0;

function setup() {
  createCanvas(400, 240);
  columns = floor(width / w);
  rows = floor(height / w);
  tohum();
}

function tohum() {
  board = create2DArray(columns, rows);
  for (let i = 1; i < columns - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
      board[i][j] = floor(random(2));
    }
  }
  kusak = 0;
}

function draw() {
  let next = create2DArray(columns, rows);
  let canli = 0;
  for (let i = 1; i < columns - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
      let neighborSum = 0;
      for (let k = -1; k <= 1; k++) {
        for (let l = -1; l <= 1; l++) {
          neighborSum += board[i + k][j + l];
        }
      }
      neighborSum -= board[i][j];
      if (board[i][j] === 1 && neighborSum < 2) next[i][j] = 0;
      else if (board[i][j] === 1 && neighborSum > 3) next[i][j] = 0;
      else if (board[i][j] === 0 && neighborSum === 3) next[i][j] = 1;
      else next[i][j] = board[i][j];
    }
  }
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      fill(255 - board[i][j] * 255);
      stroke(0);
      square(i * w, j * w, w);
      canli += board[i][j];
    }
  }
  board = next;
  kusak++;
  fill(20);
  noStroke();
  text("kuşak " + kusak + "   canlı " + canli + "   tıkla: yeni tohum", 8, 16);
}

function mousePressed() {
  tohum();
}

function create2DArray(columns, rows) {
  let arr = new Array(columns);
  for (let i = 0; i < columns; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}` }],
    },
    ex73: {
      title: "Örnek 7.3: Nesne yönelimli Hayat Oyunu",
      original: {
        book: "https://natureofcode.com/cellular-automata/#example-73-object-oriented-game-of-life",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/07_ca/7_3_game_of_life_oop",
      },
      files: [
        {
          name: "cell.js",
          content: `class Cell {
  constructor(state, x, y, w) {
    this.state = state;
    this.previous = this.state;
    this.x = x;
    this.y = y;
    this.w = w;
  }

  show() {
    stroke(0);
    if (this.previous === 0 && this.state === 1) {
      fill(0, 0, 255);
    } else if (this.state === 1) {
      fill(0);
    } else if (this.previous === 1 && this.state === 0) {
      fill(255, 0, 0);
    } else {
      fill(255);
    }
    square(this.x, this.y, this.w);
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let w = 8;
let columns, rows;
let board;

function setup() {
  createCanvas(400, 240);
  columns = floor(width / w);
  rows = floor(height / w);
  tohum();
}

function tohum() {
  board = create2DArray(columns, rows);
  for (let i = 1; i < columns - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
      board[i][j] = new Cell(floor(random(2)), i * w, j * w, w);
    }
  }
}

function draw() {
  for (let x = 1; x < columns - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      let neighborSum = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          neighborSum += board[x + i][y + j].previous;
        }
      }
      neighborSum -= board[x][y].previous;
      if (board[x][y].state === 1 && neighborSum < 2) {
        board[x][y].state = 0;
      } else if (board[x][y].state === 1 && neighborSum > 3) {
        board[x][y].state = 0;
      } else if (board[x][y].state === 0 && neighborSum === 3) {
        board[x][y].state = 1;
      }
    }
  }
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      board[i][j].show();
      board[i][j].previous = board[i][j].state;
    }
  }
  fill(20);
  noStroke();
  text("mavi doğan   kırmızı ölen   tıkla: yeni tohum", 8, 16);
}

function mousePressed() {
  tohum();
}

function create2DArray(columns, rows) {
  let arr = new Array(columns);
  for (let i = 0; i < columns; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      arr[i][j] = new Cell(0, i * w, j * w, w);
    }
  }
  return arr;
}`,
        },
      ],
    },
  },
});
