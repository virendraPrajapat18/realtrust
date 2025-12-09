import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { FaRegCopy } from "react-icons/fa";

const Subscribers = () => {
  const [subs, setSubs] = useState([]);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    axios.get("/subscribers").then((res) => setSubs(res.data));
  }, []);

  const handleCopy = (email) => {
    navigator.clipboard.writeText(email);
    setCopied(email);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-800">
          Newsletter Subscribers
        </h2>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
          {subs.length} Subscriber{subs.length !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-blue-50 text-blue-800">
              <th className="py-3 px-4 text-left font-semibold">
                Email Address
              </th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {subs.length === 0 && (
              <tr>
                <td className="py-4 px-4 text-gray-400 text-center" colSpan={2}>
                  No subscribers yet.
                </td>
              </tr>
            )}
            {subs.map((s) => (
              <tr key={s._id} className="border-b hover:bg-blue-50 transition">
                <td className="py-3 px-4 text-gray-700">{s.email}</td>
                <td className="py-3 px-4">
                  <button
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
                    onClick={() => handleCopy(s.email)}
                  >
                    <FaRegCopy />
                    <span className="text-xs">
                      {copied === s.email ? "Copied!" : "Copy"}
                    </span>
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

export default Subscribers;
