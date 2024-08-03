import React, { useState } from "react";

const Filtering = ({ title, options, onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("all");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onCategoryChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-700 shadow-sm px-4 py-2 bg-zinc-800 text-sm font-medium text-gray-300 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {title}: {selectedOption.toUpperCase()}
          <i class="ri-arrow-down-circle-line -mr-1 ml-2 h-5 w-5"></i>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-zinc-800 ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <a
                key={option}
                href="#"
                className={`${
                  selectedOption === option
                    ? "bg-zinc-700 text-white"
                    : "text-gray-300"
                } block px-4 py-2 text-sm hover:bg-zinc-700 hover:text-white`}
                role="menuitem"
                onClick={() => handleOptionClick(option)}
              >
                {option.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filtering;
