import React from "react";
import { FaHome, FaPlug, FaDollarSign } from "react-icons/fa";

const features = [
  {
    icon: <FaHome className="text-2xl" />,
    title: "Potential ROI",
    description:
      "Taking the risk on a new project increases your current home's value, adding to your property's future worth.",
    bg: "bg-gradient-to-tr from-blue-100 to-blue-300",
  },
  {
    icon: <FaPlug className="text-2xl" />,
    title: "Design",
    description:
      "Master landscaping, patio, and interior design to upgrade the construction experience and prepare for future enhancements.",
    bg: "bg-gradient-to-tr from-orange-100 to-orange-300",
  },
  {
    icon: <FaDollarSign className="text-2xl" />,
    title: "Marketing",
    description:
      "Market your product and materials with a sophisticated strategy to align with modern business demands.",
    bg: "bg-gradient-to-tr from-purple-100 to-purple-300",
  },
];

const images = [
  {
    src: "https://storage.googleapis.com/a1aa/image/3d6673e7-62b0-43d6-0c94-396c47186a18.jpg",
    alt: "Two men talking outside a house with a fence and greenery",
    size: "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32",
  },
  {
    src: "https://storage.googleapis.com/a1aa/image/be368205-a43a-40f9-3239-be388ceee4c3.jpg",
    alt: "Businesswoman explaining something to two colleagues in an office",
    size: "w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64",
  },
  {
    src: "https://storage.googleapis.com/a1aa/image/5d6a5605-130e-4d43-7304-84c2836b9f32.jpg",
    alt: "Two women and a man shaking hands in a meeting room",
    size: "w-32 h-24 sm:w-36 sm:h-28 md:w-40 md:h-32",
  },
];

const Details = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 py-16">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Not Your Average Realtor
          </h2>
          <p className="text-gray-600 max-w-md">
            Real Trust sees a property's potential, coordinates design, and
            markets effectively to help homeowners achieve top value.
          </p>
        </div>

        <div className="md:w-1/2 flex items-center justify-center relative">
          <div className="absolute -left-8 top-8 w-5 h-5 bg-blue-600 rounded-full"></div>
          <div className="absolute left-12 bottom-8 w-3 h-3 bg-orange-500 rounded-full"></div>

          <div className="relative flex flex-col items-center">
            <img
              src={images[1].src}
              alt={images[1].alt}
              className="w-56 h-56 rounded-full object-cover border-4 border-white shadow-lg z-10"
            />
            <img
              src={images[0].src}
              alt={images[0].alt}
              className="absolute -top-8 -right-20 w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
            />
            <img
              src={images[2].src}
              alt={images[2].alt}
              className="absolute bottom-0 -right-16 w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center mb-12">
        <h2 className="text-blue-600 font-extrabold text-3xl md:text-4xl tracking-tight">
          Why Choose Us?
        </h2>
        <div className="w-16 h-1 bg-blue-600 mx-auto mt-2 rounded" />
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-10 sm:gap-x-8 text-center mb-20">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center group transition-transform hover:-translate-y-2"
          >
            <div
              className={`mx-auto w-16 h-16 flex items-center justify-center rounded-full shadow-lg mb-4 ${feature.bg} group-hover:scale-110 transition-transform`}
            >
              {feature.icon}
            </div>
            <h3 className="text-blue-700 font-semibold text-lg mb-2 uppercase tracking-wide">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600 max-w-xs mx-auto leading-tight">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Image Trio */}
      <div className="relative mt-20 flex justify-center items-end gap-6 md:gap-10">
        <div className="relative shadow-lg rounded-xl overflow-hidden border-4 border-white">
          <img
            src={images[0].src}
            alt={images[0].alt}
            className={`object-cover ${images[0].size}`}
          />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-4 border-orange-500 rounded-sm" />
        </div>

        <div className="relative shadow-2xl rounded-2xl overflow-hidden border-4 border-blue-100 z-10 scale-110">
          <img
            src={images[1].src}
            alt={images[1].alt}
            className={`object-cover ${images[1].size}`}
          />
          <div className="absolute -top-3 -left-3 w-6 h-6 bg-blue-600 rounded-sm" />
          <div className="absolute -top-3 -right-3 w-6 h-6 border-4 border-blue-600 rounded-sm" />
        </div>

        <div className="relative shadow-lg rounded-xl overflow-hidden border-4 border-white">
          <img
            src={images[2].src}
            alt={images[2].alt}
            className={`object-cover ${images[2].size}`}
          />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-4 border-orange-500 rounded-sm" />
        </div>
      </div>

      {/* About Us */}
      <div className="text-center mt-20 max-w-3xl mx-auto px-4">
        <h2 className="text-blue-600 font-extrabold text-3xl md:text-4xl mb-3">
          About Us
        </h2>
        <div className="w-16 h-1 bg-blue-600 mx-auto mb-6 rounded" />
        <p className="text-sm text-gray-700 leading-relaxed">
          Our team of real estate specialists is committed to working hard,
          listening attentively, and building long-term client relationships
          through clear and effective communication.
        </p>
        <button
          type="button"
          className="mt-8 text-blue-700 text-base font-semibold border-2 border-blue-600 rounded-full px-8 py-2 hover:bg-blue-50 hover:shadow transition"
        >
          LEARN MORE
        </button>
      </div>
    </section>
  );
};

export default Details;
