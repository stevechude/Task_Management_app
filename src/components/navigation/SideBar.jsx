"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsInfoSquare } from "react-icons/bs";
import { MdOutlineContactSupport } from "react-icons/md";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:block w-[200px] h-screen bg-gradient-to-b from-[#0096C4] to-[#0F3659]">
      <div className="flex flex-col gap-4 w-full h-full my-4 items-center">
        <div className="border-4 rounded-full border-white w-fit">
          <div className="">
            <Image
              src={"/photo.png"}
              alt="picture"
              width={100}
              height={100}
              className="m-auto md:w-[100px] h-[70px] w-[70px] md:h-[100px] object-cover rounded-full"
            />
          </div>
        </div>
        <Link href={"/"} className={pathname === "/" ? "focused" : "links"}>
          <LuLayoutDashboard />
          <p>Overview</p>
        </Link>
        <Link
          href={"/about"}
          className={pathname.includes(`about`) ? "focused" : "links"}
        >
          <BsInfoSquare />
          <p>About App</p>
        </Link>
        <Link
          href={"/contact"}
          className={pathname.includes(`contact`) ? "focused" : "links"}
        >
          <MdOutlineContactSupport />
          <p>Contact</p>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
