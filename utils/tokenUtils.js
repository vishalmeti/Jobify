import jwt from 'jsonwebtoken';
import { jwtSecretKey, JwtSecretKeyExpiresIn } from '../constants/data.js';

export const createJWT = (payload) => {
//   const token = jwt.sign(payload, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
  const token = jwt.sign(payload, jwtSecretKey, {
    expiresIn: JwtSecretKeyExpiresIn,
  });
  return token;
};

export const verifyJWT = (token) => {
  // const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const decoded = jwt.verify(token, jwtSecretKey);
  return decoded;
};