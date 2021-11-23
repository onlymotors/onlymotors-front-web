import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Header from "../../components/Header";
import './anuncioSelecionado.css';
import anuncio_img from '../../assets/anuncio_foto.png';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../services/api";


export default function Anuncio() {

    const { id } = useParams();
    const [anuncio, setAnuncio] = useState([])

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

            let contagem = anuncio.numContatos + 1
            console.log(anuncio)
            console.log(contagem)
            let dados = {
                anuncioId: id,
                nomeChatRoom: `${anuncio.veiculoMarca} ${anuncio.descricaoVeiculo} - ${anuncio.anoModelo}`
            }
            let chatRoom = await api.post(`chatrooms`, dados)
            await api.patch(`anuncios/${id}/numcontatos`, { contagem: contagem })
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
                        <img src={anuncio_img} alt='Imagem do Anuncio'></img>
                        <button onClick={() => criarChatRoom()}>
                            <FontAwesomeIcon icon={faComment} color='#FFF' size='lg' className='icons' />
                            MENSAGEM
                        </button>
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