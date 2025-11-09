import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Country {
  name: { common: string; official: string };
  flags: { svg: string; png: string };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  area?: number;
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol: string }>;
}

export default function CountryDetails() {
  const { name } = useParams<{ name: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then((res) => {
        setCountry(res.data[0]);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load country details 😢');
        setLoading(false);
      });
  }, [name]);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading details...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!country) return <p className="text-center mt-10 text-gray-600">Country not found.</p>;

  const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => `${c.name} (${c.symbol})`)
        .join(', ')
    : 'N/A';

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
        <Link to="/countries" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to Countries
        </Link>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <img
            src={country.flags.svg || country.flags.png}
            alt={`${country.name.common} flag`}
            className="w-64 h-40 object-cover border rounded"
          />

          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {country.name.common} ({country.name.official})
            </h1>
            <p className="text-gray-600 mb-1"><strong>Region:</strong> {country.region}</p>
            <p className="text-gray-600 mb-1"><strong>Subregion:</strong> {country.subregion || 'N/A'}</p>
            <p className="text-gray-600 mb-1"><strong>Capital:</strong> {country.capital?.join(', ') || 'N/A'}</p>
            <p className="text-gray-600 mb-1"><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p className="text-gray-600 mb-1"><strong>Area:</strong> {country.area?.toLocaleString()} km²</p>
            <p className="text-gray-600 mb-1"><strong>Languages:</strong> {languages}</p>
            <p className="text-gray-600 mb-1"><strong>Currencies:</strong> {currencies}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
