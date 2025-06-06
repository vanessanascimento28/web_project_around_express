const express = require('express');
const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

// GET /users — todos os usuários
router.get('/', getUsers);

// GET /users/:userId — usuário por ID
router.get('/:userId', getUserById);

// POST /users — criar novo usuário
router.post('/', createUser);

// PATCH /users/me — atualizar perfil (name e about)
router.patch('/me', updateUser);

// PATCH /users/me/avatar — atualizar avatar
router.patch('/me/avatar', updateAvatar);

module.exports = router;
