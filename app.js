const API = '';
let socket = null;
let modoDemo = false;
try {
  if (typeof io === 'function') socket = io({ reconnectionAttempts: 2, timeout: 3000 });
} catch (e) { socket = null; }

const grid = document.getElementById('yacht-grid');
const feed = document.getElementById('ais-feed');
const backdrop = document.getElementById('modal-backdrop');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');
const sedesGrid = document.getElementById('sedes-grid');
const filtrosEl = document.getElementById('sede-filters');

let yates = [];
let sedes = [];
let filtroSede = 'todas';

// ---------- Carga inicial (con respaldo si no hay backend) ----------
async function cargarFlota() {
  try {
    const res = await fetch('/api/yachts');
    if (!res.ok) throw new Error('API no disponible');
    yates = await res.json();
  } catch (e) {
    modoDemo = true;
    yates = (typeof YACHTS_FALLBACK !== 'undefined') ? YACHTS_FALLBACK : [];
  }
  renderGrid();
}

async function cargarSedes() {
  try {
    const res = await fetch('/api/sedes');
    if (!res.ok) throw new Error('API no disponible');
    sedes = await res.json();
  } catch (e) {
    modoDemo = true;
    sedes = (typeof SEDES_FALLBACK !== 'undefined') ? SEDES_FALLBACK : [];
  }
  renderSedes();
  renderFiltros();
}

function renderSedes() {
  if (!sedesGrid) return;
  sedesGrid.innerHTML = sedes.map(s => `
    <div class="sede-card">
      <div class="sede-icon"><i class="fas fa-map-marker-alt"></i></div>
      <div class="sede-region">${s.region[currentLang] || s.region.es}</div>
      <h3 class="sede-nombre">${s.nombre[currentLang] || s.nombre.es}</h3>
      <p class="sede-desc">${s.descripcion[currentLang] || s.descripcion.es}</p>
      <button class="sede-reserve-btn" data-sede="${s.id}">${t('sedes.reserve')}</button>
    </div>
  `).join('');
  sedesGrid.querySelectorAll('.sede-reserve-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filtroSede = btn.dataset.sede;
      renderFiltros();
      renderGrid();
      document.getElementById('flota').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function renderFiltros() {
  if (!filtrosEl) return;
  const chips = [{ id: 'todas', label: t('fleet.allSedes') }, ...sedes.map(s => ({ id: s.id, label: s.nombre[currentLang] || s.nombre.es }))];
  filtrosEl.innerHTML = chips.map(c => `<button class="sede-chip ${filtroSede === c.id ? 'active' : ''}" data-sede="${c.id}">${c.label}</button>`).join('');
  filtrosEl.querySelectorAll('.sede-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      filtroSede = chip.dataset.sede;
      renderFiltros();
      renderGrid();
    });
  });
}

function renderGrid() {
  const visibles = filtroSede === 'todas' ? yates : yates.filter(y => y.sedeId === filtroSede);
  const topId = visibles.reduce((a, b) => (b.rating > (a?.rating ?? 0) ? b : a), null)?.id;
  grid.innerHTML = visibles.map(y => tarjetaHTML(y, y.id === topId)).join('');
  grid.querySelectorAll('.yacht-card').forEach(card => {
    card.addEventListener('click', () => abrirModal(card.dataset.id));
  });
}

function tarjetaHTML(y, esTop) {
  const disponible = y.disponibilidad.disponible;
  return `
  <div class="yacht-card" data-id="${y.id}">
    ${esTop ? `<span class="yacht-ribbon">${t('fleet.mostBooked')}</span>` : ''}
    <div class="yacht-image-wrapper">
      <span class="yacht-badge ${disponible ? '' : 'ocupado'}">${disponible ? t('fleet.available') : t('fleet.booked')}</span>
    </div>
    <div class="yacht-content">
      <div class="yacht-category">${y.tipo} · ${y.puerto}</div>
      <h3 class="yacht-name">${y.nombre}</h3>
      <div class="yacht-rating"><i class="fas fa-star"></i> ${y.rating.toFixed(1)} · ${y.reviews} ${t('fleet.reviews')}</div>
      <div class="yacht-specs">
        <div class="spec"><i class="fas fa-ruler-horizontal"></i><span>${y.eslora}</span></div>
        <div class="spec"><i class="fas fa-users"></i><span>${y.capacidad} ${t('fleet.people')}</span></div>
        <div class="spec"><i class="fas fa-user-tie"></i><span>${y.capitan}</span></div>
      </div>
      <div class="yacht-footer">
        <div class="yacht-price">USD ${y.precioHora}<span>${t('fleet.perHour')}</span></div>
        <button class="btn-yacht">${t('fleet.viewDetails')}</button>
      </div>
    </div>
  </div>`;
}

