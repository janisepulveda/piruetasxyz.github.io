# piruetasxyz.github.io

## Acerca de

Página web programada con HTML, CSS y JS.

Alojada en GitHub Pages.

## Cómo se genera el sitio

El contenido de cada página (títulos, secciones, galerías, fichas
técnicas, tarjetas de personas y de proyectos) vive en YAML bajo
`datos/` y se hornea directo en el HTML en tiempo de build, con los
scripts `scripts/generar-*.js` (que usan las plantillas compartidas en
`scripts/lib/plantillas-sitio.js`). Cada script corre solo vía GitHub
Actions (`.github/workflows/generar-*.yml`) cada vez que se sube un
cambio a su YAML correspondiente, y commitea el HTML generado de
vuelta al repositorio.

Antes el sitio hacía esto en el navegador (`js/render.js` hacía
`fetch` del YAML y armaba el DOM al cargar cada página), pero eso
dejaba las páginas vacías para cualquier herramienta que no ejecutara
JS o no esperara ese `fetch` — en particular, para exportar el sitio a
PDF. Ahora el HTML ya trae el contenido puesto, y el JS que queda
(`js/nav.js`, `js/script.js`, `js/visor-3d.js`,
`js/proyectos-hero.js`) es solo mejoras progresivas (menú, toggle de
idioma, visor 3D, rotación del hero de proyectos), no lo que pone el
contenido ahí.

Para regenerar todo a mano:

```sh
node scripts/generar-proyectos.js
node scripts/generar-clientes.js
node scripts/generar-personas.js
```

## Imágenes laterales (placas, esquemáticos)

Las páginas de proyectos pueden traer una columna de imágenes al lado
del texto. Se definen en `datos/datos.yaml` con `imagenes_laterales`,
y `generar-proyectos.js` las hornea en orden, cada una enlazada a su
archivo para verla en tamaño completo:

```yaml
chufebu:
  imagenes_laterales:
    - image: '/media/proyectos/chufebu-placa.svg'
      alt:
        es: 'placa de chufebu v0.1 rev-a'
        en: 'chufebu v0.1 rev-a board'
    - image: '/media/proyectos/chufebu-esquematico.svg'
      alt:
        es: 'esquemático de chufebu v0.1 rev-a'
        en: 'chufebu v0.1 rev-a schematic'
```

Si no hay `imagenes_laterales`, se usa `hero` como única imagen. Si
no hay ninguna de las dos, la imagen lateral puesta a mano en el HTML
queda como está. El HTML de la página tiene que traer un
`<div class="proyecto-item">` para que el generador lo reemplace.

## Preview en redes sociales

Cada página trae sus meta tags Open Graph / Twitter Card horneados
(ver `renderizarMetaHead` en `scripts/lib/plantillas-sitio.js`). La
imagen del preview se elige así:

1. `imagen_social` de la entrada en el YAML, si existe.
2. si no, la primera de `imagenes_laterales` (o `hero.image`).
3. si no, la primera imagen de `galeria`.
4. si no hay ninguna, el logo (`/media/piruetas-v0.jpg`), con tarjeta
   chica (`summary`) porque es cuadrado.

Los SVG se saltan porque WhatsApp, Facebook, X y LinkedIn no los
muestran. Para esos casos, o cuando la foto es muy pesada o vertical,
conviene hacer una versión de 1200×628 px en JPG, de menos de ~400 KB.
Como todas las imágenes, va en el repositorio
[piruetas-web-media](https://github.com/piruetasxyz/piruetas-web-media),
no en este: `AAAA-cliente-proyecto/jpg/preview-redes-sociales.jpg`, y
`imagen_social` apunta a ella vía jsDelivr, por ejemplo:

```yaml
imagen_social: 'https://cdn.jsdelivr.net/gh/piruetasxyz/piruetas-web-media@main/2026-piruetas-chufebu/jpg/preview-redes-sociales.jpg'
```

Se usa el `.jpg` y no el `.webp` porque algunas apps (LinkedIn,
iMessage antiguo) no muestran webp en el preview. Para hacerla en
macOS, por ejemplo:

```sh
sips -z 628 1200 foto-recortada.jpg --out preview-redes-sociales.jpg
rsvg-convert -b white -w 1200 placa.svg -o placa.png  # desde un SVG
```

Para probar cómo se ve un link: https://www.opengraph.xyz/ o el
[depurador de Facebook](https://developers.facebook.com/tools/debug/),
que además sirve para refrescar el caché cuando se cambia la imagen.

## Licencia

MIT
