const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middlewares/auth.middleware.js');
const { createAdmin, getAdmins, adminLogin } = require('../controllers/admin.controller');

// Create a new admin (accessible only to an existing admin)
router.post('/signup', createAdmin);

// Get all admins (accessible only to admins)
router.get('/list', auth, isAdmin, getAdmins);

// Admin login
router.post('/login', adminLogin);

module.exports = router;
