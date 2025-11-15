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

  return (
    <div>
      <h2>Messages</h2>

      {chats.length === 0 ? (
        <div>
          <p>No conversations yet</p>
          <p>Start chatting when a bid is accepted!</p>
        </div>
      ) : (
        <div>
          {chats.map((chat) => {
            const otherUser = chat.participants.find(
              (p) => p._id !== currentUserId
            );

            const lastMessage = chat.messages[chat.messages.length - 1];

            return (
              <div
                key={chat._id}
                onClick={() => onSelectChat(chat._id, otherUser)}
              >
                <div>
                  <div>{otherUser?.username?.[0]?.toUpperCase() || '?'}</div>
                  <div>
                    <p>{otherUser?.username || 'Unknown User'}</p>
                    {lastMessage ? (
                      <p>{lastMessage.text}</p>
                    ) : (
                      <p>No messages yet</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  
}