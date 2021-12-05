import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import api, { API_URL } from '../../services/api';
import { AuthContext } from '../../contexts/auth';
import { useParams, useHistory } from 'react-router';
import "./revisartermos.css";

export default function RevisarTermos() {

  const { token } = useParams()

  const [checkedTermos, setCheckedTermos] = useState(false);
  const [checkedPrivacidade, setCheckedPrivacidade] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (checkedTermos === true && checkedPrivacidade === true)
      setDisabled(false)
    else
      setDisabled(true)
  }, [checkedTermos,
    checkedPrivacidade])

  const processarTermos = () => {
    let dados;
    if (checkedTermos && checkedPrivacidade)
      dados = { termosAceitos: true }
    else
      dados = { termosAceitos: false }

    axios.patch(`${API_URL}users/termos`, dados, { headers: { "Authorization": `Bearer ${token}` } })
      .then(() => {
        localStorage.setItem("tokenAuth", token)
        window.location.href = "/"
      })
      .catch(() => {
        console.log("Erro ao salvar termos")
      })
  }

  return (

    <div>
      <Header />
      <div className="container-termos">
        <div style={{ paddingTop: 36 }}>
          Atualizamos os Termos e Condições de Uso para sua segurança revise-os para continuar.
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", paddingTop: 30 }}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <div>
              <input type="checkbox"
                defaultChecked={checkedTermos ? true : false}
                onChange={() => {
                  setCheckedTermos(!checkedTermos);
                }}
              />
            </div>
            <div style={{ paddingLeft: 4 }}>
              Aceito os
              <a
                style={{ color: "#FF7D04", fontWeight: "700" }}
                href={"/termos"}
              > Termos e Condições de Uso</a>
              .
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <div>
              <input type="checkbox"
                color="#FF7D04"
                defaultChecked={checkedPrivacidade ? true : false}
                onChange={() => {
                  setCheckedPrivacidade(!checkedPrivacidade);
                }}
              />
            </div>
            <div style={{ paddingLeft: 4 }}>
              Concordo com a
              <a
                style={{ color: "#FF7D04", fontWeight: "700" }}
                href={"/privacidade"}
              > Política de Privacidade</a>
              .
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 36 }}>
          <button
            className="btnTermos"
            disabled={disabled}
            onClick={() => processarTermos()}
            // onClick={() => console.log("OK")}
            style={{ alignSelf: "center" }}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}
