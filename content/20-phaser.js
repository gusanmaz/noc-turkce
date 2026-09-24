registerChapter({
  id: "phaser",
  title: "Phaser · Arcade ve Matter",
  short: "Phaser",
  icon: "🕹️",
  html: `

    <p>Bu derste birkaç yıl Phaser ayrı bölümlerdi. p5.js sketch’i bir defter sayfasıdır: <code>setup</code>, <code>draw</code>. Phaser bir sahne kitabıdır: preload, create, update, kamera, iki ayrı fizik dünyası. Unutulmuş değildir. HTML5 2B oyunda hâlâ kalabalık çerçevedir.</p>
    <p>p5.play her zaman Planck (Box2D) gizler. Phaser size sorar: Arcade mı, Matter mı? Yanlış dünyayı açarsanız zıplama “bozuk” sanırsınız; aslında kutu dönmeyen bir motorda takla bekliyorsunuzdur.</p>
    <p class="toc-inline"><strong>Bu sayfada:</strong>
      <a href="#ph-sahne">Sahne</a> ·
      <a href="#ph-arcade">Arcade gövde</a> ·
      <a href="#ph-carpisma">Çarpışma</a> ·
      <a href="#ph-platform">Platform</a> ·
      <a href="#ph-kamera">Kamera</a> ·
      <a href="#ph-matter">Matter</a> ·
      <a href="#ph-ileri">İleri</a>
    </p>
    ${N.warn("Tuzak: iframe tuşu","<p>Önce önizlemeye tıklayın. Tıklamazsanız oklar sayfayı kaydırır; siz “Phaser bozuk” dersiniz. p5.play’deki <code>kb</code> tuzağının aynısıdır.</p>")}
    ${N.warn("Tuzak: aynı sahnede Arcade + Matter","<p>İki dünya ayrı adım atar. Arcade gövde Matter gövdeyi görmez. config.physics.default bir tanedir; ikisini karıştırmak p5.js’te bir kutuyu Matter’a, birini <code>x += vx</code> ile yürütmek gibidir.</p>")}

    <h2 id="ph-sahne">Sahne, p5.js değil</h2>
    <p>Pidemsi bir fırın düşünün. p5.js’te hamuru her kare siz çevirirsiniz. Phaser’da fırın (Game) kurulur, tepsi (Scene) bir kez doldurulur (<code>create</code>), her kare yalnızca tuzu eklersiniz (<code>update</code>). <code>function setup</code> yazmayın; bu editör p5.js yüklemez. <code>new Phaser.Game(config)</code> oyunu başlatır.</p>
    ${N.editor("ph0")}
    ${N.tryit([{ do: "Dikdörtgenin 72, 44 ölçülerini 20, 80 yapın.", expect: "Kutu dikleşir. create yine bir kez çalışır." }])}
    ${N.editor("ph1")}
    ${N.quiz("Phaser’da yerçekiminin işe yaraması için ne gerekir?",["Yalnızca gravity: { y: 500 } yazmak yeter, physics anahtarı süs","config.physics ve default: arcade veya matter","p5.js createCanvas"],1,"Yerçekimi bir sayıdır; onu uygulayan motor config.physics ile açılır.")}

    <h2 id="ph-arcade">Arcade: hızlı kutu, dönmeyen dünya</h2>
    <p>Arcade AABB’dir: kenarları eksene paralel dikdörtgen. Mario gibi yürür, kutular takla atmaz. Gövde <code>this.physics.add.existing(nesne)</code> ile bağlanır. İkinci argüman <code>true</code> ise static zemin. <code>collider</code> ikisini tanıştırır; tanıştırmazsanız top zeminden geçer.</p>
    ${N.editor("ph2")}
    ${N.tryit([{ do: "collider satırını yorumlayın.", expect: "Top zeminden geçer. İki gövde aynı sahnede olmak yetmez." }])}
    <p>Sekme <code>setBounce</code> ile. 0 çamurdur, 1 enerji kaybı yok sayılır — oyun abartısı, gerçek lastik değil.</p>
    ${N.editor("ph3")}
    ${N.editor("ph4")}
    ${N.tryit([{ do: "pembe topa da setCollideWorldBounds(true) ekleyin.", expect: "O da kenarda kalır. Varsayılan: dünya sınırı yok." }])}

    <h3>Hız ezmek, ivme biriktirmek, sürtünme, kütle</h3>
    <p>Bölüm 1 hızı her kare konuma ekler. Arcade’de <code>setVelocity</code> o hızı ezer: basılıyken 180, bırakınca 0 — buz hokeyi çubuğu değil, dijital yürüyüş. <code>setAcceleration</code> kuvvet gibidir: basılı tuttukça hız büyür, <code>setMaxVelocity</code> tavan koymazsanız karakter ışınlanır. <code>setDrag</code> havada sürtünmedir; zemin olmasa da yer. <code>setMass</code> aynı itişte ağır cismi az kıpırdatır — kütle ağırlık değildir; yerçekimi kapalıyken de mass durur.</p>
    ${N.editor("ph5")}
    ${N.editor("ph6")}
    ${N.editor("ph7")}
    ${N.editor("ph8")}
    ${N.tryit([{ do: "Pembe mass 8’i 1 yapın.", expect: "Space artık ikisini benzer fırlatır." }])}
    ${N.warn("Tuzak: Update’te her kare setVelocityY(-300)","<p>Yukarı ok basılı olduğu sürece zıplama kuvveti yenilenir. Karakter uçar. Zıplama <code>JustDown</code> (p5.play <code>presses</code>) ve <code>blocked.down</code> ister.</p>")}

    <h2 id="ph-carpisma">Kim duvar, kim hayalet</h2>
    <p><code>setImmovable(true)</code> dinamik görünümlü duvardır: çarpar, kaymaz. Static <code>existing(..., true)</code> yerçekimini de reddeder. Overlap p5.play <code>overlaps</code> gibidir: geçer, haber verir. Collider iter.</p>
    ${N.editor("ph9")}
    ${N.editor("ph10")}
    ${N.editor("ph11")}
    ${N.quiz("Jeton toplamak. Hangisi?",["collider — jeton oyuncuyu itsin","overlap — kesişince callback, itme yok","Matter constraint"],1,"overlap p5.play overlaps. collider duvar.")}

    <h2 id="ph-platform">Platformer iskeleti</h2>
    <p>“Yerde miyim?” Arcade’de <code>body.blocked.down</code>. p5.play’de <code>colliding(zemin)</code>. Unity’de overlap circle. Hepsi aynı soru: basılı Space havadayken ikinci zıplama vermesin. <code>JustDown</code> basıldığı kareyi ayırır; basılı tutmak sayacı şişirmez.</p>
    ${N.editor("ph12")}
    ${N.tryit([{ do: "blocked.down şartını silin.", expect: "Havadayken de zıplar." }])}
    ${N.editor("ph13")}
    ${N.editor("ph14")}
    <p>Grup, dizinin Phaser halidir. Beş düşmana beş collider yazmazsınız: <code>physics.add.group</code>, bir kural.</p>
    ${N.editor("ph15")}
    ${N.editor("ph16")}
    <p>Debug yeşil kutu çarpan kabuktur. Resim büyük, kabuk küçükse ayaklar havada duruyor gibi görünür — p5.play <code>allSprites.debug</code> ile aynı fikir.</p>

    <h2 id="ph-kamera">Kamera</h2>
    <p>Koridorda uzun bir duvar resmi var. Elinizde oyuk karton: pencere. Resmi taşımazsınız; pencereyi kaydırırsınız. Phaser’da dünya o resimdir, tuval o penceredir. <code>cameras.main.startFollow(oyuncu)</code> pencereyi oyuncunun üstüne getirir. Oyuncunun <code>x</code>’i hâlâ dünya koordinatıdır: 700, tuval 400 olsa da geçerlidir.</p>
    <p>p5.js’te aynı iş <code>translate(-oyuncu.x + width/2, ...)</code> ile yazılır. p5.play <code>camera.x = oyuncu.x</code> gizler. Phaser kaydırmayı kamerada tutar; gövde ofisi (Arcade / Matter) dünya biriminde adım atmaya devam eder. Kamera resmi kaydırır, fizik ofisini taşımaz.</p>
    <p>HUD yazısı dünyaya yapışmasın diye <code>setScrollFactor(0)</code> — p5.play <code>camera.off</code>. Lerp 0.08 geriden gelir; 1 yapışır. <code>setZoom</code> pencereyi büyütür: dünya durur, bakış daralır. Zoom da orijin etrafında scale’dir; merkeze bakılan nokta gelir.</p>
    ${N.editor("ph17")}
    ${N.editor("ph18")}
    ${N.editor("ph29")}
    ${N.tryit([{ do: "lerp 0.08’i 1, 1 yapın.", expect: "Kamera yapışır. 0.08 gecikmeli takip." }])}
    ${N.quiz("Oyuncu dünya x=700, kamera onu izliyor, tuval 400. Oyuncu ekranda nerede?",["Sol kenarın dışında","Ortada","x=700 tuvalin dışındadır, görünmez"],1,"Kamera baktığı dünya noktasını tuval merkezine koyar. Fizikte x hâlâ 700’dür.")}

    <h2 id="ph-matter">Phaser Matter: dönen dünya</h2>
    <p>Aynı Phaser, başka ofis. <code>default: 'matter'</code> Bölüm 6’daki Matter.js’i sahneye gömer. Kutu köşesi çarpınca döner. Arcade bunu yapmaz. <code>setBounds</code> unutulursa kutu tuvalden düşer, ofis sonsuzdur. Restitution p5.play <code>bounciness</code>, friction sürtünme, constraint ip, mouseSpring fare teli, isSensor tetik bölge, collisionstart temasın ilk karesi.</p>
    ${N.warn("Tuzak: Matter setVelocity üç argüman ister","<p>Arcade’de <code>body.setVelocity(180, 0)</code> iki sayıdır. Phaser Matter’da <code>this.matter.setVelocity(gövde, 6, 0)</code> gövde + x + y’dir. İkinci argümana <code>{ x: 6, y: 0 }</code> verirseniz hız bir nesne olur; Matter çarpışması <code>.index</code> diye patlar, ekranda Script error görürsünüz.</p>")}
    ${N.editor("ph19")}
    ${N.editor("ph20")}
    ${N.editor("ph21")}
    ${N.editor("ph22")}
    ${N.editor("ph23")}
    ${N.editor("ph24")}
    ${N.editor("ph25")}
    ${N.editor("ph26")}
    ${N.editor("ph27")}
    ${N.editor("ph28")}
    ${N.tryit([{ do: "sapan stiffness 0.05’i 0.8 yapın.", expect: "Lastik sertleşir, top az gerilir." }])}

    <h2 id="ph-ileri">Tek yön, sargı, çokgen, yerçekimsiz</h2>
    <p>Platformun üstünden basılır, altından geçilir: Arcade gövdenin <code>checkCollision.down = false</code>. Alt yüz çarpışmayı reddeder. p5.play’de bunu collider callback ile yazarsınız; Phaser gövde bayrağı verir.</p>
    <p><code>setAllowGravity(false)</code> / Matter <code>ignoreGravity</code> balondur: ofiste durur, yere çekilmez. <code>fromVertices</code> üç kenarlı kutu değildir; ok, T, çarpık çokgen. Ekrandan çıkan cismi karşı kenardan almak Matter Wrap eklentisidir — konum sıçrar, hız durur.</p>
    ${N.editor("ph30")}
    ${N.editor("ph31")}
    ${N.editor("ph32")}
    ${N.editor("ph33")}
    ${N.tryit([{ do: "Tek yön platformda checkCollision.down’ı silin (true kalsın).", expect: "Alttan da çarpar; Mario merdiveni kaybolur." }])}

    <h2>Sözlük: üç mutfak</h2>
    <table class="data">
      <thead><tr><th>Fikir</th><th>Arcade</th><th>Matter (Phaser)</th><th>p5.play</th></tr></thead>
      <tbody>
        <tr><td>Gövde</td><td>physics.add.existing</td><td>matter.add.rectangle</td><td>new Sprite</td></tr>
        <tr><td>Zemin</td><td>existing(..., true)</td><td>isStatic: true</td><td>'static'</td></tr>
        <tr><td>Hız</td><td>setVelocity</td><td>setVelocity</td><td>sprite.vel</td></tr>
        <tr><td>İt / geç</td><td>collider / overlap</td><td>çarpışma / isSensor</td><td>collides / overlaps</td></tr>
        <tr><td>Zıplama karesi</td><td>JustDown + blocked.down</td><td>siz yazarsınız</td><td>presses + colliding</td></tr>
        <tr><td>Fare teli</td><td>yok (süs)</td><td>mouseSpring</td><td>dragging + kinematic</td></tr>
      </tbody>
    </table>
    <p>Kitabın Matter ofisi: <a href="#/ch6">Bölüm 6</a>. Oyun tarifleri: <a href="#/matter">Matter.js · oyun</a>. Sprite API: <a href="#/p5play">p5.play</a>. C# Inspector: <a href="#/unity">Unity</a>.</p>
    ${N.resources([
      { kind: "Referans", title: "Phaser", url: "https://phaser.io/" },
      { kind: "Dokümantasyon", title: "Phaser Physics", url: "https://docs.phaser.io/phaser/concepts/physics" },
      { kind: "Örnek", title: "Arcade examples", url: "https://phaser.io/examples/v3/category/physics/arcade" },
      { kind: "Örnek", title: "Matter examples", url: "https://phaser.io/examples/v3/category/physics/matterjs" },
      { kind: "Video", title: "Phaser 3 fizik (Ourcade / YouTube’da konu adı)", url: "https://www.youtube.com/results?search_query=phaser+3+arcade+physics" },
      { kind: "Kitap", title: "Bölüm 6 Matter.js", url: "#/ch6" },
      { kind: "Kitap", title: "Matter.js oyun", url: "#/matter" },
      { kind: "Kitap", title: "p5.play", url: "#/p5play" },
    ])}

  `,
  editors: {
    ph0: {
      title: "Sahne: create bir kez, fizik yok",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
  type: Phaser.CANVAS,
  width: 400,
  height: 240,
  parent: document.body,
  backgroundColor: "#e8e8e8",
  scene: {
    create() {
      this.add.rectangle(200, 120, 400, 240, 0xf4f4f4);
  this.add.rectangle(200, 120, 72, 44, 0x3d7ea6);
  this.add.text(10, 10, "create bir kez — fizik config yok", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" });
  this.add.text(10, 220, "p5.js setup/draw yok; Phaser.Game var", { fontSize: "12px", color: "#333", fontFamily: "sans-serif" });
    }
  }
});\n`,
        }
      ],
    },
    ph1: {
      title: "Arcade acilmazsa yercekimi yazisi yalan soyler",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
  type: Phaser.CANVAS,
  width: 400,
  height: 240,
  parent: document.body,
  backgroundColor: "#e8e8e8",
  scene: {
    create() {
      this.add.rectangle(200, 120, 400, 240, 0xf4f4f4);
  this.add.circle(200, 40, 16, 0x3d7ea6);
  this.add.text(10, 10, "physics yok: daire asla dusmez", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" });
  this.add.text(10, 220, "config.physics olmadan gravity bir sayidir, kuvvet degil", { fontSize: "12px", color: "#333", fontFamily: "sans-serif" });
    }
  }
});\n`,
        }
      ],
    },
    ph2: {
      title: "Arcade: top ve zemin — collider sart",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "arcade", arcade: { gravity: { y: 500 }, debug: false } },
