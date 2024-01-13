import User from '../models/user.js';
import pkg from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';

require('dotenv').config();

const { sign } = pkg;
const { SECRET_KEY } = process.env;

const registerEvent = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email in use!');
  }
  const hashPassword = await hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const loginEvent = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, 'Email or password is wrong!');
  }

  const passwordCompare = await compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong!');
  }

  const payload = {
    id: user._id,
  };

  const token = sign(payload, SECRET_KEY, { expiresIn: '23h' });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const logoutEvent = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

export const register = ctrlWrapper(registerEvent);
export const login = ctrlWrapper(loginEvent);
export const logout = ctrlWrapper(logoutEvent);
export const getCurrent = ctrlWrapper(getCurrentUser);