import React, { useState, useEffect } from "react";
import axios from "../../api/axios";

/* Convert file → base64 */
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    designation: "",
    description: "",
    image: null, // base64 string
  });
  const [preview, setPreview] = useState(null); // image preview blob
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  // Fetch all clients
  const fetchClients = async () => {
    const { data } = await axios.get("/clients");
    setClients(data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Input change handler
  const handleChange = async (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      if (file) {
        const base64 = await fileToBase64(file);
        setForm((prev) => ({ ...prev, image: base64 }));
        setPreview(URL.createObjectURL(file));
      }
      return;
    }

    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Edit handler
  const handleEdit = (c) => {
    setForm({
      name: c.name,
      designation: c.designation,
      description: c.description,
      image: null, // user must upload new image (same as project logic)
    });
    setPreview(null);
    setEditingId(c._id);
  };

  // Delete handler
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/clients/${id}`);
      await fetchClients();
      setStatusMsg({ type: "success", text: "Client deleted successfully." });
    } catch (err) {
      
      setStatusMsg({ type: "error", text: "Failed to delete client." });
    }
  };

  // Reset form
  const resetForm = () => {
    setForm({ name: "", designation: "", description: "", image: null });
    setPreview(null);
    setEditingId(null);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg({ type: "", text: "" });

    try {
      const payload = {
        name: form.name,
        designation: form.designation,
        description: form.description,
      };

      if (form.image) payload.image = form.image;


  
      if (editingId) {
        await axios.put(`/clients/${editingId}`, payload);
        setStatusMsg({ type: "success", text: "Client updated successfully." });
      } else {
       
        
        await axios.post("/clients", payload);
        setStatusMsg({ type: "success", text: "Client added successfully." });
      }

      await fetchClients();
      resetForm();
    } catch (err) {
      console.error("Upload failed:", err);
      setStatusMsg({ type: "error", text: "Failed to save client." });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">
        {editingId ? "Edit Client" : "Manage Clients"}
      </h2>

      {/* Status Message */}
      {statusMsg.text && (
        <div
          className={`mb-4 px-4 py-2 rounded text-sm font-medium ${
            statusMsg.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-700"
          }`}
        >
          {statusMsg.text}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 mb-10 space-y-4"
      >
        <h3 className="text-lg font-semibold text-gray-700">
          {editingId ? "Update Client" : "Add New Client"}
        </h3>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Client Name"
          className="w-full p-3 border rounded"
          required
        />

        <input
          name="designation"
          value={form.designation}
          onChange={handleChange}
          placeholder="Designation"
          className="w-full p-3 border rounded"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Client Description"
          rows={3}
          className="w-full p-3 border rounded"
          required
        />

        <label className="block">
          <span className="text-sm text-gray-600">Client Image</span>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required={!editingId}
            className="mt-1 block w-full"
          />
        </label>

        {/* Image Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-20 h-20 rounded-full object-cover shadow mb-2"
          />
        )}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded font-semibold"
          >
            {loading
              ? editingId
                ? "Updating..."
                : "Adding..."
              : editingId
              ? "Update"
              : "Add Client"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-red-500 font-medium"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Clients Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-blue-50 text-blue-800">
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Designation</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((c) => (
              <tr key={c._id} className="border-b">
                <td className="py-3 px-4">
                  {c.imageUrl ? (
                    <img
                      src={c.imageUrl}
                      className="w-14 h-14 rounded-full object-cover"
                      alt={c.name}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="py-3 px-4">{c.name}</td>
                <td className="py-3 px-4">{c.designation}</td>
                <td className="py-3 px-4">{c.description}</td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={() => handleEdit(c)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clients;
