import { useEffect, useRef, useState } from "react";
import { GrLanguage } from "react-icons/gr";

const languages = [
  { label: "Select Language", value: "" },
  { label: "English", value: "en" },
  { label: "Slovak", value: "sk" },
];

export function GoogleTranslate({ onChange }) {
  return (
    <div>
      <LanguageSelector onChange={onChange} />
    </div>
  );
}

function LanguageSelector({ onChange }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener on cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleDropdownLan = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className="language-selector form overflow-hidden"
      style={{ top: "100px" }}
    >
      <GrLanguage
        className="text-2xl cursor-pointer"
        onClick={toggleDropdownLan}
      />
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-4 bg-white text-black w-64 shadow-lg"
        >
          {languages.map(
            (lang) =>
              lang.value && (
                <div
                  key={lang.value}
                  className={`p-4 border-b border-gray-700 cursor-pointer notranslate ${
                    localStorage.getItem("language") === lang.value &&
                    "bg-[#2e2e2e] text-white "
                  }`}
                  onClick={() => {
                    onChange(lang.value);

                    toggleDropdownLan();
                  }}
                >
                  {lang.label}
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}
