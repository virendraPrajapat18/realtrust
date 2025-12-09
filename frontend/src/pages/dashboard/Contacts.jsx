import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios.get("/contacts").then((res) => setContacts(res.data));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">
        Contact Form Submissions
      </h2>
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-orange-50 text-orange-800">
              <th className="py-3 px-4 text-left font-semibold">Name</th>
              <th className="py-3 px-4 text-left font-semibold">Email</th>
              <th className="py-3 px-4 text-left font-semibold">Mobile</th>
              <th className="py-3 px-4 text-left font-semibold">City</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-4 px-4 text-gray-400 text-center">
                  No contact submissions yet.
                </td>
              </tr>
            ) : (
              contacts.map((c) => (
                <tr
                  key={c._id}
                  className="border-b hover:bg-orange-50 transition"
                >
                  <td className="py-3 px-4 text-gray-800 font-semibold">
                    {c.fullName}
                  </td>
                  <td className="py-3 px-4">
                    <a
                      href={`mailto:${c.email}`}
                      className="text-blue-700 hover:underline"
                    >
                      {c.email}
                    </a>
                  </td>
                  <td className="py-3 px-4">
                    <a
                      href={`tel:${c.mobile}`}
                      className="text-blue-700 hover:underline"
                    >
                      {c.mobile}
                    </a>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{c.city}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contacts;
