import React, { useState } from "react";

const ProjectCard = ({
  imageUrl,
  name = "No Title",
  description = "No description available.",
  location = "Unknown Location",
  createdAt = null,
  onReadMore,
}) => {
  const fallbackImage = "https://placehold.co/600x400?text=No+Image";
  const [imgSrc, setImgSrc] = useState(imageUrl || fallbackImage);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow group flex flex-col h-full transition-transform hover:-translate-y-2 hover:shadow-lg">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={imgSrc}
          alt={name}
          onError={() => setImgSrc(fallbackImage)}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          height={200}
          width={300}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-blue-700 font-bold text-lg mb-1 truncate">
          {name}
        </h3>
        <p className="text-gray-500 text-sm italic mb-1">{location}</p>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-1">
          {description}
        </p>

        <div className="text-xs text-gray-400 mb-3">
          Uploaded: {formatDate(createdAt)}
        </div>

        <button
          className="bg-orange-600 text-white text-xs font-bold px-5 py-2 rounded shadow hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition self-start"
          onClick={onReadMore}
        >
          READ MORE
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
