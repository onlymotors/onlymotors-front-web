import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import api, { API_URL } from '../../services/api';
import { AuthContext } from '../../contexts/auth';
import './alterarCadastro.css'
import { useParams, useHistory } from 'react-router';

export default function AlterarDados() {

  const { user } = useContext(AuthContext)

  const { token } = useParams()
  const history = useHistory()

  const [isLoading, setIsLoading] = useState(false)

  const [showDropDown, setShowDropDown] = useState(false);
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);

  // const [token, setToken] = useState(localStorage.getItem("tokenAuth"))

  const [statusCadastro, setStatusCadastro] = useState(false);
  const [cep, setCep] = useState("");
  const [telefone, setTelefone] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [complemento, setComplemento] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);

  const [senhaAtual, setSenhaAtual] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [verificaSenha, setVerificaSenha] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // console.log(senha)
    // setSenhaAtual(senha)
    console.log(token)
    setIsLoading(true)
    obterEstados()
    async function obterUsuario() {
      await axios(`${API_URL}users/userid`, { headers: { "Authorization": `Bearer ${token}` } })
        .then(res => {
          console.log(res.data)
          setTelefone(res.data[0].telefoneUser)
          setCep(res.data[0].enderecoUser.cep)
          setLogradouro(res.data[0].enderecoUser.logradouro)
          setNumero(res.data[0].enderecoUser.numero)
          setComplemento(res.data[0].enderecoUser.complemento || '')
          setBairro(res.data[0].enderecoUser.bairro)
          setCidade(res.data[0].enderecoUser.cidade)
          setUf(res.data[0].enderecoUser.uf)
          setStatusCadastro(res.data[0].statusCadastro)
        })
        .catch(e => {
          console.log("Erro ao coletar usuário")
        })
    }
    obterUsuario()
  }, [])

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [isLoading])

  useEffect(() => {
    obterCidades()
  }, [uf]);

  const salvar = (e) => {
    e.preventDefault()
    if (!statusCadastro && (senhaNova.length < 1 || logradouro.length < 1)) {
      setMensagem("Você precisa preencher uma nova senha e o endereço completo")
      setVisible(true)
      return
    }

    let dados = {
      enderecoUser: {
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        uf
      }
    }
    console.log(dados)
    if (!telefone.includes('X')) {
      let valor = telefone.replace(/\D/g, "")
      dados.telefoneUser = valor
    }
    if (senhaNova === verificaSenha && senhaNova.length > 0) {
      dados.senhaNova = senhaNova
    }
    if (senhaNova !== verificaSenha && senhaNova.length > 0) {
      setMensagem("As novas senhas não são iguais")
      setVisible(true)
      return
    }
    if (senhaAtual.length > 0) {
      dados.senhaAtual = senhaAtual
    }
    if (!statusCadastro) {
      axios.patch(`${API_URL}users/userid`, dados,
        {
          headers: { "Authorization": `Bearer ${token}` }
        }
      )
        .then(res => {
          history.push('/login')
          // navigation.navigate('Login', {
          //   mensagem: res.data.message,
          //   visibilidade: true
          // })
        })
        .catch(e => {
          // navigation.navigate('Login', {
          //   mensagem: e.message,
          //   visibilidade: true
          // })
        })
    } else {
      axios.patch(`${API_URL}users/userid`, dados,
        {
          headers: { "Authorization": `Bearer ${token}` }
        }
      )
        .then(res => {
          history.push('/MeuCadastro')
          // navigation.navigate('Painel do Usuário', {
          //   mensagem: res.data.message,
          //   visibilidade: true
          // })
        })
        .catch(e => {
          // navigation.navigate('Painel do Usuário', {
          //   mensagem: e.message,
          //   visibilidade: true
          // })
        })
    }
  }

  const tratarCep = (cep) => {
    let valor = cep.replace(/\D/g, "")
    if (valor.length < 8) {
      return valor
    }
    if (valor.length === 8) {
      valor = valor.substring(0, 5) + "-" + valor.substring(5,)
      return valor
    }
  }

  const mascararTelefone = (telefone) => {
    var valor = telefone.replace(/\D/g, "")
    setTelefone(valor)
    if (valor < 10) {
      setTelefone(valor)
    }
    if (valor.length === 10) {
      setTelefone("(" + valor.substring(0, 2) + ") " + valor.substring(2, 6) + "-" + valor.substring(6,))
    }
    if (valor.length === 11) {
      setTelefone("(" + valor.substring(0, 2) + ") " + valor.substring(2, 7) + "-" + valor.substring(7,))
    }
  }


  const obterEnderecoPorCep = async (cep) => {
    setCep(tratarCep(cep))
    var valor = cep.replace(/\D/g, "")
    valor = valor.padStart(8, "0");
    await axios("https://viacep.com.br/ws/" + valor + "/json")
      .then(r => {
        setLogradouro(r.data.logradouro)
        setBairro(r.data.bairro)
        setCidade(r.data.localidade)
        setUf(r.data.uf)
      })
      .catch(e => {
        console.log("Erro CEP inexistente")
      })
  };

  const obterEstados = async () => {
    await axios("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then(r => {
        var lista = r.data
        lista.sort((a, b) => a.sigla.localeCompare(b.sigla))
        let estados = []
        lista.map((item, index) => {
          estados.push({
            label: item.sigla,
            value: item.sigla
          })
        })
        setEstados(estados)
      })
      .catch(e => {
        console.log("Erro ao coletar Estados")
      })
  }

  const obterCidades = async () => {
    await axios("https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + uf + "/municipios")
      .then(r => {
        let cidades = []
        r.data.map((item, index) => {
          cidades.push({
            label: item.nome,
            value: item.nome
          })
        })
        setCidades(cidades)
        setCidade(cidade)
      })
      .catch(e => {
        console.log("Erro ao coletar Cidades")
      })
  }

  const resetParams = () => {
    setSenhaAtual("")
    setSenhaNova("")
    setVerificaSenha("")
    // navigation.setParams({
    //   token:
    //     route.params.token = "",
    //   senha:
    //     route.params.senha = ""
    // })
  }

  const reset = () => {
    setVisible(false);
    resetParams()
  }

  if (isLoading) {
    return (
      <div>
        <Header />
        <div className='container-home'>
          <div className='container-title'>
            <h3>Carregando ...</h3>
          </div>
        </div>

      </div>
    )
  }

  return (

    <div>
      <Header />
      <div className='container-home'>
        <div className='container-title'>
          <h2>Alterar Dados - Conta</h2>
        </div>
        <div className='container-anuncio'>
          {visible &&
            <div>{mensagem}</div>
          }

          <form className="container-anuncio-form">
            <h2>Informações da Conta</h2>
            <span>Senha Atual</span>
            <input value={senhaAtual} onChange={e => setSenhaAtual(e.target.value)} />
            <span>Nova Senha</span>
            <input value={senhaNova} onChange={e => setSenhaNova(e.target.value)} />
            <span>Digite Novamente a Nova Senha</span>
            <input value={verificaSenha} onChange={e => setVerificaSenha(e.target.value)} />
            <span>Telefone</span>
            <input value={telefone} onChange={e => mascararTelefone(e.target.value)} />

            <h2 style={{marginTop:"1rem"}}>Endereço</h2>
            <span>CEP</span>
            <input value={cep} onChange={e => obterEnderecoPorCep(e.target.value)} />
            <span>Logradouro</span>
            <input value={logradouro} onChange={e => setLogradouro(e.target.value)} />
            <span>Número</span>
            <input value={numero} onChange={e => setNumero(e.target.value)} />
            <span>Complemento</span>
            <input value={complemento} onChange={e => setComplemento(e.target.value)} />
            <span>Bairro</span>
            <input value={bairro} onChange={e => setBairro(e.target.value)} />
            <span>Cidade</span>
            <select value={cidade} onChange={e => setCidade(e.target.value)} >
              <option >Cidade</option>
              {cidades.map(item =>
                <option value={item.value} >{item.value}  </option>
              )}
            </select>
            <span>UF</span>
            <select value={uf} onChange={e => setUf(e.target.value)} >
              <option >Estado</option>
              {estados.map(item =>
                <option value={item.value} >{item.value}  </option>
              )}
            </select>

            <button onClick={(e) => salvar(e)}> Salvar Alterações</button>
          </form>
        </div>
      </div>
    </div>
  )

}