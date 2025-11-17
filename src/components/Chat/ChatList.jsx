import { useState, useEffect } from 'react';
import { getUserChats } from '../../services/chatService';
import '../../styles.css';

export default function ChatList({ currentUserId, onSelectChat }) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
 const [selectedChatId, setSelectedChatId] = useState(null);

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
  
  const handleChatClick = (chatId, otherUser) => {
  setSelectedChatId(chatId);
  onSelectChat(chatId, otherUser);
};


  if (loading) {
    return <div className="loading">Loading chats...</div>;
  }

  return (
     <div className="chat-list">
      <div className="chat-list-header">
        <h2 className="chat-list-title">Messages</h2>
      </div>

      {chats.length === 0 ? (
        <div className="chat-list-empty">
          <div className="chat-list-empty-icon">💬</div>
          <p className="chat-list-empty-title">No conversations yet</p>
          <p className="chat-list-empty-text">Start chatting when a bid is accepted!</p>
        </div>
      ) : (
        <div className="chat-list-content">
          {chats.map((chat) => {
            const otherUser = chat.participants.find(
              (p) => p._id !== currentUserId
            );

            const lastMessage = chat.messages[chat.messages.length - 1];
            const isSelected = selectedChatId === chat._id;

            return (
              <div
                key={chat._id}
                className={`chat-item ${isSelected ? 'selected' : ''}`}
                onClick={() => handleChatClick(chat._id, otherUser)}
              >
                <div className="chat-item-content">
                  <div className="chat-item-avatar">
                    {otherUser?.username?.[0]?.toUpperCase() || '?'}
                  </div>
                  
                  <div className="chat-item-info">
                    <p className="chat-item-username">
                      {otherUser?.username || 'Unknown User'}
                    </p>
                    {lastMessage ? (
                      <p className="chat-item-message">
                        {lastMessage.text}
                      </p>
                    ) : (
                      <p className="chat-item-message empty">
                        No messages yet
                      </p>
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