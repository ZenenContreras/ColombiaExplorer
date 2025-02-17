import React, { useMemo } from "react";
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
  Menu,
} from "lucide-react";
import { defaultLocations } from "@/data/defaultLocations";

interface NavigationBarProps {
  onSearch?: (term: string) => void;
  onFilterChange?: (filter: string) => void;
}

const NavigationBar = ({
  onSearch = () => {},
  onFilterChange = () => {},
}: NavigationBarProps) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [showPreview, setShowPreview] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<typeof defaultLocations>([]);
  const searchRef = React.useRef<HTMLDivElement>(null);
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [showMobileSearch, setShowMobileSearch] = React.useState(false);

  // Cerrar la previsualización cuando se hace clic fuera
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowPreview(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);

    if (value.length > 0) {
      const filteredResults = defaultLocations.filter(location => 
        location.title.toLowerCase().includes(value.toLowerCase()) ||
        location.tags.some(tag => tag.toLowerCase().includes(value.toLowerCase()))
      );
      setSearchResults(filteredResults);
      setShowPreview(true);
    } else {
      setSearchResults([]);
      setShowPreview(false);
    }
  };

  const handleFilterClick = (filter: string) => {
    // Verificar si estamos en la página principal
    if (window.location.pathname !== '/') {
      // Si no estamos en la página principal, redirigir y guardar el filtro
      sessionStorage.setItem('pendingFilter', filter);
      window.location.href = '/#map-section';
      return;
    }

    // Si estamos en la página principal, aplicar el filtro directamente
    document.getElementById('map-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
    
    setTimeout(() => {
      onFilterChange(filter);
    }, 500);
  };

  // Optimización de rendimiento con useMemo
  const memoizedMenuItems = useMemo(() => [
    { icon: <MapPin className="h-4 w-4" />, label: "Playas", action: () => handleFilterClick("beaches") },
    { icon: <Mountain className="h-4 w-4" />, label: "Montañas", action: () => handleFilterClick("mountains") },
    { icon: <Landmark className="h-4 w-4" />, label: "Sitios Culturales", action: () => handleFilterClick("cultural") },
  ], []);

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm fixed top-0 z-50">
      <div className="container mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          <div className="flex items-center">
            <div
              className="flex items-center gap-1.5 sm:gap-2 cursor-pointer"
              onClick={() => (window.location.href = "/")}
            >
              <div className="relative w-7 h-7 sm:w-8 sm:h-8">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-blue-600 rounded-full animate-pulse"></div>
                <div className="absolute inset-0.5 bg-white rounded-full flex items-center justify-center">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-yellow-500 via-red-500 to-blue-600 text-transparent bg-clip-text hover:opacity-80 transition-opacity">
                  Colombia Explorer
                </span>
                <span className="text-[10px] sm:text-xs text-gray-500 -mt-0.5 hidden md:block">
                  Descubre el paraíso
                </span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <Button
              variant="ghost"
              className="flex items-center gap-2 hover:bg-blue-50 px-3 py-2 transition-all duration-300 hover:scale-105"
              onClick={() => handleFilterClick("beaches")}
            >
              <MapPin className="h-4 w-4" />
              Playas
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-2 hover:bg-blue-50 px-3 py-2 transition-all duration-300 hover:scale-105"
              onClick={() => handleFilterClick("mountains")}
            >
              <Mountain className="h-4 w-4" />
              Montañas
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-2 hover:bg-blue-50 px-3 py-2 transition-all duration-300 hover:scale-105"
              onClick={() => handleFilterClick("cultural")}
            >
              <Landmark className="h-4 w-4" />
              Sitios Culturales
            </Button>
          </div>

          <div className="flex-1 flex justify-end items-center gap-2 sm:gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                className="pl-8 w-full max-w-[200px] md:max-w-[300px] lg:max-w-[400px] transition-all"
                placeholder="Buscar destinos..."
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
            <Button
              variant="ghost"
              className="sm:hidden"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            >
              <Search className="h-5 w-5" />
            </Button>

            <div className="hidden md:flex items-center gap-2 sm:gap-4">
              <Button
                variant="ghost"
                className="flex items-center gap-1.5 px-2 sm:px-3"
                onClick={() => (window.location.href = "/about")}
              >
                <Info className="h-4 w-4" />
                <span className="hidden lg:inline text-sm">Sobre Nosotros</span>
              </Button>
              <Button
                variant="ghost"
                className="flex items-center gap-1.5 px-2 sm:px-3"
                onClick={() => (window.location.href = "/favorites")}
              >
                <Heart className="h-4 w-4" />
                <span className="hidden lg:inline text-sm">Favoritos</span>
              </Button>
            </div>

            <Button
              variant="ghost"
              className="lg:hidden p-1.5 sm:p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </div>
        </div>

        {showMobileMenu && (
          <div className="lg:hidden py-2 space-y-1 border-t border-gray-100">
            {[
              { icon: <MapPin className="h-4 w-4" />, label: "Playas", action: () => handleFilterClick("beaches") },
              { icon: <Mountain className="h-4 w-4" />, label: "Montañas", action: () => handleFilterClick("mountains") },
              { icon: <Landmark className="h-4 w-4" />, label: "Sitios Culturales", action: () => handleFilterClick("cultural") },
              { icon: <Info className="h-4 w-4" />, label: "Sobre Nosotros", action: () => window.location.href = "/about" },
              { icon: <Heart className="h-4 w-4" />, label: "Favoritos", action: () => window.location.href = "/favorites" }
            ].map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full flex items-center gap-3 justify-start px-4 py-2.5 hover:bg-gray-50 active:bg-gray-100 transition-all duration-300"
                onClick={item.action}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </Button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;