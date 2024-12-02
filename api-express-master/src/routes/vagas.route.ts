import express from 'express';
const router = express.Router();
import {z} from 'zod';

import vagasController from '../controller/vaga.controller';
import {validator} from '../middlewares/validator'

const statusEnum = z.enum(["Aberta", "Fechada"]);

const jobSchema = z.object({
    titulo: z.string().min(2, {message: "O título precisa ter pelo menos 2 caracteres"}),
    descricao: z.string().min(10, {message: "O título precisa ter pelo menos 10 caracteres"}),
    dataCadastro: z.string().min(10, {message: "A data precisa estar no formato dd/mm/aaaa"}),
    telefone: z.string().min(11, {message: "O telefone precisa ter pelo menos 12 caracteres"}),
    status: statusEnum,
    empresa: z.string().min(2, {message: "O nome da empresa precisa ter pelo menos 2 caracteres"}),
})

// Retornas todas as vagas
router.get('/', vagasController.findAll);

// Retorna a Vaga pelo id
router.get('/:id', vagasController.findById);

// Cria uma nova vaga
router.post('/create', validator(jobSchema) ,vagasController.create);

// Faz Update de uma vaga
router.put('/:id', validator(jobSchema),vagasController.update);

// Deleta uma vaga
router.delete('/:id', vagasController.remove);

export default router;
