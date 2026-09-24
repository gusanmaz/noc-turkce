registerChapter({
  id: "ch10",
  title: "10. Sinir ağları",
  short: "10. Sinir",
  icon: "🧠",
  original: "https://natureofcode.com/neural-networks/",
  originalCode:
    "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/10_nn",
  html: `
    <p style="font-style:italic;color:var(--muted);">“Omuzlarınızın üstünde, bilinen evrenin en karmaşık nesnesi oturur.” — Michio Kaku</p>

    ${N.img(
      "10_nn",
      "10_nn_1.jpg",
      "Khipu, Machu Picchu Müzesi, Cusco (fotoğraf: Pi3.124). İnka kayıt ipi: renk, düğüm, dizi bir bilgi taşır. Çözücü (quipucamayoc) ipi sayıya çevirir. Kitap ağı bu eski kodla açar."
    )}

    <p>Kuvvet dünyasında nesneler vardı. Sonra arzuları oldu, kurallara göre karar verdiler. Sonra bir nüfusta evrildiler. Şimdi soru: tek bir yaratık seçimini nasıl yapar? Çevreyi işleyip bir sayı üretebilir mi? Yanlış tahmin edince o sayıyı düzeltebilir mi?</p>
    <p>Doğa yine bir resim verir: beyin. Biyolojik <strong>sinir ağı</strong>, elektriksel işaret alışverişi yapan bir nöron örgüsü. Dendritler giriş alır, akson çıkış ateşler (Şekil 10.1). Gerçek beyin bu cümleden çok daha karışıktır; bu bölüm o gizemi çözmez. Tek nöronun kaba modelini koda çevirir, sonra aynı fikri bir kütüphaneyle çoğaltır. Bölüm 11 o “beyni” yönelen araca takacak.</p>
    ${N.img(
      "10_nn",
      "10_nn_2.png",
      "Şekil 10.1: Bir nöron. Dendritler giriş, akson çıkış; komşu nörona bağlanır."
    )}

    ${N.note(
      "Bu bölümün çıktısı",
      `<ul>
        <li>Ağırlık: girişin ne kadar sayılsın diye duran çarpan</li>
        <li>Hata: istenen cevap eksi tahmin</li>
        <li>Eğitim döngüsü: tahmini gör, hatayı ölç, ağırlığı kaydır, tekrarla</li>
        <li>Algılayıcı (perceptron) ile doğru/yanlış sınıflama</li>
        <li>ml5.js <code>neuralNetwork</code> çağrısını yerinde okumak (jest sınıflayıcı)</li>
      </ul>`
    )}

    <h2>Yapay sinir ağlarına giriş</h2>

    <p>Yapay sinir ağı, biyolojik öykünün yazılım hali: düğümler (nöronlar) ve aralarındaki bağlantılar. Her bağlantının bir <strong>ağırlığı</strong> vardır — o yoldan geçen sayıyı büyütür veya küçültür (Şekil 10.2). Ağ, akan bilgiye göre bu ağırlıkları değiştirirse <em>öğreniyor</em> demektir. İyi çıktı: dokunma. Kötü çıktı: hata var, ağırlıkları kaydır, bir dahaki sefere daha az şaşır.</p>
    ${N.img(
      "10_nn",
      "10_nn_3.png",
      "Şekil 10.2: Sinir ağı: nöronlar ve oklar. Her ok bir bağlantı, her bağlantının bir ağırlık sayısı vardır."
    )}
    <p>Bu bölüm iki katman. İlki sıfırdan, yalnız p5.js: tek nöron. İkincisi ml5.js: tarayıcıda TensorFlow.js üstüne kurulmuş, p5.js’e yakın bir kütüphane. Önceden eğitilmiş modeller (görüntü, el, yüz) de vardır; burada boş bir ağı sizin verinizle eğiteceğiz.</p>

    <h3>Makine öğrenmesi kütüphaneleri</h3>
    <p>Araştırmanın çoğu Python’dadır. Tarayıcıda iki isim durur: TensorFlow.js (Google, alçak seviye) ve ml5.js (onun üstüne, sanatçı ve öğrenci için). ml5.js’i jest örneğinde çağrı çağrı okuyacağız. Önce algılayıcı: sihir yok, üç satırlık aritmetik.</p>

    <h2>Algılayıcı</h2>

    <p>Frank Rosenblatt, 1957, Cornell. <strong>Algılayıcı</strong> (perceptron): mümkün olan en sade ağ — bir veya birkaç giriş, bir işlem, bir çıkış (Şekil 10.3). Veri tek yönde akar: <strong>ileri besleme</strong> (feed-forward). Soldan girer, sağdan çıkar; geriye dolanmaz.</p>
    ${N.img(
      "10_nn",
      "10_nn_4.png",
      "Şekil 10.3: İki girişli, bir çıkışlı algılayıcı. Oklar soldan sağa."
    )}

    <h3>Algılayıcı adımları</h3>
    <p>Mutfaktaki terazi düşünün. Her malzemenin bir ağırlık katsayısı var: tuz az sayılsın, un çok. Malzemeleri katsayılarıyla çarpıp toplarsınız. Toplam eşiği geçerse “tuzlu”, geçmezse “yavan” dersiniz. Katsayıları yanlış seçerseniz her seferinde yanlış etiket çıkar; tadıma bakıp katsayıyı biraz kaydırırsınız.</p>
    <p>Kodda malzeme <em>giriş</em>, katsayı <em>ağırlık</em>, etiket <em>çıkış</em>. Yanlış yazınca ne bozulur: ağırlığı unutup yalnız toplamı alırsanız her giriş eşit sayılır; bir özellik diğerini ezer. Öğrenme hızını 90 yazarsanız ağırlıklar her adımda zıplar, çizgi asla oturmaz.</p>

    <p><strong>1. Ağırlıklı toplam.</strong> Her girişi kendi ağırlığıyla çarpın, hepsini toplayın.</p>
    ${N.math(
      "sum = x<sub>0</sub>w<sub>0</sub> + x<sub>1</sub>w<sub>1</sub> + x<sub>2</sub>w<sub>2</sub>",
      "p5.js’te bir <code>for</code> döngüsü: <code>sum += inputs[i] * this.weights[i]</code>. <code>inputs</code> giriş dizisi, <code>this.weights</code> aynı uzunlukta ağırlık dizisi, <code>i</code> indis."
    )}

    <p><strong>2. Aktivasyon.</strong> Toplamı bir karara sıkıştırın. Algılayıcıda işaret yeter: toplam sıfırdan büyükse +1, değilse −1. Bu, “çizginin üstü / altı”dır.</p>
    ${N.math(
      "çıkış = { +1  eğer sum &gt; 0;  −1  değilse }",
      "p5.js’te <code>if (sum &gt; 0) return 1; else return -1;</code>. Bu fonksiyona aktivasyon denir. Başka ağlarda eğri (sigmoid) kullanılır; burada merdiven yeter."
    )}

    <p><strong>3. Hata ve düzeltme.</strong> Doğru cevabı biliyorsunuz (öğretmenli öğrenme). Hata: istenen eksi tahmin. İkisi de +1 veya ikisi de −1 ise hata 0’dır; ağırlığa dokunmayın. Biri +1 öbürü −1 ise hata ±2’dir; her ağırlığı o hata, o giriş ve küçük bir öğrenme hızıyla kaydırın.</p>
    ${N.math(
      "hata = istenen − tahmin",
      "İstenen sizin etiketinizdir (+1 veya −1), tahmin <code>feedforward</code> çıktısıdır. p5.js’te <code>let error = desired - guess;</code>."
    )}
    ${N.math(
      "w<sub>i</sub> ← w<sub>i</sub> + hata · x<sub>i</sub> · öğrenmeHızı",
      "p5.js: <code>this.weights[i] += error * inputs[i] * this.learningConstant;</code>. <code>learningConstant</code> küçük bir sayıdır (örnekte 0.0001). Büyük yazarsanız ağırlık zıplar; sıfır yazarsanız hiç öğrenmez."
    )}

    <h3>Hepsini bir araya</h3>
    <p>Sınıfta döngü dört kelime: tahmin et, hatayı gör, ağırlığı kaydır, sonraki örneğe geç. Aşağıdaki tuval bunu bir tıklamada bir adım gösterir. Üç çubuk üç ağırlık (w0, w1, bias). Nokta rastgele değil: tıklayana kadar aynı kalır. Hata ve tahmin yazılı. Tıklayın: bir eğitim adımı, çubuklar kayar.</p>
    ${N.editor("egitimAdim")}
    ${N.tryit([
      { do: "öğrenmeHizi değerini 0 yapın.", expect: "Tıklayınca hata durur, çubuklar kımıldamaz." },
      { do: "öğrenmeHizi değerini 0.5 yapın.", expect: "Çubuklar her tıklamada savrulur; işaret oturmaz." },
    ])}
    ${N.quiz(
      "Tahmin +1, istenen +1 ise ağırlıklar ne olur?",
      [
        "Hepsi sıfırlanır",
        "Hata 0 olduğu için bu adımda değişmez",
        "Öğrenme hızı kadar artar",
      ],
      1,
      "hata = 1 − 1 = 0. Formülde sıfır çarpan her ağırlık ekini yok eder. Doğru tahmin, ‘öğrenme tatili’dir."
    )}

    <h3>Basit örüntü: çizginin üstü / altı</h3>
    <p>Bitki defteri: x ekseni günlük güneş, y ekseni su. Kurak sevenler bir yanda, su sevenler öbür yanda. Araya bir doğru çekilir (Şekil 10.4). Algılayıcı o doğrunun hangi tarafında olduğunuzu tahmin etsin.</p>
    ${N.img(
      "10_nn",
      "10_nn_5.png",
      "Şekil 10.4: İki boyutlu noktalar bir doğruyla iki sınıfa ayrılır. Gerçek veri daha dağınık olur; fikir bu."
    )}
    <p>İki giriş: noktanın x’si ve y’si. Ağırlıklı toplamın işareti sınıfı söyler (Şekil 10.5). Yalnız x ve y ile her doğru orijinden geçer; tuvalde kaymış bir doğru için üçüncü giriş gerekir: değeri hep 1 olan <strong>bias</strong> (Şekil 10.6). Bias’ın da ağırlığı vardır; o ağırlık doğrunun kaymasını öğrenir.</p>
    ${N.img(
      "10_nn",
      "10_nn_6.png",
      "Şekil 10.5: İki giriş (x0, x1), iki ağırlık, bir işlem nöronu, bir çıkış."
    )}
    ${N.img(
      "10_nn",
      "10_nn_7.png",
      "Şekil 10.6: Bias girişi eklenir, değeri her zaman 1’dir; üçüncü ağırlık doğrunun kaymasını tutar."
    )}
    ${N.warn(
      "Tuzak: bias’ı unutmak",
      `<p>Girişleri <code>[x, y]</code> bırakıp ağırlığı iki yaparsanız algılayıcı orijinden geçen doğruları öğrenir. Hedef doğru <code>y = 0.5x + 1</code> gibi kaymışsa sonsuza dek şaşırır. Üçüncü giriş <code>1</code> olmalı.</p>`
    )}

    <h3>Algılayıcı kodu</h3>
    <p><code>Perceptron</code> sınıfı ağırlık dizisini rastgele −1 ile 1 arası doldurur. <code>feedforward(inputs)</code> tahmini döner. <code>train(inputs, desired)</code> bir örnekle ağırlığı kaydırır. Bir noktayı ağa vermek Şekil 10.7’dir: (x, y) giriş.</p>
    ${N.img(
      "10_nn",
      "10_nn_8.png",
      "Şekil 10.7: Düzlemdeki bir (x, y) algılayıcıya giriş olur."
    )}

    <p>Öğretmen nereden gelir? Hedef doğruyu siz yazarsınız. Matematik defterinde:</p>
    ${N.math(
      "y = m · x + b",
      "m eğim, b doğrunun y’yi kestiği yer. Örnek 10.1’de m = 0.5, b = 1, yani <code>function f(x) { return 0.5 * x + 1; }</code>. Noktanın y’si <code>f(x)</code>’ten büyükse istenen +1, değilse −1."
    )}
    ${N.img(
      "10_nn",
      "10_nn_9.png",
      "Şekil 10.8: y = (1/2)x − 1 grafiği. Kitap eğimi gösterir; kodda b = +1 kullanılır, fikir aynı: bilinen bir doğru."
    )}
    ${N.img(
      "10_nn",
      "10_nn_10.png",
      "Şekil 10.9: Noktanın y’si doğru y’sinden büyükse nokta doğrunun ‘üstündedir’."
    )}

    <p>Tuvalin y’si aşağı artar; defterinki yukarı. Örnek, matematik düzlemine dönmek için iki p5.js çağrısı yapar. <code>translate(width / 2, height / 2)</code> orijini tuvalin ortasına kaydırır: bundan sonra (0, 0) merkezdir. <code>scale(1, -1)</code> y eksenini çevirir: pozitif y artık yukarı. <code>circle</code> ve <code>line</code> aynı sayıları kullanır, dünya defterdeki gibidir. <code>scale</code>’i yutarsanız doğru ve noktalar baş aşağı durur; “öğrenme bozuldu” sanırsınız, aslında çizim tersdir.</p>
    <p>Aşağıda aynı nokta ve aynı doğru: solda ham tuval (y aşağı), sağda translate + scale. Fare her iki yarıda da aynı <code>mouseX</code>, <code>mouseY</code>’dir; sağda orijin ortadadır.</p>
    ${N.editor("kartezyen")}
    ${N.tryit([
      { do: "Sağdaki scale(1, -1) satırını yorumlayın.", expect: "Sağ yarı da y’yi aşağı büyütür; doğru ters döner." },
    ])}

    <h3>Örnek 10.1: Algılayıcı</h3>
    <p>Siyah doğru hedef. Her kare bir eğitim noktası. Noktanın rengi algılayıcının <em>şu anki</em> tahmini: gri +1, beyaz −1. Öğrenme hızı 0.0001 — yavaş ki kayma görülsün. Renkler doğru taraflara yığılmaya başlar.</p>
    ${N.editor("ex101")}
    ${N.tryit([
      { do: "learning rate’i 0.01 yapın (Perceptron oluştururken).", expect: "Sınıflar daha çabuk ayrılır; bazen aşırır." },
      { do: "Bias’ı (üçüncü 1’i) eğitim dizisinden çıkarmayı deneyin — weights uzunluğunu 2 yapın.", expect: "Doğru kaymış kaldığı için renkler karışır." },
    ])}
    <p>Ağırlıklar “sihirli” değildir. İki boyutta, öğrenilen ağırlıklar bir doğrunun eğimine ve kaymasına karşılık gelir. Alıştırma 10.1 sizden o tahmini doğruyu da çizmenizi ister. Aşağıdaki ek, hedef (siyah) ile algılayıcının tahmini (mavi) aynı karede: ağırlıklar oturdukça mavi siyahın üstüne biner.</p>
    ${N.editor("sinirCizgi")}
    ${N.tryit([
      { do: "Birkaç saniye izleyin.", expect: "Mavi çizgi siyaha yaklaşır; count tuvalde artar." },
    ])}

    ${N.note(
      "Alıştırmalar 10.1–10.3 (orijinal)",
      `<p>10.1: Eğitim sırasında algılayıcının o anki karar doğrusunu da çizin — ipucu: ağırlıklardan doğru denklemi. 10.2: Ağırlıkları öğretmenli öğrenme yerine Bölüm 9’daki GA ile evriltin. 10.3: Girişleri 0–1 (veya −1–1) aralığına sıkıştırın; öğrenme hızlanır mı?</p>
      <p><a href="https://natureofcode.com/neural-networks/#exercise-101" target="_blank" rel="noopener">10.1</a> ·
      <a href="https://natureofcode.com/neural-networks/#exercise-102" target="_blank" rel="noopener">10.2</a> ·
      <a href="https://natureofcode.com/neural-networks/#exercise-103" target="_blank" rel="noopener">10.3</a></p>`
    )}
    <p>Tuval 400×240 olduğu için x aralığı y’den geniştir; işaret aktivasyonu yine de işini görür. Gerçek veride aralıklar daha da dağınık olur. <strong>Normalizasyon</strong>: girişleri ortak bir aralığa (0–1 veya −1–1) çekmek. ml5.js bunu <code>normalizeData()</code> ile yapacak.</p>

    <h2>Ağın “ağ”ı: birden fazla nöron</h2>

    <p>Tek algılayıcı yalnız <strong>doğrusal ayrılabilir</strong> işlere yeter: düzlemde bir doğru iki grubu ayırır (Şekil 10.10, sol). Eğri gereken yerde (sağ) tek nöron yetmez.</p>
    ${N.img(
      "10_nn",
      "10_nn_11.png",
      "Şekil 10.10: Solda doğruyla ayrılan noktalar; sağda eğri isteyen, doğrusal ayrılamayan noktalar."
    )}
    <p>En sade örnek XOR (dışlayan veya). VE ve VEYA bir doğruyla ayrılır (Şekil 10.11). XOR ayrılmaz (Şekil 10.12). Pizza resmi: hem ananas hem hamur kalın — yemek ister misiniz? Yalnız biri varken evet, ikisi birden varken hayır: XOR.</p>
    ${N.img(
      "10_nn",
      "10_nn_12.png",
      "Şekil 10.11: VE ve VEYA doğruluk tabloları. Doğru ve yanlışlar bir çizgiyle ayrılır."
    )}
    ${N.img(
      "10_nn",
      "10_nn_13.png",
      "Şekil 10.12: Pizza (sol) ve XOR (sağ). Tek bir doğru yetmez."
    )}
    <p>Birden fazla algılayıcıyı katmanlarsanız <strong>çok katmanlı algılayıcı</strong> olur (Şekil 10.13). Girişler, ortada <strong>gizli katman</strong> (ne girişe ne çıkışa doğrudan bağlı), sonra çıkış. Eğitim artık tek formülle bitmez: hatayı geriye doğru dağıtmak gerekir (<strong>geri yayılım</strong>, backpropagation). Kitap o hesabın türevini yazmaz. Coding Train’de “Toy Neural Network” izlenebilir. Biz buradan sonra arkadaş telefonu: ml5.js.</p>
    ${N.img(
      "10_nn",
      "10_nn_14.png",
      "Şekil 10.13: Çok katmanlı algılayıcı. Aynı giriş-çıkış, arada gizli nöron katmanı."
    )}

    <h2>ml5.js ile makine öğrenmesi</h2>

    <p>ml5.js, geri yayılımı sizin yerinize yönetir. Sketch’e kütüphaneyi HTML’den eklemek Matter.js’teki gibi bir <code>&lt;script&gt;</code> satırıdır:</p>
    <p><code>&lt;script src="https://unpkg.com/ml5@1/dist/ml5.min.js"&gt;&lt;/script&gt;</code></p>
    <p>Bu web kitabının canlı editöründe örnek 10.2 <code>libraries: ["ml5"]</code> ile o dosyayı yükler. Kendi p5.js editörünüzde index.html’e aynı satırı yazarsınız.</p>

    <h3>Makine öğrenmesi yaşam döngüsü</h3>
    <ol>
      <li value="0"><strong>Sorunu söyle.</strong> Sayı mı tahmin (regresyon), etiket mi (sınıflama)?</li>
      <li><strong>Veri topla.</strong> Deney, el ile yazma, açık veri, sentetik üretim.</li>
      <li><strong>Hazırla.</strong> Eksik satır, aykırı değer, normalizasyon; eğitim / doğrulama / test bölmesi.</li>
      <li><strong>Model seç.</strong> Kaç giriş, kaç çıkış, görev türü.</li>
      <li><strong>Eğit.</strong> Ağırlıkları hataya göre ayarla (optimizasyon).</li>
      <li><strong>Değerlendir.</strong> Eğitimde görmediği veride ne kadar şaşırıyor?</li>
      <li><strong>Hiperparametre.</strong> Öğrenme hızı, epoch sayısı — dön, tekrar eğit.</li>
      <li><strong>Konuşlandır.</strong> Yeni veriye tahmin yaptır.</li>
    </ol>

    <h3>Sınıflama ve regresyon</h3>
    <p><strong>Sınıflama:</strong> etikete karar. Algılayıcı “üst / alt” diyordu. Görüntü ağı “kedi / köpek” der (Şekil 10.14). Klasik merhaba dünyası MNIST: 70 000 el yazısı rakam, 28×28 gri, etiket 0–9 (Şekil 10.15).</p>
    ${N.img(
      "10_nn",
      "10_nn_15.png",
      "Şekil 10.14: Görüntülere kedi veya köpek etiketi."
    )}
    ${N.img(
      "10_nn",
      "10_nn_16.png",
      "Şekil 10.15: MNIST’ten el yazısı rakamlar (Suvanjanprasai). On sınıf, on çıkış nöronu."
    )}
    <p><strong>Regresyon:</strong> sürekli bir sayı. Evdeki kişi, metrekare, dış sıcaklık → o günkü kWh (Şekil 10.16). Etiket listesi yok; çıkış bir (veya birkaç) gerçek sayı.</p>
    ${N.img(
      "10_nn",
      "10_nn_17.png",
      "Şekil 10.16: Hava, ev büyüklüğü, kişi sayısı günlük elektriği etkiler — regresyon çıktısı bir sayıdır."
    )}

    <h3>Ağ tasarımı</h3>
    <p>İris veri kümesi: dört ölçüm (çanak ve taç yaprak, cm), üç tür (Şekil 10.17). Dört giriş, üç çıkış, ortada gizli katman (Şekil 10.18). Gizli düğüm sayısı sihir değil; ml5.js çoğu zaman sizin yerinize seçer.</p>
    ${N.img(
      "10_nn",
      "10_nn_18.png",
      "Şekil 10.17: Üç iris türü. Anderson’un tablosu dört sayıyı bir etikete bağlar."
    )}
    <table class="data">
      <thead><tr><th>Çanak L</th><th>Çanak W</th><th>Taç L</th><th>Taç W</th><th>Sınıf</th></tr></thead>
      <tbody>
        <tr><td>5.1</td><td>3.5</td><td>1.4</td><td>0.2</td><td><em>setosa</em></td></tr>
        <tr><td>7.0</td><td>3.2</td><td>4.7</td><td>1.4</td><td><em>versicolor</em></td></tr>
        <tr><td>6.3</td><td>3.3</td><td>6.0</td><td>2.5</td><td><em>virginica</em></td></tr>
      </tbody>
    </table>
    ${N.img(
      "10_nn",
      "10_nn_19.png",
      "Şekil 10.18: İris için olası mimari: 4 giriş, gizli katman, 3 çıkış."
    )}
    <p>Regresyon örneği üç giriş, bir çıkış (Şekil 10.19). Sınıflama kadar çıkış vardır; regresyonda tahmin ettiğiniz sayı kadar.</p>
    ${N.img(
      "10_nn",
      "10_nn_20.png",
      "Şekil 10.19: Üç girişli, tek çıkışlı regresyon ağı."
    )}

    <h3>ml5.js sözdizimi</h3>
    <p>Kütüphane <code>ml5.birFonksiyon()</code> kalıbını kullanır. El iskeleti <code>ml5.handPose()</code>, görüntü <code>ml5.imageClassifier()</code>. Bu bölümün tek çağrısı: <code>ml5.neuralNetwork(options)</code> — boş, sizin eğiteceğiniz bir ağ.</p>
    <p><code>options</code> bir JavaScript nesnesidir. En azından görev:</p>
    <p><code>let options = { task: "classification" };</code></p>
    <p><code>let classifier = ml5.neuralNetwork(options);</code></p>
    <p>İris için giriş sayısı ve etiket listesi de yazılır: <code>inputs: 4</code>, <code>outputs: ["iris-setosa", …]</code>. Regresyonda <code>outputs: 1</code> yeter, etiket dizisi yoktur. Gizli katman, aktivasyon, öğrenme hızı yazılmazsa ml5.js bir varsayılan seçer.</p>
    ${N.warn(
      "Tuzak: task yazmamak",
      `<p><code>ml5.neuralNetwork()</code> boş çağrılırsa kütüphane ne tahmin edeceğini bilemez. Sınıflama için <code>task: "classification"</code>, sayı için <code>task: "regression"</code> yazın. Yanlış görev, <code>classify</code> / <code>predict</code> karışıklığı ve anlamsız çıkış üretir.</p>`
    )}

    <h2>Jest sınıflayıcı</h2>

    <p>p5.js’e uygun bir problem: fareyle bir çizgi çekin, ağ “yukarı / aşağı / sol / sağ” desin (Şekil 10.20). Giriş: çizginin yön vektörünün x ve y’si (normalize, uzunluk 1). Çıkış: dört etiketten biri. Bu, sınıflama.</p>
    ${N.img(
      "10_nn",
      "10_nn_21.png",
      "Şekil 10.20: Bir jest, başlangıçtan bitişe bir vektör."
    )}
    <p>Aynı iş <code>heading()</code> ve dört <code>if</code> ile de biter. Yine de eğitim döngüsünü görmek için bilinçli olarak “kolay” bir problem seçilir: doğru çalışıp çalışmadığını gözle anlarsınız. Sonra yolu if’e sığmayan jestlere uzatırsınız.</p>

    <h3>Veri toplamak ve hazırlamak</h3>
    <p>Sekiz el yazması örnek, −1 ile 1 arasında, nesne dizisi: her kayıt <code>x</code>, <code>y</code>, <code>label</code>. İki örnek etiket başına (Şekil 10.21).</p>
    ${N.img(
      "10_nn",
      "10_nn_22.png",
      "Şekil 10.21: Eğitim verisi ok olarak. Sağ, sol, aşağı, yukarı."
    )}
    <p>Aşağıdaki tuval o sekiz oku çizer; ml5 yok, yalnız veri. Fareyle bir çizgi çekin: en yakın eğitim okunun etiketi yazılır (en yakın komşu). Bu, ağın <em>yerine geçen</em> bir cetveldir; 10.2 aynı veriyi gerçekten eğitir.</p>
    ${N.editor("jestVeri")}
    ${N.tryit([
      { do: "Sağa bir çizgi çekin.", expect: "Etiket right olur; oklar yerinde durur." },
    ])}

    ${N.note(
      "Alıştırma 10.4 (orijinal)",
      `<p>Kullanıcıdan jest toplayıp JSON kaydeden bir sketch: <code>mousePressed</code> / <code>mouseReleased</code> ile uçlar, <code>saveJSON</code> ile dosya.</p>
      <p><a href="https://natureofcode.com/neural-networks/#exercise-104" target="_blank" rel="noopener">Exercise 10.4</a></p>`
    )}

    <h3>Model, eğitim, değerlendirme</h3>
    <p>Model:</p>
    <p><code>let options = { task: "classification", inputs: 2, outputs: ["up", "down", "left", "right"], debug: false };</code></p>
    <p><code>let classifier = ml5.neuralNetwork(options);</code></p>
    <p>Kitap <code>debug: true</code> ile TensorFlow Visor penceresini açar (Şekil 10.22, kayıp grafiği). Bu sayfanın iframe’inde Visor tuvali örter; o yüzden örnekte <code>debug: false</code>. Kendi editörünüzde <code>true</code> yapabilirsiniz.</p>
    ${N.img(
      "10_nn",
      "10_nn_23.png",
      "Şekil 10.22: Visor. Düşey eksen kayıp (loss), yatay eksen epoch. Eğri iniyorsa ağ azalıyor şaşırıyor demektir."
    )}
    <p>Veriyi ağa vermek: her kayıt için giriş dizisi ve çıkış dizisi ayrılsın, sonra <code>classifier.addData(inputs, outputs)</code>. Şekil: iki sayı girer, bir etiket çıkar. <code>classifier.normalizeData()</code> ölçeği ortaklar. Eğitim:</p>
    <p><code>classifier.train({ epochs: 50 }, finishedTraining);</code></p>
    <p><strong>Epoch</strong> bütün eğitim kümesini bir kez dolaşmaktır. Az epoch: pratik yetmez. Çok epoch, minik veride <strong>aşırı öğrenme</strong> (overfitting): ezber, yeni jestte şaşırma. Sekiz satırlık oyuncak kümede kitap 200 epoch demiş; iframe’de 50 yeter, bekletmez.</p>
    <p><code>train</code> hemen bitmez. JavaScript animasyonu dursun istemezsiniz; bu yüzden ikinci argüman bir <strong>geri çağrı</strong>dır (callback): eğitim bitince ml5.js <code>finishedTraining</code>’i sizin yerinize çağırır. Siz <code>finishedTraining()</code> yazmazsınız; olay olunca gelir. p5.js’te <code>loadJSON</code> de böyledir.</p>
    ${N.note(
      "Geri çağrı",
      `<p>Fonksiyonu argüman olarak verirsiniz; başka bir iş (eğitim, dosya, çarpışma) bitince o sizi arar. ml5.js ayrıca Promise / <code>async</code>–<code>await</code> de bilir; kitap p5.js stiline uyup geri çağrı kullanır.</p>`
    )}
    <p><strong>Kayıp</strong> (loss): tahminlerin etiketlerden toplam sapması. Eğitim başında yüksektir; epoch ilerledikçe inmesi iyidir. Sekiz kayıt üç kümeye (eğitim / doğrulama / test) bölünmez; gerçek işte bölünür. ml5.js belgelerinde ayırma seçenekleri vardır.</p>

    <h3>Konuşlandırma</h3>
    <p>Bitmiş modeli başka sketch’e taşımak: <code>save()</code> / <code>load()</code>. Burada aynı sketch’te kalırız. Yeni jest: <code>p5.Vector.sub(end, start)</code> yönü verir, <code>normalize</code> uzunluğu 1 yapar, <code>[dir.x, dir.y]</code> <code>classifier.classify(inputs, gotResults)</code>’e gider.</p>
    <p><code>gotResults(results)</code> içinde dizi, güvene göre sıralı: <code>results[0].label</code> en emin etiket, <code>results[0].confidence</code> 0–1 arası bir olasılık. Dört güven toplanınca 1 olur.</p>
    ${N.warn(
      "Tuzak: classify’i eğitim bitmeden çağırmak",
      `<p><code>status === "training"</code> iken fare bırakırsanız model henüz yok. <code>finishedTraining</code> <code>status</code>’u <code>"ready"</code> yapmadan <code>classify</code> hata verir. Tuvaldeki yazı buna bakar.</p>`
    )}

    <h3>Örnek 10.2: Jest sınıflayıcı</h3>
    <p>Açılınca <code>training</code> yazar; bitince <code>ready</code>. Fareyle çizgi çekin, bırakın: etiket ve güven tuvalde, eğitim okları arkada durur. ml5.js yüklenemezse orijinal p5.js editörüne gidin (editör çubuğundaki Kitap / Kod).</p>
    ${N.editor("ex102")}
    ${N.tryit([
      { do: "ready olduktan sonra yukarı bir çizgi çekin.", expect: "Etiket up (veya yakın bir yön); güven 0–1 yazılı." },
      { do: "epochs değerini 5 yapıp yeniden çalıştırın.", expect: "Daha çabuk ready olur; etiketler daha sık şaşırabilir." },
    ])}

    <p><code>ml5.setBackend("cpu")</code> hesapları işlemcide tutar; bazı tarayıcılarda WebGL arka planı iframe’de takılır. Çağrı sketch’in <code>setup</code>’ındadır, yerinde dursun.</p>

    ${N.note(
      "Alıştırmalar 10.5–10.7 (orijinal)",
      `<p>10.5: Toplama, eğitim, konuşlandırmayı üç sketch’e bölün; <code>save</code> / <code>load</code>. 10.6: Jest bir vektör dizisi olsun (sabit uzunluk). 10.7: <code>ml5.handPose()</code> 21 nokta üretir; onları başka bir <code>neuralNetwork</code>’e giriş yapıp başparmak jesti sınıflayın.</p>
      <p><a href="https://natureofcode.com/neural-networks/#exercise-105" target="_blank" rel="noopener">10.5</a> ·
      <a href="https://natureofcode.com/neural-networks/#exercise-106" target="_blank" rel="noopener">10.6</a> ·
      <a href="https://natureofcode.com/neural-networks/#exercise-107" target="_blank" rel="noopener">10.7</a></p>`
    )}
    ${N.img(
      "10_nn",
      "10_nn_24.png",
      "ml5.js Handpose: el görüntüsünden 21 işaret noktası. Çıkışları başka bir ağa giriş yapılabilir."
    )}

    ${N.note(
      "Ekosistem projesi (orijinal)",
      `<p>Sınıflama veya regresyonu ekosisteme katın: yaratıkları özniteliklerle etiketlemek; boy ve hızdan ömür tahmini, bloop örneğiyle karşılaştırmak.</p>
      <p><a href="https://natureofcode.com/neural-networks/#the-ecosystem-project-11" target="_blank" rel="noopener">The Ecosystem Project</a></p>`
    )}
    ${N.img(
      "10_nn",
      "10_nn_25.png",
      "Orijinal kitaptaki ekosistem kapanış görseli. Bölüm 11, ağı evrimle birleştirecek."
    )}

    ${N.resources([
      { kind: "Kitap", title: "Chapter 10 · Neural Networks", url: "https://natureofcode.com/neural-networks/" },
      { kind: "Kod", title: "10_nn örnekleri", url: "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/10_nn" },
      { kind: "Video", title: "Coding Train · Neural Networks track", url: "https://thecodingtrain.com/tracks/neural-networks" },
      { kind: "Video", title: "Coding Train · Toy Neural Network", url: "https://thecodingtrain.com/tracks/neural-networks/neural-networks/1-introduction" },
      { kind: "Video", title: "Multilayer Perceptron 1", url: "https://www.youtube.com/watch?v=u5GAVdLQyIg" },
      { kind: "Kütüphane", title: "ml5.js", url: "https://ml5js.org/" },
      { kind: "Referans", title: "ml5.neuralNetwork", url: "https://docs.ml5js.org/#/reference/neural-network" },
      { kind: "Referans", title: "p5.js · translate", url: "https://p5js.org/reference/p5/translate/" },
      { kind: "Referans", title: "p5.js · scale", url: "https://p5js.org/reference/p5/scale/" },
    ])}
    <p><a href="#/ch9">← Evrim</a> · <a href="#/ch11">Nöröevrim →</a></p>
  `,
  editors: {
    egitimAdim: {
      title: "Bir tıklama = bir eğitim adımı",
      files: [
        {
          name: "perceptron.js",
          content: `class Perceptron {
  constructor(n, ogrenme) {
    this.weights = [];
    this.learningConstant = ogrenme;
    for (let i = 0; i < n; i++) this.weights[i] = random(-1, 1);
  }

  feedforward(inputs) {
    let sum = 0;
    for (let i = 0; i < this.weights.length; i++) {
      sum += inputs[i] * this.weights[i];
    }
    return sum > 0 ? 1 : -1;
  }

  train(inputs, desired) {
    let guess = this.feedforward(inputs);
    let error = desired - guess;
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += error * inputs[i] * this.learningConstant;
    }
    return { guess, error };
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let p;
let ogrenmeHizi = 0.05;
let nokta;
let istenen;
let son = { guess: 0, error: 0 };
let adim = 0;

function f(x) {
  return 0.3 * x + 20;
}

function yeniNokta() {
  nokta = [random(-80, 80), random(-60, 60), 1];
  istenen = nokta[1] > f(nokta[0]) ? 1 : -1;
}

function setup() {
  createCanvas(400, 240);
  p = new Perceptron(3, ogrenmeHizi);
  yeniNokta();
  son = { guess: p.feedforward(nokta), error: istenen - p.feedforward(nokta) };
}

function mousePressed() {
  son = p.train(nokta, istenen);
  adim++;
  yeniNokta();
  son.guess = p.feedforward(nokta);
  son.error = istenen - son.guess;
}

function cubuk(x, etiket, deger) {
  let h = constrain(deger * 40, -70, 70);
  stroke(0);
  line(x, 130, x, 130 - h);
  fill(h >= 0 ? color(40, 100, 40) : color(160, 40, 40));
  noStroke();
  rect(x - 10, 130 - max(h, 0), 20, abs(h));
  fill(0);
  textAlign(CENTER);
  text(etiket, x, 150);
  text(nf(deger, 1, 2), x, 166);
}

function draw() {
  background(255);
  fill(0);
  noStroke();
  textAlign(LEFT);
  text("tıkla: bir örnekle eğit", 12, 18);
  text("adım: " + adim, 12, 36);
  text("nokta x=" + nf(nokta[0], 1, 0) + "  y=" + nf(nokta[1], 1, 0), 12, 54);
  text("istenen: " + istenen + "   tahmin: " + son.guess + "   hata: " + son.error, 12, 72);
  cubuk(80, "w0 (x)", p.weights[0]);
  cubuk(160, "w1 (y)", p.weights[1]);
  cubuk(240, "w2 bias", p.weights[2]);
  stroke(0);
  noFill();
  ellipse(320, 120, 16);
  fill(son.guess > 0 ? 127 : 255);
  ellipse(320, 120, 16);
  fill(0);
  noStroke();
  textAlign(CENTER);
  text("tahmin rengi", 320, 150);
}`,
        },
      ],
    },
    kartezyen: {
      title: "translate + scale: defter düzlemi",
      files: [
        {
          name: "sketch.js",
          content: `function f(x) {
  return 0.5 * x + 20;
}

function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  stroke(0);
  line(200, 0, 200, height);
  fill(0);
  noStroke();
  text("ham tuval", 40, 18);
  text("translate + scale", 230, 18);

  stroke(0);
  line(20, f(20), 180, f(180));
  fill(200, 40, 40);
  circle(mouseX * 0.5, mouseY, 10);

  push();
  translate(300, 120);
  scale(1, -1);
  stroke(0);
  line(-80, f(-80), 80, f(80));
  fill(40, 80, 200);
  let lx = mouseX - 300;
  let ly = 120 - mouseY;
  circle(lx, ly, 10);
  pop();

  fill(0);
  noStroke();
  text("mouseY = " + mouseY, 12, 228);
}`,
        },
      ],
    },
    ex101: {
      title: "Örnek 10.1: Algılayıcı",
      original: {
        book: "https://natureofcode.com/neural-networks/#example-101-the-perceptron",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/10_nn/10_1_perceptron_with_normalization",
      },
      files: [
        {
          name: "perceptron.js",
          content: `class Perceptron {
  constructor(totalInputs, learningRate) {
    this.weights = [];
    this.learningConstant = learningRate;
    for (let i = 0; i < totalInputs; i++) {
      this.weights[i] = random(-1, 1);
    }
  }

  feedforward(inputs) {
    let sum = 0;
    for (let i = 0; i < this.weights.length; i++) {
      sum += inputs[i] * this.weights[i];
    }
    return this.activate(sum);
  }

  activate(sum) {
    return sum > 0 ? 1 : -1;
  }

  train(inputs, desired) {
    let guess = this.feedforward(inputs);
    let error = desired - guess;
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += error * inputs[i] * this.learningConstant;
    }
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let perceptron;
let training = [];
let count = 0;

function f(x) {
  return 0.5 * x + 1;
}

function setup() {
  createCanvas(400, 240);
  perceptron = new Perceptron(3, 0.0001);
  for (let i = 0; i < 400; i++) {
    let x = random(-width / 2, width / 2);
    let y = random(-height / 2, height / 2);
    training[i] = [x, y, 1];
  }
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  scale(1, -1);

  stroke(0);
  strokeWeight(2);
  line(-width / 2, f(-width / 2), width / 2, f(width / 2));

  let x = training[count][0];
  let y = training[count][1];
  let desired = y > f(x) ? 1 : -1;
  perceptron.train(training[count], desired);
  count = (count + 1) % training.length;

  for (let dataPoint of training) {
    let guess = perceptron.feedforward(dataPoint);
    fill(guess > 0 ? 127 : 255);
    strokeWeight(1);
    stroke(0);
    circle(dataPoint[0], dataPoint[1], 8);
  }

  resetMatrix();
  fill(0);
  noStroke();
  text("eğitim noktası: " + count, 8, 16);
}`,
        },
      ],
    },
    sinirCizgi: {
      title: "Hedef doğru ve algılayıcının tahmini",
      files: [
        {
          name: "perceptron.js",
          content: `class Perceptron {
  constructor(totalInputs, learningRate) {
    this.weights = [];
    this.learningConstant = learningRate;
    for (let i = 0; i < totalInputs; i++) {
      this.weights[i] = random(-1, 1);
    }
  }

  feedforward(inputs) {
    let sum = 0;
    for (let i = 0; i < this.weights.length; i++) {
      sum += inputs[i] * this.weights[i];
    }
    return sum > 0 ? 1 : -1;
  }

  train(inputs, desired) {
    let guess = this.feedforward(inputs);
    let error = desired - guess;
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += error * inputs[i] * this.learningConstant;
    }
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let perceptron;
let training = [];
let count = 0;

function f(x) {
  return 0.5 * x + 1;
}

function setup() {
  createCanvas(400, 240);
  perceptron = new Perceptron(3, 0.001);
  for (let i = 0; i < 200; i++) {
    training[i] = [random(-width / 2, width / 2), random(-height / 2, height / 2), 1];
  }
}

function guessY(x) {
  let w = perceptron.weights;
  if (abs(w[1]) < 0.0001) return 0;
  return -(w[0] / w[1]) * x - w[2] / w[1];
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  scale(1, -1);
  stroke(0);
  strokeWeight(2);
  line(-width / 2, f(-width / 2), width / 2, f(width / 2));
  stroke(40, 80, 180);
  strokeWeight(2);
  line(-width / 2, guessY(-width / 2), width / 2, guessY(width / 2));

  let desired = training[count][1] > f(training[count][0]) ? 1 : -1;
  perceptron.train(training[count], desired);
  count = (count + 1) % training.length;

  for (let pt of training) {
    fill(perceptron.feedforward(pt) > 0 ? 127 : 255);
    stroke(0);
    strokeWeight(1);
    circle(pt[0], pt[1], 8);
  }
  resetMatrix();
  fill(0);
  noStroke();
  text("siyah = hedef   mavi = agirliklardan dogru   n = " + count, 8, 16);
}`,
        },
      ],
    },
    jestVeri: {
      title: "Sekiz ok: veri, henüz ml5 yok",
      files: [
        {
          name: "sketch.js",
          content: `let data = [
  { x: 0.99, y: 0.02, label: "right" },
  { x: 0.76, y: -0.1, label: "right" },
  { x: -1.0, y: 0.12, label: "left" },
  { x: -0.9, y: -0.1, label: "left" },
  { x: 0.02, y: 0.98, label: "down" },
  { x: -0.2, y: 0.75, label: "down" },
  { x: 0.01, y: -0.9, label: "up" },
  { x: -0.1, y: -0.8, label: "up" },
];
let start, end, etiket = "cizgi cek";

function enYakin(dir) {
  let best = data[0];
  let bestD = dist(dir.x, dir.y, best.x, best.y);
  for (let item of data) {
    let d = dist(dir.x, dir.y, item.x, item.y);
    if (d < bestD) {
      bestD = d;
      best = item;
    }
  }
  return best.label;
}

function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  stroke(180);
  line(-width / 2, 0, width / 2, 0);
  line(0, -height / 2, 0, height / 2);
  strokeWeight(3);
  for (let item of data) {
    stroke(40, 80, 140);
    line(0, 0, item.x * 80, item.y * 80);
  }
  if (start && end) {
    stroke(180, 40, 40);
    strokeWeight(5);
    line(start.x - width / 2, start.y - height / 2, end.x - width / 2, end.y - height / 2);
  }
  resetMatrix();
  fill(0);
  noStroke();
  text("etiket: " + etiket, 12, 20);
}

function mousePressed() {
  start = createVector(mouseX, mouseY);
  end = start.copy();
}

function mouseDragged() {
  end = createVector(mouseX, mouseY);
}

function mouseReleased() {
  let dir = p5.Vector.sub(end, start);
  if (dir.mag() < 4) return;
  dir.normalize();
  etiket = enYakin(dir);
}`,
        },
      ],
    },
    ex102: {
      title: "Örnek 10.2: Jest sınıflayıcı (ml5.js)",
      original: {
        book: "https://natureofcode.com/neural-networks/#example-102-gesture-classifier",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/10_nn/10_2_gesture_classifier",
      },
      libraries: ["ml5"],
      files: [
        {
          name: "sketch.js",
          content: `let data = [
  { x: 0.99, y: 0.02, label: "right" },
  { x: 0.76, y: -0.1, label: "right" },
  { x: -1.0, y: 0.12, label: "left" },
  { x: -0.9, y: -0.1, label: "left" },
  { x: 0.02, y: 0.98, label: "down" },
  { x: -0.2, y: 0.75, label: "down" },
  { x: 0.01, y: -0.9, label: "up" },
  { x: -0.1, y: -0.8, label: "up" },
];
let classifier;
let status = "training";
let start, end;
let guven = "";

function setup() {
  createCanvas(400, 240);
  if (typeof ml5 === "undefined") {
    status = "ml5 yok — Kod linki";
    return;
  }
  ml5.setBackend("cpu");
  let options = {
    task: "classification",
    inputs: 2,
    outputs: ["up", "down", "left", "right"],
    debug: false,
  };
  classifier = ml5.neuralNetwork(options);
  for (let item of data) {
    classifier.addData([item.x, item.y], [item.label]);
  }
  classifier.normalizeData();
  classifier.train({ epochs: 50 }, finishedTraining);
}

function finishedTraining() {
  status = "ready";
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  stroke(210);
  line(-width / 2, 0, width / 2, 0);
  line(0, -height / 2, 0, height / 2);
  strokeWeight(2);
  for (let item of data) {
    stroke(160);
    line(0, 0, item.x * 70, item.y * 70);
  }
  if (start && end) {
    stroke(30);
    strokeWeight(6);
    line(start.x - width / 2, start.y - height / 2, end.x - width / 2, end.y - height / 2);
  }
  resetMatrix();
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(28);
  text(status, width / 2, 28);
  textSize(12);
  if (guven) text("guven: " + guven, width / 2, 50);
}

function mousePressed() {
  start = createVector(mouseX, mouseY);
  end = start.copy();
}

function mouseDragged() {
  end = createVector(mouseX, mouseY);
}

function mouseReleased() {
  if (status !== "ready" || !classifier) return;
  let dir = p5.Vector.sub(end, start);
  if (dir.mag() < 4) return;
  dir.normalize();
  classifier.classify([dir.x, dir.y], gotResults);
}

function gotResults(error, results) {
  let rows = Array.isArray(results) ? results : error;
  if (!rows || !rows[0] || !rows[0].label) {
    status = "hata";
    return;
  }
  status = rows[0].label;
  guven = nf(rows[0].confidence, 1, 2);
}`,
        },
      ],
    },
  },
});
