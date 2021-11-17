import { Switch } from 'react-router-dom';
import Route from './Route';
import AddAnuncio from '../pages/Add';
import Anuncio from '../pages/Anuncios';
import Home from '../pages/Home';
import Login from '../pages/Login';
import CadastroUser from '../pages/CadastroUser';


export default function Routes(){
    return(
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/add" component={AddAnuncio} isPrivate></Route>
            <Route exact path="/anuncio/:id" component={Anuncio}></Route>
            <Route exact path="/login" component={Login} islogin></Route>
            <Route exact path="/infoUser" component={CadastroUser}></Route>
        </Switch>
    );
};