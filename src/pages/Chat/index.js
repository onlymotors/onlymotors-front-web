import React, { useEffect, useState } from 'react';
import api, { API_URL } from '../../services/api';
import Header from '../../components/Header';
import ChatRoom from '../ChatRoom';
import { useParams } from 'react-router';

export default function Chat() {

  const { id } = useParams()

  const [chatRooms, setChatRooms] = useState([]);
  const [numRooms, setNumRooms] = useState(0);
  const [chatRoomId, setChatRoomId] = useState("");
  const [roomVisible, setRoomVisible] = useState(false);
  const [estado, setEstado] = useState(1);

  useEffect(() => {
    if (id) {
      setChatRoomId(id)
    }
    api(`chatrooms/userid`)
      .then(res => {
        console.log(res.data)
        setNumRooms(res.data.length)
        setChatRooms(res.data)
      })
      .catch(e => {
        console.log("Erro ao coletar salas de chats")
      })
  }, [estado])

  useEffect(() => {
    if (chatRoomId !== "") {
      setRoomVisible(true)
    }
  }, [chatRoomId])

  const carregarSala = async (item) => {
    if (item._id !== chatRoomId) {
      setChatRoomId(item._id)
      setRoomVisible(false)
    }
  }

  return (
    <>
      <Header />

      {chatRooms.map(item =>
        <div>
          <>
            {/* <button onClick={() => window.location.href=`/ChatRoom/${item._id}`}> */}
            <button onClick={() => carregarSala(item)}>
              <div>{item.nomeChatRoom}</div>
              {(item.mensagens.length > 0) &&
                <>
                  <div>{item.mensagens[0].nomeUser}</div>
                  <div>{item.mensagens[0].mensagem}</div>
                  <div>{item.mensagens[0].mensagemData}</div>
                </>
              }
            </button>

          </>
        </div>

      )}
      {roomVisible &&
        <ChatRoom chatRoomId={chatRoomId} estado={estado} setEstado={setEstado} />
      }

    </>
  )
}