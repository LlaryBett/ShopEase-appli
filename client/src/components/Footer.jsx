import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { TbBrandX } from "react-icons/tb";

const Footer = () => {
  return (
    <footer className="hidden sm:block bg-gray-800 text-white p-6">
      {/* First Row: Newsletter Signup */}
      <div className="mb-6 pb-6 border-b border-gray-700 text-center">
        <h3 className="text-lg font-semibold mb-2">Sign Up for Our Newsletter</h3>
        <p className="text-sm mb-4">
          Stay updated with the latest offers, products, and news.
        </p>
        <div className="flex justify-center items-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded-l-md text-gray-800 focus:outline-none"
          />
          <button className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors">
            Subscribe
          </button>
        </div>
      </div>

      {/* Second Row: Company Policies & Social Media */}
      <div className="mb-6 pb-6 border-b border-gray-700 grid grid-cols-1 sm:grid-cols-4 gap-4 text-center sm:text-left">
        <div>
          <h4 className="font-bold mb-2">Customer Service</h4>
          <ul className="text-sm space-y-1">
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">Returns & Refunds</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">About Us</h4>
          <ul className="text-sm space-y-1">
            <li><a href="#" className="hover:underline">Our Story</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Affiliate Program</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Policies</h4>
          <ul className="text-sm space-y-1">
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
            <li><a href="#" className="hover:underline">Cookie Policy</a></li>
          </ul>
        </div>
        <div className="text-center sm:text-left">
          <h4 className="font-bold mb-2">Connect with Us</h4>
          <div className="flex justify-center sm:justify-start space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="X (formerly Twitter)"
            >
              <TbBrandX size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Third Row: Copyright */}
      <div className="text-center text-sm">
        © {new Date().getFullYear()} ShopEase. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
