/* eslint-disable consistent-return */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const IncorrectTokenError = require('../errors/incorrectTokenError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new IncorrectTokenError('Требуется авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new IncorrectTokenError('Требуется авторизация'));
  }

  req.user = payload;
  next();
};
