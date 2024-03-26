const express = require("express");
const {studentCreate, studentLogin, getStudent, getStudentList, deleteStudent, createStudentList, studentAuth, checkRole} = require("../controllers/student");
const router = express.Router();

router.post("/register-admin", (req, res) => {
  studentCreate(req.body, "admin", res);
  });
router.post("/register-classLeader", (req, res) => {
  studentCreate(req.body, "classLeader", res);
  });
router.post("/Login-admin", async (req, res) => {
  await studentLogin(req.body, "admin", res);
  });
router.post("/Login-classLeader", async (req, res) => {
  await studentLogin(req.body, "classLeader", res);
  });
router.get("/protected-classLeader", studentAuth, checkRole(["classLeader"]), async (req, res) => {
  return res.json(`welcome ${req.body.name}`);
  });
router.get("/getStudent/:id", getStudent)
router.get("/getStudentList/:class", getStudentList)
router.delete("/deleteStudent/:id", deleteStudent)
router.post("/createStudentList", createStudentList)
module.exports = router;
