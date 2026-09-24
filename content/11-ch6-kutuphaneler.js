registerChapter({
  id: "ch6",
  title: "6. Fizik kütüphaneleri",
  short: "6. Kütüphaneler",
  icon: "🧱",
  original: "https://natureofcode.com/physics-libraries/",
  originalCode:
    "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/06_libraries",
  html: `
    <p style="font-style:italic;color:var(--muted);">“A library implies an act of faith / Which generations still in darkness hid / Sign in their night, in witness of the dawn.” — Victor Hugo</p>

    ${N.img(
      "06_libraries",
      "06_libraries_1.png",
      "Yaşayan kök köprüler (fotoğraf: Arshiya Urveeja Bose). Hindistan’ın Meghalaya eyaletinde Khasi ve Jaiñtia halkları, muson yağmurunda köyler arası yolu bambu ve köklerle büyütür. Kökler çevreye göre sertleşir; bir yay gibi bağlanır. Bu bölümün resmi: bağlantı, esneme, yıllarca biriken fizik."
    )}

    <p>Meghalaya’da sel, iki köyün arasını her yıl yeniden keser. İnsanlar her seferinde çelik bir köprü indirmek yerine ağacın kökünü yönlendirir: bambunun içinden geçirir, yıllar içinde kök kalınlaşır, yürünecek bir yol olur. Fizik kütüphanesi de böyle bir köprüdür. Siz hâlâ vektörü, kuvveti, çarpışmayı anlarsınız; ama her yeni çokgende bir daha Pisagor yazmazsınız. Kökü başkası yıllarca büyütmüştür.</p>

    <p>Bu kitaba kadar elinizde şunlar vardı. Vektör nedir, kuvvet nedir, salınım nedir: günlük resimden koda. Sonra o matematiği p5.js’te nesneyle yazdınız. En sonda otonom ajanlar kendi hedefiyle yürüdü. Hepsinde kural aynıydı: her kare siz hızı konuma eklediniz. Dünya sizin Euler’inizdi.</p>

    <p>Siz ilk değilsiniz. “Açık kaynak fizik motoru” diye aratınca bir gününüz gider. O zaman dürüst soru: madem hazır kod var, neden 1–5. bölümleri yazdık?</p>
    <p>Üç sebep. Bir: kütüphanenin belgesini okumak da vektör, kuvvet, açı ister; o dil yoksa satırlar büyü gibi durur. İki: kütüphane matematiği gizler, sizin JavaScript’inizi otomatik kısaltmaz; <code>Engine</code>, <code>Bodies</code>, <code>Composite</code> diye yeni bir sözlük öğrenirsiniz. Üç: hayaliniz kütüphanenin sattığı listenin dışında kalabilir. O zaman sınırı görmek, sınırı aşmaktan önce gelir.</p>
    <p>Bu bölüm iki JavaScript kütüphanesine bakıyor: <a href="https://brm.io/matter-js" target="_blank" rel="noopener">Matter.js</a> ve <a href="http://haptic-data.com/toxiclibsjs" target="_blank" rel="noopener">Toxiclibs.js</a>. Amaç bir markayı ezberletmek değil. Belge okumayı, “bu dünya kimin, çizim kimin” sorusunu her motora taşıyabilmek. Matter.js bu sayfada canlı durur: editör <code>libraries: ["matter"]</code> deyince Matter.js 0.19.0 ile p5.js birlikte yüklenir. Toxiclibs.js iframe’de ayrı bir evrendir; onu kavram ve orijinal bağlantıyla okuruz, yay/ip fikrini Matter.js kısıtıyla tuvalde deneriz. p5.play ayrı derste durur: orada sprite ve tuş, burada gövde ve kısıt.</p>
    <p>Motor tek değil. Aşağıda p5.js masasının komşularını, bu dersin yıllardır kullandığı Phaser’ı, C# Unity’yi ve başka dillerdeki akrabaları aynı sözlükle okuyoruz. Sonra Matter.js’e giriyoruz: ofis kurulur, kutu düşer, siz çizersiniz.</p>

    ${N.note(
      "Bu bölümün çıktısı",
      `<ul>
        <li>Fizik motoru, oyun kütüphanesi ve tam oyun motorunun aynı Newton’u farklı mutfakta pişirdiğini ayırmak</li>
        <li>p5.js masasında Matter.js, Toxiclibs.js, p5.play / Planck ve Box2D’nin kim ne iş yaptığını söylemek</li>
        <li>Phaser Arcade ile Phaser Matter’ı, Unity <code>Rigidbody2D</code> ile p5.play <code>Sprite</code>’ı aynı fikir olarak tanımak</li>
        <li>Matter.js <code>Engine</code>’in dünyayı ilerleten ofis, p5.js <code>draw</code>’ın o ofise her kare “kutu nerede?” diye soran ressam olduğunu ayırmak</li>
        <li><code>Bodies</code> ile gövde üretmek, <code>Composite.add</code> ile dünyaya koymak, unutunca neden boş tuval kaldığını görmek</li>
        <li>Durağan zemin, çokgen, birleşik gövde, kısıt, fare teli, <code>Body.applyForce</code>, çarpışma olayı</li>
        <li>Toxiclibs.js’in Verlet yay dünyasını kavramak; canlı kod için orijinal kitap/GitHub</li>
      </ul>`
    )}

    <h2>Neden fizik kütüphanesi?</h2>

    <p>Tek daire yerçekimiyle düşsün istiyorsanız kütüphane şart değil. Bölüm 2 zaten onu yazdırdı. Senaryo değişsin: yüz tane daire değil, çarpık çokgen. Birbirine çarpınca gerçek gibi sekmesi. İşte o cümlede yeni bir kelime duruyor: <strong>çarpışma</strong>.</p>
    <p>Bu kitap kuvveti uzun uzun işledi; çarpışmayı erteledi. İki ayrı soru var. Birincisi <strong>tespit</strong>: iki şekil kesişiyor mu? İkincisi <strong>çözüm</strong>: çarptıktan sonra hızlar ne olsun? İki daire için tespit hâlâ günlük: merkezler arası uzaklık, yarıçaplar toplamından küçükse iç içedir.</p>
    ${N.img(
      "06_libraries",
      "06_libraries_2.png",
      "Şekil 6.1: İki daire, yarıçapları r₁ ve r₂. Merkezler arası uzaklık r₁ + r₂’den küçükse çarpışırlar."
    )}
    ${N.math(
      "d &lt; r<sub>1</sub> + r<sub>2</sub>",
      "p5.js’te uzaklık <code>dist(ax, ay, bx, by)</code>: birinci dairenin merkezi, ikinci dairenin merkezi. <code>d</code> bu sayı. İki yarıçapı toplayıp karşılaştırırsınız. Bu yalnızca tespit; sekmenin yeni hızını vermez."
    )}
    <p>Çözümde duruyorum. Hayat kısa; daire çözümünü bitirseniz sıradaki dikdörtgen, sonra içbükey çokgen, sonra sarkaçın yaya çarpması. Her birinin ayrı geometrisi var. İnsanlar bunu yıllarca yazdı. Matter.js ve Toxiclibs.js o emeğin JavaScript hali. Taslakta “çarpışma” kelimesi geçtiyse fizik motoru öğrenme vakti gelmiş demektir.</p>

    <h2>Hangi mutfak, aynı hamur</h2>

    <p>Pizzacı her akşam fırını tuğla tuğla örmez. Hamuru yoğurmayı bilir: tuz, su, bekleyiş. Fırın hazırdır; yanlış fırına koyarsanız hamur yanmaz, istediğiniz gibi de pişmez. Fizik kütüphanesi o fırındır. Bölüm 1–5 hamurdur: vektör, kuvvet, Euler. Bundan sonra seçtiğiniz paket — Matter.js, p5.play, Phaser, Unity — aynı Newton’u başka mutfakta pişirir. İsimler değişir, fikir durur.</p>
    <p>Bu derste birkaç yıl Phaser ayrı bölümlerdi. p5.js de birkaç yıldır aynı programda duruyor. Bu kitap p5.js’te kalır: Nature of Code o dilde yazıldı, vektör dersi ile motor aynı tuvalde konuşur. Phaser unutulmuş bir eski konu değildir. HTML5 2D oyunda hâlâ kalabalık çerçevedir; stajda C# ve Unity görürseniz Inspector’daki <code>Rigidbody2D</code> yine kütle, sürtünme, kuvvet ister. Yanlış yazınca bozulan şey değişmez: gövde dünyaya eklenmezse düşmez, hızı her kare ezerseniz çarpışma yalan söyler, metre ile pikseli karıştırırsanız kutu milimetre gibi titrer.</p>

    <h3>Üç raf</h3>
    <p>Mağazada üç raf yan yana durur. Aynı “fizik” yazısını taşıdıkları için karışırlar. Karışınca belgeyi yanlış okursunuz.</p>
    <table class="data">
      <thead><tr><th>Raf</th><th>Ne verir</th><th>Ne vermez</th><th>Bu derste</th></tr></thead>
      <tbody>
        <tr>
          <td>Fizik motoru</td>
          <td>Gövde, dünya, adım, çarpışma çözümü</td>
          <td>Sprite resmi, kamera, tuş haritası</td>
          <td>Matter.js (bu bölüm), Toxiclibs.js (yay)</td>
        </tr>
        <tr>
          <td>Oyun kütüphanesi</td>
          <td>Sprite + motoru bir API’de</td>
          <td>Sahne editörü, derleme, mağaza paketi</td>
          <td>p5.play (Planck üstünde), Phaser (JavaScript)</td>
        </tr>
        <tr>
          <td>Oyun motoru (editörlü)</td>
          <td>Sahne ağacı, Inspector, derleme</td>
          <td>Bu kitabın tuval cümlelerini</td>
          <td>Unity (C#), Godot (GDScript / C#)</td>
        </tr>
      </tbody>
    </table>
    <p>p5.play “fizik motoruyum” demez; sprite doğurur, altında Planck.js (Box2D’nin JavaScript hali) çalışır — ayrı ders: <a href="#/p5play">p5.play</a>. Phaser “fizik motoruyum” demez; iki motor sunar — ayrı ders: <a href="#/phaser">Phaser · Arcade ve Matter</a>. Unity’de fizik bir bileşendir: <code>Rigidbody2D</code> — ayrı ders: <a href="#/unity">Unity / C#</a>. Godot, Box2D metre dünyası, Pymunk: <a href="#/motorlar">diğer motorlar</a>. Matter.js ise yalnızca ofistir: çizimi siz, zamanı o; bu bölüm onu açar.</p>
    ${N.warn(
      "Tuzak: kütüphane ile motoru aynı şey sanmak",
      `<p>Phaser’a “fizik kütüphanesi” derseniz Arcade mi Matter mı sorusu kaybolur. p5.play’e “Matter.js” derseniz <code>Engine.create</code> ararsınız; orada <code>new Sprite</code> vardır. Unity’ye “p5.play’in C# hali” derseniz sahne ağacı ve bileşen modeli yutulur. Önce rafı söyleyin, sonra fonksiyonu.</p>`
    )}

    <h3>p5.js masasında kim durur</h3>
    <p>p5.js çizim dilidir. Fizik paketini siz eklersiniz. Bu kitabın ilk baskısında Matter.js yoktu; örnekler <a href="https://box2d.org/" target="_blank" rel="noopener">Box2D</a> ile duruyordu. Erin Catto 2006’da C++ öğreticisi olarak başladı; <em>Crayon Physics</em>, <em>Angry Birds</em>, <em>Limbo</em> bu motora yaslandı. Box2D gerçek bir fizik dünyasıdır: metre, kilogram, saniye. Tuval ise piksel. İki dünya arasında sürekli çeviri yazarsınız: “bu kutu 1,5 metre, tuvalde 80 piksel.” Matter.js piksel konuşur; p5.js köprüsü bu yüzden daha kısa. Planck.js, Box2D’nin JavaScript’e taşınmış hâli; p5.play onu gizler.</p>
    <table class="data">
      <thead><tr><th>Paket</th><th>Konuştuğu dil</th><th>Ne zaman</th></tr></thead>
      <tbody>
        <tr>
          <td><a href="https://brm.io/matter-js" target="_blank" rel="noopener">Matter.js</a></td>
          <td>Piksel; <code>Engine</code>, <code>Bodies</code>, kısıt</td>
          <td>Çokgen, menteşe, fare teli; çizimi p5.js’te siz</td>
        </tr>
        <tr>
          <td><a href="http://haptic-data.com/toxiclibsjs" target="_blank" rel="noopener">Toxiclibs.js</a></td>
          <td>Verlet parçacık ve yay</td>
          <td>Kumaş, ip, yumuşak zincir; katı kutu değil</td>
        </tr>
        <tr>
          <td><a href="https://p5play.org/" target="_blank" rel="noopener">p5.play</a></td>
          <td>Sprite, <code>kb</code>, kamera; altta Planck</td>
          <td>Zemin, jeton, tuş; oyun ödevi. <a href="#/p5play">p5.play bölümü</a></td>
        </tr>
        <tr>
          <td>Planck.js / Box2D (doğrudan)</td>
          <td>Metre dünyası, C++ Box2D sözlüğü</td>
          <td>Ölçek çevirisi yazmaya razıysanız; p5.play bunu gizler</td>
        </tr>
        <tr>
          <td>cannon-es, ammo.js, Rapier</td>
          <td>3B rijit cisim (JavaScript / WASM)</td>
          <td>Three.js sahnesi; bu kitap 2B tuvalde kalır</td>
        </tr>
      </tbody>
    </table>
    <p>Bu üç-beş isim rafın tamamı değildir. p5.js fizik getirmez; paketi siz eklersiniz. Aşağıdaki liste “Matter ve p5.play’den ibaret mi?” sorusunun cevabıdır: hayır. Hepsi aynı Newton sözlüğünü konuşur; çizim yine p5.js veya Three.js’dedir.</p>
    <table class="data">
      <thead><tr><th>Paket</th><th>Ne</th><th>p5.js ile</th></tr></thead>
      <tbody>
        <tr>
          <td>Matter.js</td>
          <td>2B katı cisim, piksel, kısıt</td>
          <td>Bu bölüm; <code>libraries: ["matter"]</code></td>
        </tr>
        <tr>
          <td>p5.play / Planck.js</td>
          <td>Sprite API; altta Box2D soyundan Planck</td>
          <td>Ayrı ders. Planck’ı doğrudan da yazabilirsiniz — metre ölçeği gizlenmez.</td>
        </tr>
        <tr>
          <td>box2d-html5 / box2d.js</td>
          <td>Eski NoC baskısının motoru; metre dünyası</td>
          <td>Shiffman’ın ilk örnekleri; bugün Matter daha kısa köprü</td>
        </tr>
        <tr>
          <td>Toxiclibs.js</td>
          <td>Verlet yay / kumaş, katı kutu değil</td>
          <td>Bu bölümde kavram; canlı kod orijinal kitapta</td>
        </tr>
        <tr>
          <td>p2.js</td>
          <td>2B rijit cisim (Schteppe); eski ama belgesi durur</td>
          <td>p5.js <code>draw</code> ile aynı ofis/kalem ayrımı</td>
        </tr>
        <tr>
          <td>p5.collide2D</td>
          <td>Yalnızca tespit: kesişiyor mu?</td>
          <td>Motor değildir. Sekme, kütle, kısıt yok. Karıştırmayın.</td>
        </tr>
        <tr>
          <td>cannon-es, ammo.js, Oimo, Rapier, Jolt</td>
          <td>3B; WASM veya JS</td>
          <td>Three.js / WebGL sahne. 2B tuval dersi değil.</td>
        </tr>
        <tr>
          <td>Chipmunk.js, physics.js, verlet-js</td>
          <td>Eski veya dar: 2B / parçacık</td>
          <td>Belge okunur; bu kitapta canlı örnek yok</td>
        </tr>
        <tr>
          <td>Kaplay (Kaboom)</td>
          <td>Kısa prototip; AABB fizik</td>
          <td>p5.js değil; Arcade’e yakın his</td>
        </tr>
      </tbody>
    </table>
    <p>Toxiclibs.js yay ağıdır, Matter.js katı cisimdir. İkisini aynı sketchtte “hangisi daha iyi fizik” diye yarıştırmayın: kumaş ile tuğla aynı soruyu cevaplamaz. p5.collide2D’yi “fizik motoru” sanmak ikinci tuzaktır: dairelerin kesiştiğini söyler, yeni hız vermez. p5.play’i bu bölümde çalıştırmıyoruz; sözlüğü Matter.js ile kurunca sprite satırları orada kısalır.</p>

    <h3>JavaScript’te oyun çerçevesi: Phaser</h3>
    <p>Phaser, tarayıcıda 2B oyun için çerçevedir: sahne, atlas, tuş, fizik. p5.js bir sketch’tir; Phaser bir oyun projesidir. Bu yüzden eski dönem planında Phaser ayrı bölümlerdi — sahne geçişi, preload, Arcade body. p5.js sketch’i “<code>setup</code> bir kez, <code>draw</code> her kare” diye durur. Phaser’da <code>update</code> benzer işi görür; sahne sınıfı, yükleme kuyruğu, kamera başka bir dosya düzenidir.</p>
    <p>Phaser 3 size iki fizik sunar. Karıştırmayın.</p>
    <table class="data">
      <thead><tr><th></th><th>Arcade Physics</th><th>Matter Physics</th></tr></thead>
      <tbody>
        <tr>
          <td>Ne</td>
          <td>Hızlı kutu (AABB): kenarları eksene paralel dikdörtgen</td>
          <td>Bu bölümdeki Matter.js’in Phaser içine gömülmüş hâli</td>
        </tr>
        <tr>
          <td>Dönme fiziği</td>
          <td>Yok veya süs; kutu yuvarlanarak düşmez</td>
          <td>Var; açı, kısıt, çokgen</td>
        </tr>
        <tr>
          <td>Ne zaman</td>
          <td>Platformer, jeton, düşman — Mario hissi</td>
          <td>Yıkılan kule, sarkaç, Angry Birds hissi</td>
        </tr>
        <tr>
          <td>Bu kitaptaki akraba</td>
          <td>Bölüm 1–2’de sizin yazdığınız Euler + basit çarpışma</td>
          <td>Bu sayfadaki Matter.js ofisi</td>
        </tr>
      </tbody>
    </table>
    ${N.warn(
      "Tuzak: aynı sahnede Arcade + Matter",
      `<p>Phaser izin verir gibi durur; iki dünya ayrı adım atar. Arcade gövde Matter gövdeyi “görmez”. p5.js’te bunun kardeşi: bir kutuyu Matter.js’te, birini sizin <code>x += vx</code> satırınızda yürütmek. Çarpışma sessizce yok olur.</p>`
    )}
    <p>PixiJS çizim içindir, fizik getirmez. Kaboom (şimdi Kaplay) kısa prototip dilidir. Three.js 3B sahnedir; fizik için cannon-es veya Rapier ayrı eklenir. “JavaScript oyun kütüphanesi” araması sizi fizik motoruna götürmez; rafı sorun.</p>

    <h3>C# ve editörlü motorlar</h3>
    <p>Staj ilanı çoğu zaman C# ve Unity ister. Orada tuval yok, Inspector var. Kutuya <code>Rigidbody2D</code> eklersiniz: kütle, yerçekimi ölçeği, sürüklenme. <code>AddForce</code> Bölüm 2’deki <code>applyForce</code>’tur; <code>velocity</code> Bölüm 1’deki hız vektörüdür. 2B fizik Unity’de Box2D soyundandır. 3B fizik PhysX’tir (NVIDIA): araba, ragdoll, karmaşık collider. İkisini bir sahnede “ikisi de Rigidbody” diye eşitlemeyin — 2B ve 3B ayrı dünyadır, Phaser Arcade/Matter ayrımı gibi.</p>
    <p>Godot aynı rafa başka dil koyar: GDScript günlük derste, C# da bağlanır. <code>RigidBody2D</code>, <code>CharacterBody2D</code> (oyuncu için kinematik yürüyüş), <code>StaticBody2D</code>. p5.play’deki dynamic / kinematic / static üçlüsü burada bileşen adı olur. Yeni Godot sürümleri Jolt fizik motorunu da seçebilir; isim değişir, gövde yine dünyaya eklenir.</p>
    <p>Unity istemezseniz C# hâlâ durur. MonoGame veya FNA çizim verir; fizik için VelcroPhysics (eski adı Farseer) Box2D’nin C# portudur. “C# = Unity” değil; C# dil, Unity o dilde bir mutfaktır.</p>

    <h3>Başka diller, aynı sözlük</h3>
    <p>C++ hâlâ motorların yazıldığı yerdir: Box2D (2B), Bullet ve PhysX (3B), Chipmunk2D. Java’da libGDX, Box2D’yi JNI ile bağlar. Python zayıf raf değildir: Pymunk (Chipmunk), PyBox2D, PyBullet, MuJoCo, Panda3D aynı ofisleri kapıdan çağırır; Pygame yalnızca kalemdir. Rust’ta Rapier hem 2B hem 3B’dir; WASM ile tarayıcıya da iner. Unreal C++ / Blueprint’te Chaos (eski PhysX hattı) 3B dünyayı yürütür.</p>
    <p>Yeni bir belgede şu kelimeleri arayın. Bulursanız bu bölümü okumuşsunuz demektir.</p>
    <table class="data">
      <thead><tr><th>Kelime</th><th>Günlük resim</th><th>Yanlış yazınca</th></tr></thead>
      <tbody>
        <tr>
          <td>World / Scene / Space</td>
          <td>Fizik ofisi; gövdelerin listesi</td>
          <td>Gövde ofise girmez, çizilir ama çarpışmaz</td>
        </tr>
        <tr>
          <td>Body / Rigidbody / Sprite (fizikli)</td>
          <td>Kütleli cisim: konum, hız, açı</td>
          <td>Süs resmi sanırsınız; kuvvet işe yaramaz</td>
        </tr>
        <tr>
          <td>Collider / Fixture / Shape</td>
          <td>Çarpışan kabuk; görünen resimden ayrı olabilir</td>
          <td>Karakter resmi büyük, kabuk küçük: duvardan kayar</td>
        </tr>
        <tr>
          <td>static / dynamic / kinematic</td>
          <td>Duvar / düşen kutu / asansör</td>
          <td>Zemini dynamic bırakırsanız yer de düşer</td>
        </tr>
        <tr>
          <td>Constraint / Joint / Spring</td>
          <td>İp, menteşe, yay</td>
          <td>İki gövdeyi <code>x</code> eşitleyerek “bağlarsanız” motoru ezer</td>
        </tr>
        <tr>
          <td>Step / Update vs Draw</td>
          <td>Ofis zamanı / sizin kaleminiz</td>
          <td>Zamanı iki kez ilerletirseniz dünya iki kat hızlı akar</td>
        </tr>
      </tbody>
    </table>
    ${N.quiz(
      "Platformer ödevi p5.js + tuş + jeton. Hangisi?",
      [
        "Doğrudan Box2D metre dünyası; her kare ölçek çevirin",
        "p5.play (Planck gizlenmiş) veya Phaser Arcade",
        "Toxiclibs.js Verlet ağı; her jeton bir yay",
      ],
      1,
      "Jeton ve tuş oyun dilidir. Matter.js de yeter ama sprite, kb, kamera sizde kalır. Toxiclibs.js kumaş içindir."
    )}
    ${N.quiz(
      "Unity 2B sahnede kutunun düşmesi için ne eklenir?",
      [
        "Yalnızca Sprite Renderer — resim yerçekimini bilir",
        "Rigidbody2D (ve bir collider); AddForce / gravity Scale Inspector’da",
        "p5.js createVector; Unity otomatik çevirir",
      ],
      1,
      "Resim düşmez. Gövde düşer. p5.js Unity’ye çevirilmez; fikir aynıdır, paket ayrıdır."
    )}

    <p>Şimdi ofise giriyoruz. Matter.js yüklenir, dünya akar, p5.js çizer. Yukarıdaki tabloyu kapatmayın: <code>Engine</code> ofis, <code>Bodies</code> gövde, <code>Composite.add</code> “ofise koy” demektir — Unity’de <code>AddComponent</code>, Phaser’da <code>this.matter.add.rectangle</code>, p5.play’de <code>new Sprite</code>.</p>

    <h2>Matter.js’i yüklemek</h2>

    <p>Liam Brummitt’in 2014’te başlattığı Matter.js, tuvaldeki kutuya “sen bir gövdesin” der. p5.js web editöründe her yeni sketcin bir <code>index.html</code>’i vardır. Kütüphane oradaki <code>&lt;script src="…"&gt;</code> satırlarıyla gelir: bir adres, tarayıcının indirdiği bir JavaScript dosyası. Bu adrese CDN denir; aynı kütüphaneyi milyonlarca sayfa oradan çeker.</p>
    ${N.img(
      "06_libraries",
      "06_libraries_3.png",
      "Şekil 6.2: p5.js web editöründe sol menüden index.html. p5.js satırının altına Matter.js satırı eklenir."
    )}
    <p>p5.js satırı zaten durur. Matter.js için hemen altına, kitapla aynı sürüm:</p>
    <p><code>&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js"&gt;&lt;/script&gt;</code></p>
    <p>Sürüm numarası kilit: yarın kütüphane yeni bir şey bozsa sizin sketchniz 0.19.0’da kalır. Bu web kitabının canlı editörü aynı işi sizin yerinize yapar. Matter.js kullanan örnekte yapılandırma <code>libraries: ["matter"]</code> der; iframe p5.js 1.9.0 ile Matter.js 0.19.0’ı birlikte yükler. Bu projenin <code>index.html</code>’ine dokunmanız gerekmez.</p>

    <h2>Matter.js’e bakış</h2>

    <p>1–5. bölümlerin sahte kodu şuydu. <code>setup</code>: nesneleri yarat. <code>draw</code>: kuvvetleri topla, F = m a uygula, konumu güncelle, çiz. Matter.js’te <code>draw</code> kısalır: yalnızca çiz. Hareketi motor hesaplar. Cazibe bu.</p>
    <p>Resim: bir fizik ofisi kiralarınız. <code>setup</code>’ta ofise “dünyamda şu kutular, şu zemin olsun” dersiniz. Her kare kapıyı çalar, “kutular şimdi nerede, hangi açıda?” diye sorarsınız. Cevabı p5.js ile kare, daire, çokgen olarak çizersiniz. Ofis siz sormadan da (içeride) zamanı ilerletebilir; ama tuval sizin kaleminizdir. Sormazsanız ofisin sayıları ile sizin çizdiğiniz kare ayrılır: görünür dünya ile çarpışan dünya iki ayrı yer olur.</p>
    <p>Kötü haber: ofise eşya koymak birkaç adım ister. Sözlük de yeni.</p>
    <ul>
      <li><strong>Engine:</strong> simülasyonun kendisi. Dünyayı ve zamanın nasıl aktığını tutar.</li>
      <li><strong>Bodies (gövdeler):</strong> dünyadaki şeyler. Konum, hız, şekil. 1–5. bölümlerdeki Mover’ın kütüphane hali. “Gövde” insan bedeni demek değil; motordaki genel ad.</li>
      <li><strong>Composite:</strong> gövde grubu. Dünyanın kendisi bir composite. Gövde, dünyaya eklenmeden fizikte yok sayılır.</li>
      <li><strong>Constraints (kısıtlar):</strong> iki gövdeyi bağlayan tel, menteşe, fare ipi.</li>
      <li><strong>Vector:</strong> yine büyüklük ve yön; ama paket <code>p5.Vector</code> değil, <code>Matter.Vector</code>.</li>
    </ul>
    <p>Eşik burada. Kavram aynı; isim değişir. Matter.js’in p5.js’in vektörünü bilmesi beklenmez. Karşılaştırma:</p>
    <table class="data">
      <thead><tr><th>p5.js</th><th>Matter.js</th></tr></thead>
      <tbody>
        <tr><td><code>createVector(1, -1)</code></td><td><code>Matter.Vector.create(1, -1)</code></td></tr>
        <tr><td><code>a.add(b)</code> — a değişir</td><td><code>Matter.Vector.add(a, b, a)</code> — üçüncü argüman sonuç kutusu</td></tr>
        <tr><td><code>c = p5.Vector.add(a, b)</code></td><td><code>c = Matter.Vector.add(a, b)</code></td></tr>
        <tr><td><code>v.mult(4)</code></td><td><code>v = Matter.Vector.mult(v, 4)</code></td></tr>
        <tr><td><code>v.mag()</code> / <code>v.normalize()</code></td><td><code>Matter.Vector.magnitude(v)</code> / <code>Matter.Vector.normalise(v)</code></td></tr>
      </tbody>
    </table>
    <p>p5.js’te <code>circle()</code> globaldir: <code>p5.circle()</code> yazmazsınız. Bu yüzden kendi değişkeninize <code>circle</code> diyemezsiniz. Matter.js her şeyi <code>Matter.</code> önekiyle korur. Takma ad: <code>const { Engine, Bodies, Composite } = Matter;</code> — buna nesne parçalama (destructuring) denir. <code>const</code> burada bilinçli: <code>Engine</code>’i sonra yanlışlıkla başka şeye bağlarsanız dünya susar. Bölüm 0’da <code>let</code> yeterdi; dış kütüphanede isim kilidi işe yarar.</p>
    <p>Matter.js metotları durağandır: vektörün kendi <code>add</code>’i yok. Sonucu üçüncü argümana yazarsınız ya da yeni vektörü değişkene atarsınız. Belge: <a href="https://brm.io/matter-js/docs/" target="_blank" rel="noopener">Matter.js docs</a>.</p>

    <h3>Engine</h3>
    <p><code>Engine.create()</code> hem motoru hem dünyayı doğurur. Varsayılan yerçekimi vektörü (0, 1): x’te sıfır, y’de aşağı. p5.js tuvalinde +y zaten aşağı büyür; ok aynı yöne bakar. Değiştirmek: <code>engine.gravity.x</code> ve <code>engine.gravity.y</code>. İkisini sıfırlarsanız uzay gibi durur — Örnek 6.9 bunu kullanacak.</p>
    ${N.warn(
      "Tuzak: Engine yaratıp dünyayı ilerletmemek",
      `<p>Ofis kurulur, kutu eklenir, <code>draw</code> yalnızca <code>square(this.x, this.y)</code> çizerse kutu donar. Matter.js zamanı kendiliğinden p5.js karesine bağlanmaz. Ya Örnek 6.1’deki <code>Runner</code> çalışır, ya da sizin <code>draw</code>’ınız her kare <code>Engine.update(engine)</code> çağırır. İkisini birden çalıştırmak zamanı çift sayar: kutular fazla hızlı düşer.</p>`
    )}

    <h3>Gövdeler (Bodies)</h3>
    <p>Gövde, dünyadaki hareket eden (veya durağan) şeydir. Matter.js onları fabrikasyon fonksiyonlarla üretir: <code>new Body()</code> değil, <code>Bodies.rectangle(x, y, w, h)</code>. p5.js’te <code>createVector</code> da bir fabrikadır; <code>new p5.Vector</code> yazmazsınız. <code>Bodies.rectangle</code> imzası p5.js <code>rect</code>’ine benzer; ama çizmez, geometriyi bellekte kurar.</p>
    ${N.warn(
      "Tuzak: rect varsayılanı köşe, Bodies.rectangle merkez",
      `<p>p5.js <code>rect(x, y, w, h)</code> sol üst köşeden başlar. Matter.js dikdörtgeninde <code>(x, y)</code> gövdenin <strong>merkezi</strong>dir — p5.js’te <code>rectMode(CENTER)</code> açınca eşleşir. Modu unutup köşeden çizerseniz kare ekranda durur, çarpışma başka yerde olur. Ofis doğru, ressam kaymış.</p>`
    )}
    <p>Sürtünme, sekme, yoğunluk varsayılanla gelir. İsterseniz nesne yazımı (object literal) ile seçenek geçersiniz: <code>{ friction: 0.5, restitution: 0.8, density: 0.002 }</code>. İlk hız ise seçenekte değil: <code>Body.setVelocity(box, Vector.create(2, 0))</code> ve <code>Body.setAngularVelocity(box, 0.1)</code>.</p>
    <p>Üretilen gövde değişkende durur; dünyada henüz yoktur. <code>Composite.add(engine.world, box)</code> şart. Unutursanız JavaScript hata vermez: siz bir kare çizersiniz, ofis o kutuyu bilmez, yerçekimi işlemez.</p>
    ${N.note(
      "Alıştırma 6.1 (orijinal)",
      `<p>Daire gövde nasıl üretilir? Boşlukları doldurun: <code>let ball = ____.____(____, ____, ____, options);</code></p>
      <p><a href="https://natureofcode.com/physics-libraries/#exercise-61" target="_blank" rel="noopener">Exercise 6.1</a> · belge: <a href="https://brm.io/matter-js/docs/classes/Bodies.html" target="_blank" rel="noopener">Matter.Bodies</a></p>`
    )}
    ${N.quiz(
      "Bodies.circle için doğru çağrı hangisi? options sürtünme ve sekme taşıyor.",
      [
        "new Circle(x, y, radius, options)",
        "Bodies.circle(x, y, radius, options)",
        "circle(x, y, radius * 2) — p5.js çizimi yeter, gövde gerekmez",
      ],
      1,
      "Fabrika Bodies.circle: merkez x, y ve yarıçap. p5.js circle yalnızca çizer; Matter.js dünyasına gövde koymaz."
    )}

    <h3>Render</h3>
    <p>Gövde dünyadaysa Matter.js çarpışmayı ve konumu siz el sürmeden günceller. Çizmek ayrı iş. Asıl yol: her kare konum sorup p5.js ile çizmek — bir sonraki başlık. Hızlı kontrol için Matter.js’in <code>Render</code> sınıfı var: hata ayıklama çizimi. Güzel oyun grafiği değil; dünyanın doğru kurulduğunu görmek.</p>
    <p><code>Render.create</code> bir ayar nesnesi ister. p5.js tuvalini <code>createCanvas</code> döndürür; asıl HTML tuvali onun <code>.elt</code> özelliğindedir. Matter.js p5.js nesnesini tanımaz, <code>canvas.elt</code> ister. Boyut varsayılanı 800×600’dür; <code>options: { width, height }</code> ile tuvale uydurursunuz. Sonra <code>Render.run(render)</code> ve zaman için <code>Runner.run(runner, engine)</code>. <code>draw</code> yoktur: boyayan da, zamanı sayan da Matter.js’tir.</p>

    <h3>Örnek 6.1: Matter.js’in kendi Render ve Runner’ı</h3>
    <p>Kutu sağa fırlar, zemine çarpar, döner. Tel çerçeve Matter.js’in kalemi. p5.js burada yalnızca tuvali sayfaya koyar. Bu yüzden kutu “p5 karesi” gibi boyanmaz: ofis hem hesaplar hem çizer.</p>
    ${N.editor("ex61")}
    ${N.tryit([
      { do: "Body.setVelocity üçüncü satırındaki 5’i 12 yapın.", expect: "Kutu zemine daha hızlı çarpar; Render hâlâ Matter.js, p5.js draw yok." },
      { do: "Runner.run satırını yorumlayın.", expect: "Kutu donar: ofis kurulmuştur ama zaman ilerlemez." },
    ])}

    <h2>Matter.js ile p5.js</h2>

    <p>Matter.js dünyadaki gövdelerin listesini <code>engine.world.bodies</code> içinde tutar. Render/Runner o listeyi çizebilir. Biz kendi listemizi tutacağız: hangi kutu hangi renkte, hangisi ömrünü doldurdu. Fazladan bir dizi bellek yer; karşılığında p5.js alışkanlığı durur. Dosya düzeni Şekil 6.3: <code>sketch.js</code> ve <code>box.js</code>.</p>
    ${N.img(
      "06_libraries",
      "06_libraries_4.png",
      "Şekil 6.3: Tipik p5.js sketchnin dosyaları. Ana dosya sketch.js; kutu sınıfı ayrı box.js."
    )}

    <h3>Örnek 6.2: Rahat bir p5.js sketch’i, biraz Matter.js ister</h3>
    <p>Fare basılıyken diziye kutu eklenir, <code>show</code> kare çizer. Fizik yok: kutular farede çivi gibi kalır. Soru: kodu az değiştirip düşmelerini nasıl sağlarız?</p>
    ${N.editor("ex62")}
    ${N.tryit([
      { do: "this.w = 16 yerine 40 yapın (box.js).", expect: "Kareler büyür, hâlâ düşmez. Boyut p5.js’te; yerçekimi yok." },
    ])}

    <h3>Adım 1: Sketch’e Matter.js</h3>
    <p>Takma adlar ve <code>engine = Engine.create()</code> <code>setup</code>’ta. <code>draw</code>’da bir satır: <code>Engine.update(engine)</code>. Bu çağrı dünyayı bir zaman dilimi ileri alır. Örnek 6.1’deki Runner’ın yerini p5.js döngüsü alır. <code>draw</code> artık koşucudur. Çift koşu yok: ya Runner, ya <code>Engine.update</code>.</p>
    <p><code>Engine.update</code> içeride gövdeleri tarar, çarpışmaya bakar, konumları yazar. Varsayılan adım yeter; ince ayar <a href="https://brm.io/matter-js/docs/classes/Engine.html#method_update" target="_blank" rel="noopener">Engine.update belgesinde</a>.</p>

    <h3>Adım 2: Her kutuyu bir gövdeye bağlamak</h3>
    <p>Eski <code>Box</code> <code>this.x</code>, <code>this.y</code> tutuyordu. Yeni söz: “Konumu Matter.js’e bırakıyorum.” Kurucu başlangıç x, y alır, <code>Bodies.rectangle</code> ile gövde üretir, <code>Composite.add</code> ile dünyaya koyar, x ve y’yi unutur. Genişliği <code>this.w</code> diye saklamak çizim için rahattır; Matter.js boyutu köşe listesi olarak tutar.</p>

    <h3>Adım 3: Gövdeyi çizmek</h3>
    <p>Eski <code>square(this.x, this.y, this.w)</code> artık yalan söyler: o x, y kurucudaki doğum yeridir, bu karenin adresi değil. Her kare ofise sorun:</p>
    <p><code>let position = this.body.position;</code> ve <code>let angle = this.body.angle;</code></p>
    <p>Kare döner. p5.js’te döndürmek, kareyi olduğu yerde çevirmez: kalemin koordinat sistemini çevirir. Önce sistemin (0, 0)’ını kutunun merkezine taşıyın, sonra döndürün, sonra (0, 0)’da kare çizin, sonra sistemi eski haline getirin.</p>
    ${N.note(
      "p5.js: translate, rotate, push / pop",
      `<p><code>translate(x, y)</code> kalemi değil, <strong>koordinat sistemini</strong> kaydırır. Yeni (0, 0) eski (x, y) olur. <code>rotate(a)</code> o yeni orijinin etrafında döndürür. Matter.js açısı radyandır; p5.js varsayılanı da radyan. <code>angleMode(DEGREES)</code> açtıysanız <code>rotate(this.body.angle)</code> kutuyu onlarca tur çevirir — <code>rotate(90)</code> tuzağının kardeşi.</p>
      <p><code>push()</code> o anki kaydırma/döndürmeyi yığar; <code>pop()</code> geri alır. İkinci kutuya geçmeden <code>pop</code> yoksa kaymalar toplanır: ikinci kare birincinin omzundan çizilir. <code>rectMode(CENTER)</code> kareyi (0, 0) merkezli çizer; Matter.js gövdesiyle örtüşür.</p>`
    )}
    <p>Sol kutu doğduğu x, y’de kalır: fizik ofiste yürür, ressam eski adrese bakır. Sağ kutu her kare <code>body.position</code> sorar. İkisi de aynı dünyada; yalnız sağ düşer gibi görünür.</p>
    ${N.editor("sorVsSakla")}
    ${N.tryit([
      { do: "Engine.update satırını yorumlayın.", expect: "Sağ kutu da donar. Sormak yetmez; ofisin zamanı da işlemelidir." },
    ])}
    ${N.quiz(
      "Her kare body.position sormazsanız ne olur?",
      [
        "Matter.js otomatik olarak p5.js karesini boyar",
        "Gövde fizikte hareket eder; sizin square hâlâ doğduğu yerde kalır",
        "JavaScript hata verir, sketch durur",
      ],
      1,
      "Hata yok. İki dünya ayrılır: ofis sayıları günceller, kalem eski this.x / this.y’ye bakar."
    )}
    <p>Aynı gövde, iki kalem. Kırmızı: <code>rotate</code> var, <code>translate</code> yok — kare tuval köşesinin etrafında uçar. Siyah: önce merkeze git, sonra dön, (0, 0)’da çiz.</p>
    ${N.editor("cevirNeden")}
    ${N.tryit([
      { do: "Siyah kutunun translate satırını yorumlayın.", expect: "Siyah da kırmızıya benzer; ikisi köşe etrafında döner." },
    ])}

    <p>Kutu tuvalden düşünce diziden <code>splice</code> yetmez. Ofiste hayalet gövde kalır, görünmez çarpışır. <code>Composite.remove(engine.world, this.body)</code> ile hem diziyi hem dünyayı silin. Döngü geriye doğru: silerken indeksi atlamazsınız — Bölüm 4 parçacık listesi.</p>

    ${N.note(
      "Alıştırma 6.2 (orijinal)",
      `<p>Örnek 6.2’den başlayıp Matter.js fiziğini ekleyin. Tuvalden çıkan gövdeleri silin. Kitaptaki sonuç aşağıda; kutuları istediğiniz gibi çizebilirsiniz.</p>
      <p><a href="https://natureofcode.com/physics-libraries/#exercise-62" target="_blank" rel="noopener">Exercise 6.2</a></p>`
    )}
    <p>Üç adım bir arada: fare kutusu düşer, açı döner, alt kenarı geçince hem dizi hem dünya temizlenir. Sayı tuvalde kutu adedi.</p>
    ${N.editor("ex62sonuc")}
    ${N.tryit([
      { do: "removeBody çağrısını yorumlayın, splice dursun.", expect: "Kareler kaybolur gibi durur; hayaletler ofiste kalır, yeniler onlara çarpar." },
    ])}

    <h2>Durağan Matter.js gövdeleri</h2>

    <p>Kutular farede doğup varsayılan yerçekimiyle düşer. Yolu kesen sabit bir eşik istiyorsanız seçenek <code>isStatic: true</code>. Fabrika yine <code>Bodies.rectangle</code>; bu gövde asla kıpırdamaz. Ayrı bir <code>Boundary</code> sınıfı p5.js dikdörtgenini bu durağan gövdeye bağlar. Düşen kutuların boyunu rastgele seçmek çeşit katar.</p>

    <h3>Örnek 6.3: Düşen kutular, eşikler</h3>
    <p>İki raf. Kutular üstten yağar, seker, kayar. Eşik hareket etmediği için <code>show</code> hâlâ kurucudaki x, y, w, h ile çizer; her kare Matter.js sormaya gerek yok. Sekme ve sürtünmeyi durağan gövdede değil, düşen kutuda ayarlayın.</p>
    ${N.editor("ex63")}
    ${N.tryit([
      { do: "Box’ta restitution: 0.6 yerine 1.2 yapın.", expect: "Kutular raflardan fazla zıplar. Eşik durağan; sekme düşende." },
      { do: "İkinci Boundary satırını yorumlayın.", expect: "Sağ raf yok olur; kutular doğrudan alta düşer." },
    ])}

    <h2>Çokgenler ve şekil grupları</h2>

    <p>Dikdörtgen ve daire yetmeyince Şekil 6.4’teki gibi bir karakter istersiniz: birkaç şeklin tek gövde gibi davranması.</p>
    ${N.img(
      "06_libraries",
      "06_libraries_5.png",
      "Şekil 6.4: Birden fazla parçadan kurulu birleşik gövde."
    )}
    <p>Düzenli çokgen: <code>Bodies.polygon(x, y, 6, radius)</code> altıgen. Yamuk: <code>Bodies.trapezoid</code>. Daha genel: <code>Bodies.fromVertices(x, y, vertices, options)</code> — bir vektör dizisi, köşeler.</p>

    <h3>Örnek 6.4: Çokgen şekiller</h3>
    <p>Beş köşe, saat yönü. Gövde düşer, p5.js <code>beginShape</code> / <code>vertex</code> / <code>endShape(CLOSE)</code> ile aynı köşeleri çizer. Matter.js köşeleri dünya koordinatında tuttuğu için ayrıca <code>translate</code> gerekmez: her <code>v.x</code>, <code>v.y</code> zaten tuval yeridir.</p>
    ${N.editor("ex64")}
    ${N.tryit([
      { do: "restitution: 0.2 yerine 1 yapın.", expect: "Çokgenler raflarda daha canlı seker." },
    ])}
    ${N.img(
      "06_libraries",
      "06_libraries_6.png",
      "Şekil 6.5: Özel çokgende köşeler saat yönünde, sol üstten başlayarak."
    )}
    <p>İki kural. Köşeler saat yönünde. Şekil dışbükey olsun: her iç açı 180° veya daha küçük. İçbükey (bir kenarı içeri çöken) şekli Matter.js tek parçadan sevmez; birkaç dışbükey parçadan birleşik gövde kurarsınız.</p>
    ${N.img(
      "06_libraries",
      "06_libraries_7.png",
      "Şekil 6.6: İçbükey bir şekil, birkaç dışbükey parçayla kurulur."
    )}
    ${N.warn(
      "Tuzak: köşeleri ters sırada yazmak",
      `<p>Saat yönünün tersi veya rastgele sıra, <code>fromVertices</code>’in geometriyi bozmasına yol açar: şekil incelir, hiç görünmez, çarpışma kayar. Taslak kâğıtta köşeleri numaralayın, sonra diziye aynı sırayla yazın.</p>`
    )}
    ${N.note(
      "Alıştırma 6.3 (orijinal)",
      `<p><code>Bodies.fromVertices</code> ile kendi dışbükey çokgeninizi çizin. Kitaptaki olasılıklar Şekil’de.</p>
      <p><a href="https://natureofcode.com/physics-libraries/#exercise-63" target="_blank" rel="noopener">Exercise 6.3</a></p>`
    )}
    ${N.img(
      "06_libraries",
      "06_libraries_8.png",
      "Alıştırma 6.3: dışbükey çokgen fikirleri (orijinal şekil)."
    )}

    <p>Tek köşe listesi yetmezse <strong>birleşik gövde</strong>: lolipop, ince dikdörtgen artı daire. İki gövde üretip <code>Body.create({ parts: [part1, part2] })</code> ile yapıştırırsınız. İkisinin merkezini aynı (x, y) verirseniz daire çubuğun ortasına biner (Şekil 6.7). Daireyi çubuk yarı genişliği kadar kaydırın (Şekil 6.8).</p>
    ${N.img(
      "06_libraries",
      "06_libraries_9.png",
      "Şekil 6.7: Dikdörtgen ve daire aynı (x, y) merkezde — lolipop değil, hedef tahtası."
    )}
    ${N.img(
      "06_libraries",
      "06_libraries_10.png",
      "Şekil 6.8: Daire, dikdörtgen merkezine göre yatay kaymış. Lolipopun başı çubuğun ucunda."
    )}

    <h3>Örnek 6.5: Bir gövdede birden fazla şekil</h3>
    <p>Çizerken birleşik gövdenin açısı ortak; her parçanın konumu ayrı. <code>this.part1.position</code> ve <code>this.part2.position</code>’a translate, sonra ortak <code>this.body.angle</code> ile rotate. Çubuk dikdörtgen, baş daire.</p>
    ${N.editor("ex65")}
    ${N.tryit([
      { do: "part2’de x + this.w / 2 yerine x yazın.", expect: "Baş çubuğun ortasına biner; Şekil 6.7." },
    ])}
    <p>Tuvalde gördüğünüz şey, ofisin geometrisiyle birebir örtüşmezse hata mesajı gelmez. Çarpışma “yanlış yerde” durur. Tuzak: birleşik gövdenin <code>this.body.position</code>’ı çubuğun merkezi değil, çubuk ile başın <strong>kütle merkezi</strong>dir. Çubuğu oraya, başı elle kaydırarak çizerseniz resim kayar. Fare basılıyken parça konumları (doğru), basılı değilken kütle merkezi (yanlış). Yazı tuvalde hangi kalemin açık olduğunu söyler.</p>
    ${N.editor("ex65yanlis")}
    ${N.note(
      "Alıştırma 6.4 (orijinal)",
      `<p>Birden fazla şekli tek gövdeye bağlayıp küçük bir yaratık çizin. Matter.js iskelet; saç, renk, görüntü p5.js. Çözümü buraya yazmıyorum.</p>
      <p><a href="https://natureofcode.com/physics-libraries/#exercise-64" target="_blank" rel="noopener">Exercise 6.4</a></p>`
    )}

    <h2>Matter.js kısıtları</h2>

    <p>Kısıt, iki gövdeyi bağlar: sarkaç, köprü, yumuşak karakter, dingilde teker. Üç tür: uzunluk kısıtı ve menteşe (<code>Constraint</code>), fare teli (<code>MouseConstraint</code>).</p>

    <h3>Uzunluk kısıtları</h3>
    ${N.img(
      "06_libraries",
      "06_libraries_11.png",
      "Şekil 6.10: Kısıt, her gövdede bir çapa noktasından diğerine uzanan bağlantı."
    )}
    <p>Sabit uzunlukta bir tel; Bölüm 3’teki yay kuvvetine yakın. Çapa, gövde merkezine göre bir nokta. <code>stiffness</code> 0–1: 1 sert çubuk, 0 neredeyse yok. Seçenekler: <code>bodyA</code>, <code>bodyB</code>, <code>pointA</code>, <code>pointB</code>, <code>length</code>, <code>stiffness</code>. Yalnız iki gövde zorunlu; çapa varsayılanı merkez, uzunluk o anki uzaklık, sertlik 0.7. <code>damping</code> enerjiyi yer, <code>angularStiffness</code> açı esnekliğini keser. Kısıt da dünyaya eklenir: <code>Composite.add(engine.world, constraint)</code>.</p>

    <h3>Örnek 6.6: Matter.js sarkaç</h3>
    <p>Durağan çapa dairesi, salınan ağırlık, ikisini bağlayan kol. Kol bir çizgidir: iki <code>position</code> arasında <code>line</code>. Ağırlığın üstündeki kısa çizgi dönüşü gösterir; <code>translate</code> + <code>rotate(this.bob.angle)</code>.</p>
    ${N.editor("ex66")}
    ${N.tryit([
      { do: "Constraint seçeneklerine stiffness: 0.05 ekleyin.", expect: "Kol yay gibi esner; varsayılan 0.7 daha çubuğa yakındır." },
    ])}
    ${N.note(
      "Alıştırma 6.5 (orijinal)",
      `<p>Bir dizi daireyi (veya dikdörtgeni) kısıtla köprü yapın. Uçları <code>isStatic</code> ile kilitleyin. Sertliği değiştirin. Eklemlerin geometrisi yok; delik olmaması için aralık önemli.</p>
      <p><a href="https://natureofcode.com/physics-libraries/#exercise-65" target="_blank" rel="noopener">Exercise 6.5</a></p>`
    )}
    <p>Kitaptaki köprü resmi Matter.js kısıtı: uçlar kilitli, ortası sarkar, üstten kutular düşer. Alıştırmanın çözümü değil; aynı fikrin canlı hali. Boşluk ve sertlikle oynayın.</p>
    ${N.editor("kopru")}

    <h3>Menteşe kısıtları</h3>
    ${N.img(
      "06_libraries",
      "06_libraries_12.png",
      "Şekil 6.11: Menteşe: iki gövde tek noktada, uzunluk sıfır."
    )}
    <p>Matter.js ayrı bir menteşe sınıfı taşımaz. <code>Constraint</code> uzunluğu 0, sertliği 1: gövde bir noktada döner, kopmaz. Yel değirmeni için tek dikdörtgen yeter; ikinci gövde yok, çapa bir nokta (<code>pointB: { x, y }</code>).</p>

    <h3>Örnek 6.7: Dönen yel değirmeni</h3>
    <p>Kanat gövdedir; altındaki dikey çizgi değildir. Çizgi yalnızca resim: ofise eklenmediği için parçacıklara çarpmaz. Motorla p5.js yan yana dururken, fiziğe katılmayan süs çizebilirsiniz — yeter ki o süsü <code>Bodies</code> yapmayın.</p>
    ${N.editor("ex67")}
    ${N.tryit([
      { do: "stiffness: 1 yerine 0.2 yapın.", expect: "Kanat menteşeden kayar gibi davranır; 0’lık tel gevşer." },
    ])}
    ${N.note(
      "Alıştırma 6.6 (orijinal)",
      `<p>Tekerlekleri menteşeli bir araç. Teker boyu, yer, <code>stiffness</code> hareketi değiştirir.</p>
      <p><a href="https://natureofcode.com/physics-libraries/#exercise-66" target="_blank" rel="noopener">Exercise 6.6</a></p>`
    )}
    ${N.img(
      "06_libraries",
      "06_libraries_13.png",
      "Alıştırma 6.6: menteşeli tekerlekli araç iskeleti (orijinal şekil)."
    )}

    <h3>Fare kısıtları</h3>
    <p>Gövdeyi fareye yapıştırmak için <code>body.position.x = mouseX</code> yazmak cazip. Bu ışınlanma. Newton’un merdivenini bir an yok sayarsınız; Matter.js o merdiveni yeniden yazamaz. Yatak odasından mutfağa ışınlanmak kolay hayal, hareket yasasına sığmaz. Fare kısıtı başka resim: belinize ip, mutfaktaki arkadaş çeker. Arkadaş fareniz.</p>
    <p><code>Mouse.create(canvas.elt)</code> HTML tuvalini dinler. <code>MouseConstraint.create(engine, { mouse })</code> dünyaya eklenince tıkladığınız gövde ipin ucuna gelir. Tek tek bağlamanız gerekmez. <code>constraint: { stiffness: 0.7 }</code> ipi biraz lastik yapar.</p>
    ${N.warn(
      "Tuzak: position = mouse",
      `<p>Atama çalışır gibi durur: kutu fareyi takip eder. Sonra başka kutuya çarptırın; hız ve açı bozulur, gövde titrer veya dünyadan kaçar. Matter.js “buradaydı, şimdi şurada” diye hız çıkaramaz. İp (MouseConstraint) çeker; ışınlamaz.</p>`
    )}

    <h3>Örnek 6.8: MouseConstraint</h3>
    <p>İki kutu, dört duvar. Kutuyu sürükleyin; 0.7 sertlik lastik gibi uzar. <code>damping</code> ve <code>angularStiffness</code> ile ipin huysuzluğu değişir. Tuvalde yazı: hangi kutu, hangi açı.</p>
    ${N.editor("ex68")}
    ${N.tryit([
      { do: "stiffness: 0.7 yerine 0.05 yapın.", expect: "İp çok yumuşak; kutu fareyi gecikmeyle kovalar." },
      { do: "stiffness: 1 yapın.", expect: "İp neredeyse sert; kutu fareye yapışır." },
    ])}

    <h2>Başka kuvvetler</h2>

    <p>Bölüm 2’de rüzgâr, sürtünme, çekim birikti. Matter.js’te şimdiye kadar tek küresel kuvvet: yerçekimi vektörü. Özel kuvvet için <code>Body.applyForce(gövde, nokta, kuvvet)</code>. Bölüm 2’de kuvvet hep merkezdeydi. Burada uyguladığınız piksel de seçilir: kenara iterken kutu döner.</p>
    <p>Çekim, Örnek 2.6’daki gibi: fark vektörü, uzaklık, G m / d², yön. Sayılar <code>Matter.Vector.sub</code>, <code>magnitude</code>, <code>normalise</code>, <code>mult</code> ile. Attractor durağan daire; movers <code>frictionAir: 0</code> (hava yok) ve motor yerçekimi (0, 0).</p>
    ${N.math(
      "F = G · m / d<sup>2</sup>",
      "Çeken durağan gövdenin kütlesi Matter.js’te sonsuz sayılır; formülde yalnız hareket edenin <code>mover.body.mass</code>’i durur. p5.js <code>constrain(d, 5, 25)</code> uzaklığı 5 ile 25 piksel arasına sıkıştırır: sıfıra bölme ve patlayan ivme yok. G burada 0.02 — Bölüm 2’deki el yapımı G ile aynı birim değil; deneme sayısı."
    )}

    <h3>Örnek 6.9: Matter.js ile çekim</h3>
    <p>Sürü merkezdeki kara daireye çekilir, birbirine çarpar. Kütle, alan ve <code>density</code> (varsayılan 0.001) ile gelir; büyük daire ağırdır. Durağan çeken sonsuz kütleli sayılır, movers onu yerinden oynatamaz.</p>
    ${N.editor("ex69")}
    ${N.tryit([
      { do: "G = 0.02 yerine 0.08 yapın (attractor.js).", expect: "Sürü merkeze daha sert yığılır." },
      { do: "engine.gravity satırını silin.", expect: "Varsayılan aşağı çekim geri gelir; sürü yere yığılır." },
    ])}
    ${N.note(
      "Alıştırmalar 6.7–6.8 (orijinal)",
      `<p>6.7: Örnek 6.7’nin <code>Windmill</code> sınıfına <code>Body.applyForce</code> ile sürekli dönen bir <code>spin</code> yazın (motor). 6.8: Bölüm 5’ten bir steering örneğini Matter.js’e çevirin. Sürü çarpışmalı nasıl durur?</p>
      <p><a href="https://natureofcode.com/physics-libraries/#exercise-67" target="_blank" rel="noopener">6.7</a> ·
      <a href="https://natureofcode.com/physics-libraries/#exercise-68" target="_blank" rel="noopener">6.8</a></p>`
    )}

    <h2>Çarpışma olayları</h2>

    <p>“Çarpışınca ekstra bir şey olsun: renk, ses, kırılma.” İlk fikir: konumları kendiniz karşılaştırın. O zaman Matter.js’in geometrisini yeniden yazıyorsunuz. Motor zaten kesişmeyi biliyor; size haber vermesini isteyin. Buna olay dinleyici denir. p5.js’te <code>mousePressed</code> fareye basılınca çağrılır. Matter.js’te isim hazır değil, siz bağlarsınız:</p>
    <p><code>Matter.Events.on(engine, "collisionStart", handleCollisions);</code></p>
    <p><code>collisionActive</code> çarpışma sürdükçe, <code>collisionEnd</code> ayrılınca. Başlangıç çoğu skeç için yeter. Geri çağrı bir <code>event</code> alır; <code>event.pairs</code> o adımdaki gövde çiftleri. Her çiftte <code>bodyA</code>, <code>bodyB</code>.</p>
    <p>Matter.js sizin <code>Particle</code> sınıfınızı tanımaz. Köprü: her gövdenin <code>plugin</code> nesnesi. Kurucuda <code>this.body.plugin.particle = this</code> — mevcut <code>plugin</code>’i silmeden alan ekleyin. <code>plugin = this</code> yazmak başka eklentiyi ezer. Geri çağrıda <code>bodyA.plugin.particle</code> sizin nesnenizdir. Duvar da çarpışır; <code>instanceof Particle</code> ile “ikisi de parçacık mı?” diye bakın.</p>

    <h3>Örnek 6.10: Çarpışma olayları</h3>
    <p>Daireler zemine ve birbirine çarpınca renk değiştirir. Duvarla çarpışma rengi bozmaz: <code>instanceof</code> eler.</p>
    ${N.editor("ex610")}
    ${N.tryit([
      { do: "instanceof kontrolünü kaldırıp change’i her çifte çağırın.", expect: "Zemine her değişte de renk değişir; duvarın plugin.particle’ı yoktur, hata veya sessiz atlama." },
    ])}
    ${N.quiz(
      "İki Particle çarpışınca rengi kim değiştirir?",
      [
        "p5.js dist ile kesişmeyi siz tespit edersiniz",
        "Matter.js collisionStart, plugin üzerinden Particle.change",
        "Composite.add otomatik renk atar",
      ],
      1,
      "Tespit motorun. Siz olaya bağlanır, plugin’den kendi nesnenizi çekip change dersiniz."
    )}
    ${N.note(
      "Alıştırma 6.9 (orijinal)",
      `<p>Çarpışınca kaybolan (veya parçalanan) parçacıklar. Silmeyi nerede, nasıl yaparsınız?</p>
      <p><a href="https://natureofcode.com/physics-libraries/#exercise-69" target="_blank" rel="noopener">Exercise 6.9</a></p>`
    )}

    <h2>Kısa ara: integrasyon</h2>

    <p>Kokteylde biri sorar: “Hangi integrasyonu kullanıyorsunuz?” Konumun türevi hızdır (zamanla değişim). Hızın türevi ivme. Ters işlem integrasyon: ivmeden hız, hızdan yeni konum. Bu kitabın simülasyonları kuvvetten ivme üretir; her <code>draw</code> bir zaman dilimidir. Şu iki satır integrasyondur:</p>
    <p><code>velocity.add(acceleration);</code> · <code>position.add(velocity);</code></p>
    <p>Buna <strong>Euler</strong> denir (okunuşu “oyler”). Kod olarak iki satır. Gerçek dünya kare kare ışınlanmaz: pogostick bir saniyede kaybolup öbür saniyede belirmez. 30 kare/saniye gözü kandırır; hesap yine basamaklıdır. Şekil 6.12: düzgün eğri dünya, kırık çizgi Euler.</p>
    ${N.img(
      "06_libraries",
      "06_libraries_14.png",
      "Şekil 6.12: Euler, eğriyi doğru parçalarıyla yaklaştırır."
    )}
    <p>Daha küçük adım (kare başına yirmi kez güncelle) eğriye yaklaşır, sketch yavaşlar. Öğrenmek için Euler yeter. Box2D yarı-açık Euler kullanır; başka motorlar Runge–Kutta. Matter.js ve Toxiclibs.js çoğu yerde <strong>Verlet</strong> taşır: hızı ayrı kutuda saklamak yerine “bir önceki konum ile şimdiki konum”dan hızı o anda çıkarır. Yaylarla bağlı parçacıklarda bu kararlı durur. Ayrıntı isteyenler Thomas Jakobsen, <a href="https://www.cs.cmu.edu/afs/cs/academic/class/15462-s13/www/lec_slides/Jakobsen.pdf" target="_blank" rel="noopener">Advanced Character Physics</a>.</p>

    <h2>Toxiclibs.js ile Verlet fiziği</h2>

    <p>Karsten Schmidt’in Toxiclibs’i Processing/Java için geniş bir tasarım çantasıydı. Aktif bakımı durdu; fikirler hâlâ her yerde. Schmidt’in yeni işi <a href="https://thi.ng/umbrella" target="_blank" rel="noopener">thi.ng/umbrella</a>; vektör tarafı <a href="https://thi.ng/vectors" target="_blank" rel="noopener">thi.ng/vectors</a>. Kyle Phillips’in <a href="http://haptic-data.com/toxiclibsjs" target="_blank" rel="noopener">Toxiclibs.js</a> uyarlaması bu kitabın Verlet örneklerini taşır.</p>
    <p>Aynı sarkaç Matter.js ile de yazılır. Yine de ikinci bir kütüphane göstermek, “tek doğru motor” efsanesini kırar. Seçim kaba haliyle şöyle. Çarpışan kutular, çokgenler, sekme: Matter.js. Çok parçacık, birbirini çekme/itme, yay ağı, 3B: Toxiclibs.js (sert cisim çarpışması yok, o yüzden geometri ucuz). Yay ikisinde de var; genel kısıt (menteşe, fare teli) Matter.js’te.</p>
    <table class="data">
      <thead><tr><th>Özellik</th><th>Matter.js</th><th>Toxiclibs.js</th></tr></thead>
      <tbody>
        <tr><td>Sert cisim çarpışması</td><td>Var</td><td>Yok</td></tr>
        <tr><td>3B fizik</td><td>Yok</td><td>Var</td></tr>
        <tr><td>Parçacık çekim / itme</td><td>Yok (kendiniz applyForce)</td><td>Var (Behavior)</td></tr>
        <tr><td>Yay bağlantısı</td><td>Var (Constraint)</td><td>Var (VerletSpring2D)</td></tr>
        <tr><td>Genel kısıt</td><td>Var</td><td>Yok</td></tr>
      </tbody>
    </table>
    <p>Bu sayfanın iframe’i Matter.js yükler, Toxiclibs.js yüklemez. Aşağıdaki 6.11–6.15 örnekleri orijinal kitapta canlıdır; burada kavram, kısa sözdizimi ve bağlantı durur. Aynı resmi Matter.js kısıtıyla tuvalde görebilirsiniz.</p>
    <p>CDN (kendi p5 editörünüzde): <code>&lt;script src="https://cdn.jsdelivr.net/gh/hapticdata/toxiclibsjs@0.3.2/build/toxiclibs.js"&gt;&lt;/script&gt;</code></p>
    <table class="data">
      <thead><tr><th>Matter.js</th><th>Toxiclibs.js</th></tr></thead>
      <tbody>
        <tr><td>dünya / Engine.world</td><td><code>VerletPhysics2D</code></td></tr>
        <tr><td><code>Matter.Vector</code></td><td><code>Vec2D</code></td></tr>
        <tr><td><code>Body</code></td><td><code>VerletParticle2D</code> (yalnız nokta, şekil yok)</td></tr>
        <tr><td><code>Constraint</code></td><td><code>VerletSpring2D</code></td></tr>
      </tbody>
    </table>

    <h3>Vektörler</h3>
    <p>Üçüncü sözlük. <code>let { Vec2D } = toxi.geom;</code> sonra <code>new Vec2D(1, -1)</code> — fabrika değil, <code>new</code>. <code>a.addSelf(b)</code> a’yı yerinde toplar; <code>a.add(b)</code> yeni vektör döner. Uzunluk <code>magnitude()</code>, birim <code>normalize()</code>.</p>

    <h3>Fizik dünyası</h3>
    <p><code>physics = new VerletPhysics2D()</code>. Sınır: <code>physics.setWorldBounds(new Rect(0, 0, width, height))</code>. Yerçekimi bir davranış: <code>physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)))</code>. Zaman: <code>draw</code> içinde <code>physics.update()</code> — Matter.js’teki <code>Engine.update</code> ile aynı kapı çalma.</p>

    <h3>Parçacıklar</h3>
    <p>Toxiclibs parçacığı geometri taşımaz; x, y’dir. Matter.js’te sınıfta <code>this.body</code> referansı tutuyordunuz. Burada daha temiz yol: <code>class Particle extends VerletParticle2D</code>. <code>super(x, y)</code> ile ebeveyn kurulur, <code>show</code> içinde <code>circle(this.x, this.y, this.r * 2)</code> — x ve y sınıfta hazırdır. <code>VerletParticle2D</code> de <code>Vec2D</code> yavrusudur; vektör metotları parçacığa miras kalır. Dünyaya <code>physics.addParticle(particle)</code>. Alt sınıf nesnesini ebeveyn bekleyen metoda vermek: çok biçimlilik (Bölüm 4).</p>

    <h3>Yaylar</h3>
    <ul>
      <li><code>VerletSpring2D</code> — iki parçacık, rest uzunluğu, sertlik.</li>
      <li><code>VerletConstrainedSpring2D</code> — en uzun mesafeyi sınırlar.</li>
      <li><code>VerletMinDistanceSpring2D</code> — yalnız rest’ten kısa kalınca iter; “en az bu kadar uzak dur”.</li>
    </ul>
    <p>Yay da dünyaya eklenir: <code>physics.addSpring(spring)</code>. Matter.js’te gövdeyi elle <code>position = mouse</code> yapmak bozuyordu. Toxiclibs’te parçacığı <code>lock()</code> eder, x ve y’yi yazarsınız, <code>unlock()</code> ile tekrar fiziğe bırakırsınız. Kalıcı kilit <code>isStatic</code> ile aynı fikir.</p>

    <h3>Örnek 6.11: Toxiclibs.js ile basit yay</h3>
    <p>İki daire, bir yay. Üstteki kilitli, alttakini fareyle çekersiniz. Bölüm 3’teki sarkaçla aynı resim, Verlet hesabı. Canlı Toxiclibs sürümü orijinalde; burada aynı resmi Matter.js kısıtı çizer: durağan çapa, esnek tel, fare teliyle ağırlığı çekmek.</p>
    <p><a href="https://natureofcode.com/physics-libraries/#example-611-simple-spring-with-toxiclibsjs" target="_blank" rel="noopener">Kitap 6.11</a> ·
    <a href="https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/06_libraries/6_11_simple_spring_with_toxiclibs" target="_blank" rel="noopener">GitHub</a></p>
    ${N.editor("matterYay")}
    ${N.tryit([
      { do: "stiffness: 0.01 yerine 0.8 yapın.", expect: "Tel çubuğa yaklaşır; 6.6’daki varsayılan sarkaca benzer." },
    ])}

    <h2>Yumuşak cisim</h2>

    <p>Matter.js kutuları sert: çarpınca şekil durur. Yumuşak cisim esner, ezilir, titrer. Eski örnekler: <em>SodaConstructor</em>, <em>LocoRoco</em>, <em>World of Goo</em>, <em>JellyCar</em>. Tuğla yine aynı: parçacık + yay. Şekil 6.13: ip, battaniye ızgarası, karakter iskeleti.</p>
    ${N.img(
      "06_libraries",
      "06_libraries_15.png",
      "Şekil 6.13: Yumuşak cisim tarifleri — ip, ızgara, karakter."
    )}

    <h3>Bir ip</h3>
    <p>Yumuşak sarkaç: sert kol yerine boncuk dizisi. Toxiclibs <code>ParticleString2D</code> tek satırda ip kurar; öğrenmek için dizi ve döngü. 20 parçacık, 10 piksel aralık (Şekil 6.14). i ile i+1 yay (Şekil 6.15). İlkini <code>lock</code>. Çizim: <code>beginShape</code> ile bütün x, y’ler bir çizgi; son boncuk daire.</p>
    ${N.img(
      "06_libraries",
      "06_libraries_16.png",
      "Şekil 6.14: Yirmi parçacık, on piksel aralık."
    )}
    ${N.img(
      "06_libraries",
      "06_libraries_17.png",
      "Şekil 6.15: Her parçacık dizideki bir sonrakine yayla bağlı."
    )}

    <h3>Örnek 6.12: Yumuşak sarkaç</h3>
    <p>Orijinal Toxiclibs: fare son boncuğu sürükler. Canlı kod orada. Aşağıdaki Matter.js ipi aynı dizi fikri: komşu daireler kısıtla bağlı, ilk kilitli, fare teliyle ucu çekersiniz.</p>
    <p><a href="https://natureofcode.com/physics-libraries/#example-612-soft-swinging-pendulum" target="_blank" rel="noopener">Kitap 6.12</a> ·
    <a href="https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/06_libraries/6_12_soft_string" target="_blank" rel="noopener">GitHub</a></p>
    ${N.editor("matterIp")}
    ${N.note(
      "Alıştırma 6.10 (orijinal)",
      `<p>Asılı kumaş: her parçacığı yatay ve düşey komşusuna yayın. Toxiclibs örneği orijinalde.</p>
      <p><a href="https://natureofcode.com/physics-libraries/#exercise-610" target="_blank" rel="noopener">Exercise 6.10</a> ·
      <a href="https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/06_libraries/exercise_6_10_cloth_simulation" target="_blank" rel="noopener">GitHub</a></p>`
    )}

    <h3>Yumuşak karakter</h3>
    <p>İskelet: altı köşe, çevre yayları (Şekil 6.16). Yalnız çevre bağlanırsa yerçekimi karakteri çökertir. İç yaylar çadırın direği gibi boşluğu tutar (Şekil 6.17). Toxiclibs’te <code>Particle</code> ve <code>Spring</code> kurucuda kendilerini <code>physics</code>’e ekler. Çizim iskeleti gizlemek olabilir: <code>beginShape</code> ile dış hat, iç yaylar görünmez. Göz ve anten fiziksiz süs olabilir.</p>
    ${N.img(
      "06_libraries",
      "06_libraries_18.png",
      "Şekil 6.16: Yumuşak karakter iskeleti; köşeler dizi indeksi."
    )}
    ${N.img(
      "06_libraries",
      "06_libraries_19.png",
      "Şekil 6.17: İç yaylar çökmeyi önler. Başka çaprazlar da dener."
    )}

    <h3>Örnek 6.13: Yumuşak karakter</h3>
    <p>Canlı Toxiclibs: <a href="https://natureofcode.com/physics-libraries/#example-613-soft-body-character" target="_blank" rel="noopener">kitap 6.13</a> ·
    <a href="https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/06_libraries/soft_body_character_copy" target="_blank" rel="noopener">GitHub</a></p>
    ${N.note(
      "Alıştırma 6.11 (orijinal)",
      `<p>Kendi karakteriniz: ekstra köşe, kuvvet, süs.</p>
      <p><a href="https://natureofcode.com/physics-libraries/#exercise-611" target="_blank" rel="noopener">Exercise 6.11</a> ·
      <a href="https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/06_libraries/exercise_6_11_soft_body_character_enhanced" target="_blank" rel="noopener">GitHub</a></p>`
    )}

    <h3>Kuvvet yönlendirmeli çizge</h3>
    <p>Düğümleri elle yerleştirmek yerine her düğümü her düğüme yayla bağlarsınız. Yaylar dengeye gelince boşluklar düzgün dağılır. Toxiclibs bunu ucuz yapar: çarpışma geometrisi yok. Şekil 6.18 orijinalde canlı küme.</p>
    ${N.img(
      "06_libraries",
      "06_libraries_20.png",
      "Şekil 6.19: Beş düğüm, her biri diğerine bağlı. 0 kendine bağlanmaz; 0–1 varsa 1–0 tekrar yazılmaz."
    )}
    <p>Algoritma: <code>i</code> 0’dan N−2’ye, <code>j</code> i+1’den sona. Çift (i, j) bir yay. Hepsi aynı noktada doğarsa Verlet bozulur; <code>random(-1, 1)</code> titremesi yeter.</p>

    <h3>Örnek 6.14: Küme</h3>
    <p><a href="https://natureofcode.com/physics-libraries/#example-614-cluster" target="_blank" rel="noopener">Kitap 6.14</a> ·
    <a href="https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/06_libraries/6_13_force_directed_graph" target="_blank" rel="noopener">GitHub</a> ·
    Şekil 6.18: <a href="https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/06_libraries/figure_6_18" target="_blank" rel="noopener">figure_6_18</a></p>
    ${N.note(
      "Alıştırmalar 6.12–6.13 (orijinal)",
      `<p>6.12: Kümeyi yumuşak yaratık iskeleti yapın; yerçekimi ve fare. 6.13: Birden fazla küme, kümeler arası <code>VerletMinDistanceSpring2D</code>.</p>
      <p><a href="https://natureofcode.com/physics-libraries/#exercise-612" target="_blank" rel="noopener">6.12</a> ·
      <a href="https://natureofcode.com/physics-libraries/#exercise-613" target="_blank" rel="noopener">6.13</a> ·
      <a href="https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/06_libraries/exercise_6_13_force_directed_graph" target="_blank" rel="noopener">6.13 kod</a></p>`
    )}

    <h2>Çekim ve itme davranışları</h2>

    <p>Matter.js’te çekimi siz vektörleyip <code>applyForce</code> ettiniz. Toxiclibs <code>VerletParticle2D.addForce</code> de vardır; bir adım ötesi: <code>AttractionBehavior</code>. Bir parçacığa davranış bağlarsınız, dünyadaki diğerleri o yarıçap içinde çekilir. Üç argüman: parçacık, etki mesafesi, kuvvet. Eksi kuvvet itmedir. Her parçacığa kısa menzilli itme eklemek, çarpışma yokken “çakışma”yı taklit eder.</p>

    <h3>Örnek 6.15: Çekim (ve itme) davranışları</h3>
    <p>Attractor hem tuval genişliğinde çeker hem kendi yarıçapında iter. Orijinal canlı Toxiclibs.</p>
    <p><a href="https://natureofcode.com/physics-libraries/#example-615-attraction-and-repulsion-behaviors" target="_blank" rel="noopener">Kitap 6.15</a> ·
    <a href="https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/06_libraries/6_14_attraction_behaviors" target="_blank" rel="noopener">GitHub</a></p>
    <p>Çok parçacıkta herkes herkesi kontrol eder: N². Bölüm 5’teki kutulama (binning) ile <code>addForce</code>’u elle yazmak hızlandırır; o zaman hazır <code>AttractionBehavior</code> durur.</p>
    ${N.note(
      "Alıştırma 6.14 (orijinal)",
      `<p><code>AttractionBehavior</code> ile yay kuvvetini birlikte kullanın.</p>
      <p><a href="https://natureofcode.com/physics-libraries/#exercise-614" target="_blank" rel="noopener">Exercise 6.14</a></p>`
    )}

    <h2>Ekosistem</h2>
    <p>Bölüm 5’teki yaratıkların hareketini bir fizik motoruna devredin. Matter.js ile çarpışma olayı, kısıt iskeleti, menteşe uzuv. Toxiclibs ile tentakül zinciri veya yay ağı. Yayları çalışma anında ekleyip silmek; görünür ya da gizli bırakmak.</p>
    ${N.img(
      "06_libraries",
      "06_libraries_21.png",
      "Orijinal kitaptaki ekosistem görseli: kütüphane destekli yaratıklar."
    )}

    ${N.resources([
      { kind: "Kitap", title: "Chapter 6 · Physics Libraries", url: "https://natureofcode.com/physics-libraries/" },
      { kind: "Kod", title: "06_libraries örnekleri", url: "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/06_libraries" },
      { kind: "Video", title: "Coding Train · 6.1 Matter.js Introduction", url: "https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/6-physics-libraries/1-matterjs-introduction" },
      { kind: "Video", title: "Coding Train · Matter.js (YouTube, giriş)", url: "https://www.youtube.com/watch?v=urR596FsU68" },
      { kind: "Referans", title: "Matter.js belgesi", url: "https://brm.io/matter-js/docs/" },
      { kind: "Referans", title: "Matter.Bodies", url: "https://brm.io/matter-js/docs/classes/Bodies.html" },
      { kind: "Referans", title: "Toxiclibs.js", url: "http://haptic-data.com/toxiclibsjs" },
      { kind: "Yazı", title: "Jakobsen · Advanced Character Physics", url: "https://www.cs.cmu.edu/afs/cs/academic/class/15462-s13/www/lec_slides/Jakobsen.pdf" },
      { kind: "Referans", title: "p5.js · translate", url: "https://p5js.org/reference/p5/translate/" },
      { kind: "Referans", title: "p5.js · rotate", url: "https://p5js.org/reference/p5/rotate/" },
      { kind: "Referans", title: "p5.js · beginShape", url: "https://p5js.org/reference/p5/beginShape/" },
      { kind: "Kitap", title: "p5.play (oyun iskeleti bölümü)", url: "#/p5play" },
      { kind: "Referans", title: "Box2D", url: "https://box2d.org/" },
      { kind: "Referans", title: "Phaser", url: "https://phaser.io/" },
      { kind: "Referans", title: "Unity · Rigidbody2D", url: "https://docs.unity3d.com/Manual/class-Rigidbody2D.html" },
      { kind: "Referans", title: "Godot · Physics introduction", url: "https://docs.godotengine.org/en/stable/tutorials/physics/physics_introduction.html" },
      { kind: "Tutorial", title: "p5.play Türkçe eğitim (canlı)", url: "https://gusanmaz.github.io/p5play-tutorial/" },
    ])}
    <p><a href="#/ch5">← Ajanlar</a></p>
  `,
  editors: {
    ex61: {
      title: "Örnek 6.1: Matter.js Render ve Runner",
      libraries: ["matter"],
      original: {
        book: "https://natureofcode.com/physics-libraries/#example-61-matterjs-default-render-and-runner",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/06_libraries/6_1_default_matter_js",
      },
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body, Vector, Render, Runner } = Matter;

function setup() {
  let canvas = createCanvas(400, 240);
  let engine = Engine.create();
  let render = Render.create({
    canvas: canvas.elt,
    engine: engine,
    options: { width: width, height: height },
  });
  Render.run(render);

  let options = { friction: 0.01, restitution: 0.75 };
  let box = Bodies.rectangle(100, 80, 50, 50, options);
  Body.setVelocity(box, Vector.create(5, 0));
  Body.setAngularVelocity(box, 0.1);
  Composite.add(engine.world, box);

  let ground = Bodies.rectangle(width / 2, height - 5, width, 10, {
    isStatic: true,
  });
  Composite.add(engine.world, ground);

  let runner = Runner.create();
  Runner.run(runner, engine);
}`,
        },
      ],
    },
    ex62: {
      title: "Örnek 6.2: Fiziksiz kutular",
      original: {
        book: "https://natureofcode.com/physics-libraries/#example-62-a-comfortable-and-cozy-p5js-sketch-that-needs-a-little-matterjs",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/06_libraries/6_2_boxes_exercise",
      },
      files: [
        {
          name: "box.js",
          content: `class Box {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 16;
  }

  show() {
    rectMode(CENTER);
    fill(127);
    stroke(0);
    strokeWeight(2);
    square(this.x, this.y, this.w);
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let boxes = [];

function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  if (mouseIsPressed) {
    boxes.push(new Box(mouseX, mouseY));
  }
  for (let box of boxes) {
    box.show();
  }
  fill(20);
  noStroke();
  text("fizik yok — kutular farede çivi", 12, 22);
  text("adet " + boxes.length, 12, 42);
}`,
        },
      ],
    },
    sorVsSakla: {
      title: "Aynı dünya: kendi x,y / Matter’a sor",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite } = Matter;
