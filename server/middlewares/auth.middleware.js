const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
    try {
        // Get the token from the cookies
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ message: 'Authentication token missing.' });
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach decoded payload to request object for later use

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error in auth middleware:', error.message);
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized access.' });
        }

        // Find the user in the database
    
       // console.log(req.user.role)
        // Check if the user has admin privileges
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error in isAdmin middleware:', error.message);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { auth, isAdmin };
