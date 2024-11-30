import Usuario from "../models/usuario.model";

async function findAll() {
  return await Usuario.findAll();
}

async function findById(id: string) {
  return await Usuario.findByPk(id);
}

async function findByEmail(email: string) {
  return await Usuario.findOne({ where: { email } });
}

async function create( nome: string, email: string, senha: string) {
  console.log(nome, email, senha)
  return await Usuario.create({ nome, email, senha });
}

async function remove(userExists: any) {
  return await userExists.destroy();
}

async function update(userExists: any) {
  return await userExists.save();
}

export default { findAll, findById, findByEmail,  create, remove, update };
