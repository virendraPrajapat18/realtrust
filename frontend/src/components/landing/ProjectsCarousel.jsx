import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { fetchProjects } from "../../api/projectService";

const getCardsPerView = () => {
  if (window.innerWidth >= 1024) return 4;
  if (window.innerWidth >= 768) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
};

const ProjectsCarousel = () => {
  const [projects, setProjects] = useState([]);
  const [current, setCurrent] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    loadProjects();
  }, []);

  useEffect(() => {
    const handleResize = () => setCardsPerView(getCardsPerView());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, projects.length - cardsPerView);
  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(maxIndex, c + 1));

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h2 className="text-blue-700 font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight">
          Our Projects
        </h2>
        <p className="mt-2 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
          We know what buyers are looking for and suggest projects that will
          bring clients top dollar for the sale of their homes.
        </p>
      </div>

      <div className="relative">
        <div className="flex items-center">
          {/* Left Button */}
          <button
            onClick={prev}
            disabled={current === 0}
            className="hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-white/90 shadow text-blue-700 hover:bg-blue-700 hover:text-white transition disabled:opacity-30 mr-2 border border-blue-100"
            aria-label="Previous"
          >
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                d="M13 17l-5-5 5-5"
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
                width: `${(projects.length * 100) / cardsPerView}%`,
              }}
            >
              {projects.map((project, idx) => (
                <div
                  key={project._id || idx}
                  className="px-3 py-2"
                  style={{ width: `${100 / projects.length}%`, minWidth: 0 }}
                >
                  <ProjectCard
                    imageUrl={project.imageUrl}
                    name={project.projectName}
                    description={project.description}
                    location={project.location}
                    createdAt={project.createdAt}
                    onReadMore={() =>
                      alert(`Read more about ${project.projectName}`)
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Button */}
          <button
            onClick={next}
            disabled={current === maxIndex}
            className="hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-white/90 shadow text-blue-700 hover:bg-blue-700 hover:text-white transition disabled:opacity-30 ml-2 border border-blue-100"
            aria-label="Next"
          >
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                d="M7 7l5 5-5 5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex md:hidden justify-center mt-5 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-200 border ${
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

export default ProjectsCarousel;
