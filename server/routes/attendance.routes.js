const express = require('express');
const { markAttendance, getAttendance  } = require('../controllers/attendance.controller');
const {auth, isAdmin} = require('../middlewares/auth.middleware')
const router = express.Router();

// Existing routes
router.post('/mark',auth, markAttendance);
router.post('/get-attendance',auth, getAttendance);
// New route to fetch absent students

module.exports = router;
