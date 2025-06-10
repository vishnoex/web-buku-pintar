import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = "Cari inspirasi" }) => (
  <div className="flex items-center w-full max-w-xl mx-auto relative">
    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
    </span>
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-full bg-[#FAFAFF] border-none pl-12 pr-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-blue shadow-sm"
    />
  </div>
);

export default SearchBar; 