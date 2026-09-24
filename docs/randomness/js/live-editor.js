/**
 * Live Code Editor Component
 * Çoklu dosya destekli, çalıştırılabilir p5.js editörü
 * Syntax highlighting ile
 */

class LiveEditor {
    constructor(container, config) {
        this.container = typeof container === 'string'
            ? document.querySelector(container)
            : container;

        if (!this.container) {
            console.error('LiveEditor: Container bulunamadı');
            return;
        }

        this.config = {
            files: config.files || [{ name: 'sketch.js', content: '' }],
            canvasWidth: config.canvasWidth || 400,
            canvasHeight: config.canvasHeight || 400,
            ...config
        };

        this.currentFileIndex = 0;
        this.originalFiles = JSON.parse(JSON.stringify(this.config.files));

        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
        this.updateEditor();
        this.runCode();
    }

    render() {
        const tabsHTML = this.config.files.map((file, index) => `
            <button class="editor-tab ${index === 0 ? 'active' : ''}" data-index="${index}">
                ${file.name}
            </button>
        `).join('');

        this.container.innerHTML = `
            <div class="live-editor">
                <div class="editor-header">
                    <div class="editor-tabs">
                        ${tabsHTML}
                    </div>
                    <div class="editor-actions">
                        <button class="editor-btn btn-run" title="Çalıştır (Ctrl+Enter)">
                            <span>▶</span> Çalıştır
                        </button>
                        <button class="editor-btn btn-reset" title="Sıfırla">
                            <span>↻</span> Sıfırla
                        </button>
                    </div>
                </div>
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
                        <div class="preview-header">Önizleme</div>
                        <div class="preview-canvas">
                            <iframe sandbox="allow-scripts allow-same-origin"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Element referansları
        this.tabs = this.container.querySelectorAll('.editor-tab');
        this.textarea = this.container.querySelector('textarea');
        this.highlightCode = this.container.querySelector('.code-highlight code');
        this.lineNumbers = this.container.querySelector('.line-numbers');
        this.iframe = this.container.querySelector('iframe');
        this.runBtn = this.container.querySelector('.btn-run');
        this.resetBtn = this.container.querySelector('.btn-reset');

        // İlk dosyayı yükle
        this.loadFile(0);
    }

    attachEventListeners() {
        // Tab değiştirme
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const index = parseInt(tab.dataset.index);
                this.switchTab(index);
            });
        });

        // Textarea değişiklik
        this.textarea.addEventListener('input', () => {
            this.saveCurrentFile();
            this.updateEditor();
        });

        // Scroll senkronizasyonu - textarea scroll olunca diğerleri de takip etsin
        this.textarea.addEventListener('scroll', () => {
            const scrollTop = this.textarea.scrollTop;
            const scrollLeft = this.textarea.scrollLeft;

            // Line numbers sadece dikey scroll
            this.lineNumbers.scrollTop = scrollTop;

            // Highlight layer - transform ile kaydır (daha performanslı)
            this.highlightCode.style.transform = `translate(${-scrollLeft}px, ${-scrollTop}px)`;
        });

        // Tab tuşu
        this.textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = this.textarea.selectionStart;
                const end = this.textarea.selectionEnd;
                const value = this.textarea.value;

                this.textarea.value = value.substring(0, start) + '  ' + value.substring(end);
                this.textarea.selectionStart = this.textarea.selectionEnd = start + 2;
                this.saveCurrentFile();
                this.updateEditor();
            }

            // Ctrl+Enter ile çalıştır
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                this.runCode();
            }
        });

        // Butonlar
        this.runBtn.addEventListener('click', () => this.runCode());
        this.resetBtn.addEventListener('click', () => this.resetCode());
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
        // Mevcut dosyayı kaydet
        this.saveCurrentFile();

        // Tab'ları güncelle
        this.tabs.forEach((tab, i) => {
            tab.classList.toggle('active', i === index);
        });

        // Yeni dosyayı yükle
        this.loadFile(index);
    }

    updateEditor() {
        // Satır numaralarını güncelle
        const lines = this.textarea.value.split('\n');
        // Extra boş satırlar ekle - scroll için
        const lineNumbersHTML = lines.map((_, i) =>
            `<span>${i + 1}</span>`
        ).join('') + '<span></span><span></span><span></span>';
        this.lineNumbers.innerHTML = lineNumbersHTML;

        // Syntax highlighting uygula
        this.highlightCode.innerHTML = this.highlightSyntax(this.textarea.value);
    }

    highlightSyntax(code) {
        // HTML escape
        let escaped = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // Token-based highlighting (daha güvenilir)
        // Önce stringleri ve yorumları korumak için placeholder kullan
        const placeholders = [];
        let placeholderIndex = 0;

        // Strings ve comments'i placeholder ile değiştir
        escaped = escaped.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/gm, (match) => {
            const placeholder = `___PLACEHOLDER_${placeholderIndex}___`;
            const isComment = match.startsWith('//') || match.startsWith('/*');
            const className = isComment ? 'hl-comment' : 'hl-string';
            placeholders.push(`<span class="${className}">${match}</span>`);
            placeholderIndex++;
            return placeholder;
        });

        // Keywords
        escaped = escaped.replace(/\b(let|const|var|function|class|constructor|return|if|else|for|while|new|this|true|false|null|undefined|extends|static|get|set|async|await|try|catch|throw)\b/g,
            '<span class="hl-keyword">$1</span>');

        // p5.js functions
        escaped = escaped.replace(/\b(setup|draw|createCanvas|background|fill|stroke|strokeWeight|noStroke|noFill|circle|ellipse|rect|line|point|triangle|quad|arc|beginShape|endShape|vertex|push|pop|translate|rotate|scale|createVector|random|noise|map|constrain|dist|lerp|abs|floor|ceil|round|sqrt|pow|sin|cos|tan|atan2|PI|TWO_PI|HALF_PI|width|height|mouseX|mouseY|mouseIsPressed|keyIsPressed|key|keyCode|frameCount|frameRate|millis|text|textSize|textAlign|color|lerpColor|red|green|blue|alpha|image|loadImage|createGraphics|resizeCanvas|windowWidth|windowHeight)\b/g,
            '<span class="hl-function">$1</span>');

        // Numbers
        escaped = escaped.replace(/\b(\d+\.?\d*)\b/g, '<span class="hl-number">$1</span>');

        // Method calls (.methodName()
        escaped = escaped.replace(/\.(\w+)\s*\(/g, '.<span class="hl-method">$1</span>(');

        // Placeholders'ı geri koy
        placeholders.forEach((value, index) => {
            escaped = escaped.replace(`___PLACEHOLDER_${index}___`, value);
        });

        // Extra satırlar ekle - son satırların kesilmemesi için
        return escaped + '\n\n\n';
    }

    runCode() {
        // Mevcut dosyayı kaydet
        this.saveCurrentFile();

        // Tüm dosyaları birleştir
        let combinedCode = '';

        // Önce class dosyalarını ekle (sketch.js en sonda olmalı)
        const orderedFiles = [...this.config.files].sort((a, b) => {
            if (a.name === 'sketch.js') return 1;
            if (b.name === 'sketch.js') return -1;
            return 0;
        });

        orderedFiles.forEach(file => {
            combinedCode += `// === ${file.name} ===\n${file.content}\n\n`;
        });

        // HTML şablonu
        const html = `
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
    <style>
        body { margin: 0; padding: 0; overflow: hidden; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #f0f0f0; }
        canvas { display: block; }
    </style>
</head>
<body>
    <script>
        // Hata yakalama
        window.onerror = function(msg, url, line, col, error) {
            console.error('Hata:', msg, 'Satır:', line);
            return true;
        };
        
        try {
            ${combinedCode}
        } catch(e) {
            console.error('Hata:', e.message);
        }
    </script>
</body>
</html>`;

        // iframe'i güncelle
        this.iframe.srcdoc = html;
    }

    resetCode() {
        this.config.files = JSON.parse(JSON.stringify(this.originalFiles));
        this.loadFile(this.currentFileIndex);
        this.runCode();
    }
}

// Global erişim için
window.LiveEditor = LiveEditor;

