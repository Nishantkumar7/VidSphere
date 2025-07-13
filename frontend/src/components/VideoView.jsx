import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BiLike, BiDislike } from "react-icons/bi";
import Comment from "./Comment";
import timeAgo from "../utils/timeAgo";
import formatNumber from "../utils/formatNumber";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const VideoView = () => {
  const params = useParams();
  const video = params.id;
  const [videoData, setVideoData] = useState([]);
  const [comments, setComments] = useState([]);
  const [channelData, setChannelData] = useState([]);
  const [channelVideos, setChannelVideos] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [comment, setcomment] = useState("");
  const [commentTrigger, setCommentTrigger] = useState(false);
  const user = useSelector((store) => store.user.userDetails);
  const token = useSelector((store) => store.user.token);

  const handleLike = async () => {
    if (!user || Object.keys(user).length < 1) {
      return toast.error("Login first");
    }
    try {
      let uId = user._id;
      const { data } = await axios.put(
        `https://vidsphere-backend-1l9p.onrender.com/api/video/likeVideo/${video}`,
        { uId },
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      if (data) {
        toast.success("video Liked");
        setVideoData((prev) => ({
          ...prev,
          likes: data.video.likes,
          dislikes: data.video.dislikes,
        }));
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const handleDisLike = async () => {
    if (!user || Object.keys(user).length < 1) {
      return toast.error("Login first");
    }

    try {
      let uId = user._id;
      const { data } = await axios.put(
        `https://vidsphere-backend-1l9p.onrender.com/api/video/disLikeVideo/${video}`,
        { uId },
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      if (data) {
        toast.success("video Disliked");
        setVideoData((prev) => ({
          ...prev,
          dislikes: data.video.dislikes,
          likes: data.video.likes,
        }));
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`https://vidsphere-backend-1l9p.onrender.com/api/video/${video}`);
      if (data) {
        setVideoData(data.video);
        fetchChannelData(data.video.channelId);
        fetchChannelVideos(data.video.channelId);
      }
      if (data?.video?.videoUrl) {
        setVideoUrl(data?.video?.videoUrl.match(/(?:v=|embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1] || "");
      }
    };
    fetchData();
  }, [params]);

  useEffect(() => {
    if (videoData) {
      fetchVideoComments();
    }
  }, [videoData, commentTrigger]);

  const fetchChannelVideos = async (id) => {
    try {
      const { data } = await axios.get(`https://vidsphere-backend-1l9p.onrender.com/api/video/channelVideos/${id}`);
      if (data) {
        setChannelVideos(data.videos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChannelData = async (cId) => {
    const { data } = await axios.get(`https://vidsphere-backend-1l9p.onrender.com/api/channel/${cId}`);
    if (data) {
      setChannelData(data.channel);
    }
  };

  const fetchVideoComments = async () => {
    const { data } = await axios.get(`https://vidsphere-backend-1l9p.onrender.com/api/comment/videoComments/${video}`);
    if (data) {
      setComments(data.comments);
    }
  };

  const triggerCommentFetch = () => {
    setCommentTrigger(!commentTrigger);
  };

  const handleComment = async () => {
    if (comment === "") {
      return toast.error("comment cannot be empty!");
    }
    if (!user || Object.keys(user).length < 1) {
      return toast.error("login required");
    }
    const commentData = {
      video: videoData?._id,
      owner: user?._id,
      description: comment,
    };
    try {
      const data = await axios.post("https://vidsphere-backend-1l9p.onrender.com/api/comment/addComment", commentData);
      if (data) {
        toast.success("comment added");
        fetchVideoComments();
        setcomment("");
      }
    } catch (error) {
      toast.error(error.data.message);
      console.log(error);
    }
  };

  const handleSubscribe = async () => {
    if (!user || Object.keys(user).length < 1) {
      return toast.error("Login first");
    }
    try {
      const { data } = await axios.put(
        `https://vidsphere-backend-1l9p.onrender.com/api/channel/subscribeChannel/${channelData?._id}/${user?._id}`,
        {},
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      if (data) {
        toast.success("channel subscribed");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row p-4 rounded-xl max-w-screen-xl mx-auto mt-8">
      {/* Video Section */}
      <div className="flex-1 mb-6 lg:mb-0 lg:w-2/3 bg-white rounded-xl overflow-hidden">
        <iframe
          className="w-full h-[60vh] md:h-[70vh] rounded-lg"
          src={`https://www.youtube.com/embed/${videoUrl}?autoplay=1&rel=0`}
          title="video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        <div className="flex justify-between items-center py-4 px-6">
          <div className="flex gap-3 items-center">
            <Link to={`/channel/${channelData?._id}`} className="flex items-center gap-3">
              <img className="w-12 h-12 rounded-full border-2 border-gray-300" src={channelData?.channelLogo} alt="Channel" />
              <h2 className="font-semibold">{channelData?.channelName}</h2>
            </Link>
            <button
              onClick={handleSubscribe}
              className="bg-gradient-to-r from-[#00e0ff] to-[#d946ef] text-white px-4 py-2 rounded-full hover:from-[#00c4e6] hover:to-[#c026d3] transition duration-300"

            >
              Subscribe
            </button>
          </div>
          <div className="flex gap-3 items-center">
            <button onClick={handleLike} className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">
              <BiLike />
              {videoData?.likes?.length}
            </button>
            <button onClick={handleDisLike} className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">
              <BiDislike />
              {videoData?.dislikes?.length}
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">Save</button>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 rounded-xl">
          <h2 className="text-lg font-medium mb-2">{formatNumber(videoData?.views)} Views • {timeAgo(videoData?.createdAt)}</h2>
          <p className="text-sm text-gray-700">{videoData?.description}</p>
        </div>

        {/* Comment Section */}
        <div className="mt-6 bg-gray-50 p-4 rounded-xl">
          <h3 className="text-lg font-semibold">Comments</h3>
          <div className="flex gap-3 items-center mt-4">
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setcomment(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none"
            />
            <button onClick={handleComment} className="bg-gradient-to-r from-[#00e0ff] to-[#d946ef] text-white px-4 py-2 rounded-full hover:from-[#00c4e6] hover:to-[#c026d3] transition duration-300">
              Comment
            </button>
          </div>

          <div className="mt-4">
            {comments && comments?.length > 0 ? (
              comments.map((item) => (
                <Comment key={item._id} {...item} triggerCommentFetch={triggerCommentFetch} />
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Section */}
      <div className="lg:w-1/3 px-4">
        <h3 className="text-xl font-semibold mb-4">More from {channelData?.channelName}</h3>
        <div className="space-y-4">
          {channelVideos.length > 0 ? (
            channelVideos.map((item) => (
              <Link key={item._id} to={`/video/${item._id}`} className="flex gap-4 items-center hover:bg-gray-100 p-3 rounded-xl transition duration-300">
                <img className="w-24 h-16 object-cover rounded-md" src={item?.thumbnailUrl} alt={item?.title} />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-800">{item?.title.length > 50 ? item?.title.slice(0, 50) + "..." : item?.title}</h4>
                  <p className="text-xs text-gray-500">{formatNumber(item?.views)} views • {timeAgo(item?.createdAt)}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">No related videos.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoView;