// ---------- Panel en vivo (AIS) ----------
function agregarLinea(mensaje, tipo) {
  const li = document.createElement('li');
  li.className = 'ais-line';
  const hora = new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  li.textContent = `${hora} · ${mensaje}`;
  feed.prepend(li);
  while (feed.children.length > 8) feed.removeChild(feed.lastChild);
}

if (socket) {
  socket.on('evento:live', (data) => {
    agregarLinea(data.mensaje, data.tipo);
  });

  socket.on('disponibilidad:actualizada', ({ yachtId, disponibilidad }) => {
    const yate = yates.find(y => y.id === yachtId);
    if (yate) {
      yate.disponibilidad = disponibilidad;
      renderGrid();
    }
  });

  socket.on('connect_error', () => { modoDemo = true; });
} else {
  agregarLinea('Modo demo — corre el servidor para ver actividad en vivo real', 'sistema');
}

// ---------- Modal de detalle ----------
async function abrirModal(id) {
  const res = await fetch(`/api/yachts/${id}`);
  const y = await res.json();
  modalContent.innerHTML = modalHTML(y);
  backdrop.classList.add('open');

  const form = document.getElementById('booking-form');
  form.addEventListener('submit', (e) => enviarReserva(e, y));
}

function modalHTML(y) {
  const s = y.seguridad;
  const disponible = y.disponibilidad.disponible;
  return `
  <div class="modal-header">
    <h2>${y.nombre}</h2>
    <p class="yacht-type">${y.tipo} · ${y.eslora} · ${y.capacidad} ${t('fleet.people')}</p>
    <span class="avail-status ${disponible ? '' : 'ocupado'}">
      ${disponible ? '● ' + t('modal.availableNow') : '● ' + t('modal.bookedUntil') + ' ' + new Date(y.disponibilidad.hasta).toLocaleTimeString('es-PE', {hour:'2-digit', minute:'2-digit'})}
    </span>
  </div>
  <p class="modal-desc">${y.descripcion}</p>

  <div class="modal-section">
    <h4>${t('modal.amenities')}</h4>
    <ul class="amenity-list">
      ${y.comodidades.map(c => `<li>${c}</li>`).join('')}
    </ul>
  </div>

  <div class="modal-section">
    <h4>${t('modal.safety')}</h4>
    <div class="safety-cert">
      <div><b>${t('modal.certTitle')}</b> ${s.certificadoCapitania}</div>
      <div><b>${t('modal.insuranceTitle')}</b> ${s.seguroResponsabilidadCivil}</div>
      <div><b>${t('modal.crewTitle')}</b> ${s.tripulacion}</div>
      <div><b>${t('modal.inspectionTitle')}</b> ${s.ultimaInspeccion}</div>
    </div>
    <ul class="safety-list">
      ${s.equipoEmergencia.map(e => `<li>${e}</li>`).join('')}
      ${s.navegacion.map(n => `<li>${n}</li>`).join('')}
    </ul>
  </div>

  <div class="modal-section">
    <h4>${t('modal.bookThis')}</h4>
    <form class="booking-form" id="booking-form">
      <div class="row">
        <div><label>${t('modal.formName')}</label><input type="text" name="nombre" required></div>
        <div><label>${t('modal.formEmail')}</label><input type="email" name="email" required></div>
      </div>
      <div class="row">
        <div><label>${t('modal.formDate')}</label><input type="date" name="fecha" required></div>
        <div><label>${t('modal.formPeople')}</label><input type="number" name="personas" min="1" max="${y.capacidad}" value="1" required></div>
      </div>
      <div class="row">
        <div><label>${t('modal.formStart')}</label><input type="time" name="horaInicio" required></div>
        <div><label>${t('modal.formEnd')}</label><input type="time" name="horaFin" required></div>
      </div>
      <button class="booking-submit" type="submit">${t('modal.confirm')}</button>
      <div class="booking-msg" id="booking-msg"></div>
    </form>
  </div>
  `;
}

