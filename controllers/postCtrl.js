const Post = require("../models/postModel");
const User = require("../models/userModel");

const createPost = async (req, res) => {
  const { _id } = req.user;
  try {
    const newPost = await Post.create({
      ...req.body,
      user: _id,
    });
    res.json(newPost);
  } catch (error) {
    res.send("failed");
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const getPost = await Post.findById(id)
      .populate("likes")
      .populate("dislikes");

    res.json(getPost);
  } catch (error) {
    res.send("failed");
  }
};
const getAllPost = async (req, res) => {
  try {
    const getPosts = await Post.find().populate("likes").populate("dislikes");
    res.json(getPosts);
  } catch (error) {
    res.send("failed");
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    res.json(deletedPost);
  } catch (error) {
    res.send("failed");
  }
};

const likethePost = async (req, res) => {
  const { id } = req.params;
  // Find the post which you want to be liked
  const post = await Post.findById(id);
  // find the login user
  const loginUserId = req?.user?._id;
  // find if the user has liked the post
  const isLiked = post?.isLiked;
  // find if the user has disliked the post
  const alreadyDisliked = post?.dislikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyDisliked) {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(post);
  }
  if (isLiked) {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(post);
  }
};
const dislikethePost = async (req, res) => {
  const { id } = req.params;
  // Find the post which you want to be liked
  const post = await Post.findById(id);
  // find the login user
  const loginUserId = req?.user?._id;
  // find if the user has liked the post
  const isDisLiked = post?.isDisliked;
  // find if the user has disliked the post
  const alreadyLiked = post?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyLiked) {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  }
  if (isDisLiked) {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      { new: true }
    );
    res.json(post);
  }
};

module.exports = {
  createPost,
  getPost,
  getAllPost,
  deletePost,
  likethePost,
  dislikethePost,
};
