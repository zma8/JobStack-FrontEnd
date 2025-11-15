import  { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { updateUserProfile } from '../../services/userService.js';

const Profile = () => {
  const { setUser } = useContext(UserContext);


  if (!user) return <div>Loading...</div>;

  

  return (
    <>
    <div className="profile-container">
      <div className="profile-card">
        <h1>My Profile</h1>
        </div>
      </div>

      <div className="info-item">
            <strong>Email:</strong>
            <span>{user.email}</span>
          </div>

      
      <div className="info-item">
            <strong>Role:</strong>
            <span className="role-badge">{user.role}</span>
          </div>

          </>
  );
};

export default Profile;