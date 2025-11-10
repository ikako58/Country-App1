import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import RegionSelector from "../components/RegionSelector";
import BtnSidebar from "../Sidebar/BtnSidebar";

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
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    setLoading(true);
    const url = region
      ? `https://restcountries.com/v3.1/region/${region.toLowerCase()}?fields=name,flags,capital,region,population`
      : "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population";

    axios
      .get(url)
      .then((res) => {
        setCountries(res.data);
        setFilteredCountries(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load countries 😢");
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

  const toggleFavorite = (name: string) => {
    let updated: string[];
    if (favorites.includes(name)) {
      updated = favorites.filter((fav) => fav !== name);
    } else {
      updated = [...favorites, name];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600">Loading countries...</p>
    );
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 flex-col sm:flex-row gap-4">
          <h1 className="text-3xl font-bold text-blue-700">
            🌍 Countries of the World
          </h1>
          <Link
            to="/"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
        </div>

        <RegionSelector
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />

        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search countries..."
        />
        <BtnSidebar />
        <div className="flex justify-end">
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`cursor-pointer px-4 py-2 mb-3 rounded-lg font-medium transition ${
              showFavoritesOnly
                ? "bg-yellow-400 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {showFavoritesOnly ? "Hide Favorites ★" : "Show Favorites ⭐"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCountries
            .filter(
              (country) =>
                !showFavoritesOnly || favorites.includes(country.name.common)
            )
            .map((country) => (
              <Link
                key={country.name.common}
                to={`/country/${encodeURIComponent(country.name.common)}`}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 text-center relative"
              >
                <div className="absolute top-2 right-2">
                  <button
                    className="cursor-pointer text-2xl transition-all duration-200 hover:scale-150 p-1 rounded-full"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(country.name.common);
                    }}
                  >
                    {favorites.includes(country.name.common) ? "⭐" : "𖹭"}
                  </button>
                </div>

                <img
                  src={country.flags.png}
                  alt={`${country.name.common} flag`}
                  className="w-32 h-20 object-cover mx-auto rounded mb-4 border"
                />
                <h2 className="text-lg font-semibold text-gray-800">
                  {country.name.common}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Region: {country.region}
                </p>
                <p className="text-sm text-gray-500">
                  Capital: {country.capital ? country.capital[0] : "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  Population: {country.population.toLocaleString()}
                </p>
              </Link>
            ))}
        </div>

        {filteredCountries.filter(
          (country) =>
            !showFavoritesOnly || favorites.includes(country.name.common)
        ).length === 0 && (
          <p className="text-center text-gray-600 mt-10">No countries found.</p>
        )}
      </div>
    </div>
  );
}
