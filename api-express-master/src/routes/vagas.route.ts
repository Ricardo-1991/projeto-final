import express from 'express';
const router = express.Router();

import vagasController from '../controller/vaga.controller';

// Retornas todas as vagas
router.get('/', vagasController.findAll);

// Retorna a Vaga pelo id
router.get('/:id', vagasController.findById);

// Cria uma nova vaga
router.post('/', vagasController.create);

// Faz Update de uma vaga
router.put('/:id', vagasController.update);

// Deleta uma vaga
router.delete('/:id', vagasController.remove);

export default router;
