import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LocationCard from "./LocationCard";
import MapComponent from "./MapComponent";
import { Input } from "./ui/input";
import LocalBusinessList, { LocalBusiness } from "./LocalBusinessList";
import { defaultLocations, Location } from "../data/defaultLocations";

interface InteractiveMapProps {
  locations?: Location[]; 
  selectedType?: string;
  onLocationSelect?: (location: Location) => void;
}

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
              <div className="relative mb-4 flex flex-col gap-2">
                <img
                  src={selectedLocation.image}
                  alt={selectedLocation.title}
                  className="w-full h-40 sm:h-48 object-cover rounded-xl border border-gray-100 shadow-sm"
                />
                {/* Simulación de galería si hay más imágenes en el futuro */}
                {/* <div className="flex gap-2 mt-2 overflow-x-auto">
                  {[selectedLocation.image, ...otrasImagenes].map((img, idx) => (
                    <img key={idx} src={img} alt={selectedLocation.title + idx} className="w-16 h-12 object-cover rounded border" />
                  ))}
                </div> */}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-blue-900 leading-tight">{selectedLocation.title}</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedLocation.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full text-xs sm:text-sm font-semibold border border-blue-200 shadow-sm whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 text-sm sm:text-base leading-relaxed">{selectedLocation.description}</p>
              <div className="mb-2 text-xs sm:text-sm text-gray-600">
                <strong>Ubicación:</strong> {selectedLocation.address}
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
              <div className="mt-6">
                <h4 className="font-bold text-blue-700 mb-2 text-lg">Comercios y experiencias cercanas</h4>
                {selectedLocation.businesses && selectedLocation.businesses.length > 0 ? (
                  <LocalBusinessList businesses={selectedLocation.businesses} isPremium={true} />
                ) : (
                  <div className="text-gray-400 text-sm">No hay comercios cargados para este destino.</div>
                )}
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
