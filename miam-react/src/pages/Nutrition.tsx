import React from 'react';
import { CheckCircleIcon, InformationCircleIcon, ExclamationCircleIcon, StarIcon } from '@heroicons/react/24/outline';

const Nutrition: React.FC = () => {
  const nutritionData = {
    proteins: { value: 25, label: 'Protéines', color: 'bg-primary' },
    carbs: { value: 40, label: 'Glucides', color: 'bg-secondary' },
    fats: { value: 35, label: 'Lipides', color: 'bg-miam-cream-400' },
    fiber: { value: 28, label: 'Fibres (g)', color: 'bg-accent' },
  };

  const advice = [
    {
      type: 'success',
      icon: CheckCircleIcon,
      title: 'Félicitations!',
      message: 'Votre consommation de légumes est excellente cette semaine.',
    },
    {
      type: 'warning',
      icon: InformationCircleIcon,
      title: 'À améliorer:',
      message: 'Essayez d\'incorporer plus de poissons gras (saumon, maquereau) pour vos apports en oméga-3.',
    },
    {
      type: 'warning',
      icon: InformationCircleIcon,
      title: 'Variété:',
      message: 'Pensez à alterner vos sources de protéines (légumineuses, œufs, volaille) pour plus de diversité.',
    },
    {
      type: 'error',
      icon: ExclamationCircleIcon,
      title: 'Attention:',
      message: 'Vous avez consommé de la viande rouge 3 fois cette semaine. Essayez de limiter à 1 fois maximum.',
    },
  ];

  const getAdviceColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="py-12 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-secondary font-semibold tracking-wide uppercase">Nutrition</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Votre bilan nutritionnel
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Analysez votre équilibre alimentaire et recevez des conseils personnalisés.
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Semaine du {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} - Score: <span className="px-2 py-1 text-sm font-semibold rounded-full nutrition-score-B">B</span>
            </h3>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Graphique des nutriments */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-6">Répartition des nutriments</h4>
                <div className="space-y-4">
                  {Object.entries(nutritionData).map(([key, data]) => (
                    <div key={key}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{data.label}</span>
                        <span className="text-sm text-gray-500">
                          {key === 'fiber' ? `${data.value}g` : `${data.value}%`}
                        </span>
                      </div>
                      <div className="w-full bg-miam-cream-200 rounded-full h-2.5">
                        <div 
                          className={`${data.color} h-2.5 rounded-full transition-all duration-500`}
                          style={{ width: `${data.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Graphique visuel */}
                <div className="mt-8 h-64 flex items-end justify-around">
                  {Object.entries(nutritionData).map(([key, data]) => (
                    <div key={key} className="flex flex-col items-center">
                      <div 
                        className={`w-12 ${data.color} rounded-t transition-all duration-500`}
                        style={{ height: `${(data.value / 100) * 200}px` }}
                      ></div>
                      <span className="text-xs mt-2 text-gray-600">{data.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conseils nutritionnels */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-6">Conseils pour améliorer votre score</h4>
                <div className="space-y-4">
                  {advice.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className={`flex-shrink-0 h-5 w-5 ${getAdviceColor(item.type)}`}>
                        <item.icon aria-hidden="true" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        <span className="font-medium">{item.title}</span> {item.message}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Recommandations Nutrition+ */}
                <div className="mt-8">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Nutrition+ recommandations</h4>
                  <div className="bg-miam-primary-100 p-4 rounded-lg space-y-2">
                    <p className="text-sm text-miam-primary-800 flex items-start">
                      <StarIcon className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                      Cette semaine, essayez l'huile de colza pour vos vinaigrettes (riche en oméga-3) et l'huile d'olive pour la cuisson.
                    </p>
                    <p className="text-sm text-miam-primary-800 flex items-start">
                      <StarIcon className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                      Pensez à un repas 100% végétal pour demain afin de diversifier vos apports.
                    </p>
                    <p className="text-sm text-miam-primary-800 flex items-start">
                      <StarIcon className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                      Ajoutez des graines (lin, chia) à vos salades pour booster vos apports en fibres et oméga-3.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;