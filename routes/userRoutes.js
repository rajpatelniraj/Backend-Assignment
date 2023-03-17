const express = require("express");
const {
  createUser,
  loginUser,
  getUser,
  followAUser,
  unfollowAUser,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/", authMiddleware, getUser);
router.post("/follow/:id", authMiddleware, followAUser);
router.post("/unfollow/:id", authMiddleware, unfollowAUser);

module.exports = router;
