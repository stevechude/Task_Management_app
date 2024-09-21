import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useState } from 'react'
import { setProjectList } from '@/redux/features/projects/projectSlice';

const CreateTask = ({ projectId }) => {
    const { projectList } = useAppSelector((state) => state.projects);
    const [loading, setLoading] = useState(false);
    // data fields
    const [taskTitle, setTaskTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [assignTo, setAssignTo] = useState("");
    const [status, setStatus] = useState("");
    const dispatch = useAppDispatch();

    const addTaskHandler = (e) => {
        e.preventDefault();
        setLoading(true);

        const findProject = projectList?.find((pr) => pr?.id === projectId);

        const newTask = {
            title: "New Task Title",
            description: "Task Description",
            date: "Due Date",
            assignTo: "Person",
            status: "To do"
        };

        if (findProject) {
            const updatedProject = {
                ...findProject,
                tasks: [...findProject.tasks, newTask],
            };

            const updatedProjectList = projectList.map((proj) =>
                proj.id === projectId ? updatedProject : proj
            );

            setTimeout(() => {
                dispatch(setProjectList(updatedProjectList));

                localStorage.setItem("storedProjects", JSON.stringify(updatedProjectList));
                setLoading(false);
            }, 2000);
        }
    };


    return (
        <div className="bg-white p-8 rounded-xl w-[80vw] md:w-[50vw] lg:w-[25rem]">
            <div className="flex flex-col items-center gap-8">
                <h4 className="text-[#575D72] text-base lg:text-lg font-semibold">
                    Create New Task
                </h4>

                <form
                    onSubmit={addTaskHandler}
                    className="flex flex-col items-center gap-4 text-sm md:text-base"
                >
                    <div className="flex flex-col">
                        <label className="text-[#0096c4]">Task Title:</label>
                        <input
                            type="text"
                            placeholder="Title"
                            className="border border-[#6C748B] rounded-md pl-4 py-3 w-[70vw] md:w-72 text-[#6C748B] text-sm lg:text-base"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[#0096c4]">Description:</label>
                        <textarea placeholder='Describe the task here...' name="desc" id="desc" cols={2} className='border border-[#6C748B] rounded-md pl-4 py-3 w-[70vw] md:w-72 text-[#6C748B] text-sm lg:text-base' />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[#0096c4]">Due Date:</label>
                        <input
                            type="text"
                            placeholder="Date"
                            className="border border-[#6C748B] rounded-md pl-4 py-3 w-[70vw] md:w-72 text-[#6C748B] text-sm lg:text-base"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[#0096c4]">Assigned To:</label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            className="border border-[#6C748B] rounded-md pl-4 py-3 w-[70vw] md:w-72 text-[#6C748B] text-sm lg:text-base"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[#0096c4]">Status:</label>
                        <select name="status" id="status" className="border border-[#6C748B] rounded-md pl-4 py-3 w-[70vw] md:w-72 text-[#6C748B] text-sm lg:text-base">
                            <option value="">pick status</option>
                            <option value="">To do</option>
                            <option value="">In progress</option>
                            <option value="">Done</option>
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
    )
}

export default CreateTask