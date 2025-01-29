import React from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { useCart } from "../components/Context/MyCartContext"; // Ensure this matches the actual file path

const Cart = () => {
  const { cartItems, removeFromCart, calculateTotal } = useCart();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center relative">
      {/* ShopEase Logo - Positioned outside the container */}
      <Link
        to="/"
        className="text-4xl font-bold text-blue-600 mb-6 text-left absolute top-6 left-6 hidden sm:block"
      >
        ShopEase
      </Link>

      <div className="w-full max-w-4xl bg-white p-6 rounded-md shadow-lg">
        {/* Page Header */}
        <h1 className="text-2xl font-bold mb-4 text-center">Your Cart</h1>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-700">Your cart is empty!</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm"
              >
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">Price: Ksh {item.price}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-semibold">
                    Ksh {(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrashAlt className="text-xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Total Section */}
        {cartItems.length > 0 && (
          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total:</h2>
            <p className="text-2xl font-bold">Ksh {calculateTotal()}</p>
          </div>
        )}

        {/* Checkout Button */}
        {cartItems.length > 0 && (
          <div className="mt-6 mb-[80px] sm:mb-[20px]">
            <Link
              to="/checkout"
              className="w-full block text-center py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
