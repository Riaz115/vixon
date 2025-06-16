import { useEffect, useState } from "react";

const languages = [
  { label: 'Select Language', value: '' },
  { label: 'English', value: 'en' },
  { label: 'Arabic', value: 'ar' },
  { label: 'Pashto', value: 'ps' },
  { label: 'Urdu', value: 'ur' }
];

const includedLanguages = languages.map(lang => lang.value).join(",");

function googleTranslateElementInit() {
  new window.google.translate.TranslateElement(
    {
      pageLanguage: "ur",
      includedLanguages
    },
    "google_translate_element"
  );
}

export function GoogleTranslate({ prefLangCookie }) {
  const [langCookie, setLangCookie] = useState(decodeURIComponent(prefLangCookie || "ur"));

  useEffect(() => {
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const onChange = (value) => {
    const lang = "/" + value;
    if (value !== "") {
      setLangCookie(lang);
      const element = document.querySelector(".goog-te-combo");
      if (element) {
        element.value = value;
        element.dispatchEvent(new Event("change"));
        document.body.style.textAlign = value === 'en' ? 'left' : 'right';
      }
    }
  };

  return (
    <div>
      <div id="google_translate_element" style={{ visibility: "hidden", width: "1px", height: "1px" }}></div>
      <LanguageSelector onChange={onChange} value={langCookie} />
    </div>
  );
}

function LanguageSelector({ onChange, value }) {
  const langCookie = value.split("/")[2];

  return (
    <div className="language-selector form position-fixed overflow-hidden" style={{ top: "100px" }}>
      <label htmlFor="langPicker" className="visually-hidden">Select Language:</label>
      <select
        id="langPicker"
        onChange={(e) => onChange(e.target.value)}
        value={langCookie}
        className="form-select form-control px-2 py-2 rounded text-blue-700 font-bold"
        style={{ width: '120px' }}
      >
        {languages.map((it) => (
          <option key={it.value} value={it.value} className="font-bold rounded text-blue-700 notranslate">
            {it.label}
          </option>
        ))}
      </select>
    </div>
  );
}
