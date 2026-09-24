registerChapter({
  id: "matter",
  title: "Matter.js · oyun",
  short: "Matter.js",
  icon: "⚙️",
  html: `

    <p>Bölüm 6 Matter.js ofisini kitaptan kurar: gövde, kısıt, Toxiclibs. Bu sayfa aynı ofisi <em>oyun</em> tarifine çevirir: tıklayınca kutu, sapan, kule, sensor, uyuyan cisim, taklası kilitli karakter. Motor aynıdır; niyet değişir.</p>
    <p>p5.play Planck’ı gizler. Phaser Matter’ı sahneye gömer. Burada gizleyen yok: <code>Engine.update</code> siz, çizim p5.js siz. Unutursanız kutu donar — ofis kapalı, kalem açık.</p>
    <p class="toc-inline"><strong>Bu sayfada:</strong>
      <a href="#mt-ofis">Ofis</a> ·
      <a href="#mt-malzeme">Malzeme</a> ·
      <a href="#mt-sekil">Şekil</a> ·
      <a href="#mt-bag">Bağ</a> ·
      <a href="#mt-olay">Olay</a> ·
      <a href="#mt-oyun">Oyun</a> ·
      <a href="#mt-ileri">Işın / zaman</a>
    </p>

    <h2 id="mt-ofis">Ofis ve kalem</h2>
    <p>Her kare iki iş: dünya bir adım atar, siz cisimlerin köşelerini çizersiniz. <code>Engine.update</code> yoksa pizza fırında donar. <code>Composite.add</code> yoksa kutu ofise hiç girmez; <code>rect</code> çizseniz bile çarpışmaz.</p>
    ${N.editor("m0")}
    ${N.editor("m1")}
    ${N.tryit([{ do: "mousePressed içindeki Composite.add satırını silin.", expect: "Tıklama boştur. Çizim de yok: gövde dünyada değil." }])}
    ${N.editor("m18")}
    ${N.warn("Tuzak: Runner + Engine.update birlikte","<p>İkisini birden çalıştırırsanız zaman iki kez akar, kutular fazla hızlı düşer. Ya Runner, ya sizin update’iniz.</p>")}

    <h2 id="mt-malzeme">Sekme, sürtünme, kuvvet, kütle</h2>
    <p>Restitution sekmedir. Friction zemine sürtünce yer. <code>applyForce</code> kütleyi böler; <code>setVelocity</code> hızı ezer. Aynı kuvvet mass 8’i az kıpırdatır. Kütle ağırlık değildir: gravity.y = 0 iken de mass durur.</p>
    ${N.editor("m2")}
    ${N.editor("m3")}
    ${N.editor("m4")}
    ${N.tryit([{ do: "applyForce 0.004’ü 0.02 yapın.", expect: "D tuşu ikisini de daha sert iter; ağır hâlâ tembeldir." }])}
    ${N.editor("m17")}

    <h2 id="mt-sekil">Zemin, çokgen, birleşik gövde</h2>
    <p>Static zemin Normal kuvveti motora bırakır. Polygon kenar sayısı 3 üçgendir. <code>Body.create({ parts })</code> iki dikdörtgeni bir cisim yapar — araba şasisi, T harfi, çekiç.</p>
    ${N.editor("m5")}
    ${N.editor("m6")}
    ${N.editor("m7")}

    <h2 id="mt-bag">İp, zincir, fare, sapan</h2>
    <p>Constraint ip uzunluğunu tutar. İki <code>x</code>’i her kare eşitlemek ip değildir; motoru ezer. MouseConstraint fare teli. İki yumuşak constraint sapan lastiğidir: geri çek, bırak, restitution işini bitirir.</p>
    ${N.editor("m8")}
    ${N.editor("m9")}
    ${N.editor("m10")}
    ${N.editor("m11")}

    <h2 id="mt-olay">Temas, sensor, filtre, uyku</h2>
    <p><code>collisionStart</code> p5.play <code>collides</code>, Phaser <code>collisionstart</code>. Sensor geçer, haber verir — jeton. collisionFilter maskesi “bu iki daire birbirini görmesin, zemin görsün” der. Sleep: duran kule uyur, CPU dinlenir; itince uyanır.</p>
    ${N.editor("m12")}
    ${N.editor("m13")}
    ${N.editor("m14")}
    ${N.editor("m15")}

    <h2 id="mt-oyun">Takla kilidi ve kule</h2>
    <p>Platformer karakteri lastik gibi yuvarlanmasın diye <code>Body.setInertia(..., Infinity)</code> — p5.play <code>rotationLock</code>. Kule + MouseConstraint Angry Birds hissidir: kütle, sürtünme, restitution sayıları oyunun tadıdır.</p>
    ${N.editor("m16")}
    ${N.editor("m19")}
    ${N.quiz("Kutu çiziliyor ama düşmüyor. İlk bakacağınız?",["fill rengi","Composite.add unutulmuş olabilir","p5.js circle yarıçapı"],1,"Ofise girmeyen gövde fizikte yoktur.")}

    <h2 id="mt-ileri">Işın, yığın, zaman, çokgen, tüneme</h2>
    <p>Ayak altı “yerde miyim?” sorusu her zaman çarpışma olayı değildir. Kısa bir dikme çizersiniz, ofise “bu doğru kimi kesiyor?” diye sorarsınız. Matter.js bunu <code>Query.ray</code> ile verir. Unity <code>Physics2D.Raycast</code>, Box2D raycast, Godot <code>intersect_ray</code> — Newcastle notlarındaki ışın aynı fikirdir. Analogda sarı çizgi duvarı görünce durur.</p>
    <p><code>Composites.stack</code> kuleyi döngüyle yazmaz; ofis yığın doğurur. <code>engine.timing.timeScale</code> zamanı yavaşlatır: 0.3 ağır çekim, 1 normal. <code>Bodies.fromVertices</code> dikdörtgen olmayan kabuktur. İnce mermi bir karede ince duvarı atlayabilir (CCD / tüneme); kalın duvar veya daha küçük adım ister.</p>
    ${N.editor("m20")}
    ${N.editor("m21")}
    ${N.editor("m22")}
    ${N.editor("m23")}
    ${N.editor("m24")}

    <p>Kitabın Matter anlatımı (Render, Toxiclibs, orijinal örnekler): <a href="#/ch6">Bölüm 6</a>. Phaser içindeki Matter: <a href="#/phaser">Phaser</a>. Sprite API: <a href="#/p5play">p5.play</a>.</p>
    ${N.resources([
      { kind: "Referans", title: "Matter.js docs", url: "https://brm.io/matter-js/docs/" },
      { kind: "Örnek", title: "Matter.js demos", url: "https://brm.io/matter-js/" },
      { kind: "Video", title: "Coding Train · Matter.js", url: "https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/6-physics-libraries/1-matterjs-introduction" },
      { kind: "Kitap", title: "Bölüm 6", url: "#/ch6" },
      { kind: "Kitap", title: "Phaser Matter", url: "#/phaser" },
    ])}

  `,
  editors: {
    m0: {
      title: "Ofis ve kalem: Engine.update her kare",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body, Constraint, Mouse, MouseConstraint, Events } = Matter;
let engine;
function zemin(ek = []) {
  Composite.add(engine.world, [
    Bodies.rectangle(200, 230, 400, 20, { isStatic: true }),
    ...ek,
  ]);
}
function cizGovde() {
  background(255);
  for (const b of engine.world.bodies) {
    noStroke();
    fill(b.isStatic ? 40 : 61, b.isStatic ? 40 : 126, b.isStatic ? 40 : 166, b.isSensor ? 80 : 255);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  stroke(180, 140, 40);
  strokeWeight(2);
  for (const c of engine.world.constraints) {
    if (!c.bodyA || !c.bodyB) continue;
    const a = c.bodyA.position, b = c.bodyB.position;
    line(a.x, a.y, b.x, b.y);
  }
  noStroke();
}

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  zemin();
  Composite.add(engine.world, Bodies.circle(200, 40, 18, { restitution: 0.6 }));
}
function draw() {
  Engine.update(engine);
  cizGovde();
  fill(0);
  textSize(12);
  text("Matter ofis adim atar, p5.js cizer", 10, 18);
}\n`,
        }
      ],
    },
    m1: {
      title: "tikla: kutu dogur",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body, Constraint, Mouse, MouseConstraint, Events } = Matter;
let engine;
function zemin(ek = []) {
  Composite.add(engine.world, [
    Bodies.rectangle(200, 230, 400, 20, { isStatic: true }),
    ...ek,
  ]);
}
function cizGovde() {
  background(255);
  for (const b of engine.world.bodies) {
    noStroke();
    fill(b.isStatic ? 40 : 61, b.isStatic ? 40 : 126, b.isStatic ? 40 : 166, b.isSensor ? 80 : 255);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  stroke(180, 140, 40);
  strokeWeight(2);
  for (const c of engine.world.constraints) {
    if (!c.bodyA || !c.bodyB) continue;
    const a = c.bodyA.position, b = c.bodyB.position;
    line(a.x, a.y, b.x, b.y);
  }
  noStroke();
}

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  zemin();
}
function draw() {
  Engine.update(engine);
  cizGovde();
  fill(0);
  textSize(12);
  text("tikla: kutu  ·  Composite.add unutulursa dusmez", 10, 18);
}
function mousePressed() {
  Composite.add(engine.world, Bodies.rectangle(mouseX, mouseY, 28, 28, { restitution: 0.25 }));
}\n`,
        }
      ],
    },
    m2: {
      title: "restitution: dort top",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body, Constraint, Mouse, MouseConstraint, Events } = Matter;
