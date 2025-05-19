import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Mountain,
  Building2,
  Landmark,
  TreePine,
  Users,
  Leaf,
  ArrowRight
} from "lucide-react";
import InteractiveMap from "./InteractiveMap";
import NavigationBar from "./NavigationBar";
import { Button } from "./ui/button";
import { defaultLocations } from "../data/defaultLocations";
import { usePreferences } from "../lib/PreferencesContext";

interface Location {
  id: string;
  title: string;
  description: string;
  image: string;
  coordinates: { lat: number; lng: number };
  type: string;
  address: string;
  hours: string;
  phone: string;
  website: string;
  tags: string[];
}

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [isMapVisible, setIsMapVisible] = useState(false);
  const { preferences } = usePreferences();

  useEffect(() => {
    // Verificar si hay un filtro pendiente
    const pendingFilter = sessionStorage.getItem('pendingFilter');
    if (pendingFilter) {
      setSelectedType(pendingFilter);
      sessionStorage.removeItem('pendingFilter');
      document.getElementById('map-section')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, []);

  useEffect(() => {
    // Verificar si el mapa está en el viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsMapVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const mapSection = document.getElementById('map-section');
    if (mapSection) {
      observer.observe(mapSection);
    }

    return () => {
      if (mapSection) {
        observer.unobserve(mapSection);
      }
    };
  }, []);

  const handleFilterChange = (filter: string) => {
    setSelectedType(filter === selectedType ? undefined : filter);
  };

  const filteredLocations = defaultLocations.filter((location) => {
    const matchesSearch = location.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? location.type === selectedType : true;
    return matchesSearch && matchesType && (!preferences.experiences.length || preferences.experiences.includes(location.type));
  });

  return (
    <div className="flex-1 overflow-hidden">
      <NavigationBar 
        onSearch={setSearchTerm}
        onFilterChange={handleFilterChange}
      />
      
      {/* Hero Section con Parallax */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-screen w-full"
      >
        <div className="absolute inset-0 bg-[url('/colombia-hero.jpg')] bg-cover bg-center bg-no-repeat" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative w-full h-full flex items-center px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-2xl mx-auto text-white text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Descubre la Magia de
              <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-blue-600 text-transparent bg-clip-text">
                {" "}Colombia
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-200">
              Explora destinos únicos y vive experiencias inolvidables
            </p>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-yellow-400 via-red-500 to-blue-600 text-white hover:shadow-lg transform transition-all duration-300"
                onClick={() => document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Comenzar Aventura
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Mapa Interactivo con Animaciones */}
      <motion.div 
        id="map-section" 
        className="relative py-16 bg-gradient-to-b from-gray-50 to-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text"
          >
            Explora Colombia
          </motion.h2>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedType || 'all'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-[1200px]"
            >
              <InteractiveMap
                locations={filteredLocations}
                selectedType={selectedType}
              />
            </motion.div>
          </AnimatePresence>

          {/* Indicador de filtro con animación */}
          <AnimatePresence>
            {selectedType && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-4 text-center"
              >
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 shadow-md">
                  <motion.span
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    Mostrando: {selectedType === 'beaches' ? 'Playas' : 
                               selectedType === 'mountains' ? 'Montañas' : 
                               selectedType === 'cultural' ? 'Sitios Culturales' :
                               'Ecoturismo'}
                  </motion.span>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedType(undefined)}
                    className="ml-2 hover:text-blue-800"
                  >
                    ×
                  </motion.button>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Destinos Destacados */}
      <section className="bg-white py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-500 via-red-500 to-blue-600 text-transparent bg-clip-text"
          >
            Destinos Destacados
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {defaultLocations.slice(0, 3).map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <motion.img
                    src={location.image}
                    alt={location.title}
                    className="w-full h-64 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {location.title}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {location.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Ecoturismo con Parallax */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/eco-bg.jpg')] bg-cover bg-fixed bg-center" />
        <div className="absolute inset-0 bg-green-900/80 backdrop-blur-sm" />
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ecoturismo en Colombia
            </h2>
            <p className="text-xl text-green-50 max-w-2xl mx-auto">
              Descubre destinos únicos mientras contribuyes a la conservación
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: TreePine,
                title: "Conservación",
                description: "Protegemos los ecosistemas locales"
              },
              {
                icon: Users,
                title: "Comunidades Locales",
                description: "Apoyamos el desarrollo sostenible"
              },
              {
                icon: Leaf,
                title: "Turismo Sostenible",
                description: "Promovemos prácticas responsables"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition-colors duration-300"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                  {item.title}
                </h3>
                <p className="text-green-50 text-center">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorías con Hover Effects */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16"
          >
            Explora por Categoría
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Playas",
                count: "15+ destinos",
                color: "from-blue-400 to-blue-600",
              },
              {
                icon: Mountain,
                title: "Montañas",
                count: "12+ destinos",
                color: "from-green-400 to-green-600",
              },
              {
                icon: Landmark,
                title: "Sitios Culturales",
                count: "20+ destinos",
                color: "from-red-400 to-red-600",
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-500 group-hover:to-red-500 transition-all duration-300">
                    {category.title}
                  </h3>
                  <p className="text-gray-600">{category.count}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips de Viaje con Animaciones */}
      <section className="bg-white py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16"
          >
            Tips para Viajeros
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Mejor Época",
                description: "Temporada seca (diciembre a marzo)",
                gradient: "from-yellow-50 to-yellow-100",
              },
              {
                title: "Transporte",
                description: "Vuelos domésticos y buses intermunicipales",
                gradient: "from-blue-50 to-blue-100",
              },
              {
                title: "Cultura",
                description: "Hospitalidad colombiana y español",
                gradient: "from-red-50 to-red-100",
              },
            ].map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.03 }}
                className={`p-8 bg-gradient-to-br ${tip.gradient} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <h3 className="text-xl font-semibold mb-4">{tip.title}</h3>
                <p className="text-gray-700">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
