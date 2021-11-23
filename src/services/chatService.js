import io from 'socket.io-client';
import { API_URL } from '../services/api';

let socket;

let token = localStorage.getItem("tokenAuth")

export const initiateSocket = (room) => {
  socket = io(`${API_URL}chat`, {
    query: { token: `Bearer ${token}` },
    transports: ['websocket'],
    jsonp: false
  });
  console.log(`Connecting socket...`);
  if (socket && room) socket.emit('join', room);
}

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) socket.disconnect();
}

export const subscribeToChat = (cb) => {
  if (!socket) { console.log("erro do serviço"); return (true) };
  console.log("funcionou")
  socket.on('chat', msg => {
    console.log('Websocket event received!');
    return cb(null, msg);
  });
}

export const sendMessage = (dados) => {
  if (socket) socket.emit('chat', dados);
}