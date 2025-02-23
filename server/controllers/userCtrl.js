const path = require("path");
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  console.log('Register route hit');
  try {
    const { username, password, confirmPassword, role } = req.body;

    // Check if any field is missing
    if (!username || !password || !confirmPassword || !role) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Email format validation (more specific and robust regex for email validation)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Local Kenya phone number validation (starting with 07)
    const kenyaPhoneRegex = /^07\d{8}$/;
    // International phone number validation (E.164 format: +<country_code><local_number>)
    const internationalPhoneRegex = /^\+[1-9]\d{1,3}\d{4,14}$/;

    // Valid email domains (Add more domains as necessary)
    const validDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];

    // Check if username is either a valid email or a phone number
    if (emailRegex.test(username)) {
      const domain = username.split('@')[1];
      if (!validDomains.includes(domain)) {
        return res.status(400).json({ message: 'Invalid email format.' });
      }
    } else if (!(kenyaPhoneRegex.test(username) || internationalPhoneRegex.test(username))) {
      return res.status(400).json({ message: 'Invalid email or phone number format' });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if role is valid
    if (role !== 'admin' && role !== 'customer') {
      return res.status(400).json({ message: 'Invalid role. Only "admin" or "customer" are allowed.' });
    }

    // Password strength validation (at least 8 characters, one uppercase, one number, one special character)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character.',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      username,
      password,
      role,
    });

    // Hash password before saving
    user.password = await bcrypt.hash(user.password, 10);

    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



// Function to login a user
const loginUser = async (req, res) => {
  console.log("Login route hit");
  console.log("Received login request:", req.body);

  try {
    const { username, password } = req.body;

    // Check if any field is missing
    if (!username || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      console.log("User not found in database.");
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Log password details for debugging
    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", user.password);

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isValid);

    if (!isValid) {
      console.log("Password does not match.");
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token with role and userId
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    console.log("User authenticated successfully.");

    // Return token, role, userId, and a success message
    res.json({
      token,
      role: user.role,
      userId: user._id,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to handle logout
const logoutUser = async (req, res) => {
  try {
    console.log("Logout route hit");

    // Since JWT is stateless, we don't need to invalidate it on the server.
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to verify token
const verifyToken = async (req, res, next) => {
  console.log("🔵 Token verification route hit");
  console.log("Headers Received:", req.headers);

  const token = req.headers.authorization?.split(" ")[1]; // Extract token

  if (!token) {
    console.log("🔴 No token found in headers!");
    return res.status(400).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("✅ Decoded Token:", decoded);

    const user = await User.findById(decoded.userId);
    if (!user) {
      console.log("🔴 User not found!");
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // ✅ Attach user to request object
    next(); // ✅ Allow the request to proceed to the next middleware/controller
  } catch (error) {
    console.log("🔴 Token verification failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
// Fetch all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username role createdAt updatedAt'); // ✅ Explicitly include timestamps
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete user by ID
    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
// Update User Controller
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, role } = req.body;

    // Ensure username and role are provided
    if (!username || !role) {
      return res.status(400).json({ message: "Username and role are required" });
    }

    // Ensure role is either "admin" or "customer"
    if (!["admin", "customer"].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Only "admin" or "customer" are allowed.' });
    }

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, role, updatedAt: Date.now() }, // Ensure updatedAt is modified
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// Get Admin Profile
const getAdminProfile = async (req, res) => {
  try {
    console.log("🔍 Searching for Admin ID:", req.user.userId);

    // Find admin and exclude password
    const admin = await User.findById(req.user.userId).select("-password");

    if (!admin || req.user.role !== "admin") {
      return res.status(403).json({ message: "🚫 Unauthorized" });
    }

    // Ensure profileImage has a full URL
    const profileImageUrl = admin.profileImage
      ? `${req.protocol}://${req.get("host")}${admin.profileImage}`
      : null;

    console.log("✅ Fetched Admin:", admin);

    // Send updated profile data
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      username: admin.username,
      role: admin.role,
      profileImage: profileImageUrl, // ✅ Ensure correct URL
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    });
  } catch (error) {
    console.error("❌ Error in getAdminProfile:", error);
    res.status(500).json({ message: "Server error", error });
  }
};




// Update Admin Profile
const updateAdminProfile = async (req, res) => {
  try {
    console.log("✅ Decoded Token:", req.user);

    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized. Admins only." });
    }

    const adminId = req.user.userId;
    console.log("Searching for Admin ID:", adminId);

    const admin = await User.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    console.log("Fetched Admin:", admin);

    const { name, email, password } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required." });
    }

    // Update fields from request body
    admin.name = name;
    admin.email = email;

    // Handle profile image upload
    if (req.file) {
      console.log("Uploaded File:", req.file); // Debugging

      // Ensure correct URL format
      admin.profileImage = `/uploads/${req.file.filename}`;

      console.log("Profile Image Path:", admin.profileImage);
    }

    // Update password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
    }

    await admin.save();
    console.log("Updated Admin Data:", admin);

    res.json({
      message: "Profile updated successfully.",
      user: {
        name: admin.name,
        email: admin.email,
        username: admin.username,
        profileImage: `${process.env.BASE_URL || "http://localhost:5000"}${admin.profileImage}`, // Full URL
      },
    });
  } catch (error) {
    console.error("Error updating admin profile:", error);
    res.status(500).json({ message: "Server error", error });
  }
};




module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  verifyToken,
  getAllUsers,
  deleteUser,
  updateAdminProfile,
  updateUser,
  getAdminProfile, // ✅ Added
};