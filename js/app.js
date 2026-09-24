/**
 * Nature of Code Türkçe — kenar çubuğu, hash yönlendirme, canlı editörler.
 * Hash: #/bolum  veya  #/bolum/alt-baslik
 */
(function () {
  const ORDER = [
    { group: "Hazırlık", ids: ["ders", "js", "p5", "mat"] },
    {
      group: "Kitap",
      ids: [
        "giris",
        "ch0",
        "ch1",
        "ch2",
        "ch3",
        "ch4",
        "ch5",
        "ch6",
        "ch7",
        "ch8",
        "ch9",
        "ch10",
        "ch11",
      ],
    },
    { group: "Oyun fiziği", ids: ["p5play", "phaser", "matter", "unity", "motorlar"] },
    { group: "Ek", ids: ["sozluk", "kaynaklar"] },
  ];

  const contentEl = document.getElementById("lesson");
  const navEl = document.getElementById("nav-links");
  const titleEl = document.getElementById("page-title");

  let lastId = "ders";
  let renderedId = null;

  function slugify(text) {
    const map = { ş: "s", Ş: "s", ğ: "g", Ğ: "g", ü: "u", Ü: "u", ö: "o", Ö: "o", ç: "c", Ç: "c", ı: "i", İ: "i" };
    return String(text || "")
      .replace(/[şŞğĞüÜöÖçÇıİ]/g, (ch) => map[ch] || ch)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "bolum";
  }

  function headingList(html) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html || "";
    const items = [];
    const used = new Set();
    tmp.querySelectorAll("h2").forEach((h) => {
      if (h.closest(".hero-card")) return;
      let title = (h.textContent || "").replace(/\s+/g, " ").trim();
      if (!title) return;
      let id = h.id || slugify(title);
      let base = id;
      let n = 2;
      while (used.has(id)) id = base + "-" + n++;
      used.add(id);
      if (title.length > 44) title = title.slice(0, 42) + "…";
      items.push({ id, title });
    });
    return items;
  }

  function parseHash() {
    const hash = location.hash || "#/ders";
    if (!hash.startsWith("#/")) {
      return { id: lastId, sub: hash.replace(/^#/, "") };
    }
    const parts = hash.slice(2).split("/").filter(Boolean);
    const id = parts[0] || "ders";
    lastId = id;
    return { id, sub: parts.slice(1).join("/") };
  }

  function currentId() {
    return parseHash().id;
  }

  function buildNav() {
    navEl.innerHTML = ORDER.map((section) => {
      const blocks = section.ids
        .map((id) => {
          const ch = window.BOOK_CHAPTERS[id];
          if (!ch) return "";
          const toc = headingList(ch.html);
          const label = `${ch.icon || ""} <span>${ch.short || ch.title}</span>`;
          const main = `<a href="#/${id}" data-id="${id}" class="nav-chapter-link">${label}</a>`;
          if (!toc.length) {
            return `<div class="nav-chapter" data-chapter="${id}">${main}</div>`;
          }
          const subs = toc
            .map(
              (item) =>
                `<a href="#/${id}/${item.id}" data-id="${id}" data-sub="${item.id}" class="nav-sub">${item.title}</a>`
            )
            .join("");
          return `<div class="nav-chapter" data-chapter="${id}">
            <div class="nav-chapter-row">
              <button type="button" class="nav-twist" aria-expanded="false" aria-label="Alt başlıklar"></button>
              ${main}
            </div>
            <div class="nav-subs" hidden>${subs}</div>
          </div>`;
        })
        .join("");
      if (!blocks.trim()) return "";
      return `<div class="nav-group"><div class="nav-group-title">${section.group}</div>${blocks}</div>`;
    }).join("");

    navEl.querySelectorAll(".nav-twist").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const box = btn.closest(".nav-chapter");
        const open = box.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        const subs = box.querySelector(".nav-subs");
        if (subs) subs.hidden = !open;
      });
    });
  }

  function setActive(id, sub) {
    navEl.querySelectorAll(".nav-chapter-link").forEach((a) => {
      a.classList.toggle("active", a.dataset.id === id && !sub);
    });
    navEl.querySelectorAll(".nav-sub").forEach((a) => {
      a.classList.toggle("sub-active", a.dataset.id === id && a.dataset.sub === sub);
    });
    navEl.querySelectorAll(".nav-chapter").forEach((box) => {
      const mine = box.dataset.chapter === id;
      box.classList.toggle("is-current", mine);
      if (mine) {
        box.classList.add("is-open");
        const twist = box.querySelector(".nav-twist");
        const subs = box.querySelector(".nav-subs");
        if (twist) twist.setAttribute("aria-expanded", "true");
        if (subs) subs.hidden = false;
      }
    });
  }

  function applyHeadingIds(root, ch) {
    const planned = headingList(ch.html);
    let i = 0;
    root.querySelectorAll("h2").forEach((h) => {
      if (h.closest(".hero-card")) return;
      const item = planned[i++];
      if (item && !h.id) h.id = item.id;
    });
  }

  function rewriteInPageLinks(root, chapterId) {
    root.querySelectorAll('a[href^="#"]').forEach((a) => {
      const href = a.getAttribute("href") || "";
      if (href.startsWith("#/")) return;
      const sub = href.slice(1);
      if (!sub || sub.startsWith("http")) return;
      a.setAttribute("href", `#/${chapterId}/${sub}`);
    });
  }

  function scrollToSub(sub) {
    if (!sub) {
      contentEl.scrollTop = 0;
      return;
    }
    const el = document.getElementById(sub);
    if (!el) {
      contentEl.scrollTop = 0;
      return;
    }
    const top =
      el.getBoundingClientRect().top - contentEl.getBoundingClientRect().top + contentEl.scrollTop - 10;
    contentEl.scrollTo({ top, behavior: renderedId ? "smooth" : "auto" });
  }

  function wireQuizzes(root) {
    root.querySelectorAll(".quiz-box").forEach((box) => {
      box.querySelectorAll(".quiz-opt").forEach((btn) => {
        btn.addEventListener("click", () => {
          const correct = btn.dataset.correct === "true";
          box.querySelectorAll(".quiz-opt").forEach((b) => (b.disabled = true));
          btn.classList.add(correct ? "is-correct" : "is-wrong");
          const fb = box.querySelector(".quiz-feedback");
          fb.hidden = false;
          fb.textContent = correct
            ? "Doğru. " + (box.dataset.why || "")
            : "Bu değil. " + (box.dataset.why || "");
        });
      });
    });
  }

  function mountEditors(ch) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const host = entry.target;
          if (host.dataset.mounted) return;
          host.dataset.mounted = "1";
          io.unobserve(host);
          const id = host.dataset.editor;
          const cfg = ch.editors && ch.editors[id];
          if (!cfg) {
            host.innerHTML = `<p class="warn-inline">Editör bulunamadı: ${id}</p>`;
            return;
          }
          host.innerHTML = "";
          new LiveEditor(host, cfg);
        });
      },
      { root: contentEl, rootMargin: "240px 0px", threshold: 0.01 }
    );
    contentEl.querySelectorAll(".editor-host").forEach((host) => {
      host.innerHTML = `<p class="editor-placeholder">Kaydırınca örnek çalışır.</p>`;
      io.observe(host);
    });
  }

  function render() {
    const { id, sub } = parseHash();
    const ch = window.BOOK_CHAPTERS[id] || window.BOOK_CHAPTERS.ders;
    if (!ch) {
      contentEl.innerHTML = "<p>Bu bölüm henüz yüklenmedi.</p>";
      return;
    }
    titleEl.textContent = ch.title;
    document.title = ch.title + " · Nature of Code Türkçe";
    setActive(ch.id, sub);

    const orig = ch.original
      ? `<p class="src">
           <a href="${ch.original}" target="_blank" rel="noopener">Orijinal bölüm</a>
           ${ch.originalCode ? ` · <a href="${ch.originalCode}" target="_blank" rel="noopener">örnek kodlar</a>` : ""}
         </p>`
      : "";

    contentEl.innerHTML = `${orig}<article class="chapter">${ch.html}</article>`;
    applyHeadingIds(contentEl, ch);
    rewriteInPageLinks(contentEl, ch.id);
    wireQuizzes(contentEl);
    mountEditors(ch);
    renderedId = ch.id;
    requestAnimationFrame(() => {
      scrollToSub(sub);
      const active = navEl.querySelector("a.active, a.sub-active");
      if (active) active.scrollIntoView({ block: "nearest" });
    });
  }

  function initTheme() {
    const saved = localStorage.getItem("noc-theme") || "dark";
    document.documentElement.dataset.theme = saved;
    const btn = document.getElementById("theme-toggle");
    const sync = () => {
      btn.textContent = document.documentElement.dataset.theme === "dark" ? "☀️ Açık tema" : "🌙 Koyu tema";
    };
    sync();
    btn.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("noc-theme", next);
      sync();
    });
  }

  function initMobile() {
    const toggle = document.getElementById("menu-toggle");
    toggle.addEventListener("click", () => {
      document.getElementById("sidebar").classList.toggle("open");
    });
    navEl.addEventListener("click", (e) => {
      if (e.target.closest(".nav-twist")) return;
      if (e.target.closest("a")) document.getElementById("sidebar").classList.remove("open");
    });
  }

  window.addEventListener("hashchange", () => {
    const { id, sub } = parseHash();
    if (id === renderedId) {
      setActive(id, sub);
      scrollToSub(sub);
      return;
    }
    render();
  });
  document.addEventListener("DOMContentLoaded", () => {
    buildNav();
    initTheme();
    initMobile();
    render();
  });
})();
