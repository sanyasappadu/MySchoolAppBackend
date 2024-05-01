const Student = require('../models/Student.js');
const bcrypt = require("bcryptjs");
const createError = require("../utils/error.js");
const jwt = require("jsonwebtoken");
const studentCreate = async (req, role, res) => {
  try {
    const validateName = async (name) => {
      let student = await Student.findOne({ name });
      return student ? false : true;
    };
    const validateEmail = async (email) => {
      let student = await Student.findOne({ email });
      return student ? false : true;
    };
    let nameNotTaken = await validateName(req.name);
    if (!nameNotTaken) {
      return res.status(400).json({
        message: `Name is already taken.`,
      });
    }
    let emailNotRegistered = await validateEmail(req.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: `Email is already registered.`,
      });
    }
    const password = await bcrypt.hash(req.password, 12);
    const newStudent = new Student ({
      ...req,
      password,
      role
    });

    await newStudent .save();
    return res.status(201).json({
      message: "Hurry! now you are successfully registred. Please nor login."
    });
  } catch (err) {
    return res.status(500).json({
      message: `${err.message}`
    });
  }
};
const studentLogin = async (req, role, res) => {
  let { name, password } = req;
  const student = await Student.findOne({ name });
  if (!student) {
    return res.status(404).json({
      message: "Name is not found. Invalid login credentials.",
      success: false,
    });
  }
  if (student.role !== role) {
    return res.status(403).json({
      message: "Please make sure you are logging in from the right portal.",
      success: false,
    });
  }
  let isMatch = await bcrypt.compare(password, student.password);
  if (isMatch) {
    let token = jwt.sign(
      {
        role: student.role,
        name: student.name,
        email: student.email,
      },
      process.env.JWT,
      { expiresIn: "3 days" }
    );

    let result = {
      name: student.name,
      role: student.role,
      email: student.email,
      token: `Bearer ${token}`,
      expiresIn: 168,
    };

    return res.status(200).json({
      ...result,
      message: "You are now logged in.",
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password.",
    });
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
const deleteStudent = async (req, res, next) => {
  try {
    console.log(req.params.idnumber)
    const student = await Student.findOneAndDelete({ idnumber: req.params.idnumber });
    if (!student) {
      return next(createError(404, "Student not found!"));
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function deleteStudentById(idnumber) {
  try {
      const deletedStudent = await Student.findOneAndDelete({ idnumber });
      if (!deletedStudent) {
          console.log('Student not found.');
          return;
      }
      console.log('Deleted student:', deletedStudent);
  } catch (error) {
      console.error('Error deleting student:', error);
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
/**
 * @DESC Verify JWT from authorization header Middleware
 */
const studentAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(process.env.JWT);
  console.log(authHeader);
  if (!authHeader) return res.sendStatus(403);
  console.log(authHeader); // Bearer token
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT, (err, decoded) => {
    console.log("verifying...");
    if (err) return res.sendStatus(403); //invalid token

    console.log(decoded); //for correct token
    next();
  });
};

/**
 * @DESC Check Role Middleware
 */
const checkRole = (roles) => async (req, res, next) => {
  let { name } = req.body;

  //retrieve employee info from DB
  const employee = await Employee.findOne({ name });
  !roles.includes(employee.role)
    ? res.status(401).json("Sorry you do not have access to this route")
    : next();
};
module.exports = {studentCreate, studentLogin, getStudent, getStudentList, deleteStudent, createStudentList, studentAuth, checkRole}

