import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

export default function DevelopmentTools() {
  const [menuSection] = useState([
    {
      name: "UI test tool",
      href: "/ui-test",
    },
  ]);

  const navigate = useNavigate();

  return (
    <div className="developmentTool-wrapper w-full h-full fixed left-[64px] top-[32px] flex flex-row bg-white">
      {/* Side menu bar */}
      <div className="flex flex-col bg-neutral-200 w-1/5 overflow-scroll">
        {[...menuSection].map((e, i) => {
          return (
            <button
              key={i}
              className={`px-2 py-3 hover:bg-neutral-300 cursor-pointer`}
              onClick={() => navigate(e.href)}
            >
              {e.name}
            </button>
          );
        })}
      </div>

      <div>
        <Routes>
          <Route path={`/ui-test`} element={<div>Test tool</div>} />
        </Routes>
      </div>
    </div>
  );
}
