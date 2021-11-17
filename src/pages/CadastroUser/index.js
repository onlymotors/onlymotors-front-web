import React, { useContext } from "react";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";

export default function CadastroUser() {

    const { user } = useContext(AuthContext)


    return (
        <div>
            <Header />
            <div>
                <div>
                    <h2>Informações da Conta</h2>
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
                    <span>{user.ApelidoUser}</span>
                </div>
                <div>
                    <h3>Email</h3>
                    <span>{user.emailUser}</span>
                </div>
                <div>
                    <h3>Telefone</h3>
                    <span>{user.telefoneUser}</span>
                </div>
            </div>
        </div>
    )
}