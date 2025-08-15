import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  CalendarIcon, 
  HeartIcon, 
  CpuChipIcon,
  ArrowPathIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const Home: React.FC = () => {
  const features = [
    {
      icon: CpuChipIcon,
      title: 'Assistant culinaire IA',
      description: 'Notre IA apprend vos goûts, habitudes et contraintes pour vous proposer des recettes parfaitement adaptées.',
    },
    {
      icon: CalendarIcon,
      title: 'Calendrier personnalisé',
      description: 'Planifiez vos repas de la semaine avec des suggestions adaptées à votre emploi du temps et vos envies.',
    },
    {
      icon: ChartBarIcon,
      title: 'Score nutritionnel',
      description: 'Obtenez une analyse hebdomadaire de votre alimentation avec des conseils pour améliorer votre équilibre.',
    },
    {
      icon: HeartIcon,
      title: 'Nutrition+',
      description: 'Accédez à des recommandations de nutritionnistes pour optimiser votre santé (rotation des huiles, protéines végétales...).',
    },
    {
      icon: ArrowPathIcon,
      title: 'Anti-gaspillage',
      description: 'Scannez votre frigo ou saisissez vos ingrédients disponibles pour recevoir des recettes adaptées.',
    },
    {
      icon: ClockIcon,
      title: 'Batch cooking',
      description: 'Des plans de meal prep optimisés pour gagner du temps tout en mangeant équilibré toute la semaine.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-miam-cream-100 to-miam-primary-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Mangez mieux,</span>
                <span className="block text-secondary">sans vous compliquer la vie</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto lg:mx-0 text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl">
                mIAm apprend vos goûts et contraintes pour vous proposer des repas équilibrés, faciles à préparer et adaptés à votre quotidien.
              </p>
              <div className="mt-10 flex justify-center lg:justify-start">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-md shadow"
                >
                  <Link
                    to="/profile"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent hover:bg-miam-accent-700 md:py-4 md:text-lg md:px-10 transition-colors shadow-lg"
                  >
                    Commencer maintenant
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Images */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Both images in a grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Scan image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="relative"
                >
                  <img 
                    src="/scan.JPEG" 
                    alt="Scanner vos aliments avec mIAm"
                    className="w-full h-64 md:h-80 object-cover rounded-lg shadow-xl"
                  />
                </motion.div>

                {/* Plats image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="relative"
                >
                  <img 
                    src="/plats.JPEG" 
                    alt="Préparation de repas avec mIAm"
                    className="w-full h-64 md:h-80 object-cover rounded-lg shadow-xl"
                  />
                </motion.div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-secondary font-semibold tracking-wide uppercase">Fonctionnalités</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Une expérience culinaire personnalisée
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              mIAm s'adapte à vos besoins pour vous aider à mieux manger au quotidien.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-miam-cream-200"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white shadow-md">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="mt-5">
                    <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                    <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-secondary">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Prêt à révolutionner votre alimentation?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-miam-cream-200">
            Essayez mIAm gratuitement pendant 14 jours. Sans engagement, annulation à tout moment.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 inline-block"
          >
            <Link
              to="/profile"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-secondary bg-white hover:bg-miam-cream-100 transition-colors shadow-lg"
            >
              Démarrer l'essai gratuit
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;