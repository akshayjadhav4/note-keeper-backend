const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();

const app = express();

//db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

const port = process.env.PORT || 2004;

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
