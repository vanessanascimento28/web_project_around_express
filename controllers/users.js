const User = require('../models/user');

// Códigos de erro para reutilizar
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

// GET /users — retorna todos os usuários
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Erro ao buscar usuários' });
    });
};

// GET /users/:userId — retorna usuário por ID
const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      const error = new Error('Usuário não encontrado');
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'ID de usuário inválido' });
      }
      if (err.statusCode === NOT_FOUND) {
        return res.status(NOT_FOUND).send({ message: err.message });
      }
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Erro ao buscar usuário' });
    });
};

// POST /users — cria um novo usuário
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Dados inválidos ao criar usuário' });
      }
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Erro ao criar usuário' });
    });
};

// PATCH /users/me — atualiza nome e descrição do perfil
const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error('Usuário não encontrado');
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Dados inválidos ao atualizar perfil' });
      }
      if (err.statusCode === NOT_FOUND) {
        return res.status(NOT_FOUND).send({ message: err.message });
      }
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Erro ao atualizar perfil' });
    });
};

// PATCH /users/me/avatar — atualiza o avatar do perfil
const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error('Usuário não encontrado');
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'URL inválida ao atualizar avatar' });
      }
      if (err.statusCode === NOT_FOUND) {
        return res.status(NOT_FOUND).send({ message: err.message });
      }
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Erro ao atualizar avatar' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
