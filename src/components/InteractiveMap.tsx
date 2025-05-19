import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LocationCard from "./LocationCard";
import MapComponent from "./MapComponent";
import { Input } from "./ui/input";

interface Location {
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
  hours: string;
  phone: string;
  website: string;
  tags: string[];
}

interface InteractiveMapProps {
  locations?: Location[]; 
  selectedType?: string;
  onLocationSelect?: (location: Location) => void;
}

const defaultLocations: Location[] = [
  {
    id: "1",
    title: "Cartagena Historic Center",
    description: "A UNESCO World Heritage site featuring colorful colonial architecture.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: 10.3932,
      lng: -75.4832
    },
    type: "cultural",
    address: "Centro Histórico, Cartagena",
    hours: "Open 24/7",
    phone: "+57 5 6600380",
    website: "https://cartagena.gov.co",
    tags: ["Histórico", "Cultural"],
  },
  {
    id: "2",
    title: "Tayrona National Park",
    description: "Beautiful national park with pristine beaches and hiking trails.",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
    coordinates: {
      lat: 11.3147,
      lng: -74.0307
    },
    type: "beaches",
    address: "Santa Marta, Magdalena",
    hours: "6:00 AM - 5:00 PM",
    phone: "+57 5 4211732",
    website: "https://www.parquetayrona.com",
    tags: ["Naturaleza", "Playa"],
  },
  {
    id: "3",
    title: "San Andrés Island",
    description: "Caribbean island with white sand beaches and turquoise waters.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 12.5847, lng: -81.7006 },
    type: "beaches",
    address: "San Andrés, San Andrés y Providencia",
    hours: "24/7",
    phone: "+57 8 5130801",
    website: "https://www.sanandres.gov.co",
    tags: ["Playa", "Isla"],
  },
  {
    id: "4",
    title: "Providencia Island",
    description: "Paradise island with coral reefs and calm beaches.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 13.3487, lng: -81.3744 },
    type: "beaches",
    address: "Providencia, San Andrés y Providencia",
    hours: "24/7",
    phone: "+57 8 5148925",
    website: "https://providencia.gov.co",
    tags: ["Playa", "Isla", "Snorkel"],
  },
  {
    id: "5",
    title: "Playa Blanca",
    description: "One of the most beautiful beaches in the Colombian Caribbean.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 10.2544, lng: -75.6053 },
    type: "beaches",
    address: "Cartagena, Bolívar",
    hours: "24/7",
    phone: "+57 5 6502010",
    website: "https://playablanca.co",
    tags: ["Playa", "Turismo"],
  },
  {
    id: "6",
    title: "Valle del Cocora",
    description: "Home of the wax palm and beautiful hiking trails.",
    image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849",
    coordinates: { lat: 4.6389, lng: -75.4889 },
    type: "mountains",
    address: "Salento, Quindío",
    hours: "6:00 AM - 6:00 PM",
    phone: "+57 6 7593464",
    website: "https://valledelcocora.com.co",
    tags: ["Montaña", "Naturaleza"],
  },
  {
    id: "7",
    title: "PNN Los Nevados",
    description: "National park with glaciers and unique ecosystems.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    coordinates: { lat: 4.8828, lng: -75.3333 },
    type: "mountains",
    address: "Manizales, Caldas",
    hours: "5:00 AM - 4:00 PM",
    phone: "+57 6 8850550",
    website: "https://parquesnacionales.gov.co/nevados",
    tags: ["Montaña", "Aventura"],
  },
  {
    id: "8",
    title: "Monserrate",
    description: "Iconic mountain overlooking Bogotá.",
    image: "https://images.unsplash.com/photo-1597006438013-0f0cca2c1a03",
    coordinates: { lat: 4.6058, lng: -74.0556 },
    type: "mountains",
    address: "Bogotá, Colombia",
    hours: "7:00 AM - 11:00 PM",
    phone: "+57 1 2840070",
    website: "https://www.cerromonserrate.com",
    tags: ["Montaña", "Cultural"],
  },
  {
    id: "9",
    title: "Ciudad Perdida",
    description: "Ancient indigenous city in the Sierra Nevada.",
    image: "https://images.unsplash.com/photo-1569242840510-5c8a3b53b719",
    coordinates: { lat: 11.0384, lng: -73.9267 },
    type: "cultural",
    address: "Sierra Nevada, Santa Marta",
    hours: "8:00 AM - 5:00 PM",
    phone: "+57 5 4217777",
    website: "https://ciudadperdida.co",
    tags: ["Cultural", "Arqueología"],
  },
  {
    id: "10",
    title: "San Agustín Archaeological Park",
    description: "Pre-Columbian statues and archaeological wonders.",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    coordinates: { lat: 1.8879, lng: -76.2756 },
    type: "cultural",
    address: "San Agustín, Huila",
    hours: "8:00 AM - 4:00 PM",
    phone: "+57 8 8373333",
    website: "https://sanagustin.gov.co",
    tags: ["Cultural", "Historia"],
  },
  {
    id: "11",
    title: "Amazon Rainforest",
    description: "Amazon jungle and indigenous communities.",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368",
    coordinates: { lat: -4.2186, lng: -69.9312 },
    type: "ecotourism",
    address: "Leticia, Amazonas",
    hours: "Tours programados",
    phone: "+57 8 5927896",
    website: "https://amazonasturismo.gov.co",
    tags: ["Ecoturismo", "Naturaleza"],
  },
  {
    id: "12",
    title: "Guajira Desert",
    description: "Desert, virgin beaches and Wayuu culture.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    coordinates: { lat: 12.2188, lng: -71.9987 },
    type: "ecotourism",
    address: "Cabo de la Vela, La Guajira",
    hours: "Tours programados",
    phone: "+57 5 7272333",
    website: "https://laguajiraturistica.com",
    tags: ["Ecoturismo", "Desierto"],
  },
  {
    id: "13",
    title: "Tatacoa Desert",
    description: "Red and gray desert with astronomical observatory.",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    coordinates: { lat: 3.2344, lng: -75.1645 },
    type: "ecotourism",
    address: "Villavieja, Huila",
    hours: "24/7",
    phone: "+57 8 8797042",
    website: "https://tatacoa.com",
    tags: ["Desierto", "Astronomía"],
  },
  {
    id: "14",
    title: "Las Lajas Sanctuary",
    description: "Neo-Gothic basilica built over a canyon.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    coordinates: { lat: 0.8149, lng: -77.5847 },
    type: "cultural",
    address: "Ipiales, Nariño",
    hours: "6:00 AM - 6:00 PM",
    phone: "+57 2 7733444",
    website: "https://santuariodelaslajas.org",
    tags: ["Religioso", "Cultural"],
  },
  {
    id: "15",
    title: "Caño Cristales",
    description: "The river of five colors.",
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b43",
    coordinates: { lat: 2.2666, lng: -73.7910 },
    type: "ecotourism",
    address: "La Macarena, Meta",
    hours: "Tours programados",
    phone: "+57 8 6614800",
    website: "https://canocristales.co",
    tags: ["Naturaleza", "Río"],
  },
  {
    id: "16",
    title: "Villa de Leyva",
    description: "Colonial city with the largest cobblestone square in South America.",
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b43",
    coordinates: { lat: 5.6325, lng: -73.5244 },
    type: "cultural",
    address: "Villa de Leyva, Boyacá",
    hours: "24/7",
    phone: "+57 8 7320830",
    website: "https://villadeleyva.gov.co",
    tags: ["Colonial", "Cultural"],
  },
  {
    id: "17",
    title: "Barichara",
    description: "Charming colonial town known for its stone streets and architecture.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    coordinates: { lat: 6.6358, lng: -73.2218 },
    type: "cultural",
    address: "Barichara, Santander",
    hours: "24/7",
    phone: "+57 7 7267011",
    website: "https://barichara-santander.gov.co",
    tags: ["Colonial", "Cultural"],
  },
  {
    id: "18",
    title: "Chicamocha Canyon",
    description: "Impressive canyon with adventure sports and cable car.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    coordinates: { lat: 6.6981, lng: -73.0606 },
    type: "mountains",
    address: "Santander, Colombia",
    hours: "8:00 AM - 6:00 PM",
    phone: "+57 7 7282000",
    website: "https://parquenacionaldelchicamocha.com",
    tags: ["Montaña", "Aventura"],
  },
  {
    id: "19",
    title: "Guatapé & El Peñol",
    description: "Colorful town and giant rock with panoramic views.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    coordinates: { lat: 6.2326, lng: -75.1636 },
    type: "mountains",
    address: "Guatapé, Antioquia",
    hours: "8:00 AM - 6:00 PM",
    phone: "+57 4 8610160",
    website: "https://guatape-antioquia.gov.co",
    tags: ["Montaña", "Cultural"],
  },
  {
    id: "20",
    title: "Mompox",
    description: "Colonial town on the Magdalena River, UNESCO World Heritage.",
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b43",
    coordinates: { lat: 9.2419, lng: -74.4261 },
    type: "cultural",
    address: "Mompox, Bolívar",
    hours: "24/7",
    phone: "+57 5 6856000",
    website: "https://mompox-bolivar.gov.co",
    tags: ["Colonial", "Cultural"],
  },
  {
    id: "21",
    title: "Isla Gorgona",
    description: "Island national park with rich biodiversity and diving.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    coordinates: { lat: 2.9667, lng: -78.1833 },
    type: "ecotourism",
    address: "Isla Gorgona, Cauca",
    hours: "Tours programados",
    phone: "+57 2 8926000",
    website: "https://parquesnacionales.gov.co/gorgona",
    tags: ["Isla", "Naturaleza"],
  },
  {
    id: "22",
    title: "Nuquí",
    description: "Pacific coast paradise for ecotourism and whale watching.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    coordinates: { lat: 5.7122, lng: -77.2708 },
    type: "ecotourism",
    address: "Nuquí, Chocó",
    hours: "24/7",
    phone: "+57 4 2712030",
    website: "https://nuqui-choco.gov.co",
    tags: ["Playa", "Ecoturismo"],
  },
  {
    id: "23",
    title: "Bahía Solano",
    description: "Pacific beach, jungle and adventure sports.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    coordinates: { lat: 6.2186, lng: -77.4011 },
    type: "beaches",
    address: "Bahía Solano, Chocó",
    hours: "24/7",
    phone: "+57 4 2712030",
    website: "https://bahiasolano-choco.gov.co",
    tags: ["Playa", "Naturaleza"],
  },
  {
    id: "24",
    title: "Cabo de la Vela",
    description: "Desert, beaches and Wayuu culture in La Guajira.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    coordinates: { lat: 12.2217, lng: -72.1647 },
    type: "ecotourism",
    address: "Cabo de la Vela, La Guajira",
    hours: "24/7",
    phone: "+57 5 7272333",
    website: "https://laguajiraturistica.com",
    tags: ["Desierto", "Cultural"],
  },
  {
    id: "25",
    title: "Sierra Nevada de Santa Marta",
    description: "Highest coastal mountain in the world, indigenous culture and trekking.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    coordinates: { lat: 10.8578, lng: -73.7118 },
    type: "mountains",
    address: "Santa Marta, Magdalena",
    hours: "Tours programados",
    phone: "+57 5 4211732",
    website: "https://santamarta.gov.co",
    tags: ["Montaña", "Cultural"],
  },
  {
    id: "26",
    title: "Cocuy National Park",
    description: "Snow-capped peaks, glaciers and high-altitude trekking.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    coordinates: { lat: 6.4167, lng: -72.4167 },
    type: "mountains",
    address: "El Cocuy, Boyacá",
    hours: "Tours programados",
    phone: "+57 8 7890000",
    website: "https://parquesnacionales.gov.co/cocuy",
    tags: ["Montaña", "Aventura"],
  },
  {
    id: "27",
    title: "Leticia",
    description: "Gateway to the Amazon, biodiversity and indigenous culture.",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368",
    coordinates: { lat: -4.215, lng: -69.9406 },
    type: "ecotourism",
    address: "Leticia, Amazonas",
    hours: "24/7",
    phone: "+57 8 5927896",
    website: "https://leticia-amazonas.gov.co",
    tags: ["Amazonas", "Ecoturismo"],
  },
  {
    id: "28",
    title: "Popayán",
    description: "White city, colonial architecture and Holy Week traditions.",
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b43",
    coordinates: { lat: 2.4448, lng: -76.6147 },
    type: "cultural",
    address: "Popayán, Cauca",
    hours: "24/7",
    phone: "+57 2 8200000",
    website: "https://popayan-cauca.gov.co",
    tags: ["Colonial", "Cultural"],
  },
  {
    id: "29",
    title: "Santa Cruz de Mompox",
    description: "Magical town on the Magdalena River, colonial and cultural heritage.",
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b43",
    coordinates: { lat: 9.2419, lng: -74.4261 },
    type: "cultural",
    address: "Mompox, Bolívar",
    hours: "24/7",
    phone: "+57 5 6856000",
    website: "https://mompox-bolivar.gov.co",
    tags: ["Colonial", "Cultural"],
  },
  {
    id: "30",
    title: "La Macarena",
    description: "Gateway to Caño Cristales and natural wonders.",
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b43",
    coordinates: { lat: 2.1800, lng: -73.7861 },
    type: "ecotourism",
    address: "La Macarena, Meta",
    hours: "Tours programados",
    phone: "+57 8 6614800",
    website: "https://lamacarena-meta.gov.co",
    tags: ["Naturaleza", "Río"],
  },
  {
    id: "31",
    title: "Catedral de Sal de Zipaquirá",
    description: "Impresionante catedral subterránea tallada en una mina de sal.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 5.0278, lng: -74.0107 },
    type: "cultural",
    address: "Zipaquirá, Cundinamarca",
    hours: "9:00 AM - 5:40 PM",
    phone: "+57 1 8519502",
    website: "https://catedraldesal.gov.co",
    tags: ["Cultural", "Religioso"],
  },
  {
    id: "32",
    title: "Islas del Rosario",
    description: "Archipiélago de aguas cristalinas y corales cerca de Cartagena.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 10.1772, lng: -75.7602 },
    type: "beaches",
    address: "Islas del Rosario, Bolívar",
    hours: "24/7",
    phone: "+57 5 6642441",
    website: "https://islasdelrosario.com",
    tags: ["Playa", "Isla", "Naturaleza"],
  },
  {
    id: "33",
    title: "Desierto de la Tatacoa (Observatorio)",
    description: "Uno de los mejores lugares para observar estrellas en Colombia.",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 3.2215, lng: -75.1741 },
    type: "ecotourism",
    address: "Villavieja, Huila",
    hours: "24/7",
    phone: "+57 8 8797042",
    website: "https://tatacoa.com",
    tags: ["Desierto", "Astronomía", "Naturaleza"],
  },
  {
    id: "34",
    title: "Parque Arví",
    description: "Reserva natural y parque ecológico en las afueras de Medellín.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 6.2986, lng: -75.5007 },
    type: "ecotourism",
    address: "Medellín, Antioquia",
    hours: "9:00 AM - 6:00 PM",
    phone: "+57 4 4442979",
    website: "https://parquearvi.org",
    tags: ["Naturaleza", "Ecoturismo"],
  },
  {
    id: "35",
    title: "Cabo San Juan del Guía",
    description: "Famosa playa y camping en el Parque Tayrona.",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 11.3106, lng: -74.0881 },
    type: "beaches",
    address: "Parque Tayrona, Magdalena",
    hours: "6:00 AM - 5:00 PM",
    phone: "+57 5 4211732",
    website: "https://parquetayrona.com",
    tags: ["Playa", "Camping", "Naturaleza"],
  },
  {
    id: "36",
    title: "Laguna de Tota",
    description: "La laguna más grande de Colombia, con playas de arena blanca.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 5.5547, lng: -72.9247 },
    type: "beaches",
    address: "Aquitania, Boyacá",
    hours: "24/7",
    phone: "+57 8 7400000",
    website: "https://lagunadetota.com",
    tags: ["Playa", "Laguna", "Naturaleza"],
  },
  {
    id: "37",
    title: "Santuario de Flora y Fauna Malpelo",
    description: "Isla oceánica famosa por el buceo y la biodiversidad marina.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 3.9906, lng: -81.5972 },
    type: "ecotourism",
    address: "Isla Malpelo, Pacífico",
    hours: "Tours programados",
    phone: "+57 1 3532400",
    website: "https://parquesnacionales.gov.co/malpelo",
    tags: ["Isla", "Buceo", "Naturaleza"],
  },
  {
    id: "38",
    title: "Cascada Fin del Mundo",
    description: "Impresionante cascada en el Putumayo, rodeada de selva.",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 1.1461, lng: -76.6356 },
    type: "ecotourism",
    address: "Mocoa, Putumayo",
    hours: "8:00 AM - 5:00 PM",
    phone: "+57 8 4296000",
    website: "https://putumayo.gov.co",
    tags: ["Cascada", "Naturaleza", "Aventura"],
  },
  {
    id: "39",
    title: "Termales de Santa Rosa de Cabal",
    description: "Aguas termales y cascadas en un entorno montañoso.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 4.8681, lng: -75.6011 },
    type: "mountains",
    address: "Santa Rosa de Cabal, Risaralda",
    hours: "8:00 AM - 11:00 PM",
    phone: "+57 6 3652000",
    website: "https://termales.com.co",
    tags: ["Montaña", "Termales", "Naturaleza"],
  },
  {
    id: "40",
    title: "Parque Nacional Natural Amacayacu",
    description: "Reserva amazónica con selva, ríos y fauna única.",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: -3.3833, lng: -70.1833 },
    type: "ecotourism",
    address: "Leticia, Amazonas",
    hours: "Tours programados",
    phone: "+57 1 3532400",
    website: "https://parquesnacionales.gov.co/amacayacu",
    tags: ["Amazonas", "Naturaleza", "Selva"],
  },
];

