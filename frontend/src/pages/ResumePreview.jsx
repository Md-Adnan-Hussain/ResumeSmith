import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Download, ChevronLeft } from "lucide-react";

const templates = {
  1: {
    name: "Modern Blue",
    styles: `
      .resume-preview { background-color: #f0f0f0; font-family: Arial, sans-serif; }
      .container { background-color: white; box-shadow: 0 0 10px rgba(0,0,0,0.1); padding: 2rem; }
      h1 { color: #2c3e50; font-size: 2.25rem; border-bottom: 2px solid #3498db; padding-bottom: 0.5rem; }
      h2 { color: #3498db; font-size: 1.5rem; margin-top: 1.5rem; }
      .contact { background-color: #3498db; color: white; padding: 0.5rem; margin-bottom: 1rem; }
      .section { background-color: #ecf0f1; padding: 1rem; margin-bottom: 1rem; border-radius: 0.25rem; }
      .job-title { font-weight: bold; }
      .company { color: #3498db; }
      li { margin-bottom: 0.3125rem;list-style-type:none }
    `,
  },
  2: {
    name: "Classic Purple",
    styles: `
      .resume-preview { background-color: #ffffff; color: #333; font-family: Georgia, serif; }
      .container { border: 1px solid #ccc; padding: 2rem; }
      h1 { color: #8e44ad; font-size: 2rem; text-align: center; }
      h2 { color: #8e44ad; font-size: 1.375rem; border-bottom: 1px solid #8e44ad; padding-bottom: 0.25rem; }
      .contact { text-align: center; margin-bottom: 1.25rem; }
      .section { margin-bottom: 1.5rem; }
      .job-title { font-weight: bold; }
      .company { font-style: italic; }
      ul { columns: 2; }
      li { margin-bottom: 0.3125rem;list-style-type:none }
    `,
  },
  3: {
    name: "Bold Contrast",
    styles: `
      .resume-preview { background-color: #2c3e50; color: #ecf0f1; font-family: 'Helvetica Neue', sans-serif; }
      .container { background-color: #34495e; padding: 2rem; box-shadow: 0 0 20px rgba(0,0,0,0.3); }
      h1 { color: #e74c3c; font-size: 2.5rem; text-transform: uppercase; letter-spacing: 0.125rem; }
      h2 { color: #e74c3c; font-size: 1.625rem; text-transform: uppercase; }
      .contact { background-color: #e74c3c; color: white; padding: 0.625rem; margin-bottom: 1.25rem; text-align: center; }
      .section { border-left: 3px solid #e74c3c; padding-left: 1.25rem; margin-bottom: 1.875rem; }
      .job-title { font-weight: bold; color: #f39c12; }
      .company { color: #3498db; }
      ul { display: flex; flex-wrap: wrap; }
      li { background-color: #3498db; color: white; padding: 0.3125rem 0.625rem; margin: 0.3125rem; border-radius: 0.1875rem; list-style-type:none}
    `,
  },
  4: {
    name: "Professional Grid",
    styles: `
      .resume-preview { background-color: #f9f9f9; color: #333; font-family: 'Roboto', sans-serif; }
      .container { background-color: white; box-shadow: 0 0 15px rgba(0,0,0,0.1); padding: 2rem; }
      h1 { color: #2980b9; font-size: 2.25rem; text-align: center; margin-bottom: 1.25rem; }
      h2 { color: #2980b9; font-size: 1.5rem; border-bottom: 2px solid #2980b9; padding-bottom: 0.3125rem; }
      .contact { text-align: center; margin-bottom: 1.875rem; font-size: 1.125rem; }
      .section { margin-bottom: 1.875rem; }
      .job-title { font-weight: bold; color: #16a085; }
      .company { color: #c0392b; }
      ul { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.625rem; }
      li { background-color: #ecf0f1; padding: 0.3125rem 0.625rem; border-radius: 0.1875rem; text-align: center; list-style-type:none }
    `,
  },
};

const ResumePreview = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { templateId } = location.state || {};
  const template = templates[templateId] || templates[1];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/resume/generate",
        { templateId },
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading resume:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="py-12">
      <div className="container bg-white mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">
          Resume Preview - {template.name}
        </h2>
        <style>{template.styles}</style>
        <div className="resume-preview mb-6">
          <div className="container">
            <h1>{user.name}</h1>
            <div className="contact">{user.email}</div>

            <div className="section">
              <h2>Education</h2>
              {user.education.map((edu, index) => (
                <div key={index} className="mb-2">
                  <p className="font-semibold">{edu.degree}</p>
                  <p>
                    {edu.institution}, {edu.year}
                  </p>
                </div>
              ))}
            </div>

            <div className="section">
              <h2>Skills</h2>
              <ul className="list-disc pl-5">
                {user.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="section">
              <h2>Work Experience</h2>
              {user.workExperience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <p className="job-title">{exp.position}</p>
                  <p>
                    <span className="company">{exp.company}</span>,{" "}
                    {exp.duration}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => navigate("/templates")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center"
          >
            <ChevronLeft className="mr-2" size={20} />
            Change Template
          </button>
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
          >
            <Download className="mr-2" size={20} />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
