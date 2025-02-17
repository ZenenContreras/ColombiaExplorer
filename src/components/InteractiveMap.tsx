import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import LocationCard from "./LocationCard";
import MapComponent from "./MapComponent";

interface Location {
  id: string;
  title: string;
  description: string;
  image: string;
  coordinates: { x: number; y: number };
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
    description:
      "A UNESCO World Heritage site featuring colorful colonial architecture.",
    image: "https://images.unsplash.com/photo-1583997052103-b4a1cb974ce3",
    coordinates: { x: 30, y: 40 },
    type: "cultural",
    address: "Centro Histórico, Cartagena",
    hours: "Open 24/7",
    phone: "+57 5 6600380",
    website: "https://cartagena.gov.co",
    tags: ["Historic", "Cultural"],
  },
  {
    id: "2",
    title: "Tayrona National Park",
    description:
      "Beautiful national park with pristine beaches and hiking trails.",
    image: "https://images.unsplash.com/photo-1598881034666-a8796f3797fd",
    coordinates: { x: 70, y: 20 },
    type: "nature",
    address: "Santa Marta, Magdalena",
    hours: "6:00 AM - 5:00 PM",
    phone: "+57 5 4211732",
    website: "https://www.parquetayrona.com",
    tags: ["Nature", "Beach"],
  },
];

const InteractiveMap = ({
  locations = defaultLocations,
  selectedType,
  onLocationSelect = () => {},
}: InteractiveMapProps) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);

  const filteredLocations = selectedType
    ? locations.filter((location) => location.type === selectedType)
    : locations;

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    onLocationSelect(location);
  };

  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'beaches':
        return 'bg-blue-500 shadow-blue-500/50';
      case 'mountains':
        return 'bg-green-500 shadow-green-500/50';
      case 'cultural':
        return 'bg-red-500 shadow-red-500/50';
      case 'ecotourism':
        return 'bg-yellow-500 shadow-yellow-500/50';
      default:
        return 'bg-gray-500 shadow-gray-500/50';
    }
  };

  return (
    <div className="relative w-full h-full bg-white rounded-xl shadow-xl overflow-hidden">
      {/* Fondo del mapa */}
      <div className="absolute inset-0 bg-[url('/colombia-map-bg.svg')] bg-cover bg-center opacity-20" />
      
      {/* Contenedor del mapa */}
      <div className="relative w-full h-full p-8">
        {/* Título y leyenda */}
        <div className="absolute top-4 left-4 z-10 bg-white/90 p-4 rounded-lg shadow-lg backdrop-blur-sm">
          <h3 className="text-xl font-bold mb-2">Destinos en Colombia</h3>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm">Playas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm">Montañas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm">Cultural</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-sm">Ecoturismo</span>
            </div>
          </div>
        </div>

        {/* Marcadores de ubicación */}
        {filteredLocations.map((location) => (
          <motion.div
            key={location.id}
            className="absolute"
            style={{
              left: `${location.coordinates.x}%`,
              top: `${location.coordinates.y}%`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
          >
            <button
              className="relative group"
              onMouseEnter={() => setHoveredLocation(location)}
              onMouseLeave={() => setHoveredLocation(null)}
              onClick={() => handleLocationClick(location)}
            >
              <motion.div
                className={`w-4 h-4 rounded-full ${getMarkerColor(location.type)} shadow-lg cursor-pointer relative`}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <motion.div
                className={`w-8 h-8 rounded-full ${getMarkerColor(location.type)} absolute -top-2 -left-2 -z-10 opacity-30`}
                animate={{
                  scale: [1, 2],
                  opacity: [0.3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </button>

            {/* Tooltip al hacer hover */}
            <AnimatePresence>
              {hoveredLocation?.id === location.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-20 w-48 bg-white rounded-lg shadow-xl p-3 -translate-x-1/2 translate-y-2"
                >
                  <div className="flex gap-2">
                    <img
                      src={location.image}
                      alt={location.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-sm">{location.title}</h4>
                      <p className="text-xs text-gray-500">{location.address}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* Modal de detalles */}
        <AnimatePresence>
          {selectedLocation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedLocation(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl p-6 max-w-lg w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedLocation.image}
                  alt={selectedLocation.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-2xl font-bold mb-2">{selectedLocation.title}</h3>
                <p className="text-gray-600 mb-4">{selectedLocation.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedLocation.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveMap;
