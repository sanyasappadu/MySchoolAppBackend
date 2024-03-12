const express = require("express");
const studentCreate = require("../controllers/student");
const router = express.Router();

router.post("/studentCreate", studentCreate)

module.exports = router;
