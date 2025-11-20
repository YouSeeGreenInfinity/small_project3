// const { Router } = require('express');
// const LikeController = require('../controllers/likeController');
// const verifyAccessToken = require('../middlewares/verifyAccessToken');

// const likeRouter = Router();

// likeRouter.post('/products/:productId/like', verifyAccessToken, LikeController.toggleLike);
// likeRouter.get('/products/:productId/likes', LikeController.getLikesCount);
// likeRouter.get('/users/me/likes', verifyAccessToken, LikeController.getUserLikes);

// module.exports = likeRouter;


const { Router } = require('express');
const LikeController = require('../controllers/likeController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

const likeRouter = Router();

likeRouter.post('/products/:productId/like', verifyAccessToken, LikeController.toggleLike);
likeRouter.get('/products/:productId/likes', LikeController.getLikesCount);
likeRouter.get('/users/me/likes', verifyAccessToken, LikeController.getUserLikes);
// Добавить недостающий эндпоинт для batch запросов
likeRouter.post('/products/likes/batch', LikeController.getBatchLikes);

module.exports = likeRouter;