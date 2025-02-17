import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LocationCard from "./LocationCard";
import MapComponent from "./MapComponent";

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
    description:
      "A UNESCO World Heritage site featuring colorful colonial architecture.",
    image: "https://images.unsplash.com/photo-1583997052103-b4a1cb974ce3",
    coordinates: {
      lat: 10.3932,
      lng: -75.4832
    },
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
    coordinates: {
      lat: 11.3147,
      lng: -74.0307
    },
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
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const filteredLocations = useMemo(() => 
    selectedType ? locations.filter(loc => loc.type === selectedType) : locations,
    [locations, selectedType]
  );

  const handleMarkerClick = useCallback((location: Location) => {
    onLocationSelect(location);
  }, [onLocationSelect]);

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

    locations.forEach(location => {
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="marker-pin ${getMarkerColor(location.type)}">
            <div class="marker-content">
              ${location.type === 'beaches' ? '🏖️' : 
                location.type === 'mountains' ? '⛰️' : 
                location.type === 'cultural' ? '🏛️' : '🌿'}
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
        .on('click', () => handleMarkerClick(location))
        .on('mouseover', () => setHoveredLocation(location))
        .on('mouseout', () => setHoveredLocation(null));

      markersRef.current[location.id] = marker;
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [locations, selectedType]);

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
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] bg-white rounded-xl shadow-xl overflow-hidden">
      <div id="map" className="absolute inset-0 z-10" />
      
      {/* Leyenda responsive */}
      <div className="absolute top-4 left-4 z-20 bg-white/90 p-2 sm:p-4 rounded-lg shadow-lg backdrop-blur-sm text-sm sm:text-base">
        <h3 className="text-xl font-bold mb-2">Destinos en Colombia</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center">🏖️</div>
            <span className="text-sm">Playas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center">⛰️</div>
            <span className="text-sm">Montañas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center">🏛️</div>
            <span className="text-sm">Cultural</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center">🌿</div>
            <span className="text-sm">Ecoturismo</span>
          </div>
        </div>
      </div>

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
  );
};

export default InteractiveMap;
