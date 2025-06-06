const mongoose = require('mongoose');
const express = require('express');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();
const PORT = 3000;

// Conexão com MongoDB
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '684301676e4dcf0436362c23'
  };
  next();
});

// Rotas
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// Rota para qualquer outra coisa (404)
app.use((req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
