// Datos de respaldo: se usan SOLO si el navegador no puede conectarse al backend
// (por ejemplo, si abres index.html directamente sin correr `npm start`).
// Cuando el servidor Node está corriendo, la app usa /api/yachts y /api/sedes reales,
// con disponibilidad y reservas de verdad. Este archivo es solo para que el sitio
// se vea completo en modo demo/estático.
const YACHTS_FALLBACK = [
  {
    "id": "yt-001",
    "nombre": "Meridian 52",
    "tipo": "Flybridge de lujo",
    "eslora": "16 m",
    "capacidad": 12,
    "capitan": "Incluido",
    "precioHora": 480,
    "puerto": "Marina Miraflores",
    "imagen": "yacht1.jpg",
    "descripcion": "Un flybridge silencioso pensado para navegar al atardecer, con cubierta de proa amplia y cabina climatizada.",
    "comodidades": [
      "Wi-Fi satelital a bordo",
      "Jacuzzi en cubierta de proa",
      "Sistema de sonido Bluetooth",
      "Cocina equipada con nevera y bar",
      "2 camarotes con baño privado",
      "Toldo retráctil y zona de sombra",
      "Plataforma de baño con escalera",
      "Equipo de snorkel para 12 personas"
    ],
    "seguridad": {
      "certificadoCapitania": "Vigente — Capitanía de Puerto del Callao",
      "seguroResponsabilidadCivil": "Cobertura hasta USD 500,000",
      "tripulacion": "Capitán y marinero con licencia vigente",
      "equipoEmergencia": [
        "Chalecos salvavidas para 14 personas",
        "Balsa salvavidas homologada",
        "Extintores (3)",
        "Botiquín de primeros auxilios",
        "Bengalas de señalización"
      ],
      "navegacion": [
        "GPS y radar",
        "Radio VHF marina",
        "AIS (identificación automática)"
      ],
      "ultimaInspeccion": "2026-06-02"
    },
    "rating": 4.9,
    "reviews": 128,
    "sedeId": "lima",
    "disponibilidad": {
      "disponible": true,
      "hasta": null
    }
  },
  {
    "id": "yt-002",
    "nombre": "Azure 38",
    "tipo": "Crucero deportivo",
    "eslora": "11.6 m",
    "capacidad": 8,
    "capitan": "Incluido",
    "precioHora": 310,
    "puerto": "Marina Miraflores",
    "imagen": "yacht2.jpg",
    "descripcion": "Ágil y compacto, ideal para grupos pequeños que buscan velocidad y una jornada de sol sin complicaciones.",
    "comodidades": [
      "Parlantes marinos resistentes al agua",
      "Nevera para bebidas",
      "Zona de camastros en proa",
      "Ducha exterior de agua dulce",
      "Sombrilla bimini",
      "Equipo de pesca a bordo"
    ],
    "seguridad": {
      "certificadoCapitania": "Vigente — Capitanía de Puerto del Callao",
      "seguroResponsabilidadCivil": "Cobertura hasta USD 300,000",
      "tripulacion": "Capitán con licencia vigente",
      "equipoEmergencia": [
        "Chalecos salvavidas para 10 personas",
        "Extintores (2)",
        "Botiquín de primeros auxilios",
        "Bengalas de señalización"
      ],
      "navegacion": [
        "GPS",
        "Radio VHF marina"
      ],
      "ultimaInspeccion": "2026-05-18"
    },
    "rating": 4.7,
    "reviews": 64,
    "sedeId": "lima",
    "disponibilidad": {
      "disponible": true,
      "hasta": null
    }
  },
  {
    "id": "yt-003",
    "nombre": "Horizon 65",
    "tipo": "Mega yate",
    "eslora": "20 m",
    "capacidad": 20,
    "capitan": "Incluido + tripulación de 3",
    "precioHora": 950,
    "puerto": "Marina Miraflores",
    "imagen": "yacht3.jpg",
    "descripcion": "El buque insignia de la flota: tres niveles, sala de estar interior y una suite principal con vista al mar.",
    "comodidades": [
      "3 niveles con sala de estar interior",
      "Suite principal con baño en mármol",
      "Jacuzzi en cubierta superior",
      "Cocina completa con chef opcional",
      "Sistema de audio en 5 zonas",
      "Barra exterior con hielera",
      "4 camarotes con baño privado",
      "Kayaks y tabla de paddle incluidos"
    ],
    "seguridad": {
      "certificadoCapitania": "Vigente — Capitanía de Puerto del Callao",
      "seguroResponsabilidadCivil": "Cobertura hasta USD 1,000,000",
      "tripulacion": "Capitán, marinero y mayordomo con licencias vigentes",
      "equipoEmergencia": [
        "Chalecos salvavidas para 24 personas",
        "2 balsas salvavidas homologadas",
        "Extintores (5)",
        "Botiquín avanzado de primeros auxilios",
        "Desfibrilador (DEA)",
        "Bengalas de señalización"
      ],
      "navegacion": [
        "GPS y radar",
        "Radio VHF marina",
        "AIS (identificación automática)",
        "Piloto automático"
      ],
      "ultimaInspeccion": "2026-07-10"
    },
    "rating": 5.0,
    "reviews": 41,
    "sedeId": "lima",
    "disponibilidad": {
      "disponible": true,
      "hasta": null
    }
  },
  {
    "id": "yt-004",
    "nombre": "Coral 48",
    "tipo": "Crucero panorámico",
    "eslora": "14.6 m",
    "capacidad": 10,
    "capitan": "Incluido",
    "precioHora": 260,
    "puerto": "Paracas",
    "sedeId": "paracas",
    "imagen": "yacht4.jpg",
    "descripcion": "Ideal para recorrer la bahía de Paracas y acercarse a las Islas Ballestas con comodidad y buena sombra.",
    "comodidades": [
      "Toldo de sombra en toda la cubierta",
      "Nevera para bebidas",
      "Binoculares para avistamiento de fauna",
      "Parlante Bluetooth",
      "Asientos acolchados perimetrales",
      "Guía a bordo opcional"
    ],
    "seguridad": {
      "certificadoCapitania": "Vigente — Capitanía de Puerto de Paracas",
      "seguroResponsabilidadCivil": "Cobertura hasta USD 300,000",
      "tripulacion": "Capitán con licencia vigente",
      "equipoEmergencia": [
        "Chalecos salvavidas para 12 personas",
        "Extintores (2)",
        "Botiquín de primeros auxilios",
        "Bengalas de señalización"
      ],
      "navegacion": [
        "GPS",
        "Radio VHF marina"
      ],
      "ultimaInspeccion": "2026-06-15"
    },
    "rating": 4.8,
    "reviews": 52,
    "disponibilidad": {
      "disponible": true,
      "hasta": null
    }
  },
  {
    "id": "yt-005",
    "nombre": "Marlin Runner",
    "tipo": "Yate de pesca deportiva",
    "eslora": "12 m",
    "capacidad": 6,
    "capitan": "Incluido",
    "precioHora": 220,
    "puerto": "Máncora",
    "sedeId": "mancora",
    "imagen": "yacht5.jpg",
    "descripcion": "Pensado para pesca deportiva y días de sol en el norte — rápido, ágil y con todo el equipo de pesca listo.",
    "comodidades": [
      "Equipo completo de pesca deportiva",
      "Nevera para captura del día",
      "Zona de camastros en proa",
      "Ducha exterior de agua dulce",
      "Parlante resistente al agua"
    ],
    "seguridad": {
      "certificadoCapitania": "Vigente — Capitanía de Puerto de Talara",
      "seguroResponsabilidadCivil": "Cobertura hasta USD 250,000",
      "tripulacion": "Capitán con licencia vigente",
      "equipoEmergencia": [
        "Chalecos salvavidas para 8 personas",
        "Extintores (2)",
        "Botiquín de primeros auxilios",
        "Bengalas de señalización"
      ],
      "navegacion": [
        "GPS",
        "Radio VHF marina"
      ],
      "ultimaInspeccion": "2026-05-30"
    },
    "rating": 4.9,
    "reviews": 37,
    "disponibilidad": {
      "disponible": true,
      "hasta": null
    }
  }
];

