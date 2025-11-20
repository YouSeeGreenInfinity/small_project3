// require('dotenv').config();
// const jwt = require('jsonwebtoken');

// function verifyAccessToken(req, res, next) {
//   try {
//     const accessToken = req.headers.authorization.split(' ')[1];
//     const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

//     res.locals.user = user;

//     next();
//   } catch (error) {
//     console.log('no access token');
//     res.status(403).send('Invalid access token');
//   }
// }

// module.exports = verifyAccessToken;


// require('dotenv').config();
// const jwt = require('jsonwebtoken');

// function verifyAccessToken(req, res, next) {
//   try {
//     const authHeader = req.headers.authorization;
    
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ error: 'Access token required' });
//     }

//     const accessToken = authHeader.split(' ')[1];
//     const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

//     res.locals.user = user;
//     next();
//   } catch (error) {
//     console.log('Invalid access token:', error.message);
    
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ error: 'Access token expired' });
//     }
    
//     return res.status(403).json({ error: 'Invalid access token' });
//   }
// }

// module.exports = verifyAccessToken;


require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyAccessToken(req, res, next) {
  try {
    console.log('=== VERIFY ACCESS TOKEN STARTED ===');
    console.log('Headers:', req.headers);
    
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      console.log('No authorization header');
      return res.status(401).json({ error: 'Access token required' });
    }

    if (!authHeader.startsWith('Bearer ')) {
      console.log('Invalid authorization format');
      return res.status(401).json({ error: 'Invalid token format' });
    }

    const accessToken = authHeader.split(' ')[1];
    
    if (!accessToken) {
      console.log('No token after Bearer');
      return res.status(401).json({ error: 'Access token required' });
    }

    console.log('Token received, verifying...');
    const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    
    console.log('Token verified successfully, user:', user);
    req.user = user; // Используем req.user вместо res.locals
    next();
  } catch (error) {
    console.log('Token verification failed:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Access token expired' });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ error: 'Invalid access token' });
    }
    
    return res.status(403).json({ error: 'Token verification failed' });
  }
}

module.exports = verifyAccessToken;