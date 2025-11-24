const express = require('express');
const { Post, User } = require('../db/models');

const postsRouter = express.Router();

postsRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const posts = await Post.findAll({
        include: [
          {
            model: User,
            as: 'User', // ✅ ДОБАВИТЬ 'as' с тем же псевдонимом что в ассоциации
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
        user: req.user, // ← что здесь?
        headers: req.headers
      });
      
      // ✅ Добавить проверку авторизации
      if (!req.user) {
        console.log('❌ No user in request');
        return res.status(401).json({ error: 'Not authorized' });
      }

      const newPost = await Post.create({
        ...req.body,
        userId: req.user.id // ✅ Автоматически добавляем userId из аутентификации
      });

      console.log('✅ Post created:', newPost.toJSON());
      res.status(201).json(newPost); // ✅ Лучше возвращать 201 для создания
    } catch (error) {
      console.error('❌ Post creation error:', error);
      res.sendStatus(500);
    }
  });

postsRouter
  .route('/:id')
  .delete(async (req, res) => {
    try {
      // ✅ ДОБАВИТЬ ПРОВЕРКУ АВТОРСТВА ПЕРЕД УДАЛЕНИЕМ
      if (!req.user) {
        return res.status(401).json({ error: 'Not authorized' });
      }

      const post = await Post.findByPk(req.params.id);
      
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      // ✅ Проверяем, что пользователь является автором поста
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
      // ✅ ДОБАВИТЬ ПРОВЕРКУ АВТОРСТВА ПЕРЕД ОБНОВЛЕНИЕМ
      if (!req.user) {
        return res.status(401).json({ error: 'Not authorized' });
      }

      const post = await Post.findByPk(req.params.id);
      
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      // ✅ Проверяем, что пользователь является автором поста
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