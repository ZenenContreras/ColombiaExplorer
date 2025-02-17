import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin } from "lucide-react";

interface Location {
  id: string;
  title: string;
  coordinates: [number, number];
  type: string;
}

interface MapComponentProps {
  locations: Location[];
  onMarkerClick?: (location: Location) => void;
}

const MapComponent = ({ locations, onMarkerClick }: MapComponentProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Colombia's approximate center coordinates
    const colombiaCenter: [number, number] = [4.5709, -74.2973];

    mapRef.current = L.map(mapContainerRef.current, {
      center: colombiaCenter,
      zoom: 6,
      zoomControl: false,
      attributionControl: false,
    });

    // Set map bounds to Colombia
    const colombiaBounds = L.latLngBounds(
      [13.5, -81.5], // Northeast (including San Andrés)
      [-4.2, -67.0], // Southwest
    );
    mapRef.current.setMaxBounds(colombiaBounds);
    mapRef.current.setMinZoom(5);
    mapRef.current.setMaxZoom(12);

    // Add custom zoom control
    L.control
      .zoom({
        position: "bottomright",
      })
      .addTo(mapRef.current);

    // Custom styled map tiles with Colombian colors
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution: "© OpenStreetMap contributors, © CARTO",
        maxZoom: 12,
        minZoom: 5,
        className: "map-tiles",
      },
    ).addTo(mapRef.current);

    // Add Colombia border outline with better styling
    fetch(
      "https://raw.githubusercontent.com/johan/world.geo.json/master/countries/COL.geo.json",
    )
      .then((response) => response.json())
      .then((data) => {
        L.geoJSON(data, {
          style: {
            color: "#2563eb",
            weight: 3,
            fillColor: "#60a5fa",
            fillOpacity: 0.05,
            dashArray: "5, 5",
          },
        }).addTo(mapRef.current);

        // Fit map to Colombia bounds
        mapRef.current?.fitBounds(colombiaBounds, {
          padding: [50, 50],
          maxZoom: 7,
        });
      });

    // Add custom markers
    const customIcon = L.divIcon({
      className:
        "bg-red-500 w-4 h-4 rounded-full border-2 border-white shadow-lg",
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        layer.remove();
      }
    });

    // Add new markers with custom icons
    locations.forEach((location) => {
      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `
          <div class="w-8 h-8 bg-yellow-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
            <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const marker = L.marker(location.coordinates, { icon: customIcon })
        .addTo(mapRef.current!)
        .on("click", () => onMarkerClick?.(location));

      // Custom popup
      const popupContent = `
        <div class="bg-white p-2 rounded-lg shadow-lg min-w-[200px]">
          <h3 class="font-bold text-lg mb-1">${location.title}</h3>
          <p class="text-sm text-gray-600">${location.type}</p>
        </div>
      `;
      marker.bindPopup(popupContent, {
        className: "custom-popup",
        closeButton: false,
        maxWidth: 300,
        minWidth: 200,
      });

      // Hover effects
      marker.on("mouseover", function () {
        this.openPopup();
      });
    });
  }, [locations, onMarkerClick]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full min-h-[500px] bg-gray-100"
      style={{ zIndex: 0 }}
    />
  );
};

export default MapComponent;