scene: {
      create() {
        this.add.rectangle(200, 120, 400, 240, 0xf7f7f7);
    const zemin = this.add.rectangle(200, 228, 400, 24, 0x333333);
    this.physics.add.existing(zemin, true);
    const top = this.add.circle(200, 40, 16, 0x3d7ea6);
    this.physics.add.existing(top);
    top.body.setCircle(16);
    top.body.setBounce(0.65);
    top.body.setCollideWorldBounds(true);
    this.physics.add.collider(top, zemin);
    this.add.text(10, 8, "collider yoksa top zeminden gecer", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" });
      }
    }
  });\n`,
        }
      ],
    },
    ph3: {
      title: "setBounce: dort top, dort sekme",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "arcade", arcade: { gravity: { y: 500 }, debug: false } },
scene: {
      create() {
        this.add.rectangle(200, 120, 400, 240, 0xf7f7f7);
    const zemin = this.add.rectangle(200, 228, 400, 24, 0x333333);
    this.physics.add.existing(zemin, true);
    [0, 0.3, 0.6, 0.95].forEach((b, i) => {
      const t = this.add.circle(55 + i * 95, 30, 14, [0xc45c78, 0x3d7ea6, 0x5a9e6f, 0xc9a227][i]);
      this.physics.add.existing(t);
      t.body.setCircle(14);
      t.body.setBounce(b);
      t.body.setCollideWorldBounds(true);
      this.physics.add.collider(t, zemin);
      this.add.text(40 + i * 95, 8, String(b), { fontSize: "12px", color: "#111", fontFamily: "sans-serif" });
    });
    this.add.text(10, 220, "0 camur  ·  1 enerji kaybi yok (oyun abartisi)", { fontSize: "12px", color: "#111", fontFamily: "sans-serif" });
      }
    }
  });\n`,
        }
      ],
    },
    ph4: {
      title: "World bounds: kenar duvar olsun mu",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "arcade", arcade: { gravity: { y: 500 }, debug: false } },
