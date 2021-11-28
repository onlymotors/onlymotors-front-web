import { Switch } from 'react-router-dom';
import Route from './Route';
import AddAnuncio from '../pages/Add';
import AnuncioSelecionado from '../pages/AnuncioSelecionado';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MeuCadastro from '../pages/MeuCadastro';
import MeusAnuncios from '../pages/MeusAnuncios';
import AlterarCadastro from '../pages/AlterarCadastro';
import AlterarAnuncio from '../pages/AlterarAnuncio';
import SingIn from '../pages/SingIn'
import Relatorio from '../pages/Relatorio'
import Chat from '../pages/Chat'
import ChatRoom from '../pages/ChatRoom';
import Busca from '../pages/Busca';


export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/add" component={AddAnuncio} isPrivate></Route>
            <Route exact path="/anuncio/:id" component={AnuncioSelecionado}></Route>
            <Route exact path="/login" component={Login} islogin></Route>
            <Route exact path="/MeuCadastro" component={MeuCadastro} isPrivate></Route>
            <Route exact path='/MeusAnuncios' component={MeusAnuncios} isPrivate></Route>
            <Route exact path='/AlterarCadastro/:token' component={AlterarCadastro} ></Route>
            <Route exact path='/AlterarAnuncio/:anuncio_id' component={AlterarAnuncio} ></Route>
            <Route exact path='/singin' component={SingIn}></Route>
            <Route exact path='/Relatorio' component={Relatorio}></Route>
            <Route exact path='/Chat/:id?' component={Chat} ></Route>
            <Route exact path='/ChatRoom/:id' component={ChatRoom} ></Route>
            <Route exact path='/Busca/:query?/:searcher?' component={Busca} ></Route>
        </Switch>
    );
};