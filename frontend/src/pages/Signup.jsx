import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    education: [{ institution: "", degree: "", year: "" }],
    skills: [""],
    workExperience: [{ company: "", position: "", duration: "" }],
  });

  const handleChange = (e, index, field) => {
    const { name, value } = e.target;
    if (field) {
      const list = [...formData[field]];
      list[index][name] = value;
      setFormData({ ...formData, [field]: list });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddField = (field) => {
    if (field === "education") {
      setFormData({
        ...formData,
        education: [
          ...formData.education,
          { institution: "", degree: "", year: "" },
        ],
      });
    } else if (field === "skills") {
      setFormData({ ...formData, skills: [...formData.skills, ""] });
    } else if (field === "workExperience") {
      setFormData({
        ...formData,
        workExperience: [
          ...formData.workExperience,
          { company: "", position: "", duration: "" },
        ],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        formData
      );
      console.log(response.data);
      navigate("/templates");
    } catch (error) {
      console.error("Signup error:", error.response.data);
    }
  };

  return (
    <div className="container flex justify-center mx-auto px-4 py-8">
      <div className="bg-blue-100/50 w-2/3 p-5 pt-4 rounded-xl shadow-md">
        <h2 className="text-4xl font-bold text-center mb-12">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-semibold mt-4">Account Details</h3>
          <hr className="mt-2 mb-4" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-2 border rounded form-control"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded form-control"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 border rounded form-control"
            required
          />

          <h3 className="text-xl font-semibold mt-4">Education</h3>
          <hr className="mt-2 mb-4" />
          {formData.education.map((edu, index) => (
            <div key={index} className="space-y-2">
              <input
                type="text"
                name="institution"
                value={edu.institution}
                onChange={(e) => handleChange(e, index, "education")}
                placeholder="Institution"
                className="w-full p-2 border rounded form-control"
              />
              <input
                type="text"
                name="degree"
                value={edu.degree}
                onChange={(e) => handleChange(e, index, "education")}
                placeholder="Degree"
                className="w-full p-2 border rounded form-control"
              />
              <input
                type="text"
                name="year"
                value={edu.year}
                onChange={(e) => handleChange(e, index, "education")}
                placeholder="Year"
                className="w-full p-2 border rounded form-control"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddField("education")}
            className="text-blue-600"
          >
            + Add Education
          </button>

          <h3 className="text-xl font-semibold mt-4">Skills</h3>
          <hr className="mt-2 mb-4" />
          {formData.skills.map((skill, index) => (
            <input
              key={index}
              type="text"
              value={skill}
              onChange={(e) => {
                const newSkills = [...formData.skills];
                newSkills[index] = e.target.value;
                setFormData({ ...formData, skills: newSkills });
              }}
              placeholder="Skill"
              className="w-full p-2 border rounded form-control"
            />
          ))}
          <button
            type="button"
            onClick={() => handleAddField("skills")}
            className="text-blue-600"
          >
            + Add Skill
          </button>

          <h3 className="text-xl font-semibold mt-4">Work Experience</h3>
          <hr className="mt-2 mb-4" />
          {formData.workExperience.map((exp, index) => (
            <div key={index} className="space-y-2">
              <input
                type="text"
                name="company"
                value={exp.company}
                onChange={(e) => handleChange(e, index, "workExperience")}
                placeholder="Company"
                className="w-full p-2 border rounded form-control"
              />
              <input
                type="text"
                name="position"
                value={exp.position}
                onChange={(e) => handleChange(e, index, "workExperience")}
                placeholder="Position"
                className="w-full p-2 border rounded form-control"
              />
              <input
                type="text"
                name="duration"
                value={exp.duration}
                onChange={(e) => handleChange(e, index, "workExperience")}
                placeholder="Duration"
                className="w-full p-2 border rounded form-control"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddField("workExperience")}
            className="text-blue-600"
          >
            + Add Work Experience
          </button>

          <div className="pt-8">
            <button type="submit" className="btn btn-secondary">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
