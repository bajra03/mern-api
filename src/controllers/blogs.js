const { validationResult } = require('express-validator');
const BlogPost = require('../models/blogs');
const path = require('path');
const fs = require('fs'); // File System

// create Post
exports.createBlogPost = (req, res, next) => {
  const errors = validationResult(req);

  // check if data error/not valid
  if (!errors.isEmpty()) {
    const err = new Error('Input values not valid.');
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  // check image upload/not
  if (!req.file) {
    const err = new Error('Image must be uploaded!');
    err.errorStatus = 422;
    throw err;
  }

  const title = req.body.title;
  const image = req.file.path; // only request the url path from request
  const body = req.body.body;

  const Posting = new BlogPost({
    title: title,
    body: body,
    image: image,
    author: {
      uid: 1,
      name: 'Bajra'
    }
  });

  Posting.save()
    .then(result => {    
      res.status(201).json({
        message: "Blog created",
        data: result
      });
    })
    .catch(err => {
      console.log('Error: ', err);
    });
  
}

// Get all posts
exports.getBlogsPost = (req, res, next) => {
  BlogPost.find()
    .then(
      result => {
        res.status(200).json({
          message: 'Blog Post has been set',
          data: result
        })
      }
    )
    .catch(err => {
      next(err)
    });
}

// Get post by ID
exports.getBlogPostById = (req, res, next) => {
  const postId = req.params.postId;
  BlogPost.findById(postId)
    .then(result => {
      if (!result) {
        const error = new Error('Blog Post not found!');
        error.errorStatus = 400;
        throw error;
      }

      res.status(200).json({
        message: 'Get Post by id success',
        data: result
      })
    })
    .catch(err => {
      next(err)
    })
}

// Update blog post by id
exports.updateBlogPost = (req, res, next) => {
  const errors = validationResult(req);

  // check if data error/not valid
  if (!errors.isEmpty()) {
    const err = new Error('Input values not valid.');
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  // check image upload/not
  if (!req.file) {
    const err = new Error('Image must be uploaded!');
    err.errorStatus = 422;
    throw err;
  }

  const title = req.body.title;
  const image = req.file.path; // only request the url path from request
  const body = req.body.body;
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Blog post not found!');
        error.errorStatus = 404;
        throw error;
      }

      post.title = title;
      post.body = body;
      post.image = image;

      return post.save();
    })
    .then(result => {
      res.status(200).json({
        message: 'Bolg Post updated!',
        data: result
      })
    })
    .catch(err => {
      next(err);
    })
}

// Delete blog post
exports.deleteBlogPost = (req, res, next) => {
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Blog post not found!');
        error.errorStatus = 404;
        throw error;
      }

      removeImage(post.image);
      return BlogPost.findByIdAndRemove(postId);
    })
    .then(result => {
      res.status(200).json({
        message: 'Blog post has been deleted',
        data: result
      })
    })
    .catch(err => {
      next(err);
    });
}

// function remove image
const removeImage = (filePath) => {
  filePath = path.join(__dirname, '../..', filePath);
  fs.unlink(filePath, err => console.log(err));
}