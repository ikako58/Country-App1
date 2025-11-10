import { useState, useEffect } from "react";
import axios from "axios";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  side?: "left" | "right" | string;
  plannedCountries: string[];
  onRemoveCountry: (name: string) => void;
  onAddCountry?: (name: string) => void;
};

function Sidebar({
  open,
  onClose,
  side = "left",
  plannedCountries,
  onRemoveCountry,
}: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 ${
          side === "left" ? "left-0" : "right-0"
        } h-full w-80 bg-white shadow-lg transform transition-transform z-30 ${
          open
            ? "translate-x-0"
            : side === "left"
            ? "-translate-x-full"
            : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Planned Countries</h2>
            <button
              onClick={onClose}
              className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              Close
            </button>
          </div>

          <ul className="space-y-2">
            {plannedCountries.length === 0 && (
              <li className="text-sm text-gray-500">No planned countries</li>
            )}
            {plannedCountries.map((c) => (
              <li key={c} className="flex justify-between items-center">
                <span>{c}</span>
                <button
                  onClick={() => onRemoveCountry(c)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default function BtnSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [plannedCountries, setPlannedCountries] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("/planned-countries")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.countries || [];
        setPlannedCountries(data);
      })
      .catch(console.error);
  }, []);
  function handleRemove(name: string): void {
    setPlannedCountries((prev) => prev.filter((c) => c !== name));

    axios
      .delete(`/planned-countries/${encodeURIComponent(name)}`)
      .catch(console.error);
  }

  return (
    <div className="flex justify-end items-center p-4  relative z-20">
      <button
        onClick={() => setIsSidebarOpen(true)}
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
      />
    </div>
  );
}
