const Student = require('../models/Student.js');
const bcrypt = require("bcryptjs");
const createError = require("../error.js");

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
const studentLogin = async (req, res, next) => {
  try {
    const student = await Student.findOne({ idnumber: req.body.idnumber });
    if (!student) return next(createError(404, "Student not found!"));
 
    const isCorrect = await bcrypt.compare(req.body.password, student.password);
    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));
    res.status(200).json("Student login successfully");
  } catch (err) {
    next(err);
  }
};
module.exports = {studentCreate, studentLogin}

