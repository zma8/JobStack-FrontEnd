import { useState, useEffect, useRef } from 'react';
import { getChatMessages, sendMessage } from '../../services/chatService';
import socket from '../../socket';

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
    return <div>Loading messages...</div>;
  }

  return (
    <div>

      <div>
        <h3>{otherUser?.username || 'Unknown User'}</h3>
        <p>{otherUser?.role}</p>
      </div>

      <div>
        {messages.length === 0 ? (
          <div>
            <p>No messages yet</p>
            <p>Start the conversation!</p>
          </div>

        ) : (
          messages.map((msg, index) => {
            const isMyMessage = msg.sender._id === currentUser.id;

            return (
              <div key={index}>
                {!isMyMessage && <p>{msg.sender?.username}</p>}
                <p>{msg.text}</p>
                <p>

                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>

              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}