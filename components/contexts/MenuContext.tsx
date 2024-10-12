"use client";
import React, { createContext, FC, useContext, useState } from "react";

type MenuContextType = {
  activeMenu: string | null;
  openMenu: (menuName: string) => void;
  closeMenu: () => void;
};

type MenuProviderProps = {
  children: React.ReactNode;
};

const MenuContext = createContext<MenuContextType | null>(null);

export const MenuProvider: FC<MenuProviderProps> = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const openMenu = (menuName: string) => {
    setActiveMenu(menuName);
  };

  const closeMenu = () => {
    setActiveMenu(null);
  };

  return (
    <MenuContext.Provider value={{ activeMenu, openMenu, closeMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = (): MenuContextType => {
  const context = useContext(MenuContext);

  if (context === null) {
    throw new Error("useMenu must be used within a MenuProvider");
  }

  return context;
};
