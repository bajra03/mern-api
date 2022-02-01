const express = require('express')
const router = express.Router()

const blogsController = require('../controllers/blogs')

// Get all blog
router.get('/blog', blogsController.getBlogsPost)

// Create new blog
router.post('/post', blogsController.createBlogPost)

module.exports = router