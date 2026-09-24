registerChapter({
  id: "p5play",
  title: "p5.play · oyun iskeleti",
  short: "p5.play",
  icon: "🎮",
  html: `
    <p>Bölüm 1’de konum ve hızı vektör yaptınız. Bölüm 2’de kuvvet ivmeyi değiştirdi. Bölüm 6’da Matter.js gövdeyi entegre etti. Oyun ödevi zemin, jeton, tuş, kamera ister. <strong>p5.play</strong> bu katmandır.</p>

    <p class="toc-inline"><strong>Bu sayfada:</strong>
      <a href="#sp-sprite">Sprite</a> ·
      <a href="#sp-fizik">Fizik</a> ·
      <a href="#sp-hareket">Hareket</a> ·
      <a href="#sp-carpisma">Çarpışma</a> ·
      <a href="#sp-gorun">Görsel</a> ·
      <a href="#sp-grup">Grup</a> ·
      <a href="#sp-girdi">Girdi</a> ·
      <a href="#sp-kamera">Kamera</a> ·
      <a href="#sp-ileri">İleri</a> ·
      <a href="#sp-extra">Extra</a> ·
      <a href="#sp-firin">Tek fırın</a>
    </p>

    <p>Bu sayfa <a href="https://gusanmaz.github.io/p5play-tutorial/" target="_blank" rel="noopener">p5.play Türkçe eğitimindeki</a> her canlı örneği taşır: sprite, fizik, hareket, çarpışma, görsel, grup, tuş, kamera, eklem, kiremit. Eğitimin sırası durur. Cümleler kitabın vektör ve kuvvet diline bağlanır; tutorial “kütle = ağırlık” derse burada düzeltilir.</p>
    <p>p5.play bir fizik motoru değildir. Sprite, tuş, kamera verir; altında <strong>Planck.js</strong> (Box2D’nin JavaScript hali) çalışır. Matter.js ofistir (Bölüm 6); Phaser sahne çerçevesidir (<a href="#/phaser">Phaser bölümü</a>); Unity Inspector’dır (<a href="#/unity">Unity / C#</a>). Bu sayfa p5.js tuvalinde oyun iskeleti kurar.</p>
    ${N.note("Kütüphane ve API","<p>Kütüphane başkasının yazdığı tarif paketidir. API o paketin kapısındaki düğmelerdir: <code>new Sprite()</code>, <code>collides</code>, <code>kb.pressing</code>. Düğmeyi ezberlemek yetmez: yanlış yazınca ne bozulur, o cümle gerekir. Planck’ı atlayıp yalnızca sprite ezberlemek, zemin <code>static</code> olmayınca “kütüphane bozuk” demektir.</p>")}
    <p>Bu dersin eski dönemlerinde Phaser ayrı bölümlerdi. p5.js birkaç yıldır aynı programda duruyor. p5.play o p5.js tuvaline oturur: <code>setup</code> / <code>draw</code> kalır. Phaser’ı unutmuş saymayın; büyük HTML5 oyunda yine karşınıza çıkar.</p>
    <h3>Kurulum</h3>
    <p>Kendi HTML dosyanızda sıra kilitlidir: önce p5.js, sonra Planck, en son p5.play. Ters sırada <code>Sprite is not defined</code> görürsünüz. Bu web kitabının editörü sırayı sizin yerinize yükler (<code>libraries: ["p5play"]</code>). p5.js web editöründe <code>index.html</code>’e aynı üç satır eklenir.</p>
    <p><code>&lt;script src="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.js"&gt;&lt;/script&gt;</code></p>
    <p><code>&lt;script src="https://p5play.org/v3/planck.min.js"&gt;&lt;/script&gt;</code></p>
    <p><code>&lt;script src="https://p5play.org/v3/p5play.js"&gt;&lt;/script&gt;</code></p>
    ${N.warn("Tuzak: createCanvas + p5.play","<p><code>new Canvas(genişlik, yükseklik)</code> yazın. <code>createCanvas</code> p5.js tuvalidir; p5.play kamera ve dünya ölçeğini kendi Canvas’ına bağlar. İkisini karıştırmayın.</p>")}
    <h3>p5.js ile p5.play aynı tuvalde</h3>
    <p>p5.js her kare <code>circle(x, y, r)</code> ister: konum sizde, çizim sizde. p5.play’de sprite bir kez doğar; kütüphane onu her kare çizer. <code>draw</code> içinde <code>player.display()</code> yoktur. Unutunca iki sprite görürsünüz: biri sizin <code>circle</code>’ınız, biri motorun.</p>

    <h3>İlk Sprite Örneği</h3>
    ${N.editor("pg0")}

    <h3>Koordinat Sistemi</h3>
    ${N.editor("pg1")}

    <h3>Draw Döngüsü</h3>
    ${N.editor("pg2")}

    <h2 id="sp-sprite">Sprite temelleri</h2>
    <p>Eski oyunlarda ekranda uçan grafiğe sprite denirdi. p5.play’de sprite hem o grafik hem (isterseniz) fizik gövdesidir: merkez <code>x</code>, <code>y</code>; genişlik ve yükseklik; renk. Doğar doğmaz <code>allSprites</code> grubuna girer. p5.js <code>rect</code> sol üstten çizer; sprite konumu merkezdir. Karışınca kutu “kaymış” sanırsınız.</p>
    <p>JavaScript’te <code>new</code> bir kalıptan nesne doğurur. Aynı <code>Sprite</code> kalıbı farklı sayıda argüman kabul eder. Üç sayı dairedir ve üçüncü sayı <strong>çaptır</strong>, yarıçap değil. Dört sayı dikdörtgendir. Beşinci argüman collider türü veya <code>'line'</code> / <code>'triangle'</code> olabilir.</p>
    ${N.quiz("Sprite’ın (0, 0) noktası tuvalde neresidir?",["Kutunun sol üstü","Kutunun merkezi","Tuvalin sol altı"],1,"p5.play sprite konumu merkezdir. p5.js rect varsayılanı sol üst köşedir.")}

    <h3>Temel Sprite Şekilleri</h3>
    ${N.editor("pg3")}

    <h3>Özel Şekiller</h3>
    ${N.editor("pg4")}

    <h3>Sprite Stilleri</h3>
    ${N.editor("pg5")}

    <h3>Rotation Örneği</h3>
    ${N.editor("pg6")}

    <h3>Scale Animasyonu</h3>
    ${N.editor("pg7")}

    <h3>Pozisyon ve Boyut</h3>
    ${N.editor("pg8")}

    <h3>Mirror Ornegi</h3>
    ${N.editor("pg9")}

    <h3>Görünürlük ve Layer</h3>
    ${N.editor("pg10")}

    <h3>Sprite Remove</h3>
    ${N.editor("pg11")}

    <h3>life Özelliği</h3>
    ${N.editor("pg12")}

    <h2 id="sp-fizik">Fizik motoru (Planck / Box2D)</h2>
    <p>Phaser’da menüde iki fırın durur: Arcade veya Matter. p5.play’de menü yoktur. Sprite doğduğu anda tek ofise girer: <strong>Planck.js</strong>. Angry Birds, Limbo, Crayon Physics aynı aileden gelir: Box2D. Planck onun JavaScript yazımıdır; p5.play onu gizler. Siz <code>world.gravity.y = 10</code> dersiniz; her dinamik cisme aşağı bir kuvvet uygulanır. 10, SI’daki 9,8 m/s² değildir; oyun birimidir. <code>world</code> aslında <code>planck.World</code>’dür: gravity, timeScale, rayCast o ofisin düğmeleridir, ikinci bir motor değil.</p>
    ${N.warn("Tuzak: kütle ≠ ağırlık","<p>Tutorial bazen kütleyi ağırlık diye yazar. Ağırlık, yerçekiminin kütleye çarpmasıdır. Uzayda (<code>gravity.y = 0</code>) ağırlık yok olur, kütle durur: aynı <code>applyForce</code> hâlâ ağır cismi az kıpırdatır. Bölüm 2’deki <code>F = m a</code> burada da geçerlidir.</p>")}
    <p>Collider türü süs değildir. <code>dynamic</code> düşer; <code>static</code> zemin gibi durur; <code>kinematic</code> kodla kayar ama yerçekimi çekmez (asansör); <code>none</code> hayalettir, çarpışmaz.</p>
    ${N.quiz("Kayan bir asansör için hangi collider?",["dynamic — yerçekimi de çeksin","kinematic — kod hareket ettirir, fizik çekmez","none — çarpışmasın"],1,"Oyuncu binsin diye çarpışma gerekir; yerçekimi asansörü düşürmesin diye kinematic.")}

    <h3>Yerçekimi Örneği</h3>
    ${N.editor("pg13")}

    <h3>Collider Türleri</h3>
    ${N.editor("pg14")}

    <h3>Sürtünme Karşılaştırması</h3>
    ${N.editor("pg15")}

    <h3>Sekme Katsayısı</h3>
    ${N.editor("pg16")}

    <h3>Kuvvet ve Hız Kontrolü</h3>
    ${N.editor("pg17")}

    <h2 id="sp-hareket">Hareket: vel, kuvvet, hedef</h2>
    <p>Bölüm 1 her kare <code>position.add(velocity)</code> der. p5.play aynı işi <code>sprite.vel</code> ile yapar. <code>applyForce</code> kütleyi böler (Bölüm 2). <code>vel.x = 4</code> hızı ezer — buz hokeyi çubuğu. İkisi farklı tasarımdır.</p>
    <p><code>moveTowards(hedef, izleme)</code> her kare biraz yaklaşır: 0.05 tembel, 1 neredeyse yapışır. <code>moveTo(x, y, hız)</code> bir kez çağrılır, gider, durur. <code>moveAway</code> kaçıştırır. Üçü de yerçekimiyle kavga eder; takip sahnesinde <code>gravity.y = 0</code> bırakın, yoksa “fareyi izliyorum” derken yere çöker.</p>
    ${N.warn("Tuzak: her kare sprite.x += 4","<p>Konumu elle artırmak fizik motorunu ezer: çarpışma, sürtünme, yerçekimi bir kare sonra yine çeker. Hareket için <code>vel</code>, <code>applyForce</code> veya <code>moveTowards</code>.</p>")}

    <h3>moveTowards Örneği</h3>
    ${N.editor("pg18")}

    <h3>moveTo Örneği</h3>
    ${N.editor("pg19")}

    <h3>Sıralı Hareket (Patrol)</h3>
    ${N.editor("pg20")}

    <h3>Hedefe Dönme</h3>
    ${N.editor("pg21")}

    <h3>Kaçış Oyunu</h3>
    ${N.editor("pg22")}

    <h3>Hız Kontrolü</h3>
    ${N.editor("pg23")}

    <h2 id="sp-carpisma">Çarpışma: itmek ile geçmek</h2>
    <p>İki kesişim aynı geometri, iki niyet. Duvar <em>itsin</em> istiyorsanız <code>collides</code>: motor Normal kuvvet uygular. Jeton <em>toplansın</em> istiyorsanız <code>overlaps</code>: içinden geçersiniz, callback’de <code>remove</code>. İngilizce üç zaman: <code>collides</code> temasın başladığı kare, <code>colliding</code> sürdüğü sürece (“yerde miyim?”), <code>collided</code> bittiği kare.</p>
    ${N.quiz("Oyuncu jetonun içinden geçip jeton silinsin. Hangisi?",["collides","overlaps","yalnızca dist"],1,"overlaps fiziksel itme yapmaz. collides jetonu süpürge gibi iter.")}

    <h3>Collides vs Overlaps</h3>
    ${N.editor("pg24")}

    <h3>Coin Toplama Oyunu</h3>
    ${N.editor("pg25")}

    <h3>Platform Zıplama</h3>
    ${N.editor("pg26")}

    <h3>Çarpışma Filtreleme</h3>
    ${N.editor("pg27")}

    <h2 id="sp-gorun">Görsel: renk, katman, debug</h2>
    <p>Renk ve yazı fizik değildir; collider kutusunu değiştirmez. Karakter resmi büyük, çarpan kabuk küçükse ayaklar havada duruyor gibi görünür. <code>allSprites.debug = true</code> o kabuğu çizer. <code>layer</code> yalnızca çizim sırasıdır: büyük sayı önde. Arkayı öne çizmek çarpışmayı değiştirmez.</p>
    <p><code>sprite.draw</code> ile kendi çiziminizi bağlarsınız; animasyon karesi de burada değişir. <code>mirror.x = true</code> resmi yatay çevirir — hızın işaretine bağlarsanız karakter döndüğü yöne bakar.</p>

    <h3>Görsel Özellikler</h3>
    ${N.editor("pg28")}

    <h3>Layer (Katman) Örneği</h3>
    ${N.editor("pg29")}

    <h3>Emoji Karakter</h3>
    ${N.editor("pg30")}

    <h3>Custom Draw Örneği</h3>
    ${N.editor("pg31")}

    <h3>Animasyon Simülasyonu</h3>
    ${N.editor("pg32")}

    <h3>Mirror Ornegi</h3>
    ${N.editor("pg33")}

    <h3>Debug Modu</h3>
    ${N.editor("pg34")}

    <h2 id="sp-grup">Group: dizinin oyun hali</h2>
    <p>Bölüm 4’te parçacıkları diziye koydunuz. <code>Group</code> aynı işi sprite için yapar: ortak renk, ortak çap, ortak çarpışma kuralı. <code>new coins.Sprite(x, y)</code> hem doğurur hem gruba ekler. <code>oyuncu.overlaps(jetonlar, topla)</code> gruptaki herkesle tek kuraldır. Alt grup (subgroup) “kırmızı düşmanlar” ile “mavi düşmanlar”ı ayırır; ikisi de düşmandır, skor ayrıdır.</p>

    <h3>Group Temelleri</h3>
    ${N.editor("pg35")}

    <h3>allSprites Örneği</h3>
    ${N.editor("pg36")}

    <h3>Parçacık Sistemi</h3>
    ${N.editor("pg37")}

    <h3>Subgroup Örneği</h3>
    ${N.editor("pg38")}

    <h2 id="sp-girdi">Tuş ve fare</h2>
    <p>p5.js <code>keyIsDown</code> “şu an basılı mı” der. Zıplama için yetmez: her kare true olursa karakter uçar. p5.play iki fiil ayırır: <code>kb.pressing</code> basılı olduğu sürece (yürüme), <code>kb.presses</code> yalnızca basıldığı kare (zıplama, ateş). Farede aynı fiiller: <code>mouse.pressing()</code>, <code>mouse.presses()</code>. Sprite’ın kendi <code>sprite.mouse.hovering()</code> “imleç bu cismin üstünde mi” der; <code>dist</code> yazmazsınız.</p>
    ${N.warn("Tuzak: iframe tuşu yutmaz","<p>Önce önizleme tuvaline tıklayın. Tıklamazsanız tuş tarayıcıya veya kod paneline gider; kutu durur, siz “kb bozuk” dersiniz.</p>")}
    <p>Kamera kayınca <code>mouse.x</code> dünya koordinatıdır, p5.js <code>mouseX</code> tuval pikselidir. Tıklanan yere sprite göndermek için p5.play <code>mouse</code> kullanın.</p>

    <h3>Klavye Kontrolleri</h3>
    ${N.editor("pg39")}

    <h3>Mouse Kontrolleri</h3>
    ${N.editor("pg40")}

    <h3>Sprite Mouse Olayları</h3>
    ${N.editor("pg41")}

    <h3>Sürükle-Bırak</h3>
    ${N.editor("pg42")}

    <h3>Gelişmiş Kontrol Şeması</h3>
    ${N.editor("pg43")}

    <h2 id="sp-kamera">Kamera: dünya tuvalden büyükse</h2>
    <p>Mario’nun dünyası ekrandan uzundur. Karton pencereyi oyuncunun üstüne kaydırırsınız; dünyayı küçültmezsiniz. p5.js’te bu <code>translate(-oyuncu.x + width/2, -oyuncu.y + height/2)</code> idi. p5.play aynı işi gizler: <code>camera.x = oyuncu.x</code> “şu dünya noktasını tuvalin ortasına koy” demektir. Sprite hâlâ dünya koordinatındadır: <code>oyuncu.x = 700</code> tuval 400 piksel olsa da geçerlidir. Fizik ofisi (Planck) dünya biriminde adım atar; kamera yalnızca kalemi kaydırır.</p>
    <p>Skor yazısını kamerayla kaydırırsanız yazı evin duvarına yapışır, kaçar. HUD için <code>camera.off()</code>, yazın, <code>camera.on()</code> — p5.js <code>push</code>/<code>pop</code> ile aynı fikir. <code>camera.zoom</code> p5.js <code>scale</code>’dir: mercek büyür, <code>mouse.x</code> dünya koordinatında kalır, p5.js <code>mouseX</code> tuvalde kalır. Tıklanan yere sprite için p5.play <code>mouse</code> kullanın.</p>
    ${N.quiz("Oyuncu dünya x=500, kamera x=500, tuval 400. Oyuncu ekranda nerede?",["Sol kenar","Orta","Sağ kenarın dışında"],1,"Kamera baktığı noktayı tuval merkezine koyar.")}

    <h3>Kamera Takibi</h3>
    ${N.editor("pg44")}

    <h3>Yumuşak Takip (Lerp)</h3>
    ${N.editor("pg45")}

    <h3>Zoom Kontrolü</h3>
    ${N.editor("pg46")}

    <h3>Camera Shake</h3>
    ${N.editor("pg47")}

    <h3>UI Layer Örneği</h3>
    ${N.editor("pg48")}

    <h2 id="sp-ileri">Eklem, platform, mini oyun</h2>
    <p>Bölüm 3 sarkaçtı: ip uzunluğu sabit. Bölüm 6 Matter.js kısıtı aynı işi gövdeye bağladı. p5.play’de adı joint: <code>DistanceJoint</code> ip, <code>HingeJoint</code> menteşe, <code>GlueJoint</code> yapıştırma, <code>WheelJoint</code> teker. İki sprite’ın <code>x</code>’ini her kare eşitlemek eklem değildir — motoru ezer.</p>
    <p><code>rotationLock = true</code> açıyı kilitler; platformer karakteri lastik gibi yuvarlanmasın. Fizik durmaz, yalnızca takla durur.</p>

    <h3>Basit Sarkaç (DistanceJoint)</h3>
    ${N.editor("pg49")}

    <h3>HingeJoint: menteşe</h3>
    ${N.editor("pg69")}

    <h3>GlueJoint: yapıştır</h3>
    ${N.editor("pg70")}

    <h3>WheelJoint: teker</h3>
    ${N.editor("pg71")}

    <h3>Zincir Efekti</h3>
    ${N.editor("pg50")}

    <h3>Platform Oyunu</h3>
    ${N.editor("pg51")}

    <h3>Combo Collider</h3>
    ${N.editor("pg52")}

    <h3>Sensör Bölgeleri</h3>
    ${N.editor("pg53")}

    <h3>Mini Space Shooter</h3>
    ${N.editor("pg54")}

    <h2 id="sp-extra">Kiremit, çekim, ömür, API</h2>
    <p>Kiremit (tile) haritası karakter dizisinden zemin doğurur: <code>'='</code> zemin, <code>'.'</code> boş. <code>Tiles</code> resmi atlas da ister; atlas yoksa aynı fikir döngüyle static sprite dizmektir. <code>attractTo</code> Bölüm 2’deki çekim kuvvetinin motor halidir. <code>life</code> kare sayacı bitince sprite’ı siler — mermi ve parçacık. <code>angleTo</code> / <code>rotateTowards</code> ajanın hedefe dönmesidir (Bölüm 5). <code>distanceTo</code> p5.js <code>dist</code>’inin sprite hali.</p>

    <h3>Sprite Türleri</h3>
    ${N.editor("pg55")}

    <h3>Input Detaylı Test</h3>
    ${N.editor("pg56")}

    <h3>Otomatik Ömür (life)</h3>
    ${N.editor("pg57")}

    <h3>allSprites Kullanımı</h3>
    ${N.editor("pg58")}

    <h3>spriteArt Örneği</h3>
    ${N.editor("pg59")}

    <h3>Tiles ile Labirent</h3>
    ${N.editor("pg60")}

    <h3>Yörünge Simülasyonu</h3>
    ${N.editor("pg61")}

    <h3>moveAway Örneği</h3>
    ${N.editor("pg62")}

    <h3>Asenkron Bekleme</h3>
    ${N.editor("pg63")}

    <h3>Yön Hesaplama</h3>
    ${N.editor("pg64")}

    <h3>Mesafe ile Toplama</h3>
    ${N.editor("pg65")}

    <h3>Buton Sistemi</h3>
    ${N.editor("pg66")}

    <h3>Parçacık Sistemi</h3>
    ${N.editor("pg67")}

    <h3>Araba Kontrolü</h3>
    ${N.editor("pg68")}

    <h2 id="sp-firin">Tek fırın: başka motor yok, düğme var</h2>
    <p>Pizzacıda bir fırın vardır. Hamuru yoğurursunuz (sprite, tuş, kamera); pişiren fırın Planck’tır. Phaser restoranında iki fırın yan yanadır: Arcade hızlı kutu, Matter dönen dünya. p5.play’de “Matter’ı seç” düğmesi durmaz. <code>new Sprite</code> Planck gövdesi doğurur. Matter.js’i aynı sketch’e yüklemek ikinci ofis açar: sprite’lar onu görmez, kutu çizilir ama komşu ofisle çarpışmaz — Phaser’da Arcade+Matter tuzağının kardeşidir.</p>
    <p>2015’teki p5.play (molleindustria, v1) fırın bile getirmezdi: kendi AABB çarpışması, takla yok, eklem yok. O dükkân bu sayfadaki v3 değildir. Aynı yazarın <a href="https://q5play.org" target="_blank" rel="noopener">q5play</a>’i p5.js tuvalini bırakır: çizim q5.js WebGPU, fizik Box2D v3 WASM. Sprite cümlesi benzerdir; fırın başka, lisans eğitim için ayrıdır. Bu ders p5.js + p5.play v3 + Planck’ta kalır.</p>
    <p>Planck’ın kayda değer düğmeleri <code>world</code> üzerindedir. <code>timeScale</code> zamanı yavaşlatır (Matter’daki <code>engine.timing.timeScale</code>). <code>rayCast</code> ayak altı kısa dikmedir (Matter <code>Query.ray</code>, Unity Raycast). <code>allowSleeping</code> duran kuleyi uyutur. <code>physicsUpdate</code> ofis adımıdır; <code>draw</code> sonunda kendiliğinden çalışır, Matter <code>Engine.update</code> ile karıştırmayın. Planck metre konuşur; p5.play 60 piksel = 1 metre gizler (<code>world.meterSize</code>). Siz <code>sprite.x = 200</code> dersiniz, ofis 200/60 metre görür — Box2D ölçek tuzağını sprite API yutar.</p>
    ${N.warn("Tuzak: p5.play + Matter aynı sketch","<p>İki ofis, iki adım. Sprite Planck’tadır. Matter gövdesi ayrı listededir. Çarpışma sessizce yok olur. Fizik için ya p5.play, ya Matter.js (Bölüm 6), ya Phaser Matter. Üçünü bir tuvalde “daha gerçekçi olsun” diye yığmayın.</p>")}
    ${N.quiz("p5.play v3’te fizik motorunu Matter.js yapmak?",["config.physics.default = 'matter' yeter","Olmaz; sprite Planck ofisindedir","world.gravity Matter’ı otomatik çağırır"],1,"Phaser iki fırın sunar. p5.play v3 tek fırın gizler: Planck. Matter komşu raftadır, bu kütüphanenin seçeneği değildir.")}
    ${N.editor("pg72")}
    ${N.editor("pg73")}
    ${N.tryit([{ do: "pg72’de timeScale 0.3’ü 1.2 yapın.", expect: "Düşüş hızlanır; yerçekimi sayısı aynı kalır, zaman akar." }])}

    <h2>Nereden devam</h2>
    <p>Bu sayfadaki örnekler eğitimin playground’larıyla aynı kapsamadır; vektör ve kuvvet cümleleri kitaba bağlıdır. Phaser sahne ve Arcade/Matter için <a href="#/phaser">Phaser</a>, C# Inspector için <a href="#/unity">Unity</a>, Godot ve Box2D ailesi için <a href="#/motorlar">diğer motorlar</a>.</p>
    ${N.resources([
      { kind: "Tutorial", title: "p5.play Türkçe eğitim (canlı)", url: "https://gusanmaz.github.io/p5play-tutorial/" },
      { kind: "Kod", title: "gusanmaz/p5play-tutorial", url: "https://github.com/gusanmaz/p5play-tutorial" },
      { kind: "Dokümantasyon", title: "p5play.org/docs", url: "https://p5play.org/docs/" },
      { kind: "Öğrenme", title: "p5play.org/learn", url: "https://p5play.org/learn/" },
      { kind: "Kod", title: "p5.play GitHub", url: "https://github.com/quinton-ashley/p5play" },
      { kind: "Referans", title: "Planck.js (Box2D JS)", url: "https://piqnt.github.io/planck.js/" },
      { kind: "Dokümantasyon", title: "World (timeScale, rayCast)", url: "https://p5play.org/docs/World.html" },
      { kind: "Not", title: "q5play · Box2D v3 WASM (p5.js değil)", url: "https://q5play.org" },
      { kind: "Kitap", title: "Bölüm 6 Matter.js", url: "#/ch6" },
      { kind: "Kitap", title: "Phaser", url: "#/phaser" },
      { kind: "Kitap", title: "Unity / C#", url: "#/unity" },
    ])}

  `,
  editors: {
    pg0: {
      title: "İlk Sprite Örneği",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `function setup() {
    new Canvas(400, 300);
    
    // İlk sprite'ımız!
    // Sprite(x, y, genişlik, yükseklik)
    let player = new Sprite(200, 150, 60, 60);
    player.color = 'coral';
    
    // Metin ekleyelim
    player.text = '👋';
    player.textSize = 30;
}

function draw() {
    background('#1a1a2e');
}
`,
        },
      ],
    },
    pg1: {
      title: "Koordinat Sistemi",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `function setup() {
    new Canvas(400, 300);
    
    // Sol üst köşe (0,0 yakını)
    let solUst = new Sprite(50, 50, 30);
    solUst.color = '#ff6b9d';
    solUst.text = '1';
    
    // Sağ üst köşe
    let sagUst = new Sprite(350, 50, 30);
    sagUst.color = '#00d4ff';
    sagUst.text = '2';
    
    // Sol alt köşe
    let solAlt = new Sprite(50, 250, 30);
    solAlt.color = '#00ff88';
    solAlt.text = '3';
    
    // Sağ alt köşe
    let sagAlt = new Sprite(350, 250, 30);
    sagAlt.color = '#febc2e';
    sagAlt.text = '4';
    
    // Merkez
    let merkez = new Sprite(200, 150, 40);
    merkez.color = '#c44dff';
    merkez.text = 'M';
}

function draw() {
    background('#1a1a2e');
    
    // Koordinat bilgileri
    fill(255);
    textSize(10);
    text('(50,50)', 35, 85);
    text('(350,50)', 320, 85);
    text('(50,250)', 35, 235);
    text('(350,250)', 320, 235);
    text('(200,150)', 180, 180);
}
`,
        },
      ],
    },
    pg2: {
      title: "Draw Döngüsü",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let ball;
let frameCounter = 0;

function setup() {
    new Canvas(400, 300);
    
    // Sprite bir kere oluşturulur
    ball = new Sprite(200, 150, 50);
    ball.color = '#00d4ff';
}

function draw() {
    background('#1a1a2e');
    
    frameCounter++;
    
    // ball otomatik çizilir, 
    // ball.display() yazmaya GEREK YOK!
    
    // Bilgi göster
    fill(255);
    textSize(12);
    text('Frame: ' + frameCounter, 10, 25);
    text('FPS: ' + round(frameRate()), 10, 45);
    text('Sprite otomatik ciziliyor!', 10, 65);
}
`,
        },
      ],
    },
    pg3: {
      title: "Temel Sprite Şekilleri",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `function setup() {
    new Canvas(400, 350);
    
    // 1. Dikdörtgen: x, y, genişlik, yükseklik
    let box = new Sprite(80, 80, 60, 40);
    box.color = '#ff6b9d';
    box.text = 'Kutu';
    
    // 2. Daire: x, y, çap
    let circle = new Sprite(200, 80, 50);
    circle.color = '#00d4ff';
    circle.text = 'Daire';
    
    // 3. Kare: x, y, boyut
    let square = new Sprite(320, 80, 50, 50);
    square.color = '#00ff88';
    square.text = 'Kare';
    
    // 4. Çizgi: x, y, uzunluk, açı, 'line'
    let line1 = new Sprite(80, 280, 80, 45, 'line');
    line1.color = '#febc2e';
    line1.strokeWeight = 4;
    line1.text = 'Çizgi';
}

function draw() {
    background('#1a1a2e');
}
`,
        },
      ],
    },
    pg4: {
      title: "Özel Şekiller",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `function setup() {
    new Canvas(400, 300);
    
    // Üçgen: x, y, kenarUzunluğu, 'triangle'
    let tri = new Sprite(80, 80, 50, 'triangle');
    tri.color = '#c44dff';
    
    // Pentagon: x, y, kenarUzunluğu, 'pentagon'
    let penta = new Sprite(200, 80, 40, 'pentagon');
    penta.color = '#00ff88';
    
    // Hexagon: x, y, kenarUzunluğu, 'hexagon'
    let hex = new Sprite(320, 80, 35, 'hexagon');
    hex.color = '#febc2e';
    
    // Octagon: x, y, kenarUzunluğu, 'octagon'
    let oct = new Sprite(80, 200, 30, 'octagon');
    oct.color = '#00d4ff';
    
    // Düzensiz Polygon (nokta dizisi - kapalı)
    // Noktaların başı ve sonu aynı olmalı
    let poly = new Sprite([
        [200, 170], [260, 160], 
        [270, 210], [230, 240], [180, 210], [200, 170]
    ]);
    poly.color = '#ff6b9d';
}

function draw() {
    background('#1a1a2e');
}
`,
        },
      ],
    },
    pg5: {
      title: "Sprite Stilleri",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `function setup() {
    new Canvas(400, 300);
    
    let s = new Sprite(200, 150, 100, 80);
    
    // Renk ve kenar
    s.color = '#ff6b9d';
    s.stroke = '#fff';
    s.strokeWeight = 3;
    
    // Metin
    s.text = 'Merhaba!';
    s.textSize = 16;
    s.textColor = '#fff';
}

function draw() {
    background('#1a1a2e');
}
`,
        },
      ],
    },
    pg6: {
      title: "Rotation Örneği",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let spinner, controlled;

function setup() {
    new Canvas(400, 300);
    
    // Otomatik dönen sprite
    spinner = new Sprite(120, 150, 80, 30);
    spinner.color = '#ff6b9d';
    spinner.rotationSpeed = 2;
    spinner.text = '🔄';
    
    // Manuel kontrollü dönen sprite
    controlled = new Sprite(280, 150, 80, 30);
    controlled.color = '#00d4ff';
    controlled.text = '🎯';
}

function draw() {
    background('#1a1a2e');
    
    // Mouse ile kontrol
    controlled.rotation = map(mouseX, 0, width, -180, 180);
    
    fill(255);
    textSize(12);
    textAlign(CENTER);
    text('rotationSpeed: 2', 120, 220);
    text('Mouse X: ' + Math.round(controlled.rotation) + '°', 280, 220);
}
`,
        },
      ],
    },
    pg7: {
      title: "Scale Animasyonu",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let growing;
let currentScale = 1;
let scaleDir = 0.02;

function setup() {
    new Canvas(400, 300);
    
    growing = new Sprite(200, 150, 50);
    growing.color = '#c44dff';
    growing.text = '💜';
    growing.textSize = 20;
}

function draw() {
    background('#1a1a2e');
    
    // Scale animasyonu
    currentScale += scaleDir;
    if (currentScale > 2 || currentScale < 0.5) {
        scaleDir *= -1;
    }
    growing.scale = currentScale;
    
    // Bilgi göster
    fill(255);
    textSize(14);
    textAlign(CENTER);
    text('scale: ' + currentScale.toFixed(2), 200, 250);
}
`,
        },
      ],
    },
    pg8: {
      title: "Pozisyon ve Boyut",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let box;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    box = new Sprite(200, 150, 60, 60);
    box.color = '#00d4ff';
}

function draw() {
    background('#1a1a2e');
    
    // Mouse ile hareket
    box.moveTowards(mouse, 0.1);
    
    // Pozisyon bilgisi
    fill(255);
    textSize(12);
    text('x: ' + Math.round(box.x), 20, 25);
    text('y: ' + Math.round(box.y), 20, 45);
    text('w: ' + box.w + ', h: ' + box.h, 20, 65);
    
    // Merkez noktası
    fill('#ff6b9d');
    noStroke();
    ellipse(box.x, box.y, 8);
}
`,
        },
      ],
    },
    pg9: {
      title: "Mirror Ornegi",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let left, right;

function setup() {
    new Canvas(400, 300);
    
    // Asimetrik ok sekli (spriteArt ile)
    let okImg = spriteArt("..bb\n..bbb\nbbbbb\nbbbbbb\nbbbbb\n..bbb\n..bb", 8);
    
    // Sol - normal
    left = new Sprite(120, 150);
    left.image = okImg;
    left.collider = 'static';
    
    // Sag - aynali
    right = new Sprite(280, 150);
    right.image = okImg;
    right.mirror.x = true;
    right.collider = 'static';
}

function draw() {
    background('#1a1a2e');
    
    fill(255);
    textSize(11);
    text('Normal', 100, 220);
    text('mirror.x = true', 248, 220);
    
    stroke(100);
    line(200, 80, 200, 220);
}
`,
        },
      ],
    },
    pg10: {
      title: "Görünürlük ve Layer",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let kirmizi, mavi, yesil;

function setup() {
    new Canvas(400, 300);
    
    // Üç kart - üst üste binecek şekilde
    // collider 'none' = fizik yok, birbirini itmez
    
    // Kırmızı kart (en altta başlar)
    kirmizi = new Sprite(160, 150, 100, 130);
    kirmizi.color = '#ff5f57';
    kirmizi.layer = 0;
    kirmizi.text = 'KIRMIZI';
    kirmizi.textSize = 12;
    kirmizi.collider = 'none';
    
    // Mavi kart (ortada başlar)
    mavi = new Sprite(200, 150, 100, 130);
    mavi.color = '#007aff';
    mavi.layer = 1;
    mavi.text = 'MAVİ';
    mavi.textSize = 12;
    mavi.collider = 'none';
    
    // Yeşil kart (en üstte başlar)
    yesil = new Sprite(240, 150, 100, 130);
    yesil.color = '#28cd41';
    yesil.layer = 2;
    yesil.text = 'YEŞİL\\\\n(ÖN)';
    yesil.textSize = 12;
    yesil.collider = 'none';
}

function draw() {
    background('#1a1a2e');
    
    fill(255);
    textSize(11);
    text('1, 2, 3 tuşlarına bas - o kartı öne getir', 10, 20);
    
    // Klavye ile layer değiştir
    if (kb.presses('1')) {
        kirmizi.layer = 10;
        mavi.layer = 1;
        yesil.layer = 2;
        kirmizi.text = 'KIRMIZI\\\\n(ÖN)';
        mavi.text = 'MAVİ';
        yesil.text = 'YEŞİL';
    }
    if (kb.presses('2')) {
        kirmizi.layer = 0;
        mavi.layer = 10;
        yesil.layer = 2;
        kirmizi.text = 'KIRMIZI';
        mavi.text = 'MAVİ\\\\n(ÖN)';
        yesil.text = 'YEŞİL';
    }
    if (kb.presses('3')) {
        kirmizi.layer = 0;
        mavi.layer = 1;
        yesil.layer = 10;
        kirmizi.text = 'KIRMIZI';
        mavi.text = 'MAVİ';
        yesil.text = 'YEŞİL\\\\n(ÖN)';
    }
}
`,
        },
      ],
    },
    pg11: {
      title: "Sprite Remove",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let balls = [];

function setup() {
    new Canvas(400, 300);
}

function draw() {
    background('#1a1a2e');
    
    // Her 30 frame'de yeni top
    if (frameCount % 30 === 0) {
        let b = new Sprite(random(50, 350), 50, 30);
        b.color = color(random(255), random(255), random(255));
        b.vel.y = 2;
        balls.push(b);
    }
    
    // Ekrandan çıkanları kaldır
    for (let i = balls.length - 1; i >= 0; i--) {
        if (balls[i].y > 320) {
            balls[i].remove();
            balls.splice(i, 1);
        }
    }
    
    fill(255);
    textSize(14);
    text('Aktif toplar: ' + balls.length, 20, 25);
}
`,
        },
      ],
    },
    pg12: {
      title: "life Özelliği",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `function setup() {
    new Canvas(400, 300);
}

function draw() {
    background('#1a1a2e');
    
    // Tıklayınca parçacık oluştur
    if (mouse.pressing()) {
        let p = new Sprite(mouseX, mouseY, random(10, 25));
        p.color = color(random(255), random(255), random(255));
        p.vel.x = random(-3, 3);
        p.vel.y = random(-3, 3);
        p.life = 60; // 60 frame (1 saniye) sonra otomatik silinir
    }
    
    fill(255);
    textSize(12);
    text('Tıkla: Parçacık oluştur', 15, 25);
    text('Sprite sayısı: ' + allSprites.length, 15, 45);
}
`,
        },
      ],
    },
    pg13: {
      title: "Yerçekimi Örneği",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `function setup() {
    new Canvas(400, 350);
    
    // Yerçekimi ayarla (y pozitif = aşağı)
    world.gravity.y = 10;
    
    // Zemin (statik)
    let floor = new Sprite(200, 340, 400, 20, 'static');
    floor.color = '#2d3436';
    
    // Düşen toplar
    for (let i = 0; i < 5; i++) {
        let ball = new Sprite(80 + i * 70, 50 + i * 30, 35);
        ball.color = ['#ff6b9d', '#00d4ff', '#00ff88', '#c44dff', '#febc2e'][i];
    }
}

function draw() {
    background('#1a1a2e');
    
    // Bilgi
    fill(255);
    textSize(12);
    text('world.gravity.y = 10', 15, 25);
}
`,
        },
      ],
    },
    pg14: {
      title: "Collider Türleri",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `function setup() {
    new Canvas(400, 350);
    world.gravity.y = 10;
    
    // STATIC: Sabit zemin
    let floor = new Sprite(200, 320, 400, 30, 'static');
    floor.color = '#2d3436';
    floor.text = 'STATIC';
    
    // DYNAMIC: Fizikten etkilenir
    let box = new Sprite(100, 50, 50, 50);
    box.color = '#ff6b9d';
    box.text = 'DYN';
    
    // KINEMATIC: Kodla kontrol
    let platform = new Sprite(250, 200, 100, 20, 'kinematic');
    platform.color = '#00ff88';
    platform.text = 'KIN';
    
    // NONE: Hayalet
    let ghost = new Sprite(300, 100, 60, 60, 'none');
    ghost.color = 'rgba(0, 212, 255, 0.5)';
    ghost.text = 'NONE';
}

function draw() {
    background('#1a1a2e');
    
    // Kinematic platformu hareket ettir
    let platform = allSprites[2];
    platform.y = 200 + sin(frameCount * 0.05) * 50;
}
`,
        },
      ],
    },
    pg15: {
      title: "Sürtünme Karşılaştırması",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `function setup() {
    new Canvas(400, 350);
    world.gravity.y = 10;
    
    // Eğimli zemin
    let ramp = new Sprite(200, 280, 350, 20, 'static');
    ramp.rotation = -15;
    ramp.color = '#2d3436';
    
    // Alt zemin
    new Sprite(200, 340, 400, 20, 'static').color = '#2d3436';
    
    // Buzda kayan (düşük sürtünme)
    let icy = new Sprite(50, 150, 40, 40);
    icy.friction = 0;
    icy.color = '#00d4ff';
    icy.text = '🧊';
    
    // Normal sürtünme
    let normal = new Sprite(120, 150, 40, 40);
    normal.friction = 0.5;
    normal.color = '#febc2e';
    normal.text = '📦';
    
    // Yüksek sürtünme
    let sticky = new Sprite(190, 150, 40, 40);
    sticky.friction = 1;
    sticky.color = '#ff6b9d';
    sticky.text = '🩹';
}

function draw() {
    background('#1a1a2e');
    
    fill(255);
    textSize(11);
    text('friction: 0 (buz)', 20, 25);
    text('friction: 0.5', 130, 25);
    text('friction: 1', 240, 25);
}
`,
        },
      ],
    },
    pg16: {
      title: "Sekme Katsayısı",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `function setup() {
    new Canvas(400, 350);
    world.gravity.y = 10;
    
    // Zemin
    let floor = new Sprite(200, 330, 400, 20, 'static');
    floor.color = '#2d3436';
    
    // Farklı sekme değerleri
    let balls = [
        { x: 70, bounce: 0, label: '0' },
        { x: 140, bounce: 0.3, label: '0.3' },
        { x: 210, bounce: 0.6, label: '0.6' },
        { x: 280, bounce: 0.9, label: '0.9' },
        { x: 350, bounce: 1, label: '1' }
    ];
    
    balls.forEach((b, i) => {
        let ball = new Sprite(b.x, 50, 35);
        ball.bounciness = b.bounce;
        ball.color = ['#ff5f57', '#febc2e', '#00ff88', '#00d4ff', '#c44dff'][i];
        ball.text = b.label;
        ball.textSize = 12;
    });
}

function draw() {
    background('#1a1a2e');
    
    fill(255);
    textSize(14);
    textAlign(CENTER);
    text('Bounciness Değerleri', 200, 25);
}
`,
        },
      ],
    },
    pg17: {
      title: "Kuvvet ve Hız Kontrolü",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let ball;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    ball = new Sprite(200, 150, 40);
    ball.color = '#00d4ff';
    ball.drag = 0.5;
}

function draw() {
    background('#1a1a2e');
    
    // WASD ile kuvvet uygula
    if (kb.pressing('w')) ball.applyForce(0, -0.5);
    if (kb.pressing('s')) ball.applyForce(0, 0.5);
    if (kb.pressing('a')) ball.applyForce(-0.5, 0);
    if (kb.pressing('d')) ball.applyForce(0.5, 0);
    
    // Space ile durdur
    if (kb.pressing('space')) {
        ball.vel.x = 0;
        ball.vel.y = 0;
    }
    
    // Ekrandan çıkmasın
    ball.x = constrain(ball.x, 20, 380);
    ball.y = constrain(ball.y, 20, 280);
    
    // Hız vektörü çiz
    stroke('#ff6b9d');
    strokeWeight(3);
    line(ball.x, ball.y, 
         ball.x + ball.vel.x * 10, 
         ball.y + ball.vel.y * 10);
    noStroke();
    
    // Bilgi
    fill(255);
    textSize(12);
    text('WASD: Hareket | SPACE: Dur', 15, 25);
    text('Hız: ' + ball.speed.toFixed(2), 15, 45);
}
`,
        },
      ],
    },
    pg18: {
      title: "moveTowards Örneği",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let follower;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    follower = new Sprite(200, 150, 50);
    follower.color = '#ff6b9d';
    follower.text = '🎯';
    follower.textSize = 24;
}

