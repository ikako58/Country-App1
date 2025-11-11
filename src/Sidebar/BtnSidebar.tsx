// BtnSidebar.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function BtnSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [plannedCountries, setPlannedCountries] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios
      .get("./Countries")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.countries || [];
        setPlannedCountries(data);
      })
      .catch(console.error);
  }, []);

  const handlePlanClick = () => {
    if (location.pathname !== "/countries") {
      navigate("/countries", { state: { openSidebar: true } });
    } else {
      setIsSidebarOpen(true);
    }
  };

  const handleRemove = (name: string) => {
    setPlannedCountries((prev) => prev.filter((c) => c !== name));
    axios
      .delete(`./countries/${encodeURIComponent(name)}`)
      .catch(console.error);
  };

  return (
    <div className="flex justify-end items-center p-4 relative z-20">
      <button
        onClick={handlePlanClick}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
      >
        Plan a Trip
      </button>

      <Sidebar
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        side="left"
        plannedCountries={plannedCountries}
        onRemoveCountry={handleRemove}
        onAddCountry={(name) =>
          setPlannedCountries((prev) =>
            prev.includes(name) ? prev : [...prev, name]
          )
        }
      />
    </div>
  );
}
