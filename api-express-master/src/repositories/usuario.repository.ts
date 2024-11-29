import Usuario from "../models/usuario.model";

async function findAll() {
  try {
    return await Usuario.findAll();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Erro ao buscar todos os usuários: ' + error.message);
    }
    throw new Error('Ocorreu um erro desconhecido');
  }
}

async function findById(id: string) {
  try {
    return await Usuario.findByPk(id);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Erro ao buscar usuário por ID: ' + error.message);
    }
    throw new Error('Ocorreu um erro desconhecido');
  }
}

async function create({ nome, email, senha }: { nome: string; email: string; senha: string }) {
  try {
    return await Usuario.create({ nome, email, senha });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Erro ao criar usuário: ' + error.message);
    }
    throw new Error('Ocorreu um erro desconhecido');
  }
}

async function remove(id: string) {
  try {
    const user = await Usuario.findByPk(id);
    if (user) {
      await user.destroy();
      return user;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Erro ao deletar usuário: ' + error.message);
    }
    throw new Error('Ocorreu um erro desconhecido');
  }
  return null;
}

async function update(id: string, { nome, email, senha }: { nome: string; email: string; senha: string }) {
  try {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      usuario.nome = nome;
      usuario.email = email;
      usuario.senha = senha;
      await usuario.save();
      return usuario;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Erro ao atualizar usuário: ' + error.message);
    }
    throw new Error('Ocorreu um erro desconhecido');
  }
  return null;
}

export default { findAll, findById, create, remove, update };
