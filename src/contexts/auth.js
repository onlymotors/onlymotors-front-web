import { useState, createContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import api from "../services/api";

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setloading] = useState(true);
    const [loadingAuth, setloadingAuth] = useState(false);
    const [user, setUser] = useState([{}]);

    useEffect(() => {
        const authToken = localStorage.getItem('tokenAuth');
        if (authToken) {
            api.defaults.headers.Authorization = `Bearer ${authToken}`;
            setAuthenticated(true);

            api.get(`users/userid`).then(res => {
                setUser(res.data[0])

            });
        }

    }, []);


    async function SingIn(emailUser, senhaUser) {

        const data = {
            emailUser,
            senhaUser,
        };
        try {
            await api.post('login', data)
                .then(async (response) => {
                    setloadingAuth(true);

                    if (response.data.statusCadastro === true) {
                        if (response.data.termosAceitos) {
                            localStorage.setItem('tokenAuth', response.data.token);
                            api.defaults.headers.Authorization = `Bearer ${(response.data.token)}`;
                            setAuthenticated(true);

                            await api.get(`users/userid`).then(res => {
                                setUser(res.data[0])

                            });
                        } else {
                            return window.location.href = `/revisartermos/${response.data.token}`
                        }
                    } else {
                        return window.location.href = `/alterarcadastro/${response.data.token}`
                    }
                })
                .catch((e) => {
                    console.log("Ocorreu um erro ao tentar fazer o login " + e);
                })
        } catch (err) {
            alert('Senha inválida ou usuário não cadastrado');
        }
        setloadingAuth(false);

    }

    function Logout() {
        localStorage.removeItem('tokenAuth');
        api.defaults.headers.Authorization = undefined;
        setAuthenticated(false);
        return window.location.href = "/"
    }

    return (
        <AuthContext.Provider value={{
            authenticated,
            loading,
            SingIn,
            loadingAuth,
            Logout,
            user
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;