// const express = require('express');
// const app = express();
// const cookieParser = require('cookie-parser'); 
// const cors = require('cors')
// require('dotenv').config();
// const port = process.env.PORT || 5000;

// // Import routes
// const userRoute = require('./routes/user.routes.js');
// const attendanceRoute = require('./routes/attendance.routes.js');
// const blockRoute = require('./routes/block.routes.js'); // Add block routes
// const adminRoutes = require('./routes/admin.routes');
// // Connect to the database
// require('./config/db')();

// // Middleware to parse JSON
// app.use(cors({
//     origin: 'http://localhost:5173',  // Replace with the frontend URL
//     credentials: true,  // Allow cookies and authorization headers
//   }));
  
// app.use(express.json());
// app.use(cookieParser());
// // Register routes
// app.use('/api/users', userRoute);
// app.use('/api/attendance', attendanceRoute);
// app.use('/api/blocks', blockRoute); // Block-wise student routes

// app.use('/api/admin', adminRoutes);

// // Root endpoint
// app.get('/', (req, res) => {
//     res.send('SERVER IS LISTENING');
// });

// // Start the server
// app.listen(port, () => {
//     console.log('Server is listening on port', port);
// });


const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

// Import routes
const userRoute = require('./routes/user.routes.js');
const attendanceRoute = require('./routes/attendance.routes.js');
const blockRoute = require('./routes/block.routes.js'); // Add block routes
const adminRoutes = require('./routes/admin.routes');
const mailRoutes = require("./routes/sendMail.routes.js");
// Connect to the database
require('./config/db')();

// Define an array of allowed origins
const allowedOrigins = [
    'http://localhost:5173',  // Frontend 1
    'http://localhost:5174',  // Frontend 2
];

// Middleware to parse JSON
app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);  // Allow the origin
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,  // Allow cookies and authorization headers
}));

app.use(express.json());
app.use(cookieParser());

// Register routes
app.use('/api/users', userRoute);
app.use('/api/attendance', attendanceRoute);
app.use('/api/blocks', blockRoute); // Block-wise student routes
app.use('/api/mail',mailRoutes) // Block-wise student routes

app.use('/api/admin', adminRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.send('SERVER IS LISTENING');
});

// Start the server
app.listen(port, () => {
    console.log('Server is listening on port', port);
});
