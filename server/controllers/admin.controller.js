const Admin = require('../models/admin.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Create a new admin
const createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message : "all fields are mandatory!!"
            })
        }
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists with this registration number.' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new Admin({
            name,
            email,
            password: hashedPassword
        });

        await admin.save();
        res.status(201).json({ message: 'Admin created successfully.', admin });
    } catch (error) {
        console.error('Error creating admin:', error.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Get all admins
const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json({ admins });
    } catch (error) {
        console.error('Error fetching admins:', error.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if admin exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found.' });
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate a JWT token
        const token = jwt.sign({ name : admin.name, userId: admin._id, email: admin.email, role : admin.role }, JWT_SECRET, {
            expiresIn: '1h' // Token expires in 1 hour
        });

        // Set token in cookies
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000 // 1 hour in milliseconds
        });

        return res.status(200).json({ message: 'Login successful.', token : token });
    } catch (error) {
        console.error('Error logging in admin:', error.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = {
    createAdmin,
    getAdmins,
    adminLogin
};
