import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.response.data);
    }
  };

  return (
    <div className="container flex justify-center mx-auto px-4 py-8">
      <div className="bg-blue-100/50 p-5 pt-4 rounded-xl shadow-md">
        <h2 className="text-3xl uppercase font-bold mb-4 text-center">Login</h2>
        <hr className="border-black mt-3 mb-6" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="form-control w-80"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="form-control w-80"
              required
            />
          </div>
          <button type="submit" className="btn btn-secondary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
