import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { 
  Bars3Icon, 
  XMarkIcon
} from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Mon Profil', href: '/profile' },
    { name: 'Calendrier', href: '/calendar' },
    { name: 'Recettes', href: '/recipes' },
    { name: 'Nutrition+', href: '/nutrition' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-miam-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img 
                src="/logomiam.png" 
                alt="mIAm" 
                className="h-8 w-8 mr-2"
              />
              <span className="text-xl font-bold text-gray-800">mIAm</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-miam-primary-100 text-miam-primary-800'
                    : 'text-gray-700 hover:text-secondary hover:bg-miam-cream-200'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden sm:flex sm:items-center">
            {isAuthenticated ? (
              <button className="bg-miam-cream-300 hover:bg-miam-cream-400 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Mon compte
              </button>
            ) : (
              <button className="bg-accent hover:bg-miam-accent-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
                Connexion
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.href)
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Login section */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2">
              {isAuthenticated ? (
                <button className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                  Mon compte
                </button>
              ) : (
                <button className="w-full bg-accent hover:bg-red-700 text-white px-3 py-2 rounded-md text-base font-medium transition-colors">
                  Se connecter
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;