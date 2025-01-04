const mongoose = require('mongoose');

// Define the Block schema
const blockSchema = new mongoose.Schema({
    room_no: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    reg_no: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    mob_no: {
        type: String,
        default: null
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

// Create and export models for all blocks
module.exports = {
    ABlock: mongoose.model('A_BLOCK', blockSchema),
    BBlock: mongoose.model('B_BLOCK', blockSchema),
    CBlock: mongoose.model('C_BLOCK', blockSchema),
    DBlock: mongoose.model('D_BLOCK', blockSchema)
};
