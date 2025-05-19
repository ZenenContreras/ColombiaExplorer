import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePreferences } from "../lib/PreferencesContext";
import { Calendar, X } from "lucide-react";

const EXPERIENCE_OPTIONS = [
  { key: "beaches", label: "Playas", icon: "🏖️" },
  { key: "mountains", label: "Montañas", icon: "🏔️" },
  { key: "cultural", label: "Turismo cultural", icon: "🏛️" },
  { key: "ecotourism", label: "Ecoturismo", icon: "🌿" },
  { key: "gastronomy", label: "Gastronomía", icon: "🍽️" },
  { key: "shopping", label: "Compras locales", icon: "🛍️" },
];
const BUDGET_OPTIONS = [
  { key: "low", label: "Menos de $50 USD" },
  { key: "medium", label: "Entre $50 y $100 USD" },
  { key: "high", label: "Más de $100 USD" },
];
const TRAVEL_TYPE_OPTIONS = [
  { key: "solo", label: "Solo/a", icon: "👤" },
  { key: "family", label: "En pareja o familia", icon: "👨‍👩‍👧" },
  { key: "group", label: "En grupo o amigos", icon: "👥" },
];
const ACTIVITY_LEVELS = [
  { value: 1, label: "🌴 Relajado" },
  { value: 2, label: "🧗 Intermedio" },
  { value: 3, label: "🚴‍♂️ Activo" },
];
const TRANSPORT_OPTIONS = [
  { key: "walk", label: "A pie", icon: "🚶" },
  { key: "public", label: "Transporte público", icon: "🚌" },
  { key: "car", label: "Vehículo alquilado/propio", icon: "🚗" },
  { key: "plane", label: "Avión", icon: "✈️" },
];
const today = new Date().toISOString().split("T")[0];

