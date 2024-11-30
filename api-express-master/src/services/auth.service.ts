import jwt from "jsonwebtoken";
import usuarioRepository from "../repositories/usuario.repository";
import { CustomError } from "../interfaces/customError";
import bcrypt from 'bcryptjs';

async function signIn (email: string, password: string) {
    try {
        const foundUser = await usuarioRepository.findByEmail(email)
        if(!foundUser){
            throw new CustomError('Usuário não encontrado', 404)
        }
    
        const isPasswordValid = await bcrypt.compare(password, foundUser.senha)
    
        if(!isPasswordValid){
            throw new CustomError("Email ou senha inválidos.", 401)
        }
    
        const loadedUser = foundUser;
        const expiresIn = 3600
        const secret = "finalprojectmobilekey"
        
        const token = jwt.sign(
            {
                email: loadedUser.email,
                userId: loadedUser.id
            },
            secret,
            {
                expiresIn: expiresIn
            }
        )
    
        const user = {
            name: foundUser.nome,
            email: foundUser.email
        }
    
        return {
            token,
            user,
            expiresIn
        }
    }catch {
        throw new CustomError("Erro ao buscar usuário", 500)
    }
}

export default {signIn}