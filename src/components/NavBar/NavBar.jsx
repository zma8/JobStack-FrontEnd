// src/components/NavBar/NavBar.jsx

import { useContext } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav>
      {user ? (
        <ul>
          <li>Welcome, {user.username}</li>

          {/* Link to Dashboard */}
          <li><Link to='/'>Dashboard</Link></li>

          {/* link to Job List */}
          <li><Link to='/jobs'>Job List</Link></li>

          <li><Link to='/profile'>Profile</Link></li>

          {/* Show "Post a Job" link only if user is a client */}
          {user.role === "client" && (
            <li>
              <Link to="/jobs/new">Post a Job</Link>
            </li>
          )}

          <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
        </ul>
      ) : (
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/sign-up'>Sign Up</Link></li>
          <li><Link to='/sign-in'>Sign In</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