let engine;
function zemin(ek = []) {
  Composite.add(engine.world, [
    Bodies.rectangle(200, 230, 400, 20, { isStatic: true }),
    ...ek,
  ]);
}
function cizGovde() {
  background(255);
  for (const b of engine.world.bodies) {
    noStroke();
    fill(b.isStatic ? 40 : 61, b.isStatic ? 40 : 126, b.isStatic ? 40 : 166, b.isSensor ? 80 : 255);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  stroke(180, 140, 40);
  strokeWeight(2);
  for (const c of engine.world.constraints) {
    if (!c.bodyA || !c.bodyB) continue;
    const a = c.bodyA.position, b = c.bodyB.position;
    line(a.x, a.y, b.x, b.y);
  }
  noStroke();
}

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  zemin();
  [0, 0.3, 0.6, 0.95].forEach((r, i) => {
    Composite.add(engine.world, Bodies.circle(55 + i * 90, 30, 16, { restitution: r, friction: 0.01 }));
  });
}
function draw() {
  Engine.update(engine);
  cizGovde();
  fill(0);
  textSize(12);
  text("restitution 0  0.3  0.6  0.95", 10, 18);
}\n`,
        }
      ],
    },
    m3: {
      title: "friction: buz ve lastik zemin",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body, Constraint, Mouse, MouseConstraint, Events } = Matter;
let engine;
function zemin(ek = []) {
  Composite.add(engine.world, [
    Bodies.rectangle(200, 230, 400, 20, { isStatic: true }),
    ...ek,
  ]);
}
function cizGovde() {
  background(255);
  for (const b of engine.world.bodies) {
    noStroke();
    fill(b.isStatic ? 40 : 61, b.isStatic ? 40 : 126, b.isStatic ? 40 : 166, b.isSensor ? 80 : 255);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  stroke(180, 140, 40);
  strokeWeight(2);
  for (const c of engine.world.constraints) {
    if (!c.bodyA || !c.bodyB) continue;
    const a = c.bodyA.position, b = c.bodyB.position;
    line(a.x, a.y, b.x, b.y);
  }
  noStroke();
}

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  Composite.add(engine.world, [
    Bodies.rectangle(100, 230, 200, 20, { isStatic: true, friction: 0.001 }),
    Bodies.rectangle(300, 230, 200, 20, { isStatic: true, friction: 1 }),
    Bodies.circle(50, 180, 16, { friction: 0.001, restitution: 0.05 }),
    Bodies.circle(250, 180, 16, { friction: 1, restitution: 0.05 }),
  ]);
  Body.setVelocity(engine.world.bodies[2], { x: 6, y: 0 });
  Body.setVelocity(engine.world.bodies[3], { x: 6, y: 0 });
}
function draw() {
  Engine.update(engine);
  cizGovde();
  fill(0);
  textSize(12);
  text("sol buz  ·  sag lastik  ·  ayni ilk hiz", 10, 18);
}\n`,
        }
      ],
    },
    m4: {
      title: "setVelocity vs applyForce",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body, Constraint, Mouse, MouseConstraint, Events } = Matter;
