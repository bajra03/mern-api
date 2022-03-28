const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

// Set destinations image where to store
const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/uploads'); // store to folder images in the root folder
  },
  filename: (req, file, callback) => {
    callback(null, new Date().getTime() + '-' + file.originalname); // set the image name 
  }
});

// Create filter to upload
const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg') {
    callback(null, true);
  } else {
    callback(null, false);
  }
}

app.use(multer({
  storage: fileStorage,
  fileFilter: fileFilter
  
}).single('image'));

// Get Image URL
app.use('/file', express.static(path.join(__dirname, 'public/uploads')));

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json
app.use(cors());

// Routes
const blogRoutes = require('./src/routes/blogs');
const authRoutes = require('./src/routes/auth');

// Create API Endpoint
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
mongoose.connect('mongodb+srv://bajra:F4fSkhTzfisdBsvn@cluster0.neezo.mongodb.net/blogpost?retryWrites=true&w=majority')
  .then(() => {
    app.listen(port, () => {
      console.log("Server running on port: ", port);
    });
  })
  .catch(err => console.log(err));

