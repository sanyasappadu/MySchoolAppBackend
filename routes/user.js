const express = require("express");
const {userCreate, userLogin, getUser, getUserList, deleteUser, createUserList, userAuth, userVerify, checkRole} = require("../controllers/user");
const router = express.Router();

router.post("/register", (req, res) => {
  userCreate(req.body, res);
  });
router.post("/Login", async (req, res) => {
  await userLogin(req.body, res);
  });
router.get("/getUser/:idnumber", getUser)
router.get("/getUserList/:class", getUserList)
router.delete("/deleteUser/:idnumber", deleteUser)
router.post("/createUserList", createUserList)
module.exports = router;
