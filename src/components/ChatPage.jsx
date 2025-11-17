import { useState, useContext } from 'react';
import ChatList from './Chat/ChatList';
import ChatWindow from './Chat/ChatWindow';
import { UserContext } from '../contexts/UserContext';
import '../styles.css';

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const { user } = useContext(UserContext);

  const handleSelectChat = (chatId, userInfo) => {
    setSelectedChat(chatId);
    setOtherUser(userInfo);
  };

  if (!user) {
    return (<div className="container">
        <div className="error">
          Please log in to view messages
        </div>
      </div>);
  }

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">💬 Messages</h1>
        <p className="subtitle">Connect with clients and freelancers</p>
      </div>

      <div className="chat-container">
        <div className="chat-list">
          <ChatList
            currentUserId={user._id}
            onSelectChat={handleSelectChat}
          />
        </div>

        <div className="chat-window">
          {selectedChat ? (
            <ChatWindow
              chatId={selectedChat}
              currentUser={{ id: user._id, username: user.username }}
              otherUser={otherUser}
            />
          ) : (
            <div className="empty" style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%',
              gap: '16px'
            }}>
              <div style={{ fontSize: '4rem' }}>💬</div>
              <p style={{ fontSize: '18px', color: '#64748b' }}>Select a chat to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}