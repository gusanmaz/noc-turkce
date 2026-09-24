/**
 * Web kitabı yardımcıları — görsel, orijinal link, editör yuvası.
 */
(function () {
  const IMG =
    "https://raw.githubusercontent.com/nature-of-code/noc-book-2/main/content/images";
  const GH_IMG =
    "https://github.com/nature-of-code/noc-book-2/blob/main/content/images";
  const GH_EX =
    "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples";

  window.N = {
    img(folder, file, caption) {
      const src = `${IMG}/${folder}/${file}`;
      const gh = `${GH_IMG}/${folder}/${file}`;
      return `<figure class="noc-figure">
        <a href="${gh}" target="_blank" rel="noopener" title="Orijinal görseli GitHub'da aç">
          <img src="${src}" alt="${escapeAttr(caption)}" loading="lazy">
        </a>
        <figcaption>${caption} · <a href="${gh}" target="_blank" rel="noopener">orijinal görsel</a></figcaption>
      </figure>`;
    },

    orig(url, label) {
      return `<p class="src"><a href="${url}" target="_blank" rel="noopener">${label || "Orijinal metin"}</a></p>`;
    },

    editor(id) {
      return `<div class="editor-host" data-editor="${id}"></div>`;
    },

    ex(path) {
      return `${GH_EX}/${path}`;
    },

    note(title, body) {
      return box("note", title, body);
    },
    tip(title, body) {
      return box("tip", title, body);
    },
    warn(title, body) {
      return box("warn", title, body);
    },
    extra(title, body) {
      return box("note", title, body);
    },
    resources(items) {
      const lis = items
        .map((it) => {
          const kind = it.kind ? `<span class="res-kind">${it.kind}</span>` : "";
          const note = it.note ? `<span class="res-note"> — ${it.note}</span>` : "";
          return `<li>${kind}<a href="${it.url}" target="_blank" rel="noopener">${it.title}</a>${note}</li>`;
        })
        .join("");
      return `<section class="resources"><h3>Kaynaklar</h3><ul>${lis}</ul></section>`;
    },
    math(formula, desc) {
      return `<div class="formula-box"><div class="formula">${formula}</div>${
        desc ? `<p class="formula-desc">${desc}</p>` : ""
      }</div>`;
    },
    sqrt(inner) {
      return `<span class="sqrt"><span class="sqrt-sign" aria-hidden="true">√</span><span class="sqrt-body">${inner}</span></span>`;
    },
    tryit(items) {
      const lis = items
        .map((item) => `<li><strong>${item.do}</strong> <span class="expectation">${item.expect || ""}</span></li>`)
        .join("");
      return `<div class="try-box"><h4>Deneyin</h4><ol>${lis}</ol></div>`;
    },
    quiz(question, options, answerIndex, why) {
      const opts = options
        .map(
          (o, i) =>
            `<button type="button" class="quiz-opt" data-correct="${i === answerIndex}">${o}</button>`
        )
        .join("");
      return `<div class="quiz-box" data-why="${escapeAttr(why || "")}">
        <h4>Soru</h4><p>${question}</p><div class="quiz-opts">${opts}</div>
        <p class="quiz-feedback" hidden></p>
      </div>`;
    },
  };

  window.registerChapter = function (ch) {
    window.BOOK_CHAPTERS = window.BOOK_CHAPTERS || {};
    window.BOOK_CHAPTERS[ch.id] = ch;
  };

  function box(kind, title, body) {
    return `<aside class="info-box ${kind}"><h4>${title}</h4><div>${body}</div></aside>`;
  }

  function escapeAttr(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");
  }
})();
