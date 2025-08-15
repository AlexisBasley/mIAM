import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { ChevronLeftIcon, ChevronRightIcon, SparklesIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Calendar: React.FC = () => {
  const dispatch = useDispatch();
  const { weekPlan, nutritionScore } = useSelector((state: RootState) => state.calendar);

  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  
  const mockMeals = {
    lunch: [
      { id: '1', name: 'Salade de quinoa aux légumes grillés', time: '20 min', calories: 450 },
      { id: '2', name: 'Wrap avocat et thon', time: '15 min', calories: 400 },
      { id: '3', name: 'Bowl poke saumon', time: '20 min', calories: 500 },
    ],
    dinner: [
      { id: '4', name: 'Poulet rôti aux herbes et patates douces', time: '40 min', calories: 550 },
      { id: '5', name: 'Curry de lentilles corail', time: '30 min', calories: 480 },
      { id: '6', name: 'Risotto aux champignons', time: '35 min', calories: 520 },
    ],
  };

  const handleGenerateWeek = () => {
    toast.success('Semaine générée avec succès !');
  };

  const handleGenerateShoppingList = () => {
    toast.success('Liste de courses générée !');
  };

  return (
    <div className="py-12 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-secondary font-semibold tracking-wide uppercase">Planification</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Votre calendrier alimentaire
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Planifiez vos repas de la semaine en quelques clics, avec des suggestions adaptées à vos goûts.
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Semaine du {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </h3>
              <div className="flex space-x-2">
                <button className="inline-flex items-center px-3 py-1 border border-miam-cream-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-miam-cream-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  <ChevronLeftIcon className="h-4 w-4 mr-1" />
                  Précédent
                </button>
                <button className="inline-flex items-center px-3 py-1 border border-miam-cream-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-miam-cream-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  Suivant
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </button>
                <button
                  onClick={handleGenerateWeek}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-accent hover:bg-miam-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                >
                  <SparklesIcon className="h-4 w-4 mr-1" />
                  Générer automatiquement
                </button>
              </div>
            </div>
          </div>

          {/* Days header */}
          <div className="bg-miam-cream-100 px-4 py-3 grid grid-cols-7 gap-4 text-center">
            {days.map((day) => (
              <div key={day} className="text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="px-4 py-5 grid grid-cols-7 gap-4">
            {days.map((day, index) => (
              <div key={day} className="min-h-[200px]">
                <div className="bg-white p-3 rounded-lg shadow-sm border border-miam-cream-200 h-full">
                  <div className="space-y-3">
                    <div>
                      <div className="font-medium text-sm mb-1">Midi</div>
                      <div className="text-xs text-secondary hover:text-miam-primary-800 cursor-pointer">
                        {mockMeals.lunch[index % mockMeals.lunch.length].name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {mockMeals.lunch[index % mockMeals.lunch.length].time} • {mockMeals.lunch[index % mockMeals.lunch.length].calories} kcal
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-sm mb-1">Soir</div>
                      <div className="text-xs text-secondary hover:text-miam-primary-800 cursor-pointer">
                        {mockMeals.dinner[index % mockMeals.dinner.length].name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {mockMeals.dinner[index % mockMeals.dinner.length].time} • {mockMeals.dinner[index % mockMeals.dinner.length].calories} kcal
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-4 sm:px-6 border-t border-miam-cream-200 bg-miam-cream-100">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm font-medium text-gray-700">Score nutritionnel hebdomadaire:</span>
                <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full nutrition-score-B">B</span>
              </div>
              <button
                onClick={handleGenerateShoppingList}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-miam-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <ShoppingBagIcon className="h-4 w-4 mr-2" />
                Générer la liste de courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;