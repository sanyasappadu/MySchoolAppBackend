const Teacher = require('../models/Teacher.js');
const bcrypt = require("bcryptjs");
const createError = require("../error.js");
 
const createTeacher = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newTeacher = new Teacher({ ...req.body, password: hash });
    console.log(newTeacher)
    await newTeacher.save();
    res.status(200).send("Teacher has been created!");
  } catch (err) {
    next(err);
  }
};
module.exports = { createTeacher }