let engine;
let frozen;
let asked;
let ground;

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  frozen = {
    x: 120,
    y: 40,
    w: 32,
    body: Bodies.rectangle(120, 40, 32, 32, { restitution: 0.4 }),
  };
  asked = {
    w: 32,
    body: Bodies.rectangle(280, 40, 32, 32, { restitution: 0.4 }),
  };
  ground = Bodies.rectangle(width / 2, height - 8, width, 16, {
    isStatic: true,
  });
  Composite.add(engine.world, [frozen.body, asked.body, ground]);
}

function draw() {
  background(255);
  Engine.update(engine);

  rectMode(CENTER);
  stroke(0);
  strokeWeight(2);
  fill(200, 80, 80);
  square(frozen.x, frozen.y, frozen.w);

  let p = asked.body.position;
  let a = asked.body.angle;
  fill(80, 80, 200);
  push();
  translate(p.x, p.y);
  rotate(a);
  square(0, 0, asked.w);
  pop();

  fill(120);
  noStroke();
  rect(width / 2, height - 8, width, 16);

  fill(20);
  noStroke();
  text("kırmızı: this.x, this.y (doğum yeri)", 12, 20);
  text("mavi: body.position  x " + round(p.x) + "  açı " + nf(a, 1, 2), 12, 38);
}`,
        },
      ],
    },
    cevirNeden: {
      title: "translate yok / var: aynı gövde",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body, Vector } = Matter;
let engine;
let box;
let ground;

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  box = Bodies.rectangle(200, 50, 40, 24, { restitution: 0.5 });
  Body.setAngularVelocity(box, 0.08);
  ground = Bodies.rectangle(width / 2, height - 8, width, 16, {
    isStatic: true,
  });
  Composite.add(engine.world, [box, ground]);
}

function draw() {
  background(255);
  Engine.update(engine);
  let p = box.position;
  let a = box.angle;

  rectMode(CENTER);
  strokeWeight(2);
  noFill();
  stroke(200, 60, 60);
  push();
  rotate(a);
  rect(p.x, p.y, 40, 24);
  pop();

  fill(127);
  stroke(0);
  push();
  translate(p.x, p.y);
  rotate(a);
  rect(0, 0, 40, 24);
  pop();

  fill(120);
  noStroke();
  rect(width / 2, height - 8, width, 16);

  fill(20);
  noStroke();
  text("kırmızı: rotate, translate yok", 12, 20);
  text("gri: translate(" + round(p.x) + ", " + round(p.y) + ") sonra rotate", 12, 38);
}`,
        },
      ],
    },
    ex62sonuc: {
      title: "Alıştırma 6.2 sonucu: düşen kutular",
      libraries: ["matter"],
      original: {
        book: "https://natureofcode.com/physics-libraries/#exercise-62",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/06_libraries/exercise_6_2_boxes",
      },
      files: [
        {
          name: "box.js",
          content: `class Box {
  constructor(x, y) {
    this.w = 16;
    this.body = Bodies.rectangle(x, y, this.w, this.w);
    Composite.add(engine.world, this.body);
  }

  show() {
    let pos = this.body.position;
    let a = this.body.angle;
    rectMode(CENTER);
    fill(127);
    stroke(0);
    strokeWeight(2);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    square(0, 0, this.w);
    pop();
  }

  checkEdge() {
    return this.body.position.y > height + this.w;
  }

  removeBody() {
    Composite.remove(engine.world, this.body);
  }
}`,
        },
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite } = Matter;
let engine;
let boxes = [];

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
}

