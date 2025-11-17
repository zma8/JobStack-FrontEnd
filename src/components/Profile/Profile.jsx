import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getCurrentUser, getUserById, updateFreelancerSkills } from '../../services/userService'; // MODIFIED: Added updateSkills import
import { UserContext } from '../../contexts/UserContext';
import ReviewsList from '../Reviews/ReviewsList';

const Profile = () => {
  const { userId } = useParams(); 
  const { user: currentUser } = useContext(UserContext); 
  const [profileUser, setProfileUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  const isOwnProfile = !userId || userId === currentUser?._id;

  const fetchProfile = async () => {
  try {
    let data;
    if (isOwnProfile) {
      data = await getCurrentUser();
    } else {
      data = await getUserById(userId);
    }
    
    setProfileUser(data);
    
    if (data.freelancerProfile && data.freelancerProfile.skills) {
      setSkills(data.freelancerProfile.skills);
    }
    
    setLoading(false);
  } catch (error) {
    console.error("Error fetching profile:", error);
    setLoading(false);
  }
};

  useEffect(() => {
  fetchProfile();
}, [userId, isOwnProfile]);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };


  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };


  const handleSaveSkills = async () => {
  try {
    const targetUserId = isOwnProfile ? currentUser._id : userId;
    await updateFreelancerSkills(targetUserId, skills);
    await fetchProfile(); 
    setIsEditingSkills(false);
  } catch (error) {
    console.error("Error updating skills:", error);
  }
};

  if (loading) return <div>Loading...</div>;
  if (!profileUser) return <div>User not found</div>;

  return (
     <div className="profile-container">
    <div className="profile-header">
      <h3>{isOwnProfile ? 'My Profile' : `${profileUser.username}'s Profile`}</h3>
    </div>
    <div className="profile-content">
    <div>
      <h3>{isOwnProfile ? 'My Profile' : `${profileUser.username}'s Profile`}</h3>

      {!editing ? (
        <p><strong>Name:</strong> {profileUser.username}</p>
      ) : (
        <input
          type="text"
          value={profileUser.username}
          onChange={(e) => setProfileUser({ ...profileUser, username: e.target.value })}
        />
      )}

      {!editing ? (
        <p><strong>Email:</strong> {profileUser.email}</p>
      ) : (
        <input
          type="email"
          value={profileUser.email}
          onChange={(e) => setProfileUser({ ...profileUser, email: e.target.value })}
        />
      )}

      <p><strong>Role:</strong> {profileUser.role}</p>

      {isOwnProfile && !editing && (
        <button onClick={() => setEditing(true)}>Edit</button>
      )}

    

      {profileUser.role === "freelancer" && (
        <div>
          <h4>Skills</h4>
          

          <div className="skills-list">
            {skills.length > 0 ? (
              skills.map((skill, i) => (
                <span key={i} className="skill-tag">
                  {skill}

                  {isEditingSkills && isOwnProfile && (
                    <button onClick={() => handleRemoveSkill(skill)}>Delete</button>
                  )}
                </span>
              ))
            ) : (
              <p>No skills listed</p>
            )}
          </div>

          {isOwnProfile && (
            <div className="skills-edit">
              {!isEditingSkills ? (
                <button onClick={() => setIsEditingSkills(true)}>Edit Skills</button>
              ) : (
                <div>
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill "
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                  />
                  <button onClick={handleAddSkill}>Add</button>
                  <button onClick={handleSaveSkills}>Save</button>
                </div>
              )}
            </div>
          )}

          <h4>Reviews</h4>
          <ReviewsList freelancerId={profileUser._id} />
        </div>
      )}
    </div>
     </div>
  </div>
  );
};

export default Profile;