import { useState, useContext } from 'react';
import ChatList from './Chat/ChatList';
import ChatWindow from './Chat/ChatWindow';
import { UserContext } from '../contexts/UserContext';

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const { user } = useContext(UserContext);

  const handleSelectChat = (chatId, userInfo) => {
    setSelectedChat(chatId);
    setOtherUser(userInfo);
  };

  if (!user) {
    return <div>Please log in to view messages</div>;
  }

  return (
    <div>
      <h1>Chat</h1>

      <div>
        <div>
          <ChatList
            currentUserId={user._id}
            onSelectChat={handleSelectChat}
          />
        </div>

        <div>
          {selectedChat ? (
            <ChatWindow
              chatId={selectedChat}
              currentUser={{ id: user._id, username: user.username }}
              otherUser={otherUser}
            />
          ) : (
            <div>
              <p>Select a chat to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}