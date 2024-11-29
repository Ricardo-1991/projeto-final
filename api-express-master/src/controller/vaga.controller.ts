import {Request, Response} from "express";
import vagaRepository from "../repositories/vaga.repository";


const findAll = async (req: Request, res: Response) => {
    const jobs = await vagaRepository.findAll();
    res.json({ message: 'Listagem de vagas.', jobs });
};

const findById = async (req: Request, res: Response) => {
    const job = await vagaRepository.findById(req.params.id);
    if (job) {
        res.json({ message: 'Vaga encontrada.', job });
    } else {
        res.status(404).json({ error: 'Vaga não encontrada.' });
    }
};

const create = async (req: Request, res: Response) => {
    const job = await vagaRepository.create(req.body);
    res.status(201).json({ message: 'Vaga criada.', job });
};

const update = async (req: Request, res: Response) => {
    const job = await vagaRepository.update(req.params.id, req.body);
    if (job) {
        res.json({ message: 'Vaga atualizada.', job });
    } else {
        res.status(404).json({ error: 'Vaga não encontrada.' });
    }
};

const remove = async (req: Request, res: Response) => {
    const job = await vagaRepository.remove(req.params.id);
    if (job) {
        res.json({ message: 'Vaga deletada.', job });
    } else {
        res.status(404).json({ error: 'Vaga não encontrada.' });
    }
};


export default { findAll, findById, create, update, remove };