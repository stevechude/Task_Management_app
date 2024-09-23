"use client";
import React, { useState } from "react";
import { TfiMenuAlt } from "react-icons/tfi";
import { FaWindowClose } from "react-icons/fa";
import Link from "next/link";

const Header = () => {
  const [openTab, setOpenTab] = useState(false);
  return (
    <div className="h-16 w-full bg-white shadow-md text-[#0096c4] flex justify-between items-center md:justify-center">
      <div className="px-3 md:hidden w-full flex items-center justify-between relative">
        <TfiMenuAlt onClick={() => setOpenTab(true)} size={20} />
        <Link
          href={"/"}
          className="text-lg md:text-xl lg:text-2xl font-semibold"
        >
          Task Management App
        </Link>
        {openTab ? (
          <div className="absolute bg-[#0096c4] text-white text-lg flex flex-col gap-2 w-[95%] rounded-lg top-0">
            <FaWindowClose
              onClick={() => setOpenTab(false)}
              size={30}
              color="#fff"
              className="self-start m-2"
            />
            <div className="flex flex-col gap-6 p-2 pb-10 font-semibold">
              <Link
                href={"/"}
                onClick={() => setOpenTab(false)}
                className="border-b border-white"
              >
                Overview
              </Link>
              <Link
                href={"/about"}
                onClick={() => setOpenTab(false)}
                className="border-b border-white"
              >
                About App
              </Link>
              <Link
                href={"/contact"}
                onClick={() => setOpenTab(false)}
                className="border-b border-white"
              >
                Contact
              </Link>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <h2 className="hidden md:block text-lg md:text-xl lg:text-2xl font-semibold">
        Task Management App
      </h2>
    </div>
  );
};

export default Header;
