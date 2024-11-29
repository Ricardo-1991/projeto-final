import { ZodError } from "zod";

export class CustomError extends Error {
  status?: number;
  data?: ZodError['issues'];

  constructor(message: string, status: number = 500, data?: ZodError['issues']) {
    super(message); 
    this.status = status; 
    this.data = data; 
  }
}
