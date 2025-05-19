import React, { useState, useMemo } from "react";
import LocalBusinessCard from "./LocalBusinessCard";

export interface LocalBusiness {
  id: string;
  name: string;
  type: string;
  rating: number;
  distance: number;
  description: string;
  image: string;
  hours: string;
  reviewsUrl?: string;
  acceptsReservations?: boolean;
  acceptsDigitalPayments?: boolean;
  badges?: string[];
}

interface LocalBusinessListProps {
  businesses: LocalBusiness[];
  isPremium?: boolean;
}

const typeOptions = [
  { value: "all", label: "Todos" },
  { value: "comida", label: "Comida" },
  { value: "alojamiento", label: "Alojamiento" },
  { value: "experiencia", label: "Experiencias" },
  { value: "tienda", label: "Tienda" },
  { value: "guia", label: "Guía turístico" },
];

const LocalBusinessList: React.FC<LocalBusinessListProps> = ({ businesses, isPremium }) => {
  const [typeFilter, setTypeFilter] = useState("all");
  const [order, setOrder] = useState<"distance" | "rating">("distance");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = useMemo(() => {
    let result = businesses;
    if (typeFilter !== "all") {
      result = result.filter(b => b.type === typeFilter);
    }
    result = [...result].sort((a, b) =>
      order === "distance" ? a.distance - b.distance : b.rating - a.rating
    );
    return result;
  }, [businesses, typeFilter, order]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="sticky top-0 z-10 bg-white/95 py-2 flex flex-wrap gap-2 mb-4 items-center border-b border-blue-50">
        <select
          className="border rounded px-2 py-1 text-sm focus:ring focus:ring-blue-200"
          value={typeFilter}
          onChange={e => { setTypeFilter(e.target.value); setPage(1); }}
        >
          {typeOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <select
          className="border rounded px-2 py-1 text-sm focus:ring focus:ring-blue-200"
          value={order}
          onChange={e => setOrder(e.target.value as any)}
        >
          <option value="distance">Ordenar por distancia</option>
          <option value="rating">Ordenar por calificación</option>
        </select>
      </div>
      <div className="flex flex-col gap-6 pb-2 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-100 scrollbar-track-transparent">
        {paginated.map(business => (
          <LocalBusinessCard key={business.id} {...business} />
        ))}
      </div>
      <div className="flex justify-between items-center mt-4 gap-2">
        <button
          className="px-3 py-1 rounded bg-blue-100 text-blue-700 disabled:opacity-50 font-semibold"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >Anterior</button>
        <span className="text-xs text-gray-500">Página {page} de {Math.max(1, Math.ceil(filtered.length / pageSize))}</span>
        <button
          className="px-3 py-1 rounded bg-blue-100 text-blue-700 disabled:opacity-50 font-semibold"
          onClick={() => setPage(p => (filtered.length > p * pageSize ? p + 1 : p))}
          disabled={filtered.length <= page * pageSize}
        >Siguiente</button>
      </div>
      {isPremium && (
        <div className="mt-6">
          <h4 className="font-bold text-blue-700 mb-2">Recomendados por locales y descuentos exclusivos</h4>
          <div className="flex flex-col gap-2">
            {filtered.filter(b => b.badges?.includes("Recomendado por locales") || b.badges?.includes("Descuento")).map(business => (
              <LocalBusinessCard key={business.id + "-premium"} {...business} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalBusinessList; 