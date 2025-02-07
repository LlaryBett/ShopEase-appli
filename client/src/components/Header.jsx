import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaHome, FaShoppingCart, FaUser, FaList, FaCommentDots, FaAngleDown, FaHeart } from "react-icons/fa";
import PropTypes from 'prop-types';
import CartContext from "../components/Context/MyCartContext"; // Import CartContext

const Header = ({ isAuthenticated, setIsAuthenticated, setSearchQuery,setSearchResults,setShowAddressBook  }) => {  // Add setSearchQuery prop
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [searchQuery, setLocalSearchQuery] = useState(""); // Local state for input field
  const location = useLocation();
 
  
  // Access cartCount directly from CartContext
  const { cartCount } = useContext(CartContext); 

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const toggleAccountDropdown = () => setAccountDropdownOpen(!isAccountDropdownOpen);

  const isHomePage = location.pathname === '/';
  const isBottomNavVisible = ['/account', '/messages', '/cart', '/categories', '/'].includes(location.pathname);

  const handleLogout = () => {
    console.log("Logging out..."); // Check if it's triggered
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };
  const handleSearchChange = (e) => {
    setLocalSearchQuery(e.target.value);  // Update local state for the search input
    setSearchQuery(e.target.value); // Update the global search query state
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchResults(searchQuery); 

      // Optionally, you can keep the navigate function if you want to handle search on the same page.
      // navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <div>
      {/* Render header only on the homepage */}
      {isHomePage && (
        <>
          {/* Welcome Message for Larger Screens */}
          <div className="bg-blue-600 text-white py-2 px-4 flex justify-between items-center text-center sm:text-left fixed top-0 left-0 w-full z-50 border-b border-gray-700 hidden sm:flex">
            <h1 className="text-lg font-semibold sm:text-xl">
              Welcome to ShopEase - Your One-Stop Online Store! <FaHeart className="inline text-red-600 ml-2" />
            </h1>
            <span className="flex items-center space-x-2 mt-2 sm:mt-0">
              Call Us: <a href="tel:+123456789" className="underline hover:text-gray-200">+254 738725036</a>
            </span>
          </div>

          {/* Main Header for Larger Screens */}
          <div className="hidden sm:flex justify-between items-center bg-gray-800 text-white p-4 fixed top-10 left-0 w-full z-50 shadow-md">
            <div className="text-2xl sm:text-3xl font-bold">ShopEase</div>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="bg-gray-700 p-2 rounded-md w-full sm:w-1/2 mt-4 sm:mt-0 flex justify-center">
              <FaSearch className="text-gray-400 mr-2 text-xl" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery || ''}  // Ensure controlled component
                onChange={handleSearchChange} // Update both local and global search query
                className="bg-transparent focus:outline-none text-white w-full text-sm sm:text-base"
              />
            </form>
            <div className="flex items-center space-x-6 mt-4 sm:mt-0">
              {/* Categories Dropdown */}
              <div className="relative">
                <button onClick={toggleDropdown} className="flex items-center space-x-1 hover:text-gray-300">
                  <FaList />
                  <span className="text-sm sm:text-base">Categories</span>
                  <FaAngleDown className={`transition-transform duration-300 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute bg-gray-700 text-white w-48 p-2 rounded-md mt-2">
                    <ul>
                      {['Electronics', 'Toiletry', 'Pantry', 'Fashion', 'Stationery', 'ShopEase Liquor', 'Health & Beauty', 'Sports', 'Gaming', 'Garden & Outdoors'].map(category => (
                        <li key={category} className="py-1 hover:bg-gray-600"><a href="#">{category}</a></li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Other Navigation Buttons */}
              {['Messages', 'Cart'].map((item) => (
                <Link
                  to={item === 'Cart' ? '/cart' : item === 'Messages' ? '/messages' : '#'}
                  key={item}
                  className="flex items-center space-x-1 hover:text-gray-300 relative"
                >
                  {item === 'Messages' && <FaCommentDots />}
                  {item === 'Cart' && (
                    <div className="relative">
                      <FaShoppingCart />
                      {/* Add cart count badge */}
                      {cartCount > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </div>
                  )}
                  <span className="text-sm sm:text-base">{item}</span>
                </Link>
              ))}

              {/* Account Button */}
              <div className="relative">
                {isAuthenticated ? (
                  // If logged in, show dropdown
                  <>
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // Prevent navigation
                        toggleAccountDropdown();
                      }}
                      className="flex items-center space-x-1 hover:text-gray-300"
                    >
                      <FaUser />
                      <span className="text-sm sm:text-base">Account</span>
                      <FaAngleDown
                        className={`transition-transform duration-300 ${
                          isAccountDropdownOpen ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isAccountDropdownOpen && (
                      <div
                        className="absolute bg-gray-700 text-white p-2 rounded-md mt-2 z-10" // Positioned to the right, added right: 0
                        style={{ minWidth: "max-content", right: "-0.5rem" }} // Added style to ensure content isn't cropped + negative right
                      >
                        <ul className="flex flex-col space-y-0.5">
                          {/* Use flex layout to control items */}
                          <li className="py-1 hover:bg-gray-600">
                            <Link to="/orders" className="block px-4 py-2">
                              Orders
                            </Link>{" "}
                            {/* block and px-4 py-2 for better spacing */}
                          </li>
                          <li className="py-1 hover:bg-gray-600">
                            <button
                              onClick={() => setShowAddressBook(true)}
                              className="w-full text-left px-4 py-2"
                            >
                              {/* Full width button */}
                              Address Book
                            </button>
                          </li>
                          <li className="py-1 hover:bg-gray-600">
                            <Link to="/favourites" className="block px-4 py-2">
                              Favourites
                            </Link>{" "}
                            {/* block and px-4 py-2 for better spacing */}
                          </li>
                          <li className="py-1 hover:bg-gray-600">
                            <Link to="/messages" className="block px-4 py-2">
                              Messages
                            </Link>{" "}
                            {/* block and px-4 py-2 for better spacing */}
                          </li>
                          <li className="py-1 hover:bg-gray-600">
                            <Link to="/chat-with-sellers" className="block px-4 py-2">
                              Chat with Sellers
                            </Link>{" "}
                            {/* block and px-4 py-2 for better spacing */}
                          </li>
                          <li
                            className="py-1 hover:bg-red-600 text-white cursor-pointer px-4 py-2" // Added padding for visual consistency
                            onClick={handleLogout}
                          >
                            Logout
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  // If not logged in, direct them to account page (login/signup)
                  <Link to="/account" className="flex items-center space-x-1 hover:text-gray-300">
                    <FaUser />
                    <span className="text-sm sm:text-base">Account</span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Search Bar for Smaller Screens */}
          <div className="sm:hidden bg-gray-800 p-4 fixed top-0 left-0 w-full z-50 shadow-md">
            <div className="flex justify-center items-center">
              <div className="bg-gray-700 p-2 rounded-md w-full flex justify-center">
                <FaSearch className="text-gray-400 mr-2 text-xl" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
                  className="bg-transparent focus:outline-none text-white w-full text-sm"
                />
              </div>
            </div>
          </div>

          {/* Hot Navbar for Smaller Screens */}
          <div className="sm:hidden bg-gray-700 p-[10px] fixed top-[56px] left-0 w-full z-[49] shadow-md">
            {/* Hot Label */}
            <h3 className="text-white font-semibold mb-[5px] text-lg inline-block">Hot</h3>

            {/* Subcategories beside Hot */}
            <div className="inline-flex space-x-[10px]">
              {['New Arrivals', 'Best Sellers', 'Discounts'].map((category) => (
                <button key={category} className="text-white hover:bg-gray-600 rounded px-[10px] py-[5px] text-sm">{category}</button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Bottom Navigation for Smaller Screens */}
      {isBottomNavVisible && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 sm:hidden z-[48]">
          <div className="flex justify-between items-center p-[10px]">
            {['Home', 'Categories', 'Messages', 'Cart', 'Account'].map((item) => (
              <Link
                to={item === 'Home' ? '/'
                  : item === 'Account' ? '/account'
                    : item === 'Cart' ? '/cart'
                      : '#'} // Ensure Cart goes to /cart
                key={item}
                className="flex flex-col items-center text-white space-y-[5px]"
              >
                {item === 'Home' && <FaHome className="text-xl" />}
                {item === 'Categories' && <FaList className="text-xl" />}
                {item === 'Messages' && <FaCommentDots className="text-xl" />}
                {item === 'Cart' && (
                  <div className="relative">
                    <FaShoppingCart className="text-xl" />
                    {/* Add cart count badge */}
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </div>
                )}
                {item === 'Account' && <FaUser className="text-xl" />}
                <span className="text-xs">{item}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      
    </div>
  );
};
// Validate props
Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired, // Ensures isAuthenticated is a boolean and is required
  setIsAuthenticated: PropTypes.func.isRequired, // Ensures setIsAuthenticated is a function and is required
  setSearchQuery: PropTypes.func.isRequired,
  setSearchResults: PropTypes.func.isRequired, 
  setShowAddressBook: PropTypes.func.isRequired, 
};

export default Header; 