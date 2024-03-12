const express = require("express");
const {studentCreate, studentLogin, getStudent, getStudentList, deleteStudent} = require("../controllers/student");
const router = express.Router();

router.post("/studentCreate", studentCreate)
router.post("/studentLogin", studentLogin)
router.get("/getStudent/:id", getStudent)
router.get("/getStudentList/:class", getStudentList)
router.delete("/deleteStudent/:id", deleteStudent)
module.exports = router;
