import React from "react";
import { Routes, Route } from "react-router-dom";
import DevelopmentTools from "./DevelopmentTools/DevelopmentTools";
import Headbar from "./Headbar/Headbar";
import Home from "./Home/Home";
import Sidebar from "./Sidebar/Sidebar";

export default function App() {
  return (
    <div className="app-container fixed w-full h-full bg-neutral-500">
      {/* Head bar */}
      <Headbar />

      <div className="app-content w-full h-full flex flex-row">
        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <div className="bg-neutral-400 flex-1 relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<h1>Settings</h1>} />
            <Route path="/dev" element={<DevelopmentTools />} />
            <Route element={<div>?</div>} />
          </Routes>
        </div>
      </div>

      {/*  */}
    </div>
  );
}
