const Comment = require("../models/commentModel");


//Create Comment
const createCommentCtrl = async (req, res) => {
  const user = req.user;
  const { postId, description } = req.body;
  try {
    const comment = await Comment.create({
      post: postId,
      user,
      description,
    });
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  createCommentCtrl,
};
