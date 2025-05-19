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
  // Campos ficticios extra
  const phone = "+57 300 123 4567";
  const email = "info@comercio.com";
  const address = "Cra 10 #20-30";
  const type = badges[0] || "Negocio local";

  return (
    <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center sm:flex-row w-full max-w-2xl mx-auto border border-blue-50 transition hover:shadow-2xl hover:border-blue-200 group overflow-hidden hover:scale-[1.02] active:scale-[0.98] duration-200 mb-2 p-4 sm:p-6 min-h-[180px] sm:min-h-[220px]">
      {/* Imagen pequeña y centrada */}
      <div className="w-20 h-20 sm:w-28 sm:h-28 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden mb-2 sm:mb-0 sm:mr-6">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-xl border border-gray-100 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      {/* Info centrada */}
      <div className="flex-1 flex flex-col justify-center items-center sm:items-start min-w-0 gap-2 text-center sm:text-left">
        <div className="flex flex-col gap-1 min-w-0 w-full">
          {/* Nombre y tipo */}
          <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-1 sm:gap-2 w-full">
            <span className="font-bold text-base sm:text-lg text-blue-800 break-words leading-tight">{name}</span>
            <span className="text-xs sm:text-sm text-gray-500 font-semibold">{type}</span>
          </div>
          {/* Rating y distancia */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-gray-500 mb-1">
            {renderStars(rating)}
            <span className="ml-1 font-semibold text-gray-700">{rating.toFixed(1)}</span>
            <span>• {typeof distance === 'number' ? (distance > 1000 ? `${(distance/1000).toFixed(1)} km` : `${distance} m`) : distance}</span>
          </div>
          {/* Badges */}
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-1 justify-center sm:justify-start">
              {badges.map(badge => (
                <span key={badge} className="text-xs px-2 py-0.5 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full whitespace-nowrap flex items-center gap-1 border border-blue-200 shadow-sm font-semibold">{badgeIcons[badge] || "🏅"} {badge}</span>
              ))}
            </div>
          )}
          {/* Descripción completa */}
          <div className="text-xs sm:text-sm text-gray-700 mb-1 whitespace-pre-line break-words leading-relaxed">{description}</div>
          {/* Más campos */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start text-xs sm:text-sm text-gray-500 mt-1">
            <span>📞 {phone}</span>
            <span>📧 {email}</span>
            <span>📍 {address}</span>
          </div>
        </div>
        {/* Horarios, enlaces y botón */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-gray-500 mt-2 w-full">
          <span className="font-semibold">🕒 {hours}</span>
          {reviewsUrl && (
            <a href={reviewsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline whitespace-nowrap font-semibold">Leer reseñas</a>
          )}
          {acceptsReservations && (
            <button className="px-4 py-1 bg-blue-600 text-white rounded-full text-xs sm:text-sm font-semibold shadow hover:bg-blue-700 transition-all">Reservar</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocalBusinessCard; 