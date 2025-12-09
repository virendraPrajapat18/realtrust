import axios from "./axios";

export const fetchProjects = async () => {
  const res = await axios.get("/projects");
  return res.data;
};

export const fetchProjectById = async (id) => {
  const res = await axios.get(`/projects/${id}`);
  return res.data;
};

export const addProject = async (formData) => {
  const res = await axios.post("/projects", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateProject = async (id, formData) => {
  const res = await axios.put(`/projects/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await axios.delete(`/projects/${id}`);
  return res.data;
};