function draw() {
    background('#1a1a2e');
    
    // Mouse'a doğru hareket
    // tracking: 0.1 = yavaş, 1 = anında
    follower.moveTowards(mouse, 0.08);
    
    // Mouse pozisyonunu göster
    fill(100);
    noStroke();
    ellipse(mouseX, mouseY, 20);
    
    fill(255);
    textSize(12);
    text("Mouse'u takip et!", 15, 25);
    text('tracking: 0.08', 15, 45);
}
`,
        },
      ],
    },
    pg19: {
      title: "moveTo Örneği",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let player;
let targetX = 200, targetY = 150;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    player = new Sprite(200, 150, 40, 40);
    player.color = '#00d4ff';
    player.text = '🚀';
    player.textSize = 20;
}

function draw() {
    background('#1a1a2e');
    
    // Hedef noktasını göster
    fill(100);
    noStroke();
    ellipse(targetX, targetY, 15);
    
    fill(255);
    textSize(12);
    text('Tıkla: Hedefe git', 15, 25);
}

function mousePressed() {
    targetX = mouseX;
    targetY = mouseY;
    player.moveTo(targetX, targetY, 4);
}
`,
        },
      ],
    },
    pg20: {
      title: "Sıralı Hareket (Patrol)",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let patrol;
let waypoints = [
    {x: 350, y: 80},
    {x: 350, y: 220},
    {x: 50, y: 220},
    {x: 50, y: 80}
];
let currentWP = 0;
let colors = ['#00ff88', '#00d4ff', '#c44dff', '#ff6b9d'];

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    patrol = new Sprite(50, 80, 35);
    patrol.color = colors[0];
}

