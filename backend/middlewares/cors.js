const allowedCors = [
  'localhost:3000',
  'https://api.mesto.aveindominusnox.nomoreparties.sbs/',
  'http://api.mesto.aveindominusnox.nomoreparties.sbs/',
  'https://mesto.aveindominusnox.nomoreparties.sbs/',
  'http://mesto.aveindominusnox.nomoreparties.sbs/',
];

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
};
