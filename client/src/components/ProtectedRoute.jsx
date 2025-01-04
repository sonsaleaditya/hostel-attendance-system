import { Navigate } from 'react-router-dom';
import UserDashboard from './UserDashboard'; // User Dashboard component

const ProtectedRoute = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return <Navigate to="/signin" />; // Redirect to sign-in if not authenticated
  }
  return <UserDashboard />; // Render the user dashboard if authenticated
};

export default ProtectedRoute;
