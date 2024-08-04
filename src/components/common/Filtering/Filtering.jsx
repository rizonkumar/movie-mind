import React, { useState, useRef, useEffect } from "react";

const Filtering = ({ title, options, onCategoryChange, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOptionClick = (option) => {
    onCategoryChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}: {selectedOption ? selectedOption.toUpperCase() : "ALL"}
        <i
          className={`ri-arrow-down-s-line ml-2 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        ></i>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {options.map((option) => (
              <button
                key={option}
                className={`${
                  selectedOption === option
                    ? "bg-gray-700 text-white"
                    : "text-gray-300"
                } block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 hover:text-white`}
                role="menuitem"
                onClick={() => handleOptionClick(option)}
              >
                {option.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filtering;
