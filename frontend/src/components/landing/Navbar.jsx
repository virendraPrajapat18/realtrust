import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "HOME", href: "#home" },
  { name: "SERVICES", href: "#services" },
  { name: "PROJECTS", href: "#projects" },
  { name: "TESTIMONIALS", href: "#testimonials" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-blue-100 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto relative">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            alt="Real Trust logo"
            className="h-8 w-auto rounded-lg"
            src="logo.svg"
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-sm font-semibold">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="px-2 py-1 rounded text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* RIGHT SIDE BUTTONS → CONTACT + ADMIN */}
        <div className="hidden md:flex items-center gap-4">
          {/* CONTACT */}
          <a
            href="#contact"
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-lg px-5 py-2 shadow transition"
          >
            CONTACT
          </a>

          {/* ADMIN BUTTON (same as Newsletter functionality) */}
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg px-5 py-2 shadow transition"
          >
            Admin
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={toggleMenu}
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`absolute left-0 top-full w-full bg-white/95 shadow-lg border-b transition-all duration-300 md:hidden z-20 ${
            isOpen
              ? "opacity-100 pointer-events-auto translate-y-0"
              : "opacity-0 pointer-events-none -translate-y-2"
          }`}
        >
          <ul className="flex flex-col space-y-2 px-6 py-4 text-base font-semibold">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="block px-2 py-2 rounded text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}

            {/* CONTACT in mobile */}
            <li>
              <a
                href="#contact"
                className="block bg-orange-500 text-white px-4 py-2 rounded mt-2 shadow hover:bg-orange-600"
                onClick={() => setIsOpen(false)}
              >
                CONTACT
              </a>
            </li>

            {/* ADMIN in mobile */}
            <li>
              <Link
                to="/login"
                className="block bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
