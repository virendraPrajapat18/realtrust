import React, { useState, useEffect } from "react";
import ClientCard from "./ClientCard";
import axios from "../../api/axios";

function getCardsPerView() {
  if (window.innerWidth >= 1024) return 4;
  if (window.innerWidth >= 768) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}
const ClientCarousel = () => {
  const [clients, setClients] = useState([]);
  const [current, setCurrent] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());
  useEffect(() => {
    const fetchClients = async () => {
      try {
        console.log("hi");
        
        const res = await axios.get("/clients");
        console.log("res:",res);
        
        setClients(res.data);
      } catch (err) {
        console.error("Failed to load clients:", err);
      }
    };
    fetchClients();
    const handleResize = () => setCardsPerView(getCardsPerView());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, clients.length - cardsPerView);
  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(maxIndex, c + 1));

  return (
    <section className="max-w-7xl mx-auto px-4 py-14 sm:py-20">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h2 className="text-blue-700 font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight">
          Happy Clients
        </h2>
        <div className="w-16 h-1 bg-blue-600 mx-auto mt-2 rounded" />
      </div>
      <div className="relative">
        <div className="flex items-center">
          {/* Left Button */}
          <button
            onClick={prev}
            disabled={current === 0}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/80 shadow text-blue-700 hover:bg-blue-700 hover:text-white border border-blue-100 transition disabled:opacity-30 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Previous"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                d="M15 19l-7-7 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Cards */}
          <div className="flex-1 overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${current * (100 / cardsPerView)}%)`,
                width: `${(clients.length * 100) / cardsPerView}%`,
              }}
            >
              {clients.map((client, idx) => (
                <div
                  key={client._id || idx}
                  className="px-4 py-2"
                  style={{ width: `${100 / clients.length}%`, minWidth: 0 }}
                >
                  <ClientCard {...client} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Button */}
          <button
            onClick={next}
            disabled={current === maxIndex}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/80 shadow text-blue-700 hover:bg-blue-700 hover:text-white border border-blue-100 transition disabled:opacity-30 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Next"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                d="M9 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Mobile navigation dots */}
        <div className="flex md:hidden justify-center mt-5 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full border transition-all duration-200 ${
                idx === current
                  ? "bg-blue-700 border-blue-700 scale-110"
                  : "bg-gray-300 border-gray-200"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientCarousel;
