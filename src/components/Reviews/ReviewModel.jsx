import { useState } from 'react';
import { createReview } from '../../services/reviewService';
import StarRating from './StarRating';

export default function ReviewModal({ freelancerId, clientId, onClose, onSuccess }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    setSubmitting(true);

    try{
        await createReview(freelancerId,clientId,rating,comment.trim()||undefined);

        if(onSuccess ) onSuccess();
        onClose();

    }catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return(
     <div className="review-modal-overlay">
    <div className="review-modal-content">
      <h2>Leave a Review</h2>
      <form onSubmit={handleSubmit}>
  
        <h2>Leave a Review</h2>

          <div>
            <label>Rating</label>
            <StarRating
              rating={rating}
              onRatingChange={setRating}
            />
          </div>

          <div>
            <label>Comment (Optional)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Share your experience..."
            />
          </div>

          <div>
            <button type="button" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
            <button type="submit" disabled={submitting || rating === 0}>
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}