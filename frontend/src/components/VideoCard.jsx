import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import formatNumber from "../utils/formatNumber";
import timeAgo from "../utils/timeAgo";

const VideoCard = ({
  videoId,
  title,
  thumbnailUrl,
  channelId,
  views,
  createdAt,
}) => {
  const [channelData, setChannelData] = useState([]);
  useEffect(() => {
    // fetch videos
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://vidsphere-backend-1l9p.onrender.com/api/channel/${channelId}`
      );
      if (data) {
        setChannelData(data.channel);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="video_card w-96  sm:w-80 mlg:w-96">
      <Link to={`/video/${videoId}`} className="flex flex-col gap-2">
      <div className="relative aspect-video rounded-xl overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={title}
          className="box w-96 xs:h-52 border border-black"
        />
        </div>
        <div className="flex gap-2">
          
          <img
            className="channel w-12 h-12 rounded-full border border-black"
            src={channelData.channelLogo}
            alt="Channel name"
          />
          <div className="description text-[14px] xs:text-[16px]">
            <h2>{title?.length > 72 ? title.slice(0, 72) + "..." : title}</h2>
            <Link
              to={`/channel/${channelData?._id}`}
              className="channel_views text-sm text-gray-500"
            >
              {/* <p>Thapa Technical </p> */}
              <p className="text-[12px] xs:text-[14px]">
                {channelData?.channelName}
              </p>
              <div className="flex gap-2">
                <h2 className="text-[12px] xs:text-[14px]">
                  {formatNumber(views)} Views
                </h2>
                <h2 className="text-[12px] xs:text-[14px]">
                  {timeAgo(createdAt)}
                </h2>
              </div>
            </Link>
          </div>
        </div>
      </Link>

    </div>
  );
};
export default VideoCard;
