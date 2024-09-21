"use client";
import { usePathname } from "next/navigation";
import React from "react";

const ViewProject = () => {
  const path = usePathname();
  const id = path.substring(path.lastIndexOf("/") + 1);
  return <div>ViewProject</div>;
};

export default ViewProject;
