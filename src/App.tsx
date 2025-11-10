import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Countries from "./pages/Countries";
import CountryDetails from "./pages/CountryDetails";
import Layout from "./Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/country/:name" element={<CountryDetails />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
