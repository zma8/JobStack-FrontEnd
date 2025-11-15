const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
 
export const getUserChats = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/chats/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch chats');
    return await response.json();
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw error;
  }
};

