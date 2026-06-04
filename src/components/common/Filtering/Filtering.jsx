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
        className="inline-flex items-center justify-between min-w-[150px] px-4 py-2 text-sm font-semibold text-zinc-200 bg-zinc-900 hover:bg-zinc-950 border border-zinc-800 hover:border-zinc-700/80 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-md focus:outline-none cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-zinc-400 text-xs sm:text-sm">
          {title}: <span className="text-[#8B5CF6] ml-1 font-bold">{selectedOption ? selectedOption.toUpperCase().replace("_", " ") : "ALL"}</span>
        </span>
        <i
          className={`ri-arrow-down-s-line ml-3 text-zinc-500 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-white" : ""
          }`}
        ></i>
      </button>

      {isOpen && (
        <div className="glass-dropdown absolute right-0 mt-2 min-w-[180px] rounded-xl overflow-hidden z-50 transform origin-top-right transition-all duration-200">
          <div className="p-1 flex flex-col gap-0.5" role="menu" aria-orientation="vertical">
            {options.map((option) => {
              const isSelected = selectedOption === option;
              return (
                <button
                  key={option}
                  className={`w-full text-left px-3.5 py-2 text-xs font-semibold rounded-lg flex items-center justify-between transition-all duration-150 cursor-pointer border-l-2 ${
                    isSelected
                      ? "bg-[#6556CD]/10 text-[#8B5CF6] border-[#6556CD]"
                      : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200 border-transparent"
                  }`}
                  role="menuitem"
                  onClick={() => handleOptionClick(option)}
                >
                  <span>{option.toUpperCase().replace("_", " ")}</span>
                  {isSelected && <i className="ri-check-line text-[#8B5CF6] text-sm font-bold"></i>}
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
