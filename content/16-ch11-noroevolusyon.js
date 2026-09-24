registerChapter({
  id: "ch11",
  title: "11. Nöroevrim",
  short: "11. Nöroevrim",
  icon: "🐦",
  original: "https://natureofcode.com/neuroevolution/",
  originalCode:
    "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/11_nn_ga",
  html: `
    <p style="font-style:italic;color:var(--muted);">“Doğa hakkında okumak iyidir; ormana girip dikkatle dinleyen, kitaptakinden fazlasını öğrenir.” — George Washington Carver</p>

    ${N.img(
      "11_nn_ga",
      "11_nn_ga_1.png",
      "Yıldız burunlu köstebek (New York Public Library, yak. 1826–1828). Burnu 22 dokunaç, binlerce alıcı: karanlık toprakta harita. Kördür; organı kuşaklar boyu seçilmiştir."
    )}

    <p>Kör bir hayvan yeraltında milisaniyede yenilebilir bir şeyi bulur. Göz yok; burun evrilmiş. Bu bölümün resmi budur: ajanın “beyni” hazır etiketlenmiş bir tablodan gelmez. Birçok deneme ölür; uzun yaşayanın ayarları kalır.</p>

    <p>Kitabın son perdesine geldiniz. Rastgele yürüyüş, vektör, kuvvet, ajan, ızgara, fraktal, genetik algoritma, sinir ağı — hepsi bir sahnede durabilir.</p>

    ${N.img(
      "11_nn_ga",
      "11_nn_ga_2.png",
      "Kitabın kapanış görseli. Şimdi aynı arkadaşlar bir kez daha: bu kez karar, evrilen bir ağdan gelir."
    )}

    <p><a href="#/ch10">Bölüm 10</a> ağı tanıttı: girdi girer, ağırlıklar karışır, çıktı çıkar. O öğrenme çoğu zaman <strong>denetimli</strong>dir — doğru cevaplı veri. Bu bölüm başka bir kapı açar. <a href="#/ch9">Bölüm 9</a>’un genetik algoritması ile ağı birleştirir: <strong>nöroevrim</strong>. Ağırlık listesi genomdur. Fitness, “bu beyin oyunda ne kadar işe yaradı?” sorusunun sayısıdır.</p>
    <p>Önce tanıdık bir oyun: <em>Flappy Bird</em>. Sonra <a href="#/ch5">Bölüm 5</a>’teki direksiyon: seek’i siz yazmazsınız; evrim bir kuvvet uydurur.</p>

    ${N.note(
      "Bu bölümün çıktısı",
      `<ul>
        <li>Genomun bu bağlamda <em>ağırlık dizisi</em> olduğunu söylemek</li>
        <li>Fitness’ı “kaç kare hayatta / hedefe ne kadar yakın” diye yazmak</li>
        <li>Neden ağ + GA: etiketli Flappy kaydı yok; deneme yanılma var</li>
        <li>Özellik (feature): bütün pikseller değil, birkaç sayı</li>
        <li>Kitabın ml5.js örnekleri: GitHub’da tam; bu iframe ml5 yüklemez — ders iskelesi aynı fikri küçük bir beyinle koşturur</li>
      </ul>`
    )}

    ${N.warn(
      "ml5.js bu sitede yok",
      `<p>Orijinal Örnek 11.2–11.4 ve 11.6 <code>ml5.neuralNetwork({ neuroEvolution: true })</code> ister. Canlı editör yalnızca p5.js (ve p5.play sayfasında p5.play) yükler. Örnek 11.1 ve 11.5 saf p5.js’tir; burada çalışır. Diğerleri için: aynı fikir, beş–on ağırlıklı bir <code>Brain</code> sınıfı + kitap/GitHub linki. Tam ml5 kodu: <a href="https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/11_nn_ga" target="_blank" rel="noopener">examples/11_nn_ga</a> veya <a href="https://editor.p5js.org" target="_blank" rel="noopener">editor.p5js.org</a>’a ml5 ekleyerek.</p>`
    )}

    <h2>Pekiştirmeli öğrenme</h2>

    <p>Labirentte bir fare. Sola peynir, sağa şok. (Bu farenin canı yanmaz.) Bir süre sonra sola döner. Kimse “doğru cevap sola” diye bir tablo vermemiştir. Fare denemiş, ortam cevap vermiştir: lezzet veya acı.</p>
    <p>Pekiştirmeli öğrenme (reinforcement learning) budur: ajan iş yapar, ödül veya ceza görür, bir sonraki kararı ayarlar. Robot masadan düştü mü? Duvara çarptı mı? Zamanla sinyal yorumlanır.</p>
    <p>Şimdi kitabın walker’ı, mover’ı, parçacığı, taşıtı. İçine bir ağ koyun. Girdi: engele uzaklık. Çıktı: sola/sağa (sınıflandırma) veya bir kuvvet vektörü (regresyon). Çalışan ağ, Bölüm 10’daki tahmin gibidir. <em>Eğitmek</em> ise denetimden ayrılır: doğru flap’lerin listesi yoktur.</p>
    <p><em>Flappy Bird</em> bu ayrımı görünür kılar (Şekil 11.1). Kuş yatayda sabit gibi durur; aslında dünya kayar. Tıklayınca kanat çırpar, yükselir. Sağdan borular gelir; aralıktan geçemezseniz bitti. Skor, geçilen boru sayısıdır.</p>
    ${N.img(
      "11_nn_ga",
      "11_nn_ga_3.png",
      "Şekil 11.1: Flappy Bird. Kuş, boşluk, boru. İnsan tıklar; biz ağa ‘çırp mı?’ diye soracağız."
    )}

    <p>Ağı seçmeden önce girdi ve çıktı nedir? Bir yol: oyunun her pikselini vermek. Model “ne önemli”yi kendisi ayırsın. Flappy’yi oynamış biriyseniz özü birkaç <strong>özelliğe</strong> indirebilirsiniz — elmayı tanımak için her hücresi değil, tat, çıtırlık, kırmızı.</p>
    <ol>
      <li>Kuşun y konumu</li>
      <li>Kuşun y hızı</li>
      <li>Sıradaki üst borunun boşluk kenarı (y)</li>
      <li>Sıradaki alt borunun boşluk kenarı (y)</li>
      <li>Sıradaki boruya yatay uzaklık</li>
    </ol>
    ${N.img(
      "11_nn_ga",
      "11_nn_ga_4.png",
      "Şekil 11.2: Ağa giden beş özellik. Tuvalin ham pikselleri değil; sizin seçtiğiniz sayılar."
    )}
    <p>Çıktı sınıflandırmadır: çırp, çırpma. Analog kol (joystick eğimi) olsaydı regresyon olurdu; Flappy’de parmak ya basar ya basmaz. İki çıkış, Şekil 11.3’teki gibi bir şema.</p>
    ${N.img(
      "11_nn_ga",
      "11_nn_ga_5.png",
      "Şekil 11.3: Flappy beyni, ml5.js’in kuracağı sınıflandırıcı. Beş girdi, iki etiket."
    )}
    <p>Kitap burada <code>ml5.neuralNetwork</code> ile <code>inputs: 5</code>, <code>outputs: ["flap", "no flap"]</code>, <code>task: "classification"</code> yazar. Sonra durur: denetimli yolda şimdi veri toplanır. Dünyanın en iyi Flappy oyuncusunu saatlerce kaydedin; her kare özellikler + çırptı mı. Eğitin. Manşet: “yapay zekâ Flappy’yi yendi.”</p>
    <p>Ama bot oyunu kendi keşfetmemiştir. İnsanı taklit etmiştir. İnsan bir hileyi hiç kullanmadıysa bot da kullanmaz. Kaydı toplamak da işkencedir. Bu, Bölüm 10’daki denetimdir; pekiştirme değildir.</p>
    <p>Pekiştirmede doğru cevap verilmez. Borudan geçince artı, çarpınca eksi. Ajan başta rastgele çırpar, çok düşer. Deneme birikince strateji çıkar. Klasik pekiştirme bir <strong>politika</strong> ve <strong>ödül fonksiyonu</strong> tanımlar. Bu bölüm o yolu yürümez. Yıldız: nöroevrim.</p>

    <h2>Ağları evrimleştirmek NEAT kadar iddialı olmak zorunda değil</h2>

    <p>Geri yayılım, politika, ödül fonksiyonu yerine: birçok ağı aynı probleme salın. Ara sıra en iyi performans gösterenleri seçin. Genleri — bağlantı ağırlıkları — karıştırın, mutasyona uğratın, sonraki kuşağı kurun. Kural net değilse, çözüm birden fazlaysa bu işe yarar.</p>
    <p>1994: Edmund Ronald ve Marc Schoenauer, <a href="https://doi.org/10.1007/3-540-58484-6_288" target="_blank" rel="noopener">Genetic Lander</a> ile simüle ay aracına inişi GA ile öğretir. Etiketli veri yok; kuşak kuşak ağ evrilir. 2002: Kenneth Stanley ve Risto Miikkulainen, <a href="https://doi.org/10.1162/106365602320169811" target="_blank" rel="noopener">NEAT</a> ile yalnızca ağırlığı değil ağın <em>yapısını</em> da evrimleştirir. Basit başlar, göreve göre dallanır.</p>
    <p>Tam NEAT TensorFlow.js ister. Kitap Ronald–Schoenauer yolunu tarayıcıda ml5 ile taklit eder. Lunar Lander yerine Flappy. Onun için önce oyunu yazmak gerekir.</p>

    <h2>Flappy Bird yazmak</h2>

    <p>Oyunu 2013’te Dong Nguyen yaptı. 2014 başında App Store’un en çok indirileni oldu; Nguyen bağımlılık yüzünden kaldırdı. O günden beri en çok kopyalanan oyunlardan biri. Nolan Bushnell kuralı: öğrenmesi kolay, ustalaşması zor. Yeni başlayan için de biçilmiş kaftan — ve bu kitabın kuvvetleriyle aynı dükkân.</p>
    <p><code>Bird</code> sınıfında şok: <code>p5.Vector</code> yok. Kuş yalnızca düşey gider; <code>x</code> sabittir (50). Hız ve kuvvet tek skaler: y. Daha da sade: kuvvetler ivme kutusunda birikmez, doğrudan hıza eklenir. <code>flap()</code> yukarı bir itiş, <code>update()</code> her kare yerçekimi.</p>
    <p>Yerçekimi 0.5, çırpma −10. İşaret: tuvalde +y aşağıdır; negatif hız yukarı. Sönümleme <code>velocity *= 0.95</code> — her kare hızın yüzde beşi kaybolur. Taban: <code>y > height</code> ise yapıştır, hızı sıfırla.</p>
    ${N.warn(
      "Tuzak: rotate(90) gibi flap(90)",
      `<p>Çırpma bir açı değil, y hızına eklenen kuvvettir. <code>flapForce = -10</code> “on piksel/kare yukarı ivme benzeri itiş”tir. 90 yazarsanız kuş tuvalden uçar; radyan/derece karışıklığı değil, skaler kuvvetin büyüklüğüdür.</p>`
    )}
    <p>Borular yatay kayar; onlar da skaler. <code>Pipe</code>: rastgele üst yükseklik, sabit boşluk (100), genişlik 20, hız 2. Üst dikdörtgen (0,0)’dan aşağı; alt dikdörtgen boşluğun altından tuval dibine.</p>
    <p>Çarpışma <code>Pipe.collides(bird)</code> içinde. Kuş bir nokta gibi. Dikey: kuş üst borunun altından küçük veya alt borunun üstünden büyük mü? Yatay: kuşun x’i boru diliminde mi? İkisi birden ve ise çarpışma. Tek başına dikey “kuş boşluğun dışında bir yerde” demektir; borunun x’ine gelmeden OOPS yazılmaz.</p>
    ${N.math(
      "çarptı = (y &lt; üst ∨ y &gt; alt) ∧ (x<sub>boru</sub> &lt; x<sub>kuş</sub> &lt; x<sub>boru</sub> + w)",
      "p5.js’te bu bir <code>if</code> değil, <code>collides</code> metodunun döndürdüğü boolean’dır. <code>&&</code> her iki dilimin de doğru olmasını ister. Kuşun yarıçapını eklemezseniz nokta modeli iyimser kalır."
    )}

    <h3>Örnek 11.1: Flappy Bird kopyası</h3>
    <p>Bir kuş, boru dizisi. Fare tıklanınca <code>flap</code>. Çarpışmada “OOPS!”. Tam oyun (skor ekranı, bitiş) yok; mekanik dursun yeter. Yeni boru: <code>frameCount % 100 === 0</code>.</p>
    <p>p5.js <code>frameCount</code> sketch başından beri kaç kare geçtiğini sayar; her <code>draw</code>’da bir artar. <code>%</code> bölmede kalanı verir. 7 % 3 = 1. Kalan 0 ise tam bölünmüştür. Her 100 karede bir boru. 400 genişlikte boru hızı 2 iken aralık orijinal 640’lık tuvalden biraz sık görünür; fikir aynıdır.</p>
    ${N.editor("ex111")}
    ${N.tryit([
      { do: "Tuvale tıklayın (önce önizlemeye tıklayın).", expect: "Kuş yükselir; bırakınca yerçekimi indirir." },
      { do: "frameCount % 100 yerine % 40 yazın.", expect: "Boru sıklaşır. % periyodu kısaltır." },
      { do: "collides if’ini yorumlayın.", expect: "OOPS kaybolur; kuş borunun içinden geçer. Oyun biter sayılmaz, çizim yalan söyler." },
    ])}
    ${N.quiz(
      "Kuş borunun x diliminde değil, ama y’si boşluğun dışında. collides ne döner?",
      ["true — y yetmez", "false — && yatayı da ister", "random"],
      1,
      "Dikey doğru, yatay yanlış ise ve-kapısı false. Aksi halde her kare OOPS yazılırdı."
    )}

    <h3>Alıştırma 11.1</h3>
    <p>Her boşluktan geçişe puan verin. Kuş, boru, gökyüzü için kendi çiziminizi ekleyin.</p>
    <p class="src"><a href="https://natureofcode.com/neuroevolution/#exercise-111" target="_blank" rel="noopener">Orijinal alıştırma 11.1</a></p>

    <h2>Nöroevrimli Flappy</h2>
    <p>Tıklamayı bilgisayara bırakın. ml5 bunu hazır sunar; biz iframe’de aynı adımları küçük bir beyinle göstereceğiz. Önce kuşa beyin.</p>

    <h3>Kuş beyni</h3>
    <p>Beş özellikten birini düşürün: boşluk yüksekliği sabitse üst kenar yeter, alt türetilir. Dört girdi:</p>
    <ol>
      <li>Kuşun y’si</li>
      <li>Kuşun y hızı</li>
      <li>Sıradaki borunun üst boşluk kenarı</li>
      <li>Boruya yatay uzaklık</li>
    </ol>
    <p>Sıradaki boru dizinin [0]’ı değildir. Kuşu geçmiş ama henüz sahneden çıkmamış boru “sıradaki” değildir. İlk boru ki sağ kenarı kuşun x’inden büyük — o.</p>
    <p>Ağ 0–1 civarı bekler; tuval piksel vermez. Dikeyleri <code>height</code>’a, yatayı <code>width</code>’e bölün. Bunu atlayan öğrenci “ağ saçmalıyor” der; aslında girdi 200, ağırlık 0.3, çarpım patlar.</p>
    ${N.math(
      "σ(z) = 1 / (1 + e<sup>−z</sup>)",
      "Sigmoid, z’yi 0 ile 1 arasına büker. Ders beyninde z = ağırlıklar · girdiler + sapma. p5.js’te <code>1 / (1 + exp(-z))</code>: <code>exp</code> e üzeri. Çıktı 0.5’ten büyükse çırp. Kitabın ml5 <code>classifySync</code>’i aynı kararı etiketle verir."
    )}
    <p>Genom nedir, tuvalde dursun. Beş çubuk beş gendir (dört ağırlık + sapma). Fare y’si kuşun y’si, fare x’i hız hissi. Boru sabit. Sağda çıktı: yeşil çırp, gri dur. Çubukları kodda değiştirince aynı sahnede karar döner — etiketli veri yok, sadece sayılar.</p>
    ${N.editor("genom")}
    ${N.tryit([
      { do: "g[0] değerini 2 yapın (kuş y’sinin ağırlığı).", expect: "Kuş aşağı inince (y büyüyünce) çırpma eşiği değişir. Genom o çubuktur." },
      { do: "g dizisini hepsi 0 yapın.", expect: "z = 0, σ = 0.5. Eşik > 0.5 olduğu için çırpmaz. Sıfır genom ‘kararsız dur’dur." },
    ])}

    <h3>Çeşitlilik: bir sürü Flappy kuşu</h3>
    <p>Tek kuş, rastgele ağırlık: ya sürekli çırpar ya tabanda bekler. Rastgele ağın bilgisi yoktur. GA’nın birinci ilkesi <strong>çeşitlilik</strong>: birçok farklı ağırlık; içlerinden birkaçı biraz daha uzun yaşar. Şekil 11.4.</p>
    ${N.img(
      "11_nn_ga",
      "11_nn_ga_6.png",
      "Şekil 11.4: Her kuşun kendi ağı. Boru aynı; genomlar farklı. Çoğu düşer; birkaçı boşluğu görür."
    )}
    <p>Kitap 200 kuş ve <code>ml5.setBackend("cpu")</code> yazar. GPU notu: büyük modellerde GPU paralel çarpar. Küçük beyinde veriyi GPU’ya taşımak yavaşlatır; CPU daha ucuzdur. Bizim iskele 24 kuş, beş gen, CPU zaten tek yer.</p>
    ${N.note(
      "GPU ve CPU (kitaptan)",
      `<ul>
        <li><strong>GPU:</strong> grafikten gelir; aynı anda çok çarpma. Büyük ağlar.</li>
        <li><strong>CPU:</strong> genel iş; az görevi seri yapar. Dört girdi, iki çıktı için yeterli.</li>
      </ul>`
    )}

    <h3>Seçilim: Flappy fitness</h3>
    <p>İkinci ilke <strong>seçilim</strong>. Kim ebeveyn olacak? Flappy’de başarı: boruya çarpmadan uzun yaşamak. Fitness, kuş hayattayken her <code>update</code>’te bir artan sayıdır. İlk boruda ölen 40, on boru geçen 800. Pekiştirmedeki “her karara anında ödül” değil; kuşak sonunda bakılan toplam.</p>
    <p><code>alive</code> bayrağı. Çarpınca false. Yalnızca canlılar <code>think</code> / <code>show</code>. Hepsi ölünce kuşak biter — akıllı roketlerdeki sabit ömür değil, bloop’taki rastgele kopyalama da değil. İkisinin karışımı: biri yaşadığı sürece dünya akar; sonuncusu düşünce seçilim.</p>
    <p>Bölüm 9’daki ağırlıklı seçilim: fitness’ları toplayıp 1’e böl (normalize). Sonra [0,1) bir zar; kuşların fitness’ını sırayla çıkar. Yüksek skorlu daha uzun dilim, daha sık seçilir. Sıfır toplamdan bölmeyin — ilk karede hepsi aynı anda ölürse yedek rastgele ebeveyn.</p>

    <h3>Kalıtım: yavru kuşlar</h3>
    <p>Üçüncü ilke <strong>kalıtım</strong>. İki ebeveyn beyni, çocuk ağırlıkları. Yazı-tura ile her geni A’dan veya B’den almak yeter (ml5 <code>crossover</code> bunu yapar). Sonra <code>mutate(0.01)</code>: her ağırlık yüzde 1 ihtimalle biraz sapar; sıfırdan rastgele yeni ağırlık değil, küçük gürültü. Doğadaki mutasyon da çoğu zaman ince kaymadır.</p>
    <p>Yeni kuş <code>new Bird(cocukBeyin)</code>. Kurucu beyin aldıysa onu takar; almadıysa rastgele genom doğurur. <code>if (brain)</code> JavaScript’te <code>undefined</code> false sayıldığı için tek kurucu iki işe yarar.</p>
    <p>Kuşak bitince boruları da sıfırlayın. Eski boru tam kuşun üstündeyse en iyi çocuk bile ilk karede ölür. Aşağıdaki iskele ml5 değildir; beş genli sigmoid’dir. Tuvalde nesil, kaç kuş canlı, şimdiye kadarki en iyi fitness. Sürü yarı saydam daireler. Birkaç nesil bekleyin — rastgele başlangıçta ilk kuşaklar kısa sürer.</p>
    ${N.editor("ex112")}
    ${N.tryit([
      { do: "n = 24 yerine n = 8 yazın.", expect: "Çeşitlilik azalır; iyi genomun seçilme şansı düşer. Popülasyon GA’nın yakıtıdır." },
      { do: "mutate(0.1) yapın (yüzde 10).", expect: "Çocuklar ebeveynden daha çok sapar. Bazen keşif, bazen bozulma." },
    ])}
    ${N.quiz(
      "Nöroevrimde genom bu örnekte nedir?",
      ["Kuşun x, y’si", "Ağın ağırlık (ve sapma) sayıları", "Boru aralığı 100"],
      1,
      "Konum durumdur, kalıtılmaz. Kalıtılan, kararı üreten sayılardır."
    )}

    <h3>Alıştırma 11.2</h3>
    <p>Örnek 11.2 sonuç vermek için uzun sürer. Her kareyi çizmeden simülasyonu hızlandırabilir misiniz? (“Zamanı hızlandırmak” alt başlığı bir çözüm gösterir.) Üstte kaç kuş canlı, hangi nesil, en iyi ömür yazsın.</p>
    <p class="src"><a href="https://natureofcode.com/neuroevolution/#exercise-112" target="_blank" rel="noopener">Orijinal alıştırma 11.2</a></p>

    <h3>Alıştırma 11.3</h3>
    <p>Her seferinde sıfırdan başlamamak için ml5 <code>save</code> / <code>load</code>. En iyi kuşu kaydedip sonra yüklemek.</p>
    <p class="src"><a href="https://natureofcode.com/neuroevolution/#exercise-113" target="_blank" rel="noopener">Orijinal alıştırma 11.3</a></p>

    <h2>Direksiyonu nöroevrimle</h2>
    <p>Flappy bir oyun skoru. Simülasyona dönün: <a href="#/ch5">Bölüm 5</a>’in ajanları. Reynolds’un hayali kusursuz robot değil, canlı gibi sapmalar. Seek formülünü silip yerine “kuvveti evrilen ağ tahmin etsin” deyin.</p>
    <p><a href="#/ch9">Bölüm 9</a> akıllı roketlerde genler vektör dizisiydi: her kare sıradaki ok uygulanırdı. Şimdi genler beyin. Çıktı sürekli: regresyon. İki sayı — açı ve büyüklük — bir kuvvet.</p>
    ${N.warn(
      "Tuzak: çıktıyı doğrudan vx, vy sanmak",
      `<p>ml5 varsayılan çıktı 0–1. Negatif bileşen yok. 0–1’i <code>TWO_PI</code> ile çarparak tam tur açıya map edin. p5.js <code>p5.Vector.fromAngle(aci)</code> o açıda uzunluğu 1 bir vektör verir; <code>setMag</code> büyüklüğü basar.</p>`
    )}
    <p><code>fromAngle(0)</code> sağa bakar (1, 0). <code>fromAngle(HALF_PI)</code> tuvalde aşağıdır (0, 1) — matematik defterindeki “yukarı” değil, çünkü +y aşağı. <code>rotate(90)</code> yazmak gibi: 90 radyan ≈ 14 tur. Açı radyan.</p>
    <p>Girdi yaratıcılığınızdır. İlk deneme: sabit hedef, sabit engel. Roketin <code>x / width</code>, <code>y / height</code> — bir akış alanı gibi konumdan yön. Fitness hâlâ hedefe yakınlık. Popülasyon, seçilim, mutasyon aynı; DNA sınıfı yok, beyin <code>crossover</code> / <code>mutate</code> biliyor (ml5’te). İskelede aynı işi <code>Brain</code> yapar.</p>
    ${N.editor("ex113")}
    ${N.tryit([
      { do: "Hedef daireyi fareye bağlayın (target.x = mouseX).", expect: "Ortam değişir; yalnız konuma bakan beyin şaşırabilir. Bir sonraki alt başlık bu yüzden göreli vektör ekler." },
    ])}

    <h3>Alıştırma 11.4</h3>
    <p>Reynolds direksiyonu: istenen hız eksi şu anki hız. Ağa yalnız konum değil, roketin hızını da verin. Bileşenler veya yön+büyüklük. Normalize etmeyi unutmayın.</p>
    <p class="src"><a href="https://natureofcode.com/neuroevolution/#exercise-114" target="_blank" rel="noopener">Orijinal alıştırma 11.4</a></p>

    <h3>Değişene tepki</h3>
    <p>Engel ve hedef sabitken konum yetebilir. Hedef Perlin ile dolaşan bir ışık olsun. Yaratık ışığın <em>dünya koordinatını</em> ezbere bilmesin; kendinden ışığa giden vektörü bilsin — seek’in ilk satırı: <code>p5.Vector.sub(hedef, konum)</code>.</p>
    <p>Bu vektörü normalize ederseniz yön kalır, uzaklık uçar. Işığın üstündeyken ile uzaktayken aynı girdi olmamalı. Uzaklığı ayrı saklayın, <code>width</code>’e bölün (kare tuval değilse kaba ama işe yarar). Hızı da ekleyin: <code>velocity.x / maxspeed</code>. Reynolds’un “nasıl gidiyorum” kısmı.</p>
    <p>Fitness: kuşaktaki rekor uzaklık değil, ışıkla kesişerek geçirilen karelerin toplamı. <code>dist</code> yarıçaplar toplamından küçükse fitness++.</p>

    <h3>Zamanı hızlandırmak</h3>
    <p>Evrim yavaş izlenir. Çizmek zorunlu değildir. Kitap <code>createSlider(1, 20, 1)</code> ile <code>draw</code> içinde fizik döngüsünü N kez çalıştırır, çizimi bir kez yapar. p5.js slider üç sayı alır: min, max, başlangıç. İframe’de slider DOM’u tuvalin altına kaçabilir. Aşağıdaki iskele aynı fikri fare x’i ile verir: sol yavaş, sağ çok adım. Fizik ve çizim ayrılır.</p>
    ${N.editor("ex114")}
    ${N.tryit([
      { do: "Fareyi sağa alın.", expect: "Aynı draw’da daha çok fizik adımı; nesil yazısı hızlanır. Çizim hâlâ bir kez." },
      { do: "cycles = 1 sabitleyin.", expect: "Gerçek zaman. Evrimi izlersiniz, bekersiniz." },
    ])}

    <h2>Nöroevrimli bir ekosistem</h2>
    <p>İki kusur. Bir: herkes aynı anda doğup aynı anda ölüyor; doğa böyle kuşak demiyor. İki: 11.4’teki yaratık ışığın yerini her mesafeden “biliyor”. <a href="#/ch5">Bölüm 5</a> ajanın algısını sınırlı tutardı.</p>

    <h3>Çevreyi algılamak</h3>
    <p>Karanlık labirentte farenin bıyığı duvarı yoklar. Yarasa eko, araba farı. <strong>Sensör</strong>: tüm harita değil, ucun değdiği yer. Kedinin vibrissae’si (Şekil 11.5) — Clawdius.</p>
    ${N.img(
      "11_nn_ga",
      "11_nn_ga_7.png",
      "Şekil 11.5: Clawdius bıyıklarıyla yokluyor. Sensör, ‘her şeyi gören ajan’a karşı."
    )}
    <p>Bloop’a merkeze bağlı çubuklar. Sekiz veya on beş yön: <code>map(i, 0, adet, 0, TWO_PI)</code> ile açı, <code>p5.Vector.fromAngle(aci)</code> ile ok, <code>setMag</code> ile bıyık boyu (yarıçaptan biraz uzun).</p>
    <p>Yiyecek: daire, rastgele konum, yarıçap. Bıyık yiyeceğe değdi mi? Işın kesişimi (raycasting) doğru iştir; kitap matematiği burada keser ve Coding Train Challenge #145’e gönderir: <a href="https://thecodingtrain.com/raycasting" target="_blank" rel="noopener">thecodingtrain.com/raycasting</a>. Bizim kaba test: bıyığın <em>ucu</em> dairenin içinde mi? Uç = yaratık konumu + bıyık vektörü. Uçtan merkeze <code>dist</code>; yarıçaptan küçükse değer 1’e doğru map, değilse 0 (Şekil 11.6).</p>
    ${N.img(
      "11_nn_ga",
      "11_nn_ga_8.png",
      "Şekil 11.6: Uç merkezdeyse değer 1, kenardaysa 0’a yakın, dışarıdaysa 0. Dokunma şiddeti."
    )}

    <h3>Örnek 11.5: Sensörlü bloop</h3>
    <p>Bir bloop farede, yiyecek ortada. Bıyıklar çizgi. Uç yiyeceğe girince daire yanar; merkeze yaklaştıkça dolgu açılır (<code>value * 255</code> alfa). Bu örnek ml5’sizdir; iframe’de asıl koda yakındır (tuval 400×240).</p>
    <p>Çizim <code>push</code>, <code>translate(position.x, position.y)</code>, bıyıkları (0,0)’dan çiz, gövde, <code>pop</code>. <code>translate</code> kâğıdı kaydırır: bundan sonra (0, 0) tuval köşesi değil, bloop’un merkezidir. <code>push</code> o kaydı yığından yedekler; <code>pop</code> geri alır. <code>pop</code> unutulursa sonraki <code>text</code> de kaymış kâğıda yazılır. <code>translate</code>’i yoruma alınca bıyıklar sol üstte toplanır — kuş hâlâ farede, çizim değil.</p>
    ${N.editor("ex115")}
    ${N.tryit([
      { do: "translate satırını yorumlayın.", expect: "Bıyıklar (0,0) köşesinde. Konum hâlâ fare; yalnızca çizim kaydı bozuldu." },
      { do: "pop()’u silin.", expect: "Sonraki karelerin hepsi kaymış kâğıtta birikir. push/pop çifttir." },
    ])}

    <h3>Sensörden öğrenmek</h3>
    <p>Sensör değerleri ağın girdileri olsun. <code>think</code> çıktıdan yine açı ve büyüklük, <code>applyForce</code>. Fitness yerine <code>health</code>: her kare biraz düşer, yiyeceğe değince yükselir. Sağlık 0 ise ölür, diziden çıkar. Canlı her kare yüzde 0.1 ihtimalle kopyalanır: <code>copy</code> + yüksek mutasyon (çaprazlama yok; siz ekleyebilirsiniz).</p>
    <p>Denge kırılgandır. Parametreyle oynamak bir kuyudur; kitap sizi örneği çalıştırıp kendi sonucunuzu çıkarmaya bırakır. İskele aynı döngüyü küçük beyinle dener. Yiyecek küçülmesi ve bloop’un sağlıkla küçülmesi tam kodda: GitHub 11_6.</p>
    ${N.editor("ex116")}

    <h3>Ekosistem projesi</h3>
    <p>Yaratıklarınıza beyin takın.</p>
    <ul>
      <li>Farklı hedefler: biri yiyecek, biri zehirden kaçış, biri avcı.</li>
      <li>Girdi ve çıktı nedir?</li>
      <li>Her şeyi mi görürler, sensör mü?</li>
      <li>Dengeyi hangi sayılar tutar?</li>
    </ul>
    ${N.img(
      "11_nn_ga",
      "11_nn_ga_9.png",
      "Ekosistem projesi görseli. Sizin dünyanız; kitabın son alıştırması."
    )}
    <p class="src"><a href="https://natureofcode.com/neuroevolution/#the-ecosystem-project-12" target="_blank" rel="noopener">Orijinal ekosistem projesi</a></p>

    <h2>Son</h2>
    <p>Hâlâ okuyorsanız teşekkür. Kitap doğanın ve simülasyonun yüzeyini kazıdı. Shiffman bunu yaşayan bir proje sayıyor: siteye örnek, Coding Train’e video. Geri bildirim: daniel@shiffman.net veya <a href="https://github.com/nature-of-code" target="_blank" rel="noopener">GitHub</a>. İşinizi paylaşın. Doğayla iki kalın.</p>
    ${N.img(
      "11_nn_ga",
      "11_nn_ga_10.png",
      "Kapanış görseli. Perde."
    )}

    ${N.resources([
      { kind: "Kitap", title: "Chapter 11 · Neuroevolution", url: "https://natureofcode.com/neuroevolution/" },
      { kind: "Kod", title: "examples/11_nn_ga", url: "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/11_nn_ga", note: "ml5.js’li tam örnekler" },
      { kind: "Video", title: "Coding Train · Nature of Code 2", url: "https://thecodingtrain.com/tracks/the-nature-of-code-2" },
      { kind: "Video", title: "Raycasting · Challenge 145", url: "https://thecodingtrain.com/raycasting" },
      { kind: "Kütüphane", title: "ml5.js", url: "https://ml5js.org/" },
      { kind: "Makale", title: "NEAT (DOI)", url: "https://doi.org/10.1162/106365602320169811" },
    ])}
  `,
  editors: {
    ex111: {
      title: "Örnek 11.1: Flappy Bird kopyası",
      original: {
        book: "https://natureofcode.com/neuroevolution/#example-111-flappy-bird-clone",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/11_nn_ga/11_1_flappy_bird",
      },
      files: [
        {
          name: "bird.js",
          content: `class Bird {
  constructor() {
    this.x = 50;
    this.y = 120;
    this.velocity = 0;
    this.gravity = 0.5;
    this.flapForce = -10;
  }

  flap() {
    this.velocity += this.flapForce;
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    this.velocity *= 0.95;
    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }
  }

  show() {
    strokeWeight(2);
    stroke(0);
    fill(127);
    circle(this.x, this.y, 16);
  }
}`,
        },
        {
          name: "pipe.js",
          content: `class Pipe {
  constructor() {
    this.spacing = 100;
    this.top = random(height - this.spacing);
    this.bottom = this.top + this.spacing;
    this.x = width;
    this.w = 20;
    this.velocity = 2;
  }

  collides(bird) {
    let verticalCollision = bird.y < this.top || bird.y > this.bottom;
    let horizontalCollision = bird.x > this.x && bird.x < this.x + this.w;
    return verticalCollision && horizontalCollision;
  }

  show() {
    fill(0);
    noStroke();
    rect(this.x, 0, this.w, this.top);
    rect(this.x, this.bottom, this.w, height - this.bottom);
  }

  update() {
    this.x -= this.velocity;
  }

  offscreen() {
    return this.x < -this.w;
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let bird;
let pipes = [];

function setup() {
  createCanvas(400, 240);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(255);
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();
    if (pipes[i].collides(bird)) {
      fill(0);
      noStroke();
      text("OOPS!", pipes[i].x, pipes[i].top + 20);
    }
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }
  bird.update();
  bird.show();
  if (frameCount % 100 === 0) {
    pipes.push(new Pipe());
  }
}

function mousePressed() {
  bird.flap();
}`,
        },
      ],
    },
    genom: {
      title: "Genom = beş sayı; karar eşikte",
      files: [
        {
          name: "sketch.js",
          content: `let g = [0.8, -0.5, -0.7, 0.4, -0.15];

function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  let birdY = constrain(mouseY, 16, height - 16);
  let birdVel = map(mouseX, 0, width, -8, 8);
  let pipeTop = 80;
  let gap = 90;
  let pipeX = 260;
  fill(0);
  noStroke();
  rect(pipeX, 0, 22, pipeTop);
  rect(pipeX, pipeTop + gap, 22, height - pipeTop - gap);
  stroke(0);
  strokeWeight(2);
  fill(127);
  circle(70, birdY, 16);
  let in0 = birdY / height;
  let in1 = (birdVel + 10) / 20;
  let in2 = pipeTop / height;
  let in3 = (pipeX - 70) / width;
  let z = g[4] + g[0] * in0 + g[1] * in1 + g[2] * in2 + g[3] * in3;
  let out = 1 / (1 + exp(-z));
  let flap = out > 0.5;
  for (let i = 0; i < 5; i++) {
    let bar = constrain(g[i], -2, 2);
    fill(60);
    noStroke();
    rect(10 + i * 28, 200, 22, -bar * 22);
    fill(0);
    textSize(9);
    text("g" + i, 12 + i * 28, 228);
  }
  noStroke();
  fill(flap ? "#2a7" : "#888");
  circle(360, 40, 28);
  fill(0);
  textSize(12);
  text(flap ? "CIRP" : "dur", 346, 70);
  text("y=" + round(birdY) + "  vel=" + nf(birdVel, 1, 1), 10, 16);
  text("cikti " + nf(out, 1, 2) + "   esik 0.50", 10, 32);
  text("fare y: kus   fare x: hiz hissi", 10, 48);
}`,
        },
      ],
    },
    ex112: {
      title: "Örnek 11.2 iskelesi (ml5 yok, küçük Brain)",
      original: {
        book: "https://natureofcode.com/neuroevolution/#example-112-flappy-bird-with-neuroevolution",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/11_nn_ga/11_2_flappy_bird_neuro_evolution",
      },
      files: [
        {
          name: "brain.js",
          content: `class Brain {
  constructor(genes) {
    this.genes = genes || [
      random(-1, 1),
      random(-1, 1),
      random(-1, 1),
      random(-1, 1),
      random(-1, 1),
    ];
  }

  think(inputs) {
    let z = this.genes[4];
    for (let i = 0; i < 4; i++) {
      z += this.genes[i] * inputs[i];
    }
    return 1 / (1 + exp(-z));
  }

  copy() {
    return new Brain(this.genes.slice());
  }

  mutate(rate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < rate) {
        this.genes[i] += random(-0.35, 0.35);
      }
    }
  }

  static crossover(a, b) {
    let genes = [];
    let mid = floor(random(a.genes.length));
    for (let i = 0; i < a.genes.length; i++) {
      genes[i] = i < mid ? a.genes[i] : b.genes[i];
    }
    return new Brain(genes);
  }
}`,
        },
        {
          name: "bird.js",
          content: `class Bird {
  constructor(brain) {
    this.x = 50;
    this.y = 120;
    this.velocity = 0;
    this.gravity = 0.5;
    this.flapForce = -10;
    this.fitness = 0;
    this.alive = true;
    this.brain = brain || new Brain();
  }

  think(pipes) {
    let nextPipe = null;
    for (let pipe of pipes) {
      if (pipe.x + pipe.w > this.x) {
        nextPipe = pipe;
        break;
      }
    }
    if (!nextPipe) return;
    let inputs = [
      this.y / height,
      (this.velocity + 10) / 20,
      nextPipe.top / height,
      (nextPipe.x - this.x) / width,
    ];
    if (this.brain.think(inputs) > 0.5) this.flap();
  }

  flap() {
    this.velocity += this.flapForce;
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    this.velocity *= 0.95;
    this.fitness++;
  }

  show() {
    stroke(0, 80);
    strokeWeight(1);
    fill(127, 90);
    circle(this.x, this.y, 14);
  }
}`,
        },
        {
          name: "pipe.js",
          content: `class Pipe {
  constructor() {
    this.spacing = 100;
    this.top = random(height - this.spacing);
    this.bottom = this.top + this.spacing;
    this.x = width;
    this.w = 20;
    this.velocity = 2;
  }

  collides(bird) {
    let verticalCollision = bird.y < this.top || bird.y > this.bottom;
    let horizontalCollision = bird.x > this.x && bird.x < this.x + this.w;
    return verticalCollision && horizontalCollision;
  }

  show() {
    fill(0);
    noStroke();
    rect(this.x, 0, this.w, this.top);
    rect(this.x, this.bottom, this.w, height - this.bottom);
  }

  update() {
    this.x -= this.velocity;
  }

  offscreen() {
    return this.x < -this.w;
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let birds = [];
let pipes = [];
let n = 24;
let generation = 0;
let best = 0;

function setup() {
  createCanvas(400, 240);
  for (let i = 0; i < n; i++) birds.push(new Bird());
  pipes.push(new Pipe());
}

function draw() {
  background(255);
  if (frameCount % 90 === 0) pipes.push(new Pipe());
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    pipes[i].show();
    if (pipes[i].offscreen()) pipes.splice(i, 1);
  }
  let alive = 0;
  for (let bird of birds) {
    if (!bird.alive) continue;
    alive++;
    bird.think(pipes);
    bird.update();
    if (bird.y < 0 || bird.y > height) bird.alive = false;
    for (let pipe of pipes) {
      if (pipe.collides(bird)) bird.alive = false;
    }
    if (bird.alive) {
      bird.show();
      if (bird.fitness > best) best = bird.fitness;
    }
  }
  if (alive === 0) {
    nextGeneration();
    generation++;
    pipes = [new Pipe()];
  }
  noStroke();
  fill(0);
  textSize(12);
  text("nesil " + generation + "   canli " + alive + "/" + n, 8, 16);
  text("en iyi fitness " + best, 8, 32);
}

function nextGeneration() {
  let sum = 0;
  for (let b of birds) sum += b.fitness;
  let next = [];
  for (let i = 0; i < n; i++) {
    let child;
    if (sum <= 0) {
      child = new Brain();
    } else {
      let a = pick();
      let b = pick();
      child = Brain.crossover(a, b);
      child.mutate(0.08);
    }
    next.push(new Bird(child));
  }
  birds = next;
}

function pick() {
  let start = random(1);
  let total = 0;
  for (let b of birds) total += b.fitness;
  for (let b of birds) {
    start -= b.fitness / total;
    if (start <= 0) return b.brain.copy();
  }
  return birds[birds.length - 1].brain.copy();
}`,
        },
      ],
    },
    ex113: {
      title: "Örnek 11.3 iskelesi: konumdan kuvvet",
      original: {
        book: "https://natureofcode.com/neuroevolution/#example-113-smart-rockets-with-neuroevolution",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/11_nn_ga/11_3_smart_rockets_neuro_evolution",
      },
      files: [
        {
          name: "brain.js",
          content: `class Brain {
  constructor(genes) {
    this.genes = genes || [];
    if (this.genes.length === 0) {
      for (let i = 0; i < 6; i++) this.genes[i] = random(-1, 1);
    }
  }

  predict(inputs) {
    let out = [];
    for (let o = 0; o < 2; o++) {
      let z = this.genes[o * 3 + 2];
      z += this.genes[o * 3] * inputs[0];
      z += this.genes[o * 3 + 1] * inputs[1];
      out[o] = 1 / (1 + exp(-z));
    }
    return out;
  }

  copy() {
    return new Brain(this.genes.slice());
  }

  mutate(rate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < rate) this.genes[i] += random(-0.3, 0.3);
    }
  }

  static crossover(a, b) {
    let genes = a.genes.map((g, i) => (random(1) < 0.5 ? g : b.genes[i]));
    return new Brain(genes);
  }
}`,
        },
        {
          name: "rocket.js",
          content: `class Rocket {
  constructor(brain) {
    this.position = createVector(width / 2, height - 12);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.r = 5;
    this.maxforce = 0.35;
    this.maxspeed = 4;
    this.fitness = 0;
    this.crashed = false;
    this.brain = brain || new Brain();
  }

  applyForce(f) {
    this.acceleration.add(f);
  }

  think() {
    let inputs = [this.position.x / width, this.position.y / height];
    let out = this.brain.predict(inputs);
    let angle = out[0] * TWO_PI;
    let mag = out[1] * this.maxforce;
    let force = p5.Vector.fromAngle(angle);
    force.setMag(mag);
    this.applyForce(force);
  }

  update(target) {
    if (this.crashed) return;
    this.think();
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    if (this.position.x < 0 || this.position.x > width) this.crashed = true;
    if (this.position.y < 0 || this.position.y > height) this.crashed = true;
    let d = p5.Vector.dist(this.position, target);
    this.fitness = 1 / (d + 1);
    if (d < 16) this.fitness += 4;
  }

  show() {
    let angle = this.velocity.heading();
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    fill(this.crashed ? 200 : 80, 80);
    stroke(0, 80);
    triangle(this.r * 2, 0, -this.r, -this.r, -this.r, this.r);
    pop();
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let rockets = [];
let n = 20;
let target;
let generation = 0;
let life = 0;
let lifespan = 160;

function setup() {
  createCanvas(400, 240);
  target = createVector(width / 2, 28);
  for (let i = 0; i < n; i++) rockets.push(new Rocket());
}

function draw() {
  background(255);
  fill("#c45c78");
  noStroke();
  circle(target.x, target.y, 22);
  for (let r of rockets) {
    r.update(target);
    r.show();
  }
  life++;
  if (life > lifespan) {
    nextGeneration();
    generation++;
    life = 0;
  }
  fill(0);
  textSize(12);
  text("nesil " + generation + "   kare " + life + "/" + lifespan, 8, 16);
  text("fromAngle: 0 sag, HALF_PI asagi", 8, 228);
}

function nextGeneration() {
  let sum = 0;
  for (let r of rockets) sum += r.fitness;
  let next = [];
  for (let i = 0; i < n; i++) {
    let child;
    if (sum <= 0) child = new Brain();
    else {
      child = Brain.crossover(pick(), pick());
      child.mutate(0.1);
    }
    next.push(new Rocket(child));
  }
  rockets = next;
}

function pick() {
  let start = random(1);
  let total = 0;
  for (let r of rockets) total += r.fitness;
  for (let r of rockets) {
    start -= r.fitness / total;
    if (start <= 0) return r.brain.copy();
  }
  return rockets[0].brain.copy();
}`,
        },
      ],
    },
    ex114: {
      title: "Örnek 11.4 iskelesi: ışığı izle, fare x hızı",
      original: {
        book: "https://natureofcode.com/neuroevolution/#example-114-dynamic-neuroevolutionary-steering",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/11_nn_ga/11_4_neuro_evolution_steering_seek",
      },
      files: [
        {
          name: "brain.js",
          content: `class Brain {
  constructor(genes) {
    this.genes = genes || [];
    if (this.genes.length === 0) {
      for (let i = 0; i < 12; i++) this.genes[i] = random(-1, 1);
    }
  }

  predict(inputs) {
    let out = [0, 0];
    for (let o = 0; o < 2; o++) {
      let z = this.genes[o * 6 + 5];
      for (let i = 0; i < 5; i++) z += this.genes[o * 6 + i] * inputs[i];
      out[o] = 1 / (1 + exp(-z));
    }
    return out;
  }

  copy() {
    return new Brain(this.genes.slice());
  }

  mutate(rate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < rate) this.genes[i] += random(-0.25, 0.25);
    }
  }

  static crossover(a, b) {
    let genes = a.genes.map((g, i) => (random(1) < 0.5 ? g : b.genes[i]));
    return new Brain(genes);
  }
}`,
        },
        {
          name: "creature.js",
          content: `class Creature {
  constructor(brain) {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.r = 6;
    this.maxspeed = 3.2;
    this.fitness = 0;
    this.brain = brain || new Brain();
  }

  applyForce(f) {
    this.acceleration.add(f);
  }

  seek(target) {
    let v = p5.Vector.sub(target.position, this.position);
    let distance = v.mag() / width;
    v.normalize();
    let inputs = [
      v.x,
      v.y,
      distance,
      this.velocity.x / this.maxspeed,
      this.velocity.y / this.maxspeed,
    ];
    let out = this.brain.predict(inputs);
    let force = p5.Vector.fromAngle(out[0] * TWO_PI);
    force.setMag(out[1] * 0.4);
    this.applyForce(force);
  }

  update(target) {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    let d = p5.Vector.dist(this.position, target.position);
    if (d < this.r + target.r) this.fitness++;
  }

  show() {
    let angle = this.velocity.heading();
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    fill(80, 140);
    stroke(0, 100);
    triangle(8, 0, -6, -5, -6, 5);
    pop();
  }
}`,
        },
        {
          name: "glow.js",
          content: `class Glow {
  constructor() {
    this.xoff = random(100);
    this.yoff = random(100, 200);
    this.position = createVector(0, 0);
    this.r = 16;
  }

  update() {
    this.position.x = noise(this.xoff) * width;
    this.position.y = noise(this.yoff) * height;
    this.xoff += 0.008;
    this.yoff += 0.008;
  }

  show() {
    noStroke();
    fill(200, 160, 40, 180);
    circle(this.position.x, this.position.y, this.r * 2);
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let creatures = [];
let glow;
let n = 16;
let generation = 0;
let life = 0;
let lifespan = 220;

function setup() {
  createCanvas(400, 240);
  glow = new Glow();
  for (let i = 0; i < n; i++) creatures.push(new Creature());
}

function draw() {
  background(255);
  let cycles = floor(map(mouseX, 0, width, 1, 12));
  cycles = constrain(cycles, 1, 12);
  for (let i = 0; i < cycles; i++) {
    glow.update();
    for (let c of creatures) {
      c.seek(glow);
      c.update(glow);
    }
    life++;
    if (life > lifespan) {
      nextGeneration();
      generation++;
      life = 0;
    }
  }
  glow.show();
  for (let c of creatures) c.show();
  fill(0);
  noStroke();
  textSize(12);
  text("nesil " + generation + "   fizik x" + cycles, 8, 16);
  text("fitness = isikla kesisme suresi", 8, 228);
}

function nextGeneration() {
  let sum = 0;
  for (let c of creatures) sum += c.fitness;
  let next = [];
  for (let i = 0; i < n; i++) {
    let child;
    if (sum <= 0) child = new Brain();
    else {
      child = Brain.crossover(pick(), pick());
      child.mutate(0.12);
    }
    next.push(new Creature(child));
  }
  creatures = next;
}

function pick() {
  let start = random(1);
  let total = 0;
  for (let c of creatures) total += c.fitness;
  for (let c of creatures) {
    start -= c.fitness / total;
    if (start <= 0) return c.brain.copy();
  }
  return creatures[0].brain.copy();
}`,
        },
      ],
    },
    ex115: {
      title: "Örnek 11.5: Sensörlü bloop",
      original: {
        book: "https://natureofcode.com/neuroevolution/#example-115-a-bloop-with-sensors",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/11_nn_ga/11_5_creature_sensors",
      },
      files: [
        {
          name: "sensor.js",
          content: `class Sensor {
  constructor(v) {
    this.v = v.copy();
    this.value = 0;
  }

  sense(position, food) {
    let end = p5.Vector.add(position, this.v);
    let d = end.dist(food.position);
    if (d < food.r) {
      this.value = map(d, 0, food.r, 1, 0);
    } else {
      this.value = 0;
    }
  }
}`,
        },
        {
          name: "food.js",
          content: `class Food {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.r = 32;
  }

  show() {
    noStroke();
    fill(0, 100);
    circle(this.position.x, this.position.y, this.r * 2);
  }
}`,
        },
        {
          name: "creature.js",
          content: `class Creature {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.r = 16;
    this.sensors = [];
    let totalSensors = 15;
    for (let i = 0; i < totalSensors; i++) {
      let a = map(i, 0, totalSensors, 0, TWO_PI);
      let v = p5.Vector.fromAngle(a);
      v.mult(this.r * 2);
      this.sensors[i] = new Sensor(v);
    }
  }

  sense(food) {
    for (let i = 0; i < this.sensors.length; i++) {
      this.sensors[i].sense(this.position, food);
    }
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    for (let sensor of this.sensors) {
      stroke(0);
      line(0, 0, sensor.v.x, sensor.v.y);
      if (sensor.value > 0) {
        fill(255, sensor.value * 255);
        stroke(0, 100);
        circle(sensor.v.x, sensor.v.y, 8);
      }
    }
    noStroke();
    fill(0);
    circle(0, 0, this.r * 2);
    pop();
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let creature;
let food;

function setup() {
  createCanvas(400, 240);
  creature = new Creature(width / 2, height / 2);
  food = new Food();
}

function draw() {
  background(255);
  creature.position.x = mouseX;
  creature.position.y = mouseY;
  food.show();
  creature.sense(food);
  creature.show();
  fill(0);
  noStroke();
  textSize(12);
  text("fare = bloop   uc dairedeyse bıyık yanar", 8, 16);
}`,
        },
      ],
    },
    ex116: {
      title: "Örnek 11.6 iskelesi: sağlık + kopya",
      original: {
        book: "https://natureofcode.com/neuroevolution/#example-116-a-neuroevolutionary-ecosystem",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/11_nn_ga/11_6_neuroevolution_ecosystem",
      },
      files: [
        {
          name: "brain.js",
          content: `class Brain {
  constructor(genes) {
    this.genes = genes || [];
    if (this.genes.length === 0) {
      for (let i = 0; i < 18; i++) this.genes[i] = random(-1, 1);
    }
  }

  predict(inputs) {
    let out = [0, 0];
    for (let o = 0; o < 2; o++) {
      let z = this.genes[o * 9 + 8];
      for (let i = 0; i < 8; i++) z += this.genes[o * 9 + i] * inputs[i];
      out[o] = 1 / (1 + exp(-z));
    }
    return out;
  }

  copy() {
    return new Brain(this.genes.slice());
  }

  mutate(rate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < rate) this.genes[i] += random(-0.4, 0.4);
    }
  }
}`,
        },
        {
          name: "bloop.js",
          content: `class Bloop {
  constructor(x, y, brain) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.r = 12;
    this.health = 100;
    this.maxspeed = 2.2;
    this.brain = brain || new Brain();
    this.sensors = [];
    for (let i = 0; i < 8; i++) {
      let a = map(i, 0, 8, 0, TWO_PI);
      let v = p5.Vector.fromAngle(a);
      v.setMag(this.r * 2.2);
      this.sensors.push({ v: v, value: 0 });
    }
  }

  sense(foods) {
    for (let s of this.sensors) {
      s.value = 0;
      let end = p5.Vector.add(this.position, s.v);
      for (let f of foods) {
        let d = end.dist(f.position);
        if (d < f.r) s.value = max(s.value, map(d, 0, f.r, 1, 0));
      }
    }
  }

  think() {
    let inputs = this.sensors.map((s) => s.value);
    let out = this.brain.predict(inputs);
    let force = p5.Vector.fromAngle(out[0] * TWO_PI);
    force.setMag(out[1] * 0.35);
    this.acceleration.add(force);
  }

  eat(foods) {
    for (let f of foods) {
      let d = p5.Vector.dist(this.position, f.position);
      if (d < this.r + f.r) this.health += 0.45;
    }
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.health -= 0.22;
    if (this.position.x < 0) this.position.x = width;
    if (this.position.x > width) this.position.x = 0;
    if (this.position.y < 0) this.position.y = height;
    if (this.position.y > height) this.position.y = 0;
  }

  reproduce() {
    let b = this.brain.copy();
    b.mutate(0.1);
    return new Bloop(this.position.x, this.position.y, b);
  }

  show() {
    let alpha = constrain(this.health, 20, 100);
    push();
    translate(this.position.x, this.position.y);
    for (let s of this.sensors) {
      stroke(0, 60);
      line(0, 0, s.v.x, s.v.y);
      if (s.value > 0) {
        fill(255, s.value * 200);
        circle(s.v.x, s.v.y, 6);
      }
    }
    noStroke();
    fill(40, alpha);
    circle(0, 0, this.r * 2);
    pop();
  }
}`,
        },
        {
          name: "food.js",
          content: `class Food {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.r = 22;
  }

  show() {
    noStroke();
    fill(0, 80);
    circle(this.position.x, this.position.y, this.r * 2);
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let bloops = [];
let foods = [];

function setup() {
  createCanvas(400, 240);
  for (let i = 0; i < 12; i++) {
    bloops.push(new Bloop(random(width), random(height)));
  }
  for (let i = 0; i < 5; i++) foods.push(new Food());
}

function draw() {
  background(255);
  for (let i = bloops.length - 1; i >= 0; i--) {
    let b = bloops[i];
    b.sense(foods);
    b.think();
    b.eat(foods);
    b.update();
    if (b.health < 0) {
      bloops.splice(i, 1);
    } else if (random(1) < 0.003 && bloops.length < 22) {
      bloops.push(b.reproduce());
    }
  }
  for (let f of foods) f.show();
  for (let b of bloops) b.show();
  fill(0);
  noStroke();
  textSize(12);
  text("bloop " + bloops.length + "   saglik 0 olunca olur", 8, 16);
}`,
        },
      ],
    },
  },
});
