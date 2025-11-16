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

  }
}