const express = require('express');
const {
    getBlockStudents,
    getPresentStudentsByBlock,
    getAbsentStudentsByBlock,
    getPresentStudentsByDate,  // New route for fetching present students by date
    getAbsentStudentsByDate    // New route for fetching absent students by date
} = require('../controllers/block.controller');

const router = express.Router();

// Route to fetch all students in a block
router.get('/:block/students', getBlockStudents);

// Route to fetch present students in a block for today's date
router.get('/:block/present', getPresentStudentsByBlock);

// Route to fetch absent students in a block for today's date
router.get('/:block/absent', getAbsentStudentsByBlock);

// Route to fetch present students in a block for a specific date
router.get('/:block/present/:date', getPresentStudentsByDate); // Date format: YYYY-MM-DD

// Route to fetch absent students in a block for a specific date
router.get('/:block/absent/:date', getAbsentStudentsByDate); // Date format: YYYY-MM-DD

module.exports = router;
