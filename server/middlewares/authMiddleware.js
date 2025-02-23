const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("Auth Header Received:", authHeader); // Debugging: Log the received Authorization header

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Unauthorized: No token provided.");
    return res.status(401).json({ message: "Unauthorized: No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract token after 'Bearer'
  console.log("Extracted Token:", token); // Debugging: Log the extracted token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token Payload:", decoded); // Debugging: Log the decoded token details

    req.user = { userId: decoded.userId, role: decoded.role }; // Attach only necessary fields
    next();
  } catch (error) {
    console.log("Token Verification Error:", error.message);
    return res.status(403).json({ message: "Unauthorized: Invalid or expired token." });
  }
};

// ✅ Middleware for admin-only routes
const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    console.log("Forbidden: User is not an admin.");
    return res.status(403).json({ message: "Forbidden: Admin access required." });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };
