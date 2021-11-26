import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import Header from "../../components/Header";
import './anuncioSelecionado.css';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api, { API_URL } from "../../services/api";
import { AuthContext } from "../../contexts/auth";


export default function Anuncio() {

    const { id } = useParams();
    const [anuncio, setAnuncio] = useState([])

    const { authenticated } = useContext(AuthContext)

    useEffect(() => {
        async function loadAnuncio() {
            const response = await api.get(`/anuncios/${id}`);
            //console.log(anuncio)
            await api.patch(`anuncios/${id}/numvisitas`, { contagem: response.data[0].numVisitas + 1 })
            setAnuncio(response.data[0])
        }
        loadAnuncio()
    }, [])


    const criarChatRoom = async () => {
        try {

            let dados = {
                anuncioId: id,
                nomeChatRoom: `${anuncio.veiculoMarca} ${anuncio.descricaoVeiculo} - ${anuncio.anoModelo}`
            }
            let chatRoom = await api.post(`chatrooms`, dados)
            window.location.href = `/Chat/${chatRoom.data.chatRoomId}`
            // navigation.navigate("Chat Room", {
            //     chatRoomId: chatRoom.data.chatRoomId,
            //     token: tkn
            // })

        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div>
            <Header />
            <div className='container-oneAnuncio'>
                <div className='container-descricao'>
                    <div className='container-contato'>
                        <img style={{ maxWidth: "270px", maxHeight: "270px" }} src={`${(anuncio.urlImage) ? anuncio.urlImage : API_URL + "images/sem_foto.png"}`} alt='Foto Placeholder'></img>
                        {
                            authenticated ? <button onClick={() => criarChatRoom()}>
                                <FontAwesomeIcon icon={faComment} color='#FFF' size='lg' className='icons' />
                                MENSAGEM
                            </button> : 
                                <button style={{'marginRight':'200px'}}>
                                    <Link to='/login'>
                                    <FontAwesomeIcon icon={faComment} color='#FFF' size='lg' className='icons' />
                                    MENSAGEM
                                    </Link>
                                </button>
                            
                        }
                    </div>
                    <h3 id='preco'>R$ {new Intl.NumberFormat('pt-BR', { maximumSignificantDigits: 3 }).format(anuncio.veiculoValor)}</h3>
                </div>
                <div className='container-info'>
                    <h3 id='info'>Informações do Anúncio:</h3>
                    <p>Nome do Fabricante: <span>{anuncio.nomeFabricante}</span></p>
                    <p>Marca: <span>{anuncio.veiculoMarca}</span></p>
                    <p>Modelo: <span>{anuncio.descricaoVeiculo}</span></p>
                    <p>Ano de Fabricação: <span>{anuncio.anoFabricacao}</span></p>
                    <p>Ano do Modelo: <span>{anuncio.anoModelo}</span></p>
                </div>
            </div>
        </div>
    )
}