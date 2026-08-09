const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

const YACHTS_PATH = path.join(__dirname, 'data', 'yachts.json');
const BOOKINGS_PATH = path.join(__dirname, 'data', 'bookings.json');
const SEDES_PATH = path.join(__dirname, 'data', 'sedes.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// ---------- Helpers de datos ----------
function leerYates() {
  return JSON.parse(fs.readFileSync(YACHTS_PATH, 'utf-8'));
}
function leerReservas() {
  return JSON.parse(fs.readFileSync(BOOKINGS_PATH, 'utf-8'));
}
function guardarReservas(reservas) {
  fs.writeFileSync(BOOKINGS_PATH, JSON.stringify(reservas, null, 2));
}

// Calcula si un yate está libre en este momento y su próxima franja ocupada
function calcularDisponibilidad(yachtId) {
  const reservas = leerReservas().filter(r => r.yachtId === yachtId && r.estado !== 'cancelada');
  const ahora = new Date();
  const ocupadaAhora = reservas.find(r => {
    const inicio = new Date(r.inicio);
    const fin = new Date(r.fin);
    return ahora >= inicio && ahora <= fin;
  });
  if (ocupadaAhora) {
    return { disponible: false, hasta: ocupadaAhora.fin };
  }
  return { disponible: true, hasta: null };
}

function yatesConDisponibilidad() {
  return leerYates().map(y => ({ ...y, disponibilidad: calcularDisponibilidad(y.id) }));
}

// ---------- Rutas REST ----------
app.get('/api/yachts', (req, res) => {
  res.json(yatesConDisponibilidad());
});

app.get('/api/sedes', (req, res) => {
  res.json(JSON.parse(fs.readFileSync(SEDES_PATH, 'utf-8')));
});

app.get('/api/yachts/:id', (req, res) => {
  const yate = leerYates().find(y => y.id === req.params.id);
  if (!yate) return res.status(404).json({ error: 'Yate no encontrado' });
  res.json({ ...yate, disponibilidad: calcularDisponibilidad(yate.id) });
});

app.get('/api/yachts/:id/reservas', (req, res) => {
  const reservas = leerReservas().filter(r => r.yachtId === req.params.id && r.estado !== 'cancelada');
  res.json(reservas);
});

app.post('/api/bookings', (req, res) => {
  const { yachtId, nombre, email, fecha, horaInicio, horaFin, personas } = req.body;

  if (!yachtId || !nombre || !email || !fecha || !horaInicio || !horaFin) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }
  const yate = leerYates().find(y => y.id === yachtId);
  if (!yate) return res.status(404).json({ error: 'Yate no encontrado' });

  const inicio = new Date(`${fecha}T${horaInicio}:00`);
  const fin = new Date(`${fecha}T${horaFin}:00`);
  if (isNaN(inicio) || isNaN(fin) || fin <= inicio) {
    return res.status(400).json({ error: 'Rango de horas inválido' });
  }

  const reservas = leerReservas();
  const cruce = reservas.some(r =>
    r.yachtId === yachtId &&
    r.estado !== 'cancelada' &&
    new Date(r.inicio) < fin &&
    new Date(r.fin) > inicio
  );
  if (cruce) {
    return res.status(409).json({ error: 'Ese horario ya fue reservado. Elige otra franja.' });
  }

  const nuevaReserva = {
    id: 'bk-' + Date.now(),
    yachtId,
    nombre,
    email,
    personas: personas || 1,
    inicio: inicio.toISOString(),
    fin: fin.toISOString(),
    estado: 'confirmada',
    creadaEn: new Date().toISOString()
  };
  reservas.push(nuevaReserva);
  guardarReservas(reservas);

  // Notifica a todos los visitantes conectados en vivo
  io.emit('evento:live', {
    tipo: 'reserva',
    mensaje: `🎉 ¡${yate.nombre} recién reservado por ${nombre.split(' ')[0]}!`,
    yachtId,
    ts: Date.now()
  });
  io.emit('disponibilidad:actualizada', { yachtId, disponibilidad: calcularDisponibilidad(yachtId) });

  res.status(201).json(nuevaReserva);
});

// ---------- Simulación de actividad en vivo (visitantes, vistas) ----------
// Esto NO crea reservas reales; solo alimenta el indicador de actividad
// para reflejar que hay tráfico simultáneo en el sitio.
function iniciarPulsoEnVivo() {
  const yates = leerYates();
  setInterval(() => {
    const yate = yates[Math.floor(Math.random() * yates.length)];
    const espectadores = Math.floor(Math.random() * 6) + 1;
    io.emit('evento:live', {
      tipo: 'visitantes',
      mensaje: `👀 ${espectadores} personas mirando el ${yate.nombre} ahora mismo`,
      yachtId: yate.id,
      ts: Date.now()
    });
  }, 12000);
}

io.on('connection', (socket) => {
  socket.emit('evento:live', {
    tipo: 'sistema',
    mensaje: '🌊 Conectado — viendo la actividad en vivo',
    ts: Date.now()
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor de alquiler de yates activo en http://localhost:${PORT}`);
  iniciarPulsoEnVivo();
});
