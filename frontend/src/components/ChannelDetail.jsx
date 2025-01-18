import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ChannelVideo from "./ChannelVideo";

const ChannelDetail = () => {
  const params = useParams();
  const [channelData, setChannelData] = useState({});
  const [channelVideos, setChannelVideos] = useState([]);
  const user = useSelector((store) => store.user.userDetails);
  const [triggerVideoFetch, setTriggerVideoFetch] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const { data } = await axios.get(
          `https://youtube-clone-backend-2jgd.onrender.com/api/channel/${params.id}`
        );
        if (data) {
          setChannelData(data.channel);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchChannelData();
  }, [params]);

  useEffect(() => {
    if (channelData) {
      fetchVideos(channelData?._id);
    }
  }, [channelData, triggerVideoFetch]);

  const triggerVideoFetching = () => {
    setTriggerVideoFetch(!triggerVideoFetch);
  };

  const fetchVideos = async (channelId) => {
    setloading(true);
    try {
      const { data } = await axios.get(
        `https://youtube-clone-backend-2jgd.onrender.com/api/video/channelVideos/${channelId}`
      );

      if (data) {
        setChannelVideos(data.videos);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-red-600"></div>
        </div>
      ) : (
        <div className="bg-white text-gray-900 px-6 md:px-16 py-8">
          <div className="container mx-auto">
            {channelData && Object.keys(channelData).length >= 1 ? (
              <div className="channel-details bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative">
                  <img
                    src={channelData?.channelBanner}
                    className="h-52 w-full object-cover"
                    alt="channelBanner"
                  />
                </div>
                <div className="channelInfo flex flex-col md:flex-row md:gap-6 py-6 px-8 items-center">
                  <img
                    src={channelData?.channelLogo}
                    className="rounded-full h-28 w-28 md:h-40 md:w-40 border-4 border-white"
                    alt="channelLogo"
                  />
                  <div className="details flex flex-col mt-4 md:mt-0 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-gray-900">
                      {channelData?.channelName}
                    </h2>
                    <p className="text-lg text-gray-600">
                      {channelData?.subscribers?.length || 0} subscribers
                    </p>
                    <p className="text-sm text-gray-600">
                      Videos: {channelData?.videos?.length || 0}
                    </p>
                    <p className="text-sm text-gray-600">
                      Created At: {channelData?.createdAt?.split("T")[0]}
                    </p>
                    <p className="mt-2 text-gray-700 text-sm max-w-xl mx-auto md:mx-0">
                      {channelData?.description?.length >= 330
                        ? channelData?.description.slice(0, 330) + "..."
                        : channelData?.description}
                    </p>
                  </div>
                </div>
                <div className="flex justify-start gap-6 my-6 px-8">
                  {channelData?.owner === user?._id ? (
                    <>
                      <Link
                        to={"/uploadVideo"}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-semibold"
                      >
                        Upload Video
                      </Link>
                      <Link
                        to={`/updateChannel/${channelData?._id}`}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-3 rounded-md font-semibold"
                      >
                        Edit Channel
                      </Link>
                    </>
                  ) : (
                    <h3 className="text-xl font-semibold text-gray-900">Videos</h3>
                  )}
                </div>
              </div>
            ) : (
              <h2 className="text-center text-gray-600 text-xl">No Channel Found</h2>
            )}

            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6">
              {channelVideos && channelVideos.length >= 1 ? (
                channelVideos.map((item) => (
                  <ChannelVideo
                    triggerVideoFetching={triggerVideoFetching}
                    channelData={channelData}
                    key={item._id}
                    item={item}
                  />
                ))
              ) : (
                <h2 className="col-span-full text-center text-gray-600 text-lg">
                  No videos to display
                </h2>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChannelDetail;
