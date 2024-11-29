import Usuario from "../models/usuario";
async function findAll() {
  try{
    return await Usuario.findAll();
  }catch(error){
    if(error instanceof Error){
      throw new Error('Error fetching all users: ' + error.message);
    }
    throw new Error('An unknown error occurred');
  }
}

async function findById(id: string) {
  try {
    return await Usuario.findByPk(id);
  }catch(error){
    if(error instanceof Error){
      throw new Error('Error fetching user by id: ' + error.message);
    }
    throw new Error('An unknown error occurred');
  }
}

async function create({ nome, email, senha }: { nome: string; email: string; senha: string} ) {
  try {
    return await Usuario.create({ nome, email, senha });
  }catch(error){
    if(error instanceof Error){
      throw new Error('Error creating user: ' + error.message);
    }
    throw new Error('An unknown error occurred');
  }
}

async function remove(id: string) {
  try {
    const user = await Usuario.findByPk(id);
    if (user) {
      await user.destroy();
      return user;
    }
  }catch(error){
    if(error instanceof Error){
      throw new Error('Error deleting user: ' + error.message);
    }
    throw new Error('An unknown error occurred');
  }
  return null;
}

async function update(id: string, { nome, email, senha }: {
  nome: string;
  email: string;
  senha: string;}) {
  try {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      usuario.nome = nome;
      usuario.email = email;
      usuario.senha = senha;
      await usuario.save();
      return usuario;
    }
  }catch(error){
    if(error instanceof Error){
      throw new Error('Error updating user: ' + error.message);
    }
    throw new Error('An unknown error occurred');
  }
  return null;
}



export default { findAll, findById, create, remove, update };