let engine;
function zemin(ek = []) {
  Composite.add(engine.world, [
    Bodies.rectangle(200, 230, 400, 20, { isStatic: true }),
    ...ek,
  ]);
}
function cizGovde() {
  background(255);
  for (const b of engine.world.bodies) {
    noStroke();
    fill(b.isStatic ? 40 : 61, b.isStatic ? 40 : 126, b.isStatic ? 40 : 166, b.isSensor ? 80 : 255);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  stroke(180, 140, 40);
  strokeWeight(2);
  for (const c of engine.world.constraints) {
    if (!c.bodyA || !c.bodyB) continue;
    const a = c.bodyA.position, b = c.bodyB.position;
    line(a.x, a.y, b.x, b.y);
  }
  noStroke();
}

let hafif, agir;
function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  engine.gravity.y = 0;
  zemin();
  hafif = Bodies.circle(80, 80, 16, { mass: 1, frictionAir: 0.02 });
  agir = Bodies.circle(80, 160, 16, { mass: 8, frictionAir: 0.02 });
  Composite.add(engine.world, [hafif, agir]);
}
function draw() {
  Engine.update(engine);
  cizGovde();
  fill(0);
  textSize(12);
  text("D: applyForce  ·  V: setVelocity  ·  mass 1 vs 8", 10, 18);
}
function keyPressed() {
  if (key === "d" || key === "D") {
    Body.applyForce(hafif, hafif.position, { x: 0.004, y: 0 });
    Body.applyForce(agir, agir.position, { x: 0.004, y: 0 });
  }
  if (key === "v" || key === "V") {
    Body.setVelocity(hafif, { x: 4, y: 0 });
    Body.setVelocity(agir, { x: 4, y: 0 });
  }
}\n`,
        }
      ],
    },
    m5: {
      title: "isStatic zemin / dusen kutu",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body, Constraint, Mouse, MouseConstraint, Events } = Matter;
let engine;
function zemin(ek = []) {
  Composite.add(engine.world, [
    Bodies.rectangle(200, 230, 400, 20, { isStatic: true }),
    ...ek,
  ]);
}
function cizGovde() {
  background(255);
  for (const b of engine.world.bodies) {
    noStroke();
    fill(b.isStatic ? 40 : 61, b.isStatic ? 40 : 126, b.isStatic ? 40 : 166, b.isSensor ? 80 : 255);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  stroke(180, 140, 40);
  strokeWeight(2);
  for (const c of engine.world.constraints) {
    if (!c.bodyA || !c.bodyB) continue;
    const a = c.bodyA.position, b = c.bodyB.position;
    line(a.x, a.y, b.x, b.y);
  }
  noStroke();
}

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  zemin([
    Bodies.rectangle(280, 160, 120, 16, { isStatic: true, angle: 0.2 }),
    Bodies.rectangle(120, 40, 36, 36, { restitution: 0.2 }),
  ]);
}
function draw() {
  Engine.update(engine);
  cizGovde();
  fill(0);
  textSize(12);
  text("egik static platform  ·  kutu kayar", 10, 18);
}\n`,
        }
      ],
    },
    m6: {
      title: "polygon: ucgen",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body, Constraint, Mouse, MouseConstraint, Events } = Matter;
