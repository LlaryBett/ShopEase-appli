const express = require('express');
const userCtrl = require('../controllers/userCtrl');

const router = express.Router();
const { verifyToken } = require("../controllers/userCtrl"); 

router.post('/register', userCtrl.registerUser);
router.post('/login', userCtrl.loginUser);
// Add logout route
router.post('/logout', userCtrl.logoutUser);
// Endpoint to verify the token
router.post("/verify-token", verifyToken);

module.exports = router;
