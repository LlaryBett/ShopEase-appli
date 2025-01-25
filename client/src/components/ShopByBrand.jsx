import React, { useRef } from "react";

const ShopByBrands = () => {
  const scrollRef = useRef(null);

  // Function to scroll left
  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -320, // Adjust the scroll width based on your design
      behavior: "smooth",
    });
  };

  // Function to scroll right
  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 320, // Adjust the scroll width based on your design
      behavior: "smooth",
    });
  };

  return (
    <div className="p-6 pt-0 mt-4 sm:mt-8">
      {/* Section Title with Navigation Buttons */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 text-left flex-grow">
          Shop by Brand
        </h2>
        <div className="flex space-x-4">
          <button
            onClick={scrollLeft}
            className="bg-blue-600 text-white p-1 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-10 text-base"
          >
            &lt;
          </button>
          <button
            onClick={scrollRight}
            className="bg-blue-600 text-white p-1 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-10 text-base"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Container for Categories */}
      <div
        className="flex space-x-6 overflow-hidden pb-4" // Removed overflow-x-auto
        ref={scrollRef}
        style={{ maxWidth: "100%" }}
      >
        {/* Electronics Category */}
        <div
          className="bg-white rounded-lg shadow-md p-4 sm:p-2 mb-8"
          style={{ minWidth: "320px" }}
        >
          <h3 className="text-lg font-bold text-gray-800 mb-2 text-left">Electronics</h3>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {/* Brand Card 1 */}
            <div className="bg-gray-100 rounded-lg shadow-md p-3 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <h3 className="text-sm font-semibold mb-1">Samsung</h3>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp28KNbT_76szjMx8V-F90zVouUYg3BblgtA&s"
                alt="Samsung"
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Brand Card 2 */}
            <div className="bg-gray-100 rounded-lg shadow-md p-3 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <h3 className="text-sm font-semibold mb-1">Hisense</h3>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi53fo2wu3QpZaDprzmkcnHqYD-bBggB8XCA&s"
                alt="Hisense"
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Brand Card 3 */}
            <div className="bg-gray-100 rounded-lg shadow-md p-3 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <h3 className="text-sm font-semibold mb-1">Hotpoint</h3>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBhdIe9_9s6m16XcdVRGBWuY_KSYs7i_7NuA&s"
                alt="Hotpoint"
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Brand Card 4 */}
            <div className="bg-gray-100 rounded-lg shadow-md p-3 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <h3 className="text-sm font-semibold mb-1">Ramtoms</h3>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZzJT_PVLSvhuy9T50-zhYmLlmaCf1_fvq6w&s"
                alt="Ramtoms"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>

          <div className="text-center">
            <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition-colors relative z-10">
              See More Brands
            </button>
          </div>
        </div>
         {/* Cleaning Category */}
         <div
          className="bg-white rounded-lg shadow-md p-4 sm:p-2 mb-8"
          style={{ minWidth: "320px" }}
        >
          <h3 className="text-lg font-bold text-gray-800 mb-2 text-left">Cleaning</h3>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {/* Brand Card 1 */}
            <div className="bg-gray-100 rounded-lg shadow-md p-3 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <h3 className="text-sm font-semibold mb-1">Glade</h3>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiRxZ8VU2lwtADHp1PExzYTTsQG-fM58kyig&s"
                alt="Glade"
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Brand Card 2 */}
            <div className="bg-gray-100 rounded-lg shadow-md p-3 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <h3 className="text-sm font-semibold mb-1">Sunlight</h3>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeO6M8tm2trZX-prx8Pvbs1nf0DrkZ6lmWEA&s"
                alt="Sunlight"
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Brand Card 3 */}
            <div className="bg-gray-100 rounded-lg shadow-md p-3 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <h3 className="text-sm font-semibold mb-1">Ariel</h3>
              <img
                src="https://seeklogo.com/images/A/Ariel-logo-B2F20EA234-seeklogo.com.png"
                alt="Ariel"
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Brand Card 4 */}
            <div className="bg-gray-100 rounded-lg shadow-md p-3 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <h3 className="text-sm font-semibold mb-1">Jik</h3>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm4ftRGrxIsaC7HMV09hYRpGRTHeuDXJQYEw&s"
                alt="Jik"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>

          <div className="text-center">
            <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition-colors relative z-10">
              See More Brands
            </button>
          </div>
        </div>
         {/* Pantry Category */}
         <div
          className="bg-white rounded-lg shadow-md p-4 sm:p-2 mb-8"
          style={{ minWidth: "320px" }}
        >
          <h3 className="text-lg font-bold text-gray-800 mb-2 text-left">Pantry</h3>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {/* Brand Card 1 */}
            <div className="bg-gray-100 rounded-lg shadow-md p-3 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <h3 className="text-sm font-semibold mb-1">Raha Premium</h3>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAO2ps3LuqY4oSUy6GgX_QrvPrdI_2rAZzjA&s"
                alt="Raha Premium"
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Brand Card 2 */}
            <div className="bg-gray-100 rounded-lg shadow-md p-3 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <h3 className="text-sm font-semibold mb-1">Top Fry</h3>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJS-Q-K_sr46hOPKOHJPv57UCDofaxDW3-w&s"
                alt="Top Fry"
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Brand Card 3 */}
            <div className="bg-gray-100 rounded-lg shadow-md p-3 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <h3 className="text-sm font-semibold mb-1">Royco</h3>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3JgLaqRMmAOukTkWmJmm4JYJmsQFmX7mV2A&s"
                alt="Royco"
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Brand Card 4 */}
            <div className="bg-gray-100 rounded-lg shadow-md p-3 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <h3 className="text-sm font-semibold mb-1">Basmati Rice</h3>
              <img
                src="https://cdn2.f-cdn.com/contestentries/1662629/40137063/5dcd01110dd00_thumb900.jpg"
                alt="Basmati"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>

          <div className="text-center">
            <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition-colors relative z-10">
              See More Brands
            </button>
          </div>
        </div>
         {/* Snacks Category */}
         <div
          className="bg-white rounded-lg shadow-md p-4 sm:p-2 mb-8"
          style={{ minWidth: "320px" }}
        >
          <h3 className="text-lg font-bold text-gray-800 mb-2 text-left">Snacks</h3>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {/* Brand Card 1 */}
            <div className="bg-gray-100 rounded-lg shadow-md p-3 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <h3 className="text-sm font-semibold mb-1">Coca Cola</h3>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLCHoH5t8pEhStM-Wuc5Up4hzLxgWfr9-qDw&s"
                alt="Coca Cola"
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Brand Card 2 */}
            <div className="bg-gray-100 rounded-lg shadow-md p-3 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <h3 className="text-sm font-semibold mb-1">Cadbury</h3>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Cadbury_logo_new.jpg"
                alt="Cadbury"
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Brand Card 3 */}
            <div className="bg-gray-100 rounded-lg shadow-md p-3 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <h3 className="text-sm font-semibold mb-1">Tropical heat</h3>
              <img
                src="https://bulkbox.co.ke/images/feature_variant/9/Tropical-Heat.jpg"
                alt="tropical"
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Brand Card 4 */}
            <div className="bg-gray-100 rounded-lg shadow-md p-3 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <h3 className="text-sm font-semibold mb-1">Candy</h3>
              <img
                src="https://png.pngtree.com/png-clipart/20221110/original/pngtree-candy-logo-design-template-vector-picture-image_3607676.png"
                alt="Candy"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>

          <div className="text-center">
            <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition-colors relative z-10">
              See More Brands
            </button>
          </div>
        </div>
         {/* Personal care Category */}
         <div
          className="bg-white rounded-lg shadow-md p-4 sm:p-2 mb-8"
          style={{ minWidth: "320px" }}
        >
          <h3 className="text-lg font-bold text-gray-800 mb-2 text-left">Personal Care</h3>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {/* Brand Card 1 */}
            <div className="bg-gray-100 rounded-lg shadow-md p-3 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <h3 className="text-sm font-semibold mb-1">Nivea</h3>
              <img
                src="https://w7.pngwing.com/pngs/222/864/png-transparent-nivea-logo-household-brands-logos-thumbnail.png"
                alt="nivea"
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Brand Card 2 */}
            <div className="bg-gray-100 rounded-lg shadow-md p-3 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <h3 className="text-sm font-semibold mb-1">Geisha</h3>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVMMWg5YmGO072vn62GUs7gBvvs37_Q9KnIg&s"
                alt="geisha"
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Brand Card 3 */}
            <div className="bg-gray-100 rounded-lg shadow-md p-3 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <h3 className="text-sm font-semibold mb-1">Colgate</h3>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSrkNdSALUozY3rCmcir-dKhAwE0BPy6x9BQ&s"
                alt="colgate"
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Brand Card 4 */}
            <div className="bg-gray-100 rounded-lg shadow-md p-3 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <h3 className="text-sm font-semibold mb-1">Detol</h3>
              <img
                src="https://png.pngtree.com/png-clipart/20221110/original/pngtree-candy-logo-design-template-vector-picture-image_3607676.png"
                alt="Candy"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>

          <div className="text-center">
            <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition-colors relative z-10">
              See More Brands
            </button>
          </div>
        </div>
        

      </div>
    </div>
  );
};

export default ShopByBrands;
