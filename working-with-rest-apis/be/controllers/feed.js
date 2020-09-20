const { validationResult } = require("express-validator/check");
const { nextError, throwError } = require("../util/errorhandling");

const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res
        .status(200)
        .json({ message: "Fetched posts successfully.", posts: posts });
    })
    .catch((err) => {
      /* if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err); */
      nextError(err, 500);
    });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throwError(err, 422, "Validation failed, entered data is incorrect.");
    /*     const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error; */
  }
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: "images/duck.jpg",
    creator: { name: "Maximilian" },
  });
  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Post created successfully!",
        post: result,
      });
    })
    .catch((err) => {
      /*       if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err); */
      nextError(err, 500);
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "Post fetched.", post: post });
    })
    .catch((err) => {
      /*       if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err); */
      nextError(err, 500);
    });
};
