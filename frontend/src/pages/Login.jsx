import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setToken, setUserState } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.userDetails);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      navigate("/");
    }
  }, [navigate, user]);

  // login function
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("all fields are required");
    }
    try {
      const { email, password } = formData;
      let { data } = await axios.post(
        "https://youtube-clone-backend-2jgd.onrender.com/api/users/login",
        {
          email,
          password,
        }
      );
      if (data) {
        toast.success(data.message);
        dispatch(setUserState(data.user));
        dispatch(setToken(data.jwtToken));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // onchange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-[#f8f8f8] min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleFormSubmit}
        className="form flex flex-col w-96 mx-auto bg-white p-8 rounded-md shadow-lg"
      >
        <div className="flex justify-center mb-8">
          <img
            src="/images/vdsphere.png"
            alt="VidSphere"
            className="w-32"
          />
        </div>
        <h2 className="text-2xl font-semibold text-center text-black mb-6">
          Sign in to VidSphere
        </h2>

        <label className="text-black font-semibold mb-2" htmlFor="email">
          Email or Phone
        </label>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          id="email"
          type="email"
          required
          value={formData.email}
          name="email"
          onChange={handleChange}
        />

        <label className="text-black font-semibold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6"
          id="password"
          type="password"
          value={formData.password}
          required
          name="password"
          autoComplete="true"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-semibold px-6 py-3 rounded-md hover:opacity-90"
        >
          Sign In
        </button>

        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/signUp" className="font-semibold text-purple-600">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
