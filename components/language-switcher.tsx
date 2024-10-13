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
      className="relative rounded-full"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center rounded-full cursor-pointer bg-transparent dark:bg-dark-bg w-10 h-10 text-primary dark:text-primary border-2 border-transparent hover:border-brand dark:hover:border-brand transition-colors duration-300"
      >
        <Icon icon="tabler:language" width="24" height="24" />
      </button>

      <div
        className={`fixed left-0 right-0 top-16 mt-2.5 flex px-6 py-4 h-auto min-w-[180px] w-full flex-col rounded-md border bg-popover text-popover-foreground shadow-lg transition-all duration-300 sm:absolute sm:left-auto sm:top-full sm:w-45 sm:rounded-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="flex flex-col">
          {languages.map((lang) => (
            <li
              key={lang.code}
              className="group inline-flex h-10 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary/10 data-[state=open]:bg-primary/10"
            >
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