function draw() {
  background(255);
  Engine.update(engine);
  if (mouseIsPressed) {
    boxes.push(new Box(mouseX, mouseY));
  }
  for (let i = boxes.length - 1; i >= 0; i--) {
    boxes[i].show();
    if (boxes[i].checkEdge()) {
      boxes[i].removeBody();
      boxes.splice(i, 1);
    }
  }
  fill(20);
  noStroke();
  text("kutu " + boxes.length + "   basılı tutun", 12, 22);
}`,
        },
      ],
    },
    ex63: {
      title: "Örnek 6.3: Kutular ve eşikler",
      libraries: ["matter"],
      original: {
        book: "https://natureofcode.com/physics-libraries/#example-63-falling-boxes-hitting-boundaries",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/06_libraries/6_3_boxes_and_boundaries",
      },
      files: [
        {
          name: "boundary.js",
          content: `class Boundary {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, {
      isStatic: true,
    });
    Composite.add(engine.world, this.body);
  }

  show() {
    rectMode(CENTER);
    fill(127);
    stroke(0);
    strokeWeight(2);
    rect(this.x, this.y, this.w, this.h);
  }
}`,
        },
        {
          name: "box.js",
          content: `class Box {
  constructor(x, y) {
    this.w = random(8, 16);
    this.h = random(8, 16);
    this.body = Bodies.rectangle(x, y, this.w, this.h, { restitution: 0.6 });
    Body.setVelocity(this.body, Vector.create(random(-5, 5), 0));
    Body.setAngularVelocity(this.body, 0.1);
    Composite.add(engine.world, this.body);
  }

  show() {
    let pos = this.body.position;
    let a = this.body.angle;
    rectMode(CENTER);
    fill(127);
    stroke(0);
    strokeWeight(2);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    rect(0, 0, this.w, this.h);
    pop();
  }

  checkEdge() {
    return this.body.position.y > height + this.w;
  }

  removeBody() {
    Composite.remove(engine.world, this.body);
  }
}`,
        },
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body, Vector } = Matter;
let engine;
let boxes = [];
let boundaries = [];

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  boundaries.push(new Boundary(width / 4, height - 5, width / 2 - 50, 10));
  boundaries.push(
    new Boundary((3 * width) / 4, height - 50, width / 2 - 50, 10)
  );
}

function draw() {
  background(255);
  Engine.update(engine);
  if (random(1) < 0.1) {
    boxes.push(new Box(width / 2, 40));
  }
  for (let i = boxes.length - 1; i >= 0; i--) {
    boxes[i].show();
    if (boxes[i].checkEdge()) {
      boxes[i].removeBody();
      boxes.splice(i, 1);
    }
  }
  for (let b of boundaries) {
    b.show();
  }
  fill(20);
  noStroke();
  text("kutu " + boxes.length, 12, 22);
}`,
        },
      ],
    },
    ex64: {
      title: "Örnek 6.4: Çokgenler",
      libraries: ["matter"],
      original: {
        book: "https://natureofcode.com/physics-libraries/#example-64-polygon-shapes",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/06_libraries/6_4_polygon_shapes",
      },
      files: [
        {
          name: "boundary.js",
          content: `class Boundary {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, {
      isStatic: true,
    });
    Composite.add(engine.world, this.body);
  }

  show() {
    rectMode(CENTER);
    fill(127);
    stroke(0);
    strokeWeight(2);
    rect(this.x, this.y, this.w, this.h);
  }
}`,
        },
        {
          name: "shape.js",
          content: `class CustomShape {
  constructor(x, y) {
    let vertices = [
      Vector.create(-10, -10),
      Vector.create(20, -15),
      Vector.create(15, 0),
      Vector.create(0, 10),
      Vector.create(-20, 15),
    ];
    this.body = Bodies.fromVertices(x, y, vertices, { restitution: 0.2 });
    Body.setVelocity(this.body, Vector.create(random(-5, 5), 0));
    Body.setAngularVelocity(this.body, 0.1);
    Composite.add(engine.world, this.body);
  }

  show() {
    fill(127);
    stroke(0);
    strokeWeight(2);
    beginShape();
    for (let v of this.body.vertices) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
  }

  checkEdge() {
    return this.body.position.y > height + 100;
  }

  removeBody() {
    Composite.remove(engine.world, this.body);
  }
}`,
        },
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body, Vector } = Matter;
let engine;
let shapes = [];
let boundaries = [];

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  boundaries.push(new Boundary(width / 4, height - 5, width / 2 - 50, 10));
  boundaries.push(
    new Boundary((3 * width) / 4, height - 50, width / 2 - 50, 10)
  );
}

