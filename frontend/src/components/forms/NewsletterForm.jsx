import React, { useState } from "react";
import axios from "../../api/axios";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || submitting) return;

    setSubmitting(true);
    setMessage("");
    setError("");

    try {
      const res = await axios.post("/subscribers", { email });
      setMessage(res.data.message || "Subscribed successfully!");
      setEmail("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-[#1e75ff] py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
        {/* LEFT MENU LINKS */}
        <ul className="flex flex-wrap gap-8 text-white text-base font-medium">
          <li>
            <a href="#home" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="#services" className="hover:underline">
              Services
            </a>
          </li>
          <li>
            <a href="#projects" className="hover:underline">
              Projects
            </a>
          </li>
          <li>
            <a href="#testimonials" className="hover:underline">
              Testimonials
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>

        {/* RIGHT SUBSCRIBE AREA */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-4 bg-white p-1 rounded-lg shadow-md"
        >
          <span className="text-white lg:hidden font-semibold">
            Subscribe Us
          </span>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address"
            required
            disabled={submitting}
            className="flex-grow lg:w-72 px-3 py-2 rounded outline-none border-none text-gray-800"
          />

          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2 rounded transition"
          >
            {submitting ? "Subscribing…" : "Subscribe"}
          </button>
        </form>
      </div>

      {/* FEEDBACK */}
      {message && (
        <p className="text-center text-green-200 font-medium mt-3">{message}</p>
      )}
      {error && (
        <p className="text-center text-red-200 font-medium mt-3">{error}</p>
      )}
    </section>
  );
}
