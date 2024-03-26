const Teacher = require('../models/Teacher.js');
const bcrypt = require("bcryptjs");
const createError = require("../utils/error.js");
const jwt = require("jsonwebtoken");
// const createTeacher = async (req, res, next) => {
//   try {
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(req.body.password, salt);
//     const newTeacher = new Teacher({ ...req.body, password: hash });
//     console.log(newTeacher)
//     await newTeacher.save();
//     res.status(200).send("Teacher has been created!");
//   } catch (err) {
//     next(err);
//   }
// };
const createTeacher = async (req, role, res) => {
  try {
    const validateName = async (name) => {  
      let teacher = await Teacher.findOne({ name });
      return teacher ? false : true;
    };

    //Get teacher from database with same email if any
    const validateEmail = async (email) => {
      let teacher = await Teacher.findOne({ email });
      return teacher ? false : true;
    };
    // Validate the name
    let nameNotTaken = await validateName(req.name);
    if (!nameNotTaken) {
      return res.status(400).json({
        message: `Name is already taken.`,
      });
    }

    // validate the email
    let emailNotRegistered = await validateEmail(req.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: `Email is already registered.`,
      });
    }

// Hash password using bcrypt
    const password = await bcrypt.hash(req.password, 12);
    // create a new user
    const newTeacher = new Teacher ({
      ...req,
      password,
      role
    });

    await newTeacher .save();
    return res.status(201).json({
      message: "Hurry! now you are successfully registred. Please nor login."
    });
  } catch (err) {
    // Implement logger function if any
    return res.status(500).json({
      message: `${err.message}`
    });
  }
};

// const loginTeacher = async (req, res, next) => {
//   try {
//     const teacher = await Teacher.findOne({ idnumber: req.body.idnumber });
//     if (!teacher) return next(createError(404, "Teacher not found!"));
 
//     const isCorrect = await bcrypt.compare(req.body.password, teacher.password);
//     if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

//     const token = jwt.sign({ id: teacher._id }, process.env.JWT);
//     const { password, ...others } = teacher._doc;
 
//     res
//       .cookie("access_token", token, {
//         httpOnly: true,
//       })
//       .status(200)
//       .json({
//         message: "Teacher login successfully",
//         teacher: others
//       });
//   } catch (err) {
//     next(err);
//   }
// };
const loginTeacher = async (req, role, res) => {
  let { name, password } = req;

  // First Check if the user exist in the database
  const teacher = await Teacher.findOne({ name });
  if (!teacher) {
    return res.status(404).json({
      message: "Name is not found. Invalid login credentials.",
      success: false,
    });
  }
  if (teacher.role !== role) {
    return res.status(403).json({
      message: "Please make sure you are logging in from the right portal.",
      success: false,
    });
  }

  // Now check if the password match
  let isMatch = await bcrypt.compare(password, teacher.password);
  if (isMatch) {
    let token = jwt.sign(
      {
        role: teacher.role,
        name: teacher.name,
        email: teacher.email,
      },
      process.env.JWT,
      { expiresIn: "3 days" }
    );

    let result = {
      name: teacher.name,
      role: teacher.role,
      email: teacher.email,
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

/**
 * @DESC Verify JWT from authorization header Middleware
 */
const teacherAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(process.env.JWT);
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

  const teacher = await Teacher.findOne({ name });
  !roles.includes(teacher.role)
    ? res.status(401).json("Sorry you do not have access to this route")
    : next();
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
const deleteTeacher = async (req, res, next)=>{
  const teacherId = req.params.idnumber;
  try {
    const idnumber = await Teacher.findOneAndDelete(teacherId)
    if(!idnumber) return next(createError(404, "Teacher notFound"));
    res.status(200).send("teacher is deleted")
  } catch (error) {
    console.error('error deleting teacher:', error);
    res.status(500).json({message:"internal server error"})
  }
}
module.exports = { createTeacher, loginTeacher , getTeacher, deleteTeacher ,teacherAuth, checkRole}
