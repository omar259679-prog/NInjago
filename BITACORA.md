# Bitácora de decisiones — Colección Ninjago

## 1. ¿Por qué se usa un ID y no el nombre del personaje?

Un ID identifica el registro aunque se edite su nombre. Por ejemplo, si cambio «Kai» por otro nombre, el sistema sigue identificando al mismo personaje. Dos personajes podrían llamarse igual en otros proyectos y no sería correcto tratarlos como el mismo registro. Aquí los seis datos iniciales tienen un ID fijo y los nuevos reciben una marca de tiempo con `Date.now()`. Como alternativa, `crypto.randomUUID()` es más fiable para aplicaciones mayores, pero el proyecto es pequeño y busca usar JS básico.

## 2. ¿Por qué guardar el arreglo completo en una sola clave de localStorage?

La clave `ninjago_personajes` guarda todos los personajes juntos como texto JSON. Esto simplifica el código: se puede leer, editar o eliminar a partir de un solo arreglo. Guardar cada personaje en una clave separada permitiría actualizar un dato individual, pero obligaría a administrar muchas claves y su orden. Para seis o varias decenas de registros prefiero el arreglo único.

## 3. ¿Por qué buscar en cada tecla en lugar de esperar Enter?

Para una colección pequeña, el resultado inmediato es más cómodo: basta con escribir «kai» o «energia» para filtrar. Se normaliza el texto para ignorar mayúsculas y acentos. Con miles de registros, actualizar todas las tarjetas en cada tecla podría ser costoso; entonces convendría añadir una breve espera o limitar los resultados.

## 4. ¿Qué pasa si localStorage contiene JSON inválido?

`JSON.parse()` lanzaría una excepción. Por eso la lectura se hace con `try...catch`: en vez de romper el sitio, aparece un aviso y la lista queda vacía para poder seguir trabajando. Los datos corruptos no se sustituyen automáticamente al iniciar, porque alguien podría intentar recuperarlos. Una alternativa sería restaurar los datos iniciales de inmediato, pero sobreescribiría la información anterior.

## 5. ¿Qué sucede si falta la imagen?

Al cargar una tarjeta también se generan las iniciales de su nombre. Si la imagen existe, se muestran las ilustraciones; si falla la ruta, se elimina el elemento de imagen y quedan las iniciales. Así los datos del personaje permanecen visibles. Podría usarse una imagen genérica, pero las iniciales funcionan sin añadir archivos extra.

## 6. ¿Se permiten nombres vacíos o duplicados?

No. `trim()` elimina espacios al inicio y al final, así que una entrada formada solo por espacios no se guarda. Tampoco se acepta un nombre que ya exista con las mismas letras, incluso con mayúsculas o acentos distintos. Durante la edición se permite conservar el nombre actual. Otra solución sería permitir nombres repetidos y distinguirlos por ID, pero aquí se busca que la colección sea fácil de consultar.

## 7. ¿Otra persona verá mis personajes en GitHub Pages?

No verá los que agregué o edité en mi computadora. `localStorage` es almacenamiento local del navegador, vinculado al sitio donde se abre; no es una base de datos compartida. Otro visitante inicia con los seis ninjas de ejemplo. Una base de datos permitiría compartir cambios, pero la práctica prohíbe usar backend.

## 8. Inconsistencia del enunciado y solución

El documento pide utilizar un ciclo `while` en la búsqueda hasta encontrar al menos un personaje, pero también exige mostrar «Sin resultados» cuando no hay coincidencias. Un `while` sin salida podría dejar el sitio congelado si la búsqueda no existe.

**Solución aplicada:** el `while` busca hasta la primera coincidencia **o hasta llegar al final de la lista**. Después, un `for` completa las coincidencias restantes. Si no encuentra ninguna, aparece el mensaje de sin resultados y un botón para limpiar el filtro. Se usa el ciclo indicado, pero con una condición de salida segura y sin afectar los requisitos de la interfaz.
