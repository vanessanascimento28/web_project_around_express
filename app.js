const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Caminhos para os arquivos de dados
const usersPath = path.join(__dirname, 'data', 'users.json');
const cardsPath = path.join(__dirname, 'data', 'cards.json');

// Rota de usuários
app.get('/users', (req, res) => {
  fs.readFile(usersPath, 'utf8', (err, data) => {
    if (err) return res.status(500).send({ message: 'Erro ao carregar usuários' });
    res.send(JSON.parse(data));
  });
});

// Rota de cards
app.get('/cards', (req, res) => {
  fs.readFile(cardsPath, 'utf8', (err, data) => {
    if (err) return res.status(500).send({ message: 'Erro ao carregar cards' });
    res.send(JSON.parse(data));
  });
});

// Rota para buscar usuário por ID
app.get('/users/:id', (req, res) => {
  fs.readFile(usersPath, 'utf8', (err, data) => {
    if (err) return res.status(500).send({ message: 'Erro ao carregar usuários' });

    const users = JSON.parse(data);
    const user = users.find((u) => u._id === req.params.id);

    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'ID do usuário não encontrado' });
    }
  });
});

// Middleware para rotas inexistentes
app.use((req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
