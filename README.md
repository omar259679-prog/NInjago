# Ninjago — Colección de ninjas

**Alumno/a:** Omar Alexis 
**Materia:** LAD319 — Desarrollo de Aplicaciones Web  
**GitHub Pages:** [Pega aquí tu URL]  
**Repositorio:** [Pega aquí tu URL]

## Descripción

Sitio web de una sola página para organizar una colección personal de ninjas de Ninjago. Hecho con HTML5, Bulma, CSS propio, JavaScript ES6+ básico/intermedio y `localStorage`. No utiliza backend ni base de datos.

## Funcionalidades

- Ver las tarjetas de los ninjas y entrar a su perfil completo.
- Agregar un ninja con formulario y validaciones.
- Editar los datos de un ninja existente.
- Eliminar un ninja después de confirmar.
- Buscar por **nombre o elemento (rol)** conforme se escribe, sin distinguir mayúsculas ni acentos.
- Conservar los datos aunque se recargue la página.
- Mostrar estados vacíos, avisos de guardado, errores de formulario y respaldo con iniciales cuando una imagen falla.
- Abrir el sitio en computadora o teléfono.

Se incluyen seis personajes de ejemplo: **Kai, Jay, Cole, Zane, Lloyd y Nya**. No se incluyen personajes propios. Las ilustraciones JPG son fan art generado para esta práctica, no imágenes oficiales de LEGO/Ninjago.

## Archivos

```text
ninjago-coleccion/
├── index.html
├── styles.css
├── app.js
├── personajes-ejemplo.json
├── README.md
├── BITACORA.md
└── imagenes/
    ├── equipo.jpg
    ├── kai.jpg
    ├── jay.jpg
    ├── cole.jpg
    ├── zane.jpg
    ├── lloyd.jpg
    └── nya.jpg
```

## Cómo usar

1. Abre `index.html` en un navegador moderno, preferentemente desde un servidor local de VS Code (por ejemplo, Live Server) o GitHub Pages.
2. Escribe en **Buscar ninja** para filtrar la colección por nombre o elemento.
3. Presiona **Ver perfil** para consultar, editar o eliminar.
4. Presiona **Agregar ninja** para guardar otro personaje.
5. Si quieres utilizar otra imagen, colócala dentro de `imagenes/` como PNG, JPG o JPEG y escribe su ruta, por ejemplo `imagenes/myninja.png`. Puedes dejarla vacía para mostrar iniciales.
6. Recarga para comprobar que el navegador recuerda los cambios.

**Nota:** cada navegador guarda su propia colección mediante `localStorage`. No se sincroniza con otros dispositivos ni con tus compañeros. Si quieres recuperar los seis ninjas predeterminados, puedes borrar la clave `ninjago_personajes` desde el almacenamiento local del navegador y recargar.

## Publicación en GitHub Pages

1. Crea un repositorio público y conserva `index.html` en la raíz.
2. Sube los archivos con **al menos 5 commits reales y descriptivos** hechos conforme desarrolles el proyecto.
3. Abre **Settings → Pages** y selecciona la rama principal y la carpeta `/ (root)`.
4. Comprueba que la página publicada carga las imágenes, el CSS y el JavaScript; prueba el CRUD.
5. Completa tu nombre y las dos URL anteriores antes de la entrega.

## Tecnologías y créditos

- [Bulma](https://bulma.io/) 1.0.4, cargado por CDN.
- [Google Fonts](https://fonts.google.com/): Teko y Kanit.
- HTML5, CSS3, JavaScript ES6+ y localStorage.
- Personajes relacionados con **LEGO Ninjago**. Proyecto de práctica sin relación oficial con la marca.
