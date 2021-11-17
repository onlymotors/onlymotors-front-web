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
                <Link to='/infoUser'>
                    Meu cadastro
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to='/'>
                    Favoritos
                </Link>
            </Menu.Item>
            <Menu.Item >
                <Link to='/'>
                    Painel de Anúncios
                </Link>
            </Menu.Item>
            <Menu.Item >
                <Link to='/add'>
                    Inserir Anúncios
                </Link>
            </Menu.Item>
            <Menu.Item >
                <Link to='/'>
                    Chat
                </Link>
            </Menu.Item>
            <Menu.Item >
                <button onClick={Logout}>Sair</button>
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