scene: {
      create() {
        this.add.rectangle(200, 120, 400, 240, 0xf7f7f7);
    const zemin = this.add.rectangle(200, 228, 400, 24, 0x333333);
    this.physics.add.existing(zemin, true);
    const tutulan = this.add.circle(80, 40, 14, 0x5a9e6f);
    this.physics.add.existing(tutulan);
    tutulan.body.setCircle(14);
    tutulan.body.setVelocity(180, 0);
    tutulan.body.setBounce(0.8);
    tutulan.body.setCollideWorldBounds(true);
    this.physics.add.collider(tutulan, zemin);
    const kacan = this.add.circle(220, 40, 14, 0xc45c78);
    this.physics.add.existing(kacan);
    kacan.body.setCircle(14);
    kacan.body.setVelocity(180, 0);
    kacan.body.setBounce(0.8);
    this.physics.add.collider(kacan, zemin);
    this.add.text(10, 8, "yesil kenarda kalir  ·  pembe sagdan duser", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" });
      }
    }
  });\n`,
        }
      ],
    },
    ph5: {
      title: "Hiz ezmek: WASD (yercekimi kapali)",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "arcade", arcade: { gravity: { y: 0 }, debug: false } },
scene: {
      create() {
        this.add.rectangle(200, 120, 400, 240, 0xf7f7f7);
    this.g = this.add.circle(200, 120, 16, 0x3d7ea6);
    this.physics.add.existing(this.g);
    this.g.body.setCircle(16);
    this.g.body.setCollideWorldBounds(true);
    this.g.body.setDrag(40);
    this.keys = this.input.keyboard.addKeys("W,A,S,D");
    this.add.text(10, 8, "WASD hizi ezer  ·  once tuvale tikla", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" });
      },
  update() {
    const b = this.g.body;
    const sp = 180;
    b.setVelocity(0, 0);
    if (this.keys.A.isDown) b.setVelocityX(-sp);
    if (this.keys.D.isDown) b.setVelocityX(sp);
    if (this.keys.W.isDown) b.setVelocityY(-sp);
    if (this.keys.S.isDown) b.setVelocityY(sp);
  }
    }
  });\n`,
        }
      ],
    },
    ph6: {
      title: "setAcceleration: kuvvet gibi birikir",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "arcade", arcade: { gravity: { y: 0 }, debug: false } },
