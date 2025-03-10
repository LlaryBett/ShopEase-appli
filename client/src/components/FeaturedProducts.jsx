import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useCart } from "../components/Context/MyCartContext"; // Import useCart hook

const FeaturedProducts = ({ isAuthenticated }) => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const { addItemToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from the "Featured Products" section from the backend
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch(
          "https://shopease-appli.onrender.com/api/products/section/Featured%20Products"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      alert("Please register or log in to continue.");
      return;
    }

    addItemToCart(product); // Use the context function to add item to cart
  };

  const scrollLeft = () => scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pt-0 px-0"> {/* Reduced top padding to pt-6 */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>

        {/* Navigation Buttons */}
        <div className="flex space-x-2">
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

      {/* Product List */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto hide-scrollbar"
        style={{ maxHeight: "auto", overflowY: "hidden", scrollbarWidth: "none" }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-gray-100 rounded-lg shadow-md p-3 w-32 sm:w-40 md:w-48 flex-shrink-0 flex flex-col justify-between 
            hover:scale-105 transition-transform duration-300 h-[280px] sm:h-[300px]"
            onClick={() => navigate(`/product/${product._id}`, { state: { product } })} 
          >
            <div className="flex flex-col items-center">
              <div className="w-full h-[120px] sm:h-[140px] flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain rounded-md"
                />
              </div>
              <h3 className="text-sm sm:text-lg font-semibold text-center line-clamp-2 mt-2">
                {product.name}
              </h3>
              <div className="mt-1 text-center">
                <span className="text-gray-500 line-through mr-1 text-xs sm:text-sm">
                  {product.wasPrice}
                </span>
                <span className="text-green-600 font-bold text-xs sm:text-sm">
                  {product.isPrice}
                </span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent navigating when clicking the button
                handleAddToCart(product);
              }}
              className="mt-auto bg-blue-500 text-white font-semibold py-1 px-2 rounded-lg hover:bg-blue-600 transition-colors text-xs sm:text-base"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

FeaturedProducts.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default FeaturedProducts;
