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

const defaultLocations: Location[] = [
  // Playas
  {
    id: "1",
    title: "Playa Blanca",
    description: "Una de las playas más hermosas del Caribe colombiano.",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f",
    coordinates: { lat: 10.2544, lng: -75.6053 },
    type: "beaches",
    address: "Cartagena, Bolívar",
    hours: "24/7",
    phone: "+57 5 6502010",
    website: "https://playablanca.co",
    tags: ["Playa", "Turismo", "Ecoturismo"],
  },
  {
    id: "2",
    title: "Parque Tayrona",
    description: "Playas vírgenes y biodiversidad única en el Caribe.",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipP5imWkgYXdGoz9nME1PU-wXdoxkqBylLTFh2Ko=s680-w680-h510",
    coordinates: { lat: 11.3147, lng: -74.0307 },
    type: "beaches",
    address: "Santa Marta, Magdalena",
    hours: "6:00 AM - 5:00 PM",
    phone: "+57 5 4211732",
    website: "https://parquetayrona.com",
    tags: ["Ecoturismo", "Playa", "Naturaleza"],
  },
  {
    id: "3",
    title: "San Andrés",
    description:
      "Isla paradisíaca con playas de arena blanca y aguas cristalinas.",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f",
    coordinates: { lat: 12.5847, lng: -81.7006 },
    type: "beaches",
    address: "San Andrés Isla",
    hours: "24/7",
    phone: "+57 8 5130801",
    website: "https://www.sanandres.gov.co",
    tags: ["Playa", "Isla"],
  },

  // Montañas y Ecoturismo
  {
    id: "4",
    title: "Valle del Cocora",
    description: "Hogar de la palma de cera y senderos ecológicos.",
    image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849",
    coordinates: { lat: 4.6389, lng: -75.4889 },
    type: "mountains",
    address: "Salento, Quindío",
    hours: "6:00 AM - 6:00 PM",
    phone: "+57 6 7593464",
    website: "https://valledelcocora.com.co",
    tags: ["Ecoturismo", "Montaña", "Naturaleza"],
  },
  {
    id: "5",
    title: "PNN Los Nevados",
    description: "Parque Nacional con glaciares y ecosistemas únicos.",
    image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849",
    coordinates: { lat: 4.8828, lng: -75.3333 },
    type: "mountains",
    address: "Manizales, Caldas",
    hours: "5:00 AM - 4:00 PM",
    phone: "+57 6 8850550",
    website: "https://parquesnacionales.gov.co/nevados",
    tags: ["Ecoturismo", "Montaña", "Aventura"],
  },
  {
    id: "6",
    title: "Monserrate",
    description: "Montaña emblemática que domina el centro de Bogotá.",
    image: "https://images.unsplash.com/photo-1597006438013-0f0cca2c1a03",
    coordinates: { lat: 4.6058, lng: -74.0556 },
    type: "mountains",
    address: "Bogotá, Colombia",
    hours: "7:00 AM - 11:00 PM",
    phone: "+57 1 2840070",
    website: "https://www.cerromonserrate.com",
    tags: ["Montaña", "Cultural"],
  },

  // Sitios Culturales
  {
    id: "7",
    title: "Ciudad Perdida",
    description: "Antigua ciudad indígena en la Sierra Nevada.",
    image: "https://images.unsplash.com/photo-1569242840510-5c8a3b53b719",
    coordinates: { lat: 11.0384, lng: -73.9267 },
    type: "cultural",
    address: "Sierra Nevada, Santa Marta",
    hours: "8:00 AM - 5:00 PM",
    phone: "+57 5 4217777",
    website: "https://ciudadperdida.co",
    tags: ["Cultural", "Arqueología", "Ecoturismo"],
  },
  {
    id: "8",
    title: "San Agustín",
    description: "Parque Arqueológico con estatuas precolombinas.",
    image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849",
    coordinates: { lat: 1.8879, lng: -76.2756 },
    type: "cultural",
    address: "San Agustín, Huila",
    hours: "8:00 AM - 4:00 PM",
    phone: "+57 8 8373333",
    website: "https://sanagustin.gov.co",
    tags: ["Cultural", "Arqueología", "Historia"],
  },
  {
    id: "9",
    title: "Centro Histórico de Cartagena",
    description:
      "Patrimonio de la Humanidad UNESCO con arquitectura colonial colorida y calles empedradas.",
    image: "https://images.unsplash.com/photo-1583997052103-b4a1cb974ce3",
    coordinates: { lat: 10.3932, lng: -75.4832 },
    type: "cultural",
    address: "Centro Histórico, Cartagena",
    hours: "24/7",
    phone: "+57 5 6600380",
    website: "https://cartagena.gov.co",
    tags: ["Histórico", "Cultural"],
  },

  // Ecoturismo Especial
  {
    id: "10",
    title: "Amazonas",
    description: "Selva amazónica y comunidades indígenas.",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f",
    coordinates: { lat: -4.2186, lng: -69.9312 },
    type: "ecotourism",
    address: "Leticia, Amazonas",
    hours: "Tours programados",
    phone: "+57 8 5927896",
    website: "https://amazonasturismo.gov.co",
    tags: ["Ecoturismo", "Cultura Indígena", "Naturaleza"],
  },
  {
    id: "11",
    title: "Guajira Desert",
    description: "Desierto, playas vírgenes y cultura Wayúu.",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f",
    coordinates: { lat: 12.2188, lng: -71.9987 },
    type: "ecotourism",
    address: "Cabo de la Vela, La Guajira",
    hours: "Tours programados",
    phone: "+57 5 7272333",
    website: "https://laguajiraturistica.com",
    tags: ["Ecoturismo", "Cultura Indígena", "Desierto"],
  },
  {
    id: "12",
    title: "Desierto de la Tatacoa",
    description: "Desierto rojo y gris con observatorio astronómico.",
    image: "https://images.unsplash.com/photo-tatacoa",
    coordinates: { lat: 3.2344, lng: -75.1645 },
    type: "ecotourism",
    address: "Villavieja, Huila",
    hours: "24/7",
    phone: "+57 8 8797042",
    website: "https://tatacoa.com",
    tags: ["Desierto", "Astronomía", "Naturaleza"],
  },
  {
    id: "13",
    title: "Santuario de Las Lajas",
    description: "Basílica neogótica construida sobre un cañón.",
    image: "https://images.unsplash.com/photo-laslajas",
    coordinates: { lat: 0.8149, lng: -77.5847 },
    type: "cultural",
    address: "Ipiales, Nariño",
    hours: "6:00 AM - 6:00 PM",
    phone: "+57 2 7733444",
    website: "https://santuariodelaslajas.org",
    tags: ["Religioso", "Cultural", "Arquitectura"],
  },
  {
    id: "14",
    title: "Caño Cristales",
    description: "El río de los cinco colores.",
    image: "https://images.unsplash.com/photo-canocristales",
    coordinates: { lat: 2.2666, lng: -73.7910 },
    type: "ecotourism",
    address: "La Macarena, Meta",
    hours: "Tours programados",
    phone: "+57 8 6614800",
    website: "https://canocristales.co",
    tags: ["Naturaleza", "Río", "Ecoturismo"],
  },
  {
    id: "15",
    title: "Providencia",
    description: "Isla paradisíaca con el tercer arrecife de coral más grande del mundo.",
    image: "https://images.unsplash.com/photo-providencia",
    coordinates: { lat: 13.3487, lng: -81.3744 },
    type: "beaches",
    address: "Providencia, San Andrés",
    hours: "24/7",
    phone: "+57 8 5148925",
    website: "https://providencia.gov.co",
    tags: ["Playa", "Isla", "Snorkel"],
  },
  {
    id: "16",
    title: "Villa de Leyva",
    description: "Ciudad colonial con la plaza mayor empedrada más grande de Sudamérica.",
    image: "https://images.unsplash.com/photo-villadeleyva",
    coordinates: { lat: 5.6325, lng: -73.5244 },
    type: "cultural",
    address: "Villa de Leyva, Boyacá",
    hours: "24/7",
    phone: "+57 8 7320830",
    website: "https://villadeleyva.gov.co",
    tags: ["Colonial", "Cultural", "Historia"],
  }
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [isMapVisible, setIsMapVisible] = useState(false);

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
    return matchesSearch && matchesType;
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
        className="relative h-screen"
      >
        <div className="absolute inset-0 bg-[url('/public/colombia-hero.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative container mx-auto px-4 h-full flex items-center"
        >
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Descubre la Magia de
              <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-blue-600 text-transparent bg-clip-text">
                {" "}Colombia
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Explora destinos únicos y vive experiencias inolvidables
            </p>
            <motion.div 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-yellow-400 via-red-500 to-blue-600 text-white hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
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
        className="relative min-h-[800px] bg-gray-50 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMapVisible ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedType || 'all'} // Cambia la key cuando cambia el filtro
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="h-[700px] rounded-xl overflow-hidden shadow-2xl"
            >
              <InteractiveMap
                locations={filteredLocations}
                selectedType={selectedType}
              />
            </motion.div>
          </AnimatePresence>

          {/* Indicador de filtro activo */}
          <AnimatePresence>
            {selectedType && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-4 text-center"
              >
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600">
                  Mostrando: {selectedType === 'beaches' ? 'Playas' : 
                             selectedType === 'mountains' ? 'Montañas' : 
                             'Sitios Culturales'}
                  <button 
                    onClick={() => setSelectedType(undefined)}
                    className="ml-2 hover:text-blue-800"
                  >
                    ×
                  </button>
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
        <div className="absolute inset-0 bg-[url('/public/eco-bg.jpg')] bg-cover bg-fixed bg-center" />
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
