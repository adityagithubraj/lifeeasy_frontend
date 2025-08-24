import React from 'react';
import { motion } from 'framer-motion';
import { Car, Smartphone, Factory, Cloud, Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const industries = [
    {
      id: 1,
      name: 'Automotive',
      icon: Car,
      color: 'from-red-500 to-red-600'
    },
    {
      id: 2,
      name: 'Mobile',
      icon: Smartphone,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 3,
      name: 'Industrial',
      icon: Factory,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 4,
      name: 'IOT',
      icon: Cloud,
      color: 'from-blue-500 to-blue-600'
    }
  ];

  const contactInfo = [
    {
      id: 1,
      icon: Mail,
      title: 'Email',
      value: 'info@lifeeasy.in',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      icon: Phone,
      title: 'Phone',
      value: '+91 98765 43210',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      icon: MapPin,
      title: 'Address',
      value: 'Mumbai, Maharashtra, India',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      icon: Clock,
      title: 'Business Hours',
      value: 'Mon - Fri: 9:00 AM - 6:00 PM',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Leading Innovation Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Leading Innovation
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
              We aim to provide a full-stack supply chain management solution for both our customers and suppliers.
            </p>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ranked one of the largest electronic components distributors in India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
              Get In Touch
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br ${contact.color} flex items-center justify-center shadow-lg`}>
                    <contact.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {contact.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {contact.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industries Served Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            {/* Section Header with Teal Lines */}
            <div className="flex items-center justify-center mb-12">
              <div className="w-16 h-0.5 bg-teal-500 mr-4"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                Industries Served
              </h2>
              <div className="w-16 h-0.5 bg-teal-500 ml-4"></div>
            </div>

            {/* Industries Grid */}
            <div className="grid grid-cols-2 gap-6 md:gap-8 max-w-md mx-auto">
              {industries.map((industry, index) => (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className={`w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 rounded-lg bg-gradient-to-br ${industry.color} flex items-center justify-center shadow-lg`}>
                    <industry.icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
                  </div>
                  <p className="text-sm md:text-base font-medium text-gray-700">
                    {industry.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;