const express = require('express');
const { Comment, User } = require('../db/models');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

const commentsRouter = express.Router();

// ✅ Получить комментарии для поста
commentsRouter.get('/posts/:postId/comments', async (req, res) => {
  try {
    const { postId } = req.params;
    
    const comments = await Comment.findAll({
      where: { postId, parentId: null }, // только корневые комментарии
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['id', 'username', 'email']
        },
        {
          model: Comment,
          as: 'Replies',
          include: [{
            model: User,
            as: 'User',
            attributes: ['id', 'username', 'email']
          }]
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.json(comments);
  } catch (error) {
    console.error('❌ Get comments error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ Создать комментарий
commentsRouter.post('/posts/:postId/comments', verifyAccessToken, async (req, res) => {
  try {
    const { postId } = req.params;
    const { body, parentId } = req.body;
    const userId = req.user.id;

    const newComment = await Comment.create({
      body,
      userId,
      postId,
      parentId: parentId || null
    });

    // Получаем комментарий с пользователем
    const commentWithUser = await Comment.findByPk(newComment.id, {
      include: [{
        model: User,
        as: 'User',
        attributes: ['id', 'username', 'email']
      }]
    });

    res.status(201).json(commentWithUser);
  } catch (error) {
    console.error('❌ Create comment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ Удалить комментарий
commentsRouter.delete('/comments/:id', verifyAccessToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findByPk(id);
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Проверяем что пользователь - автор комментария
    if (comment.userId !== userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await comment.destroy();
    res.sendStatus(200);
  } catch (error) {
    console.error('❌ Delete comment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = commentsRouter;