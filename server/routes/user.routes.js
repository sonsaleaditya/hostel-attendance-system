const express = require('express');
const { signUp, signIn, updatePassword } = require('../controllers/user.controller.js');
const {auth} = require('../middlewares/auth.middleware.js')
const router = express.Router();

// User Sign-Up (Register)
router.post('/signup', signUp);

// User Sign-In (Login)
router.post('/signin', signIn);

// Update Password
router.put('/update-password',auth, updatePassword);

module.exports = router;
