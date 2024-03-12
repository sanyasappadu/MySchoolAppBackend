const express = require("express");
const {createTeacher, loginTeacher , getTeacher, deleteTeacher} = require("../controllers/teacher");

const router = express.Router();

router.post("/createTeacher", createTeacher)
router.post("/loginTeacher", loginTeacher)
router.get("/getTeacher/:id", getTeacher)
router.delete("/deleteTeacher/:id", deleteTeacher)
module.exports = router;