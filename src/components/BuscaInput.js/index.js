import React, { useEffect, useState } from "react";
import api from "../../services/api";
import './buscaInput.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function BuscaInput(props) {

  const [palavra, setPalavra] = useState(props.query || "")
  const [possiveisResultados, setPossiveisResultados] = useState([])
  const [resCampoBusca, setResCampoBusca] = useState([]);
  const [visible, setVisible] = useState(false);
  const [dontBlur, setDontBlur] = useState(false);

  useEffect(() => {
    api('search/colecoes')
      .then(res => {
        setResCampoBusca(res.data.resCampoBusca)
        setPossiveisResultados(res.data.resCampoBusca)
      })
      .catch(e => {
        console.log("Erro ao coletar coleçoes de busca")
      })
  }, [])

  useEffect(() => {
    // const items = ['item 1', 'thing', 'id-3-text', 'class'];
    if (palavra) {
      const matches = resCampoBusca.filter(s => s.includes(palavra));
      setPossiveisResultados(matches)
    } else {
      setPossiveisResultados(resCampoBusca);
    }

  }, [palavra])

  return (
    <>
      <div className="buscaInput">
        <form onSubmit={(e) => { e.preventDefault(); window.location.href = `/Busca/${palavra}` }}>
          <input placeholder="Digite a marca ou o modelo" value={palavra} onChange={e => setPalavra(e.target.value)} onFocus={() => setVisible(true)} onBlur={() => { if (!dontBlur) setVisible(false) }} />
          <button type="submit"><FontAwesomeIcon icon={faSearch} size="lg" color="#fff" className='icons' /></button>
        </form >

        <div className="buscaInputDropDown" onMouseEnter={() => setDontBlur(true)} onMouseLeave={() => setDontBlur(false)}>
          {(visible)
            ?
            possiveisResultados.map(item =>
              <li style={{}} onClick={() => { console.log(item); window.location.href = `/Busca/${item}/buscarSugerido` }}>{item}</li>
            )
            :
            <></>
          }
        </div>
      </div>
    </>
  )
}