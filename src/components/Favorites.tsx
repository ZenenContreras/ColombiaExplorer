import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Heart, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface FavoriteLocation {
  id: string;
  title: string;
  image: string;
  description: string;
  tags: string[];
}

const Favorites = () => {
  // Ejemplo de favoritos (en una aplicación real, esto vendría de un estado global o base de datos)
  const [favorites, setFavorites] = React.useState<FavoriteLocation[]>([
    {
      id: "1",
      title: "Cartagena",
      image: "https://images.unsplash.com/photo-1583997052103-b4a1cb974ce3",
      description: "Ciudad histórica con arquitectura colonial",
      tags: ["Histórico", "Colonial"],
    },
    {
      id: "2",
      title: "Parque Tayrona",
      image: "https://images.unsplash.com/photo-1598881034666-a8796f3797fd",
      description: "Playas paradisíacas y naturaleza exuberante",
      tags: ["Playa", "Naturaleza"],
    },
  ]);

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20 sm:pt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
            Tus Destinos Favoritos
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Guarda y organiza los lugares que más te interesan para planear tu próxima aventura
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {favorites.map((favorite, index) => (
            <motion.div
              key={favorite.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 sm:h-56">
                <img
                  src={favorite.image}
                  alt={favorite.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-all duration-300"
                  >
                    <Heart className="w-5 h-5 text-red-500 fill-current" />
                  </motion.button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl sm:text-2xl font-semibold mb-2">{favorite.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{favorite.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {favorite.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    Ver detalles
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Estado vacío */}
        {favorites.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 sm:py-24"
          >
            <Heart className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-600 mb-4">
              No tienes favoritos aún
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Explora nuestros destinos y guarda tus favoritos para acceder a ellos fácilmente
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => window.location.href = '/'}
            >
              Explorar Destinos
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