let engine;
function zemin(ek = []) {
  Composite.add(engine.world, [
    Bodies.rectangle(200, 230, 400, 20, { isStatic: true }),
    ...ek,
  ]);
}
function cizGovde() {
  background(255);
  for (const b of engine.world.bodies) {
    noStroke();
    fill(b.isStatic ? 40 : 61, b.isStatic ? 40 : 126, b.isStatic ? 40 : 166, b.isSensor ? 80 : 255);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  stroke(180, 140, 40);
  strokeWeight(2);
  for (const c of engine.world.constraints) {
    if (!c.bodyA || !c.bodyB) continue;
    const a = c.bodyA.position, b = c.bodyB.position;
    line(a.x, a.y, b.x, b.y);
  }
  noStroke();
}

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  zemin();
  Composite.add(engine.world, Bodies.polygon(200, 40, 3, 28, { restitution: 0.3 }));
  Composite.add(engine.world, Bodies.polygon(280, 20, 6, 20, { restitution: 0.3 }));
}
function draw() {
  Engine.update(engine);
  cizGovde();
  fill(0);
  textSize(12);
  text("polygon kenar sayisi 3 ve 6", 10, 18);
}\n`,
        }
      ],
    },
    m7: {
      title: "compound: iki dikdortgen bir govde",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body, Constraint, Mouse, MouseConstraint, Events } = Matter;
let engine;
function zemin(ek = []) {
  Composite.add(engine.world, [
    Bodies.rectangle(200, 230, 400, 20, { isStatic: true }),
    ...ek,
  ]);
}
function cizGovde() {
  background(255);
  for (const b of engine.world.bodies) {
    noStroke();
    fill(b.isStatic ? 40 : 61, b.isStatic ? 40 : 126, b.isStatic ? 40 : 166, b.isSensor ? 80 : 255);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  stroke(180, 140, 40);
  strokeWeight(2);
  for (const c of engine.world.constraints) {
    if (!c.bodyA || !c.bodyB) continue;
    const a = c.bodyA.position, b = c.bodyB.position;
    line(a.x, a.y, b.x, b.y);
  }
  noStroke();
}

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  zemin();
  const a = Bodies.rectangle(200, 60, 70, 18);
  const b = Bodies.rectangle(200, 60, 18, 70);
  const birlesik = Body.create({ parts: [a, b], restitution: 0.2 });
  Composite.add(engine.world, birlesik);
}
function draw() {
  Engine.update(engine);
  cizGovde();
  fill(0);
  textSize(12);
  text("Body.create({ parts })  —  artı kutu", 10, 18);
}\n`,
        }
      ],
    },
    m8: {
      title: "constraint sarkac",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body, Constraint, Mouse, MouseConstraint, Events } = Matter;
let engine;
function zemin(ek = []) {
  Composite.add(engine.world, [
    Bodies.rectangle(200, 230, 400, 20, { isStatic: true }),
    ...ek,
  ]);
}
function cizGovde() {
  background(255);
  for (const b of engine.world.bodies) {
    noStroke();
    fill(b.isStatic ? 40 : 61, b.isStatic ? 40 : 126, b.isStatic ? 40 : 166, b.isSensor ? 80 : 255);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  stroke(180, 140, 40);
  strokeWeight(2);
  for (const c of engine.world.constraints) {
    if (!c.bodyA || !c.bodyB) continue;
    const a = c.bodyA.position, b = c.bodyB.position;
    line(a.x, a.y, b.x, b.y);
  }
  noStroke();
}

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  zemin();
  const c = Bodies.rectangle(200, 20, 16, 16, { isStatic: true });
  const t = Bodies.circle(270, 120, 16, { restitution: 0.2 });
  Composite.add(engine.world, [c, t, Constraint.create({ bodyA: c, bodyB: t, length: 110, stiffness: 0.9 })]);
}
function draw() {
  Engine.update(engine);
  cizGovde();
  fill(0);
  textSize(12);
  text("tikla: yatay itis", 10, 18);
}
function mousePressed() {
  const t = engine.world.bodies.find((b) => !b.isStatic);
  if (t) Body.setVelocity(t, { x: (t.position.x - mouseX) * 0.05, y: 0 });
}\n`,
        }
      ],
    },
    m9: {
      title: "zincir / kopru",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body, Constraint, Mouse, MouseConstraint, Events } = Matter;
let engine;
function zemin(ek = []) {
  Composite.add(engine.world, [
    Bodies.rectangle(200, 230, 400, 20, { isStatic: true }),
    ...ek,
  ]);
}
function cizGovde() {
  background(255);
  for (const b of engine.world.bodies) {
    noStroke();
    fill(b.isStatic ? 40 : 61, b.isStatic ? 40 : 126, b.isStatic ? 40 : 166, b.isSensor ? 80 : 255);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  stroke(180, 140, 40);
  strokeWeight(2);
  for (const c of engine.world.constraints) {
    if (!c.bodyA || !c.bodyB) continue;
    const a = c.bodyA.position, b = c.bodyB.position;
    line(a.x, a.y, b.x, b.y);
  }
  noStroke();
}

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  zemin();
  let prev = Bodies.rectangle(80, 40, 12, 12, { isStatic: true });
  Composite.add(engine.world, prev);
  for (let i = 0; i < 10; i++) {
    const n = Bodies.circle(100 + i * 18, 40, 8);
    Composite.add(engine.world, [n, Constraint.create({ bodyA: prev, bodyB: n, length: 16, stiffness: 0.85 })]);
    prev = n;
  }
  const son = Bodies.rectangle(320, 40, 12, 12, { isStatic: true });
  Composite.add(engine.world, [son, Constraint.create({ bodyA: prev, bodyB: son, length: 16, stiffness: 0.85 })]);
}
function draw() {
  Engine.update(engine);
  cizGovde();
  fill(0);
  textSize(12);
  text("kopru  ·  ustune kutu birakmak icin tikla", 10, 18);
}
function mousePressed() {
  Composite.add(engine.world, Bodies.rectangle(mouseX, 10, 24, 24, { restitution: 0.1 }));
}\n`,
        }
      ],
    },
    m10: {
      title: "MouseConstraint: surukle",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body, Constraint, Mouse, MouseConstraint, Events } = Matter;
