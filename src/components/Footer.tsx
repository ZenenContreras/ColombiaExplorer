import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Colombia Explorer</h3>
            <p className="text-gray-400">
              Descubre la magia de Colombia a través de nuestras experiencias
              únicas y destinos inolvidables.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quiénes Somos</h4>
            <p className="text-gray-400">
              Somos apasionados por mostrar la belleza y diversidad de Colombia,
              comprometidos con el turismo sostenible y la promoción de nuestra
              cultura.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Nuestra Misión</h4>
            <p className="text-gray-400">
              Conectar viajeros con las maravillas de Colombia, promoviendo el
              turismo responsable y el desarrollo local.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Facebook />
              </a>
              <a href="#" className="hover:text-pink-400 transition-colors">
                <Instagram />
              </a>
              <a href="#" className="hover:text-blue-300 transition-colors">
                <Twitter />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 Colombia Explorer. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
