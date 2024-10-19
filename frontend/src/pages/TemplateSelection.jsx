import React from "react";
import { useNavigate } from "react-router-dom";

const templates = [
  {
    id: 1,
    name: "Modern Blue",
    preview: "/modern_template.png",
    description: "A clean and professional design with a blue color scheme.",
  },
  {
    id: 2,
    name: "Classic Purple",
    preview: "/purple_template.png",
    description:
      "A traditional layout with a touch of elegance using purple accents.",
  },
  {
    id: 3,
    name: "Bold Contrast",
    preview: "/contrast_template.png",
    description:
      "A striking design with high contrast colors for a memorable impression.",
  },
  {
    id: 4,
    name: "Professional Grid",
    preview: "/professional_template.png",
    description: "A structured layout using a grid system for a polished look.",
  },
];

const TemplateSelection = () => {
  const navigate = useNavigate();

  const handleTemplateSelect = (templateId) => {
    navigate("/preview", { state: { templateId } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Choose Your Resume Template
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <img
              src={template.preview}
              alt={template.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
              <p className="text-gray-600 mb-4">{template.description}</p>
              <button
                onClick={() => handleTemplateSelect(template.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 w-full"
              >
                Select Template
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelection;
