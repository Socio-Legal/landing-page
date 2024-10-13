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

const TextContentSection: FC<TextContentProps> = ({
  content,
  hideTopSpace = false,
}) => {
  const verticalPadding = hideTopSpace
    ? "pb-12 md:pb-24 lg:pb-32"
    : "py-12 md:py-24 lg:py-32";

  const renderContent = (content: (string | Subsection | TableSection)[]) => {
    return content.map((item, index) => {
      if (typeof item === "string") {
        return (
          <p key={index} className="mb-4">
            {item}
          </p>
        );
      } else if ("subtitle" in item) {
        return (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{item.subtitle}</h3>
            {item.content.map((subItem, subIndex) => (
              <p key={subIndex} className="mb-2">
                {subItem}
              </p>
            ))}
          </div>
        );
      } else if (item.type === "table") {
        return (
          <div key={index} className="overflow-x-auto mb-4">
            <div className="border border-gray-300 rounded-md overflow-hidden">
              <table
                key={index}
                className="w-full mb-6 border border-collapse rounded-md overflow-hidden"
                style={{
                  borderRadius: 8,
                }}
              >
                <thead>
                  <tr>
                    {item.headers.map((header, headerIndex) => (
                      <th
                        key={headerIndex}
                        className="border border-gray-300 p-2 bg-gray-200 dark:bg-gray-900"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {item.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border border-gray-300 px-6 py-2 whitespace-pre-wrap"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
    });
  };

  return (
    <div className={`container mx-auto px-4 ${verticalPadding}`}>
      {content.map((section, index) => (
        <section key={index} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
          {renderContent(section.content)}
        </section>
      ))}
    </div>
  );
};

export default TextContentSection;