function draw() {
  background(255);
  Engine.update(engine);
  if (random(1) < 0.025) {
    shapes.push(new CustomShape(width / 2, 40));
  }
  for (let i = shapes.length - 1; i >= 0; i--) {
    shapes[i].show();
    if (shapes[i].checkEdge()) {
      shapes[i].removeBody();
      shapes.splice(i, 1);
    }
  }
  for (let b of boundaries) {
    b.show();
  }
  fill(20);
  noStroke();
  text("çokgen " + shapes.length + "  vertex = body.vertices", 12, 22);
}`,
        },
      ],
    },
    ex65: {
      title: "Örnek 6.5: Lolipop (birleşik gövde)",
      libraries: ["matter"],
      original: {
        book: "https://natureofcode.com/physics-libraries/#example-65-multiple-shapes-on-one-body",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/06_libraries/6_5_compound_bodies",
      },
      files: [
        {
          name: "boundary.js",
          content: `class Boundary {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, {
      isStatic: true,
    });
    Composite.add(engine.world, this.body);
  }

  show() {
    rectMode(CENTER);
    fill(127);
    stroke(0);
    strokeWeight(2);
    rect(this.x, this.y, this.w, this.h);
  }
}`,
        },
        {
          name: "lollipop.js",
          content: `class Lollipop {
  constructor(x, y) {
    this.w = 24;
    this.h = 4;
    this.r = 8;
    this.part1 = Bodies.rectangle(x, y, this.w, this.h);
    this.part2 = Bodies.circle(x + this.w / 2, y, this.r);
    this.body = Body.create({
      restitution: 1,
      parts: [this.part1, this.part2],
    });
    Body.setVelocity(this.body, Vector.create(random(-5, 5), 0));
    Body.setAngularVelocity(this.body, 0.1);
    Composite.add(engine.world, this.body);
  }

  show() {
    let angle = this.body.angle;
    let p1 = this.part1.position;
    let p2 = this.part2.position;
    fill(127);
    stroke(0);
    strokeWeight(1);
    push();
    translate(p1.x, p1.y);
    rotate(angle);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
    push();
    translate(p2.x, p2.y);
    rotate(angle);
    fill(200);
    circle(0, 0, this.r * 2);
    pop();
  }

  checkEdge() {
    return this.body.position.y > height + this.h * 2;
  }

  removeBody() {
    Composite.remove(engine.world, this.body);
  }
}`,
        },
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body, Vector } = Matter;
let engine;
let lollipops = [];
let boundaries = [];

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  boundaries.push(new Boundary(width / 4, height - 5, width / 2 - 50, 10));
  boundaries.push(
    new Boundary((3 * width) / 4, height - 50, width / 2 - 50, 10)
  );
}

function draw() {
  background(255);
  Engine.update(engine);
  if (random(1) < 0.025) {
    lollipops.push(new Lollipop(width / 2, 40));
  }
  for (let i = lollipops.length - 1; i >= 0; i--) {
    lollipops[i].show();
    if (lollipops[i].checkEdge()) {
      lollipops[i].removeBody();
      lollipops.splice(i, 1);
    }
  }
  for (let b of boundaries) {
    b.show();
  }
  fill(20);
  noStroke();
  text("parça konumları  adet " + lollipops.length, 12, 22);
}`,
        },
      ],
    },
    ex65yanlis: {
      title: "Şekil 6.9: kütle merkeziyle çizmek",
      libraries: ["matter"],
      original: {
        book: "https://natureofcode.com/physics-libraries/#example-65-multiple-shapes-on-one-body",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/06_libraries/6_5_compound_bodies_error",
      },
      files: [
        {
          name: "boundary.js",
          content: `class Boundary {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, {
      isStatic: true,
    });
    Composite.add(engine.world, this.body);
  }

  show() {
    rectMode(CENTER);
    fill(127);
    stroke(0);
    strokeWeight(2);
    rect(this.x, this.y, this.w, this.h);
  }
}`,
        },
        {
          name: "lollipop.js",
          content: `class Lollipop {
  constructor(x, y) {
    this.w = 24;
    this.h = 4;
    this.r = 8;
    this.part1 = Bodies.rectangle(x, y, this.w, this.h);
    this.part2 = Bodies.circle(x + this.w / 2, y, this.r);
    this.body = Body.create({
      restitution: 0.5,
      parts: [this.part1, this.part2],
    });
    Body.setVelocity(this.body, Vector.create(random(-5, 5), 0));
    Body.setAngularVelocity(this.body, 0.1);
    Composite.add(engine.world, this.body);
  }

  showCorrect() {
    let angle = this.body.angle;
    fill(127);
    stroke(0);
    strokeWeight(1);
    push();
    translate(this.part1.position.x, this.part1.position.y);
    rotate(angle);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
    push();
    translate(this.part2.position.x, this.part2.position.y);
    rotate(angle);
    fill(200);
    circle(0, 0, this.r * 2);
    pop();
  }

  showWrong() {
    let p = this.body.position;
    let angle = this.body.angle;
    rectMode(CENTER);
    fill(127);
    stroke(0);
    strokeWeight(1);
    push();
    translate(p.x, p.y);
    rotate(angle);
    rect(0, 0, this.w, this.h);
    fill(200);
    circle(this.w / 2, 0, this.r * 2);
    pop();
  }

  checkEdge() {
    return this.body.position.y > height + this.h * 2;
  }

  removeBody() {
    Composite.remove(engine.world, this.body);
  }
}`,
        },
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body, Vector } = Matter;
let engine;
let lollipops = [];
let boundaries = [];

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  boundaries.push(new Boundary(width / 4, height - 5, width / 2 - 50, 10));
  boundaries.push(
    new Boundary((3 * width) / 4, height - 50, width / 2 - 50, 10)
  );
}

