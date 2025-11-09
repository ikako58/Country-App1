import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Country {
  name: { common: string; official: string };
  flags: { png: string; svg: string };
  capital?: string[];
  region: string;
  population: number;
}

export default function Countries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          'https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population'
        );
        setCountries(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load country data 😢');
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600 text-lg">
        Loading countries...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">
            🌎 Countries of the World
          </h1>
          <Link
            to="/"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {countries.map((country) => (
            <div
              key={country.name.common}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 text-center"
            >
              <img
                src={country.flags.png}
                alt={`${country.name.common} flag`}
                className="w-32 h-20 object-cover mx-auto rounded mb-4 border"
              />
              <h2 className="text-lg font-semibold text-gray-800">
                {country.name.common}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-medium">Region:</span> {country.region}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Capital:</span>{' '}
                {country.capital ? country.capital[0] : 'N/A'}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Population:</span>{' '}
                {country.population.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
