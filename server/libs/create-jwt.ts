import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

const createJwt = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET!, { expiresIn: '7d' });
}

export default createJwt