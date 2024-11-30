import { vagaDTO } from "../dtos/vaga.dto";
import { CustomError } from "../interfaces/customError";
import vagaRepository from '../repositories/vaga.repository';

async function findAll(){
    return await vagaRepository.findAll();
}

async function findById(id: string){
    try {
        const foundJob = await vagaRepository.findById(id);

        if(!foundJob){
            throw new CustomError("Vaga nao encontrada", 404);
        }
        return foundJob
    }catch (error) {
        if (error instanceof CustomError) {
          throw error; 
        }
        throw new CustomError("Erro ao buscar vaga", 500);
      }
}

async function create(newJob: vagaDTO) {
    try {
      return await vagaRepository.create(newJob);

    }catch(error) {
     if (error instanceof CustomError) {
          throw error; 
        }
        throw new CustomError("Erro ao criar a sua conta.", 500);
      }
}

async function update(id: string, job: vagaDTO) {
    try {
        const jobExists = await vagaRepository.findById(id);
        if(!jobExists) {
          throw new CustomError("Vaga nao encontrada", 404);
        }
        jobExists.titulo = job.titulo;
        jobExists.descricao = job.descricao;
        jobExists.dataCadastro = job.dataCadastro;
        jobExists.telefone = job.telefone;
        jobExists.status = job.status;
        jobExists.empresa = job.empresa;

        const updatedUser = await vagaRepository.update(jobExists);
        return updatedUser;

    }catch(error) {
     if (error instanceof CustomError) {
          throw error; 
        }
        throw new CustomError("Erro ao buscar vaga.", 500);
      }
}

async function remove(id: string){
    try {
        const jobExists = await vagaRepository.findById(id);
        if(!jobExists) {
          throw new CustomError("Vaga não encontrada", 404);
        }
        return await vagaRepository.remove(jobExists);
    }catch(error) {
     if (error instanceof CustomError) {
          throw error; 
        }
        throw new CustomError("Erro ao buscar vaga.", 500);
      }
}

export default { findAll, findById, create, update, remove };

