import { Link } from 'react-router-dom';
import '../../styles.css';


const Landing = () => {
  return (
    <div className="dashboard-container">

      <div className="hero-section">
        <h1 className="hero-title">
          Welcome to <span className="brand">JobStack</span>
        </h1>
        <p className="hero-subtitle">
          Connect with top freelancers or find your next great opportunity
        </p>
        
      </div>

      <div className="info-section">
        <h2 className="section-title">🎯 What is JobStack?</h2>
        <p className="section-description">
          JobStack is a modern gig marketplace that connects talented freelancers with clients 
          seeking quality work. Whether you're looking to hire or get hired, we make it simple, 
          fast, and efficient. Join thousands of professionals already using our platform.
        </p>
      </div>

      <div className="features-section">
        <h2 className="section-title">✨ Why Choose JobStack?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Easy Job Posting</h3>
            <p>Post your project in minutes and receive proposals from qualified freelancers</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Competitive Bidding</h3>
            <p>Get the best value with our transparent bidding system</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Verified Profiles</h3>
            <p>Work with confidence using our rating and review system</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Instant Communication</h3>
            <p>Chat directly with clients or freelancers in real-time</p>
          </div>
        </div>
      </div>

      <div className="how-it-works-section">
        <h2 className="section-title">🚀 How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Your Account</h3>
            <p>Sign up for free as a client or freelancer in just 30 seconds</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Post or Find Jobs</h3>
            <p>Clients post projects, freelancers browse and submit proposals</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Work Together</h3>
            <p>Collaborate seamlessly and build lasting professional relationships</p>
          </div>
        </div>
      </div>

      <div className="role-section">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '40px' }}>
          👥 Choose Your Path
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '40px' }}>
          <div className="role-card client-card">
            <h2>📊 I'm a Client</h2>
            <p>Looking to hire talented professionals for your projects</p>
            <ul className="role-actions">
              <li>✅ Post unlimited job listings</li>
              <li>✅ Review freelancer proposals</li>
              <li>✅ Manage multiple projects</li>
              <li>✅ Direct communication tools</li>
            </ul>
            
          </div>

          <div className="role-card freelancer-card">
            <h2>💼 I'm a Freelancer</h2>
            <p>Ready to find amazing opportunities and grow your career</p>
            <ul className="role-actions">
              <li>✅ Access hundreds of jobs</li>
              <li>✅ Submit competitive bids</li>
              <li>✅ Build your reputation</li>
              <li>✅ Get paid for your skills</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="hero-section" style={{ marginTop: '60px' }}>
        <h2 className="hero-title" style={{ fontSize: '2rem' }}>
          Ready to Get Started?
        </h2>
        <p className="hero-subtitle">
          Join JobStack today and take the first step towards your next opportunity
        </p>
        
      </div>
    </div>
  );
};

export default Landing;

