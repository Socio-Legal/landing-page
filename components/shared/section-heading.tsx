import { FC, ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  aside?: string;
  /** Entradilla bajo el titular, alineada a la izquierda. */
  lede?: string;
  /**
   * "ledger" (por defecto): filete doble al estilo de los totales de un
   * balance. "plain": sin filete; el aire separa la cabecera del contenido.
   */
  variant?: "ledger" | "plain";
};

/**
 * Cabecera de sección editorial, alineada a la izquierda. Sustituye a los
 * headers centrados.
 */
const SectionHeading: FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  aside,
  lede,
  variant = "ledger",
}) => {
  if (variant === "plain") {
    return (
      <div className="mb-12 max-w-[46rem] md:mb-16">
        {eyebrow && (
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {eyebrow}
          </p>
        )}
        <h2 className="font-serif text-3xl font-normal leading-[1.15] text-balance text-foreground sm:text-[2.5rem]">
          {title}
        </h2>
        {lede && (
          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-muted-foreground sm:text-[1.0625rem]">
            {lede}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="relative mb-10 flex flex-col gap-3 border-b border-border pb-4 after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-border md:flex-row md:items-end md:justify-between md:gap-8">
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {eyebrow}
          </p>
        )}
        <h2 className="max-w-[44ch] font-serif text-2xl font-normal tracking-tight text-balance text-foreground sm:text-3xl">
          {title}
        </h2>
        {lede && (
          <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
            {lede}
          </p>
        )}
      </div>
      {aside && (
        <p className="text-xs leading-relaxed text-muted-foreground md:max-w-[36ch] md:pb-1 md:text-right">
          {aside}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
