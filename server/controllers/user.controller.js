const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const { ABlock, BBlock, CBlock, DBlock } = require('../models/user.model'); // Unified schema for all blocks

const JWT_SECRET = process.env.JWT_SECRET; // Secure secret key from environment variables

// Function to determine the block model from block name
const getBlockModel = (block) => {
    switch (block.toUpperCase()) {
        case 'A':
            return ABlock;
        case 'B':
            return BBlock;
        case 'C':
            return CBlock;
        case 'D':
            return DBlock;
        default:
            throw new Error('Invalid block provided.');
    }
};

// Function to extract block from room number (e.g., "SHSA07" -> "A")
const getBlock = (room_no) => {
    if (!room_no || room_no.length < 4) throw new Error('Invalid room number.');
    return room_no[3].toUpperCase();
};

// User Sign-Up
const signUp = async (req, res) => {
    try {
        const { name, room_no, reg_no, email, password } = req.body;

        // Extract the block from the room number
        const block = getBlock(room_no);

        // Get the corresponding block model
        const blockModel = getBlockModel(block);

        // Check if user already exists in the block
        const existingUser = await blockModel.findOne({ reg_no });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this registration number in the block.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user to the corresponding block model
        const newUser = new blockModel({
            name,
            room_no,
            reg_no,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error in signUp:', error.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// User Sign-In
const signIn = async (req, res) => {
    try {
        const { reg_no, password, block } = req.body;

        if(!reg_no || !password || !block){
            return res.json({
                msg:"all fields are mandatory!!!"
            })
        }
        // Validate block input
        if (!['A', 'B', 'C', 'D'].includes(block.toUpperCase())) {
            return res.status(400).json({ message: 'Invalid block provided.' });
        }

        // Get the corresponding block model
        const blockModel = getBlockModel(block);

        // Check if user exists in the block
        const user = await blockModel.findOne({ reg_no });
        if (!user) {
            return res.status(404).json({ message: 'User not found in this block. Please register first.' });
        }

        // Default password is registration number in uppercase
        const defaultPassword = reg_no.toUpperCase();

        // Check if the provided password is the default password
        if (password !== defaultPassword) {
            // Compare hashed password with the entered password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials.' });
            }
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, name : user.name, reg_no: user.reg_no, block:block , role:"User"}, JWT_SECRET, {
            expiresIn: '1h', // Token expires in 1 hour
        });

        // Set the token in an HTTP-only cookie
        res.cookie('authToken', token, {
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            secure: process.env.NODE_ENV === 'production', // Send cookie over HTTPS only in production
            sameSite: 'strict', // Prevents CSRF by ensuring cookies are sent only to your site
            maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
        });

        return res.status(200).json({ message: 'Sign-in successful.' , token : token});
    } catch (error) {
        console.error('Error in signIn:', error.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Update Password
const updatePassword = async (req, res) => {
    try {
        const { reg_no, block } = req.user;
        const { oldPassword, newPassword} = req.body;

        // Validate block input
        if (!['A', 'B', 'C', 'D'].includes(block.toUpperCase())) {
            return res.status(400).json({ message: 'Invalid block provided.' });
        }

        // Get the corresponding block model
        const blockModel = getBlockModel(block);

        // Find user by reg_no
        const user = await blockModel.findOne({ reg_no });
        if (!user) {
            return res.status(404).json({ message: 'User not found in this block.' });
        }

        // Default password is registration number in uppercase
        const defaultPassword = reg_no.toUpperCase();

        // Check if the current password is the default password
        if (oldPassword !== defaultPassword) {
            // Validate old password if it's not the default password
            const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Old password is incorrect.' });
            }
        }

        // Ensure new password and confirm password match

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update password in the database
        user.password = hashedNewPassword;
        await user.save();

        return res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
        console.error('Error in updatePassword:', error.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


module.exports = { signUp, signIn, updatePassword };
