const jwt = require('jsonwebtoken');

const JWT_SECRET = 'equizer&pro';

const fetchuser =  (req, res, next) => {
  let success = false;
  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).json({ success, error: 'No token found!' });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;

    next();
  } catch (error) {
    return res.status(400).json({ success, error: 'Interval server error occured' });
  }
}

module.exports = fetchuser;