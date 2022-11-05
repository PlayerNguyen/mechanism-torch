import React, { useEffect, useState } from "react";
import Headbar from "./Headbar/Headbar";
import Sidebar from "./Sidebar/Sidebar";

export default function App() {
  return (
    <div className="app-container fixed w-full h-full bg-stone-400">
      {/* Head bar */}
      <Headbar />
      {/* Sidebar */}
      <Sidebar />

      {/*  */}
    </div>
  );
}
