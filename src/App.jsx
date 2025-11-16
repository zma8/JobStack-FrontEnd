import { Routes, Route } from 'react-router'; // Import React Router

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import ChatPage from './components/ChatPage'; 
import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';

// Import JobList and JobDetails components
import JobList from './components/JobList/JobList';
import JobDetails from './components/JobDetails/JobDetails';

// Import the CreateJobForm component (for posting new jobs)
import CreateJobForm from './components/CreateJob/CreateJobForm';

//Edit Job
import EditJobForm from './components/EditJob/EditJobForm.jsx';


const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />

      <Routes>
        {user ? (
          <>
            <Route path='/' element={<Dashboard />} />
            <Route path='/products' element={<h1>Products</h1>} />
            <Route path='/favs' element={<h1>Favs</h1>} />
            <Route path='/profile' element={<Profile />} />
              <Route path='/profile/:userId' element={<Profile />} />

            <Route path='/orders' element={<h1>ORDERS</h1>} />

            {/* Job listing route */}
            <Route path='/jobs' element={<JobList />} />

            {/* Job details route */}
            <Route path='/jobs/:id' element={<JobDetails />} />

            {/* Route for creating a new job, accessible by clients only */}
            <Route path='/jobs/new' element={<CreateJobForm />} />

            <Route path='/jobs/:id/edit' element={<EditJobForm />} />

             <Route path='/chat' element={<ChatPage />} />
          </>
        ) : (
          <Route path='/' element={<Landing />} />
        )}

        {/* Public auth routes */}
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
      </Routes>
    </>
  );
};

export default App;
