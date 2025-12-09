import React, { useState } from "react";
import axios from "../../api/axios";

const ContactForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await axios.post("/contacts", form);
    
      setMessage("Submitted successfully!");
      setForm({ fullName: "", email: "", mobile: "", city: "" });
    } catch (err) {
      setMessage("Submission failed! Please try again.");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-md mx-auto rounded-xl shadow-xl p-8 bg-blue-900 bg-opacity-80 border border-white text-white backdrop-blur-[6px] space-y-5"
      aria-label="Get a Free Consultation Form"
      style={{ backdropFilter: "saturate(180%) blur(10px)" }}
    >
      <h2 className="font-bold text-2xl text-center mb-2 tracking-wide drop-shadow">
        Get a Free Consultation
      </h2>

      <input
        className="w-full rounded border border-white bg-transparent px-3 py-2 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
        placeholder="Full Name"
        name="fullName"
        type="text"
        value={form.fullName}
        onChange={handleChange}
        required
        autoComplete="off"
      />

      <input
        className="w-full rounded border border-white bg-transparent px-3 py-2 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
        placeholder="Enter Email Address"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
        autoComplete="off"
      />

      <input
        className="w-full rounded border border-white bg-transparent px-3 py-2 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
        placeholder="Mobile Number"
        name="mobile"
        type="tel"
        value={form.mobile}
        onChange={handleChange}
        required
        autoComplete="off"
      />

      <input
        className="w-full rounded border border-white bg-transparent px-3 py-2 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
        placeholder="Area, City"
        name="city"
        type="text"
        value={form.city}
        onChange={handleChange}
        required
        autoComplete="off"
      />

      <button
        type="submit"
        className="w-full bg-orange-600 hover:bg-orange-700 rounded text-white font-semibold py-2 text-base transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Get Quick Quote"}
      </button>

      {message && (
        <div
          className={`text-center mt-2 font-medium ${
            message.includes("success") ? "text-green-300" : "text-red-300"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default ContactForm;
