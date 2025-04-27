# Hostel Attendance System

## Project Overview
The Hostel Attendance System is designed to streamline attendance tracking for hostel students. The project consists of three main components:
1. **Server**: Backend to handle API requests and manage data.
2. **Admin Client**: Web application for admin users to manage attendance.
3. **Client**: Web application for students to access attendance-related features.

---

## How to Run the Project

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A MongoDB database instance

---

### Setting up the Server
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory with the following content:
   ```env
   PORT=8000
   MONGO_URI="mongodb://localhost:27017/your_db_name"
   JWT_SECRET="SGGS"
   ```
4. Start the server:
   ```bash
   npm start
   ```
   The server will start on `http://localhost:8000`.

---

### Setting up the Admin Client
1. Navigate to the admin client directory:
   ```bash
   cd admin_client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `admin_client` directory with the following content:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The admin client will start and provide a local development URL (e.g., `http://localhost:5173`).

---

### Setting up the Client
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `client` directory with the following content:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The client will start and provide a local development URL (e.g., `http://localhost:5173`).

---

### Using the `.env.example` Files
Each folder contains an `.env.example` file, which outlines the required environment variables for that part of the project. You can refer to these files while creating your `.env` files.

---

## Contact Information
- **Author**: Aditya Sonsale
- **Email**: sonsaleaditya@gmail.com

Feel free to reach out for any questions or issues related to the project!

