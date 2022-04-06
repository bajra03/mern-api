const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const blogsController = require('../controllers/blogs');

// Get all blog
router.get('/post', blogsController.getBlogsPost);

// Get Post by ID
router.get('/post/:postId', blogsController.getBlogPostById);

// Create new blog
router.post(
  '/post',
  [
    body('title').isLength({ min: 5 }).withMessage('Title minimal 5 character'),
    body('body').isLength({ min: 5 }).withMessage('Body content minimal 5 character')
  ],
  blogsController.createBlogPost
);

// Update blog post
router.put('/post/:postId',
  [
    body('title').isLength({ min: 5 }).withMessage('Title minimal 5 character'),
    body('body').isLength({ min: 5 }).withMessage('Body content minimal 5 character')
  ],
  blogsController.updateBlogPost
);

// Delete blog post
router.delete('/post/:postId', blogsController.deleteBlogPost);

module.exports = router;