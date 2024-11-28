import Usuario from "../models/usuario";

async function findAll() {
  return await Usuario.findAll();
}

async function findById(id: string) {
  return await Usuario.findByPk(id);
}

async function create({ nome, email, senha }: { nome: string; email: string; senha: string} ) {
  return await Usuario.create({ nome, email, senha });
}

async function remove(id: string) {
  const user = await Usuario.findByPk(id);
  if (user) {
    await user.destroy();
    return user;
  }
  return null;
}

async function update(id: string, { nome, email, senha }: {
  nome: string;
  email: string;
  senha: string;}) {
  const usuario = await Usuario.findByPk(id);
  if (usuario) {
    usuario.nome = nome;
    usuario.email = email;
    usuario.senha = senha;
    await usuario.save();
    return usuario;
  }
  return null;
}



export default { findAll, findById, create, remove, update };