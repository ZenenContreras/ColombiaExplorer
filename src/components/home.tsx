import React, { useState } from "react";
import {
  MapPin,
  Mountain,
  Building2,
  Landmark,
  TreePine,
  Users,
  Leaf,
} from "lucide-react";
import InteractiveMap from "./InteractiveMap";

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

const defaultLocations: Location[] = [
  // Playas
  {
    id: "1",
    title: "Playa Blanca",
    description: "Una de las playas más hermosas del Caribe colombiano.",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f",
    coordinates: { x: 25, y: 35 },
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
    coordinates: { x: 70, y: 20 },
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
    coordinates: { x: 15, y: 15 },
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
    coordinates: { x: 35, y: 45 },
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
    coordinates: { x: 40, y: 42 },
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
    coordinates: { x: 45, y: 60 },
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
    coordinates: { x: 65, y: 25 },
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
    coordinates: { x: 30, y: 55 },
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
    coordinates: { x: 30, y: 40 },
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
    coordinates: { x: 80, y: 80 },
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
    coordinates: { x: 85, y: 15 },
    type: "ecotourism",
    address: "Cabo de la Vela, La Guajira",
    hours: "Tours programados",
    phone: "+57 5 7272333",
    website: "https://laguajiraturistica.com",
    tags: ["Ecoturismo", "Cultura Indígena", "Desierto"],
  },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | undefined>();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedType(filter);
  };

  const filteredLocations = defaultLocations.filter((location) => {
    const matchesSearch = location.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? location.type === selectedType : true;
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex-1">
      <div className="h-[600px] relative">
        <InteractiveMap
          locations={filteredLocations}
          selectedType={selectedType}
        />
      </div>

      {/* Featured Destinations */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-500 via-red-500 to-blue-600 text-transparent bg-clip-text">
            Destinos Destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {defaultLocations.slice(0, 3).map((location) => (
              <div key={location.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={location.image}
                    alt={location.title}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="absolute bottom-0 p-6">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {location.title}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {location.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eco-Tourism Section */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Ecoturismo en Colombia
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Descubre destinos únicos mientras contribuyes a la conservación del
            medio ambiente y apoyas a las comunidades locales.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <TreePine className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Conservación</h3>
              <p className="text-gray-600">
                Nuestros tours están diseñados para minimizar el impacto
                ambiental y proteger los ecosistemas locales.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Comunidades Locales
              </h3>
              <p className="text-gray-600">
                Trabajamos directamente con comunidades locales para preservar
                su cultura y tradiciones.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Turismo Sostenible</h3>
              <p className="text-gray-600">
                Promovemos prácticas sostenibles y educación ambiental en todos
                nuestros destinos.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Nuestro Compromiso Ambiental
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-green-700">
                  Iniciativas de Conservación
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Programas de reforestación en destinos turísticos</li>
                  <li>Protección de especies en peligro de extinción</li>
                  <li>Manejo responsable de residuos</li>
                  <li>Educación ambiental para visitantes</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-green-700">
                  Impacto Social
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Apoyo a proyectos comunitarios locales</li>
                  <li>Preservación de tradiciones culturales</li>
                  <li>Generación de empleo local</li>
                  <li>Comercio justo con artesanos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tourism Categories */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explora por Categoría
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                icon: MapPin,
                title: "Playas",
                count: "15+ destinos",
                color: "bg-blue-500",
              },
              {
                icon: Mountain,
                title: "Montañas",
                count: "12+ destinos",
                color: "bg-green-500",
              },
              {
                icon: Landmark,
                title: "Sitios Culturales",
                count: "20+ destinos",
                color: "bg-red-500",
              },
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4`}
                >
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-1">{category.title}</h3>
                <p className="text-gray-600 text-sm">{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Tips para Viajeros
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                Mejor Época para Viajar
              </h3>
              <p className="text-gray-700">
                La temporada seca (diciembre a marzo) es ideal para visitar la
                mayoría de los destinos en Colombia.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Transporte</h3>
              <p className="text-gray-700">
                Colombia cuenta con una extensa red de transporte que incluye
                vuelos domésticos y buses intermunicipales.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                Cultura y Costumbres
              </h3>
              <p className="text-gray-700">
                Los colombianos son conocidos por su hospitalidad. El español es
                el idioma principal.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
