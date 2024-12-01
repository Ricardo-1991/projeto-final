import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service'
import { CustomError } from '../interfaces/customError';

const signIn = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {email, password} = request.body;
        const userToken = await authService.signIn(email, password);
        if(!userToken) throw new CustomError('Email ou senha inválidos.');
        response.status(200).json(userToken);
    }catch (error) {
        next(error)
    }
}

export default { signIn }
