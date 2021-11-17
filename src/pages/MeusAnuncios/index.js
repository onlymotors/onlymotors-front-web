
import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header'
import { AuthContext } from '../../contexts/auth';
import api from '../../services/api';

export default function MeusAnuncios() {

    const { user } = useContext(AuthContext);

    const [anuncioUser, setAnuncioUser] = useState([]);

    useEffect(() => {
        async function loadMyAnuncios() {
            api.get('/anuncios/userid')
                .then((res) => {
                    setAnuncioUser(res.data.anuncio)
                })
                .catch((err) => {
                    alert('Não foi possível achar os anuncios')
                    console.log(err)
                })

        }
        loadMyAnuncios();
    }, [])

    return (
        <div>
            <Header />
            <h2>Meus Anúncios</h2>
            <p>{anuncioUser.length}</p>

        </div>
    )
}