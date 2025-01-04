import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        {children} {/* This will render the page-specific content */}
      </div>
    </div>
  );
};

export default Layout;
