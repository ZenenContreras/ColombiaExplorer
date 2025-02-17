import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Layout from "./components/Layout";
import routes from "tempo-routes";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";

const App = () => {
  // Lazy loading de componentes
  const AboutUs = lazy(() => import('./components/AboutUs'));
  const Favorites = lazy(() => import('./components/Favorites'));
  const InteractiveMap = lazy(() => import('./components/InteractiveMap'));

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="min-h-screen flex flex-col">
        <NavigationBar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Suspense>
  );
};

export default App;
