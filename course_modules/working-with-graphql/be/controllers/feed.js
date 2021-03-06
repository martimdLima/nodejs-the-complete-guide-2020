const { validationResult } = require("express-validator");
const { nextError, throwError } = require("../util/errorhandling");
const { clearImage } = require("../util/image");

const io = require("../socket");

const Post = require("../models/post");
const User = require("../models/user");

exports.getPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;

  try {
    const totalItems = await Post.find().countDocuments();

    const posts = await Post.find()
      .populate("creator")
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: "Fetched posts successfully.",
      posts: posts,
      totalItems: totalItems,
    });
  } catch (err) {
    nextError(next, err, 500);
  }
};

exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throwError(422, "Validation failed, entered data is incorrect.");
  }

  if (!req.file) {
    throwError(422, "No image provided");
  }

  const imageUrl = req.file.path;
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: req.userId,
  });

  try {
    await post.save();

    const user = await User.findById(req.userId);
    user.posts.push(post);

    await user.save();

    io.getIO().emit("posts", {
      action: "create",
      post: { ...post._doc, creator: { _id: req.userId, name: user.name } },
    });

    res.status(201).json({
      message: "Post created successfully!",
      post: post,
      creator: { _id: user._id, name: user.name },
    });
  } catch (err) {
    nextError(next, err, 500);
  }
};

exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;
  const post = await Post.findById(postId);

  try {
    if (!post) {
      throwError(404, "Could not find post.");
    }

    res.status(200).json({ message: "Post fetched.", post: post });
  } catch (err) {
    nextError(next, err, 500);
  }
};

exports.updatePost = async (req, res, next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throwError(422, "Validation failed, entered data is incorrect.");
  }

  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;

  if (req.file) {
    imageUrl = req.file.path;
  }

  if (!imageUrl) {
    throwError(422, "No file picked.");
  }

  try {
    const post = await (await Post.findById(postId)).populate("creator");

    if (!post) {
      throwError(404, "Couldn't find post.");
    }

    if (post.creator._id.toString() !== req.userId.toString()) {
      throwError(403, "Not authorized!");
    }

    if (imageUrl !== post.imageUrl) {
      clearImage(post.imageUrl);
    }

    post.title = title;
    post.imageUrl = imageUrl;
    post.content = content;

    const result = await post.save();

    io.getIO().emit("posts", { action: "update", post: result });

    res.status(200).json({ message: "Post updated!", post: result });
  } catch (err) {
    nextError(next, err, 500);
  }
};

exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      throwError(404, "Couldn't find post.");
    }

    if (post.creator.toString() !== req.userId.toString()) {
      throwError(403, "Not authorized!");
    }

    clearImage(post.imageUrl);

    await Post.findByIdAndRemove(postId);

    const user = await User.findById(req.userId);
    user.posts.pull(postId);
    await user.save();

    io.getIO().emit("posts", { action: "delete", post: postId });

    res.status(200).json({ message: "Post was deleted" });
  } catch (err) {
    nextError(next, err, 500);
  }
};
