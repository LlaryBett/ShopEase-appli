const express = require('express');
const userCtrl = require('../controllers/userCtrl');

const router = express.Router();
const { verifyToken, deleteUser } = require("../controllers/userCtrl"); 

router.post('/register', userCtrl.registerUser);
router.post('/login', userCtrl.loginUser);
router.post('/logout', userCtrl.logoutUser);
router.post('/verify-token', verifyToken);

// Route to get all users
router.get('/', userCtrl.getAllUsers);

// Route to delete a user
router.delete('/:id', deleteUser); // ✅ Delete user by ID
// Route to update a user
router.put('/:id', userCtrl.updateUser);


module.exports = router;