let engine;
function zemin(ek = []) {
  Composite.add(engine.world, [
    Bodies.rectangle(200, 230, 400, 20, { isStatic: true }),
    ...ek,
  ]);
}
function cizGovde() {
  background(255);
  for (const b of engine.world.bodies) {
    noStroke();
    fill(b.isStatic ? 40 : 61, b.isStatic ? 40 : 126, b.isStatic ? 40 : 166, b.isSensor ? 80 : 255);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  stroke(180, 140, 40);
  strokeWeight(2);
  for (const c of engine.world.constraints) {
    if (!c.bodyA || !c.bodyB) continue;
    const a = c.bodyA.position, b = c.bodyB.position;
    line(a.x, a.y, b.x, b.y);
  }
  noStroke();
}

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  zemin();
  for (let i = 0; i < 6; i++) {
    Composite.add(engine.world, Bodies.rectangle(90 + i * 36, 40, 28, 28, { restitution: 0.15 }));
  }
  const mouse = Mouse.create(document.querySelector("canvas"));
  Composite.add(engine.world, MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2 } }));
}
function draw() {
  Engine.update(engine);
  cizGovde();
  fill(0);
  textSize(12);
  text("kutuyu fareyle tut", 10, 18);
}\n`,
        }
      ],
    },
    m11: {
      title: "sapan",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body, Constraint, Mouse, MouseConstraint, Events } = Matter;
let engine;
function zemin(ek = []) {
  Composite.add(engine.world, [
    Bodies.rectangle(200, 230, 400, 20, { isStatic: true }),
    ...ek,
  ]);
}
function cizGovde() {
  background(255);
  for (const b of engine.world.bodies) {
    noStroke();
    fill(b.isStatic ? 40 : 61, b.isStatic ? 40 : 126, b.isStatic ? 40 : 166, b.isSensor ? 80 : 255);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  stroke(180, 140, 40);
  strokeWeight(2);
  for (const c of engine.world.constraints) {
    if (!c.bodyA || !c.bodyB) continue;
    const a = c.bodyA.position, b = c.bodyB.position;
    line(a.x, a.y, b.x, b.y);
  }
  noStroke();
}

let top;
function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  zemin();
  const a = Bodies.circle(70, 140, 6, { isStatic: true });
  const b = Bodies.circle(110, 140, 6, { isStatic: true });
  top = Bodies.circle(90, 140, 12, { restitution: 0.5 });
  Composite.add(engine.world, [
    a, b, top,
    Constraint.create({ bodyA: a, bodyB: top, length: 26, stiffness: 0.05 }),
    Constraint.create({ bodyA: b, bodyB: top, length: 26, stiffness: 0.05 }),
  ]);
  const mouse = Mouse.create(document.querySelector("canvas"));
  Composite.add(engine.world, MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.4 } }));
}
function draw() {
  Engine.update(engine);
  cizGovde();
  fill(0);
  textSize(12);
  text("topu geri cek, birak", 10, 18);
}\n`,
        }
      ],
    },
    m12: {
      title: "collisionStart: hedefi sil",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body, Constraint, Mouse, MouseConstraint, Events } = Matter;
