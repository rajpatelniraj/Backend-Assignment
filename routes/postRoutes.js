const express = require("express");
const {
  createPost,
  likethePost,
  dislikethePost,
  getPost,
  getAllPost,
  deletePost,
} = require("../controllers/postCtrl");

const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createPost);

router.put("/like/:id", authMiddleware, likethePost);
router.put("/dislike/:id", authMiddleware, dislikethePost);

router.get("/:id", getPost);
router.get("/", getAllPost);

router.delete("/:id", authMiddleware, deletePost);

module.exports = router;
