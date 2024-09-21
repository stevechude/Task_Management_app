"use client";
import Empty from "@/components/empty/Empty";
import { Modal } from "@/components/modal/Modal";
import CreateProject from "@/components/project/CreateProject";
import { getStoredProjects } from "@/hooks/getProjectList";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import Loader from "@/components/loader/Loader";
import { setProjectList } from "@/redux/features/projects/projectSlice";
import Link from "next/link";

export default function Home() {
  const { projectList } = useAppSelector((state) => state.projects);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);
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
  }, [projectList]);

  console.log("log projects==", projectList);

  return (
    <>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-3 text-white bg-[#0096c4] rounded-xl py-2 px-4 self-end font-semibold mt-1"
        >
          <MdOutlineAddBox size={25} />
          <p>New project</p>
        </button>
        <div className="flex flex-wrap justify-evenly gap-4 lg:gap-6 my-4">
          {loading ? (
            <Loader />
          ) : projectList?.length > 0 ? (
            projectList?.map((proj, i) => (
              <div
                key={proj?.id}
                style={{ boxShadow: "0px 0px 15px 2px #ccc" }}
                className="bg-white text-[#333] flex flex-col gap-3 rounded-lg max-w-full min-w-[20rem]"
              >
                <div className="flex flex-col gap-2 p-4">
                  <p>
                    Project: <span>{proj.title}</span>
                  </p>
                  <p>
                    Created By: <span>{proj.createdBy}</span>
                  </p>
                </div>
                <Link
                  href={`/${proj.id}`}
                  className="flex self-center items-center gap-2 text-white bg-gradient-to-r from-[#8168d4] to-[#41a4c8] rounded-3xl py-1.5 px-4 font-semibold w-fit m-4"
                >
                  View Project
                </Link>
              </div>
            ))
          ) : (
            <Empty click={() => setShowCreate(true)} />
          )}
        </div>
      </div>
      {
        <Modal show={showCreate} onClose={() => setShowCreate(false)}>
          <CreateProject closeModal={() => setShowCreate(false)} />
        </Modal>
      }
    </>
  );
}
