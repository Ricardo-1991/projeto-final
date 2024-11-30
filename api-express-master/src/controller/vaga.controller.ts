import {Request, Response} from "express";
import vagaService from "../services/vaga.service";
import { CustomError } from "../interfaces/customError";


const findAll = async (req: Request, res: Response) => {
    const jobs = await vagaService.findAll();
    res.json({ message: 'Listagem de vagas.', jobs });
};

const findById = async (req: Request, res: Response) => {
    const params = req.params.id;
    const job = await vagaService.findById(params);
    if (!job) {
        throw new CustomError("Vaga nao encontrada", 404);
    }
    res.status(200).json({ message: 'Vaga encontrada.', job });
};

const create = async (req: Request, res: Response) => {
    const job = await vagaService.create(req.body);
    res.status(201).json({ message: 'Vaga criada.', job });
};

const update = async (req: Request, res: Response) => {
    const params = req.params.id;
    const job = await vagaService.update(params, req.body);
    if (!job) {
        throw new CustomError("Vaga nao encontrada", 404);
    }
    res.status(200).json({ message: 'Vaga atualizada.' });
};

const remove = async (req: Request, res: Response) => {
    const params = req.params.id;
    const job = await vagaService.remove(params);
    if (!job) {
        throw new CustomError("Vaga nao encontrada", 404);
    }
    res.status(200).json({ message: 'Vaga deletada.', job });
    
};


export default { findAll, findById, create, update, remove };