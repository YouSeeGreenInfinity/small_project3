const express = require("express");
const { Post, User } = require("../db/models");
const verifyAccessToken = require("../middlewares/verifyAccessToken"); // ✅ ДОБАВЬ ЭТОТ ИМПОРТ

const postsRouter = express.Router();

// ✅ ПРИМЕНИ МИДЛВАРУ АУТЕНТИФИКАЦИИ КО ВСЕМ МАРШРУТАМ
postsRouter.use(verifyAccessToken);

postsRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const posts = await Post.findAll({
        where: { 
          deleted: false // ✅ ТОЛЬКО НЕ УДАЛЕННЫЕ
        },
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
      console.log("📝 CREATE POST REQUEST:", {
        body: req.body,
        user: req.user,
        headers: req.headers,
      });

      // ✅ Проверка авторизации (уже есть благодаря мидлваре)
      if (!req.user) {
        console.log("❌ No user in request");
        return res.status(401).json({ error: "Not authorized" });
      }

      const newPost = await Post.create({
        ...req.body,
        userId: req.user.id,
      });

      console.log("✅ Post created:", newPost.toJSON());
      res.status(201).json(newPost);
    } catch (error) {
      console.error("❌ Post creation error:", error);
      res.sendStatus(500);
    }
  });

// ✅ ИСПРАВЛЕННЫЙ ЭНДПОИНТ ПУБЛИКАЦИИ
postsRouter.patch("/:id/publish", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    console.log("📝 PUBLISH POST REQUEST:", {
      postId: id,
      userId,
    });

    // ✅ ИСПРАВЛЕНО: убрали include или добавили правильный 'as'
    const post = await Post.findByPk(id);

    if (!post) {
      console.log("❌ Post not found:", id);
      return res.status(404).json({ error: "Post not found" });
    }

    console.log("🔍 Post found:", {
      id: post.id,
      title: post.title,
      authorId: post.userId,
      currentUserId: userId,
    });

    // Проверяем, что пользователь - автор поста
    if (post.userId !== userId) {
      console.log("🚫 Unauthorized publish attempt");
      return res
        .status(403)
        .json({ error: "You can only publish your own posts" });
    }

    // Обновляем статус публикации
    console.log("🔄 Updating post published status...");
    const updatedPost = await post.update({
      published: true,
    });

    // ✅ ИСПРАВЛЕНО: получаем обновленный пост с пользователем (с правильным 'as')
    const result = await Post.findByPk(updatedPost.id, {
      include: [
        {
          model: User,
          as: "User", // ✅ ДОБАВЬ 'as' с тем же псевдонимом что в ассоциации
          attributes: ["id", "username", "email"],
        },
      ],
    });

    console.log("✅ Post published successfully:", {
      id: result.id,
      title: result.title,
      published: result.published,
      author: result.User.username,
    });

    res.json(result);
  } catch (error) {
    console.error("❌ Publish post error:", error);
    console.error("Error details:", error.message);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
});

postsRouter
  .route("/:id")
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
  
      console.log('💀 Permanent delete post:', { postId: id, userId });
  
      const post = await Post.findByPk(id);
      
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      if (post.userId !== userId) {
        return res.status(403).json({ error: 'Not authorized' });
      }
  
      // ✅ НАСТОЯЩЕЕ УДАЛЕНИЕ ИЗ БАЗЫ
      await Post.destroy({ where: { id } });
  
      console.log('✅ Post permanently deleted:', id);
  
      res.sendStatus(200);
    } catch (error) {
      console.error('❌ Permanent delete error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  .patch(async (req, res) => {
    try {
      // Проверка авторизации
      if (!req.user) {
        return res.status(401).json({ error: "Not authorized" });
      }

      const post = await Post.findByPk(req.params.id);

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      // Проверяем, что пользователь является автором поста
      if (post.userId !== req.user.id) {
        return res
          .status(403)
          .json({ error: "Not authorized to edit this post" });
      }

      await Post.update(req.body, { where: { id: req.params.id } });
      const updatedPost = await Post.findByPk(req.params.id);
      res.json(updatedPost);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

postsRouter.get("/published", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    console.log(`📄 Fetching published posts: page ${page}, limit ${limit}`);

    const { count, rows: posts } = await Post.findAndCountAll({
      where: { 
        published: true,
        deleted: false // ✅ ТОЛЬКО НЕ УДАЛЕННЫЕ
      },
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['id', 'username', 'email'],
        },
      ],
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      posts,
      totalPages,
      currentPage: page,
      totalPosts: count,
    });
  } catch (error) {
    console.error('❌ Get published posts error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ PATCH /api/posts/:id/trash - переместить в корзину
postsRouter.patch('/:id/trash', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    console.log('🗑️ Moving post to trash:', { postId: id, userId });

    const post = await Post.findByPk(id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.userId !== userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // ✅ ПЕРЕМЕЩАЕМ В КОРЗИНУ (soft delete)
    const updatedPost = await post.update({ 
      deleted: true,
      updatedAt: new Date()
    });

    console.log('✅ Post moved to trash:', updatedPost.id);

    res.json(updatedPost);
  } catch (error) {
    console.error('❌ Move to trash error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ PATCH /api/posts/:id/restore - восстановить из корзины
postsRouter.patch('/:id/restore', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    console.log('🔄 Restoring post from trash:', { postId: id, userId });

    const post = await Post.findByPk(id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.userId !== userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // ✅ ВОССТАНАВЛИВАЕМ ИЗ КОРЗИНЫ
    const updatedPost = await post.update({ 
      deleted: false,
      updatedAt: new Date()
    });

    console.log('✅ Post restored from trash:', updatedPost.id);

    res.json(updatedPost);
  } catch (error) {
    console.error('❌ Restore from trash error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ GET /api/posts/trash - получить корзину пользователя
// ✅ GET /api/posts/user/trash - получить корзину пользователя
postsRouter.get('/user/trash', async (req, res) => {
  try {
    const userId = req.user.id;

    console.log('📦 Getting user trash for user:', userId);

    // ✅ ДОБАВЬТЕ ПОДРОБНОЕ ЛОГИРОВАНИЕ
    const trashPosts = await Post.findAll({
      where: { 
        userId: userId,
        deleted: true // ✅ ТОЛЬКО УДАЛЕННЫЕ
      },
      include: [{
        model: User,
        as: 'User',
        attributes: ['id', 'username', 'email']
      }],
      order: [['updatedAt', 'DESC']] // по дате удаления
    });

    console.log('✅ User trash retrieved:', {
      userId: userId,
      postCount: trashPosts.length,
      posts: trashPosts.map(p => ({
        id: p.id,
        title: p.title,
        deleted: p.deleted,
        userId: p.userId
      }))
    });

    res.json(trashPosts);
  } catch (error) {
    console.error('❌ Get trash error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = postsRouter;