function draw() {
    background('#1a1a2e');
    
    // Hedef nokta
    let target = waypoints[currentWP];
    
    // Hedefe doğru hareket et
    patrol.moveTowards(target, 0.05);
    
    // Hedefe yaklaştı mı kontrol et
    let d = dist(patrol.x, patrol.y, target.x, target.y);
    if (d < 5) {
        // Sonraki waypoint'e geç
        currentWP = (currentWP + 1) % waypoints.length;
        patrol.color = colors[currentWP];
    }
    
    // Waypoint'leri çiz
    for (let i = 0; i < waypoints.length; i++) {
        fill(colors[i]);
        noStroke();
        ellipse(waypoints[i].x, waypoints[i].y, 12);
    }
    
    // Rota çerçevesi
    stroke(60);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let wp of waypoints) {
        vertex(wp.x, wp.y);
    }
    endShape(CLOSE);
    
    fill(255);
    textSize(12);
    text('Hedef: ' + currentWP, 15, 25);
}
`,
        },
      ],
    },
    pg21: {
      title: "Hedefe Dönme",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let arrow;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    arrow = new Sprite(200, 150, 70, 20);
    arrow.color = '#febc2e';
    arrow.text = '➡️';
    arrow.textSize = 30;
}

function draw() {
    background('#1a1a2e');
    
    // Mouse'a doğru dön (yumuşak)
    let angle = atan2(mouseY - arrow.y, mouseX - arrow.x);
    let targetRotation = degrees(angle);
    arrow.rotation = lerp(arrow.rotation, targetRotation, 0.1);
    
    // Mouse çizgisi
    stroke(50);
    line(arrow.x, arrow.y, mouseX, mouseY);
    noStroke();
    
    // Mouse noktası
    fill(100);
    ellipse(mouseX, mouseY, 10);
    
    fill(255);
    textSize(12);
    text("Mouse'a doğru dönüyor", 15, 25);
    text('Açı: ' + Math.round(arrow.rotation) + '°', 15, 45);
}
`,
        },
      ],
    },
    pg22: {
      title: "Kaçış Oyunu",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let hunter, prey;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    hunter = new Sprite(100, 150, 40);
    hunter.color = '#ff5f57';
    hunter.text = '😈';
    hunter.textSize = 24;
    
    prey = new Sprite(300, 150, 35);
    prey.color = '#00ff88';
    prey.text = '😰';
    prey.textSize = 24;
}

