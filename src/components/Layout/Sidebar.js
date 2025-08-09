import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="sidebar">
      <h2>InterviewApp</h2>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
};

export default Sidebar;