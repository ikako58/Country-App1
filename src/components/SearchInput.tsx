import React from 'react';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder || 'Search countries...'}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-gray-700 placeholder-gray-400"
      />
    </div>
  );
}
