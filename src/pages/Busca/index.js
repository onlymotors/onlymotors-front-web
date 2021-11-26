import React, { useEffect, useState } from 'react';
import api, { API_URL } from '../../services/api';
import Header from '../../components/Header';
import { useParams } from 'react-router';
import numeral from '../../utils/formatador'
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import './busca.css'

export default function Busca() {

  const { query, searcher } = useParams()

  const [valorMinimo, setValorMinimo] = useState("");
  const [valorMaximo, setValorMaximo] = useState("");
  const [marca, setMarca] = useState("");
  const [marcas, setMarcas] = useState([]);
  const [modelo, setModelo] = useState("");
  const [modelos, setModelos] = useState([]);
  const [ano, setAno] = useState("");
  const [anos, setAnos] = useState([]);
  const [resCampoBusca, setResCampoBusca] = useState([]);
  const [searchQuery, setSearchQuery] = useState(query || "");

  const [anuncios, setAnuncios] = useState([]);
  const [contadorPagina, setContadorPagina] = useState(1)
  const [contar, setContar] = useState("true")
  const [numAnuncios, setNumAnuncios] = useState(0);
  const [buscador, setBuscador] = useState(searcher || "");
  const [sugerido, setSugerido] = useState(query || "");

  useEffect(() => {

    let lista = []
    for (let index = 2022; index >= 1901; index--) {
      lista.push(String(index))
    }
    setAnos(lista)
    api('search/colecoes')
      .then(res => {
        setMarcas(res.data.marcas)
        setModelos(res.data.modelos)
        setResCampoBusca(res.data.resCampoBusca)
      })
      .catch(e => {
        console.log("Erro ao coletar coleçoes de busca")
      })
  }, [])

  const buscarPalavras = async () => {
    // let marcaVeiculo = "";
    // let modeloVeiculo = "";
    if (marca === "Ano" && modelo === "Modelo") {
      let matches = resCampoBusca.filter(s => s.includes(searchQuery))
      if (matches.length) {
        matches.forEach(item => {
          let itemSplit = item.split(" ")
          let searchSplit = searchQuery.split(" ")
          if (itemSplit.length === 1) {
            if (itemSplit[0].toLowerCase() === searchSplit[0].toLowerCase()) {
              setMarca(item)
              // marcaVeiculo = item
            }
          } else {
            if (searchSplit.length > 1) {
              if (itemSplit[1].toLowerCase() === searchSplit[1].toLowerCase()) {
                setMarca(itemSplit[0])
                // marcaVeiculo = itemSplit[0]
                setModelo(itemSplit[1])
                // modeloVeiculo = itemSplit[1]
              }
              if (itemSplit[1].toLowerCase() === searchSplit[0].toLowerCase()) {
                setMarca(itemSplit[0])
                // marcaVeiculo = itemSplit[0]
                setModelo(itemSplit[1])
                // modeloVeiculo = itemSplit[1]
              }
            } else {
              if (itemSplit[0].toLowerCase() === searchSplit[0].toLowerCase()) {
                setMarca(itemSplit[0])
                // marcaVeiculo = itemSplit[0]
              }
              if (itemSplit[1].toLowerCase() === searchSplit[0].toLowerCase()) {
                setModelo(itemSplit[1])
                // modeloVeiculo = itemSplit[1]
              }
            }
          }
        })
      }
    }
    console.log(searchQuery)
    if (searchQuery !== "") {
      await api.get(`search/${searchQuery}?pular=${(contadorPagina - 1) * 20}&limitar=20&contar=${contar}`)
        .then(res => {
          if (res.data.numAnuncios)
            setNumAnuncios(res.data.numAnuncios)
          setContar("false");
          setAnuncios(res.data.anuncio)
          setBuscador("buscarPalavras")
        })
        .catch(e => {
          console.log("Erro ao coletar anuncios")
        })
    } else {
      await api.get(`anuncios?pular=${(contadorPagina - 1) * 20}&limitar=20&contar=${contar}`)
        .then(res => {
          if (res.data.numAnuncios)
            setNumAnuncios(res.data.numAnuncios)
          setContar("false");
          setAnuncios(res.data.anuncio)
          setBuscador("buscarPalavras")
        })
        .catch(e => {
          console.log("Erro ao coletar anuncios")
        })
    }
  }

  const buscarFiltros = async () => {
    let marcaVeiculo = marca
    if (marca === "Marca")
      marcaVeiculo = ""
    let modeloVeiculo = modelo
    if (modelo === "Modelo")
      modeloVeiculo = ""
    let anoVeiculo = ano
    if (ano === "Ano")
      anoVeiculo = "0"
    let valMinimo = valorMinimo
    if (valorMinimo === "") {
      valMinimo = "0"
    }
    let valMaximo = valorMaximo
    if (valorMaximo === "") {
      valMaximo = "0"
    }
    await api.get(`search?palavras=${searchQuery}&marca=${marcaVeiculo}&modelo=${modeloVeiculo}&ano=${anoVeiculo}&valorMinimo=${valMinimo}&valorMaximo=${valMaximo}&pular=${(contadorPagina - 1) * 20}&limitar=20&contar=${contar}`)
      .then(res => {
        if (res.data.numAnuncios)
          setNumAnuncios(res.data.numAnuncios)
        setContar("false")
        setAnuncios(res.data.anuncio)
        setBuscador("buscarFiltros")
      })
      .catch(e => {
        console.log("Erro ao coletar anuncios")
      })
  }

  const buscarSugerido = async (item) => {
    let itemSplit = item.split(" ")
    if (itemSplit.length > 1) {
      setMarca(itemSplit[0])
      setModelo(itemSplit[1])
    } else {
      setMarca(itemSplit[0])
    }
    await api.get(`search/${item}?pular=${(contadorPagina - 1) * 20}&limitar=20&contar=${contar}`)
      .then(res => {
        if (res.data.numAnuncios)
          setNumAnuncios(res.data.numAnuncios)
        setContar("false");
        setAnuncios(res.data.anuncio)
        setBuscador("buscarSugerido")
      })
      .catch(e => {
        console.log("Erro ao coletar anuncios")
      })
  }

  const mascararValor = (value, cb) => {
    var number = numeral(value).format();
    number = "R$ " + number
    cb(number);
  };

  const selecionadorBuscador = () => {
    if (buscador === "buscarSugerido")
      buscarSugerido(sugerido)
    else if (buscador === "buscarFiltros")
      buscarFiltros()
    else
      buscarPalavras()
  }

  useEffect(() => {
    if (contar === "true")
      selecionadorBuscador()
  }, [contar])

  useEffect(() => {

    selecionadorBuscador()
  }, [contadorPagina])

  return (
    <>
      <Header query={query} />

      <div className="container-busca">
        <div className='container-title'>
          <h2>Carros Novos e Usados</h2>
          {anuncios.length === 0 ? <span>Nenhum anúncios encontrado</span> : <span>{numAnuncios} Anúncios Encontrados</span>}
        </div>

        <section className="buscaSection">
          <select style={{ marginRight: "0.5rem" }} value={marca} onChange={e => setMarca(e.target.value)}>
            <option>Marca</option>
            {marcas.map(marca =>
              <option>{marca}</option>
            )}

          </select>
          <select style={{ marginRight: "0.5rem" }} value={modelo} onChange={e => setModelo(e.target.value)}>
            <option>Modelo</option>
            {modelos.map(modelo =>
              <option>{modelo}</option>
            )}
          </select>
          <select style={{ marginRight: "0.5rem" }} value={ano} onChange={e => setAno(e.target.value)}>
            <option>Ano</option>
            {anos.map(ano =>
              <option>{ano}</option>
            )}
          </select>
          <br />
          <input placeholder="Valor Mínimo" value={valorMinimo} onChange={e => mascararValor(e.target.value, setValorMinimo)} />
          <input placeholder="Valor Máximo" value={valorMaximo} onChange={e => mascararValor(e.target.value, setValorMaximo)} />
          <button
            onClick={() => {
              setBuscador("buscarFiltros")
              setSearchQuery("");
              setContar("true");
              setContadorPagina(1)
              // buscarFiltros();
            }}
          >
            Filtrar
          </button>
        </section>

        {anuncios &&
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
                    <span>{index.anoModelo}</span>
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
          onChange={(e) => setContadorPagina(e)}
          hideDisabled={true}
          hideFirstLastPages={true}
        />

      </div>
    </>
  )
}
