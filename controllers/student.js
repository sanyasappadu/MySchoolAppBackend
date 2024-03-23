const Student = require('../models/Student.js');
const bcrypt = require("bcryptjs");
const createError = require("../utils/error.js");
const jwt = require("jsonwebtoken");
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

    const token = jwt.sign({ id: student._id }, process.env.JWT);
    const { password, ...others } = student._doc;
 
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        message: "Student login successfully",
        student: others
      });
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
const createStudentList = async (req, res, next) => {
  const studentsData = req.body
  try {
    const newStudentsList =  studentsData.map((student)=> ({
      ...student,
      password:bcrypt.hashSync(student.password, 10)
    }));
    const savedStudents = await Student.insertMany(newStudentsList);
    console.log(savedStudents);

    res.status(200).send("Students has been created!");
  } catch (err) {
    next(err);
  }
};
module.exports = {studentCreate, studentLogin, getStudent, getStudentList, deleteStudent, createStudentList}

