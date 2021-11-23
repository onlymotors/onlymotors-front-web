import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Header from '../../components/Header'

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
        <div>Carregando...</div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div>
        <button onClick={() => setIsExporting(true)}>Exportar Excel</button>
      </div>
      {relatorio.map(item =>
        <div>

          <div>Rank</div>
          <div>{item.rank}</div>
          <div>{item.nome}</div>
          <div>Data de publicação: {new Date(item.dataPublicacao).toLocaleDateString()}</div>
          <div>Data da última alteração: {new Date(item.dataAlteracao).toLocaleDateString()}</div>
          <div>Número de visitas: {item.numVisitas}</div>
          <div>Data da primeira visita: {(item.dataPrimeiraVisita === "Nunca visitado") ? "Nunca visitado" : new Date(item.dataPrimeiraVisita).toLocaleDateString()}</div>
          <div>Tempo até a primeira visita: {item.primeiraVisita}</div>
          <div>Média de visitas diárias: {item.medVisitasDia.toLocaleString("pt-BR")}</div>
          <div>Número de contatos: {item.numContatos}</div>
          <div>Data do primeiro contato: {(item.dataPrimeiroContato === "Nunca contatado") ? "Nunca contatado" : new Date(item.dataPrimeiroContato).toLocaleDateString()}</div>
          <div>Tempo até o primeiro contato: {item.primeiroContato}</div>
          <div>Total de mensagens trocadas: {item.totalMensagens}</div>
        </div>
      )}
    </>
  )

}