import Vaga from '../models/vaga.model';

async function findAll() {
  try {
    return await Vaga.findAll();
  } catch (error) {
    if(error instanceof Error){
      throw new Error('Error fetching all jobs: ' + error.message);
    }
    throw new Error('An unknown error occurred');
  }
}

async function findById(id: string) {
  try {
    return await Vaga.findByPk(id);
  } catch (error) {
    if(error instanceof Error) {
      throw new Error('Error fetching job by id: ' + error.message);
    }
    throw new Error('An unknown error occurred');
  }
}

async function create(newJob: any) {
  try {
    return await Vaga.create(newJob);
  } catch (error) {
    if(error instanceof Error) {
      throw new Error('Error creating job: ' + error.message);
    }
    throw new Error('An unknown error occurred');
  }
}

async function update(jobExists: any) {
     return await jobExists.save()
}

async function remove(jobExists: any) {
  return await jobExists.destroy();
}

export default { findAll, findById, create, remove, update };
