const express = require('express');
const feedController = require('../controllers/feed');

const router = express.Router();

// GET /feed/post
router.get('/posts', feedController.getPosts);

router.post('/post', feedController.createPost);

module.exports = router;