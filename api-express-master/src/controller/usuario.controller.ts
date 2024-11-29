import { Request, Response } from "express";
import usuarioRepository from "../repositories/usuario.repository";
import { CustomError } from "../interfaces/customError";

const findAll = async (req: Request, res: Response) => {
  const users = await usuarioRepository.findAll();
  res.json({ message: 'Listagem de usuários.', users });
};

const findById = async (req: Request, res: Response) => {
  const user = await usuarioRepository.findById(req.params.id);
  if (!user) {
    throw new CustomError("Usuário não encontrado.", 404);
  }
  res.json({ message: 'Usuário encontrado.', user });
};

const createUser = async (req: Request, res: Response) => {
  const user = await usuarioRepository.create(req.body);
  res.status(201).json({ message: 'Usuário criado.', user });
};

const updateUser = async (req: Request, res: Response) => {
  const user = await usuarioRepository.update(req.params.id, req.body);
  if (!user) {
    throw new CustomError("Usuário não encontrado.", 404);
  }
  res.json({ message: 'Usuário atualizado.', user });
};

const deleteUser = async (req: Request, res: Response) => {
  const user = await usuarioRepository.remove(req.params.id);
  if (!user) {
    throw new CustomError("Usuário não encontrado.", 404);
  }
  res.json({ message: 'Usuário deletado.', user });
};

export default { findAll, findById, createUser, updateUser, deleteUser };