function draw() {
    background('#1a1a2e');
    
    // Avcı mouse'u takip
    hunter.moveTowards(mouse, 0.05);
    
    // Av avcıdan kaç
    prey.moveAway(hunter, 0.03);
    
    // Ekran sınırları
    prey.x = constrain(prey.x, 20, 380);
    prey.y = constrain(prey.y, 20, 280);
    
    // Mesafe
    let d = dist(hunter.x, hunter.y, prey.x, prey.y);
    
    fill(255);
    textSize(12);
    text('Mouse ile avcıyı kontrol et!', 15, 25);
    text('Mesafe: ' + d.toFixed(0), 15, 45);
    
    if (d < 40) {
        textSize(24);
        textAlign(CENTER);
        text('YAKALANDI! 💀', 200, 150);
        textAlign(LEFT);
    }
}
`,
        },
      ],
    },
    pg23: {
      title: "Hız Kontrolü",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let ball;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    ball = new Sprite(200, 150, 40);
    ball.color = '#00d4ff';
    ball.drag = 0.98;
}

function draw() {
    background('#1a1a2e');
    
    // WASD ile hız ver
    if (kb.pressing('w')) ball.vel.y -= 0.5;
    if (kb.pressing('s')) ball.vel.y += 0.5;
    if (kb.pressing('a')) ball.vel.x -= 0.5;
    if (kb.pressing('d')) ball.vel.x += 0.5;
    
    // Sınırlar
    if (ball.x < 20 || ball.x > 380) ball.vel.x *= -0.8;
    if (ball.y < 20 || ball.y > 280) ball.vel.y *= -0.8;
    ball.x = constrain(ball.x, 20, 380);
    ball.y = constrain(ball.y, 20, 280);
    
    // Hız vektörü çiz
    stroke('#ff6b9d');
    strokeWeight(3);
    line(ball.x, ball.y, ball.x + ball.vel.x * 10, ball.y + ball.vel.y * 10);
    noStroke();
    
    fill(255);
    textSize(12);
    text('WASD: Hız ver', 15, 25);
    text('Hız: ' + ball.speed.toFixed(2), 15, 45);
}
`,
        },
      ],
    },
    pg24: {
      title: "Collides vs Overlaps",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let ball;
let wall, sensor;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    ball = new Sprite(50, 150, 35);
    ball.color = '#00d4ff';
    ball.text = '⚽';
    ball.textSize = 20;
    
    // Fiziksel duvar (collides)
    wall = new Sprite(200, 150, 30, 120, 'static');
    wall.color = '#ff5f57';
    wall.text = '🧱';
    
    // Sensör zone (overlaps)
    sensor = new Sprite(320, 150, 80, 80, 'static');
    sensor.color = 'rgba(0, 255, 136, 0.3)';
    sensor.text = '✨';
    sensor.textSize = 24;
}

function draw() {
    background('#1a1a2e');
    
    // Mouse takibi
    ball.moveTowards(mouse, 0.1);
    
    // Collides: Fiziksel çarpışma
    if (ball.collides(wall)) {
        wall.color = '#febc2e';
    }
    
    // Overlaps: Sensör (içinden geçer)
    if (ball.overlapping(sensor)) {
        sensor.color = 'rgba(0, 255, 136, 0.6)';
        sensor.scale = 1.1;
    } else {
        sensor.color = 'rgba(0, 255, 136, 0.3)';
        sensor.scale = 1;
    }
    
    fill(255);
    textSize(11);
    text('🧱 COLLIDES: Fiziksel engel', 15, 25);
    text('✨ OVERLAPS: Sensör (geçilebilir)', 15, 45);
    text('Topu mouse ile hareket ettir', 15, 280);
}
`,
        },
      ],
    },
    pg25: {
      title: "Coin Toplama Oyunu",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let player;
let coins;
let score = 0;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    player = new Sprite(200, 150, 40, 40);
    player.color = '#00d4ff';
    player.text = '🤖';
    player.textSize = 24;
    
    // Coin'ler
    coins = new Group();
    for (let i = 0; i < 8; i++) {
        let c = new coins.Sprite(
            random(50, 350),
            random(50, 250),
            25
        );
        c.color = '#febc2e';
        c.text = '🪙';
        c.textSize = 16;
        c.collider = 'static';
    }
}

function draw() {
    background('#1a1a2e');
    
    // Hareket
    player.moveTowards(mouse, 0.1);
    
    // Callback ile coin toplama
    player.overlaps(coins, collectCoin);
    
    // Skor
    fill(255);
    textSize(16);
    text('Skor: ' + score, 15, 30);
    text('Coinleri topla!', 15, 280);
}

// Callback fonksiyonu
function collectCoin(player, coin) {
    coin.remove();
    score += 10;
    
    // Yeni coin ekle
    setTimeout(() => {
        let c = new coins.Sprite(
            random(50, 350),
            random(50, 250),
            25
        );
        c.color = '#febc2e';
        c.text = '🪙';
        c.textSize = 16;
        c.collider = 'static';
    }, 1000);
}
`,
        },
      ],
    },
    pg26: {
      title: "Platform Zıplama",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let player;
let platforms;
let onGround = false;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 10;
    
    player = new Sprite(100, 100, 35, 50);
    player.color = '#00d4ff';
    player.rotationLock = true;
    
    // Platformlar
    platforms = new Group();
    platforms.collider = 'static';
    platforms.color = '#2d3436';
    
    new platforms.Sprite(200, 280, 400, 20);
    new platforms.Sprite(100, 200, 100, 15);
    new platforms.Sprite(300, 150, 100, 15);
}

function draw() {
    background('#1a1a2e');
    
    // Zemin kontrolü
    onGround = player.colliding(platforms);
    
    // Yatay hareket
    if (kb.pressing('left')) player.vel.x = -3;
    else if (kb.pressing('right')) player.vel.x = 3;
    else player.vel.x = 0;
    
    // Zıplama (sadece zemindeyken)
    if (kb.presses('up') && onGround) {
        player.vel.y = -8;
    }
    
    // Durum göster
    player.text = onGround ? '🧍' : '🦘';
    player.textSize = 24;
    
    fill(255);
    textSize(12);
    text('← → : Hareket | ↑ : Zıpla', 15, 25);
    text('Zeminde: ' + (onGround ? '✅' : '❌'), 15, 45);
}
`,
        },
      ],
    },
    pg27: {
      title: "Çarpışma Filtreleme",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let redBalls, blueBalls;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 5;
    
    // Zemin
    new Sprite(200, 290, 400, 20, 'static').color = '#2d3436';
    
    // Kırmızı toplar
    redBalls = new Group();
    redBalls.color = '#ff6b9d';
    redBalls.bounciness = 0.8;
    
    // Mavi toplar
    blueBalls = new Group();
    blueBalls.color = '#00d4ff';
    blueBalls.bounciness = 0.8;
    
    // Topları oluştur
    for (let i = 0; i < 4; i++) {
        new redBalls.Sprite(100 + i * 30, 50 + i * 20, 30);
        new blueBalls.Sprite(250 + i * 30, 50 + i * 20, 30);
    }
    
    // Kırmızılar birbirinden geçsin
    redBalls.overlaps(redBalls);
    
    // Maviler birbirinden geçsin
    blueBalls.overlaps(blueBalls);
    
    // Ama kırmızı-mavi çarpışsın!
    redBalls.collides(blueBalls);
}

function draw() {
    background('#1a1a2e');
    
    fill(255);
    textSize(11);
    text('🔴 Kırmızılar kendi aralarında geçer', 15, 25);
    text('🔵 Maviler kendi aralarında geçer', 15, 45);
    text('🔴🔵 Kırmızı-Mavi çarpışır!', 15, 65);
}
`,
        },
      ],
    },
    pg28: {
      title: "Görsel Özellikler",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `function setup() {
    new Canvas(400, 300);
    
    // Normal sprite
    let s1 = new Sprite(70, 70, 60);
    s1.color = '#ff6b9d';
    s1.text = 'Normal';
    s1.textSize = 10;
    s1.collider = 'static';
    
    // Kenarlı
    let s2 = new Sprite(170, 70, 60);
    s2.color = '#00d4ff';
    s2.stroke = '#fff';
    s2.strokeWeight = 4;
    s2.text = 'Kenar';
    s2.textSize = 10;
    s2.collider = 'static';
    
    // Yarı saydam
    let s3 = new Sprite(270, 70, 60);
    s3.color = '#00ff88';
    s3.opacity = 0.5;
    s3.text = 'Opacity';
    s3.textSize = 10;
    s3.collider = 'static';
}

function draw() {
    background('#1a1a2e');
}
`,
        },
      ],
    },
    pg29: {
      title: "Layer (Katman) Örneği",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let kirmizi, mavi, yesil;

function setup() {
    new Canvas(400, 300);
    
    // Üç kart - aynı merkezde üst üste
    // Fizik yok, sadece görsel çakışma
    
    // Kırmızı kart - layer 0 (en altta)
    kirmizi = new Sprite(150, 150, 100, 140);
    kirmizi.color = '#ff5f57';
    kirmizi.layer = 0;
    kirmizi.text = 'Kırmızı\\\\nLayer: 0';
    kirmizi.textSize = 14;
    kirmizi.collider = 'none';
    
    // Mavi kart - layer 1 (ortada)
    mavi = new Sprite(200, 150, 100, 140);
    mavi.color = '#007aff';
    mavi.layer = 1;
    mavi.text = 'Mavi\\\\nLayer: 1';
    mavi.textSize = 14;
    mavi.collider = 'none';
    
    // Yeşil kart - layer 2 (en üstte)
    yesil = new Sprite(250, 150, 100, 140);
    yesil.color = '#28cd41';
    yesil.layer = 2;
    yesil.text = 'Yeşil\\\\nLayer: 2';
    yesil.textSize = 14;
    yesil.collider = 'none';
}

function draw() {
    background('#1a1a2e');
    
    fill(255);
    textSize(12);
    textAlign(LEFT);
    text('1, 2, 3 tuşları ile layer değiştir', 10, 20);
    text('Kırmızı L:' + kirmizi.layer + ' | Mavi L:' + mavi.layer + ' | Yeşil L:' + yesil.layer, 10, 40);
    
    // Klavye ile layer değiştir
    if (kb.presses('1')) {
        // Kırmızıyı öne getir
        kirmizi.layer = 10;
        mavi.layer = 1;
        yesil.layer = 2;
        kirmizi.text = 'Kırmızı\\\\nLayer: 10';
        mavi.text = 'Mavi\\\\nLayer: 1';
        yesil.text = 'Yeşil\\\\nLayer: 2';
    }
    if (kb.presses('2')) {
        // Maviyi öne getir
        kirmizi.layer = 0;
        mavi.layer = 10;
        yesil.layer = 2;
        kirmizi.text = 'Kırmızı\\\\nLayer: 0';
        mavi.text = 'Mavi\\\\nLayer: 10';
        yesil.text = 'Yeşil\\\\nLayer: 2';
    }
    if (kb.presses('3')) {
        // Yeşili öne getir
        kirmizi.layer = 0;
        mavi.layer = 1;
        yesil.layer = 10;
        kirmizi.text = 'Kırmızı\\\\nLayer: 0';
        mavi.text = 'Mavi\\\\nLayer: 1';
        yesil.text = 'Yeşil\\\\nLayer: 10';
    }
}
`,
        },
      ],
    },
    pg30: {
      title: "Emoji Karakter",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let player;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    // Emoji sprite - Direkt emoji string ile oluştur
    player = new Sprite(200, 150, 50);
    player.text = '🧙';
    player.textSize = 40;
}

function draw() {
    background('#1a1a2e');
    
    player.moveTowards(mouse, 0.05);
    
    // Yön değiştir (solda ise aynala)
    if (mouseX < player.x) {
        player.mirror.x = true;
    } else {
        player.mirror.x = false;
    }
    
    fill(255);
    textSize(12);
    text('Mouse ile hareket et', 15, 25);
    text('Emoji: ' + player.text, 15, 45);
}
`,
        },
      ],
    },
    pg31: {
      title: "Custom Draw Örneği",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let robot;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    robot = new Sprite(200, 150, 80, 100);
    robot.collider = 'kinematic';
    
    // Özel çizim fonksiyonu
    robot.draw = function() {
        // Gövde
        fill('#2d3436');
        noStroke();
        rect(-30, -25, 60, 70, 10);
        
        // Kafa
        fill('#636e72');
        rect(-25, -55, 50, 40, 8);
        
        // Gözler
        fill('#00d4ff');
        ellipse(-12, -40, 12, 12);
        ellipse(12, -40, 12, 12);
        
        // Göz bebekleri
        fill('#1a1a2e');
        ellipse(-12, -40, 5, 5);
        ellipse(12, -40, 5, 5);
        
        // Anten
        stroke('#febc2e');
        strokeWeight(3);
        line(0, -55, 0, -70);
        noStroke();
        fill('#febc2e');
        ellipse(0, -73, 8);
        
        // Ağız (animasyonlu)
        fill('#ff6b9d');
        let mouthWidth = 25 + sin(frameCount * 0.1) * 8;
        rect(-mouthWidth/2, -25, mouthWidth, 6, 3);
    };
}

