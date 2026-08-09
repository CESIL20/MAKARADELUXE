const translations = {
  es: {
    mobile: { title: 'Menú' },
    language: { title: 'Idioma' },
    nav: { home: 'Inicio', fleet: 'Flota', locations: 'Sedes', safety: 'Seguridad', clients: 'Clientes', contact: 'Contacto', book: 'Reservar' },
    hero: {
      subtitle: 'Bienvenido al Charter de Lujo',
      title: 'Descubre Momentos <em>Extraordinarios</em> en el Mar',
      text: 'Experimenta un lujo sin igual a bordo de nuestra flota exclusiva — con disponibilidad real, verificada al instante.',
      exploreFleet: 'Explorar Flota', contactUs: 'Contáctanos'
    },
    live: { label: 'Actividad en vivo', connecting: 'Conectando…' },
    stats: { yachts: 'Yates de Lujo', bookings: 'Salidas Reservadas', rating: 'Calificación Promedio', sedes: 'Sedes en el Perú' },
    sedes: {
      label: 'Nuestras Sedes', title: 'Cuatro Puntos de Partida', subtitle: 'Desde Lima hasta el norte del país',
      viewFleet: 'Ver flota aquí', reserve: 'Reservar'
    },
    fleet: {
      label: 'Nuestra Flota', title: 'Yates Excepcionales',
      subtitle: 'Haz clic en cualquier yate para ver comodidades, seguridad y disponibilidad',
      allSedes: 'Todas las sedes', available: 'Disponible ahora', booked: 'Reservado',
      perHour: 'por hora', people: 'personas', reviews: 'reseñas', viewDetails: 'Ver Detalles', mostBooked: 'Más reservado'
    },
    features: {
      label: '¿Por Qué Elegirnos?', title: 'La Diferencia Makara Deluxe', subtitle: 'Cada yate pasa por la misma revisión antes de sumarse a la flota',
      permits: { title: 'Permisos al Día', text: 'Todos con permiso vigente de la Capitanía de Puerto.' },
      emergency: { title: 'Equipo de Emergencia', text: 'Chalecos, balsa salvavidas, extintores y botiquín siempre a bordo.' },
      route: { title: 'Ruta Monitoreada', text: 'GPS, radio y rastreo activo durante todo el paseo.' },
      insurance: { title: 'Seguro Verificado', text: 'Cobertura confirmada antes de aceptar cualquier reserva.' }
    },
    testimonials: { label: 'Testimonios', title: 'Lo Que Dicen Nuestros Clientes' },
    contact: {
      label: 'Ponte en Contacto', title: 'Comienza Tu Viaje', text: '¿Listo para embarcarte en una aventura extraordinaria?',
      visit: { title: 'Nuestras sedes', address: 'Lima · Paracas · Máncora' },
      call: { title: 'Llámanos' }, email: { title: 'Escríbenos' }
    },
    form: {
      name: 'Nombre Completo', namePlaceholder: 'Juan Pérez',
      email: 'Correo Electrónico', emailPlaceholder: 'juan@ejemplo.com',
      message: 'Tu Mensaje', messagePlaceholder: 'Cuéntanos sobre tu experiencia soñada…',
      send: 'Enviar Consulta', toastTitle: '¡Gracias!', toastText: 'Tu consulta fue recibida. Te contactaremos en 24 horas.'
    },
    footer: {
      description: 'Alquiler de yates con sedes en Lima, Paracas y Máncora.',
      explore: 'Explora', services: 'Servicios', byHour: 'Alquiler por horas', events: 'Eventos privados',
      legal: 'Legal', privacy: 'Política de privacidad', terms: 'Términos de servicio',
      copyright: '© 2026 Makara Deluxe. Todos los derechos reservados'
    },
    modal: {
      amenities: 'Comodidades a bordo', safety: 'Seguridad y certificación', bookThis: 'Reservar este yate',
      availableNow: 'Disponible ahora', bookedUntil: 'Ocupado — libre después de',
      certTitle: 'Certificado de la Capitanía:', insuranceTitle: 'Seguro de responsabilidad civil:',
      crewTitle: 'Tripulación:', inspectionTitle: 'Última inspección:',
      formName: 'Nombre completo', formEmail: 'Correo', formDate: 'Fecha', formPeople: 'Personas',
      formStart: 'Hora de inicio', formEnd: 'Hora de fin', confirm: 'Confirmar reserva', sending: 'Enviando…',
      successMsg: '¡Reserva confirmada! Te escribiremos a tu correo con los detalles.',
      errorGeneric: 'No se pudo completar la reserva.', errorConn: 'Error de conexión con el servidor.'
    }
  },
  en: {
    mobile: { title: 'Menu' },
    language: { title: 'Language' },
    nav: { home: 'Home', fleet: 'Fleet', locations: 'Locations', safety: 'Safety', clients: 'Clients', contact: 'Contact', book: 'Book Now' },
    hero: {
      subtitle: 'Welcome to Luxury Charter',
      title: 'Discover <em>Extraordinary</em> Moments at Sea',
      text: 'Experience unparalleled luxury aboard our exclusive fleet — with real availability, verified instantly.',
      exploreFleet: 'Explore Fleet', contactUs: 'Contact Us'
    },
    live: { label: 'Live activity', connecting: 'Connecting…' },
    stats: { yachts: 'Luxury Yachts', bookings: 'Trips Booked', rating: 'Average Rating', sedes: 'Locations in Peru' },
    sedes: {
      label: 'Our Locations', title: 'Four Starting Points', subtitle: 'From Lima to the north of the country',
      viewFleet: 'View fleet here', reserve: 'Book Now'
    },
    fleet: {
      label: 'Our Fleet', title: 'Exceptional Yachts',
      subtitle: 'Click on any yacht to see amenities, safety and availability',
      allSedes: 'All locations', available: 'Available now', booked: 'Booked',
      perHour: 'per hour', people: 'guests', reviews: 'reviews', viewDetails: 'View Details', mostBooked: 'Most booked'
    },
    features: {
      label: 'Why Choose Us', title: 'The Makara Deluxe Difference', subtitle: 'Every yacht goes through the same review before joining the fleet',
      permits: { title: 'Permits Up To Date', text: 'All vessels hold a valid Port Authority permit.' },
      emergency: { title: 'Emergency Equipment', text: 'Life jackets, life raft, extinguishers and first-aid kit always onboard.' },
      route: { title: 'Monitored Route', text: 'GPS, radio and active tracking throughout the trip.' },
      insurance: { title: 'Verified Insurance', text: 'Coverage confirmed before accepting any booking.' }
    },
    testimonials: { label: 'Testimonials', title: 'What Our Clients Say' },
    contact: {
      label: 'Get in Touch', title: 'Begin Your Journey', text: 'Ready to embark on an extraordinary adventure?',
      visit: { title: 'Our locations', address: 'Lima · Paracas · Máncora' },
      call: { title: 'Call Us' }, email: { title: 'Email Us' }
    },
    form: {
      name: 'Full Name', namePlaceholder: 'John Smith',
      email: 'Email Address', emailPlaceholder: 'john@example.com',
      message: 'Your Message', messagePlaceholder: 'Tell us about your dream charter…',
      send: 'Send Inquiry', toastTitle: 'Thank You!', toastText: 'Your inquiry was received. We will contact you within 24 hours.'
    },
    footer: {
      description: 'Yacht charters with locations in Lima, Paracas and Máncora.',
      explore: 'Explore', services: 'Services', byHour: 'Hourly rental', events: 'Private events',
      legal: 'Legal', privacy: 'Privacy Policy', terms: 'Terms of Service',
      copyright: '© 2026 Makara Deluxe. All rights reserved'
    },
    modal: {
      amenities: 'Onboard Amenities', safety: 'Safety & Certification', bookThis: 'Book this yacht',
      availableNow: 'Available now', bookedUntil: 'Booked — free after',
      certTitle: 'Port Authority certificate:', insuranceTitle: 'Liability insurance:',
      crewTitle: 'Crew:', inspectionTitle: 'Last inspection:',
      formName: 'Full name', formEmail: 'Email', formDate: 'Date', formPeople: 'Guests',
      formStart: 'Start time', formEnd: 'End time', confirm: 'Confirm booking', sending: 'Sending…',
      successMsg: 'Booking confirmed! We will email you the details.',
      errorGeneric: 'The booking could not be completed.', errorConn: 'Connection error with the server.'
    }
  }
};

