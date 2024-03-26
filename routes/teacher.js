const express = require("express");
const {createTeacher, loginTeacher , getTeacher, deleteTeacher} = require("../controllers/teacher");

const router = express.Router();

router.post("/register-hm", (req, res) => {
  createTeacher(req.body, "hm", res);
  });
router.post("/register-vhm", (req, res) => {
  createTeacher(req.body, "vhm", res);
  });
router.post("/register-adminT", (req, res) => {
  createTeacher(req.body, "admin", res);
  });
router.post("/Login-hm", async (req, res) => {
  await loginTeacher(req.body, "hm", res);
  });
router.post("/Login-vhm", async (req, res) => {
  await loginTeacher(req.body, "vhm", res);
  });
router.post("/Login-adminT", async (req, res) => {
  await loginTeacher(req.body, "admin", res);
  });
router.get("/getTeacher/:id", getTeacher)
router.delete("/deleteTeacher/:id", deleteTeacher)
module.exports = router;