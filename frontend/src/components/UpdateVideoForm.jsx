import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateVideoForm = () => {
  const params = useParams();
  const userChannel = useSelector(
    (store) => store.userChannel.userChannelDetails
  );
  const user = useSelector((store) => store.user.userDetails);
  const jwtToken = useSelector((store) => store.user.token);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    thumbnailUrl: "",
    description: "",
    category: "",
    videoUrl: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://youtube-clone-backend-2jgd.onrender.com/api/video/${params.id}`
      );

      if (data.video.uploader !== user._id) {
        navigate("/");
        toast.error("Unauthorized access!");
      }
      if (data) {
        setFormData({
          title: data?.video?.title || "",
          thumbnailUrl: data?.video?.thumbnailUrl || "",
          category: data?.video?.category || "",
          description: data?.video?.description || "",
          videoUrl: data?.video?.videoUrl || "",
        });
      }
    };
    fetchData();
  }, [params]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      let result = await axios.put(
        `https://youtube-clone-backend-2jgd.onrender.com/api/video/updateVideo/${params.id}/${userChannel?._id}/${user?._id}`,
        formData,
        {
          headers: {
            Authorization: `JWT ${jwtToken}`,
          },
        }
      );
      if (result) {
        toast.success("Video updated successfully");
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white rounded-lg shadow-lg p-8 w-full sm:w-3/4 lg:w-1/2"
      >
        <h2 className="text-3xl font-semibold text-black mb-6 text-center">
          Edit Video
        </h2>

        <div className="mb-6 text-center">
          <img
            className="w-24 h-24 rounded-full mx-auto"
            src="/images/vdsphere.png"
            alt="video thumbnail"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">
            Video Title
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            id="title"
            type="text"
            required
            value={formData.title}
            name="title"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="thumbnailUrl">
            Thumbnail URL
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            id="thumbnailUrl"
            type="url"
            required
            value={formData.thumbnailUrl}
            name="thumbnailUrl"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="videoUrl">
            Video URL
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            id="videoUrl"
            type="url"
            required
            value={formData.videoUrl}
            name="videoUrl"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="category">
            Category
          </label>
          <select
            name="category"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            value={formData.category}
            onChange={handleChange}
            id="category"
          >
            <option value="" disabled>
              Select category
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
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
            Video Description
          </label>
          <textarea
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            id="description"
            required
            value={formData.description}
            name="description"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 rounded-md bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-bold text-lg hover:from-cyan-500 hover:to-purple-700 transition-all"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateVideoForm;