scene: {
      create() {
        this.add.rectangle(200, 120, 400, 240, 0xf7f7f7);
    this.g = this.add.circle(200, 120, 16, 0xc45c78);
    this.physics.add.existing(this.g);
    this.g.body.setCircle(16);
    this.g.body.setCollideWorldBounds(true);
    this.g.body.setMaxVelocity(260);
    this.g.body.setDrag(80);
    this.keys = this.input.keyboard.addKeys("W,A,S,D");
    this.txt = this.add.text(10, 8, "", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" });
      },
  update() {
    const b = this.g.body;
    let ax = 0, ay = 0;
    if (this.keys.A.isDown) ax -= 400;
    if (this.keys.D.isDown) ax += 400;
    if (this.keys.W.isDown) ay -= 400;
    if (this.keys.S.isDown) ay += 400;
    b.setAcceleration(ax, ay);
    this.txt.setText("acc (" + ax + "," + ay + ")  vel " + Math.round(b.velocity.x) + "," + Math.round(b.velocity.y));
  }
    }
  });\n`,
        }
      ],
    },
    ph7: {
      title: "setDrag: havada surtunme",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "arcade", arcade: { gravity: { y: 0 }, debug: false } },
scene: {
      create() {
        this.add.rectangle(200, 120, 400, 240, 0xf7f7f7);
    const a = this.add.circle(100, 80, 14, 0x3d7ea6);
    this.physics.add.existing(a);
    a.body.setCircle(14);
    a.body.setVelocity(220, 0);
    a.body.setDrag(0);
    a.body.setCollideWorldBounds(true);
    a.body.setBounce(1);
    const c = this.add.circle(100, 160, 14, 0xc45c78);
    this.physics.add.existing(c);
    c.body.setCircle(14);
    c.body.setVelocity(220, 0);
    c.body.setDrag(120);
    c.body.setCollideWorldBounds(true);
    c.body.setBounce(1);
    this.add.text(10, 8, "mavi drag 0  ·  pembe drag 120", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" });
      }
    }
  });\n`,
        }
      ],
    },
    ph8: {
      title: "setMass: ayni itis, farkli kivirtma",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "arcade", arcade: { gravity: { y: 0 }, debug: false } },
scene: {
      create() {
        this.add.rectangle(200, 120, 400, 240, 0xf7f7f7);
    this.hafif = this.add.circle(80, 120, 18, 0x3d7ea6);
    this.physics.add.existing(this.hafif);
    this.hafif.body.setCircle(18);
    this.hafif.body.setMass(1);
    this.hafif.body.setCollideWorldBounds(true);
    this.hafif.body.setDrag(40);
    this.agir = this.add.circle(80, 180, 18, 0xc45c78);
    this.physics.add.existing(this.agir);
    this.agir.body.setCircle(18);
    this.agir.body.setMass(8);
    this.agir.body.setCollideWorldBounds(true);
    this.agir.body.setDrag(40);
    this.space = this.input.keyboard.addKey("SPACE");
    this.add.text(10, 8, "Space: ikisine ayni velocityX itisi", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" });
    this.add.text(10, 220, "mavi mass 1  ·  pembe mass 8", { fontSize: "12px", color: "#111", fontFamily: "sans-serif" });
      },
  update() {
    if (Phaser.Input.Keyboard.JustDown(this.space)) {
      this.hafif.body.setVelocityX(240);
      this.agir.body.setVelocityX(240);
    }
  }
    }
  });\n`,
        }
      ],
    },
    ph9: {
      title: "immovable: kutu duvari itmez",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "arcade", arcade: { gravity: { y: 500 }, debug: false } },
scene: {
      create() {
        this.add.rectangle(200, 120, 400, 240, 0xf7f7f7);
    const zemin = this.add.rectangle(200, 228, 400, 24, 0x333333);
    this.physics.add.existing(zemin, true);
    const duvar = this.add.rectangle(200, 150, 24, 90, 0xc45c78);
    this.physics.add.existing(duvar);
    duvar.body.setImmovable(true);
    duvar.body.setAllowGravity(false);
    const kutu = this.add.rectangle(80, 180, 28, 28, 0x3d7ea6);
    this.physics.add.existing(kutu);
    kutu.body.setVelocityX(140);
    kutu.body.setBounce(0.4);
    this.physics.add.collider(kutu, zemin);
    this.physics.add.collider(kutu, duvar);
    this.physics.add.collider(duvar, zemin);
    this.add.text(10, 8, "pembe immovable: mavi carpar, duvar kaymaz", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" });
      }
    }
  });\n`,
        }
      ],
    },
    ph10: {
      title: "static existing(true) vs dynamic",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "arcade", arcade: { gravity: { y: 500 }, debug: false } },
