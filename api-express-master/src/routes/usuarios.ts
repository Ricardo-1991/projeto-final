import express from 'express';
import {Request, Response, NextFunction} from 'express';
const router = express.Router();
import usuarioRepository from '../repositories/usuarioRepository';

// Get all users
router.get('/', (req: Request, res: Response) => {
  res.json({ usuarios: usuarioRepository.findAll() });
});

// Get user by id
router.get('/:id', (req: Request, res: Response) => {
  const user = usuarioRepository.findById(req.params.id);
  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Create a new user
router.post('/', (req: Request, res: Response) => {
  const user = usuarioRepository.create(req.body);
  res.json({ user });
});

// Update a user
router.put('/:id', (req: Request, res: Response) => {
  const user = usuarioRepository.update(req.params.id, req.body);
  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Delete a user
router.delete('/:id', (req: Request, res:) => {
  const user = usuarioRepository.remove(req.params.id);
  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

module.exports = router;
