import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";

const Account = () => {
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between Login and Sign Up
  const [username, setUsername] = useState(""); // Username can be either email or phone number
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false); // State for terms and conditions agreement
  const [showPassword, setShowPassword] = useState(false); // State to toggle show/hide password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle show/hide confirm password

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login or sign-up logic here (e.g., API call to authenticate or register a new user)
    console.log("Submitting form:", username, password);
  };

  const handleGoogleLogin = () => {
    console.log("Google Login clicked");
    // Add Google login logic here
  };

  const handleFacebookLogin = () => {
    console.log("Facebook Login clicked");
    // Add Facebook login logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* ShopEase Name Positioned Outside the Form Container and Visible Only on Larger Screens */}
      <div className="absolute top-0 left-0 ml-4 mt-4 text-2xl font-bold text-blue-600 hover:text-blue-800 hidden sm:block">
        <Link to="/">ShopEase</Link>
      </div>

      {/* Centered Form Container */}
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg mx-auto mt-16">
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

export default Account;
