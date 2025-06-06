const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  console.log('Criando cartão com owner ID:', owner); // debug

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      console.error('Erro ao criar cartão:', err.message);
      res.status(400).send({ message: 'Erro ao criar cartão', error: err.message });
    });
};
