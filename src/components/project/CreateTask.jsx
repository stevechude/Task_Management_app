"use client";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect, useRef, useState } from 'react'
import { setProjectList } from '@/redux/features/projects/projectSlice';
import { Calendar } from "react-date-range";
import { format } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useForm } from 'react-hook-form';
import { FaAngleDown } from "react-icons/fa6";
import { usePathname } from 'next/navigation';

const CreateTask = () => {
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onChange",
    });
    const { projectList } = useAppSelector((state) => state.projects);
    const [loading, setLoading] = useState(false);
    const [calendar, setCalendar] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [taskId] = useState(0)
    const dispatch = useAppDispatch();
    const calendarRef = useRef(null);
    const path = usePathname();
    const projectId = path.substring(path.lastIndexOf("/") + 1);

    useEffect(() => {
        setCalendar(format(new Date(), "dd-MM-yyyy"));

        document.addEventListener("keydown", hideOnEscape, true);
        document.addEventListener("click", hideOnClickOutside, true);
    }, [])

    const handleSelectDate = (date) => {
        setCalendar(format(date, "dd-MM-yyyy"));
        setOpenDate(false);
    };

    const addTaskHandler = (data) => {
        setLoading(true);
        const findProject = projectList?.find((pr) => pr?.id == projectId);
        console.log('show id==', projectId)

        if (!findProject) {
            console.log("Project not found!");
            setLoading(false);
            return;
        }

        console.log('Found project:', findProject);

        const body = {
            id: taskId + 1,
            data
        }

        const updatedProject = {
            ...findProject,
            tasks: [...findProject.tasks, body]
        };

        const updatedProjectList = projectList.map((proj) =>
            proj.id == projectId ? updatedProject : proj
        );

        setTimeout(() => {
            dispatch(setProjectList(updatedProjectList));

            localStorage.setItem("storedProjects", JSON.stringify(updatedProjectList));

            console.log("Project list updated in localStorage:", updatedProjectList);

            setLoading(false);
            reset()
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
        <div className="bg-white p-8 rounded-xl w-[80vw] md:w-[50vw] lg:w-[25rem]">
            <div className="flex flex-col items-center gap-8">
                <h4 className="text-[#575D72] text-base lg:text-lg font-semibold">
                    Create New Task
                </h4>

                <form
                    onSubmit={handleSubmit(addTaskHandler)}
                    className="flex flex-col items-center gap-4 text-sm md:text-base"
                >
                    <div className="flex flex-col">
                        <label className="text-[#0096c4]">Task Title:</label>
                        <input
                            type="text"
                            {...register("title", { required: true })}
                            placeholder="Title"
                            className="border border-[#6C748B] rounded-md pl-2 py-3 w-[70vw] md:w-72 text-[#6C748B] text-sm lg:text-base"
                        />
                        {
                            errors.title && (
                                <span className="text-red-600 py-0.5 text-xs">
                                    Title is required
                                </span>
                            )
                        }
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[#0096c4]">Description:</label>
                        <textarea {...register("description", { required: true })} placeholder='Describe the task here...' name="description" id="description" cols={2} className='border border-[#6C748B] rounded-md pl-2 py-3 w-[70vw] md:w-72 text-[#6C748B] text-sm lg:text-base' />
                        {
                            errors.description && (
                                <span className="text-red-600 py-0.5 text-xs">
                                    Description is required
                                </span>
                            )
                        }
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
                                    value={calendar}
                                    {...register("date", { required: true })}
                                    readOnly
                                    className="w-[90%] h-full outline-none"
                                />
                                <FaAngleDown />
                            </div>
                            {openDate && (
                                <div
                                    ref={calendarRef}
                                    className="absolute left-0 right-0"
                                >
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
                            {...register("assignTo", { required: true })}
                            placeholder="Enter name"
                            className="border border-[#6C748B] rounded-md pl-2 py-3 w-[70vw] md:w-72 text-[#6C748B] text-sm lg:text-base"
                        />
                        {
                            errors.assignTo && (
                                <span className="text-red-600 py-0.5 text-xs">
                                    Assign this task
                                </span>
                            )
                        }
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[#0096c4]">Status:</label>
                        <select {...register("status", { required: true })} name="status" id="status" className="border border-[#6C748B] rounded-md pl-2 py-3 w-[70vw] md:w-72 text-[#6C748B] text-sm lg:text-base">
                            <option value="">pick status</option>
                            <option value="To do">To do</option>
                            <option value="In progress">In progress</option>
                            <option value="Done">Done</option>
                        </select>
                        {
                            errors.status && (
                                <span className="text-red-600 py-0.5 text-xs">
                                    Status is required``
                                </span>
                            )
                        }
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting || loading}
                        className="flex items-center justify-center text-white bg-[#0096c4] rounded-2xl py-1.5 px-4 font-semibold w-36"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateTask