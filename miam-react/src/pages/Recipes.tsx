import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartIcon, XMarkIcon, ClockIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { swipeRecipe } from '../store/slices/recipesSlice';
import toast from 'react-hot-toast';

const Recipes: React.FC = () => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const recipes = [
    {
      id: '1',
      title: 'Salade César au poulet grillé',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      time: 25,
      calories: 450,
      difficulty: 'easy',
      nutritionScore: 'A',
      description: 'Une salade fraîche et équilibrée avec du poulet grillé, de la laitue romaine, des croûtons et une sauce César légère.',
    },
    {
      id: '2',
      title: 'Bowl de quinoa aux légumes rôtis',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      time: 30,
      calories: 380,
      difficulty: 'easy',
      nutritionScore: 'A',
      description: 'Un bowl végétarien coloré avec du quinoa, des légumes de saison rôtis au four et une vinaigrette tahini.',
    },
    {
      id: '3',
      title: 'Saumon teriyaki avec riz complet',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      time: 35,
      calories: 520,
      difficulty: 'medium',
      nutritionScore: 'A',
      description: 'Filet de saumon glacé au teriyaki maison, servi avec du riz complet et des légumes vapeur.',
    },
  ];

  const currentRecipe = recipes[currentIndex];

  const handleSwipe = (liked: boolean) => {
    if (!currentRecipe) return;
    
    dispatch(swipeRecipe({ id: currentRecipe.id, liked }));
    
    if (liked) {
      toast.success('Recette ajoutée à vos favoris !');
    }
    
    // Animation avant de passer à la recette suivante
    setTimeout(() => {
      if (currentIndex < recipes.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        toast('Plus de recettes pour le moment !');
      }
    }, 300);
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Découverte</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Swipez pour découvrir
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Glissez à droite pour aimer, à gauche pour passer. L'IA apprend vos préférences !
          </p>
        </div>

        {currentRecipe && (
          <div className="relative max-w-md mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRecipe.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-64 sm:h-80">
                  <img
                    src={currentRecipe.image}
                    alt={currentRecipe.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white nutrition-score-${currentRecipe.nutritionScore}`}>
                      {currentRecipe.nutritionScore}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{currentRecipe.title}</h3>
                  <p className="text-gray-600 mb-4">{currentRecipe.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {currentRecipe.time} min
                    </div>
                    <div>{currentRecipe.calories} kcal</div>
                    <div className="capitalize px-2 py-1 bg-gray-100 rounded">
                      {currentRecipe.difficulty === 'easy' ? 'Facile' : 
                       currentRecipe.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex justify-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSwipe(false)}
                      className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <XMarkIcon className="h-8 w-8 text-gray-600" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSwipe(true)}
                      className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
                    >
                      <HeartSolidIcon className="h-8 w-8 text-red-600" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Instructions */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Utilisez les boutons ou glissez la carte pour continuer
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;