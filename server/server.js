// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const cookieParser = require('cookie-parser');
// const postsRouter = require('./routes/postsRouter');
// const catsRouter = require('./routes/catsRouter');
// const userRouter = require('./routes/userRouter');
// const tokensRouter = require('./routes/tokensRouter');

// require('dotenv').config();

// const app = express();

// const PORT = process.env.PORT || 3001;

// app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));
// app.use(morgan('dev'));
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use('/api/posts', postsRouter);
// app.use('/api/cats', catsRouter);
// app.use('/api/auth', userRouter);
// app.use('/api/tokens', tokensRouter);

// app.listen(PORT, () => console.log(`Started on port ${PORT}`));

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const postsRouter = require('./routes/postsRouter');
const catsRouter = require('./routes/catsRouter');
const userRouter = require('./routes/userRouter');
const tokensRouter = require('./routes/tokensRouter');
const likeRouter = require('./routes/likeRouter');


require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3001;

// Если фронтенд на Vite (порт 5173), добавь его в CORS
app.use(cors({ 
  credentials: true, 
  origin: ['http://localhost:3000', 'http://localhost:5173'] // ← ОБНОВИТЬ
}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Подключение роутеров
app.use('/api/posts', postsRouter);
app.use('/api/cats', catsRouter);
app.use('/api/auth', userRouter);
app.use('/api/tokens', tokensRouter);
// app.use('/api/likes', likeRouter);
app.use('/api', likeRouter);

app.listen(PORT, () => console.log(`Started on port ${PORT}`));