import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useCart } from "../components/Context/MyCartContext"; // Import useCart hook

const TopSellers = ({ isAuthenticated }) => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const { addItemToCart } = useCart(); // Use addItemToCart from CartContext
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from the "Top Sellers" section from the backend
  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/section/Top%20Sellers");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopSellers();
  }, []);  // Empty dependency array means it runs once on component mount

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      alert("Please register or log in to continue.");
      return;
    }

    // Calling addItemToCart from the CartContext instead of sending POST request directly
    addItemToCart(product); // Add item to cart via the CartContext
  };

  const scrollLeft = () => scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 pb-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Top Sellers</h2>
        <div className="flex space-x-2">
          <button onClick={scrollLeft} className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
            &lt;
          </button>
          <button onClick={scrollRight} className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
            &gt;
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-4 overflow-x-auto hide-scrollbar">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-gray-100 rounded-lg shadow-md p-3 sm:w-48 w-32 flex-shrink-0 flex flex-col justify-between hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => navigate(`/product/${product._id}`, { state: { product } })}
          >
            <img src={product.image} alt={product.name} className="w-full h-32 object-contain rounded-md mb-2" />
            <h3 className="text-xs sm:text-sm font-semibold">{product.name}</h3>
            <div className="mb-2">
              <span className="text-gray-500 line-through text-xs mr-2">{product.wasPrice}</span>
              <span className="text-green-600 font-bold text-xs sm:text-sm">{product.isPrice}</span>
            </div>
            <div className="mt-2">
              <span className="text-yellow-500">{"★".repeat(Math.round(product.rating))}</span>
              <span className="text-xs text-gray-600"> ({product.reviews.length} reviews)</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product); // Use the handleAddToCart function here
              }}
              className="bg-blue-500 text-white font-semibold py-1 rounded-md hover:bg-blue-600 transition duration-200 text-xs sm:text-sm"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

TopSellers.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired, // Validate isAuthenticated as a required boolean
};

export default TopSellers;
