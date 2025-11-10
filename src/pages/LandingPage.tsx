import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-linear-to-b from-blue-50 to-blue-200 text-center px-6">
      <h1 className="text-5xl font-extrabold text-blue-700 mb-10">
        Welcome to the Country App
      </h1>

      <p className="text-xl font-semibold text-gray-800 mb-4 border-b-2  pb-1">
        Instructions
      </p>

      <ul className="list-decimal ml-6 flex-col justify-items-start pb-8">
        <li>
          Click <span className="font-semibold">"Explore Places"</span> to see
          the full list of countries.
        </li>
        <li>Search or filter countries by region.</li>
        <li>
          Mark your favorites with a star{" "}
          <span className="text-yellow-400">⭐</span>.
        </li>
        <li>
          Drag & drop countries into your personal trip sidebar to plan your
          journey.
        </li>
      </ul>
      <Link
        to="/countries"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300"
      >
        Explore places
      </Link>
    </div>
  );
}
