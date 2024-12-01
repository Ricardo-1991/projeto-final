import { NextFunction, Request, Response } from "express";
import { CustomError } from "../interfaces/customError";
import UsuarioService from "../services/usuario.service";

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UsuarioService.findAll();
    res.json({ message: 'Listagem de usuários.', users });
  }catch(error){
    next(error)
  }
};

const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.params.id;
    const user = await UsuarioService.findById(params);
    if (!user) {
      throw new CustomError("Usuário não encontrado.", 404);
    }
    res.status(200).json({ message: 'Usuário encontrado.', user });
  }catch(error) {
    next(error)
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UsuarioService.create(req.body);
    res.status(201).json({ message: "Usuário criado.", user }); 
  } catch (error) {
    next(error); 
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.params.id;
    const user = await UsuarioService.update(params, req.body);
    if (!user) {
      throw new CustomError("Usuário não encontrado.", 404);
    }
    res.status(200).json({ message: 'Usuário atualizado.', user });
  }catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.params.id;
    const user = await UsuarioService.remove(params);
    if (!user) {
      throw new CustomError("Usuário não encontrado.", 404);
    }
    res.json({ message: 'Usuário deletado.', user });
  }catch(error) { 
    next(error);
  }
};

export default { findAll, findById, createUser, updateUser, deleteUser };
