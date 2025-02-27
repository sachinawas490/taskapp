import { useState } from "react";
import { Link } from "react-router-dom";
import { url } from "../utils/data";
import { handleError } from "../utils/errorHandling";
import axios from "axios";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    try {
        const response=await axios.post(`${url}/users/login`,formData)
        console.log(response)
    } catch (error) {
        handleError(error)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-20 blur-3xl"></div>
      <div className="relative bg-black bg-opacity-60 p-8 rounded-xl shadow-xl w-96 border border-yellow-500">
        <h2 className="text-center text-2xl font-bold text-yellow-500 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-yellow-400">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-transparent border border-yellow-500 text-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-yellow-400">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-transparent border border-yellow-500 text-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black font-bold py-2 rounded-md hover:bg-yellow-600 transition"
          >
            Login
          </button>
        </form>
        <p className="text-yellow-400 text-center mt-4">
          Don't have an account? <Link to="/register" className="underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
