import { useState, useEffect, useRef } from 'react';
import { getChatMessages, sendMessage } from '../../services/chatService';
import socket from '../../socket';
import '../../styles.css';

export default function ChatWindow({ chatId, currentUser, otherUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!chatId) return;
    fetchMessages();

    socket.emit('join_chat', chatId);

    socket.on('receive_message', (message) => {
      if (message.sender._id !== currentUser.id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off('receive_message');
    };
  }, [chatId]);

  const fetchMessages = async () => {
    try {
      const data = await getChatMessages(chatId);
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    try {
      const messageData = await sendMessage(chatId, currentUser.id, newMessage);
      socket.emit('send_message', {
        chatId,
        message: messageData
      });

      setMessages((prev) => [...prev, messageData]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading messages...</div>;
  }

  if (!chatId) {
    return (
      <div className="chat-empty-state">
        <div className="chat-empty-icon">💬</div>
        <p className="chat-empty-text">Select a conversation to begin.</p>
      </div>
    );
  }


  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>{otherUser?.username || 'Unknown User'}</h3>
        <p>{otherUser?.role}</p>
      </div>

       <div className="chat-messages">
        {messages.length === 0 ? (
           <div className="chat-empty-state">
            <div className="chat-empty-icon">💬</div>
            <p className="chat-empty-text">No messages yet. Start the conversation!</p>
          </div>

        ) : (
          messages.map((msg, index) => {
            const isMyMessage = msg.sender._id === currentUser.id;

            return (
              <div
                key={index}
                className={`message ${isMyMessage ? "message-own" : "message-other"}`}
              >
                {!isMyMessage && <strong>{msg.sender.username}</strong>}
                <p>{msg.text}</p>
                
                <small>
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                  </small>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="btn-small" type="submit">Send</button>
      </form>
    </div>
  );
}