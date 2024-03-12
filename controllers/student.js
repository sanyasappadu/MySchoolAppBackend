const Student = require('../models/Student.js');
const bcrypt = require("bcryptjs");
 
const studentCreate = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newStudent = new Student({ ...req.body, password: hash });
    console.log(newStudent)
    await newStudent.save();
    res.status(200).send("Student has been created!");
  } catch (err) {
    next(err);
  }
};

module.exports = studentCreate

