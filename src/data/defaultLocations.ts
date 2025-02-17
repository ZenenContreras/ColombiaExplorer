export interface Location {
  id: string;
  title: string;
  type: string;
  tags: string[];
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const defaultLocations: Location[] = [
  {
    id: "cartagena",
    title: "Cartagena",
    type: "Ciudad Histórica",
    tags: ["playas", "cultural", "colonial"],
    image: "/images/cartagena.jpg",
    coordinates: {
      lat: 10.3932,
      lng: -75.4832
    }
  },
  {
    id: "tayrona",
    title: "Parque Tayrona",
    type: "Parque Nacional",
    tags: ["playas", "naturaleza", "ecoturismo"],
    image: "/images/tayrona.jpg",
    coordinates: {
      lat: 11.3147,
      lng: -74.0307
    }
  },
  {
    id: "cocora",
    title: "Valle del Cocora",
    type: "Valle",
    tags: ["montañas", "naturaleza", "senderismo"],
    image: "/images/cocora.jpg",
    coordinates: {
      lat: 4.6381,
      lng: -75.4870
    }
  },
  {
    id: "guatape",
    title: "Guatapé",
    type: "Pueblo Colorido",
    tags: ["cultural", "lagos", "arquitectura"],
    image: "/images/guatape.jpg",
    coordinates: {
      lat: 6.2342,
      lng: -75.1574
    }
  },
  {
    id: "sanandres",
    title: "San Andrés",
    type: "Isla",
    tags: ["playas", "mar", "caribe"],
    image: "/images/sanandres.jpg",
    coordinates: {
      lat: 12.5847,
      lng: -81.7006
    }
  },
  {
    id: "bogota",
    title: "Bogotá",
    type: "Ciudad Capital",
    tags: ["cultural", "museos", "gastronomía"],
    image: "/images/bogota.jpg",
    coordinates: {
      lat: 4.7110,
      lng: -74.0721
    }
  },
  {
    id: "medellin",
    title: "Medellín",
    type: "Ciudad Innovadora",
    tags: ["cultural", "moderno", "primavera"],
    image: "/images/medellin.jpg",
    coordinates: {
      lat: 6.2442,
      lng: -75.5812
    }
  },
  {
    id: "cali",
    title: "Cali",
    type: "Capital de la Salsa",
    tags: ["cultural", "baile", "gastronomía"],
    image: "/images/cali.jpg",
    coordinates: {
      lat: 3.4516,
      lng: -76.5320
    }
  }
]; 