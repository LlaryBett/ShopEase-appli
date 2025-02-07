import React from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { useCart } from "../components/Context/MyCartContext"; // Ensure this matches the actual file path

const Cart = () => {
  const { cartItems, removeFromCart, calculateTotal, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center relative">
      <Link to="/" className="text-4xl font-bold text-blue-600 mb-6 text-left absolute top-6 left-6 hidden sm:block">
        ShopEase
      </Link>

      <div className="w-full max-w-4xl bg-white p-6 rounded-md shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-700">Your cart is empty!</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => {
              const price = parseFloat(item.productId.isPrice.replace(/[^\d.]/g, '')); // Correctly parse price
              return (
                <div
                  key={item._id} // Unique key for each item
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.productId.image}
                      alt={item.productId.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{item.productId.name}</h3>
                      <p className="text-sm text-gray-500">Price: Ksh {item.productId.isPrice}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-lg font-semibold">
                      Ksh {(price * item.quantity).toFixed(2)} {/* Use parsed price */}
                    </p>
                    <button onClick={() => removeFromCart(item.productId._id)} className="text-red-600 hover:text-red-800">
                      <FaTrashAlt className="text-xl" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {cartItems.length > 0 && (
          <>
            {/* Total Section */}
            <div className="mt-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Total:</h2>
              <p className="text-2xl font-bold">Ksh {calculateTotal()}</p> {/* Use calculateTotal */}
            </div>

            {/* Clear Cart Button */}
            <div className="mt-6 mb-[80px] sm:mb-[20px]">
              <button 
                onClick={clearCart} 
                className="w-full block text-center py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
              >
                Clear Cart
              </button>
            </div>

            {/* Proceed to Checkout Button */}
            <div className="mt-6 mb-[80px] sm:mb-[20px]">
              <Link to="/checkout" className="w-full block text-center py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
