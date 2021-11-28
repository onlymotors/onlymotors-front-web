import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import anuncio_img from '../../assets/anuncio_foto.png';
import api, { API_URL } from '../../services/api';
import Pagination from "react-js-pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import './meusanuncios.css'

export default function MeusAnuncios() {

    const { user } = useContext(AuthContext);


    // const [arquivo,setArquivo] = useState(null);

    const [renderizar, setRenderizar] = useState(0);
    const [anuncios, setAnuncios] = useState([]);
    const [contadorPagina, setContadorPagina] = useState(1)
    const [numAnuncios, setNumAnuncios] = useState(0);

    const [estado, setEstado] = useState(0)

    const [isLoading, setIsLoading] = useState(false)
    const [file, setFile] = useState()
    const [status, setStatus] = useState("")
    const [type, setType] = useState("")
    const [apiUrl, setApiUrl] = useState("")
    const [anuncioId, setAnuncioId] = useState("")
    const [contar, setContar] = useState("true")

    useEffect(() => {
        console.log((contadorPagina - 1) * 10);
        async function loadMyAnuncios() {
            api(`anuncios/userid?pular=${(contadorPagina - 1) * 20}&limitar=20&contar=${contar}`)
                .then(res => {
                    if (contar === "true")
                        setNumAnuncios(res.data.numAnuncios)
                    setAnuncios(res.data.anuncio)
                    console.log(res.data.anuncio)
                })
                .catch(e => {
                    console.log("Erro ao coletar anúncios do usuário")
                })

        }
        loadMyAnuncios();
        window.scrollTo(0, 0)
    }, [estado])



    const trocarPagina = (e) => {
        setContadorPagina(e)
        setContar("false")
        setEstado(estado + 1)
    }




    const alterarStatusAnuncio = async (e) => {
        console.log(e._id)
        let dados
        if (e.statusAnuncio === 0) {
            dados = {
                statusAnuncio: 1
            }
        } else {
            dados = {
                statusAnuncio: 0
            }
        }
        await api.patch(`anuncios/${e._id}`, dados)
            .then(res => {
                window.location.href = "/MeusAnuncios"
            })
    }

    const deletarAnuncio = async (e) => {

        await api.delete(`anuncios/${e._id}`)
            .then(res => {
                // resetParams()
                // navigation.navigate("Painel de Anúncios", {
                //     mensagem: res.data.message
                // })
                alert("deu certo!")
            })
            .catch(e => {
                // resetParams()
                // navigation.navigate("Painel de Anúncios", {
                //     mensagem: e.message
                // })
            })
        // .finally(() => {
        //     setVisible(true)
        //     setRenderizar(renderizar + 1)
        // })
    }

    return (
        <div>
            <Header />

            <div className='container-home'>
                <div className='container-title'>
                    <h2>Meus Anúncios</h2>
                    {/* <span>{numAnuncios} Encontrados</span> */}
                </div>

                <button className="btnRelatorioAnuncios" onClick={() => window.location.href="/Relatorio"}>Gerar Relatório</button>
                {
                    anuncios.map((index) => {
                        return (
                            <div className='container-anuncio' id={index._id}>
                                <div className='anuncio'>
                                    <div className='anuncio-img'>
                                        <img style={{ maxHeight: "270px", maxWidth: "270px" }} src={`${(index.urlImage) ? index.urlImage : API_URL + "images/sem_foto.png"}`} alt='Foto Placeholder'></img>
                                    </div>
                                    <div className='anuncio-conteudo'>
                                        <h3>{index.veiculoMarca} {index.descricaoVeiculo}</h3>
                                        <span>{index.anoFabricacao}</span>
                                        <p style={{ marginTop: "5px" }}>{(index.statusAnuncio === 1)
                                            ? <div>Publicado</div>
                                            : <div>Pausado</div>
                                        }</p>

                                        <div className="MenuLateralAlteracao">
                                            
                                            <Link className="editicon"to={`/AlterarAnuncio/${index._id}`}>
                                                <FontAwesomeIcon icon={faPen} size="lg" color="#000" className='icons' title="Editar Anúncio" />
                                            </Link>


                                            <button id={index._id} onClick={() => alterarStatusAnuncio(index)}>{(index.statusAnuncio === 0)
                                                ? "Republicar"
                                                : "Pausar"
                                            }</button>
                                            <button id={index._id} onClick={() => deletarAnuncio(index)}>Excluir</button>
                                        </div>
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
                    totalItemsCount={numAnuncios}
                    pageRangeDisplayed={5}
                    onChange={(e) => trocarPagina(e)}
                    hideDisabled={true}
                    hideFirstLastPages={true}
                />
            </div>
        </div >
    )
}