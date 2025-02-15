const express = require("express");
const router = express.Router();
const analyticsCtrl = require("../controllers/analyticsCtrl");

// Get analytics data
router.get("/", analyticsCtrl.getAnalytics);

module.exports = router;
