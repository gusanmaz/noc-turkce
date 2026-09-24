/**
 * Canlı p5.js / p5.play / Phaser editörü.
 * C# ve GDScript sekmeleri boyanır; tarayıcıda derlenmez.
 */
class LiveEditor {
  constructor(container, config) {
    this.container = typeof container === "string"
      ? document.querySelector(container)
      : container;
    if (!this.container) return;

    this.config = {
      files: config.files || [{ name: "sketch.js", content: "" }],
      libraries: config.libraries || ["p5"],
      original: config.original || null,
      title: config.title || "",
      extra: !!config.extra,
      ...config,
    };
    this.currentFileIndex = 0;
    this.originalFiles = JSON.parse(JSON.stringify(this.config.files));
    this.init();
  }

  analogFile() {
    return (this.config.files || []).find((f) =>
      /\.(cs|gd|py|cpp|c|h)$/i.test(f.name || "")
    );
  }

  langFromName(name) {
    const n = name || "";
    if (/\.cs$/i.test(n)) return "cs";
    if (/\.gd$/i.test(n)) return "gd";
    if (/\.py$/i.test(n)) return "py";
    if (/\.(c|h|cpp)$/i.test(n)) return "c";
    return "js";
  }

  analogBannerText() {
    if (this.config.analog) return this.config.analog;
    const f = this.analogFile();
    if (!f) return "";
    if (/\.cs$/i.test(f.name)) {
      return "Soldaki C# Unity’de derlenir; bu tarayıcı C# çalıştırmaz. Sağdaki tuval aynı Newton fikrinin p5.play resmidir — Inspector, FixedUpdate ve fizik malzemesi burada yoktur.";
    }
    if (/\.gd$/i.test(f.name)) {
      return "Soldaki GDScript Godot’ta çalışır; bu tarayıcı Godot değildir. Sağdaki tuval CharacterBody / RigidBody fikrinin p5.play resmidir — move_and_slide burada yoktur.";
    }
    if (/\.py$/i.test(f.name)) {
      return "Soldaki Python bu tarayıcıda çalışmaz. Sağdaki tuval aynı fikrin p5.js / p5.play resmidir — Pymunk veya pyp5js değildir.";
    }
    if (/\.(c|h|cpp)$/i.test(f.name)) {
      return "Soldaki C raylib / Box2D’dir; bu tarayıcı derlemez. Sağdaki tuval InitWindow / while döngüsünün p5.js resmidir — raylib Unity değildir.";
    }
    return "Soldaki dosya bu tarayıcıda derlenmez. Sağdaki tuval yalnızca fikrin p5.js / p5.play resmidir.";
  }

  init() {
    this.render();
    this.attachEventListeners();
    this.updateEditor();
    this.runCode();
  }

  render() {
    const tabsHTML = this.config.files
      .map(
        (file, index) =>
          `<button class="editor-tab ${index === 0 ? "active" : ""}" data-index="${index}">${file.name}</button>`
      )
      .join("");

    const links = this.config.original
      ? [
          this.config.original.book
            ? `<a href="${this.config.original.book}" target="_blank" rel="noopener">Kitap</a>`
            : "",
          this.config.original.github
            ? `<a href="${this.config.original.github}" target="_blank" rel="noopener">Kod</a>`
            : "",
        ]
          .filter(Boolean)
          .join(" · ")
      : "";

    const bar = `
      <div class="editor-original-bar">
        <strong>${this.config.title || "Örnek"}</strong>
        ${links ? `<span class="editor-original-links">${links}</span>` : ""}
      </div>`;

    const analog = this.analogFile();
    let libLabel = this.config.libraries.includes("p5play")
      ? "p5.play"
      : this.config.libraries.includes("phaser")
        ? "Phaser"
        : this.config.libraries.includes("matter")
          ? "p5.js + Matter.js"
          : this.config.libraries.includes("ml5")
            ? "p5.js + ml5.js"
            : "p5.js";
    if (analog) {
      if (/\.cs$/i.test(analog.name)) libLabel = "p5.play analog · Unity değil";
      else if (/\.gd$/i.test(analog.name)) libLabel = "p5.play analog · Godot değil";
      else if (/\.py$/i.test(analog.name)) libLabel = "analog · Python çalışmaz";
      else if (/\.(c|h|cpp)$/i.test(analog.name)) libLabel = "analog · C / raylib değil";
      else libLabel = "p5.play analog";
    }

    const banner = analog
      ? `<div class="analog-banner">${this.analogBannerText()}</div>`
      : "";

    this.container.innerHTML = `
      <div class="live-editor">
        ${bar}
        <div class="editor-header">
          <div class="editor-tabs">${tabsHTML}</div>
          <div class="editor-actions">
            <button class="editor-btn btn-run" title="Çalıştır (Ctrl+Enter)">▶ Çalıştır</button>
            <button class="editor-btn btn-reset" title="Sıfırla">↻ Sıfırla</button>
          </div>
        </div>
        ${banner}
        <div class="editor-body">
          <div class="code-panel">
            <div class="code-wrapper">
              <div class="line-numbers"></div>
              <div class="code-editor">
                <pre class="code-highlight" aria-hidden="true"><code></code></pre>
                <textarea spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off"></textarea>
              </div>
            </div>
          </div>
          <div class="preview-panel">
            <div class="preview-header">Önizleme · ${libLabel}</div>
            <div class="preview-canvas">
              <iframe sandbox="allow-scripts allow-same-origin" title="önizleme"></iframe>
            </div>
          </div>
        </div>
        <div class="editor-console" hidden></div>
      </div>`;

    this.tabs = this.container.querySelectorAll(".editor-tab");
    this.textarea = this.container.querySelector("textarea");
    this.highlightCode = this.container.querySelector(".code-highlight code");
    this.lineNumbers = this.container.querySelector(".line-numbers");
    this.iframe = this.container.querySelector("iframe");
    this.runBtn = this.container.querySelector(".btn-run");
    this.resetBtn = this.container.querySelector(".btn-reset");
    this.consoleEl = this.container.querySelector(".editor-console");
    this.codeWrapper = this.container.querySelector(".code-wrapper");
    this.previewCanvas = this.container.querySelector(".preview-canvas");
    this.loadFile(0);
  }

