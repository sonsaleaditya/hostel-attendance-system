const mongoose = require('mongoose');
const moment = require('moment');
const Attendance = require('../models/attendance.model'); // Import Attendance schema
const { ABlock, BBlock, CBlock, DBlock } = require('../models/user.model'); // Separate models for blocks

// Utility to get the correct block model
const getBlockModel = (block) => {
    const blocks = { A: ABlock, B: BBlock, C: CBlock, D: DBlock };
    return blocks[block.toUpperCase()];
};

const getDateRange = (date) => {
    const startOfDay = moment(date).utc().startOf('day').toDate();
    const endOfDay = moment(date).utc().endOf('day').toDate();
    return { startOfDay, endOfDay };
};


const getBlockStudents = async (req, res) => {
    try {
        const { block } = req.params;

        if (!block || !/^[A-Da-d]$/.test(block)) {
            return res.status(400).json({ message: 'Please provide a valid block identifier (A, B, C, D).' });
        }

        const BlockModel = getBlockModel(block);
        if (!BlockModel) {
            return res.status(404).json({ message: `Block ${block.toUpperCase()} not found.` });
        }

        const students = await BlockModel.find(); // Fetch all students in the block

        return res.status(200).json({
            block: block.toUpperCase(),
            totalStudents: students.length,
            students
        });
    } catch (error) {
        console.error('Error fetching block students:', error.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

/**
 * Fetch present students in a block for today's date.
 */
const getPresentStudentsByBlock = async (req, res) => {
    try {
        const { block } = req.params;

        // Validate block parameter
        if (!block || !/^[A-Da-d]$/.test(block)) {
            return res.status(400).json({ message: 'Please provide a valid block identifier (A, B, C, D).' });
        }

        const BlockModel = getBlockModel(block); // Fetch the correct block model
        if (!BlockModel) {
            return res.status(404).json({ message: `Block ${block.toUpperCase()} not found.` });
        }

        // Get today's date (start and end) normalized to UTC for comparison
        const todayStart = moment().utc().startOf('day').toDate(); // Start of the day UTC
        const todayEnd = moment().utc().endOf('day').toDate(); // End of the day UTC

        // Fetch students in the block
        const students = await BlockModel.find();
        if (!students || students.length === 0) {
            return res.status(200).json({ message: `No students found in block ${block.toUpperCase()}.` , presentStudents: []});
        }

        const studentIds = students.map(student => new mongoose.Types.ObjectId(student._id));

        // Fetch attendance records for today and for present students in this block
        const presentRecords = await Attendance.find({
            student: { $in: studentIds },
            block: block.toUpperCase(),
            date: { $gte: todayStart, $lt: todayEnd },
            status: 'Present'
        }).populate({
            path: 'student',
            select: 'name reg_no room_no',  // Specify which fields you want to populate
            model: BlockModel  // Dynamically populate from the correct block model
        });

        // Log the presentRecords to inspect the fetched data
        //console.log('Present Records:', presentRecords);

        // Check if presentRecords is an empty array or doesn't contain populated student data
        // if (!presentRecords || presentRecords.length === 0) {
        //     return res.status(404).json({ message: 'No present students found for today.' });
        // }

        // Map present student data (extract necessary fields only)
        const presentStudents = presentRecords.map(record => ({
            name: record.student.name,
            reg_no: record.student.reg_no,
            room_no: record.student.room_no
        }));

       // console.log('Mapped Present Students:', presentStudents); // Log mapped students for inspection

        return res.status(200).json({
            block: block.toUpperCase(),
            date: todayStart.toISOString(),
            presentStudents // Return the simplified list
        });
    } catch (error) {
        console.error('Error fetching present students by block:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

/**
 * Fetch absent students in a block for today's date.
 */
const getAbsentStudentsByBlock = async (req, res) => {
    try {
        const { block } = req.params;

        // Validate the block input
        if (!block || !/^[A-Da-d]$/.test(block)) {
            return res.status(400).json({ message: 'Please provide a valid block identifier (A, B, C, D).' });
        }

        // Fetch the block model
        const BlockModel = getBlockModel(block);
        if (!BlockModel) {
            return res.status(404).json({ message: `Block ${block.toUpperCase()} not found.` });
        }

        // Calculate today's start and end in UTC
        const todayStart = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()));
        const todayEnd = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate() + 1));

        //console.log('Today Start:', todayStart, 'Today End:', todayEnd);

        // Fetch all students in the block
        const students = await BlockModel.find();
     //  console.log('All Students in Block:', students);

        const studentIds = students.map(student => student._id);
       // console.log('Student IDs:', studentIds);

        // Fetch attendance records for the block today
        const attendanceRecords = await Attendance.find({
            student: { $in: studentIds },
            date: { $gte: todayStart, $lt: todayEnd },
        }).populate('student', 'name reg_no room_no');
        //console.log('Attendance Records:', attendanceRecords);

        // Extract present student IDs
        const presentStudentIds = attendanceRecords
            .filter(record => record.status === 'Present')
            .map(record => record.student._id.toString());
       // console.log('Present Student IDs:', presentStudentIds);

        // Filter out present students to get non-present students
        const nonPresentStudents = students.filter(student => !presentStudentIds.includes(student._id.toString()));
       // console.log('Non-Present Students:', nonPresentStudents);

        // Map non-present students to a simplified list
        const nonPresentList = nonPresentStudents.map(student => ({
            name: student.name,
            reg_no: student.reg_no,
            room_no: student.room_no,
        }));

        // Return the response
        return res.status(200).json({
            block: block.toUpperCase(),
            date: todayStart.toISOString(),
            nonPresentStudents: nonPresentList,
        });
    } catch (error) {
        console.error('Error fetching non-present students by block:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};



/**
 * Fetch present students in a block for a specific date.
 */
const getPresentStudentsByDate = async (req, res) => {
    try {
        const { date, block } = req.params;

        if (!date || !block) {
            return res.status(400).json({ message: "Date and block are required." });
        }

        // Get the corresponding block model
        const BlockModel = getBlockModel(block);
        if (!BlockModel) {
            return res.status(404).json({ message: `Block ${block.toUpperCase()} not found.` });
        }

        // Parse date to ensure proper comparison
        const queryDate = new Date(date);
        const nextDay = new Date(queryDate);
        nextDay.setDate(queryDate.getDate() + 1); // Get the next day for the date range

        // Fetch attendance records for the given date and block
        const presentRecords = await Attendance.find({
            block: block.toUpperCase(),
            date: { $gte: queryDate, $lt: nextDay },
            status: 'Present'
        }).populate({
            path: 'student', // Populate the student data
            select: 'name reg_no room_no',  // Select only necessary fields
            model: BlockModel // Use the corresponding block model to populate student data
        });

        // if (!presentRecords.length) {
        //     return res.status(404).json({ message: `No present students found for block ${block} on the date ${date}.` });
        // }

        // Map the present students from the records
        const presentStudents = presentRecords.map(record => ({
            name: record.student.name,
            reg_no: record.student.reg_no,
            room_no: record.student.room_no
        }));

        return res.status(200).json({
            block: block.toUpperCase(),
            date: queryDate.toISOString(),
            presentStudents
        });

    } catch (error) {
        console.error('Error fetching present students by date:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
  

/**
 * Fetch absent students in a block for a specific date.
 */
const getAbsentStudentsByDate = async (req, res) => {
    try {
        const { date, block } = req.params; // Accept date and block from query params
        if (!date || !block) {
            return res.status(400).json({ message: "Date and block are required." });
        }

        // Parse the provided date to ensure proper comparison
        const queryDate = new Date(date);
        const nextDay = new Date(queryDate);
        nextDay.setDate(queryDate.getDate() + 1);

        // Fetch all students in the specified block
        const BlockModel = getBlockModel(block);
        if (!BlockModel) {
            return res.status(404).json({ message: `Block ${block.toUpperCase()} not found.` });
        }

        const students = await BlockModel.find();
        if (!students || students.length === 0) {
            return res.status(404).json({ message: `No students found in block ${block.toUpperCase()}.` });
        }

        // Get the IDs of all students in this block
        const studentIds = students.map(student => student._id);

        // Fetch attendance records for "Present" students in the specified date range
        const presentRecords = await Attendance.find({
            student: { $in: studentIds },
            block: block.toUpperCase(),
            date: { $gte: queryDate, $lt: nextDay },
            status: 'Present'
        }).select('student');  // We only need student IDs for present students

        // Extract the IDs of present students
        const presentStudentIds = presentRecords.map(record => record.student.toString());

        // Find all students who are not marked as "Present" (i.e., absent or no attendance)
        const absentStudents = students.filter(student => !presentStudentIds.includes(student._id.toString()));

        // If no absent students are found
        // if (!absentStudents || absentStudents.length === 0) {
        //     return res.status(404).json({ message: 'No absent students found for the specified date.' });
        // }

        // Return the list of absent students
        return res.status(200).json({
            block: block.toUpperCase(),
            date: queryDate.toISOString(),
            absentStudents: absentStudents.map(student => ({
                name: student.name,
                reg_no: student.reg_no,
                room_no: student.room_no
            }))
        });
    } catch (error) {
        console.error('Error fetching absent students by date:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


  



module.exports = {
    getBlockStudents,
    getPresentStudentsByBlock,
    getAbsentStudentsByBlock,
    getPresentStudentsByDate,
    getAbsentStudentsByDate
};
