exports.register = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const result = {
    message: 'Register success',
    data: {
      uid: 1,
      name: name,
      email: email,
      password: 'Your chosen'
    }
  }
  
  // Response success
  res.status(201).json({
    message: 'User has been created',
    data: result
  })

  // Response error
  res.status(400).json({
    message: "Error, there is problem in your data."
  })
}