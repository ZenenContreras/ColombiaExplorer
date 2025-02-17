import React from "react";
import { Card, CardContent } from "./ui/card";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-8 sm:py-12 md:py-16 min-h-screen mt-14 sm:mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-3 sm:mb-4">
            Sobre Nosotros
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Descubre Colombia a través de nuestros ojos, donde cada destino
            cuenta una historia única
          </p>
        </div>

        <div className="relative mb-8 sm:mb-12 md:mb-20">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-blue-600 opacity-10 rounded-lg sm:rounded-xl"></div>
          <div className="relative bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl shadow-md sm:shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
              <div className="p-2 sm:p-0">
                <h3 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-1 sm:mb-2">50+</h3>
                <p className="text-sm sm:text-base text-gray-600">Destinos Únicos</p>
              </div>
              <div className="p-2 sm:p-0">
                <h3 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-1 sm:mb-2">1000+</h3>
                <p className="text-sm sm:text-base text-gray-600">Viajeros Felices</p>
              </div>
              <div className="p-2 sm:p-0">
                <h3 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-1 sm:mb-2">4.95★</h3>
                <p className="text-sm sm:text-base text-gray-600">Calificación Promedio</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          <Card className="p-4 sm:p-6">
            <CardContent>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Nuestra Historia</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Colombia Explorer nació de la pasión por mostrar la verdadera
                esencia de Colombia al mundo. Desde 2025, nos hemos dedicado a
                crear experiencias únicas que conectan a los viajeros con la
                rica cultura, la impresionante naturaleza y la calidez de
                nuestra gente.
              </p>
            </CardContent>
          </Card>

          <Card className="p-4 sm:p-6">
            <CardContent>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Nuestra Misión</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Nos dedicamos a promover un turismo sostenible y responsable que
                beneficie tanto a los viajeros como a las comunidades locales.
                Buscamos crear conexiones significativas y experiencias
                auténticas que perduren en la memoria.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <Card className="p-4 sm:p-6">
            <CardContent>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Valores</h3>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-1 sm:space-y-2">
                <li>Autenticidad</li>
                <li>Sostenibilidad</li>
                <li>Responsabilidad social</li>
                <li>Excelencia en servicio</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="p-4 sm:p-6">
            <CardContent>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Nuestro Equipo</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Contamos con un equipo apasionado de expertos locales que
                conocen cada rincón de Colombia y se dedican a crear
                experiencias inolvidables para nuestros viajeros.
              </p>
            </CardContent>
          </Card>

          <Card className="p-4 sm:p-6">
            <CardContent>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Compromiso</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Nos comprometemos con el desarrollo sostenible del turismo en
                Colombia, protegiendo nuestro patrimonio natural y cultural para
                las futuras generaciones.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
