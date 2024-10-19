import express from "express";
import pdf from "html-pdf";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const generateHTML = (user, templateId) => {
  const commonStyles = `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { width: 100%; padding: 2cm; }
    h1, h2, h3 { margin-bottom: 10px; }
    ul { list-style-type: none; padding-left: 0; }
    .section { margin-bottom: 20px; }
  `;

  const templates = {
    1: `
      <style>
        ${commonStyles}
        body { background-color: white; }
        .container { background-color: white; }
        h1 { color: #2c3e50; font-size: 36px; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
        h2 { color: #3498db; font-size: 24px; }
        .contact { background-color: #3498db; color: white; padding: 10px; margin-bottom: 20px; }
        .section { background-color: #ecf0f1; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
        .job-title { font-weight: bold; }
        .company { color: #3498db; }
        li { margin-bottom: 0.3125rem;list-style-type:none }
      </style>
      <div class="container">
        <h1>${user.name}</h1>
        <div class="contact">${user.email}</div>
        <div class="section">
          <h2>Education</h2>
          ${user.education
            .map(
              (edu) => `
            <div>
              <h3>${edu.degree}</h3>
              <p>${edu.institution}, ${edu.year}</p>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="section">
          <h2>Skills</h2>
          <ul>
            ${user.skills.map((skill) => `<li>${skill}</li>`).join("")}
          </ul>
        </div>
        <div class="section">
          <h2>Work Experience</h2>
          ${user.workExperience
            .map(
              (exp) => `
            <div>
              <h3 class="job-title">${exp.position}</h3>
              <p><span class="company">${exp.company}</span>, ${exp.duration}</p>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `,
    2: `
      <style>
        ${commonStyles}
        body { background-color: white; color: #333; }
        .container { border: 1px solid #ccc; }
        h1 { color: #8e44ad; font-size: 32px; text-align: center; }
        h2 { color: #8e44ad; font-size: 22px; border-bottom: 1px solid #8e44ad; }
        .contact { text-align: center; margin-bottom: 20px; }
        .section { margin-bottom: 25px; }
        .job-title { font-weight: bold; }
        .company { font-style: italic; }
        ul { columns: 2; }
        li { margin-bottom: 0.3125rem;list-style-type:none }
      </style>
      <div class="container">
        <h1>${user.name}</h1>
        <div class="contact">${user.email}</div>
        <div class="section">
          <h2>Education</h2>
          ${user.education
            .map(
              (edu) => `
            <div>
              <h3>${edu.degree}</h3>
              <p>${edu.institution}, ${edu.year}</p>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="section">
          <h2>Skills</h2>
          <ul>
            ${user.skills.map((skill) => `<li>${skill}</li>`).join("")}
          </ul>
        </div>
        <div class="section">
          <h2>Work Experience</h2>
          ${user.workExperience
            .map(
              (exp) => `
            <div>
              <h3 class="job-title">${exp.position}</h3>
              <p><span class="company">${exp.company}</span>, ${exp.duration}</p>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `,
    3: `
      <style>
        ${commonStyles}
        body { background-color: #34495e; color: #ecf0f1; }
        .container { background-color: #34495e; padding: 2cm; }
        h1 { color: #e74c3c; font-size: 40px; text-transform: uppercase; letter-spacing: 2px; }
        h2 { color: #e74c3c; font-size: 26px; text-transform: uppercase; }
        .contact { background-color: #e74c3c; color: white; padding: 10px; margin-bottom: 20px; text-align: center; }
        .section { border-left: 3px solid #e74c3c; padding-left: 20px; margin-bottom: 30px; }
        .job-title { font-weight: bold; color: #f39c12; }
        .company { color: #3498db; }
        ul { display: flex; flex-wrap: wrap; }
        li { background-color: #3498db; color: white; padding: 0.3125rem 0.625rem; margin: 0.3125rem; border-radius: 0.1875rem; list-style-type:none}
      </style>
      <div class="container">
        <h1>${user.name}</h1>
        <div class="contact">${user.email}</div>
        <div class="section">
          <h2>Education</h2>
          ${user.education
            .map(
              (edu) => `
            <div>
              <h3>${edu.degree}</h3>
              <p>${edu.institution}, ${edu.year}</p>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="section">
          <h2>Skills</h2>
          <ul>
            ${user.skills.map((skill) => `<li>${skill}</li>`).join("")}
          </ul>
        </div>
        <div class="section">
          <h2>Work Experience</h2>
          ${user.workExperience
            .map(
              (exp) => `
            <div>
              <h3 class="job-title">${exp.position}</h3>
              <p><span class="company">${exp.company}</span>, ${exp.duration}</p>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `,
    4: `
      <style>
        ${commonStyles}
        body { background-color: white; color: #333; }
        .container { background-color: white; }
        h1 { color: #2980b9; font-size: 36px; text-align: center; margin-bottom: 20px; }
        h2 { color: #2980b9; font-size: 24px; border-bottom: 2px solid #2980b9; padding-bottom: 5px; }
        .contact { text-align: center; margin-bottom: 30px; font-size: 18px; }
        .section { margin-bottom: 30px; }
        .job-title { font-weight: bold; color: #16a085; }
        .company { color: #c0392b; }
        ul { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        li { background-color: #ecf0f1; padding: 0.3125rem 0.625rem; border-radius: 0.1875rem; text-align: center; list-style-type:none }
      </style>
      <div class="container">
        <h1>${user.name}</h1>
        <div class="contact">${user.email}</div>
        <div class="section">
          <h2>Education</h2>
          ${user.education
            .map(
              (edu) => `
            <div>
              <h3>${edu.degree}</h3>
              <p>${edu.institution}, ${edu.year}</p>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="section">
          <h2>Skills</h2>
          <ul>
            ${user.skills.map((skill) => `<li>${skill}</li>`).join("")}
          </ul>
        </div>
        <div class="section">
          <h2>Work Experience</h2>
          ${user.workExperience
            .map(
              (exp) => `
            <div>
              <h3 class="job-title">${exp.position}</h3>
              <p><span class="company">${exp.company}</span>, ${exp.duration}</p>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `,
  };

  return templates[templateId] || templates[1]; 
};

router.post("/generate", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { templateId } = req.body;
    const html = generateHTML(user, templateId);

    pdf
      .create(html, {
        format: "A4",
        border: {
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
        },
      })
      .toBuffer((err, buffer) => {
        if (err) {
          return res.status(500).json({ message: "PDF generation failed" });
        }
        res.type("application/pdf");
        res.send(buffer);
      });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
