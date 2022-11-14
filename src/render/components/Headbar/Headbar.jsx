import React from "react";
import "./Headbar.scss";
/**
 * Head bar demands a wide region to drag and drop the application
 * @returns
 */
export default function Headbar() {
  return (
    <div
      className="headbar w-full h-[48px] bg-neutral-100 z-50 shadow-md"
      onDoubleClick={() => {
        window.api.toggleMaximize();
      }}
    ></div>
  );
}
