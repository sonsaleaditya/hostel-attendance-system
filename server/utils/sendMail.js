//configs/sendMail.js
const nodemailer = require('nodemailer');

require('dotenv').config()

async function sendMail(recipientMail, title, body) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST || 'smtp.example.com', // Default to a valid SMTP host
            port: parseInt(process.env.MAIL_PORT, 10) || 587, // Ensure port is parsed as an integer
            secure: process.env.MAIL_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_USER || 'default@example.com', // Default to a placeholder user
                pass: process.env.MAIL_PASS || 'defaultpassword' // Default to a placeholder password
            }
        });

        let info = await transporter.sendMail({
            from: `"Hostel Management System" <no-reply@${process.env.MAIL_DOMAIN || 'yourdomain.com'}>`, // Use a verified domain
            to: recipientMail,
            subject: title,
            html: body
        });

        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Re-throw the error after logging it
    }
}

module.exports = { sendMail };





