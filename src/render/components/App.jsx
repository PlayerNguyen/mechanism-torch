import React, { useEffect, useState } from "react";
import Headbar from "./Headbar/Headbar";
import Sidebar from "./Sidebar/Sidebar";

export default function App() {
  return (
    <div className="app-container fixed w-full h-full bg-neutral-500">
      {/* Head bar */}
      <Headbar />

      <div className="app-content">
        {/* Sidebar */}
        <Sidebar />
      </div>

      {/*  */}
    </div>
  );
}
