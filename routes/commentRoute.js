const express = require("express");
const { createCommentCtrl } = require("../controllers/cmntCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const commentRoutes = express.Router();

commentRoutes.post("/", authMiddleware, createCommentCtrl);

module.exports = commentRoutes;
