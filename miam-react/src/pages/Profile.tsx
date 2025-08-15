import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { updatePreferences } from '../store/slices/userSlice';
import toast from 'react-hot-toast';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const userPreferences = useSelector((state: RootState) => state.user.profile?.preferences);
  
  const [formData, setFormData] = useState({
    diet: userPreferences?.diet || 'omnivore',
    allergies: {
      gluten: false,
      lactose: false,
      nuts: false,
      shellfish: false,
      eggs: false,
      soy: false,
    },
    healthGoals: userPreferences?.healthGoals || 'maintain',
    budget: userPreferences?.budget || 150,
  });

  const handleDietChange = (diet: string) => {
    setFormData({ ...formData, diet: diet as any });
  };

  const handleAllergyChange = (allergy: string) => {
    setFormData({
      ...formData,
      allergies: {
        ...formData.allergies,
        [allergy]: !formData.allergies[allergy as keyof typeof formData.allergies],
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allergiesList = Object.entries(formData.allergies)
      .filter(([_, value]) => value)
      .map(([key]) => key);
    
    dispatch(updatePreferences({
      diet: formData.diet as any,
      allergies: allergiesList,
      healthGoals: formData.healthGoals,
      budget: formData.budget,
    }));
    
    toast.success('Préférences enregistrées avec succès !');
  };

  return (
    <div className="py-12 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-secondary font-semibold tracking-wide uppercase">Personnalisation</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Créez votre profil alimentaire
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            mIAm s'adapte à vos besoins spécifiques pour des recommandations ultra-personnalisées.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-5">Vos préférences alimentaires</h3>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {/* Régime alimentaire */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Régime alimentaire</label>
                <div className="space-y-2">
                  {['omnivore', 'vegetarian', 'vegan', 'pescatarian'].map((diet) => (
                    <div key={diet} className="flex items-center">
                      <input
                        id={diet}
                        name="diet"
                        type="radio"
                        checked={formData.diet === diet}
                        onChange={() => handleDietChange(diet)}
                        className="focus:ring-primary h-4 w-4 text-primary border-miam-cream-300"
                      />
                      <label htmlFor={diet} className="ml-3 block text-sm font-medium text-gray-700 capitalize">
                        {diet === 'omnivore' ? 'Omnivore' :
                         diet === 'vegetarian' ? 'Végétarien' :
                         diet === 'vegan' ? 'Végétalien' : 'Pescétarien'}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Allergies */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Allergies/intolérances</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries({
                    gluten: 'Gluten',
                    lactose: 'Lactose',
                    nuts: 'Noix',
                    shellfish: 'Crustacés',
                    eggs: 'Œufs',
                    soy: 'Soja',
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center">
                      <input
                        id={key}
                        type="checkbox"
                        checked={formData.allergies[key as keyof typeof formData.allergies]}
                        onChange={() => handleAllergyChange(key)}
                        className="focus:ring-primary h-4 w-4 text-primary border-miam-cream-300 rounded"
                      />
                      <label htmlFor={key} className="ml-2 block text-sm text-gray-700">
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Objectifs santé et budget */}
              <div>
                <label htmlFor="health-goals" className="block text-sm font-medium text-gray-700 mb-3">
                  Objectifs santé
                </label>
                <select
                  id="health-goals"
                  value={formData.healthGoals}
                  onChange={(e) => setFormData({ ...formData, healthGoals: e.target.value })}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-miam-cream-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                >
                  <option value="maintain">Maintien du poids</option>
                  <option value="lose">Perte de poids</option>
                  <option value="gain">Prise de masse musculaire</option>
                  <option value="digestion">Amélioration digestion</option>
                  <option value="cholesterol">Réduction cholestérol</option>
                  <option value="glycemic">Équilibre glycémique</option>
                </select>

                <label className="block text-sm font-medium text-gray-700 mt-6 mb-3">
                  Budget alimentaire hebdomadaire
                </label>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">€</span>
                  <input
                    type="range"
                    min="50"
                    max="300"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 font-medium">{formData.budget}€</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-accent hover:bg-miam-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors"
              >
                Enregistrer mes préférences
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;