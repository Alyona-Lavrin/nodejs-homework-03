import pkg from 'jsonwebtoken';
import User from '../models/user.js';
import HttpError from '../helpers/HttpError.js';

const { verify } = pkg;
const { SECRET_KEY } = process.env;

const authenticate = async (req, _, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    next(HttpError(401, `Not authorized!`));
  }
  try {
    const { id } = verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      next(HttpError(404, 'Not found!'));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401, 'Not authorized!'));
  }
};

export default authenticate;