import {Request, Response, NextFunction} from "express";
import vagaService from "../services/vaga.service";
import { CustomError } from "../interfaces/customError";

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobs = await vagaService.findAll();
        res.json(jobs);
    }catch(error){
        next(error)
    }
};

const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const params = req.params.id;
        const job = await vagaService.findById(params);
        if (!job) {
            throw new CustomError("Vaga nao encontrada", 404);
        }
        res.status(200).json(job)
    }catch(error){
        next(error)
    }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const job = await vagaService.create(req.body);
        res.status(201).json({ message: 'Vaga criada.', job });
    }catch(error){
        next(error)
    }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const params = req.params.id;
        const job = await vagaService.update(params, req.body);
        if (!job) {
            throw new CustomError("Vaga nao encontrada", 404);
        }
        res.status(200).json({ message: 'Vaga atualizada.' });
    }catch(error){
        next(error)
    }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const params = req.params.id;
        const job = await vagaService.remove(params);
        if (!job) {
            throw new CustomError("Vaga nao encontrada", 404);
        }
        res.status(200).json({ message: 'Vaga deletada.', job });
    }catch(error){
        next(error)
    }
};


export default { findAll, findById, create, update, remove };