const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  deleteUser,
  updateUser,
  updateAdminProfile,
  getAdminProfile,
} = require("../controllers/userCtrl");

const { verifyToken, verifyAdmin } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadsMiddleware"); // Import multer middleware

const router = express.Router();

// 🟢 Authentication routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// 🟢 Token verification route ✅ Now returns user data
router.get("/verify-token", verifyToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// 🟢 User management routes (Protected)
router.delete("/:id", verifyToken, deleteUser);
router.put("/:id", verifyToken, updateUser);

// 🟢 Admin profile routes (Protected, Admin-only)
router.get("/admin/profile", verifyToken, verifyAdmin, getAdminProfile);

// Update profile route with file upload support
router.put(
  "/admin/update-profile",
  verifyToken,
  verifyAdmin,
  upload.single("profileImage"), // Handle profile image upload
  updateAdminProfile
);

module.exports = router;
