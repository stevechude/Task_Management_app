import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./features/projects/projectSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      projects: projectReducer,
    },
  });
};
