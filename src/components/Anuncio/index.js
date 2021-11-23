import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import anuncio_img from '../../assets/anuncio_foto.png';
import api,  { API_URL } from '../../services/api';
import '../../components/Anuncio/anuncio.css'


export default function Anuncio() {

    const [anuncios, setAnuncios] = useState([]);
    const [contadorPagina, setContadorPagina] = useState(1)
    const [estado, setEstado] = useState(0)
    const [total, setTotal] = useState(0)
    const [contar, setContar] = useState("true")

    useEffect(() => {
        async function loadAnuncios() {
            const res = await api.get(`/anuncios?pular=${(contadorPagina - 1) * 20}&limitar=20&contar=${contar}`)
                .then((res) => {
                    if (contar === "true")
                        setTotal(res.data.numAnuncios)
                    setAnuncios(res.data.anuncio)
                    console.log(res.data.anuncio)
                    window.scrollTo(0, 0);
                })
        }
        loadAnuncios();
       
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
                                    <Link to={`/anuncio/${index._id}`}>
                                        <img style={{ maxHeight: "270px", maxWidth: "270px" }} src={`${(index.urlImage) ? index.urlImage : API_URL + "images/sem_foto.png"}`} alt='Foto Placeholder'></img>
                                    </Link>
                                </div>
                                <div className='anuncio-conteudo'>
                                    <Link to={`/anuncio/${index._id}`}><h3>{index.veiculoMarca} {index.descricaoVeiculo}</h3></Link>
                                    <span>{index.anoFabricacao}</span>
                                    <h3 id='preco'>R$ {new Intl.NumberFormat('pt-BR', { maximumSignificantDigits: 3 }).format(index.veiculoValor)}</h3>

                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <Pagination
                activePage={contadorPagina}
                itemsCountPerPage={20}
                totalItemsCount={total}
                pageRangeDisplayed={5}
                onChange={(e) => trocarPagina(e)}
                hideDisabled={true}
                hideFirstLastPages={true}
            />
        </div>

    )
}