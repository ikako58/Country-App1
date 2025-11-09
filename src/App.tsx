import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Countries from "./pages/Countries";
import CountryDetails from "./pages/CountryDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/country/:name" element={<CountryDetails />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
