registerChapter({
  id: "unity",
  title: "Unity / C# · Rigidbody2D",
  short: "Unity / C#",
  icon: "🧩",
  html: `

    <p>Staj ilanı C# ve Unity ister. Tuval yoktur, Inspector vardır. Resmi çizen <code>Sprite Renderer</code> düşmez; düşen <code>Rigidbody2D</code>’dir. Collider yoksa gövde hayalettir: yerçekimi çeker, duvardan geçer. 2B fizik Box2D soyundandır. 3B fizik PhysX’tir. İkisini bir prefab’e koymak Phaser Arcade+Matter tuzağının C# halidir.</p>
    <p>C# dil, Unity mutfaktır. Unity yoksa C# durur: MonoGame + VelcroPhysics. Soldaki sekme C#’tır: anahtar kelimeler boyanır, bu tarayıcı derlemez, çalıştırmaz. Sağdaki tuval Unity değildir. Rigidbody2D, Inspector, FixedUpdate, fizik malzemesi ve katman matrisi orada yoktur. Tuval, aynı Newton cümlesinin p5.play resmidir — kütle düşer, tetik geçer, ışın yere değer. “Bu C# çalışıyor” sanmak sağlıksızdır; stajda Unity’yi açarsınız, bu resmi sözlük diye taşırsınız.</p>
    ${N.warn("Tuzak: analog motor değildir","<p><code>new Sprite</code> <code>AddComponent&lt;Rigidbody2D&gt;</code> değildir. Fareyle çalışan kutu, FixedUpdate 50 Hz’ini taklit etmez. C#’ı okuyun; tuvali fikri görmek için kullanın.</p>")}
    <p class="toc-inline"><strong>Bu sayfada:</strong> gövde türleri · kuvvet · zıplama · kilit · trigger · malzeme · katman · ışın · eklem · 2B/3B</p>
    ${N.warn("Tuzak: Update içinde AddForce","<p>Fizik <code>FixedUpdate</code>’te adım atar (varsayılan 50 Hz). <code>Update</code> monitöre bağlıdır (60, 144). Kuvveti Update’te yığarsanız 144 Hz’te karakter uçar. p5.js <code>draw</code> kare hızına bölmeden kuvvet yığmak aynı hastalıktır.</p>")}

    <h2>Resim düşmez, gövde düşer</h2>
    <p>Inspector’da yalnızca Sprite Renderer varsa karakter bir pul gibi durur. Rigidbody2D + Collider2D ikisi birden. Analogda pembe <code>none</code> asılı kalır, mavi düşer.</p>
    ${N.editor("u0")}
    ${N.editor("u1")}
    ${N.quiz("Unity 2B kutunun düşmesi?",["Yalnızca Sprite Renderer","Rigidbody2D ve Collider2D","p5.js createVector otomatik çevirilir"],1,"Resim düşmez. Gövde düşer.")}

    <h2>Kuvvet, impulse, hızı ezmek</h2>
    <p><code>AddForce</code> Bölüm 2’dir. <code>ForceMode2D.Impulse</code> bir kez iter — zıplama ve mermi. Yürüme çoğu zaman <code>velocity.x</code> ezmektir; yerçekimi <code>velocity.y</code>’yi bozmasın diye yatayı yazar, dikeyi korursunuz.</p>
    ${N.editor("u2")}
    ${N.editor("u3")}
    ${N.editor("u4")}
    ${N.tryit([{ do: "Analogda presses yerine pressing yazın.", expect: "Basılı Space uçurur. Impulse JustDown ister." }])}

    <h2>Takla kilidi ve temas</h2>
    <p><code>FreezeRotation</code> p5.play <code>rotationLock</code>. Enter / Stay / Exit üç zaman: collides / colliding / collided. Is Trigger işaretli collider itermez, jeton olur.</p>
    ${N.editor("u5")}
    ${N.editor("u6")}

    <h2>Malzeme, katman, ışın</h2>
    <p>Physics Material 2D sürtünme ve sekmedir. Layer matrisi “oyuncu hayaletle çarpışmasın” der. Raycast ayak altı kısa bir dikmedir; <code>OnCollisionStay</code> duvara yaslanınca da true kalabilir, ışın daha temiz “yerde miyim” sorusudur.</p>
    ${N.editor("u7")}
    ${N.editor("u8")}
    ${N.editor("u9")}

    <h2>Eklemler ve 3B</h2>
    <p>DistanceJoint2D ip, HingeJoint2D menteşe + motor. OverlapBox bir kutu içindeki collider’ı sorar. 3B <code>Rigidbody</code> PhysX konuşur, metre ister; bu tuval 2B’dir.</p>
    ${N.editor("u10")}
    ${N.editor("u11")}
    ${N.editor("u12")}
    ${N.editor("u13")}

    ${N.resources([
      { kind: "Dokümantasyon", title: "Rigidbody2D", url: "https://docs.unity3d.com/Manual/class-Rigidbody2D.html" },
      { kind: "Dokümantasyon", title: "FixedUpdate", url: "https://docs.unity3d.com/ScriptReference/MonoBehaviour.FixedUpdate.html" },
      { kind: "Dokümantasyon", title: "Physics2D.Raycast", url: "https://docs.unity3d.com/ScriptReference/Physics2D.Raycast.html" },
      { kind: "Öğrenme", title: "Unity 2D physics", url: "https://learn.unity.com/tutorial/2d-physics" },
      { kind: "Kod", title: "VelcroPhysics", url: "https://github.com/VelcroPhysics/VelcroPhysics" },
      { kind: "Kitap", title: "Phaser", url: "#/phaser" },
      { kind: "Kitap", title: "Matter.js oyun", url: "#/matter" },
      { kind: "Kitap", title: "Godot ve diğerleri", url: "#/motorlar" },
    ])}

  `,
  editors: {
    u0: {
      title: "Sprite Renderer dusmez — Rigidbody2D duser",
      libraries: ["p5play"],
      files: [
        {
          name: "Fall.cs",
          content: `using UnityEngine;
public class Fall : MonoBehaviour {
    // Inspector: Add Component → Rigidbody2D
    // Add Component → BoxCollider2D
    // Gravity Scale = 1
    void Start() {
        var rb = GetComponent<Rigidbody2D>();
        Debug.Log("mass " + rb.mass);
    }
}
`,
        },
        {
          name: "sketch.js",
          content: `function setup() {
  new Canvas(400, 240);
  world.gravity.y = 10;
  let zemin = new Sprite(200, 228, 400, 24, "static");
  zemin.color = "#333";
  zemin.text = "static";
  let resim = new Sprite(100, 40, 36, 36, "none");
  resim.color = "rgba(196,92,120,0.4)";
  resim.text = "renderer";
  let govde = new Sprite(280, 40, 36, 36);
  govde.color = "#3d7ea6";
  govde.text = "rb";
}
function draw() {
  background(255);
  fill(0); noStroke(); textSize(12);
  text("pembe none: resim  ·  mavi dynamic: Rigidbody2D", 10, 18);
}
`,
        }
      ],
    },
    u1: {
      title: "Body Type: Dynamic / Kinematic / Static",
      libraries: ["p5play"],
      files: [
        {
          name: "BodyTypes.cs",
          content: `using UnityEngine;
public class BodyTypes : MonoBehaviour {
    // Rigidbody2D.bodyType:
    // Dynamic    — yercekimi + kuvvet
    // Kinematic  — kod hareket ettirir, fizik cekmez (asansor)
    // Static     — Inspector'da durur (zemin)
}
`,
        },
        {
          name: "sketch.js",
          content: `let asansor;
function setup() {
  new Canvas(400, 240);
  world.gravity.y = 10;
  let zemin = new Sprite(200, 228, 400, 24, "static");
  zemin.color = "#333"; zemin.text = "static";
  new Sprite(80, 40, 32, 32).color = "#c45c78";
  asansor = new Sprite(220, 140, 90, 16, "kinematic");
  asansor.color = "#5a9e6f"; asansor.text = "kin";
  let hayalet = new Sprite(330, 80, 32, 32, "none");
  hayalet.color = "rgba(61,126,166,0.4)"; hayalet.text = "none";
}
function draw() {
  background(255);
  asansor.y = 140 + sin(frameCount * 0.04) * 36;
  fill(0); noStroke(); textSize(12);
  text("pembe dyn  ·  yesil kinematic asansor  ·  mavi none", 10, 18);
}
`,
        }
      ],
    },
    u2: {
      title: "AddForce FixedUpdate'te",
      libraries: ["p5play"],
      files: [
        {
          name: "Force.cs",
          content: `using UnityEngine;
public class Force : MonoBehaviour {
    public float force = 4f;
    Rigidbody2D rb;
    void Awake() { rb = GetComponent<Rigidbody2D>(); }
    void FixedUpdate() {
        Vector2 f = Vector2.zero;
        if (Input.GetKey(KeyCode.A)) f.x -= force;
        if (Input.GetKey(KeyCode.D)) f.x += force;
        if (Input.GetKey(KeyCode.W)) f.y += force;
        if (Input.GetKey(KeyCode.S)) f.y -= force;
        rb.AddForce(f); // ForceMode2D.Force varsayilan
        if (Input.GetKey(KeyCode.Space)) rb.velocity = Vector2.zero;
    }
}
`,
        },
        {
          name: "sketch.js",
          content: `let topu;
function setup() {
  new Canvas(400, 240);
  world.gravity.y = 0;
  topu = new Sprite(200, 120, 36);
  topu.color = "#3d7ea6"; topu.mass = 4; topu.drag = 1.1;
}
function draw() {
  background(255);
  if (kb.pressing("a")) topu.applyForce(-0.35, 0);
  if (kb.pressing("d")) topu.applyForce(0.35, 0);
  if (kb.pressing("w")) topu.applyForce(0, -0.35);
  if (kb.pressing("s")) topu.applyForce(0, 0.35);
  if (kb.pressing("space")) { topu.vel.x = 0; topu.vel.y = 0; }
  topu.x = constrain(topu.x, 20, 380);
  topu.y = constrain(topu.y, 20, 220);
  stroke("#c45c78"); strokeWeight(3);
  line(topu.x, topu.y, topu.x + topu.vel.x * 12, topu.y + topu.vel.y * 12);
  noStroke(); fill(0); textSize(12);
  text("WASD AddForce analog  ·  Space sifirla  ·  mass 4", 10, 18);
}
`,
        }
      ],
    },
    u3: {
      title: "ForceMode2D.Impulse: bir kez it",
      libraries: ["p5play"],
      files: [
        {
          name: "Impulse.cs",
          content: `using UnityEngine;
public class Impulse : MonoBehaviour {
    Rigidbody2D rb;
    void Awake() { rb = GetComponent<Rigidbody2D>(); }
    void Update() {
        if (Input.GetKeyDown(KeyCode.Space))
            rb.AddForce(Vector2.up * 5f, ForceMode2D.Impulse);
    }
}
`,
        },
        {
          name: "sketch.js",
          content: `let topu, zemin;
function setup() {
  new Canvas(400, 240);
  world.gravity.y = 10;
  zemin = new Sprite(200, 228, 400, 24, "static");
  zemin.color = "#333";
  topu = new Sprite(200, 180, 28);
  topu.color = "#3d7ea6";
}
function draw() {
  background(255);
  if (kb.presses("space")) topu.vel.y = -6;
  fill(0); noStroke(); textSize(12);
  text("Space Impulse (presses)  ·  pressing olsa ucar", 10, 18);
}
`,
        }
      ],
    },
    u4: {
      title: "velocity ezmek = yurume",
      libraries: ["p5play"],
      files: [
        {
          name: "Walk.cs",
          content: `using UnityEngine;
public class Walk : MonoBehaviour {
    public float walk = 5f, jump = 8f;
    Rigidbody2D rb; bool yerde;
    void Awake() { rb = GetComponent<Rigidbody2D>(); }
    void Update() {
        float x = Input.GetAxisRaw("Horizontal") * walk;
        rb.velocity = new Vector2(x, rb.velocity.y);
        if (Input.GetButtonDown("Jump") && yerde)
            rb.velocity = new Vector2(rb.velocity.x, jump);
    }
    void OnCollisionStay2D(Collision2D col) { yerde = true; }
    void OnCollisionExit2D(Collision2D col) { yerde = false; }
}
`,
        },
        {
          name: "sketch.js",
          content: `let oyuncu, zemin;
function setup() {
  new Canvas(400, 240);
  world.gravity.y = 10;
  zemin = new Sprite(200, 228, 400, 24, "static");
  zemin.color = "#333";
  oyuncu = new Sprite(80, 180, 24, 36);
  oyuncu.color = "#3d7ea6"; oyuncu.rotationLock = true;
}
function draw() {
  background(255);
  if (kb.pressing("left") || kb.pressing("a")) oyuncu.vel.x = -3;
  else if (kb.pressing("right") || kb.pressing("d")) oyuncu.vel.x = 3;
  else oyuncu.vel.x = 0;
  if (kb.presses("space") && oyuncu.colliding(zemin)) oyuncu.vel.y = -6;
  fill(0); noStroke(); textSize(12);
  text("A/D velocity.x  ·  Space velocity.y ezilir", 10, 18);
}
`,
        }
      ],
    },
    u5: {
      title: "constraints.freezeRotation",
      libraries: ["p5play"],
      files: [
        {
          name: "Lock.cs",
          content: `using UnityEngine;
public class Lock : MonoBehaviour {
    void Awake() {
        var rb = GetComponent<Rigidbody2D>();
        rb.constraints = RigidbodyConstraints2D.FreezeRotation;
        rb.velocity = new Vector2(2.5f, 0);
    }
}
`,
        },
        {
          name: "sketch.js",
          content: `function setup() {
  new Canvas(400, 240);
  world.gravity.y = 10;
  new Sprite(200, 228, 400, 24, "static").color = "#333";
  let k = new Sprite(120, 40, 32, 48);
  k.color = "#3d7ea6"; k.rotationLock = true; k.vel.x = 2.4; k.text = "kilit";
  let s = new Sprite(280, 40, 32, 48);
  s.color = "#c45c78"; s.vel.x = 2.4; s.text = "serbest";
}
function draw() {
  background(255);
  fill(0); noStroke(); textSize(12);
  text("FreezeRotation / rotationLock", 10, 18);
}
`,
        }
      ],
    },
    u6: {
      title: "OnCollisionEnter vs OnTriggerEnter",
      libraries: ["p5play"],
      files: [
        {
          name: "Touch.cs",
          content: `using UnityEngine;
public class Touch : MonoBehaviour {
    void OnCollisionEnter2D(Collision2D col) {
        Debug.Log("basladi " + col.collider.name);
    }
    void OnTriggerEnter2D(Collider2D other) {
        if (other.CompareTag("Coin")) Destroy(other.gameObject);
    }
}
`,
        },
        {
          name: "sketch.js",
          content: `let topu, duvar, bolge, n = 0;
function setup() {
  new Canvas(400, 240);
  world.gravity.y = 0;
  topu = new Sprite(50, 120, 28); topu.color = "#3d7ea6";
  duvar = new Sprite(180, 120, 24, 100, "static");
  duvar.color = "#c45c78"; duvar.text = "col";
  bolge = new Sprite(310, 120, 70, 70, "static");
  bolge.color = "rgba(90,158,111,0.35)"; bolge.text = "trig";
}
function draw() {
  background(255);
  topu.moveTowards(mouse, 0.12);
  if (topu.collides(duvar)) { n++; duvar.color = "#c9a227"; }
  if (topu.overlapping(bolge)) bolge.color = "rgba(90,158,111,0.75)";
  else bolge.color = "rgba(90,158,111,0.35)";
  fill(0); noStroke(); textSize(12);
  text("Enter sayac " + n + "  ·  sag trigger (overlaps)", 10, 18);
}
`,
        }
      ],
    },
    u7: {
      title: "Physics Material 2D: friction / bounciness",
      libraries: ["p5play"],
      files: [
        {
          name: "Mat.cs",
          content: `using UnityEngine;
public class Mat : MonoBehaviour {
    // Create → Physics Material 2D
    // friction 0 = buz, 1 = lastik
    // bounciness 0..1
    // Collider2D.sharedMaterial = mat;
}
`,
        },
        {
          name: "sketch.js",
          content: `function setup() {
  new Canvas(400, 240);
  world.gravity.y = 10;
  let buz = new Sprite(100, 228, 200, 24, "static");
  buz.color = "#a8d4e6"; buz.friction = 0.02; buz.text = "buz";
  let lastik = new Sprite(300, 228, 200, 24, "static");
  lastik.color = "#5a4030"; lastik.friction = 1; lastik.text = "lastik";
  let a = new Sprite(80, 40, 28); a.color = "#3d7ea6"; a.bounciness = 0.7; a.vel.x = 3;
  let b = new Sprite(280, 40, 28); b.color = "#c45c78"; b.bounciness = 0.1; b.vel.x = 3;
}
function draw() {
  background(255);
  fill(0); noStroke(); textSize(12);
  text("Physics Material analog: friction + bounciness", 10, 18);
}
`,
        }
      ],
    },
    u8: {
      title: "Layer Collision Matrix",
      libraries: ["p5play"],
      files: [
        {
          name: "Layers.cs",
          content: `using UnityEngine;
public class Layers : MonoBehaviour {
    // Edit → Project Settings → Physics 2D
    // Layer 'Player' ile 'Ghost' kutusunu kapat
    // ikisi geometrik kesismek ama carpismaz
}
`,
        },
        {
          name: "sketch.js",
          content: `function setup() {
  new Canvas(400, 240);
  world.gravity.y = 10;
  new Sprite(200, 228, 400, 24, "static").color = "#333";
  let a = new Sprite(140, 40, 32, 32); a.color = "#3d7ea6";
  let b = new Sprite(160, 10, 32, 32); b.color = "#c45c78";
  a.overlaps(b); // maske analog: birbirini itmez
}
function draw() {
  background(255);
  fill(0); noStroke(); textSize(12);
  text("overlaps = layer matrisi kapali: kesilir, itilmez", 10, 18);
}
`,
        }
      ],
    },
    u9: {
      title: "Raycast: ayak alti yerde mi",
      libraries: ["p5play"],
      files: [
        {
          name: "Ray.cs",
          content: `using UnityEngine;
public class Ray : MonoBehaviour {
    public float extra = 0.1f;
    bool Yerde() {
        var col = GetComponent<Collider2D>();
        float y = col.bounds.min.y;
        var hit = Physics2D.Raycast(new Vector2(transform.position.x, y), Vector2.down, extra);
        return hit.collider != null;
    }
}
`,
        },
        {
          name: "sketch.js",
          content: `let oyuncu, zemin;
function setup() {
  new Canvas(400, 240);
  world.gravity.y = 10;
  zemin = new Sprite(200, 228, 400, 24, "static"); zemin.color = "#333";
  oyuncu = new Sprite(80, 180, 24, 36);
  oyuncu.color = "#3d7ea6"; oyuncu.rotationLock = true;
}
function draw() {
  background(255);
  let ayak = oyuncu.y + oyuncu.h / 2 + 4;
  let yerde = ayak > zemin.y - zemin.h / 2 - 2 && abs(oyuncu.x - zemin.x) < 200;
  stroke("#c9a227"); strokeWeight(2);
  line(oyuncu.x, oyuncu.y + oyuncu.h / 2, oyuncu.x, ayak);
  noStroke();
  if (kb.pressing("a")) oyuncu.vel.x = -3;
  else if (kb.pressing("d")) oyuncu.vel.x = 3;
  else oyuncu.vel.x = 0;
  if (kb.presses("space") && yerde) oyuncu.vel.y = -6;
  fill(0); textSize(12);
  text("sari isin = Raycast analog  ·  yerde " + yerde, 10, 18);
}
`,
        }
      ],
    },
    u10: {
      title: "DistanceJoint2D",
      libraries: ["p5play"],
      files: [
        {
          name: "DJ.cs",
          content: `using UnityEngine;
public class DJ : MonoBehaviour {
    void Start() {
        var j = gameObject.AddComponent<DistanceJoint2D>();
        j.connectedBody = GameObject.Find("Civa").GetComponent<Rigidbody2D>();
        j.autoConfigureDistance = true;
        j.maxDistanceOnly = false;
    }
}
`,
        },
        {
          name: "sketch.js",
          content: `function setup() {
  new Canvas(400, 240);
  world.gravity.y = 10;
  let civa = new Sprite(200, 24, 16, 16, "static"); civa.color = "#555";
  let top = new Sprite(280, 140, 32); top.color = "#c45c78";
  let ip = new DistanceJoint(civa, top); ip.springiness = 0;
}
function draw() {
  background(255);
  fill(0); textSize(12);
  text("DistanceJoint2D analog  ·  tikla it", 10, 18);
}
function mousePressed() {
  // DistanceJoint zaten salınır; tıklama şimdilik boş.
}
`,
        }
      ],
    },
    u11: {
      title: "HingeJoint2D",
      libraries: ["p5play"],
      files: [
        {
          name: "Hinge.cs",
          content: `using UnityEngine;
public class Hinge : MonoBehaviour {
    void Start() {
        var h = gameObject.AddComponent<HingeJoint2D>();
        h.connectedBody = GameObject.Find("Mil").GetComponent<Rigidbody2D>();
        var motor = h.motor;
        motor.motorSpeed = 90;
        h.motor = motor;
        h.useMotor = true;
    }
}
`,
        },
        {
          name: "sketch.js",
          content: `function setup() {
  new Canvas(400, 240);
  world.gravity.y = 10;
  let mil = new Sprite(200, 80, 14, 14, "static"); mil.color = "#555";
  let kanat = new Sprite(200, 80, 140, 16); kanat.color = "#3d7ea6";
  new HingeJoint(mil, kanat);
  kanat.rotationSpeed = 3;
}
function draw() {
  background(255);
  fill(0); textSize(12);
  text("HingeJoint2D + motor analog", 10, 18);
}
`,
        }
      ],
    },
    u12: {
      title: "OverlapBox: tetik bolge sorgusu",
      libraries: ["p5play"],
      files: [
        {
          name: "Box.cs",
          content: `using UnityEngine;
public class Box : MonoBehaviour {
    void FixedUpdate() {
        var hit = Physics2D.OverlapBox(transform.position, new Vector2(2, 2), 0f);
        if (hit && hit.CompareTag("Player")) Debug.Log("oyuncu icerde");
    }
}
`,
        },
        {
          name: "sketch.js",
          content: `let oyuncu, bolge;
function setup() {
  new Canvas(400, 240);
  world.gravity.y = 0;
  oyuncu = new Sprite(80, 120, 28, 28); oyuncu.color = "#3d7ea6";
  bolge = new Sprite(240, 120, 90, 90, "static");
  bolge.color = "rgba(90,158,111,0.3)"; bolge.text = "box";
}
function draw() {
  background(255);
  oyuncu.moveTowards(mouse, 0.15);
  fill(0); noStroke(); textSize(12);
  text(oyuncu.overlapping(bolge) ? "OverlapBox: icerde" : "OverlapBox: disarida", 10, 18);
}
`,
        }
      ],
    },
    u13: {
      title: "Rigidbody (3D PhysX) vs Rigidbody2D",
      libraries: ["p5play"],
      files: [
        {
          name: "RB3.cs",
          content: `using UnityEngine;
public class RB3 : MonoBehaviour {
    // 3D: Rigidbody + CapsuleCollider  →  PhysX, metre
    // 2D: Rigidbody2D + BoxCollider2D → Box2D soyu
    // ikisini ayni nesneye eklemeyin
    void FixedUpdate() {
        GetComponent<Rigidbody>().AddForce(Vector3.forward * 2f);
    }
}
`,
        },
        {
          name: "sketch.js",
          content: `function setup() {
  new Canvas(400, 240);
  world.gravity.y = 10;
  new Sprite(200, 228, 400, 24, "static").color = "#333";
  let a = new Sprite(140, 40, 24, 50); a.color = "#3d7ea6"; a.text = "2D";
  let b = new Sprite(260, 40, 24, 50); b.color = "#c45c78"; b.text = "3D?";
  b.collider = "none"; // 3D dunya bu tuvalde yok — resim duser gibi gorunmez
}
function draw() {
  background(255);
  fill(0); noStroke(); textSize(12);
  text("mavi 2D duser  ·  pembe none: 3D baska dunya", 10, 18);
}
`,
        }
      ],
    }
  },
});
