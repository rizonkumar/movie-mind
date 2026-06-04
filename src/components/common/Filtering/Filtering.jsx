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
        className="inline-flex items-center justify-between min-w-[150px] px-5 py-2.5 text-sm font-semibold text-zinc-200 bg-zinc-800/60 hover:bg-zinc-800 hover:text-white border border-white/10 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-md shadow-black/10 focus:outline-none cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {title}: <span className="text-[#6556CD] ml-1 font-bold">{selectedOption ? selectedOption.toUpperCase().replace("_", " ") : "ALL"}</span>
        </span>
        <i
          className={`ri-arrow-down-s-line ml-3 text-zinc-400 transition-transform duration-250 ${
            isOpen ? "rotate-180 text-white" : ""
          }`}
        ></i>
      </button>

      {isOpen && (
        <div className="glass-dropdown absolute right-0 mt-2 min-w-[180px] rounded-2xl overflow-hidden z-50 transform origin-top-right transition-all duration-200">
          <div className="p-1.5 flex flex-col gap-1" role="menu" aria-orientation="vertical">
            {options.map((option) => {
              const isSelected = selectedOption === option;
              return (
                <button
                  key={option}
                  className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl flex items-center justify-between transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "bg-[#6556CD] text-white shadow-md shadow-[#6556CD]/25"
                      : "text-zinc-300 hover:bg-white/5 hover:text-white"
                  }`}
                  role="menuitem"
                  onClick={() => handleOptionClick(option)}
                >
                  <span>{option.toUpperCase().replace("_", " ")}</span>
                  {isSelected && <i className="ri-checkbox-circle-fill text-white text-base"></i>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filtering;