scene: {
      create() {
        this.add.rectangle(200, 120, 400, 240, 0xf7f7f7);
    const zemin = this.add.rectangle(200, 228, 400, 24, 0x333333);
    this.physics.add.existing(zemin, true);
    const stat = this.add.rectangle(120, 190, 50, 20, 0x5a9e6f);
    this.physics.add.existing(stat, true);
    const dyn = this.add.rectangle(280, 40, 50, 20, 0xc45c78);
    this.physics.add.existing(dyn);
    this.physics.add.collider(dyn, zemin);
    this.add.text(10, 8, "yesil static  ·  pembe dynamic duser", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" });
      }
    }
  });\n`,
        }
      ],
    },
    ph11: {
      title: "collider vs overlap ayni geometri",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "arcade", arcade: { gravity: { y: 0 }, debug: false } },
scene: {
      create() {
        this.add.rectangle(200, 120, 400, 240, 0xf7f7f7);
    this.top = this.add.circle(50, 120, 14, 0x3d7ea6);
    this.physics.add.existing(this.top);
    this.top.body.setCircle(14);
    this.duvar = this.add.rectangle(180, 120, 22, 100, 0xc45c78);
    this.physics.add.existing(this.duvar, true);
    this.bolge = this.add.rectangle(310, 120, 64, 64, 0x5a9e6f, 0.35);
    this.physics.add.existing(this.bolge, true);
    this.physics.add.collider(this.top, this.duvar);
    this.physics.add.overlap(this.top, this.bolge, () => {
      this.bolge.setFillStyle(0x5a9e6f, 0.8);
    });
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.text(10, 8, "oklar  ·  sol iter  ·  sag gecer", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" });
      },
  update() {
    const b = this.top.body;
    b.setVelocity(0, 0);
    if (this.cursors.left.isDown) b.setVelocityX(-160);
    if (this.cursors.right.isDown) b.setVelocityX(160);
    if (this.cursors.up.isDown) b.setVelocityY(-160);
    if (this.cursors.down.isDown) b.setVelocityY(160);
    this.bolge.setFillStyle(0x5a9e6f, 0.35);
  }
    }
  });\n`,
        }
      ],
    },
    ph12: {
      title: "Platform: blocked.down ile ziplama",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "arcade", arcade: { gravity: { y: 500 }, debug: false } },
scene: {
      create() {
        this.add.rectangle(200, 120, 400, 240, 0xf7f7f7);
    const zemin = this.add.rectangle(200, 228, 400, 24, 0x333333);
    this.physics.add.existing(zemin, true);
    const basamak = this.add.rectangle(270, 158, 120, 14, 0x5a9e6f);
    this.physics.add.existing(basamak, true);
    this.p = this.add.rectangle(50, 180, 22, 34, 0x3d7ea6);
    this.physics.add.existing(this.p);
    this.p.body.setCollideWorldBounds(true);
    this.physics.add.collider(this.p, zemin);
    this.physics.add.collider(this.p, basamak);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.text(10, 8, "oklar yuru  ·  yukari zipla (yerdeyken)", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" });
      },
  update() {
    const b = this.p.body;
    if (this.cursors.left.isDown) b.setVelocityX(-160);
    else if (this.cursors.right.isDown) b.setVelocityX(160);
    else b.setVelocityX(0);
    if (this.cursors.up.isDown && b.blocked.down) b.setVelocityY(-320);
  }
    }
  });\n`,
        }
      ],
    },
    ph13: {
      title: "JustDown: basili tutunca ucmasin",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "arcade", arcade: { gravity: { y: 500 }, debug: false } },
scene: {
      create() {
        this.add.rectangle(200, 120, 400, 240, 0xf7f7f7);
    const zemin = this.add.rectangle(200, 228, 400, 24, 0x333333);
    this.physics.add.existing(zemin, true);
    this.p = this.add.rectangle(80, 180, 22, 34, 0x3d7ea6);
    this.physics.add.existing(this.p);
    this.p.body.setCollideWorldBounds(true);
    this.physics.add.collider(this.p, zemin);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.n = 0;
    this.txt = this.add.text(10, 8, "", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" });
      },
  update() {
    const b = this.p.body;
    if (this.cursors.left.isDown) b.setVelocityX(-160);
    else if (this.cursors.right.isDown) b.setVelocityX(160);
    else b.setVelocityX(0);
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && b.blocked.down) {
      b.setVelocityY(-320);
      this.n++;
    }
    this.txt.setText("JustDown ziplama sayisi " + this.n + "  (basili tutunca artmaz)");
  }
    }
  });\n`,
        }
      ],
    },
    ph14: {
      title: "overlap jeton: disableBody",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "arcade", arcade: { gravity: { y: 500 }, debug: false } },
scene: {
      create() {
        this.add.rectangle(200, 120, 400, 240, 0xf7f7f7);
    const zemin = this.add.rectangle(200, 228, 400, 24, 0x333333);
    this.physics.add.existing(zemin, true);
    this.p = this.add.rectangle(40, 180, 22, 34, 0x3d7ea6);
    this.physics.add.existing(this.p);
    this.p.body.setCollideWorldBounds(true);
    this.physics.add.collider(this.p, zemin);
    this.jetons = this.physics.add.staticGroup();
    [150, 230, 310].forEach((x) => {
      const j = this.add.rectangle(x, 200, 16, 16, 0xc9a227);
      this.physics.add.existing(j, true);
      this.jetons.add(j);
    });
    this.skor = 0;
    this.txt = this.add.text(10, 8, "skor 0", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" });
    this.physics.add.overlap(this.p, this.jetons, (o, j) => {
      j.disableBody(true, true);
      this.skor++;
      this.txt.setText("skor " + this.skor);
    });
    this.cursors = this.input.keyboard.createCursorKeys();
      },
  update() {
    const b = this.p.body;
    if (this.cursors.left.isDown) b.setVelocityX(-160);
    else if (this.cursors.right.isDown) b.setVelocityX(160);
    else b.setVelocityX(0);
    if (this.cursors.up.isDown && b.blocked.down) b.setVelocityY(-300);
  }
    }
  });\n`,
        }
      ],
    },
    ph15: {
      title: "Group: uc dusman, bir kural",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "arcade", arcade: { gravity: { y: 0 }, debug: false } },
scene: {
      create() {
        this.add.rectangle(200, 120, 400, 240, 0xf7f7f7);
    this.p = this.add.circle(40, 120, 12, 0x3d7ea6);
    this.physics.add.existing(this.p);
    this.p.body.setCircle(12);
    this.p.body.setCollideWorldBounds(true);
    this.dusman = this.physics.add.group();
    for (let i = 0; i < 5; i++) {
      const d = this.add.rectangle(140 + i * 48, 40 + (i % 2) * 80, 22, 22, 0xc45c78);
      this.physics.add.existing(d);
      d.body.setVelocity(0, 40 + i * 20);
      d.body.setBounce(1);
      d.body.setCollideWorldBounds(true);
      this.dusman.add(d);
    }
    this.hits = 0;
    this.txt = this.add.text(10, 8, "oklar  ·  carpisma 0", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" });
    this.physics.add.collider(this.p, this.dusman, () => {
      this.hits++;
      this.txt.setText("oklar  ·  carpisma " + this.hits);
    });
    this.cursors = this.input.keyboard.createCursorKeys();
      },
  update() {
    const b = this.p.body;
    b.setVelocity(0, 0);
    if (this.cursors.left.isDown) b.setVelocityX(-180);
    if (this.cursors.right.isDown) b.setVelocityX(180);
    if (this.cursors.up.isDown) b.setVelocityY(-180);
    if (this.cursors.down.isDown) b.setVelocityY(180);
  }
    }
  });\n`,
        }
      ],
    },
    ph16: {
      title: "Arcade debug: yesil govde kutusu",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "arcade", arcade: { gravity: { y: 500 }, debug: true } },
