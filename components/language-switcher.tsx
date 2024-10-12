"use client";
import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { useMenu } from "@/components/contexts/MenuContext";

const languages = [
  {
    code: "es",
    icon: "emojione-v1:flag-for-spain",
    label: "language.spanish",
  },
  {
    code: "en",
    icon: "emojione-v1:flag-for-united-kingdom",
    label: "language.english",
  },
];

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation("common");
  const { openMenu, closeMenu } = useMenu();
  const dropdownRef = useRef(null);

  // console.log("🚀 cclog  ~ LanguageSwitcher ~ i18n:", i18n);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsOpen(!isOpen);
    if (!isOpen) {
      openMenu("languageMenu");
    } else {
      closeMenu();
    }
  };

  const handleMouseEnter = () => {
    if (window.innerWidth > 640) {
      setIsOpen(true);
      openMenu("languageMenu");
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 640) {
      setIsOpen(false);
      closeMenu();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeMenu]);

  const changeLanguage = (lang: string) => {
    console.log("🚀 cclog  ~ changeLanguage ~ lang:", lang);
    i18n.changeLanguage(lang);
    setIsOpen(false);
    closeMenu();
  };

  console.log("🚀 cclog  ~ LanguageSwitcher ~ t, i18n:", { t, i18n });

  return (
    <div
      className="relative rounded-full border-2 border-transparent transition-colors duration-300 hover:border-primary dark:hover:border-primary"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={toggleDropdown}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border-stroke transition-colors duration-300 hover:text-primary dark:border-strokedark dark:text-white dark:hover:text-primary"
      >
        <Icon icon="tabler:language" width="24" height="24" />
      </button>

      <div
        className={`fixed left-0 right-0 top-16 mt-2.5 flex h-auto w-full flex-col rounded-2xl border border-stroke bg-white pb-2 shadow-default transition-all duration-300 dark:border-strokedark dark:bg-dark sm:absolute sm:left-auto sm:top-full sm:w-45 sm:rounded-2xl ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="px-4.5 py-3">
          <h5 className="text-sm font-medium text-bodydark2">
            {t("language.selectLanguage")}
          </h5>
        </div>

        <ul className="flex flex-col">
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                className="flex w-full cursor-pointer items-center gap-2.5 px-4.5 py-2 hover:bg-gray-2 dark:hover:bg-meta-4"
                onClick={() => changeLanguage(lang.code)}
              >
                <Icon icon={lang.icon} width="20" height="20" />
                <span className="text-sm font-medium">{t(lang.label)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
