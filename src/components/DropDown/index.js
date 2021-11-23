import {useContext} from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';


export default function Drop() {

    const {Logout, user} = useContext(AuthContext);

    const menu = (
        <Menu>
            <Menu.Item>
                <Link to='/MeuCadastro'>
                    Meu cadastro
                </Link>
            </Menu.Item>
            <Menu.Item >
                <Link to='/MeusAnuncios'>
                    Meus Anúncios
                </Link>
            </Menu.Item>
            <Menu.Item >
                <Link to='/add'>
                    Inserir Anúncios
                </Link>
            </Menu.Item>
            <Menu.Item >
                <button style={{background: "none"}} onClick={Logout}>Sair</button>
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
               {user.apelidoUser} <DownOutlined />
            </a>
        </Dropdown>
    )

}

