import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UploadVideo = () => {
  const navigate = useNavigate();
  const userChannel = useSelector(
    (store) => store.userChannel.userChannelDetails
  );
  const user = useSelector((store) => store.user.userDetails);
  const jwtToken = useSelector((store) => store.user.token);

  useEffect(() => {
    if (!userChannel && Object.keys(userChannel)?.length < 1) {
      navigate("/");
    }
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    thumbnailUrl: "",
    description: "",
    videoUrl: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let videoData = {
      ...formData,
      uploader: user?._id,
      channelId: userChannel?._id,
    };

    try {
      let result = await axios.post(
        "https://vidsphere-backend-1l9p.onrender.com/api/video/addVideo",
        videoData,
        {
          headers: {
            Authorization: `JWT ${jwtToken}`,
          },
        }
      );
      if (result) {
        toast.success("Video uploaded successfully");
        setFormData({
          title: "",
          thumbnailUrl: "",
          description: "",
          category: "",
          videoUrl: "",
        });
        navigate(`/channel/${userChannel?._id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <form
        onSubmit={handleFormSubmit}
        className="w-full max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md"
      >
        <h2 className="text-3xl text-center font-semibold text-gray-900 mb-6">Upload Video</h2>

        {/* Thumbnail Preview */}
        {formData.thumbnailUrl && (
          <div className="mb-6">
            <img
              className="w-48 h-48 object-cover mx-auto rounded-xl"
              src={formData.thumbnailUrl}
              alt="Video Thumbnail"
            />
          </div>
        )}

        <div className="mb-4">
          <label
            className="block text-lg font-medium text-gray-800 mb-2"
            htmlFor="title"
          >
            Video Title
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            id="title"
            type="text"
            required
            value={formData.title}
            name="title"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-lg font-medium text-gray-800 mb-2"
            htmlFor="thumbnailUrl"
          >
            Thumbnail URL
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            id="thumbnailUrl"
            type="url"
            required
            value={formData.thumbnailUrl}
            name="thumbnailUrl"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-lg font-medium text-gray-800 mb-2"
            htmlFor="videoUrl"
          >
            Video URL
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            id="videoUrl"
            type="url"
            required
            value={formData.videoUrl}
            name="videoUrl"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-lg font-medium text-gray-800 mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            name="category"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            value={formData.category}
            onChange={handleChange}
            id="category"
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="songs">Songs</option>
            <option value="movies">Movies</option>
            <option value="education">Education</option>
            <option value="food">Food</option>
            <option value="fashion">Fashion</option>
            <option value="vlog">Vlog</option>
            <option value="finance">Finance</option>
            <option value="gaming">Gaming</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            className="block text-lg font-medium text-gray-800 mb-2"
            htmlFor="description"
          >
            Video Description
          </label>
          <textarea
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            id="description"
            value={formData.description}
            required
            name="description"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 rounded-md bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-bold text-lg hover:from-cyan-500 hover:to-purple-700 transition-all"
        >
          Upload Video
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;
