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

socket.on('connect',()=>{
    console.log('connected to server',socket.id);
});

socket.on('disconnected',()=>{
    console.log('Disconnected from server');
});

socket.on('connect_error',(error)=>{
    console.error('Connection error:' ,error);
});

export default socket;

