import {
  MdHome,
  MdOutlineUploadFile,
  MdAnalytics,
  MdSettings,
  MdMonetizationOn,
} from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { BiTrendingUp } from "react-icons/bi";
import { PiFilmSlate } from "react-icons/pi";
import { RiLiveLine } from "react-icons/ri";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { Link } from "react-router-dom";

const Sidebar = ({ sideBarToggle }) => {
  const menuItems = [
    {
      label: "Home",
      icon: <MdHome size={20} />,
      link: "/",
    },
    {
      section: "Creator Tools",
    },
    {
      label: "Content Library",
      icon: <MdOutlineUploadFile size={20} />,
    },
    {
      label: "Go Live",
      icon: <RiLiveLine size={20} />,
    },
    {
      label: "Create Series",
      icon: <PiFilmSlate size={20} />,
    },
    {
      section: "Explore",
    },
    {
      label: "Trending Now",
      icon: <BiTrendingUp size={20} />,
    },
    {
      label: "Creators",
      icon: <FaUserFriends size={20} />,
    },
    {
      label: "Community",
      icon: <AiOutlineUsergroupAdd size={20} />,
    },
    {
      label: "Chat Rooms",
      icon: <HiOutlineChatAlt2 size={20} />,
    },
    {
      section: "Insights",
    },
    {
      label: "Analytics",
      icon: <MdAnalytics size={20} />,
    },
    {
      label: "Monetization",
      icon: <MdMonetizationOn size={20} />,
    },
    {
      section: "Support",
    },
    {
      label: "Settings",
      icon: <MdSettings size={20} />,
    },
  ];

  const menuItemClass = `
    relative flex items-center gap-3 px-3 py-2 rounded-md 
    text-gray-800 hover:bg-gray-100 transition-all duration-200 group
  `;

  const activeIndicator = `
    absolute left-0 top-0 h-full w-1 bg-gradient-to-b 
    from-[#00e0ff] to-[#d946ef] opacity-0 group-hover:opacity-100 transition
  `;

  return (
    <div
      className={`sidebar-scroll h-full hidden overflow-y-auto py-4 w-72 pl-5 pr-3 bg-gray-50 text-gray-800 ${
    sideBarToggle ? "hidden" : "sm:flex"
      } flex-col gap-2`}
    >
      {menuItems.map((item, index) =>
        item.section ? (
          <div
            key={index}
            className="text-xs font-semibold text-gray-500 mt-4 mb-1 px-3 uppercase tracking-wider"
          >
            {item.section}
          </div>
        ) : (
          <Link to={item.link || "#"} key={index} className={menuItemClass}>
            <div className="text-[#d946ef]">{item.icon}</div>
            <span className="font-medium group-hover:text-[#00e0ff] transition">{item.label}</span>
          </Link>
        )
      )}

      <div className="border-t border-gray-200 my-4"></div>

      <div className="text-xs text-gray-500 px-3">
        Terms &nbsp; • &nbsp; Privacy &nbsp; • &nbsp; Support
      </div>
      <div className="text-xs text-gray-500 px-3 mt-1">
        © 2025 VidSphere Inc.
      </div>
    </div>
  );
};

export default Sidebar;
