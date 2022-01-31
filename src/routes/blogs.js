const express = require('express');
const router = express.Router();

const blogsController = require('../controllers/blogs');

// Get all blog
router.get('/blog', blogsController.getBlog);

// Create new blog
router.post('/blog', blogsController.createBlog);

module.exports = router;