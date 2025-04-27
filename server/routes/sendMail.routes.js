const express = require('express');
const {sendMail}  = require('../utils/sendMail')

const router = express.Router();

// POST route to send an email
router.post('/send', async (req, res) => {
try {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
        return res.status(400).json({ success : false, error: 'Missing required fields: to, subject, text' });
    }

    await sendMail(to, subject, text);
    res.status(200).json({ success : true, message: 'Email sent successfully' });
} catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success : false,  error: 'Failed to send email' });
}
});

module.exports = router;