// NUEVO: Tipos de filtro
const CATEGORY_OPTIONS = [
  { key: 'beaches', label: 'Playas', icon: '🏖️' },
  { key: 'mountains', label: 'Montañas', icon: '⛰️' },
  { key: 'cultural', label: 'Cultural', icon: '🏛️' },
  { key: 'ecotourism', label: 'Ecoturismo', icon: '🌿' },
];

const InteractiveMap = ({
  locations = defaultLocations,
  selectedType,
  onLocationSelect = () => {},
}: InteractiveMapProps) => {
  // NUEVO: Filtros múltiples
  const [activeCategories, setActiveCategories] = useState<string[]>(CATEGORY_OPTIONS.map(c => c.key));
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);
  const [tooltip, setTooltip] = useState<{location: Location, x: number, y: number} | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [showNearby, setShowNearby] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // NUEVO: Filtrado por múltiples categorías
  const filteredLocations = useMemo(() =>
    activeCategories.length === 0 ? locations : locations.filter(loc => activeCategories.includes(loc.type)),
    [locations, activeCategories]
  );

  // NUEVO: Manejar cambio de filtros
  const toggleCategory = (cat: string) => {
    setActiveCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleMarkerClick = useCallback((location: Location) => {
    onLocationSelect(location);
  }, [onLocationSelect]);

  // NUEVO: Función para centrar en la ubicación del usuario
  const handleGeolocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setShowNearby(true);
          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 10, { animate: true });
          }
        },
        () => alert('No se pudo obtener tu ubicación'),
        { enableHighAccuracy: true }
      );
    } else {
      alert('Geolocalización no soportada');
    }
  };

  // NUEVO: Filtrado de autocompletado
  useEffect(() => {
    if (searchTerm.length > 0) {
      const term = searchTerm.toLowerCase();
      setSearchResults(
        locations.filter(loc =>
          loc.title.toLowerCase().includes(term) ||
          loc.type.toLowerCase().includes(term) ||
          loc.address.toLowerCase().includes(term) ||
          (loc.tags && loc.tags.some(tag => tag.toLowerCase().includes(term)))
        )
      );
      setShowAutocomplete(true);
    } else {
      setSearchResults([]);
      setShowAutocomplete(false);
    }
  }, [searchTerm, locations]);

  // NUEVO: Selección de sugerencia
  const handleSelectSuggestion = (loc: Location) => {
    setSelectedLocation(loc);
    setShowAutocomplete(false);
    setSearchTerm("");
    if (mapRef.current) {
      mapRef.current.setView([loc.coordinates.lat, loc.coordinates.lng], 12, { animate: true });
    }
  };

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map', {
        center: [4.5709, -74.2973],
        zoom: 6,
        zoomControl: true,
        attributionControl: false,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(mapRef.current);

      fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/COL.geo.json')
        .then(response => response.json())
        .then(data => {
          L.geoJSON(data, {
            style: {
              color: '#2563eb',
              weight: 2,
              fillColor: '#60a5fa',
              fillOpacity: 0.1,
            },
          }).addTo(mapRef.current!);
        });
    }

    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    filteredLocations.forEach(location => {
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="marker-pin ${getMarkerColor(location.type)}">
            <div class="marker-content">
              ${CATEGORY_OPTIONS.find(c => c.key === location.type)?.icon || '📍'}
            </div>
            <div class="pulse"></div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const marker = L.marker([location.coordinates.lat, location.coordinates.lng], {
        icon: customIcon,
      })
        .addTo(mapRef.current!)
        .on('click', () => setSelectedLocation(location))
        .on('mouseover', (e: any) => {
          setHoveredLocation(location);
          // NUEVO: Tooltip
          const { x, y } = mapRef.current!.latLngToContainerPoint([location.coordinates.lat, location.coordinates.lng]);
          setTooltip({ location, x, y });
        })
        .on('mouseout', () => {
          setHoveredLocation(null);
          setTooltip(null);
        });

      markersRef.current[location.id] = marker;
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [filteredLocations]);

  // NUEVO: Escuchar evento global para abrir popup desde el navbar
  useEffect(() => {
    const handler = (e: any) => {
      const id = e.detail;
      const loc = locations.find(l => l.id === id);
      if (loc) {
        setSelectedLocation(loc);
        if (mapRef.current) {
          mapRef.current.setView([loc.coordinates.lat, loc.coordinates.lng], 12, { animate: true });
        }
      }
    };
    window.addEventListener('openMapLocation', handler);
    return () => window.removeEventListener('openMapLocation', handler);
  }, [locations]);

  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'beaches':
        return 'marker-blue';
      case 'mountains':
        return 'marker-green';
      case 'cultural':
        return 'marker-red';
      case 'ecotourism':
        return 'marker-yellow';
      default:
        return 'marker-gray';
    }
  };

  return (
    <div className="relative h-[750px] sm:h-[75vh] bg-white rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.002]">
      {/* NUEVO: Botón de geolocalización */}
      <button
        className="absolute bottom-6 right-6 z-30 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
        onClick={handleGeolocate}
        title="Centrar en mi ubicación"
      >
        <span role="img" aria-label="Ubicación">📍</span> Cerca de mí
      </button>
      {/* NUEVO: Filtros de categoría */}
      <div className="absolute top-4 right-4 z-30 flex gap-2 bg-white/90 p-2 rounded-lg shadow-lg">
        {CATEGORY_OPTIONS.map(cat => (
          <button
            key={cat.key}
            className={`px-3 py-1 rounded-full font-semibold flex items-center gap-1 transition-all duration-200 ${activeCategories.includes(cat.key) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            onClick={() => toggleCategory(cat.key)}
          >
            <span>{cat.icon}</span> {cat.label}
          </button>
        ))}
      </div>
      {/* NUEVO: Buscador con autocompletado */}
      <div className="absolute top-4 left-4 z-30 w-[90vw] max-w-xs sm:max-w-sm md:max-w-md">
        <Input
          ref={searchInputRef}
          className="w-full px-4 py-2 rounded-lg border border-blue-200 shadow-sm focus:ring-2 focus:ring-blue-400"
          placeholder="Buscar destino, tipo o región..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm && setShowAutocomplete(true)}
        />
        {/* Card de autocompletado */}
        {showAutocomplete && searchResults.length > 0 && (
          <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden max-h-72 overflow-y-auto">
            {searchResults.slice(0, 6).map((loc) => (
              <button
                key={loc.id}
                className="flex items-center w-full gap-3 px-4 py-3 hover:bg-blue-50 transition-all text-left"
                onClick={() => handleSelectSuggestion(loc)}
              >
                <img src={loc.image} alt={loc.title} className="w-10 h-10 object-cover rounded-md" />
                <div className="flex-1">
                  <div className="font-semibold text-blue-700 text-sm line-clamp-1">{loc.title}</div>
                  <div className="text-xs text-gray-500 line-clamp-1">{loc.address}</div>
                  <div className="text-xs text-gray-400">{loc.type.charAt(0).toUpperCase() + loc.type.slice(1)}</div>
                </div>
              </button>
            ))}
            {searchResults.length > 6 && (
              <div className="text-xs text-gray-400 px-4 py-2">Y más resultados...</div>
            )}
          </div>
        )}
      </div>
      <div id="map" className="absolute inset-0 z-10 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-2xl" />
      
      {/* Leyenda responsive con animación */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-4 left-4 z-20 bg-white/90 p-2 sm:p-4 rounded-lg shadow-lg backdrop-blur-sm text-sm sm:text-base"
      >
        <h3 className="text-lg sm:text-xl font-bold mb-2">Destinos en Colombia</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">🏖️</div>
            <span className="text-xs sm:text-sm">Playas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">⛰️</div>
            <span className="text-xs sm:text-sm">Montañas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">🏛️</div>
            <span className="text-xs sm:text-sm">Cultural</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">🌿</div>
            <span className="text-xs sm:text-sm">Ecoturismo</span>
          </div>
        </div>
      </motion.div>

      {/* NUEVO: Tooltip emergente */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed z-50 pointer-events-none"
            style={{
              left: window.innerWidth < 640 ? 20 : tooltip.x + 60,
              top: window.innerWidth < 640 ? window.innerHeight - 180 : tooltip.y,
              maxWidth: window.innerWidth < 640 ? '90vw' : 320
            }}
          >
            <div className="bg-white rounded-lg shadow-lg p-3 flex items-center gap-3 min-w-[180px] sm:min-w-[220px] border border-blue-100">
              <img src={tooltip.location.image} alt={tooltip.location.title} className="w-12 h-12 object-cover rounded-md" />
              <div>
                <div className="font-bold text-blue-700 text-sm">{tooltip.location.title}</div>
                <div className="text-xs text-gray-500 mb-1">{CATEGORY_OPTIONS.find(c => c.key === tooltip.location.type)?.label}</div>
                <div className="flex items-center gap-1 text-yellow-500 text-xs mb-1">★ 4.8</div>
                <button className="text-xs text-blue-600 underline" onClick={() => setSelectedLocation(tooltip.location)}>Ver más</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NUEVO: Círculo de radio si hay ubicación de usuario */}
      {userLocation && showNearby && (
        <div className="absolute z-20 pointer-events-none" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 1 }}
            className="rounded-full bg-blue-400"
            style={{ width: 200, height: 200 }}
          />
        </div>
      )}

      {/* Modal de detalles */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-0 sm:p-4"
            onClick={() => setSelectedLocation(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-t-2xl sm:rounded-xl p-2 sm:p-6 w-full max-w-full sm:max-w-lg relative shadow-xl mx-0 sm:mx-auto overflow-y-auto max-h-[90vh] sm:max-h-[80vh]"
              style={{
                boxSizing: 'border-box',
                margin: 0,
                bottom: 0,
                left: 0,
                right: 0,
                position: window.innerWidth < 640 ? 'fixed' : 'relative',
                top: window.innerWidth < 640 ? 'auto' : 'auto',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Galería de imágenes (placeholder: solo una imagen por ahora) */}
              <div className="relative mb-4">
                <img
                  src={selectedLocation.image}
                  alt={selectedLocation.title}
                  className="w-full h-40 sm:h-48 object-cover rounded-lg"
                />
                {/* Botón de favorito (premium) */}
                <button
                  className="absolute top-3 right-3 bg-white/80 rounded-full p-2 shadow hover:bg-blue-100 transition"
                  title="Guardar en favoritos (Premium)"
                >
                  <span role="img" aria-label="Favorito">💙</span>
                </button>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">{selectedLocation.title}</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedLocation.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 rounded-full text-xs sm:text-sm text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">{selectedLocation.description}</p>
              <div className="mb-2 text-xs sm:text-sm">
                <strong>Ubicación:</strong> {selectedLocation.address}
              </div>
              <div className="mb-2 text-xs sm:text-sm">
                <strong>Horario:</strong> {selectedLocation.hours}
              </div>
              <div className="mb-2 text-xs sm:text-sm">
                <strong>Teléfono:</strong> {selectedLocation.phone}
              </div>
              <div className="mb-2 text-xs sm:text-sm">
                <strong>Sitio web:</strong> <a href={selectedLocation.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Visitar</a>
              </div>
              {/* Recomendaciones (placeholder) */}
              <div className="mb-2 text-xs sm:text-sm">
                <strong>Recomendaciones:</strong> Lleva protector solar, agua y cámara fotográfica.
              </div>
              {/* Clima (placeholder) */}
              <div className="mb-2 text-xs sm:text-sm">
                <strong>Clima:</strong> 28°C, Soleado ☀️
              </div>
              {/* Acceso (placeholder) */}
              <div className="mb-2 text-xs sm:text-sm">
                <strong>Acceso:</strong> Carretera pavimentada, transporte público disponible.
              </div>
              {/* Alojamientos cercanos (placeholder) */}
              <div className="mb-2 text-xs sm:text-sm">
                <strong>Alojamientos cercanos:</strong> Hotel Paraíso, EcoHostal Colombia.
              </div>
              {/* Actividades disponibles (placeholder) */}
              <div className="mb-2 text-xs sm:text-sm">
                <strong>Actividades:</strong> Senderismo, snorkel, tour cultural.
              </div>
              {/* Funcionalidades premium visuales */}
              <div className="mt-4 flex flex-wrap gap-2">
                <button className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold" title="Descargar ruta (Premium)">Descargar ruta</button>
                <button className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold" title="Itinerario personalizado (Premium)">Itinerario personalizado</button>
                <button className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold" title="Agregar al calendario (Premium)">Agregar al calendario</button>
                <button className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold" title="Recomendaciones de locales (Premium)">Tips de locales</button>
              </div>
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
                onClick={() => setSelectedLocation(null)}
                title="Cerrar"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveMap;
