const express = require("express");
const {createTeacher } = require("../controllers/teacher");

const router = express.Router();

router.post("/createTeacher", createTeacher)

module.exports = router;