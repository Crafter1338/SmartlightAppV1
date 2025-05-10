import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

const { sign, verify } = jwt;
const tokenSecret  = 'dev';

const generateToken = async (email, password, uid, mongoId) => {
    return sign({ email, password, uid, mongoId }, tokenSecret);
}

const validateToken = async (token) => {
    return verify(token, tokenSecret);
}

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 5)
}

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}

export { generateToken, validateToken, hashPassword, comparePassword}