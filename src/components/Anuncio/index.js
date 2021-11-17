import React,{useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import anuncio_img from '../../assets/anuncio_foto.png';
import api from '../../services/api';

export default function Anuncio() {

    const [anuncios, setAnuncios] = useState([]);

    useEffect(() => {
        async function loadAnuncios() {
            const res = await api.get('/anuncios')
                .then((res) => {
                    setAnuncios(res.data.anuncio)
                })
        }
        loadAnuncios();
    }, [])

    return (
        <div className='container-home'>
            <div className='container-title'>
                <h2>Carros Novos e Usados</h2>
                {anuncios.length === 0 ? <span>Nenhum anúncios encontrado</span> : <span>{anuncios.length} Anúncios Encontrados</span>}
            </div>
            {
                anuncios.map((index) => {
                    return (
                        <div className='container-anuncio' id={index._id}>
                            <div className='anuncio'>
                                <div className='anuncio-img'>
                                    <img src={anuncio_img} alt='Foto Placeholder'></img>
                                </div>
                                <div className='anuncio-conteudo'>
                                    <Link to={`/anuncio/${index._id}`}><h3>{index.veiculoMarca}</h3></Link>
                                    <span>{index.anoFabricacao}</span>
                                    <h3 id='preco'>R$ {index.veiculoValor}</h3>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}