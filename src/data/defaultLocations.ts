export interface LocalBusiness {
  id: string;
  name: string;
  type: string;
  rating: number;
  distance: number;
  description: string;
  image: string;
  hours: string;
  reviewsUrl?: string;
  acceptsReservations?: boolean;
  acceptsDigitalPayments?: boolean;
  badges?: string[];
}

export interface Location {
  id: string;
  title: string;
  description: string;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  type: string;
  address: string;
  tags: string[];
  businesses?: LocalBusiness[];
}

export const defaultLocations: Location[] = [
  {
    id: "cartagena",
    title: "Cartagena",
    description: "Ciudad histórica con arquitectura colonial",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: 10.3932,
      lng: -75.4832
    },
    type: "cultural",
    address: "Cartagena, Bolívar",
    tags: ["Cultural", "Playas", "Historia"],
    businesses: [
      {
        id: "r1",
        name: "Restaurante Sabor Caribeño",
        type: "comida",
        rating: 4.7,
        distance: 350,
        description: "Comida típica costeña, pescados y mariscos frescos.",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
        hours: "10:00-22:00",
        reviewsUrl: "https://goo.gl/maps/xxxx",
        acceptsReservations: true,
        acceptsDigitalPayments: true,
        badges: ["Recomendado por locales", "Pet Friendly"],
      },
      {
        id: "h1",
        name: "Hotel Paraíso Azul",
        type: "alojamiento",
        rating: 4.5,
        distance: 600,
        description: "Hotel frente al mar con piscina y desayuno incluido.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        hours: "24/7",
        reviewsUrl: "https://goo.gl/maps/yyyy",
        acceptsReservations: true,
        acceptsDigitalPayments: true,
        badges: ["Descuento", "Ideal para niños"],
      },
      {
        id: "c1",
        name: "Café Colonial",
        type: "comida",
        rating: 4.3,
        distance: 120,
        description: "Cafetería con repostería artesanal y café colombiano.",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
        hours: "8:00-20:00",
        reviewsUrl: "https://goo.gl/maps/zzzz",
        acceptsReservations: false,
        acceptsDigitalPayments: true,
        badges: ["Pet Friendly"],
      },
      {
        id: "g1",
        name: "Guía Turístico Juan",
        type: "guia",
        rating: 4.9,
        distance: 80,
        description: "Recorridos históricos y culturales personalizados.",
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
        hours: "9:00-18:00",
        reviewsUrl: "https://goo.gl/maps/aaaa",
        acceptsReservations: true,
        acceptsDigitalPayments: false,
        badges: ["Recomendado por locales"],
      },
      {
        id: "s1",
        name: "Tienda Artesanías Sol",
        type: "tienda",
        rating: 4.2,
        distance: 200,
        description: "Souvenirs, mochilas y artesanías locales.",
        image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
        hours: "9:00-21:00",
        reviewsUrl: "https://goo.gl/maps/bbbb",
        acceptsReservations: false,
        acceptsDigitalPayments: true,
        badges: ["Ideal para niños"],
      },
    ]
  },
  {
    id: "tayrona",
    title: "Parque Tayrona",
    description: "Parque nacional con playas vírgenes",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: 11.3147,
      lng: -74.0307
    },
    type: "beaches",
    address: "Santa Marta, Magdalena",
    tags: ["Playas", "Naturaleza", "Ecoturismo"],
    businesses: [
      {
        id: "r2",
        name: "Restaurante Playa Brisa",
        type: "comida",
        rating: 4.6,
        distance: 200,
        description: "Pescados frescos y jugos naturales frente al mar.",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=81",
        hours: "9:00-20:00",
        reviewsUrl: "https://goo.gl/maps/tayrona1",
        acceptsReservations: true,
        acceptsDigitalPayments: true,
        badges: ["Recomendado por locales"]
      },
      {
        id: "h2",
        name: "EcoHotel Tayrona",
        type: "alojamiento",
        rating: 4.4,
        distance: 500,
        description: "Cabañas ecológicas con vista al mar y desayuno incluido.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        hours: "24/7",
        reviewsUrl: "https://goo.gl/maps/tayrona2",
        acceptsReservations: true,
        acceptsDigitalPayments: true,
        badges: ["Descuento"]
      },
      {
        id: "g2",
        name: "Guía Marta",
        type: "guia",
        rating: 4.8,
        distance: 100,
        description: "Tours ecológicos y avistamiento de fauna.",
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=81",
        hours: "8:00-18:00",
        reviewsUrl: "https://goo.gl/maps/tayrona3",
        acceptsReservations: true,
        acceptsDigitalPayments: false,
        badges: ["Recomendado por locales"]
      },
      {
        id: "s2",
        name: "Tienda Naturaleza Viva",
        type: "tienda",
        rating: 4.1,
        distance: 150,
        description: "Artesanías y recuerdos ecológicos.",
        image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=81",
        hours: "10:00-19:00",
        reviewsUrl: "https://goo.gl/maps/tayrona4",
        acceptsReservations: false,
        acceptsDigitalPayments: true,
        badges: ["Pet Friendly"]
      }
    ]
  },
  {
    id: "cocora",
    title: "Valle del Cocora",
    description: "Valle con las palmeras de cera más altas del mundo",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: 4.6381,
      lng: -75.4870
    },
    type: "mountains",
    address: "Salento, Quindío",
    tags: ["Montañas", "Naturaleza"],
    businesses: [
      {
        id: "r3",
        name: "Trucha y Café Cocora",
        type: "comida",
        rating: 4.7,
        distance: 180,
        description: "Especialidad en trucha y café de origen local.",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=81",
        hours: "8:00-18:00",
        reviewsUrl: "https://goo.gl/maps/cocora1",
        acceptsReservations: false,
        acceptsDigitalPayments: true,
        badges: ["Pet Friendly"]
      },
      {
        id: "h3",
        name: "Hostal Palmas de Cera",
        type: "alojamiento",
        rating: 4.5,
        distance: 400,
        description: "Hospedaje rural con desayuno y tours guiados.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        hours: "24/7",
        reviewsUrl: "https://goo.gl/maps/cocora2",
        acceptsReservations: true,
        acceptsDigitalPayments: true,
        badges: ["Descuento"]
      },
      {
        id: "g3",
        name: "Guía Andrés",
        type: "guia",
        rating: 4.9,
        distance: 90,
        description: "Caminatas ecológicas y avistamiento de aves.",
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=82",
        hours: "7:00-17:00",
        reviewsUrl: "https://goo.gl/maps/cocora3",
        acceptsReservations: true,
        acceptsDigitalPayments: false,
        badges: ["Recomendado por locales"]
      },
      {
        id: "s3",
        name: "Tienda Artesanal Cocora",
        type: "tienda",
        rating: 4.3,
        distance: 120,
        description: "Souvenirs y productos hechos a mano.",
        image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=82",
        hours: "9:00-19:00",
        reviewsUrl: "https://goo.gl/maps/cocora4",
        acceptsReservations: false,
        acceptsDigitalPayments: true,
        badges: ["Ideal para niños"]
      }
    ]
  },
  {
    id: "sanandres",
    title: "San Andrés",
    description: "Isla paradisíaca en el Caribe",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: 12.5847,
      lng: -81.7006
    },
    type: "beaches",
    address: "San Andrés Isla",
    tags: ["Playas", "Isla"],
    businesses: [
      {
        id: "r4",
        name: "Restaurante Mar Azul",
        type: "comida",
        rating: 4.8,
        distance: 220,
        description: "Cocina caribeña y cocteles tropicales.",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=82",
        hours: "11:00-23:00",
        reviewsUrl: "https://goo.gl/maps/sanandres1",
        acceptsReservations: true,
        acceptsDigitalPayments: true,
        badges: ["Recomendado por locales"]
      },
      {
        id: "h4",
        name: "Hotel Coral View",
        type: "alojamiento",
        rating: 4.6,
        distance: 350,
        description: "Hotel con piscina y acceso directo a la playa.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        hours: "24/7",
        reviewsUrl: "https://goo.gl/maps/sanandres2",
        acceptsReservations: true,
        acceptsDigitalPayments: true,
        badges: ["Descuento"]
      },
      {
        id: "g4",
        name: "Guía Raúl",
        type: "guia",
        rating: 4.7,
        distance: 110,
        description: "Snorkel y recorridos en lancha por el arrecife.",
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=83",
        hours: "8:00-18:00",
        reviewsUrl: "https://goo.gl/maps/sanandres3",
        acceptsReservations: true,
        acceptsDigitalPayments: false,
        badges: ["Recomendado por locales"]
      },
      {
        id: "s4",
        name: "Tienda Coralina",
        type: "tienda",
        rating: 4.2,
        distance: 140,
        description: "Artesanías isleñas y accesorios playeros.",
        image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=83",
        hours: "10:00-21:00",
        reviewsUrl: "https://goo.gl/maps/sanandres4",
        acceptsReservations: false,
        acceptsDigitalPayments: true,
        badges: ["Pet Friendly"]
      }
    ]
  },
  {
    id: "guatape",
    title: "Guatapé",
    description: "Pueblo colorido con el Peñol",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: 6.2342,
      lng: -75.1574
    },
    type: "cultural",
    address: "Guatapé, Antioquia",
    tags: ["Cultural", "Naturaleza"]
  },
  {
    id: "amazonas",
    title: "Amazonas",
    description: "Selva amazónica colombiana",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: -4.2,
      lng: -69.9513
    },
    type: "ecotourism",
    address: "Leticia, Amazonas",
    tags: ["Naturaleza", "Ecoturismo"]
  },
  {
    id: "monserrate",
    title: "Monserrate",
    description: "Santuario religioso con vista panorámica de Bogotá",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: 4.6058,
      lng: -74.0556
    },
    type: "cultural",
    address: "Bogotá, Cundinamarca",
    tags: ["Cultural", "Religioso", "Montaña"],
    businesses: [
      {
        id: "r5",
        name: "Restaurante Santa Clara",
        type: "comida",
        rating: 4.7,
        distance: 120,
        description: "Comida típica bogotana y vista panorámica de la ciudad.",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=84",
        hours: "10:00-20:00",
        reviewsUrl: "https://goo.gl/maps/monserrate1",
        acceptsReservations: true,
        acceptsDigitalPayments: true,
        badges: ["Recomendado por locales"]
      },
      {
        id: "c5",
        name: "Café Mirador",
        type: "comida",
        rating: 4.5,
        distance: 80,
        description: "Café colombiano y postres artesanales con vista a Bogotá.",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=84",
        hours: "8:00-19:00",
        reviewsUrl: "https://goo.gl/maps/monserrate2",
        acceptsReservations: false,
        acceptsDigitalPayments: true,
        badges: ["Pet Friendly"]
      },
      {
        id: "g5",
        name: "Guía Camilo",
        type: "guia",
        rating: 4.9,
        distance: 60,
        description: "Recorridos históricos y senderismo guiado en Monserrate.",
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=84",
        hours: "7:00-18:00",
        reviewsUrl: "https://goo.gl/maps/monserrate3",
        acceptsReservations: true,
        acceptsDigitalPayments: false,
        badges: ["Recomendado por locales"]
      },
      {
        id: "s5",
        name: "Tienda Recuerdos Monserrate",
        type: "tienda",
        rating: 4.3,
        distance: 90,
        description: "Souvenirs religiosos y artesanías bogotanas.",
        image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=84",
        hours: "9:00-19:00",
        reviewsUrl: "https://goo.gl/maps/monserrate4",
        acceptsReservations: false,
        acceptsDigitalPayments: true,
        badges: ["Ideal para niños"]
      }
    ]
  },
  {
    id: "ciudadperdida",
    title: "Ciudad Perdida",
    description: "Antigua ciudad indígena en la Sierra Nevada",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: 11.0384,
      lng: -73.9267
    },
    type: "cultural",
    address: "Sierra Nevada, Santa Marta",
    tags: ["Cultural", "Arqueología", "Aventura"]
  },
  {
    id: "providencia",
    title: "Providencia",
    description: "Isla paradisíaca con el tercer arrecife de coral más grande",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: 13.3489,
      lng: -81.3745
    },
    type: "beaches",
    address: "Providencia, San Andrés",
    tags: ["Playas", "Isla", "Snorkel"]
  },
  {
    id: "canocristales",
    title: "Caño Cristales",
    description: "El río de los cinco colores",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: 2.2666,
      lng: -73.7910
    },
    type: "ecotourism",
    address: "La Macarena, Meta",
    tags: ["Naturaleza", "Río", "Ecoturismo"]
  },
  {
    id: "tatacoa",
    title: "Desierto de la Tatacoa",
    description: "Desierto rojo y gris con observatorio astronómico",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: 3.2344,
      lng: -75.1645
    },
    type: "ecotourism",
    address: "Villavieja, Huila",
    tags: ["Desierto", "Astronomía", "Naturaleza"]
  },
  {
    id: "sanagustin",
    title: "Parque Arqueológico San Agustín",
    description: "Mayor conjunto de monumentos religiosos megalíticos",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: 1.8879,
      lng: -76.2756
    },
    type: "cultural",
    address: "San Agustín, Huila",
    tags: ["Cultural", "Arqueología", "Historia"]
  },
  {
    id: "nevados",
    title: "Parque Los Nevados",
    description: "Parque nacional con glaciares y volcanes",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: 4.8828,
      lng: -75.3333
    },
    type: "mountains",
    address: "Manizales, Caldas",
    tags: ["Montañas", "Naturaleza", "Aventura"]
  },
  {
    id: "guajira",
    title: "Cabo de la Vela",
    description: "Desierto costero con cultura Wayúu",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: 12.2188,
      lng: -71.9987
    },
    type: "beaches",
    address: "La Guajira",
    tags: ["Playas", "Cultura", "Desierto"]
  },
  {
    id: "mompox",
    title: "Mompox",
    description: "Ciudad colonial junto al río Magdalena",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: 9.2422,
      lng: -74.4258
    },
    type: "cultural",
    address: "Mompox, Bolívar",
    tags: ["Cultural", "Historia", "Colonial"]
  },
  {
    id: "chicamocha",
    title: "Cañón del Chicamocha",
    description: "Impresionante cañón con teleférico",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: 6.8472,
      lng: -72.9889
    },
    type: "mountains",
    address: "Santander",
    tags: ["Montañas", "Aventura", "Naturaleza"]
  },
  {
    id: "rosario",
    title: "Islas del Rosario",
    description: "Archipiélago coralino con aguas cristalinas",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: 10.1811,
      lng: -75.7972
    },
    type: "beaches",
    address: "Cartagena, Bolívar",
    tags: ["Playas", "Snorkel", "Isla"]
  },
  {
    id: "villadeleyva",
    title: "Villa de Leyva",
    description: "Pueblo colonial con la plaza más grande de Colombia",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: 5.6325,
      lng: -73.5244
    },
    type: "cultural",
    address: "Villa de Leyva, Boyacá",
    tags: ["Cultural", "Colonial", "Historia"]
  },
  {
    id: "chingaza",
    title: "Parque Chingaza",
    description: "Páramo con lagos y fauna única",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: 4.5283,
      lng: -73.7458
    },
    type: "mountains",
    address: "Cundinamarca",
    tags: ["Montañas", "Naturaleza", "Páramo"]
  },
  {
    id: "santuariolajas",
    title: "Santuario Las Lajas",
    description: "Basílica neogótica construida sobre un cañón",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: 0.8149,
      lng: -77.5847
    },
    type: "cultural",
    address: "Ipiales, Nariño",
    tags: ["Cultural", "Religioso", "Arquitectura"]
  },
  {
    id: "palomino",
    title: "Palomino",
    description: "Playa paradisíaca con río y montaña",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: 11.2033,
      lng: -73.5666
    },
    type: "beaches",
    address: "La Guajira",
    tags: ["Playas", "Naturaleza", "Ecoturismo"]
  },
  {
    id: "cocuy",
    title: "Sierra Nevada del Cocuy",
    description: "Cordillera con glaciares y lagunas",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: 6.4114,
      lng: -72.3333
    },
    type: "mountains",
    address: "Boyacá",
    tags: ["Montañas", "Glaciares", "Aventura"]
  },
  {
    id: "barichara",
    title: "Barichara",
    description: "El pueblo más lindo de Colombia",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: 6.6333,
      lng: -73.2333
    },
    type: "cultural",
    address: "Barichara, Santander",
    tags: ["Cultural", "Colonial", "Arquitectura"]
  },
  {
    id: "gorgona",
    title: "Isla Gorgona",
    description: "Isla prístina con rica biodiversidad",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: 2.9666,
      lng: -78.1833
    },
    type: "ecotourism",
    address: "Pacífico Colombiano",
    tags: ["Naturaleza", "Isla", "Buceo"]
  },
  {
    id: "puracevolcan",
    title: "Volcán Puracé",
    description: "Volcán activo en el Macizo Colombiano",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: 2.3166,
      lng: -76.3833
    },
    type: "mountains",
    address: "Cauca",
    tags: ["Montañas", "Volcán", "Naturaleza"]
  }
]; 