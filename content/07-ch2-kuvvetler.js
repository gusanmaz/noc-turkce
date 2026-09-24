registerChapter({
  id: "ch2",
  title: "2. Kuvvetler",
  short: "2. Kuvvetler",
  icon: "🍎",
  original: "https://natureofcode.com/forces/",
  originalCode:
    "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/02_forces",
  html: `
    <p style="font-style:italic;color:var(--muted);">“Kuvveti küçümsemeyin.” — Darth Vader</p>

    ${N.img(
      "02_forces",
      "02_forces_1.png",
      "Calder yerleştirmesi, New Gallery, Charles Hayden Memorial Library, MIT, Cambridge, MA, 1950 (fotoğraf: Ezra Stoller). Tel ve plakalar: gerilim, denge, yerçekiminin sürekli çekişi."
    )}

    <p>Bölüm 1’in son örneğinde daire, farenin olduğu piksele doğru ivmeleniyordu. Ok, dairenin merkezinden fareye gidiyordu; hareket mıknatıs gibi duruyordu: sanki bir <em>kuvvet</em> çekiyordu. Bu bölüm o kelimeyi açar. Kuvvet ile ivme aynı cümlede durur. Bitince elinizde kaba bir fizik motoru olsun: tuvaldeki şekiller rüzgar, yerçekimi, sürtünme, su, birbirini çekme gibi etkilere cevap versin.</p>

    <p><strong>Fizik motoru</strong>, nesnelerin bir ortamda nasıl davrandığını hesaplayan programdır (veya kütüphane). p5.js sketch’inde nesne iki boyutlu şekil, ortam dikdörtgen tuvaldir. Motor milimetre hassasiyetinde de yazılır, oyun hızında da. Burada ikinci yol: anlaşılır olsun, kare kare yetişsin.</p>

    ${N.note(
      "Bu bölümün çıktısı",
      `<ul>
        <li>Newton: duran durur, kuvvet vektördür, <code>F = m a</code> koda nasıl girer</li>
        <li><code>applyForce</code>: kuvveti ivmeye eklemek; üstüne yazmak değil biriktirmek</li>
        <li><code>copy</code>: paylaşılan vektörü bölmeden önce kopyalamak</li>
        <li>Kütle ile ağırlık; yerçekimini kütleyle ölçekleyince neden aynı düşerler</li>
        <li>Sürtünme ve sürükleme: <code>copy</code>, <code>normalize</code>, hıza zıt yön</li>
        <li>Çekim: fark vektörü, mesafenin karesi, <code>constrain</code></li>
      </ul>`
    )}

    <h2>Kuvvetler ve Newton’un hareket yasaları</h2>

    <p>Kuvvet günlük dilde başka kapılara da çıkar: “büyük bir kuvvetle itti”, “hesaba katılması gereken bir güç”. Newton’un üç yasasında kullandığımız anlam daha dardır:</p>
    <p><strong>Kuvvet, kütlesi olan bir cismin ivmelenmesine yol açan vektördür.</strong></p>
    <p>Cümlenin ilk yarısı Bölüm 1’dir: kuvvet bir vektördür, hem büyüklük hem yön. Üç yasayı o paketle okuyacağız; tanımın geri kalanı (kütle, ivme) kodda görününce oturur.</p>

    <h3>Newton’un birinci yasası</h3>

    <p>Sık duyulan hali şudur:</p>
    <p><strong>Duran cisim durmaya, hareket eden cisim hareket etmeye devam eder.</strong></p>
    <p>Eksik bir parça var: kuvvet. Tamamı şöyle durur:</p>
    <p><strong>Duran cisim durmaya, hareket eden cisim aynı hız ve yönde gitmeye devam eder — ta ki dengesiz bir kuvvet işe karışana kadar.</strong></p>
    <p>Newton’dan önce neredeyse iki bin yıl Aristoteles konuşurdu: giden bir şey durmasın istiyorsan onu itmeye veya çekmeye devam et. Gözlem bunu destekler gibi durur. Topu atarsınız, yere düşer, durur; “atışın kuvveti bitti” dersiniz.</p>
    <p>Newton başka türlü bakıyor. Kuvvet yoksa hızı değiştirmek için kuvvet de gerekmez. Topun hızının değişmesi, görünmeyen kuvvetlerdendir: hava direnci, yerçekimi. Hız ancak kuvvet yokken, ya da kuvvetler birbirini götürüp toplam sıfırken sabit kalır. Buna <strong>denge</strong> (equilibrium) denir. Düşen top, hava direnci yerçekimine eşitlenince terminal hıza oturur; o hız artık değişmez.</p>

    ${N.img(
      "02_forces",
      "02_forces_2.png",
      "Şekil 2.1: Oyuncak fare kımıldamaz. Kuvvetler birbirini götürür; net (bileşke) kuvvet sıfırdır."
    )}

    <p>p5.js tuvalinde birinci yasa şöyle okunur:</p>
    <p><strong>Nesne dengedeyse hız vektörü değişmez.</strong></p>
    <p><code>Mover</code> sınıfının <code>update</code>’i, net kuvvet sıfırken hıza dokunmamalıdır. İvme yoksa hız dünün hızıdır; konum o hız kadar kayar. “Durması için bir kuvvet yazayım” diye ekstra bir şey aramayın — durması, iten şeyin kesilmesidir.</p>

    <h3>Newton’un üçüncü yasası</h3>

    <p>İkinci yasayı bir paragraf erteleyelim; üçüncü daha çok karışır. Sık söylenen hali:</p>
    <p><strong>Her etkiye eşit ve zıt bir tepki vardır.</strong></p>
    <p>Cümle, sanki bir kuvvet diğerini doğuruyormuş gibi durur. Birini iterseniz o da sizi itmeye <em>karar verebilir</em>; Newton’un bahsettiği çift bu değildir.</p>
    <p>Duvara yaslanırsınız. Duvar oturup “ben de iteyim” demez. Yine de size eşit büyüklükte, ters yönde direnir. Köken kuvvet yoktur. İtişiniz zaten iki kuvveti birden taşır: etki–tepki çifti. Daha temiz cümle:</p>
    <p><strong>Kuvvetler çift gelir. İkisi aynı şiddette, zıt yöndedir.</strong></p>
    <p>Bu da ikinci bir tuzağa düşer: “o zaman her zaman birbirini iptal eder.” Etmez. Çift, <em>farklı</em> cisimlere uygulanır. Kuvvetler eşit diye hareketler eşit olmaz; cisimler durmak zorunda da değildir.</p>
    <p>Park halindeki kamyonu itmeyi düşünün. Kamyon sizden çok daha ağırdır; yine de sizi uçurup geri fırlatmaz. Elinizin kamyona uyguladığı kuvvet ile kamyonun elinize uyguladığı kuvvet eşit ve zıttır. Sonucu başka şeyler belirler: kamyon küçük ve buzlu yoldaysa belki kımıldar. Çok büyükse ve toprak yoldaysa elinizi incitebilirsiniz.</p>
    <p>Ya Şekil 2.2’deki gibi paten giyiyorsanız?</p>

    ${N.img(
      "02_forces",
      "02_forces_3.png",
      "Şekil 2.2: Newton’un üçüncü yasası. Ağır kamyonu iterken paten: siz kayarsınız, kamyon yerinde kalır."
    )}

    <p>Siz kamyondan uzaklaşıp kayarsınız; kamyon durur. Neden siz? Birincisi kütle — ikinci yasada gelecek. Bir de lastiklerin ve patenin yolla sürtünmesi var. Kuvvet çifti eşit; dünya eşit değil.</p>
    <p>p5.js cümlesi:</p>
    <p><strong>A’nın B’ye uyguladığı kuvveti <code>f</code> diye bir <code>p5.Vector</code> olarak hesapladıysanız, B’nin A’ye uyguladığı zıttı da uygulayın: <code>p5.Vector.mult(f, -1)</code>.</strong></p>
    <p>Simülasyonda bu çifte her zaman sadık kalmayacağız. Örnek 2.8’de iki cisim birbirini çeker; orada eşit-zıt çifti kodda durur. “Ortama bir rüzgar koydum” dediğimizde havanın cisimden geri aldığı kuvveti yazmayız; havayı modellemeyiz. Bu kitap doğadan esinlenir; milimetre mahkemesi değildir.</p>

    <h3>Newton’un ikinci yasası</h3>

    <p>p5.js yazanı asıl ilgilendiren yasa budur:</p>
    <p><strong>Kuvvet, kütle çarpı ivmedir.</strong></p>
    ${N.math(
      "F⃗ = m × A⃗",
      "Kuvvet vektörü, kütle (tek sayı) ile ivme vektörünün çarpımıdır. p5.js’te bu eşitliği bir fonksiyon olarak çağırmazsınız; <code>applyForce(force)</code> ivmeyi kuvvetten üretir."
    )}
    <p>Kodda işimize yarayan hali ters çevirmektir:</p>
    ${N.math(
      "A⃗ = F⃗ / m",
      "İvme, kuvvetin kütleye bölümüdür. Aynı itiş: kütle büyüdükçe ivme küçülür. p5.js’te bölüm <code>p5.Vector.div(force, this.mass)</code> ile yapılır — birinci argüman kuvvet vektörü, ikinci argüman kütle sayısı. Sonuç yeni bir vektördür; asıl kuvvet kutusu durur."
    )}
    <p>Sizi iterler. İtiş sertse hızınız çabuk değişir (ivme büyük). Siz “daha büyük”seniz — daha çok madde — aynı itiş sizi daha az değiştirir. Market poşeti kolay kaçar; pirinç çuvalı aynı elle zor yerinden oynar.</p>

    ${N.note(
      "Ağırlık ile kütle",
      `<p><strong>Kütle</strong>, maddedeki “ne kadar madde var” ölçüsüdür (kilogram). Dünya’da 1 kg olan taş Ay’da da 1 kg’dır.</p>
      <p><strong>Ağırlık</strong> sık sık kütle yerine kullanılır; teknik olarak yerçekiminin cisme uyguladığı kuvvettir. İkinci yasadan: ağırlık = kütle çarpı yerçekimi ivmesi. Birimi newton’dur. Ay’da ağırlık Dünya’dakinin yaklaşık altıda biridir; kütle aynıdır.</p>
      <p><strong>Yoğunluk</strong>, birim hacimdeki kütledir (örneğin gram / santimetre küp). Küçük metal bilye, büyük balondan ağır olabilir.</p>`
    )}

    ${N.math(
      "w = m × g",
      "Ağırlık (kuvvet) = kütle çarpı yerçekimi ivmesi. Tuvalde <code>g</code> diye (0, 0.1) gibi uydurulmuş bir vektör seçeriz; p5.js’in yerçekimi fonksiyonu yoktur. Ağırlığı uygulamak: bu vektörü kütleyle çarpıp <code>applyForce</code>’a vermek."
    )}

    <p>Piksel dünyasında kütle nedir? Başta her nesnenin kütlesini 1 sayalım. 1’e bölünen kendisidir:</p>
    ${N.math(
      "A⃗ = F⃗",
      "Kütle 1 iken ivme kuvvete eşittir. Bölüm 1’de hareketin anahtarı ivmeydi: konum hıza, hız ivmeye göre değişir. Kuvvet, o zincirin gerçek başlangıcıdır."
    )}

    <p><code>Mover</code> yine konum, hız, ivme taşır:</p>
    <pre><code>class Mover {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }
}</code></pre>
    <p>Amacımız nesneye kuvvet verebilmek:</p>
    <p><code>mover.applyForce(wind);</code> veya <code>mover.applyForce(gravity);</code></p>
    <p><code>wind</code> ve <code>gravity</code> birer <code>p5.Vector</code>. Kütlesiz dünyada ikinci yasa tek satır gibi durur:</p>
    <pre><code>applyForce(force) {
  this.acceleration = force;
}</code></pre>
    <p>Cümle doğru görünür: ivme = kuvvet. Rüzgar ile yerçekimini aynı nesneye verdiğiniz anda kırılır:</p>
    <pre><code>mover.applyForce(wind);
mover.applyForce(gravity);
mover.update();</code></pre>
    <p>Bilgisayar sırayla gider. İlk çağrı ivmeyi rüzgara eşitler. İkinci çağrı ivmeyi yerçekimine eşitler. <code>update</code> hıza ivmeyi ekler. Eklenen nedir? Yalnızca yerçekimi. Rüzgar silinmiştir. Hata konsola düşmez; daire yanlış gider. <code>=</code> kutunun eski içeriğini atar. İki kuvveti üst üste koymak başka bir iştir.</p>

    <h2>Kuvvetlerin birikmesi</h2>

    <p>Kuvvetler <strong>birikmeli</strong>, yani toplanmalıdır. İkinci yasanın tam hali, baştaki kısaltmayı düzeltir:</p>
    <p><strong>Bileşke kuvvet, kütle çarpı ivmedir.</strong></p>
    <p>İvme, o andaki bütün kuvvetlerin toplamının kütleye bölümüdür. 1 kuvvet de olabilir, 12 de. Nesne toplamayı biliyorsa sayı önemli değildir. Birinci yasayla uyumlu: toplam sıfırsa denge, ivme yok.</p>
    <p><code>applyForce</code> düzeltilmiş hali:</p>
    <pre><code>applyForce(force) {
  this.acceleration.add(force);
}</code></pre>
    <p>p5.js’te <code>add</code>, vektörün x ve y’sine diğerinin x ve y’sini ekler; kutu yerinde değişir. Rüzgarın (0.1, 0) ile yerçekiminin (0, 0.1) toplanması (0.1, 0.1) üretir. İkisi de durur.</p>

    ${N.editor("ustuneYaz")}
    ${N.tryit([
      { do: "Fareye basılı tutun.", expect: "Solda ivme = kuvvet: rüzgar yerçekimini siler, daire düşmeyi bırakıp sağa kayar. Sağda add: hem düşer hem sağa gider." },
      { do: "Sağdaki applyForce içindeki add yerine eşitleme (=) yazın.", expect: "Sağ da sol gibi olur; ikinci kuvvet birincinin üstüne yazılır." },
    ])}
    ${N.quiz(
      "applyForce rüzgarı, sonra yerçekimini eşitliyor (=). update hıza hangi vektörü ekler?",
      ["Rüzgar ile yerçekiminin toplamı", "Yalnızca yerçekimi", "Yalnızca rüzgar"],
      1,
      "İkinci eşitleme birincinin üstüne yazar. add kullanmadan iki kuvvet bir arada durmaz."
    )}

    <p>Biriktirmek yetmez. Her kare, o anki kuvvetlerden ivme üretilir; ivmenin dünü yoktur. Konum dününü hatırlar (nerede olduğunu bilmezseniz bir sonraki piksele gidemezsiniz). İvme hatırlamaz. Fare basılıyken rüzgar var, bırakınca yok — Newton’un birinci yasası: rüzgar kesilince hız o andaki değerinde kalmalı, kendi kendine artmamalı.</p>
    <p><code>update</code> sonunda ivmeyi sıfırlamazsanız dünkü rüzgar bugüne eklenir, yarın bir daha eklenir. Birkaç kare sonra daire tuvalden uçar. Temizlik:</p>
    <pre><code>update() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.acceleration.mult(0);
}</code></pre>
    <p>p5.js’te <code>mult(0)</code> her bileşeni sıfırla çarpar; ok sıfır vektör olur. <code>this.acceleration.set(0, 0)</code> aynı işi görür. Bunu yazmayı unutmak, “rüzgarı kestim” sandığınız halde hâlâ üflemektir.</p>

    ${N.warn(
      "applyForce kutuyu doldurur, update boşaltır",
      `<p><code>applyForce</code> ivmeye ekler. <code>update</code> o toplamı hıza katar, sonra ivmeyi sıfırlar. Sıfırlamayı çizerseniz kuvvetler kareler boyunca birikir; daire her kare daha sert uçar. Sıfırlayıp <code>add</code> yerine <code>=</code> yazarsanız aynı karedeki ikinci kuvvet birincini siler.</p>`
    )}

    <p>Zaman adımı (<code>dt</code>, kareler arası süre) da işin içindedir. Birçok motor onu değişken tutar. Biz her <code>draw</code> turunu bir adım sayıyoruz. Kaba ama bu bölümün fikrini taşır. Bölüm 6’da hazır fizik kütüphanelerinde adım boyu tekrar çıkar.</p>

    ${N.note(
      "Alıştırma 2.1 (orijinal)",
      `<p>Kuvvetlerle helyum balonu: yukarı süzülsün, pencerenin tavanına çarpıp dönsün. Zamanla değişen bir rüzgar ekleyin; belki Perlin (<code>noise</code>).</p>
      <p><a href="https://natureofcode.com/forces/#exercise-21" target="_blank" rel="noopener">Exercise 2.1</a></p>`
    )}

    <h2>Kütleyi işe katmak</h2>

    <p>İkinci yasa <em>F = m A</em>’dır, <em>F = A</em> değil. <code>this.mass</code> eklemek bir satırdır; asıl düğüm, o sayıyı kuvvete nasıl uyguladığınızdadır.</p>

    ${N.note(
      "Ölçü birimleri",
      `<p>Gerçek dünyada metre, mil / saat, kilogram konuşulur. Bu bölüm piksel ve kare konuşur: “iki daire 100 piksel apart”, “bu daire karede 2 piksel gider”.</p>
      <p>Kütle için p5.js’in birimi yoktur. İsterseniz uydurun: “10 pikseloid”. Gösterim için çapı kütleye bağlarız (büyük daire, büyük kütle). Gerçekte boyut kütle demek değildir. Eşit yoğunlukta iki dairede kütle, dairenin alanına bağlıdır: yarıçapın karesi. Alıştırma 2.11 ve Bölüm 3.</p>`
    )}

    <p>Kütle skalerdir, vektör değil: maddenin miktarını tek sayı söyler. Şimdilik “bu nesnenin kütlesi… 10 olsun” demek yeter. İlginç dünya, kütleler çeşitlenince başlar.</p>
    <p>Newton’u uygulamak: kuvveti kütleye böl, ivmeye ekle.</p>
    <pre><code>applyForce(force) {
  force.div(this.mass);
  this.acceleration.add(force);
}</code></pre>
    <p>Yine makul görünür; iki <code>Mover</code> aynı rüzgarı paylaşınca kırılır.</p>
    <pre><code>let wind = createVector(1, 0);
moverA.applyForce(wind);
moverB.applyForce(wind);</code></pre>
    <p>A, rüzgarı (1, 0) alır, kütlesi 10’a böler, ivmeye (0.1, 0) ekler. Sıra B’de. B de rüzgarı alır — kutunun içinde artık (0.1, 0) duruyordur. <code>p5.Vector</code> bir nesnedir; fonksiyona verince kopya değil, aynı kutu gider. <code>div</code> o kutunun x ve y’sini yerinde değiştirir. B, A’nın kütlesine bölünmüş rüzgarı yutar. İstediğiniz bu değildir.</p>

    ${N.editor("kopyaKuvvet")}
    ${N.tryit([
      { do: "Sol sütundaki sayılara bakın.", expect: "Rüzgar başta 0.50. Ağır (kütle 10) böldükten sonra 0.05. Hafif o küçülmüş sayıyı bir daha böler." },
      { do: "Sağda hafif daireye bakın.", expect: "Aynı 0.50’yi kendi kütlesine böler; sola göre çok daha sert sağa kaçar." },
    ])}

    <p>Asıl vektörü korumak: bölmeden önce kopya. p5.js’te <code>copy()</code> aynı x ve y ile yeni bir <code>p5.Vector</code> döndürür; eski kutu durur.</p>
    <pre><code>applyForce(force) {
  let f = force.copy();
  f.div(this.mass);
  this.acceleration.add(f);
}</code></pre>
    <p>Bu bölümde <code>copy</code> iki işe yarar. Biri bu: paylaşılan kuvveti bölüp mahvetmemek. Diğeri birazdan sürtünmede: hız vektörünün kendisini ters çevirmemek. İkisinde de kural aynıdır — asıl oku bozacak bir <code>div</code>, <code>mult</code>, <code>normalize</code> geliyorsa önce kopya.</p>

    ${N.quiz(
      "let wind = createVector(1, 0) sonra iki mover force.div(mass) ile aynı wind’i yutarsa ikinci ne alır?",
      ["Hâlâ (1, 0)", "Birincinin kütlesine bölünmüş vektör", "Sıfır vektör"],
      1,
      "div yerinde değiştirir. copy veya p5.Vector.div(force, mass) yeni kutu üretir; aslı durur."
    )}

    ${N.note(
      "Alıştırma 2.2 (orijinal)",
      `<p><code>applyForce</code>’u <code>copy</code> yerine statik <code>div</code> ile yazın. Statik çağrı yeni vektör döndürür; <code>force</code> değişmez.</p>
      <pre><code>applyForce(force) {
  let f = p5.Vector.div(force, this.mass);
  this.acceleration.add(f);
}</code></pre>
      <p><a href="https://natureofcode.com/forces/#exercise-22" target="_blank" rel="noopener">Exercise 2.2</a> · Bölüm 1, statik / yerinde metotlar.</p>`
    )}

    <p>Aşağıdaki ekstra, bölümün matematik cümlesini tuvale yazar: aynı kuvvet, farklı kütle, ivme neden değişir; yerçekiminde kuvveti kütleyle çarpınca neden ikisi de aynı düşer.</p>
    ${N.editor("kitleBol")}
    ${N.tryit([
      { do: "Sol tarafta sayılara bakın.", expect: "F aynı (0.40). Küçük kütlede a daha büyük; küçük daire önce yere iner." },
      { do: "Sağ tarafa bakın.", expect: "Kuvvet kütleyle çarpılmış: F farklı, a aynı (0.10). Galileo: Pisa kulesinden iki top." },
    ])}

    <h2>Kuvvet uydurmak</h2>

    <p>p5.js dünyasında kuvvetin iki kaynağı vardır:</p>
    <ul>
      <li><strong>Uydurun.</strong> Siz programcısınız. (0.01, 0) de bir rüzgardır.</li>
      <li><strong>Modelleyin.</strong> Fizik kitabındaki formülü JavaScript’e çevirin.</li>
    </ul>
    <p>Önce uydurmak. Sağa bakan, zayıf bir rüzgar:</p>
    <pre><code>let wind = createVector(0.01, 0);
mover.applyForce(wind);</code></pre>
    <p>Tek başına sıkıcıdır; başlangıç için yeter. Bir de aşağı bakan yerçekimi ekleyelim. Rüzgar yalnızca fare basılıyken üflesin.</p>

    <h3>Örnek 2.1: Kuvvetler</h3>
    <p>Her kare yerçekimi ivmeye eklenir. Fareye basınca rüzgar da eklenir. <code>update</code> ikisini birden hıza katar, ivmeyi sıfırlar. Kenara çarpınca o bileşendeki hızın işareti döner. Daire hem düşer hem, fareyle, sağa kaçar.</p>
    ${N.editor("ex21")}
    ${N.tryit([
      { do: "Fareye basılı tutun.", expect: "Daire sağa ivmelenir; bırakınca yatay hız o anda kalır, düşme devam eder." },
      { do: "update içindeki acceleration.mult(0) satırını silin.", expect: "Kuvvetler kareler boyunca birikir; daire birkaç saniyede tuvalden uçar." },
    ])}

    <p>İki kuvvet, iki yön, iki büyüklük; ikisi de aynı nesneye. Ortam doğmaya başladı. Şimdi ikinci bir nesne, farklı kütle.</p>
    <p>Bölüm 1’deki <code>Mover</code> duruyor; iki ek: <code>mass</code> ve <code>applyForce</code>. Sınıf hazırsa iki nesne üretmek iki satırdır — ama constructor herkese aynı kütleyi ve aynı konumu veriyorsa iki daire üst üste biner. Kalıba argüman:</p>
    <pre><code>constructor(x, y, mass) {
  this.mass = mass;
  this.position = createVector(x, y);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
}</code></pre>
    <p>Büyük olan solda, küçük olan sağda:</p>
    <pre><code>let moverA = new Mover(120, 30, 10);
let moverB = new Mover(280, 30, 2);</code></pre>
    <p>Çapı kütleye bağlarız: <code>circle(..., this.mass * 16)</code>. Gösterim içindir; yoğunluğu konuşmuyuyoruz.</p>

    <h3>Örnek 2.2: İki nesneye kuvvet</h3>
    <p>Aynı yerçekimi, aynı rüzgar. Küçük daire her ikisine de daha sert cevap verir: ivme = kuvvet / kütle, kütle paydada. Fareye basın; ince olan sağa daha çabuk kaçar, yere de daha çabuk iner.</p>
    ${N.editor("ex22")}
    ${N.tryit([
      { do: "Fareye basın.", expect: "İnce daire kalına göre hem daha hızlı düşer hem daha hızlı sağa gider — kuvvetler kütleye bölünüyor." },
      { do: "moverB’nin kütlesini 10 yapın.", expect: "İkisi de aynı boy ve aynı tembellikte; fark kaybolur." },
    ])}

    ${N.note(
      "Alıştırmalar 2.3–2.5 (orijinal)",
      `<p>2.3: Kenardan sekmek yerine görünmez bir kuvvet nesneyi pencerede tutsun. Kenara yaklaştıkça kuvvet artsın.</p>
      <p>2.4: Sekme dairenin <em>kenarı</em> duvara değince olsun, merkezi değil. (Örnek 2.3’ün kodunda <code>radius</code> ile bu var.)</p>
      <p>2.5: Rüzgar değişken olsun. İnteraktif: farede bir vantilatör, dairelere üflesin.</p>
      <p><a href="https://natureofcode.com/forces/#exercise-23" target="_blank" rel="noopener">2.3</a> ·
      <a href="https://natureofcode.com/forces/#exercise-24" target="_blank" rel="noopener">2.4</a> ·
      <a href="https://natureofcode.com/forces/#exercise-25" target="_blank" rel="noopener">2.5</a></p>`
    )}

    <p>Örnek 2.2’de küçük dairenin daha dramatik cevap vermesi rüzgar için inandırıcıdır: ağır olanı rüzgar zor sürükler. Dünya’nın çekimi için doğru mu?</p>
    <p>Eğik Pisa kulesinden iki farklı kütlede top bırakın. Hangisi önce yere değer? Efsaneye göre Galileo 1589’da dener; ikisi aynı ivmeyle düşer. Yerçekimi kuvveti kütleyle büyür — ağır olana daha çok çeker — ama ivmeyi bulmak için yine kütleye bölersiniz. Çarpım ile bölüm birbirini götürür; <em>g</em> kalır.</p>
    <p>Uydurma yerçekimini bir adım gerçeğe yaklaştırmak: kuvveti kütleyle çarpın, sonra <code>applyForce</code> yine bölsün. Net ivme herkese aynı olur.</p>

    <h3>Örnek 2.3: Kütleyle ölçeklenmiş yerçekimi</h3>
    <p>Düşüş tempo olarak eşitlenir. Rüzgar hâlâ kütleden bağımsızdır; fareye basınca ince daire sağa daha çabuk kaçar. Kenar testi artık yarıçapı hesaba katar: daire, merkezi değil kenarı duvara değince döner (Alıştırma 2.4).</p>
    ${N.editor("ex23")}
    ${N.tryit([
      { do: "Fareye basmadan izleyin.", expect: "İki daire yere aynı anda yaklaşır." },
      { do: "gravityA / gravityB satırlarını silip ham gravity’yi ikisine de verin.", expect: "Örnek 2.2’ye dönüş: küçük olan önce düşer." },
    ])}
    ${N.quiz(
      "Yerçekimi kuvveti kütleyle çarpılıp applyForce kütleye bölüyorsa ivme ne olur?",
      ["Ağır olan daha hızlı düşer", "İkisi de aynı g ile düşer", "Hafif olan daha hızlı düşer"],
      1,
      "a = (m g) / m = g. Rüzgarda çarpma yoktur; hafif olan rüzgara daha çok ivmelenir."
    )}

    <h2>Kuvveti modellemek</h2>

    <p>Uydurmak sizi uzaklara götürür; az önce yerçekimine fena bir yaklaşım uydurduk. Yine de bir gece “gerçekte nasıl işliyor?” diye sorarsınız. O zaman formül devreye girer.</p>

    ${N.note(
      "Formülü okumak",
      `<p>Sağ taraf hesaplanır, sol tarafa yazılır — koddaki atama gibi. Sürtünmede sol taraf istediğiniz kuvvet vektörüdür.</p>
      <p>Ok işareti vektör, şapka birim vektör, tek harf çoğu zaman skaler. Yan yana duran semboller çarpılır.</p>
      <p>Bu bölüm sürtünme, sürükleme, kütleçekim için aynı üç adımı tekrarlar: kavram, yön / büyüklük, <code>applyForce</code>’a gidecek <code>p5.Vector</code>.</p>`
    )}

    <h3>Sürtünme</h3>

    <p>İki yüzey temas edince <strong>sürtünme</strong> çıkar. Dağıtıcı (dissipative) bir kuvvettir: kinetik enerji başka bir forma geçer, “kayıp” gibi durur. Fren: lastiğin hareketi ısıya döner.</p>
    <p>Gerçek model durağan ve kinetik sürtünmeyi ayırır. Biz yalnız kayan hali alıyoruz. Formül:</p>
    ${N.math(
      "f⃗ = −μ N v̂",
      "Sürtünme vektörü: eksi işaret (hıza zıt), sürtünme katsayısı μ, normal kuvvet N, hızın birim vektörü. p5.js’te yön için hızın kopyası alınır, <code>normalize</code> birim yapar, <code>mult(-1)</code> ters çevirir; büyüklük için <code>setMag(μ * N)</code>."
    )}

    ${N.img(
      "02_forces",
      "02_forces_4.png",
      "Şekil 2.3: Kızak kayarken sürtünme, hızın tersine bakar."
    )}

    <p>Yön: hızın tersi. Büyüklük hıza bağlı değildir — o yüzden önce uzunluğu 1 yaparız, sonra katsayıyla ölçekleriz. <code>this.velocity.mult(-1)</code> yazarsanız cismin kendisi tersine döner; kuvvet uygulamazsınız, hızı çalarsınız. Kopya şart.</p>

    ${N.editor("surtenYon")}
    ${N.tryit([
      { do: "Fareyi dairenin sağına, uzağa çekin.", expect: "Gri ok hız (uzun). Kırmızı ok ters yönde, boyu fareye göre değişmez; normalize edilmiş birim, sonra katsayı." },
      { do: "copy satırını silip velocity.normalize() yazın.", expect: "Hızın kendisi 1’e iner; daire neredeyse durur. copy bu yüzden var." },
    ])}

    <p>μ (mü) <strong>sürtünme katsayısı</strong>: buz düşük, zımpara yüksek. Tuvalde uydururuz: <code>let c = 0.1;</code></p>
    <p><em>N</em> <strong>normal kuvvet</strong>: yüzeye dik. Araç yolu ezer, yol Newton’un üçüncü yasasıyla geri basar. Eğik yüzeyde açı ve trigonometri gerekir (Bölüm 3). Şimdilik <code>N = 1</code> “yeterince iyi”: büyüklük doğrudan c.</p>
    <p>Ne zaman uygulayalım? Uydurma dünya, 2B tuval: daire tabana değince. <code>contactEdge</code> yarıçapı kullanır; merkez yere 1 piksel kala değil, kenar değince.</p>
    <p>Sekme de idealleştirilmiş esnek çarpışmaydı: enerji kaybı yok. Tenis topunu bırakın, her sekmede alçalır. Kaba taklit: sekmede hızın bir yüzdesini yiyin, <code>bounce = -0.9</code> (yüzde 10 kayıp, işaret ters).</p>

    <h3>Örnek 2.4: Sürtünme dahil</h3>
    <p>Üç kuvvet: yerçekimi her kare, rüzgar fareyle, sürtünme tabana değince. Sürtünme kodu hızın kopyasını alır, ters çevirir, uzunluğu c yapar. Daire bir süre sonra durur. c’yi ve sekme yüzdesini oynayın; durma süresi değişir.</p>
    ${N.editor("ex24")}
    ${N.tryit([
      { do: "c değerini 0.4 yapın.", expect: "Tabana değince daha çabuk durur." },
      { do: "friction.mult(-1) satırını silin.", expect: "Sürtünme hızla aynı yöne bakar; daire tabanda hızlanır — tuzak." },
    ])}

    ${N.note(
      "Alıştırmalar 2.6–2.7 (orijinal)",
      `<p>2.6: Örnek 2.4’e ikinci nesne. Farklı kütleler, belki her birinin kendi katsayısı. Hesabı <code>Mover</code> metoduna taşımak mantıklı mı?</p>
      <p>2.7: Rüzgar yerine daireyi fareyle fırlatın.</p>
      <p><a href="https://natureofcode.com/forces/#exercise-26" target="_blank" rel="noopener">2.6</a> ·
      <a href="https://natureofcode.com/forces/#exercise-27" target="_blank" rel="noopener">2.7</a></p>`
    )}

    <h3>Hava ve akışkan direnci</h3>

    <p>Cisim sıvı veya gazın içinden geçince de bir direnç vardır: viskoz kuvvet, sürükleme, hava direnci, akışkan direnci — aynı aile (Şekil 2.4). Sonuç yine yavaşlamaktır; hesap sürtünmeden biraz farklıdır.</p>
    ${N.math(
      "F<sub>d</sub> = −½ ρ v<sup>2</sup> A C<sub>d</sub> v̂",
      "Sürükleme kuvveti. ρ yoğunluk, v hızın uzunluğu (<code>velocity.mag()</code>), A kesit alanı, C<sub>d</sub> sürükleme katsayısı, v̂ hızın birim yönü. p5.js simülasyonunda çoğu çarpanı tek bir c içinde toplarız."
    )}

    ${N.img(
      "02_forces",
      "02_forces_5.png",
      "Şekil 2.4: Sürükleme, hıza ve kesite bağlıdır; yön hızın tersinedir."
    )}

    <p>Parça parça, tuvalde ne kalır:</p>
    <ul>
      <li>Eksi yarım bir sabittir. İşareti önemli: hıza zıt. 0.5’i başka uydurma sabitlerin içine gömebiliriz.</li>
      <li>ρ (ro) sıvının yoğunluğu. Şimdilik 1 sayıp yok sayarız.</li>
      <li>v, hız vektörünün uzunluğu: <code>this.velocity.mag()</code>. karesi <code>speed * speed</code>. (Su da akıyorsa göreli hız gerekir; durgun havuz varsayıyoruz.)</li>
      <li>A, gidiş yönüne bakan kesit. Düz kâğıt çok, sivri kalem az sürüklenir. Herkesi daire sayıp bunu da sabite gömeriz.</li>
      <li>C<sub>d</sub> sürtünmedeki μ gibi: ortamın “ne kadar zor geçilir” sayısı.</li>
      <li>v̂ yine <code>normalize</code>. Sürtünme gibi, yön hızın tersi.</li>
    </ul>

    ${N.img(
      "02_forces",
      "02_forces_6.png",
      "Şekil 2.5: Sadeleştirilmiş sürükleme: katsayı çarpı hızın karesi, hıza zıt birim yön."
    )}

    ${N.math(
      "F<sub>d</sub> = −C<sub>d</sub> · v<sup>2</sup> · v̂",
      "Büyüklük hızın karesiyle büyür: hızlı giren daha sert yavaşlar. p5.js: <code>let drag = this.velocity.copy(); drag.mult(-1); drag.setMag(c * speed * speed);</code> — önce kopya, sonra ters, sonra uzunluğu ayarla."
    )}

    <p>Sürtünmeyi tabana değince uyguluyorduk. Şimdi ortamın bir parçası: <code>Liquid</code>. Dikdörtgen (konum, en, boy) plus bir katsayı: hava gibi kolay mı, pekmez gibi zor mu. <code>show</code> dikdörtgeni boyar.</p>
    <p>Konuşma cümlesi: <em>Hareket eden, sıvının içinden geçince sürükleme yer.</em> Nesne diline çevirince:</p>
    <pre><code>if (liquid.contains(mover)) {
  let dragForce = liquid.calculateDrag(mover);
  mover.applyForce(dragForce);
}</code></pre>
    <p><code>contains</code>, dairenin konumunun dikdörtgenin içinde olup olmadığıdır. <code>calculateDrag</code> yukarıdaki sade formülü döndürür. Hızı kopyalar: asıl hızı ters çevirmek, cismin gidişini bir anda flip etmek olurdu.</p>

    <h3>Örnek 2.5: Akışkan direnci</h3>
    <p>Alt yarı gri “su”. Üstte farklı kütlede daireler, eşit aralıklı (rastgele dizi değil; <code>i</code> ile x). Yerçekimi kütleyle ölçekli: havada yan yana düşerler. Suya girince sürükleme kütleye bölünür; küçük olan daha çabuk yavaşlar. Fare tıklayınca başa sarar.</p>
    ${N.editor("ex25")}
    ${N.tryit([
      { do: "Tıklayıp yeniden düşün; küçük ve büyük dairelere bakın.", expect: "Havada tempo benzer; suda küçük olan daha çabuk süzülür." },
      { do: "Liquid katsayısını 0.8 yapın.", expect: "Suya çarpınca bazı daireler geri sekebilir — büyük zaman adımı. Alıştırma 2.8, <code>limit</code>." },
    ])}

    ${N.note(
      "Alıştırmalar 2.8–2.10 (orijinal)",
      `<p>2.8: Katsayı çok büyükse daireler sıvıdan “sekiyor”. Sürükleme durdurur, ters çevirmez. <code>limit</code> ile düzeltin. Farklı yüksekliklerden bırakın.</p>
      <p>2.9: Formülde kesit vardı. Suya düşen kutular; sürükleme, suya çarpan kenarın boyuna bağlı olsun.</p>
      <p>2.10: Sürükleme hıza dik de olabilir (lift). Eğik kanatlı bir uçak simülasyonu.</p>
      <p><a href="https://natureofcode.com/forces/#exercise-28" target="_blank" rel="noopener">2.8</a> ·
      <a href="https://natureofcode.com/forces/#exercise-29" target="_blank" rel="noopener">2.9</a> ·
      <a href="https://natureofcode.com/forces/#exercise-210" target="_blank" rel="noopener">2.10</a></p>`
    )}

    <h3>Kütleçekimsel çekim</h3>

    <p>En ünlü kuvvet. Dünya’da “aşağı düşmek” diye yaşarız; Newton’un başına elma. Resmin tamamı daha kalabalık.</p>
    <p>Dünya elmayı çeker; elma da Dünya’yı çeker (üçüncü yasa). Dünya o kadar ağırdır ki diğer çekimleri ezer. Kütlesi olan her cisim diğerini çeker. Şekil 2.6:</p>

    ${N.img(
      "02_forces",
      "02_forces_7.png",
      "Şekil 2.6: İki cisim arasındaki çekim, kütlelerin çarpımıyla artar, mesafenin karesiyle azalır."
    )}

    ${N.math(
      "F<sub>g</sub> = G · m<sub>1</sub> · m<sub>2</sub> / r<sup>2</sup> · r̂",
      "Çekim kuvveti. G evrensel sabit, m kütleler, r mesafe, r̂ bir cisimden ötekine birim yön. p5.js’te yön <code>p5.Vector.sub</code> ile farktır; büyüklük formül, <code>force.setMag(strength)</code> yönü bırakıp boyu ayarlar."
    )}

    <p>Paydaki her şey büyürse kuvvet büyür: büyük kütle, büyük G. Paydadaki r karesi büyürse kuvvet küçülür: uzaklaştıkça zayıflar. Buna <strong>mesafenin karesiyle ters orantı</strong> denir.</p>
    <p>G gerçekte 6.67428 × 10<sup>−11</sup> m³/kg/s² civarıdır. İnsan için mühim; tuvalde dolaşan daire için bir ölçek düğmesidir. 1 deyip geçmek de bir seçenektir. Kütleleri yok saymak da mümkün; tutarsanız “büyük olan daha çok çeker” oyunu açılır.</p>

    ${N.img(
      "02_forces",
      "02_forces_8.png",
      "Şekil 2.7: Fareye bakan ivme oku — Bölüm 1’in son örneği. Çekim yönü aynı fikir: bir noktadan diğerine fark."
    )}

    <p>Bölüm 1’de daireden fareye ok, iki konumu çıkarmaktı. Burada r̂ de öyle: çekenin konumu eksi çekilenin konumu. p5.js: <code>p5.Vector.sub(this.position, mover.position)</code> — statik <code>sub</code>, iki kutuyu bozmaz, yeni ok üretir. Uzunluğu tam mesafe olduğu için ham haliyle kuvvet saymayız; ya <code>normalize</code> edip çarparız ya da <code>setMag</code> ile boyu formülün sonucuna çekeriz.</p>

    ${N.img(
      "02_forces",
      "02_forces_9.png",
      "Şekil 2.8: Bir konumdan ötekine giden vektör, konumların farkıdır. O okun uzunluğu mesafedir."
    )}

    <pre><code>let force = p5.Vector.sub(position2, position1);
let distance = force.mag();
let magnitude = (G * mass1 * mass2) / (distance * distance);
force.setMag(magnitude);</code></pre>
    <p><code>setMag</code>, Bölüm 1’deki “normalize et, sonra çarp”ın tek çağrısıdır: yön durur, uzunluk tam istediğiniz sayı olur. Mesafe zaten bu okun <code>mag</code>’idir; kareye bölmeden önce onu alın, yoksa normalize ettikten sonra uzunluk 1’dir ve gerçek mesafe kaybolur.</p>

    ${N.img(
      "02_forces",
      "02_forces_10.png",
      "Şekil 2.9: Bir Mover, bir Attractor. Mover, çekene doğru bir kuvvet yer."
    )}

    <p><code>Mover</code> duruyor. Yeni sınıf: <code>Attractor</code> — sabit (veya fareyle sürüklenebilen) bir kütle ve konum. Kim kimi çeksin? Dört yol var: global fonksiyon; çeken <code>attract(mover)</code> desin; hareket eden <code>attractedTo(attractor)</code> desin; ya da çeken bir vektör <em>döndürsün</em>, siz onu bildiğiniz <code>applyForce</code>’a verin. Sonuncusu bu bölümün dilini bozmaz.</p>
    <pre><code>let force = attractor.attract(mover);
mover.applyForce(force);</code></pre>
    <p><code>attract</code> içi yukarıdaki matematik. Bir incelik: mesafe 0’a (veya 0.0001’e) inerse bölme patlar — ya sonsuz kuvvet ya tuvalden fırlayan daire. 500 piksel uzaklıkta kare 250 000’dir; kuvvet yok gibi durur. Çözüm, formüle giren mesafeyi kesmek:</p>
    <p><code>distance = constrain(distance, 5, 25);</code></p>
    <p>p5.js <code>constrain(değer, alt, üst)</code> sayıyı iki sınırın arasına kıstırır. Cetvelde “5’ten yakın, 25’ten uzak sayma” demektir; dairenin gerçek konumu değişmez, yalnızca kuvvet hesabındaki r değişir. Altı silerseniz çarpışma anında fırlama; üstü silerseniz uzakken çekim kaybolur.</p>

    <h3>Örnek 2.6: Çekim</h3>
    <p>Mover’ın bir ilk yatay hızı var; çekenin etrafında dolanır. Çekeni sürükleyebilirsiniz (fareyle üzerine gelince koyulaşır). G = 1 ölçek.</p>
    ${N.editor("ex26")}
    ${N.tryit([
      { do: "Gri çekeni sürükleyin.", expect: "Daire yeni merkeze doğru yolunu eğer." },
      { do: "constrain satırını yorumlayın, daireyi çekene yapıştırın.", expect: "Mesafe küçülünce kuvvet patlar; daire tuvalden fırlar." },
    ])}

    ${N.note(
      "Alıştırma 2.11 (orijinal)",
      `<p>Çapı kütleye değil alana bağlayın: dairenin alanı yarıçapın karesiyle gider, kütleyi çapın karesi gibi düşünün.</p>
      <pre><code>circle(this.position.x, this.position.y, sqrt(this.mass) * 2);</code></pre>
      <p><a href="https://natureofcode.com/forces/#exercise-211" target="_blank" rel="noopener">Exercise 2.11</a></p>`
    )}

    <h3>Örnek 2.7: Birçok Mover, bir çeken</h3>
    <p>On hareket eden, bir çeken. Dizi + döngü: her kare her Mover için <code>attract</code>, <code>applyForce</code>, <code>update</code>. Çeken yine sürüklenebilir. Bölüm 4 parçacık sisteminde ekleme–çıkarma daha uzun durur; fikir burada başlar.</p>
    ${N.editor("ex27")}
    ${N.tryit([
      { do: "Çekeni yavaşça gezdirin.", expect: "Sürü her yeni merkeze savrulur; iz yok, anlık konumlar." },
      { do: "Döngüdeki applyForce satırını yorumlayın.", expect: "Daireler ilk hızlarıyla düz gider; çekim kesilir." },
    ])}

    ${N.note(
      "Alıştırmalar 2.12–2.13 (orijinal)",
      `<p>2.12: Hem mover hem çeken dizisi. Çekenler görünmez olsun; izlerden bir desen çıksın.</p>
      <p>2.13: Her iyi simülasyon çekim olmak zorunda değil. Yakınken zayıf, uzaktayken güçlü bir çekim? Uzakları çekip yakınları iten bir çeken?</p>
      <p><a href="https://natureofcode.com/forces/#exercise-212" target="_blank" rel="noopener">2.12</a> ·
      <a href="https://natureofcode.com/forces/#exercise-213" target="_blank" rel="noopener">2.13</a></p>`
    )}

    <h2>n cisim problemi</h2>

    <p>Sıra: biri ötekini çeker, biri birçoklarını çeker, sonra birçokları birçoklarını çeker.</p>
    <p><code>Mover</code> ile <code>Attractor</code> ayrımı burada yalanlaşır. Üçüncü yasa: çeken çekiliyorsa çekilen de çekenı çeker. Tek tür: <code>Body</code>. Herkes herkesi çeker.</p>
    <p>Buna <strong>n cisim problemi</strong> denir. İki cisim için yörünge denklemle çözülür. Üçüncü cisim eklenince kapalı çözüm yok (Şekil 2.10). Bizim kare kare biriktirmemiz denklem kadar kesin değildir; yine de iki ve üç cismi tuvalde görebilirsiniz.</p>

    ${N.img(
      "02_forces",
      "02_forces_11.png",
      "Şekil 2.10: İki cisim (öngörülebilir yörünge) ile üç cisim (karmaşık yollar)."
    )}

    <p><code>attract</code> artık <code>Body</code>’nin içindedir. İki nesne: A, B’yi çeker; B, A’yi çeker. İlk hızları zıt yatay verirseniz dairesel bir dans çıkar — başlangıç şartı her şeyi belirler.</p>

    <h3>Örnek 2.8: İki cisim çekimi</h3>
    <p>Bu örnekte <code>attract</code> vektör döndürmek yerine doğrudan diğer cisme <code>applyForce</code> uygular: A.attract(B) B’yi A’ye çeker. Çift, üçüncü yasanın kod halidir. Rüzgardaki “havayı modellemeyiz” istisnası burada yok.</p>
    ${N.editor("ex28")}
    ${N.tryit([
      { do: "İlk hızları 0 yapın.", expect: "Dans biter; iki cisim birbirine doğru düşer." },
      { do: "bodyA.attract(bodyB) satırını silin.", expect: "Yalnız B, A’yi çeker; üçüncü yasa bozulur, denge kaybolur." },
    ])}

    ${N.note(
      "Alıştırma 2.14 (orijinal)",
      `<p>Montaldi ve Steckles, düzlemde n cisim “koreografileri”ni sınıflandırır. Dan Gries’in etkileşimli demosu var. Örnek 2.8’e üçüncü (veya daha çok) cisim ekleyin; ilk konum ve hızlarla hangi danslar çıkar?</p>
      <p><a href="https://natureofcode.com/forces/#exercise-214" target="_blank" rel="noopener">Exercise 2.14</a> ·
      <a href="https://doi.org/10.1017/fms.2013.5" target="_blank" rel="noopener">makale</a> ·
      <a href="https://dangries.com/rectangleworld/demos/nBody" target="_blank" rel="noopener">Gries demosu</a></p>`
    )}

    <p>n cisim: dizi. <code>draw</code>’da iç içe iki döngü. “Her i için her j’yi çek” — ama i ile j aynıysa cisim kendini çeker. Mesafe 0, kuvvet patlar. <code>if (i !== j)</code> ile kendini atlayın.</p>

    <h3>Örnek 2.9: n cisim</h3>
    <p>On rastgele kütle, herkes herkesi çeker. İç içe döngü <em>n kare</em> hesap demektir: cisim sayısı ikiye katlanınca iş dörde katlanır. Çoğaltırsanız sketch yavaşlar. Bölüm 5 uzamsal bölme, quadtree, Barnes–Hut ile bu tür hesapları kısaltır.</p>
    ${N.editor("ex29")}
    ${N.tryit([
      { do: "i !== j koşulunu silin.", expect: "Her cisim kendini de çeker; mesafe sıfıra iner, daireler fırlar veya NaN olur." },
      { do: "Cisim sayısını 4 yapın.", expect: "Hesap azalır; yörüngeler daha sakin okunur." },
    ])}

    ${N.note(
      "Alıştırmalar 2.15–2.16 (orijinal)",
      `<p>2.15: Çekimi itmeye çevirin. Hepsi fareye çekilsin, birbirini itsin. Kuvvetlerin şiddetini ve mesafeyi dengeleyin.</p>
      <p>2.16: Cisimler tuval merkezinde sarmal bir galaksi gibi dönsün. Ortada tutan büyük bir cisim gerekebilir. Coding Train “Mutual Attraction” videosunda bir çözüm var.</p>
      <p><a href="https://natureofcode.com/forces/#exercise-215" target="_blank" rel="noopener">2.15</a> ·
      <a href="https://natureofcode.com/forces/#exercise-216" target="_blank" rel="noopener">2.16</a> ·
      <a href="https://thecodingtrain.com/nbody" target="_blank" rel="noopener">Mutual Attraction</a></p>`
    )}

    <h2>Ekosistem</h2>
    <p>Kuvvetleri ekosisteminize katın. Su ile çamur, nehir akıntısı karakterin yürüyüşünü nasıl değiştirir? Yiyecek, avcı: çekim veya itme. İsterseniz soyutlayın — arzu ve hedef de birer kuvvet vektörü olabilir.</p>
    ${N.img(
      "02_forces",
      "02_forces_12.png",
      "Orijinal kitaptaki ekosistem görseli."
    )}

    ${N.resources([
      { kind: "Kitap", title: "Chapter 2 · Forces", url: "https://natureofcode.com/forces/" },
      { kind: "Kod", title: "02_forces örnekleri", url: "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/02_forces" },
      { kind: "Video", title: "Coding Train · Simulating Forces", url: "https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/2-forces/1-simulating-forces" },
      { kind: "Video", title: "Coding Train · Mass and Acceleration", url: "https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/2-forces/2-mass-and-acceleration" },
      { kind: "Video", title: "Coding Train · Friction", url: "https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/2-forces/3-friction" },
      { kind: "Video", title: "Coding Train · Drag", url: "https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/2-forces/4-drag" },
      { kind: "Video", title: "Coding Train · Gravitational Attraction", url: "https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/2-forces/5-gravitational-attraction" },
      { kind: "Video", title: "Coding Train · Mutual Attraction (n-body)", url: "https://thecodingtrain.com/nbody" },
      { kind: "Referans", title: "p5.js · p5.Vector.copy", url: "https://p5js.org/reference/p5.Vector/copy/" },
      { kind: "Referans", title: "p5.js · p5.Vector.div", url: "https://p5js.org/reference/p5.Vector/div/" },
      { kind: "Referans", title: "p5.js · p5.Vector.normalize", url: "https://p5js.org/reference/p5.Vector/normalize/" },
      { kind: "Referans", title: "p5.js · constrain", url: "https://p5js.org/reference/p5/constrain/" },
      { kind: "Sonra", title: "p5.play tutorial (motor değil, kuvvetlerden sonra)", url: "https://github.com/gusanmaz/p5play-tutorial" },
    ])}
    <p><a href="#/ch1">← Vektörler</a></p>
  `,
  editors: {
    ustuneYaz: {
      title: "Üstüne yazmak ile biriktirmek",
      files: [
        {
          name: "sketch.js",
          content: `let sol, sag;

function setup() {
  createCanvas(400, 240);
  sol = new Mover(100, 40, false);
  sag = new Mover(300, 40, true);
}

function draw() {
  background(255);
  stroke(200);
  line(200, 56, 200, height);
  noStroke();
  fill(20);
  text("Sol: ivme = kuvvet (ikinci birinciyi siler)", 8, 18);
  text("Sağ: ivme.add(kuvvet) (ikisi kalır)", 208, 18);
  text("Fare: rüzgar. Sol basılıyken düşmez.", 8, 36);

  let gravity = createVector(0, 0.2);
  let wind = createVector(0.35, 0);
  sol.applyForce(gravity);
  sag.applyForce(gravity);
  if (mouseIsPressed) {
    sol.applyForce(wind);
    sag.applyForce(wind);
  }

  sol.update();
  sol.show();
  sag.update();
  sag.show();

  noStroke();
  fill(20);
  text("v=(" + nf(sol.velocity.x, 1, 2) + ", " + nf(sol.velocity.y, 1, 2) + ")", 40, 228);
  text("v=(" + nf(sag.velocity.x, 1, 2) + ", " + nf(sag.velocity.y, 1, 2) + ")", 240, 228);
}

class Mover {
  constructor(x, y, biriktir) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.biriktir = biriktir;
  }

  applyForce(force) {
    if (this.biriktir) this.acceleration.add(force);
    else this.acceleration = force.copy();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    if (this.position.y > height - 24) {
      this.position.y = height - 24;
      this.velocity.y *= -0.6;
    }
    if (this.position.x > width - 24) {
      this.position.x = width - 24;
      this.velocity.x *= -1;
    } else if (this.position.x < 24) {
      this.position.x = 24;
      this.velocity.x *= -1;
    }
  }

  show() {
    stroke(0);
    fill(127, 180);
    circle(this.position.x, this.position.y, 48);
  }
}`,
        },
      ],
    },
    kopyaKuvvet: {
      title: "div kutuyu değiştirir; copy yeni kutu üretir",
      files: [
        {
          name: "sketch.js",
          content: `let a1, a2, b1, b2;

function setup() {
  createCanvas(400, 240);
  reset();
}

function reset() {
  a1 = new Mover(70, 50, 10);
  a2 = new Mover(130, 50, 2);
  b1 = new Mover(270, 50, 10);
  b2 = new Mover(330, 50, 2);
}

function draw() {
  background(255);
  stroke(200);
  line(200, 72, 200, height);
  noStroke();
  fill(20);
  text("Sol: force.div(kütle) — aynı kutu küçülür", 8, 16);
  text("Sağ: copy, sonra böl — rüzgar 0.50 kalır", 208, 16);

  let g = createVector(0, 0.15);
  a1.applyCopy(g);
  a2.applyCopy(g);
  b1.applyCopy(g);
  b2.applyCopy(g);

  let windL = createVector(0.5, 0);
  let w0 = windL.x;
  a1.applyMut(windL);
  let wA = windL.x;
  a2.applyMut(windL);
  let wB = windL.x;

  let windR = createVector(0.5, 0);
  b1.applyCopy(windR);
  b2.applyCopy(windR);

  noStroke();
  fill(20);
  text("rüzgar başta " + nf(w0, 1, 2), 8, 34);
  text("ağırdan sonra " + nf(wA, 1, 2), 8, 50);
  text("hafiften sonra " + nf(wB, 1, 2), 8, 66);
  text("iki daire de 0.50/kütle alır", 208, 34);

  a1.step();
  a2.step();
  b1.step();
  b2.step();
}

function mousePressed() {
  reset();
}

class Mover {
  constructor(x, y, m) {
    this.mass = m;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.r = m * 3.5;
  }

  applyMut(force) {
    force.div(this.mass);
    this.acceleration.add(force);
  }

  applyCopy(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  }

  step() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    if (this.position.y > height - this.r) {
      this.position.y = height - this.r;
      this.velocity.y *= -0.5;
    }
    if (this.position.x > 198 - this.r && this.position.x < 210) {
      this.position.x = 198 - this.r;
      this.velocity.x *= -0.4;
    }
    if (this.position.x < this.r) {
      this.position.x = this.r;
      this.velocity.x *= -0.4;
    }
    if (this.position.x > width - this.r) {
      this.position.x = width - this.r;
      this.velocity.x *= -0.4;
    }
    stroke(0);
    fill(127, 180);
    circle(this.position.x, this.position.y, this.r * 2);
  }
}`,
        },
      ],
    },
    kitleBol: {
      title: "Aynı F / m — neden kütleye bölüyoruz",
      files: [
        {
          name: "sketch.js",
          content: `let a1, a2, b1, b2;

function setup() {
  createCanvas(400, 240);
  reset();
}

function reset() {
  a1 = new Top(70, 48, 8);
  a2 = new Top(130, 48, 2);
  b1 = new Top(270, 48, 8);
  b2 = new Top(330, 48, 2);
}

function draw() {
  background(255);
  stroke(200);
  line(200, 0, 200, height);
  noStroke();
  fill(20);
  text("Sol: aynı kuvvet F=(0, 0.40)", 8, 18);
  text("Sağ: F = m × g,  g=(0, 0.10)", 208, 18);

  let F = createVector(0, 0.4);
  a1.applyForce(F);
  a2.applyForce(F);
  let g = createVector(0, 0.1);
  b1.applyForce(p5.Vector.mult(g, b1.mass));
  b2.applyForce(p5.Vector.mult(g, b2.mass));

  a1.step();
  a2.step();
  b1.step();
  b2.step();

  noStroke();
  fill(20);
  text("m=8  a=" + nf(0.4 / 8, 1, 2), 40, 228);
  text("m=2  a=" + nf(0.4 / 2, 1, 2), 100, 228);
  text("a=0.10 ikisi", 250, 228);
}

function mousePressed() {
  reset();
}

class Top {
  constructor(x, y, m) {
    this.mass = m;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.r = m * 4;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  step() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    if (this.position.y > height - this.r) {
      this.position.y = height - this.r;
      this.velocity.y *= -0.45;
    }
    stroke(0);
    fill(127, 180);
    circle(this.position.x, this.position.y, this.r * 2);
  }
}`,
        },
      ],
    },
    surtenYon: {
      title: "Sürtünme: copy, normalize, ters",
      files: [
        {
          name: "sketch.js",
          content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  let pos = createVector(80, 150);
  let vel = createVector(mouseX - pos.x, mouseY - pos.y);

  noStroke();
  fill(20);
  text("Gri: hız (fare dairenin merkezine göre).", 8, 20);
  text("Turuncu: kopya + normalize, uzunluk 1 (×40 çizildi).", 8, 38);
  text("Kırmızı: ters × katsayı. Boy, hızın boyu değil.", 8, 56);
  text("|v|=" + nf(vel.mag(), 1, 1) + "   |sürtünme yönü|=1", 8, 78);

  stroke(0);
  fill(127, 180);
  circle(pos.x, pos.y, 36);

  stroke(180);
  strokeWeight(3);
  line(pos.x, pos.y, pos.x + vel.x, pos.y + vel.y);

  let unit = vel.copy();
  unit.normalize();
  stroke(210, 120, 40);
  strokeWeight(5);
  line(pos.x, pos.y, pos.x + unit.x * 40, pos.y + unit.y * 40);

  let friction = vel.copy();
  friction.normalize();
  friction.mult(-1);
  let c = 0.4;
  friction.setMag(c);
  stroke(180, 40, 40);
  strokeWeight(5);
  line(pos.x, pos.y, pos.x + friction.x * 80, pos.y + friction.y * 80);

  noStroke();
  fill(20);
  text("c=" + c + "  (kırmızı ok ×80, görünsün diye)", 8, 228);
}`,
        },
      ],
    },
    ex21: {
      title: "Örnek 2.1: Kuvvetler",
      original: {
        book: "https://natureofcode.com/forces/#example-21-forces",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/02_forces/example_2_1_forces",
      },
      files: [
        {
          name: "mover.js",
          content: `class Mover {
  constructor() {
    this.mass = 1;
    this.position = createVector(width / 2, 30);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(127, 127);
    circle(this.position.x, this.position.y, 48);
  }

  checkEdges() {
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -1;
    } else if (this.position.x < 0) {
      this.velocity.x *= -1;
      this.position.x = 0;
    }
    if (this.position.y > height) {
      this.velocity.y *= -1;
      this.position.y = height;
    }
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

  let gravity = createVector(0, 0.1);
  mover.applyForce(gravity);

  if (mouseIsPressed) {
    let wind = createVector(0.1, 0);
    mover.applyForce(wind);
  }

  mover.update();
  mover.show();
  mover.checkEdges();
}`,
        },
      ],
    },
    ex22: {
      title: "Örnek 2.2: İki nesneye kuvvet",
      original: {
        book: "https://natureofcode.com/forces/#example-22-forces-acting-on-two-objects",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/02_forces/example_2_2_forces_acting_on_two_objects",
      },
      files: [
        {
          name: "mover.js",
          content: `class Mover {
  constructor(x, y, m) {
    this.mass = m;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(127, 127);
    circle(this.position.x, this.position.y, this.mass * 16);
  }

  checkEdges() {
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -1;
    } else if (this.position.x < 0) {
      this.velocity.x *= -1;
      this.position.x = 0;
    }
    if (this.position.y > height) {
      this.velocity.y *= -1;
      this.position.y = height;
    }
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let moverA;
let moverB;

function setup() {
  createCanvas(400, 240);
  moverA = new Mover(120, 30, 10);
  moverB = new Mover(280, 30, 2);
}

function draw() {
  background(255);

  let gravity = createVector(0, 0.1);
  moverA.applyForce(gravity);
  moverB.applyForce(gravity);

  if (mouseIsPressed) {
    let wind = createVector(0.1, 0);
    moverA.applyForce(wind);
    moverB.applyForce(wind);
  }

  moverA.update();
  moverA.show();
  moverA.checkEdges();

  moverB.update();
  moverB.show();
  moverB.checkEdges();
}`,
        },
      ],
    },
    ex23: {
      title: "Örnek 2.3: Kütleyle ölçeklenmiş yerçekimi",
      original: {
        book: "https://natureofcode.com/forces/#example-23-gravity-scaled-by-mass",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/02_forces/example_2_3_gravity_scaled_by_mass",
      },
      files: [
        {
          name: "mover.js",
          content: `class Mover {
  constructor(x, y, m) {
    this.mass = m;
    this.radius = m * 8;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(127, 127);
    circle(this.position.x, this.position.y, this.radius * 2);
  }

  checkEdges() {
    if (this.position.x > width - this.radius) {
      this.position.x = width - this.radius;
      this.velocity.x *= -1;
    } else if (this.position.x < this.radius) {
      this.position.x = this.radius;
      this.velocity.x *= -1;
    }
    if (this.position.y > height - this.radius) {
      this.position.y = height - this.radius;
      this.velocity.y *= -1;
    }
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let moverA;
let moverB;

function setup() {
  createCanvas(400, 240);
  moverA = new Mover(120, 30, 10);
  moverB = new Mover(280, 30, 2);
}

function draw() {
  background(255);

  let gravity = createVector(0, 0.1);

  let gravityA = p5.Vector.mult(gravity, moverA.mass);
  moverA.applyForce(gravityA);

  let gravityB = p5.Vector.mult(gravity, moverB.mass);
  moverB.applyForce(gravityB);

  if (mouseIsPressed) {
    let wind = createVector(0.1, 0);
    moverA.applyForce(wind);
    moverB.applyForce(wind);
  }

  moverA.update();
  moverA.show();
  moverA.checkEdges();

  moverB.update();
  moverB.show();
  moverB.checkEdges();
}`,
        },
      ],
    },
    ex24: {
      title: "Örnek 2.4: Sürtünme dahil",
      original: {
        book: "https://natureofcode.com/forces/#example-24-including-friction",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/02_forces/example_2_4_including_friction",
      },
      files: [
        {
          name: "mover.js",
          content: `class Mover {
  constructor(x, y, m) {
    this.mass = m;
    this.radius = m * 8;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(127, 127);
    circle(this.position.x, this.position.y, this.radius * 2);
  }

  contactEdge() {
    return this.position.y > height - this.radius - 1;
  }

  bounceEdges() {
    let bounce = -0.9;
    if (this.position.x > width - this.radius) {
      this.position.x = width - this.radius;
      this.velocity.x *= bounce;
    } else if (this.position.x < this.radius) {
      this.position.x = this.radius;
      this.velocity.x *= bounce;
    }
    if (this.position.y > height - this.radius) {
      this.position.y = height - this.radius;
      this.velocity.y *= bounce;
    }
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let mover;

function setup() {
  createCanvas(400, 240);
  mover = new Mover(width / 2, 30, 5);
}

function draw() {
  background(255);

  let gravity = createVector(0, 1);
  mover.applyForce(gravity);

  if (mouseIsPressed) {
    let wind = createVector(0.5, 0);
    mover.applyForce(wind);
  }

  if (mover.contactEdge()) {
    let c = 0.1;
    let friction = mover.velocity.copy();
    friction.mult(-1);
    friction.setMag(c);
    mover.applyForce(friction);
  }

  mover.bounceEdges();
  mover.update();
  mover.show();
}`,
        },
      ],
    },
    ex25: {
      title: "Örnek 2.5: Akışkan direnci",
      original: {
        book: "https://natureofcode.com/forces/#example-25-fluid-resistance",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/02_forces/example_2_5_fluid_resistance",
      },
      files: [
        {
          name: "liquid.js",
          content: `class Liquid {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }

  contains(mover) {
    let pos = mover.position;
    return (
      pos.x > this.x &&
      pos.x < this.x + this.w &&
      pos.y > this.y &&
      pos.y < this.y + this.h
    );
  }

  calculateDrag(mover) {
    let speed = mover.velocity.mag();
    let dragMagnitude = this.c * speed * speed;
    let dragForce = mover.velocity.copy();
    dragForce.mult(-1);
    dragForce.setMag(dragMagnitude);
    return dragForce;
  }

  show() {
    noStroke();
    fill(220);
    rect(this.x, this.y, this.w, this.h);
  }
}`,
        },
        {
          name: "mover.js",
          content: `class Mover {
  constructor(x, y, mass) {
    this.mass = mass;
    this.radius = mass * 8;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(127, 127);
    circle(this.position.x, this.position.y, this.radius * 2);
  }

  checkEdges() {
    if (this.position.y > height - this.radius) {
      this.velocity.y *= -0.9;
      this.position.y = height - this.radius;
    }
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let movers = [];
let liquid;

function setup() {
  createCanvas(400, 240);
  reset();
  liquid = new Liquid(0, height / 2, width, height / 2, 0.1);
}

function draw() {
  background(255);
  liquid.show();

  for (let i = 0; i < movers.length; i++) {
    if (liquid.contains(movers[i])) {
      let dragForce = liquid.calculateDrag(movers[i]);
      movers[i].applyForce(dragForce);
    }

    let gravity = createVector(0, 0.1 * movers[i].mass);
    movers[i].applyForce(gravity);

    movers[i].update();
    movers[i].show();
    movers[i].checkEdges();
  }
}

function mousePressed() {
  reset();
}

function reset() {
  for (let i = 0; i < 7; i++) {
    movers[i] = new Mover(32 + i * 52, 0, random(0.5, 3));
  }
}`,
        },
      ],
    },
    ex26: {
      title: "Örnek 2.6: Çekim",
      original: {
        book: "https://natureofcode.com/forces/#example-26-attraction",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/02_forces/example_2_6_attraction",
      },
      files: [
        {
          name: "attractor.js",
          content: `class Attractor {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.mass = 20;
    this.dragOffset = createVector(0, 0);
    this.dragging = false;
    this.rollover = false;
  }

  attract(mover) {
    let force = p5.Vector.sub(this.position, mover.position);
    let distance = force.mag();
    distance = constrain(distance, 5, 25);
    let strength = (G * this.mass * mover.mass) / (distance * distance);
    force.setMag(strength);
    return force;
  }

  show() {
    strokeWeight(4);
    stroke(0);
    if (this.dragging) fill(50);
    else if (this.rollover) fill(100);
    else fill(175, 200);
    circle(this.position.x, this.position.y, this.mass * 2);
  }

  handlePress(mx, my) {
    let d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.mass) {
      this.dragging = true;
      this.dragOffset.x = this.position.x - mx;
      this.dragOffset.y = this.position.y - my;
    }
  }

  handleHover(mx, my) {
    let d = dist(mx, my, this.position.x, this.position.y);
    this.rollover = d < this.mass;
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
          name: "mover.js",
          content: `class Mover {
  constructor(x, y, mass) {
    this.mass = mass;
    this.radius = mass * 8;
    this.position = createVector(x, y);
    this.velocity = createVector(1, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(127, 127);
    circle(this.position.x, this.position.y, this.radius * 2);
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let mover;
let attractor;
let G = 1;

function setup() {
  createCanvas(400, 240);
  mover = new Mover(180, 50, 2);
  attractor = new Attractor();
}

function draw() {
  background(255);

  let force = attractor.attract(mover);
  mover.applyForce(force);
  mover.update();

  attractor.show();
  mover.show();
}

function mouseMoved() {
  attractor.handleHover(mouseX, mouseY);
}

function mousePressed() {
  attractor.handlePress(mouseX, mouseY);
}

function mouseDragged() {
  attractor.handleHover(mouseX, mouseY);
  attractor.handleDrag(mouseX, mouseY);
}

function mouseReleased() {
  attractor.stopDragging();
}`,
        },
      ],
    },
    ex27: {
      title: "Örnek 2.7: Birçok Mover, bir çeken",
      original: {
        book: "https://natureofcode.com/forces/#example-27-attraction-with-many-movers",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/02_forces/example_2_7_attraction_with_many_movers",
      },
      files: [
        {
          name: "attractor.js",
          content: `class Attractor {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.mass = 20;
    this.G = 1;
    this.dragOffset = createVector(0, 0);
    this.dragging = false;
    this.rollover = false;
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
    strokeWeight(4);
    stroke(0);
    if (this.dragging) fill(50);
    else if (this.rollover) fill(100);
    else fill(175, 200);
    circle(this.position.x, this.position.y, this.mass * 2);
  }

  handlePress(mx, my) {
    let d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.mass) {
      this.dragging = true;
      this.dragOffset.x = this.position.x - mx;
      this.dragOffset.y = this.position.y - my;
    }
  }

  handleHover(mx, my) {
    let d = dist(mx, my, this.position.x, this.position.y);
    this.rollover = d < this.mass;
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
          name: "mover.js",
          content: `class Mover {
  constructor(x, y, mass) {
    this.mass = mass;
    this.radius = mass * 8;
    this.position = createVector(x, y);
    this.velocity = createVector(1, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(127, 127);
    circle(this.position.x, this.position.y, this.radius * 2);
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let movers = [];
let attractor;

function setup() {
  createCanvas(400, 240);
  for (let i = 0; i < 10; i++) {
    movers[i] = new Mover(random(width), random(height), random(0.5, 3));
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
}

function mouseMoved() {
  attractor.handleHover(mouseX, mouseY);
}

function mousePressed() {
  attractor.handlePress(mouseX, mouseY);
}

function mouseDragged() {
  attractor.handleHover(mouseX, mouseY);
  attractor.handleDrag(mouseX, mouseY);
}

function mouseReleased() {
  attractor.stopDragging();
}`,
        },
      ],
    },
    ex28: {
      title: "Örnek 2.8: İki cisim çekimi",
      original: {
        book: "https://natureofcode.com/forces/#example-28-two-body-attraction",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/02_forces/example_2_8_two_body_attraction",
      },
      files: [
        {
          name: "mover.js",
          content: `class Body {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = 8;
    this.r = sqrt(this.mass) * 2;
  }

  attract(body) {
    let force = p5.Vector.sub(this.position, body.position);
    let d = constrain(force.mag(), 5, 25);
    let G = 1;
    let strength = (G * (this.mass * body.mass)) / (d * d);
    force.setMag(strength);
    body.applyForce(force);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.set(0, 0);
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(127, 100);
    circle(this.position.x, this.position.y, this.r * 4);
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let bodyA;
let bodyB;
let G = 1;

function setup() {
  createCanvas(400, 240);
  bodyA = new Body(200, 40);
  bodyB = new Body(200, 200);
  bodyA.velocity = createVector(1, 0);
  bodyB.velocity = createVector(-1, 0);
}

function draw() {
  background(255);

  bodyA.attract(bodyB);
  bodyB.attract(bodyA);

  bodyA.update();
  bodyA.show();
  bodyB.update();
  bodyB.show();
}`,
        },
      ],
    },
    ex29: {
      title: "Örnek 2.9: n cisim",
      original: {
        book: "https://natureofcode.com/forces/#example-29-n-bodies",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/02_forces/example_2_9_n_bodies",
      },
      files: [
        {
          name: "body.js",
          content: `class Body {
  constructor(x, y, m) {
    this.mass = m;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(127, 127);
    circle(this.position.x, this.position.y, this.mass * 16);
  }

  attract(other) {
    let force = p5.Vector.sub(this.position, other.position);
    let distance = force.mag();
    distance = constrain(distance, 5, 25);
    let strength = (G * this.mass * other.mass) / (distance * distance);
    force.setMag(strength);
    return force;
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let bodies = [];
let G = 1;

function setup() {
  createCanvas(400, 240);
  for (let i = 0; i < 10; i++) {
    bodies[i] = new Body(random(width), random(height), random(0.1, 2));
  }
}

function draw() {
  background(255);

  for (let i = 0; i < bodies.length; i++) {
    for (let j = 0; j < bodies.length; j++) {
      if (i !== j) {
        let force = bodies[j].attract(bodies[i]);
        bodies[i].applyForce(force);
      }
    }
    bodies[i].update();
    bodies[i].show();
  }
}`,
        },
      ],
    },
  },
});