let currentLang = localStorage.getItem ? (sessionStorage.getItem('makara_lang') || 'es') : 'es';

function t(path) {
  const keys = path.split('.');
  let value = translations[currentLang];
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) value = value[k];
    else return path;
  }
  return value;
}

function aplicarTraducciones() {
  document.documentElement.lang = currentLang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = t(el.getAttribute('data-i18n'));
    if (val) el.innerHTML = val;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const val = t(el.getAttribute('data-i18n-placeholder'));
    if (val) el.placeholder = val;
  });

  const flags = { es: '🇵🇪', en: '🇺🇸' };
  const codes = { es: 'ES', en: 'EN' };
  const flagEl = document.querySelector('#languageCurrent .lang-flag');
  const codeEl = document.querySelector('#languageCurrent .lang-code');
  if (flagEl) flagEl.textContent = flags[currentLang];
  if (codeEl) codeEl.textContent = codes[currentLang];

  document.querySelectorAll('.language-option').forEach(opt => opt.classList.toggle('active', opt.dataset.lang === currentLang));
  document.querySelectorAll('.mobile-lang-option').forEach(opt => opt.classList.toggle('active', opt.dataset.lang === currentLang));
}

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  try { sessionStorage.setItem('makara_lang', lang); } catch (e) {}
  aplicarTraducciones();
  if (typeof renderGrid === 'function' && typeof yates !== 'undefined' && yates.length) renderGrid();
  if (typeof renderSedes === 'function') renderSedes();
}

document.addEventListener('DOMContentLoaded', () => {
  aplicarTraducciones();

  document.querySelectorAll('.language-option, .mobile-lang-option').forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      setLanguage(opt.dataset.lang);
      const dropdown = document.getElementById('languageDropdown');
      if (dropdown) dropdown.classList.remove('active');
    });
  });

  const langCurrent = document.getElementById('languageCurrent');
  const langDropdown = document.getElementById('languageDropdown');
  if (langCurrent) {
    langCurrent.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('active');
    });
  }
  document.addEventListener('click', (e) => {
    if (langDropdown && !e.target.closest('.language-switcher')) langDropdown.classList.remove('active');
  });
});
