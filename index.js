const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;
const mongoose = require('mongoose');



app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json

const blogRoutes = require('./src/routes/blogs');
const authRoutes = require('./src/routes/auth');

app.use(cors());

app.use('/v1/blog', blogRoutes);
app.use('/v1/auth', authRoutes);

// Create handling global error
app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({
    message: message,
    data: data
  })
});

// connect the database
mongoose.connect('mongodb+srv://bajra:F4fSkhTzfisdBsvn@cluster0.neezo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(() => {
    app.listen(port, () => {
      console.log("Server running on port: ", port);
    });
  })
  .catch(err => console.log(err));
