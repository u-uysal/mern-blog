const router = require("express").Router();
const getPosts = require("../controller/post");

router.get("/", getPosts);

module.exports = router;
