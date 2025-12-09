import React from "react";
import Navbar from "../components/landing/Navbar";
import ContactForm from "../components/forms/ContactForm";
import ProjectsCarousel from "../components/landing/ProjectsCarousel";
import ClientCarousel from "../components/landing/ClientCarousel";
import Footer from "../components/landing/Footer";
import Details from "../components/landing/Details";
import NewsletterForm from "../components/forms/NewsletterForm";

const LandingPage = () => (
  <div className="bg-white text-gray-900 font-[Poppins,sans-serif]">
    <Navbar />
    <section
      id="home"
      className="relative max-w-7xl mx-auto px-6 mt-8 rounded-2xl overflow-hidden min-h-[440px] shadow-xl"
      aria-label="Hero Section"
    >
      <img
        alt="Three people discussing plans in office, woman pointing forward"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        height="500"
        src="https://storage.googleapis.com/a1aa/image/df175697-e4f5-42cd-f4ca-b093be234d4e.jpg"
        width="1200"
      />
      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-14 py-16 min-h-[440px]">
        <h1
          className="text-white font-extrabold text-4xl md:text-5xl leading-tight max-w-xs md:max-w-md md:text-left self-center drop-shadow-lg"
          style={{ textShadow: "0 0 12px rgba(0,0,0,0.7)" }}
        >
          Consultation,
          <br />
          Design,
          <br />
          Marketing
        </h1>
        <aside
          id="contact"
          className="w-full max-w-xs md:max-w-sm bg-blue-900/80 border border-white/40 rounded-2xl p-8 text-white ml-auto shadow-2xl"
          style={{ backdropFilter: "saturate(180%) blur(10px)" }}
          aria-label="Free Consultation Form"
        >
          <h2 className="text-center font-bold text-xl mb-6 drop-shadow">
            Get a Free Consultation
          </h2>
          <ContactForm />
        </aside>
      </div>
    </section>
    <Details />
    <section id="projects">
      <ProjectsCarousel />
    </section>

    <section id="testimonials">
      <ClientCarousel />
    </section>
    <section className="relative mt-14  overflow-hidden shadow-xl">
      <img
        alt="Modern living room interior with brown leather sofa, wooden coffee table, rattan chair, and large windows letting in natural light"
        className="w-full h-[400px] object-cover"
        height="400"
        src="https://storage.googleapis.com/a1aa/image/6bf7d6fe-c790-4630-6d61-35b616e6ea4d.jpg"
        width="1920"
      />
      <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center px-4 text-center">
        <p className="text-white text-lg sm:text-xl md:text-2xl max-w-3xl font-semibold leading-snug drop-shadow">
          Learn more about our listing process, as well as our additional
          staging and design work.
        </p>
        <button className="mt-6 bg-white text-blue-700 font-semibold text-base px-8 py-2 rounded-lg shadow hover:bg-gray-100 transition">
          LEARN MORE
        </button>
      </div>
    </section>
    <NewsletterForm />
    <footer id="footer">
      <Footer />
    </footer>
  </div>
);

export default LandingPage;
