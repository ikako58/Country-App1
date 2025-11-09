import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchInput from '../components/SearchInput';
import RegionSelector from '../components/RegionSelector';

interface Country {
  name: { common: string };
  flags: { png: string; svg: string };
  region: string;
  capital?: string[];
  population: number;
}

export default function Countries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');

  useEffect(() => {
    setLoading(true);
    const url = region
      ? `https://restcountries.com/v3.1/region/${region.toLowerCase()}?fields=name,flags,capital,region,population`
      : 'https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population';

    axios
      .get(url)
      .then((res) => {
        setCountries(res.data);
        setFilteredCountries(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load countries 😢');
        setLoading(false);
      });
  }, [region]);

  useEffect(() => {
    const term = search.toLowerCase();
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(term)
    );
    setFilteredCountries(filtered);
  }, [search, countries]);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading countries...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 flex-col sm:flex-row gap-4">
          <h1 className="text-3xl font-bold text-blue-700">🌍 Countries of the World</h1>
          <Link
            to="/"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
        </div>

        <RegionSelector value={region} onChange={(e) => setRegion(e.target.value)} />

        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search countries..."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCountries.map((country) => (
            <Link
              key={country.name.common}
              to={`/country/${encodeURIComponent(country.name.common)}`}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 text-center"
            >
              <img
                src={country.flags.png}
                alt={`${country.name.common} flag`}
                className="w-32 h-20 object-cover mx-auto rounded mb-4 border"
              />
              <h2 className="text-lg font-semibold text-gray-800">{country.name.common}</h2>
              <p className="text-sm text-gray-500 mt-1">Region: {country.region}</p>
              <p className="text-sm text-gray-500">
                Capital: {country.capital ? country.capital[0] : 'N/A'}
              </p>
              <p className="text-sm text-gray-500">
                Population: {country.population.toLocaleString()}
              </p>
            </Link>
          ))}
        </div>

        {filteredCountries.length === 0 && (
          <p className="text-center text-gray-600 mt-10">No countries found.</p>
        )}
      </div>
    </div>
  );
}
