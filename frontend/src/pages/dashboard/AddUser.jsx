import React, { useEffect, useState } from "react";
import { FaUserPlus, FaTrashAlt } from "react-icons/fa";
import { register, getAllUsers, deleteUser } from "../../api/authService";

const AddUser = () => {
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    password: "",
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res);
    } catch {
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await register(form.fullname, form.username, form.password);
      setMessage("User added successfully!");
      setForm({ fullname: "", username: "", password: "" });
      fetchUsers();
    } catch {
      setMessage("Failed to add user.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      fetchUsers();
    } catch {
      alert("Failed to delete user");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center p-6">
      {/* User Creation Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/80 backdrop-blur rounded-2xl shadow-xl p-10 mb-12 border border-blue-100"
      >
        <h2 className="text-2xl font-extrabold flex items-center mb-8 text-blue-700 drop-shadow">
          <FaUserPlus className="mr-2 text-blue-600" />
          Add New Admin
        </h2>

        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={form.fullname}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full mb-6 p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow transition-all duration-200 disabled:opacity-60"
        >
          {loading ? "Adding…" : "Add Admin"}
        </button>

        {/* Styled Success/Error Message */}
        {message && (
          <div
            className={`mt-6 text-center text-base font-medium px-4 py-2 rounded-lg shadow ${
              message.toLowerCase().includes("success")
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}
      </form>

      {/* User List */}
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-blue-100 p-8">
        <h3 className="text-xl font-bold mb-6 text-blue-700 flex items-center">
          Active Admin Users
        </h3>
        {users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-t">
              <thead>
                <tr className="text-left border-b text-sm text-blue-700">
                  <th className="py-2 font-semibold">Full Name</th>
                  <th className="py-2 font-semibold">Username</th>
                  <th className="py-2 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b text-sm hover:bg-blue-50 transition"
                  >
                    <td className="py-2">{user.fullname}</td>
                    <td className="py-2">{user.username}</td>
                    <td className="py-2 text-center">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-600 hover:text-red-800 transition p-2 rounded-full hover:bg-red-50"
                        title="Delete User"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddUser;
