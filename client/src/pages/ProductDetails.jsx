import React, { useContext, useState, useEffect } from "react";
import {Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaList, FaCommentDots, FaShoppingCart, FaUser } from "react-icons/fa";
import PropTypes from "prop-types";
import CartContext from "../components/Context/MyCartContext";

const ProductDetails = ({ isAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, addItemToCart, updateItemQuantity, cartCount } = useContext(CartContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1); // Track quantity in local state

  const state = location.state || {}; 
  const { product, searchQuery } = state;

  if (!product) {
    return <p className="text-center text-red-500 mt-10">Product not found</p>;
  }

  const { _id, name, description, wasPrice, isPrice, image, additionalImages, stock, reviews, rating } = product;

  // Sync local state with cart if the product is already in the cart
  useEffect(() => {
    const cartItem = cartItems.find((item) => item.productId === _id);
    if (cartItem) {
      setQuantity(cartItem.quantity); // Ensure UI updates with cart changes
    }
  }, [cartItems, _id]);

  const handleIncreaseQuantity = async () => {
    if (quantity < stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity); // Update UI instantly
      await updateItemQuantity(_id, newQuantity); // Update quantity in the cart
    }
  };

  const handleDecreaseQuantity = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity); // Update UI instantly
      await updateItemQuantity(_id, newQuantity); // Update quantity in the cart
    }
  };

  const handleAddToCart = () => {
    addItemToCart(product, quantity); // Add item to the cart with the current quantity
  };

  const goToNextImage = () => {
    if (currentImageIndex < additionalImages.length) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const goToPreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  // Handle back button with redirection to previous page or search results
  const handleBack = () => {
    if (searchQuery) {
      navigate("/", { state: { searchQuery } }); // Pass searchQuery back to HomePage
    } else {
      navigate("/"); // Redirect to homepage
    }
  };

  const allImages = [image, ...additionalImages];
  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-4 sm:p-6 max-w-3xl mx-auto flex-grow">
        <button onClick={handleBack} className="bg-gray-500 text-white py-2 px-4 rounded-lg">
          Back to {searchQuery ? 'Search Results' : 'Home'}
        </button>

        <div className="flex flex-col sm:flex-row bg-white shadow-lg rounded-lg p-4">
          <div className="relative w-full sm:w-1/2">
            <img
              src={allImages[currentImageIndex]}
              alt={name}
              className="w-full object-contain rounded-md"
            />
            <button
              onClick={goToPreviousImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full"
            >
              &lt;
            </button>
            <button
              onClick={goToNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full"
            >
              &gt;
            </button>
          </div>

          <div className="p-4 sm:w-1/2">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-gray-600">{description}</p>
            <div className="mt-2">
              <span className="text-gray-500 line-through">{wasPrice}</span>
              <span className="text-green-600 text-xl font-bold ml-2">{isPrice}</span>
            </div>

            <div className="mt-4">
              <span className="font-bold text-gray-800">Stock Remaining: {stock}</span>
            </div>

            
            <div className="mt-4 flex items-center space-x-2">
              <button onClick={handleDecreaseQuantity} className="bg-gray-200 text-gray-800 py-1 px-3 rounded-md">-</button>
              <span>{quantity}</span> {/* ✅ Updated instantly */}
              <button onClick={handleIncreaseQuantity} className="bg-gray-200 text-gray-800 py-1 px-3 rounded-md">+</button>
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
            >
              Add to Cart
            </button>

            <div className="mt-6">
              <h3 className="text-xl font-semibold">Rating: {rating}</h3>
              <p className="text-gray-600">{reviews.length} reviews</p>
            </div>
          
            <div className="mt-4">
              {additionalImages && additionalImages.length > 0 && (
                <div>
                  <h4 className="font-semibold">Additional Images</h4>
                  <div className="flex space-x-4">
                    {allImages.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`image-${index}`}
                        className={`w-24 h-24 object-cover rounded-md cursor-pointer ${currentImageIndex === index ? 'border-2 border-blue-500' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          {reviews && reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="border-t pt-4">
                <p className="text-sm text-gray-600">{review.text}</p>
                <span className="text-yellow-500">{"★".repeat(review.rating)}</span>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>

      {/* Bottom Navigation for Smaller Screens */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 sm:hidden z-[50]">
        <div className="flex justify-between items-center p-[10px]">
          <Link to="/" className="flex flex-col items-center text-white space-y-[5px]">
            <FaHome className="text-xl" />
            <span className="text-xs">Home</span>
          </Link>

          <Link to="/categories" className="flex flex-col items-center text-white space-y-[5px]">
            <FaList className="text-xl" />
            <span className="text-xs">Categories</span>
          </Link>

          <Link to="/messages" className="flex flex-col items-center text-white space-y-[5px]">
            <FaCommentDots className="text-xl" />
            <span className="text-xs">Messages</span>
          </Link>

          <Link to="/cart" className="flex flex-col items-center text-white space-y-[5px]">
            <div className="relative">
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-xs">Cart</span>
          </Link>

          <Link to="/account" className="flex flex-col items-center text-white space-y-[5px]">
            <FaUser className="text-xl" />
            <span className="text-xs">Account</span>
          </Link>
        </div>
      </div>

      {/* Add Padding at the Bottom of the Main Content */}
      <div className="pb-[80px] sm:pb-[20px]">
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

ProductDetails.propTypes = { isAuthenticated: PropTypes.bool.isRequired };
export default ProductDetails;

