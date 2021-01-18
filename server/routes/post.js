const router = require("express").Router();
const {
  getPosts,
  createPost,
  getSinglePost,
  deletePost,
  updatePost,
} = require("../controller/post");

router.get("/", getPosts);
router.get("/:id", getSinglePost);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.patch("/:id", updatePost);

module.exports = router;
