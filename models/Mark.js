const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
  idnumber: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  unitTest: {
    type: String,
    required: true
  },
  name: String,
  telugu: Number,
  english: Number,
  maths: Number,
  science: Number,
  social: Number,
  maximumMarks: Number,
});

const Mark = mongoose.model('Mark', markSchema);

module.exports = Mark;
