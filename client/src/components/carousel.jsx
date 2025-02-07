import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  FaHome,
  FaBolt,
  FaShoppingBag,
  FaTshirt,
  FaSpa,
  FaFutbol,
  FaPuzzlePiece,
  FaBook,
  FaHeart,
} from "react-icons/fa";

const TopSellers = () => {
  const topSellers = [
    { id: 1, name: "Promos", link: "/Promos", icon: FaBolt },
    { id: 2, name: "Electronics", link: "/product/2", icon: FaHome },
    { id: 3, name: "Home & kitchen", link: "/product/3", icon: FaShoppingBag },
    { id: 4, name: "Fashion", link: "/product/4", icon: FaTshirt },
    { id: 5, name: "Personal Care", link: "/product/4", icon: FaSpa },
    { id: 6, name: "Sports & Outdoors", link: "/product/4", icon: FaFutbol },
    { id: 7, name: "Toys & Games", link: "/product/4", icon: FaPuzzlePiece },
    { id: 8, name: "Stationery", link: "/product/4", icon: FaBook },
    { id: 9, name: "Health & wellness", link: "/product/4", icon: FaHeart },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md md:col-span-1 overflow-hidden">
      {/* Styled Header */}
      <div className="-mx-6 bg-gray-800 text-white p-2 rounded-t-lg">
        <h2 className="text-2xl font-bold text-center">🔥 Top Sellers</h2>
      </div>

      {/* Clickable Links */}
      <ul className="p-6">
        {topSellers.map((product) => (
          <li key={product.id} className="mb-2">
            <a
              href={product.link}
              className="flex items-center p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <product.icon className="w-5 h-5 mr-2" />
              {product.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Carousel = () => {
  const slides = [
    "https://d16zmt6hgq1jhj.cloudfront.net/slider_images/Web/gnMY5Bhn1CZ9kgrztReA71qW9H04J2Q7drodjLBI.jpg",
    "https://www.shutterstock.com/image-vector/3d-shopping-sale-promotion-banner-600nw-2056851833.jpg",
    "https://media.licdn.com/dms/image/v2/D4D12AQFshh0iT0r09w/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1683213063568?e=2147483647&v=beta&t=u_zLFHMCQWBsVS_9lVu044OgUy0PLhoAn_XUDrmeWgE",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageStyles, setImageStyles] = useState({});
  const containerAspectRatio = 4 / (96 / 4);

  useEffect(() => {
    const calculateImageStyles = async () => {
      const newStyles = {};

      for (let i = 0; i < slides.length; i++) {
        const img = new Image();
        img.src = slides[i];

        await new Promise((resolve) => {
          img.onload = () => {
            const imageWidth = img.width;
            const imageHeight = img.height;
            const imageAspectRatio = imageWidth / imageHeight;


            let objectFitValue = "contain"; // Default to contain
            if (imageAspectRatio > containerAspectRatio) {
              objectFitValue = "cover";
            }

            newStyles[i] = {
              objectFit: objectFitValue,
              width: "100%",
              height: "100%",
            };
            resolve();
          };
        });
      }
      setImageStyles(newStyles);
    };

    calculateImageStyles();
  }, [slides, containerAspectRatio]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Clear interval on unmount
    }, [slides.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6 items-start mt-32 px-4">
      {/* Ensure items align at the start */}
      {/* Left Side - Top Sellers */}
      <TopSellers />

      {/* Right Side - Carousel */}
      <div className="relative w-full md:col-span-4">
        {/* Outer container for rounded corners */}
        <div className="rounded-lg overflow-hidden h-96">
          {/* Container for the image and background */}
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: "#f0f0f0" }} // Choose your background color
          >
            {imageStyles[currentIndex] ? (
              <img
                src={slides[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                style={imageStyles[currentIndex]} // Apply dynamic styles
              />
            ) : (
              <div>Loading...</div> // Or some other placeholder
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          <FaChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          <FaChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
