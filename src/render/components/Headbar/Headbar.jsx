import React from "react";
import "./Headbar.scss";
/**
 * Head bar demands a wide region to drag and drop the application
 * @returns
 */
export default function Headbar() {
  return (
    <div
      className="headbar w-full h-[32px] bg-neutral-300"
      onDoubleClick={() => {
        alert("heyy");
      }}
    ></div>
  );
}
