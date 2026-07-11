import { FC, ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  aside?: string;
};

/**
 * Cabecera de sección editorial: alineada a la izquierda, con filete doble
 * al estilo de los totales de un balance. Sustituye a los headers centrados.
 */
const SectionHeading: FC<SectionHeadingProps> = ({ eyebrow, title, aside }) => (
  <div className="relative mb-10 flex flex-col gap-3 border-b border-border pb-4 after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-border md:flex-row md:items-end md:justify-between md:gap-8">
    <div>
      {eyebrow && (
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {eyebrow}
        </p>
      )}
      <h2 className="max-w-[28ch] font-serif text-2xl font-normal tracking-tight text-balance text-foreground sm:text-3xl">
        {title}
      </h2>
    </div>
    {aside && (
      <p className="text-xs leading-relaxed text-muted-foreground md:max-w-[36ch] md:pb-1 md:text-right">
        {aside}
      </p>
    )}
  </div>
);

export default SectionHeading;
