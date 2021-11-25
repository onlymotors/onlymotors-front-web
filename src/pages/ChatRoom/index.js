import Header from '../../components/Header'
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import api, { API_URL } from '../../services/api';
import {
  initiateSocket, disconnectSocket,
  subscribeToChat, sendMessage
} from '../../services/chatService';
import { geradorRandomico } from '../../utils/geradores';


export default function ChatRoom(props) {


  const [isLoading, setIsLoading] = useState(true)
  const scrollViewRef = useRef();

  const { id } = useParams()

  const [room, setRoom] = useState("");
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  // const [nomeAnunciante, setNomeAnunciante] = useState("");
  const [anuncioId, setAnuncioId] = useState("");
  const [nomeChatRoom, setNomeChatRoom] = useState("");
  const [anuncioImg, setAnuncioImg] = useState("");

  let dados = {
    room: room,
    nomeUser: nome,
    emailUser: email,
    mensagem: message
  }

  useEffect(() => {
    console.log("room", room)
    if (room) initiateSocket(room);
    subscribeToChat((err, data) => {
      if (err) { console.log("error"); return };
      data._id = geradorRandomico(15)
      console.log(data)
      setChat(oldChats => [...oldChats, data])
    });
    return () => {
      disconnectSocket();
    }
  }, [room]);

  useEffect(() => {
    async function loadChat() {
      await api.get(`chatrooms/${props.chatRoomId}`)
        .then(res => {
          let lista = res.data.chatRoom.mensagens
          console.log(res.data.chatRoom._id)
          setChat(lista)
          setEmail(res.data.emailUser)
          setNome(res.data.nomeUser.split(" ")[0])
          // setNomeAnunciante(res.data.nomeAnunciante.split(" ")[0])
          setAnuncioId(res.data.chatRoom.anuncioId._id)
          setNomeChatRoom(res.data.chatRoom.nomeChatRoom)
          setAnuncioImg(res.data.chatRoom.anuncioId.urlImage)
          setRoom(res.data.chatRoom._id)
        })
        .catch(e => {
          console.log("Erro ao coletar chatRoom pelo seu id")
        })
    }
    loadChat()
  }, [])

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [isLoading])

  const salvarMensagem = async (e) => {
    e.preventDefault()
    try {
      await api.post(`chatrooms/${room}`, dados)
    } catch (e) {
      console.log("Erro ao salvar mensagens no banco")
    }
  }

  if (isLoading) {
    return (
      <>
        Carregando...
      </>
    )
  }


  return (
    <>
      {/* <Header /> */}
      <div>---------------------------------------------------------------</div>
      <div>Sala de Chat</div>
      {chat.map((chatMessage, index) =>
        <div key={chatMessage._id}>
          <div> {chatMessage.nomeUser}</div>
          <div> {chatMessage.mensagem}</div>
          <div> {chatMessage.mensagemData}</div>
        </div>
      )}

      <form onSubmit={e => { salvarMensagem(e); sendMessage(dados); setMessage(''); props.setEstado(props.estado + 1) }}>
        {/* <div> */}
        <input value={message} onChange={e => setMessage(e.target.value)} />
        <button type="submit" >Enviar</button>
        {/* <button onClick={() => {salvarMensagem(); sendMessage(dados); setMessage('')}} >Enviar</button> */}
      </form>
      {/* </div> */}
      <div>---------------------------------------------------------------</div>
    </>
  )
}
