import { Schema, model } from 'mongoose';
import pkg from 'joi';
const { object, string } = pkg;
import handleMongooseError from '../helpers/handleMongooseError.js';
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Password is required!'],
    },
    email: {
      type: String,
      match: emailRegExp,
      unique: true,
      required: [true, 'Email is required!'],
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const registerSchema = object({
  password: string().required().messages({ 'any.required': 'missing required password field' }),
  email: string().pattern(emailRegExp).messages({ 'string.pattern.base': 'wrong email format!' }),
  subscription: string().valid('starter', 'pro', 'business').messages({ 'any.only': 'You can use only (starter, pro, business) values!' }),
});

const loginSchema = object({
  email: string().pattern(emailRegExp).messages({ 'string.pattern.base': 'wrong email format!' }),
  password: string().required().messages({ 'any.required': 'missing required password field' }),
});

const schemas = {
  registerSchema,
  loginSchema,
};
const User = model('user', userSchema);

export default {
  User,
  schemas,
};