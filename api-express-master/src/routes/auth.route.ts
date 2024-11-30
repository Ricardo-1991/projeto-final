import express from 'express';
const router = express.Router();
import loginController from '../controller/auth.controller';
import {z} from 'zod';
import {validator} from '../middlewares/validator'

const loginSchema = z.object({
    email: z.string().email({message: "formato de e-mail inválido"}), 
    password: z.string()
    .min(8, { message: "Senha deve ter no mínimo 8 caracteres." })
    .regex(/[A-Z]/, { message: "Senha deve conter pelo menos uma letra maiúscula." })
    .regex(/[0-9]/, { message: "Senha deve conter pelo menos um número." })
    .regex(/[^a-zA-Z0-9]/, { message: "Senha deve conter pelo menos um caractere especial." }),
})

//Login
router.post('/', validator(loginSchema), loginController.signIn);


export default router