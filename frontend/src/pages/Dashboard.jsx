import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>
      <div className="bg-white shadow-md rounded p-6">
        <h3 className="text-xl font-semibold mb-4">Your Information</h3>
        <div className="space-y-2">
          <p><strong>Email:</strong> {user.email}</p>
          <h4 className="font-semibold mt-4">Education:</h4>
          <ul className="list-disc pl-5">
            {user.education.map((edu, index) => (
              <li key={index}>{edu.degree} from {edu.institution}, {edu.year}</li>
            ))}
          </ul>
          <h4 className="font-semibold mt-4">Skills:</h4>
          <ul className="list-disc pl-5">
            {user.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          <h4 className="font-semibold mt-4">Work Experience:</h4>
          <ul className="list-disc pl-5">
            {user.workExperience.map((exp, index) => (
              <li key={index}>{exp.position} at {exp.company}, {exp.duration}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8">
        <Link to="/templates" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create New Resume
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;