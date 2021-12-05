import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router'
import Header from '../../components/Header'
import api, { API_URL } from '../../services/api';
import numeral from '../../utils/formatador';
import './alterarAnuncio.css'

export default function AlterarAnuncio() {

  const { anuncio_id } = useParams()

  const [arquivo, setArquivo] = useState()


  const [anoFabricacao, setAnoFabricacao] = useState("");
  const [anoModelo, setAnoModelo] = useState("");
  const [descricaoVeiculo, setDescricaoVeiculo] = useState("");
  const [nomeFabricante, setNomeFabricante] = useState("");
  const [veiculoMarca, setVeiculoMarca] = useState("");
  const [veiculoValor, setVeiculoValor] = useState("");
  const [value, setValue] = useState(0);
  const [imagem, setImagem] = useState("");
  const [isUpload, setIsUpload] = useState(false)

  useEffect(() => {
    api(`anuncios/${anuncio_id}`)
      .then(res => {
        setAnoFabricacao(res.data[0].anoFabricacao.toString())
        setAnoModelo(res.data[0].anoModelo.toString())
        setDescricaoVeiculo(res.data[0].descricaoVeiculo)
        setNomeFabricante(res.data[0].nomeFabricante)
        setVeiculoMarca(res.data[0].veiculoMarca)
        mascararValor(res.data[0].veiculoValor)
        console.log()
        setImagem(res.data[0].urlImage)
      })
      .catch(e => {
        console.log("Erro ao coletar anúncio pelo seu id")
      })
  }, [])



  const salvar = async (e) => {
    e.preventDefault();
    let valor = Number(veiculoValor.replace(".", "").replace(",", ".").replace(/[^\d.-]/g, ""))
    console.log(valor)
    let dados = {
      anoFabricacao: parseInt(anoFabricacao),
      anoModelo: parseInt(anoModelo),
      descricaoVeiculo,
      nomeFabricante,
      veiculoMarca,
      veiculoValor: valor,
    }
    await api.patch(`anuncios/${anuncio_id}`, dados)
      .then(res => {
        // navigation.navigate("Painel de Anúncios", {
        //   mensagem: res.data.message,
        //   visibilidade: true
        // })
      })
      .catch(e => {
        // navigation.navigate("Painel de Anúncios", {
        //   mensagem: e.message,
        //   visibilidade: true
        // })
      })

    let fromData = new FormData();
    fromData.append('image', arquivo)

    api.patch(`/anuncios/${anuncio_id}`, fromData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(() => {
        alert('Anúncios adicionados com sucesso')
        // window.location.reload()
      })
      .catch((e) => {
        alert("Algo deu errado")
        console.log(e)
      })
  }

  const mascararValor = (value) => {
    var number = numeral(value).format();
    number = "R$ " + number
    setVeiculoValor(number);
  };

  function handleChange(e) {
    e.preventDefault();
    console.log(e.target.files[0])

    setImagem(URL.createObjectURL(e.target.files[0]))
    setArquivo(e.target.files[0])

    // document.getElementById("uploaded-image").className = "imagemAlterarAnuncio"

  };

  // useEffect(() => {
  //   setIsUpload(true)
  // }, [arquivo])

  // const salvar = async () => {
  //   let fromData = new FormData();
  //   fromData.append('image', arquivo)

  //   api.patch(`/anuncios/${anuncio_id}`, fromData, {
  //     headers: { 'Content-Type': 'multipart/form-data' }
  //   })
  //     .then(() => {
  //       alert('Anúncios adicionados com sucesso')
  //       // window.location.reload()
  //     })
  //     .catch((e) => {
  //       alert("Algo deu errado")
  //       console.log(e)
  //     })
  // }

  return (
    <div>
      <Header />
      <div className='container-home'>
        <div className='container-title'>
          <h2>Alterar Dados - Veículo</h2>
        </div>
        <div className='container-anuncio boxbox'>
          <form className="container-anuncio-form left">
            <h2>Informações do Veículo</h2>
            <span>Nome Fabricante</span>
            <input value={nomeFabricante} onChange={e => setNomeFabricante(e.target.value)} />
            <span>Marca do Veículo</span>
            <input value={veiculoMarca} onChange={e => setVeiculoMarca(e.target.value)} />
            <span>Modelo do Veículo</span>
            <input value={descricaoVeiculo} onChange={e => setDescricaoVeiculo(e.target.value)} />
            <span>Ano de Fabricação</span>
            <input value={anoFabricacao} onChange={e => setAnoFabricacao(e.target.value)} />
            <span>Ano do Modelo</span>
            <input value={anoModelo} onChange={e => setAnoModelo(e.target.value)} />
            <span>Valor</span>
            <input value={veiculoValor} onChange={e => setVeiculoValor(e.target.value)} />

            <button onClick={(e) => salvar(e)}> Salvar Alterações</button>
          </form>

          <div className="center"></div>

          <div className="right">

            <img className="imagemAlterarAnuncio" src={`${(imagem.length > 0) ? imagem : API_URL + "images/sem_foto.png"}`} alt='Foto Placeholder'></img>

            <div>
              <label className="uploadAnuncioFoto" htmlFor="upload">Selecionar Imagem</label>
              <input
                id="upload"
                type='file'
                name='image'
                onChange={(e) => handleChange(e)}
              />
            </div>

          </div>

        </div>
      </div>



    </div >
  )
}