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
}

export const defaultLocations: Location[] = [
  {
    id: "cartagena",
    title: "Cartagena",
    description: "Ciudad histórica con arquitectura colonial",
    image: "/images/cartagena.jpg",
    coordinates: {
      lat: 10.3932,
      lng: -75.4832
    },
    type: "cultural",
    address: "Cartagena, Bolívar",
    tags: ["Cultural", "Playas", "Historia"]
  },
  {
    id: "tayrona",
    title: "Parque Tayrona",
    description: "Parque nacional con playas vírgenes",
    image: "/images/tayrona.jpg",
    coordinates: {
      lat: 11.3147,
      lng: -74.0307
    },
    type: "beaches",
    address: "Santa Marta, Magdalena",
    tags: ["Playas", "Naturaleza", "Ecoturismo"]
  },
  {
    id: "cocora",
    title: "Valle del Cocora",
    description: "Valle con las palmeras de cera más altas del mundo",
    image: "/images/cocora.jpg",
    coordinates: {
      lat: 4.6381,
      lng: -75.4870
    },
    type: "mountains",
    address: "Salento, Quindío",
    tags: ["Montañas", "Naturaleza"]
  },
  {
    id: "sanandres",
    title: "San Andrés",
    description: "Isla paradisíaca en el Caribe",
    image: "/images/sanandres.jpg",
    coordinates: {
      lat: 12.5847,
      lng: -81.7006
    },
    type: "beaches",
    address: "San Andrés Isla",
    tags: ["Playas", "Isla"]
  },
  {
    id: "guatape",
    title: "Guatapé",
    description: "Pueblo colorido con el Peñol",
    image: "/images/guatape.jpg",
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
    image: "/images/amazonas.jpg",
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
    image: "/images/monserrate.jpg",
    coordinates: {
      lat: 4.6058,
      lng: -74.0556
    },
    type: "cultural",
    address: "Bogotá, Cundinamarca",
    tags: ["Cultural", "Religioso", "Montaña"]
  },
  {
    id: "ciudadperdida",
    title: "Ciudad Perdida",
    description: "Antigua ciudad indígena en la Sierra Nevada",
    image: "/images/ciudadperdida.jpg",
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
    image: "/images/providencia.jpg",
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
    image: "/images/canocristales.jpg",
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
    image: "/images/tatacoa.jpg",
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
    image: "/images/sanagustin.jpg",
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
    image: "/images/nevados.jpg",
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
    image: "/images/guajira.jpg",
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
    image: "/images/mompox.jpg",
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
    image: "/images/chicamocha.jpg",
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
    image: "/images/rosario.jpg",
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
    image: "/images/villadeleyva.jpg",
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
    image: "/images/chingaza.jpg",
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
    image: "/images/lajas.jpg",
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
    image: "/images/palomino.jpg",
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
    image: "/images/cocuy.jpg",
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
    image: "/images/barichara.jpg",
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
    image: "/images/gorgona.jpg",
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
    image: "/images/purace.jpg",
    coordinates: {
      lat: 2.3166,
      lng: -76.3833
    },
    type: "mountains",
    address: "Cauca",
    tags: ["Montañas", "Volcán", "Naturaleza"]
  }
]; 