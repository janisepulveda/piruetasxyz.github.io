const lang = localStorage.getItem('language') || 'en';
document.documentElement.setAttribute('lang', lang);

const langBtn = document.getElementById('lang-btn');
langBtn.innerText = lang === 'en' ? 'es' : 'en';

langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const next = document.documentElement.getAttribute('lang') === 'en' ? 'es' : 'en';
    document.documentElement.setAttribute('lang', next);
    localStorage.setItem('language', next);
    langBtn.innerText = next === 'en' ? 'es' : 'en';
});

window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.right').addEventListener('click', () => {
        const menu = document.getElementById('divLeftMenu');
        if (menu.classList.contains('active')) {
            setMenuOpen(false);
        }
    });
});