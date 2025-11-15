import { useState, useEffect } from 'react';
import { getUserChats } from '../../services/chatService';

export default function ChatList({ currentUserId, onSelectChat }) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChats();
  }, [currentUserId]);

  const fetchChats = async () => {
    try {
      const data = await getUserChats(currentUserId);
      setChats(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching chats:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading chats...</div>;
  }

  
}