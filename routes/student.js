const express = require("express");
const {studentCreate, studentLogin} = require("../controllers/student");
const router = express.Router();

router.post("/studentCreate", studentCreate)
router.post("/studentLogin", studentLogin)

module.exports = router;
