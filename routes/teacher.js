const express = require("express");
const {createTeacher, loginTeacher , getTeacher} = require("../controllers/teacher");

const router = express.Router();

router.post("/createTeacher", createTeacher)
router.post("/loginTeacher", loginTeacher)
router.get("/getTeacher/:id", getTeacher)
module.exports = router;