import express from 'express';
const router = express.Router();
import userController from '../controller/usuario.controller';

// Get all users
router.get('/', userController.findAll);

// Get user by id
router.get('/:id', userController.findById);

// Create a new user
router.post('/', userController.createUser);

// Update a user
router.put('/:id', userController.updateUser);

// Delete a user
router.delete('/:id', userController.deleteUser);

export default router;
