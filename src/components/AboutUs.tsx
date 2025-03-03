import React from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { 
  Users, Heart, Globe2, Award, 
  Compass, Shield, TreePine, Coffee 
} from "lucide-react";

const AboutUs = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stats = [
    { number: "50+", label: "Destinos", icon: <Compass className="w-6 h-6" /> },
    { number: "1000+", label: "Viajeros", icon: <Users className="w-6 h-6" /> },
    { number: "4.95★", label: "Rating", icon: <Award className="w-6 h-6" /> },
    { number: "24/7", label: "Soporte", icon: <Shield className="w-6 h-6" /> }
  ];

  const values = [
    { 
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: "Pasión",
      description: "Amamos lo que hacemos y se refleja en cada experiencia que creamos."
    },
    {
      icon: <Globe2 className="w-6 h-6 text-blue-500" />,
      title: "Sostenibilidad",
      description: "Comprometidos con el turismo responsable y la preservación cultural."
    },
    {
      icon: <TreePine className="w-6 h-6 text-green-500" />,
      title: "Naturaleza",
      description: "Promovemos la conexión con la naturaleza y su conservación."
    },
    {
      icon: <Coffee className="w-6 h-6 text-amber-500" />,
      title: "Autenticidad",
      description: "Experiencias genuinas que reflejan la verdadera esencia de Colombia."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Hero Section Mejorado */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[70vh] overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/colombia-landscape.jpg"
            alt="Colombia landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>
        
        <div className="relative h-full container mx-auto px-4 flex flex-col items-center justify-center text-white text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
            {...fadeInUp}
          >
            Sobre Nosotros
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Descubre Colombia a través de nuestros ojos, donde cada destino
            cuenta una historia única y cada viaje se convierte en una experiencia inolvidable
          </motion.p>
        </div>
      </motion.div>

      {/* Stats Section Mejorado */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white rounded-xl shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-300"
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="flex justify-center mb-3 text-blue-600">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-blue-900 mb-1">{stat.number}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Historia y Misión Mejorado */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 h-full bg-gradient-to-br from-blue-50 to-white hover:shadow-xl transition-all duration-300">
              <h2 className="text-3xl font-bold mb-6 text-blue-900">Nuestra Historia</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Colombia Explorer nació de la pasión por mostrar la verdadera
                esencia de Colombia al mundo. Desde 2025, nos hemos dedicado a
                crear experiencias únicas que conectan a los viajeros con la
                rica cultura, la impresionante naturaleza y la calidez de
                nuestra gente.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 h-full bg-gradient-to-br from-blue-50 to-white hover:shadow-xl transition-all duration-300">
              <h2 className="text-3xl font-bold mb-6 text-blue-900">Nuestra Misión</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Nos dedicamos a promover un turismo sostenible y responsable que
                beneficie tanto a los viajeros como a las comunidades locales.
                Buscamos crear conexiones significativas y experiencias
                auténticas que perduren en la memoria.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Valores Section Mejorado */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-blue-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Nuestros Valores
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
              >
                <div className="bg-gray-50 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
