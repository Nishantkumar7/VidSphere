import { PiFilmSlate } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { LuShoppingBag } from "react-icons/lu";
import { IoFlagOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoMdMusicalNotes } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { MdOutlineOndemandVideo, MdOutlinePlaylistPlay, MdHome, MdOutlineWatchLater, MdOutlineSubscriptions } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { AiOutlineLike } from "react-icons/ai";
import { Link } from "react-router-dom";

const Sidebar = ({ sideBarToggle }) => {
  return (
    <div
      className={`h-full hidden overflow-y-scroll py-3 w-72 pl-6 pr-2 bg-gray-50 text-gray-800 ${
        sideBarToggle ? "hidden" : "sm:flex"
      } flex-col gap-2 shadow-md`}
    >
      <Link
        to="/"
        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all"
      >
        <MdHome size={22} />
        <span className="font-medium">Home</span>
      </Link>
      <div className="menu-section">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all">
          <SiYoutubeshorts size={20} />
          <span className="font-medium">Shorts</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all">
          <MdOutlineSubscriptions size={20} />
          <span className="font-medium">Subscriptions</span>
        </div>
      </div>

      <div className="border-t my-3"></div>

      <div className="menu-section">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all">
          <FaHistory size={20} />
          <span className="font-medium">History</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all">
          <MdOutlinePlaylistPlay size={20} />
          <span className="font-medium">Playlist</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all">
          <MdOutlineOndemandVideo size={20} />
          <span className="font-medium">Your Videos</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all">
          <MdOutlineWatchLater size={20} />
          <span className="font-medium">Watch Later</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all">
          <AiOutlineLike size={20} />
          <span className="font-medium">Liked Videos</span>
        </div>
      </div>

      <div className="border-t my-3"></div>

      <div className="menu-section">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all">
          <MdOutlineLocalFireDepartment size={20} />
          <span className="font-medium">Trending</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all">
          <LuShoppingBag size={18} />
          <span className="font-medium">Shopping</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all">
          <IoMdMusicalNotes size={20} />
          <span className="font-medium">Music</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all">
          <PiFilmSlate size={20} />
          <span className="font-medium">Movies</span>
        </div>
      </div>

      <div className="border-t my-3"></div>

      <div className="menu-section">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all">
          <CiSettings size={20} />
          <span className="font-medium">Settings</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all">
          <IoFlagOutline size={20} />
          <span className="font-medium">Report History</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all">
          <IoIosHelpCircleOutline size={20} />
          <span className="font-medium">Help</span>
        </div>
      </div>

      <div className="border-t my-3"></div>

      <div className="text-xs text-gray-500 px-3">
        About &nbsp; • &nbsp; Privacy &nbsp; • &nbsp; Terms
      </div>
      <div className="text-xs text-gray-500 px-3">
        © 2025 Google LLC
      </div>
    </div>
  );
};

export default Sidebar;
