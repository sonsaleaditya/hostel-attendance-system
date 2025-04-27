const mongoose = require('mongoose');

// Define the Attendance schema
const attendanceSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        block: {
            type: String,
            required: true,
            enum: ['A', 'B', 'C', 'D'] // Ensures valid block names
        },
        date: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['Present', 'Absent'],
            required: true
        }
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Pre-save hook to normalize the date to midnight UTC
attendanceSchema.pre('save', function (next) {
    if (this.date) {
        const utcDate = new Date(Date.UTC(
            this.date.getUTCFullYear(),
            this.date.getUTCMonth(),
            this.date.getUTCDate()
        ));
        this.date = utcDate;
    }
    next();
});

// Add a unique index to prevent duplicate attendance records for the same student, block, and date
attendanceSchema.index({ student: 1, block: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;
