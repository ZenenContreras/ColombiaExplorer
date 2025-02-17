import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Heart, Trash2 } from "lucide-react";

interface FavoriteLocation {
  id: string;
  title: string;
  image: string;
  description: string;
}

const Favorites = () => {
  // Ejemplo de favoritos (en una aplicación real, esto vendría de un estado global o base de datos)
  const [favorites, setFavorites] = React.useState<FavoriteLocation[]>([
    {
      id: "1",
      title: "Cartagena",
      image: "https://images.unsplash.com/photo-1583997052103-b4a1cb974ce3",
      description: "Ciudad histórica con arquitectura colonial",
    },
    {
      id: "2",
      title: "Parque Tayrona",
      image: "https://images.unsplash.com/photo-1598881034666-a8796f3797fd",
      description: "Playas paradisíacas y naturaleza exuberante",
    },
  ]);

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 mt-14 sm:mt-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Mis Favoritos</h1>
          <Heart className="text-red-500 w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" />
        </div>

        {favorites.length === 0 ? (
          <Card className="p-4 sm:p-6 text-center">
            <CardContent>
              <p className="text-sm sm:text-base text-gray-600">
                No tienes destinos favoritos guardados.
              </p>
              <Button 
                className="mt-3 sm:mt-4 text-sm sm:text-base" 
                variant="outline"
                onClick={() => window.location.href = "/"}
              >
                Explorar Destinos
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {favorites.map((favorite) => (
              <Card key={favorite.id} className="overflow-hidden flex flex-col">
                <div className="relative h-40 sm:h-48">
                  <img
                    src={favorite.image}
                    alt={favorite.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl">{favorite.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 flex-grow">
                  <p className="text-sm sm:text-base text-gray-600 mb-4">{favorite.description}</p>
                  <div className="mt-auto">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFavorite(favorite.id)}
                      className="w-full text-sm sm:text-base py-2 sm:py-2.5"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar de favoritos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
