exports.createBlogPost = (req, res, next) => {
  const title = req.body.title
  // const image = req.body.image
  const content = req.body.content

  const result = {
    message: "Blog Post created.",
    data: {
      post_id: 1,
      title: title,
      image: "postimage.jpg",
      content: content,
      created_at: "01/02/2022", 
      author: {
        uid: 1,
        name: "Bajra",
      }
    }
  }

  res.status(201).json(result)
  res.status(400).json({
    message: "Error, there is problem in your data."
  })
}

exports.getBlogsPost = (req, res, next) => {
  res.json(
    {
      message: "Get all blog success"
    }
  )
}