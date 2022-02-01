exports.createBlog = (req, res, next) => {
  console.log('request: ', req.body);
  res.send(req.body)

  // res.json(
  //   {
  //     message: "Blog has been created"
  //   }
  // )

  next()
}

exports.getBlogs = (req, res, next) => {
  res.json(
    {
      message: "Get all blog success"
    }
  )
}