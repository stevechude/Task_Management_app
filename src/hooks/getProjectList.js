export const getStoredProjects = () => {
  if (typeof window !== "undefined") {
    const projects = localStorage.getItem("storedProjects");
    return projects ? JSON.parse(projects) : [];
  }
  return [];
};
