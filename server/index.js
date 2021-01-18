const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const postRouter = require("./routes/post");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

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
mongoose.set("useFindAndModify", false);
//router

app.use("/posts", postRouter);

//listening
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
