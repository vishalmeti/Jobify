import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { hashPassword, comparePassword} from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg:`User created - ${req.body.email}` });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(user)
  if (!user) throw new UnauthenticatedError("invalid credentials-mail");

  const isValidUser = user && (await comparePassword(req.body.password, user.password));
  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");
  res.send("login route");
};

export const deleteUser = async (req,res)=>{
  await User.findOneAndDelete({email:req.params.email})
  res.status(StatusCodes.OK).json({ msg:`Deleted - ${req.params.email} ` });

}
