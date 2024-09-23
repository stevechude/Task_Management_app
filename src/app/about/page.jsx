"use client";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineMinus } from "react-icons/ai";

const AboutPage = () => {
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [fourth, setFourth] = useState(false);

  return (
    <div className="bg-white h-[90vh] rounded-xl overflow-auto">
      <div className="p-2 md:p-4 lg:p-8 flex flex-col gap-4 items-center w-full">
        <h1 className="text-xl md:text-2xl lg:text-3xl text-center">
          Frequently asked Questions
        </h1>
        <div className="flex flex-col gap-8 items-center w-full">
          <div
            style={{ boxShadow: "0px 0px 15px 2px #ccc" }}
            className="bg-white rounded-lg w-full md:w-[60%] lg:w-[50%]"
          >
            <div className="flex items-center justify-between text-lg md:text-xl lg:text-2xl">
              <p className="ml-2 py-2">What is Task Mgt App?</p>
              <div className="mr-2 cursor-pointer">
                {first ? (
                  <AiOutlineMinus onClick={() => setFirst(false)} size={35} />
                ) : (
                  <IoMdAdd onClick={() => setFirst(true)} size={35} />
                )}
              </div>
            </div>
            {first && (
              <div className="bg-white shadow">
                <p className="p-2 text-sm md:text-base">
                  This app is called{" "}
                  <span className="text-black font-bold">
                    "Task Management App"
                  </span>
                  , it functions like a project management tool that allows user
                  to access a dashboard where they can create multiple projects.
                  Each project can be view individually and a series of tasks
                  can be created with a due date and assigned to anyone and have
                  its progress monitored.
                </p>
              </div>
            )}
          </div>
          {/* 2 */}
          <div
            style={{ boxShadow: "0px 0px 15px 2px #ccc" }}
            className="bg-white rounded-lg w-full md:w-[60%] lg:w-[50%]"
          >
            <div className="flex items-center justify-between text-lg md:text-xl lg:text-2xl">
              <p className="ml-2 py-2">Why use Task Mgt App?</p>
              <div className="mr-2 cursor-pointer">
                {second ? (
                  <AiOutlineMinus onClick={() => setSecond(false)} size={35} />
                ) : (
                  <IoMdAdd onClick={() => setSecond(true)} size={35} />
                )}
              </div>
            </div>
            {second && (
              <div className="bg-white shadow">
                <p className="p-2 text-sm md:text-base flex flex-col gap-2">
                  <span className="border-b border-black">
                    <span className="text-black font-semibold">
                      Organized Project Tracking:
                    </span>{" "}
                    Task Management App helps users stay organized by offering a
                    structured way to manage projects. It centralizes tasks and
                    deadlines, making it easier to track progress and ensure
                    that nothing is overlooked.
                  </span>
                  <span className="border-b border-black">
                    <span className="text-black font-semibold">
                      Collaboration Made Simple:
                    </span>{" "}
                    Users can assign tasks to team members, track their
                    progress, and set deadlines. This makes collaboration
                    seamless, especially in team projects, ensuring
                    accountability and transparency.
                  </span>
                  <span className="border-b border-black">
                    <span className="text-black font-semibold">
                      Increased Productivity:
                    </span>{" "}
                    By breaking down large projects into manageable tasks and
                    monitoring progress, users can focus on completing tasks
                    efficiently, leading to improved productivity and time
                    management.
                  </span>
                  <span className="border-b border-black">
                    <span className="text-black font-semibold">
                      Customizable for Any Project:
                    </span>{" "}
                    Whether it's a simple to-do list or a complex multi-step
                    project, Task Management App offers flexibility to
                    accommodate different project types and scales.
                  </span>
                  <span>
                    <span className="text-black font-semibold">
                      Monitor Task Progress:
                    </span>{" "}
                    Users can track the status of each task in real-time,
                    helping them identify bottlenecks and focus on areas that
                    need attention.
                  </span>
                </p>
              </div>
            )}
          </div>
          {/* 3 */}
          <div
            style={{ boxShadow: "0px 0px 15px 2px #ccc" }}
            className="bg-white rounded-lg w-full md:w-[60%] lg:w-[50%]"
          >
            <div className="flex items-center justify-between text-lg md:text-xl lg:text-2xl">
              <p className="ml-2 py-2">Who created Task Mgt App?</p>
              <div className="mr-2 cursor-pointer">
                {third ? (
                  <AiOutlineMinus onClick={() => setThird(false)} size={35} />
                ) : (
                  <IoMdAdd onClick={() => setThird(true)} size={35} />
                )}
              </div>
            </div>
            {third && (
              <div className="bg-white shadow">
                <p className="p-2 text-sm md:text-base">
                  This app was developed by{" "}
                  <span className="text-black font-bold">Steve Chude</span>.
                  <br />
                  <span>
                    A proactive, smart, driven software engineer with 5 years of
                    development experience. I have developed software solutions
                    for business use cases from conceptualization to deployment.
                    Proficient in React.Js, Next.Js, JavaScript and TypeScript.
                    Softwares i have built includes Fintech Payment Website,
                    Health Tech solution, logistics web app, etc. I have great
                    communication skills, problem solving, decision making and a
                    team player.
                  </span>
                </p>
              </div>
            )}
          </div>
          {/* 4 */}
          <div
            style={{ boxShadow: "0px 0px 15px 2px #ccc" }}
            className="bg-white rounded-lg w-full md:w-[60%] lg:w-[50%]"
          >
            <div className="flex items-center justify-between text-lg md:text-xl lg:text-2xl">
              <p className="ml-2 py-2">
                What are the main features Task Mgt App?
              </p>
              <div className="mr-2 cursor-pointer">
                {fourth ? (
                  <AiOutlineMinus onClick={() => setFourth(false)} size={35} />
                ) : (
                  <IoMdAdd onClick={() => setFourth(true)} size={35} />
                )}
              </div>
            </div>
            {fourth && (
              <div className="bg-white shadow">
                <p className="p-2 text-sm md:text-base flex flex-col gap-2">
                  <span className="border-b border-black">
                    <span className="text-black font-semibold">
                      Project Dashboard:
                    </span>{" "}
                    A central place where users can create and manage multiple
                    projects.
                  </span>
                  <span className="border-b border-black">
                    <span className="text-black font-semibold">
                      Task Creation & Assignment:
                    </span>{" "}
                    Users can create tasks with descriptions, due dates, and
                    assign them to team members.
                  </span>
                  <span className="border-b border-black">
                    <span className="text-black font-semibold">
                      Progress Monitoring:
                    </span>{" "}
                    Track the progress of each task, marking them as "To do",
                    "In progress", or "Done".
                  </span>
                  <span className="border-b border-black">
                    <span className="text-black font-semibold">
                      Due Date Management:
                    </span>{" "}
                    Set deadlines for tasks to ensure timely completion.
                    Individual Project View: Users can view and manage tasks
                    specific to each project in a detailed manner.
                  </span>
                  <span className="border-b border-black">
                    <span className="text-black font-semibold">
                      Collaboration & Teamwork:
                    </span>{" "}
                    Enables teams to collaborate by sharing projects and
                    tracking individual contributions.
                  </span>
                  <span>
                    <span className="text-black font-semibold">
                      Notifications & Reminders:
                    </span>{" "}
                    Keeps users informed of approaching deadlines or changes in
                    task assignments.
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
