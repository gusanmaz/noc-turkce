registerChapter({
  id: "kaynaklar",
  title: "Kaynaklar",
  short: "Kaynaklar",
  icon: "🔗",
  html: `
    <p>Bu sayfada uydurma bağlantı yok. Playlist kimliği ezberden yazılmadı; Coding Train için resmi parça sayfası durur. Takıldığınız konuda “Coding Train + konu adı” aramak, sahte video kimliği yapıştırmaktan güvenlidir.</p>

    <h2>Kitap ve kod</h2>
    <ul>
      <li><a href="https://natureofcode.com/" target="_blank" rel="noopener">The Nature of Code</a> — Daniel Shiffman, ücretsiz HTML. İngilizce asıl metin.</li>
      <li><a href="https://natureofcode.com/neuroevolution/" target="_blank" rel="noopener">Bölüm 11 · Neuroevolution</a> — bu sitedeki <a href="#/ch11">Nöroevrim</a> sayfasının kaynağı.</li>
      <li><a href="https://github.com/nature-of-code/noc-book-2" target="_blank" rel="noopener">nature-of-code/noc-book-2</a> — 2024 p5.js baskısının deposu.</li>
      <li><a href="https://github.com/nature-of-code/noc-book-2/tree/main/content/examples" target="_blank" rel="noopener">content/examples</a> — bölüm klasörleri halinde sketch’ler.</li>
      <li><a href="https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/11_nn_ga" target="_blank" rel="noopener">examples/11_nn_ga</a> — Flappy, akıllı roket, sensör, ekosistem. ml5.js ister; bu sitedeki iframe ml5 yüklemez.</li>
      <li><a href="https://github.com/nature-of-code" target="_blank" rel="noopener">nature-of-code örgütü</a> — Shiffman’ın “katkıda bulunun” dediği yer.</li>
    </ul>

    <h2>p5.js</h2>
    <ul>
      <li><a href="https://p5js.org/reference/" target="_blank" rel="noopener">p5.js referans</a> — fonksiyon arayın: <code>createVector</code>, <code>dist</code>, <code>rotate</code>.</li>
      <li><a href="https://p5js.org/reference/p5/createVector/" target="_blank" rel="noopener">createVector</a> — vektör paketi.</li>
      <li><a href="https://p5js.org/reference/p5/p5.Vector/" target="_blank" rel="noopener">p5.Vector</a> — <code>add</code>, <code>sub</code>, <code>mag</code>, <code>heading</code>, <code>fromAngle</code>.</li>
      <li><a href="https://editor.p5js.org/" target="_blank" rel="noopener">p5.js Web Editor</a> — ml5 veya p5.play’i HTML’e ekleyip tam örnek çalıştırmak için.</li>
    </ul>

    <h2>The Coding Train</h2>
    <ul>
      <li><a href="https://thecodingtrain.com/" target="_blank" rel="noopener">thecodingtrain.com</a> — Shiffman’ın ders sitesi; konu adıyla arayın.</li>
      <li><a href="https://thecodingtrain.com/tracks/the-nature-of-code-2" target="_blank" rel="noopener">The Nature of Code 2 parçası</a> — kitaba paralel p5.js video sırası (vektör, kuvvet, ajan, GA, ağ, nöroevrim).</li>
      <li><a href="https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/welcome/welcome-to-the-nature-of-code-in-2020-p5js/" target="_blank" rel="noopener">Welcome to The Nature of Code (p5.js)</a> — parçanın giriş videosu.</li>
      <li><a href="https://thecodingtrain.com/raycasting" target="_blank" rel="noopener">Raycasting (Challenge #145)</a> — Bölüm 11’in “bıyık ucu dairede mi?” yerine ışın kesişimi isteyenlere, kitabın verdiği adres.</li>
    </ul>

    <h2>p5.play</h2>
    <ul>
      <li><a href="https://p5play.org/" target="_blank" rel="noopener">p5play.org</a> — kütüphane ana sayfası.</li>
      <li><a href="https://p5play.org/docs/" target="_blank" rel="noopener">p5.play dokümantasyon</a> — Sprite, Group, kb, camera API.</li>
      <li><a href="https://p5play.org/learn/" target="_blank" rel="noopener">p5.play öğrenme</a> — resmi alıştırmalar.</li>
      <li><a href="https://github.com/quinton-ashley/p5play" target="_blank" rel="noopener">quinton-ashley/p5play</a> — kaynak kod.</li>
      <li><a href="https://gusanmaz.github.io/p5play-tutorial/" target="_blank" rel="noopener">p5.play Türkçe eğitim (canlı)</a> — bu kitaptaki p5.play bölümünün kapsam kaynağı (69 örnek).</li>
      <li><a href="https://github.com/gusanmaz/p5play-tutorial" target="_blank" rel="noopener">gusanmaz/p5play-tutorial</a> — o eğitimin kaynağı.</li>
    </ul>

    <h2>Fizik motorları ve oyun çerçeveleri</h2>
    <ul>
      <li><a href="https://box2d.org/" target="_blank" rel="noopener">Box2D</a> — 2B katı cisim; Angry Birds soyundan. p5.play altındaki Planck bunun JavaScript hali.</li>
      <li><a href="https://brm.io/matter-js/docs/" target="_blank" rel="noopener">Matter.js belgeler</a> — Bölüm 6 gövde, motor, kısıt.</li>
      <li><a href="https://phaser.io/" target="_blank" rel="noopener">Phaser</a> — HTML5 2D çerçeve; Arcade Physics ve Matter Physics ayrı seçilir.</li>
      <li><a href="https://docs.phaser.io/phaser/concepts/physics" target="_blank" rel="noopener">Phaser · Physics</a> — Arcade / Matter ayrımı.</li>
      <li><a href="https://docs.unity3d.com/Manual/class-Rigidbody2D.html" target="_blank" rel="noopener">Unity Rigidbody2D</a> — C#; 2B fizik Box2D soyundan.</li>
      <li><a href="https://docs.godotengine.org/en/stable/tutorials/physics/physics_introduction.html" target="_blank" rel="noopener">Godot Physics</a> — GDScript / C#; RigidBody2D, CharacterBody2D.</li>
      <li><a href="https://www.raylib.com/" target="_blank" rel="noopener">raylib</a> — C çizim kütüphanesi (editörsüz); fizik Physac / Chipmunk / Box2D ayrıdır. Unity değildir.</li>
      <li><a href="https://www.pymunk.org/en/latest/" target="_blank" rel="noopener">Pymunk</a> — Python’da Chipmunk2D; <code>space.step</code>. Örnekler: <a href="https://github.com/viblo/pymunk/tree/master/examples" target="_blank" rel="noopener">GitHub examples</a>.</li>
      <li><a href="https://github.com/pybox2d/pybox2d" target="_blank" rel="noopener">PyBox2D</a> — Python’da Box2D; metre dünyası.</li>
      <li><a href="https://api.arcade.academy/en/latest/tutorials/pymunk_platformer/index.html" target="_blank" rel="noopener">Arcade Pymunk platformer</a> — Pymunk gizlenmiş; p5.play + Planck kuzeni.</li>
      <li><a href="https://pybullet.org/" target="_blank" rel="noopener">PyBullet</a> — Python’da Bullet; 3B, robot, pekiştirmeli öğrenme.</li>
      <li><a href="https://mujoco.readthedocs.io/" target="_blank" rel="noopener">MuJoCo</a> — robotik simülasyon; <code>pip install mujoco</code>.</li>
      <li><a href="https://berinhard.github.io/pyp5js/" target="_blank" rel="noopener">pyp5js</a> — Python yaz, tarayıcıda p5.js doğar.</li>
      <li><a href="http://haptic-data.com/toxiclibsjs" target="_blank" rel="noopener">Toxiclibs.js</a> — Verlet yay; Bölüm 6’nın ikinci kütüphanesi.</li>
    </ul>

    <h2>Fizik ve makine öğrenmesi (kitabın kullandıkları)</h2>
    <ul>
      <li><a href="https://ml5js.org/" target="_blank" rel="noopener">ml5.js</a> — kitabın sinir ağı ve nöroevrim API’si.</li>
      <li><a href="https://docs.ml5js.org/" target="_blank" rel="noopener">ml5.js docs</a> — <code>neuralNetwork</code>, <code>neuroEvolution</code>.</li>
      <li><a href="https://doi.org/10.1007/3-540-58484-6_288" target="_blank" rel="noopener">Ronald ve Schoenauer, Genetic Lander (1994)</a> — ağırlıkları GA ile evrimleştiren erken örnek; DOI.</li>
      <li><a href="https://doi.org/10.1162/106365602320169811" target="_blank" rel="noopener">Stanley ve Miikkulainen, NEAT (2002)</a> — yapıyı da evrimleştiren algoritma; DOI.</li>
    </ul>

    <h2>JavaScript</h2>
    <ul>
      <li><a href="https://developer.mozilla.org/tr/docs/Web/JavaScript" target="_blank" rel="noopener">MDN JavaScript (Türkçe)</a> — <code>class</code>, dizi, <code>%</code> operatörü.</li>
      <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes" target="_blank" rel="noopener">MDN Classes</a> — <code>constructor</code>, <code>this</code> (İngilizce referans).</li>
    </ul>

    ${N.resources([
      { kind: "Kitap", title: "natureofcode.com", url: "https://natureofcode.com/", note: "ücretsiz HTML" },
      { kind: "Kod", title: "noc-book-2", url: "https://github.com/nature-of-code/noc-book-2", note: "örnek sketch’ler" },
      { kind: "Video", title: "Coding Train · NoC 2 parçası", url: "https://thecodingtrain.com/tracks/the-nature-of-code-2", note: "resmi parça sayfası; playlist kimliği uydurulmadı" },
      { kind: "Referans", title: "p5.js reference", url: "https://p5js.org/reference/" },
      { kind: "Dokümantasyon", title: "p5.play docs", url: "https://p5play.org/docs/" },
      { kind: "Tutorial", title: "p5.play Türkçe eğitim", url: "https://gusanmaz.github.io/p5play-tutorial/" },
      { kind: "Referans", title: "Phaser", url: "https://phaser.io/" },
      { kind: "Referans", title: "Matter.js", url: "https://brm.io/matter-js/docs/" },
    ])}
  `,
  editors: {},
});
