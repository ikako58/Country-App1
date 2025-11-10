interface SidebarProps {
  open: boolean;
  onClose: () => void;
  side?: "left" | "right";
  plannedCountries: string[];
  onRemoveCountry: (name: string) => void;
  onAddCountry: string;
}

export default function Sidebar({
  open,
  onClose,
  side = "left",
  plannedCountries,
  onRemoveCountry,
}: SidebarProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 flex">
      <div
        className="fixed inset-0 bg-red-500 bg-opacity-30"
        onClick={onClose}
      ></div>
      <div
        className={`fixed top-0 ${side}-0 h-full w-64 bg-white shadow-lg p-4 z-40 overflow-y-auto transition-transform duration-300`}
      >
        <h2 className="text-lg font-bold mb-4">Planned Countries</h2>
        {plannedCountries.length === 0 ? (
          <p className="text-gray-500">No countries planned yet.</p>
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
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
