import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTheme } from "next-themes";

const ThemeToggler: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      aria-label="theme toggler"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center justify-center rounded-full cursor-pointer bg-transparent dark:bg-dark-bg w-10 h-10 text-primary dark:text-primary border-2 border-transparent hover:border-brand dark:hover:border-brand transition-colors duration-300"
    >
      {theme === "dark" ? (
        <Icon
          className="hover:border-brand hover:text-brand dark:hover:text-brand dark:hover:border-brand text-primary dark:text-primary"
          icon="line-md:sunny-filled-loop"
          width="24"
          height="24"
        />
      ) : (
        <Icon
          className="hover:border-brand hover:text-brand dark:hover:text-brand dark:hover:border-brand text-primary dark:text-primary"
          icon="line-md:moon-filled-loop"
          width="24"
          height="24"
        />
      )}
    </button>
  );
};

export default ThemeToggler;
