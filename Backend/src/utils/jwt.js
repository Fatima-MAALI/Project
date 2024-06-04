import jwt from 'jsonwebtoken';
import { config } from "dotenv"
config()

const secret = process.env.JWT_SECRET || 'your_jwt_secret';

export const generateToken = (id, email) => {
    return jwt.sign({ id, email }, secret, { expiresIn: '1h' });
};
