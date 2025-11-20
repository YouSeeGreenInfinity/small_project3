// const jwt = require('jsonwebtoken');

// require('dotenv').config();

// function verifyRefreshToken(req, res, next) {
//   try {
//     const { refreshToken } = req.cookies;
//     const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

//     res.locals.user = user;

//     next();
//   } catch (error) {
//     console.log('no refresh token', error);
//     res.clearCookie('refreshToken').sendStatus(403);
//   }
// }

// module.exports = verifyRefreshToken;

const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyRefreshToken(req, res, next) {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token required' });
    }

    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    res.locals.user = user;
    next();
  } catch (error) {
    console.log('Invalid refresh token:', error.message);

    // Очищаем куку в любом случае ошибки
    res.clearCookie('refreshToken');

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Refresh token expired' });
    }

    return res.status(403).json({ error: 'Invalid refresh token' });
  }
}

module.exports = verifyRefreshToken;
