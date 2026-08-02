document.body.insertAdjacentHTML(
  'afterbegin',
  '<button id="menu-btn" class="boton-piruetas">menú</button>',
);
document.body.insertAdjacentHTML(
  'afterbegin',
  '<button id="lang-btn" class="boton-piruetas">es</button>',
);

document.body.insertAdjacentHTML(
  'beforeend',
  `
    <footer class="colophon-banner">
        <span class="es">piruetas xyz — hecho a mano con html, css y js.</span>
        <span class="en">piruetas xyz — handmade with html, css and js.</span>
    </footer>
`,
);

const navbarContent = `
    <h1><a href="/index.html">inicio</a></h1>
    <h1><a href="/proyectos/index.html">proyectos</a></h1>

    <h1>
        <a href="https://piruetas.xyz/tienda">
            <span class="es">tienda</span><span class="en">shop</span>
        </a>
    </h1>

    <h1><a href="/personas/index.html"><span class="es">personas</span><span class="en">people</span></a></h1>
    <h1><a href="/clientes/index.html"><span class="es">clientes</span><span class="en">clients</span></a></h1>
    
    <hr style="border: 0; border-top: 1px solid black; margin: 20px 0;">
    
    <h3 class="es">popusintes</h3><h3 class="en">popusynths</h3>
    <ol>
        <li><a href="/proyectos/parla/index.html">parla</a> (2025)</li>
        <li><a href="/proyectos/osca/index.html">osca</a> (soon)</li>
    </ol>

    <h3>software</h3>
    <ol>
        <li><a href="/proyectos/redondela/index.html">redondela</a></li>
    </ol>

    <h3>hardware</h3>
    <ol>
        <li><a href="/proyectos/gerassic-organ/index.html">gerassic organ</a></li>
    </ol>

    <h3 class="es">enseñanza</h3><h3 class="en">teaching</h3>
    <ol>
        <li><a href="/proyectos/talleres-momentos/index.html">talleres momentos</a> (2023)</li>
    </ol>
`;

document.getElementById('divLeftMenu').innerHTML = navbarContent;

const menuBtn = document.getElementById('menu-btn');
const menuSide = document.getElementById('divLeftMenu');

window.setMenuOpen = function (isOpen) {
  menuSide.classList.toggle('active', isOpen);
  menuBtn.innerText = isOpen ? 'cerrar' : 'menú';
  localStorage.setItem('menuOpen', isOpen ? 'true' : 'false');
};

setMenuOpen(localStorage.getItem('menuOpen') === 'true');

menuBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  setMenuOpen(!menuSide.classList.contains('active'));
});
