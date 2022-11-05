import React from "react";
import { FaHome } from "react-icons/fa";
import { RiHomeFill } from "react-icons/ri";

export default function Sidebar() {
  return (
    <div className="sidebar-wrapper ">
      {/* container */}
      <div
        className={`fixed w-[64px] h-full bg-slate-100 flex flex-col justify-center items-center gap-6`}
      >
        {[...Array(5)].map((e, i) => {
          return (
            <div className="text-neutral-600 text-xl hover:bg-neutral-200 px-4 py-2 rounded-xl">
              <RiHomeFill />
            </div>
          );
        })}
      </div>
    </div>
  );
}
