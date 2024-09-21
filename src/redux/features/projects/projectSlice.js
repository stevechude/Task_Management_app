import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectList: [],
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.projectList = [...state.projectList, action.payload];
    },
    setProjectList: (state, action) => {
      state.projectList = action.payload;
    },
  },
});

export const { setProjectList, addProject } = projectSlice.actions;

export default projectSlice.reducer;
