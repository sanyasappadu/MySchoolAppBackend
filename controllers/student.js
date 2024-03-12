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
const getStudent = async (req, res, next) => {
  const studentId = req.params.idnumber
  try {
    const student = await Student.findOne(studentId);
    if(!student) return next(createError(404, "Student not found!"));
    res.status(200).json(student)
  } catch (error) {
    console.error('error geting student:', error);
    res.status(500).json({message:"internal server error"})
  }
}
const getStudentList = async (req, res, next) => {
  // const studentClass = req.params.class
  try {
    const student = await Student.find({class: req.params.class});
    if(!student) return next(createError(404, "Student not found!"));
    res.status(200).json(student)
  } catch (error) {
    console.error('error geting student:', error);
    res.status(500).json({message:"internal server error"})
  }
}
const deleteStudent = async (req, res, next ) => {
  const studentId = req.params.idnumber
  try {
    const student = await Student.findOneAndDelete(studentId);
    if(!student) return next(createError(404, "Student not found!"));
    res.status(200).json(student)
  } catch (error) {
    console.error('error geting student:', error);
    res.status(500).json({message:"internal server error"})
  }
}
module.exports = {studentCreate, studentLogin, getStudent, getStudentList, deleteStudent}

