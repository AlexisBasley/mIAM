import React, { useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import { HeartIcon, XMarkIcon, ClockIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { swipeRecipe } from '../store/slices/recipesSlice';
import toast from 'react-hot-toast';

const Recipes: React.FC = () => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGesturing, setIsGesturing] = useState(false);
  
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
    {
      id: '4',
      title: 'Curry de lentilles épicé',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      time: 40,
      calories: 420,
      difficulty: 'medium',
      nutritionScore: 'A',
      description: 'Un curry végétarien riche en protéines avec lentilles rouges, lait de coco et épices authentiques.',
    },
    {
      id: '5',
      title: 'Tacos de poisson aux légumes',
      image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      time: 20,
      calories: 380,
      difficulty: 'easy',
      nutritionScore: 'B',
      description: 'Tacos frais avec poisson grillé, salade de chou, avocat et sauce lime-coriandre.',
    },
  ];

  const currentRecipe = recipes[currentIndex];

  // Animation spring
  const [{ x, rotate, scale, opacity }, api] = useSpring(() => ({
    x: 0,
    rotate: 0,
    scale: 1,
    opacity: 1,
    config: { tension: 300, friction: 30 }
  }));

  // Gesture handler
  const bind = useDrag(
    ({ 
      active, 
      movement: [mx], 
      direction: [xDir], 
      velocity: [vx], 
      cancel 
    }) => {
      setIsGesturing(active);
      
      // Trigger swipe action if moved far enough or fast enough
      const trigger = Math.abs(mx) > 100 || vx > 0.5;
      
      if (!active && trigger) {
        const liked = xDir > 0;
        handleSwipe(liked);
        cancel();
        return;
      }
      
      // Update spring animation
      api.start({
        x: active ? mx : 0,
        rotate: active ? mx / 10 : 0,
        scale: active ? 1.05 : 1,
        opacity: active ? Math.max(0.8, 1 - Math.abs(mx) / 300) : 1,
        immediate: false
      });
    },
    {
      axis: 'x',
      bounds: { left: -300, right: 300 },
      rubberband: true
    }
  );

  const handleSwipe = (liked: boolean) => {
    if (!currentRecipe) return;
    
    // Haptic feedback on mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(liked ? [50, 50, 50] : [100]);
    }
    
    dispatch(swipeRecipe({ id: currentRecipe.id, liked }));
    
    // Animation out
    api.start({
      x: liked ? 300 : -300,
      rotate: liked ? 30 : -30,
      scale: 0.8,
      opacity: 0,
      config: { duration: 200 }
    });
    
    if (liked) {
      toast.success('❤️ Recette ajoutée à vos favoris !', {
        duration: 2000,
        style: {
          background: '#10B981',
          color: '#fff'
        }
      });
    } else {
      toast('👋 Recette ignorée', {
        duration: 1500,
        style: {
          background: '#6B7280',
          color: '#fff'
        }
      });
    }
    
    // Reset card and move to next recipe
    setTimeout(() => {
      if (currentIndex < recipes.length - 1) {
        setCurrentIndex(currentIndex + 1);
        api.set({ x: 0, rotate: 0, scale: 1, opacity: 1 });
      } else {
        toast('🎉 Plus de recettes pour le moment !', {
          duration: 3000,
          style: {
            background: '#3B82F6',
            color: '#fff'
          }
        });
      }
    }, 200);
  };

  return (
    <div className="py-8 px-4 bg-cream min-h-screen">
      <div className="max-w-sm mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Découvrez</h2>
          <p className="text-gray-600">
            Swipez ➡️ pour aimer, ⬅️ pour passer
          </p>
          <div className="mt-4 bg-miam-primary-100 rounded-full px-4 py-1 inline-block">
            <span className="text-sm text-miam-primary-800 font-medium">
              {currentIndex + 1} / {recipes.length}
            </span>
          </div>
        </div>

        {currentRecipe && (
          <div className="relative h-[600px] flex items-center justify-center">
            {/* Background cards for depth effect */}
            {recipes.slice(currentIndex + 1, currentIndex + 3).map((recipe, index) => (
              <div
                key={recipe.id}
                className="absolute bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-sm"
                style={{
                  transform: `translateY(${(index + 1) * 8}px) scale(${1 - (index + 1) * 0.05})`,
                  zIndex: -index - 1,
                  opacity: 0.5 - index * 0.2
                }}
              >
                <div className="h-80 bg-gray-200"></div>
                <div className="p-4 h-32"></div>
              </div>
            ))}

            {/* Main swipeable card */}
            <animated.div
              {...bind()}
              className="absolute bg-white rounded-2xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing touch-none w-full max-w-sm"
              style={{
                x,
                rotate: rotate.to(r => `${r}deg`),
                scale,
                opacity,
                zIndex: 10,
                touchAction: 'none'
              }}
            >
              {/* Swipe indicators */}
              <animated.div 
                className="absolute top-4 left-4 bg-primary text-white px-4 py-2 rounded-full font-bold z-20 shadow-lg"
                style={{
                  opacity: x.to(x => x > 50 ? Math.min(1, (x - 50) / 100) : 0)
                }}
              >
                ❤️ J'AIME
              </animated.div>
              
              <animated.div 
                className="absolute top-4 right-4 bg-accent text-white px-4 py-2 rounded-full font-bold z-20 shadow-lg"
                style={{
                  opacity: x.to(x => x < -50 ? Math.min(1, (-x - 50) / 100) : 0)
                }}
              >
                👎 NOPE
              </animated.div>

              {/* Image */}
              <div className="relative h-80">
                <img
                  src={currentRecipe.image}
                  alt={currentRecipe.title}
                  className="w-full h-full object-cover"
                  draggable={false}
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
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{currentRecipe.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {currentRecipe.time} min
                  </div>
                  <div>{currentRecipe.calories} kcal</div>
                  <div className="capitalize px-2 py-1 bg-miam-cream-200 rounded text-xs">
                    {currentRecipe.difficulty === 'easy' ? 'Facile' : 
                     currentRecipe.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
                  </div>
                </div>
              </div>
            </animated.div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-center space-x-6 mt-8">
          <button
            onTouchStart={() => handleSwipe(false)}
            onClick={() => handleSwipe(false)}
            disabled={isGesturing}
            className="flex items-center justify-center w-16 h-16 rounded-full bg-miam-cream-300 hover:bg-miam-cream-400 active:bg-miam-cream-500 transition-colors disabled:opacity-50 shadow-md"
          >
            <XMarkIcon className="h-8 w-8 text-accent" />
          </button>
          
          <button
            onTouchStart={() => handleSwipe(true)}
            onClick={() => handleSwipe(true)}
            disabled={isGesturing}
            className="flex items-center justify-center w-16 h-16 rounded-full bg-primary hover:bg-miam-primary-600 active:bg-miam-primary-700 transition-colors disabled:opacity-50 shadow-md"
          >
            <HeartSolidIcon className="h-8 w-8 text-white" />
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Glissez la carte ou utilisez les boutons
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recipes;