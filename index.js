const express = require('express');

const app = express();
const blogRoutes = require('./src/routes/blogs');


app.use('/', blogRoutes);

app.listen(4000);