function draw() {
  background(255);
  Engine.update(engine);
  if (random(1) < 0.04) {
    lollipops.push(new Lollipop(width / 2, 30));
  }
  for (let i = lollipops.length - 1; i >= 0; i--) {
    if (mouseIsPressed) {
      lollipops[i].showCorrect();
    } else {
      lollipops[i].showWrong();
    }
    if (lollipops[i].checkEdge()) {
      lollipops[i].removeBody();
      lollipops.splice(i, 1);
    }
  }
  for (let b of boundaries) {
    b.show();
  }
  fill(20);
  noStroke();
  if (mouseIsPressed) {
    text("basılı: parça konumları (doğru)", 12, 22);
  } else {
    text("serbest: body.position = kütle merkezi (kayar)", 12, 22);
  }
}`,
        },
      ],
    },
    ex66: {
      title: "Örnek 6.6: Matter.js sarkaç",
      libraries: ["matter"],
      original: {
        book: "https://natureofcode.com/physics-libraries/#example-66-matterjs-pendulum",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/06_libraries/6_6_matter_js_pendulum",
      },
      files: [
        {
          name: "pendulum.js",
          content: `class Pendulum {
  constructor(x, y, len) {
    this.r = 12;
    this.len = len;
    this.anchor = Bodies.circle(x, y, this.r, { isStatic: true });
    this.bob = Bodies.circle(x + len, y - len, this.r, { restitution: 0.6 });
    this.arm = Constraint.create({
      bodyA: this.anchor,
      bodyB: this.bob,
      length: this.len,
    });
    Composite.add(engine.world, this.anchor);
    Composite.add(engine.world, this.bob);
    Composite.add(engine.world, this.arm);
  }

  show() {
    fill(127);
    stroke(0);
    strokeWeight(2);
    line(
      this.anchor.position.x,
      this.anchor.position.y,
      this.bob.position.x,
      this.bob.position.y
    );
    push();
    translate(this.anchor.position.x, this.anchor.position.y);
    rotate(this.anchor.angle);
    circle(0, 0, this.r * 2);
    line(0, 0, this.r, 0);
    pop();
    push();
    translate(this.bob.position.x, this.bob.position.y);
    rotate(this.bob.angle);
    circle(0, 0, this.r * 2);
    line(0, 0, this.r, 0);
    pop();
  }
}`,
        },
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Constraint } = Matter;
let engine;
let pendulum;

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  pendulum = new Pendulum(width / 2, 10, 90);
}

function draw() {
  background(255);
  Engine.update(engine);
  pendulum.show();
  fill(20);
  noStroke();
  text("stiffness varsayılan 0.7   açı " + nf(pendulum.bob.angle, 1, 2), 12, 22);
}`,
        },
      ],
    },
    kopru: {
      title: "Kısıt köprüsü (kitaptaki 6.5 görseli)",
      libraries: ["matter"],
      original: {
        book: "https://natureofcode.com/physics-libraries/#exercise-65",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/06_libraries/exercise_6_5_bridge",
      },
      files: [
        {
          name: "box.js",
          content: `class Box {
  constructor(x, y) {
    this.w = random(8, 16);
    this.h = random(8, 16);
    this.body = Bodies.rectangle(x, y, this.w, this.h, { restitution: 0.4 });
    Composite.add(engine.world, this.body);
  }

  show() {
    let pos = this.body.position;
    let a = this.body.angle;
    rectMode(CENTER);
    fill(200);
    stroke(0);
    strokeWeight(1);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    rect(0, 0, this.w, this.h);
    pop();
  }

  checkEdge() {
    return this.body.position.y > height + 40;
  }

  removeBody() {
    Composite.remove(engine.world, this.body);
  }
}`,
        },
        {
          name: "bridge.js",
          content: `class Bridge {
  constructor(len) {
    this.r = len / 2;
    this.particles = [];
    let y = 70;
    for (let x = 0; x < width + len; x += len) {
      let particle = Bodies.circle(x, y, this.r, { restitution: 0.6 });
      this.particles.push(particle);
      Composite.add(engine.world, particle);
    }
    this.particles[0].isStatic = true;
    this.particles[this.particles.length - 1].isStatic = true;
    for (let i = 0; i < this.particles.length - 1; i++) {
      Composite.add(
        engine.world,
        Constraint.create({
          bodyA: this.particles[i],
          bodyB: this.particles[i + 1],
          length: len,
          stiffness: 1,
        })
      );
    }
  }

  show() {
    fill(127);
    stroke(0);
    strokeWeight(2);
    for (let i = 0; i < this.particles.length - 1; i++) {
      let a = this.particles[i].position;
      let b = this.particles[i + 1].position;
      line(a.x, a.y, b.x, b.y);
    }
    noStroke();
    for (let p of this.particles) {
      circle(p.position.x, p.position.y, this.r * 2);
    }
  }
}`,
        },
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Constraint } = Matter;
let engine;
let bridge;
let boxes = [];

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  bridge = new Bridge(20);
}