scene: {
      create() {
        this.add.rectangle(200, 120, 400, 240, 0xf7f7f7);
    const zemin = this.add.rectangle(200, 228, 400, 24, 0x333333);
    this.physics.add.existing(zemin, true);
    const top = this.add.circle(200, 50, 18, 0x3d7ea6);
    this.physics.add.existing(top);
    top.body.setCircle(18);
    top.body.setBounce(0.5);
    this.physics.add.collider(top, zemin);
    this.add.text(10, 8, "debug: true  —  cizen kutu carpan kabuktur", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" });
      }
    }
  });\n`,
        }
      ],
    },
    ph17: {
      title: "Kamera: dunya tuvalden uzun",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "arcade", arcade: { gravity: { y: 0 }, debug: false } },
scene: {
      create() {
        this.physics.world.setBounds(0, 0, 900, 240);
    this.cameras.main.setBounds(0, 0, 900, 240);
    this.add.rectangle(450, 120, 900, 240, 0xf0f0f0);
    for (let i = 0; i < 12; i++) {
      const d = this.add.rectangle(70 + i * 70, 140 + (i % 3) * 20, 16, 80, [0xc45c78, 0x5a9e6f, 0xc9a227][i % 3]);
      this.physics.add.existing(d, true);
    }
    this.p = this.add.rectangle(80, 200, 22, 22, 0x3d7ea6);
    this.physics.add.existing(this.p);
    this.p.body.setCollideWorldBounds(true);
    this.cameras.main.startFollow(this.p, true, 1, 1);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.text(10, 8, "oklar  ·  kamera oyuncuyu izler", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" }).setScrollFactor(0);
      },
  update() {
    const b = this.p.body;
    b.setVelocity(0, 0);
    if (this.cursors.left.isDown) b.setVelocityX(-180);
    if (this.cursors.right.isDown) b.setVelocityX(180);
  }
    }
  });\n`,
        }
      ],
    },
    ph18: {
      title: "Kamera lerp: yumusak takip",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "arcade", arcade: { gravity: { y: 0 }, debug: false } },
scene: {
      create() {
        this.physics.world.setBounds(0, 0, 900, 240);
    this.cameras.main.setBounds(0, 0, 900, 240);
    this.add.rectangle(450, 120, 900, 240, 0xf0f0f0);
    for (let i = 0; i < 10; i++) {
      this.add.rectangle(80 + i * 85, 200, 40, 12, 0x888888);
    }
    this.p = this.add.rectangle(80, 160, 22, 22, 0xc45c78);
    this.physics.add.existing(this.p);
    this.p.body.setCollideWorldBounds(true);
    this.cameras.main.startFollow(this.p, true, 0.08, 0.08);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.text(10, 8, "lerp 0.08: kamera geriden gelir", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" }).setScrollFactor(0);
      },
  update() {
    const b = this.p.body;
    b.setVelocity(0, 0);
    if (this.cursors.left.isDown) b.setVelocityX(-220);
    if (this.cursors.right.isDown) b.setVelocityX(220);
  }
    }
  });\n`,
        }
      ],
    },
    ph19: {
      title: "Matter: kutu kosesi carpinca doner",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "matter", matter: { gravity: { y: 1 }, debug: true } },
scene: {
      create() {
        this.matter.world.setBounds(0, 0, 400, 240);
    this.matter.add.rectangle(200, 230, 400, 20, { isStatic: true });
    this.matter.add.rectangle(150, 40, 36, 36, { restitution: 0.35 });
    this.matter.add.rectangle(210, 10, 36, 36, { restitution: 0.35 });
    this.matter.add.rectangle(260, 70, 50, 22, { restitution: 0.2 });
    this.add.text(10, 8, "Matter: Arcade bunu yapmaz — aci var", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" });
      }
    }
  });\n`,
        }
      ],
    },
    ph20: {
      title: "Matter daire vs kutu",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "matter", matter: { gravity: { y: 1 }, debug: true } },
scene: {
      create() {
        this.matter.world.setBounds(0, 0, 400, 240);
    this.matter.add.rectangle(200, 230, 400, 20, { isStatic: true });
    this.matter.add.circle(120, 40, 18, { restitution: 0.7, friction: 0.01 });
    this.matter.add.rectangle(260, 40, 36, 36, { restitution: 0.7, friction: 0.01 });
    this.add.text(10, 8, "sol daire yuvarlanir  ·  sag kutu takla atar", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" });
      }
    }
  });\n`,
        }
      ],
    },
    ph21: {
      title: "Matter surtunme: buz / lastik",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "matter", matter: { gravity: { y: 1 }, debug: true } },
scene: {
      create() {
        this.matter.world.setBounds(0, 0, 400, 240);
    this.matter.add.rectangle(90, 230, 160, 20, { isStatic: true, friction: 0.001 });
    this.matter.add.rectangle(310, 230, 160, 20, { isStatic: true, friction: 1 });
    const a = this.matter.add.circle(60, 180, 16, { friction: 0.001, restitution: 0.05 });
    const b = this.matter.add.circle(250, 180, 16, { friction: 1, restitution: 0.05 });
    this.matter.setVelocity(a, 6, 0);
    this.matter.setVelocity(b, 6, 0);
    this.add.text(10, 8, "sol buz  ·  sag lastik  ·  ayni ilk hiz", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" });
      }
    }
  });\n`,
        }
      ],
    },
    ph22: {
      title: "Matter constraint: sarkac",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "matter", matter: { gravity: { y: 1 }, debug: true } },