function draw() {
    background('#1a1a2e');
    
    robot.moveTowards(mouse, 0.03);
    
    fill(255);
    noStroke();
    textSize(12);
    text('Ozel draw() fonksiyonu ile robot', 15, 25);
    text('Mouse ile hareket ettir', 15, 45);
}
`,
        },
      ],
    },
    pg32: {
      title: "Animasyon Simülasyonu",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let character;
let frames = ['🚶', '🏃'];
let frameIdx = 0;
let moving = false;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    character = new Sprite(200, 150, 50);
    character.text = '🧍';
    character.textSize = 40;
}

function draw() {
    background('#1a1a2e');
    
    moving = false;
    
    if (kb.pressing('left') || kb.pressing('a')) {
        character.x -= 3;
        character.mirror.x = true;
        moving = true;
    }
    if (kb.pressing('right') || kb.pressing('d')) {
        character.x += 3;
        character.mirror.x = false;
        moving = true;
    }
    
    // Animasyon (her 10 karede bir değiştir)
    if (moving && frameCount % 10 === 0) {
        frameIdx = (frameIdx + 1) % frames.length;
    }
    
    character.text = moving ? frames[frameIdx] : '🧍';
    
    fill(255);
    textSize(12);
    text('Sol/Sag Ok veya A/D: Hareket', 15, 25);
}
`,
        },
      ],
    },
    pg33: {
      title: "Mirror Ornegi",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let left, right;

function setup() {
    new Canvas(400, 300);
    
    // Pixel art ok gorseli olustur
    let arrowArt = spriteArt(".....yyy\n.....yyy\nyyyyyyy.\nyyyyyyyy\nyyyyyyyy\nyyyyyyy.\n.....yyy\n.....yyy", 6);
    
    // Sol sprite - normal
    left = new Sprite(120, 150);
    left.image = arrowArt;
    left.collider = 'static';
    
    // Sag sprite - yatay aynali
    right = new Sprite(280, 150);
    right.image = arrowArt;
    right.mirror.x = true;
    right.collider = 'static';
}

function draw() {
    background('#1a1a2e');
    
    fill(255);
    noStroke();
    textSize(12);
    text('Normal', 95, 220);
    text('mirror.x = true', 245, 220);
    
    stroke(100);
    strokeWeight(1);
    line(200, 70, 200, 230);
}
`,
        },
      ],
    },
    pg34: {
      title: "Debug Modu",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let player;
let obstacle;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    player = new Sprite(100, 150, 50, 70);
    player.color = '#00d4ff';
    player.debug = true; // Collider göster
    
    obstacle = new Sprite(280, 150, 80, 80, 'static');
    obstacle.color = '#ff6b9d';
    obstacle.debug = true;
}

function draw() {
    background('#1a1a2e');
    
    player.moveTowards(mouse, 0.1);
    
    fill(255);
    textSize(12);
    text('sprite.debug = true', 15, 25);
    text('Collider sınırları görünür', 15, 45);
}
`,
        },
      ],
    },
    pg35: {
      title: "Group Temelleri",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let enemies;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    // Grup oluştur ve varsayılan özellikler tanımla
    enemies = new Group();
    enemies.color = '#ff6b9d';
    enemies.d = 40; // Çap
    enemies.bounciness = 1;
    enemies.text = '👾';
    enemies.textSize = 24;
    
    // Gruba sprite ekle
    for (let i = 0; i < 6; i++) {
        let e = new enemies.Sprite(
            random(50, 350),
            random(50, 250)
        );
        // Her biri rastgele yönde hareket
        e.vel.x = random(-2, 2);
        e.vel.y = random(-2, 2);
    }
}

function draw() {
    background('#1a1a2e');
    
    // Tüm düşmanları sınırla
    for (let e of enemies) {
        if (e.x < 20 || e.x > 380) e.vel.x *= -1;
        if (e.y < 20 || e.y > 280) e.vel.y *= -1;
    }
    
    fill(255);
    textSize(12);
    text('Düşman sayısı: ' + enemies.length, 15, 25);
}
`,
        },
      ],
    },
    pg36: {
      title: "allSprites Örneği",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let player;
let bullets, enemies;
let score = 0;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    // Oyuncu
    player = new Sprite(50, 150, 40, 30);
    player.color = '#00d4ff';
    player.collider = 'kinematic';
    player.text = '🚀';
    player.textSize = 24;
    
    // Mermi grubu
    bullets = new Group();
    bullets.d = 10;
    bullets.color = '#febc2e';
    bullets.life = 60; // 60 frame sonra yok ol
    
    // Düşman grubu
    enemies = new Group();
    enemies.d = 35;
    enemies.color = '#ff6b9d';
    enemies.text = '👾';
    enemies.textSize = 20;
    
    // Düşman spawner
    spawnEnemy();
}

function draw() {
    background('#1a1a2e');
    
    // Oyuncu hareketi
    if (kb.pressing('up')) player.y -= 4;
    if (kb.pressing('down')) player.y += 4;
    player.y = constrain(player.y, 20, 280);
    
    // Ateş
    if (kb.presses('space')) {
        let b = new bullets.Sprite(player.x + 25, player.y);
        b.vel.x = 8;
    }
    
    // GRUP ÇARPIŞMASI
    bullets.overlaps(enemies, hitEnemy);
    
    // Düşman hareketi
    for (let e of enemies) {
        e.x -= 1.5;
        if (e.x < -20) {
            e.remove();
            spawnEnemy();
        }
    }
    
    // Skor
    fill(255);
    textSize(14);
    text('Skor: ' + score, 15, 25);
    text('↑↓: Hareket | SPACE: Ateş', 15, 280);
}

function hitEnemy(bullet, enemy) {
    bullet.remove();
    enemy.remove();
    score += 10;
    spawnEnemy();
}

function spawnEnemy() {
    let e = new enemies.Sprite(420, random(40, 260));
}
            \`, 'Shoot\\'em Up Örneği')}
        </div>

        <div class="lesson-section">
            <h3>allSprites Grubu</h3>
            <p><code>allSprites</code> özel bir gruptur - tüm sprite'ları içerir:</p>
            
            \${createPlayground(\`
function setup() {
    new Canvas(400, 300);
    
    // Farklı sprite'lar oluştur
    for (let i = 0; i < 20; i++) {
        let s = new Sprite(
            random(50, 350),
            random(50, 250),
            random(20, 50)
        );
        s.color = color(random(255), random(255), random(255));
    }
}

function draw() {
    background('#1a1a2e');
    
    // allSprites ile TÜM sprite'lara eriş
    for (let s of allSprites) {
        // Mouse'a yakınlık
        let d = dist(mouseX, mouseY, s.x, s.y);
        
        if (d < 80) {
            s.scale = map(d, 0, 80, 1.5, 1);
        } else {
            s.scale = 1;
        }
    }
    
    fill(255);
    textSize(12);
    text('Toplam sprite: ' + allSprites.length, 15, 25);
    text('Mouse yakınında büyürler', 15, 45);
}
`,
        },
      ],
    },
    pg37: {
      title: "Parçacık Sistemi",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let particles;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 2;
    
    particles = new Group();
    particles.bounciness = 0.7;
    particles.friction = 0.1;
    
    // Zemin
    new Sprite(200, 295, 400, 10, 'static').color = '#2d3436';
}

function draw() {
    background('#1a1a2e');
    
    // Tıklayınca parçacık ekle
    if (mouse.pressing()) {
        let p = new particles.Sprite(mouseX, mouseY, random(10, 25));
        p.color = color(random(255), random(255), random(255));
        p.vel.x = random(-5, 5);
        p.vel.y = random(-8, -2);
        p.life = 180; // 3 saniye
    }
    
    // For...of ile döngü
    for (let p of particles) {
        // Yaşlandıkça soluklaş
        p.opacity = p.life / 180;
        
        // Ekrandan çıkanları sil
        if (p.x < -50 || p.x > 450 || p.y > 350) {
            p.remove();
        }
    }
    
    fill(255);
    textSize(12);
    text('Tıkla: Parçacık ekle', 15, 25);
    text('Parçacık sayısı: ' + particles.length, 15, 45);
}
`,
        },
      ],
    },
    pg38: {
      title: "Subgroup Örneği",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let characters;
let heroes, villains;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    // Ana grup
    characters = new Group();
    characters.d = 40;
    characters.textSize = 24;
    
    // Alt gruplar (characters'dan miras alır)
    heroes = new characters.Group();
    heroes.color = '#00d4ff';
    
    villains = new characters.Group();
    villains.color = '#ff6b9d';
    
    // Kahramanlar
    new heroes.Sprite(100, 100).text = '🦸';
    new heroes.Sprite(100, 200).text = '🦸‍♀️';
    
    // Kötüler
    new villains.Sprite(300, 100).text = '🦹';
    new villains.Sprite(300, 200).text = '🦹‍♀️';
    
    // Kötüler kahramanlara çarpsın
    villains.collides(heroes);
}

function draw() {
    background('#1a1a2e');
    
    // Kahramanlar mouse'a
    for (let h of heroes) {
        h.moveTowards(mouse, 0.02);
    }
    
    // Kötüler kahraman[0]'a
    for (let v of villains) {
        v.moveTowards(heroes[0], 0.015);
    }
    
    fill(255);
    textSize(12);
    text('characters: ' + characters.length, 15, 25);
    text('heroes: ' + heroes.length, 15, 45);
    text('villains: ' + villains.length, 15, 65);
}
`,
        },
      ],
    },
    pg39: {
      title: "Klavye Kontrolleri",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let player;
let jumpCount = 0;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    player = new Sprite(200, 150, 50, 50);
    player.color = '#00d4ff';
    player.text = '🎮';
    player.textSize = 30;
}

