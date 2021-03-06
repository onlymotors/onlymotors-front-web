import React, { useContext } from "react";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";
import { useHistory } from 'react-router-dom'
import api from '../../services/api';
import './meuCadastro.css';

export default function CadastroUser() {

    const { user } = useContext(AuthContext)

    const history = useHistory();

    async function handleDelete(){
        api.delete('users/userid')
        .then((res) => {
            localStorage.removeItem('tokenAuth');
            alert('Usuário excluido com sucesso !')
            history.push("/")

        })
        .catch((err) => {
            alert('Erro ao excluir o usuário')
            console.log(err)
        })
    }

    return (
        <div>
            <Header />
            <div className='container-meuCadastro'>
                <div>
                    <h1>Meu Cadastro</h1>
                </div>
                <div>
                    <h3>CNPJ/CPF</h3>
                    <span>{user.cpfUser}</span>
                </div>
                <div>
                    <h3>Nome</h3>
                    <span>{user.nomeUser}</span>
                </div>
                <div>
                    <h3>Apelido</h3>
                    <span>{user.apelidoUser}</span>
                </div>
                <div>
                    <h3>Email</h3>
                    <span>{user.emailUser}</span>
                </div>
                <div>
                    <h3>Telefone</h3>
                    <span>{user.telefoneUser}</span>
                </div>
                <div>
                    <h3>CEP</h3>
                    <span>{user.enderecoUser.cep}</span>
                </div>
                <div>
                    <h3>Logradouro</h3>
                    <span>{user.enderecoUser.logradouro}</span>
                </div>
                <div>
                    <h3>Número</h3>
                    <span>{user.enderecoUser.numero}</span>
                </div>
                <div>
                    <h3>Complemento</h3>
                    <span>{user.enderecoUser.complemento}</span>
                </div>
                <div>
                    <h3>Bairro</h3>
                    <span>{user.enderecoUser.bairro}</span>
                </div>
                <div>
                    <h3>Cidade</h3>
                    <span>{user.enderecoUser.cidade}</span>
                </div>
                <div>
                    <h3>UF</h3>
                    <span>{user.enderecoUser.uf}</span>
                </div>

                <div style={{margin: "2rem 0 0 0"}}>
                    <button onClick={() => window.location.href=`/alterarcadastro/${localStorage.getItem("tokenAuth")}`}>ALTERAR</button>  
                    <button onClick={handleDelete}>EXCLUIR</button>  
                </div>    
                      
            </div>
        </div>
    )
}