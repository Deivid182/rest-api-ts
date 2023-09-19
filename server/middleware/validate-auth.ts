import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../config';

export const SECRET_KEY: Secret = JWT_SECRET!;

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}

export const validateAuth = async (req: Request, res: Response, next: NextFunction) => {
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '');

   if (!token) {
     throw new Error();
   }

   const decoded = jwt.verify(token, SECRET_KEY);
   req.user = decoded;

   next();
 } catch (err) {
   res.status(401).send('Please authenticate');
 }
};