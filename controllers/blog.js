const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        blog
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { _id : req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: 'success',
      data: {
        blog
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
    });
    res.status(200).json({
      status: 'success',
      data: {
        blog
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      status: 'success',
      data: {
        blogs
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findOneAndDelete({
      _id : req.params.id,
    });
    if (!deletedBlog) {
      return res.status(404).json({
        status: 'fail',
        message: 'Blog not found',
      });
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};