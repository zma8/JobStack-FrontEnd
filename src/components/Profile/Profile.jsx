import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getCurrentUser, getUserById } from '../../services/userService';
import { UserContext } from '../../contexts/UserContext';
import ReviewsList from '../Reviews/ReviewsList';

const Profile = () => {
  const { userId } = useParams(); 
  const { user: currentUser } = useContext(UserContext); 
  const [profileUser, setProfileUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const isOwnProfile = !userId || userId === currentUser?._id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (isOwnProfile) {
          const data = await getCurrentUser();
          setProfileUser(data);
        } else {
          const data = await getUserById(userId);
          setProfileUser(data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId, isOwnProfile]);

  if (loading) return <div>Loading...</div>;
  if (!profileUser) return <div>User not found</div>;

  return (
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

      {editing && (
        <button onClick={() => setEditing(false)}>Save</button>
      )}

      {profileUser.role === "freelancer" && (
        <div>
          <h4>Skills</h4>
          {profileUser.freelancerProfile?.skills?.length > 0 ? (
            <ul>
              {profileUser.freelancerProfile.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p>No skills listed</p>
          )}

          <h4>Reviews</h4>
          <ReviewsList freelancerId={profileUser._id} />
        </div>
      )}
    </div>
  );
};

export default Profile;