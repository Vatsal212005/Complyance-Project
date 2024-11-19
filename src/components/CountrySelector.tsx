import React from 'react';
import { useStore } from '../store/useStore';

const CountrySelector: React.FC = () => {
  const { user, countries, setCountry } = useStore();

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
  };

  return (
    <div className="flex items-center space-x-2">
      <select
        value={user?.country || ''}
        onChange={handleCountryChange}
        className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      >
        <option value="" disabled>Select country</option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.flag} {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountrySelector;