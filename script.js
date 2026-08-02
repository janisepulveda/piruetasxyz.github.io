const lang = localStorage.getItem('language') || 'en';
document.documentElement.setAttribute('lang', lang);

const langBtn = document.getElementById('lang-btn');
const langSpans = langBtn.querySelectorAll('[data-lang]');

function updateLangBtn(current) {
    langSpans.forEach((span) => {
        span.classList.toggle('lang-active', span.dataset.lang === current);
    });
}

updateLangBtn(lang);

langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const next = document.documentElement.getAttribute('lang') === 'en' ? 'es' : 'en';
    document.documentElement.setAttribute('lang', next);
    localStorage.setItem('language', next);
    updateLangBtn(next);
});

window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.right').addEventListener('click', () => {
        const menu = document.getElementById('divLeftMenu');
        if (menu.classList.contains('active')) {
            setMenuOpen(false);
        }
    });
});