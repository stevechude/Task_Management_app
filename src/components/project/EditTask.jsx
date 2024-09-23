"use client";
import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "react-date-range";
import { format } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FaAngleDown } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setProjectList } from "@/redux/features/projects/projectSlice";
import { usePathname } from "next/navigation";

const EditTask = ({ task, onClose }) => {
  const { projectList } = useAppSelector((state) => state.projects);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(task?.date || "");
  const [assignedTo, setAssignedTo] = useState(task?.assignTo || "");
  const [status, setStatus] = useState(task?.status || "");
  const [openDate, setOpenDate] = useState(false);
  const calendarRef = useRef(null);
  const path = usePathname();
  const projectId = path.substring(path.lastIndexOf("/") + 1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // setCalendar(format(new Date(), "dd-MM-yyyy"));

    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const handleSelectDate = (date) => {
    setDueDate(format(date, "dd-MM-yyyy"));
    setOpenDate(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate task data before proceeding
    if (!title || !description || !dueDate || !assignedTo || !status) {
      console.error("All task fields must be filled!");
      setLoading(false);
      return;
    }

    const updatedTask = {
      ...task,
      title,
      description,
      date: dueDate,
      assignTo: assignedTo,
      status,
    };

    // Safely handle null or undefined projectList
    if (!Array.isArray(projectList)) {
      console.error("Project list is invalid or undefined.");
      setLoading(false);
      return;
    }
    console.log("updated task body==", updatedTask, projectList);

    const updatedProjectList = projectList.map((project) => {
      if (project.id == projectId) {
        console.log("show proj in upd==", project);
        // Ensure project has tasks array before mapping
        const updatedTasks = Array.isArray(project.tasks)
          ? project.tasks.map((t) => (t.id == task.id ? updatedTask : t))
          : [updatedTask];

        return {
          ...project,
          tasks: updatedTasks,
        };
      }
      return project;
    });

    console.log("Updated project list==", updatedProjectList);

    setTimeout(() => {
      // Dispatch an action to update the entire project list in Redux
      dispatch(setProjectList(updatedProjectList));

      // Safely update localStorage
      localStorage.setItem(
        "storedProjects",
        JSON.stringify(updatedProjectList)
      );

      console.log("Project list updated in localStorage:", updatedProjectList);

      // Close the modal
      onClose();
      setLoading(false);
    }, 2000);
  };

  const hideOnEscape = (e) => {
    if (e.key === "Escape") setOpenDate(false);
  };

  const hideOnClickOutside = (e) => {
    if (calendarRef.current && !calendarRef.current.contains(e.target)) {
      setOpenDate(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl w-[80vw] md:w-[50vw] lg:w-[25rem] overflow-auto">
      <div className="flex flex-col items-center gap-8">
        <h4 className="text-[#575D72] text-base lg:text-lg font-semibold">
          Edit Task
        </h4>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 text-sm md:text-base"
        >
          <div className="flex flex-col">
            <label className="text-[#0096c4]">Task Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="border border-[#6C748B] rounded-md pl-2 py-3 w-[70vw] md:w-72 text-[#6C748B] text-sm lg:text-base"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#0096c4]">Description:</label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the task here..."
              cols={2}
              className="border border-[#6C748B] rounded-md pl-2 py-3 w-[70vw] md:w-72 text-[#6C748B] text-sm lg:text-base"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#0096c4]">Due Date:</label>
            <div className="relative">
              <div
                onClick={() => setOpenDate(!openDate)}
                className="flex items-center gap-3 border border-[#6C748B] rounded-md pl-2 py-3 w-[70vw] md:w-72 text-[#6C748B] text-sm lg:text-base"
              >
                <input
                  type="text"
                  value={dueDate}
                  readOnly
                  className="w-[90%] h-full outline-none"
                />
                <FaAngleDown />
              </div>
              {openDate && (
                <div ref={calendarRef} className="absolute left-0 right-0">
                  <Calendar
                    date={new Date()}
                    onChange={handleSelectDate}
                    className=""
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-[#0096c4]">Assigned To:</label>
            <input
              type="text"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              placeholder="Enter name"
              className="border border-[#6C748B] rounded-md pl-2 py-3 w-[70vw] md:w-72 text-[#6C748B] text-sm lg:text-base"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#0096c4]">Status:</label>
            <select
              name="status"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-[#6C748B] rounded-md pl-2 py-3 w-[70vw] md:w-72 text-[#6C748B] text-sm lg:text-base"
            >
              <option value="">pick status</option>
              <option value="To do">To do</option>
              <option value="In progress">In progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center text-white bg-[#0096c4] rounded-2xl py-1.5 px-4 font-semibold w-36"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
