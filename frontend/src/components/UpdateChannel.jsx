import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setUserChannelDetails } from "../utils/userChannelSlice";

const UpdateChannel = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userChannel = useSelector(
    (store) => store.userChannel.userChannelDetails
  );
  const user = useSelector((store) => store.user.userDetails);
  const jwtToken = useSelector((store) => store.user.token);

  const [formData, setFormData] = useState({
    channelLogo: "",
    channelName: "",
    description: "",
    channelBanner: "",
  });

  useEffect(() => {
    if (!userChannel && Object.keys(userChannel)?.length < 1) {
      navigate("/");
    } else {
      fetchChannelData();
    }
  }, []);

  // function to fetch channel details
  const fetchChannelData = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/api/channel/${params.id}`
    );
    if (data) {
      setFormData({
        channelLogo: data?.channel?.channelLogo || "",
        channelName: data?.channel?.channelName || "",
        description: data?.channel?.description || "",
        channelBanner: data?.channel?.channelBanner || "",
      });
    }
  };

  // onchange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // function to update channel
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      let result = await axios.put(
        `http://localhost:3000/api/channel/updateChannel/${params.id}/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `JWT ${jwtToken}`,
          },
        }
      );
      if (result) {
        dispatch(setUserChannelDetails(result.data.channel));
        toast.success("Channel updated successfully!");
        navigate(`/channel/${userChannel._id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="bg-white min-h-full py-32 text-black">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col w-[90%] sm:w-2/4 mx-auto bg-[#f5f5f5] p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Update Your Channel</h2>

        <div className="flex justify-center mb-6">
          <img
            className="w-32 h-32 rounded-full border-4 border-red-600"
            src={
              formData?.channelLogo ||
              "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
            }
            alt="Channel Logo"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="channelName"
          >
            Channel Name
          </label>
          <input
            className="w-full p-3 rounded-md border bg-white border-[#ccc] text-black focus:outline-none focus:ring-2 focus:ring-red-600"
            id="channelName"
            type="text"
            required
            value={formData.channelName}
            name="channelName"
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="channelLogo"
          >
            Channel Logo (URL)
          </label>
          <input
            className="w-full p-3 rounded-md border bg-white border-[#ccc] text-black focus:outline-none focus:ring-2 focus:ring-red-600"
            id="channelLogo"
            type="url"
            required
            value={formData.channelLogo}
            name="channelLogo"
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="channelBanner"
          >
            Channel Banner (URL)
          </label>
          <input
            className="w-full p-3 rounded-md border bg-white border-[#ccc] text-black focus:outline-none focus:ring-2 focus:ring-red-600"
            id="channelBanner"
            type="url"
            required
            value={formData.channelBanner}
            name="channelBanner"
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="description"
          >
            Channel Description
          </label>
          <textarea
            className="w-full p-3 rounded-md border bg-white border-[#ccc] text-black focus:outline-none focus:ring-2 focus:ring-red-600"
            id="description"
            required
            value={formData.description}
            name="description"
            onChange={handleChange}
            rows="5"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full p-3 rounded-md bg-red-600 text-white font-bold text-lg hover:bg-red-700 transition-all"
        >
          Update Channel
        </button>
      </form>
    </div>
  );
};

export default UpdateChannel;
