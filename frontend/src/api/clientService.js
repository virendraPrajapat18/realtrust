import axios from "./axios";

export const fetchClients = async () => {
  const res = await axios.get("/clients");
  return res.data;
};

export const addClient = async (data) => {
  const res = await axios.post("/clients", data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const updateClient = async (id, data) => {
  const res = await axios.put(`/clients/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const deleteClient = async (id) => {
  const res = await axios.delete(`/clients/${id}`);
  return res.data;
};
