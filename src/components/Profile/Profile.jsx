import React, { useEffect, useState } from "react";
import { getCurrentUser } from '../../services/userService';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const data = await getCurrentUser();
      setUser(data);
    };
    getUser();
  }, []);

  if (!user) return <nav>Loading...</nav>;

  return (
    <nav>
      <h3>My Profile</h3>


      {!editing ? (
        <p><strong>Name:</strong> {user.username}</p>
      ) : (
        <input
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      )}


      {!editing ? (
        <p><strong>Email:</strong> {user.email}</p>
      ) : (
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      )}

   
      {user.role === "Client" && !editing && (
        <button onClick={() => setEditing(true)}>Edit</button>
      )}

      {editing && (
        <button onClick={() => setEditing(false)}>Save</button>
      )}


      {user.role === "freelancer" && (
        <div>
          <h4>Skills</h4>
          {user.freelancerProfile.skills?.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Profile;