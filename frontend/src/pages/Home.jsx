import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to ResumeSmith</h1>
      <p className="text-xl text-center mb-8">Create professional resumes in minutes with our easy-to-use builder.</p>
      <div className="flex justify-center">
        <Link to="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;