function draw() {
    background('#1a1a2e');
    
    // pressing: Sürekli hareket
    if (kb.pressing('left') || kb.pressing('a')) {
        player.x -= 4;
    }
    if (kb.pressing('right') || kb.pressing('d')) {
        player.x += 4;
    }
    if (kb.pressing('up') || kb.pressing('w')) {
        player.y -= 4;
    }
    if (kb.pressing('down') || kb.pressing('s')) {
        player.y += 4;
    }
    
    // presses: Tek seferlik (zıplama gibi)
    if (kb.presses('space')) {
        jumpCount++;
    }
    
    // Sınırlar
    player.x = constrain(player.x, 25, 375);
    player.y = constrain(player.y, 25, 275);
    
    // Bilgi
    fill(255);
    textSize(12);
    text('WASD veya Ok tuşları: Hareket', 15, 25);
    text('SPACE: Zıpla (presses)', 15, 45);
    text('Zıplama sayısı: ' + jumpCount, 15, 65);
}
`,
        },
      ],
    },
    pg40: {
      title: "Mouse Kontrolleri",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let particles;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 3;
    
    particles = new Group();
    particles.d = 15;
    particles.bounciness = 0.6;
    particles.life = 120;
    
    // Zemin
    let floor = new Sprite(200, 295, 400, 10, 'static');
    floor.color = '#2d3436';
}

function draw() {
    background('#1a1a2e');
    
    // Tıklayınca parçacık
    if (mouse.pressing()) {
        let p = new particles.Sprite(mouse.x, mouse.y);
        // Rastgele renk - hex formatında
        let r = floor(random(100, 255)).toString(16).padStart(2, '0');
        let g = floor(random(100, 255)).toString(16).padStart(2, '0');
        let b = floor(random(100, 255)).toString(16).padStart(2, '0');
        p.color = '#' + r + g + b;
        p.vel.y = random(-5, -2);
        p.vel.x = random(-2, 2);
    }
    
    // Mouse işareti
    noFill();
    stroke(100);
    ellipse(mouse.x, mouse.y, 20);
    noStroke();
    
    fill(255);
    textSize(12);
    text('Tıkla: Parçacık oluştur', 15, 25);
    text('Parçacık: ' + particles.length, 15, 45);
}
`,
        },
      ],
    },
    pg41: {
      title: "Sprite Mouse Olayları",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let buttons = [];
let buttonColors = ['#00ff88', '#00d4ff', '#ff6b9d'];
let buttonLabels = ['Başla', 'Ayarlar', 'Çıkış'];

function setup() {
    new Canvas(400, 300);
    
    for (let i = 0; i < 3; i++) {
        let btn = new Sprite(200, 80 + i * 80, 150, 50);
        btn.color = buttonColors[i];
        btn.text = buttonLabels[i];
        btn.textSize = 18;
        btn.idx = i;
        buttons.push(btn);
    }
}

function draw() {
    background('#1a1a2e');
    
    for (let btn of buttons) {
        // Mouse sprite üzerinde mi?
        if (btn.mouse.hovering()) {
            btn.color = '#febc2e';
            
            // Tıklandı mı?
            if (btn.mouse.presses()) {
                btn.text = '✓ Tıklandı!';
            }
        } else {
            btn.color = buttonColors[btn.idx];
        }
    }
    
    fill(255);
    textSize(12);
    text('Butonların üzerine gel ve tıkla!', 15, 25);
}
`,
        },
      ],
    },
    pg42: {
      title: "Sürükle-Bırak",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let draggables;
let dropZone;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    // Bırakma alanı
    dropZone = new Sprite(320, 150, 120, 200, 'static');
    dropZone.color = '#1a4d3a';
    dropZone.stroke = '#00ff88';
    dropZone.strokeWeight = 2;
    dropZone.text = 'Bırak';
    dropZone.textSize = 14;
    
    // Sürüklenebilir objeler
    draggables = new Group();
    draggables.w = 50;
    draggables.h = 50;
    draggables.textSize = 24;
    
    let items = ['🎁', '📦', '🎈', '⭐'];
    for (let i = 0; i < 4; i++) {
        let d = new draggables.Sprite(80, 50 + i * 60);
        d.color = '#2d3436';
        d.text = items[i];
    }
}

function draw() {
    background('#1a1a2e');
    
    for (let d of draggables) {
        // Sürükleme
        if (d.mouse.dragging()) {
            d.moveTowards(mouse, 1);
            d.color = '#c44dff';
        } else {
            d.color = '#2d3436';
        }
        
        // Bırakma alanı kontrolü
        if (d.overlapping(dropZone)) {
            d.stroke = '#00ff88';
            d.strokeWeight = 3;
        } else {
            d.stroke = '#444';
            d.strokeWeight = 1;
        }
    }
    
    fill(255);
    textSize(12);
    text('Objeleri sürükle ve bırak!', 15, 25);
}
`,
        },
      ],
    },
    pg43: {
      title: "Gelişmiş Kontrol Şeması",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let player;
let speed = 4;
let dashCooldown = 0;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    player = new Sprite(200, 150, 40, 40);
    player.color = '#00d4ff';
    player.text = '⚔️';
    player.textSize = 24;
    player.drag = 0.9;
}

function draw() {
    background('#1a1a2e');
    
    // WASD Hareket
    let vx = 0, vy = 0;
    if (kb.pressing('a')) vx -= 1;
    if (kb.pressing('d')) vx += 1;
    if (kb.pressing('w')) vy -= 1;
    if (kb.pressing('s')) vy += 1;
    
    // Normalize et
    if (vx !== 0 || vy !== 0) {
        let mag = Math.sqrt(vx*vx + vy*vy);
        player.vel.x = (vx / mag) * speed;
        player.vel.y = (vy / mag) * speed;
    }
    
    // SHIFT: Dash
    dashCooldown = max(0, dashCooldown - 1);
    if (kb.presses('shift') && dashCooldown === 0) {
        player.vel.x *= 4;
        player.vel.y *= 4;
        dashCooldown = 60;
        player.color = '#ff6b9d';
    }
    
    // Renk normale dön
    if (dashCooldown < 50) player.color = '#00d4ff';
    
    // Sınırlar
    player.x = constrain(player.x, 20, 380);
    player.y = constrain(player.y, 20, 280);
    
    // UI
    fill(255);
    textSize(12);
    text('WASD: Hareket | SHIFT: Dash', 15, 25);
    
    // Dash cooldown bar
    fill(100);
    rect(15, 260, 100, 10, 5);
    let barColor = dashCooldown > 0 ? '#ff6b9d' : '#00ff88';
    fill(barColor);
    rect(15, 260, map(60 - dashCooldown, 0, 60, 0, 100), 10, 5);
}
`,
        },
      ],
    },
    pg44: {
      title: "Kamera Takibi",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let player;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    // Oyuncu
    player = new Sprite(200, 200, 40, 40);
    player.color = '#00d4ff';
    player.text = '🏃';
    player.textSize = 24;
    
    // Dünya sınırları
    let colors = ['#ff6b9d', '#00ff88', '#febc2e', '#c44dff'];
    for (let i = 0; i < 4; i++) {
        let wall;
        if (i === 0) wall = new Sprite(0, 400, 20, 800, 'static');
        if (i === 1) wall = new Sprite(800, 400, 20, 800, 'static');
        if (i === 2) wall = new Sprite(400, 0, 800, 20, 'static');
        if (i === 3) wall = new Sprite(400, 800, 800, 20, 'static');
        wall.color = colors[i];
    }
    
    // Rastgele objeler
    for (let i = 0; i < 20; i++) {
        let s = new Sprite(
            random(50, 750),
            random(50, 750),
            random(30, 60)
        );
        s.color = '#3d5a80';
        s.collider = 'static';
    }
}

function draw() {
    background('#1a1a2e');
    
    // Oyuncu hareketi
    if (kb.pressing('w')) player.vel.y = -4;
    else if (kb.pressing('s')) player.vel.y = 4;
    else player.vel.y = 0;
    
    if (kb.pressing('a')) player.vel.x = -4;
    else if (kb.pressing('d')) player.vel.x = 4;
    else player.vel.x = 0;
    
    // Kamera oyuncuyu takip
    camera.x = player.x;
    camera.y = player.y;
    
    // UI
    camera.off();
    fill(255);
    textSize(12);
    text('WASD: Hareket', 15, 25);
    text('Pos: ' + round(player.x) + ', ' + round(player.y), 15, 45);
    camera.on();
}
`,
        },
      ],
    },
    pg45: {
      title: "Yumuşak Takip (Lerp)",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let player;
let smoothness = 0.05;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    player = new Sprite(400, 400, 35, 35);
    player.color = '#00d4ff';
    player.text = '🎯';
    player.textSize = 20;
    
    // Rastgele objeler
    for (let i = 0; i < 30; i++) {
        let s = new Sprite(
            random(0, 800),
            random(0, 800),
            random(20, 60)
        );
        s.color = '#3d5a80';
        s.collider = 'static';
    }
}

function draw() {
    background('#1a1a2e');
    
    // Hareket
    player.moveTowards(mouse, 0.1);
    
    // Yumuşak kamera
    camera.x = lerp(camera.x, player.x, smoothness);
    camera.y = lerp(camera.y, player.y, smoothness);
    
    // Smoothness ayarla
    if (kb.pressing('up')) smoothness = min(0.2, smoothness + 0.005);
    if (kb.pressing('down')) smoothness = max(0.01, smoothness - 0.005);
    
    // UI
    camera.off();
    fill(255);
    textSize(12);
    text('Mouse: Hareket', 15, 25);
    text('↑↓: Yumuşaklık: ' + smoothness.toFixed(3), 15, 45);
    camera.on();
}
`,
        },
      ],
    },
    pg46: {
      title: "Zoom Kontrolü",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let target;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    target = new Sprite(200, 150, 50);
    target.color = '#ff6b9d';
    target.text = '🎯';
    target.textSize = 30;
    
    // Çevre objeleri
    for (let angle = 0; angle < 360; angle += 30) {
        let r = 150;
        let x = 200 + cos(radians(angle)) * r;
        let y = 150 + sin(radians(angle)) * r;
        let s = new Sprite(x, y, 30);
        s.color = '#00d4ff';
        s.collider = 'static';
    }
}

function draw() {
    background('#1a1a2e');
    
    // Kamera hedefi takip
    camera.x = target.x;
    camera.y = target.y;
    
    // Zoom kontrol
    if (kb.pressing('q')) {
        camera.zoom = min(3, camera.zoom + 0.02);
    }
    if (kb.pressing('e')) {
        camera.zoom = max(0.3, camera.zoom - 0.02);
    }
    
    // Hedef hareket
    target.moveTowards(mouse, 0.05);
    
    // UI
    camera.off();
    fill(255);
    textSize(12);
    text('Q/E: Zoom In/Out', 15, 25);
    text('Zoom: ' + camera.zoom.toFixed(2) + 'x', 15, 45);
    camera.on();
}
`,
        },
      ],
    },
    pg47: {
      title: "Camera Shake",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let player;
let enemies;
let health = 100;
let shakeAmount = 0;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    player = new Sprite(200, 150, 40, 40);
    player.color = '#00d4ff';
    player.text = '💪';
    player.textSize = 24;
    
    enemies = new Group();
    enemies.d = 30;
    enemies.color = '#ff6b9d';
    enemies.text = '💀';
    enemies.textSize = 18;
    
    for (let i = 0; i < 5; i++) {
        new enemies.Sprite(random(50, 350), random(50, 250));
    }
}

function draw() {
    background('#1a1a2e');
    
    // Manuel shake efekti
    if (shakeAmount > 0) {
        camera.x = 200 + random(-shakeAmount, shakeAmount);
        camera.y = 150 + random(-shakeAmount, shakeAmount);
        shakeAmount *= 0.9;
    } else {
        camera.x = 200;
        camera.y = 150;
    }
    
    // Oyuncu hareketi
    player.moveTowards(mouse, 0.1);
    
    // Düşman takibi
    for (let e of enemies) {
        e.moveTowards(player, 0.01);
    }
    
    // Çarpışma
    if (player.collides(enemies)) {
        health -= 10;
        shakeAmount = 15; // Shake başlat
        player.color = '#ff5f57';
    } else {
        player.color = '#00d4ff';
    }
    
    // Reset
    if (health <= 0) {
        health = 100;
        player.x = 200;
        player.y = 150;
        shakeAmount = 30;
    }
    
    // UI
    camera.off();
    fill(255);
    textSize(12);
    text('Mouse: Hareket', 15, 25);
    
    fill(50);
    rect(15, 40, 100, 15, 3);
    fill(health > 30 ? '#00ff88' : '#ff5f57');
    rect(15, 40, health, 15, 3);
    
    fill(255);
    text('Düşmanlara çarp = Shake', 15, 75);
    camera.on();
}
`,
        },
      ],
    },
    pg48: {
      title: "UI Layer Örneği",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let player;
let score = 0;
let stars;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    player = new Sprite(400, 400, 40, 40);
    player.color = '#00d4ff';
    player.text = '🚀';
    player.textSize = 24;
    
    stars = new Group();
    stars.d = 30;
    stars.color = '#febc2e';
    stars.text = '⭐';
    stars.textSize = 20;
    stars.collider = 'static';
    
    for (let i = 0; i < 15; i++) {
        new stars.Sprite(random(50, 750), random(50, 750));
    }
}

function draw() {
    background('#1a1a2e');
    
    // Hareket
    if (kb.pressing('w')) player.y -= 5;
    if (kb.pressing('s')) player.y += 5;
    if (kb.pressing('a')) player.x -= 5;
    if (kb.pressing('d')) player.x += 5;
    
    // Kamera takibi
    camera.x = lerp(camera.x, player.x, 0.1);
    camera.y = lerp(camera.y, player.y, 0.1);
    
    // Yıldız toplama
    player.overlaps(stars, (p, s) => {
        s.x = random(50, 750);
        s.y = random(50, 750);
        score += 10;
    });
    
    // === UI LAYER ===
    camera.off();
    
    fill(0, 150);
    noStroke();
    rect(10, 10, 120, 50, 8);
    
    fill('#febc2e');
    textSize(20);
    text('⭐ ' + score, 25, 40);
    
    fill(200);
    textSize(10);
    text('WASD: Hareket', 25, 55);
    
    camera.on();
}
`,
        },
      ],
    },
    pg49: {
      title: "Basit Sarkaç (DistanceJoint)",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let anchor, ball;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 10;
    
    // Sabit nokta (tavana asılı)
    anchor = new Sprite(200, 40, 20, 20, 'static');
    anchor.color = '#636e72';
    
    // Sarkaç topu
    ball = new Sprite(280, 140, 40);
    ball.color = '#ff6b9d';
    ball.bounciness = 0.3;
    
    // DistanceJoint ile bağla (ip gibi)
    let rope = new DistanceJoint(anchor, ball);
    rope.springiness = 0; // Esnek değil, sabit uzunluk
}

