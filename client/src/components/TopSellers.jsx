import React, { useRef } from "react";
import { useCart } from "./Context/MyCartContext";
// Ensure the correct file path

const TopSellers = () => {
  const { addToCart } = useCart(); // Get the addToCart function from context
  const scrollRef = useRef(null);

  // Product data
  const products = [
    {
      id: 1,
      name: "Bluetooth Earbuds",
      wasPrice: "$100",
      isPrice: "$80",
      image: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/75/0183971/1.jpg?2092",
    },
    {
      id: 2,
      name: "Nike SB",
      wasPrice: "$120",
      isPrice: "$95",
      image: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/5e5e9811-9098-466c-a54a-360e0031539b/NIKE+SB+DUNK+LOW+PRO+PRM.png",
    },
    {
      id: 3,
      name: "Dstv Kit",
      wasPrice: "$150",
      isPrice: "$125",
      image: "https://www.patabay.co.ke/wp-content/uploads/2018/03/1-1-6.jpg",
    },
    {
      id: 4,
      name: "Man U Kit 24/25",
      wasPrice: "$150",
      isPrice: "$125",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9WD8JjjLEEctTKhiZfAsQ1Q-lV4i_LZlH-g&s",
    },
    {
      id: 5,
      name: "Infinix Hot50 Pro",
      wasPrice: "$150",
      isPrice: "$125",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPstiyOWEeKNJPemF4EVBdmpFyir9aNw5A6Q&s",
    },
    {
      id: 6,
      name: "Harpic Toilet Cleaner",
      wasPrice: "$150",
      isPrice: "$125",
      image: "https://cdn.mafrservices.com/pim-content/KEN/media/product/13336/13336_main.jpg?im=Resize=480",
    },
    {
      id: 7,
      name: "Vitron LED TV 43'",
      wasPrice: "$150",
      isPrice: "$125",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPVCqL_oWmWaSiQ7t8ZCRURIkQSjSqpsFbuQ&s",
    },
    {
      id: 8,
      name: "Nivea Shower Gel",
      wasPrice: "$150",
      isPrice: "$125",
      image: "https://images-us.nivea.com/-/media/miscellaneous/media-center-items/a/1/4/245017-web_1010x1180_transparent_png.png",
    },
  ];

  // Scroll functions
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="p-6 pb-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Top Sellers</h2>
        <div className="flex space-x-2">
          <button
            onClick={scrollLeft}
            aria-label="Scroll Left"
            className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-200"
          >
            &lt;
          </button>
          <button
            onClick={scrollRight}
            aria-label="Scroll Right"
            className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-200"
          >
            &gt;
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto hide-scrollbar"
        style={{ maxHeight: "auto", overflowY: "hidden" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-100 rounded-lg shadow-md p-4 w-40 flex-shrink-0 flex flex-col justify-between hover:scale-105 transition-transform duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-contain rounded-md mb-2"
            />
            <h3 className="text-sm font-semibold">{product.name}</h3>
            <div className="mb-2">
              <span className="text-gray-500 line-through text-xs mr-2">
                {product.wasPrice}
              </span>
              <span className="text-green-600 font-bold text-sm">
                {product.isPrice}
              </span>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200 text-sm"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellers;
