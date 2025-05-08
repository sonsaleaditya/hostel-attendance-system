import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import MarkAttendance from './components/MarkAttendance';
import LandingPage from './components/LandingPage.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

const App = () => {
  return (
    <Router>
       <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/attendance/mark" element={<MarkAttendance />} />
        
        {/* User Routes with Navbar (Wrapped with Layout) */}
        <Route
          path="/user/dashboard"
          element={
            <Layout>
              <ProtectedRoute />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;