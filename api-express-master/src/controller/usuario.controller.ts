import { Request, Response } from "express";
import { CustomError } from "../interfaces/customError";
import UsuarioService from "../services/usuario.service";

const findAll = async (req: Request, res: Response) => {
  const users = await UsuarioService.findAll();
  res.json({ message: 'Listagem de usuários.', users });
};

const findById = async (req: Request, res: Response) => {
  const params = req.params.id;
  const user = await UsuarioService.findById(params);
  if (!user) {
    throw new CustomError("Usuário não encontrado.", 404);
  }
  res.json({ message: 'Usuário encontrado.', user });
};

const createUser = async (req: Request, res: Response) => {
  const { nome, email, senha } = req.body;
  const user = await UsuarioService.create(nome, email, senha);
  res.status(201).json({ message: 'Usuário criado.', user });
};

const updateUser = async (req: Request, res: Response) => {
  const params = req.params.id;
  const { nome, email, senha } = req.body;
  const user = await UsuarioService.update(params, nome, email, senha);
  if (!user) {
    throw new CustomError("Usuário não encontrado.", 404);
  }
  res.json({ message: 'Usuário atualizado.', user });
};

const deleteUser = async (req: Request, res: Response) => {
  const params = req.params.id;
  const user = await UsuarioService.remove(params);
  if (!user) {
    throw new CustomError("Usuário não encontrado.", 404);
  }
  res.json({ message: 'Usuário deletado.', user });
};

export default { findAll, findById, createUser, updateUser, deleteUser };
