const CLAVE = 'ninjago_personajes';

const ejemplos = [
  { id: '1', nombre: 'Kai', rol: 'Fuego', origen: 'Ninjago', imagen: 'imagenes/kai.jpg', descripcion: 'El ninja rojo domina el fuego. Es valiente, decidido y siempre protege a sus amigos.', fechaCreacion: '2026-10-14T12:00:00Z' },
  { id: '2', nombre: 'Jay', rol: 'Rayo', origen: 'Ninjago', imagen: 'imagenes/jay.jpg', descripcion: 'El ninja azul controla el rayo. Es ingenioso, bromista y un gran inventor.', fechaCreacion: '2026-10-14T12:00:00Z' },
  { id: '3', nombre: 'Cole', rol: 'Tierra', origen: 'Ninjago', imagen: 'imagenes/cole.jpg', descripcion: 'El ninja de la tierra destaca por su fuerza, lealtad y gran corazón.', fechaCreacion: '2026-10-14T12:00:00Z' },
  { id: '4', nombre: 'Zane', rol: 'Hielo', origen: 'Ninjago', imagen: 'imagenes/zane.jpg', descripcion: 'El maestro del hielo es un nindroide tranquilo, inteligente y muy leal.', fechaCreacion: '2026-10-14T12:00:00Z' },
  { id: '5', nombre: 'Lloyd', rol: 'Energía', origen: 'Ninjago', imagen: 'imagenes/lloyd.jpg', descripcion: 'El Ninja Verde controla la energía y guía al equipo para defender Ninjago.', fechaCreacion: '2026-10-14T12:00:00Z' },
  { id: '6', nombre: 'Nya', rol: 'Agua', origen: 'Ninjago', imagen: 'imagenes/nya.jpg', descripcion: 'La maestra del agua es fuerte, independiente y una excelente mecánica.', fechaCreacion: '2026-10-14T12:00:00Z' }
];

const $ = (id) => document.getElementById(id);
let personajes = cargarPersonajes();
let idActual = null;
let idEditando = null;

function mostrarAviso(mensaje, tipo = 'is-success') {
  $('aviso').className = `notification aviso ${tipo} is-light`;
  $('aviso').textContent = mensaje;
  $('aviso').hidden = false;
}

function cargarPersonajes() {
  try {
    const guardados = localStorage.getItem(CLAVE);
    if (guardados === null) {
      localStorage.setItem(CLAVE, JSON.stringify(ejemplos));
      return [...ejemplos];
    }
    const datos = JSON.parse(guardados);
    if (!Array.isArray(datos)) throw new Error('Datos incorrectos');
    return datos.filter(p => p && p.id && typeof p.nombre === 'string' && typeof p.rol === 'string');
  } catch (error) {
    mostrarAviso('No fue posible leer la colección guardada. Puedes crear una nueva.', 'is-warning');
    return [];
  }
}

function guardarPersonajes(nuevos) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(nuevos));
    personajes = nuevos;
    return true;
  } catch (error) {
    mostrarAviso('No se pudo guardar: el almacenamiento está lleno o bloqueado.', 'is-danger');
    return false;
  }
}

