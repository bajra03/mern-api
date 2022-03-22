const { validationResult } = require('express-validator');
const BlogPost = require('../models/blogs');

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