function draw() {
    background('#1a1a2e');
    
    // İpi çiz
    stroke('#febc2e');
    strokeWeight(3);
    line(anchor.x, anchor.y, ball.x, ball.y);
    noStroke();
    
    // Tıklayınca kuvvet uygula
    if (mouse.presses()) {
        ball.vel.x += (ball.x - mouseX) * 0.1;
        ball.vel.y += (ball.y - mouseY) * 0.1;
    }
    
    fill(255);
    textSize(12);
    text('Tikla: Sarkaci it', 15, 25);
    text('DistanceJoint kullanimi', 15, 45);
}
`,
        },
      ],
    },
    pg50: {
      title: "Zincir Efekti",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let chain = [];
let chainLength = 6;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 10;
    
    // İlk halka (sabit - tavana asılı)
    let prev = new Sprite(200, 30, 15, 15, 'static');
    prev.color = '#2d3436';
    chain.push(prev);
    
    // Zincir halkaları
    for (let i = 1; i < chainLength; i++) {
        let link = new Sprite(200, 30 + i * 30, 20);
        link.color = '#febc2e';
        link.mass = 0.3;
        
        // Önceki halkaya DistanceJoint ile bağla
        let j = new DistanceJoint(prev, link);
        j.springiness = 0;
        
        chain.push(link);
        prev = link;
    }
    
    // Son halka büyük ve renkli
    let last = chain[chain.length - 1];
    last.d = 35;
    last.color = '#ff6b9d';
}

function draw() {
    background('#1a1a2e');
    
    // Zincir çizgilerini çiz
    stroke('#febc2e');
    strokeWeight(2);
    for (let i = 0; i < chain.length - 1; i++) {
        line(chain[i].x, chain[i].y, chain[i+1].x, chain[i+1].y);
    }
    noStroke();
    
    // Mouse ile son halkayı çek
    if (mouse.pressing()) {
        let last = chain[chain.length - 1];
        last.vel.x += (mouseX - last.x) * 0.02;
        last.vel.y += (mouseY - last.y) * 0.02;
    }
    
    fill(255);
    textSize(12);
    text('Mouse ile zinciri cek', 15, 25);
}
`,
        },
      ],
    },
    pg51: {
      title: "Platform Oyunu",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let player;
let platforms;
let onGround = false;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 20;
    
    // Oyuncu
    player = new Sprite(50, 100, 30, 40);
    player.color = '#00d4ff';
    player.rotationLock = true;
    player.friction = 0;
    player.text = '🧍';
    player.textSize = 24;
    
    // Platformlar
    platforms = new Group();
    platforms.collider = 'static';
    platforms.color = '#2d3436';
    
    // Zemin
    new platforms.Sprite(200, 290, 400, 20);
    
    // Platformlar
    new platforms.Sprite(80, 220, 100, 15);
    new platforms.Sprite(220, 170, 100, 15);
    new platforms.Sprite(340, 120, 80, 15);
    new platforms.Sprite(150, 80, 80, 15);
}

function draw() {
    background('#1a1a2e');
    
    // Zemin kontrolü
    onGround = player.colliding(platforms);
    
    // Yatay hareket
    if (kb.pressing('left') || kb.pressing('a')) {
        player.vel.x = -5;
        player.mirror.x = true;
    } else if (kb.pressing('right') || kb.pressing('d')) {
        player.vel.x = 5;
        player.mirror.x = false;
    } else {
        player.vel.x = 0;
    }
    
    // Zıplama
    if ((kb.presses('up') || kb.presses('space')) && onGround) {
        player.vel.y = -12;
    }
    
    // Emoji güncelle
    player.text = onGround ? '🧍' : '🦘';
    
    // Ekrandan düşerse reset
    if (player.y > 350) {
        player.x = 50;
        player.y = 100;
        player.vel.y = 0;
    }
    
    fill(255);
    textSize(11);
    text('← → / A D: Hareket | ↑ / SPACE: Zıpla', 15, 25);
    text('Zeminde: ' + (onGround ? '✅' : '❌'), 15, 45);
}
`,
        },
      ],
    },
    pg52: {
      title: "Combo Collider",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let spaceship;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    spaceship = new Sprite(200, 150, 60, 25);
    spaceship.color = '#00d4ff';
    
    // Kanatlar
    spaceship.addCollider(-20, -15, 15, 8);
    spaceship.addCollider(20, -15, 15, 8);
    
    spaceship.drag = 0.95;
}

function draw() {
    background('#1a1a2e');
    
    // WASD hareket
    if (kb.pressing('w')) spaceship.vel.y -= 0.3;
    if (kb.pressing('s')) spaceship.vel.y += 0.3;
    if (kb.pressing('a')) spaceship.vel.x -= 0.3;
    if (kb.pressing('d')) spaceship.vel.x += 0.3;
    
    // Sınırlar
    spaceship.x = constrain(spaceship.x, 40, 360);
    spaceship.y = constrain(spaceship.y, 40, 260);
    
    fill(255);
    textSize(12);
    text('WASD: Hareket', 15, 25);
    text('addCollider() ile kanatlar eklendi', 15, 45);
}
`,
        },
      ],
    },
    pg53: {
      title: "Sensör Bölgeleri",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let player;
let dangerZone, safeZone;
let status = 'Dolaşıyorsun';

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    player = new Sprite(200, 150, 35, 35);
    player.color = '#00d4ff';
    player.text = '🧍';
    player.textSize = 20;
    
    // Tehlike bölgesi (sensör - collider: none)
    dangerZone = new Sprite(100, 150, 100, 100, 'none');
    dangerZone.color = '#4a1a1a';
    dangerZone.stroke = '#ff5f57';
    dangerZone.strokeWeight = 2;
    dangerZone.text = '⚠️';
    dangerZone.textSize = 30;
    
    // Güvenli bölge
    safeZone = new Sprite(300, 150, 100, 100, 'none');
    safeZone.color = '#1a4a2a';
    safeZone.stroke = '#00ff88';
    safeZone.strokeWeight = 2;
    safeZone.text = '🏠';
    safeZone.textSize = 30;
}

function draw() {
    background('#1a1a2e');
    
    // Hareket
    player.moveTowards(mouse, 0.1);
    
    // Sensör kontrolleri (overlapping)
    if (player.overlapping(dangerZone)) {
        status = '⚠️ TEHLİKE!';
        player.color = '#ff5f57';
    } else if (player.overlapping(safeZone)) {
        status = '✅ GÜVENDESİN';
        player.color = '#00ff88';
    } else {
        status = '🚶 Dolaşıyorsun';
        player.color = '#00d4ff';
    }
    
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(status, 200, 30);
    textAlign(LEFT);
    textSize(10);
    text('collider: "none" = sensör (geçilebilir)', 15, 285);
}
`,
        },
      ],
    },
    pg54: {
      title: "Mini Space Shooter",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let player, enemies, bullets;
let score = 0, health = 100;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    player = new Sprite(200, 260, 35, 35);
    player.color = '#00d4ff';
    player.text = '🚀';
    player.textSize = 24;
    player.collider = 'kinematic';
    
    enemies = new Group();
    enemies.d = 28;
    enemies.color = '#ff6b9d';
    enemies.text = '👾';
    enemies.textSize = 18;
    
    bullets = new Group();
    bullets.d = 8;
    bullets.color = '#febc2e';
    bullets.life = 50;
}

function draw() {
    background('#1a1a2e');
    
    // Oyuncu mouse takip
    player.x = lerp(player.x, mouseX, 0.15);
    player.x = constrain(player.x, 20, 380);
    
    // Ateş
    if (mouse.presses() || kb.presses('space')) {
        let b = new bullets.Sprite(player.x, player.y - 20);
        b.vel.y = -10;
    }
    
    // Düşman spawn (her 90 frame)
    if (frameCount % 90 === 0 && health > 0) {
        let e = new enemies.Sprite(random(30, 370), -20);
        e.vel.y = 2;
    }
    
    // Düşman hareketi ve kontrol
    for (let e of enemies) {
        if (e.y > 320) {
            e.remove();
            health -= 15;
        }
    }
    
    // Mermi-düşman çarpışma
    bullets.overlaps(enemies, (b, e) => {
        b.remove();
        e.remove();
        score += 10;
    });
    
    // Game Over
    if (health <= 0) {
        enemies.removeAll();
        bullets.removeAll();
        health = 100;
        score = 0;
    }
    
    // UI
    fill(255);
    textSize(14);
    text('⭐ ' + score, 15, 25);
    
    fill(50);
    rect(15, 35, 80, 8, 3);
    fill(health > 30 ? '#00ff88' : '#ff5f57');
    rect(15, 35, health * 0.8, 8, 3);
    
    textSize(10);
    text('Tıkla / SPACE: Ateş', 290, 290);
}
`,
        },
      ],
    },
    pg55: {
      title: "Sprite Türleri",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    // Daire
    let c = new Sprite(80, 100, 50);
    c.color = '#ff6b9d';
    c.text = 'Daire';
    c.textSize = 10;
    
    // Dikdörtgen
    let r = new Sprite(200, 100, 80, 50);
    r.color = '#00d4ff';
    r.text = 'Rect';
    r.textSize = 10;
    
    // Static (sabit)
    let s = new Sprite(320, 100, 60, 60, 'static');
    s.color = '#00ff88';
    s.text = 'Static';
    s.textSize = 10;
    
    // Kinematic
    let k = new Sprite(200, 220, 100, 30, 'kinematic');
    k.color = '#febc2e';
    k.text = 'Kinematic';
    k.textSize = 10;
}

function draw() {
    background('#1a1a2e');
    
    // Kinematic hareketi
    let k = allSprites[3];
    k.x = 200 + sin(frameCount * 0.03) * 100;
}
`,
        },
      ],
    },
    pg56: {
      title: "Input Detaylı Test",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let box;
let jumpCount = 0;
let moveCount = 0;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    box = new Sprite(200, 150, 50, 50);
    box.color = '#c44dff';
}

function draw() {
    background('#1a1a2e');
    
    // PRESSES: Sadece 1 kere tetiklenir
    if (kb.presses('space')) {
        jumpCount++;
        box.vel.y = -8;
    }
    
    // PRESSING: Basılı tutulduğu sürece
    if (kb.pressing('left')) {
        box.x -= 3;
        moveCount++;
    }
    if (kb.pressing('right')) {
        box.x += 3;
        moveCount++;
    }
    
    // RELEASED: Bırakıldığında
    if (kb.released('space')) {
        box.color = '#00ff88';
    }
    if (kb.pressing('space')) {
        box.color = '#ff6b9d';
    }
    if (!kb.pressing('space') && !kb.released('space')) {
        box.color = '#c44dff';
    }
    
    // Yerçekimi simülasyonu
    box.vel.y += 0.3;
    box.y = min(box.y, 220);
    if (box.y >= 220) box.vel.y = 0;
    
    fill(255);
    textSize(11);
    text('SPACE: Zipla (presses) = ' + jumpCount, 15, 25);
    text('Sol/Sag: Hareket (pressing) = ' + moveCount, 15, 45);
}
`,
        },
      ],
    },
    pg57: {
      title: "Otomatik Ömür (life)",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let particles;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    particles = new Group();
    particles.d = 15;
    particles.life = 60; // 60 frame = 1 saniye
}

function draw() {
    background('#1a1a2e');
    
    // Her karede yeni parçacık
    if (frameCount % 3 === 0) {
        let p = new particles.Sprite(mouseX, mouseY);
        p.color = color(
            random(200, 255),
            random(100, 200),
            random(150, 255)
        );
        p.vel.x = random(-3, 3);
        p.vel.y = random(-3, 3);
    }
    
    // Yaşlandıkça küçült
    for (let p of particles) {
        p.d = map(p.life, 0, 60, 2, 15);
        p.opacity = map(p.life, 0, 60, 0, 1);
    }
    
    fill(255);
    textSize(12);
    text('Mouse ile parcacik olustur', 15, 25);
    text('Parcacik sayisi: ' + particles.length, 15, 45);
}
`,
        },
      ],
    },
    pg58: {
      title: "allSprites Kullanımı",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    // Rastgele sprite'lar
    for (let i = 0; i < 10; i++) {
        let s = new Sprite(
            random(50, 350),
            random(50, 250),
            random(30, 50)
        );
        s.color = color(random(255), random(255), random(255));
        s.vel.x = random(-2, 2);
        s.vel.y = random(-2, 2);
    }
}

function draw() {
    background('#1a1a2e');
    
    // allSprites ile tümünü kontrol et
    for (let s of allSprites) {
        // Sınırlardan sekme
        if (s.x < 25 || s.x > 375) s.vel.x *= -1;
        if (s.y < 25 || s.y > 275) s.vel.y *= -1;
    }
    
    // Tıklayınca en yakınını sil
    if (mouse.presses()) {
        let closest = null;
        let minDist = Infinity;
        for (let s of allSprites) {
            let d = dist(mouseX, mouseY, s.x, s.y);
            if (d < minDist) {
                minDist = d;
                closest = s;
            }
        }
        if (closest && minDist < 50) {
            closest.remove();
        }
    }
    
    fill(255);
    textSize(12);
    text('Toplam sprite: ' + allSprites.length, 15, 25);
    text('Tikla: En yakini sil', 15, 45);
}
`,
        },
      ],
    },
    pg59: {
      title: "spriteArt Örneği",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let player;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    // Kalp pixel art
    let heartArt = spriteArt(".rr.rr.\nrrrrrrr\nrrrrrrr\n.rrrrr.\n..rrr..\n...r...", 10);
    
    player = new Sprite(200, 150);
    player.image = heartArt;
    player.collider = 'kinematic';
}