function normalizar(texto) {
  return String(texto || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function buscarPersonajes(texto) {
  const consulta = normalizar(texto.trim());
  const resultados = [];
  let i = 0;

  while (resultados.length === 0 && i < personajes.length) {
    if (coincide(personajes[i], consulta)) resultados.push(personajes[i]);
    i++;
  }
  for (; i < personajes.length; i++) {
    if (coincide(personajes[i], consulta)) resultados.push(personajes[i]);
  }
  return resultados;
}

function coincide(personaje, consulta) {
  return normalizar(personaje.nombre).includes(consulta) || normalizar(personaje.rol).includes(consulta);
}

function crearFoto(personaje, clase) {
  const contenedor = document.createElement('div');
  const elemento = normalizar(personaje.rol).replace(/[^a-z]/g, '');
  contenedor.className = `${clase} elemento-${elemento}`;
  const inicial = document.createElement('span');
  inicial.className = 'inicial';
  inicial.textContent = personaje.nombre.slice(0, 2).toUpperCase();
  contenedor.appendChild(inicial);

  if (personaje.imagen) {
    const imagen = document.createElement('img');
    imagen.src = personaje.imagen;
    imagen.alt = personaje.nombre;
    imagen.addEventListener('load', () => inicial.hidden = true);
    imagen.addEventListener('error', () => imagen.remove());
    contenedor.appendChild(imagen);
  }
  return contenedor;
}

function crearTarjeta(personaje) {
  const columna = document.createElement('div');
  columna.className = 'column is-12-mobile is-6-tablet is-4-desktop';
  const tarjeta = document.createElement('article');
  const elemento = normalizar(personaje.rol).replace(/[^a-z]/g, '');
  tarjeta.className = `tarjeta-personaje elemento-${elemento}`;
  const cuerpo = document.createElement('div');
  cuerpo.className = 'cuerpo-tarjeta';
  const rol = document.createElement('span');
  rol.className = 'tag etiqueta-rol';
  rol.textContent = personaje.rol;
  const nombre = document.createElement('h3');
  nombre.className = 'nombre-personaje';
  nombre.textContent = personaje.nombre;
  const boton = document.createElement('button');
  boton.className = 'button boton-ver';
  boton.type = 'button';
  boton.textContent = 'VER PERFIL →';
  boton.addEventListener('click', () => mostrarDetalle(personaje.id));
  cuerpo.append(rol, nombre, boton);
  tarjeta.append(crearFoto(personaje, 'foto-personaje'), cuerpo);
  columna.appendChild(tarjeta);
  return columna;
}

function renderizarGrid() {
  const consulta = $('buscar').value;
  const resultados = buscarPersonajes(consulta);
  const grid = $('gridPersonajes');
  grid.replaceChildren();
  resultados.forEach(p => grid.appendChild(crearTarjeta(p)));
  $('contador').textContent = `${resultados.length} ninja(s) encontrado(s)`;

  $('sinResultados').hidden = resultados.length !== 0;
  $('btnEstadoVacio').textContent = consulta.trim() ? 'LIMPIAR BÚSQUEDA' : 'AGREGAR NINJA';
  $('tituloVacio').textContent = consulta.trim() ? 'SIN RESULTADOS' : 'TU EQUIPO ESTÁ VACÍO';
  $('textoVacio').textContent = consulta.trim()
    ? 'Intenta buscar por otro nombre o elemento.'
    : 'Agrega a tu primer ninja para comenzar.';
}

function cambiarVista(vista) {
  $('vistaColeccion').hidden = vista !== 'coleccion';
  $('vistaDetalle').hidden = vista !== 'detalle';
  $('vistaFormulario').hidden = vista !== 'formulario';
  window.scrollTo(0, 0);
}

function mostrarDetalle(id) {
  const p = personajes.find(personaje => personaje.id === id);
  if (!p) return;
  idActual = id;
  $('detalleImagen').replaceChildren(crearFoto(p, 'foto-detalle'));
  $('detalleNombre').textContent = p.nombre;
  $('detalleRol').textContent = p.rol;
  $('detalleOrigen').textContent = p.origen || 'Desconocido';
  $('detalleDescripcion').textContent = p.descripcion || 'Sin descripción.';
  $('detalleFecha').textContent = p.fechaCreacion
    ? new Date(p.fechaCreacion).toLocaleDateString('es-MX') : 'Sin fecha';
  cambiarVista('detalle');
}

function abrirFormulario(id = null) {
  idEditando = id;
  $('formPersonaje').reset();
  document.querySelectorAll('.help.is-danger').forEach(p => p.textContent = '');
  document.querySelectorAll('.is-danger.input').forEach(c => c.classList.remove('is-danger'));
  $('tituloFormulario').textContent = id ? 'EDITAR NINJA' : 'NUEVO NINJA';
  if (id) {
    const p = personajes.find(personaje => personaje.id === id);
    if (!p) return;
    $('nombre').value = p.nombre;
    $('rol').value = p.rol;
    $('origen').value = p.origen || '';
    $('imagen').value = p.imagen || '';
    $('descripcion').value = p.descripcion || '';
  }
  cambiarVista('formulario');
}

function validar(datos) {
  let valido = true;
  ['nombre', 'rol', 'imagen'].forEach(campo => {
    $(campo).classList.remove('is-danger');
    $(`error${campo[0].toUpperCase() + campo.slice(1)}`).textContent = '';
  });
  function error(campo, mensaje) {
    $(campo).classList.add('is-danger');
    $(`error${campo[0].toUpperCase() + campo.slice(1)}`).textContent = mensaje;
    valido = false;
  }
  if (!datos.nombre) error('nombre', 'Escribe el nombre del ninja.');
  if (!datos.rol) error('rol', 'Selecciona un elemento o rol.');
  if (datos.nombre && personajes.some(p => normalizar(p.nombre) === normalizar(datos.nombre) && p.id !== idEditando)) {
    error('nombre', 'Ya existe un ninja con ese nombre.');
  }
  if (datos.imagen && !/^imagenes\/[\w-]+\.(png|jpe?g)$/i.test(datos.imagen)) {
    error('imagen', 'Escribe una ruta como imagenes/ninja.png o .jpg');
  }
  return valido;
}

function guardarFormulario(evento) {
  evento.preventDefault();
  const datos = {
    nombre: $('nombre').value.trim(),
    rol: $('rol').value,
    origen: $('origen').value.trim(),
    imagen: $('imagen').value.trim(),
    descripcion: $('descripcion').value.trim()
  };
  if (!validar(datos)) return;

  let nuevos;
  let idGuardado;
  if (idEditando) {
    idGuardado = idEditando;
    nuevos = personajes.map(p => p.id === idEditando ? { ...p, ...datos } : p);
  } else {
    idGuardado = String(Date.now());
    nuevos = [...personajes, { id: idGuardado, ...datos, fechaCreacion: new Date().toISOString() }];
  }
  if (!guardarPersonajes(nuevos)) return;
  renderizarGrid();
  mostrarDetalle(idGuardado);
  mostrarAviso(idEditando ? '¡Ninja actualizado correctamente!' : '¡Ninja agregado a tu colección!');
}

function eliminarPersonaje() {
  const p = personajes.find(personaje => personaje.id === idActual);
  if (!p || !confirm(`¿Seguro que quieres eliminar a ${p.nombre}?`)) return;
  if (!guardarPersonajes(personajes.filter(personaje => personaje.id !== idActual))) return;
  idActual = null;
  renderizarGrid();
  cambiarVista('coleccion');
  mostrarAviso('Ninja eliminado correctamente.');
}

$('btnAgregar').addEventListener('click', () => abrirFormulario());
$('buscar').addEventListener('input', renderizarGrid);
$('volverDetalle').addEventListener('click', () => cambiarVista('coleccion'));
$('volverFormulario').addEventListener('click', () => cambiarVista(idEditando ? 'detalle' : 'coleccion'));
$('btnCancelar').addEventListener('click', () => cambiarVista(idEditando ? 'detalle' : 'coleccion'));
$('btnEditar').addEventListener('click', () => abrirFormulario(idActual));
$('btnEliminar').addEventListener('click', eliminarPersonaje);
$('formPersonaje').addEventListener('submit', guardarFormulario);
$('btnEstadoVacio').addEventListener('click', () => {
  if ($('buscar').value.trim()) {
    $('buscar').value = '';
    renderizarGrid();
  } else abrirFormulario();
});
$('irInicio').addEventListener('click', () => cambiarVista('coleccion'));

document.addEventListener('click', evento => {
  const texto = evento.target.closest('h1, h2, h3, p, span, label');
  if (!texto) return;
  texto.classList.remove('camaron_saltando');
  void texto.offsetWidth;
  texto.classList.add('camaron_saltando');
  texto.addEventListener('animationend', () => texto.classList.remove('camaron_saltando'), { once: true });
});

renderizarGrid();
