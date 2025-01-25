import React, { useRef } from 'react';

const TopSellers = () => {
  // Manual product data
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
      name: "Man U kit 24/25",
      wasPrice: "$150",
      isPrice: "$125",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9WD8JjjLEEctTKhiZfAsQ1Q-lV4i_LZlH-g&s",
    },
    {
      id: 5,
      name: "Infinix Hot50 pro",
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
      name: "Vitron Led tv 43'",
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
  const scrollRef = useRef(null);

  // Function to scroll left
  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  // Function to scroll right
  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="p-6 mt-[0px] sm:mt-[0px] pb-20"> {/* Added bottom padding */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Top Sellers</h2>

        {/* Navigation Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={scrollLeft}
            className="bg-blue-600 text-white p-1 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-10 text-base"
          >
            &lt; {/* Left arrow */}
          </button>
          <button
            onClick={scrollRight}
            className="bg-blue-600 text-white p-1 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-10 text-base"
          >
            &gt; {/* Right arrow */}
          </button>
        </div>
      </div>

      {/* Product List */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto hide-scrollbar"
        style={{ maxHeight: "auto", overflowY: "hidden", scrollbarWidth: "none" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-100 rounded-lg shadow-md p-3 w-32 sm:w-40 md:w-48 flex-shrink-0 flex flex-col justify-between hover:scale-105 transition-transform duration-300"
          >
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-contain rounded-md mb-2"
              />
              <h3 className="text-sm sm:text-lg font-semibold mb-1">
                {product.name}
              </h3>
              <div className="mb-2">
                <span className="text-gray-500 line-through mr-1 text-xs sm:text-sm">
                  {product.wasPrice}
                </span>
                <span className="text-green-600 font-bold text-xs sm:text-sm">
                  {product.isPrice}
                </span>
              </div>
            </div>
            <button className="bg-blue-500 text-white font-semibold py-1 px-2 rounded-lg hover:bg-blue-600 transition-colors text-xs sm:text-base">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellers;
