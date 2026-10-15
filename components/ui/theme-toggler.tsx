import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTheme } from "next-themes";

/**
 * Cambia entre claro y oscuro. Parte del tema que se está viendo
 * (resolvedTheme), no del guardado: con el tema del sistema, `theme` vale
 * "system" y el primer clic no haría nada visible.
 */
const ThemeToggler: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();
  // El tema solo se conoce en el cliente: hasta montar se pinta un hueco del
  // mismo tamaño para no provocar un desajuste de hidratación.
  const [montado, setMontado] = useState(false);
  useEffect(() => setMontado(true), []);

  const oscuro = montado && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={oscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      onClick={() => setTheme(oscuro ? "light" : "dark")}
      className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {montado && (
        <Icon
          icon={oscuro ? "line-md:sunny-filled-loop" : "line-md:moon-filled-loop"}
          width="18"
          height="18"
        />
      )}
    </button>
  );
};

export default ThemeToggler;