const SEDES_FALLBACK = [
  {
    "id": "lima",
    "nombre": {
      "es": "Lima",
      "en": "Lima"
    },
    "region": {
      "es": "Marina Miraflores",
      "en": "Marina Miraflores"
    },
    "descripcion": {
      "es": "Nuestra sede principal, en el corazón de Lima. Salidas al atardecer con vista a la Costa Verde.",
      "en": "Our main location, in the heart of Lima. Sunset departures with views of the Costa Verde."
    }
  },
  {
    "id": "paracas",
    "nombre": {
      "es": "Paracas",
      "en": "Paracas"
    },
    "region": {
      "es": "Ica",
      "en": "Ica"
    },
    "descripcion": {
      "es": "Bahía tranquila, punto de partida para recorrer las Islas Ballestas y su fauna marina.",
      "en": "A calm bay, the starting point for exploring the Ballestas Islands and their marine wildlife."
    }
  },
  {
    "id": "mancora",
    "nombre": {
      "es": "Máncora",
      "en": "Máncora"
    },
    "region": {
      "es": "Piura",
      "en": "Piura"
    },
    "descripcion": {
      "es": "Aguas cálidas del norte, perfectas para pesca deportiva y días largos de sol.",
      "en": "Warm northern waters, perfect for sport fishing and long sunny days."
    }
  }
];
