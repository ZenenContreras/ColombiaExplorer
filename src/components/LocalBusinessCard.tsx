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
    <div className="bg-white rounded-2xl shadow-lg p-0 flex flex-col sm:flex-row gap-0 w-full max-w-2xl mx-auto border border-blue-50 transition hover:shadow-2xl hover:border-blue-200 group overflow-hidden">
      <div className="flex-shrink-0 w-full sm:w-40 h-44 sm:h-40 flex items-center justify-center bg-gray-50">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none border-b sm:border-b-0 sm:border-r border-gray-100"
          style={{ minWidth: 100, minHeight: 100, maxWidth: 160, maxHeight: 176 }}
        />
      </div>
      <div className="flex-1 flex flex-col justify-between min-w-0 p-4">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <span className="font-bold text-base sm:text-lg text-blue-800 truncate max-w-[70vw] sm:max-w-[18ch]">{name}</span>
            {acceptsReservations && <span title="Acepta reservas" className="ml-1">📅</span>}
            {acceptsDigitalPayments && <span title="Pagos digitales" className="ml-1">💳</span>}
            {badges.map(badge => (
              <span key={badge} className="ml-1 text-xs px-2 py-0.5 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full whitespace-nowrap flex items-center gap-1 border border-blue-200 shadow-sm">{badgeIcons[badge] || "🏅"} {badge}</span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500">
            {renderStars(rating)}
            <span className="ml-1 font-semibold text-gray-700">{rating.toFixed(1)}</span>
            <span>• {typeof distance === 'number' ? (distance > 1000 ? `${(distance/1000).toFixed(1)} km` : `${distance} m`) : distance}</span>
          </div>
          <div className="text-xs sm:text-sm text-gray-700 mb-1 line-clamp-2 sm:line-clamp-3 break-words">{description}</div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-2">
          <span>🕒 {hours}</span>
          {reviewsUrl && (
            <a href={reviewsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-2 whitespace-nowrap">Leer reseñas</a>
          )}
          {acceptsReservations && (
            <button className="ml-auto px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold shadow hover:bg-blue-700 transition-all">Reservar</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocalBusinessCard; 