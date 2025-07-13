import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    avatar: "",
  });

  const navigate = useNavigate();
  const user = useSelector((store) => store.user.userDetails);

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      navigate("/");
    }
  }, [navigate, user]);

  // signup function to create a user
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.email ||
      !formData.password ||
      !formData.userName ||
      !formData.avatar
    ) {
      toast.error("All fields are required");
    }
    try {
      const { userName, email, password, avatar } = formData;
      let { data } = await axios.post(
        "https://vidsphere-backend-1l9p.onrender.com/api/users/signUp",
        {
          userName,
          email,
          password,
          avatar,
        }
      );
      if (data) {
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex justify-center items-center p-6">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col bg-white rounded-lg p-8 shadow-lg w-full md:w-[450px]"
      >
        <div className="flex justify-center mb-8">
          <img
            src="/images/vdsphere.png"
            alt="VidSphere"
            className="w-16 h-16"
          />
        </div>
        <h2 className="text-3xl text-gray-800 font-semibold text-center mb-6">
          Sign up for VidSphere
        </h2>

        <label className="text-gray-700 font-semibold mb-2" htmlFor="userName">
          Username
        </label>
        <input
          required
          className="border border-gray-300 p-3 bg-[#fafafa] rounded-md mb-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={formData.userName}
          onChange={handleChange}
          name="userName"
          id="userName"
          type="text"
          placeholder="Enter username"
        />

        <label className="text-gray-700 font-semibold mb-2" htmlFor="email">
          Email
        </label>
        <input
          required
          className="border border-gray-300 p-3 bg-[#fafafa] rounded-md mb-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          id="email"
          type="email"
          value={formData.email}
          name="email"
          onChange={handleChange}
          placeholder="Enter email"
        />

        <label className="text-gray-700 font-semibold mb-2" htmlFor="password">
          Password
        </label>
        <input
          required
          className="border border-gray-300 p-3 bg-[#fafafa] rounded-md mb-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          id="password"
          type="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
          placeholder="Create a password"
        />

        <label className="text-gray-700 font-semibold mb-2" htmlFor="avatar">
          Avatar URL
        </label>
        <input
          required
          className="border border-gray-300 p-3 bg-[#fafafa] rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          id="avatar"
          type="text"
          value={formData.avatar}
          name="avatar"
          onChange={handleChange}
          placeholder="Paste avatar URL"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-semibold px-6 py-3 rounded-md hover:opacity-90"
        >
          Sign Up
        </button>
        <p className="text-gray-700 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-purple-600 transition duration-300 hover:opacity-90"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
