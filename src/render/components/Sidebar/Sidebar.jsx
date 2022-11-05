import React from "react";
import { RiHomeFill } from "react-icons/ri";
import "./Sidebar.scss";

export default function Sidebar() {
  return (
    <div className="sidebar-wrapper">
      {/* container */}
      <div
        className={`sidebar fixed w-[64px] h-full bg-slate-100 flex flex-col justify-center items-center gap-6 shadow-md top-[32px]`}
      >
        {[...Array(5)].map((e, i) => {
          return (
            <div
              key={i}
              className="text-neutral-600 text-xl hover:bg-neutral-200 px-4 py-2 rounded-xl"
            >
              <RiHomeFill />
            </div>
          );
        })}
      </div>
    </div>
  );
}
