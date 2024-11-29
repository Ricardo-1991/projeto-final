import { Request, NextFunction, Response } from 'express';
import { ZodSchema } from 'zod';
import { CustomError } from '../interfaces/customError';

export const validator = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errorMessages = result.error.errors.map(issue => `${issue.path.join('.')}: ${issue.message}`).join(', ');
    
      const error = new Error(`Validação falhou: ${errorMessages}`) as CustomError;
      error.status = 422; 
      error.data = result.error.errors; 
      return next(error); 
    } 
    next();
  };
};