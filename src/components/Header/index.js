import React, {useContext} from "react";
import { AuthContext } from '../../contexts/auth';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faUser, faList } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png' 
import './header.css';
import Drop from "../DropDown";

export default function Header() {

    const {authenticated} = useContext(AuthContext);

    if(!authenticated){
        return ( 
            <div className='container'>
                <div className='div-conteudo'>
                    <ul className='lista-menu'>
                        <li id='logo'>
                            <Link to='/'><img src={logo} style={{width:'40px'}}></img></Link>
                        </li>
                        <li id='anuncios'>
                            <FontAwesomeIcon icon={faList} size="lg" color="#fff" className='icons' />
                            <a href="#">Meus Anúncios</a>
                        </li>
                        <li id='chat'>
                            <FontAwesomeIcon icon={faComments} size="lg" color="#fff" className='icons' />
                            <a href="#">Chat</a>
                        </li>
                        <li id='entrar'>
                            <FontAwesomeIcon icon={faUser} size="lg" color="#fff" className='icons' />
                            <Link to="/login">Entrar</Link>
                        </li>
                        <li id='btn-anuncio'>
                        <Link to='/add'><button id='btn-add-anuncio'><strong>Anunciar</strong></button></Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }else{
        return ( 
            <div className='container'>
                <div className='div-conteudo'>
                    <ul className='lista-menu'>
                        <li id='logo'>
                            <Link to='/'><img src={logo} style={{width:'40px'}}></img></Link>
                        </li>
                        <li id='anuncios'>
                            <FontAwesomeIcon icon={faList} size="lg" color="#fff" className='icons' />
                            <a href="#">Meus Anúncios</a>
                        </li>
                        <li id='chat'>
                            <FontAwesomeIcon icon={faComments} size="lg" color="#fff" className='icons' />
                            <a href="#">Chat</a>
                        </li>
                        <li id='entrar'>
                            <FontAwesomeIcon icon={faUser} size="lg" color="#fff" className='icons' />
                            <Drop></Drop>
                        </li>
                        <li id='btn-anuncio'>
                        <Link to='/add'><button id='btn-add-anuncio'><strong>Anunciar</strong></button></Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
    
};