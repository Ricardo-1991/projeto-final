import bcrypt from 'bcryptjs';
import { CustomError } from "../interfaces/customError";
import usuarioRepository from "../repositories/usuario.repository";
import { usuarioDTO } from '../dtos/usuario.dto';

async function findAll(){
    try {
      const users = await usuarioRepository.findAll();
      if(!users) {
        throw new CustomError("Usuários nao encontrados", 404);
      }
    }catch (error) {
      if (error instanceof CustomError) {
        throw error; 
      }
      throw new CustomError("Erro ao buscar usuário", 500);
    }
}

async function findById(id: string){
    try {
        const foundUser = await usuarioRepository.findById(id);

        if(!foundUser){
            throw new CustomError("Usuário nao encontrado");
        }
        return foundUser
    }catch (error) {
        if (error instanceof CustomError) {
          throw error; 
        }
        throw new CustomError("Erro ao buscar usuário", 500);
      }
}

async function create(newUser: usuarioDTO) {
    try {
        const userExists = await usuarioRepository.findByEmail(newUser.email);
        if (userExists) {
          throw new CustomError("Este email já está em uso no sistema.", 400);
        }
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        return await usuarioRepository.create(newUser.name, newUser.email, hashedPassword);

    }catch(error) {
     if (error instanceof CustomError) {
          throw error; 
        }
        throw new CustomError("Erro ao criar a sua conta.", 500);
      }
}

async function update(id: string, newUser: usuarioDTO) {
    try {
        const userExists = await usuarioRepository.findById(id);
        if(!userExists) {
          throw new CustomError("Usuário nao encontrado", 404);
        }
        userExists.name = newUser.name;
        userExists.email = newUser.email;
        userExists.password = await bcrypt.hash(newUser.password, 10);

        const updatedUser = await usuarioRepository.update(userExists);
        return updatedUser;

    }catch(error) {
     if (error instanceof CustomError) {
          throw error; 
        }
        throw new CustomError("Erro ao buscar usuário", 500);
      }
}

async function remove(id: string){
    try {
        const userExists = await usuarioRepository.findById(id);
        if(!userExists) {
          throw new CustomError("Usuário nao encontrado", 404);
        }
        return await usuarioRepository.remove(userExists);
    }catch(error) {
     if (error instanceof CustomError) {
          throw error; 
        }
        throw new CustomError("Erro ao buscar usuário", 500);
      }
}

export default { findAll, findById, create, update, remove };

