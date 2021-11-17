import React, { useState, useContext } from "react";
import { AuthContext } from '../../contexts/auth';
import { Link } from "react-router-dom";
import foto_perfil from "../../assets/logo.png";


export default function Login() {

    const {SingIn} = useContext(AuthContext);

    const [emailUser, setEmailUser] = useState('')
    const [senhaUser, setSenhaUser] = useState('')

    function handleLogin(e){
        e.preventDefault();
        if(emailUser !== '' && senhaUser !== ''){
            SingIn(emailUser, senhaUser)
        }else(
            alert('preencha os campos !!')
        )
    }
    return (
        <div>
            <div>
                <h2>ONLY MOTORS</h2>
                <div>
                    <img src={foto_perfil} alt='Imagem de perfil'/>
                    <form>
                        <input type='email'
                            placeholder='EMAIL'
                            value={emailUser}
                            onChange={e => setEmailUser(e.target.value)}
                        ></input>
                        <input type='password'
                            placeholder='SENHA'
                            value={senhaUser}
                            onChange={e => setSenhaUser(e.target.value)}
                        ></input>
                        <button type='submit' onClick={handleLogin}>ENTRAR</button>
                    </form>
                    <div>
                        <p>Ainda não tem uma conta ? <Link to="/" style={{ color: '#FF7D04' }}>Cadastre aqui</Link> </p>
                    </div>
                </div>
            </div>

        </div>
    )
}