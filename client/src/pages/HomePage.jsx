import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; 
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"; 
import CartContext from "../components/Context/MyCartContext";
import FeaturedProducts from "../components/FeaturedProducts";
import MostPopular from "../components/MostPopular";

import TopSellers from "../components/TopSellers";
import ShopByBrand from "../components/ShopByBrand";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RefreshYourDay from "../components/RefreshYourDay"
import WeeklyDeals from "../components/WeeklyDeals"
import Carousel from "../components/carousel";
import AddressBook from "../pages/AddressBook";  // Import AddressBook


const HomePage = ({ isAuthenticated, setIsAuthenticated }) => {
  const { cartCount, fetchCartFromBackend, addItemToCart, message, setMessage } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  const location = useLocation(); 

 
  const [showAddressBook, setShowAddressBook] = useState(false); // State for Address Book

  useEffect(() => {
    fetchCartFromBackend(); 
  }, []);

  useEffect(() => {
    if (location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery);
    }
  }, [location.state?.searchQuery]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const fetchSearchResults = async () => {
      setIsSearching(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/search?query=${searchQuery}`
        );
        setSearchResults(response.data);
      } catch (error) {
        setError("Something went wrong while fetching products.");
      } finally {
        setIsSearching(false);
      }
    };

    const debounceFetch = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(debounceFetch);
  }, [searchQuery]);

  const handleAddToCart = (product) => {
    addItemToCart(product); 
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(""); 
      }, 3000);
      return () => clearTimeout(timer); 
    }
  }, [message, setMessage]);

  return (
    <div>
      <Header 
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        setSearchQuery={setSearchQuery}
        setSearchResults={setSearchResults}
        setShowAddressBook={setShowAddressBook}  // Pass it here
      />
       {/* Address Book - Open from the right */}
<div className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${showAddressBook ? "translate-x-0" : "translate-x-full"}`}>
  <AddressBook />
  <button 
    onClick={() => setShowAddressBook(false)} 
    className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded"
  >
    Close
  </button>
</div>


      {message && (
  <div className="fixed top-28 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-500 ease-in-out animate-slide-down z-50">
    {message}
  </div>
)}

      {/* Top Sellers + Carousel Section (Appears below Header) */}
      <Carousel />
      
      <div className="pt-20 px-4">
        {searchQuery ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Search Results for "{searchQuery}"
            </h2>
            <p className="text-gray-600 mb-4">
              Showing search results for: <span className="font-semibold">{searchQuery}</span>
            </p>
            {isSearching ? (
              <p className="text-gray-500">Searching...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {searchResults.map((product) => (
                  <div
                    key={product._id}
                    className="bg-gray-100 rounded-lg shadow-md p-3 w-full flex flex-col justify-between hover:scale-105 transition-transform duration-300 h-[280px] sm:h-[300px] cursor-pointer"
                    onClick={() => navigate(`/product/${product._id}`, { state: { product, searchQuery } })}
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
                        e.stopPropagation(); 
                        handleAddToCart(product); 
                      }}
                      className="mt-auto bg-blue-500 text-white font-semibold py-1 px-2 rounded-lg hover:bg-blue-600 transition-colors text-xs sm:text-base"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No results found for "{searchQuery}"</p>
            )}
          </div>
        ) : (
          <>
            <FeaturedProducts isAuthenticated={isAuthenticated} />
            <ShopByBrand isAuthenticated={isAuthenticated} />
            {/* Banner Section */}
<div className="my-6 flex justify-center">
  <img 
    src="https://d16zmt6hgq1jhj.cloudfront.net/slider/OwryrzX0E7DY7UBW6Yr9L0j0s5BNOddGUhbr5rHi.jpg" 
    alt="Special Offer" 
    className="w-full max-w-none rounded-lg shadow-lg"
  />
</div>

            <MostPopular isAuthenticated={isAuthenticated} />
            <TopSellers isAuthenticated={isAuthenticated} cartCount={cartCount} />


            <RefreshYourDay isAuthenticated={isAuthenticated} />
            <WeeklyDeals isAuthenticated={isAuthenticated} />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired, 
};

export default HomePage;
