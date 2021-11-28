# OnlyMotors - Repositório da Aplicação Front-End

Essa é a aplicação com a interface do usuário construída para navegadores, nela é possível publicar, pesquisar e visualizar anúncios ou contatar diretamente os anunciantes através de chat em tempo real.

# 📦 Repositórios integrantes do projeto

| Repositório                                                              | Descrição                          |
| ------------------------------------------------------------------------ | ---------------------------------- |
| [onlymotors-docs](https://github.com/onlymotors/onlymotors-docs)    | Apresentação e documentação        |
| [onlymotors-front-web](https://github.com/onlymotors/onlymotors-front-web)    | Aplicação Front-End Web            |
| [onlymotors-front-mobile](https://github.com/onlymotors/onlymotors-front-mobile) | Aplicação Front-End Mobile Android |
| [onlymotors-back](https://github.com/onlymotors/onlymotors-back)         | Aplicação Back-End                 |


# ⚙️ Instruções de Instalação e Uso

<ul>
<li><b>Node.js</b></li>
<ul>
<li>Baixe e instale o ambiente de excecução Node.js:</li>
<a href="https://nodejs.org/en/download">Node.js</a>
</ul>
</ul>

<ul>
<li><b>Dependências</b></li>
<ul>
<li>Abra o terminal na raiz desse repositório e instale as dependências necessárias:
<br/>

```bash
$ npm install
$ npm install --global expo-cli
```

</li>
</ul>
</ul>

<ul>
<li><b>Criação das Variáveis</b></li>
<ul>
<li>Configure o endereço do Back-End na linha 4 do arquivo <b>./src/services/api.js</b>:
<br/>


```bash
export const API_URL = 'endereco_do_back_end'
```

<b>Obs:</b> Se ambas as aplicações forem executadas na mesma rede, o endereço do Back-End deve ser o IP do computador naquela rede.
<br/>

</li>
</ul>
</ul>

<ul>
<li><b>Execute a aplicação</b></li>
<ul>
<li>Abra o terminal na raiz desse repositório e execute o comando:
<br/>

```bash
$ expo start
```

</li>
</ul>
</ul>
