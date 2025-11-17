import { useNavigate } from 'react-router-dom';
import { acceptBid } from "../../services/jobsService";
import { createChat } from "../../services/chatService";

export default function BidCard({ bid, ownerId, user }) {
  const userId = user?._id;
   const navigate = useNavigate(); 

  const handleAccept = async () => {
    try{
    await acceptBid(bid._id);
     await createChat(bid.freelancerId._id, userId);
     navigate('/chat');
    }catch (error) {
      console.error('Error accepting bid:', error);
      alert('Failed to accept bid. Please try again.');
    }
  };

  const handleViewProfile=()=>{
    navigate(`/profile/${bid.freelancerId._id}`);
  };

  return (
    <div className="bid-card">
      <p><strong>Amount:</strong> ${bid.amount}</p>
      <p><strong>Message:</strong> {bid.message}</p>
      <p><strong>Status:</strong> {bid.status}</p>
      <p><
        strong>Freelancer:</strong> {''}
      <span className="clickable-link"
          onClick={handleViewProfile}
       >
      {bid.freelancerId?.username}
      </span></p>

      {userId === ownerId && bid.status === "pending" && (
        <button className="btn-primary" onClick={handleAccept}>Accept Bid</button>
      )}
    </div>
  );
}
