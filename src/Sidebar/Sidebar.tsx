import React from "react";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  side?: "left" | "right";
  plannedCountries: string[];
  onRemoveCountry: (name: string) => void;
  onAddCountry: (name: string) => void;
};

export default function Sidebar({
  open,
  onClose,
  plannedCountries,
  onRemoveCountry,
  onAddCountry,
}: SidebarProps) {
  if (!open) return null;

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const countryName = event.dataTransfer.getData("country");
    if (countryName) {
      onAddCountry(countryName);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg p-4 z-30 overflow-y-auto transition-transform duration-300`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Planned Countries</h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 font-bold px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 transition"
        >
          ✕
        </button>
      </div>

      {plannedCountries.length === 0 ? (
        <p className="text-gray-500">Drag countries here 🌍</p>
      ) : (
        <ul>
          {plannedCountries.map((country) => (
            <li
              key={country}
              className="mb-2 flex justify-between items-center"
            >
              <span>{country}</span>
              <button
                onClick={() => onRemoveCountry(country)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
