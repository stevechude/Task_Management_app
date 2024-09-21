"use client";
import { Modal } from "@/components/modal/Modal";
import CreateTask from "@/components/project/CreateTask";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";

const ViewProject = () => {
  const [showCreateTask, setShowCreateTask] = useState(false)
  const path = usePathname();
  const router = useRouter()
  const id = path.substring(path.lastIndexOf("/") + 1);
  console.log('show me id==', id)

  const goBack = () => {
    router.back()
  }

  return (
    <>
      <div className="bg-white h-[90vh] rounded-xl overflow-auto">
        <div className="flex flex-col gap-4 p-2 md:p-4 lg:p-8">
          <button onClick={goBack} className="flex items-center gap-1 text-base lg:text-lg text-black font-semibold">
            <IoChevronBackOutline />
            <p>Back</p>
          </button>
          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-col gap-3">
              <hr className="h-1 w-full bg-[#0096c4]" />
              <p className="text-base md:text-lg lg:text-2xl text-[#0096c4] text-center font-semibold">Title</p>
              <div className="flex items-center flex-wrap md:flex-nowrap justify-between">
                <p className="text-gray-500">Created By: <span className="font-semibold text-black">Who ever</span></p>
                <button onClick={() => setShowCreateTask(true)} className="text-white bg-[#0096c4] rounded-3xl py-1.5 px-4 font-semibold w-fit text-sm md:text-base">Create Task</button>
              </div>
            </div>
            <hr className="h-1 w-full bg-[#0096c4]" />
            <div className="flex gap-2 w-full overflow-x-auto">
              <div className="h-[70vh] w-80 overflow-auto lg:w-[33.3%] rounded-xl bg-black/10 flex flex-col gap-2">
                <p className="text-center font-semibold flex flex-col py-2">To do <span className="w-full h-1 bg-red-500"></span></p>
              </div>
              <div className="h-[70vh] w-80 overflow-auto lg:w-[33.3%] rounded-xl bg-black/10"><p className="text-center font-semibold flex flex-col py-2">In Progress<span className="w-full h-1 bg-yellow-500"></span></p></div>
              <div className="h-[70vh] w-80 overflow-auto lg:w-[33.3%] rounded-xl bg-black/10"><p className="text-center font-semibold flex flex-col py-2">Done<span className="w-full h-1 bg-green-500"></span></p></div>
            </div>
          </div>
        </div>
      </div>
      {
        <Modal show={showCreateTask} onClose={() => setShowCreateTask(false)}>
          <CreateTask projectId={id} />
        </Modal>
      }
    </>
  )
};

export default ViewProject;
