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
  console.log('Login route hit');

  try {
    const { username, password } = req.body;

    // Check if any field is missing
    if (!username || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token with role and userId
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    // Return token, role, userId, and a success message
    res.json({
      token,
      role: user.role,
      userId: user._id, // Return the userId as well
      message: 'Logged in successfully',
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Function to handle logout
const logoutUser = async (req, res) => {
  try {
    // Since JWT is stateless, we don't need to invalidate it on the server.
    // Simply return a success message.
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Function to verify token
const verifyToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  try {
    // Verify token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user based on the decoded user ID (from the token)
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If user exists and the token is valid
    return res.json({ valid: true, user });
  } catch (error) {
    // If token is invalid or any other error occurs
    return res.status(401).json({ valid: false, message: "Invalid or expired token" });
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


module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  verifyToken,
  getAllUsers,
  deleteUser,
  updateUser // ✅ Export getAllUsers
};
