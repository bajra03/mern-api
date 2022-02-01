exports.getBlogs = (req, res, next) => {
  res.json(
    {
      message: 'Get all blog success',
      data: [
        {
          id: 1,
          title: 'Test blog',
          author: 'Bajra'
        }
      ]
    }
  );
  next();
}

exports.createBlog = (req, res, next) => {
  console.log('request: ', req.body);
  // res.json(
  //   {
  //     message: "Blog has been created",
  //     data: {
  //       id: 1,
  //       title: 'Test Blog',
  //       author: 'Bajra'
  //     }
  //   }
  // );
  next();
}