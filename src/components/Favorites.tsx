import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Heart, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
            Tus Destinos Favoritos
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Guarda y organiza los lugares que más te interesan para planear tu próxima aventura
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {favorites.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {favorites.map((favorite, index) => (
                <motion.div
                  key={favorite.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Imagen y Botón de Favorito */}
                  <div className="relative h-40 sm:h-48 md:h-56 w-full">
                    <img
                      src={favorite.image}
                      alt={favorite.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-all duration-300"
                        onClick={() => removeFavorite(favorite.id)}
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-4 sm:p-5 md:p-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 line-clamp-1">
                      {favorite.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2">
                      {favorite.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                      {favorite.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-xs sm:text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex justify-between items-center">
                      <motion.button
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1.5 text-sm sm:text-base"
                      >
                        Ver detalles
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12 sm:py-16 md:py-20 px-4"
            >
              <Heart className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto text-gray-300 mb-4 sm:mb-6" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-600 mb-3 sm:mb-4">
                No tienes favoritos aún
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-500 mb-6 sm:mb-8 max-w-md mx-auto">
                Explora nuestros destinos y guarda tus favoritos para acceder a ellos fácilmente
              </p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base px-6 py-2.5"
                  onClick={() => window.location.href = '/'}
                >
                  Explorar Destinos
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Favorites;