function draw() {
  background(255);
  Engine.update(engine);
  if (random(1) < 0.03) {
    boxes.push(new Box(width / 2, -20));
  }
  bridge.show();
  for (let i = boxes.length - 1; i >= 0; i--) {
    boxes[i].show();
    if (boxes[i].checkEdge()) {
      boxes[i].removeBody();
      boxes.splice(i, 1);
    }
  }
  fill(20);
  noStroke();
  text("uçlar kilitli  düğüm " + bridge.particles.length, 12, 22);
}`,
        },
      ],
    },
    ex67: {
      title: "Örnek 6.7: Yel değirmeni",
      libraries: ["matter"],
      original: {
        book: "https://natureofcode.com/physics-libraries/#example-67-spinning-windmill",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/06_libraries/6_7_windmill",
      },
      files: [
        {
          name: "particle.js",
          content: `class Particle {
  constructor(x, y) {
    this.r = 8;
    this.body = Bodies.circle(x, y, this.r, {
      restitution: 0.6,
      collisionFilter: { category: 0x0002 },
    });
    Composite.add(engine.world, this.body);
  }

  show() {
    let pos = this.body.position;
    let a = this.body.angle;
    fill(127);
    stroke(0);
    strokeWeight(2);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    circle(0, 0, this.r * 2);
    line(0, 0, this.r, 0);
    pop();
  }

  checkEdge() {
    return this.body.position.y > height + this.r;
  }

  removeBody() {
    Composite.remove(engine.world, this.body);
  }
}`,
        },
        {
          name: "windmill.js",
          content: `class Windmill {
  constructor(x, y, w, h) {
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(x, y, w, h);
    Composite.add(engine.world, this.body);
    this.constraint = Constraint.create({
      bodyA: this.body,
      pointB: { x: x, y: y },
      length: 0,
      stiffness: 1,
    });
    Composite.add(engine.world, this.constraint);
  }

  show() {
    rectMode(CENTER);
    fill(127);
    stroke(0);
    strokeWeight(2);
    push();
    translate(this.body.position.x, this.body.position.y);
    push();
    rotate(this.body.angle);
    rect(0, 0, this.w, this.h);
    pop();
    line(0, 0, 0, height);
    pop();
  }
}`,
        },
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Constraint } = Matter;
let engine;
let windmill;
let particles = [];

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  windmill = new Windmill(width / 2, height - 40, 110, 10);
}

function draw() {
  background(255);
  if (random(1) < 0.05) {
    particles.push(new Particle(width / 2 + random(-50, 50), 0));
  }
  Engine.update(engine);
  windmill.show();
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].show();
    if (particles[i].checkEdge()) {
      particles[i].removeBody();
      particles.splice(i, 1);
    }
  }
  fill(20);
  noStroke();
  text("açı " + nf(windmill.body.angle, 1, 2) + "  (direk süs)", 12, 22);
}`,
        },
      ],
    },
    ex68: {
      title: "Örnek 6.8: MouseConstraint",
      libraries: ["matter"],
      original: {
        book: "https://natureofcode.com/physics-libraries/#example-68-mouseconstraint-demonstration",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/06_libraries/6_8_mouse_constraint",
      },
      files: [
        {
          name: "boundary.js",
          content: `class Boundary {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, {
      isStatic: true,
    });
    Composite.add(engine.world, this.body);
  }

  show() {
    rectMode(CENTER);
    fill(127);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
  }
}`,
        },
        {
          name: "box.js",
          content: `class Box {
  constructor(x, y, w, h) {
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(x, y, this.w, this.h, { restitution: 0.6 });
    Composite.add(engine.world, this.body);
  }

  show() {
    let pos = this.body.position;
    let a = this.body.angle;
    rectMode(CENTER);
    fill(127);
    stroke(0);
    strokeWeight(2);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    rect(0, 0, this.w, this.h);
    pop();
  }
}`,
        },
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Mouse, MouseConstraint } = Matter;
let engine;
let boundaries = [];
let box1, box2;

function setup() {
  let canvas = createCanvas(400, 240);
  engine = Engine.create();
  boundaries.push(new Boundary(width / 2, height - 5, width, 10));
  boundaries.push(new Boundary(width / 2, 5, width, 10));
  boundaries.push(new Boundary(5, height / 2, 10, height));
  boundaries.push(new Boundary(width - 5, height / 2, 10, height));
  box1 = new Box(140, height / 2, 48, 48);
  box2 = new Box(250, height / 2, 48, 48);
  let mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity();
  Composite.add(
    engine.world,
    MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.7 },
    })
  );
}

