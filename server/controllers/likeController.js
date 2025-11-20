// // controllers/likeController.js
// const { Post, Like } = require('../db/models');

// class LikeController {
//   static async toggleLike(req, res) {
//     try {
//       console.log('=== TOGGLE LIKE STARTED ===');
//       const { productId } = req.params; // productId теперь это postId
//       const userId = req.user?.id;

//       console.log('Post ID:', productId);
//       console.log('User ID:', userId);

//       // Временная заглушка пока нет БД
//       res.json({
//         liked: true,
//         newLikeCount: 5,
//         message: 'Like functionality - temporary response'
//       });

//     } catch (error) {
//       console.error('❌ TOGGLE LIKE ERROR:', error.message);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }

//   static async getLikesCount(req, res) {
//     try {
//       const { productId } = req.params; // это postId
//       console.log('Getting likes count for post:', productId);

//       // Временная заглушка
//       const count = 3; // будет Like.count({ where: { postId: productId } })

//       res.json({
//         productId: Number(productId),
//         count
//       });

//     } catch (error) {
//       console.error('❌ GET LIKES COUNT ERROR:', error.message);
//       res.status(500).json({ error: 'Failed to get likes count' });
//     }
//   }

//   static async getUserLikes(req, res) {
//     try {
//       const userId = req.user?.id;
//       console.log('Getting likes for user:', userId);

//       // Временная заглушка
//       res.json({
//         likedProductIds: [1, 2, 3] // это postIds
//       });

//     } catch (error) {
//       console.error('❌ GET USER LIKES ERROR:', error.message);
//       res.status(500).json({ error: 'Failed to get user likes' });
//     }
//   }
// }

// module.exports = LikeController;

// controllers/likeController.js
const { Like, Post } = require("../db/models");

class LikeController {
  static async toggleLike(req, res) {
    try {
      console.log("=== TOGGLE LIKE STARTED ===");
      const { productId } = req.params;
      const userId = req.user?.id; // Теперь из verifyAccessToken
  
      console.log("Post ID:", productId);
      console.log("User ID:", userId);
      console.log("User object:", req.user);
  
      if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      // Проверяем существование поста
      const post = await Post.findByPk(productId);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      // Ищем существующий лайк
      const existingLike = await Like.findOne({
        where: { postId: productId, userId },
      });

      if (existingLike) {
        // Удаляем лайк
        await existingLike.destroy();
        const newCount = await Like.count({ where: { postId: productId } });
        res.json({ liked: false, newLikeCount: newCount });
      } else {
        // Добавляем лайк
        await Like.create({ postId: productId, userId });
        const newCount = await Like.count({ where: { postId: productId } });
        res.json({ liked: true, newLikeCount: newCount });
      }
    } catch (error) {
      console.error("❌ TOGGLE LIKE ERROR:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getLikesCount(req, res) {
    try {
      const { productId } = req.params;
      const count = await Like.count({ where: { postId: productId } });

      res.json({
        productId: Number(productId),
        count,
      });
    } catch (error) {
      console.error("❌ GET LIKES COUNT ERROR:", error.message);
      res.status(500).json({ error: "Failed to get likes count" });
    }
  }

  static async getUserLikes(req, res) {
    try {
      const userId = req.user?.id; // Теперь из verifyAccessToken

      console.log("=== GET USER LIKES ===");
      console.log("User ID from token:", userId);

      if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const userLikes = await Like.findAll({
        where: { userId },
        attributes: ["postId"],
      });

      const likedProductIds = userLikes.map((like) => like.postId);
      res.json({ likedProductIds });
    } catch (error) {
      console.error("❌ GET USER LIKES ERROR:", error.message);
      res.status(500).json({ error: "Failed to get user likes" });
    }
  }

  static async getBatchLikes(req, res) {
    try {
      const { productIds } = req.body;

      if (!Array.isArray(productIds)) {
        return res.status(400).json({ error: "productIds must be an array" });
      }

      const likesCounts = await Promise.all(
        productIds.map(async (productId) => {
          const count = await Like.count({ where: { postId: productId } });
          return { productId, count };
        })
      );

      res.json(likesCounts);
    } catch (error) {
      console.error("❌ GET BATCH LIKES ERROR:", error.message);
      res.status(500).json({ error: "Failed to get batch likes" });
    }
  }
}

module.exports = LikeController;
