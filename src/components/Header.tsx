import React from 'react';
import { Globe2, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';
import CountrySelector from './CountrySelector';

const Header: React.FC = () => {
  const { user, setUser } = useStore();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <Globe2 className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">MultiCountry App</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <CountrySelector />
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                {user?.name} ({user?.role})
              </span>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;