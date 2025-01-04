import { ArrowRight, Clock, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import hosteIMG from '../assets/hostel.jpg'
const LandingPage = () => {
  const features = [
    {
      icon: <Clock size={32} />,
      title: 'Real-Time Tracking',
      description: 'Mark and monitor attendance instantly with our digital system'
    },
    {
      icon: <Shield size={32} />,
      title: 'Secure & Reliable',
      description: 'Your attendance data is protected with enterprise-grade security'
    },
    {
      icon: <Users size={32} />,
      title: 'User-Friendly',
      description: 'Simple interface for both students and administrators'
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Smart Attendance System</h1>
          <p>Streamline your attendance tracking with our modern digital solution</p>
          <div className="hero-buttons">
            <Link to="/signin" className="button primary">
              Sign In <ArrowRight size={20} />
            </Link>
            <Link to="/signup" className="button secondary">
              Create Account
            </Link>
          </div>
        </div>
        <div className="hero-image">
          {/*    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
          */}
          <img 
            src={hosteIMG}
            alt="Students using digital attendance system"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <h2>Why Choose Us</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;