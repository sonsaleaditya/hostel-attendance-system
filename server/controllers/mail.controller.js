const sendMail = require('../services/mail.service');

sendMail(
    'rutujasagare668@gmail.com',
    'Attendance Notification',
    '100 students have marked their attendance.'
);