let engine;
function zemin(ek = []) {
  Composite.add(engine.world, [
    Bodies.rectangle(200, 230, 400, 20, { isStatic: true }),
    ...ek,
  ]);
}
function cizGovde() {
  background(255);
  for (const b of engine.world.bodies) {
    noStroke();
    fill(b.isStatic ? 40 : 61, b.isStatic ? 40 : 126, b.isStatic ? 40 : 166, b.isSensor ? 80 : 255);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  stroke(180, 140, 40);
  strokeWeight(2);
  for (const c of engine.world.constraints) {
    if (!c.bodyA || !c.bodyB) continue;
    const a = c.bodyA.position, b = c.bodyB.position;
    line(a.x, a.y, b.x, b.y);
  }
  noStroke();
}

let mermi, hedef, mesaj = "mermi saga gitsin";
function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  zemin();
  mermi = Bodies.circle(40, 160, 10);
  hedef = Bodies.rectangle(300, 180, 40, 50, { isStatic: true });
  mermi.label = "mermi";
  hedef.label = "hedef";
  Composite.add(engine.world, [mermi, hedef]);
  Body.setVelocity(mermi, { x: 7, y: 0 });
  Events.on(engine, "collisionStart", (ev) => {
    ev.pairs.forEach((p) => {
      const L = [p.bodyA.label, p.bodyB.label];
      if (L.includes("mermi") && L.includes("hedef")) {
        Composite.remove(engine.world, hedef);
        mesaj = "hedef silindi";
      }
    });
  });
}
function draw() {
  Engine.update(engine);
  cizGovde();
  fill(0);
  textSize(12);
  text(mesaj, 10, 18);
}\n`,
        }
      ],
    },
    m13: {
      title: "isSensor: gecer, haber verir",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body, Constraint, Mouse, MouseConstraint, Events } = Matter;
let engine;
function zemin(ek = []) {
  Composite.add(engine.world, [
    Bodies.rectangle(200, 230, 400, 20, { isStatic: true }),
    ...ek,
  ]);
}
function cizGovde() {
  background(255);
  for (const b of engine.world.bodies) {
    noStroke();
    fill(b.isStatic ? 40 : 61, b.isStatic ? 40 : 126, b.isStatic ? 40 : 166, b.isSensor ? 80 : 255);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  stroke(180, 140, 40);
  strokeWeight(2);
  for (const c of engine.world.constraints) {
    if (!c.bodyA || !c.bodyB) continue;
    const a = c.bodyA.position, b = c.bodyB.position;
    line(a.x, a.y, b.x, b.y);
  }
  noStroke();
}

let icerde = false;
function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  zemin();
  const bolge = Bodies.rectangle(260, 160, 90, 70, { isStatic: true, isSensor: true });
  const top = Bodies.circle(50, 160, 16);
  Composite.add(engine.world, [bolge, top]);
  Body.setVelocity(top, { x: 3.5, y: 0 });
  Events.on(engine, "collisionActive", (ev) => {
    icerde = ev.pairs.some((p) => p.bodyA === bolge || p.bodyB === bolge);
  });
}
function draw() {
  Engine.update(engine);
  cizGovde();
  fill(0);
  textSize(12);
  text(icerde ? "sensor icinde" : "sensor disinda  —  itilmez", 10, 18);
}\n`,
        }
      ],
    },
    m14: {
      title: "collisionFilter: ayni grup carpismaz",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body, Constraint, Mouse, MouseConstraint, Events } = Matter;
let engine;
function zemin(ek = []) {
  Composite.add(engine.world, [
    Bodies.rectangle(200, 230, 400, 20, { isStatic: true }),
    ...ek,
  ]);
}
function cizGovde() {
  background(255);
  for (const b of engine.world.bodies) {
    noStroke();
    fill(b.isStatic ? 40 : 61, b.isStatic ? 40 : 126, b.isStatic ? 40 : 166, b.isSensor ? 80 : 255);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  stroke(180, 140, 40);
  strokeWeight(2);
  for (const c of engine.world.constraints) {
    if (!c.bodyA || !c.bodyB) continue;
    const a = c.bodyA.position, b = c.bodyB.position;
    line(a.x, a.y, b.x, b.y);
  }
  noStroke();
}

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  zemin();
  const catA = 0x0002, catB = 0x0004;
  const a1 = Bodies.circle(80, 40, 16, { collisionFilter: { category: catA, mask: 0x0001 } });
  const a2 = Bodies.circle(100, 10, 16, { collisionFilter: { category: catA, mask: 0x0001 } });
  const b1 = Bodies.rectangle(240, 40, 30, 30, { collisionFilter: { category: catB, mask: 0x0001 } });
  Composite.add(engine.world, [a1, a2, b1]);
}
function draw() {
  Engine.update(engine);
  cizGovde();
  fill(0);
  textSize(12);
  text("iki daire birbirini gormez; zemin 0x0001 herkesi tutar", 10, 18);
}\n`,
        }
      ],
    },
    m15: {
      title: "sleepThreshold: duran cisim uyur",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body, Constraint, Mouse, MouseConstraint, Events } = Matter;
let engine;
function zemin(ek = []) {
  Composite.add(engine.world, [
    Bodies.rectangle(200, 230, 400, 20, { isStatic: true }),
    ...ek,
  ]);
}
function cizGovde() {
  background(255);
  for (const b of engine.world.bodies) {
    noStroke();
    fill(b.isStatic ? 40 : 61, b.isStatic ? 40 : 126, b.isStatic ? 40 : 166, b.isSensor ? 80 : 255);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  stroke(180, 140, 40);
  strokeWeight(2);
  for (const c of engine.world.constraints) {
    if (!c.bodyA || !c.bodyB) continue;
    const a = c.bodyA.position, b = c.bodyB.position;
    line(a.x, a.y, b.x, b.y);
  }
  noStroke();
}

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  zemin();
  Composite.add(engine.world, Bodies.rectangle(200, 40, 40, 40, { restitution: 0.2, sleepThreshold: 20 }));
}
function draw() {
  Engine.update(engine);
  cizGovde();
  const b = engine.world.bodies.find((x) => !x.isStatic);
  fill(0);
  textSize(12);
  text("isSleeping " + (b && b.isSleeping) + "  ·  tikla uyandir", 10, 18);
}
function mousePressed() {
  const b = engine.world.bodies.find((x) => !x.isStatic);
  if (b) Body.setVelocity(b, { x: 3, y: -4 });
}\n`,
        }
      ],
    },
    m16: {
      title: "setInertia Infinity: takla yok",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body, Constraint, Mouse, MouseConstraint, Events } = Matter;
