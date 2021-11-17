import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import anuncio_img from '../../assets/anuncio_foto.png';
import api from '../../services/api';
import '../../components/Anuncio/anuncio.css'


export default function Anuncio() {

    const [anuncios, setAnuncios] = useState([]);
    const [contadorPagina, setContadorPagina] = useState(1)
    const [estado, setEstado] = useState(0)
    const [total, setTotal] = useState([])

    useEffect(() => {
        async function loadAnuncios() {
            const res = await api.get('/anuncios')
                .then((res) => {
                    setTotal(res.data.anuncio.length)
                    const slice = res.data.anuncio.slice((contadorPagina - 1) * 10, contadorPagina * 10);
                    setAnuncios(slice)
                })
        }
        loadAnuncios();
        window.scrollTo(0, 0)
    }, [estado])

    const trocarPagina = (e) => {
        setContadorPagina(e)
        setEstado(estado + 1)
    }

    return (
        <div className='container-home'>
            <div className='container-title'>
                <h2>Carros Novos e Usados</h2>
                {anuncios.length === 0 ? <span>Nenhum anúncios encontrado</span> : <span>{total} Anúncios Encontrados</span>}
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
            <Pagination
                activePage={contadorPagina}
                itemsCountPerPage={10}
                totalItemsCount={total}
                pageRangeDisplayed={5}
                onChange={(e) => trocarPagina(e)}
                hideDisabled={true}
                hideFirstLastPages={true}
            />
        </div>

    )
}