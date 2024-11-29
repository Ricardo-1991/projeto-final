import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); 

  if (err instanceof Error) {
    res.status(500).json({
      error: 'Erro interno no servidor.',
      message: err.message,
    });
  } else {
    res.status(500).json({
      error: 'Erro interno no servidor.',
    });
  }
};