let engine;
function zemin(ek = []) {
  Composite.add(engine.world, [
    Bodies.rectangle(200, 230, 400, 20, { isStatic: true }),
    ...ek,
  ]);
}
function cizGovde() {
  background(255);
  for (const b of engine.world.bodies) {
    noStroke();
    fill(b.isStatic ? 40 : 61, b.isStatic ? 40 : 126, b.isStatic ? 40 : 166, b.isSensor ? 80 : 255);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  stroke(180, 140, 40);
  strokeWeight(2);
  for (const c of engine.world.constraints) {
    if (!c.bodyA || !c.bodyB) continue;
    const a = c.bodyA.position, b = c.bodyB.position;
    line(a.x, a.y, b.x, b.y);
  }
  noStroke();
}

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  zemin();
  const kilit = Bodies.rectangle(120, 40, 28, 44, { restitution: 0.1 });
  Body.setInertia(kilit, Infinity);
  Body.setVelocity(kilit, { x: 2.2, y: 0 });
  const serbest = Bodies.rectangle(260, 40, 28, 44, { restitution: 0.1 });
  Body.setVelocity(serbest, { x: 2.2, y: 0 });
  Composite.add(engine.world, [kilit, serbest]);
}
function draw() {
  Engine.update(engine);
  cizGovde();
  fill(0);
  textSize(12);
  text("sol inertia Infinity (rotationLock)  ·  sag serbest", 10, 18);
}\n`,
        }
      ],
    },
    m17: {
      title: "yercekimi vektoru: ruzgar",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body, Constraint, Mouse, MouseConstraint, Events } = Matter;
let engine;
function zemin(ek = []) {
  Composite.add(engine.world, [
    Bodies.rectangle(200, 230, 400, 20, { isStatic: true }),
    ...ek,
  ]);
}
function cizGovde() {
  background(255);
  for (const b of engine.world.bodies) {
    noStroke();
    fill(b.isStatic ? 40 : 61, b.isStatic ? 40 : 126, b.isStatic ? 40 : 166, b.isSensor ? 80 : 255);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  stroke(180, 140, 40);
  strokeWeight(2);
  for (const c of engine.world.constraints) {
    if (!c.bodyA || !c.bodyB) continue;
    const a = c.bodyA.position, b = c.bodyB.position;
    line(a.x, a.y, b.x, b.y);
  }
  noStroke();
}

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  zemin();
  for (let i = 0; i < 5; i++) {
    Composite.add(engine.world, Bodies.circle(60 + i * 60, 30, 12, { restitution: 0.4 }));
  }
}
function draw() {
  engine.gravity.x = map(mouseX, 0, width, -0.6, 0.6);
  Engine.update(engine);
  cizGovde();
  fill(0);
  textSize(12);
  text("fare x: gravity.x = " + nf(engine.gravity.x, 1, 2), 10, 18);
}\n`,
        }
      ],
    },
    m18: {
      title: "Runner yok: siz update etmezseniz donar",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body, Constraint, Mouse, MouseConstraint, Events } = Matter;
let engine;
function zemin(ek = []) {
  Composite.add(engine.world, [
    Bodies.rectangle(200, 230, 400, 20, { isStatic: true }),
    ...ek,
  ]);
}
function cizGovde() {
  background(255);
  for (const b of engine.world.bodies) {
    noStroke();
    fill(b.isStatic ? 40 : 61, b.isStatic ? 40 : 126, b.isStatic ? 40 : 166, b.isSensor ? 80 : 255);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  stroke(180, 140, 40);
  strokeWeight(2);
  for (const c of engine.world.constraints) {
    if (!c.bodyA || !c.bodyB) continue;
    const a = c.bodyA.position, b = c.bodyB.position;
    line(a.x, a.y, b.x, b.y);
  }
  noStroke();
}

let otonom = true;
function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  zemin();
  Composite.add(engine.world, Bodies.circle(200, 40, 16, { restitution: 0.5 }));
}
function draw() {
  if (otonom) Engine.update(engine);
  cizGovde();
  fill(0);
  textSize(12);
  text((otonom ? "zaman akiyor" : "DONDU — bosluk") + "  ·  Space durdur/baslat", 10, 18);
}
function keyPressed() {
  if (key === " ") otonom = !otonom;
}\n`,
        }
      ],
    },
    m19: {
      title: "kule: tikla yik",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body, Constraint, Mouse, MouseConstraint, Events } = Matter;
let engine;
function zemin(ek = []) {
  Composite.add(engine.world, [
    Bodies.rectangle(200, 230, 400, 20, { isStatic: true }),
    ...ek,
  ]);
}
function cizGovde() {
  background(255);
  for (const b of engine.world.bodies) {
    noStroke();
    fill(b.isStatic ? 40 : 61, b.isStatic ? 40 : 126, b.isStatic ? 40 : 166, b.isSensor ? 80 : 255);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  stroke(180, 140, 40);
  strokeWeight(2);
  for (const c of engine.world.constraints) {
    if (!c.bodyA || !c.bodyB) continue;
    const a = c.bodyA.position, b = c.bodyB.position;
    line(a.x, a.y, b.x, b.y);
  }
  noStroke();
}

function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  zemin();
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 4; x++) {
      Composite.add(engine.world, Bodies.rectangle(160 + x * 22, 200 - y * 22, 20, 20, { restitution: 0.05, friction: 0.8 }));
    }
  }
  const mouse = Mouse.create(document.querySelector("canvas"));
  Composite.add(engine.world, MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2 } }));
}
function draw() {
  Engine.update(engine);
  cizGovde();
  fill(0);
  textSize(12);
  text("kuleyi cek  ·  Angry Birds hissi", 10, 18);
}\n`,
        }
      ],
    },

    m20: {
      title: "Query.ray: ayak alti isin",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Query, Body } = Matter;
