import Vaga from '../models/vaga';

async function findAll() {
  try {
    return await Vaga.findAll();
  } catch (error) {
    throw new Error('Error fetching all jobs: ' + error.message);
  }
}

async function findById(id: string) {
  try {
    return await Vaga.findByPk(id);
  } catch (error) {
    throw new Error('Error fetching job by id: ' + error.message);
  }
}

async function create({ titulo, descricao, dataCadastro, telefone, status, empresa }: { titulo: string; descricao: string; dataCadastro: Date; telefone: string; status: string; empresa: string }) {
  try {
    return await Vaga.create({ titulo, descricao, dataCadastro, telefone, status, empresa });
  } catch (error) {
    throw new Error('Error creating job: ' + error.message);
  }
}

async function update(id: string, { titulo, descricao, dataCadastro, telefone, status, empresa }: { titulo: string; descricao: string; dataCadastro: Date; telefone: string; status: string; empresa: string }) {
  try {
    const vaga = await vaga.findByPk(id);
    if (vaga) {
      vaga.titulo = titulo;
      vaga.descricao = descricao;
      vaga.dataCadastro = dataCadastro;
      vaga.telefone = telefone;
      vaga.status = status;
      vaga.empresa = empresa;
      await vaga.save();
      return vaga;
    }
    return null;
  } catch (error) {
    throw new Error('Error updating job: ' + error.message);
  }
}

async function remove(id: string) {
  try {
    const job = await Vaga.findByPk(id);
    if (job) {
      await job.destroy();
      return job;
    }
    return null;
  } catch (error) {
    throw new Error('Error deleting job: ' + error.message);
  }
}

export default { findAll, findById, create, remove, update };
