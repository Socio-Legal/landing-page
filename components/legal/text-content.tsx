import React, { FC } from "react";

interface TableSection {
  type: "table";
  headers: string[];
  rows: string[][];
}

interface Subsection {
  subtitle: string;
  content: string[];
}

export interface TextSectionProps {
  title: string;
  content: (string | Subsection | TableSection)[];
}

export interface TextContentProps {
  content: TextSectionProps[];
  hideTopSpace?: boolean;
}

/**
 * Cuerpo de documento legal: columna de lectura estrecha, titulares serif
 * y tablas con filetes finos. Cero decoración.
 */
const TextContentSection: FC<TextContentProps> = ({
  content,
  hideTopSpace = false,
}) => {
  const verticalPadding = hideTopSpace ? "pb-16 md:pb-20" : "py-16 md:py-20";

  const renderContent = (items: (string | Subsection | TableSection)[]) =>
    items.map((item, index) => {
      if (typeof item === "string") {
        return (
          <p
            key={index}
            className="mb-4 text-sm leading-relaxed text-muted-foreground"
          >
            {item}
          </p>
        );
      } else if ("subtitle" in item) {
        return (
          <div key={index} className="mb-6">
            <h3 className="mb-2 text-base font-semibold text-foreground">
              {item.subtitle}
            </h3>
            {item.content.map((subItem, subIndex) => (
              <p
                key={subIndex}
                className="mb-2 text-sm leading-relaxed text-muted-foreground"
              >
                {subItem}
              </p>
            ))}
          </div>
        );
      } else if (item.type === "table") {
        return (
          <div key={index} className="mb-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-foreground/40">
                  {item.headers.map((header, headerIndex) => (
                    <th
                      key={headerIndex}
                      className="p-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {item.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-border">
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="whitespace-pre-wrap p-2.5 align-top text-muted-foreground"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    });

  return (
    <div className={`container mx-auto max-w-3xl px-4 ${verticalPadding}`}>
      {content.map((section, index) => (
        <section key={index} className="mb-12">
          <h2 className="mb-4 font-serif text-2xl font-normal text-foreground">
            {section.title}
          </h2>
          {renderContent(section.content)}
        </section>
      ))}
    </div>
  );
};

export default TextContentSection;
