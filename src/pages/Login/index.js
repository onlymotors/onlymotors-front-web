import React, { useState, useContext } from "react";
import { AuthContext } from '../../contexts/auth';
import { Link } from "react-router-dom";
import foto_perfil from "../../assets/om2.png";
import './login.css';

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
            <div className="container-login">
                <img src={foto_perfil} alt='Imagem de perfil'/>
                <h2 style={{letterSpacing: "10px", marginBottom: "50px", marginTop: "20px"}}>ONLY·MOTORS</h2>
                
                <form>
                    <input type='email'
                        placeholder='EMAIL'
                        value={emailUser}
                        onChange={e => setEmailUser(e.target.value)}
                    />
                    <input type='password'
                        placeholder='SENHA'
                        value={senhaUser}
                        onChange={e => setSenhaUser(e.target.value)}
                    />
                    <button type='submit' onClick={handleLogin}>ENTRAR</button>
                </form>
                <p>Ainda não tem uma conta ? <Link to="/singin" style={{ color: '#FF7D04' }}>Cadastre aqui</Link> </p>
            </div>
        </div>
    )
}