function draw() {
    background('#1a1a2e');
    
    // Mouse'a dogru hareket
    player.moveTowards(mouse, 0.05);
    
    // Nabiz efekti
    let scale = 1 + sin(frameCount * 0.1) * 0.1;
    player.scale = scale;
    
    fill(255);
    textSize(12);
    text('spriteArt ile pixel art', 15, 25);
    text('Mouse ile hareket ettir', 15, 45);
}
`,
        },
      ],
    },
    pg60: {
      title: "Tiles ile Labirent",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let player;
let walls;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    walls = new Group();
    walls.color = '#2d3436';
    walls.collider = 'static';
    
    // Harita tasarimi
    // Her karakter 25x25 piksel
    new Tiles(
        [
            '================',
            '=..............=',
            '=..===....===..=',
            '=..=........=..=',
            '=..=........=..=',
            '=..===....===..=',
            '=..............=',
            '=....====......=',
            '=..............=',
            '=..............=',
            '=..............=',
            '================'
        ],
        0, 0, 25, 25
    );
    
    // Oyuncu
    player = new Sprite(200, 150, 20);
    player.color = '#00d4ff';
}

function draw() {
    background('#1a1a2e');
    
    // WASD kontrolu
    if (kb.pressing('w')) player.vel.y = -3;
    else if (kb.pressing('s')) player.vel.y = 3;
    else player.vel.y = 0;
    
    if (kb.pressing('a')) player.vel.x = -3;
    else if (kb.pressing('d')) player.vel.x = 3;
    else player.vel.x = 0;
    
    fill(255);
    textSize(11);
    text('WASD ile hareket et', 15, 25);
}
`,
        },
      ],
    },
    pg61: {
      title: "Yörünge Simülasyonu",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let sun, planets = [];

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    // Güneş (sabit)
    sun = new Sprite(200, 150, 40);
    sun.color = '#febc2e';
    sun.collider = 'static';
    sun.text = '☀️';
    sun.textSize = 25;
    
    // Gezegenler
    for (let i = 0; i < 4; i++) {
        let p = new Sprite(
            200 + random(-150, 150),
            150 + random(-100, 100),
            15 + i * 5
        );
        p.color = ['#ff6b9d', '#00d4ff', '#00ff88', '#c44dff'][i];
        p.mass = 0.5;
        
        // Baslangic hizi (yörünge için)
        let angle = atan2(p.y - sun.y, p.x - sun.x);
        p.vel.x = cos(angle + PI/2) * 3;
        p.vel.y = sin(angle + PI/2) * 3;
        
        planets.push(p);
    }
}

function draw() {
    background('#1a1a2e');
    
    // Her gezegeni güneşe çek
    for (let p of planets) {
        p.attractTo(sun, 0.8);
    }
    
    fill(255);
    textSize(11);
    text('attractTo ile yercekim simulasyonu', 15, 25);
}
`,
        },
      ],
    },
    pg62: {
      title: "moveAway Örneği",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let player;
let enemies = [];

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    player = new Sprite(200, 150, 30);
    player.color = '#00d4ff';
    player.text = '😎';
    player.textSize = 20;
    player.collider = 'kinematic';
    
    // Düşmanlar
    for (let i = 0; i < 8; i++) {
        let e = new Sprite(
            random(50, 350),
            random(50, 250),
            25
        );
        e.color = '#ff6b9d';
        e.text = '👻';
        e.textSize = 15;
        enemies.push(e);
    }
}

function draw() {
    background('#1a1a2e');
    
    // Player mouse'a git
    player.moveTowards(mouse, 0.1);
    
    // Düşmanlar player'dan kaçsın
    for (let e of enemies) {
        let d = dist(e.x, e.y, player.x, player.y);
        if (d < 100) {
            e.moveAway(player, 2);
        }
    }
    
    fill(255);
    textSize(11);
    text('Mouse ile hareket et', 15, 25);
    text('Dusmanlar senden kacar!', 15, 45);
}
`,
        },
      ],
    },
    pg63: {
      title: "Asenkron Bekleme",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let message = 'Tikla!';
let messageColor = '#ffffff';

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
}

async function showSequence() {
    message = 'Basliyor...';
    messageColor = '#00d4ff';
    
    await sleep(1000); // 1 saniye bekle
    
    message = '3...';
    messageColor = '#ff6b9d';
    
    await sleep(1000);
    
    message = '2...';
    messageColor = '#febc2e';
    
    await sleep(1000);
    
    message = '1...';
    messageColor = '#00ff88';
    
    await sleep(1000);
    
    message = 'BASLA!';
    messageColor = '#c44dff';
    
    // 60 frame bekle
    await delay(60);
    
    message = 'Tekrar tikla!';
    messageColor = '#ffffff';
}

function draw() {
    background('#1a1a2e');
    
    if (mouse.presses()) {
        showSequence();
    }
    
    fill(messageColor);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(message, 200, 150);
    
    fill(255);
    textSize(11);
    textAlign(LEFT, TOP);
    text('sleep() ve delay() ornegi', 15, 25);
}
`,
        },
      ],
    },
    pg64: {
      title: "Yön Hesaplama",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let arrow;
let target;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    // Ok sprite
    let arrowArt = spriteArt("....gg\n....ggg\ngggggggg\nggggggggg\ngggggggg\n....ggg\n....gg", 5);
    
    arrow = new Sprite(100, 150);
    arrow.image = arrowArt;
    arrow.collider = 'kinematic';
    
    // Hedef
    target = new Sprite(300, 150, 30);
    target.color = '#ff6b9d';
    target.text = '🎯';
    target.textSize = 20;
    target.collider = 'kinematic';
}

function draw() {
    background('#1a1a2e');
    
    // Hedef mouse'u takip etsin
    target.moveTowards(mouse, 0.1);
    
    // Ok hedefe dogru don
    arrow.rotateTowards(target, 0.1);
    
    // Mesafe hesapla
    let angle = arrow.angleTo(target);
    
    fill(255);
    textSize(11);
    text('angleTo: ' + round(angle) + ' derece', 15, 25);
    text('rotateTowards ile otomatik don', 15, 45);
}
`,
        },
      ],
    },
    pg65: {
      title: "Mesafe ile Toplama",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let player;
let collectibles = [];
let score = 0;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    player = new Sprite(200, 150, 25);
    player.color = '#00d4ff';
    player.collider = 'kinematic';
    
    // Toplanacak nesneler
    for (let i = 0; i < 10; i++) {
        let c = new Sprite(
            random(30, 370),
            random(30, 270),
            20
        );
        c.color = '#febc2e';
        c.text = '⭐';
        c.textSize = 14;
        c.collider = 'none';
        collectibles.push(c);
    }
}

function draw() {
    background('#1a1a2e');
    
    player.moveTowards(mouse, 0.15);
    
    // Mesafe kontrolü ile toplama
    for (let i = collectibles.length - 1; i >= 0; i--) {
        let c = collectibles[i];
        let d = player.distanceTo(c);
        
        // Yakinsa topla
        if (d < 25) {
            c.remove();
            collectibles.splice(i, 1);
            score++;
        }
        
        // Yakinlasinca büyüt
        if (d < 80) {
            c.scale = 1.3;
        } else {
            c.scale = 1;
        }
    }
    
    fill(255);
    textSize(14);
    text('Skor: ' + score, 15, 25);
    text('Yildizlari topla!', 15, 45);
}
`,
        },
      ],
    },
    pg66: {
      title: "Buton Sistemi",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let buttons = [];

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    let labels = ['Oynat', 'Durdur', 'Ayarlar'];
    let colors = ['#00ff88', '#ff6b9d', '#00d4ff'];
    
    for (let i = 0; i < 3; i++) {
        let btn = new Sprite(200, 80 + i * 70, 150, 50);
        btn.color = colors[i];
        btn.text = labels[i];
        btn.textSize = 16;
        btn.collider = 'static';
        btn.originalColor = colors[i];
        btn.label = labels[i];
        buttons.push(btn);
    }
}

function draw() {
    background('#1a1a2e');
    
    for (let btn of buttons) {
        // Hover efekti
        if (btn.mouse.hovering()) {
            btn.scale = 1.1;
            btn.color = '#febc2e';
        } else {
            btn.scale = 1;
            btn.color = btn.originalColor;
        }
        
        // Tiklama
        if (btn.mouse.presses()) {
            console.log(btn.label + ' tiklandi!');
        }
    }
    
    fill(255);
    textSize(12);
    text('Butonlarin uzerine gel ve tikla', 15, 25);
}
`,
        },
      ],
    },
    pg67: {
      title: "Parçacık Sistemi",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let particles = [];

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 5;
}

function draw() {
    background('#1a1a2e');
    
    // Her frame parçacık oluştur
    if (frameCount % 3 === 0) {
        let p = new Sprite(mouseX, mouseY, random(5, 15));
        p.color = color(
            random(100, 255),
            random(100, 255),
            random(100, 255)
        );
        p.vel.x = random(-3, 3);
        p.vel.y = random(-5, -1);
        p.life = 100; // 100 frame yaşa
        p.collider = 'none';
        particles.push(p);
    }
    
    // Parçacıkları güncelle
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.life--;
        
        // Opaklığı azalt
        let alpha = map(p.life, 0, 100, 0, 255);
        p.color.setAlpha(alpha);
        
        // Ömrü bittiyse sil
        if (p.life <= 0) {
            p.remove();
            particles.splice(i, 1);
        }
    }
    
    fill(255);
    textSize(11);
    text('Mouse ile parcacik olustur', 15, 25);
    text('Parcacik sayisi: ' + particles.length, 15, 45);
}
`,
        },
      ],
    },
    pg68: {
      title: "Araba Kontrolü",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let car;

function setup() {
    new Canvas(400, 300);
    world.gravity.y = 0;
    
    // Araba sprite
    let carArt = spriteArt(
      "..bb..\n.bbbb.\nbbbbbb\nbbbbbb\n.bbbb.\n..bb..",
      8
    );
    
    car = new Sprite(200, 150);
    car.image = carArt;
    car.drag = 1;
    car.rotationDrag = 1;
}

function draw() {
    background('#1a1a2e');
    
    // Araba kontrolü
    if (kb.pressing('up')) {
        car.bearing = car.rotation;
        car.applyForce(2);
    }
    if (kb.pressing('down')) {
        car.bearing = car.rotation;
        car.applyForce(-1);
    }
    if (kb.pressing('left')) {
        car.rotationSpeed -= 0.5;
    }
    if (kb.pressing('right')) {
        car.rotationSpeed += 0.5;
    }
    
    fill(255);
    textSize(11);
    text('Ok tuslari ile sur', 15, 25);
    text('Hiz: ' + round(car.speed * 10) / 10, 15, 45);
    text('Yon: ' + round(car.rotation) + ' derece', 15, 65);
}
`,
        },
      ],
    },

    pg69: {
      title: "HingeJoint: kapı menteşesi",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `function setup() {
  new Canvas(400, 240);
  world.gravity.y = 10;
  new Sprite(200, 228, 400, 24, "static").color = "#333";
  let mil = new Sprite(200, 70, 16, 16, "static");
  mil.color = "#555";
  mil.text = "mil";
  let kanat = new Sprite(260, 70, 100, 16);
  kanat.color = "#3d7ea6";
  let m = new HingeJoint(mil, kanat);
  m.maxPower = 0;
}
function draw() {
  background(255);
  fill(0);
  noStroke();
  textSize(12);
  text("HingeJoint  ·  milde doner, DistanceJoint gibi uzamaz", 10, 18);
}
`,
        },
      ],
    },
    pg70: {
      title: "GlueJoint: iki cisim bir govde",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `function setup() {
  new Canvas(400, 240);
  world.gravity.y = 10;
  new Sprite(200, 228, 400, 24, "static").color = "#333";
  let a = new Sprite(180, 40, 36, 20);
  a.color = "#3d7ea6";
  let b = new Sprite(210, 62, 20, 36);
  b.color = "#c45c78";
  new GlueJoint(a, b);
}
function draw() {
  background(255);
  fill(0);
  noStroke();
  textSize(12);
  text("GlueJoint  ·  T harfi tek cisim gibi duser", 10, 18);
}
`,
        },
      ],
    },
    pg71: {
      title: "WheelJoint: sasi ve teker",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let aks;
function setup() {
  new Canvas(400, 240);
  world.gravity.y = 10;
  new Sprite(200, 228, 400, 24, "static").color = "#333";
  let sasi = new Sprite(160, 160, 90, 18);
  sasi.color = "#3d7ea6";
  let teker = new Sprite(160, 186, 28);
  teker.color = "#333";
  aks = new WheelJoint(sasi, teker);
  aks.speed = 3;
}
function draw() {
  background(255);
  if (kb.pressing("a")) aks.speed = -5;
  else if (kb.pressing("d")) aks.speed = 5;
  else aks.speed = 0;
  fill(0);
  noStroke();
  textSize(12);
  text("WheelJoint  ·  A/D aks.speed (sasi + teker)", 10, 18);
}
`,
        },
      ],
    },
    pg72: {
      title: "world.timeScale: ayni yercekimi, baska zaman",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `function setup() {
  new Canvas(400, 240);
  world.gravity.y = 10;
  world.timeScale = 0.3;
  new Sprite(200, 228, 400, 24, "static").color = "#333";
  let k = new Sprite(200, 40, 36, 36);
  k.color = "#3d7ea6";
  k.bounciness = 0.7;
}
function draw() {
  background(255);
  if (kb.pressing("q")) world.timeScale = 0.2;
  if (kb.pressing("e")) world.timeScale = 1;
  fill(0);
  noStroke();
  textSize(12);
  text("Q yavas  E normal  ·  timeScale " + nf(world.timeScale, 1, 2), 10, 18);
  text("gravity.y hâlâ 10 — akan zaman değişir", 10, 36);
}
`,
        },
      ],
    },
    pg73: {
      title: "world.rayCast: ayak alti isin",
      libraries: ["p5play"],
      files: [
        {
          name: "sketch.js",
          content: `let oyuncu, zemin, basamak;
function setup() {
  new Canvas(400, 240);
  world.gravity.y = 10;
  zemin = new Sprite(200, 228, 400, 24, "static");
  zemin.color = "#333";
  basamak = new Sprite(280, 170, 90, 14, "static");
  basamak.color = "#888";
  oyuncu = new Sprite(80, 180, 24, 36);
  oyuncu.color = "#3d7ea6";
  oyuncu.rotationLock = true;
}
function draw() {
  background(255);
  if (kb.pressing("a")) oyuncu.vel.x = -3;
  else if (kb.pressing("d")) oyuncu.vel.x = 3;
  else oyuncu.vel.x = 0;
  let ayak = { x: oyuncu.x, y: oyuncu.y + oyuncu.h / 2 };
  let uc = { x: ayak.x, y: ayak.y + 22 };
  let hit = world.rayCast(ayak, uc);
  stroke(hit ? "#c9a227" : "#888");
  strokeWeight(3);
  line(ayak.x, ayak.y, uc.x, uc.y);
  noStroke();
  if (kb.presses("space") && hit) oyuncu.vel.y = -6;
  fill(0);
  textSize(12);
  text("A/D  Space  ·  sari isin yere degiyor: " + !!hit, 10, 18);
}
`,
        },
      ],
    },

  },
});
