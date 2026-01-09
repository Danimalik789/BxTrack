const Post = require("../models/Post");
const User = require("../models/User");

exports.createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const post = await Post.create({
      title,
      content,
      author: req.user.id,
    });

    const populated = await post.populate("author", "name email");
    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit, 10) || 10, 1),
      50
    );
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Post.find()
        .populate("author", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Post.countDocuments(),
    ]);

    res.json({
      items,
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
    });
  } catch (err) {
    next(err);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email"
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this post" });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();

    const populated = await post.populate("author", "name email");
    res.json(populated);
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this post" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    next(err);
  }
};
