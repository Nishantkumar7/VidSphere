import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { setUserState } from "../utils/userSlice";

const CreateChannel = () => {
  const dispatch = useDispatch();
  const userChannel = useSelector((store) => store.userChannel.userChannelDetails);
  const user = useSelector((store) => store.user.userDetails);
  const jwtToken = useSelector((store) => store.user.token);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    channelLogo: "",
    channelName: "",
    description: "",
    channelBanner: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const channelData = { ...formData, owner: user?._id };
    try {
      const result = await axios.post(
        "https://youtube-clone-backend-2jgd.onrender.com/api/channel/createChannel",
        channelData,
        {
          headers: {
            Authorization: `JWT ${jwtToken}`,
          },
        }
      );
      if (result) {
        toast.success("Channel Created!");
        fetchCurrentUser();
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get(`https://youtube-clone-backend-2jgd.onrender.com/api/users/${user?._id}`);
      if (data) {
        dispatch(setUserState(data?.user));
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (userChannel && Object.keys(userChannel).length >= 1) {
      navigate("/");
    }
  }, [userChannel, navigate]);

  return (
    <div className="bg-white min-h-full py-16 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col bg-white border rounded-lg shadow-lg p-8 max-w-xl mx-auto"
      >
        <h2 className="font-semibold text-3xl text-black mb-6 text-center">
          Create Your Channel
        </h2>

        {/* Channel Logo */}
        <div className="text-center mb-6">
          <img
            className="w-36 h-36 mx-auto rounded-full border border-gray-300 shadow"
            src={
              formData?.channelLogo ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKKOdmJz8Z2pDtYgFgR2u9spABvNNPKYYtGw&s"
            }
            alt="channelLogo"
          />
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-gray-800" htmlFor="channelLogo">
            Channel Logo URL
          </label>
          <input
            type="url"
            name="channelLogo"
            id="channelLogo"
            value={formData.channelLogo}
            onChange={handleChange}
            placeholder="Enter logo URL"
            className="mt-4 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
            required
          />
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-gray-800" htmlFor="channelName">
            Channel Name
          </label>
          <input
            type="text"
            name="channelName"
            id="channelName"
            value={formData.channelName}
            onChange={handleChange}
            placeholder="Enter channel name"
            className="w-full px-4 py-2 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
            required
          />
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-gray-800" htmlFor="channelBanner">
            Channel Banner URL
          </label>
          <input
            type="url"
            name="channelBanner"
            id="channelBanner"
            value={formData.channelBanner}
            onChange={handleChange}
            placeholder="Enter banner URL"
            className="w-full px-4 py-2 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
            required
          />
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-gray-800" htmlFor="description">
            Channel Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your channel"
            className="w-full px-4 py-2 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
            rows="4"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-red-600 text-white py-2 rounded-md font-medium transition duration-300 hover:bg-red-700 focus:outline-none shadow-md"
        >
          Create Channel
        </button>
      </form>
    </div>
  );
};

export default CreateChannel;
