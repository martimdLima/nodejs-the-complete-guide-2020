const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  validateUserCreation,
  validateUserLogin,
  validateUserAuth,
  validatePostCreation,
  validatePost,
  validatePostUpdate,
  validateUser,
} = require("../util/validators");
const { clearImage } = require("../util/image");
const User = require("../models/user");
const Post = require("../models/post");

module.exports = {
  createUser: async function ({ userInput }, req) {
    validateUserCreation(userInput);

    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPw,
    });

    const createdUser = await user.save();

    return { ...createdUser._doc, _id: createdUser._id.toString() };
  },
  login: async function ({ email, password }) {
    const user = await User.findOne({ email: email });

    validateUserLogin(user, password);

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      "privatekey",
      { expiresIn: "1h" }
    );

    return { token: token, userId: user._id.toString() };
  },
  createPost: async function ({ postInput }, req) {
    validatePostCreation(postInput, req);

    const user = await User.findById(req.userId);

    validateUser(user);

    const post = new Post({
      title: postInput.title,
      content: postInput.content,
      imageUrl: postInput.imageUrl,
      creator: user,
    });

    const createdPost = await post.save();

    user.posts.push(createdPost);
    await user.save();
    return {
      ...createdPost._doc,
      _id: createdPost._id.toString(),
      createdAt: createdPost.createdAt.toISOString(),
      updatedAt: createdPost.updatedAt.toISOString(),
    };
  },
  posts: async function ({ page }, req) {
    validateUserAuth(req);

    if (!page) {
      page = 1;
    }

    const perPage = 2;
    const totalPosts = await Post.find().countDocuments();
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .populate("creator");
    return {
      posts: posts.map((p) => {
        return {
          ...p._doc,
          id: p._id.toString(),
          createdAt: p.createdAt.toISOString(),
          updatedAt: p.updatedAt.toISOString(),
        };
      }),
      totalPosts: totalPosts,
    };
  },
  post: async function ({ id }, req) {
    validateUserAuth(req);

    const post = await Post.findById(id).populate("creator");

    validatePost(post, req);

    return {
      ...post._doc,
      _id: post._id.toString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.createdAt.toISOString(),
    };
  },
  updatePost: async function ({ id, postInput }, req) {
    validateUserAuth(req);

    const post = await Post.findById(id).populate("creator");

    validatePost(post, req);

    validatePostUpdate(postInput);

    post.title = postInput.title;
    post.content = postInput.content;

    if (postInput.imageUrl !== "undefined") {
      post.imageUrl = postInput.imageUrl;
    }

    const updatedPost = await post.save();

    return {
      ...updatedPost._doc,
      _id: updatedPost._id.toString(),
      createdAt: updatedPost.createdAt.toISOString(),
      updatedAt: updatedPost.updatedAt.toISOString(),
    };
  },
  deletePost: async function ({ id }, req) {
    validateUserAuth(req);

    const post = await Post.findById(id);

    validatePost(post, req);

    clearImage(post.imageUrl);

    await Post.findByIdAndRemove(id);

    const user = await User.findById(req.userId);

    user.posts.pull(id);
    await user.save();

    return true;
  },
  user: async function (args, req) {
    validateUserAuth(req);

    const user = await User.findById(req.userId);

    validateUser(user);

    return { ...user._doc, _id: user._id.toString() };
  },
  updateStatus: async function ({ status }, req) {
    validateUserAuth(req);

    const user = await User.findById(req.userId);

    validateUser(user);

    user.status = status;
    await user.save();
    return { ...user._doc, _id: user._id.toString() };
  },
};
