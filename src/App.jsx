// src/App.jsx

import { Routes, Route } from 'react-router'; // Import React Router

import NavBar from './components/NavBar/NavBar';
// Import the SignUpForm component
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';

//import JobList
import JobList from './components/JobList/JobList';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />

      <Routes>
        {
          user ?
          <>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/products' element={<h1>Producs</h1>}/>
            <Route path='/favs' element={<h1>Favs</h1>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/orders' element={<h1>ORDERS</h1>}/>

            {/* Add JobList route */}
            <Route path='/jobs' element={<JobList />} />
          </>
            :
            <Route path='/' element={<Landing/>}/>
        }
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
      </Routes>
    </>
  );
};

export default App;

