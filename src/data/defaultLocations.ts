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
  }
]; 