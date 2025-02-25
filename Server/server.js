const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'cadastro.json');

app.use(express.json());
app.use(cors());

// Função para obter o próximo ID único
function getNextId(pessoas) {
    if (pessoas.length === 0) return 1;
    const ids = pessoas.map(p => p.id);
    return Math.max(...ids) + 1;
}

// Rota para cadastrar uma nova pessoa
app.post('/cadastrar', (req, res) => {
    const novaPessoa = req.body;

    if (!novaPessoa.nome || !novaPessoa.cep) {
        return res.status(400).json({ message: 'Nome e CEP são obrigatórios!' });
    }

    let pessoas = [];
    if (fs.existsSync(FILE_PATH)) {
        const data = fs.readFileSync(FILE_PATH, 'utf8');
        pessoas = JSON.parse(data);
    }

    // Verifica se já existe um cadastro com os mesmos dados
    const pessoaExistente = pessoas.find(p =>
        p.nome === novaPessoa.nome &&
        p.cep === novaPessoa.cep &&
        p.endereco === novaPessoa.endereco &&
        p.complemento === novaPessoa.complemento &&
        p.bairro === novaPessoa.bairro &&
        p.cidade === novaPessoa.cidade &&
        p.uf === novaPessoa.uf
    );

    if (pessoaExistente) {
        return res.status(400).json({ message: 'Pessoa já cadastrada com esses dados!' });
    }

    // Gera um ID único e adiciona ao objeto
    novaPessoa.id = getNextId(pessoas);

    // Salva no arquivo
    pessoas.push(novaPessoa);
    fs.writeFileSync(FILE_PATH, JSON.stringify(pessoas, null, 2), 'utf8');

    res.status(201).json({ message: 'Pessoa cadastrada com sucesso!', data: novaPessoa });
});

// Rota para listar as pessoas cadastradas
app.get('/pessoas', (req, res) => {
    if (!fs.existsSync(FILE_PATH)) {
        return res.status(200).json([]);
    }

    const data = fs.readFileSync(FILE_PATH, 'utf8');
    const pessoas = JSON.parse(data);
    res.status(200).json(pessoas);
});

// Rota para obter os dados de uma pessoa pelo ID
app.get('/pessoa/:id', (req, res) => {
  const id = parseInt(req.params.id); // Obtém o ID da URL
  let pessoas = [];
  if (fs.existsSync(FILE_PATH)) {
      const data = fs.readFileSync(FILE_PATH, 'utf8');
      pessoas = JSON.parse(data);
  }

  const pessoa = pessoas.find(p => p.id === id); // Procura a pessoa pelo ID

  if (!pessoa) {
      return res.status(404).json({ message: 'Pessoa não encontrada' });
  }

  res.status(200).json(pessoa); // Retorna os dados da pessoa encontrada
});

// Rota para atualizar os dados de uma pessoa pelo ID
app.put('/pessoa/:id', (req, res) => {
  const id = parseInt(req.params.id); // Obtém o ID da URL
  const dadosAtualizados = req.body; // Obtém os dados enviados pelo frontend
  let pessoas = [];

  if (fs.existsSync(FILE_PATH)) {
      const data = fs.readFileSync(FILE_PATH, 'utf8');
      pessoas = JSON.parse(data);
  }

  const index = pessoas.findIndex(p => p.id === id);

  if (index === -1) {
      return res.status(404).json({ message: 'Pessoa não encontrada' });
  }

  // Atualiza os dados da pessoa no array
  pessoas[index] = { ...pessoas[index], ...dadosAtualizados };

  // Salva no arquivo JSON
  fs.writeFileSync(FILE_PATH, JSON.stringify(pessoas, null, 2));

  res.status(200).json({ message: 'Pessoa atualizada com sucesso', pessoa: pessoas[index] });
});


// Rota para excluir uma pessoa pelo ID
app.delete('/pessoas/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (!fs.existsSync(FILE_PATH)) {
      return res.status(404).json({ message: 'Arquivo de cadastro não encontrado!' });
  }

  let pessoas = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));

  const index = pessoas.findIndex(pessoa => pessoa.id === id);
  if (index === -1) {
      return res.status(404).json({ message: 'Pessoa não encontrada!' });
  }

  // Remove a pessoa da lista
  pessoas.splice(index, 1);

  // Salva a lista atualizada no arquivo
  fs.writeFileSync(FILE_PATH, JSON.stringify(pessoas, null, 2), 'utf8');

  res.status(200).json({ message: 'Pessoa excluída com sucesso!' });
});



app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
