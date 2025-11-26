// const express = require('express');
// const { Post, User } = require('../db/models');

// const postsRouter = express.Router();

// postsRouter
//   .route('/')
//   .get(async (req, res) => {
//     try {
//       const posts = await Post.findAll({
//         include: [
//           {
//             model: User,
//             as: 'User', // ✅ ДОБАВИТЬ 'as' с тем же псевдонимом что в ассоциации
//             attributes: ['id', 'username', 'email'],
//           },
//         ],
//         order: [['createdAt', 'DESC']],
//       });
//       res.json(posts);
//     } catch (error) {
//       console.error(error);
//       res.sendStatus(500);
//     }
//   })
//   .post(async (req, res) => {
//     try {

//       console.log('📝 CREATE POST REQUEST:', {
//         body: req.body,
//         user: req.user, // ← что здесь?
//         headers: req.headers
//       });
      
//       // ✅ Добавить проверку авторизации
//       if (!req.user) {
//         console.log('❌ No user in request');
//         return res.status(401).json({ error: 'Not authorized' });
//       }

//       const newPost = await Post.create({
//         ...req.body,
//         userId: req.user.id // ✅ Автоматически добавляем userId из аутентификации
//       });

//       console.log('✅ Post created:', newPost.toJSON());
//       res.status(201).json(newPost); // ✅ Лучше возвращать 201 для создания
//     } catch (error) {
//       console.error('❌ Post creation error:', error);
//       res.sendStatus(500);
//     }
//   });

// postsRouter
//   .route('/:id')
//   .delete(async (req, res) => {
//     try {
//       // ✅ ДОБАВИТЬ ПРОВЕРКУ АВТОРСТВА ПЕРЕД УДАЛЕНИЕМ
//       if (!req.user) {
//         return res.status(401).json({ error: 'Not authorized' });
//       }

//       const post = await Post.findByPk(req.params.id);
      
//       if (!post) {
//         return res.status(404).json({ error: 'Post not found' });
//       }

//       // ✅ Проверяем, что пользователь является автором поста
//       if (post.userId !== req.user.id) {
//         return res.status(403).json({ error: 'Not authorized to delete this post' });
//       }

//       await Post.destroy({ where: { id: req.params.id } });
//       res.sendStatus(200);
//     } catch (error) {
//       console.error(error);
//       res.sendStatus(500);
//     }
//   })
//   .patch(async (req, res) => {
//     try {
//       // ✅ ДОБАВИТЬ ПРОВЕРКУ АВТОРСТВА ПЕРЕД ОБНОВЛЕНИЕМ
//       if (!req.user) {
//         return res.status(401).json({ error: 'Not authorized' });
//       }

//       const post = await Post.findByPk(req.params.id);
      
//       if (!post) {
//         return res.status(404).json({ error: 'Post not found' });
//       }

//       // ✅ Проверяем, что пользователь является автором поста
//       if (post.userId !== req.user.id) {
//         return res.status(403).json({ error: 'Not authorized to edit this post' });
//       }

//       await Post.update(req.body, { where: { id: req.params.id } });
//       const updatedPost = await Post.findByPk(req.params.id);
//       res.json(updatedPost);
//     } catch (error) {
//       console.error(error);
//       res.sendStatus(500);
//     }
//   });

// module.exports = postsRouter;

const express = require('express');
const { Post, User } = require('../db/models');
const verifyAccessToken = require('../middlewares/verifyAccessToken'); // ✅ ДОБАВЬ ЭТОТ ИМПОРТ

const postsRouter = express.Router();

// ✅ ПРИМЕНИ МИДЛВАРУ АУТЕНТИФИКАЦИИ КО ВСЕМ МАРШРУТАМ
postsRouter.use(verifyAccessToken);

postsRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const posts = await Post.findAll({
        include: [
          {
            model: User,
            as: 'User',
            attributes: ['id', 'username', 'email'],
          },
        ],
        order: [['createdAt', 'DESC']],
      });
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  })
  .post(async (req, res) => {
    try {
      console.log('📝 CREATE POST REQUEST:', {
        body: req.body,
        user: req.user,
        headers: req.headers
      });
      
      // ✅ Проверка авторизации (уже есть благодаря мидлваре)
      if (!req.user) {
        console.log('❌ No user in request');
        return res.status(401).json({ error: 'Not authorized' });
      }

      const newPost = await Post.create({
        ...req.body,
        userId: req.user.id
      });

      console.log('✅ Post created:', newPost.toJSON());
      res.status(201).json(newPost);
    } catch (error) {
      console.error('❌ Post creation error:', error);
      res.sendStatus(500);
    }
  });

// ✅ ИСПРАВЛЕННЫЙ ЭНДПОИНТ ПУБЛИКАЦИИ
postsRouter.patch('/:id/publish', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    console.log('📝 PUBLISH POST REQUEST:', { 
      postId: id, 
      userId: userId
    });

    // ✅ ИСПРАВЛЕНО: убрали include или добавили правильный 'as'
    const post = await Post.findByPk(id);
    
    if (!post) {
      console.log('❌ Post not found:', id);
      return res.status(404).json({ error: 'Post not found' });
    }

    console.log('🔍 Post found:', {
      id: post.id,
      title: post.title,
      authorId: post.userId,
      currentUserId: userId
    });

    // Проверяем, что пользователь - автор поста
    if (post.userId !== userId) {
      console.log('🚫 Unauthorized publish attempt');
      return res.status(403).json({ error: 'You can only publish your own posts' });
    }

    // Обновляем статус публикации
    console.log('🔄 Updating post published status...');
    const updatedPost = await post.update({ 
      published: true
    });

    // ✅ ИСПРАВЛЕНО: получаем обновленный пост с пользователем (с правильным 'as')
    const result = await Post.findByPk(updatedPost.id, {
      include: [{
        model: User,
        as: 'User', // ✅ ДОБАВЬ 'as' с тем же псевдонимом что в ассоциации
        attributes: ['id', 'username', 'email']
      }]
    });

    console.log('✅ Post published successfully:', {
      id: result.id,
      title: result.title,
      published: result.published,
      author: result.User.username
    });

    res.json(result);

  } catch (error) {
    console.error('❌ Publish post error:', error);
    console.error('Error details:', error.message);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

postsRouter
  .route('/:id')
  .delete(async (req, res) => {
    try {
      // Проверка авторизации
      if (!req.user) {
        return res.status(401).json({ error: 'Not authorized' });
      }

      const post = await Post.findByPk(req.params.id);
      
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      // Проверяем, что пользователь является автором поста
      if (post.userId !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized to delete this post' });
      }

      await Post.destroy({ where: { id: req.params.id } });
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  })
  .patch(async (req, res) => {
    try {
      // Проверка авторизации
      if (!req.user) {
        return res.status(401).json({ error: 'Not authorized' });
      }

      const post = await Post.findByPk(req.params.id);
      
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      // Проверяем, что пользователь является автором поста
      if (post.userId !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized to edit this post' });
      }

      await Post.update(req.body, { where: { id: req.params.id } });
      const updatedPost = await Post.findByPk(req.params.id);
      res.json(updatedPost);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

module.exports = postsRouter;