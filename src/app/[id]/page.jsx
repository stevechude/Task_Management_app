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
import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Reorder } from "framer-motion";
import EditTask from "@/components/project/EditTask";

const ViewProject = () => {
  const { projectList } = useAppSelector((state) => state.projects);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const [toDo, setToDo] = useState([]);
  const [progress, setProgress] = useState([]);
  const [done, setDone] = useState([]);
  const path = usePathname();
  const projectId = path.substring(path.lastIndexOf("/") + 1);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedProjects = getStoredProjects();
    if (storedProjects) {
      dispatch(setProjectList(storedProjects));
    }

    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (projectList.length > 0) {
      localStorage.setItem("storedProjects", JSON.stringify(projectList));
    }

    const findProject = Array.isArray(projectList)
      ? projectList.find((proj) => proj?.id == projectId)
      : null;
    if (findProject) {
      setDetails(findProject);

      const toDoTasks = [];
      const inProgressTasks = [];
      const doneTasks = [];

      findProject?.tasks?.forEach((task) => {
        if (task.status === "To do") {
          toDoTasks.push(task);
        } else if (task.status === "In progress") {
          inProgressTasks.push(task);
        } else if (task.status === "Done") {
          doneTasks.push(task);
        }
      });

      setToDo(toDoTasks);
      setProgress(inProgressTasks);
      setDone(doneTasks);
    }
  }, [projectList]);

  const handleTaskDelete = (taskId) => {
    const updatedProjectList = projectList.map((proj) => {
      if (proj.id == projectId) {
        const updatedTasks = proj.tasks.filter((task) => task.id !== taskId);
        return { ...proj, tasks: updatedTasks };
      }
      return proj;
    });

    // Update Redux state
    dispatch(setProjectList(updatedProjectList));

    // Update localStorage
    localStorage.setItem("storedProjects", JSON.stringify(updatedProjectList));

    console.log("Updated project list:", updatedProjectList);
  };

  const handleEditClick = (task) => {
    setCurrentTask(task);
    setShowEditTask(true);
  };

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <div className="bg-white h-[90vh] rounded-xl overflow-auto">
        <div className="flex flex-col gap-4 p-2 md:p-4 lg:p-8">
          <button
            onClick={goBack}
            className="flex items-center gap-1 text-base lg:text-lg text-black font-semibold"
          >
            <IoChevronBackOutline />
            <p>Back</p>
          </button>
          <div className="flex flex-col gap-4">
            {loading ? (
              <Loader />
            ) : (
              <div className="w-full flex flex-col gap-3">
                <hr className="h-1 w-full bg-[#0096c4]" />
                <p className="text-base md:text-lg lg:text-2xl text-[#0096c4] text-center font-semibold">
                  {details?.title}
                </p>
                <div className="flex items-center flex-wrap md:flex-nowrap justify-between">
                  <p className="text-gray-500">
                    Created By:{" "}
                    <span className="font-semibold text-black">
                      {details?.createdBy}
                    </span>
                  </p>
                  <button
                    onClick={() => setShowCreateTask(true)}
                    className="text-white bg-[#0096c4] rounded-3xl py-1.5 px-4 font-semibold w-fit text-sm md:text-base"
                  >
                    Create Task
                  </button>
                </div>
              </div>
            )}

            <hr className="h-1 w-full bg-[#0096c4]" />
            <div className="flex gap-2 w-full overflow-x-auto">
              <div className="h-[70vh] w-80 overflow-auto lg:w-[33.3%] rounded-xl bg-black/10 flex flex-col">
                <p className="text-center font-semibold flex flex-col py-2">
                  To do <span className="w-full h-1 bg-red-500"></span>
                </p>
                <Reorder.Group values={toDo} onReorder={setToDo}>
                  {toDo.length > 0
                    ? toDo.map((task) => (
                      <Reorder.Item value={task} key={task?.id}>
                        <div
                          key={task?.id}
                          className="bg-white shadow rounded-lg p-1 md:p-2 flex flex-col gap-2 text-xs md:text-sm text-[#0096c4] mx-2 mb-2"
                        >
                          <p>
                            Title:{" "}
                            <span className="text-[#777]">{task?.title}</span>
                          </p>
                          <p>
                            Description:{" "}
                            <span className="text-[#777]">
                              {task?.description}
                            </span>
                          </p>
                          <p>
                            Assigned to:{" "}
                            <span className="text-[#777]">
                              {task?.assignTo}
                            </span>
                          </p>
                          <p>
                            Due date:{" "}
                            <span className="text-[#777]">{task?.date}</span>
                          </p>
                          <div className="flex justify-between">
                            <p>
                              Status:{" "}
                              <span className="text-red-500 font-bold">
                                {task?.status}
                              </span>
                            </p>
                            <div className="flex items-center flex-wrap md:flex-nowrap lg:gap-2">
                              <MdOutlineEdit
                                onClick={() => handleEditClick(task)}
                                size={20}
                                className="cursor-pointer lg:hidden hover:text-white p-1"
                              />
                              <MdDeleteForever
                                onClick={() => handleTaskDelete(task.id)}
                                size={20}
                                className="cursor-pointer p-1 text-red-500 hover:text-white lg:hidden"
                              />
                              <div className="hidden lg:block rounded-full hover:bg-[#0096c4] hover:text-white">
                                <MdOutlineEdit
                                  onClick={() => handleEditClick(task)}
                                  size={30}
                                  className="cursor-pointer hover:text-white p-1"
                                />
                              </div>
                              <div className="hidden lg:block rounded-full hover:bg-red-500 hover:text-white">
                                <MdDeleteForever
                                  onClick={() => handleTaskDelete(task.id)}
                                  size={30}
                                  className="cursor-pointer p-1 text-red-500 hover:text-white"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Reorder.Item>
                    ))
                    : ""}
                </Reorder.Group>
              </div>
              <div className="h-[70vh] w-80 overflow-auto lg:w-[33.3%] rounded-xl bg-black/10">
                <p className="text-center font-semibold flex flex-col py-2">
                  In Progress<span className="w-full h-1 bg-yellow-500"></span>
                </p>
                <Reorder.Group values={progress} onReorder={setProgress}>
                  {progress.length > 0
                    ? progress.map((task) => (
                      <Reorder.Item value={task} key={task?.id}>
                        <div
                          key={task?.id}
                          className="bg-white shadow rounded-lg p-1 md:p-2 flex flex-col gap-2 text-xs md:text-sm text-[#0096c4] mx-2 mb-2"
                        >
                          <p>
                            Title:{" "}
                            <span className="text-[#777]">{task?.title}</span>
                          </p>
                          <p>
                            Description:{" "}
                            <span className="text-[#777]">
                              {task?.description}
                            </span>
                          </p>
                          <p>
                            Assigned to:{" "}
                            <span className="text-[#777]">
                              {task?.assignTo}
                            </span>
                          </p>
                          <p>
                            Due date:{" "}
                            <span className="text-[#777]">{task?.date}</span>
                          </p>
                          <div className="flex justify-between">
                            <p>
                              Status:{" "}
                              <span className="text-yellow-500 font-bold">
                                {task?.status}
                              </span>
                            </p>
                            <div className="flex items-center flex-wrap md:flex-nowrap lg:gap-2">
                              <MdOutlineEdit
                                onClick={() => handleEditClick(task)}
                                size={20}
                                className="cursor-pointer lg:hidden hover:text-white p-1"
                              />
                              <MdDeleteForever
                                onClick={() => handleTaskDelete(task.id)}
                                size={20}
                                className="cursor-pointer p-1 text-red-500 hover:text-white lg:hidden"
                              />
                              <div className="hidden lg:block rounded-full hover:bg-[#0096c4] hover:text-white">
                                <MdOutlineEdit
                                  onClick={() => handleEditClick(task)}
                                  size={30}
                                  className="cursor-pointer hover:text-white p-1"
                                />
                              </div>
                              <div className="hidden lg:block rounded-full hover:bg-red-500 hover:text-white">
                                <MdDeleteForever
                                  onClick={() => handleTaskDelete(task.id)}
                                  size={30}
                                  className="cursor-pointer p-1 text-red-500 hover:text-white"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Reorder.Item>
                    ))
                    : ""}
                </Reorder.Group>
              </div>
              <div className="h-[70vh] w-80 overflow-auto lg:w-[33.3%] rounded-xl bg-black/10">
                <p className="text-center font-semibold flex flex-col py-2">
                  Done<span className="w-full h-1 bg-green-500"></span>
                </p>
                <Reorder.Group values={done} onReorder={setDone}>
                  {done.length > 0
                    ? done.map((task) => (
                      <Reorder.Item value={task} key={task?.id}>
                        <div
                          key={task?.id}
                          className="bg-white shadow rounded-lg p-1 md:p-2 flex flex-col gap-2 text-xs md:text-sm text-[#0096c4] mx-2 mb-2"
                        >
                          <p>
                            Title:{" "}
                            <span className="text-[#777]">{task?.title}</span>
                          </p>
                          <p>
                            Description:{" "}
                            <span className="text-[#777]">
                              {task?.description}
                            </span>
                          </p>
                          <p>
                            Assigned to:{" "}
                            <span className="text-[#777]">
                              {task?.assignTo}
                            </span>
                          </p>
                          <p>
                            Due date:{" "}
                            <span className="text-[#777]">{task?.date}</span>
                          </p>
                          <div className="flex justify-between">
                            <p>
                              Status:{" "}
                              <span className="text-green-500 font-bold">
                                {task?.status}
                              </span>
                            </p>
                            <div className="flex items-center flex-wrap md:flex-nowrap lg:gap-2">
                              <MdOutlineEdit
                                onClick={() => handleEditClick(task)}
                                size={20}
                                className="cursor-pointer lg:hidden hover:text-white p-1"
                              />
                              <MdDeleteForever
                                onClick={() => handleTaskDelete(task.id)}
                                size={20}
                                className="cursor-pointer p-1 text-red-500 hover:text-white lg:hidden"
                              />
                              <div className="hidden lg:block rounded-full hover:bg-[#0096c4] hover:text-white">
                                <MdOutlineEdit
                                  onClick={() => handleEditClick(task)}
                                  size={30}
                                  className="cursor-pointer hover:text-white p-1"
                                />
                              </div>
                              <div className="hidden lg:block rounded-full hover:bg-red-500 hover:text-white">
                                <MdDeleteForever
                                  onClick={() => handleTaskDelete(task.id)}
                                  size={30}
                                  className="cursor-pointer p-1 text-red-500 hover:text-white"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Reorder.Item>
                    ))
                    : ""}
                </Reorder.Group>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        <Modal show={showCreateTask} onClose={() => setShowCreateTask(false)}>
          <CreateTask onClose={() => setShowCreateTask(false)} />
        </Modal>
      }
      {
        <Modal show={showEditTask} onClose={() => setShowEditTask(false)}>
          <EditTask task={currentTask} onClose={() => setShowEditTask(false)} />
        </Modal>
      }
    </>
  );
};

export default ViewProject;
