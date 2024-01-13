import { Schema, model } from 'mongoose';
import string from 'joi'
import boolean from 'joi';
import object from 'joi';
import handleMongooseError from '../helpers/handleMongooseError.js';


const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      match: emailRegExp,
      unique: true,
      required: [true, 'Set email for contact'],
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
contactSchema.post('save', handleMongooseError);

const addSchema = object({
  name: string().required().messages({ 'any.required': 'missing required name field' }),
  email: string().pattern(emailRegExp).messages({ 'string.pattern.base': 'wrong email format!' }),
  phone: string().required().messages({ 'any.required': 'missing required phone field' }),
  favorite: boolean(),
});

const updateFavoriteSchema = object({
  favorite: boolean().required().messages({ 'any.required': 'missing required favorite field' }),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};
const Contact = model('contact', contactSchema);

export default {
  Contact,
  schemas,
};