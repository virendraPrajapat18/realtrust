
import React, { useState, useEffect } from "react";
import {
  fetchProjects,
  addProject,
  updateProject,
  deleteProject,
} from "../../api/projectService";


const initialFormState = {
  projectName: "",
  description: "",
  location: "",
  category: "",
  image: null,
};

const Projects = () => {

  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

 
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      if (file) {
        setForm((prev) => ({ ...prev, image: file }));
      }
    } else {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const resetForm = () => {
    setForm(initialFormState);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    /* Build multipart body */
    const fd = new FormData();
    Object.keys(form).forEach((key) => {
      if (key === "image" && !form.image) return;
      if (form[key]) fd.append(key, form[key]);
    });

    if (editingId) {
      await updateProject(editingId, fd);
    } else {
      await addProject(fd);
    }

    await fetchProjects().then(setProjects);
    resetForm();
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    await deleteProject(id);
    setProjects((prev) => prev.filter((p) => p._id !== id));
  };

  const handleEdit = (project) => {
    setForm({
      projectName: project.projectName,
      description: project.description,
      location: project.location,
      category: project.category,
      image: null,
    });
    setEditingId(project._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

 
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Manage Projects</h2>

 
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 mb-10 space-y-4"
      >
        <h3 className="text-lg font-semibold text-gray-700">
          {editingId ? "Update Project" : "Add New Project"}
        </h3>

        <input
          name="projectName"
          value={form.projectName}
          onChange={handleChange}
          placeholder="Project Name"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Project Description"
          rows={3}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          required
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <label className="block">
          <span className="text-sm text-gray-600">Upload Project Image</span>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required={!editingId}
            className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </label>

        {form.image && (
          <div className="mb-2">
            <img
              src={URL.createObjectURL(form.image)}
              alt="Project Preview"
              className="w-36 h-28 object-cover rounded shadow"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading
            ? editingId
              ? "Updating..."
              : "Adding..."
            : editingId
            ? "Update Project"
            : "Add Project"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className="ml-4 bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded font-semibold transition"
          >
            Cancel Edit
          </button>
        )}
      </form>

    
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-blue-50 text-blue-800">
              <th className="py-3 px-4 text-left font-semibold">Image</th>
              <th className="py-3 px-4 text-left font-semibold">Name</th>
              <th className="py-3 px-4 text-left font-semibold">Description</th>
              <th className="py-3 px-4 text-left font-semibold">Location</th>
              <th className="py-3 px-4 text-left font-semibold">Category</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 && (
              <tr>
                <td colSpan={6} className="py-4 px-4 text-gray-400 text-center">
                  No projects found.
                </td>
              </tr>
            )}

            {projects.map((p) => (
              <tr key={p._id} className="border-b hover:bg-blue-50 transition">
                <td className="py-3 px-4">
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt={p.projectName}
                      className="w-20 h-16 object-cover rounded shadow"
                    />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </td>
                <td className="py-3 px-4 text-gray-800 font-semibold">
                  {p.projectName}
                </td>
                <td className="py-3 px-4 text-gray-700">{p.description}</td>
                <td className="py-3 px-4 text-gray-700">{p.location}</td>
                <td className="py-3 px-4 text-gray-700">{p.category}</td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
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

export default Projects;