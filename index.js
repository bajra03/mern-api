const express = require('express');

const app = express();

app.use(() => {
  console.log("Server running!");
  console.log("log 3");
})

app.listen(4000);