import { Company } from '@/types/company';
import { useState, useRef, useEffect } from 'react';

interface DropdownMenuProps {
  companies: Company[];
  selectedCompany?: Company;
  onSelect: (company: Company) => void;
}

export default function DropdownMenu({
  companies,
  selectedCompany,
  onSelect,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (company: Company) => {
    onSelect(company);
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-40" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer w-full bg-white border border-gray-medium rounded-md px-4 py-2 text-left flex justify-between items-center shadow-sm"
      >
        <span className="text-gray-dark/50">{selectedCompany?.name}</span>

        <span
          className={`text-gray-dark/50 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <ul className="absolute top-full left-0 right-0 bg-white border border-gray-medium rounded-md mt-1 shadow-lg z-10">
          {companies.map((company) => (
            <li key={company.id}>
              <button
                onClick={() => handleSelect(company)}
                className="w-full text-left px-4 py-2 hover:bg-blue-light/50 cursor-pointer"
              >
                {company.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
