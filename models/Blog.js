const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  idnumber: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  heading:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  referenceLink:{
    type: String
  },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
