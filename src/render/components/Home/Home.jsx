import React, { useEffect, useRef, useState } from "react";
import { RiRocket2Fill } from "react-icons/ri";
import useClickOutside from "../../hooks/useClickOutside";
import "./Home.scss";

function Input() {
  return (
    <input className="w-full bg-white px-2 py-1 rounded-md relative cursor-text" />
  );
}

function StartButton({ text }) {
  return (
    <button
      className={`bg-blue-500 px-8 py-4 rounded-md font-bold 
      text-neutral-50 flex flex-row justify-start items-center gap-4
      hover:bg-blue-600
      active:bg-blue-700 transition-all ease-in-out`}
    >
      <RiRocket2Fill />
      {text}
    </button>
  );
}

function Dropdown({ data, onSelect }) {
  const [visible, setVisible] = useState(false);
  const insideRef = useRef();

  /**
   * Invisible the drop down if click outside of the box
   */
  useClickOutside(insideRef, () => {
    setVisible(false);
  });

  return (
    <div
      className={`
      w-fit bg-white px-2 py-1 rounded-md relative 
      cursor-pointer z-50 border border-neutral-400 hover:border-blue-300 transition-all focus:border-blue-600`}
      onClick={() => setVisible((lastVisible) => !lastVisible)}
      ref={insideRef}
    >
      <div className="whitespace-nowrap text-sm text-ellipsis w-[140px] inline-block overflow-hidden">
        current value
      </div>

      {visible ? (
        <div className="absolute bg-neutral-100 w-full my-2 left-0 rounded-b-md max-h-24 overflow-y-scroll shadow-md">
          {[...data].map((e, i) => {
            return (
              <div
                key={i}
                className={`px-2 py-2 text-sm hover:bg-neutral-200 flex flex-row justify-start 
                  items-center gap-3 cursor-pointer`}
                onClick={() => {
                  onSelect(e.key, i);
                }}
              >
                {e.component}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default function Home() {
  return (
    <div className="home-wrapper absolute w-full h-full bg-white flex flex-col text-neutral-500">
      {/* First section block */}
      <div className="home-header flex flex-row gap-4 bg-neutral-100 items-center py-3 px-6">
        {/* Title */}
        <div className="text-3xl my-4 font-bold flex-1">Home</div>
        <div className="flex flex-row gap-4">
          {/* Profile picker */}
          <div className="flex-1 flex flex-col gap-2">
            <span className="text-sm">Profile</span>

            <div className="w-full flex flex-row gap-4">
              <Dropdown
                data={[
                  {
                    key: "a",
                    component: <div>1.12</div>,
                  },
                  {
                    key: "b",
                    component: <div>1.19.4</div>,
                  },
                ]}
                onSelect={(data, index) => {
                  // todo: handle the item
                  console.log(JSON.stringify({ data, index }));
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm">Username</span>
            <Input />
          </div>

          <div className="">
            <StartButton text={`Launch`} />
          </div>
        </div>
      </div>
      {/* Download progress */}
      <div className="px-6 py-2 bg-neutral-50 flex flex-row gap-6 items-center ">
        <div className="flex flex-col w-1/5">
          <div>Loading</div>
          <span className="text-xs text-neutral-200 text-ellipsis whitespace-nowrap inline-block overflow-hidden">
            download package information and logger logger
          </span>
        </div>
        <div className="progressBar-wrapper relative flex-1 w-2/5 rounded-md z-0">
          <div className="bg-neutral-400 w-full block h-[12px] rounded-md z-0">
            <div className=" bg-blue-500 w-2/3 h-[12px] absolute rounded-md z-0 animate-pulse"></div>
          </div>
        </div>
      </div>
      {/* Tidings (news) */}
      <div className="overflow-y-scroll">
        <div className="px-6 py-6">Tidings</div>
        {/* container */}
        <div className="flex flex-row mx-3 gap-4 flex-wrap">
          {[...Array(12)].map((e, i) => (
            <div
              key={i}
              className="card-wrapper py-0 bg-neutral-100 w-1/3 flex flex-col rounded-md"
            >
              {/* card header */}
              {/* Thumbnail with full cover */}
              <div className="w-full h-[120px] bg-red-300 rounded-t-md"></div>

              {/* card footer */}
              <div className="px-4 py-4 text-xs text-neutral-400 flex flex-col gap-2">
                {/* Card tags */}
                <div className="text-xs">
                  {[...Array(4)].map((e, i) => {
                    return (
                      <span
                        key={i}
                        className="inline-block mr-3 mb-3 font-bold border rounded-md p-[0.5px]"
                      >
                        {
                          [
                            "Changelog",
                            "Releases",
                            "Update",
                            "Push-up",
                            "Top-down",
                          ][Math.floor(Math.random() * 5)]
                        }
                      </span>
                    );
                  })}
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book{" "}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
