const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const createReview = async (freelancerId, clientId, rating, comment) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ freelancerId, clientId, rating, comment })
    });
    
    if (!res.ok) throw new Error('Failed to create review');
    return await res.json();
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};