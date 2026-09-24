registerChapter({
  id: "ch9",
  title: "9. Evrim",
  short: "9. Evrim",
  icon: "🧬",
  original: "https://natureofcode.com/evolution/",
  originalCode:
    "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/09_ga",
  html: `
    <p style="font-style:italic;color:var(--muted);">“Zaman ok gibi uçar; meyve sinekleri muzu sever.” — Bilinmiyor</p>

    ${N.img(
      "09_ga",
      "09_ga_1.jpg",
      "Pueblo çanak çömleği (ABD Milli Park Servisi). Chaco Ancestral Pueblo kasesi: desenler kuşaktan kuşağa aktarılır, her çömlekçi öğrenir, korur, biraz değiştirir. Kitap evrimi bu aile işiyle açar."
    )}

    <p>İlk p5.js sketch’inizde değişken vardı: bir sayı, sonra bir tane daha. Bu kitapta değişkenler nesneye doldu — hareket eden, kuvvet yiyen, yönelen şeyler. Her seferinde ilk değerleri <em>siz</em> verdiniz: rastgele renk, aynı <code>x</code> ve <code>y</code>, elinizle seçilmiş hız. Ya bu sayıları bir tasarımcı gibi atamak yerine, doğadaki bir süreç — <strong>evrim</strong> — seçseydi?</p>
    <p>JavaScript nesnesinin alanlarını DNA gibi düşünün. Nesneler birbirine “doğurabilsin”, çocuk bir sonraki kuşağa gen taşısın. p5.js sketch’i evrilebilir mi? Bu bölümün cevabı evet. Amaç biyolojinin her molekülünü kopyalamak değil: seçilim, kalıtım ve çeşitliliği koda çevirmek.</p>

    ${N.note(
      "Bu bölümün çıktısı",
      `<ul>
        <li>Nüfus: nesne dizisi; her elemanın genleri bir dizi</li>
        <li>Uygunluk (fitness): “bu çözüm ne kadar işe yarar?” sayısını yazmak</li>
        <li>Seçilim: uygun olanın ebeveyn olma şansının daha yüksek olması</li>
        <li>Çaprazlama ve mutasyon: çocuğun genlerini iki ebeveynden kurmak, ara sıra bozmak</li>
        <li>Aynı döngüyü cümle, roket, çiçek ve ekosistemde kullanmak</li>
      </ul>`
    )}

    <h2>Genetik algoritmalar: gerçek olaylardan ilham</h2>

    <p>Doğada evrilen sistemler yazmanın klasik yolu <strong>genetik algoritma</strong>dır (kısaca GA). Darwin’in üç fikrini — kalıtım, çeşitlilik, seçilim — bir arama yöntemine çevirir. 1950’lerden beri denenen bu aile, John Holland’ın 1975 kitabı <em>Adaptation in Natural and Artificial Systems</em> ile bilgisayar biliminde yerleşir. Bugün daha geniş bir çatıda durur: <strong>evrimsel hesaplama</strong>.</p>
    <p>GA, genetik dersinin kod hali değildir. Punnett karesi, nükleotid, RNA yok. Bilimsel bir evrim simülasyonu da hedef değil: yazılımdaki evrim stratejisi. Terim katı haliyle belirli bir algoritmayı işaret eder; kitap o temeli alır, her satırda ders kitabı sadakati aramaz. Üç sahne gelecek:</p>
    <ul>
      <li><strong>Klasik GA:</strong> arama uzayı o kadar büyük ki her adayı tek tek denemek yıllar sürer. “Bir ile bir milyar arasında bir sayı tuttum” gibi. Kaba kuvvet her sayıyı sorar. Size “sıcak / soğuk” denirse tahminler evrilir.</li>
      <li><strong>Etkileşimli seçilim:</strong> uygunluğu formül değil, bakan kişi verir. Müzede on resim, beğendiğinizden yeni kuşak.</li>
      <li><strong>Ekosistem:</strong> yaratıklar karşılaşır, ürer, gen bırakır. Bölüm sonundaki ekosistem projesine ve 11. bölümdeki nöroevrime bağlanır.</li>
    </ul>

    <h2>Neden genetik algoritma?</h2>

    <p>Kedi düşünün — sıradan kedi değil. Daktilo çalan, Shakespeare’in bütün oyunlarını üretmeye çalışan kediler (Şekil 9.1).</p>
    ${N.img(
      "09_ga",
      "09_ga_2.png",
      "Şekil 9.1: Sonsuz kediler, sonsuz daktilolar. Kitap sonsuz maymun teoremini kediyle anlatır."
    )}
    <p><strong>Sonsuz maymun teoremi:</strong> rastgele tuşlara basan bir maymun, sonsuz zamanda Shakespeare’i yazar. Pratikte harf kombinasyonu o kadar çoktur ki Hamlet bile evrenin yaşında neredeyse çıkmaz. Kedimiz Clawdius’un daktilosunda 27 tuş olsun: 26 harf ve boşluk. Her tuş 1/27.</p>
    <p>Hedef cümle: “to be or not to be that is the question” — boşluklarla 39 karakter. İlk harfi tutturma 1/27. İkisi birden: 1/729. Hepsi: (1/27)<sup>39</sup>. Sayı:</p>
    ${N.math(
      "1 / 27<sup>39</sup> ≈ 1 / 6,66 × 10<sup>55</sup>",
      "p5.js <code>pow(27, 39)</code> bu paydayı üretir: taban 27, üs 39. Rastgele cümle üretmek, her harfi bağımsız <code>random()</code> ile seçmektir; 39 harfte doğru diziyi beklemek pratikte bitmez."
    )}
    <p>Clawdius saniyede bir milyon rastgele cümle yazsa, tek bu cümleyi yüzde 99 olasılıkla görmek için evrenin yaşından kat kat uzun süre gerekir. Kaba kuvvet (her olası cümleyi denemek) bu iş için bir strateji değildir. GA rastgele cümlelerle başlar, “sıcak / soğuk” bilgisiyle hızla hedefe yürür.</p>
    <p>Cevabı zaten biliyorsunuz: cümleyi yazıp bitirmek bir satır. Yine de bu problem GA’yı test etmek için iyidir. Bilinen hedefe bakıp “to be or not to be” çıkarsa kodunuz çalışıyordur. Sonra cevabı bilinmeyen problemlere aynı iskeleti taşırsınız.</p>

    ${N.note(
      "Alıştırma 9.1 (orijinal)",
      `<p>Rastgele dizeler üreten bir sketch yazın. Biraz sonra GA bunu kullanacak. p5.js’in rastgele <code>cat</code> üretmesi ne kadar sürer? Aynı fikri şekil çizen fonksiyonlarla bir tasarıma çevirmeyi deneyin.</p>
      <p><a href="https://natureofcode.com/evolution/#exercise-91" target="_blank" rel="noopener">Exercise 9.1</a></p>`
    )}
    <p>Aşağıda 9.1’in iskelesi. Her kare yeni bir üç harf; sayaç <code>cat</code> gelene kadar artar. Tuvalde deneme sayısı durur. <code>random(32, 127)</code> ASCII aralığından karakter seçer; <code>floor</code> virgülü keser, <code>String.fromCharCode</code> sayıyı harfe çevirir.</p>
    ${N.editor("rastgeleDizi")}
    ${N.tryit([
      { do: "Hedefi 'cat' yerine 'ca' yapın (iki harf).", expect: "Sayaç daha çabuk durur; arama uzayı küçülmüştür." },
      { do: "draw içindeki rastgele üretimi yorumlayın.", expect: "Sayaç donar; yeni aday gelmez." },
    ])}

    <h2>Genetik algoritma nasıl işler?</h2>

    <p>Koda girmeden klasik GA’nın adımlarını bir yaratık nüfusunda yürüyelim. Darwin’den üç parça durmalı; biri eksikse seçilim işlemez:</p>
    <ul>
      <li><strong>Kalıtım:</strong> ebeveyn, çocuğa özellik bırakacak bir mekanizma.</li>
      <li><strong>Çeşitlilik:</strong> nüfusta fark olmalı. Bütün böcekler aynı renk, aynı boy, aynı kanatsa çocuk da aynı kalır; yeni kombinasyon doğmaz.</li>
      <li><strong>Seçilim:</strong> kimi ebeveyn olur, kimi olmaz. “En güçlünün hayatta kalması” diye çevrilir; güç her zaman en büyük, en hızlı demek değildir. Ortama uyup üreyebilen “uygun”dur. Beş dakikalık mayıs sineği yumurtayı suya bıraktıysa genini geçirmiştir. Daktilocu kedide uygun olan, Shakespeare cümlesine daha çok harfi tutturandır.</li>
    </ul>
    ${N.warn(
      "Dil",
      `<p>Kitap bu üç fikri yapay, ölçülebilir bir hedef için kullanır. Tarihte genetik dili ezilen gruplara zarar vermek için de kullanılmıştır. Sınıfta “üstün” demeyin; uygunluk burada “bu sketch’te üreme şansı”dır.</p>`
    )}

    <h3>Adım 1: Nüfus</h3>
    <p>Daktilocu kedilerde ilk iş: bir cümle nüfusu. Cümle burada herhangi bir karakter dizisi. Üç cümleyle başlayalım; hedef <code>cat</code> olsun:</p>
    <table class="data">
      <thead><tr><th>Nüfus (3 cümle)</th></tr></thead>
      <tbody>
        <tr><td><code>rid</code></td></tr>
        <tr><td><code>won</code></td></tr>
        <tr><td><code>hug</code></td></tr>
      </tbody>
    </table>
    <p>Çeşit var ama yetmez: harfleri nasıl karıştırsanız <code>cat</code> çıkmaz. Binlerce rastgele cümle olsa, birinin ilk harfi <code>c</code>, birinin ikincisi <code>a</code>, birinin üçüncüsü <code>t</code> olur. Büyük nüfus, ilk adımda yeterli çeşitliği taşır. (Üçüncü adımda çeşit yetmezse mutasyon eklenir.)</p>
    <p><strong>N elemanlı bir nüfus yarat; her birinin DNA’sı rastgele olsun.</strong></p>
    <p>Genetikte <strong>genotip</strong> ham koddur — DNA’daki dizi, kuşaktan kuşağa geçen veri. <strong>Fenotip</strong> o verinin dışarı vurmasıdır: kedi büyük, kedi küçük, kedi hızlı yazar. Yaratıcı GA’nın sorusu budur: dünyanızdaki nesne nedir, genotipi hangi dizi, fenotipi tuvalde ne?</p>
    <p>Grafikte bunu her gün yaparsınız. Gri bir tamsayı (0–255) genotiptir; boyadığınız renk fenotiptir. Aynı 127, başka bir sketch’te çizgi uzunluğu da olabilir.</p>
    <table class="data">
      <thead><tr><th>Genotip</th><th>Fenotip (renk)</th></tr></thead>
      <tbody>
        <tr><td>0</td><td>siyah</td></tr>
        <tr><td>127</td><td>gri</td></tr>
        <tr><td>255</td><td>beyaz</td></tr>
      </tbody>
    </table>
    <p>Kedi–daktilo örneğinin rahatlığı: genotip ile fenotip aynı şey. DNA bir karakter dizisi, ekranda gördüğünüz de o dizi.</p>

    <h3>Adım 2: Seçilim</h3>
    <p>Nüfusu tartın: kim ebeveyn olmaya uygun? İki alt adım: uygunluğu hesapla, sonra o sayıya göre ebeveyn çek.</p>
    <p>Uygunluk bir fonksiyondur. Siz yazarsınız. Kedilerde: hedef cümleyle kaç harf aynı yerde aynı? Üç harfli hedefte iki harf tutan, bir harf tutandan daha uygun.</p>
    ${N.math(
      "fitness = (tutturulan harf) / (hedefin uzunluğu)",
      "Örnek: hedef <code>cat</code>, aday <code>cot</code> ise 2/3 ≈ 0.67. p5.js’te bu bir döngüdür: her indiste <code>genes[i] === target.charAt(i)</code> ise sayacı artırın, sonra hedef uzunluğuna bölün."
    )}
    <p>Beş cümle, uydurma uygunluklar:</p>
    <table class="data">
      <thead><tr><th>Cümle</th><th>Uygunluk</th></tr></thead>
      <tbody>
        <tr><td>A</td><td>30%</td></tr>
        <tr><td>B</td><td>40%</td></tr>
        <tr><td>C</td><td>5%</td></tr>
        <tr><td>D</td><td>10%</td></tr>
        <tr><td>E</td><td>15%</td></tr>
      </tbody>
    </table>
    <p>B her kuşakta ebeveyn olmaya en yakın; C neredeyse hiç. C’yi silmek zorunda değilsiniz: zayıf olan da ara sıra seçilsin ki çeşit ölmeyin. Şimdi kader çarkı — Şekil 9.2.</p>
    ${N.img(
      "09_ga",
      "09_ga_3.png",
      "Şekil 9.2: Kader çarkı. Her dilim, o bireyin uygunluğu kadar geniş. Çarkı çevirince büyük dilim daha sık gelir."
    )}

    <h3>Adım 3: Üreme</h3>
    <p>Çarktan iki ebeveyn. Görev: çocuğun cümlesini kurmak. En kaba yol 50/50: ilk üç harf A’dan, son üç B’den (Şekil 9.3).</p>
    ${N.img(
      "09_ga",
      "09_ga_4.png",
      "Şekil 9.3: 50/50 çaprazlama. Çocuk, ebeveynleri tam ortadan böler."
    )}
    <p>Daha iyisi: orta noktayı rastgele seçmek. 1+5, 2+4 da olur. Sonraki kuşağın çeşitliği artar (Şekil 9.4).</p>
    ${N.img(
      "09_ga",
      "09_ga_5.png",
      "Şekil 9.4: Rastgele orta noktadan iki çaprazlama örneği."
    )}
    <p>Başka yol: her harf için yazı-tura. Yazı A, tura B (Şekil 9.5). Çıktı daha da dağılır: <code>codurg</code>, <code>natine</code>, <code>notune</code>…</p>
    ${N.img(
      "09_ga",
      "09_ga_6.png",
      "Şekil 9.5: Yazı-tura çaprazlama. Her gen ayrı ebeveynden gelebilir."
    )}
    <p>Çocuk hazır; bir adım kaldı: <strong>mutasyon</strong>. Doğada DNA kopyası ara sıra bozulur. Kodda: her gene küçük bir olasılıkla yeni rastgele karakter (Şekil 9.6).</p>
    ${N.img(
      "09_ga",
      "09_ga_7.png",
      "Şekil 9.6: Çocuğun bir harfi mutasyona uğrar. Çeşitlilik tükenmesin diye."
    )}
    <p>Mutasyon bir <em>oran</em>dır: yüzde 5, yüzde 1, binde 1. Çocuk <code>catire</code>, oran yüzde 1 ise her karakterin yüzde 1 şansı vardır. Altı harfte çoğu zaman hiçbir şey olmaz. Olunca o yere yeni rastgele karakter konur.</p>
    ${N.warn(
      "Tuzak: mutate(90)",
      `<p>Oran 0 ile 1 arası bir olasılıktır. <code>random(1) &lt; 0.01</code> yüzde 1 demektir. <code>mutate(90)</code> yazarsanız neredeyse her gen her kuşakta rastgelelenir; evrim unutulur, her kare yeni bir zar olur.</p>`
    )}

    <h3>Adım 4: Tekrar</h3>
    <p>Yeni nüfus eski nüfusun yerini alır. Uygunluk, seçilim, çaprazlama, mutasyon. Hedef bulunana — veya siz durana — kadar.</p>

    <p>Kelime yetmez. Aşağıdaki tuval dört adımı aynı karede gösterir. Beş kısa cümle, hedef <code>cat</code>. Sol: uygunluk çubukları (yüksek çubuk = daha çok tutan harf). Orta: üreme havuzu — uygun olanın bileti daha çok. Sağ: bu tıklamada seçilen iki ebeveyn, orta nokta, çocuk, kırmızı kutu mutasyon. Tıklayın: bir kuşak ilerler. Sayılar tuvalde durur; her kare yeni zar atılmaz.</p>
    ${N.editor("gaGorsel")}
    ${N.tryit([
      { do: "Birkaç kez tıklayın.", expect: "Çubuklar ve çocuk değişir; kusak sayacı artar. Aynı karede dört adım durur." },
      { do: "mutasyonOrani değerini 0 yapın.", expect: "Kırmızı kutu kaybolur; çocuk yalnızca ebeveyn harflerinden gelir." },
    ])}
    ${N.quiz(
      "Uygunluğu 0.4 olan birey, havuza neden daha çok kopya bırakır?",
      [
        "Çünkü dizinin başında durur",
        "Çünkü ebeveyn seçilirken rastgele(havuz) o kopyalardan birini çekecektir",
        "Çünkü mutasyon onu siler",
      ],
      1,
      "Havuz bir torba. Dört kopya varsa o birey dört kez çekilebilir. Çarkın dilimi, torbadaki bilet sayısıdır."
    )}

    <h2>Genetik algoritmayı kodlamak</h2>

    <p>JavaScript’te nüfus bir dizidir. Dizi, aynı türden birçok nesneyi tek isim altında tutar. Yirmi DNA için yirmi <code>let</code> yazmazsınız:</p>
    <p><code>let nufus = [];</code> sonra bir <code>for</code> ile <code>nufus[i] = new DNA(uzunluk);</code></p>
    <p><code>random(nufus)</code> o diziden bir eleman çeker — üreme havuzundan ebeveyn almak budur. Aşağıda nesne dizisi: tıklayınca diziye yeni kutu eklenir. <code>kutular.length</code> tuvalde durur. GA’da da nüfus böyle şişer, böyle dolaşılır.</p>
    ${N.editor("nufusDizi")}
    ${N.tryit([
      { do: "mousePressed içindeki push satırını yorumlayın.", expect: "Tıklama yeni kutu eklemez; length sabit kalır." },
    ])}

    <h3>Adım 1: Başlangıç</h3>
    <p>Her DNA bir karakter dizisi taşır. <code>constructor</code> uzunluk kadar rastgele karakter doldurur. p5.js <code>random(32, 127)</code> 32 dahil, 127 hariç üretir; <code>floor</code> tam sayı yapar; <code>String.fromCharCode</code> o kodu basılabilir karaktere çevirir (harf, rakam, boşluk, noktalama).</p>

    <h3>Adım 2: Seçilim</h3>
    <p>Her birey <code>calculateFitness(hedef)</code> çağırır. Sonra üreme havuzu: uygunluk 0.3 ise o nesneyi havuza 30 kez koyun (<code>floor(fitness * 100)</code>). Çarkı gerçekten çizmeniz gerekmez. Bölüm 0’daki özel dağılım: torbada 30 A, 40 B, 5 C… elinizi daldırırsınız.</p>
    ${N.img(
      "09_ga",
      "09_ga_8.png",
      "Şekil 9.7: Harf dolu kova. Uygunluk yükseldikçe o harften daha çok tane. Rastgele çekince olasılık uygunluğa uyar."
    )}
    <p>Belleği daha az yoran yol: uygunlukları toplayıp 1’e böler, sonra “bayrak yarışı” ile seçersiniz. 0 ile 1 arası bir rastgele sayı tutun; dizide yürüyerek her uygunluğu çıkarın; sayı sıfırın altına inince o birey seçilmiştir. Örnek 9.2 bu yöntemi kullanır.</p>

    ${N.note(
      "Alıştırmalar 9.2–9.4 (orijinal)",
      `<p>9.2: Bölüm 0’daki kabul-red ile <code>weightedSelection</code> yazın. 9.3: Ham uygunluk yerine sıralama (1., 2., 3.) kullanın — yüzde 98’lik bir birey çeşitliği öldürmesin. 9.4: İki ebeveynin aynı birey olmamasını garantileyin.</p>
      <p><a href="https://natureofcode.com/evolution/#exercise-92" target="_blank" rel="noopener">9.2</a> ·
      <a href="https://natureofcode.com/evolution/#exercise-93" target="_blank" rel="noopener">9.3</a> ·
      <a href="https://natureofcode.com/evolution/#exercise-94" target="_blank" rel="noopener">9.4</a></p>`
    )}

    <h3>Adım 3: Çaprazlama ve mutasyon</h3>
    <p><code>parentA.crossover(parentB)</code> yeni bir DNA döndürür. Rastgele orta nokta: öncesi bu ebeveynden, sonrası partnerden. Sonra <code>child.mutate(oran)</code>: her gende <code>random(1) &lt; oran</code> ise yeni karakter.</p>
    ${N.note(
      "Alıştırma 9.5 (orijinal)",
      `<p>Çaprazlamayı yazı-tura yöntemine çevirin: her gen yüzde 50 A, yüzde 50 B.</p>
      <p><a href="https://natureofcode.com/evolution/#exercise-95" target="_blank" rel="noopener">Exercise 9.5</a></p>`
    )}

    <h3>Hepsini bir araya</h3>
    <h3>Örnek 9.1: Shakespeare’e evrilen cümle</h3>
    <p>Hedef <code>to be or not to be</code>. Nüfus 80, mutasyon yüzde 1. Her <code>draw</code> karesi bir kuşaktır. Orijinal kitap 150 cümleyi duvar gibi basar; 400×240 tuvalde okunmaz. Algoritma aynı: en iyi cümle büyük, kuşak ve ortalama uygunluk çubukta, altta birkaç aday. Çubuk 1’e yaklaşınca hedefe yaklaşıyorsunuz.</p>
    ${N.editor("ex91")}
    ${N.tryit([
      { do: "populationSize değerini 20 yapın.", expect: "Hedefe gidiş yavaşlar veya takılır; çeşit azalır." },
      { do: "mutationRate değerini 0.2 yapın.", expect: "Cümleler sürekli bozulur; ‘neredeyse doğru’ duramaz." },
    ])}

    <p>9.1’de çocuklar doğrudan <code>population</code> dizisinin üstüne yazılır. Ayrı bir havuz, eski ebeveynlere referans tuttuğu için bu çalışır. Bayrak yarışı <code>weightedSelection</code> kullanırsanız önce geçici bir dizi doldurup sonra nüfusu değiştirirsiniz — 9.2 öyle yapar.</p>

    ${N.note(
      "Alıştırma 9.6 (orijinal)",
      `<p>9.1’e ilerleme bilgisi ekleyin: her kuşaktaki en yakın cümle, kuşak sayısı, ortalama uygunluk. Hedef bulununca durdurun. GA’yı yöneten bir <code>Population</code> sınıfı yazmayı düşünün.</p>
      <p><a href="https://natureofcode.com/evolution/#exercise-96" target="_blank" rel="noopener">Exercise 9.6</a></p>`
    )}
    <p>Kitabın 9.6 gömülü örneği tam da bunu yapar. Hedef bulununca <code>noLoop</code> animasyonu keser.</p>
    ${N.editor("ex96")}
    ${N.tryit([
      { do: "Hedefi daha kısa bir söz yapın.", expect: "Kuşak sayacı daha küçükken durur." },
    ])}

    ${N.note(
      "Alıştırma 9.7 (orijinal)",
      `<p>Dinamik mutasyon: ortalama uygunluk yükseldikçe mutasyonu düşürün. Hedefe varış hızı değişir mi?</p>
      <p><a href="https://natureofcode.com/evolution/#exercise-97" target="_blank" rel="noopener">Exercise 9.7</a></p>`
    )}

    <h2>Algoritmayı özelleştirmek</h2>

    <p>GA’nın çekirdeği (seçilim, üreme) projeden projeye taşınır. Üç yeri her seferinde siz kesersiniz.</p>
    <h3>Anahtar 1: Küresel değişkenler</h3>
    <p>9.1’de asıl iki sayı: <code>mutationRate = 0.01</code> ve <code>populationSize = 150</code> (bizde 80). Rastgele seçmeyin; deneyerek oturtun. Kitap, cümleyi ortalama ~1000 kuşakta bulsun diye bu değerleri seçmiş: süreç görülsün. Nüfusu şişirirseniz daha çabuk biter ama izlemesi kısa olur.</p>
    <table class="data">
      <thead><tr><th>Nüfus</th><th>Mutasyon</th><th>Kaba davranış</th></tr></thead>
      <tbody>
        <tr><td>küçük (20)</td><td>1%</td><td>Takılabilir; çeşit biter</td></tr>
        <tr><td>orta (80–150)</td><td>1%</td><td>Süreç okunur, hedef gelir</td></tr>
        <tr><td>büyük (1000)</td><td>1%</td><td>Hızlı çözüm, az gösteri</td></tr>
        <tr><td>herhangi</td><td>20%</td><td>Her kuşak rastgeleye yakın</td></tr>
      </tbody>
    </table>

    <h3>Anahtar 2: Uygunluk fonksiyonu</h3>
    <p>Shakespeare’de uygunluk “kaç harf yerinde?”. Başka problemde başka soru: hedefe uzaklık, çarpışma, bakılma süresi. Aynı ham skoru kareye çekmek, iyileri daha da öne çıkarır (Şekil 9.8).</p>
    ${N.img(
      "09_ga",
      "09_ga_9.png",
      "Şekil 9.8: Solda y = x, sağda y = x². Kare almak, yüksek uygunluğu abartır; seçilim keskinleşir."
    )}
    ${N.math(
      "fitness′ = fitness<sup>2</sup>",
      "Ham uygunluk 0.9 ise karesi 0.81; 0.3 ise 0.09. p5.js’te <code>pow(fitness, 2)</code> veya <code>fitness * fitness</code>. Roket örneği bunu dördüncü kuvvete kadar götürür."
    )}
    ${N.note(
      "Alıştırma 9.8 (orijinal)",
      `<p>Uygunluk fonksiyonunu değiştirin (karesi, karekökü, eşik). Shakespeare GA’sının hızı ve takılma biçimi nasıl kayar?</p>
      <p><a href="https://natureofcode.com/evolution/#exercise-98" target="_blank" rel="noopener">Exercise 9.8</a></p>`
    )}

    <h3>Anahtar 3: Genotip ve fenotip</h3>
    <p>Cümlede dizi = yazı. Rokette dizi = her kare için bir kuvvet vektörü; fenotip uçuş yolu. Çiçekte dizi = 0 ile 1 arası sayılar; fenotip yaprak rengi ve sayısı. Aynı çaprazlama, başka anlam.</p>

    <h2>Kuvvetleri evriltmek: akıllı roketler</h2>

    <p>Sahne: nüfus tuvalin altından fırlar, üstteki hedefe varmak ister. Düz yol kapalıysa (Şekil 9.9) her roket kendi itki dizisini evriltmek zorundadır.</p>
    ${N.img(
      "09_ga",
      "09_ga_10.png",
      "Şekil 9.9: Akıllı roket nüfusu, çilek gezegenine gider. Engel düz çizgiyi keser."
    )}
    <p>Klasik masalda her roketin beş iticisi vardır; hepsi birden değil, sırayla ateşler (Şekil 9.10). Kitabın kodu bunu basitleştirir: ömür kadar (ör. 250 kare) kuvvet vektörü. Her kare DNA’dan bir sonraki kuvveti alır, <code>applyForce</code> ile ivmeye ekler.</p>
    ${N.img(
      "09_ga",
      "09_ga_11.png",
      "Şekil 9.10: Beş iticili tek roket, astronot Clawdius ile. Örnekte itici sayısı = ömür (kare kare bir vektör)."
    )}

    <h3>Roketleri geliştirmek</h3>
    <p>DNA’nın her geni bir <code>p5.Vector</code>. Rastgele x ve y seçerseniz olası uçlar bir kare doldurur; köşegen biraz daha uzundur (Şekil 9.11, sol). Açı seçip uzunluğu 1 yapmak daire doldurur (sağ). p5.js’te <code>p5.Vector.fromAngle(random(TWO_PI))</code> veya <code>p5.Vector.random2D()</code>.</p>
    ${N.img(
      "09_ga",
      "09_ga_12.png",
      "Şekil 9.11 (sol): Rastgele x, y ile vektörler — kare, köşegen yanlı."
    )}
    ${N.img(
      "09_ga",
      "09_ga_13.png",
      "Şekil 9.11 (sağ): p5.Vector.random2D() — uçlar daire üzerinde, yön adil."
    )}
    <p>Roket her kare: DNA’dan kuvvet al, <code>applyForce</code>, konum güncelle, çiz. <code>applyForce(f)</code> ivmeye f’yi ekler; kütle 1 ise ivme kuvvettir. Sonra hareket 101: hız += ivme, konum += hız, ivmeyi sıfırla.</p>
    <p>Üçgen gövde hızın baktığı yöne dönsün istiyorsunuz. p5.js <code>velocity.heading()</code> vektörün açısını radyan verir. <code>rotate</code> o açıyı (artı burun düzeltmesi) uygular. <code>rotate</code> kalemi değil, o andaki koordinat sistemini döndürür; önce <code>translate</code> ile roketin konumuna gidin, yoksa (0, 0) etrafında döner. <code>push</code> / <code>pop</code> bu kaydırma ve dönüşü komşuya bulaştırmaz.</p>
    ${N.warn(
      "Tuzak: rotate(90)",
      `<p>p5.js varsayılanı radyandır. <code>rotate(90)</code> 90 radyan ≈ 14 turdur, çeyrek tur değil. Çeyrek tur <code>rotate(HALF_PI)</code> veya <code>angleMode(DEGREES)</code> ile <code>rotate(90)</code>.</p>`
    )}
    <p>Aşağıda aynı hız vektörü iki kez: solda <code>heading</code> + <code>rotate</code> ile üçgen, sağda dönüşsüz (üçgen hep yukarı, yalnız gövde kayar). Fare üçgenin yönünü değiştirir.</p>
    ${N.editor("headingNeden")}
    ${N.tryit([
      { do: "Soldaki rotate satırını yorumlayın.", expect: "Sol üçgen de sağdaki gibi yukarı bakar; heading hesaplanır ama çizime yansımaz." },
    ])}

    <h3>Nüfusu yönetmek</h3>
    <p>Shakespeare’de her kare yeni kuşaktı. Rokette bir kuşak <em>ömür</em> kadar sürer: 250 kare uç, sonra uygunluk, seçilim, üreme. Uygunluk: hedefin uzaklığının karesinin tersi. Yakın olan büyük puan alır.</p>
    ${N.math(
      "fitness = 1 / d<sup>2</sup>",
      "d, roket konumu ile hedef arasındaki uzaklıktır. p5.js <code>p5.Vector.dist(this.position, target)</code> bunu verir: iki vektörün x, y’si. Sıfıra bölmeyi önlemek için d’ye küçük bir pay ekleyebilirsiniz."
    )}

    <h3>Örnek 9.2: Akıllı roketler</h3>
    <p>Hedef üstte daire. Nüfus alttan çıkar. Fareyle hedefi taşıyın; sonraki kuşaklar yeni yere uyum sağlar. Kuşak ve kalan ömür tuvalde yazılı.</p>
    ${N.editor("ex92")}
    ${N.tryit([
      { do: "Hedefi bir köşeye tıklayın.", expect: "Birkaç kuşak sonra uçuş o köşeye yatar." },
      { do: "lifeSpan değerini 80 yapın.", expect: "Ömür kısalır; çoğu hedefe varamadan kuşak biter." },
    ])}

    <h3>İyileştirmeler</h3>
    <p>9.2 yalnız ömrün sonundaki uzaklığa bakar. Hedefe erken varıp geçen roket cezalandırılabilir. Yavaş ve denk kazansın istemezsiniz: rekor mesafeyi ve varış süresini uygunluğa katın. Engel çarpanına da ceza, hedefe değene ödül.</p>
    <h3>Örnek 9.3: Daha akıllı roketler</h3>
    <p>Ortada bir duvar. Duvara çarpanın uygunluğu küçülür. Hedefe değenin ki büyür. Kuşak, kalan döngü, rekor tuvalde.</p>
    ${N.editor("ex93")}
    ${N.tryit([
      { do: "Duvarı daha uzun yapın (w değerini büyütün).", expect: "Dolambaç zorlaşır; ilk kuşaklar duvara yığılır." },
    ])}

    ${N.note(
      "Alıştırmalar 9.9–9.12 (orijinal)",
      `<p>9.9: Daha zor parkour; uygunluk fonksiyonunu da gözden geçirin. 9.10: Jer Thorp’un beş iticili, sınırlı yakıtlı ateş sırası. 9.11: En kısa yolu çizin, duman için parçacık. 9.12: Genotip bir akış alanı olsun.</p>
      <p><a href="https://natureofcode.com/evolution/#exercise-99" target="_blank" rel="noopener">9.9</a> ·
      <a href="https://natureofcode.com/evolution/#exercise-910" target="_blank" rel="noopener">9.10</a> ·
      <a href="https://natureofcode.com/evolution/#exercise-911" target="_blank" rel="noopener">9.11</a> ·
      <a href="https://natureofcode.com/evolution/#exercise-912" target="_blank" rel="noopener">9.12</a></p>`
    )}

    <h2>Etkileşimli seçilim</h2>

    <p>Karl Sims’in <em>Galapagos</em> yerleştirmesi (Tokyo, 1997): on iki monitör, yerde sensör. Bir resme ne kadar bakılırsa o resmin uygunluğu o kadar artar. Uygunluğu insan verir; buna <strong>etkileşimli seçilim</strong> denir. Spotify puanından şarkı, Goodreads’ten kapak da aynı fikir. Burada dijital çiçek (Şekil 9.12).</p>
    ${N.img(
      "09_ga",
      "09_ga_14.png",
      "Şekil 9.12: Etkileşimli seçilim için çiçek tasarımı. Genler renk, yaprak sayısı, sap uzunluğuna açılır."
    )}
    <p>DNA: 0 ile 1 arası on dört sayı. Fenotip: taç rengi, taç boyu, taç adedi, merkez, sap. p5.js <code>map(gen, 0, 1, 4, 24)</code> bir geni piksel aralığına taşır: kaynak 0–1, hedef 4–24. <code>colorMode(RGB, 1)</code> kırmızı-yeşil-mavi’yi de 0–1 tutar; geni doğrudan <code>color</code>’a verebilirsiniz.</p>
    <p>Formül yok. Fare çiçeğin kutusunun üstündeyken uygunluk artar. Alttaki “yeni kuşak” düğmesi seçilim ve üremeyi çalıştırır. Beğendiğinizde durun, sonra evriltin — yoksa her çiçek biraz puan yer, seçilim bulanır.</p>
    ${N.warn(
      "Tuzak: polar taç, rotate unutmak",
      `<p>Yapraklar daire üzerine dizilir: <code>cos(açı)</code> ve <code>sin(açı)</code>. Açı <code>map(i, 0, adet, 0, TWO_PI)</code> ile tam turu adede böler. <code>translate(this.x, this.y)</code> olmadan yapraklar sol üstte üst üste biner.</p>`
    )}

    <h3>Örnek 9.4: Etkileşimli seçilim</h3>
    <p>Fareyi beğendiğiniz çiçeğin üstünde tutun (sayı artar), sonra alttaki düğmeye basın. Kuşak yazısı tuvalde.</p>
    ${N.editor("ex94")}
    ${N.tryit([
      { do: "Tek bir çiçeğin üstünde uzun durup kuşak alın.", expect: "Sonraki sıra o çiçeğe benzer; renk ve taç sayısı yakın kalır." },
      { do: "Hiç gezmeden kuşak alın.", expect: "Herkesin uygunluğu 1’e yakın kalır; değişim çoğunlukla mutasyondur." },
    ])}

    ${N.note(
      "Alıştırmalar 9.13–9.14 (orijinal)",
      `<p>9.13: Kendi etkileşimli seçiliminiz — görsel veya kısa ses dizisi. 9.14: Karl Sims, “Evolved Virtual Creatures”: genotip düğüm ağı, fenotip gövde. Çiçek veya yaratığı parça ağı olarak tasarlayın.</p>
      <p><a href="https://natureofcode.com/evolution/#exercise-913" target="_blank" rel="noopener">9.13</a> ·
      <a href="https://natureofcode.com/evolution/#exercise-914" target="_blank" rel="noopener">9.14</a></p>`
    )}
    ${N.img(
      "09_ga",
      "09_ga_15.png",
      "Karl Sims’in evrilen sanal yaratıklarından bir kare. Genotip doğrusal liste değil, bağlanan parçalar ağıdır."
    )}

    <h2>Ekosistem simülasyonu</h2>

    <p>Klasik GA bir sınavdır: hedef cümle, hedef gezegen, bakılan çiçek. Doğada evrim her karede jüri toplamaz. Canlı yer, yer, ürer, ölür. Uygunluk “hayatta kalıp çocuk bırakmak”tır.</p>
    <p><strong>Bloop</strong>: basit daire yaratık. Yiyecek kare. Yedikçe sağlık artar; sağlık bitince ölür, yerine yiyecek bırakır. Ara sıra tek ebeveyn kopya üretir (klon + mutasyon). Çaprazlama yok: ekosistemde eşleşme mesafesi ayrı bir tasarım.</p>

    <h3>Genotip ve fenotip</h3>
    ${N.img(
      "09_ga",
      "09_ga_16.png",
      "Şekil 9.13: Küçük ve büyük bloop. Örnek daire çizer; siz silueti değiştirebilirsiniz."
    )}
    <p>Tek gen, 0 ile 1 arası. Fenotip iki yüz: yarıçap ve azami hız. Büyük olan yiyeceğe daha kolay değer; yavaştır. Küçük olan hızlıdır, yiyeceği ıskalar. p5.js <code>map(gen, 0, 1, 15, 0)</code> hızı ters çevirir: gen 1 ise hız 0’a yaklaşır.</p>
    <p>Hareket Perlin gürültüsüyle: <code>noise(this.xoff)</code> 0–1 arası yumuşak bir sayı döndürür, <code>map</code> onu hıza çevirir. <code>random</code> gibi her kare sıçramaz; offset’i biraz artırırsınız, yol organik kıvrılır.</p>

    <h3>Seçilim ve üreme</h3>
    <p>Ayrı <code>calculateFitness</code> yok. Sağlık her kare biraz düşer; yemek +100. <code>random(1) &lt; 0.0005</code> ise çocuk. Yaşayan, yiyen, tesadüfen üreyen genini bırakır. Tahmin: sistem orta boy, orta hıza yığılır — çok iri yavaş kalır, çok ufak yiyeceği kaçırır.</p>

    <h3>Örnek 9.5: Evrilen ekosistem</h3>
    <p>Gri kareler yiyecek. Daireler bloop; soluklaşan ölmek üzeredir. Tıklayınca yeni bloop doğar. Sayıları tuvalde: canlı sayısı, ortalama yarıçap.</p>
    ${N.editor("ex95")}
    ${N.tryit([
      { do: "Bir süre izleyin.", expect: "Aşırı iri veya aşırı ufaklar seyrekleşir; orta boy kalır (anomali olabilir)." },
      { do: "Köşeye tıklayıp bloop ekleyin.", expect: "Yerel bir nüfus şişer; yiyecek yetmezse yine düşer." },
    ])}

    ${N.note(
      "Ekosistem projesi (orijinal)",
      `<p>Ekosisteminize evrim ekleyin: av–avcı silahlanma yarışı; yakınken çaprazlama; yönelme kuvvetlerinin ağırlığını DNA yapma; aşırı çoğalma / toplu yok oluş dengesini parametre evriltmeyle arama.</p>
      <p><a href="https://natureofcode.com/evolution/#the-ecosystem-project-10" target="_blank" rel="noopener">The Ecosystem Project</a></p>`
    )}

    ${N.resources([
      { kind: "Kitap", title: "Chapter 9 · Evolutionary Computing", url: "https://natureofcode.com/evolution/" },
      { kind: "Kod", title: "09_ga örnekleri", url: "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/09_ga" },
      { kind: "Video", title: "Coding Train · Genetic Algorithm (NoC 2)", url: "https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/9-genetic-algorithms/1-genetic-algorithm" },
      { kind: "Video", title: "How Genetic Algorithms Work", url: "https://www.youtube.com/watch?v=RxTfc4JLYKs" },
      { kind: "Video", title: "Interactive Selection", url: "https://www.youtube.com/watch?v=Zy_obitkyOE" },
      { kind: "Makale", title: "Karl Sims · Evolved Virtual Creatures (1994)", url: "https://www.karlsims.com/papers/siggraph94.pdf" },
      { kind: "Referans", title: "p5.js · random", url: "https://p5js.org/reference/p5/random/" },
      { kind: "Referans", title: "p5.js · heading", url: "https://p5js.org/reference/p5/heading/" },
      { kind: "Referans", title: "p5.js · map", url: "https://p5js.org/reference/p5/map/" },
    ])}
    <p><a href="#/ch8">← Fraktallar</a> · <a href="#/ch10">Sinir ağları →</a></p>
  `,
  editors: {
    rastgeleDizi: {
      title: "İskele: rastgele üç harf (Alıştırma 9.1)",
      files: [
        {
          name: "sketch.js",
          content: `let hedef = "cat";
let aday = "";
let deneme = 0;
let bulundu = false;

function rastgeleKarakter() {
  let kod = floor(random(97, 123)); // a-z
  return String.fromCharCode(kod);
}

function setup() {
  createCanvas(400, 240);
  textFont("Courier");
}

function draw() {
  background(255);
  if (!bulundu) {
    aday = rastgeleKarakter() + rastgeleKarakter() + rastgeleKarakter();
    deneme++;
    if (aday === hedef) bulundu = true;
  }
  fill(0);
  noStroke();
  textSize(16);
  text("hedef: " + hedef, 16, 36);
  text("aday:  " + aday, 16, 64);
  text("deneme: " + deneme, 16, 96);
  if (bulundu) {
    fill(20, 120, 40);
    text("cat geldi — kaba kuvvet buraya kadar.", 16, 140);
    noLoop();
  }
}`,
        },
      ],
    },
    gaGorsel: {
      title: "Uygunluk, havuz, çaprazlama, mutasyon — bir karede",
      files: [
        {
          name: "sketch.js",
          content: `let hedef = "cat";
let nufus = [];
let havuz = [];
let ebeveynA, ebeveynB, cocuk, orta, mutIndis;
let kusak = 0;
let mutasyonOrani = 0.2;

function rastgeleKarakter() {
  return String.fromCharCode(floor(random(97, 123)));
}

function yeniAday() {
  return {
    genes: [rastgeleKarakter(), rastgeleKarakter(), rastgeleKarakter()],
    fitness: 0,
  };
}

function soz(kim) {
  return kim.genes.join("");
}

function skorla(kim) {
  let n = 0;
  for (let i = 0; i < 3; i++) {
    if (kim.genes[i] === hedef[i]) n++;
  }
  kim.fitness = n / 3;
}

function havuzKur() {
  havuz = [];
  for (let kim of nufus) {
    let kopya = max(1, floor(kim.fitness * 10));
    for (let j = 0; j < kopya; j++) havuz.push(kim);
  }
}

function uret() {
  havuzKur();
  ebeveynA = random(havuz);
  ebeveynB = random(havuz);
  orta = floor(random(3));
  cocuk = { genes: ["", "", ""], fitness: 0 };
  for (let i = 0; i < 3; i++) {
    cocuk.genes[i] = i < orta ? ebeveynA.genes[i] : ebeveynB.genes[i];
  }
  mutIndis = -1;
  for (let i = 0; i < 3; i++) {
    if (random(1) < mutasyonOrani) {
      cocuk.genes[i] = rastgeleKarakter();
      mutIndis = i;
    }
  }
  skorla(cocuk);
  let enZayif = 0;
  for (let i = 1; i < nufus.length; i++) {
    if (nufus[i].fitness < nufus[enZayif].fitness) enZayif = i;
  }
  nufus[enZayif] = {
    genes: cocuk.genes.slice(),
    fitness: cocuk.fitness,
  };
  kusak++;
}

function setup() {
  createCanvas(400, 240);
  textFont("Courier");
  for (let i = 0; i < 5; i++) {
    let kim = yeniAday();
    skorla(kim);
    nufus.push(kim);
  }
  uret();
}

function mousePressed() {
  uret();
}

function harfKutu(x, y, ch, vurgu) {
  stroke(vurgu ? color(180, 40, 40) : 0);
  strokeWeight(vurgu ? 3 : 1);
  fill(vurgu ? color(255, 220, 220) : 255);
  rect(x, y, 22, 26);
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  text(ch, x + 11, y + 13);
  textAlign(LEFT, BASELINE);
}

function draw() {
  background(255);
  fill(0);
  noStroke();
  textSize(11);
  text("hedef: " + hedef + "   kuşak: " + kusak + "   tıkla = 1 kuşak", 8, 16);
  text("uygunluk çubukları", 8, 34);
  for (let i = 0; i < nufus.length; i++) {
    let kim = nufus[i];
    let y = 44 + i * 28;
    fill(40, 80, 140);
    noStroke();
    rect(70, y, kim.fitness * 90, 18);
    stroke(0);
    noFill();
    rect(70, y, 90, 18);
    fill(0);
    noStroke();
    text(soz(kim) + "  " + nf(kim.fitness, 1, 2), 8, y + 13);
  }
  text("havuz biletleri", 180, 34);
  let x = 180;
  let y = 44;
  for (let i = 0; i < havuz.length; i++) {
    fill(180, 140, 40);
    stroke(0);
    rect(x, y, 16, 16);
    fill(0);
    noStroke();
    textSize(9);
    text(soz(havuz[i])[0], x + 4, y + 12);
    x += 18;
    if (x > 268) {
      x = 180;
      y += 18;
    }
  }
  textSize(11);
  fill(0);
  noStroke();
  text("caprazlama  orta=" + orta, 290, 34);
  text("A", 290, 52);
  for (let i = 0; i < 3; i++) harfKutu(308 + i * 24, 38, ebeveynA.genes[i], false);
  text("B", 290, 86);
  for (let i = 0; i < 3; i++) harfKutu(308 + i * 24, 72, ebeveynB.genes[i], false);
  text("cocuk", 278, 124);
  for (let i = 0; i < 3; i++) {
    harfKutu(308 + i * 24, 110, cocuk.genes[i], i === mutIndis);
  }
  text("kirmizi = mutasyon", 278, 160);
  text("oran = " + mutasyonOrani, 278, 178);
}`,
        },
      ],
    },
    nufusDizi: {
      title: "Nesne dizisi: rastgele kutular",
      files: [
        {
          name: "sketch.js",
          content: `let kutular = [];

function setup() {
  createCanvas(400, 240);
  for (let i = 0; i < 8; i++) {
    kutular[i] = {
      x: random(20, width - 20),
      y: random(40, height - 20),
      r: random(8, 18),
    };
  }
}

function draw() {
  background(255);
  for (let k of kutular) {
    stroke(0);
    fill(180);
    circle(k.x, k.y, k.r * 2);
  }
  fill(0);
  noStroke();
  text("kutular.length = " + kutular.length, 12, 22);
  text("tıkla: diziye yeni nesne ekle", 12, 40);
}

function mousePressed() {
  kutular.push({ x: mouseX, y: mouseY, r: random(8, 18) });
}`,
        },
      ],
    },
    ex91: {
      title: "Örnek 9.1: Shakespeare GA",
      original: {
        book: "https://natureofcode.com/evolution/#example-91-genetic-algorithm-for-evolving-shakespeare",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/09_ga/9_1_ga_shakespeare",
      },
      files: [
        {
          name: "DNA.js",
          content: `function rastgeleKarakter() {
  let c = floor(random(32, 127));
  return String.fromCharCode(c);
}

class DNA {
  constructor(uzunluk) {
    this.genes = [];
    this.fitness = 0;
    for (let i = 0; i < uzunluk; i++) {
      this.genes[i] = rastgeleKarakter();
    }
  }

  getPhrase() {
    return this.genes.join("");
  }

  calculateFitness(target) {
    let skor = 0;
    for (let i = 0; i < this.genes.length; i++) {
      if (this.genes[i] === target.charAt(i)) skor++;
    }
    this.fitness = skor / target.length;
  }

  crossover(partner) {
    let child = new DNA(this.genes.length);
    let orta = floor(random(this.genes.length));
    for (let i = 0; i < this.genes.length; i++) {
      child.genes[i] = i < orta ? this.genes[i] : partner.genes[i];
    }
    return child;
  }

  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) {
        this.genes[i] = rastgeleKarakter();
      }
    }
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let mutationRate = 0.01;
let populationSize = 80;
let population = [];
let target = "to be or not to be";
let kusak = 0;
let enIyi = "";
let ortalama = 0;

function setup() {
  createCanvas(400, 240);
  for (let i = 0; i < populationSize; i++) {
    population[i] = new DNA(target.length);
  }
  textFont("Courier");
}

function draw() {
  for (let phrase of population) {
    phrase.calculateFitness(target);
  }
  let toplam = 0;
  let rekor = 0;
  enIyi = population[0].getPhrase();
  for (let phrase of population) {
    toplam += phrase.fitness;
    if (phrase.fitness > rekor) {
      rekor = phrase.fitness;
      enIyi = phrase.getPhrase();
    }
  }
  ortalama = toplam / population.length;

  let matingPool = [];
  for (let phrase of population) {
    let n = floor(phrase.fitness * 100);
    for (let j = 0; j < n; j++) matingPool.push(phrase);
  }
  if (matingPool.length === 0) matingPool = population.slice();

  for (let i = 0; i < population.length; i++) {
    let partnerA = random(matingPool);
    let partnerB = random(matingPool);
    let child = partnerA.crossover(partnerB);
    child.mutate(mutationRate);
    population[i] = child;
  }
  kusak++;

  background(255);
  fill(0);
  noStroke();
  textSize(12);
  text("en iyi:", 12, 22);
  textSize(16);
  text(enIyi, 12, 46);
  textSize(12);
  text("kuşak: " + kusak, 12, 72);
  text("ortalama uygunluk: " + nf(ortalama, 1, 3), 12, 90);
  fill(40, 100, 40);
  rect(12, 100, ortalama * 376, 14);
  stroke(0);
  noFill();
  rect(12, 100, 376, 14);
  noStroke();
  fill(0);
  text("örnek adaylar:", 12, 136);
  textSize(11);
  for (let i = 0; i < 6; i++) {
    text(population[i].getPhrase(), 12, 154 + i * 14);
  }
}`,
        },
      ],
    },
    ex96: {
      title: "Alıştırma 9.6: İstatistikli Shakespeare",
      original: {
        book: "https://natureofcode.com/evolution/#exercise-96",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/09_ga/exercise_9_6_annotated_ga_shakespeare",
      },
      files: [
        {
          name: "DNA.js",
          content: `function newChar() {
  let c = floor(random(63, 123));
  if (c === 63) c = 32;
  if (c === 64) c = 46;
  return String.fromCharCode(c);
}

class DNA {
  constructor(num) {
    this.genes = [];
    this.fitness = 0;
    for (let i = 0; i < num; i++) this.genes[i] = newChar();
  }

  getPhrase() {
    return this.genes.join("");
  }

  calcFitness(target) {
    let score = 0;
    for (let i = 0; i < this.genes.length; i++) {
      if (this.genes[i] === target.charAt(i)) score++;
    }
    this.fitness = score / target.length;
  }

  crossover(partner) {
    let child = new DNA(this.genes.length);
    let midpoint = floor(random(this.genes.length));
    for (let i = 0; i < this.genes.length; i++) {
      child.genes[i] = i > midpoint ? this.genes[i] : partner.genes[i];
    }
    return child;
  }

  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) this.genes[i] = newChar();
    }
  }
}`,
        },
        {
          name: "population.js",
          content: `class Population {
  constructor(p, m, num) {
    this.target = p;
    this.mutationRate = m;
    this.generations = 0;
    this.finished = false;
    this.perfectScore = 1;
    this.best = "";
    this.population = [];
    this.matingPool = [];
    for (let i = 0; i < num; i++) {
      this.population[i] = new DNA(this.target.length);
    }
    this.calcFitness();
  }

  calcFitness() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(this.target);
    }
  }

  naturalSelection() {
    this.matingPool = [];
    let maxFitness = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }
    for (let i = 0; i < this.population.length; i++) {
      let fitness = maxFitness === 0 ? 0 : map(this.population[i].fitness, 0, maxFitness, 0, 1);
      let n = floor(fitness * 100);
      for (let j = 0; j < n; j++) this.matingPool.push(this.population[i]);
    }
  }

  generate() {
    if (this.matingPool.length === 0) this.matingPool = this.population.slice();
    for (let i = 0; i < this.population.length; i++) {
      let partnerA = random(this.matingPool);
      let partnerB = random(this.matingPool);
      let child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
    this.generations++;
  }

  evaluate() {
    let worldrecord = 0;
    let index = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > worldrecord) {
        index = i;
        worldrecord = this.population[i].fitness;
      }
    }
    this.best = this.population[index].getPhrase();
    if (worldrecord === this.perfectScore) this.finished = true;
  }

  isFinished() {
    return this.finished;
  }

  getGenerations() {
    return this.generations;
  }

  getAverageFitness() {
    let total = 0;
    for (let i = 0; i < this.population.length; i++) {
      total += this.population[i].fitness;
    }
    return total / this.population.length;
  }

  allPhrases() {
    let everything = "";
    let displayLimit = min(this.population.length, 18);
    for (let i = 0; i < displayLimit; i++) {
      everything += this.population[i].getPhrase() + "\\n";
    }
    return everything;
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let target;
let popmax;
let mutationRate;
let population;

function setup() {
  createCanvas(400, 240);
  target = "To be or not to be.";
  popmax = 120;
  mutationRate = 0.01;
  population = new Population(target, mutationRate, popmax);
  textFont("Courier");
}

function draw() {
  population.naturalSelection();
  population.generate();
  population.calcFitness();
  population.evaluate();
  if (population.isFinished()) noLoop();

  background(255);
  fill(0);
  noStroke();
  textSize(11);
  text("en iyi:", 10, 18);
  textSize(16);
  text(population.getBest(), 10, 40);
  textSize(11);
  text("kuşak: " + population.getGenerations(), 10, 64);
  text("ortalama: " + nf(population.getAverageFitness(), 1, 2), 10, 80);
  text("nüfus: " + popmax + "   mutasyon: " + floor(mutationRate * 100) + "%", 10, 96);
  fill(40, 100, 40);
  rect(10, 104, population.getAverageFitness() * 180, 10);
  stroke(0);
  noFill();
  rect(10, 104, 180, 10);
  noStroke();
  fill(0);
  textSize(9);
  text(population.allPhrases(), 210, 18);
}`,
        },
      ],
    },
    headingNeden: {
      title: "heading + rotate: roket burun yönü",
      files: [
        {
          name: "sketch.js",
          content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  let hiz = createVector(mouseX - 100, mouseY - 120);
  stroke(0);
  fill(0);
  noStroke();
  text("heading + rotate", 16, 20);
  text("rotate yok", 230, 20);
  cizRoket(100, 120, hiz, true);
  cizRoket(300, 120, hiz, false);
  fill(0);
  noStroke();
  text("heading = " + nf(hiz.heading(), 1, 2) + " radyan", 16, 220);
}

function cizRoket(x, y, hiz, don) {
  let aci = hiz.heading() + HALF_PI;
  stroke(0);
  fill(200);
  push();
  translate(x, y);
  if (don) rotate(aci);
  beginShape(TRIANGLES);
  vertex(0, -16);
  vertex(-8, 16);
  vertex(8, 16);
  endShape();
  pop();
  stroke(40, 80, 160);
  line(x, y, x + hiz.x * 0.25, y + hiz.y * 0.25);
}`,
        },
      ],
    },
    ex92: {
      title: "Örnek 9.2: Akıllı roketler",
      original: {
        book: "https://natureofcode.com/evolution/#example-92-smart-rockets",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/09_ga/9_2_smart_rockets_basic",
      },
      files: [
        {
          name: "dna.js",
          content: `class DNA {
  constructor() {
    this.genes = [];
    this.maxforce = 0.1;
    for (let i = 0; i < lifeSpan; i++) {
      let angle = random(TWO_PI);
      this.genes[i] = p5.Vector.fromAngle(angle);
      this.genes[i].mult(random(0, this.maxforce));
    }
  }

  crossover(partner) {
    let child = new DNA();
    let midpoint = floor(random(this.genes.length));
    for (let i = 0; i < this.genes.length; i++) {
      child.genes[i] = i < midpoint ? this.genes[i] : partner.genes[i];
    }
    return child;
  }

  mutate(m) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < m) {
        let angle = random(TWO_PI);
        this.genes[i] = p5.Vector.fromAngle(angle);
        this.genes[i].mult(random(0, this.maxforce));
      }
    }
  }
}`,
        },
        {
          name: "rocket.js",
          content: `class Rocket {
  constructor(x, y, dna) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.position = createVector(x, y);
    this.r = 4;
    this.fitness = 0;
    this.dna = dna;
    this.geneCounter = 0;
  }

  calculateFitness() {
    let d = p5.Vector.dist(this.position, target);
    this.fitness = 1 / (d * d + 1);
  }

  run() {
    this.applyForce(this.dna.genes[this.geneCounter]);
    this.geneCounter = this.geneCounter + 1;
    this.update();
    this.show();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show() {
    let angle = this.velocity.heading() + PI / 2;
    stroke(0);
    strokeWeight(1);
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    rectMode(CENTER);
    fill(0);
    rect(-this.r / 2, this.r * 2, this.r / 2, this.r);
    rect(this.r / 2, this.r * 2, this.r / 2, this.r);
    fill(200);
    beginShape(TRIANGLES);
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }
}`,
        },
        {
          name: "population.js",
          content: `class Population {
  constructor(mutation, length) {
    this.mutationRate = mutation;
    this.population = [];
    this.generations = 0;
    for (let i = 0; i < length; i++) {
      this.population[i] = new Rocket(width / 2, height, new DNA());
    }
  }

  live() {
    for (let rocket of this.population) rocket.run();
  }

  fitness() {
    for (let rocket of this.population) rocket.calculateFitness();
  }

  selection() {
    let totalFitness = 0;
    for (let rocket of this.population) totalFitness += rocket.fitness;
    for (let rocket of this.population) rocket.fitness /= totalFitness;
  }

  reproduction() {
    let nextPopulation = [];
    for (let i = 0; i < this.population.length; i++) {
      let parentA = this.weightedSelection();
      let parentB = this.weightedSelection();
      let child = parentA.crossover(parentB);
      child.mutate(this.mutationRate);
      nextPopulation[i] = new Rocket(width / 2, height, child);
    }
    this.population = nextPopulation;
    this.generations++;
  }

  weightedSelection() {
    let index = 0;
    let start = random(1);
    while (start > 0) {
      start = start - this.population[index].fitness;
      index++;
    }
    index--;
    return this.population[index].dna;
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let lifeSpan = 200;
let lifeCounter = 0;
let population;
let target;

function setup() {
  createCanvas(400, 240);
  target = createVector(width / 2, 24);
  population = new Population(0.01, 30);
}

function draw() {
  background(255);
  fill(127);
  stroke(0);
  strokeWeight(2);
  circle(target.x, target.y, 24);
  if (lifeCounter < lifeSpan) {
    population.live();
    lifeCounter++;
  } else {
    lifeCounter = 0;
    population.fitness();
    population.selection();
    population.reproduction();
  }
  fill(0);
  noStroke();
  text("kuşak: " + population.generations, 10, 20);
  text("kalan omur: " + (lifeSpan - lifeCounter), 10, 36);
}

function mousePressed() {
  target.x = mouseX;
  target.y = mouseY;
}`,
        },
      ],
    },
    ex93: {
      title: "Örnek 9.3: Daha akıllı roketler",
      original: {
        book: "https://natureofcode.com/evolution/#example-93-smarter-rockets",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/09_ga/9_3_smart_rockets",
      },
      files: [
        {
          name: "obstacle.js",
          content: `class Obstacle {
  constructor(x, y, w, h) {
    this.position = createVector(x, y);
    this.w = w;
    this.h = h;
  }

  show() {
    stroke(0);
    fill(175);
    strokeWeight(2);
    rectMode(CORNER);
    rect(this.position.x, this.position.y, this.w, this.h);
  }

  contains(spot) {
    return (
      spot.x > this.position.x &&
      spot.x < this.position.x + this.w &&
      spot.y > this.position.y &&
      spot.y < this.position.y + this.h
    );
  }
}`,
        },
        {
          name: "dna.js",
          content: `class DNA {
  constructor() {
    this.genes = [];
    this.maxforce = 0.1;
    for (let i = 0; i < lifeSpan; i++) {
      let angle = random(TWO_PI);
      this.genes[i] = p5.Vector.fromAngle(angle);
      this.genes[i].mult(random(0, this.maxforce));
    }
  }

  crossover(partner) {
    let child = new DNA();
    let midpoint = floor(random(this.genes.length));
    for (let i = 0; i < this.genes.length; i++) {
      child.genes[i] = i < midpoint ? this.genes[i] : partner.genes[i];
    }
    return child;
  }

  mutate(m) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < m) {
        let angle = random(TWO_PI);
        this.genes[i] = p5.Vector.fromAngle(angle);
        this.genes[i].mult(random(0, this.maxforce));
      }
    }
  }
}`,
        },
        {
          name: "rocket.js",
          content: `class Rocket {
  constructor(x, y, dna) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.position = createVector(x, y);
    this.r = 4;
    this.dna = dna;
    this.finishCounter = 0;
    this.recordDistance = Infinity;
    this.fitness = 0;
    this.geneCounter = 0;
    this.hitObstacle = false;
    this.hitTarget = false;
  }

  calculateFitness() {
    this.fitness = 1 / (this.finishCounter * this.recordDistance + 1);
    this.fitness = pow(this.fitness, 4);
    if (this.hitObstacle) this.fitness *= 0.1;
    if (this.hitTarget) this.fitness *= 2;
  }

  run(obstacles) {
    if (!this.hitObstacle && !this.hitTarget) {
      this.applyForce(this.dna.genes[this.geneCounter]);
      this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length;
      this.update();
      this.checkObstacles(obstacles);
    }
    this.show();
  }

  checkTarget() {
    let d = p5.Vector.dist(this.position, createVector(target.position.x + 12, target.position.y + 12));
    if (d < this.recordDistance) this.recordDistance = d;
    if (target.contains(this.position)) this.hitTarget = true;
    if (!this.hitTarget) this.finishCounter++;
  }

  checkObstacles(obstacles) {
    for (let obstacle of obstacles) {
      if (obstacle.contains(this.position)) this.hitObstacle = true;
    }
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show() {
    let theta = this.velocity.heading() + PI / 2;
    fill(200, 100);
    stroke(0);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    rectMode(CENTER);
    fill(0);
    rect(-this.r / 2, this.r * 2, this.r / 2, this.r);
    rect(this.r / 2, this.r * 2, this.r / 2, this.r);
    fill(200);
    beginShape(TRIANGLES);
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape();
    pop();
  }
}`,
        },
        {
          name: "population.js",
          content: `class Population {
  constructor(mutation, length) {
    this.mutationRate = mutation;
    this.population = [];
    this.generations = 0;
    for (let i = 0; i < length; i++) {
      this.population[i] = new Rocket(width / 2, height, new DNA());
    }
  }

  live(obstacles) {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].checkTarget();
      this.population[i].run(obstacles);
    }
  }

  targetReached() {
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].hitTarget) return true;
    }
    return false;
  }

  calculateFitness() {
    for (let r of this.population) r.calculateFitness();
  }

  selection() {
    let totalFitness = 0;
    for (let r of this.population) totalFitness += r.fitness;
    for (let r of this.population) r.fitness /= totalFitness;
  }

  reproduction() {
    let nextPopulation = [];
    for (let i = 0; i < this.population.length; i++) {
      let parentA = this.weightedSelection();
      let parentB = this.weightedSelection();
      let child = parentA.crossover(parentB);
      child.mutate(this.mutationRate);
      nextPopulation[i] = new Rocket(width / 2, height, child);
    }
    this.population = nextPopulation;
    this.generations++;
  }

  weightedSelection() {
    let index = 0;
    let start = random(1);
    while (start > 0) {
      start = start - this.population[index].fitness;
      index++;
    }
    index--;
    return this.population[index].dna;
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let lifeSpan = 200;
let population;
let lifeCounter = 0;
let recordTime;
let target;
let obstacles = [];

function setup() {
  createCanvas(400, 240);
  recordTime = lifeSpan;
  target = new Obstacle(width / 2 - 12, 16, 24, 24);
  population = new Population(0.01, 40);
  obstacles.push(new Obstacle(width / 2 - 60, height / 2, 120, 10));
}

function draw() {
  background(255);
  target.show();
  if (lifeCounter < lifeSpan) {
    population.live(obstacles);
    if (population.targetReached() && lifeCounter < recordTime) {
      recordTime = lifeCounter;
    } else {
      lifeCounter++;
    }
  } else {
    lifeCounter = 0;
    population.calculateFitness();
    population.selection();
    population.reproduction();
  }
  for (let o of obstacles) o.show();
  fill(0);
  noStroke();
  text("kuşak: " + population.generations, 10, 18);
  text("kalan: " + (lifeSpan - lifeCounter), 10, 34);
  text("rekor: " + recordTime, 10, 50);
}

function mousePressed() {
  target.position.x = mouseX;
  target.position.y = mouseY;
  recordTime = lifeSpan;
}`,
        },
      ],
    },
    ex94: {
      title: "Örnek 9.4: Etkileşimli seçilim",
      original: {
        book: "https://natureofcode.com/evolution/#example-94-interactive-selection",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/09_ga/9_4_interactive_selection",
      },
      files: [
        {
          name: "rectangle.js",
          content: `class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }

  contains(px, py) {
    return px > this.x && px < this.x + this.width && py > this.y && py < this.y + this.height;
  }
}`,
        },
        {
          name: "dna.js",
          content: `class DNA {
  constructor() {
    this.genes = [];
    for (let i = 0; i < 14; i++) this.genes[i] = random(0, 1);
  }

  crossover(partner) {
    let child = new DNA();
    let midpoint = floor(random(this.genes.length));
    for (let i = 0; i < this.genes.length; i++) {
      child.genes[i] = i < midpoint ? this.genes[i] : partner.genes[i];
    }
    return child;
  }

  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) this.genes[i] = random(1);
    }
  }
}`,
        },
        {
          name: "flower.js",
          content: `class Flower {
  constructor(dna, x, y) {
    this.rolloverOn = false;
    this.dna = dna;
    this.x = x;
    this.y = y;
    this.w = 64;
    this.h = 120;
    this.fitness = 1;
    this.boundingBox = new Rectangle(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
  }

  show() {
    let genes = this.dna.genes;
    let c = color(genes[0], genes[1], genes[2], genes[3]);
    let size = map(genes[4], 0, 1, 4, 18);
    let count = floor(map(genes[5], 0, 1, 2, 12));
    let centerColor = color(genes[6], genes[7], genes[8]);
    let centerSize = map(genes[9], 0, 1, 14, 28);
    let stemColor = color(genes[10], genes[11], genes[12]);
    let stemLength = map(genes[13], 0, 1, 36, 70);

    push();
    translate(this.x, this.y);
    if (this.rolloverOn) fill(0, 0.25);
    else noFill();
    stroke(0);
    strokeWeight(0.5);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    translate(0, this.h / 2 - stemLength);
    stroke(stemColor);
    strokeWeight(3);
    line(0, 0, 0, stemLength);
    noStroke();
    fill(c);
    for (let i = 0; i < count; i++) {
      let angle = map(i, 0, count, 0, TWO_PI);
      ellipse(size * cos(angle), size * sin(angle), size, size);
    }
    fill(centerColor);
    ellipse(0, 0, centerSize, centerSize);
    pop();

    textAlign(CENTER);
    fill(this.rolloverOn ? 0 : 0.35);
    noStroke();
    text(floor(this.fitness), this.x, this.y + 70);
  }

  rollover(mx, my) {
    if (this.boundingBox.contains(mx, my)) {
      this.rolloverOn = true;
      this.fitness += 0.25;
    } else {
      this.rolloverOn = false;
    }
  }
}`,
        },
        {
          name: "population.js",
          content: `class Population {
  constructor(mutationRate, size) {
    this.mutationRate = mutationRate;
    this.flowers = [];
    this.generations = 0;
    for (let i = 0; i < size; i++) {
      this.flowers[i] = new Flower(new DNA(), 40 + i * 80, 100);
    }
  }

  show() {
    for (let f of this.flowers) f.show();
  }

  rollover(mx, my) {
    for (let f of this.flowers) f.rollover(mx, my);
  }

  weightedSelection() {
    let index = 0;
    let start = random(1);
    while (start > 0) {
      start = start - this.flowers[index].fitness;
      index++;
    }
    index--;
    return this.flowers[index];
  }

  selection() {
    let totalFitness = 0;
    for (let f of this.flowers) totalFitness += f.fitness;
    for (let f of this.flowers) f.fitness /= totalFitness;
  }

  reproduction() {
    let nextFlowers = [];
    for (let i = 0; i < this.flowers.length; i++) {
      let parentA = this.weightedSelection();
      let parentB = this.weightedSelection();
      let child = parentA.dna.crossover(parentB.dna);
      child.mutate(this.mutationRate);
      nextFlowers[i] = new Flower(child, 40 + i * 80, 100);
    }
    this.flowers = nextFlowers;
    this.generations++;
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let population;
let dugme = { x: 12, y: 208, w: 120, h: 24 };

function setup() {
  createCanvas(400, 240);
  colorMode(RGB, 1);
  population = new Population(0.05, 5);
}

function draw() {
  background(1);
  population.show();
  population.rollover(mouseX, mouseY);
  fill(0.15);
  rect(dugme.x, dugme.y, dugme.w, dugme.h);
  fill(1);
  noStroke();
  textAlign(LEFT);
  text("yeni kuşak", dugme.x + 10, dugme.y + 16);
  fill(0);
  text("kuşak " + population.generations, 150, 224);
}

function mousePressed() {
  if (
    mouseX > dugme.x &&
    mouseX < dugme.x + dugme.w &&
    mouseY > dugme.y &&
    mouseY < dugme.y + dugme.h
  ) {
    population.selection();
    population.reproduction();
  }
}`,
        },
      ],
    },
    ex95: {
      title: "Örnek 9.5: Evrilen ekosistem",
      original: {
        book: "https://natureofcode.com/evolution/#example-95-an-evolving-ecosystem",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/09_ga/9_5_evolving_bloops",
      },
      files: [
        {
          name: "dna.js",
          content: `class DNA {
  constructor() {
    this.genes = [];
    for (let i = 0; i < 1; i++) this.genes[i] = random(0, 1);
  }

  copy() {
    let newDNA = new DNA();
    newDNA.genes = this.genes.slice();
    return newDNA;
  }

  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) this.genes[i] = random(1);
    }
  }
}`,
        },
        {
          name: "food.js",
          content: `class Food {
  constructor(num) {
    this.foodPositions = [];
    for (let i = 0; i < num; i++) {
      this.foodPositions.push(createVector(random(width), random(height)));
    }
  }

  add(position) {
    this.foodPositions.push(position.copy());
  }

  run() {
    for (let i = 0; i < this.foodPositions.length; i++) {
      let position = this.foodPositions[i];
      rectMode(CENTER);
      stroke(0);
      fill(200);
      square(position.x, position.y, 8);
    }
    if (random(1) < 0.001) {
      this.foodPositions.push(createVector(random(width), random(height)));
    }
  }
}`,
        },
        {
          name: "bloop.js",
          content: `class Bloop {
  constructor(position, dna) {
    this.position = position;
    this.health = 200;
    this.xoff = random(1000);
    this.yoff = random(1000);
    this.dna = dna;
    this.maxspeed = map(this.dna.genes[0], 0, 1, 15, 0);
    this.r = map(this.dna.genes[0], 0, 1, 0, 25);
  }

  run() {
    this.update();
    this.borders();
    this.show();
  }

  eat(food) {
    let positions = food.foodPositions;
    for (let i = positions.length - 1; i >= 0; i--) {
      let distance = p5.Vector.dist(this.position, positions[i]);
      if (distance < this.r * 2) {
        this.health += 100;
        positions.splice(i, 1);
      }
    }
  }

  reproduce() {
    if (random(1) < 0.0005) {
      let childDNA = this.dna.copy();
      childDNA.mutate(0.01);
      return new Bloop(this.position.copy(), childDNA);
    }
    return null;
  }

  update() {
    let vx = map(noise(this.xoff), 0, 1, -this.maxspeed, this.maxspeed);
    let vy = map(noise(this.yoff), 0, 1, -this.maxspeed, this.maxspeed);
    let velocity = createVector(vx, vy);
    this.xoff += 0.01;
    this.yoff += 0.01;
    this.position.add(velocity);
    this.health -= 0.2;
  }

  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }

  show() {
    stroke(0, this.health);
    fill(0, this.health);
    circle(this.position.x, this.position.y, this.r * 2);
  }

  dead() {
    return this.health < 0;
  }
}`,
        },
        {
          name: "world.js",
          content: `class World {
  constructor(populationSize) {
    this.bloops = [];
    for (let i = 0; i < populationSize; i++) {
      let position = createVector(random(width), random(height));
      this.bloops.push(new Bloop(position, new DNA()));
    }
    this.food = new Food(populationSize);
  }

  run() {
    this.food.run();
    for (let i = this.bloops.length - 1; i >= 0; i--) {
      let bloop = this.bloops[i];
      bloop.run();
      bloop.eat(this.food);
      if (bloop.dead()) {
        this.bloops.splice(i, 1);
        this.food.add(bloop.position);
      } else {
        let child = bloop.reproduce();
        if (child) this.bloops.push(child);
      }
    }
  }

  born(x, y) {
    this.bloops.push(new Bloop(createVector(x, y), new DNA()));
  }

  ortalamaYaricap() {
    if (this.bloops.length === 0) return 0;
    let t = 0;
    for (let b of this.bloops) t += b.r;
    return t / this.bloops.length;
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let world;

function setup() {
  createCanvas(400, 240);
  world = new World(16);
}

function draw() {
  background(255);
  world.run();
  fill(0);
  noStroke();
  text("bloop: " + world.bloops.length, 8, 16);
  text("ortalama r: " + nf(world.ortalamaYaricap(), 1, 1), 8, 32);
}

function mousePressed() {
  world.born(mouseX, mouseY);
}`,
        },
      ],
    },
  },
});
