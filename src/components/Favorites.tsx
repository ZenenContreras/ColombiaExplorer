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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Mis Favoritos</h1>
          <Heart className="text-red-500 w-8 h-8" fill="currentColor" />
        </div>

        {favorites.length === 0 ? (
          <Card className="p-6 text-center">
            <CardContent>
              <p className="text-gray-600">
                No tienes destinos favoritos guardados.
              </p>
              <Button className="mt-4" variant="outline">
                Explorar Destinos
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => (
              <Card key={favorite.id} className="overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={favorite.image}
                    alt={favorite.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{favorite.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{favorite.description}</p>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeFavorite(favorite.id)}
                    className="w-full"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar de favoritos
                  </Button>
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
