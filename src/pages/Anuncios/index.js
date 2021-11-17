import React, { useEffect, useState } from "react";
import {  useParams } from 'react-router-dom';
import Header from "../../components/Header";
import './anuncio.css';
import anuncio_img from '../../assets/anuncio_foto.png';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../services/api";


export default function Anuncio() {

    const {id} = useParams();
    const [anuncio, setAnuncio] = useState([])

    useEffect(() => {
        async function loadAnuncio(){
            const response = await api.get(`/anuncios/${id}`);
            //console.log(anuncio)
            setAnuncio(response.data[0])
        }
        loadAnuncio()
    }, [id, anuncio])

    return (
        <div>
            <Header />
            <div className='container-oneAnuncio'>
                <div className='container-descricao'>
                    <h3>{anuncio.veiculoMarca}</h3>
                    <div className='container-contato'>
                        <img src={anuncio_img} alt='Imagem do Anuncio'></img>
                        <button>
                            <FontAwesomeIcon icon={faComment} color='#FFF' size='lg' className='icons' />
                            MENSAGEM
                        </button>
                    </div>
                    <h3 id='preco'>R$ {anuncio.veiculoValor}</h3>
                </div>
                <div className='container-info'>
                    <h3 id='info'>Informações do Anúncio:</h3>
                    <p>Nome do Fabricante: <span>{anuncio.nomeFabricante}</span></p>
                    <p>Ano do Modelo: <span>{anuncio.anoModelo}</span></p>
                    <p>Ano de Fabricação: <span>{anuncio.anoFabricacao}</span></p>
                    <p>Marca: <span>{anuncio.veiculoMarca}</span></p>
                    <p>Modelo: <span>{anuncio.nomeFabricante}</span></p>
                </div>
            </div>
        </div>
    )
}