import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/authContext';
import { FaTrash, FaSignOutAlt, FaUser, FaTachometerAlt, FaChevronDown, FaPlus, FaList } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isComplaintMenuOpen, setIsComplaintMenuOpen] = useState(false);
  const closeMenuTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (closeMenuTimer.current) {
        clearTimeout(closeMenuTimer.current);
      }
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const openComplaintMenu = () => {
    if (closeMenuTimer.current) {
      clearTimeout(closeMenuTimer.current);
    }
    setIsComplaintMenuOpen(true);
  };

  const closeComplaintMenuWithDelay = () => {
    closeMenuTimer.current = setTimeout(() => {
      setIsComplaintMenuOpen(false);
    }, 1000);
  };

  return (
    <nav className="text-white bg-green-600 shadow-lg">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <FaTrash /> Waste Management
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-green-200">Home</Link>
            <Link to="/about" className="hover:text-green-200">About</Link>
            <Link to="/services" className="hover:text-green-200">Services</Link>
            <div
              className="relative"
              onMouseEnter={openComplaintMenu}
              onMouseLeave={closeComplaintMenuWithDelay}
              onFocus={openComplaintMenu}
              onBlur={closeComplaintMenuWithDelay}
            >
              <button
                className="flex items-center gap-1 hover:text-green-200 focus:outline-none"
                aria-expanded={isComplaintMenuOpen}
                aria-haspopup="menu"
              >
                Complaint <FaChevronDown className="text-xs mt-0.5" />
              </button>
              <div className={`${isComplaintMenuOpen ? 'block' : 'hidden'} absolute left-0 z-10 mt-2 bg-white rounded shadow-lg min-w-[170px] text-gray-800`}>
                <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 hover:bg-green-50">
                  <FaList /> My Complaint
                </Link>
                <Link to="/submit-complaint" className="flex items-center gap-2 px-4 py-2 hover:bg-green-50">
                  <FaPlus /> New Complaint
                </Link>
              </div>
            </div>
            {user ? (
              <>
                <Link to="/my-profile" className="flex items-center gap-2 hover:text-green-200">
                  <FaUser /> Profile
                </Link>
                {user.role === 'admin' ? (
                  <Link to="/admin" className="flex items-center gap-2 hover:text-green-200">
                    <FaTachometerAlt /> Admin Panel
                  </Link>
                ) : null}
                <button onClick={handleLogout} className="flex items-center gap-2 hover:text-green-200">
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-green-200">Login</Link>
                <Link to="/register" className="hover:text-green-200">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
