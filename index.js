const express = require('express')
const app = express()
const cors = require('cors')
const port = 4000

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json()) // for parsing application/json

const blogRoutes = require('./src/routes/blogs')

app.use(cors())
app.use('/', blogRoutes)

app.listen(port, () => {
  console.log("Server running on port: ", port)
});