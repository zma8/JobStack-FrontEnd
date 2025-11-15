import BidCard from "./BidCard";

export default function BidList({ bids, ownerId, user }) {
  if (!bids || bids.length === 0) {
    return <p>No bids yet.</p>;
  }

  return (
    <div>
      <h2>Bids</h2>
      {bids.map((bid) => (
        <BidCard key={bid._id} bid={bid} ownerId={ownerId} user={user} />
      ))}
    </div>
  );
}
