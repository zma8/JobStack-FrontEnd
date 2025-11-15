import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_BACK_END_SERVER_URL || 'http://localhost:3000';

const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5
});

socket.on('connect', () => {
  console.log('✅ Connected to server:', socket.id);
});

