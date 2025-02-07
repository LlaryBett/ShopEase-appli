import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import PropTypes from "prop-types"; // Import PropTypes

const Account = ({ setIsAuthenticated }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
  
    const url = isSignUp ? "http://localhost:5000/api/auth/register" : "http://localhost:5000/api/auth/login";
    const body = isSignUp
      ? { username, password, confirmPassword, role: "customer" }
      : { username, password };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
  
      // Log the response to check what is being returned
      console.log("Response Data:", data);
  
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
  
      // Handling the Sign Up (Registration) Case
      if (isSignUp) {
        if (data && data.message) {
          setSuccessMessage(data.message);  // Show the success message returned from the backend
          setTimeout(() => {
            setIsSignUp(false); // After success, switch to Login form
          }, 2000);
        } else {
          throw new Error("Invalid response data during registration");
        }
      }
      // Handling the Login Case
      else {
        if (data && data.token && data.role && data.userId) {
          setSuccessMessage(data.message);
  
          // Save token, role, and userId in localStorage
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role);
          localStorage.setItem('userId', data.userId);  // Store the userId in localStorage
  
          setIsAuthenticated(true);
  
          // Redirect based on user role
          if (data.role === "customer") {
            navigate("/", { replace: true });
          } else {
            navigate("/admin-dashboard", { replace: true });
          }
        } else {
          throw new Error("Invalid response data during login");
        }
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error:", error);
    }
  };
  
  const handleGoogleLogin = () => {
    console.log("Google Login clicked");
  };

  const handleFacebookLogin = () => {
    console.log("Facebook Login clicked");
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* ShopEase Name Positioned Outside the Form Container and Visible Only on Larger Screens */}
      <div className="absolute top-0 left-0 ml-4 mt-4 text-2xl font-bold text-blue-600 hover:text-blue-800 hidden sm:block">
        <Link to="/">ShopEase</Link>
      </div>

      {/* Centered Form Container */}
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg mx-auto mt-16">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display error message */}
        {successMessage && <p className="text-green-500">{successMessage}</p>} {/* Display success message */}

        {/* Conditional Rendering of Login/SignUp Forms */}
        {isSignUp ? (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center">Create an Account</h1>

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email or Phone Number Field */}
              <div>
                <label htmlFor="username" className="block text-lg font-semibold text-gray-700">
                  Email or Phone Number
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your email or phone number"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-lg font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"} // Toggle between text and password type
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter your password"
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                  </div>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-lg font-semibold text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"} // Toggle between text and password type
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Confirm your password"
                  />
                  <div
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  >
                    {showConfirmPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                  </div>
                </div>
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  required
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-600"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the{" "}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-800">
                    ShopEase Terms and Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                disabled={!agreedToTerms} // Disable button if terms are not agreed
              >
                Sign Up
              </button>
            </form>

            {/* Link to Login */}
            <div className="mt-4 text-center">
              <p className="text-gray-700">
                Already have an account?{" "}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Login
                </button>
              </p>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center">Login to your Account</h1>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email or Phone Number Field */}
              <div>
                <label htmlFor="username" className="block text-lg font-semibold text-gray-700">
                  Email or Phone Number
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your email or phone number"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-lg font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"} // Toggle between text and password type
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter your password"
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              >
                Login
              </button>
            </form>

            {/* Link to Sign Up */}
            <div className="mt-4 text-center">
              <p className="text-gray-700">
                Don't have an account?{" "}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </>
        )}

        {/* Social Media Login */}
        <div className="mt-6 text-center">
          <p className="text-gray-700 mb-3">Or login with</p>
          <div className="flex justify-center space-x-4">
            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="flex items-center bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
            >
              <FaGoogle className="mr-2 text-xl" />
              Google
            </button>

            {/* Facebook Login */}
            <button
              onClick={handleFacebookLogin}
              className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              <FaFacebook className="mr-2 text-xl" />
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Prop validation for setIsAuthenticated
Account.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Account;
