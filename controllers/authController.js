import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { hashPassword, comparePassword} from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from '../utils/tokenUtils.js';
import { nodeEnv } from "../constants/data.js";


export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  const token = createJWT({ userId: user._id, role: user.role });
  const oneDay = 1000 * 60 * 60 * 24;
  
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    path:'/',
    domain:'.vercel.app',
    // secure: process.env.NODE_ENV === 'production',
    secure: nodeEnv === 'production',
  });
  console.log('TOKEN',token);
  res.status(StatusCodes.CREATED).json({ msg:`User created and logged in - ${req.body.email}` });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(user)
  if (!user) throw new UnauthenticatedError("invalid credentials-mail");

  const isValidUser = user && (await comparePassword(req.body.password, user.password));
  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");
  res.send("login route");
};

export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

export const deleteUser = async (req,res)=>{
  await User.findOneAndDelete({email:req.params.email})
  res.status(StatusCodes.OK).json({ msg:`Deleted - ${req.params.email} ` });

}

export const alluser = async (req,res) =>{
  const allUsers = await User.find({});
  res.status(StatusCodes.OK).json({ allUsers });
}
