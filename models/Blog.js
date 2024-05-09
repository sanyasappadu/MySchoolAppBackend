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
  role: {
    type: String,
    enum: ["hm", "vhm", "teacherAdmin", "teacher", "studentAdmin", "classLeader", "student"],
  },
  description:{
    type: String,
    required: true
  },
  briefDescription:{
    type: String,
    required: true
  },
  referenceLink:{
    type: String
  },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
