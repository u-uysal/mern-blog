const router = require("express").Router();
const { getPosts, createPost } = require("../controller/post");

router.get("/", getPosts);
router.post("/", createPost);

module.exports = router;
