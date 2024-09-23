"use client";
import { addProject } from "@/redux/features/projects/projectSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useState } from "react";

const CreateProject = ({ closeModal }) => {
  const { projectList } = useAppSelector((state) => state.projects);
  const [projectTitle, setProjectTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [loading, setLoading] = useState(false);
  const [titleErr, setTitleErr] = useState("");
  const [byErr, setByErr] = useState("");
  const dispatch = useAppDispatch();

  /* function to add project to the list */
  const addProjectHandler = (e) => {
    e.preventDefault();
    if (!projectTitle) {
      setTitleErr("title is required");
      return;
    }
    if (!owner) {
      setByErr("owner is required");
      return;
    }

    if (projectTitle && owner) {
      setTitleErr("");
      setByErr("");

      setLoading(true);

      const newProject = {
        id: projectList.length + 1,
        title: projectTitle,
        createdBy: owner,
        tasks: [],
      };

      setTimeout(() => {
        dispatch(addProject(newProject));
        setLoading(false);
        setProjectTitle("");
        setOwner("");
        closeModal();
      }, 2000);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl w-[80vw] md:w-[50vw] lg:w-[25rem]">
      <div className="flex flex-col items-center gap-8">
        <h4 className="text-[#575D72] text-base lg:text-lg font-semibold">
          Create New Project
        </h4>
        <form
          onSubmit={addProjectHandler}
          className="flex flex-col items-center gap-4 text-sm md:text-base"
        >
          <div className="flex flex-col">
            <label className="text-[#3D414F]">Project Title:</label>
            <input
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              type="text"
              placeholder="Title"
              className="border border-[#6C748B] rounded-md pl-4 py-3 w-[70vw] md:w-72 text-[#6C748B] text-sm lg:text-base"
            />
            {titleErr && (
              <span className="text-red-500 text-xs">{titleErr}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-[#3D414F]">Managed By:</label>
            <input
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              type="text"
              placeholder="Jack dorsey"
              className="border border-[#6C748B] rounded-md pl-4 py-3 w-[70vw] md:w-72 text-[#6C748B] text-sm lg:text-base"
            />
            {byErr && <span className="text-red-500 text-xs">{byErr}</span>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 text-white bg-[#0096c4] rounded-2xl py-1.5 px-4 font-semibold w-fit"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
