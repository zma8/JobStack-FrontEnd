import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import '../../styles.css'
const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="dashboard-container">

      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="brand">JobStack</span> 
          </h1>
          <p className="hero-subtitle">
            Your gateway to freelance opportunities and talented professionals
          </p>
          <p className="hero-greeting">
            Hello, <strong>{user?.username || 'Guest'}</strong>!
          </p>
        </div>
      </div>

      <div className="info-section">
        <h2 className="section-title">🎯 What is JobStack?</h2>
        <p className="section-description">
          JobStack is a modern gig marketplace that connects talented freelancers with clients 
          seeking quality work. Whether you're looking to hire or get hired, we make it simple, fast, and efficient.
        </p>
      </div>


      <div className="features-section">
        <h2 className="section-title">✨ Platform Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Post & Browse Jobs</h3>
            <p>Clients can post projects and freelancers can browse hundreds of opportunities</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Smart Bidding System</h3>
            <p>Freelancers submit competitive bids, clients choose the best fit for their project</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👤</div>
            <h3>Profile & Ratings</h3>
            <p>Build your reputation with detailed profiles and client reviews</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Real-Time Chat</h3>
            <p>Direct messaging between clients and freelancers for seamless communication</p>
          </div>
        </div>
      </div>

      <div className="how-it-works-section">
        <h2 className="section-title">🚀 How It Works</h2>
        
        {user?.role === 'client' ? (
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Post Your Job</h3>
              <p>Describe your project, set a budget, and publish it to our marketplace</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Review Bids</h3>
              <p>Receive proposals from qualified freelancers and review their profiles</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Hire & Collaborate</h3>
              <p>Choose the best freelancer and start working together through our platform</p>
            </div>
          </div>
        ) : (
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Browse Jobs</h3>
              <p>Explore available projects that match your skills and interests</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Submit Proposals</h3>
              <p>Bid on projects with your rate and timeline to win the client's trust</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Get Hired & Deliver</h3>
              <p>Once selected, work on the project and build your reputation</p>
            </div>
          </div>
        )}
      </div>

      <div className="role-section">
        {user?.role === 'client' ? (
          <div className="role-card client-card">
            <h2>📊 You're a Client</h2>
            <p>Ready to get started? Here's what you can do:</p>
            <ul className="role-actions">
              <li>✅ Post new job opportunities</li>
              <li>✅ Review and manage bids from freelancers</li>
              <li>✅ Track your active projects</li>
              <li>✅ Chat with hired freelancers</li>
            </ul>
            <Link to="/jobs/new">
              <button className="cta-button">➕ Post a New Job</button>
            </Link>
          </div>
        ) : user?.role === 'freelancer' ? (
          <div className="role-card freelancer-card">
            <h2>💼 You're a Freelancer</h2>
            <p>Ready to grow your career? Here's what you can do:</p>
            <ul className="role-actions">
              <li>✅ Browse available jobs in your field</li>
              <li>✅ Submit competitive bids on projects</li>
              <li>✅ Build your profile and portfolio</li>
              <li>✅ Communicate directly with clients</li>
            </ul>
            <Link to="/jobs">
              <button className="cta-button">🔍 Browse Jobs</button>
            </Link>
          </div>
        ) : (
          <div className="role-card guest-card">
            <h2>👋 Welcome, Guest!</h2>
            <p>Sign in or create an account to access all features</p>
            <Link to="/signin">
              <button className="cta-button">🔑 Sign In</button>
            </Link>
          </div>
        )}
      </div>

     

    </div>
  );
};

export default Dashboard;