  attachEventListeners() {
    this.tabs.forEach((tab) => {
      tab.addEventListener("click", () => this.switchTab(parseInt(tab.dataset.index, 10)));
    });

    this.textarea.addEventListener("input", () => {
      this.saveCurrentFile();
      this.updateEditor();
    });

    this.textarea.addEventListener("scroll", () => {
      this.lineNumbers.scrollTop = this.textarea.scrollTop;
      this.highlightCode.style.transform = `translate(${-this.textarea.scrollLeft}px, ${-this.textarea.scrollTop}px)`;
    });

    this.textarea.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const value = this.textarea.value;
        this.textarea.value = value.substring(0, start) + "  " + value.substring(end);
        this.textarea.selectionStart = this.textarea.selectionEnd = start + 2;
        this.saveCurrentFile();
        this.updateEditor();
      }
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.runCode();
      }
    });

    this.runBtn.addEventListener("click", () => this.runCode());
    this.resetBtn.addEventListener("click", () => this.resetCode());

    window.addEventListener("message", (event) => {
      if (!event.data || event.data.type !== "noc-error") return;
      if (this.consoleEl) {
        this.consoleEl.hidden = false;
        this.consoleEl.textContent =
          "Hata" + (event.data.line ? ` (satır ${event.data.line})` : "") + ": " + event.data.msg;
      }
    });
  }

  loadFile(index) {
    this.currentFileIndex = index;
    this.textarea.value = this.config.files[index].content;
    this.updateEditor();
  }

  saveCurrentFile() {
    this.config.files[this.currentFileIndex].content = this.textarea.value;
  }

  switchTab(index) {
    this.saveCurrentFile();
    this.tabs.forEach((tab, i) => tab.classList.toggle("active", i === index));
    this.loadFile(index);
  }

  updateEditor() {
    const lines = this.textarea.value.split("\n");
    this.lineNumbers.innerHTML = lines.map((_, i) => `<span>${i + 1}</span>`).join("");
    const name = (this.config.files[this.currentFileIndex] || {}).name || "";
    this.highlightCode.innerHTML = this.highlightSyntax(this.textarea.value, this.langFromName(name));
    this.fitHeight(lines.length);
  }

  fitHeight(lineCount) {
    if (!this.codeWrapper) return;
    const line = 14 * 1.55;
    const pad = 28;
    const needed = Math.ceil(pad + Math.max(lineCount, 1) * line + 8);
    const minH = 168;
    const maxH = 820;
    const minPreview = 248;
    const h = Math.min(maxH, Math.max(minH, needed));
    this.codeWrapper.style.height = h + "px";
    this.codeWrapper.style.overflow = "hidden";
    if (this.previewCanvas) this.previewCanvas.style.minHeight = Math.max(h, minPreview) + "px";
    const overflows = needed > maxH;
    const longLine = this.textarea.value.split("\n").some((l) => l.length > 68);
    this.textarea.style.overflowY = overflows ? "auto" : "hidden";
    this.textarea.style.overflowX = longLine ? "auto" : "hidden";
    if (this.lineNumbers) this.lineNumbers.style.overflow = "hidden";
  }

  highlightSyntax(code, lang) {
    lang = lang || "js";
    let escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const placeholders = [];
    const stash = (match, kind) => {
      const placeholder = `___PH_${placeholders.length}___`;
      placeholders.push(`<span class="${kind}">${match}</span>`);
      return placeholder;
    };
    if (lang === "gd" || lang === "py") {
      escaped = escaped.replace(/(#.*$|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/gm, (match) =>
        stash(match, match.startsWith("#") ? "hl-comment" : "hl-string")
      );
    } else {
      escaped = escaped.replace(
        /(\/\/.*$|\/\*[\s\S]*?\*\/|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/gm,
        (match) =>
          stash(match, match.startsWith("//") || match.startsWith("/*") ? "hl-comment" : "hl-string")
      );
    }

    const keywords = {
      js: "let|const|var|function|class|constructor|return|if|else|for|while|new|this|true|false|null|undefined|extends|static|get|set|async|await|try|catch|throw|of|in",
      cs: "using|namespace|public|private|protected|internal|class|void|float|int|bool|string|new|if|else|for|while|return|this|true|false|null|override|virtual|static|get|set|var|is|as|in|out|ref|try|catch|throw|typeof|interface|enum|struct|where|when|async|await|base|sealed|abstract|readonly|const",
      gd: "extends|class_name|func|var|const|signal|export|if|elif|else|for|while|return|pass|and|or|not|true|false|null|self|is|in|preload|onready|tool|enum|match|break|continue|class",
      py: "def|class|return|if|elif|else|for|while|import|from|as|True|False|None|pass|try|except|yield|lambda|with|and|or|not|in|is|break|continue|global|nonlocal|async|await",
      c: "int|float|void|char|const|return|if|else|for|while|struct|typedef|include|define|true|false|NULL|static|unsigned|bool|while",
    }[lang] || "let|const|var|function|class|return|if|else";

    escaped = escaped.replace(new RegExp("\\b(" + keywords + ")\\b", "g"), '<span class="hl-keyword">$1</span>');

    if (lang === "js") {
      escaped = escaped.replace(
        /\b(setup|draw|preload|createCanvas|background|fill|stroke|strokeWeight|noStroke|noFill|circle|ellipse|rect|line|point|triangle|quad|arc|square|beginShape|endShape|vertex|push|pop|translate|rotate|scale|createVector|random|noise|map|constrain|dist|lerp|abs|floor|ceil|round|sqrt|pow|sin|cos|tan|atan2|PI|TWO_PI|HALF_PI|width|height|mouseX|mouseY|mouseIsPressed|keyIsPressed|key|keyCode|frameCount|frameRate|millis|text|textSize|textAlign|CENTER|LEFT|RIGHT|color|image|loadImage|Sprite|Group|kb|world|Phaser|Game)\b/g,
        '<span class="hl-function">$1</span>'
      );
    } else if (lang === "cs") {
      escaped = escaped.replace(
        /\b(MonoBehaviour|Rigidbody2D|Rigidbody|Collider2D|BoxCollider2D|CircleCollider2D|Transform|Vector2|Vector3|GameObject|Debug|SerializeField|ForceMode2D|Physics2D|RaycastHit2D|DistanceJoint2D|HingeJoint2D|Start|Update|FixedUpdate|OnCollisionEnter2D|OnTriggerEnter2D|GetComponent|AddComponent|AddForce|Instantiate)\b/g,
        '<span class="hl-function">$1</span>'
      );
    } else if (lang === "gd") {
      escaped = escaped.replace(
        /\b(CharacterBody2D|RigidBody2D|StaticBody2D|Area2D|CollisionShape2D|move_and_slide|move_and_collide|is_on_floor|apply_impulse|apply_force|Input|Vector2|_ready|_physics_process|_process|_integrate_forces)\b/g,
        '<span class="hl-function">$1</span>'
      );
    } else if (lang === "py") {
      escaped = escaped.replace(
        /\b(pymunk|pygame|Space|Body|Poly|Circle|Segment|moment_for_box|print|range|createCanvas|background|circle|setup|draw)\b/g,
        '<span class="hl-function">$1</span>'
      );
    } else if (lang === "c") {
      escaped = escaped.replace(
        /\b(InitWindow|CloseWindow|BeginDrawing|EndDrawing|DrawCircle|ClearBackground|WindowShouldClose|Vector2|InitPhysics|CreatePhysicsBodyCircle)\b/g,
        '<span class="hl-function">$1</span>'
      );
    }

    escaped = escaped.replace(/\b(\d+\.?\d*)\b/g, '<span class="hl-number">$1</span>');
    escaped = escaped.replace(/\.(\w+)\s*\(/g, '.<span class="hl-method">$1</span>(');
    placeholders.forEach((value, index) => {
      escaped = escaped.replace(`___PH_${index}___`, value);
    });
    return escaped + "\n\n";
  }

  runCode() {
    this.saveCurrentFile();
    let combinedCode = "";
    const ordered = [...this.config.files].sort((a, b) => {
      if (a.name === "sketch.js") return 1;
      if (b.name === "sketch.js") return -1;
      return 0;
    });
    ordered.forEach((file) => {
      const n = file.name || "";
      if (!/\.(js|mjs)$/i.test(n) && n !== "sketch.js") return;
      combinedCode += "\n// === " + file.name + " ===\n" + file.content + "\n";
    });
    combinedCode = combinedCode.replace(/<\/script/gi, "<\\/script");

    const usePlay = this.config.libraries.includes("p5play");
    const usePhaser = this.config.libraries.includes("phaser");
    const useMatter = this.config.libraries.includes("matter");
    const useMl5 = this.config.libraries.includes("ml5");
    let libs = "";
    if (usePhaser) {
      libs =
        '<script src="https://cdn.jsdelivr.net/npm/phaser@3.80.1/dist/phaser.min.js" crossorigin="anonymous"><\/script>';
    } else if (usePlay) {
      libs =
        '<script src="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.min.js" crossorigin="anonymous"><\/script>\n' +
        '<script src="https://p5play.org/v3/planck.min.js" crossorigin="anonymous"><\/script>\n' +
        '<script src="https://p5play.org/v3/p5play.js" crossorigin="anonymous"><\/script>';
    } else {
      libs =
        '<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js" crossorigin="anonymous"><\/script>';
      if (useMatter) {
        libs +=
          '<script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js" crossorigin="anonymous"><\/script>';
      }
    }
    if (useMl5) {
      libs += '<script src="https://unpkg.com/ml5@1/dist/ml5.min.js" crossorigin="anonymous"><\/script>';
    }

    const phaserWrap = usePhaser
      ? [
          "if (typeof Phaser !== 'undefined') {",
          "  const _PG = Phaser.Game;",
          "  Phaser.Game = function(cfg) {",
          "    if (cfg && cfg.scene && typeof cfg.scene.create === 'function') {",
          "      const _c = cfg.scene.create;",
          "      cfg.scene.create = function() {",
          "        try { return _c.apply(this, arguments); }",
          "        catch(e) {",
          "          document.body.innerHTML='<div id=\"err\">Hata: '+e.message+'</div>';",
          "          parent.postMessage({type:'noc-error',msg:e.message},'*');",
          "        }",
          "      };",
          "    }",
          "    return new _PG(cfg);",
          "  };",
          "}",
        ].join("\n")
      : "";

    const p5Wrap = usePhaser
      ? ""
      : [
          "if (typeof setup === 'function') {",
          "  const _setup = setup;",
          "  setup = function () { pixelDensity(1); _setup.apply(this, arguments); };",
          "}",
        ].join("\n");

    const html = [
      "<!DOCTYPE html><html><head>",
      libs,
      "<style>",
      "html,body{margin:0;padding:0;overflow:hidden;display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:#e8e8e8;font-family:sans-serif;}",
      "canvas{display:block;max-width:100%;height:auto;}",
      "#err{color:#b91c1c;padding:12px;font:13px/1.45 ui-monospace,monospace;white-space:pre-wrap;}",
      "</style></head><body><script>",
      "window.onerror=function(msg,url,line){",
      "  document.body.innerHTML='<div id=\"err\">Hata (satır '+line+'):\\n'+msg+'</div>';",
      "  parent.postMessage({type:'noc-error',msg:String(msg),line:line},'*');",
      "  return true;",
      "};",
      "try {",
      phaserWrap,
      combinedCode,
      p5Wrap,
      "} catch(e) {",
      "  document.body.innerHTML='<div id=\"err\">Hata: '+e.message+'</div>';",
      "  parent.postMessage({type:'noc-error',msg:e.message},'*');",
      "}",
      "<\/script></body></html>",
    ].join("\n");

    if (this.consoleEl) {
      this.consoleEl.hidden = true;
      this.consoleEl.textContent = "";
    }
    this.iframe.srcdoc = html;
  }

  resetCode() {
    this.config.files = JSON.parse(JSON.stringify(this.originalFiles));
    this.loadFile(this.currentFileIndex);
    this.runCode();
  }
}

window.LiveEditor = LiveEditor;
