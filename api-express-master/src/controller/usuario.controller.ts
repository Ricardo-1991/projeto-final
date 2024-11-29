import { Request, Response } from "express";
import usuarioRepository from "../repositories/usuario.repository";

const findAll = async (req: Request, res: Response) => {
  const users = await usuarioRepository.findAll();
  res.json({ message: 'Listagem de usuários.', users });
};

const findById = async (req: Request, res: Response) => {
  const user = await usuarioRepository.findById(req.params.id);
  if (user) {
    res.json({ message: 'Usuário encontrado.', user });
  } else {
    res.status(404).json({ error: 'Usuário não encontrado.' });
  }
};

const createUser = async (req: Request, res: Response) => {
  const user = await usuarioRepository.create(req.body);
  res.status(201).json({ message: 'Usuário criado.', user });
};

const updateUser = async (req: Request, res: Response) => {
  const user = await usuarioRepository.update(req.params.id, req.body);
  if (user) {
    res.json({ message: 'Usuário atualizado.', user });
  } else {
    res.status(404).json({ error: 'Usuário não encontrado.' });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const user = await usuarioRepository.remove(req.params.id);
  if (user) {
    res.json({ message: 'Usuário deletado.', user });
  } else {
    res.status(404).json({ error: 'Usuário não encontrado.' });
  }
};

export default { findAll, findById, createUser, updateUser, deleteUser };
