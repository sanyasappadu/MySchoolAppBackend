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
const loginTeacher = async (req, res, next) => {
  try {
const teacher = await Teacher.findOne({ idnumber: req.body.idnumber });
    if (!teacher) return next(createError(404, "Teacher not found!"));
 
    const isCorrect = await bcrypt.compare(req.body.password, teacher.password);
    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

    res.status(200).json("teacher login successfully");
  } catch (err) {
    next(err);
  }
};
const getTeacher = async ( req, res, next) => {
  const teacherId = req.params.idnumber;
  try {
    const teacherData = await Teacher.findOne(teacherId)
    if(!teacherData) return next(createError(404, "Teacher notFound"));
    res.status(200).json(teacherData)
  } catch (error) {
    console.error('error geting teacher:', error);
    res.status(500).json({message:"internal server error"})
  }
}
module.exports = { createTeacher, loginTeacher , getTeacher }
