registerChapter({
  id: "motorlar",
  title: "Godot, raylib, Python fizik",
  short: "Diğer motorlar",
  icon: "🌐",
  html: `

    <p>Yeni belgede world, body, collider, static/dynamic, joint, step arayın. İsim değişir. Yanlış yazınca bozulan şey değişmez: gövde ofise girmezse düşmez, hızı her kare ezerseniz çarpışma yalan söyler, metre ile pikseli karıştırırsanız kutu milimetre gibi titrer.</p>
    <p>Soldaki GDScript, Python ve C sekmeleri boyanır; tarayıcı Godot, Pymunk veya raylib açmaz. Analog, motorun yerini tutmaz.</p>
    ${N.warn("Tuzak: analog CharacterBody değildir","<p>p5.play <code>colliding(zemin)</code> rampada kaymaz, <code>move_and_slide</code> gibi yüzey normali biriktirmez. Godot’u açınca aynı cümleyi orada yazarsınız; bu tuval sözlüktür.</p>")}
    <p class="toc-inline"><strong>Bu sayfada:</strong>
      <a href="#mt-godot">Godot</a> ·
      <a href="#mt-box2d">Box2D</a> ·
      <a href="#mt-python">Python</a> ·
      <a href="#mt-raylib">raylib</a> ·
      <a href="#mt-uyku">Uyku / CCD</a>
    </p>

    <h2 id="mt-godot">Godot: CharacterBody ayrıdır</h2>
    <p>Platformer karakterini RigidBody yapmak takla ve kaygan zemin demektir. Godot bu yüzden <code>CharacterBody2D</code> ayırır: <code>move_and_slide</code>, yerçekimini siz Euler ile yazarsınız. <code>RigidBody2D</code> kutudur, motor entegre eder. <code>Area2D</code> jeton ve tetiktir — overlaps. <code>move_and_collide</code> bir kez çarpar; slide rampada kayar.</p>
    ${N.editor("g0")}
    ${N.tryit([{ do: "gravity ekleyen satırı yorumlayın.", expect: "Karakter uçmaz, durur. CharacterBody yerçekimini siz yazarsınız." }])}
    ${N.editor("g1")}
    ${N.editor("g2")}
    ${N.editor("g3")}
    ${N.editor("g4")}

    <h2 id="mt-box2d">Box2D: metre dünyası</h2>
    <p>Erin Catto 2006, Angry Birds, Limbo. Box2D metre konuşur, tuval piksel. “1,5 m kutu, ölçek 40 → 60 px.” Planck p5.play içinde gizler; doğrudan Box2D yazarsanız gizlemez. Fixture şekildir, body konum ve kütledir; bir body’de birkaç fixture olur (T harfi, araba).</p>
    ${N.math("x<sub>piksel</sub> = x<sub>metre</sub> × ölçek","Box2D konumunu p5.js <code>rect</code> ile çizerken metre değerini ölçekle çarparsınız. Ölçek 40 ise 2 m kutu tuvalde 80 pikseldir.")}
    ${N.editor("g5")}
    ${N.quiz("2 m genişlik, ölçek 40 px/m. Tuvalde kaç piksel?",["2","40","80"],2,"2 × 40 = 80. Ölçek 1 ise kutu 2 piksel olur.")}
    ${N.editor("g6")}

    <h2 id="mt-python">Python: iyi motorlar var</h2>
    <p>Pizza aynı pizza; fırın başka ülkede üretilmiş olabilir. Chipmunk, Box2D, Bullet, MuJoCo C veya C++ ile yazılır. Siz <code>pip install pymunk</code> deyince o fırını Python’dan yakarsınız. Fırın işe yaramasaydı Pymunk’ın sarkaç ve yığın örnekleri, PyBullet robot kolu bu dilde durmazdı.</p>
    <p>Pygame bu listenin dışında kalır. Kalemdir: pencere, döngü, blit. p5.js gibi ofis getirmez. Ofisi paket eklersiniz; Newton değişmez.</p>
    <p>p5.js yazımı için önce <a href="#/p5">pyp5js</a>. Aşağıdaki raf 2B oyundan 3B robota gider. Bu tarayıcı Python çalıştırmaz; soldaki kod okunur, sağdaki tuval aynı sözlüğün p5.js / p5.play resmidir.</p>
    <table class="data">
      <thead><tr><th>Paket</th><th>Altındaki ofis</th><th>Ne zaman</th></tr></thead>
      <tbody>
        <tr>
          <td><a href="https://www.pymunk.org/en/latest/" target="_blank" rel="noopener">Pymunk</a></td>
          <td>Chipmunk2D</td>
          <td>2B oyun, Pygame. Sarkaç, yığın, fare teli, platformer örnekleri derslik içindir.</td>
        </tr>
        <tr>
          <td><a href="https://github.com/pybox2d/pybox2d" target="_blank" rel="noopener">PyBox2D</a></td>
          <td>Box2D</td>
          <td>Unity 2B / Angry Birds soyu. Metre dünyası, fixture, joint.</td>
        </tr>
        <tr>
          <td><a href="https://api.arcade.academy/en/latest/tutorials/pymunk_platformer/index.html" target="_blank" rel="noopener">Arcade PymunkPhysicsEngine</a></td>
          <td>Pymunk gizler</td>
          <td>python-arcade platformer. p5.play’in Planck’ı gizlemesi gibi.</td>
        </tr>
        <tr>
          <td><a href="https://pybullet.org/" target="_blank" rel="noopener">PyBullet</a></td>
          <td>Bullet</td>
          <td>3B rijit cisim, robot kolu, pekiştirmeli öğrenme. Örnek deposu kalabalık.</td>
        </tr>
        <tr>
          <td><a href="https://mujoco.org/" target="_blank" rel="noopener">MuJoCo</a></td>
          <td>MuJoCo C</td>
          <td>Robotik altın standart; <code>pip install mujoco</code>. Bu tuval 2B’dir, laboratuvar 3B.</td>
        </tr>
        <tr>
          <td>Panda3D</td>
          <td>Bullet gömülü</td>
          <td>Python birinci dil olan 3B oyun motoru. raylib’den editörsüz, Unity’den hafif.</td>
        </tr>
        <tr>
          <td>Brax, Warp, Taichi</td>
          <td>GPU / türevlenebilir</td>
          <td>Araştırma. Mario ödevi değil; “Python’da fizik yok” cümlesini de çürütür.</td>
        </tr>
      </tbody>
    </table>
    ${N.warn("Tuzak: pygame.sprite.collide fizik motoru değildir","<p>Kesişiyor mu diye sorar, yeni hız vermez. p5.collide2D’nin kuzenidir. Sekme, kütle, eklem için Pymunk veya PyBox2D. <code>rect.colliderect</code> ile kutu yığmak ofis değildir.</p>")}
    <p><code>space.step(1/60)</code> Matter <code>Engine.update</code>’tir. <code>PinJoint</code> sarkaç, <code>DampedSpring</code> yay (Bölüm 3), <code>CollisionHandler</code> p5.play <code>collides</code>. PyBullet’te aynı fikir <code>stepSimulation</code> ve <code>applyExternalForce</code> olur — 3B vektör, bu analog 2B kalır.</p>
    ${N.editor("g7")}
    ${N.editor("g11")}
    ${N.editor("g15")}
    ${N.warn("Tuzak: callback içinde space.remove","<p>Pymunk <code>begin</code> çalışırken dünya kilitlidir. Jetonu orada silmek çöker veya hayalet gövde bırakır. <code>add_post_step_callback</code> adım bitince siler. Matter’de aynı fikir: çarpışma olayında hemen <code>World.remove</code> değil, kare sonu.</p>")}
    ${N.editor("g16")}
    ${N.editor("g12")}
    ${N.editor("g17")}
    ${N.tryit([{ do: "Pymunk analogunda restitution 0.7’yi 0 yapın.", expect: "Top çamura düşer. elasticity / restitution aynı düğmedir." }])}
    ${N.quiz("Python’da 2B platformer fizik ofisi?",["pygame.Rect çarpışması yeter","Pymunk veya PyBox2D (Arcade Pymunk’ı gizler)","MuJoCo 2B Mario için yazılmıştır"],1,"Pygame kalemdir. Chipmunk / Box2D ofistir. MuJoCo 3B robot laboratuvarıdır.")}
    <p>Python rafı bitti. Aynı ofis fikri C# PhysX kapsülünde ve Rust Rapier’de de durur; dil değişir, Newton değişmez.</p>
    ${N.editor("g8")}
    ${N.editor("g9")}

    <h2 id="mt-raylib">raylib: motor değil, kalem kutusu</h2>
    <p>Unity sahne ağacı ve Inspector verir. raylib vermez. C kütüphanesidir: pencere aç, döngü dön, daire çiz. p5.js’in kuzenidir: <code>InitWindow</code> ≈ <code>createCanvas</code>, <code>while (!WindowShouldClose())</code> ≈ <code>draw</code>, <code>BeginDrawing</code> bir karenin çerçevesidir. Oyun motoru demek, “sahne editörü var” demektir; raylib o rafta durmaz. Pico-8 / Love2D / SFML aynı sokaktadır.</p>
    <p>Fizik raylib’in iç organı değildir. Eski sürümlere Physac (basit 2B) bağlanırdı; bugün Chipmunk, Box2D veya kendi Euler’iniz eklenir. Python’da <code>pyray</code> aynı C API’sini sarar. Yanlış yazınca bozulan şey değişmez: döngü durursa kare durur, gövde ofise girmezse düşmez.</p>
    ${N.warn("Tuzak: raylib = Unity","<p>Staj ilanı raylib görünce Inspector aramayın. Kod siz yazarsınız, derleyici C/C++ veya pyray’dir. Bu tarayıcı derlemez; sağdaki tuval <code>DrawCircle</code> fikrinin p5.js resmidir.</p>")}
    ${N.editor("g13")}
    ${N.editor("g14")}
    ${N.quiz("raylib hangisidir?",["Unity gibi sahne editörlü motor","p5.js gibi çizim kütüphanesi; fizik ayrı eklenir","Phaser Matter’ın C hali, iki fırın seçilir"],1,"Pencere, döngü, çizim. Fırın (Physac / Chipmunk / Box2D) ayrı paket veya sizin Euler’inizdir.")}

    <h2 id="mt-uyku">Uyku ve tüneme</h2>
    <p>Duran kule uyur (sleep), CPU dinlenir; itince uyanır. İnce mermi bir karede duvarı atlayabilir: CCD / continuous / bullet. Analogda pembe çubuk çok hızlıysa bazen yeşil duvarı görmez.</p>
    ${N.editor("g10")}
    ${N.warn("Tuzak: kütüphane adı ≠ motor","<p>Phaser çerçeve, Arcade motor. p5.play kütüphane, Planck motor. Unity editör, PhysX / Box2D 2B motor. Belgede önce motoru sorun.</p>")}

    ${N.resources([
      { kind: "Dokümantasyon", title: "Godot Physics", url: "https://docs.godotengine.org/en/stable/tutorials/physics/physics_introduction.html" },
      { kind: "Dokümantasyon", title: "CharacterBody2D", url: "https://docs.godotengine.org/en/stable/tutorials/physics/using_character_body_2d.html" },
      { kind: "Referans", title: "Box2D", url: "https://box2d.org/" },
      { kind: "Dokümantasyon", title: "Pymunk", url: "https://www.pymunk.org/en/latest/" },
      { kind: "Örnek", title: "Pymunk examples", url: "https://www.pymunk.org/en/latest/examples.html" },
      { kind: "Kod", title: "Pymunk GitHub örnekleri", url: "https://github.com/viblo/pymunk/tree/master/examples" },
      { kind: "Kod", title: "PyBox2D", url: "https://github.com/pybox2d/pybox2d" },
      { kind: "Örnek", title: "Arcade Pymunk platformer", url: "https://api.arcade.academy/en/latest/tutorials/pymunk_platformer/index.html" },
      { kind: "Dokümantasyon", title: "PyBullet Quickstart", url: "https://docs.google.com/document/d/10sXEhzFRSnvFcl3XxNGhnD4N2SedqwdAvK3dsihxVUA/preview" },
      { kind: "Dokümantasyon", title: "MuJoCo", url: "https://mujoco.readthedocs.io/" },
      { kind: "Dokümantasyon", title: "Panda3D Bullet", url: "https://docs.panda3d.org/1.10/python/programming/physics/bullet/index" },
      { kind: "Dokümantasyon", title: "raylib", url: "https://www.raylib.com/" },
      { kind: "Örnek", title: "raylib cheatsheet", url: "https://www.raylib.com/cheatsheet/cheatsheet.html" },
      { kind: "Python", title: "pyray (raylib)", url: "https://electronstudio.github.io/raylib-python-cffi/" },
      { kind: "Kitap", title: "p5.js Python portu", url: "#/p5" },
      { kind: "Kod", title: "Rapier", url: "https://rapier.rs/" },
      { kind: "Kod", title: "ammo.js (Bullet)", url: "https://github.com/kripken/ammo.js/" },
      { kind: "Kitap", title: "Matter.js oyun", url: "#/matter" },
      { kind: "Kitap", title: "Unity / C#", url: "#/unity" },
      { kind: "Kitap", title: "Phaser", url: "#/phaser" },
    ])}

  `,
  editors: {
    g0: {
      title: "CharacterBody2D: yercekimini siz yazarsiniz",
      libraries: ["p5play"],
      files: [
        {
          name: "player.gd",
          content: `extends CharacterBody2D
var speed := 200.0
var jump_v := -400.0
var gravity := 900.0
func _physics_process(delta):
    if not is_on_floor():
        velocity.y += gravity * delta
    var x := Input.get_axis("ui_left", "ui_right")
    velocity.x = x * speed
    if Input.is_action_just_pressed("ui_accept") and is_on_floor():
        velocity.y = jump_v
    move_and_slide()\n`,
        },
        {
          name: "sketch.js",
          content: `let oyuncu, zemin, g = 0.35;
function setup() {
  new Canvas(400, 240);
  world.gravity.y = 0;
  zemin = new Sprite(200, 228, 400, 24, "static"); zemin.color = "#333";
  oyuncu = new Sprite(80, 180, 24, 36);
  oyuncu.color = "#3d7ea6"; oyuncu.rotationLock = true;
}
function draw() {
  background(255);
  if (!oyuncu.colliding(zemin)) oyuncu.vel.y += g;
  if (kb.pressing("a")) oyuncu.vel.x = -3;
  else if (kb.pressing("d")) oyuncu.vel.x = 3;
  else oyuncu.vel.x = 0;
  if (kb.presses("space") && oyuncu.colliding(zemin)) oyuncu.vel.y = -7;
  fill(0); noStroke(); textSize(12);
  text("CharacterBody: gravity * delta sizde", 10, 18);
}\n`,
        }
      ],
    },
    g1: {
      title: "RigidBody2D: motor entegre eder",
      libraries: ["p5play"],
      files: [
        {
          name: "crate.gd",
          content: `extends RigidBody2D
func _ready():
    mass = 2.0
    physics_material_override = PhysicsMaterial.new()
    physics_material_override.bounce = 0.4
func _integrate_forces(state):
    if Input.is_action_just_pressed("ui_accept"):
        apply_impulse(Vector2(0, -200))\n`,
        },
        {
          name: "sketch.js",
          content: `function setup() {
  new Canvas(400, 240);
  world.gravity.y = 10;
  new Sprite(200, 228, 400, 24, "static").color = "#333";
  let k = new Sprite(200, 40, 36, 36);
  k.color = "#c45c78"; k.bounciness = 0.4; k.mass = 2; k.text = "rb";
}
function draw() {
  background(255);
  if (kb.presses("space")) {
    let k = allSprites[1];
    k.vel.y = -6;
  }
  fill(0); noStroke(); textSize(12);
  text("RigidBody2D analog  ·  Space impulse", 10, 18);
}\n`,
        }
      ],
    },
    g2: {
      title: "Area2D: overlap / trigger",
      libraries: ["p5play"],
      files: [
        {
          name: "area.gd",
          content: `extends Area2D
func _on_body_entered(body):
    if body.name == "Player":
        queue_free()\n`,
        },
        {
          name: "sketch.js",
          content: `let p, a;
function setup() {
  new Canvas(400, 240);
  world.gravity.y = 0;
  p = new Sprite(60, 120, 28); p.color = "#3d7ea6";
  a = new Sprite(240, 120, 80, 80, "static");
  a.color = "rgba(90,158,111,0.35)"; a.text = "Area";
}
function draw() {
  background(255);
  p.moveTowards(mouse, 0.12);
  if (p.overlapping(a)) a.color = "rgba(90,158,111,0.75)";
  else a.color = "rgba(90,158,111,0.35)";
  fill(0); noStroke(); textSize(12);
  text("Area2D body_entered = overlaps", 10, 18);
}\n`,
        }
      ],
    },
    g3: {
      title: "move_and_collide vs move_and_slide",
      libraries: ["p5play"],
      files: [
        {
          name: "move.gd",
          content: `extends CharacterBody2D
func _physics_process(delta):
    var col := move_and_collide(velocity * delta)
    if col:
        velocity = velocity.bounce(col.get_normal())
# slide: rampada kayar, collide: bir kez carpar durur veya bounce\n`,
        },
        {
          name: "sketch.js",
          content: `let a, b, z;
function setup() {
  new Canvas(400, 240);
  world.gravity.y = 0;
  z = new Sprite(200, 228, 400, 24, "static"); z.color = "#333";
  a = new Sprite(80, 180, 24, 24); a.color = "#3d7ea6"; a.vel.x = 2; a.text = "slide";
  b = new Sprite(80, 80, 24, 24); b.color = "#c45c78"; b.vel.x = 2; b.collider = "kinematic"; b.text = "col";
  let duvar = new Sprite(300, 80, 16, 60, "static"); duvar.color = "#555";
}
function draw() {
  background(255);
  fill(0); noStroke(); textSize(12);
  text("mavi fizik slide  ·  pembe kinematic duvara biner", 10, 18);
}\n`,
        }
      ],
    },
    g4: {
      title: "PinJoint2D sarkac",
      libraries: ["p5play"],
      files: [
        {
          name: "pin.gd",
          content: `extends PinJoint2D
func _ready():
    node_a = "../Civa"
    node_b = "../Top"\n`,
        },
        {
          name: "sketch.js",
          content: `function setup() {
  new Canvas(400, 240);
  world.gravity.y = 10;
  let civa = new Sprite(200, 28, 16, 16, "static"); civa.color = "#555";
  let top = new Sprite(270, 130, 28); top.color = "#c45c78";
  new DistanceJoint(civa, top);
}
function draw() {
  background(255);
  fill(0); textSize(12);
  text("PinJoint2D / DistanceJoint analog", 10, 18);
}\n`,
        }
      ],
    },
    g5: {
      title: "Box2D metre x olcek = piksel",
      libraries: ["p5"],
      files: [
        {
          name: "sketch.js",
          content: `let olcek = 40, metreY = 0.2, vy = 0;
function setup() { createCanvas(400, 240); }
function draw() {
  background(255);
  vy += 0.35 / olcek;
  metreY += vy;
  if (metreY > 4.8) { metreY = 4.8; vy *= -0.4; }
  let py = metreY * olcek;
  fill(61, 126, 166); noStroke();
  rect(80, py, 1.0 * olcek, 1.0 * olcek);
  fill(0); textSize(12);
  text("y = " + nf(metreY, 1, 2) + " m   tuval " + nf(py, 1, 0) + " px  olcek " + olcek, 10, 18);
  text("tikla: olcek 40 / 8", 10, 228);
}
function mousePressed() { olcek = olcek === 40 ? 8 : 40; metreY = 0.2; vy = 0; }\n`,
        }
      ],
    },
    g6: {
      title: "Box2D fixture vs body",
      libraries: ["matter"],
      files: [
        {
          name: "body.cpp",
          content: `// b2Body = konum, hiz, kutle
// b2Fixture = sekil + surtunme + sekme (bir body'de birden fazla)
b2PolygonShape box;
box.SetAsBox(0.5f, 0.5f); // metre
b2FixtureDef fd; fd.shape = &box; fd.density = 1;
body->CreateFixture(&fd);\n`,
        },
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body } = Matter;
let engine, birlesik;
function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  Composite.add(engine.world, Bodies.rectangle(200, 230, 400, 20, { isStatic: true }));
  const a = Bodies.rectangle(200, 50, 70, 16);
  const b = Bodies.rectangle(200, 50, 16, 70);
  birlesik = Body.create({ parts: [a, b] });
  Composite.add(engine.world, birlesik);
}
function draw() {
  background(255);
  Engine.update(engine);
  for (const bd of engine.world.bodies) {
    fill(bd.isStatic ? 40 : 61, bd.isStatic ? 40 : 126, bd.isStatic ? 40 : 166);
    beginShape();
    for (const v of bd.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  fill(0); textSize(12);
  text("bir body, iki fixture (parts)", 10, 18);
}\n`,
        }
      ],
    },
    g7: {
      title: "Pymunk space.step",
      libraries: ["matter"],
      analog: "Soldaki Python Pymunk’tır; bu tarayıcı Pymunk açmaz. Sağdaki tuval space.step’in Matter Runner resmidir.",
      files: [
        {
          name: "ball.py",
          content: `import pymunk
space = pymunk.Space()
space.gravity = (0, 900)
body = pymunk.Body(1, pymunk.moment_for_circle(1, 0, 16))
body.position = (200, 40)
shape = pymunk.Circle(body, 16)
shape.elasticity = 0.7
space.add(body, shape)
floor = pymunk.Segment(space.static_body, (0, 220), (400, 220), 8)
space.add(floor)
# her kare: space.step(1/60)\n`,
        },
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Runner } = Matter;
let engine, top;
function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  engine.gravity.y = 1;
  top = Bodies.circle(200, 40, 16, { restitution: 0.7 });
  Composite.add(engine.world, top);
  Composite.add(engine.world, Bodies.rectangle(200, 230, 400, 20, { isStatic: true }));
  Runner.run(Runner.create(), engine);
}
function draw() {
  background(255);
  fill(61, 126, 166); noStroke();
  circle(top.position.x, top.position.y, 32);
  fill(50); rect(0, 220, 400, 20);
  fill(0); textSize(12);
  text("space.step  =  Engine.update / Runner", 10, 18);
}\n`,
        }
      ],
    },
    g8: {
      title: "PhysX kapsul: 3B karakter",
      libraries: ["p5play"],
      files: [
        {
          name: "cc.cs",
          content: `using UnityEngine;
public class CapsuleMove : MonoBehaviour {
    CharacterController cc;
    void Awake() { cc = GetComponent<CharacterController>(); }
    void Update() {
        var v = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
        v *= 4f;
        if (!cc.isGrounded) v.y += Physics.gravity.y * Time.deltaTime;
        cc.Move(v * Time.deltaTime);
    }
}\n`,
        },
        {
          name: "sketch.js",
          content: `let p, z;
function setup() {
  new Canvas(400, 240);
  world.gravity.y = 0;
  z = new Sprite(200, 228, 400, 24, "static"); z.color = "#333";
  p = new Sprite(80, 180, 20, 40);
  p.color = "#3d7ea6"; p.rotationLock = true; p.text = "cap";
}
function draw() {
  background(255);
  if (!p.colliding(z)) p.vel.y += 0.35;
  if (kb.pressing("a")) p.vel.x = -3;
  else if (kb.pressing("d")) p.vel.x = 3;
  else p.vel.x = 0;
  if (kb.presses("space") && p.colliding(z)) p.vel.y = -7;
  fill(0); noStroke(); textSize(12);
  text("CharacterController analog: kapsul, isGrounded", 10, 18);
}\n`,
        }
      ],
    },
    g9: {
      title: "Rapier / Bullet / Jolt: ayni sozluk",
      libraries: ["p5"],
      files: [
        {
          name: "sketch.js",
          content: `function setup() {
  createCanvas(400, 240);
  textSize(13); fill(0);
}
function draw() {
  background(255);
  text("World / Space     ofis", 20, 40);
  text("Body / Rigidbody  kutleli cisim", 20, 64);
  text("Collider/Fixture  carpan kabuk", 20, 88);
  text("static/dynamic    duvar / kutu", 20, 112);
  text("Joint/Constraint  ip menteşe", 20, 136);
  text("step / tick       ofis saati", 20, 160);
  text("Rapier Rust+WASM  ·  Bullet ammo.js  ·  Jolt Godot 3B", 20, 200);
}\n`,
        }
      ],
    },
    g10: {
      title: "sleep ve CCD",
      libraries: ["matter"],
      files: [
        {
          name: "notes.md",
          content: `sleep: duran kule uyur, CPU dinlenir.
CCD / bullet: ince mermi bir karede duvari atlar.
Matter: body.collisionFilter + body.slop
Unity: Collision Detection = Continuous\n`,
        },
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite, Body } = Matter;
let engine, ince;
function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  Composite.add(engine.world, [
    Bodies.rectangle(200, 230, 400, 20, { isStatic: true }),
    Bodies.rectangle(300, 160, 12, 80, { isStatic: true }),
  ]);
  ince = Bodies.rectangle(40, 160, 24, 6, { restitution: 0.1 });
  Composite.add(engine.world, ince);
  Body.setVelocity(ince, { x: 18, y: 0 });
}
function draw() {
  background(255);
  Engine.update(engine);
  for (const b of engine.world.bodies) {
    fill(b === ince ? "#c45c78" : b.isStatic ? 40 : 80);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  fill(0); textSize(12);
  text("ince cisim hizli: CCD yoksa duvari atlayabilir", 10, 18);
}\n`,
        }
      ],
    },
    g11: {
      title: "Pymunk PinJoint: sarkac",
      libraries: ["p5play"],
      analog: "Soldaki Python Pymunk PinJoint’tir; bu tarayıcı Pymunk açmaz. Sağdaki tuval DistanceJoint analogudur.",
      files: [
        {
          name: "pendulum.py",
          content: `import pymunk
space = pymunk.Space()
space.gravity = (0, 900)
pivot = pymunk.Body(body_type=pymunk.Body.STATIC)
pivot.position = (200, 30)
bob = pymunk.Body(1, pymunk.moment_for_circle(1, 0, 16))
bob.position = (280, 140)
space.add(bob, pymunk.Circle(bob, 16))
joint = pymunk.PinJoint(pivot, bob, (0, 0), (0, 0))
space.add(joint)
# her kare: space.step(1/60)
`,
        },
        {
          name: "sketch.js",
          content: `function setup() {
  new Canvas(400, 240);
  world.gravity.y = 10;
  let mil = new Sprite(200, 30, 12, 12, "static");
  mil.color = "#555";
  let bob = new Sprite(280, 140, 32);
  bob.color = "#3d7ea6";
  new DistanceJoint(mil, bob);
}
function draw() {
  background(255);
  fill(0);
  noStroke();
  textSize(12);
  text("PinJoint analog  ·  DistanceJoint ip", 10, 18);
}
`,
        },
      ],
    },
    g12: {
      title: "PyBox2D: world.Step metre ister",
      libraries: ["matter"],
      analog: "Soldaki Python PyBox2D’dir. Sağdaki tuval metre×ölçek çevirisinin Matter resmidir.",
      files: [
        {
          name: "world.py",
          content: `from Box2D import b2World
SCALE = 40
world = b2World(gravity=(0, -10), doSleep=True)
ground = world.CreateStaticBody(position=(5, 0.4))
ground.CreatePolygonFixture(box=(5, 0.4))
box = world.CreateDynamicBody(position=(5, 4))
box.CreatePolygonFixture(box=(0.4, 0.4), density=1, restitution=0.3)
# world.Step(1/60, 6, 2)
# x_px = box.position.x * SCALE
`,
        },
        {
          name: "sketch.js",
          content: `const { Engine, Bodies, Composite } = Matter;
let engine;
function setup() {
  createCanvas(400, 240);
  engine = Engine.create();
  Composite.add(engine.world, [
    Bodies.rectangle(200, 224, 400, 32, { isStatic: true }),
    Bodies.rectangle(200, 80, 32, 32, { restitution: 0.3 }),
  ]);
}
function draw() {
  Engine.update(engine);
  background(255);
  for (const b of engine.world.bodies) {
    fill(b.isStatic ? 40 : 61, b.isStatic ? 40 : 126, b.isStatic ? 40 : 166);
    beginShape();
    for (const v of b.vertices) vertex(v.x, v.y);
    endShape(CLOSE);
  }
  fill(0);
  textSize(12);
  text("2 m kutu * 40 = 80 px  ·  world.Step analog", 10, 18);
}
`,
        },
      ],
    },
    g13: {
      title: "raylib: InitWindow + draw dongusu",
      analog: "Soldaki C raylib’dir; derlenmez. Sağdaki tuval InitWindow / BeginDrawing fikrinin p5.js resmidir. raylib Unity değildir.",
      files: [
        {
          name: "main.c",
          content: `#include "raylib.h"
int main(void) {
    InitWindow(400, 240, "raylib");
    SetTargetFPS(60);
    Vector2 p = { 200, 40 };
    Vector2 v = { 0, 0 };
    while (!WindowShouldClose()) {
        v.y += 400.0f * GetFrameTime();
        p.y += v.y * GetFrameTime();
        if (p.y > 220) { p.y = 220; v.y *= -0.6f; }
        BeginDrawing();
        ClearBackground(RAYWHITE);
        DrawCircleV(p, 16, BLUE);
        EndDrawing();
    }
    CloseWindow();
    return 0;
}
`,
        },
        {
          name: "sketch.js",
          content: `let y = 40, vy = 0;
function setup() {
  createCanvas(400, 240);
}
function draw() {
  let dt = deltaTime / 1000;
  vy += 400 * dt;
  y += vy * dt;
  if (y > 220) { y = 220; vy *= -0.6; }
  background(255);
  fill(61, 126, 166);
  noStroke();
  circle(200, y, 32);
  fill(0);
  textSize(12);
  text("InitWindow ~ createCanvas  ·  while ~ draw", 10, 18);
}
`,
        },
      ],
    },
    g14: {
      title: "raylib fizik ayri eklenir",
      libraries: ["p5play"],
      analog: "Physac / Chipmunk raylib’e paketlenir; Unity Rigidbody değildir. Tuval p5.play analogudur.",
      files: [
        {
          name: "phys.c",
          content: `/* raylib fizik getirmez. Physac veya Chipmunk baglarsiniz. */
#include "raylib.h"
int main(void) {
    InitWindow(400, 240, "fizik ayri");
    while (!WindowShouldClose()) {
        BeginDrawing();
        ClearBackground(RAYWHITE);
        EndDrawing();
    }
    CloseWindow();
}
`,
        },
        {
          name: "sketch.js",
          content: `function setup() {
  new Canvas(400, 240);
  world.gravity.y = 10;
  new Sprite(200, 228, 400, 24, "static").color = "#333";
  let k = new Sprite(200, 40, 32);
  k.color = "#3d7ea6";
  k.bounciness = 0.45;
}
function draw() {
  background(255);
  fill(0);
  noStroke();
  textSize(12);
  text("raylib cizim  ·  fizik Chipmunk/Box2D/Euler sizde", 10, 18);
}
`,
        },
      ],
    },
    g15: {
      title: "Pymunk CollisionHandler: jeton",
      libraries: ["p5play"],
      analog: "Soldaki Python Pymunk CollisionHandler’dır. Sağdaki tuval overlapping analogudur; tarayıcı Pymunk açmaz.",
      files: [
        {
          name: "coin.py",
          content: `import pymunk
space = pymunk.Space()
space.gravity = (0, 900)
player = pymunk.Body(1, pymunk.moment_for_box(1, (24, 36)))
player.position = (80, 180)
ps = pymunk.Poly.create_box(player, (24, 36))
ps.collision_type = 1
coin = pymunk.Body(body_type=pymunk.Body.KINEMATIC)
coin.position = (220, 200)
cs = pymunk.Circle(coin, 10)
cs.collision_type = 2
cs.sensor = True
space.add(player, ps, coin, cs)
n = [0]
def begin(arbiter, space, data):
    n[0] += 1
    def sil(space, key):
        space.remove(coin, cs)
    space.add_post_step_callback(sil, coin)
    return False
h = space.add_collision_handler(1, 2)
h.begin = begin
`,
        },
        {
          name: "sketch.js",
          content: `let oyuncu, jeton, n = 0;
function setup() {
  new Canvas(400, 240);
  world.gravity.y = 10;
  new Sprite(200, 228, 400, 24, "static").color = "#333";
  oyuncu = new Sprite(80, 180, 24, 36);
  oyuncu.color = "#3d7ea6";
  oyuncu.rotationLock = true;
  jeton = new Sprite(220, 200, 16, "static");
  jeton.color = "#c9a227";
  oyuncu.overlaps(jeton, topla);
}
function topla() {
  if (!jeton) return;
  jeton.remove();
  jeton = null;
  n++;
}
function draw() {
  background(255);
  if (kb.pressing("a")) oyuncu.vel.x = -3;
  else if (kb.pressing("d")) oyuncu.vel.x = 3;
  else oyuncu.vel.x = 0;
  fill(0);
  noStroke();
  textSize(12);
  text("handler.begin analog  ·  A/D  ·  skor " + n, 10, 18);
}
`,
        },
      ],
    },
    g16: {
      title: "Pymunk DampedSpring: yay",
      libraries: ["p5play"],
      analog: "Soldaki Python Pymunk DampedSpring’dir (Bölüm 3 yay). Sağdaki tuval DistanceJoint springiness analogudur.",
      files: [
        {
          name: "spring.py",
          content: `import pymunk
space = pymunk.Space()
space.gravity = (0, 900)
b = pymunk.Body(1, pymunk.moment_for_circle(1, 0, 18))
b.position = (200, 140)
space.add(b, pymunk.Circle(b, 18))
# static_body (0,0)'da; civi dunya (200, 24)
spring = pymunk.DampedSpring(space.static_body, b, (200, 24), (0, 0),
    rest_length=110, stiffness=40, damping=8)
space.add(spring)
# ornekler: github.com/viblo/pymunk/tree/master/examples
`,
        },
        {
          name: "sketch.js",
          content: `function setup() {
  new Canvas(400, 240);
  world.gravity.y = 10;
  let mil = new Sprite(200, 24, 14, 14, "static");
  mil.color = "#555";
  let bob = new Sprite(200, 140, 36);
  bob.color = "#c45c78";
  let yay = new DistanceJoint(mil, bob);
  yay.springiness = 0.4;
}
function draw() {
  background(255);
  fill(0);
  noStroke();
  textSize(12);
  text("DampedSpring analog  ·  springiness yay", 10, 18);
}
`,
        },
      ],
    },
    g17: {
      title: "PyBullet stepSimulation (3B sozluk, 2B resim)",
      libraries: ["p5play"],
      analog: "PyBullet 3B Bullet’tir. Tuval 2B analog: applyForce + step. Robot kolu burada yoktur.",
      files: [
        {
          name: "bullet.py",
          content: `import pybullet as p
import pybullet_data
p.connect(p.DIRECT)
p.setAdditionalSearchPath(pybullet_data.getDataPath())
p.setGravity(0, 0, -9.8)
p.loadURDF("plane.urdf")
box = p.loadURDF("cube.urdf", [0, 0, 1])
for _ in range(240):
    p.applyExternalForce(box, -1, [2, 0, 0], [0, 0, 0], p.WORLD_FRAME)
    p.stepSimulation()
# pos, _ = p.getBasePositionAndOrientation(box)
`,
        },
        {
          name: "sketch.js",
          content: `let kutu;
function setup() {
  new Canvas(400, 240);
  world.gravity.y = 10;
  new Sprite(200, 228, 400, 24, "static").color = "#333";
  kutu = new Sprite(80, 40, 32, 32);
  kutu.color = "#3d7ea6";
  kutu.mass = 2;
}
function draw() {
  background(255);
  if (kb.pressing("d")) kutu.applyForce(0.25, 0);
  fill(0);
  noStroke();
  textSize(12);
  text("stepSimulation analog  ·  D applyExternalForce", 10, 18);
}
`,
        },
      ],
    }
  },
});
