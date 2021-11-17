import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";
import api from "../../services/api";
import './add.css';

export default function AddAnuncio() {

    const [arquivo,setArquivo] = useState(null);
    const [name, setName] = useState('');
    const history = useHistory();

    function handleChange(e){
        setArquivo(e.target.files[0]);
        setName(e.target.files[0].name);
    };

    function handleUpload(e){
        e.preventDefault();
        let fromData = new FormData();
        fromData.append('file', arquivo)

        api.post('/anuncios', fromData, {
            headers: {'Content-Type':'multipart/form-data'}
        })
        .then(() => {
            alert('Anúncios adicionados com sucesso')
            setName('')
            history.push('/')
        })
        .catch((e) => {
            alert("Algo deu errado")
            console.log(e)
        })
    }

    return (
        <div>
            <Header />
            <div className='container-bg'>
                <div className='add-title'>
                    <h2>Adicionar Anúncios</h2>
                </div>
                <div className='add-conteudo'>
                    <h3>Passo 1</h3>
                    <p>
                        Crie um arquivo .csv nos seguintes formatos
                    </p>
                    <h3>Exemplo de CSV</h3>
                    <p>
                        Nome do fabricante | descrição marca do veículo | descrição do modelo
                        do veículo | cod do anunciante | ano de fabricação | ano do modelo | cpf
                        do anunciante | cnpj do anunciante | valor do veículo
                    </p>
                    <h3>Passo 2</h3>
                    <p>
                        Faça o upload do arquivo criado
                    </p>
                </div>
                <div className='add-upload'>
                    <form>
                        <label htmlFor='upload'>UPLOAD</label>
                        <input 
                        id='upload' 
                        type='file' 
                        name='file'
                        onChange={(e) => handleChange(e)}
                        >
                        </input>
                        <span>{name}</span>
                        <button onClick={(e) => handleUpload(e)}>ENVIAR</button>
                    </form>
                </div>
            </div>
        </div>
    );
};