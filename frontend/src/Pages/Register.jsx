import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { handleError } from "../utils/errorHandling";
import { url } from "../utils/data";
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log("Register Data:", formData);
    try {
        const response=await axios.post(`${url}/users/register`,formData);
        console.log("response ",response)
        if(response){
            alert(response.data.message)
        }
        
    } catch (error) {
        console.log(error)
         handleError(error)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-20 blur-3xl"></div>
      <div className="relative bg-black bg-opacity-60 p-8 rounded-xl shadow-xl w-96 border border-yellow-500">
        <h2 className="text-center text-2xl font-bold text-yellow-500 mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-yellow-400">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-transparent border border-yellow-500 text-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter username"
              required
            />
          </div>
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
            Register
          </button>
        </form>
        <p className="text-yellow-400 text-center mt-4">
          Already have an account? <Link to="/" className="underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
