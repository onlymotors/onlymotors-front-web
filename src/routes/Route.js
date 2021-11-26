
import { useContext } from 'react'
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from '../contexts/auth';
export default function RouterWrapper({
    component: Component,
    isPrivate,
    islogin,
    ...rest
}) {

    const {authenticated} = useContext(AuthContext);

    if (!authenticated && isPrivate) {
        return <Redirect to='/login' />
    }

    if(authenticated && islogin){
        return <Redirect to='/' />
    }

    return (
        <Route
            {...rest}
            render={props => (
                <Component {...props} />
            )}
        />
    )
}