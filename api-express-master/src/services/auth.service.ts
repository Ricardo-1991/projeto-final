import jwt from "jsonwebtoken";
import usuarioRepository from "../repositories/usuario.repository";
import { CustomError } from "../interfaces/customError";
import bcrypt from "bcryptjs";

async function signIn(email: string, password: string) {
  try {
    const foundUser = await usuarioRepository.findByEmail(email);
    if (!foundUser) {
      throw new CustomError("Usuário não encontrado", 404);
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.senha);
    if (!isPasswordValid) {
      throw new CustomError("Email ou senha inválidos.", 401);
    }

    const expiresIn = 3600;
    const secret = process.env.JWT_SECRET || "defaultSecretKey"; // Chave secreta de ambiente

    const token = jwt.sign(
      {
        email: foundUser.email,
        userId: foundUser.id,
      },
      secret,
      {
        expiresIn,
      }
    );

    const user = {
      name: foundUser.nome,
      email: foundUser.email,
    };

    return {
      token,
      user,
      expiresIn,
    };
  } catch (error) {
    console.error("Erro durante o login:", error);
    if (error instanceof CustomError) {
      throw error; 
    }
    throw new CustomError("Erro interno no servidor", 500);
  }
}

export default { signIn };
