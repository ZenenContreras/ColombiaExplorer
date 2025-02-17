import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Search,
  MapPin,
  Mountain,
  Building2,
  Landmark,
  Info,
  Heart,
} from "lucide-react";

interface NavigationBarProps {
  onSearch?: (term: string) => void;
  onFilterChange?: (filter: string) => void;
}

const NavigationBar = ({
  onSearch = () => {},
  onFilterChange = () => {},
}: NavigationBarProps) => {
  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm fixed top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => (window.location.href = "/")}
            >
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-blue-600 rounded-full animate-pulse"></div>
                <div className="absolute inset-0.5 bg-white rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-yellow-500" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-yellow-500 via-red-500 to-blue-600 text-transparent bg-clip-text hover:opacity-80 transition-opacity">
                  Colombia Explorer
                </span>
                <span className="text-xs text-gray-500 -mt-1">
                  Descubre el paraíso
                </span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Button
              variant="ghost"
              className="flex items-center gap-2 hover:bg-blue-50"
              onClick={() => onFilterChange("beaches")}
            >
              <MapPin className="h-4 w-4" />
              Playas
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-2 hover:bg-blue-50"
              onClick={() => onFilterChange("mountains")}
            >
              <Mountain className="h-4 w-4" />
              Montañas
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-2 hover:bg-blue-50"
              onClick={() => onFilterChange("cultural")}
            >
              <Landmark className="h-4 w-4" />
              Sitios Culturales
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                className="pl-8 w-full"
                placeholder="Buscar destinos..."
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => (window.location.href = "/about")}
            >
              <Info className="h-4 w-4" />
              Sobre Nosotros
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => (window.location.href = "/favorites")}
            >
              <Heart className="h-4 w-4" />
              Favoritos
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
