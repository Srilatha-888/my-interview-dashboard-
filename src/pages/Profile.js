import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';

const Profile = () => {
  const user = useSelector(state => state.auth.user);

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="content">
        <Header title="Profile" />
        <div className="profile-content">
          <h2>Welcome, {user?.email}</h2>
          <p>This is Srilatha</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
