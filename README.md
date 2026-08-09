# Makara Deluxe — Alquiler de yates con disponibilidad en vivo

## Estructura
```
yacht-rental/
├── server/          Backend (Node.js + Express + Socket.io)
│   ├── server.js
│   ├── package.json
│   └── data/
│       ├── yachts.json     Flota (comodidades, seguridad, precios)
│       └── bookings.json   Reservas guardadas (se llena solo)
└── public/          Frontend (HTML/CSS/JS puro)
    ├── index.html
    ├── css/style.css
    └── js/app.js
```

## Cómo correrlo
```bash
cd server
npm install
npm start
```
Abre **http://localhost:3000** — el backend ya sirve el frontend.

## Qué hace "en vivo"
- **Disponibilidad real**: cada yate se marca "Disponible ahora" u "Ocupado" según las reservas guardadas en `bookings.json`, calculado en cada request.
- **Panel AIS (arriba a la derecha)**: recibe eventos por WebSocket (Socket.io) — cuando alguien reserva, todos los visitantes conectados lo ven aparecer al instante en el panel y las tarjetas se actualizan solas, sin recargar la página.
- **Actividad simulada de visitantes**: cada 12 segundos se emite un mensaje tipo "3 personas viendo el Horizon 65 ahora mismo", para dar sensación de tráfico simultáneo (no crea reservas reales).
- **Ficha de seguridad al hacer clic**: cada yate abre un modal con comodidades completas y un bloque de certificación (Capitanía de Puerto, seguro, tripulación, equipo de emergencia, última inspección).

## Para producción
- Cambia `data/*.json` por una base de datos real (Postgres/MongoDB) — el diseño de `server.js` ya separa la lógica de disponibilidad en funciones fáciles de migrar.
- Sirve el frontend con HTTPS y agrega autenticación si vas a manejar pagos.
- Las fotos son placeholders (gradientes); reemplaza `.yacht-media` en `style.css` o añade `<img>` usando el campo `imagen` de `yachts.json`.