async function enviarReserva(e, y) {
  e.preventDefault();
  const form = e.target;
  const msg = document.getElementById('booking-msg');

  if (modoDemo) {
    msg.textContent = 'Modo demo: corre "npm start" en /server para activar reservas reales.';
    msg.className = 'booking-msg error';
    return;
  }

  const body = {
    yachtId: y.id,
    nombre: form.nombre.value,
    email: form.email.value,
    fecha: form.fecha.value,
    horaInicio: form.horaInicio.value,
    horaFin: form.horaFin.value,
    personas: Number(form.personas.value)
  };
  msg.textContent = t('modal.sending');
  msg.className = 'booking-msg';

  try {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (!res.ok) {
      msg.textContent = data.error || t('modal.errorGeneric');
      msg.className = 'booking-msg error';
      return;
    }
    msg.textContent = t('modal.successMsg');
    msg.className = 'booking-msg ok';
    form.reset();
    cargarFlota();
  } catch (err) {
    msg.textContent = t('modal.errorConn');
    msg.className = 'booking-msg error';
  }
}

modalClose.addEventListener('click', () => backdrop.classList.remove('open'));
backdrop.addEventListener('click', (e) => { if (e.target === backdrop) backdrop.classList.remove('open'); });

// ---------- Menú móvil (overlay + panel deslizante) ----------
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileCloseBtn = document.getElementById('mobileCloseBtn');

function abrirMenuMovil() {
  mobileMenu.classList.add('active');
  mobileMenuOverlay.classList.add('active');
  mobileToggle.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function cerrarMenuMovil() {
  mobileMenu.classList.remove('active');
  mobileMenuOverlay.classList.remove('active');
  mobileToggle.classList.remove('active');
  document.body.style.overflow = '';
}
function alternarMenuMovil() {
  if (mobileMenu.classList.contains('active')) cerrarMenuMovil();
  else abrirMenuMovil();
}

if (mobileToggle) mobileToggle.addEventListener('click', alternarMenuMovil);
if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', cerrarMenuMovil);
if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', cerrarMenuMovil);
document.querySelectorAll('.mobile-nav-links a').forEach(a => a.addEventListener('click', cerrarMenuMovil));

// ---------- Animación al hacer scroll ----------
const observador = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observador.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observador.observe(el));

// ---------- Contador animado de estadísticas ----------
function animarContadores() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const meta = Number(el.dataset.count);
    const decimal = el.dataset.decimal ? Number(el.dataset.decimal) : null;
    const duracion = 1400;
    const inicio = performance.now();
    function paso(ahora) {
      const progreso = Math.min((ahora - inicio) / duracion, 1);
      const valor = meta * progreso;
      el.textContent = decimal ? (valor / 10).toFixed(1) : Math.floor(valor);
      if (progreso < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
  });
}
const statsSection = document.querySelector('.stats-section');
const statsObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animarContadores();
      statsObs.disconnect();
    }
  });
}, { threshold: 0.4 });
if (statsSection) statsObs.observe(statsSection);

// ---------- Formulario de contacto (confirmación visual) ----------
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div style="display:flex;align-items:center;gap:1rem;">
        <i class="fas fa-check-circle" style="font-size:1.8rem;color:#c9a961;"></i>
        <div>
          <h4 style="font-family:'Cormorant Garamond',serif;font-size:1.15rem;margin-bottom:0.2rem;">${t('form.toastTitle')}</h4>
          <p style="color:#666;font-size:0.85rem;margin:0;">${t('form.toastText')}</p>
        </div>
      </div>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 4000);
    contactForm.reset();
  });
}

cargarSedes();
cargarFlota();
