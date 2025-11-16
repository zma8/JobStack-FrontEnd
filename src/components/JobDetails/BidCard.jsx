import { useNavigate } from 'react-router-dom';
import { acceptBid } from "../../services/jobsService";
import { createChat } from "../../services/chatService";

export default function BidCard({ bid, ownerId, user }) {
  const userId = user?._id;

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

  return (
    <div className="bid-card">
      <p><strong>Amount:</strong> ${bid.amount}</p>
      <p><strong>Message:</strong> {bid.message}</p>
      <p><strong>Status:</strong> {bid.status}</p>
      <p><strong>Freelancer:</strong> {bid.freelancerId?.username}</p>

      {userId === ownerId && bid.status === "pending" && (
        <button onClick={handleAccept}>Accept Bid</button>
      )}
    </div>
  );
}
