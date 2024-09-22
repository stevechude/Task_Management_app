"use client";
import Loader from "@/components/loader/Loader";
import { Modal } from "@/components/modal/Modal";
import CreateTask from "@/components/project/CreateTask";
import { getStoredProjects } from "@/hooks/getProjectList";
import { setProjectList } from "@/redux/features/projects/projectSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";

const ViewProject = () => {
  const { projectList } = useAppSelector((state) => state.projects);
  const [showCreateTask, setShowCreateTask] = useState(false)
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null)
  const [toDo, setToDo] = useState([])
  const [progress, setProgress] = useState([])
  const [done, setDone] = useState([])
  const path = usePathname();
  const projectId = path.substring(path.lastIndexOf("/") + 1);
  const router = useRouter()
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedProjects = getStoredProjects();
    if (storedProjects) {
      dispatch(setProjectList(storedProjects));
    }

    setLoading(false);
  }, [dispatch]);

  console.log('this is the projects==', toDo, progress, done)

  useEffect(() => {
    if (projectList.length > 0) {
      localStorage.setItem("storedProjects", JSON.stringify(projectList));
    }

    const findProject = projectList?.find((proj) => proj.id == projectId)
    if (findProject) {
      setDetails(findProject)
      findProject?.tasks?.map((task) => {
        task.status === 'To do' ? setToDo(task) : task.status === 'In progress' ? setProgress(task) : task.status === 'Done' ? setDone(task) : null
      })
    }
  }, [projectList]);

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
            {
              loading ? (
                <Loader />
              ) : (
                <div className="w-full flex flex-col gap-3">
                  <hr className="h-1 w-full bg-[#0096c4]" />
                  <p className="text-base md:text-lg lg:text-2xl text-[#0096c4] text-center font-semibold">{details?.title}</p>
                  <div className="flex items-center flex-wrap md:flex-nowrap justify-between">
                    <p className="text-gray-500">Created By: <span className="font-semibold text-black">{details?.createdBy}</span></p>
                    <button onClick={() => setShowCreateTask(true)} className="text-white bg-[#0096c4] rounded-3xl py-1.5 px-4 font-semibold w-fit text-sm md:text-base">Create Task</button>
                  </div>
                </div>
              )
            }

            <hr className="h-1 w-full bg-[#0096c4]" />
            <div className="flex gap-2 w-full overflow-x-auto">
              <div className="h-[70vh] w-80 overflow-auto lg:w-[33.3%] rounded-xl bg-black/10 flex flex-col gap-2">
                <p className="text-center font-semibold flex flex-col py-2">To do <span className="w-full h-1 bg-red-500"></span></p>
                {
                  details?.tasks?.length > 0 ? details?.tasks?.map((task) => (
                    <div key={task?.id} className="bg-white shadow rounded-lg p-1 md:p-2 flex flex-col gap-2 text-xs md:text-sm">
                      <p>Title: <span>{task?.title}</span></p>
                      <p>Description: <span>{task?.description}</span></p>
                      <p>Assigned to: <span>{task?.assignTo}</span></p>
                      <p>Due date: <span>{task?.date}</span></p>
                      <p>Status: <span>{task?.status}</span></p>
                    </div>
                  )) : ""
                }
              </div>
              <div className="h-[70vh] w-80 overflow-auto lg:w-[33.3%] rounded-xl bg-black/10"><p className="text-center font-semibold flex flex-col py-2">In Progress<span className="w-full h-1 bg-yellow-500"></span></p></div>
              <div className="h-[70vh] w-80 overflow-auto lg:w-[33.3%] rounded-xl bg-black/10"><p className="text-center font-semibold flex flex-col py-2">Done<span className="w-full h-1 bg-green-500"></span></p></div>
            </div>
          </div>
        </div>
      </div>
      {
        <Modal show={showCreateTask} onClose={() => setShowCreateTask(false)}>
          <CreateTask />
        </Modal>
      }
    </>
  )
};

export default ViewProject;
