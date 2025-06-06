const express = require('express');
const Card = require('../models/card');

const router = express.Router();

// GET /cards — retorna todos os cartões
router.get('/', async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    res.status(500).send({ message: 'Erro ao buscar os cartões' });
  }
});

// POST /cards — cria um novo cartão
router.post('/', async (req, res) => {
  const { name, link, owner } = req.body;

  try {
    const newCard = await Card.create({ name, link, owner });
    res.status(201).send(newCard);
  } catch (err) {
    res.status(400).send({ message: 'Erro ao criar o cartão', error: err.message });
  }
});

// DELETE /cards/:cardId — deleta um cartão por _id
router.delete('/:cardId', async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);

    if (!card) {
      return res.status(404).send({ message: 'Cartão não encontrado' });
    }

    res.send({ message: 'Cartão deletado com sucesso', card });
  } catch (err) {
    res.status(500).send({ message: 'Erro ao deletar o cartão' });
  }
});

module.exports = router;