scene: {
      create() {
        this.matter.world.setBounds(0, 0, 400, 240);
    this.matter.add.rectangle(200, 230, 400, 20, { isStatic: true });
    const civata = this.matter.add.rectangle(200, 24, 16, 16, { isStatic: true });
    const top = this.matter.add.circle(280, 130, 16, { restitution: 0.2 });
    this.matter.add.constraint(civata, top, 110, 0.9);
    this.add.text(10, 8, "Distance constraint = ip  ·  tikla-cek asagida", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" });
      }
    }
  });\n`,
        }
      ],
    },
    ph23: {
      title: "Matter mouseSpring: kutulari cek",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "matter", matter: { gravity: { y: 1 }, debug: true } },
scene: {
      create() {
        this.matter.world.setBounds(0, 0, 400, 240);
    this.matter.add.rectangle(200, 230, 400, 20, { isStatic: true });
    for (let i = 0; i < 6; i++) {
      this.matter.add.rectangle(80 + i * 40, 40 + (i % 2) * 20, 28, 28, { restitution: 0.2 });
    }
    this.matter.add.mouseSpring({ stiffness: 0.2 });
    this.add.text(10, 8, "fare ile tut  ·  mouseSpring", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" });
      }
    }
  });\n`,
        }
      ],
    },
    ph24: {
      title: "Matter zincir",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "matter", matter: { gravity: { y: 1 }, debug: true } },
scene: {
      create() {
        this.matter.world.setBounds(0, 0, 400, 240);
    this.matter.add.rectangle(200, 230, 400, 20, { isStatic: true });
    let prev = this.matter.add.rectangle(200, 20, 14, 14, { isStatic: true });
    for (let i = 0; i < 8; i++) {
      const n = this.matter.add.circle(200, 40 + i * 18, 8, { restitution: 0.1 });
      this.matter.add.constraint(prev, n, 16, 0.8);
      prev = n;
    }
    this.matter.add.mouseSpring({ stiffness: 0.15 });
    this.add.text(10, 8, "zincir  ·  ucu fareyle cek", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" });
      }
    }
  });\n`,
        }
      ],
    },
    ph25: {
      title: "collisionstart: kirmizi kutuyu sil",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "matter", matter: { gravity: { y: 1 }, debug: true } },
scene: {
      create() {
        this.matter.world.setBounds(0, 0, 400, 240);
    this.matter.add.rectangle(200, 230, 400, 20, { isStatic: true });
    const mermi = this.matter.add.circle(40, 100, 10, { restitution: 0.1 });
    this.matter.setVelocity(mermi, 8, 0);
    mermi.label = "mermi";
    const hedef = this.matter.add.rectangle(300, 180, 40, 40, { isStatic: true });
    hedef.label = "hedef";
    this.txt = this.add.text(10, 8, "mavi mermi kirmiziya carpsin", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" });
    this.matter.world.on("collisionstart", (ev) => {
      ev.pairs.forEach((pair) => {
        const labels = [pair.bodyA.label, pair.bodyB.label];
        if (labels.includes("mermi") && labels.includes("hedef")) {
          this.time.delayedCall(0, () => this.matter.world.remove(hedef));
          this.txt.setText("hedef silindi — collisionstart");
        }
      });
    });
      }
    }
  });\n`,
        }
      ],
    },
    ph26: {
      title: "Matter sensor: gecer, haber verir",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "matter", matter: { gravity: { y: 1 }, debug: true } },
