import React from "react";

const ClientCard = ({
  imageUrl,
  name = "Unnamed",
  designation = "",
  description = "",
}) => {
  const fallbackImage = "https://via.placeholder.com/80x80?text=Client";

  return (
    <div className="rounded-xl shadow-lg bg-white px-6 py-8 flex flex-col items-center max-w-xs mx-auto transition-transform hover:-translate-y-2 hover:shadow-2xl group">
      {/* Gradient Ring + Image */}
      <div className="relative mb-4">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-200 via-blue-400 to-blue-600 opacity-70 blur-sm group-hover:opacity-90 transition" />
        <img
          src={imageUrl || fallbackImage}
          alt={name}
          className="w-20 h-20 rounded-full object-cover border-4 border-white shadow relative z-10"
        />
      </div>

      {/* Name */}
      <h4 className="text-lg font-bold text-blue-700 mb-1 text-center">
        {name}
      </h4>

      {/* Designation */}
      {designation && (
        <p className="text-xs font-medium text-blue-500 mb-2 uppercase tracking-wide text-center">
          {designation}
        </p>
      )}

      {/* Description */}
      {description && (
        <p
          className="text-sm text-gray-600 text-center leading-relaxed line-clamp-3 max-w-[220px]"
          title={description}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default ClientCard;
