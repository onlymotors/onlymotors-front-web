import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Header from '../../components/Header'
import './relatorio.css'

export default function Relatorio() {
  const [relatorio, setRelatorio] = useState([])
  const [isLoadingRelatorio, setIsLoadingRelatorio] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  const [visible, setVisible] = useState(false);
  const [mensagem, setMensagem] = useState("");



  useEffect(() => {
    if (isLoadingRelatorio === true)
      gerarRelatorio()
  }, [isLoadingRelatorio])

  useEffect(() => {
    if (isExporting === true)
      exportarExcel()
  }, [isExporting])

  const gerarRelatorio = async () => {
    await api(`relatorio`)
      .then(res => {
        console.log(res.data.relatorio)
        setRelatorio(res.data.relatorio)
      })
      .catch(e => {
        console.log("Erro ao coletar relatório")
      })
      .finally(() => {
        setIsLoadingRelatorio(false)
      })
  }

  const exportarExcel = async () => {
    let response = await api(`relatorio/download`, {
      responseType: 'blob',
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'relatorio.xlsx'); //or any other extension
        document.body.appendChild(link);
        link.click();
        setIsExporting(false)
      });



  }

  const reset = () => {
    setVisible(false);
  }

  if (isLoadingRelatorio) {
    return (
      <>
        <Header />
        <div>Carregando...</div>
      </>
    )
  }

  if (isExporting) {
    return (
      <>
        <Header />
        <div className='container-relatorio'>
          <div>Carregando...</div>
        </div>

      </>
    )
  }

  return (
    <>
      <Header />
      <div className='container-relatorio'>
        <button onClick={() => setIsExporting(true)}>Exportar Excel</button>

        <div className='content-relatorio'>
          <div style={{ width: "50%" }}>
            {relatorio.map(item =>
              <div className="relatorioItem">
                <h3 style={{ fontWeight: "bold" }}>Rank nº {item.rank}: {item.nome}</h3>
                <br />
                <p>Data de publicação: {new Date(item.dataPublicacao).toLocaleDateString()}</p>
                <p>Data da última alteração: {new Date(item.dataAlteracao).toLocaleDateString()}</p>
                <p>Número de visitas: {item.numVisitas}</p>
                <p>Data da primeira visita: {(item.dataPrimeiraVisita === "Nunca visitado") ? "Nunca visitado" : new Date(item.dataPrimeiraVisita).toLocaleDateString()}</p>
                <p>Tempo até a primeira visita: {item.primeiraVisita}</p>
                <p>Média de visitas diárias: {item.medVisitasDia.toLocaleString("pt-BR")}</p>
                <p>Número de contatos: {item.numContatos}</p>
                <p>Data do primeiro contato: {(item.dataPrimeiroContato === "Nunca contatado") ? "Nunca contatado" : new Date(item.dataPrimeiroContato).toLocaleDateString()}</p>
                <p>Tempo até o primeiro contato: {item.primeiroContato}</p>
                <p>Total de mensagens trocadas: {item.totalMensagens}</p>
              </div>
            )}
          </div>
        </div>
      </div>




    </>
  )

}