scene: {
      create() {
        this.matter.world.setBounds(0, 0, 400, 240);
    this.matter.add.rectangle(200, 230, 400, 20, { isStatic: true });
    const bolge = this.matter.add.rectangle(250, 160, 80, 80, { isStatic: true, isSensor: true });
    const top = this.matter.add.circle(60, 160, 16, { restitution: 0.1 });
    this.matter.setVelocity(top, 4, 0);
    this.txt = this.add.text(10, 8, "sensor: icinden gecer", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" });
    this.matter.world.on("collisionactive", (ev) => {
      for (const pair of ev.pairs) {
        if (pair.bodyA === bolge || pair.bodyB === bolge) this.txt.setText("sensor icinde");
      }
    });
      }
    }
  });\n`,
        }
      ],
    },
    ph27: {
      title: "sapan: lastik iki nokta + top",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "matter", matter: { gravity: { y: 1 }, debug: true } },
scene: {
      create() {
        this.matter.world.setBounds(0, 0, 400, 240);
    this.matter.add.rectangle(200, 230, 400, 20, { isStatic: true });
    const a = this.matter.add.circle(70, 150, 6, { isStatic: true });
    const b = this.matter.add.circle(110, 150, 6, { isStatic: true });
    const top = this.matter.add.circle(90, 150, 12, { restitution: 0.4 });
    this.matter.add.constraint(a, top, 24, 0.05);
    this.matter.add.constraint(b, top, 24, 0.05);
    this.matter.add.mouseSpring({ stiffness: 0.4 });
    this.add.text(10, 8, "topu geri cek, birak — sapan", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" });
      }
    }
  });\n`,
        }
      ],
    },
    ph28: {
      title: "setAngularVelocity: ruzgar gulu",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
    type: Phaser.CANVAS,
    width: 400,
    height: 240,
    parent: document.body,
    backgroundColor: "#e8e8e8",
    physics: { default: "matter", matter: { gravity: { y: 1 }, debug: true } },
scene: {
      create() {
        this.matter.world.setBounds(0, 0, 400, 240);
    this.matter.add.rectangle(200, 230, 400, 20, { isStatic: true });
    const mil = this.matter.add.circle(200, 120, 8, { isStatic: true });
    const kanat = this.matter.add.rectangle(200, 120, 140, 16, { restitution: 0.1 });
    this.matter.add.constraint(mil, kanat, 0, 1);
    this.matter.setAngularVelocity(kanat, 0.12);
    this.add.text(10, 8, "aci hizi  ·  constraint mile bagli", { fontSize: "13px", color: "#111", fontFamily: "sans-serif" });
      }
    }
  });\n`,
        }
      ],
    },
    ph29: {
      title: "Kamera zoom: ayni dunya, dar pencere",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
  type: Phaser.CANVAS,
  width: 400,
  height: 240,
  parent: document.body,
  backgroundColor: "#e8e8e8",
  physics: { default: "arcade", arcade: { gravity: { y: 0 }, debug: false } },
  scene: {
    create() {
      this.physics.world.setBounds(0, 0, 900, 240);
      this.cameras.main.setBounds(0, 0, 900, 240);
      this.add.rectangle(450, 120, 900, 240, 0xf0f0f0);
      for (let i = 0; i < 10; i++) {
        this.add.rectangle(80 + i * 85, 200, 40, 12, 0x888888);
        this.add.text(60 + i * 85, 210, "" + i, { fontSize: "11px", color: "#333", fontFamily: "sans-serif" });
      }
      this.p = this.add.rectangle(80, 160, 22, 22, 0xc45c78);
      this.physics.add.existing(this.p);
      this.p.body.setCollideWorldBounds(true);
      this.cameras.main.startFollow(this.p, true, 1, 1);
      this.cameras.main.setZoom(1.7);
      this.cursors = this.input.keyboard.createCursorKeys();
      this.add.text(10, 8, "zoom 1.7  ·  dunya ayni, pencere dar", {
        fontSize: "13px", color: "#111", fontFamily: "sans-serif"
      }).setScrollFactor(0);
    },
    update() {
      const b = this.p.body;
      b.setVelocity(0, 0);
      if (this.cursors.left.isDown) b.setVelocityX(-220);
      if (this.cursors.right.isDown) b.setVelocityX(220);
    }
  }
});
`,
        }
      ],
    },
    ph30: {
      title: "Tek yon platform: alttan gec, ustten bas",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
  type: Phaser.CANVAS,
  width: 400,
  height: 240,
  parent: document.body,
  backgroundColor: "#e8e8e8",
  physics: { default: "arcade", arcade: { gravity: { y: 700 }, debug: false } },
  scene: {
    create() {
      this.add.rectangle(200, 120, 400, 240, 0xf7f7f7);
      const zemin = this.add.rectangle(200, 228, 400, 24, 0x333333);
      this.physics.add.existing(zemin, true);
      const plat = this.add.rectangle(200, 140, 140, 14, 0x888888);
      this.physics.add.existing(plat, true);
      plat.body.checkCollision.down = false;
      plat.body.checkCollision.left = false;
      plat.body.checkCollision.right = false;
      this.p = this.add.rectangle(80, 200, 22, 34, 0x3d7ea6);
      this.physics.add.existing(this.p);
      this.p.body.setCollideWorldBounds(true);
      this.physics.add.collider(this.p, zemin);
      this.physics.add.collider(this.p, plat);
      this.cursors = this.input.keyboard.createCursorKeys();
      this.add.text(10, 8, "oklar  ·  alttan gec, ustten bas", {
        fontSize: "13px", color: "#111", fontFamily: "sans-serif"
      });
    },
    update() {
      const b = this.p.body;
      if (this.cursors.left.isDown) b.setVelocityX(-160);
      else if (this.cursors.right.isDown) b.setVelocityX(160);
      else b.setVelocityX(0);
      if (this.cursors.up.isDown && b.blocked.down) b.setVelocityY(-360);
    }
  }
});
`,
        }
      ],
    },
    ph31: {
      title: "setAllowGravity(false): balon",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
  type: Phaser.CANVAS,
  width: 400,
  height: 240,
  parent: document.body,
  backgroundColor: "#e8e8e8",
  physics: { default: "arcade", arcade: { gravity: { y: 500 }, debug: false } },
  scene: {
    create() {
      this.add.rectangle(200, 120, 400, 240, 0xf7f7f7);
      const zemin = this.add.rectangle(200, 228, 400, 24, 0x333333);
      this.physics.add.existing(zemin, true);
      const kutu = this.add.rectangle(140, 40, 28, 28, 0x3d7ea6);
      this.physics.add.existing(kutu);
      this.physics.add.collider(kutu, zemin);
      const balon = this.add.circle(280, 80, 16, 0xc45c78);
      this.physics.add.existing(balon);
      balon.body.setCircle(16);
      balon.body.setAllowGravity(false);
      balon.body.setVelocity(40, 30);
      balon.body.setBounce(1);
      balon.body.setCollideWorldBounds(true);
      this.add.text(10, 8, "mavi duser  ·  pembe yercekimini reddeder", {
        fontSize: "13px", color: "#111", fontFamily: "sans-serif"
      });
    }
  }
});
`,
        }
      ],
    },
    ph32: {
      title: "Matter ignoreGravity + fromVertices",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
  type: Phaser.CANVAS,
  width: 400,
  height: 240,
  parent: document.body,
  backgroundColor: "#e8e8e8",
  physics: { default: "matter", matter: { gravity: { y: 1 }, debug: true } },
  scene: {
    create() {
      this.matter.world.setBounds(0, 0, 400, 240);
      this.matter.add.rectangle(200, 230, 400, 20, { isStatic: true });
      this.matter.add.fromVertices(200, 50, [
        { x: 0, y: 24 }, { x: 28, y: 0 }, { x: 56, y: 24 },
        { x: 42, y: 24 }, { x: 42, y: 48 }, { x: 14, y: 48 }, { x: 14, y: 24 }
      ], { restitution: 0.3 });
      const balon = this.matter.add.circle(80, 80, 14, { ignoreGravity: true, restitution: 0.9 });
      this.matter.setVelocity(balon, 3, 2);
      this.add.text(10, 8, "ok fromVertices  ·  pembe ignoreGravity", {
        fontSize: "13px", color: "#111", fontFamily: "sans-serif"
      });
    }
  }
});
`,
        }
      ],
    },
    ph33: {
      title: "Matter wrap: karsi kenardan gir",
      libraries: ["phaser"],
      files: [
        {
          name: "sketch.js",
          content: `new Phaser.Game({
  type: Phaser.CANVAS,
  width: 400,
  height: 240,
  parent: document.body,
  backgroundColor: "#e8e8e8",
  physics: { default: "matter", matter: { gravity: { y: 0 }, debug: true } },
  scene: {
    create() {
      this.a = this.matter.add.circle(40, 120, 16, {
        restitution: 1,
        friction: 0,
        frictionAir: 0
      });
      this.matter.setVelocity(this.a, 4, 0);
      this.add.text(10, 8, "sagdan cikinca soldan  ·  wrap isinlanma", {
        fontSize: "13px", color: "#111", fontFamily: "sans-serif"
      });
    },
    update() {
      const p = this.a.position;
      if (p.x > 416) this.matter.body.setPosition(this.a, { x: 0, y: p.y });
      if (p.x < -16) this.matter.body.setPosition(this.a, { x: 400, y: p.y });
    }
  }
});
`,
        }
      ],
    }

  },
});
