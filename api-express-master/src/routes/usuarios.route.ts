import express from 'express';
const router = express.Router();
import userController from '../controller/usuario.controller';
import {z} from 'zod';
import {validator} from '../middlewares/validator'

const userSchema = z.object({
    name: z.string().min(2, {message: "Seu nome precisa ter pelo menos 2 caracteres"}),
    email: z.string().email({message: "formato de e-mail inválido"}),
    password: z.string()
        .min(8, { message: "Senha deve ter no mínimo 8 caracteres." })
        .regex(/[A-Z]/, { message: "Senha deve conter pelo menos uma letra maiúscula." })
        .regex(/[0-9]/, { message: "Senha deve conter pelo menos um número." })
        .regex(/[^a-zA-Z0-9]/, { message: "Senha deve conter pelo menos um caractere especial." }),
})

// Get all users
router.get('/', userController.findAll);

// Get user by id
router.get('/:id', userController.findById);

// Create a new user
router.post('/create', validator(userSchema), userController.createUser);

// Update a user
router.put('/:id', validator(userSchema), userController.updateUser);

// Delete a user
router.delete('/:id', userController.deleteUser);

export default router;
