// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BlockAttendance from './pages/BlockAttendance';
import DateAttendance from './pages/DateAttendance';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import SendMail from './components/SendMail.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <ToastContainer />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/send-mail" element={<SendMail />} />
            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/block-attendance"
              element={
                <ProtectedRoute>
                  <BlockAttendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/date-attendance"
              element={
                <ProtectedRoute>
                  <DateAttendance />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
