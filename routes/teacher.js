const express = require("express");
const {createTeacher, loginTeacher } = require("../controllers/teacher");

const router = express.Router();

router.post("/createTeacher", createTeacher)
router.post("/loginTeacher", loginTeacher)
module.exports = router;