export default function UserPreferencesForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { setPreferences } = usePreferences();
  const [experiences, setExperiences] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [dateRange, setDateRange] = useState({ start: today, end: today });
  const [travelType, setTravelType] = useState("");
  const [activityLevel, setActivityLevel] = useState(1);
  const [transport, setTransport] = useState<string[]>([]);
  const [showLocalRecommendations, setShowLocalRecommendations] = useState(true);
  const [error, setError] = useState("");
  const validate = () => {
    if (!experiences.length) return "Selecciona al menos una experiencia.";
    if (!budget) return "Selecciona tu presupuesto.";
    if (!dateRange.start || !dateRange.end) return "Selecciona tus fechas de viaje.";
    if (!travelType) return "Selecciona con quién viajas.";
    if (!transport.length) return "Selecciona al menos un medio de transporte.";
    return "";
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setPreferences({
      experiences,
      budget,
      dateRange,
      travelType,
      activityLevel,
      transport,
      showLocalRecommendations,
    });
    setError("");
    onClose();
  };
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center min-h-screen w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Botón de cerrar fijo arriba a la derecha */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-[110] bg-white/80 hover:bg-blue-100 rounded-full p-2 shadow-lg border border-blue-200 text-blue-700"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-full sm:max-w-lg bg-white rounded-2xl shadow-2xl p-4 sm:p-8 flex flex-col gap-6 overflow-y-auto max-h-[95vh] relative"
            style={{ boxSizing: 'border-box' }}
          >
            <h2 className="text-xl sm:text-3xl font-bold text-blue-800 text-center mb-2">Tus preferencias de viaje</h2>
            {/* Experiencias */}
            <div>
              <label className="font-semibold mb-2 block">¿Qué tipo de experiencias buscas?</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                {EXPERIENCE_OPTIONS.map(opt => (
                  <button
                    type="button"
                    key={opt.key}
                    className={`flex flex-col items-center justify-center gap-1 rounded-xl border-2 p-3 text-base sm:text-lg font-semibold transition-all
                      ${experiences.includes(opt.key) ? "bg-blue-100 border-blue-500 text-blue-700 shadow" : "bg-white border-gray-200 text-gray-500"}
                    `}
                    onClick={() =>
                      setExperiences(experiences =>
                        experiences.includes(opt.key)
                          ? experiences.filter(e => e !== opt.key)
                          : [...experiences, opt.key]
                      )
                    }
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Presupuesto */}
            <div>
              <label className="font-semibold mb-2 block">¿Cuál es tu presupuesto diario?</label>
              <div className="flex flex-col sm:flex-row gap-3">
                {BUDGET_OPTIONS.map(opt => (
                  <label key={opt.key} className={`flex-1 flex items-center gap-2 p-2 rounded-lg border-2 cursor-pointer transition-all
                    ${budget === opt.key ? "bg-blue-100 border-blue-500 text-blue-700" : "bg-white border-gray-200 text-gray-500"}
                  `}>
                    <input
                      type="radio"
                      name="budget"
                      value={opt.key}
                      checked={budget === opt.key}
                      onChange={() => setBudget(opt.key)}
                      className="accent-blue-600"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
            {/* Fechas */}
            <div>
              <label className="font-semibold mb-2 block">¿En qué fechas planeas viajar?</label>
              <div className="flex flex-col sm:flex-row gap-2 items-center">
                <input
                  type="date"
                  value={dateRange.start}
                  min={today}
                  onChange={e => setDateRange(r => ({ ...r, start: e.target.value }))}
                  className="border rounded-lg px-2 py-1 w-full sm:w-auto"
                />
                <span className="mx-1">a</span>
                <input
                  type="date"
                  value={dateRange.end}
                  min={dateRange.start}
                  onChange={e => setDateRange(r => ({ ...r, end: e.target.value }))}
                  className="border rounded-lg px-2 py-1 w-full sm:w-auto"
                />
                <Calendar className="ml-2 text-blue-400 hidden sm:inline" />
              </div>
            </div>
            {/* Tipo de viaje */}
            <div>
              <label className="font-semibold mb-2 block">¿Viajas solo o acompañado?</label>
              <div className="flex flex-col sm:flex-row gap-3">
                {TRAVEL_TYPE_OPTIONS.map(opt => (
                  <button
                    type="button"
                    key={opt.key}
                    className={`flex-1 flex flex-col items-center gap-1 rounded-xl border-2 p-3 text-base sm:text-lg font-semibold transition-all
                      ${travelType === opt.key ? "bg-blue-100 border-blue-500 text-blue-700 shadow" : "bg-white border-gray-200 text-gray-500"}
                    `}
                    onClick={() => setTravelType(opt.key)}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Nivel de actividad */}
            <div>
              <label className="font-semibold mb-2 block">¿Qué nivel de actividad prefieres?</label>
              <div className="flex items-center gap-4 justify-center sm:justify-start">
                {ACTIVITY_LEVELS.map(opt => (
                  <label key={opt.value} className="flex flex-col items-center gap-1">
                    <input
                      type="radio"
                      name="activity"
                      value={opt.value}
                      checked={activityLevel === opt.value}
                      onChange={() => setActivityLevel(opt.value)}
                      className="accent-blue-600"
                    />
                    <span className="text-xl">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Transporte */}
            <div>
              <label className="font-semibold mb-2 block">¿Qué medios de transporte planeas usar?</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TRANSPORT_OPTIONS.map(opt => (
                  <label key={opt.key} className={`flex items-center gap-2 p-2 rounded-lg border-2 cursor-pointer transition-all
                    ${transport.includes(opt.key) ? "bg-blue-100 border-blue-500 text-blue-700" : "bg-white border-gray-200 text-gray-500"}
                  `}>
                    <input
                      type="checkbox"
                      checked={transport.includes(opt.key)}
                      onChange={() =>
                        setTransport(t =>
                          t.includes(opt.key)
                            ? t.filter(x => x !== opt.key)
                            : [...t, opt.key]
                        )
                      }
                      className="accent-blue-600"
                    />
                    <span className="text-xl">{opt.icon}</span>
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
            {/* Recomendaciones locales */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowLocalRecommendations(v => !v)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${showLocalRecommendations ? "bg-blue-600" : "bg-gray-200"}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showLocalRecommendations ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
              <span className="font-semibold text-gray-700 text-sm sm:text-base">¿Te gustaría ver recomendaciones locales?</span>
            </div>
            {/* Error y submit */}
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <button
              type="submit"
              className="w-full py-3 mt-2 bg-blue-600 text-white rounded-xl font-bold text-lg shadow hover:bg-blue-700 transition-all mb-2"
            >
              Ver destinos recomendados
            </button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 