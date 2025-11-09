import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 to-blue-100 text-center">
      <h1 className="text-5xl font-extrabold text-blue-700 mb-4">
        Welcome to the Country App
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        This is the landing page.
      </p>
      <Link
        to="/countries"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300"
      >
        Go to Countries
      </Link>
    </div>
  );
}
