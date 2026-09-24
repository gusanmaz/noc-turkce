registerChapter({
  id: "sozluk",
  title: "Sözlük",
  short: "Sözlük",
  icon: "📖",
  html: `
    <p>Bu sayfa kitaptaki kelimeleri sınıf diline çevirir. İngilizce terim parantezde durur; tıklayınca ilgili bölüme gidersiniz. Aynı kelime iki anlama geliyorsa (Normal kuvvet / normalize) ikisini de yazdım.</p>

    ${N.note(
      "Nasıl kullanılır",
      `<p>Önce Türkçe sütuna bakın. “Nerede” sütunu o fikrin anlatıldığı hash’tir: <a href="#/ch1">#/ch1</a> vektör, <a href="#/ch2">#/ch2</a> kuvvet. Hazırlık sayfaları sıfırdan kurulur: <a href="#/js">JavaScript</a>, <a href="#/p5">p5.js</a>, <a href="#/mat">matematik</a>.</p>`
    )}

    <h2>Hazırlık</h2>
    <table class="data">
      <thead><tr><th>Terim</th><th>Ne demek</th><th>Nerede</th></tr></thead>
      <tbody>
        <tr>
          <td>değişken</td>
          <td>İsimli kutu. <code>let x = 3;</code> kutunun adı x, içindeki sayı 3.</td>
          <td><a href="#/js">JavaScript</a></td>
        </tr>
        <tr>
          <td>fonksiyon</td>
          <td>Adı olan tarif. Çağırınca tarif çalışır. <code>setup</code> bir kez, <code>draw</code> her kare.</td>
          <td><a href="#/js">JavaScript</a>, <a href="#/p5">p5.js</a></td>
        </tr>
        <tr>
          <td>sınıf / nesne</td>
          <td>Sınıf kalıp, nesne kalıptan çıkan şey. <code>new Walker()</code> bir Walker nesnesi doğurur.</td>
          <td><a href="#/js">JavaScript</a>, <a href="#/ch0">Bölüm 0</a></td>
        </tr>
        <tr>
          <td>tuval (canvas)</td>
          <td>p5.js’in çizdiği dikdörtgen. Sol üst (0, 0); +x sağ, +y aşağı.</td>
          <td><a href="#/p5">p5.js</a></td>
        </tr>
        <tr>
          <td>kare / kare hızı</td>
          <td>Bir <code>draw</code> turu bir karedir. Varsayılan yaklaşık 60 kare/saniye.</td>
          <td><a href="#/p5">p5.js</a></td>
        </tr>
        <tr>
          <td>skaler</td>
          <td>Yalnızca büyüklük: 5, −2.3. Yön yok.</td>
          <td><a href="#/mat">Matematik</a>, <a href="#/ch1">Bölüm 1</a></td>
        </tr>
        <tr>
          <td>derece / radyan</td>
          <td>Aynı tur, iki cetvel. Tam tur 360° veya 2π radyan. p5.js <code>rotate</code> varsayılan radyan ister.</td>
          <td><a href="#/mat">Matematik</a>, <a href="#/p5">p5.js</a></td>
        </tr>
        <tr>
          <td>translate / rotate / scale</td>
          <td>Kâğıdın orijinini kaydır, döndür, zoom’la. Sıra yürüyüş gibidir: önce git sonra dön ≠ önce dön sonra git.</td>
          <td><a href="#/p5">p5.js</a></td>
        </tr>
        <tr>
          <td>kamera</td>
          <td>Karton pencere: dünya durur, bakış kayar. p5.js’te ters <code>translate</code>; p5.play <code>camera</code>; Phaser <code>cameras.main</code>.</td>
          <td><a href="#/p5">p5.js</a>, <a href="#/p5play">p5.play</a>, <a href="#/phaser">Phaser</a></td>
        </tr>
        <tr>
          <td>pyp5js / p5py</td>
          <td>p5.js’in Python yazımları. pyp5js tarayıcıda JS’e çevirir; p5py masaüstü pakettir. Bu kitap p5.js çalıştırır.</td>
          <td><a href="#/p5">p5.js</a></td>
        </tr>
      </tbody>
    </table>

    <h2>0 · Rastgelelik</h2>
    <table class="data">
      <thead><tr><th>Terim</th><th>Ne demek</th><th>Nerede</th></tr></thead>
      <tbody>
        <tr>
          <td>rastgele yürüyüş</td>
          <td>Her adımı zarla seçilen yol. Walker dört komşudan birine gider.</td>
          <td><a href="#/ch0">Bölüm 0</a></td>
        </tr>
        <tr>
          <td>sözde-rastgele</td>
          <td>Bilgisayarın ürettiği “zar”. Gerçek rastgele değil; yeterince karışık görünür.</td>
          <td><a href="#/ch0">Bölüm 0</a></td>
        </tr>
        <tr>
          <td>Gaussian / çan eğrisi</td>
          <td>Ortaya yakın değerler sık, uçlar seyrek. p5.js <code>randomGaussian</code>.</td>
          <td><a href="#/ch0">Bölüm 0</a></td>
        </tr>
        <tr>
          <td>Perlin gürültüsü</td>
          <td>Komşu değerler birbirine yakın rastgelelik. Organik salınım; <code>noise</code>.</td>
          <td><a href="#/ch0">Bölüm 0</a></td>
        </tr>
      </tbody>
    </table>

    <h2>1 · Vektörler</h2>
    <table class="data">
      <thead><tr><th>Terim</th><th>Ne demek</th><th>Nerede</th></tr></thead>
      <tbody>
        <tr>
          <td>vektör</td>
          <td>Hem ne kadar (büyüklük) hem nereye (yön). p5.js’te <code>createVector(x, y)</code> paketi.</td>
          <td><a href="#/ch1">Bölüm 1</a></td>
        </tr>
        <tr>
          <td>konum</td>
          <td>Nesnenin tuvaldeki yeri. Çoğu zaman bir vektör: <code>position.x</code>, <code>position.y</code>.</td>
          <td><a href="#/ch1">Bölüm 1</a></td>
        </tr>
        <tr>
          <td>hız (velocity)</td>
          <td>Konumun kare kare değişimi. Yeni konum = eski konum + hız.</td>
          <td><a href="#/ch1">Bölüm 1</a></td>
        </tr>
        <tr>
          <td>ivme (acceleration)</td>
          <td>Hızın kare kare değişimi. Hıza ivme eklenir.</td>
          <td><a href="#/ch1">Bölüm 1</a></td>
        </tr>
        <tr>
          <td>büyüklük / mag</td>
          <td>Okun uzunluğu. p5.js <code>v.mag()</code> veya <code>dist</code>.</td>
          <td><a href="#/ch1">Bölüm 1</a>, <a href="#/mat">Matematik</a></td>
        </tr>
        <tr>
          <td>normalize / birim vektör</td>
          <td>Yönü bırak, uzunluğu 1 yap. “Sadece yön istiyorum” demek. <code>v.normalize()</code>.</td>
          <td><a href="#/ch1">Bölüm 1</a></td>
        </tr>
        <tr>
          <td>limit / setMag</td>
          <td><code>limit</code> tavan koyar; <code>setMag</code> tam o uzunluğa çeker. Yön durur.</td>
          <td><a href="#/ch1">Bölüm 1</a></td>
        </tr>
        <tr>
          <td>heading</td>
          <td>Vektörün baktığı açı (radyan). p5.js <code>v.heading()</code>. Üçgeni o yöne döndürmek için.</td>
          <td><a href="#/ch1">Bölüm 1</a>, <a href="#/ch5">Bölüm 5</a></td>
        </tr>
      </tbody>
    </table>

    <h2>2 · Kuvvetler</h2>
    <table class="data">
      <thead><tr><th>Terim</th><th>Ne demek</th><th>Nerede</th></tr></thead>
      <tbody>
        <tr>
          <td>kuvvet</td>
          <td>İvmeyi doğuran itme. Newton: F = m·a, yani a = F/m. Kodda <code>applyForce</code>.</td>
          <td><a href="#/ch2">Bölüm 2</a>, <a href="#/mat">Matematik</a></td>
        </tr>
        <tr>
          <td>kütle</td>
          <td>Aynı kuvvete ne kadar direndiğin. Ağır nesne aynı itişte daha az ivmelenir.</td>
          <td><a href="#/ch2">Bölüm 2</a></td>
        </tr>
        <tr>
          <td>yerçekimi</td>
          <td>Aşağı (tuvalde +y) çeken kuvvet. Kitapta çoğu zaman sabit bir vektör.</td>
          <td><a href="#/ch2">Bölüm 2</a></td>
        </tr>
        <tr>
          <td>sürtünme</td>
          <td>Hareketin tersine direnç. Hızı kısaltır; yönü çevirmez, yavaşlatır.</td>
          <td><a href="#/ch2">Bölüm 2</a></td>
        </tr>
        <tr>
          <td>Normal (normal kuvvet)</td>
          <td>Yüzeyin cisme dik itişi. Zemin sizi yutmuyorsa Normal, yerçekimini dengeler. <em>normalize ile karıştırmayın.</em></td>
          <td><a href="#/ch2">Bölüm 2</a></td>
        </tr>
        <tr>
          <td>çekim (çekim kuvveti)</td>
          <td>İki kütle birbirini çeker. Kitapta gezegen / çekici örnekleri.</td>
          <td><a href="#/ch2">Bölüm 2</a></td>
        </tr>
      </tbody>
    </table>

    <h2>3 · Salınım</h2>
    <table class="data">
      <thead><tr><th>Terim</th><th>Ne demek</th><th>Nerede</th></tr></thead>
      <tbody>
        <tr>
          <td>açısal hız</td>
          <td>Açının kare kare değişimi. Dönen cisimde “kaç derece (radyan) döndüm”.</td>
          <td><a href="#/ch3">Bölüm 3</a></td>
        </tr>
        <tr>
          <td>sin / cos</td>
          <td>Çember üzerindeki yatay ve dikey izdüşüm. Salınım ve dönme bunlarla yazılır.</td>
          <td><a href="#/ch3">Bölüm 3</a>, <a href="#/mat">Matematik</a></td>
        </tr>
        <tr>
          <td>sarkaç</td>
          <td>Sabit bir noktadan sarkan kütle. Açı + yerçekimi; basit harmonik değil, küçük açıda yaklaşır.</td>
          <td><a href="#/ch3">Bölüm 3</a></td>
        </tr>
        <tr>
          <td>yay / Hooke</td>
          <td>Uzatıldıkça geri çeken kuvvet. F = −k · uzama.</td>
          <td><a href="#/ch3">Bölüm 3</a></td>
        </tr>
        <tr>
          <td>atan2</td>
          <td>p5.js <code>atan2(dy, dx)</code>: “bu vektör kaç radyan?” Y ekseni önce gelir; sıra tuzağı.</td>
          <td><a href="#/ch3">Bölüm 3</a>, <a href="#/p5">p5.js</a></td>
        </tr>
      </tbody>
    </table>

    <h2>4 · Parçacıklar</h2>
    <table class="data">
      <thead><tr><th>Terim</th><th>Ne demek</th><th>Nerede</th></tr></thead>
      <tbody>
        <tr>
          <td>parçacık</td>
          <td>Kısa ömürlü küçük mover: konum, hız, bazen ömür. Duman, kıvılcım.</td>
          <td><a href="#/ch4">Bölüm 4</a></td>
        </tr>
        <tr>
          <td>yayıcı (emitter)</td>
          <td>Her kare (veya aralıkla) yeni parçacık doğuran nesne.</td>
          <td><a href="#/ch4">Bölüm 4</a></td>
        </tr>
        <tr>
          <td>ömür / lifespan</td>
          <td>Parçacığın kaç kare yaşayacağı. 0 olunca diziden çıkar.</td>
          <td><a href="#/ch4">Bölüm 4</a></td>
        </tr>
      </tbody>
    </table>

    <h2>5 · Otonom ajanlar</h2>
    <table class="data">
      <thead><tr><th>Terim</th><th>Ne demek</th><th>Nerede</th></tr></thead>
      <tbody>
        <tr>
          <td>ajan / taşıt</td>
          <td>Çevreyi algılayıp kuvvet seçen nesne. Reynolds: seek, flee, wander.</td>
          <td><a href="#/ch5">Bölüm 5</a></td>
        </tr>
        <tr>
          <td>direksiyon kuvveti</td>
          <td>İstenen hız eksi şu anki hız. “Oraya gitmek istiyorum, şimdi böyle gidiyorum.”</td>
          <td><a href="#/ch5">Bölüm 5</a></td>
        </tr>
        <tr>
          <td>seek / flee</td>
          <td>Hedefe doğru (seek) veya hedeften uzak (flee) direksiyon.</td>
          <td><a href="#/ch5">Bölüm 5</a></td>
        </tr>
        <tr>
          <td>akış alanı</td>
          <td>Her noktada bir yön oku. Ajan bulunduğu yerdeki oku okur.</td>
          <td><a href="#/ch5">Bölüm 5</a></td>
        </tr>
        <tr>
          <td>sürü (flocking)</td>
          <td>Ayrılma + hizalanma + birleşme. Üç kural, kalabalık kuş.</td>
          <td><a href="#/ch5">Bölüm 5</a></td>
        </tr>
      </tbody>
    </table>

    <h2>6 · Fizik kütüphaneleri</h2>
    <table class="data">
      <thead><tr><th>Terim</th><th>Ne demek</th><th>Nerede</th></tr></thead>
      <tbody>
        <tr>
          <td>Matter.js gövde (Body)</td>
          <td>Motorun taşıdığı cisim: konum, hız, açı, kütle, şekil. Siz <code>applyForce</code> yazmazsınız; gövdeye kuvvet verirsiniz, motor entegre eder.</td>
          <td><a href="#/ch6">Bölüm 6</a></td>
        </tr>
        <tr>
          <td>Engine / World</td>
          <td>Matter.js’te motor (zamanı ilerletir) ve dünya (gövdelerin listesi).</td>
          <td><a href="#/ch6">Bölüm 6</a></td>
        </tr>
        <tr>
          <td>constraint / bağ</td>
          <td>İki gövdeyi veya bir gövdeyi noktaya bağlayan kısıt. Sarkaç, menteşe.</td>
          <td><a href="#/ch6">Bölüm 6</a></td>
        </tr>
        <tr>
          <td>Box2D / Planck.js</td>
          <td>2B katı cisim motoru. p5.play arkasında Planck (Box2D’nin JS hali) çalışır. Doğrudan Planck, p2.js, box2d-html5 de aynı raftadır; p5.collide2D yalnızca tespittir.</td>
          <td><a href="#/ch6">Bölüm 6</a>, <a href="#/p5play">p5.play</a></td>
        </tr>
        <tr>
          <td>Phaser</td>
          <td>HTML5 2B oyun çerçevesi. Arcade Physics hızlı kutu, Matter Physics bu bölümdeki motor. p5.js sketch değildir.</td>
          <td><a href="#/ch6">Bölüm 6</a>, <a href="#/ders">Bu ders</a></td>
        </tr>
        <tr>
          <td>raylib</td>
          <td>C çizim kütüphanesi: pencere, döngü, daire. Unity gibi editör yoktur. Fizik ayrı eklenir (Physac, Chipmunk, Box2D).</td>
          <td><a href="#/motorlar">Diğer motorlar</a></td>
        </tr>
        <tr>
          <td>Pymunk</td>
          <td>Python’da Chipmunk2D. 2B oyunun ciddi ofisi. Pygame kalemdir; <code>rect.colliderect</code> ofis değildir.</td>
          <td><a href="#/motorlar">Diğer motorlar</a></td>
        </tr>
        <tr>
          <td>PyBox2D</td>
          <td>Python’da Box2D. Unity 2B / Angry Birds soyu; metre dünyası, fixture, joint.</td>
          <td><a href="#/motorlar">Diğer motorlar</a></td>
        </tr>
        <tr>
          <td>PyBullet / MuJoCo</td>
          <td>3B rijit cisim ve robotik. Bullet ve MuJoCo C++ ofisleri; Python kapıdır. Bu tuval 2B analogdur.</td>
          <td><a href="#/motorlar">Diğer motorlar</a></td>
        </tr>
        <tr>
          <td>Rigidbody2D (Unity)</td>
          <td>C# / Unity’de 2B gövde. <code>AddForce</code> kitabın <code>applyForce</code>’u; altta Box2D soyu.</td>
          <td><a href="#/ch6">Bölüm 6</a></td>
        </tr>
      </tbody>
    </table>

    <h2>7–8 · Izgara ve fraktal</h2>
    <table class="data">
      <thead><tr><th>Terim</th><th>Ne demek</th><th>Nerede</th></tr></thead>
      <tbody>
        <tr>
          <td>hücresel otomat</td>
          <td>Izgara; her hücre komşularına bakıp bir sonraki karede 0/1 olur. Game of Life.</td>
          <td><a href="#/ch7">Bölüm 7</a></td>
        </tr>
        <tr>
          <td>fraktal</td>
          <td>Parça bütüne benzer. Özyineleme ile dal, ağaç, Koch eğrisi.</td>
          <td><a href="#/ch8">Bölüm 8</a></td>
        </tr>
        <tr>
          <td>özyineleme</td>
          <td>Fonksiyonun kendini (daha küçük iş ile) çağırması. Durma koşulu şart.</td>
          <td><a href="#/ch8">Bölüm 8</a></td>
        </tr>
      </tbody>
    </table>

    <h2>9 · Genetik algoritma</h2>
    <table class="data">
      <thead><tr><th>Terim</th><th>Ne demek</th><th>Nerede</th></tr></thead>
      <tbody>
        <tr>
          <td>popülasyon</td>
          <td>Aynı anda denenen birçok aday. Bir kuş değil, iki yüz kuş.</td>
          <td><a href="#/ch9">Bölüm 9</a>, <a href="#/ch11">Bölüm 11</a></td>
        </tr>
        <tr>
          <td>genom / DNA / gen</td>
          <td>Adayın ayarları. Dizi: vektörler, 0/1’ler veya (Bölüm 11’de) ağ ağırlıkları.</td>
          <td><a href="#/ch9">Bölüm 9</a>, <a href="#/ch11">Bölüm 11</a></td>
        </tr>
        <tr>
          <td>fitness</td>
          <td>Bu aday ne kadar iyi? Sayı. Flappy’de hayatta kalan kare sayısı; hedefe yakınlık başka bir dünya.</td>
          <td><a href="#/ch9">Bölüm 9</a>, <a href="#/ch11">Bölüm 11</a></td>
        </tr>
        <tr>
          <td>seçilim</td>
          <td>Yüksek fitness’lı ebeveynlerin daha sık seçilmesi. Zar hâlâ atılır; adil değil, ağırlıklıdır.</td>
          <td><a href="#/ch9">Bölüm 9</a></td>
        </tr>
        <tr>
          <td>çaprazlama (crossover)</td>
          <td>İki ebeveynin genlerini karıştırıp çocuk yapmak.</td>
          <td><a href="#/ch9">Bölüm 9</a></td>
        </tr>
        <tr>
          <td>mutasyon</td>
          <td>Çocuğun genine küçük rastgele dokunuş. Takılmaz, yeni arar.</td>
          <td><a href="#/ch9">Bölüm 9</a></td>
        </tr>
      </tbody>
    </table>

    <h2>10–11 · Ağ ve nöroevrim</h2>
    <table class="data">
      <thead><tr><th>Terim</th><th>Ne demek</th><th>Nerede</th></tr></thead>
      <tbody>
        <tr>
          <td>sinir ağı</td>
          <td>Girdileri ağırlıklarla karıştırıp çıktı üreten katmanlar. “Beyin” burası.</td>
          <td><a href="#/ch10">Bölüm 10</a></td>
        </tr>
        <tr>
          <td>ağırlık</td>
          <td>Bir bağlantının sayısı. Büyük ağırlık o girdiyi daha çok dinler.</td>
          <td><a href="#/ch10">Bölüm 10</a></td>
        </tr>
        <tr>
          <td>aktivasyon / sigmoid</td>
          <td>Toplamı 0–1 aralığına büken eğri. Karar eşiği için.</td>
          <td><a href="#/ch10">Bölüm 10</a>, <a href="#/ch11">Bölüm 11</a></td>
        </tr>
        <tr>
          <td>sınıflandırma / regresyon</td>
          <td>Sınıflandırma: etiket (flap / flap yok). Regresyon: sürekli sayı (açı, büyüklük).</td>
          <td><a href="#/ch10">Bölüm 10</a>, <a href="#/ch11">Bölüm 11</a></td>
        </tr>
        <tr>
          <td>denetimli öğrenme</td>
          <td>Doğru cevaplı veri seti. Ağ, etikete yaklaşacak şekilde ağırlık ayarlar.</td>
          <td><a href="#/ch10">Bölüm 10</a></td>
        </tr>
        <tr>
          <td>pekiştirmeli öğrenme</td>
          <td>Etiket yok; ödül/ceza var. Deneyerek politika öğrenir. Bu bölümde yolumuz GA.</td>
          <td><a href="#/ch11">Bölüm 11</a></td>
        </tr>
        <tr>
          <td>özellik (feature)</td>
          <td>Modele verdiğiniz seçilmiş sayılar. Flappy’de kuşun y’si, boru boşluğu — bütün pikseller değil.</td>
          <td><a href="#/ch11">Bölüm 11</a></td>
        </tr>
        <tr>
          <td>nöroevrim</td>
          <td>Ağın ağırlıkları (bazen yapısı) genetik algoritmayla evrilir. Genom = ağırlık listesi.</td>
          <td><a href="#/ch11">Bölüm 11</a></td>
        </tr>
        <tr>
          <td>NEAT</td>
          <td>NeuroEvolution of Augmenting Topologies: ağırlıkla birlikte ağ yapısını da evrimleştirir. Kitap ml5 ile daha yalın bir yol tutar.</td>
          <td><a href="#/ch11">Bölüm 11</a></td>
        </tr>
        <tr>
          <td>sensör</td>
          <td>Ajanın sınırlı algısı. Bıyık ucu yiyeceğin içindeyse değer yanar; tüm haritayı “bilmez”.</td>
          <td><a href="#/ch11">Bölüm 11</a></td>
        </tr>
      </tbody>
    </table>

    <h2>p5.play</h2>
    <table class="data">
      <thead><tr><th>Terim</th><th>Ne demek</th><th>Nerede</th></tr></thead>
      <tbody>
        <tr>
          <td>Sprite</td>
          <td>Oyundaki cisim: konum, boyut, çizim, çoğu zaman fizik gövdesi. Kitaptaki Mover’ın oyun şekli.</td>
          <td><a href="#/p5play">p5.play</a></td>
        </tr>
        <tr>
          <td>Group</td>
          <td>Aynı cinsten sprite listesi. Mermiler, düşmanlar; toplu çarpışma.</td>
          <td><a href="#/p5play">p5.play</a></td>
        </tr>
        <tr>
          <td>collider</td>
          <td>Çarpışma sınırı ve türü: dynamic, static, kinematic, none.</td>
          <td><a href="#/p5play">p5.play</a></td>
        </tr>
        <tr>
          <td>collides / overlaps</td>
          <td><code>collides</code> iter (duvar). <code>overlaps</code> geçer (jeton, tetik bölge).</td>
          <td><a href="#/p5play">p5.play</a></td>
        </tr>
        <tr>
          <td>kb</td>
          <td>p5.play klavye nesnesi. <code>pressing</code> basılı, <code>presses</code> bu karede bir kez.</td>
          <td><a href="#/p5play">p5.play</a></td>
        </tr>
        <tr>
          <td>camera</td>
          <td>Dünyanın hangi parçasının tuvalde görüneceği. UI için <code>camera.off</code>.</td>
          <td><a href="#/p5play">p5.play</a></td>
        </tr>
        <tr>
          <td>vel / applyForce</td>
          <td><code>sprite.vel</code> hız vektörü (Bölüm 1). <code>applyForce</code> kütleyi hesaba katar (Bölüm 2).</td>
          <td><a href="#/p5play">p5.play</a>, <a href="#/ch1">Bölüm 1</a>, <a href="#/ch2">Bölüm 2</a></td>
        </tr>
        <tr>
          <td>moveTowards / moveTo</td>
          <td>Hedefe her kare yaklaş / bir kez gidip dur. Bölüm 5 ajanının oyun fiilleri.</td>
          <td><a href="#/p5play">p5.play</a>, <a href="#/ch5">Bölüm 5</a></td>
        </tr>
        <tr>
          <td>rotationLock</td>
          <td>Açıyı kilitler; takla atmaz. Platformer karakteri için. Fizik durmaz.</td>
          <td><a href="#/p5play">p5.play</a></td>
        </tr>
        <tr>
          <td>Joint (eklem)</td>
          <td>İki sprite’ı bağlar. <code>DistanceJoint</code> ip (Bölüm 3 sarkaç, Bölüm 6 kısıt).</td>
          <td><a href="#/p5play">p5.play</a>, <a href="#/ch3">Bölüm 3</a>, <a href="#/ch6">Bölüm 6</a></td>
        </tr>
        <tr>
          <td>Arcade Physics</td>
          <td>Phaser’ın hızlı kutu fiziği. Dönme yok. Platformer.</td>
          <td><a href="#/phaser">Phaser</a></td>
        </tr>
        <tr>
          <td>Matter Physics (Phaser)</td>
          <td>Aynı Phaser, dönen gövde. mouseSpring, constraint, isSensor.</td>
          <td><a href="#/phaser">Phaser</a>, <a href="#/matter">Matter.js oyun</a></td>
        </tr>
        <tr>
          <td>MouseConstraint / sapan</td>
          <td>Fare teli; iki yumuşak constraint lastik gibi gerilir.</td>
          <td><a href="#/matter">Matter.js oyun</a></td>
        </tr>
        <tr>
          <td>FixedUpdate</td>
          <td>Unity’de fizik adımı. Kuvvet buraya yazılır; <code>Update</code> kare hızına bağlıdır.</td>
          <td><a href="#/unity">Unity / C#</a></td>
        </tr>
        <tr>
          <td>CharacterBody2D</td>
          <td>Godot’ta oyuncu gövdesi. Yerçekimini siz Euler ile yazarsınız; <code>move_and_slide</code>.</td>
          <td><a href="#/motorlar">Diğer motorlar</a></td>
        </tr>
      </tbody>
    </table>

    <p><a href="#/kaynaklar">Kaynaklar →</a></p>
  `,
  editors: {},
});
