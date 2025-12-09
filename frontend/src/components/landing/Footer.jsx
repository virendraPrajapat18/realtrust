import React from "react";
import {
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => (
  <footer className="bg-zinc-950 backdrop-blur border-t border-blue-100 shadow-inner px-6 py-6">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
      {/* Left: Copyright */}
      <p className="text-xs sm:text-sm text-gray-500 font-medium tracking-wide mb-2 sm:mb-0">
        © {new Date().getFullYear()} Real Trust. All Rights Reserved.
      </p>
      {/* Center: Logo */}
      <div className="flex justify-center flex-1">
        <img
          alt="Real Trust logo with a stylized house icon and text Real Trust"
          className="h-8 w-auto rounded-lg shadow-md "
          height={32}
          width={120}
          src="logo.svg"
        />
       
      </div>
      {/* Right: Social Icons */}
      <div className="flex gap-4 bg-blue-50 rounded-full px-4 py-2 shadow-sm border border-blue-100">
        <a
          aria-label="Twitter"
          className="text-blue-500 hover:text-blue-600 focus:text-blue-700 transition"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter size={20} />
        </a>
        <a
          aria-label="Instagram"
          className="text-pink-500 hover:text-pink-600 focus:text-pink-700 transition"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={20} />
        </a>
        <a
          aria-label="Facebook"
          className="text-blue-700 hover:text-blue-800 focus:text-blue-900 transition"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF size={20} />
        </a>
        <a
          aria-label="LinkedIn"
          className="text-blue-800 hover:text-blue-900 focus:text-blue-900 transition"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn size={20} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
