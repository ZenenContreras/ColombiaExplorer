import React from "react";
import { Card, CardContent } from "./ui/card";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-900 mb-4">
            Sobre Nosotros
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre Colombia a través de nuestros ojos, donde cada destino
            cuenta una historia única
          </p>
        </div>

        <div className="relative mb-20">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-blue-600 opacity-10 rounded-xl"></div>
          <div className="relative bg-white p-8 rounded-xl shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-4xl font-bold text-blue-900 mb-2">50+</h3>
                <p className="text-gray-600">Destinos Únicos</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-blue-900 mb-2">1000+</h3>
                <p className="text-gray-600">Viajeros Felices</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-blue-900 mb-2">4.95★</h3>
                <p className="text-gray-600">Calificación Promedio</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-4">Nuestra Historia</h2>
              <p className="text-gray-600 leading-relaxed">
                Colombia Explorer nació de la pasión por mostrar la verdadera
                esencia de Colombia al mundo. Desde 2025, nos hemos dedicado a
                crear experiencias únicas que conectan a los viajeros con la
                rica cultura, la impresionante naturaleza y la calidez de
                nuestra gente.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-4">Nuestra Misión</h2>
              <p className="text-gray-600 leading-relaxed">
                Nos dedicamos a promover un turismo sostenible y responsable que
                beneficie tanto a los viajeros como a las comunidades locales.
                Buscamos crear conexiones significativas y experiencias
                auténticas que perduren en la memoria.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="p-6">
            <CardContent>
              <h3 className="text-xl font-semibold mb-3">Valores</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Autenticidad</li>
                <li>Sostenibilidad</li>
                <li>Responsabilidad social</li>
                <li>Excelencia en servicio</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent>
              <h3 className="text-xl font-semibold mb-3">Nuestro Equipo</h3>
              <p className="text-gray-600 leading-relaxed">
                Contamos con un equipo apasionado de expertos locales que
                conocen cada rincón de Colombia y se dedican a crear
                experiencias inolvidables para nuestros viajeros.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent>
              <h3 className="text-xl font-semibold mb-3">Compromiso</h3>
              <p className="text-gray-600 leading-relaxed">
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
