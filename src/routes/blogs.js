const express = require('express')
const router = express.Router()
const {body} = require('express-validator')

const blogsController = require('../controllers/blogs')

// Get all blog
router.get('/posts', blogsController.getBlogsPost)

// Create new blog
router.post(
  '/post',
  [
    body('title').isLength({ min: 5 }).withMessage('Title minimal 5 character'),
    body('content').isLength({ min: 5 }).withMessage('Content minimal 5 character')

  ],
  blogsController.createBlogPost
)

module.exports = router