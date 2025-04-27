const Attendance = require('../models/attendance.model');
const { ABlock, BBlock, CBlock, DBlock } = require('../models/user.model');
const moment = require('moment')
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

// Mark Attendance
const markAttendance = async (req, res) => {
    try {
        const { reg_no, block } = req.user;
        const { status } = req.body;

        // Validate inputs
        if (!reg_no || !block || !status || !['Present', 'Absent'].includes(status)) {
            return res.status(400).json({ message: 'Invalid input. Please provide reg_no, block, and a valid status.' });
        }

        // Get the corresponding block model
        const blockModel = getBlockModel(block);

        // Find the student in the respective block
        const student = await blockModel.findOne({ reg_no });
        if (!student) {
            return res.status(404).json({ message: `Student not found in block ${block}.` });
        }

        // Normalize today's date to 00:00:00 in UTC
        const today = moment().utc().startOf('day').toDate(); // Use moment.js to ensure correct UTC date

        // Check if attendance has already been marked for today
        const existingAttendance = await Attendance.findOne({ student: student._id, block, date: today });
        if (existingAttendance) {
            return res.status(400).json({ message: 'Attendance already marked for today.' });
        }

        // Save the attendance record
        const attendanceEntry = new Attendance({
            student: student._id,
            block,
            date: today,
            status
        });

        await attendanceEntry.save();

        return res.status(201).json({ message: 'Attendance marked successfully.', attendanceEntry });
    } catch (error) {
        console.error('Error marking attendance:', error.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


// Get Attendance for a Student
const getAttendance = async (req, res) => {
    try {
        const { reg_no, block } = req.user;

        if (!reg_no || !block) {
            return res.status(400).json({ message: 'Please provide reg_no and block to fetch attendance.' });
        }

        // Get the corresponding block model
        const blockModel = getBlockModel(block);

        // Find the student in the respective block
        const student = await blockModel.findOne({ reg_no });
        if (!student) {
            return res.status(404).json({ message: `Student not found in block ${block}.` });
        }

        // Normalize today's date to 00:00:00 in UTC
        const today = moment().utc().startOf('day').toDate(); 

        // Retrieve attendance records for today
        const attendanceRecords = await Attendance.find({
            student: student._id,
            block,
            date: today,
        });

        

        return res.status(200).json({ message: 'Today\'s attendance records fetched successfully.', attendanceRecords });
    } catch (error) {
        console.error('Error fetching attendance:', error.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


module.exports = { markAttendance, getAttendance };
