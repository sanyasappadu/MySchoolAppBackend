const express = require("express");
const {studentCreate, studentLogin, getStudent, getStudentList} = require("../controllers/student");
const router = express.Router();

router.post("/studentCreate", studentCreate)
router.post("/studentLogin", studentLogin)
router.get("/getStudent/:id", getStudent)
router.get("/getStudentList/:class", getStudentList)
module.exports = router;
