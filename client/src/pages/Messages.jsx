import  { useState } from "react";
import { Link } from "react-router-dom";
import {  FaTrashAlt,  } from "react-icons/fa";

const Messages = () => {
  // Simulating message data for different sections
  const [messages, setMessages] = useState({
    contactUs: [
      {
        id: 1,
        sender: "Support Team",
        subject: "How to Contact Us",
        content: "We are available through chat or email. Feel free to reach out!",
        timestamp: "2025-01-20 10:00 AM",
      },
    ],
    orderUpdates: [
      {
        id: 2,
        sender: "ShopEase",
        subject: "Your Order #12345",
        content: "Your order has been shipped and is on the way!",
        timestamp: "2025-01-28 04:00 PM",
      },
    ],
    promotions: [
      {
        id: 3,
        sender: "ShopEase",
        subject: "Exclusive Offer Just For You",
        content: "Get 20% off on your next purchase with the code SAVE20.",
        timestamp: "2025-01-15 09:00 AM",
      },
    ],
    comments: [
      {
        id: 4,
        sender: "John Doe",
        subject: "Great Service",
        content: "I had an amazing experience shopping with you!",
        timestamp: "2025-01-22 01:30 PM",
      },
    ],
  });

  const handleDelete = (id, section) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      [section]: prevMessages[section].filter((message) => message.id !== id),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-md shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>

        {/* Contact Us Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Contact Us with Chat</h2>
          {messages.contactUs.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            <div className="space-y-4">
              {messages.contactUs.map((message) => (
                <div
                  key={message.id}
                  className="flex justify-between items-center p-4 rounded-md shadow-sm bg-gray-50"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{message.subject}</h3>
                    <p className="text-sm text-gray-500">{message.content}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm text-gray-400">{message.timestamp}</p>
                    <button
                      onClick={() => handleDelete(message.id, "contactUs")}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Updates Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Updates</h2>
          {messages.orderUpdates.length === 0 ? (
            <p>No updates for your orders.</p>
          ) : (
            <div className="space-y-4">
              {messages.orderUpdates.map((message) => (
                <div
                  key={message.id}
                  className="flex justify-between items-center p-4 rounded-md shadow-sm bg-gray-50"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{message.subject}</h3>
                    <p className="text-sm text-gray-500">{message.content}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm text-gray-400">{message.timestamp}</p>
                    <button
                      onClick={() => handleDelete(message.id, "orderUpdates")}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Promotions Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Promotions</h2>
          {messages.promotions.length === 0 ? (
            <p>No promotional messages.</p>
          ) : (
            <div className="space-y-4">
              {messages.promotions.map((message) => (
                <div
                  key={message.id}
                  className="flex justify-between items-center p-4 rounded-md shadow-sm bg-gray-50"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{message.subject}</h3>
                    <p className="text-sm text-gray-500">{message.content}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm text-gray-400">{message.timestamp}</p>
                    <button
                      onClick={() => handleDelete(message.id, "promotions")}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>
          {messages.comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            <div className="space-y-4">
              {messages.comments.map((message) => (
                <div
                  key={message.id}
                  className="flex justify-between items-center p-4 rounded-md shadow-sm bg-gray-50"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{message.subject}</h3>
                    <p className="text-sm text-gray-500">{message.content}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm text-gray-400">{message.timestamp}</p>
                    <button
                      onClick={() => handleDelete(message.id, "comments")}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add New Message Button */}
        <div className="mt-6 text-center">
          <Link
            to="/new-message"
            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            New Message
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Messages;
