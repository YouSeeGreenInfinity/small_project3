const express = require('express');
const { Post } = require('../db/models');

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    try {
      const posts = await Post.findAll();
      res.json(posts);
    } catch (error) {
      console.error(err);
      res.sendStatus(500);
    }
  })
  .post(async (req, res) => {
    try {
      const newPost = await Post.create(req.body);
      res.json(newPost);
    } catch (error) {
      console.error(err);
      res.sendStatus(500);
    }
  });

router
  .route('/:id')
  .delete(async (req, res) => {
    try {
      await Post.destroy({ where: { id: req.params.id } });
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  })
  .patch(async (req, res) => {
    await Post.update(req.body, { where: { id: req.params.id } });
    const updatedPost = await Post.findByPk(req.params.id);
    res.json(updatedPost);
  });

module.exports = router;
