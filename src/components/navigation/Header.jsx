"use client";
import React from "react";
import { TfiMenuAlt } from "react-icons/tfi";

const Header = () => {
  return (
    <div className="h-16 w-full bg-white shadow-md text-[#0096c4] flex justify-between items-center md:justify-center">
      <div className="px-3 md:hidden w-full flex items-center justify-between">
        <TfiMenuAlt size={20} />
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
          Task Management App
        </h2>
      </div>
      <h2 className="hidden md:block text-lg md:text-xl lg:text-2xl font-semibold">
        Task Management App
      </h2>
    </div>
  );
};

export default Header;
