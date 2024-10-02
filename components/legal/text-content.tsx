import { FC } from "react";

interface Section {
  title: string;
  content: (string | Subsection)[];
}

interface Subsection {
  subtitle: string;
  content: string[];
}

interface TextContentProps {
  content: Section[];
  hideTopSpace?: boolean;
}

const TextContentSection: FC<TextContentProps> = ({
  content,
  hideTopSpace = false,
}) => {
  const verticalPadding = hideTopSpace
    ? "pb-12 md:pb-24 lg:pb-32"
    : "py-12 md:py-24 lg:py-32";

  const renderContent = (content: (string | Subsection)[]) => {
    return content.map((item, index) => {
      if (typeof item === "string") {
        return (
          <p key={index} className="mb-4">
            {item}
          </p>
        );
      } else {
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
