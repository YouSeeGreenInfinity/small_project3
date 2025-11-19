const express = require('express');
const { Cat } = require('../db/models');

const router = express.Router();

router.route('/').get(async (req, res) => {
  const posts = await Cat.findAll();
  res.json(posts);
});

module.exports = router;
