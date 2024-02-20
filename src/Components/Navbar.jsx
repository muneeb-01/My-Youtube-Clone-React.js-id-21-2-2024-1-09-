import React, { useContext } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoLogoYoutube } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { HiOutlineCube } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { YoutubeContext } from "../Store/MyYoutubeStore";
import { Link } from "react-router-dom";

function Navbar() {
  const { setSidebar } = useContext(YoutubeContext);
  const { sidebar } = useContext(YoutubeContext);

  return (
    <div className="w-[100vw] text-[1.3vw] text-gray-600 flex justify-between items-center px-[2vw] py-[.8vw] shadow-lg">
      <div>
        <ul className="flex gap-[1vw]">
          {[<HiMenuAlt2 />, <IoLogoYoutube />].map((items, idx) => {
            return (
              <li key={idx}>
                <Link
                  to={idx === 1 && "/"}
                  onClick={() => {
                    {
                      idx === 0 && setSidebar(!sidebar);
                    }
                  }}
                  className={`${
                    idx === 1 && "text-red-500"
                  } flex items-center justify-center gap-2`}
                >
                  {items}
                  {idx === 1 && (
                    <span className="text-black font-semibold text-[1.2vw]">
                      Youtube
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="border-gray-300 border-[1px] flex justify-between items-center text-[0.8vw] px-3 py-2 rounded-[50px] w-[30vw]">
        <input
          type="text"
          id="SearchBar"
          placeholder="Search"
          className="w-full focus:outline-none text-start font-medium"
        />
        <CiSearch className="text-[1vw]" />
      </div>
      <div>
        <ul className="flex gap-[1vw]">
          {[<FaVideo />, <IoMdNotificationsOutline />, <HiOutlineCube />].map(
            (items, idx) => {
              return (
                <li key={idx}>
                  <a
                    href=""
                    className={` flex items-center justify-center gap-2`}
                  >
                    {items}
                  </a>
                </li>
              );
            }
          )}
          <div className="size-[1.3vw] bg-gray-400 rounded-full"></div>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
