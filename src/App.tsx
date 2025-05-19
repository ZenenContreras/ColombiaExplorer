import { Suspense, lazy, useState } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Layout from "./components/Layout";
import routes from "tempo-routes";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import { PreferencesProvider, usePreferences } from "./lib/PreferencesContext";
import UserPreferencesForm from "./components/UserPreferencesForm";

function AppContent() {
  const { preferences } = usePreferences();
  const [showForm, setShowForm] = useState(!preferences.experiences.length);
  return (
    <>
      <UserPreferencesForm open={showForm} onClose={() => setShowForm(false)} />
      <div className={showForm ? 'pointer-events-none blur-sm select-none' : ''}>
        <NavigationBar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <button
        className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-all"
        onClick={() => setShowForm(true)}
        title="Editar preferencias"
      >
        ⚙️ Preferencias
      </button>
    </>
  );
}

const App = () => {
  return (
    <PreferencesProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="min-h-screen flex flex-col">
          <AppContent />
        </div>
      </Suspense>
    </PreferencesProvider>
  );
};

export default App;