function draw() {
  background(255);
  Engine.update(engine);
  for (let b of boundaries) {
    b.show();
  }
  box1.show();
  box2.show();
  fill(20);
  noStroke();
  text("kutuyu sürükleyin  stiffness 0.7", 12, 28);
  text(
    "sol açı " +
      nf(box1.body.angle, 1, 2) +
      "   sağ açı " +
      nf(box2.body.angle, 1, 2),
    12,
    46
  );
}`,
        },
      ],
    },
    ex69: {
      title: "Örnek 6.9: Matter.js çekim",
      libraries: ["matter"],
      original: {
        book: "https://natureofcode.com/physics-libraries/#example-69-attraction-with-matterjs",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/06_libraries/6_9_matter_js_attraction",
      },
      files: [
        {
          name: "attractor.js",
          content: `class Attractor {
  constructor(x, y) {
    this.radius = 28;
    this.body = Bodies.circle(x, y, this.radius, { isStatic: true });
    Composite.add(engine.world, this.body);
  }

  attract(mover) {
    let force = Vector.sub(this.body.position, mover.body.position);
    let distance = Vector.magnitude(force);
    distance = constrain(distance, 5, 25);
    let G = 0.02;
    let strength = (G * mover.body.mass) / (distance * distance);
    force = Vector.normalise(force);
    force = Vector.mult(force, strength);
    return force;
  }

  show() {
    fill(0);
    stroke(0);
    strokeWeight(2);
    circle(this.body.position.x, this.body.position.y, this.radius * 2);
  }
}`,
        },
        {
          name: "mover.js",
          content: `class Mover {
  constructor(x, y, radius) {
    this.radius = radius;
    this.body = Bodies.circle(x, y, this.radius, {
      restitution: 1,
      frictionAir: 0,
    });
    let angle = random(TWO_PI);
    Body.setVelocity(this.body, Vector.create(2 * cos(angle), 2 * sin(angle)));
    Composite.add(engine.world, this.body);
  }

  applyForce(force) {
    Body.applyForce(this.body, this.body.position, force);
  }

  show() {
    fill(127);
    stroke(0);
    strokeWeight(1);
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    circle(0, 0, this.radius * 2);
    line(0, 0, this.radius, 0);
    pop();
  }
}`,
        },
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Body, Composite, Vector } = Matter;
let movers = [];
let attractor;
let engine;

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  engine.gravity = Vector.create(0, 0);
  for (let i = 0; i < 40; i++) {
    movers[i] = new Mover(random(width), random(height), random(4, 8));
  }
  attractor = new Attractor(width / 2, height / 2);
}

function draw() {
  background(255);
  Engine.update(engine);
  for (let mover of movers) {
    mover.applyForce(attractor.attract(mover));
    mover.show();
  }
  attractor.show();
  fill(20);
  noStroke();
  text("gravity (0,0)  frictionAir 0  G 0.02", 12, 22);
}`,
        },
      ],
    },
    ex610: {
      title: "Örnek 6.10: Çarpışma olayları",
      libraries: ["matter"],
      original: {
        book: "https://natureofcode.com/physics-libraries/#example-610-collision-events",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/06_libraries/6_10_collision_events",
      },
      files: [
        {
          name: "boundary.js",
          content: `class Boundary {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, {
      isStatic: true,
    });
    Composite.add(engine.world, this.body);
  }

  show() {
    rectMode(CENTER);
    fill(127);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
  }
}`,
        },
        {
          name: "particle.js",
          content: `class Particle {
  constructor(x, y) {
    this.radius = random(4, 8);
    this.col = color(127);
    this.body = Bodies.circle(x, y, this.radius, { restitution: 0.6 });
    this.body.plugin.particle = this;
    Composite.add(engine.world, this.body);
  }

  change() {
    this.col = color(random(100, 255), 0, random(100, 255));
  }

  checkEdge() {
    return this.body.position.y > height + this.radius;
  }

  removeBody() {
    Composite.remove(engine.world, this.body);
  }

  show() {
    fill(this.col);
    stroke(0);
    strokeWeight(2);
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    circle(0, 0, this.radius * 2);
    line(0, 0, this.radius, 0);
    pop();
  }
}`,
        },
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite } = Matter;
let engine;
let particles = [];
let wall;

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  wall = new Boundary(width / 2, height - 5, width, 10);
  Matter.Events.on(engine, "collisionStart", handleCollisions);
}

