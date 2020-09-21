const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const { nextError, feedThrowError} = require("../util/errorhandling");

const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;

  Post.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;

      return Post.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((posts) => {
      res
        .status(200)
        .json({
          message: "Fetched posts successfully.",
          posts: posts,
          totalItems: totalItems,
        });
    })
    .catch((err) => {
      nextError(err, 500);
    });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    feedThrowError(422, "Validation failed, entered data is incorrect.");
  }

  if (!req.file) {
    feedThrowError(422, "No image provided");
  }

  const imageUrl = req.file.path;
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: { name: "user" },
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
      nextError(err, 500);
    });
};

exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    feedThrowError(422, "Validation failed, entered data is incorrect.");
  }

  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;

  if (req.file) {
    imageUrl = req.file.path;
  }

  if (!imageUrl) {
    feedThrowError(422, "No file picked.");
  }

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        feedThrowError(404, "Couldn't find post.");
      }
      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }
      post.title = title;
      post.imageUrl = imageUrl;
      post.content = content;
      return post.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Post updated!", post: result });
    })
    .catch((err) => {
      nextError(err, 500);
    });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        feedThrowError(404, "Couldn't find post.");
      }

      // check for logged user

      clearImage(post.imageUrl);

      return Post.findByIdAndRemove(postId);
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Post was deleted" });
    })
    .catch((err) => {
      nextError(err, 500);
    });
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => {
    console.log(err);
  });
};
