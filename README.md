# Nome da Aplicação

**Descrição**: A aplicação de cadastro de pessoas permite que os usuários cadastrem, editem e visualizem informações sobre pessoas, incluindo dados como nome, CEP, endereço, bairro, cidade e UF. A aplicação é construída com Angular e segue boas práticas de validação de formulários e uso de componentes reutilizáveis.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Angular 16
- **Backend**: Node
- **Bibliotecas**: RxJS, Angular Forms, etc.

## 🚀 Funcionalidades

- Cadastro de Pessoas (nome, CEP, endereço, bairro, cidade, UF)
- Validação de formulário (nome não pode conter números, campo CEP no formato XXXXXXXX)
- Edição de cadastro
- Exibição de lista de pessoas em formato de tabela
- Mensagens de erro e sucesso em tempo real

## 📦 Como Rodar a Aplicação

### Pré-requisitos

Antes de rodar a aplicação, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org) (Versão 14 ou superior)
- [Angular CLI](https://angular.io/cli)

### Passos para Executar

1. Clone este repositório para a sua máquina local:

  ```bash
  git clone https://github.com/usuario/nome-do-repositorio.git
  ```

2. Navegue até o diretório do projeto:

  ```bash
  cd nome-do-repositorio
  ```

3. Instale as dependências do projeto:

  ```bash
  npm install
  ```

4. Navegue até o diretório do projeto(back)-pasta Server e inicialize o backend:

  ```bash
  node server.js
  ```

5. Volte até o diretório do projeto:

  ```bash
  ng s
  ```

6. Acesse a aplicação em:

  ```bash
  http://localhost:4200
  ```

## 🎮 Funcionalidades Principais
Frontend (Angular):
- Cadastro de Pessoa: O usuário pode preencher um formulário com os dados da pessoa (nome, endereço, CEP, bairro, cidade, etc.), e ao submeter, os dados são enviados ao backend.
- Edição de Pessoa: A aplicação permite editar informações de uma pessoa já cadastrada, com validações de entrada (ex: nome não pode conter números, e o CEP deve seguir o formato correto).
- Exibição de Lista de Pessoas: Um componente de tabela recebe a lista de pessoas do backend e exibe todas as informações cadastradas.
- Validações no Frontend: Validar os dados do formulário antes de enviar para o backend, mostrando mensagens de erro quando o usuário não preencher os campos corretamente.
- Exibição de Mensagens de Sucesso/Erro: Depois de salvar ou editar uma pessoa, o sistema exibe uma mensagem de sucesso ou erro.
- Melhorias de UX: Como impedir a duplicação de CEP e fornecer feedback instantâneo para o usuário com as mensagens de validação.

Backend (Node.js/Express):
- cadastro.json: Arquivo JSON onde as informações das pessoas cadastradas são armazenadas. Ele é lido e escrito sempre que uma pessoa é cadastrada, listada, atualizada ou removida.
- server.js: O arquivo principal do servidor Express, onde todas as rotas (POST, GET, PUT, DELETE) são definidas para manipular as pessoas cadastradas. Este arquivo é responsável por configurar o servidor, o roteamento e a lógica de manipulação do arquivo JSON.

## 📄 Licença  
**MIT License** - Consulte o arquivo [LICENSE](LICENSE) para detalhes.  

**Desenvolvido por** Nilson Mazurchi  
**Minsait** - 2025  
🚀 [Veja outros projetos](https://github.com/nilsonmazurchi?tab=repositories)
