/**
 * Theme Controller
 * Dark/Light tema yönetimi
 */

(function() {
    // DOM yüklenmeden önce tema uygula (flash önleme)
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('.theme-icon');

    // Mevcut temayı al
    function getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'dark';
    }

    // İkonu güncelle
    function updateIcon(theme) {
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
        }
    }

    // Temayı değiştir
    function toggleTheme() {
        const currentTheme = getCurrentTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    }

    // Başlangıç ikonu
    updateIcon(getCurrentTheme());

    // Event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});

