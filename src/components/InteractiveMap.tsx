import React, { useState } from "react";
import { MapPin } from "lucide-react";
import LocationCard from "./LocationCard";
import MapComponent from "./MapComponent";

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

interface InteractiveMapProps {
  locations?: Location[];
  selectedType?: string;
  onLocationSelect?: (location: Location) => void;
}

const defaultLocations: Location[] = [
  {
    id: "1",
    title: "Cartagena Historic Center",
    description:
      "A UNESCO World Heritage site featuring colorful colonial architecture.",
    image: "https://images.unsplash.com/photo-1583997052103-b4a1cb974ce3",
    coordinates: { x: 30, y: 40 },
    type: "cultural",
    address: "Centro Histórico, Cartagena",
    hours: "Open 24/7",
    phone: "+57 5 6600380",
    website: "https://cartagena.gov.co",
    tags: ["Historic", "Cultural"],
  },
  {
    id: "2",
    title: "Tayrona National Park",
    description:
      "Beautiful national park with pristine beaches and hiking trails.",
    image: "https://images.unsplash.com/photo-1598881034666-a8796f3797fd",
    coordinates: { x: 70, y: 20 },
    type: "nature",
    address: "Santa Marta, Magdalena",
    hours: "6:00 AM - 5:00 PM",
    phone: "+57 5 4211732",
    website: "https://www.parquetayrona.com",
    tags: ["Nature", "Beach"],
  },
];

const InteractiveMap = ({
  locations = defaultLocations,
  selectedType,
  onLocationSelect = () => {},
}: InteractiveMapProps) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  const filteredLocations = selectedType
    ? locations.filter((location) => location.type === selectedType)
    : locations;

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    onLocationSelect(location);
  };

  return (
    <div className="relative w-full h-full bg-gray-100 overflow-hidden">
      <MapComponent
        locations={filteredLocations.map((loc) => ({
          ...loc,
          coordinates: [
            4.5709 + (loc.coordinates.y - 50) / 5, // Adjusted scale
            -74.2973 + (loc.coordinates.x - 50) / 5, // Adjusted scale
          ],
        }))}
        onMarkerClick={handleLocationClick}
      />

      {/* Location Card Popup */}
      {selectedLocation && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <LocationCard
            title={selectedLocation.title}
            description={selectedLocation.description}
            image={selectedLocation.image}
            address={selectedLocation.address}
            hours={selectedLocation.hours}
            phone={selectedLocation.phone}
            website={selectedLocation.website}
            tags={selectedLocation.tags}
            onClose={() => setSelectedLocation(null)}
          />
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