function handleCollisions(event) {
  for (let pair of event.pairs) {
    let particleA = pair.bodyA.plugin.particle;
    let particleB = pair.bodyB.plugin.particle;
    if (particleA instanceof Particle && particleB instanceof Particle) {
      particleA.change();
      particleB.change();
    }
  }
}

function draw() {
  background(255);
  if (random(1) < 0.05) {
    particles.push(new Particle(random(width), 0));
  }
  Engine.update(engine);
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].show();
    if (particles[i].checkEdge()) {
      particles[i].removeBody();
      particles.splice(i, 1);
    }
  }
  wall.show();
  fill(20);
  noStroke();
  text("iki daire çarpınca renk  adet " + particles.length, 12, 22);
}`,
        },
      ],
    },
    matterYay: {
      title: "Matter.js yay: çapa + esnek tel",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Constraint, Mouse, MouseConstraint } = Matter;
let engine;
let anchor;
let bob;
let arm;

function setup() {
  let canvas = createCanvas(400, 240);
  engine = Engine.create();
  let len = 100;
  anchor = Bodies.circle(width / 2, 24, 10, { isStatic: true });
  bob = Bodies.circle(width / 2 + len, 24, 14, { restitution: 0.4 });
  arm = Constraint.create({
    bodyA: anchor,
    bodyB: bob,
    length: len,
    stiffness: 0.01,
  });
  Composite.add(engine.world, [anchor, bob, arm]);
  let mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity();
  Composite.add(
    engine.world,
    MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.7 },
    })
  );
}

function draw() {
  background(255);
  Engine.update(engine);
  stroke(0);
  strokeWeight(2);
  line(anchor.position.x, anchor.position.y, bob.position.x, bob.position.y);
  fill(127);
  circle(anchor.position.x, anchor.position.y, 20);
  circle(bob.position.x, bob.position.y, 28);
  fill(20);
  noStroke();
  text("stiffness 0.01  (Toxiclibs 6.11 aynı resim)", 12, 22);
  text("ağırlığı fareyle çekin", 12, 40);
}`,
        },
      ],
    },
    matterIp: {
      title: "Matter.js ip: komşu kısıtlar",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Constraint, Mouse, MouseConstraint } = Matter;
let engine;
let beads = [];

function setup() {
  let canvas = createCanvas(400, 240);
  engine = Engine.create();
  let n = 14;
  let spacing = 12;
  for (let i = 0; i < n; i++) {
    let b = Bodies.circle(80 + i * spacing, 40, 6, { restitution: 0.2 });
    beads.push(b);
    Composite.add(engine.world, b);
  }
  beads[0].isStatic = true;
  for (let i = 0; i < n - 1; i++) {
    Composite.add(
      engine.world,
      Constraint.create({
        bodyA: beads[i],
        bodyB: beads[i + 1],
        length: spacing,
        stiffness: 0.4,
      })
    );
  }
  let mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity();
  Composite.add(
    engine.world,
    MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.6 },
    })
  );
}

function draw() {
  background(255);
  Engine.update(engine);
  stroke(0);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let b of beads) {
    vertex(b.position.x, b.position.y);
  }
  endShape();
  fill(127);
  stroke(0);
  let last = beads[beads.length - 1];
  circle(last.position.x, last.position.y, 16);
  fill(20);
  noStroke();
  text("ilk kilitli  ucu çekin  düğüm " + beads.length, 12, 22);
}`,
        },
      ],
    },
  },
});

