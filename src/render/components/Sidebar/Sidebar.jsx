import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RiHomeFill, RiSettingsFill, RiCodeBoxFill } from "react-icons/ri";
import "./Sidebar.scss";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [sideBarItem] = useState([
    {
      name: "Home",
      icon: <RiHomeFill />,
      href: "/",
    },
    {
      name: "Settings",
      icon: <RiSettingsFill />,
      href: "/settings",
    },
    window.api.isDevelopment
      ? { name: "Development tools", icon: <RiCodeBoxFill />, href: "/dev" }
      : null,
  ]);

  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (what) => {
    return location.pathname === what;
  };

  return (
    <div className="sidebar-wrapper z-10">
      {/* container */}
      <div
        className={`sidebar w-[64px] h-full bg-neutral-100 
        flex flex-col justify-start gap-4 shadow-md items-center pt-4`}
      >
        {[...sideBarItem]
          .filter((e) => e !== null)
          .map((e, i) => {
            return (
              <div
                key={i}
                className={` text-2xl hover:bg-neutral-200  hover:text-blue-400
              px-3 py-2 rounded-xl cursor-pointer transition-all ease-linear ${
                isActive(e.href)
                  ? `bg-neutral-200 text-blue-500`
                  : `text-neutral-400`
              }`}
                onClick={() => navigate(e.href)}
              >
                {e.icon}
              </div>
            );
          })}
      </div>
    </div>
  );
}
