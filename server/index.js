const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//mongoose connection
const URL = process.env.CONNECTDB_URL;
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB database connection established successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

//router
const postRouter = require("./routes/post");
app.use("/posts", postRouter);

//listening
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
