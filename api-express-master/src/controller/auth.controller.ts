import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service'

const signIn = async (request: Request, response: Response, next: NextFunction) => {
    const {email, password} = request.body;
    const userToken = await authService.signIn(email, password);
    response.status(200).json({userToken});
}

export default { signIn }
