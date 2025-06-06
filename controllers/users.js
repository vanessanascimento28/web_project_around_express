const User = require('../models/user');

// GET /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: 'Erro ao buscar usuários', error: err.message }));
};

// GET /users/:userId
const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Usuário não encontrado' });
      }
      res.send(user);
    })
    .catch((err) => res.status(500).send({ message: 'Erro ao buscar usuário', error: err.message }));
};

// POST /users
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(400).send({ message: 'Erro ao criar usuário', error: err.message }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser
};