let engine, top;
function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  Composite.add(engine.world, [
    Bodies.rectangle(200, 230, 400, 20, { isStatic: true }),
    Bodies.rectangle(280, 180, 80, 14, { isStatic: true }),
  ]);
  top = Bodies.circle(80, 160, 16, { restitution: 0.1 });
  Composite.add(engine.world, top);
}
function draw() {
  Engine.update(engine);
  background(255);
  for (const b of engine.world.bodies) {
    noStroke();
    fill(b.isStatic ? 40 : 61, b.isStatic ? 40 : 126, b.isStatic ? 40 : 166);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  if (keyIsDown(65)) Body.setVelocity(top, { x: -2, y: top.velocity.y });
  if (keyIsDown(68)) Body.setVelocity(top, { x: 2, y: top.velocity.y });
  const a = { x: top.position.x, y: top.position.y + 16 };
  const b = { x: a.x, y: a.y + 28 };
  const hits = Query.ray(engine.world.bodies.filter((g) => g !== top), a, b);
  stroke(hits.length ? "#c9a227" : "#888");
  strokeWeight(3);
  line(a.x, a.y, b.x, b.y);
  fill(0);
  noStroke();
  textSize(12);
  text("A/D  ·  sari isin yere degiyor mu: " + (hits.length > 0), 10, 18);
}
`
        }
      ],
    },
    m21: {
      title: "Composites.stack: kule dogur",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Composites, Mouse, MouseConstraint } = Matter;
let engine;
function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  Composite.add(engine.world, Bodies.rectangle(200, 230, 400, 20, { isStatic: true }));
  const kule = Composites.stack(150, 40, 5, 6, 2, 2, function (x, y) {
    return Bodies.rectangle(x, y, 20, 20, { restitution: 0.05, friction: 0.8 });
  });
  Composite.add(engine.world, kule);
  const mouse = Mouse.create(document.querySelector("canvas"));
  Composite.add(engine.world, MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2 } }));
}
function draw() {
  Engine.update(engine);
  background(255);
  for (const b of engine.world.bodies) {
    noStroke();
    fill(b.isStatic ? 40 : 61, b.isStatic ? 40 : 126, b.isStatic ? 40 : 166);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  fill(0);
  textSize(12);
  text("stack 5x6  ·  fare ile yik", 10, 18);
}
`,
        }
      ],
    },
    m22: {
      title: "timeScale: agir cekim",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite } = Matter;
let engine;
function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  Composite.add(engine.world, [
    Bodies.rectangle(200, 230, 400, 20, { isStatic: true }),
    Bodies.circle(200, 40, 18, { restitution: 0.85 }),
  ]);
  engine.timing.timeScale = 0.35;
}
function draw() {
  Engine.update(engine);
  background(255);
  for (const b of engine.world.bodies) {
    noStroke();
    fill(b.isStatic ? 40 : 61, b.isStatic ? 40 : 126, b.isStatic ? 40 : 166);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  if (keyIsDown(81)) engine.timing.timeScale = 0.2;
  if (keyIsDown(69)) engine.timing.timeScale = 1;
  fill(0);
  textSize(12);
  text("Q yavas  E normal  ·  timeScale " + engine.timing.timeScale, 10, 18);
}
`,
        }
      ],
    },
    m23: {
      title: "fromVertices: ok cismi",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite } = Matter;
let engine;
function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  Composite.add(engine.world, Bodies.rectangle(200, 230, 400, 20, { isStatic: true }));
  const ok = Bodies.fromVertices(200, 40, [
    { x: 0, y: 24 }, { x: 28, y: 0 }, { x: 56, y: 24 },
    { x: 40, y: 24 }, { x: 40, y: 52 }, { x: 16, y: 52 }, { x: 16, y: 24 }
  ], { restitution: 0.3 });
  Composite.add(engine.world, ok);
}
function draw() {
  Engine.update(engine);
  background(255);
  for (const b of engine.world.bodies) {
    noStroke();
    fill(b.isStatic ? 40 : 61, b.isStatic ? 40 : 126, b.isStatic ? 40 : 166);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  fill(0);
  textSize(12);
  text("fromVertices  ·  dikdortgen olmayan kabuk", 10, 18);
}
`,
        }
      ],
    },
    m24: {
      title: "Ince mermi ince duvari tuneyebilir",
      libraries: ["matter"],
      files: [
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body } = Matter;
let engine, ince, kalin;
function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  ince = Bodies.rectangle(180, 120, 6, 100, { isStatic: true });
  kalin = Bodies.rectangle(300, 120, 28, 100, { isStatic: true });
  Composite.add(engine.world, [ince, kalin]);
}
function draw() {
  Engine.update(engine, 1000 / 60);
  background(255);
  for (const b of engine.world.bodies) {
    noStroke();
    fill(b.isStatic ? 80 : 196, b.isStatic ? 80 : 92, b.isStatic ? 80 : 120);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  fill(0);
  textSize(12);
  text("Space: hizli ince mermi  ·  bazen soldaki cubugu gorme", 10, 18);
}
function keyPressed() {
  if (key !== " ") return;
  const m = Bodies.circle(20, 120, 4, { restitution: 0, friction: 0 });
  Composite.add(engine.world, m);
  Body.setVelocity(m, { x: 28, y: 0 });
}
`,
        }
      ],
    },

  },
});
