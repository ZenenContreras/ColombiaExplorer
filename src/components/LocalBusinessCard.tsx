import React from "react";

interface LocalBusinessCardProps {
  name: string;
  rating: number;
  distance: number | string;
  description: string;
  image: string;
  hours: string;
  reviewsUrl?: string;
  acceptsReservations?: boolean;
  acceptsDigitalPayments?: boolean;
  badges?: string[];
}

const badgeIcons: Record<string, string> = {
  "Recomendado por locales": "🌟",
  "Pet Friendly": "🐾",
  "Ideal para niños": "👶",
  "Descuento": "💸",
};

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const stars = [];
  for (let i = 0; i < fullStars; i++) stars.push(<span key={i}>★</span>);
  if (halfStar) stars.push(<span key="half">☆</span>);
  while (stars.length < 5) stars.push(<span key={stars.length}>☆</span>);
  return <span className="text-yellow-400 text-base">{stars}</span>;
};

const LocalBusinessCard: React.FC<LocalBusinessCardProps> = ({
  name,
  rating,
  distance,
  description,
  image,
  hours,
  reviewsUrl,
  acceptsReservations,
  acceptsDigitalPayments,
  badges = [],
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg flex flex-col sm:flex-row w-full max-w-2xl mx-auto border border-blue-50 transition hover:shadow-2xl hover:border-blue-200 group overflow-hidden hover:scale-[1.02] active:scale-[0.98] duration-200 mb-6 p-4 sm:p-6 min-h-[220px] sm:min-h-[200px]">
      <div className="w-full sm:w-56 h-56 sm:h-56 flex-shrink-0 flex items-center justify-center bg-gray-50">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-2xl sm:rounded-2xl border border-gray-100 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between min-w-0 p-4 gap-3">
        <div className="flex flex-col gap-3 min-w-0">
          <div className="flex flex-wrap items-center gap-3 min-w-0 mb-1">
            <span className="font-bold text-xl sm:text-2xl text-blue-800 break-words leading-tight">{name}</span>
            {acceptsReservations && <span title="Acepta reservas" className="ml-1 text-lg">📅</span>}
            {acceptsDigitalPayments && <span title="Pagos digitales" className="ml-1 text-lg">💳</span>}
          </div>
          <div className="flex flex-wrap items-center gap-3 text-base sm:text-lg text-gray-500 mb-1">
            {renderStars(rating)}
            <span className="ml-1 font-semibold text-gray-700">{rating.toFixed(1)}</span>
            <span>• {typeof distance === 'number' ? (distance > 1000 ? `${(distance/1000).toFixed(1)} km` : `${distance} m`) : distance}</span>
          </div>
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-1">
              {badges.map(badge => (
                <span key={badge} className="text-sm px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full whitespace-nowrap flex items-center gap-1 border border-blue-200 shadow-sm font-semibold">{badgeIcons[badge] || "🏅"} {badge}</span>
              ))}
            </div>
          )}
          <div className="text-base sm:text-lg text-gray-700 mb-1 whitespace-pre-line break-words leading-relaxed">{description}</div>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-base text-gray-500 mt-2">
          <span className="font-semibold">🕒 {hours}</span>
          {reviewsUrl && (
            <a href={reviewsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline whitespace-nowrap font-semibold">Leer reseñas</a>
          )}
          {acceptsReservations && (
            <button className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-full text-base font-semibold shadow hover:bg-blue-700 transition-all">Reservar</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocalBusinessCard; 