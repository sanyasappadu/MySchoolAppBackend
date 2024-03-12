const express = require("express");
const {studentCreate, studentLogin, getStudent} = require("../controllers/student");
const router = express.Router();

router.post("/studentCreate", studentCreate)
router.post("/studentLogin", studentLogin)
router.get("/getStudent/:id", getStudent)

module.exports = router;
